export function generateProduksiByJam({ startLabel = '08:00', hours = 6, base = 150 } = {}) {
  // deterministic-ish random based on current time bucket
  const seed = Math.floor(Date.now() / (1000 * 60 * 10)); // update every 10 minutes
  const rand = (i) => {
    const x = Math.sin(seed + i * 999) * 10000;
    return x - Math.floor(x);
  };

  // build labels from startLabel like 08:00
  const [hh] = startLabel.split(':').map(Number);
  const labels = Array.from({ length: hours }, (_, idx) => {
    const v = hh + idx;
    const pad = String(v).padStart(2, '0');
    return `${pad}:00`;
  });

  const data = labels.map((_, i) => {
    const jitter = (rand(i) - 0.5) * 80; // [-40..40]
    const target = base;
    return Math.max(0, Math.round(target + jitter));
  });

  const targetLine = Array.from({ length: hours }, () => base);

  return { labels, data, targetLine };
}

export async function fetchMockProduksi() {
  // mock API delay
  await new Promise((r) => setTimeout(r, 250));
  return generateProduksiByJam({ startLabel: '08:00', hours: 6, base: 150 });
}

