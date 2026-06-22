import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 20 }}>
      <h1>UNTUNGLAH</h1>

      <p>
        Sistem Pencatatan Transaksi dan Laba Rugi UMKM
      </p>

      <Link href="/login">
        Login
      </Link>
    </main>
  );
}
