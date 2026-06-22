"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = (await response.json()) as { message?: string };

    setIsLoading(false);

    if (!response.ok) {
      setError(result.message ?? "Login gagal");
      return;
    }

    router.push("/dashboard");
    router.refresh();
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

        {error ? <p style={{ color: "crimson" }}>{error}</p> : null}

        <button disabled={isLoading} type="submit">
          {isLoading ? "Memproses..." : "Login"}
        </button>
      </form>
    </main>
  );
}
