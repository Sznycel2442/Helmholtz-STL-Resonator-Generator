// Split a closed STL mesh by a vertical plane and close both cut faces.
function splitMeshAt(mesh, axis, position) {
  const lower = [], upper = [], segments = [];
  const epsilon = 1e-7;
  const mix = (a, b, t) => a.map((value, i) => value + (b[i] - value) * t);
  const clip = (triangle, keepLower) => {
    const polygon = [];
    for (let i = 0; i < 3; i++) {
      const a = triangle[i], b = triangle[(i + 1) % 3];
      const da = a[axis] - position, db = b[axis] - position;
      const insideA = keepLower ? da <= epsilon : da >= -epsilon;
      const insideB = keepLower ? db <= epsilon : db >= -epsilon;
      if (insideA) polygon.push(a);
      if (insideA !== insideB) polygon.push(mix(a, b, da / (da - db)));
    }
    for (let i = 1; i + 1 < polygon.length; i++) {
      const a = polygon[0], b = polygon[i], c = polygon[i + 1];
      const area = Math.hypot(...cross(sub(b, a), sub(c, a)));
      if (area > epsilon) (keepLower ? lower : upper).push([a, b, c]);
    }
  };
  for (const triangle of mesh) {
    clip(triangle, true);
    clip(triangle, false);
    const points = [];
    for (let i = 0; i < 3; i++) {
      const a = triangle[i], b = triangle[(i + 1) % 3];
      const da = a[axis] - position, db = b[axis] - position;
      if (da * db < -epsilon * epsilon) points.push(mix(a, b, da / (da - db)));
    }
    if (points.length === 2) segments.push(points);
  }
  if (!segments.length) return { lower, upper };
  const key = point => point.map(value => Math.round(value * 1e6)).join(',');
  const nodes = new Map(), edges = [];
  for (const [a, b] of segments) {
    const ka = key(a), kb = key(b);
    if (ka === kb) continue;
    if (!nodes.has(ka)) nodes.set(ka, { point: a, neighbors: [] });
    if (!nodes.has(kb)) nodes.set(kb, { point: b, neighbors: [] });
    nodes.get(ka).neighbors.push(kb);
    nodes.get(kb).neighbors.push(ka);
    edges.push([ka, kb]);
  }
  const projection = point => axis === 0 ? [point[1], point[2]] : axis === 1 ? [point[2], point[0]] : [point[0], point[1]];
  const used = new Set();
  for (const [start, next] of edges) {
    const edgeKey = (a, b) => a < b ? `${a}|${b}` : `${b}|${a}`;
    if (used.has(edgeKey(start, next))) continue;
    const loop = [start];
    let previous = start, current = next;
    used.add(edgeKey(previous, current));
    while (current !== start) {
      loop.push(current);
      const candidates = nodes.get(current).neighbors.filter(item => item !== previous && !used.has(edgeKey(current, item)));
      if (candidates.length !== 1) throw new Error('Nie można zamknąć powierzchni cięcia.');
      const following = candidates[0];
      used.add(edgeKey(current, following));
      previous = current;
      current = following;
      if (loop.length > edges.length + 1) throw new Error('Nieprawidłowy obrys cięcia.');
    }
    const vertices = loop.map(item => nodes.get(item).point);
    for (const triangle of triangulateCut(vertices, projection)) {
      lower.push(triangle);
      upper.push([triangle[2], triangle[1], triangle[0]]);
    }
  }
  return { lower, upper };
}

function sub(a, b) { return a.map((value, i) => value - b[i]); }
function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }

function triangulateCut(vertices, project) {
  const points = vertices.map(project);
  const orient = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
  const kept = Array.from({ length: vertices.length }, (_, i) => i);
  let changed = true;
  while (changed && kept.length > 3) {
    changed = false;
    for (let i = 0; i < kept.length; i++) {
      const previous = points[kept[(i + kept.length - 1) % kept.length]];
      const current = points[kept[i]];
      const next = points[kept[(i + 1) % kept.length]];
      const distance = Math.hypot(next[0] - previous[0], next[1] - previous[1]);
      if (distance < 1e-8 || Math.abs(orient(previous, current, next)) / distance < 1e-5) {
        kept.splice(i, 1);
        changed = true;
        break;
      }
    }
  }
  const area = kept.reduce((sum, id, i) => {
    const a = points[id], b = points[kept[(i + 1) % kept.length]];
    return sum + a[0] * b[1] - b[0] * a[1];
  }, 0);
  if (Math.abs(area) < 1e-8) throw new Error('Pusty obrys cięcia.');
  const chains = new Map();
  for (let i = 0; i < kept.length; i++) {
    const start = kept[i], end = kept[(i + 1) % kept.length], middle = [];
    for (let j = (start + 1) % vertices.length; j !== end; j = (j + 1) % vertices.length) middle.push(j);
    if (middle.length) chains.set(`${start}|${end}`, middle);
  }
  const indices = area > 0 ? [...kept] : [...kept].reverse();
  const simpleTriangles = [];
  while (indices.length > 3) {
    let found = false;
    for (let i = 0; i < indices.length; i++) {
      const ia = indices[(i + indices.length - 1) % indices.length], ib = indices[i], ic = indices[(i + 1) % indices.length];
      const a = points[ia], b = points[ib], c = points[ic];
      if (orient(a, b, c) <= 1e-10) continue;
      if (indices.some(id => id !== ia && id !== ib && id !== ic &&
        orient(a, b, points[id]) > 1e-9 && orient(b, c, points[id]) > 1e-9 && orient(c, a, points[id]) > 1e-9)) continue;
      simpleTriangles.push([ia, ib, ic]);
      indices.splice(i, 1);
      found = true;
      break;
    }
    if (!found) throw new Error('Nie można podzielić obrysu cięcia.');
  }
  simpleTriangles.push(indices);
  const expand = triangle => {
    for (let i = 0; i < 3; i++) {
      const a = triangle[i], b = triangle[(i + 1) % 3], c = triangle[(i + 2) % 3];
      const forward = chains.get(`${a}|${b}`), backward = chains.get(`${b}|${a}`);
      const middle = forward || (backward && [...backward].reverse());
      if (!middle) continue;
      const path = [a, ...middle, b], result = [];
      for (let j = 0; j < path.length - 1; j++) result.push(...expand([path[j], path[j + 1], c]));
      return result;
    }
    return [triangle.map(id => vertices[id])];
  };
  return simpleTriangles.flatMap(expand);
}

function splitMeshGrid(mesh, cutsX, cutsY) {
  let pieces = [mesh];
  for (const [axis, cuts] of [[0, cutsX], [1, cutsY]]) {
    for (const cut of cuts) {
      const next = [];
      for (const piece of pieces) {
        let minimum = Infinity, maximum = -Infinity;
        for (const triangle of piece) for (const point of triangle) {
          minimum = Math.min(minimum, point[axis]);
          maximum = Math.max(maximum, point[axis]);
        }
        if (minimum < cut - 1e-5 && maximum > cut + 1e-5) {
          const result = splitMeshAt(piece, axis, cut);
          next.push(result.lower, result.upper);
        } else next.push(piece);
      }
      pieces = next;
    }
  }
  return pieces.filter(piece => piece.length);
}
