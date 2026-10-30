function makeJoiner() {
  const mesh = [], path = boxPath(24, 8, 2);
  side(mesh, path, 0, 2);
  cap(mesh, path, 0, false);
  cap(mesh, path, 2, true);
  return mesh;
}

function printPosition(mesh) {
  let minX = Infinity, minY = Infinity, minZ = Infinity;
  for (const triangle of mesh) for (const point of triangle) {
    minX = Math.min(minX, point[0]);
    minY = Math.min(minY, point[1]);
    minZ = Math.min(minZ, point[2]);
  }
  return mesh.map(triangle => triangle.map(point => [point[0] - minX, point[1] - minY, point[2] - minZ]));
}

function partCuts(result, axis) {
  const count = axis === 0 ? result.splitX : result.splitY;
  const lower = axis === 0 ? result.outerBounds.minX : result.outerBounds.minY;
  const span = axis === 0 ? result.footprintX : result.footprintY;
  return Array.from({ length: count - 1 }, (_, i) => lower + (i + 1) * span / count + (axis === 0 ? 0.034 : 0.068));
}

function tileLabel(mesh, cutsX, cutsY) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const triangle of mesh) for (const point of triangle) {
    minX = Math.min(minX, point[0]); maxX = Math.max(maxX, point[0]);
    minY = Math.min(minY, point[1]); maxY = Math.max(maxY, point[1]);
  }
  const x = cutsX.filter(cut => (minX + maxX) / 2 > cut).length + 1;
  const y = cutsY.filter(cut => (minY + maxY) / 2 > cut).length + 1;
  return `x${x}_y${y}`;
}

function modelParts(result, kind) {
  const cutsX = partCuts(result, 0), cutsY = partCuts(result, 1);
  const prefix = `helmholtz_${Math.round(result.input.frequency)}Hz_${result.input.shape}`;
  const finish = (mesh, name) => ({ name: `${prefix}_${name}.stl`, mesh: printPosition(mesh) });
  if (kind === 'base') {
    const output = [];
    for (let level = 0; level < result.splitZ; level++) {
      const tiles = splitMeshGrid(makeBaseSection(result, level), cutsX, cutsY);
      tiles.forEach(mesh => output.push(finish(mesh, result.splitZ === 1 && tiles.length === 1 ? 'base'
        : `base_z${level + 1}_${tileLabel(mesh, cutsX, cutsY)}`)));
    }
    return output;
  }
  if (kind === 'lid') {
    const tiles = splitMeshGrid(makeLid(result), cutsX, cutsY);
    return tiles.map(mesh => finish(mesh, tiles.length === 1 ? 'lid' : `lid_${tileLabel(mesh, cutsX, cutsY)}`));
  }
  if (kind === 'dowels') return [finish(makeDowels(result), 'dowels')];
  if (kind === 'neck') return result.input.coverPlacement === 'back' && result.input.neckDirection === 'outward'
    ? [finish(makeNeck(result), 'neck')] : [];
  if (kind === 'joiner') return result.splitX > 1 || result.splitY > 1 ? [finish(makeJoiner(), 'seam_joiner')]: [];
  if (kind === 'mount') return result.input.wallMount ? [
    finish(mountPlate(), 'keyhole_plate_print_2'),
    finish(mountSpacer(), 'mount_spacer_print_4'),
    finish(mountMarker(), 'drill_marker_print_2'),
  ] : [];
  return [];
}
