import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);

  if (!session) {
    redirect("/login");
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Dashboard {session.role.toUpperCase()}</h1>

      <p>Selamat datang, {session.nama} 🚀</p>

      {session.role === "kasir" ? (
        <section>
          <h2>Closing Harian</h2>
          <p>Modul ledger dan cash count kasir akan dibangun di tahap berikutnya.</p>
        </section>
      ) : (
        <section>
          <h2>Ringkasan Owner/SPV</h2>
          <p>Modul kartu ringkasan, approval, dan laporan akan dibangun di tahap berikutnya.</p>
        </section>
      )}
    </main>
  );
}
