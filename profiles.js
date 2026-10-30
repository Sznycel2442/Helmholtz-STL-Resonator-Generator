function polygonArea(path) {
  return Math.abs(path.reduce((sum, point, i) => {
    const next = path[(i + 1) % path.length];
    return sum + point[0] * next[1] - next[0] * point[1];
  }, 0)) / 2;
}

function boundsOf(path) {
  const xs = path.map(point => point[0]), ys = path.map(point => point[1]);
  return { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) };
}

function profileOutline(n) {
  const width = n.width, depth = n.depth;
  if (n.shape === 'box') return boxPath(width, depth);
  if (n.shape === 'hex') return hexPath(width, depth);
  if (n.shape === 'svg') return n.customPoints.map(([x, y]) => [x * width, y * depth]);
  if (n.shape === 'octagon') {
    const vertices = Array.from({ length: 8 }, (_, i) => {
      const angle = Math.PI / 8 + 2 * Math.PI * i / 8;
      return [width / 2 * Math.cos(angle) / Math.cos(Math.PI / 8), depth / 2 * Math.sin(angle) / Math.cos(Math.PI / 8)];
    });
    return subdividePolygon(vertices, 4);
  }
  const count = Math.max(32, 8 * Math.round(Math.PI * (Math.max(width, depth) - n.wall) / 48));
  return Array.from({ length: count }, (_, i) => {
    const angle = 2 * Math.PI * i / count;
    const power = n.shape === 'rounded' ? 0.5 : 1;
    const x = Math.sign(Math.cos(angle)) * Math.abs(Math.cos(angle)) ** power;
    const y = Math.sign(Math.sin(angle)) * Math.abs(Math.sin(angle)) ** power;
    return [width / 2 * x, depth / 2 * y];
  });
}

function subdividePolygon(vertices, steps) {
  const path = [];
  for (let i = 0; i < vertices.length; i++) {
    const a = vertices[i], b = vertices[(i + 1) % vertices.length];
    for (let j = 0; j < steps; j++) path.push([a[0] + (b[0] - a[0]) * j / steps, a[1] + (b[1] - a[1]) * j / steps]);
  }
  return path;
}

function insetOutline(path, amount) {
  return path.map((point, i) => {
    const previous = path[(i + path.length - 1) % path.length], next = path[(i + 1) % path.length];
    const a = [point[0] - previous[0], point[1] - previous[1]];
    const b = [next[0] - point[0], next[1] - point[1]];
    const la = Math.hypot(...a), lb = Math.hypot(...b);
    const normalA = [-a[1] / la, a[0] / la], normalB = [-b[1] / lb, b[0] / lb];
    const start = [point[0] + amount * normalA[0], point[1] + amount * normalA[1]];
    const end = [point[0] + amount * normalB[0], point[1] + amount * normalB[1]];
    const determinant = a[0] * b[1] - a[1] * b[0];
    if (Math.abs(determinant) < 1e-8) return end;
    const delta = [end[0] - start[0], end[1] - start[1]];
    const t = (delta[0] * b[1] - delta[1] * b[0]) / determinant;
    return [start[0] + t * a[0], start[1] + t * a[1]];
  });
}

function profilePaths(n) {
  const outer = profileOutline(n);
  const inner = insetOutline(outer, n.wall);
  return { outer, inner };
}

function centerClearance(path) {
  return Math.min(...path.map((a, i) => {
    const b = path[(i + 1) % path.length], dx = b[0] - a[0], dy = b[1] - a[1];
    return Math.abs(a[0] * dy - a[1] * dx) / Math.hypot(dx, dy);
  }));
}

function boxPath(width, depth, segments = 8) {
  return subdividePolygon([[width / 2, -depth / 2], [width / 2, depth / 2], [-width / 2, depth / 2], [-width / 2, -depth / 2]], segments);
}

function hexPath(width, depth, segments = 6) {
  const vertices = Array.from({ length: 6 }, (_, i) => {
    const angle = -Math.PI / 2 + i * Math.PI / 3;
    return [width / 2 * Math.cos(angle) / (Math.sqrt(3) / 2), depth / 2 * Math.sin(angle)];
  });
  return subdividePolygon(vertices, segments);
}
