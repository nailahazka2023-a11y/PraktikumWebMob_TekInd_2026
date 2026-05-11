import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';
import HeaderUser from '../components/HeaderUser';
import { storageKeys } from '../data/storageKeys';

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function Laporan() {
  const [transactions, setTransactions] = useState([]);

  const [filterJenis, setFilterJenis] = useState('Semua');
  const [queryBarang, setQueryBarang] = useState('');

  useEffect(() => {
    const loadedTx = loadJSON(storageKeys.transaksi, []);
    setTransactions(Array.isArray(loadedTx) ? loadedTx : []);

    const onStorage = () => {
      const updated = loadJSON(storageKeys.transaksi, []);
      setTransactions(Array.isArray(updated) ? updated : []);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const ringkasan = useMemo(() => {
    let totalPenerimaan = 0;
    let totalPengeluaran = 0;

    for (const t of transactions) {
      if (t.jenis === 'Penerimaan') totalPenerimaan += Number(t.jumlah) || 0;
      if (t.jenis === 'Pengeluaran') totalPengeluaran += Number(t.jumlah) || 0;
    }

    return {
      totalPenerimaan,
      totalPengeluaran,
      net: totalPenerimaan - totalPengeluaran,
    };
  }, [transactions]);

  const rows = useMemo(() => {
    const q = queryBarang.trim().toLowerCase();
    return transactions.filter((t) => {
      const matchJ = filterJenis === 'Semua' || t.jenis === filterJenis;
      const matchQ = !q || String(t.namaBarang).toLowerCase().includes(q);
      return matchJ && matchQ;
    });
  }, [transactions, filterJenis, queryBarang]);

  return (
    <div className="d-flex">
      <div className="appShell">
        <Sidebar />

        <main className="mainContent flex-grow-1">
          <div className="p-3 p-lg-4">
            <HeaderUser />

            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
              <div>
                <h2 className="fw-bold mb-1">Laporan</h2>
                <div className="text-secondary">Rekap transaksi inventori.</div>
              </div>
            </div>

            {/* Ringkasan */}
            <div className="row g-3 mb-3">
              <div className="col-12 col-md-4">
                <div className="card bg-success text-white rounded-4 shadow-sm h-100">
                  <div className="card-body">
                    <div className="fw-semibold">Total Penerimaan</div>
                    <div className="display-6">{ringkasan.totalPenerimaan}</div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="card bg-primary text-white rounded-4 shadow-sm h-100">
                  <div className="card-body">
                    <div className="fw-semibold">Total Pengeluaran</div>
                    <div className="display-6">{ringkasan.totalPengeluaran}</div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="card bg-dark text-white rounded-4 shadow-sm h-100">
                  <div className="card-body">
                    <div className="fw-semibold">Net Flow</div>
                    <div className="display-6">{ringkasan.net}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card shadow-sm rounded-4">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <div>
                    <div className="fw-bold">Daftar Transaksi</div>
                    <div className="text-secondary">Tampilkan penerimaan/pengeluaran beserta stok akhir.</div>
                  </div>

                  <div className="d-flex gap-2 flex-wrap">
                    <select className="form-select form-select-sm" value={filterJenis} onChange={(e) => setFilterJenis(e.target.value)}>
                      <option value="Semua">Semua</option>
                      <option value="Penerimaan">Penerimaan</option>
                      <option value="Pengeluaran">Pengeluaran</option>
                    </select>
                    <input
                      className="form-control form-control-sm"
                      style={{ width: 240 }}
                      placeholder="Cari barang..."
                      value={queryBarang}
                      onChange={(e) => setQueryBarang(e.target.value)}
                    />
                  </div>
                </div>

                <div className="table-responsive mt-3">
                  <table className="table table-hover align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Tanggal</th>
                        <th>Jenis</th>
                        <th>Nama Barang</th>
                        <th className="text-end">Jumlah</th>
                        <th className="text-end">Stok Akhir</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((t) => (
                        <tr key={t.id}>
                          <td className="text-secondary">{t.tanggal}</td>
                          <td>
                            <span className={`badge ${t.jenis === 'Penerimaan' ? 'bg-success' : 'bg-primary'}`}>{t.jenis}</span>
                          </td>
                          <td className="fw-semibold">{t.namaBarang}</td>
                          <td className="text-end fw-semibold">{t.jumlah}</td>
                          <td className="text-end">{t.stokAkhir}</td>
                        </tr>
                      ))}
                      {rows.length === 0 && (
                        <tr>
                          <td colSpan={5} className="text-center text-secondary py-4">
                            Tidak ada data laporan.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="text-secondary" style={{ fontSize: 13, marginTop: 12 }}>
              Catatan: data transaksi disimpan di <b>localStorage</b> dari halaman Inventori.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Laporan;

