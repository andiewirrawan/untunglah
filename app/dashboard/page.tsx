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
    <main style={{ padding: 20 }}>
      <h1>UNTUNGLAH</h1>

      <h2>Dashboard</h2>

      <hr />

      <p>
        <strong>Selamat Datang,</strong>
      </p>

      <p>{nama}</p>

      <p>
        <strong>Role :</strong> {role}
      </p>

      <br />

      <button onClick={handleLogout}>
        Logout
      </button>
    </main>
  );
}
