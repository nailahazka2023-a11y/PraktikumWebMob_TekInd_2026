import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Toggle (HP) */}
      <button
        className="btn btn-dark d-lg-none mb-3 w-100"
        onClick={() => setCollapsed((v) => !v)}
        type="button"
      >
        {collapsed ? 'Buka Menu' : 'Tutup Menu'}
      </button>

      <aside
        className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''} d-none d-lg-block`}
      >
        <div className="sidebar__logo mb-3">
          <div className="sidebar__logoBox">Pabrik</div>
          <div className="sidebar__logoText">Sistem Industri</div>
        </div>

        <nav className="sidebar__nav nav flex-column gap-2">
          <NavLink
            className={({ isActive }) =>
              `nav-link sidebar__link ${isActive ? 'active' : ''}`
            }
            to="/"
            end
          >
            Dashboard
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `nav-link sidebar__link ${isActive ? 'active' : ''}`
            }
            to="/inventori"
          >
            Inventori
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `nav-link sidebar__link ${isActive ? 'active' : ''}`
            }
            to="/laporan"
          >
            Laporan
          </NavLink>
        </nav>
      </aside>

      {/* Sidebar untuk HP (collapse) */}
      {collapsed ? null : (
        <aside className="sidebarMobile d-lg-none mb-3">
          <div className="sidebar__logo mb-3">
            <div className="sidebar__logoBox">Pabrik</div>
            <div className="sidebar__logoText">Sistem Industri</div>
          </div>
          <nav className="sidebar__nav nav flex-column gap-2">
            <NavLink
              className={({ isActive }) =>
                `nav-link sidebar__link ${isActive ? 'active' : ''}`
              }
              to="/"
              end
            >
              Dashboard
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `nav-link sidebar__link ${isActive ? 'active' : ''}`
              }
              to="/inventori"
            >
              Inventori
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `nav-link sidebar__link ${isActive ? 'active' : ''}`
              }
              to="/laporan"
            >
              Laporan
            </NavLink>
          </nav>
        </aside>
      )}
    </>
  );
}

export default Sidebar;

