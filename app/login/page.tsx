"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (username === "owner" && password === "owner123") {
      localStorage.setItem("role", "owner");
      router.push("/dashboard");
    } else {
      alert("Username atau Password salah");
    }
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

        <button type="submit">
          Login
        </button>
      </form>
    </main>
  );
}
