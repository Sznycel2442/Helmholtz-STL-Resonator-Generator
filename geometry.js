const SPEED_AT_ZERO = 331.3;

function calculate(input) {
  const n = Object.fromEntries(Object.entries(input).map(([key, value]) => [key, ['shape', 'environment', 'neckDirection', 'coverPlacement', 'customPoints', 'wallMount'].includes(key) ? value : Number(value)]));
  n.neckDirection ||= 'outward';
  n.coverPlacement ||= 'neck';
  n.pinClearance ??= 0.25;
  if (!Number.isFinite(n.width) && Number.isFinite(n.diameter)) n.width = n.diameter;
  if (!Number.isFinite(n.depth) && Number.isFinite(n.diameter)) n.depth = n.shape === 'hex' ? 2 * n.diameter / Math.sqrt(3) : n.diameter;
  if (!Number.isFinite(n.diameter)) n.diameter = n.width;
  const errors = [];
  const positive = {
    frequency: 'częstotliwość', neckDiameter: 'średnica otworu szyjki', neckLength: 'długość szyjki',
    wall: 'grubość ścianek', bottom: 'grubość dna', lid: 'grubość pokrywy',
    bedX: 'pole robocze X', bedY: 'pole robocze Y', bedZ: 'pole robocze Z',
  };
  for (const [key, label] of Object.entries(positive)) if (!Number.isFinite(n[key]) || n[key] <= 0) errors.push(`Podaj dodatnią wartość: ${label}.`);
  if (['wall', 'bottom', 'lid'].some(key => Number.isFinite(n[key]) && n[key] > 0 && n[key] < 0.8)) errors.push('Ścianki, dno i pokrywa muszą mieć co najmniej 0,8 mm grubości.');
  if (!['round', 'box', 'hex', 'ellipse', 'octagon', 'rounded', 'svg'].includes(n.shape)) errors.push('Nieznany kształt korpusu.');
  if (!Number.isFinite(n.width) || n.width <= 0 || !Number.isFinite(n.depth) || n.depth <= 0) errors.push('Podaj szerokość i głębokość korpusu.');
  if (n.shape === 'svg' && (!Array.isArray(n.customPoints) || n.customPoints.length < 8)) errors.push('Zaimportuj poprawny obrys SVG.');
  if (!Number.isFinite(n.temperature) || n.temperature < -20 || n.temperature > 50) errors.push('Temperatura musi mieścić się w zakresie −20–50 °C.');
  if (!Number.isFinite(n.margin) || n.margin < 0) errors.push('Margines stołu nie może być ujemny.');
  if (!Number.isFinite(n.pinClearance) || n.pinClearance < 0.1 || n.pinClearance > 0.4) errors.push('Luz kołków musi wynosić 0,1–0,4 mm na stronę.');
  const dowelDiameter = 4, dowelLength = 8, socketDepth = 4.25;
  const socketDiameter = dowelDiameter + 2 * n.pinClearance;
  if (Number.isFinite(socketDiameter) && n.wall < socketDiameter + 2) errors.push('Ścianka jest za cienka na gniazda kołków.');
  if (n.lid < socketDepth + 1.5) errors.push('Pokrywa jest za cienka na gniazda kołków.');
  if (errors.length) return { errors };

  const { outer, inner } = profilePaths(n);
  const outerBounds = boundsOf(outer), innerBounds = boundsOf(inner);
  const innerWidth = innerBounds.maxX - innerBounds.minX;
  const innerDepth = innerBounds.maxY - innerBounds.minY;
  if (innerWidth <= 0 || innerDepth <= 0 || polygonArea(inner) < 100) errors.push('Ścianka jest zbyt gruba względem korpusu.');
  const neckWall = n.coverPlacement === 'back' ? n.bottom : n.lid;
  if (n.neckLength <= neckWall) errors.push('Długość szyjki musi być większa od grubości ścianki z szyjką.');
  if (n.neckDiameter / 2 + n.wall >= centerClearance(inner)) errors.push('Szyjka jest zbyt szeroka dla wnętrza korpusu.');
  if (errors.length) return { errors };

  const radius = n.neckDiameter / 2;
  const area = Math.PI * radius ** 2;
  const effectiveLength = n.neckLength + (0.61 + 0.85) * radius;
  const soundSpeed = (SPEED_AT_ZERO + 0.606 * n.temperature) * 1000;
  const volume = area / effectiveLength * (soundSpeed / (2 * Math.PI * n.frequency)) ** 2;
  const section = polygonArea(inner);
  const neckExtension = n.neckLength - neckWall;
  const inward = n.neckDirection === 'inward';
  const displacedVolume = inward ? Math.PI * (radius + n.wall) ** 2 * neckExtension : 0;
  const cavityHeight = (volume + displacedVolume) / section;
  const tipClearance = inward ? cavityHeight - neckExtension : null;
  const baseHeight = n.bottom + cavityHeight;
  const footprintX = outerBounds.maxX - outerBounds.minX;
  const footprintY = outerBounds.maxY - outerBounds.minY;
  if (n.wallMount && (footprintX < 100 || footprintY < 70)) errors.push('Korpus jest za mały na dwa mocowania ścienne. Zwiększ szerokość lub głębokość.');
  const availableX = n.bedX - 2 * n.margin;
  const availableY = n.bedY - 2 * n.margin;
  const availableZ = n.bedZ - n.margin;
  const normalFit = footprintX <= availableX && footprintY <= availableY;
  const rotatedFit = footprintY <= availableX && footprintX <= availableY;
  const fitsXY = normalFit || rotatedFit;
  const splitX = fitsXY ? 1 : footprintX <= availableX ? 1 : Math.ceil(footprintX / Math.max(1, availableX - 0.1));
  const splitY = fitsXY ? 1 : footprintY <= availableY ? 1 : Math.ceil(footprintY / Math.max(1, availableY - 0.1));
  const splitZ = Math.ceil(baseHeight / availableZ);
  if (![splitX, splitY, splitZ].every(value => Number.isFinite(value) && value >= 1 && value <= 8) || splitX * splitY * splitZ > 48) errors.push('Projekt wymaga zbyt wielu części dla tego pola roboczego.');
  if (splitZ > 1 && baseHeight / splitZ < Math.max(n.neckLength + 2, 2 * socketDepth + 2)) errors.push('Pole robocze Z jest za niskie dla podziału korpusu.');
  const lidHeight = n.coverPlacement === 'back' ? n.lid : n.neckLength;
  const neckPrintHeight = n.coverPlacement === 'back' && !inward ? n.neckLength : 0;
  if (lidHeight > availableZ) errors.push('Pokrywa jest zbyt wysoka dla pola roboczego Z.');
  if (neckPrintHeight > availableZ) errors.push('Osobna szyjka jest zbyt wysoka dla pola roboczego Z.');
  if (dowelLength > availableZ) errors.push('Kołki są zbyt wysokie dla pola roboczego Z.');
  if (availableX < 30 || availableY < 30) errors.push('Pole robocze XY jest za małe na segmenty i łączniki.');
  if (n.wallMount && !((availableX >= 30 && availableY >= 50) || (availableX >= 50 && availableY >= 30))) errors.push('Pole robocze jest za małe na mocowanie ścienne.');
  if (n.wallMount && availableZ < 10) errors.push('Pole robocze Z jest za niskie na znacznik wiercenia.');
  if (cavityHeight < 3) errors.push('Komora ma mniej niż 3 mm wysokości; zmniejsz częstotliwość lub podstawę.');
  if (baseHeight < socketDepth + 1.5) errors.push('Baza jest za niska na gniazda kołków.');
  if (inward && tipClearance < Math.max(8, radius)) errors.push('Wewnętrzna szyjka jest za blisko dna.');
  return {
    errors, input: n, volume, section, cavityHeight, baseHeight, displacedVolume, tipClearance,
    lidHeight, neckPrintHeight, effectiveLength, soundSpeed,
    innerWidth, innerDepth, footprintX, footprintY,
    orientation: fitsXY ? normalFit ? 'standard' : 'obróć o 90°' : 'segmenty',
    splitX, splitY, splitZ, outerBounds,
    externalNeck: neckExtension, portClearance: 0.25,
    dowelDiameter, dowelLength, socketDiameter, socketDepth,
    dowelCount: n.shape === 'hex' ? 6 : 4,
  };
}

