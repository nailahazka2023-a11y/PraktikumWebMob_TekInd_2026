import React from 'react';

function RiwayatData({ data, onHapus, onHapusSemua }) {
  return (
    <div className="w-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0 text-start">Riwayat Data</h2>
        {data.length > 0 && (
          <button className="btn btn-danger fw-bold shadow-sm" onClick={onHapusSemua}>
            Hapus Semua Data
          </button>
        )}
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle text-start">
          <thead className="table-dark">
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>Shift</th>
              <th>Nama Mesin</th>
              <th>Jumlah Produksi</th>
              <th>Jumlah Reject</th>
              <th>Netto</th>
              <th>Yield (%)</th>
              <th className="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center text-muted py-4">Belum ada data laporan.</td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr 
                  key={item.id} 
                  className={item.shift === 'Malam' ? 'table-warning' : ''}
                >
                  <td>{index + 1}</td>
                  <td>{item.tanggal}</td>
                  <td>{item.shift}</td>
                  <td>{item.namaMesin}</td>
                  <td>{item.jumlahProduksi.toLocaleString()}</td>
                  <td>{item.jumlahReject.toLocaleString()}</td>
                  <td>{item.netto.toLocaleString()}</td>
                  <td>{item.yieldPercentage}%</td>
                  <td className="text-center">
                    <button 
                      className="btn btn-sm btn-outline-danger" 
                      onClick={() => onHapus(item.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RiwayatData;