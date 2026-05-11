import React from 'react';

function KartuMesin({ nama, status, produksi = 0 }) {
  const badgeColor =
    status === 'Running'
      ? 'bg-success'
      : status === 'Stop'
      ? 'bg-danger'
      : status === 'Maintenance'
      ? 'bg-warning'
      : 'bg-secondary';

  return (
    <div className="card shadow-sm p-3 h-100 rounded-4">
      <div className="card-body">
        <h5 className="card-title mb-2">{nama}</h5>
        <span className={`badge ${badgeColor} mb-3`}>{status}</span>
        <hr className="my-3" />
        <p className="mb-0">
          Produksi Saat Ini: <strong>{produksi}</strong> Unit
        </p>
      </div>
    </div>
  );
}

export default KartuMesin;

