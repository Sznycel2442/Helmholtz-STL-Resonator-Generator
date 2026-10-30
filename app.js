const form = document.querySelector('#config');
const errorBox = document.querySelector('#error-box');
const resultContent = document.querySelector('#result-content');
const statusText = document.querySelector('#status-text');
const downloadBase = document.querySelector('#download-base');
const downloadLid = document.querySelector('#download-lid');
const downloadDowels = document.querySelector('#download-dowels');
const number = new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 1 });
let currentResult = null;

function fmt(value, unit = 'mm') { return `${number.format(value)} ${unit}`; }
function inputValues() {
  const data = new FormData(form);
  return Object.fromEntries(data.entries());
}
function material(environment) {
  const name = document.querySelector('#material-name');
  const description = document.querySelector('#material-description');
  if (environment === 'outdoor') {
    name.textContent = 'ASA';
    description.textContent = 'Dobrze znosi słońce i podwyższoną temperaturę. Duże elementy drukuj w zamkniętej komorze; po wydruku szczelnie sklej połączenie.';
  } else if (environment === 'warm') {
    name.textContent = 'ASA';
    description.textContent = 'Lepszy wybór przy podwyższonej temperaturze. Wymaga zamkniętej komory, szczególnie przy dużej bazie.';
  } else {
    name.textContent = 'PETG';
    description.textContent = 'Dobry wybór do typowego użytku wewnątrz: trwały i prostszy w druku dużych elementów niż ASA. Ustaw co najmniej 5 obrysów i zadbaj o szczelny montaż.';
  }
}
function stat(label, value) { return `<div class="stat"><span>${label}</span><strong>${value}</strong></div>`; }
function drawing(result) {
  const n = result.input;
  const inward = n.neckDirection === 'inward';
  const topOutline = n.shape === 'round'
    ? '<circle cx="64" cy="105" r="38"/>'
    : n.shape === 'hex'
      ? `<polygon points="${Array.from({ length: 6 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 3; return `${64 + 38 * Math.cos(a)},${105 + 38 * Math.sin(a)}`; }).join(' ')}"/>`
      : '<rect x="28" y="76" width="72" height="58" rx="2"/>';
  const pinAngles = n.shape === 'hex' ? Array.from({ length: 6 }, (_, i) => -Math.PI / 2 + (i + 0.5) * Math.PI / 3)
    : n.shape === 'round' ? [Math.PI / 4, 3 * Math.PI / 4, 5 * Math.PI / 4, 7 * Math.PI / 4] : null;
  const topPins = pinAngles
    ? pinAngles.map(angle => `<circle cx="${64 + 31 * Math.cos(angle)}" cy="${105 + 31 * Math.sin(angle)}" r="2.5"/>`).join('')
    : [[64, 79], [96, 105], [64, 131], [32, 105]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.5"/>`).join('');
  const widthLabel = n.shape === 'round' ? `Ø ${number.format(n.diameter)}` : n.shape === 'hex' ? `${number.format(n.diameter)} między płaskimi bokami` : `${number.format(n.width)} × ${number.format(n.depth)}`;
  const bodyWidth = n.shape === 'box' ? n.width : n.diameter;
  const sideHeight = Math.min(106, Math.max(42, result.baseHeight / bodyWidth * 154));
  const x0 = 132, x1 = 346, baseBottom = 187, baseTop = baseBottom - sideHeight;
  const wallPx = Math.max(8, Math.min(17, n.wall / bodyWidth * 214 * 2));
  const bottomPx = Math.max(8, Math.min(16, n.bottom / result.baseHeight * sideHeight * 1.5));
  const lidY = baseTop - 15, lidHeight = 9;
  const neckHalf = Math.max(13, Math.min(34, n.neckDiameter / bodyWidth * 107));
  const neckTop = Math.max(20, lidY - Math.min(37, result.externalNeck / bodyWidth * 150 + 15));
  const neckEnd = Math.min(baseBottom - bottomPx - 10, baseTop + Math.min(46, Math.max(20, result.externalNeck / bodyWidth * 150 + 15)));
  const center = (x0 + x1) / 2;
  const lidDrawing = inward
    ? `<path d="M${x0} ${lidY}H${center-neckHalf+8}V${neckEnd}H${center-neckHalf}V${lidY+lidHeight}H${x0}Z M${center+neckHalf-8} ${lidY}H${x1}V${lidY+lidHeight}H${center+neckHalf}V${neckEnd}H${center+neckHalf-8}Z" fill="url(#hatch)" stroke="#3b735b" stroke-width="2" stroke-linejoin="round"/>`
    : `<path d="M${x0} ${lidY}H${center-neckHalf}V${neckTop}H${center-neckHalf+8}V${lidY+lidHeight}H${center+neckHalf-8}V${neckTop}H${center+neckHalf}V${lidY}H${x1}V${lidY+lidHeight}H${x0}Z" fill="url(#hatch)" stroke="#3b735b" stroke-width="2" stroke-linejoin="round"/>`;
  const neckLabelY = inward ? neckEnd : neckTop;
  return `<svg viewBox="0 0 560 230" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs><pattern id="hatch" patternUnits="userSpaceOnUse" width="7" height="7" patternTransform="rotate(45)"><rect width="7" height="7" fill="#dce9dc"/><path d="M0 0V7" stroke="#abc8b0" stroke-width="2"/></pattern></defs>
    <g fill="none" stroke="#3b735b" stroke-width="2">${topOutline}<circle cx="64" cy="105" r="8"/></g>
    <g fill="none" stroke="#3b735b" stroke-width="1.5">${topPins}</g>
    <text x="64" y="164" text-anchor="middle" fill="#7d9081" font-size="10" font-family="Arial">widok z góry</text>
    <path d="M${x0} ${baseTop}V${baseBottom}H${x1}V${baseTop}h-${wallPx}V${baseBottom-bottomPx}H${x0+wallPx}V${baseTop}Z" fill="url(#hatch)" stroke="#3b735b" stroke-width="2" stroke-linejoin="round"/>
    ${lidDrawing}
    <path d="M${x0} ${baseTop-4}H${x1}" stroke="#86aa90" stroke-dasharray="4 4"/>
    <path d="M${x0} 202H${x1}M${x0} 197v10M${x1} 197v10" stroke="#9aa99d" stroke-width="1"/>
    <text x="239" y="219" text-anchor="middle" fill="#65766a" font-size="12" font-family="Arial">${widthLabel} mm</text>
    <path d="M${x1+19} ${baseTop}V${baseBottom}M${x1+14} ${baseTop}h10M${x1+14} ${baseBottom}h10" stroke="#9aa99d" stroke-width="1"/>
    <text x="${x1+31}" y="${(baseTop+baseBottom)/2}" fill="#65766a" font-size="12" font-family="Arial">${number.format(result.baseHeight)} mm</text>
    <path d="M${center+neckHalf+8} ${neckLabelY}L${center+neckHalf+42} ${neckLabelY-8}" stroke="#9aa99d" stroke-width="1"/>
    <text x="${center+neckHalf+46}" y="${neckLabelY-10}" fill="#65766a" font-size="11" font-family="Arial">szyjka</text>
    <text x="${center}" y="${baseTop+sideHeight/2}" text-anchor="middle" fill="#80a18b" font-size="12" font-family="Arial">komora</text>
  </svg>`;
}
function render() {
  const input = inputValues();
  material(input.environment);
  document.querySelector('#lid-print-note').textContent = input.neckDirection === 'inward'
    ? 'Druk zewnętrzną stroną na stole; szyjka do góry'
    : 'Druk wewnętrzną stroną na stole; szyjka do góry';
  const result = autoDesign(input);
  currentResult = result.errors.length ? null : result;
  downloadBase.disabled = !currentResult;
  downloadLid.disabled = !currentResult;
  downloadDowels.disabled = !currentResult;
  errorBox.classList.toggle('hidden', !result.errors.length);
  resultContent.classList.toggle('hidden', !!result.errors.length);
  if (result.errors.length) {
    statusText.textContent = 'Popraw parametry, aby pobrać STL.';
    errorBox.innerHTML = `<ul>${result.errors.map(message => `<li>${message}</li>`).join('')}</ul>`;
    return;
  }
  errorBox.innerHTML = '';
  statusText.textContent = 'Wymiary dobrane automatycznie do drukarki.';
  document.querySelector('#volume').textContent = fmt(result.volume / 1e6, 'l');
  document.querySelector('#fit-badge').textContent = result.orientation === 'standard' ? 'Mieści się na stole' : 'Obróć o 90° na stole';
  document.querySelector('#drawing').innerHTML = drawing(result);
  const n = result.input;
  document.querySelector('#dowel-part-name').textContent = `Kołki ×${result.dowelCount}`;
  document.querySelector('#dowel-print-note').textContent = `Druk pionowo · Ø ${number.format(result.dowelDiameter)} × ${number.format(result.dowelLength)} mm`;
  const outer = n.shape === 'round' ? `Ø ${fmt(n.diameter)}` : n.shape === 'hex' ? `${fmt(n.diameter)} między bokami` : `${fmt(n.width)} × ${fmt(n.depth)}`;
  const inner = n.shape === 'round' ? `Ø ${fmt(result.innerWidth)}` : n.shape === 'hex' ? `${fmt(result.innerWidth)} między bokami` : `${fmt(result.innerWidth)} × ${fmt(result.innerDepth)}`;
  document.querySelector('#stats').innerHTML = [
    stat('Korpus zewnętrzny', outer),
    stat('Komora w przekroju', inner),
    stat('Wysokość komory', fmt(result.cavityHeight)),
    stat('Wysokość bazy', fmt(result.baseHeight)),
    stat('Wysokość pokrywy z szyjką', fmt(result.lidHeight)),
    stat('Otwór szyjki', `Ø ${fmt(n.neckDiameter)}`),
    stat('Długość szyjki', fmt(n.neckLength)),
    stat('Kierunek szyjki', n.neckDirection === 'inward' ? 'Do środka' : 'Na zewnątrz'),
    ...(n.neckDirection === 'inward' ? [
      stat('Odstęp końca szyjki od dna', fmt(result.tipClearance)),
      stat('Objętość zajęta przez szyjkę', fmt(result.displacedVolume / 1000, 'cm³')),
    ] : []),
    stat('Kołki osobno', `${result.dowelCount} × Ø ${fmt(result.dowelDiameter)}`),
    stat('Gniazda w obu częściach', `Ø ${fmt(result.socketDiameter)} × ${fmt(result.socketDepth)}`),
    stat('Luz kołka na stronę', fmt(n.pinClearance)),
  ].join('');
}
function download(part) {
  if (!currentResult) return;
  const mesh = part === 'base' ? makeBase(currentResult) : part === 'lid' ? makeLid(currentResult) : makeDowels(currentResult);
  const partName = part === 'base' ? 'baza' : part === 'lid' ? 'pokrywa' : 'kolki';
  const filename = `rezonator_${Math.round(currentResult.input.frequency)}Hz_${currentResult.input.neckDirection === 'inward' ? 'szyjka_wewnatrz' : 'szyjka_zewnatrz'}_${partName}.stl`;
  const url = URL.createObjectURL(binaryStl(mesh, filename));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
form.addEventListener('input', render);
form.addEventListener('change', render);
downloadBase.addEventListener('click', () => download('base'));
downloadLid.addEventListener('click', () => download('lid'));
downloadDowels.addEventListener('click', () => download('dowels'));
render();
