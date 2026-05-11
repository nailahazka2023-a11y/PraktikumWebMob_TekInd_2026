import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';
import HeaderUser from '../components/HeaderUser';

import { mockInventori } from '../data/mockInventori';
import { storageKeys } from '../data/storageKeys';
import { formatTanggalISO, statusStok } from '../data/utilsInventori';

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

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function Inventori() {
  const [items, setItems] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // UI state
  const [query, setQuery] = useState('');
  const [kategori, setKategori] = useState('Semua');

  // Form transaksi
  const [jenis, setJenis] = useState('Penerimaan');
  const [namaBarang, setNamaBarang] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [tanggal, setTanggal] = useState(() => formatTanggalISO(new Date()));

  useEffect(() => {
    // load items
    const loadedItems = loadJSON(storageKeys.inventori, mockInventori);
    setItems(loadedItems);

    // load transactions (seed if kosong)
    const loadedTx = loadJSON(storageKeys.transaksi, []);
    if (Array.isArray(loadedTx) && loadedTx.length > 0) {
      setTransactions(loadedTx);
    } else {
      setTransactions([]);
    }
  }, []);

  // keep initial namaBarang after items loaded
  useEffect(() => {
    if (!items?.length) return;
    if (!namaBarang) setNamaBarang(items[0].nama);
  }, [items, namaBarang]);

  const kategoriList = useMemo(() => {
    const set = new Set(items.map((i) => i.kategori));
    return ['Semua', ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => {
      const matchQ = !q || i.nama.toLowerCase().includes(q);
      const matchK = kategori === 'Semua' || i.kategori === kategori;
      return matchQ && matchK;
    });
  }, [items, query, kategori]);

  const kpi = useMemo(() => {
    const totalItem = items.length;
    let aman = 0;
    let menipis = 0;
    let habis = 0;

    for (const it of items) {
      const s = statusStok(it.stok, it.batasMinimum);
      if (s.tone === 'success') aman++;
      else if (s.tone === 'warning') menipis++;
      else habis++;
    }
    return { totalItem, aman, menipis, habis };
  }, [items]);

  function handleSubmitTransaksi(e) {
    e.preventDefault();

    const qty = Number(jumlah);
    if (!namaBarang) return alert('Nama barang belum dipilih.');
    if (!tanggal) return alert('Tanggal transaksi wajib diisi.');
    if (!Number.isFinite(qty) || qty <= 0) return alert('Jumlah harus lebih dari 0.');

    const idx = items.findIndex((i) => i.nama === namaBarang);
    if (idx === -1) return alert('Barang tidak ditemukan.');

    const current = items[idx];
    const delta = jenis === 'Penerimaan' ? qty : -qty;
    const newStok = current.stok + delta;

    if (jenis === 'Pengeluaran' && newStok < 0) {
      return alert('Pengeluaran melebihi stok.');
    }

    const updatedItems = [...items];
    updatedItems[idx] = { ...current, stok: newStok };

    const tx = {
      id: `t_${Date.now()}`,
      tanggal,
      jenis,
      namaBarang: current.nama,
      jumlah: qty,
      stokAkhir: newStok,
    };

    const updatedTx = [tx, ...transactions];

    setItems(updatedItems);
    setTransactions(updatedTx);
    saveJSON(storageKeys.inventori, updatedItems);
    saveJSON(storageKeys.transaksi, updatedTx);

    // reset input
    setJumlah('');
  }

  return (
    <div className="d-flex">
      <div className="appShell">
        <Sidebar />

        <main className="mainContent flex-grow-1">
          <div className="p-3 p-lg-4">
            <HeaderUser />

            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
              <div>
                <h2 className="fw-bold mb-1">Inventori</h2>
                <div className="text-secondary">Kelola stok bahan & catat transaksi penerimaan/pengeluaran.</div>
              </div>
            </div>

            {/* KPI */}
            <div className="row g-3 mb-3">
              <div className="col-12 col-md-3">
                <div className="card bg-primary text-white rounded-4 shadow-sm h-100">
                  <div className="card-body">
                    <div className="fw-semibold">Total Item</div>
                    <div className="display-6">{kpi.totalItem}</div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="card bg-success text-white rounded-4 shadow-sm h-100">
                  <div className="card-body">
                    <div className="fw-semibold">Stok Aman</div>
                    <div className="display-6">{kpi.aman}</div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="card bg-warning text-dark rounded-4 shadow-sm h-100">
                  <div className="card-body">
                    <div className="fw-semibold">Menipis</div>
                    <div className="display-6">{kpi.menipis}</div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="card bg-danger text-white rounded-4 shadow-sm h-100">
                  <div className="card-body">
                    <div className="fw-semibold">Habis</div>
                    <div className="display-6">{kpi.habis}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-4">
              {/* Table */}
              <div className="col-12 col-lg-7">
                <div className="card shadow-sm rounded-4">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                      <div>
                        <div className="fw-bold">Daftar Inventori</div>
                        <div className="text-secondary">Stok saat ini berdasarkan transaksi terbaru.</div>
                      </div>
                      <div className="d-flex gap-2 flex-wrap">
                        <select className="form-select form-select-sm" value={kategori} onChange={(e) => setKategori(e.target.value)}>
                          {kategoriList.map((k) => (
                            <option key={k} value={k}>
                              {k}
                            </option>
                          ))}
                        </select>
                        <input
                          className="form-control form-control-sm"
                          style={{ width: 220 }}
                          placeholder="Cari barang..."
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="table-responsive mt-3">
                      <table className="table table-hover align-middle mb-0">
                        <thead>
                          <tr>
                            <th>Nama Barang</th>
                            <th>Kategori</th>
                            <th className="text-end">Stok</th>
                            <th>Satuan</th>
                            <th className="text-end">Batas Min</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filtered.map((it) => {
                            const s = statusStok(it.stok, it.batasMinimum);
                            const badgeClass =
                              s.tone === 'success'
                                ? 'bg-success'
                                : s.tone === 'warning'
                                  ? 'bg-warning text-dark'
                                  : 'bg-danger';
                            return (
                              <tr key={it.id}>
                                <td className="fw-semibold">{it.nama}</td>
                                <td>{it.kategori}</td>
                                <td className="text-end fw-semibold">{it.stok}</td>
                                <td>{it.satuan}</td>
                                <td className="text-end">{it.batasMinimum}</td>
                                <td>
                                  <span className={`badge ${badgeClass}`}>{s.label}</span>
                                </td>
                              </tr>
                            );
                          })}
                          {!filtered.length && (
                            <tr>
                              <td colSpan={6} className="text-center text-secondary py-4">
                                Data tidak ditemukan.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Transaksi */}
              <div className="col-12 col-lg-5">
                <div className="card shadow-sm rounded-4">
                  <div className="card-body">
                    <div className="fw-bold mb-2">Transaksi Inventori</div>
                    <div className="text-secondary mb-3">Catat penerimaan atau pengeluaran untuk meng-update stok.</div>

                    <form onSubmit={handleSubmitTransaksi}>
                      <div className="mb-3">
                        <label className="form-label">Jenis</label>
                        <select className="form-select" value={jenis} onChange={(e) => setJenis(e.target.value)}>
                          <option value="Penerimaan">Penerimaan</option>
                          <option value="Pengeluaran">Pengeluaran</option>
                        </select>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Tanggal</label>
                        <input className="form-control" type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Nama Barang</label>
                        <select className="form-select" value={namaBarang} onChange={(e) => setNamaBarang(e.target.value)}>
                          {items.map((it) => (
                            <option key={it.id} value={it.nama}>
                              {it.nama} ({it.satuan})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Jumlah</label>
                        <input
                          className="form-control"
                          type="number"
                          min={1}
                          step={1}
                          value={jumlah}
                          onChange={(e) => setJumlah(e.target.value)}
                          placeholder="Masukkan jumlah..."
                        />
                      </div>

                      <button className="btn btn-dark w-100 rounded-3" type="submit">
                        Simpan Transaksi
                      </button>

                      <div className="mt-3">
                        <div className="text-secondary" style={{ fontSize: 13 }}>
                          Riwayat transaksi akan otomatis tampil di menu <b>Laporan</b>.
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Quick recent tx */}
                <div className="card shadow-sm rounded-4 mt-4">
                  <div className="card-body">
                    <div className="fw-bold mb-2">Transaksi Terakhir</div>
                    <div className="table-responsive">
                      <table className="table table-sm align-middle mb-0">
                        <thead>
                          <tr>
                            <th>Tanggal</th>
                            <th>Jenis</th>
                            <th>Jumlah</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.slice(0, 5).map((t) => (
                            <tr key={t.id}>
                              <td className="text-secondary">{t.tanggal}</td>
                              <td>
                                <span className={`badge ${t.jenis === 'Penerimaan' ? 'bg-success' : 'bg-primary'}`}>{t.jenis}</span>
                              </td>
                              <td className="fw-semibold">{t.jumlah}</td>
                            </tr>
                          ))}
                          {transactions.length === 0 && (
                            <tr>
                              <td colSpan={3} className="text-center text-secondary py-3">
                                Belum ada transaksi.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Inventori;

