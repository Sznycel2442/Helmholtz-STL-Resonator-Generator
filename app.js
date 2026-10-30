const COPY = {
  pl: {
    eyebrow: 'PROJEKTOWANIE DO DRUKU 3D', title: 'Rezonator Helmholtza',
    lead: 'Podaj częstotliwość. Generator dobierze wymiary i przygotuje modele STL.',
    designTitle: 'Zaprojektuj', designSubtitle: 'Wybierz częstotliwość i układ.',
    frequencyLabel: 'Częstotliwość docelowa', frequencyHint: 'Wymiary komory i szyjki dobierają się automatycznie.',
    shapeTitle: 'Kształt korpusu', shapeRound: 'Okrągły', shapeBox: 'Prostokątny', shapeHex: 'Heksagonalny',
    neckDirectionTitle: 'Kierunek szyjki', outward: 'Na zewnątrz', inward: 'Do środka',
    coverPlacementTitle: 'Miejsce pokrywy', coverNeck: 'Przy szyjce', coverBack: 'Tylna ścianka',
    settingsSummary: 'Drukarka i warunki pracy', printerVolumeTitle: 'Pole robocze drukarki',
    dowelFitTitle: 'Spasowanie kołków', dowelClearanceLabel: 'Luz na stronę',
    conditionsTitle: 'Warunki pracy', environmentLabel: 'Materiał do warunków',
    indoor: 'Wewnątrz', warm: 'Wyższa temperatura', outdoor: 'Na zewnątrz / w słońcu',
    temperatureLabel: 'Temperatura powietrza', resultTitle: 'Gotowy projekt', cavityVolume: 'Objętość komory',
    filesTitle: 'Pliki do druku', downloadBase: 'Pobierz bazę STL', downloadLid: 'Pobierz pokrywę STL',
    downloadDowels: 'Pobierz kołki STL', downloadNeck: 'Pobierz szyjkę STL', materialTitle: 'ZALECANY MATERIAŁ',
    printTitle: 'Ustawienia druku', printSubtitle: 'Punkt wyjścia dla dyszy 0,4 mm',
    layerLabel: 'Warstwa', layerValue: '0,20 mm', wallsLabel: 'Obrysy', infillLabel: 'Wypełnienie',
    infillValue: '30% gyroid', solidLabel: 'Pełne warstwy góra/dół',
    dowelInfillLabel: 'Kołki', dowelInfillValue: '100% wypełnienia', supportsLabel: 'Podpory', supportsValue: 'Wyłączone',
    printCavityNote: 'Wypełnienie dotyczy ścianek i pokrywy; komora pozostaje pusta.',
    sourceAirtight: 'Szczelność wydruków', sourceLayers: 'Warstwy i obrysy',
    methodNote: 'Obliczenia korzystają z przybliżonego modelu Helmholtza. Gotowy wydruk warto zmierzyć po uszczelnieniu połączeń.',
    sourceFormula: 'Podstawa wzoru', sourceMaterials: 'Materiały',
    coverHintNeck: 'Szyjka jest częścią zdejmowanej pokrywy.',
    coverHintBackIn: 'Tylna pokrywa jest płaska; szyjka wchodzi do komory od przodu.',
    coverHintBackOut: 'Szyjka jest osobnym elementem wklejanym w przednią ściankę, aby uniknąć podpór.',
    materialPETG: 'Dobry wybór do użytku wewnątrz. Stosuj kilka obrysów i szczelnie sklej połączenia.',
    materialASAWarm: 'Lepszy przy wyższej temperaturze. Duże części drukuj w zamkniętej komorze.',
    materialASAOutdoor: 'Odporny na słońce i wyższą temperaturę. Duże części drukuj w zamkniętej komorze.',
    printAdvicePETG: 'Sprawdź w podglądzie slicera pełne warstwy dna i pokrywy. Po montażu uszczelnij styk części oraz szyjkę.',
    printAdviceASA: 'Drukuj w zamkniętej komorze; przy dużej podstawie dodaj brim 5–8 mm. Po montażu uszczelnij wszystkie styki.',
    neckGlueAdvice: ' Osobną szyjkę wklej tak, aby jej wewnętrzny koniec był na równo z dnem komory.',
    autoFit: 'Wymiary dobrane automatycznie do drukarki.', fixParams: 'Popraw parametry, aby pobrać STL.',
    fit: 'Mieści się na stole', rotate: 'Obróć o 90° na stole',
    topView: 'widok od wlotu', neckLabel: 'szyjka', cavityLabel: 'komora', betweenFlats: 'między bokami',
    baseSockets: 'Baza z gniazdami', baseNeck: 'Korpus z szyjką i gniazdami', basePort: 'Korpus z otworem i gniazdami',
    neckLid: 'Pokrywa z szyjką i gniazdami', rearLid: 'Pokrywa tylna z gniazdami',
    dowels: 'Kołki', neckPart: 'Osobna szyjka',
    printBaseBottom: 'Druk dnem na stole', printBaseFront: 'Druk przednią ścianką na stole',
    printNeckLidOut: 'Druk stroną wewnętrzną na stole', printNeckLidIn: 'Druk stroną zewnętrzną na stole',
    printRearLid: 'Druk stroną zewnętrzną na stole', printDowels: 'Druk pionowo',
    printNeck: 'Druk pionowo; wklej na równo z dnem komory',
    parts3: 'Trzy osobne wydruki, bez podpór w komorze.', parts4: 'Cztery osobne wydruki, bez podpór w komorze.',
    assemblyFront: 'Wsuń kołki w gniazda bazy, załóż pokrywę i szczelnie sklej płaski styk.',
    assemblyBackIn: 'Wsuń kołki w korpus, załóż tylną pokrywę i szczelnie sklej płaski styk.',
    assemblyBackOut: 'Wklej szyjkę w przednią ściankę na równo z dnem komory. Następnie załóż tylną pokrywę na kołki i uszczelnij oba połączenia.',
    statOuter: 'Korpus zewnętrzny', statInner: 'Komora w przekroju', statCavityHeight: 'Wysokość komory',
    statBaseHeight: 'Wysokość korpusu', statLidHeight: 'Wysokość pokrywy w druku',
    statNeckHole: 'Otwór szyjki', statNeckLength: 'Długość szyjki', statDirection: 'Kierunek szyjki',
    statCover: 'Miejsce pokrywy', statTipClearance: 'Odstęp szyjki od przeciwnej ścianki',
    statDisplaced: 'Objętość zajęta przez szyjkę', statDowels: 'Kołki osobno',
    statSockets: 'Gniazda w obu częściach', statPinClearance: 'Luz kołka na stronę',
    statSeparateNeck: 'Osobna szyjka w druku',
  },
  en: {
    eyebrow: 'DESIGNED FOR 3D PRINTING', title: 'Helmholtz Resonator',
    lead: 'Enter a target frequency. The generator calculates the dimensions and prepares STL models.',
    designTitle: 'Design', designSubtitle: 'Choose a frequency and layout.',
    frequencyLabel: 'Target frequency', frequencyHint: 'Cavity and neck dimensions are selected automatically.',
    shapeTitle: 'Body shape', shapeRound: 'Round', shapeBox: 'Rectangular', shapeHex: 'Hexagonal',
    neckDirectionTitle: 'Neck direction', outward: 'Outward', inward: 'Into cavity',
    coverPlacementTitle: 'Cover location', coverNeck: 'Neck side', coverBack: 'Back wall',
    settingsSummary: 'Printer and conditions', printerVolumeTitle: 'Printer build volume',
    dowelFitTitle: 'Dowel fit', dowelClearanceLabel: 'Clearance per side',
    conditionsTitle: 'Operating conditions', environmentLabel: 'Material for the conditions',
    indoor: 'Indoors', warm: 'Higher temperature', outdoor: 'Outdoors / sunlight',
    temperatureLabel: 'Air temperature', resultTitle: 'Design result', cavityVolume: 'Cavity volume',
    filesTitle: 'Print files', downloadBase: 'Download base STL', downloadLid: 'Download cover STL',
    downloadDowels: 'Download dowels STL', downloadNeck: 'Download neck STL', materialTitle: 'RECOMMENDED MATERIAL',
    printTitle: 'Print settings', printSubtitle: 'Starting point for a 0.4 mm nozzle',
    layerLabel: 'Layer height', layerValue: '0.20 mm', wallsLabel: 'Perimeters', infillLabel: 'Infill',
    infillValue: '30% gyroid', solidLabel: 'Top / bottom solid layers',
    dowelInfillLabel: 'Dowels', dowelInfillValue: '100% infill', supportsLabel: 'Supports', supportsValue: 'Off',
    printCavityNote: 'Infill applies to the walls and cover; the cavity stays hollow.',
    sourceAirtight: 'Watertight prints', sourceLayers: 'Layers and perimeters',
    methodNote: 'The design uses an approximate Helmholtz model. Measure the printed resonator after sealing the joints.',
    sourceFormula: 'Acoustic model', sourceMaterials: 'Materials',
    coverHintNeck: 'The neck is part of the removable cover.',
    coverHintBackIn: 'The back cover is flat; the neck extends into the cavity from the front.',
    coverHintBackOut: 'The neck is a separate insert glued into the front wall, avoiding internal supports.',
    materialPETG: 'A practical choice indoors. Use several perimeters and seal the joints carefully.',
    materialASAWarm: 'Better for higher temperatures. Print large parts in an enclosure.',
    materialASAOutdoor: 'Resists sunlight and higher temperatures. Print large parts in an enclosure.',
    printAdvicePETG: 'Check the solid bottom and cover layers in the slicer preview. Seal the body joint and neck after assembly.',
    printAdviceASA: 'Print in an enclosure; add a 5–8 mm brim for a large footprint. Seal every joint after assembly.',
    neckGlueAdvice: ' Glue the separate neck with its inner end flush with the cavity floor.',
    autoFit: 'Dimensions fitted automatically to the printer.', fixParams: 'Correct the inputs to download STL files.',
    fit: 'Fits the build plate', rotate: 'Rotate 90° on the plate',
    topView: 'inlet view', neckLabel: 'neck', cavityLabel: 'cavity', betweenFlats: 'across flats',
    baseSockets: 'Base with sockets', baseNeck: 'Body with neck and sockets', basePort: 'Body with port and sockets',
    neckLid: 'Cover with neck and sockets', rearLid: 'Back cover with sockets',
    dowels: 'Dowels', neckPart: 'Separate neck',
    printBaseBottom: 'Print with the bottom on the bed', printBaseFront: 'Print with the front wall on the bed',
    printNeckLidOut: 'Print with the cavity side on the bed', printNeckLidIn: 'Print with the outer side on the bed',
    printRearLid: 'Print with the outer side on the bed', printDowels: 'Print upright',
    printNeck: 'Print upright; glue flush with the cavity floor',
    parts3: 'Three separate prints, no supports inside the cavity.', parts4: 'Four separate prints, no supports inside the cavity.',
    assemblyFront: 'Insert the dowels into the base, place the cover, and seal the flat joint.',
    assemblyBackIn: 'Insert the dowels into the body, place the back cover, and seal the flat joint.',
    assemblyBackOut: 'Glue the neck into the front wall, flush with the cavity floor. Fit the back cover on the dowels and seal both joints.',
    statOuter: 'Outer body', statInner: 'Cavity cross section', statCavityHeight: 'Cavity height',
    statBaseHeight: 'Body print height', statLidHeight: 'Cover print height',
    statNeckHole: 'Neck opening', statNeckLength: 'Neck length', statDirection: 'Neck direction',
    statCover: 'Cover location', statTipClearance: 'Neck tip clearance',
    statDisplaced: 'Volume displaced by neck', statDowels: 'Separate dowels',
    statSockets: 'Sockets in both parts', statPinClearance: 'Dowel clearance per side',
    statSeparateNeck: 'Separate neck print height',
  },
};

