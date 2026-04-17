const btnLoad = document.getElementById('btnLoad');
const btnAdd = document.getElementById('btnAdd');
const container = document.getElementById('containerKaryawan');
const loading = document.getElementById('loading');

const API_URL = 'https://jsonplaceholder.typicode.com/users';

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
            renderData(dataKaryawan);
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

    console.log("Mengirim data...");
    loading.classList.remove('d-none');

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(karyawanBaru),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => {
        if (!response.ok) throw new Error('Gagal mengirim data');
        return response.json();
    })
    .then(hasil => {
        console.log("Hasil POST:", hasil);

        alert(
            `Sukses! Karyawan baru berhasil terdaftar secara virtual.\n` +
            `Nama: ${hasil.name}\n` +
            `Email: ${karyawanBaru.email}\n` +
            `Perusahaan: ${karyawanBaru.company.name}\n` +
            `Kota: ${karyawanBaru.address.city}\n` +
            `ID Server: ${hasil.id}`
        );

        // 🔥 TAMBAH KE TAMPILAN (INI YANG BIKIN MUNCUL)
        renderData([karyawanBaru]);
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat menambah data.");
    })
    .finally(() => {
        loading.classList.add('d-none');
    });
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