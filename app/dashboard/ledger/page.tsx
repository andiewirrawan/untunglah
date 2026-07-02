"use client";

import { useState } from "react";

type LedgerRow = {
  id: number;
  tanggal: string;
  no: string;
  pos: string;
  item: string;
  transaksi: string;
  pemasukan: string;
  pengeluaran: string;
  catatan: string;
};

export default function LedgerPage() {
  const [rows, setRows] = useState<LedgerRow[]>([]);

  function tambahBaris() {
    setRows([
      ...rows,
      {
        id: Date.now(),
        tanggal: "",
        no: "",
        pos: "",
        item: "",
        transaksi: "Tunai",
        pemasukan: "",
        pengeluaran: "",
        catatan: "",
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

      <br />
      <br />

      <div style={{ overflowX: "auto" }}>
        <table
          border={1}
          cellPadding={6}
          style={{
            borderCollapse: "collapse",
            minWidth: "1200px",
            width: "100%",
          }}
        >
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>No Transaksi</th>
              <th>Pos</th>
              <th>Item</th>
              <th>Transaksi</th>
              <th>Pemasukan</th>
              <th>Pengeluaran</th>
              <th>Catatan</th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={8} align="center">
                  Belum ada data.
                </td>
              </tr>
            )}

            {rows.map((row) => (
              <tr key={row.id}>
                <td>
                  <input type="date" />
                </td>

                <td>
                  <input
                    value="(otomatis)"
                    disabled
                  />
                </td>

                <td>
                  <input
                    placeholder="Pos"
                  />
                </td>

                <td>
                  <input
                    placeholder="Item"
                  />
                </td>

                <td>
                  <select defaultValue="Tunai">
                    <option>Tunai</option>
                    <option>Non Tunai</option>
                    <option>Piutang</option>
                  </select>
                </td>

                <td>
                  <input
                    type="number"
                    placeholder="0"
                  />
                </td>

                <td>
                  <input
                    type="number"
                    placeholder="0"
                  />
                </td>

                <td>
                  <input
                    placeholder="Catatan"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
