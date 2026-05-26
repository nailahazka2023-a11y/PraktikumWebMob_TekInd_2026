import React from 'react';

function Dashboard({ data }) {
  const totalProduksi = data.reduce((sum, item) => sum + item.jumlahProduksi, 0);
  const totalReject = data.reduce((sum, item) => sum + item.jumlahReject, 0);
  const totalNetto = totalProduksi - totalReject;
  
  const totalYield = totalProduksi > 0 ? ((totalNetto / totalProduksi) * 100).toFixed(2) : '0.00';
  const yieldNum = parseFloat(totalYield);

  return (
    <div className="w-100">
      <h2 className="mb-4 text-start fw-bold">Dashboard</h2>
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card text-white bg-primary p-3 border-0 shadow-sm text-start">
            <div className="card-body">
              <h5 className="card-title opacity-75 fw-medium">Total Produksi</h5>
              <p className="card-text display-5 fw-bold m-0">{totalProduksi.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-danger p-3 border-0 shadow-sm text-start">
            <div className="card-body">
              <h5 className="card-title opacity-75 fw-medium">Total Reject</h5>
              <p className="card-text display-5 fw-bold m-0">{totalReject.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div 
            className="card text-white p-3 border-0 shadow-sm text-start"
            style={{ backgroundColor: totalYield < 85 ? '#dc3545' : '#198754' }}
          >
            <div className="card-body">
              <h5 className="card-title opacity-75 fw-medium">Yield (%)</h5>
              <p className="card-text display-5 fw-bold m-0">{totalYield}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;