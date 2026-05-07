import { Routes, Route, NavLink } from 'react-router-dom';
import NotFound from './Halaman/NotFound';
import Dashboard from './Halaman/Dashboard';
import Inventori from './Halaman/Inventori';

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

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventori" element={<Inventori />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

