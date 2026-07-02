export type LedgerRow = {
  id: number;

  tanggal: string;

  hari: string;

  no_transaksi: string;

  coa_id: string;

  jenis_transaksi: "tunai" | "non_tunai" | "piutang";

  pemasukan: number;

  pengeluaran: number;

  kas_on_hand: number;

  kasir_id: string;

  catatan: string;

  status: "draft" | "closed" | "menunggu_approval";
};