function autoDesign(raw) {
  const shape = raw.shape || 'round';
  const neckDirection = raw.neckDirection || 'outward';
  const coverPlacement = raw.coverPlacement || 'neck';
  const frequency = Number(raw.frequency);
  const bedX = Number(raw.bedX), bedY = Number(raw.bedY), bedZ = Number(raw.bedZ);
  const margin = 5, wall = 7, bottom = 3, lid = 7;
  const temperature = Number(raw.temperature ?? 20);
  const pinClearance = Number(raw.pinClearance ?? 0.25);
  const widthFactor = Number(raw.widthFactor ?? 1), depthFactor = Number(raw.depthFactor ?? 1);
  const heightFactor = Number(raw.heightFactor ?? 1);
  if (!Number.isFinite(frequency) || frequency <= 0) return { errors: ['Podaj dodatnią częstotliwość.'] };
  if (![bedX, bedY, bedZ].every(value => Number.isFinite(value) && value > 0)) return { errors: ['Podaj dodatnie wymiary pola roboczego drukarki.'] };
  if (!Number.isFinite(temperature) || temperature < -20 || temperature > 50) return { errors: ['Temperatura musi mieścić się w zakresie −20–50 °C.'] };
  if (!Number.isFinite(pinClearance) || pinClearance < 0.1 || pinClearance > 0.4) return { errors: ['Luz kołków musi wynosić 0,1–0,4 mm na stronę.'] };
  if (![widthFactor, depthFactor, heightFactor].every(value => Number.isFinite(value) && value >= 0.5 && value <= 2)) return { errors: ['Proporcje muszą być w zakresie 0,5–2,0.'] };
  if (shape === 'svg' && (!Array.isArray(raw.customPoints) || raw.customPoints.length < 8)) return { errors: ['Zaimportuj poprawny obrys SVG.'] };
  const availableX = bedX - 2 * margin, availableY = bedY - 2 * margin;
  const ratio = shape === 'box' ? 1.2 : 1;
  const depthRatio = shape === 'hex' ? 2 / Math.sqrt(3) : shape === 'svg' ? Number(raw.svgAspect || 1) : 1;
  const maxScale = Math.max(60, Math.min(availableX / ratio, availableY / depthRatio));
  const size = scale => ({ width: ratio * scale, depth: depthRatio * scale });
  const sectionAt = scale => polygonArea(profilePaths({ ...size(scale), shape, wall, customPoints: raw.customPoints }).inner);
  let tooShallow = false;
  for (const neckDiameter of [20, 18, 16, 14, 12, 10, 8, 6, 5, 4]) {
    const minScale = Math.max(raw.wallMount === 'on' ? 100 / ratio : 60, raw.wallMount === 'on' ? 70 / depthRatio : 60, neckDiameter + 2 * wall + 12);
    const lengths = neckDirection === 'inward'
      ? [...new Set([Math.max(14, 1.5 * neckDiameter), Math.max(10, neckDiameter), 8])]
      : [Math.max(14, 1.5 * neckDiameter)];
    for (const neckLength of lengths) {
      const common = { shape, neckDirection, coverPlacement, frequency, temperature, neckDiameter, neckLength, wall, bottom, lid, bedX, bedY, bedZ, margin, pinClearance, environment: raw.environment || 'indoor', customPoints: raw.customPoints, wallMount: raw.wallMount === 'on' };
      const trial = calculate({ ...common, ...size(Math.max(minScale, maxScale)) });
      if (!Number.isFinite(trial.volume)) continue;
      const grossVolume = trial.volume + trial.displacedVolume;
      let lo = minScale, hi = Math.max(maxScale, minScale);
      while (sectionAt(hi) * 0.75 * hi < grossVolume && hi < 4000) hi *= 1.5;
      for (let i = 0; i < 42; i++) {
        const mid = (lo + hi) / 2;
        if (sectionAt(mid) * 0.75 * mid >= grossVolume) hi = mid; else lo = mid;
      }
      const scale = Math.max(minScale, Math.min(hi, maxScale)) / Math.sqrt(heightFactor);
      const dimensions = size(scale);
      const result = calculate({ ...common, width: dimensions.width * widthFactor, depth: dimensions.depth * depthFactor });
      if (!result.errors.length) return { ...result, auto: true };
      if (result.errors.some(error => error.includes('mniej niż 3 mm') || error.includes('za blisko dna'))) tooShallow = true;
    }
  }
  return { errors: [tooShallow
    ? 'Wybrane proporcje dają zbyt płytką komorę lub zbyt mały odstęp szyjki. Zmniejsz szerokość lub głębokość.'
    : 'Nie udało się dobrać komory i szyjki dla tych ustawień. Zmień proporcje lub częstotliwość.'] };
}

