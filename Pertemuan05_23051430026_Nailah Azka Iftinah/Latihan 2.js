// Array data cacat produksi 
let daftarCacat = ["C-001", "C-005", "C-012", "C-001", "C-020"];

// Tampilkan badge semua abu dulu — belum ketahuan mana yang cacat
const daftarDiv = document.getElementById("badgeCacat");
daftarCacat.forEach(function (item) {
    const badge = document.createElement("span");
    badge.style.cssText =
        "background:#f0f0f0; color:#555; padding:5px 14px;" +
        "border-radius:20px; font-size:13px; font-weight:bold;";
    badge.textContent = item;
    daftarDiv.appendChild(badge);
});

function hitungCacat() {
    let jumlah = 0;

    // Loop dan counter sesuai instruksi latihan
    for (let i = 0; i < daftarCacat.length; i++) {
        if (daftarCacat[i] === "C-001") {
            jumlah++;
        }
    }

    // Setelah tombol dipencet — highlight C-001 jadi merah
    const badges = document.getElementById("badgeCacat").children;
    for (let i = 0; i < badges.length; i++) {
        if (badges[i].textContent === "C-001") {
            badges[i].style.cssText =
                "background:#e74c3c; color:white; padding:5px 14px;" +
                "border-radius:20px; font-size:13px; font-weight:bold;" +
                "box-shadow: 0 0 0 3px #f1948a;";
        }
    }

    // Tampilkan hasil
    let hasilDiv = document.getElementById("hasilCacat");
    hasilDiv.style.background = "#e8f5e9";
    hasilDiv.style.color = "#1e8449";
    hasilDiv.style.padding = "10px";
    hasilDiv.style.borderRadius = "8px";
    hasilDiv.innerHTML =
        "Daftar Cacat: " + JSON.stringify(daftarCacat) +
        "<br>Jumlah \"C-001\" muncul: <strong>" + jumlah + "</strong>";

    console.log("=== CEK CACAT ===");
    console.log("Data: " + JSON.stringify(daftarCacat));
    console.log("Jumlah C-001: " + jumlah);

    // Rekap tabel
    const emptyRow = document.getElementById("emptyRow");
    if (emptyRow) emptyRow.remove();

    const tbody = document.getElementById("rekapTable");
    tbody.innerHTML = "";

    const row1 = document.createElement("tr");
    row1.innerHTML =
        "<td>Daftar Cacat</td>" +
        "<td>" + JSON.stringify(daftarCacat) + "</td>";
    tbody.appendChild(row1);

    const row2 = document.createElement("tr");
    row2.innerHTML =
        "<td>Jumlah C-001</td>" +
        "<td><strong>" + jumlah + "</strong></td>";
    tbody.appendChild(row2);
}