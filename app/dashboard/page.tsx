"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      router.replace("/login");
      return;
    }

    setNama(localStorage.getItem("nama") || "");
    setRole(localStorage.getItem("role") || "");
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("user_id");
    localStorage.removeItem("nama");
    localStorage.removeItem("role");

    router.replace("/login");
  }

  return (
    <main style={{ padding: 20, maxWidth: 700, margin: "auto" }}>
      <h1>UNTUNGLAH</h1>

      <hr />

      <p><strong>{nama}</strong></p>
      <p>Role : {role}</p>

      <hr />

      <h3>Menu</h3>

      <div style={{ display: "grid", gap: 10 }}>

        <button onClick={() => router.push("/dashboard/ledger")}>
  📒 Ledger Transaksi
</button>

        <button>💰 Cash Count</button>

        <button>📑 Piutang</button>

        <button>📊 Laporan Laba Rugi</button>

        <button>📁 Master COA</button>

        <button>👥 Kelola User</button>

      </div>

      <br />

      <button onClick={handleLogout}>
        🚪 Logout
      </button>
    </main>
  );
}
