import React from 'react';

function HeaderUser() {
  return (
    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
      <div>
        <div className="fw-bold fs-5">User Profile</div>
        <div className="text-secondary">Nailah Azka Iftinah • 23051430026</div>
      </div>
      <div className="d-flex align-items-center gap-2">
        <div
          className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center"
          style={{ width: 40, height: 40 }}
        >
          NA
        </div>
        <div className="me-2 d-none d-md-block">
          <span className="fw-semibold">Admin</span>
        </div>
      </div>
    </div>
  );
}

export default HeaderUser;

