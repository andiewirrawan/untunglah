import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/password";
import { createSessionToken, SESSION_COOKIE, type UserRole } from "@/lib/session";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

type LoginUser = {
  id: string;
  nama: string;
  username: string;
  password_hash: string;
  role: UserRole;
  status: "aktif" | "nonaktif";
};

export async function POST(request: Request) {
  const { username, password } = (await request.json()) as {
    username?: string;
    password?: string;
  };

  if (!username || !password) {
    return NextResponse.json(
      { message: "Username dan password wajib diisi" },
      { status: 400 },
    );
  }

  let supabaseAdmin;

  try {
    supabaseAdmin = createSupabaseAdmin();
  } catch {
    return NextResponse.json(
      { message: "Konfigurasi Supabase belum lengkap" },
      { status: 500 },
    );
  }

  const { data: user, error } = await supabaseAdmin
    .from("users")
    .select("id,nama,username,password_hash,role,status")
    .eq("username", username)
    .eq("is_deleted", false)
    .maybeSingle<LoginUser>();

  if (error) {
    return NextResponse.json(
      { message: "Login belum bisa diproses. Cek koneksi database." },
      { status: 500 },
    );
  }

  if (!user || user.password_hash !== hashPassword(password)) {
    return NextResponse.json(
      { message: "Username atau password salah" },
      { status: 401 },
    );
  }

  if (user.status !== "aktif") {
    return NextResponse.json(
      { message: "Akun nonaktif. Hubungi Owner." },
      { status: 403 },
    );
  }

  const sessionToken = createSessionToken({
    userId: user.id,
    nama: user.nama,
    username: user.username,
    role: user.role,
  });

  const { error: auditError } = await supabaseAdmin.from("audit_log").insert({
    table_name: "users",
    record_id: user.id,
    action: "LOGIN",
    data_baru: {
      username: user.username,
      user_agent: request.headers.get("user-agent"),
    },
    user_id: user.id,
    role: user.role,
  });

  if (auditError) {
    console.error("Gagal mencatat audit login", auditError);
  }

  const response = NextResponse.json({
    user: {
      nama: user.nama,
      username: user.username,
      role: user.role,
    },
  });

  response.cookies.set(SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
