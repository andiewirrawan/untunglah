"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Ledger = {
  id: string;
  no_transaksi: string;
  tanggal_transaksi: string;
  pemasukan: number;
  pengeluaran: number;
  status: string;
};

export default function LedgerPage() {
  const [data, setData] = useState<Ledger[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLedger();
  }, []);

  async function loadLedger() {
    const { data, error } = await supabase
      .from("ledger")
      .select(
        "id,no_transaksi,tanggal_transaksi,pemasukan,pengeluaran,status"
      )
      .eq("is_deleted", false)
      .order("tanggal_transaksi", { ascending: false });

    if (!error && data) {
      setData(data);
    }

    setLoading(false);
  }

  if (loading) {
    return <main style={{ padding: 20 }}>Loading...</main>;
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Ledger Transaksi</h1>

      <br />

      {data.length === 0 ? (
        <p>Belum ada transaksi.</p>
      ) : (
        <table
          border={1}
          cellPadding={8}
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>No Transaksi</th>
              <th>Tanggal</th>
              <th>Pemasukan</th>
              <th>Pengeluaran</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.no_transaksi}</td>
                <td>{row.tanggal_transaksi}</td>
                <td>Rp {Number(row.pemasukan).toLocaleString("id-ID")}</td>
                <td>Rp {Number(row.pengeluaran).toLocaleString("id-ID")}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
