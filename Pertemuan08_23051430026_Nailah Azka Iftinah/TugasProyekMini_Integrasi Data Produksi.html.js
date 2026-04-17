class SistemLaporanInsiden {
    constructor() {
        this.URL_API = 'https://jsonplaceholder.typicode.com/posts?_limit=10';

        this.dataTambahan = JSON.parse(localStorage.getItem("dataTambahan")) || [];
        this.dataAwal = [];
        this.dataSemua = [];

        this.init();
    }

    init() {
        this.btnMuat = document.getElementById("btnMuatLaporan");
        this.btnSimpan = document.getElementById("btnSimpan");
        this.btnReset = document.getElementById("btnReset");
        this.searchInput = document.getElementById("searchInput");
        this.filterStatus = document.getElementById("filterStatus");
        this.loading = document.getElementById("loading");

        this.btnMuat.onclick = () => this.loadData();
        this.btnSimpan.onclick = () => this.tambahData();
        this.btnReset.onclick = () => this.resetData();
        this.searchInput.oninput = () => this.applyFilter();
        this.filterStatus.onchange = () => this.applyFilter();
    }

    async loadData() {
        this.loading.classList.remove('d-none');

        try {
            const res = await fetch(this.URL_API);
            const data = await res.json();

            this.dataAwal = data.map((_, i) => {
                const tgl = new Date(2026, 0, i + 1);
                const formatTanggal = tgl.toISOString().split("T")[0];

                return {
                    id: i + 1,
                    judul: [
                        "Mesin Conveyor Berhenti Mendadak",
                        "Kebocoran Oli Mesin Produksi",
                        "Sensor Suhu Tidak Stabil",
                        "Gangguan Listrik Panel",
                        "Overheat Mesin"
                    ][i % 5],
                    deskripsi: "Terjadi gangguan pada proses produksi yang memerlukan penanganan segera.",
                    operator: this.generateOperator(i),
                    status: this.generateStatus(i),
                    tanggal: formatTanggal,
                    jam: (8 + i).toString().padStart(2, '0') + ":00"
                };
            });

            this.dataSemua = [...this.dataTambahan, ...this.dataAwal];
            this.render(this.dataSemua);

        } catch (err) {
            alert("Gagal mengambil data dari API");
        }

        this.loading.classList.add('d-none');
    }

    generateOperator(i) {
        const ops = [
            "Andi Saputra","Budi Santoso","Citra Lestari","Dedi Prasetyo",
            "Eka Wulandari","Fajar Nugroho","Gina Maharani","Hendra Wijaya",
            "Intan Permata","Joko Susilo"
        ];

        return {
            nama: ops[i % ops.length],
            email: ops[i % ops.length].toLowerCase().replace(" ", ".") + "@pabrik.com",
            perusahaan: "PT Industri Maju",
            kota: "Bekasi",
            shift: ["Pagi","Siang","Malam"][i % 3]
        };
    }

    generateStatus(i) {
        const s = [
            { nama:"Diproses", warna:"warning", ket:"Insiden sedang dalam proses investigasi oleh tim maintenance." },
            { nama:"Selesai", warna:"success", ket:"Insiden telah berhasil ditangani dan sistem kembali normal." },
            { nama:"Tertunda", warna:"secondary", ket:"Penanganan ditunda karena menunggu sparepart atau persetujuan manajemen." }
        ];
        return s[i % 3];
    }

    render(data) {
        const konten = document.getElementById("kontenLaporan");
        konten.innerHTML = "";

        data.forEach(l => {
            konten.innerHTML += `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <div class="card-header bg-danger text-white">
                        Laporan No. ${l.id}
                    </div>

                    <div class="card-body">
                        <h5>${l.judul}</h5>
                        <p>${l.deskripsi}</p>

                        <p class="fw-bold text-primary" onclick="showOp(${l.id})" style="cursor:pointer">
                            Operator: ${l.operator.nama}
                        </p>

                        <p>Tanggal: ${l.tanggal}</p>
                        <p>Jam: ${l.jam}</p>

                        <span class="badge bg-${l.status.warna}">
                            ${l.status.nama}
                        </span>

                        <button onclick="showTin(${l.id})" class="btn btn-danger w-100 mt-2">
                            Tindak Lanjut
                        </button>
                    </div>
                </div>
            </div>
            `;
            window["d"+l.id] = l;
        });
    }

    applyFilter() {
        let hasil = this.dataSemua;
        const key = this.searchInput.value.toLowerCase();
        const status = this.filterStatus.value;

        if (key) hasil = hasil.filter(d => d.judul.toLowerCase().includes(key));
        if (status !== "semua") hasil = hasil.filter(d => d.status.nama === status);

        this.render(hasil);
    }

    tambahData() {
        const judul = document.getElementById("inputJudul").value;
        const desk = document.getElementById("inputDesk").value;

        if (!judul || !desk) {
            alert("Judul dan Deskripsi wajib diisi");
            return;
        }

        const nama = document.getElementById("selectNama").value ||
                     document.getElementById("inputNama").value;

        const lastId = this.dataSemua.length > 0
            ? Math.max(...this.dataSemua.map(d => d.id))
            : 0;

        const newId = lastId + 1;

        const newData = {
            id: newId,
            judul: judul,
            deskripsi: desk,
            operator: {
                nama: nama,
                email: document.getElementById("inputEmail").value,
                perusahaan: document.getElementById("inputPerusahaan").value,
                kota: document.getElementById("inputKota").value,
                shift: document.getElementById("inputShift").value
            },
            status: this.generateStatus(0),
            tanggal: document.getElementById("inputTanggal").value,
            jam: document.getElementById("inputJam").value
        };

        this.dataTambahan.unshift(newData);
        localStorage.setItem("dataTambahan", JSON.stringify(this.dataTambahan));

        this.dataSemua.unshift(newData);
        this.render(this.dataSemua);

        this.resetForm();

        const modal = bootstrap.Modal.getInstance(document.getElementById('modalTambah'));
        modal.hide();
    }

    resetForm() {
        document.getElementById("inputJudul").value = "";
        document.getElementById("inputDesk").value = "";
        document.getElementById("selectNama").value = "";
        document.getElementById("inputNama").value = "";
        document.getElementById("inputEmail").value = "";
        document.getElementById("inputPerusahaan").value = "";
        document.getElementById("inputKota").value = "";
        document.getElementById("inputShift").value = "Pagi";
        document.getElementById("inputTanggal").value = "";
        document.getElementById("inputJam").value = "";
    }

    resetData() {
        const yakin = confirm("Apakah Anda yakin ingin mereset semua data?");
        if (!yakin) return;

        localStorage.removeItem("dataTambahan");
        this.dataTambahan = [];
        this.dataSemua = this.dataAwal;
        this.render(this.dataSemua);
    }
}

function showOp(id){
    const d = window["d"+id];
    document.getElementById("isiOperator").innerHTML = `
        <p>Nama: ${d.operator.nama}</p>
        <p>Email: ${d.operator.email}</p>
        <p>Perusahaan: ${d.operator.perusahaan}</p>
        <p>Kota: ${d.operator.kota}</p>
        <p>Shift: ${d.operator.shift}</p>
    `;
    new bootstrap.Modal(document.getElementById("modalOperator")).show();
}

function showTin(id){
    const d = window["d"+id];
    document.getElementById("isiTindak").innerHTML = `
        <p><strong>Status:</strong> ${d.status.nama}</p>
        <p>${d.status.ket}</p>
        <p>Tiket ID ${id} sedang diproses oleh Tim Maintenance.</p>
    `;
    new bootstrap.Modal(document.getElementById("modalTindak")).show();
}

new SistemLaporanInsiden();