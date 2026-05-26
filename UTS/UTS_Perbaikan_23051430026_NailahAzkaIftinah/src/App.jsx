import React, { useState,useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Dashboard from './pages/Dashboard';
import InputLaporan from './pages/InputLaporan';
import RiwayatData from './pages/RiwayatData';

const STORAGE_KEY = 'DATA_LAPORAN_PRODUKSI';

function App() {
  const [dataLaporan, setDataLaporan] = useState(() => {
    const dataLokal = localStorage.getItem(STORAGE_KEY);
    return dataLokal ? JSON.parse(dataLokal) : [];
  });

  const tambahLaporan = (dataBaru) => {
    const updateData = [dataBaru, ...dataLaporan];
    setDataLaporan(updateData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updateData));
  };

  const hapusLaporan = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      const updateData = dataLaporan.filter(item => item.id !== id);
      setDataLaporan(updateData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updateData));
    }
  };

  const hapusSemuaLaporan = () => {
    if (window.confirm("Apakah Anda yakin ingin MENGHAPUS SEMUA DATA?")) {
      setDataLaporan([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid px-4 mt-4">
        <Routes>
          <Route path="/" element={<Dashboard data={dataLaporan} />} />
          <Route path="/input" element={<InputLaporan onTambahData={tambahLaporan} />} />
          <Route 
            path="/riwayat" 
            element={
              <RiwayatData 
                data={dataLaporan} 
                onHapus={hapusLaporan} 
                onHapusSemua={hapusSemuaLaporan} 
              />
            } 
          />
        </Routes>
      </div>
    </>
  );
}

export default App;