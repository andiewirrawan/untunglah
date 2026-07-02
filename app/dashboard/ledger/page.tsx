"use client";

import { useState } from "react";
import LedgerTable from "./LedgerTable";
import LedgerRow from "./LedgerRow";

export default function LedgerPage() {
  const [jumlahBaris, setJumlahBaris] = useState(0);

  return (
    <main style={{ padding: 20 }}>
      <h1>Ledger Transaksi</h1>

      <br />

      <button onClick={() => setJumlahBaris(jumlahBaris + 1)}>
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
        {jumlahBaris === 0 ? (
          <tr>
            <td colSpan={12} align="center">
              Belum ada transaksi.
            </td>
          </tr>
        ) : (
          Array.from({ length: jumlahBaris }).map((_, index) => (
            <LedgerRow key={index} />
          ))
        )}
      </LedgerTable>
    </main>
  );
}
