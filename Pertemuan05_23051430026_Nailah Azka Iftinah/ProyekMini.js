// a. Array of Objects antrianMesin
let antrianMesin = [
  { idJob: "J01", namaProses: "Drilling", durasi: 30 },
  { idJob: "J02", namaProses: "Milling",  durasi: 45 },
  { idJob: "J03", namaProses: "Turning",  durasi: 25 },
];

function tampilkanTabelAntrian(antrian) {
  const emptyAntrian = document.getElementById("emptyAntrian");
  if (emptyAntrian) emptyAntrian.remove();

  const tbody = document.getElementById("tabelAntrian");
  tbody.innerHTML = "";
  antrian.forEach(function (job) {
    const row = document.createElement("tr");
    row.innerHTML =
      "<td><strong style='color:#9b59b6;'>" + job.idJob + "</strong></td>" +
      "<td>" + job.namaProses + "</td>" +
      "<td>" + job.durasi + "</td>";
    tbody.appendChild(row);
  });
}

function tambahLog(teks, tipe) {
  const log = document.getElementById("logProses");
  const placeholder = log.querySelector("p");
  if (placeholder) placeholder.remove();

  const div = document.createElement("div");
  div.className = "log-item " + (tipe || "");
  div.textContent = teks;
  log.appendChild(div);

  console.log(teks);
}

function setStatus(teks, persen) {
  document.getElementById("statusMesin").textContent = teks;
  document.getElementById("progressBar").style.width = persen + "%";
}

// b. Function prosesAntrian yang menerima parameter array
function prosesAntrian(antrian) {
  // c. Tampilkan pesan untuk setiap job
  antrian.forEach(function (job) {
    let pesan = "Memproses Job " + job.idJob +
      " - " + job.namaProses +
      " selama " + job.durasi + " menit";
    tambahLog(pesan);
  });
}

function jalankanSimulasi() {
  // Reset
  antrianMesin = [
    { idJob: "J01", namaProses: "Drilling", durasi: 30 },
    { idJob: "J02", namaProses: "Milling",  durasi: 45 },
    { idJob: "J03", namaProses: "Turning",  durasi: 25 },
  ];

  document.getElementById("logProses").innerHTML = "";
  document.getElementById("tabelAntrian").innerHTML = "";

  console.log("===== Antrian Awal (3 Job) =====");

  // Tampilkan tabel awal
  tampilkanTabelAntrian(antrianMesin);
  setStatus("Memproses antrian...", 40);

  // Panggil function pertama kali
  prosesAntrian(antrianMesin);

  // d. Tambah 1 job baru ke array
  let jobBaru = { idJob: "J04", namaProses: "Polishing", durasi: 20 };
  antrianMesin.push(jobBaru);

  tambahLog("Job baru ditambahkan ke antrian mesin", "baru");
  console.log("Job baru ditambahkan: " + jobBaru.idJob + " - " + jobBaru.namaProses);
  console.log("===== Antrian Setelah Penambahan (4 Job) =====");

  // Tampilkan tabel dengan job baru
  tampilkanTabelAntrian(antrianMesin);

  // d. Panggil function lagi
  prosesAntrian(antrianMesin);

  setStatus("Semua proses job telah selesai", 100);
  tambahLog("Semua job telah selesai diproses ✓", "selesai");
}