"use client";

import LedgerTable from "./LedgerTable";
import LedgerRow from "./LedgerRow";

export default function LedgerPage() {
  return (
    <main style={{ padding: 20 }}>
      <h1>Ledger Transaksi</h1>

      <br />

      <button>➕ Tambah Baris</button>

      <button style={{ marginLeft: 10 }}>
        💾 Simpan Draft
      </button>

      <button style={{ marginLeft: 10 }}>
        🔒 Tutup Hari
      </button>

      <br />
      <br />

      <LedgerTable>
        <LedgerRow />
      </LedgerTable>
    </main>
  );
}
