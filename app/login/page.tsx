"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    setLoading(false);

    if (error || !data) {
      alert("Username atau Password salah");
      return;
    }

    if (data.status !== "aktif") {
      alert("Akun tidak aktif");
      return;
    }

    if (data.password_hash !== password) {
      alert("Username atau Password salah");
      return;
    }

    localStorage.setItem("user_id", data.id);
    localStorage.setItem("nama", data.nama);
    localStorage.setItem("role", data.role);

    router.push("/dashboard");
  }

  return (
    <main style={{ padding: 30 }}>
      <h1>UNTUNGLAH</h1>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <br />

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </main>
  );
}