const v = (x, y, z) => [x, y, z];
const at = (point, z) => v(point[0], point[1], z);
function triangle(mesh, a, b, c) { mesh.push([a, b, c]); }
function quad(mesh, a, b, c, d) { triangle(mesh, a, b, c); triangle(mesh, a, c, d); }
function side(mesh, path, z0, z1, inward = false) {
  for (let i = 0; i < path.length; i++) {
    const a = at(path[i], z0), b = at(path[(i + 1) % path.length], z0);
    const c = at(path[(i + 1) % path.length], z1), d = at(path[i], z1);
    if (inward) quad(mesh, d, c, b, a); else quad(mesh, a, b, c, d);
  }
}
function ring(mesh, outer, inner, z, top) {
  for (let i = 0; i < outer.length; i++) {
    const j = (i + 1) % outer.length;
    const a = at(outer[i], z), b = at(outer[j], z), c = at(inner[j], z), d = at(inner[i], z);
    if (top) quad(mesh, a, b, c, d); else quad(mesh, d, c, b, a);
  }
}
function cap(mesh, path, z, top) {
  const center = v(1.777, 2.333, z);
  for (let i = 0; i < path.length; i++) {
    const a = at(path[i], z), b = at(path[(i + 1) % path.length], z);
    if (top) triangle(mesh, center, a, b); else triangle(mesh, center, b, a);
  }
}
function circle(radius, angles) { return angles.map(angle => [radius * Math.cos(angle), radius * Math.sin(angle)]); }
function roundAnglesFor(diameter, wall) {
  const count = Math.max(32, 8 * Math.round(Math.PI * (diameter - wall) / 48));
  return Array.from({ length: count }, (_, i) => 2 * Math.PI * i / count);
}
function paths(result) {
  return profilePaths(result.input);
}
function lidPaths(result) {
  const n = result.input;
  const outer = profileOutline(n);
  const angles = outer.map(([x, y]) => Math.atan2(y, x));
  return { outer, hole: circle(n.neckDiameter / 2, angles), neck: circle(n.neckDiameter / 2 + n.wall, angles) };
}
function pegIndices(shape, count) {
  return shape === 'hex' ? [3, 9, 15, 21, 27, 33] : shape === 'box' ? [4, 12, 20, 28] : [count / 8, 3 * count / 8, 5 * count / 8, 7 * count / 8];
}
function capAt(mesh, path, z, top, center) {
  const point = v(center[0], center[1], z);
  for (let i = 0; i < path.length; i++) {
    const a = at(path[i], z), b = at(path[(i + 1) % path.length], z);
    if (top) triangle(mesh, point, a, b); else triangle(mesh, point, b, a);
  }
}
function socketPatch(mesh, outer, inner, index, z, top, radius, height, socketDirection) {
  const next = (index + 1) % outer.length;
  const corners = [outer[index], outer[next], inner[next], inner[index]];
  const center = [corners.reduce((sum, point) => sum + point[0], 0) / 4, corners.reduce((sum, point) => sum + point[1], 0) / 4];
  const hole = [];
  for (let sideIndex = 0; sideIndex < 4; sideIndex++) {
    let a = Math.atan2(corners[sideIndex][1] - center[1], corners[sideIndex][0] - center[0]);
    let b = Math.atan2(corners[(sideIndex + 1) % 4][1] - center[1], corners[(sideIndex + 1) % 4][0] - center[0]);
    while (b <= a) b += 2 * Math.PI;
    for (let k = 0; k < 6; k++) {
      const angle = a + (b - a) * k / 6;
      hole.push([center[0] + radius * Math.cos(angle), center[1] + radius * Math.sin(angle)]);
    }
  }
  const add = (a, b, c) => top ? triangle(mesh, a, b, c) : triangle(mesh, c, b, a);
  for (let sideIndex = 0; sideIndex < 4; sideIndex++) {
    const i = sideIndex * 6, j = ((sideIndex + 1) * 6) % 24;
    add(at(corners[sideIndex], z), at(corners[(sideIndex + 1) % 4], z), at(hole[j], z));
    for (let k = 0; k < 6; k++) {
      const h0 = hole[(i + k) % 24], h1 = hole[(i + k + 1) % 24];
      add(at(corners[sideIndex], z), at(h1, z), at(h0, z));
    }
  }
  if (socketDirection > 0) {
    side(mesh, hole, z, z + height, true);
    capAt(mesh, hole, z + height, false, center);
  } else {
    side(mesh, hole, z - height, z, true);
    capAt(mesh, hole, z - height, true, center);
  }
}
function ringWithSockets(mesh, outer, inner, z, top, result, socketDirection) {
  const pins = new Set(pegIndices(result.input.shape, outer.length));
  for (let i = 0; i < outer.length; i++) {
    if (pins.has(i)) {
      socketPatch(mesh, outer, inner, i, z, top, result.socketDiameter / 2, result.socketDepth, socketDirection);
    } else {
      const j = (i + 1) % outer.length;
      const a = at(outer[i], z), b = at(outer[j], z), c = at(inner[j], z), d = at(inner[i], z);
      if (top) quad(mesh, a, b, c, d); else quad(mesh, d, c, b, a);
    }
  }
}
function makeBaseSection(result, sectionIndex = 0) {
  const { outer, inner } = paths(result);
  const mesh = [];
  const { bottom, neckLength, neckDirection, coverPlacement } = result.input;
  const sectionHeight = result.baseHeight / result.splitZ;
  const z0 = sectionIndex * sectionHeight;
  const z1 = sectionIndex === result.splitZ - 1 ? result.baseHeight : (sectionIndex + 1) * sectionHeight;
  side(mesh, outer, z0, z1);
  side(mesh, inner, sectionIndex === 0 ? bottom : z0, z1, true);
  if (sectionIndex === 0) {
    if (coverPlacement === 'back') {
      const { hole, neck } = lidPaths(result);
      if (neckDirection === 'inward') {
        ring(mesh, outer, hole, 0, false);
        ring(mesh, inner, neck, bottom, true);
        side(mesh, hole, 0, neckLength, true);
        side(mesh, neck, bottom, neckLength);
        ring(mesh, neck, hole, neckLength, true);
      } else {
        const angles = outer.map(([x, y]) => Math.atan2(y, x));
        const port = circle(result.input.neckDiameter / 2 + result.input.wall + result.portClearance, angles);
        ring(mesh, outer, port, 0, false);
        ring(mesh, inner, port, bottom, true);
        side(mesh, port, 0, bottom, true);
      }
    } else {
      cap(mesh, outer, 0, false);
      cap(mesh, inner, bottom, true);
    }
  } else {
    ringWithSockets(mesh, outer, inner, z0, false, result, 1);
  }
  ringWithSockets(mesh, outer, inner, z1, true, result, -1);
  return mesh;
}
function makeBase(result) { return makeBaseSection(result, 0); }
function makeLid(result) {
  const { outer, hole, neck } = lidPaths(result);
  const inner = paths(result).inner;
  const mesh = [];
  const { lid, neckLength, coverPlacement } = result.input;
  side(mesh, outer, 0, lid);
  if (coverPlacement === 'back') {
    cap(mesh, outer, 0, false);
    ringWithSockets(mesh, outer, inner, lid, true, result, -1);
    cap(mesh, inner, lid, true);
    return mesh;
  }
  side(mesh, hole, 0, neckLength, true);
  side(mesh, neck, lid, neckLength);
  if (result.input.neckDirection === 'inward') {
    ring(mesh, outer, hole, 0, false);
    ringWithSockets(mesh, outer, inner, lid, true, result, -1);
    ring(mesh, inner, neck, lid, true);
  } else {
    ringWithSockets(mesh, outer, inner, 0, false, result, 1);
    ring(mesh, inner, hole, 0, false);
    ring(mesh, outer, neck, lid, true);
  }
  ring(mesh, neck, hole, neckLength, true);
  return mesh;
}

