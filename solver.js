const DESIGN_LIMITS = {
  frequency: [1, 1000], width: [60, 1200], depth: [60, 1200],
  cavityHeight: [3, 1800], neckDiameter: [4, 40], neckLength: [8, 120],
};
const DESIGN_VARIABLES = Object.keys(DESIGN_LIMITS);
const DESIGN_WEIGHTS = { width: 1, depth: 1, cavityHeight: 1, neckDiameter: 4, neckLength: 4 };

function acousticFrequency(layout, values) {
  const n = { ...layout, ...values, wall: 7, bottom: 3, lid: 7 };
  if (DESIGN_VARIABLES.some(key => !Number.isFinite(values[key]) || values[key] <= 0)) return NaN;
  if (n.shape === 'svg' && (!Array.isArray(n.customPoints) || n.customPoints.length < 8)) return NaN;
  const neckWall = n.coverPlacement === 'back' ? n.bottom : n.lid;
  if (n.neckLength <= neckWall) return NaN;
  let section;
  try { section = polygonArea(profilePaths(n).inner); } catch { return NaN; }
  const radius = n.neckDiameter / 2;
  const displaced = n.neckDirection === 'inward' ? Math.PI * (radius + n.wall) ** 2 * (n.neckLength - neckWall) : 0;
  const airVolume = section * n.cavityHeight - displaced;
  if (section <= 0 || airVolume <= 0) return NaN;
  const effectiveLength = n.neckLength + 1.46 * radius;
  const speed = (SPEED_AT_ZERO + 0.606 * Number(n.temperature ?? 20)) * 1000;
  return speed / (2 * Math.PI) * Math.sqrt(Math.PI * radius ** 2 / (airVolume * effectiveLength));
}

function calculateDesign(layout, values) {
  const frequency = acousticFrequency(layout, values);
  if (!Number.isFinite(frequency)) return { errors: ['Wybrane wymiary nie tworzą poprawnej komory.'] };
  return calculate({ ...layout, ...values, frequency, wall: 7, bottom: 3, lid: 7, margin: 5 });
}

function solveDesign(layout, values, locks, driver) {
  const next = { ...values };
  const round = layout.shape === 'round';
  if (round && Math.abs(next.width - next.depth) > 1e-7) {
    if (locks.width && locks.depth) return { error: 'Okrąg wymaga jednakowej szerokości i głębokości; obie wartości są zablokowane.' };
    if (locks.depth) next.width = next.depth;
    else next.depth = next.width;
  }
  const target = next.frequency;
  const free = ['width', 'depth', 'cavityHeight', 'neckDiameter', 'neckLength']
    .filter(key => key !== driver && !locks[key] && (!round || (key !== 'depth' && (key !== 'width' || !locks.depth))));
  const residual = state => Math.log(acousticFrequency(layout, state) / target);
  for (let iteration = 0; iteration < 40; iteration++) {
    const error = residual(next);
    if (Number.isFinite(error) && Math.abs(error) < 1e-5) {
      const result = calculateDesign(layout, next);
      return result.errors.length ? { error: result.errors[0] } : { values: next, result };
    }
    if (!free.length || !Number.isFinite(error)) break;
    const gradient = {};
    let denominator = 0;
    for (const key of free) {
      const value = next[key], step = 0.0005;
      const high = { ...next, [key]: value * Math.exp(step) };
      const low = { ...next, [key]: value * Math.exp(-step) };
      if (round && key === 'width') { high.depth = high.width; low.depth = low.width; }
      const a = acousticFrequency(layout, high), b = acousticFrequency(layout, low);
      if (!Number.isFinite(a) || !Number.isFinite(b)) continue;
      const derivative = (Math.log(a) - Math.log(b)) / (2 * step);
      const desiredDirection = -error * derivative;
      const [minimum, maximum] = DESIGN_LIMITS[key];
      if ((value <= minimum + 1e-7 && desiredDirection < 0) || (value >= maximum - 1e-7 && desiredDirection > 0)) continue;
      gradient[key] = derivative;
      denominator += derivative ** 2 / (DESIGN_WEIGHTS[key] + (round && key === 'width' ? 1 : 0));
    }
    if (denominator < 1e-12) break;
    let progress = false;
    for (const [key, derivative] of Object.entries(gradient)) {
      const [minimum, maximum] = DESIGN_LIMITS[key];
      const weight = DESIGN_WEIGHTS[key] + (round && key === 'width' ? 1 : 0);
      const delta = Math.max(-0.18, Math.min(0.18, -error * derivative / weight / denominator));
      const value = Math.max(minimum, Math.min(maximum, next[key] * Math.exp(delta)));
      progress ||= Math.abs(value - next[key]) > 1e-9;
      next[key] = value;
      if (round && key === 'width') next.depth = value;
    }
    if (!progress) break;
  }
  if (driver !== 'frequency' && !locks.frequency) {
    const frequency = acousticFrequency(layout, next);
    if (Number.isFinite(frequency) && frequency >= DESIGN_LIMITS.frequency[0] && frequency <= DESIGN_LIMITS.frequency[1]) {
      next.frequency = frequency;
      const result = calculateDesign(layout, next);
      if (!result.errors.length) return { values: next, result };
    }
  }
  return { error: 'Nie da się zachować częstotliwości przy tych blokadach i zakresach suwaków.' };
}
