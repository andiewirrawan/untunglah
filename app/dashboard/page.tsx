"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      router.replace("/login");
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("user_id");
    localStorage.removeItem("nama");
    localStorage.removeItem("role");

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
