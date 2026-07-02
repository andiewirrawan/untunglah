"use client";

import LedgerTable from "./LedgerTable";

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
        <tr>
          <td colSpan={12} align="center">
            Belum ada transaksi.
          </td>
        </tr>
      </LedgerTable>
    </main>
  );
}
