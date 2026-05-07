import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './Halaman/Dashboard';
import Inventori from './Halaman/Inventori';
import NotFound from './Halaman/NotFound';
import DetailItem from './Halaman/DetailItem';

// Pastikan komponen Navbar ada di LUAR komponen App
function Navbar() {
  return (
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
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventori" element={<Inventori />} />
          <Route path="*" element={<NotFound />} />

          {/* LATIHAN 1: Route Dynamic */}
          <Route path="/inventori/:id" element={<DetailItem />} />

          {/* Halaman Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