const ERROR_EN = {
  'Ścianki, dno i pokrywa muszą mieć co najmniej 0,8 mm grubości.': 'Walls, bottom, and cover must be at least 0.8 mm thick.',
  'Podaj średnicę korpusu.': 'Enter a body diameter.',
  'Podaj szerokość i głębokość korpusu.': 'Enter body width and depth.',
  'Temperatura musi mieścić się w zakresie −20–50 °C.': 'Air temperature must be between −20 and 50 °C.',
  'Margines stołu nie może być ujemny.': 'Build plate margin cannot be negative.',
  'Luz kołków musi wynosić 0,1–0,4 mm na stronę.': 'Dowel clearance must be 0.1–0.4 mm per side.',
  'Ścianka jest za cienka na gniazda kołków.': 'The wall is too thin for dowel sockets.',
  'Pokrywa jest za cienka na gniazda kołków.': 'The cover is too thin for dowel sockets.',
  'Ścianka jest zbyt gruba względem korpusu.': 'The wall is too thick for the body.',
  'Długość szyjki musi być większa od grubości ścianki z szyjką.': 'The neck must be longer than the wall that holds it.',
  'Szyjka jest zbyt szeroka dla wnętrza korpusu.': 'The neck is too wide for the cavity.',
  'Podstawa i pokrywa nie mieszczą się na stole XY z zadanym marginesem.': 'The body and cover do not fit the XY build plate with the selected margin.',
  'Baza jest zbyt wysoka dla pola roboczego Z.': 'The body is too tall for the Z build volume.',
  'Pokrywa jest zbyt wysoka dla pola roboczego Z.': 'The cover is too tall for the Z build volume.',
  'Osobna szyjka jest zbyt wysoka dla pola roboczego Z.': 'The separate neck is too tall for the Z build volume.',
  'Kołki są zbyt wysokie dla pola roboczego Z.': 'The dowels are too tall for the Z build volume.',
  'Komora ma mniej niż 3 mm wysokości; zmniejsz częstotliwość lub podstawę.': 'The cavity is less than 3 mm high; lower the frequency or body footprint.',
  'Baza jest za niska na gniazda kołków.': 'The body is too short for the dowel sockets.',
  'Wewnętrzna szyjka jest za blisko dna.': 'The internal neck is too close to the opposite wall.',
  'Podaj dodatnią częstotliwość.': 'Enter a positive frequency.',
  'Podaj dodatnie wymiary pola roboczego drukarki.': 'Enter positive printer build dimensions.',
  'Przy tej częstotliwości komora byłaby zbyt płytka lub szyjka za blisko dna. Wybierz niższą częstotliwość.': 'At this frequency the cavity would be too shallow or the neck too close to the opposite wall. Choose a lower frequency.',
  'Rezonator nie mieści się w podanym polu roboczym. Zwiększ pole robocze lub zmień częstotliwość.': 'The resonator does not fit the build volume. Use a larger printer or change the frequency.',
};
const POSITIVE_EN = {
  'częstotliwość': 'frequency', 'średnica otworu szyjki': 'neck opening diameter', 'długość szyjki': 'neck length',
  'grubość ścianek': 'wall thickness', 'grubość dna': 'bottom thickness', 'grubość pokrywy': 'cover thickness',
  'pole robocze X': 'build volume X', 'pole robocze Y': 'build volume Y', 'pole robocze Z': 'build volume Z',
};

