function mountPlate() {
  const headRadius = 4.5, slotHalf = 2.3, headY = -10, slotTop = 12;
  const joinAngle = Math.acos(slotHalf / headRadius);
  const outline = [[slotHalf, headY + Math.sqrt(headRadius ** 2 - slotHalf ** 2)], [slotHalf, slotTop]];
  for (let i = 1; i <= 16; i++) {
    const angle = Math.PI * i / 16;
    outline.push([slotHalf * Math.cos(angle), slotTop + slotHalf * Math.sin(angle)]);
  }
  outline.push([-slotHalf, headY + Math.sqrt(headRadius ** 2 - slotHalf ** 2)]);
  for (let i = 1; i < 48; i++) {
    const angle = Math.PI - joinAngle + (Math.PI + 2 * joinAngle) * i / 48;
    outline.push([headRadius * Math.cos(angle), headY + headRadius * Math.sin(angle)]);
  }
  const hole = resampleOutline(outline, 64);
  const center = [0, -8];
  const outer = hole.map(point => {
    const dx = point[0] - center[0], dy = point[1] - center[1];
    const tx = dx > 0 ? 15 / dx : dx < 0 ? -15 / dx : Infinity;
    const ty = dy > 0 ? (25 - center[1]) / dy : dy < 0 ? (-25 - center[1]) / dy : Infinity;
    const t = Math.min(tx, ty);
    return [center[0] + t * dx, center[1] + t * dy];
  });
  const mesh = [];
  side(mesh, outer, 0, 3);
  side(mesh, hole, 0, 3, true);
  ring(mesh, outer, hole, 0, false);
  ring(mesh, outer, hole, 3, true);
  return mesh;
}

function mountSpacer() {
  const mesh = [], path = boxPath(6, 40, 2);
  side(mesh, path, 0, 4);
  cap(mesh, path, 0, false);
  cap(mesh, path, 4, true);
  return mesh;
}

function mountMarker() {
  const mesh = [], angles = Array.from({ length: 32 }, (_, i) => 2 * Math.PI * i / 32);
  const flange = circle(3.9, angles), shaft = circle(1.9, angles), tipBase = circle(1.2, angles);
  cap(mesh, flange, 0, false);
  side(mesh, flange, 0, 2);
  ring(mesh, flange, shaft, 2, true);
  side(mesh, shaft, 2, 7);
  ring(mesh, shaft, tipBase, 7, true);
  const tip = [0, 0, 10];
  for (let i = 0; i < tipBase.length; i++) triangle(mesh, at(tipBase[i], 7), at(tipBase[(i + 1) % tipBase.length], 7), tip);
  return mesh;
}
