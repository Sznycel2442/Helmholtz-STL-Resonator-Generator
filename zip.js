function crc32(bytes) {
  let crc = -1;
  for (const byte of bytes) {
    crc ^= byte;
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
  }
  return (crc ^ -1) >>> 0;
}

async function zipStls(parts) {
  const encoder = new TextEncoder();
  const files = await Promise.all(parts.map(async part => {
    const bytes = new Uint8Array(await binaryStl(part.mesh, part.name).arrayBuffer());
    return { name: encoder.encode(part.name), bytes, crc: crc32(bytes) };
  }));
  const localSize = files.reduce((sum, file) => sum + 30 + file.name.length + file.bytes.length, 0);
  const centralSize = files.reduce((sum, file) => sum + 46 + file.name.length, 0);
  const output = new Uint8Array(localSize + centralSize + 22), view = new DataView(output.buffer);
  let cursor = 0;
  for (const file of files) {
    file.offset = cursor;
    view.setUint32(cursor, 0x04034b50, true);
    view.setUint16(cursor + 4, 20, true);
    view.setUint16(cursor + 8, 0, true);
    view.setUint16(cursor + 10, 0, true);
    view.setUint16(cursor + 12, 0x0021, true);
    view.setUint32(cursor + 14, file.crc, true);
    view.setUint32(cursor + 18, file.bytes.length, true);
    view.setUint32(cursor + 22, file.bytes.length, true);
    view.setUint16(cursor + 26, file.name.length, true);
    output.set(file.name, cursor + 30);
    output.set(file.bytes, cursor + 30 + file.name.length);
    cursor += 30 + file.name.length + file.bytes.length;
  }
  const centralStart = cursor;
  for (const file of files) {
    view.setUint32(cursor, 0x02014b50, true);
    view.setUint16(cursor + 4, 20, true);
    view.setUint16(cursor + 6, 20, true);
    view.setUint16(cursor + 12, 0, true);
    view.setUint16(cursor + 14, 0x0021, true);
    view.setUint32(cursor + 16, file.crc, true);
    view.setUint32(cursor + 20, file.bytes.length, true);
    view.setUint32(cursor + 24, file.bytes.length, true);
    view.setUint16(cursor + 28, file.name.length, true);
    view.setUint32(cursor + 42, file.offset, true);
    output.set(file.name, cursor + 46);
    cursor += 46 + file.name.length;
  }
  view.setUint32(cursor, 0x06054b50, true);
  view.setUint16(cursor + 8, files.length, true);
  view.setUint16(cursor + 10, files.length, true);
  view.setUint32(cursor + 12, centralSize, true);
  view.setUint32(cursor + 16, centralStart, true);
  return new Blob([output], { type: 'application/zip' });
}
