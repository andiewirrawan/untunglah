"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem("session");

    if (!session) {
      router.replace("/login");
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("session");
    router.replace("/login");
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Dashboard Owner</h1>

      <p>Selamat datang di Untunglah 🚀</p>

      <br />

      <button onClick={handleLogout}>
        Logout
      </button>
    </main>
  );
}
