import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './Halaman/Dashboard';
import Inventori from './Halaman/Inventori';
import DetailItem from './Halaman/DetailItem';
import LaporanKualitas from './Halaman/LaporanKualitas';
import NotFound from './Halaman/NotFound';

function App() {
  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <NavLink className="navbar-brand" to="/" end>
            Sistem Pabrik
          </NavLink>

          <div className="navbar-nav">
            <NavLink
              className={({ isActive }) => `nav-link ${isActive ? 'fw-bold text-warning' : ''}`}
              to="/"
              end
            >
              Dashboard
            </NavLink>

            <NavLink
              className={({ isActive }) => `nav-link ${isActive ? 'fw-bold text-warning' : ''}`}
              to="/inventori"
            >
              Inventori
            </NavLink>

            <NavLink
              className={({ isActive }) => `nav-link ${isActive ? 'fw-bold text-warning' : ''}`}
              to="/laporan"
            >
              Laporan Kualitas
            </NavLink>
          </div>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventori" element={<Inventori />} />
          <Route path="/inventori/:id" element={<DetailItem />} />
          {/* Route baru sesuai tugas no 3 */}
          <Route path="/laporan" element={<LaporanKualitas />} />
          {/* Handle 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

