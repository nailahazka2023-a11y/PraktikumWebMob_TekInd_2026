import React, { useMemo } from 'react';

function DataTabel() {
  const rows = useMemo(
    () =>
      [
        { jam: '08:00', output: 120, target: 150 },
        { jam: '09:00', output: 150, target: 150 },
        { jam: '10:00', output: 180, target: 150 },
        { jam: '11:00', output: 170, target: 150 },
        { jam: '12:00', output: 200, target: 150 },
        { jam: '13:00', output: 210, target: 150 },
      ],
    []
  );

  return (
    <div className="card shadow-sm rounded-4">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <div className="fw-bold">Tabel Data Produksi</div>
            <div className="text-secondary">Jam vs Output (Unit)</div>
          </div>
        </div>

        <div className="table-responsive mt-3">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th>Jam</th>
                <th>Output</th>
                <th>Target</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.jam}>
                  <td className="fw-semibold">{r.jam}</td>
                  <td>{r.output}</td>
                  <td>{r.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DataTabel;

