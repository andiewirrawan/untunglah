export function hariIndonesia(tanggal: string) {
  const hari = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  return hari[new Date(tanggal).getDay()];
}

export function tanggalHariIni() {
  return new Date().toISOString().split("T")[0];
}
