import React, { useState } from 'react';

function InputLaporan({ onTambahData }) {
  const [tanggal, setTanggal] = useState('');
  const [shift, setShift] = useState('Pagi');
  const [namaMesin, setNamaMesin] = useState('');
  const [jumlahProduksi, setJumlahProduksi] = useState('');
  const [jumlahReject, setJumlahReject] = useState('');

  const produksiNum = parseInt(jumlahProduksi) || 0;
  const rejectNum = parseInt(jumlahReject) || 0;

  const netto = produksiNum - rejectNum;
  const yieldPercentage = produksiNum > 0 ? ((netto / produksiNum) * 100).toFixed(2) : '0.00';

  const isRejectInvalid = rejectNum > produksiNum;
  const isFormEmpty = !tanggal || !namaMesin || !jumlahProduksi || !jumlahReject;
  const isSubmitDisabled = isFormEmpty || isRejectInvalid;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    const dataBaru = {
      id: Date.now(),
      tanggal,
      shift,
      namaMesin,
      jumlahProduksi: produksiNum,
      jumlahReject: rejectNum,
      netto,
      yieldPercentage: parseFloat(yieldPercentage)
    };

    console.log(dataBaru);
    onTambahData(dataBaru);
    alert("Data berhasil disimpan!");

    setTanggal('');
    setShift('Pagi');
    setNamaMesin('');
    setJumlahProduksi('');
    setJumlahReject('');
  };

  return (
    <div className="card p-4 shadow-sm" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="mb-4 text-center fw-bold">Input Laporan</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 text-start">
          <label className="form-label fw-semibold">Tanggal</label>
          <input 
            type="date" 
            className="form-control" 
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            onClick={(e) => e.target.showPicker()} 
          />
        </div>

        <div className="mb-3 text-start">
          <label className="form-label fw-semibold">Shift</label>
          <select 
            className="form-select" 
            value={shift}
            onChange={(e) => setShift(e.target.value)}
          >
            <option>Pagi</option>
            <option>Siang</option>
            <option>Malam</option>
          </select>
        </div>

        <div className="mb-3 text-start">
          <label className="form-label fw-semibold">Nama Mesin</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Masukkan tipe mesin" 
            value={namaMesin}
            onChange={(e) => setNamaMesin(e.target.value)}
          />
        </div>

        <div className="mb-3 text-start">
          <label className="form-label fw-semibold">Jumlah Produksi</label>
          <input 
            type="number" 
            className="form-control" 
            min="0" 
            placeholder="Masukkan jumlah produksi contoh : 200" 
            value={jumlahProduksi}
            onChange={(e) => setJumlahProduksi(e.target.value)}
          />
        </div>

        <div className="mb-3 text-start">
          <label className="form-label fw-semibold">Jumlah Reject</label>
          <input 
            type="number" 
            className={`form-control ${isRejectInvalid ? 'is-invalid' : ''}`} 
            min="0" 
            placeholder="Masukkan jumlah reject contoh : 15" 
            value={jumlahReject}
            onChange={(e) => setJumlahReject(e.target.value)}
          />
          {isRejectInvalid && (
            <div className="invalid-feedback">
              Jumlah reject tidak boleh melebihi jumlah produksi!
            </div>
          )}
        </div>

        <div className="p-3 bg-light rounded mb-3 text-start">
          <div className="d-flex justify-content-between mb-2">
            <span className="fw-medium">Netto:</span>
            <span className="fw-bold text-primary">{netto}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span className="fw-medium">Yield (%):</span>
            <span className="fw-bold text-success">{yieldPercentage}%</span>
          </div>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary w-100 fw-bold mt-2"
          disabled={isSubmitDisabled}
        >
          Simpan
        </button>
      </form>
    </div>
  );
}

export default InputLaporan;