function makeNeck(result) {
  if (result.input.coverPlacement !== 'back' || result.input.neckDirection !== 'outward') return [];
  const angles = Array.from({ length: 64 }, (_, i) => 2 * Math.PI * i / 64);
  const inner = circle(result.input.neckDiameter / 2, angles);
  const outer = circle(result.input.neckDiameter / 2 + result.input.wall, angles);
  const mesh = [];
  side(mesh, outer, 0, result.input.neckLength);
  side(mesh, inner, 0, result.input.neckLength, true);
  ring(mesh, outer, inner, 0, false);
  ring(mesh, outer, inner, result.input.neckLength, true);
  return mesh;
}

function makeDowels(result) {
  const mesh = [];
  const count = result.dowelCount;
  const columns = count === 6 ? 3 : 2;
  const radius = result.dowelDiameter / 2;
  const chamfer = 0.4;
  const angles = Array.from({ length: 32 }, (_, i) => 2 * Math.PI * i / 32);
  for (let index = 0; index < count; index++) {
    const center = [5 + (index % columns) * 10, 5 + Math.floor(index / columns) * 10];
    const pathAt = r => angles.map(angle => [center[0] + r * Math.cos(angle), center[1] + r * Math.sin(angle)]);
    const end = pathAt(radius - chamfer), body = pathAt(radius);
    const layers = [[end, 0], [body, chamfer], [body, result.dowelLength - chamfer], [end, result.dowelLength]];
    for (let layer = 0; layer < layers.length - 1; layer++) {
      const [lower, z0] = layers[layer], [upper, z1] = layers[layer + 1];
      for (let i = 0; i < angles.length; i++) {
        const j = (i + 1) % angles.length;
        quad(mesh, at(lower[i], z0), at(lower[j], z0), at(upper[j], z1), at(upper[i], z1));
      }
    }
    capAt(mesh, end, 0, false, center);
    capAt(mesh, end, result.dowelLength, true, center);
  }
  return mesh;
}

function binaryStl(mesh, name) {
  const buffer = new ArrayBuffer(84 + mesh.length * 50);
  const view = new DataView(buffer);
  const header = new TextEncoder().encode(name.slice(0, 80));
  new Uint8Array(buffer, 0, header.length).set(header);
  view.setUint32(80, mesh.length, true);
  let offset = 84;
  for (const [a, b, c] of mesh) {
    const ab = b.map((value, i) => value - a[i]);
    const ac = c.map((value, i) => value - a[i]);
    const normal = [ab[1] * ac[2] - ab[2] * ac[1], ab[2] * ac[0] - ab[0] * ac[2], ab[0] * ac[1] - ab[1] * ac[0]];
    const length = Math.hypot(...normal) || 1;
    for (const value of normal) { view.setFloat32(offset, value / length, true); offset += 4; }
    for (const point of [a, b, c]) for (const value of point) { view.setFloat32(offset, value, true); offset += 4; }
    view.setUint16(offset, 0, true); offset += 2;
  }
  return new Blob([buffer], { type: 'model/stl' });
}