const form = document.querySelector('#config');
const languageSelect = document.querySelector('#language');
const errorBox = document.querySelector('#error-box');
const resultContent = document.querySelector('#result-content');
const statusText = document.querySelector('#status-text');
const downloadButtons = {
  base: document.querySelector('#download-base'), lid: document.querySelector('#download-lid'),
  dowels: document.querySelector('#download-dowels'), neck: document.querySelector('#download-neck'),
};
let language = languageSelect.value || 'pl';
let number = new Intl.NumberFormat(language === 'pl' ? 'pl-PL' : 'en-US', { maximumFractionDigits: 1 });
let currentResult = null;

const tr = key => COPY[language][key] || COPY.pl[key] || key;
const set = (selector, value) => { document.querySelector(selector).textContent = value; };
const fmt = (value, unit = 'mm') => `${number.format(value)} ${unit}`;
const stat = (label, value) => `<div class="stat"><span>${label}</span><strong>${value}</strong></div>`;

function applyLanguage() {
  document.documentElement.lang = language;
  document.title = tr('title');
  document.querySelectorAll('[data-i18n]').forEach(element => { element.textContent = tr(element.dataset.i18n); });
  document.querySelectorAll('[data-i18n-aria]').forEach(element => { element.setAttribute('aria-label', tr(element.dataset.i18nAria)); });
  document.querySelector('#drawing').setAttribute('aria-label', tr('title'));
}
function translateError(message) {
  if (language === 'pl') return message;
  if (message.startsWith('Podaj dodatnią wartość: ')) {
    const label = message.slice('Podaj dodatnią wartość: '.length, -1);
    return `Enter a positive value for ${POSITIVE_EN[label] || label}.`;
  }
  return ERROR_EN[message] || message;
}
function inputValues() { return Object.fromEntries(new FormData(form).entries()); }
function material(environment) {
  const name = environment === 'indoor' ? 'PETG' : 'ASA';
  set('#material-name', name);
  set('#material-description', tr(environment === 'outdoor' ? 'materialASAOutdoor' : environment === 'warm' ? 'materialASAWarm' : 'materialPETG'));
  set('#print-advice', tr(environment === 'indoor' ? 'printAdvicePETG' : 'printAdviceASA'));
}

