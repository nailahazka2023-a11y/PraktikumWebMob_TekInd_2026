import React from 'react';
import GrafikProduksi from '../Komponen/GrafikProduksi';
import KartuMesin from '../Komponen/KartuMesin';

import Sidebar from '../components/Sidebar';
import HeaderUser from '../components/HeaderUser';
import DataTabel from '../components/DataTabel';

function Dashboard() {
  return (
    <div className="d-flex">
      <div className="appShell">
        <Sidebar />

        <main className="mainContent flex-grow-1">
          <div className="p-3 p-lg-4">
            <HeaderUser />

            <div className="row g-4">
              {/* Grafik */}
              <div className="col-12">
                <div className="card shadow-sm rounded-4 mb-2">
                  <div className="card-body">
                    <GrafikProduksi />
                  </div>
                </div>
              </div>

              {/* KPI + Kartu Mesin */}
              <div className="col-12 col-lg-7">
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <div className="card bg-primary text-white rounded-4 shadow-sm h-100">
                      <div className="card-body">
                        <h5 className="fw-semibold">Total Output Hari Ini</h5>
                        <h2 className="mb-0">1,030 Unit</h2>
                        <small className="opacity-75">Update terakhir: 13:00</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="card bg-success text-white rounded-4 shadow-sm h-100">
                      <div className="card-body">
                        <h5 className="fw-semibold">Efficiency Rate</h5>
                        <h2 className="mb-0">92.4%</h2>
                        <small className="opacity-75">+1.2% dari kemarin</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="fw-bold mb-3">Status Mesin Aktif</h4>
                  <div className="row g-3">
                    <div className="col-12 col-sm-6 col-lg-3">
                      <KartuMesin nama="CNC-01" status="Running" produksi={320} />
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                      <KartuMesin nama="CNC-02" status="Running" produksi={310} />
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                      <KartuMesin nama="Press-01" status="Stop" produksi={150} />
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                      <KartuMesin nama="Weld-04" status="Maintenance" produksi={0} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabel */}
              <div className="col-12 col-lg-5">
                <DataTabel />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;


