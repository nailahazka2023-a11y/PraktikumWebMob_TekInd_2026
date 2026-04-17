const btnLoad = document.getElementById('btnLoad');
const btnAdd = document.getElementById('btnAdd');
const btnFilter = document.getElementById('btnFilter');
const btnReset = document.getElementById('btnReset');
const inputFilter = document.getElementById('inputFilter');
const container = document.getElementById('containerKaryawan');
const loading = document.getElementById('loading');

const API_URL = 'https://jsonplaceholder.typicode.com/users';

let semuaData = [];


// =======================
// GET DATA (LOAD)
// =======================
btnLoad.addEventListener('click', function () {
    loading.classList.remove('d-none');
    container.innerHTML = '';

    fetch(API_URL)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Gagal mengambil data dari server');
            }
            return response.json();
        })
        .then(function (dataKaryawan) {
            console.log("Data diterima:", dataKaryawan);
            semuaData = dataKaryawan;
            renderData(semuaData);
        })
        .catch(function (error) {
            container.innerHTML = `
                <div class="alert alert-danger">
                    Error: ${error.message}
                </div>
            `;
        })
        .finally(function () {
            loading.classList.add('d-none');
        });
});


// =======================
// POST DATA (TAMBAH)
// =======================
btnAdd.addEventListener('click', function () {

    const karyawanBaru = {
        name: "Budi Utomo (User Baru)",
        email: "budi.utomo@industri.com",
        company: { name: "PT. Maju Digital" },
        address: { city: "Yogyakarta" }
    };

    loading.classList.remove('d-none');

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(karyawanBaru),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(function (response) {
        if (!response.ok) throw new Error('Gagal mengirim data');
        return response.json();
    })
    .then(function (hasil) {
        console.log("Hasil POST:", hasil);

        alert(
            `Sukses! Karyawan baru berhasil terdaftar secara virtual.\n` +
            `Nama: ${hasil.name}\n` +
            `Email: ${karyawanBaru.email}\n` +
            `Perusahaan: ${karyawanBaru.company.name}\n` +
            `Kota: ${karyawanBaru.address.city}\n` +
            `ID Server: ${hasil.id}`
        );

        semuaData.push(karyawanBaru);
        renderData([karyawanBaru]);
    })
    .catch(function (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat menambah data.");
    })
    .finally(function () {
        loading.classList.add('d-none');
    });
});


// =======================
// FILTER KOTA (SEARCH)
// =======================
btnFilter.addEventListener('click', function () {
    const keyword = inputFilter.value.toLowerCase().trim();

    if (keyword === '') {
        alert('Masukkan kata kunci filter terlebih dahulu.');
        return;
    }

    if (semuaData.length === 0) {
        alert('Data belum dimuat. Klik "Muat Data dari API" terlebih dahulu.');
        return;
    }

    // filter() sebelum forEach sesuai instruksi Latihan 2
    const dataFilter = semuaData.filter(function (karyawan) {
        return karyawan.address.city.toLowerCase().includes(keyword);
    });

    console.log(`Hasil filter kota mengandung "${keyword}":`, dataFilter);

    container.innerHTML = '';

    if (dataFilter.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning">
                    Tidak ada karyawan dengan kota yang mengandung "<strong>${keyword}</strong>".
                </div>
            </div>
        `;
        return;
    }

    renderData(dataFilter);
});

// Tekan Enter di input juga bisa trigger filter
inputFilter.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') btnFilter.click();
});


// =======================
// RESET FILTER
// =======================
btnReset.addEventListener('click', function () {
    inputFilter.value = '';
    container.innerHTML = '';

    if (semuaData.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info">
                    Klik "Muat Data dari API" untuk menampilkan data.
                </div>
            </div>
        `;
        return;
    }

    renderData(semuaData);
});


// =======================
// RENDER DATA
// =======================
function renderData(data) {
    data.forEach(function (karyawan) {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-3';

        col.innerHTML = `
            <div class="card shadow-sm">
                <div class="card-body">
                    <h5 class="card-title text-primary">${karyawan.name}</h5>
                    <p class="card-text">
                        <strong>Email:</strong> ${karyawan.email}<br>
                        <strong>Perusahaan:</strong> ${karyawan.company.name}<br>
                        <strong>Kota:</strong> ${karyawan.address.city}
                    </p>
                    <button class="btn btn-outline-primary btn-sm">
                        Detail Profil
                    </button>
                </div>
            </div>
        `;

        container.appendChild(col);
    });
}