function drawing(result) {
  const n = result.input, back = n.coverPlacement === 'back', inward = n.neckDirection === 'inward';
  const topOutline = n.shape === 'round' ? '<circle cx="64" cy="105" r="38"/>'
    : n.shape === 'hex'
      ? `<polygon points="${Array.from({ length: 6 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 3; return `${64 + 38 * Math.cos(a)},${105 + 38 * Math.sin(a)}`; }).join(' ')}"/>`
      : '<rect x="28" y="76" width="72" height="58" rx="2"/>';
  const pinAngles = n.shape === 'hex' ? Array.from({ length: 6 }, (_, i) => -Math.PI / 2 + (i + 0.5) * Math.PI / 3)
    : n.shape === 'round' ? [Math.PI / 4, 3 * Math.PI / 4, 5 * Math.PI / 4, 7 * Math.PI / 4] : null;
  const topPins = pinAngles
    ? pinAngles.map(angle => `<circle cx="${64 + 31 * Math.cos(angle)}" cy="${105 + 31 * Math.sin(angle)}" r="2.5"/>`).join('')
    : [[64, 79], [96, 105], [64, 131], [32, 105]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.5"/>`).join('');
  const widthLabel = n.shape === 'round' ? `Ø ${number.format(n.diameter)}`
    : n.shape === 'hex' ? `${number.format(n.diameter)} ${tr('betweenFlats')}` : `${number.format(n.width)} × ${number.format(n.depth)}`;
  const bodyWidth = n.shape === 'box' ? n.width : n.diameter;
  const sideHeight = Math.min(106, Math.max(42, result.baseHeight / bodyWidth * 154));
  const x0 = 132, x1 = 346, baseBottom = 187, baseTop = baseBottom - sideHeight;
  const wallPx = Math.max(8, Math.min(17, n.wall / bodyWidth * 428));
  const bottomPx = Math.max(8, Math.min(16, n.bottom / result.baseHeight * sideHeight * 1.5));
  const lidY = baseTop - 15, lidHeight = 9, center = (x0 + x1) / 2;
  const neckHalf = Math.max(13, Math.min(34, n.neckDiameter / bodyWidth * 107));
  let baseDrawing, lidDrawing, neckLabelY;
  if (back) {
    const floorY = baseBottom - bottomPx;
    const tipY = inward ? Math.max(baseTop + 12, floorY - Math.min(45, result.externalNeck / bodyWidth * 150 + 15))
      : Math.min(209, baseBottom + Math.min(22, result.externalNeck / bodyWidth * 100 + 9));
    baseDrawing = `<path d="M${x0} ${baseTop}V${baseBottom}H${center-neckHalf}V${floorY}H${x0+wallPx}V${baseTop}Z M${x1} ${baseTop}V${baseBottom}H${center+neckHalf}V${floorY}H${x1-wallPx}V${baseTop}Z" fill="url(#hatch)" stroke="#3b735b" stroke-width="2" stroke-linejoin="round"/>
      <path d="M${center-neckHalf} ${floorY}V${tipY}H${center-neckHalf+8}V${floorY}Z M${center+neckHalf-8} ${floorY}V${tipY}H${center+neckHalf}V${floorY}Z" fill="url(#hatch)" stroke="#3b735b" stroke-width="2"/>`;
    lidDrawing = `<rect x="${x0}" y="${lidY}" width="${x1-x0}" height="${lidHeight}" fill="url(#hatch)" stroke="#3b735b" stroke-width="2"/>`;
    neckLabelY = tipY;
  } else {
    const neckTop = Math.max(20, lidY - Math.min(37, result.externalNeck / bodyWidth * 150 + 15));
    const neckEnd = Math.min(baseBottom - bottomPx - 10, baseTop + Math.min(46, Math.max(20, result.externalNeck / bodyWidth * 150 + 15)));
    baseDrawing = `<path d="M${x0} ${baseTop}V${baseBottom}H${x1}V${baseTop}h-${wallPx}V${baseBottom-bottomPx}H${x0+wallPx}V${baseTop}Z" fill="url(#hatch)" stroke="#3b735b" stroke-width="2" stroke-linejoin="round"/>`;
    lidDrawing = inward
      ? `<path d="M${x0} ${lidY}H${center-neckHalf+8}V${neckEnd}H${center-neckHalf}V${lidY+lidHeight}H${x0}Z M${center+neckHalf-8} ${lidY}H${x1}V${lidY+lidHeight}H${center+neckHalf}V${neckEnd}H${center+neckHalf-8}Z" fill="url(#hatch)" stroke="#3b735b" stroke-width="2" stroke-linejoin="round"/>`
      : `<path d="M${x0} ${lidY}H${center-neckHalf}V${neckTop}H${center-neckHalf+8}V${lidY+lidHeight}H${center+neckHalf-8}V${neckTop}H${center+neckHalf}V${lidY}H${x1}V${lidY+lidHeight}H${x0}Z" fill="url(#hatch)" stroke="#3b735b" stroke-width="2" stroke-linejoin="round"/>`;
    neckLabelY = inward ? neckEnd : neckTop;
  }
  return `<svg viewBox="0 0 560 230" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs><pattern id="hatch" patternUnits="userSpaceOnUse" width="7" height="7" patternTransform="rotate(45)"><rect width="7" height="7" fill="#dce9dc"/><path d="M0 0V7" stroke="#abc8b0" stroke-width="2"/></pattern></defs>
    <g fill="none" stroke="#3b735b" stroke-width="2">${topOutline}<circle cx="64" cy="105" r="8"/></g>
    <g fill="none" stroke="#3b735b" stroke-width="1.5">${topPins}</g>
    <text x="64" y="164" text-anchor="middle" fill="#7d9081" font-size="10" font-family="Arial">${tr('topView')}</text>
    ${baseDrawing}${lidDrawing}
    <path d="M${x0} ${baseTop-4}H${x1}" stroke="#86aa90" stroke-dasharray="4 4"/>
    <path d="M${x0} 202H${x1}M${x0} 197v10M${x1} 197v10" stroke="#9aa99d" stroke-width="1"/>
    <text x="239" y="219" text-anchor="middle" fill="#65766a" font-size="12" font-family="Arial">${widthLabel} mm</text>
    <path d="M${x1+19} ${baseTop}V${baseBottom}M${x1+14} ${baseTop}h10M${x1+14} ${baseBottom}h10" stroke="#9aa99d" stroke-width="1"/>
    <text x="${x1+31}" y="${(baseTop+baseBottom)/2}" fill="#65766a" font-size="12" font-family="Arial">${number.format(result.baseHeight)} mm</text>
    <path d="M${center+neckHalf+8} ${neckLabelY}L${center+neckHalf+42} ${neckLabelY-8}" stroke="#9aa99d" stroke-width="1"/>
    <text x="${center+neckHalf+46}" y="${neckLabelY-10}" fill="#65766a" font-size="11" font-family="Arial">${tr('neckLabel')}</text>
    <text x="${center}" y="${baseTop+sideHeight/2}" text-anchor="middle" fill="#80a18b" font-size="12" font-family="Arial">${tr('cavityLabel')}</text>
  </svg>`;
}

function render() {
  const input = inputValues();
  const back = input.coverPlacement === 'back', inward = input.neckDirection === 'inward';
  const separateNeck = back && !inward;
  const partCount = separateNeck ? 4 : 3;
  material(input.environment);
  set('#cover-hint', tr(back ? separateNeck ? 'coverHintBackOut' : 'coverHintBackIn' : 'coverHintNeck'));
  set('#export-subtitle', tr(partCount === 4 ? 'parts4' : 'parts3'));
  set('#base-part-name', tr(back ? inward ? 'baseNeck' : 'basePort' : 'baseSockets'));
  set('#base-print-note', tr(back ? 'printBaseFront' : 'printBaseBottom'));
  set('#lid-part-name', tr(back ? 'rearLid' : 'neckLid'));
  set('#lid-print-note', tr(back ? 'printRearLid' : inward ? 'printNeckLidIn' : 'printNeckLidOut'));
  set('#dowel-part-name', `${tr('dowels')} ×${input.shape === 'hex' ? 6 : 4}`);
  set('#dowel-print-note', tr('printDowels'));
  set('#neck-part-name', tr('neckPart'));
  set('#neck-print-note', tr('printNeck'));
  set('#assembly-note', tr(back ? separateNeck ? 'assemblyBackOut' : 'assemblyBackIn' : 'assemblyFront'));
  if (separateNeck) set('#print-advice', document.querySelector('#print-advice').textContent + tr('neckGlueAdvice'));
  document.querySelector('#neck-part').classList.toggle('hidden', !separateNeck);
  downloadButtons.neck.classList.toggle('hidden', !separateNeck);
  document.querySelector('.export-actions').classList.toggle('has-neck', separateNeck);

  const result = autoDesign(input);
  currentResult = result.errors.length ? null : result;
  for (const [part, button] of Object.entries(downloadButtons)) button.disabled = !currentResult || (part === 'neck' && !separateNeck);
  errorBox.classList.toggle('hidden', !result.errors.length);
  resultContent.classList.toggle('hidden', !!result.errors.length);
  if (result.errors.length) {
    statusText.textContent = tr('fixParams');
    errorBox.innerHTML = `<ul>${result.errors.map(message => `<li>${translateError(message)}</li>`).join('')}</ul>`;
    return;
  }

  errorBox.innerHTML = '';
  statusText.textContent = tr('autoFit');
  set('#volume', fmt(result.volume / 1e6, 'L'));
  set('#fit-badge', tr(result.orientation === 'standard' ? 'fit' : 'rotate'));
  document.querySelector('#drawing').innerHTML = drawing(result);
  const n = result.input;
  const outer = n.shape === 'round' ? `Ø ${fmt(n.diameter)}`
    : n.shape === 'hex' ? `${fmt(n.diameter)} ${tr('betweenFlats')}` : `${fmt(n.width)} × ${fmt(n.depth)}`;
  const inner = n.shape === 'round' ? `Ø ${fmt(result.innerWidth)}`
    : n.shape === 'hex' ? `${fmt(result.innerWidth)} ${tr('betweenFlats')}` : `${fmt(result.innerWidth)} × ${fmt(result.innerDepth)}`;
  document.querySelector('#stats').innerHTML = [
    stat(tr('statOuter'), outer), stat(tr('statInner'), inner),
    stat(tr('statCavityHeight'), fmt(result.cavityHeight)), stat(tr('statBaseHeight'), fmt(result.baseHeight)),
    stat(tr('statLidHeight'), fmt(result.lidHeight)),
    stat(tr('statNeckHole'), `Ø ${fmt(n.neckDiameter)}`), stat(tr('statNeckLength'), fmt(n.neckLength)),
    stat(tr('statDirection'), tr(inward ? 'inward' : 'outward')),
    stat(tr('statCover'), tr(back ? 'coverBack' : 'coverNeck')),
    ...(inward ? [stat(tr('statTipClearance'), fmt(result.tipClearance)), stat(tr('statDisplaced'), fmt(result.displacedVolume / 1000, 'cm³'))] : []),
    ...(separateNeck ? [stat(tr('statSeparateNeck'), fmt(result.neckPrintHeight))] : []),
    stat(tr('statDowels'), `${result.dowelCount} × Ø ${fmt(result.dowelDiameter)}`),
    stat(tr('statSockets'), `Ø ${fmt(result.socketDiameter)} × ${fmt(result.socketDepth)}`),
    stat(tr('statPinClearance'), fmt(n.pinClearance)),
  ].join('');
  set('#dowel-print-note', `${tr('printDowels')} · Ø ${number.format(result.dowelDiameter)} × ${number.format(result.dowelLength)} mm`);
}

function download(part) {
  if (!currentResult) return;
  const makers = { base: makeBase, lid: makeLid, dowels: makeDowels, neck: makeNeck };
  if (part === 'neck' && !(currentResult.input.coverPlacement === 'back' && currentResult.input.neckDirection === 'outward')) return;
  const filename = `helmholtz_${Math.round(currentResult.input.frequency)}Hz_${currentResult.input.coverPlacement}_${currentResult.input.neckDirection}_${part}.stl`;
  const url = URL.createObjectURL(binaryStl(makers[part](currentResult), filename));
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
languageSelect.addEventListener('change', () => {
  language = languageSelect.value;
  number = new Intl.NumberFormat(language === 'pl' ? 'pl-PL' : 'en-US', { maximumFractionDigits: 1 });
  applyLanguage();
  render();
});
for (const [part, button] of Object.entries(downloadButtons)) button.addEventListener('click', () => download(part));
applyLanguage();
render();
