let rekapCount = 0;

document.getElementById("formProduksi").addEventListener("submit", function (event) {

    event.preventDefault();

    let biayaBahanBaku   = Number(document.getElementById("bahanBaku").value);
    let biayaTenagaKerja = Number(document.getElementById("tenagaKerja").value);
    let biayaOverhead    = Number(document.getElementById("overhead").value);
    let totalProduksi    = Number(document.getElementById("jumlahProduksi").value);

    let output = document.getElementById("hasilOutput");

    // Validasi tidak boleh negatif
    if (biayaBahanBaku < 0 || biayaTenagaKerja < 0 || biayaOverhead < 0) {
        output.textContent = "Biaya tidak boleh bernilai negatif.";
        return;
    }

    // Validasi jumlah produksi
    if (totalProduksi <= 0) {
        output.textContent = "Jumlah produksi tidak valid.";
        console.log("Jumlah produksi tidak valid.");
        return;
    }

    // Perhitungan
    let totalPerUnit =
        (biayaBahanBaku + biayaTenagaKerja + biayaOverhead) / totalProduksi;

    // Logika if/else
    let status;
    if (totalProduksi < 100) {
        status = "Biaya Tinggi (Ekonomi Skala Kecil)";
    } else {
        status = "Biaya Efisien";
    }

    // Warna status untuk hasil perhitungan
    const statusStyle = totalProduksi < 100
        ? "color:#d97706; font-weight:700;"
        : "color:#059669; font-weight:700;";

    // Tampilkan hasil dengan warna status
    output.innerHTML =
        "Total Biaya per Unit: Rp " +
        totalPerUnit.toLocaleString("id-ID", { minimumFractionDigits: 2 }) +
        "<br>Status Produksi: <span style='" + statusStyle + "'>" + status + "</span>";

    // Console log
    console.log("===== HASIL PERHITUNGAN =====");
    console.log("Biaya Bahan Baku: Rp", biayaBahanBaku.toLocaleString("id-ID"));
    console.log("Biaya Tenaga Kerja: Rp", biayaTenagaKerja.toLocaleString("id-ID"));
    console.log("Biaya Overhead: Rp", biayaOverhead.toLocaleString("id-ID"));
    console.log("Jumlah Produksi:", totalProduksi, "unit");
    console.log("Total Biaya per Unit: Rp", totalPerUnit.toFixed(2));
    console.log("Status Produksi:", status);
    console.log("=============================");

    // Tambah ke rekap tabel
    rekapCount++;

    const today = new Date();
    const tanggal = today.toLocaleDateString("id-ID", {
        day: "numeric", month: "numeric", year: "numeric"
    });

    function formatRp(num) {
        return "Rp " + num.toLocaleString("id-ID", { minimumFractionDigits: 0 });
    }

    const badgeStyle = totalProduksi < 100
        ? "background:#fef3c7; color:#d97706; padding:3px 10px; border-radius:8px; font-size:0.82rem; font-weight:600;"
        : "background:#d1fae5; color:#059669; padding:3px 10px; border-radius:8px; font-size:0.82rem; font-weight:600;";

    // Hapus empty row
    const emptyRow = document.getElementById("emptyRow");
    if (emptyRow) emptyRow.remove();

    // Tambah baris baru
    const rekapTable = document.getElementById("rekapTable");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${rekapCount}</td>
        <td>${tanggal}</td>
        <td>${formatRp(biayaBahanBaku)}</td>
        <td>${formatRp(biayaTenagaKerja)}</td>
        <td>${formatRp(biayaOverhead)}</td>
        <td>${totalProduksi} unit</td>
        <td><strong>Rp ${totalPerUnit.toLocaleString("id-ID", { minimumFractionDigits: 2 })}</strong></td>
        <td><span style="${badgeStyle}">${status}</span></td>
    `;
    rekapTable.appendChild(row);
});