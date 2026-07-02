type Props = {
  children?: React.ReactNode;
};

export default function LedgerTable({ children }: Props) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        border={1}
        cellPadding={6}
        style={{
          borderCollapse: "collapse",
          minWidth: "1700px",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Hari</th>
            <th>No Transaksi</th>
            <th>Pos</th>
            <th>Item</th>
            <th>Transaksi</th>
            <th>Pemasukan</th>
            <th>Pengeluaran</th>
            <th>Kas On Hand</th>
            <th>Kasir</th>
            <th>Catatan</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
