"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { hariIndonesia, tanggalHariIni } from "./utils";

type COA = {
  id: string;
  pos: string;
  item: string;
};

type Kasir = {
  id: string;
  nama: string;
};

export default function LedgerRow() {
  const [tanggal, setTanggal] = useState(tanggalHariIni());

  const [coa, setCoa] = useState<COA[]>([]);
  const [coaId, setCoaId] = useState("");

  const [kasir, setKasir] = useState<Kasir[]>([]);
  const [kasirId, setKasirId] = useState("");

  useEffect(() => {
    loadCOA();
    loadKasir();
  }, []);

  async function loadCOA() {
    const { data } = await supabase
      .from("coa")
      .select("id,pos,item")
      .eq("status", "aktif")
      .order("jurnal_code");

    if (data) {
      setCoa(data);

      if (data.length > 0) {
        setCoaId(data[0].id);
      }
    }
  }

  async function loadKasir() {
    const { data } = await supabase
      .from("users")
      .select("id,nama")
      .eq("role", "kasir")
      .eq("status", "aktif");

    if (data) {
      setKasir(data);

      if (data.length > 0) {
        setKasirId(data[0].id);
      }
    }
  }

  const coaTerpilih = coa.find((c) => c.id === coaId);

  return (
    <tr>
      <td>
        <input
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
        />
      </td>

      <td>{hariIndonesia(tanggal)}</td>

      <td>(otomatis)</td>

      <td>
        <select
          value={coaId}
          onChange={(e) => setCoaId(e.target.value)}
        >
          {coa.map((c) => (
            <option key={c.id} value={c.id}>
              {c.pos}
            </option>
          ))}
        </select>
      </td>

      <td>{coaTerpilih?.item ?? "-"}</td>

      <td>
        <select defaultValue="tunai">
          <option value="tunai">Tunai</option>
          <option value="non_tunai">Non Tunai</option>
          <option value="piutang">Piutang</option>
        </select>
      </td>

      <td>
        <input type="number" />
      </td>

      <td>
        <input type="number" />
      </td>

      <td>0</td>

      <td>
        <select
          value={kasirId}
          onChange={(e) => setKasirId(e.target.value)}
        >
          {kasir.map((k) => (
            <option key={k.id} value={k.id}>
              {k.nama}
            </option>
          ))}
        </select>
      </td>

      <td>
        <input type="text" />
      </td>

      <td>draft</td>
    </tr>
  );
}
