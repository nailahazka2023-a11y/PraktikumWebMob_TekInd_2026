export function formatTanggalISO(d) {
  // yyyy-mm-dd
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function statusStok(stok, batasMinimum) {
  if (stok <= 0) return { label: 'Habis', tone: 'danger' };
  if (stok <= batasMinimum) return { label: 'Menipis', tone: 'warning' };
  return { label: 'Aman', tone: 'success' };
}

