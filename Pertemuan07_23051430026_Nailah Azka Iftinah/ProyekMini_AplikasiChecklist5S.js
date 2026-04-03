// 1. Seleksi Elemen
const formAudit = document.getElementById('form5S');
const tabelBody = document.getElementById('tabelAudit');
const btnHapusSemua = document.getElementById('hapusSemua');

// Kunci untuk LocalStorage
const STORAGE_KEY = 'DATA_AUDIT_5S';

// Load data saat halaman dibuka
document.addEventListener('DOMContentLoaded', function () {
    loadDataFromStorage();
});

// 2. Event Listener: Submit Form
formAudit.addEventListener('submit', function (event) {
    event.preventDefault();

    const auditor = document.getElementById('auditor').value;

    // Hitung skor dari checkbox yang dicentang
    const seiri    = document.getElementById('seiri').checked;
    const seiton   = document.getElementById('seiton').checked;
    const seiso    = document.getElementById('seiso').checked;
    const seiketsu = document.getElementById('seiketsu').checked;
    const shitsuke = document.getElementById('shitsuke').checked;

    const jumlahCentang = [seiri, seiton, seiso, seiketsu, shitsuke]
        .filter(item => item === true).length;

    const skor = (jumlahCentang / 5) * 100;

    // Buat Object Data
    const dataBaru = {
        id: Date.now(),
        tanggal: new Date().toLocaleDateString('id-ID'),
        auditor: auditor,
        skor: skor
    };

    saveData(dataBaru);
    formAudit.reset();
    loadDataFromStorage();
});

// 3. Fungsi Simpan ke LocalStorage
function saveData(data) {
    let dataLama = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    dataLama.push(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataLama));
}

// 4. Fungsi Render Tabel
function renderTable(data) {
    tabelBody.innerHTML = '';
    data.forEach(function (item) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.tanggal}</td>
            <td>${item.auditor}</td>
            <td>${item.skor}%</td>
            <td>
                <button class="btn btn-sm btn-danger"
                onclick="hapusData(${item.id})">Hapus</button>
            </td>
        `;
        tabelBody.appendChild(row);
    });
}

// 5. Fungsi Load dari Storage lalu Render
function loadDataFromStorage() {
    let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    renderTable(data);
}

// 6. Fungsi Hapus Data Spesifik
window.hapusData = function (id) {
    if (confirm('Yakin ingin menghapus data audit ini?')) {
        let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        let dataBaru = data.filter(item => item.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataBaru));
        loadDataFromStorage();
    }
}

// 7. Event Hapus Semua
btnHapusSemua.addEventListener('click', function () {
    if (confirm('PERINGATAN: Semua data audit akan dihapus permanen!')) {
        localStorage.removeItem(STORAGE_KEY);
        loadDataFromStorage();
    }
});