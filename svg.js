function svgNumbers(value) {
  return (value.match(/[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?/g) || []).map(Number);
}

function resampleOutline(points, count = 32) {
  const edges = points.map((point, i) => Math.hypot(points[(i + 1) % points.length][0] - point[0], points[(i + 1) % points.length][1] - point[1]));
  const perimeter = edges.reduce((sum, value) => sum + value, 0);
  const output = [];
  for (let index = 0; index < count; index++) {
    const distance = index * perimeter / count;
    let start = 0, edge = 0;
    while (edge < edges.length - 1 && start + edges[edge] < distance) start += edges[edge++];
    const a = points[edge], b = points[(edge + 1) % points.length], t = (distance - start) / edges[edge];
    output.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
  }
  return output;
}

function importSvgOutline(source) {
  const parsed = new DOMParser().parseFromString(source, 'image/svg+xml');
  if (parsed.querySelector('parsererror') || parsed.documentElement.localName !== 'svg') throw new Error('invalidSvg');
  const element = parsed.querySelector('path,polygon,polyline,rect,circle,ellipse');
  if (!element || element.closest('[transform]')) throw new Error('invalidSvg');
  const tag = element.localName;
  let points;
  if (tag === 'polygon' || tag === 'polyline') {
    const numbers = svgNumbers(element.getAttribute('points') || '');
    if (numbers.length < 6 || numbers.length % 2) throw new Error('invalidSvg');
    points = Array.from({ length: numbers.length / 2 }, (_, i) => [numbers[2 * i], numbers[2 * i + 1]]);
    if (tag === 'polyline' && Math.hypot(points[0][0] - points.at(-1)[0], points[0][1] - points.at(-1)[1]) > 1e-6) throw new Error('openSvg');
  } else if (tag === 'rect') {
    const x = Number(element.getAttribute('x') || 0), y = Number(element.getAttribute('y') || 0);
    const w = Number(element.getAttribute('width')), h = Number(element.getAttribute('height'));
    points = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
  } else if (tag === 'circle' || tag === 'ellipse') {
    const cx = Number(element.getAttribute('cx') || 0), cy = Number(element.getAttribute('cy') || 0);
    const rx = Number(element.getAttribute(tag === 'circle' ? 'r' : 'rx'));
    const ry = tag === 'circle' ? rx : Number(element.getAttribute('ry'));
    points = Array.from({ length: 64 }, (_, i) => [cx + rx * Math.cos(2 * Math.PI * i / 64), cy + ry * Math.sin(2 * Math.PI * i / 64)]);
  } else {
    const data = element.getAttribute('d') || '';
    if ((data.match(/[mM]/g) || []).length !== 1 || !/[zZ]\s*$/.test(data)) throw new Error('openSvg');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', data);
    svg.style.position = 'absolute';
    svg.style.visibility = 'hidden';
    document.body.append(svg);
    svg.append(path);
    try {
      const length = path.getTotalLength();
      if (!Number.isFinite(length) || length <= 0) throw new Error('invalidSvg');
      points = Array.from({ length: 128 }, (_, i) => {
        const point = path.getPointAtLength(i * length / 128);
        return [point.x, point.y];
      });
    } finally { svg.remove(); }
  }
  if (points.length > 1 && Math.hypot(points[0][0] - points.at(-1)[0], points[0][1] - points.at(-1)[1]) < 1e-6) points.pop();
  if (points.length < 3 || points.some(point => point.some(value => !Number.isFinite(value)))) throw new Error('invalidSvg');
  if (points.some((point, i) => Math.hypot(point[0] - points[(i + 1) % points.length][0], point[1] - points[(i + 1) % points.length][1]) < 1e-8)) throw new Error('invalidSvg');
  const box = boundsOf(points), width = box.maxX - box.minX, height = box.maxY - box.minY;
  if (width <= 0 || height <= 0 || polygonArea(points) < 1e-8) throw new Error('invalidSvg');
  const turns = points.map((point, i) => {
    const b = points[(i + 1) % points.length], d = points[(i + 2) % points.length];
    return (b[0] - point[0]) * (d[1] - b[1]) - (b[1] - point[1]) * (d[0] - b[0]);
  });
  if (turns.some(value => value > 1e-6) && turns.some(value => value < -1e-6)) throw new Error('concaveSvg');
  if (turns.reduce((sum, value) => sum + value, 0) < 0) points.reverse();
  const centered = points.map(([x, y]) => [(x - (box.minX + box.maxX) / 2) / width, (y - (box.minY + box.maxY) / 2) / height]);
  return { points: resampleOutline(centered), aspect: height / width };
}
