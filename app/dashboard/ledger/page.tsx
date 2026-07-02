"use client";

import { useState } from "react";
import LedgerTable from "./LedgerTable";
import LedgerRow from "./LedgerRow";

export type RowData = {
  id: number;
};

export default function LedgerPage() {
  const [rows, setRows] = useState<RowData[]>([]);

  function tambahBaris() {
    setRows((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
      },
    ]);
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Ledger Transaksi</h1>

      <br />

      <button onClick={tambahBaris}>
        ➕ Tambah Baris
      </button>

      <button style={{ marginLeft: 10 }}>
        💾 Simpan Draft
      </button>

      <button style={{ marginLeft: 10 }}>
        🔒 Tutup Hari
      </button>

      <br />
      <br />

      <LedgerTable>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={12} align="center">
              Belum ada transaksi.
            </td>
          </tr>
        ) : (
          rows.map((row) => (
            <LedgerRow key={row.id} />
          ))
        )}
      </LedgerTable>
    </main>
  );
}
