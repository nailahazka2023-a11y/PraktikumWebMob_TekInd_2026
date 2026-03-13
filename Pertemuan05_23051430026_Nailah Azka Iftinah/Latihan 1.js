// Function menghitung luas dan keliling lingkaran
function hitungLingkaran(jariJari) {
  let phi = Math.PI;

  let luas = phi * jariJari * jariJari;
  let keliling = 2 * phi * jariJari;

  return {
    luas: luas.toFixed(2),
    keliling: keliling.toFixed(2),
  };
}

let rekapCount = 0;

// Function untuk mengambil input dari HTML
function hitung() {
  let r = document.getElementById("jariJari").value;

  if (r === "" || r <= 0) {
    alert("Jari-jari tidak boleh minus atau nol!");
    return;
  }

  let hasil = hitungLingkaran(Number(r));

  document.getElementById("luas").innerHTML =
    "Luas : " + hasil.luas + " cm²";
  document.getElementById("keliling").innerHTML =
    "Keliling : " + hasil.keliling + " cm";

  console.log("===== HASIL KALKULATOR LINGKARAN =====");
  console.log("Jari-jari: " + r + " cm");
  console.log("Luas: " + hasil.luas + " cm²");
  console.log("Keliling: " + hasil.keliling + " cm");
  console.log("=======================================");

  rekapCount++;

  const emptyRow = document.getElementById("emptyRow");
  if (emptyRow) emptyRow.remove();

  const rekapTable = document.getElementById("rekapTable");
  const row = document.createElement("tr");
  row.innerHTML =
    "<td>" + rekapCount + "</td>" +
    "<td>" + r + " cm</td>" +
    "<td>" + hasil.luas + " cm²</td>" +
    "<td>" + hasil.keliling + " cm</td>";
  rekapTable.appendChild(row);
}

// Tekan Enter di input langsung hitung
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("jariJari").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      hitung();
    }
  });
});