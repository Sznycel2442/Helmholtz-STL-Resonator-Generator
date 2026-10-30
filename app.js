const COPY = {
  pl: {
    eyebrow: 'PROJEKTOWANIE DO DRUKU 3D', title: 'Rezonator Helmholtza',
    lead: 'Podaj częstotliwość. Generator dobierze wymiary i przygotuje modele STL.',
    designTitle: 'Zaprojektuj', designSubtitle: 'Kształt i parametry rezonatora.',
    parametersTitle: 'Parametry rezonatora', frequencyLabel: 'Częstotliwość',
    widthLabel: 'Szerokość korpusu', depthLabel: 'Głębokość korpusu', heightLabel: 'Wysokość komory',
    neckDiameterLabel: 'Średnica szyjki', neckLengthLabel: 'Długość szyjki',
    lockHint: 'Zablokuj przed automatyczną zmianą', unlockHint: 'Odblokuj automatyczną zmianę',
    shapeTitle: 'Kształt korpusu', shapeRound: 'Okrągły', shapeBox: 'Prostokątny', shapeHex: 'Heksagonalny',
    shapeEllipse: 'Eliptyczny', shapeOctagon: 'Ośmiokątny', shapeRounded: 'Zaokrąglony', shapeSvg: 'Z pliku SVG',
    designAdvancedTitle: 'Obrys SVG i temperatura',
    svgTitle: 'Własny obrys SVG', svgLabel: 'Jeden zamknięty, wypukły obrys', svgHint: 'Wybierz kształt „Z pliku SVG”, a następnie wczytaj plik.',
    svgLoaded: 'Wczytano obrys:', svgInvalid: 'Nie udało się wczytać SVG. Użyj jednego zamkniętego obrysu bez transformacji.',
    svgConcave: 'Obrys musi być wypukły i nie może mieć otworów.', svgOpen: 'Ścieżka SVG musi być zamknięta.',
    wallMountTitle: 'Mocowanie do ściany', wallMountLabel: 'Dodaj mocowania typu keyhole i kołki do oznaczenia wiercenia',
    wallMountHint: 'Dwie płytki i cztery dystanse do przyklejenia na tylnej ściance; dwa kołki do oznaczenia otworów. Po sklejeniu sprawdź nośność.',
    mountPart: 'Mocowania i znaczniki wiercenia', mountNote: '2 płytki 30×50×3 mm, 4 dystanse 6×40×4 mm, 2 znaczniki. Łeb śruby ≤8 mm, trzpień ≤4 mm.',
    downloadMount: 'Pobierz mocowania ZIP',
    neckDirectionTitle: 'Kierunek szyjki', outward: 'Na zewnątrz', inward: 'Do środka',
    coverPlacementTitle: 'Miejsce pokrywy', coverNeck: 'Przy szyjce', coverBack: 'Tylna ścianka',
    printerVolumeTitle: 'Pole robocze drukarki',
    dowelFitTitle: 'Spasowanie kołków', dowelClearanceLabel: 'Luz na stronę',
    conditionsTitle: 'Warunki pracy', environmentLabel: 'Materiał do warunków',
    indoor: 'Wewnątrz', warm: 'Wyższa temperatura', outdoor: 'Na zewnątrz / w słońcu',
    temperatureLabel: 'Temperatura powietrza', resultTitle: 'Gotowy projekt', cavityVolume: 'Objętość komory',
    filesTitle: 'Pliki do druku', downloadBase: 'Pobierz bazę STL', downloadLid: 'Pobierz pokrywę STL',
    downloadDowels: 'Pobierz kołki STL', downloadNeck: 'Pobierz szyjkę STL', downloadJoiner: 'Pobierz łącznik STL', materialTitle: 'ZALECANY MATERIAŁ',
    downloadBaseZip: 'Pobierz segmenty bazy ZIP', downloadLidZip: 'Pobierz segmenty pokrywy ZIP',
    printTitle: 'Ustawienia druku', printSubtitle: 'Drukarka, materiał i parametry',
    layerLabel: 'Warstwa', layerValue: '0,20 mm', wallsLabel: 'Obrysy', infillLabel: 'Wypełnienie',
    infillValue: '30% gyroid', solidLabel: 'Pełne warstwy góra/dół',
    dowelInfillLabel: 'Kołki', dowelInfillValue: '100% wypełnienia', supportsLabel: 'Podpory', supportsValue: 'Wyłączone',
    printCavityNote: 'Wypełnienie dotyczy ścianek i pokrywy; komora pozostaje pusta.',
    sourceAirtight: 'Szczelność wydruków', sourceLayers: 'Warstwy i obrysy',
    methodNote: 'Obliczenia korzystają z przybliżonego modelu Helmholtza. Gotowy wydruk warto zmierzyć po uszczelnieniu połączeń.',
    sourceFormula: 'Podstawa wzoru', sourceMaterials: 'Materiały',
    materialPETG: 'Dobry wybór do użytku wewnątrz. Stosuj kilka obrysów i szczelnie sklej połączenia.',
    materialASAWarm: 'Lepszy przy wyższej temperaturze. Duże części drukuj w zamkniętej komorze.',
    materialASAOutdoor: 'Odporny na słońce i wyższą temperaturę. Duże części drukuj w zamkniętej komorze.',
    printAdvicePETG: 'Sprawdź w podglądzie slicera pełne warstwy dna i pokrywy. Po montażu uszczelnij styk części oraz szyjkę.',
    printAdviceASA: 'Drukuj w zamkniętej komorze; przy dużej podstawie dodaj brim 5–8 mm. Po montażu uszczelnij wszystkie styki.',
    neckGlueAdvice: ' Osobną szyjkę wklej tak, aby jej wewnętrzny koniec był na równo z dnem komory.',
    autoFit: 'Projekt obliczony.', fixParams: 'Popraw parametry, aby pobrać STL.',
    fit: 'Mieści się na stole', rotate: 'Obróć o 90° na stole', segmented: 'Podzielony do druku',
    splitNote: 'Podział: {x} × {y} na stole, {z} sekcji wysokości. Każdy segment mieści się na drukarce.',
    segmentedParts: 'Podzielone części są eksportowane jako osobne STL w archiwach ZIP.',
    partsMount: 'Części rezonatora i dodatkowy zestaw mocowań.',
    joinerPart: 'Łącznik klejony', joinerNote: '24×8×2 mm; drukuj po dwa na styk segmentów XY i przyklej na płaskiej zewnętrznej stronie.',
    zDowelNote: 'Drukuj {count} zestawów kołków dla połączeń poziomych i pokrywy.',
    generatingFiles: 'Przygotowuję pliki STL…', exportFailed: 'Nie udało się przygotować części. Zmień proporcje i spróbuj ponownie.',
    topView: 'widok od wlotu', neckLabel: 'szyjka', cavityLabel: 'komora', betweenFlats: 'między bokami',
    baseSockets: 'Baza z gniazdami', baseNeck: 'Korpus z szyjką i gniazdami', basePort: 'Korpus z otworem i gniazdami',
    neckLid: 'Pokrywa z szyjką i gniazdami', rearLid: 'Pokrywa tylna z gniazdami',
    dowels: 'Kołki', neckPart: 'Osobna szyjka',
    printBaseBottom: 'Druk dnem na stole', printBaseFront: 'Druk przednią ścianką na stole',
    printNeckLidOut: 'Druk stroną wewnętrzną na stole', printNeckLidIn: 'Druk stroną zewnętrzną na stole',
    printRearLid: 'Druk stroną zewnętrzną na stole', printDowels: 'Druk pionowo',
    printNeck: 'Druk pionowo; wklej na równo z dnem komory',
    parts3: 'Trzy osobne wydruki, bez podpór w komorze.', parts4: 'Cztery osobne wydruki, bez podpór w komorze.',
    statOuter: 'Korpus zewnętrzny', statInner: 'Komora w przekroju', statCavityHeight: 'Wysokość komory',
    statBaseHeight: 'Wysokość korpusu', statLidHeight: 'Wysokość pokrywy w druku',
    statNeckHole: 'Otwór szyjki', statNeckArea: 'Przekrój szyjki', statNeckLength: 'Długość szyjki', statDirection: 'Kierunek szyjki',
    statCover: 'Miejsce pokrywy', statTipClearance: 'Odstęp szyjki od przeciwnej ścianki',
    statDisplaced: 'Objętość zajęta przez szyjkę', statDowels: 'Kołki osobno',
    statSockets: 'Gniazda w obu częściach', statPinClearance: 'Luz kołka na stronę',
    statSeparateNeck: 'Osobna szyjka w druku',
  },
  en: {
    eyebrow: 'DESIGNED FOR 3D PRINTING', title: 'Helmholtz Resonator',
    lead: 'Enter a target frequency. The generator calculates the dimensions and prepares STL models.',
    designTitle: 'Design', designSubtitle: 'Resonator shape and parameters.',
    parametersTitle: 'Resonator parameters', frequencyLabel: 'Frequency',
    widthLabel: 'Body width', depthLabel: 'Body depth', heightLabel: 'Cavity height',
    neckDiameterLabel: 'Neck diameter', neckLengthLabel: 'Neck length',
    lockHint: 'Lock against automatic changes', unlockHint: 'Allow automatic changes',
    shapeTitle: 'Body shape', shapeRound: 'Round', shapeBox: 'Rectangular', shapeHex: 'Hexagonal',
    shapeEllipse: 'Elliptical', shapeOctagon: 'Octagonal', shapeRounded: 'Rounded', shapeSvg: 'From SVG file',
    designAdvancedTitle: 'SVG outline and temperature',
    svgTitle: 'Custom SVG outline', svgLabel: 'One closed, convex outline', svgHint: 'Select “From SVG file”, then load an SVG.',
    svgLoaded: 'Loaded outline:', svgInvalid: 'Could not read the SVG. Use one closed outline without transforms.',
    svgConcave: 'The outline must be convex and contain no holes.', svgOpen: 'The SVG path must be closed.',
    wallMountTitle: 'Wall mounting', wallMountLabel: 'Add keyhole mounts and drill marking pins',
    wallMountHint: 'Glue two plates and four spacers to the flat back; use two pointed pins to mark the drill positions. Check the bond before hanging.',
    mountPart: 'Mounts and drill markers', mountNote: '2 plates 30×50×3 mm, 4 spacers 6×40×4 mm, 2 markers. Screw head ≤8 mm, shank ≤4 mm.',
    downloadMount: 'Download mounts ZIP',
    neckDirectionTitle: 'Neck direction', outward: 'Outward', inward: 'Into cavity',
    coverPlacementTitle: 'Cover location', coverNeck: 'Neck side', coverBack: 'Back wall',
    printerVolumeTitle: 'Printer build volume',
    dowelFitTitle: 'Dowel fit', dowelClearanceLabel: 'Clearance per side',
    conditionsTitle: 'Operating conditions', environmentLabel: 'Material for the conditions',
    indoor: 'Indoors', warm: 'Higher temperature', outdoor: 'Outdoors / sunlight',
    temperatureLabel: 'Air temperature', resultTitle: 'Design result', cavityVolume: 'Cavity volume',
    filesTitle: 'Print files', downloadBase: 'Download base STL', downloadLid: 'Download cover STL',
    downloadDowels: 'Download dowels STL', downloadNeck: 'Download neck STL', downloadJoiner: 'Download joiner STL', materialTitle: 'RECOMMENDED MATERIAL',
    downloadBaseZip: 'Download base segments ZIP', downloadLidZip: 'Download cover segments ZIP',
    printTitle: 'Print settings', printSubtitle: 'Printer, material, and parameters',
    layerLabel: 'Layer height', layerValue: '0.20 mm', wallsLabel: 'Perimeters', infillLabel: 'Infill',
    infillValue: '30% gyroid', solidLabel: 'Top / bottom solid layers',
    dowelInfillLabel: 'Dowels', dowelInfillValue: '100% infill', supportsLabel: 'Supports', supportsValue: 'Off',
    printCavityNote: 'Infill applies to the walls and cover; the cavity stays hollow.',
    sourceAirtight: 'Watertight prints', sourceLayers: 'Layers and perimeters',
    methodNote: 'The design uses an approximate Helmholtz model. Measure the printed resonator after sealing the joints.',
    sourceFormula: 'Acoustic model', sourceMaterials: 'Materials',
    materialPETG: 'A practical choice indoors. Use several perimeters and seal the joints carefully.',
    materialASAWarm: 'Better for higher temperatures. Print large parts in an enclosure.',
    materialASAOutdoor: 'Resists sunlight and higher temperatures. Print large parts in an enclosure.',
    printAdvicePETG: 'Check the solid bottom and cover layers in the slicer preview. Seal the body joint and neck after assembly.',
    printAdviceASA: 'Print in an enclosure; add a 5–8 mm brim for a large footprint. Seal every joint after assembly.',
    neckGlueAdvice: ' Glue the separate neck with its inner end flush with the cavity floor.',
    autoFit: 'Design calculated.', fixParams: 'Correct the inputs to download STL files.',
    fit: 'Fits the build plate', rotate: 'Rotate 90° on the plate', segmented: 'Split for printing',
    splitNote: 'Split: {x} × {y} on the plate, {z} height sections. Every segment fits the printer.',
    segmentedParts: 'Split parts are exported as separate STL files inside ZIP archives.',
    partsMount: 'Resonator parts plus a separate mounting set.',
    joinerPart: 'Glue-on seam joiner', joinerNote: '24×8×2 mm; print two per XY seam and glue them to the flat outside face.',
    zDowelNote: 'Print {count} sets of dowels for the horizontal joints and cover.',
    generatingFiles: 'Preparing STL files…', exportFailed: 'Could not prepare the parts. Change the proportions and try again.',
    topView: 'inlet view', neckLabel: 'neck', cavityLabel: 'cavity', betweenFlats: 'across flats',
    baseSockets: 'Base with sockets', baseNeck: 'Body with neck and sockets', basePort: 'Body with port and sockets',
    neckLid: 'Cover with neck and sockets', rearLid: 'Back cover with sockets',
    dowels: 'Dowels', neckPart: 'Separate neck',
    printBaseBottom: 'Print with the bottom on the bed', printBaseFront: 'Print with the front wall on the bed',
    printNeckLidOut: 'Print with the cavity side on the bed', printNeckLidIn: 'Print with the outer side on the bed',
    printRearLid: 'Print with the outer side on the bed', printDowels: 'Print upright',
    printNeck: 'Print upright; glue flush with the cavity floor',
    parts3: 'Three separate prints, no supports inside the cavity.', parts4: 'Four separate prints, no supports inside the cavity.',
    statOuter: 'Outer body', statInner: 'Cavity cross section', statCavityHeight: 'Cavity height',
    statBaseHeight: 'Body print height', statLidHeight: 'Cover print height',
    statNeckHole: 'Neck opening', statNeckArea: 'Neck cross section', statNeckLength: 'Neck length', statDirection: 'Neck direction',
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
  'Nieznany kształt korpusu.': 'Unknown body shape.',
  'Zaimportuj poprawny obrys SVG.': 'Import a valid SVG outline.',
  'Proporcje muszą być w zakresie 0,5–2,0.': 'Proportions must be between 0.5 and 2.0.',
  'Projekt wymaga zbyt wielu części dla tego pola roboczego.': 'This build volume would require too many parts.',
  'Pole robocze Z jest za niskie dla podziału korpusu.': 'The Z build volume is too short for body sections.',
  'Pole robocze XY jest za małe na segmenty i łączniki.': 'The XY build plate is too small for segments and joiners.',
  'Nie udało się dobrać komory i szyjki dla tych ustawień. Zmień proporcje lub częstotliwość.': 'Could not fit the cavity and neck to these settings. Change the proportions or frequency.',
  'Wybrane proporcje dają zbyt płytką komorę lub zbyt mały odstęp szyjki. Zmniejsz szerokość lub głębokość.': 'These proportions make the cavity too shallow or leave too little neck clearance. Reduce the width or depth.',
  'Pole robocze jest za małe na mocowanie ścienne.': 'The build plate is too small for the wall mount.',
  'Pole robocze Z jest za niskie na znacznik wiercenia.': 'The Z build volume is too short for the drill marker.',
  'Korpus jest za mały na dwa mocowania ścienne. Zwiększ szerokość lub głębokość.': 'The body is too small for two wall mounts. Increase its width or depth.',
  'Wybrane wymiary nie tworzą poprawnej komory.': 'These dimensions do not form a valid cavity.',
  'Nie da się zachować częstotliwości przy tych blokadach i zakresach suwaków.': 'The frequency cannot be preserved with these locks and slider limits.',
  'Okrąg wymaga jednakowej szerokości i głębokości; obie wartości są zablokowane.': 'A round body needs equal width and depth; both values are locked.',
};
const POSITIVE_EN = {
  'częstotliwość': 'frequency', 'średnica otworu szyjki': 'neck opening diameter', 'długość szyjki': 'neck length',
  'grubość ścianek': 'wall thickness', 'grubość dna': 'bottom thickness', 'grubość pokrywy': 'cover thickness',
  'pole robocze X': 'build volume X', 'pole robocze Y': 'build volume Y', 'pole robocze Z': 'build volume Z',
};

const form = document.querySelector('#config');
const printPanel = document.querySelector('.print-panel');
const languageSelect = document.querySelector('#language');
const errorBox = document.querySelector('#error-box');
const resultContent = document.querySelector('#result-content');
const statusText = document.querySelector('#status-text');
const downloadButtons = {
  base: document.querySelector('#download-base'), lid: document.querySelector('#download-lid'),
  dowels: document.querySelector('#download-dowels'), neck: document.querySelector('#download-neck'),
  joiner: document.querySelector('#download-joiner'),
  mount: document.querySelector('#download-mount'),
};
let language = languageSelect.value || 'pl';
let number = new Intl.NumberFormat(language === 'pl' ? 'pl-PL' : 'en-US', { maximumFractionDigits: 1 });
let currentResult = null;
let importedSvg = null;
let svgImportError = '';
let designValues = null;
const designLocks = { frequency: true, width: false, depth: false, cavityHeight: false, neckDiameter: true, neckLength: true };
let solverMessage = '';
let solverBlocked = false;

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
  if (designValues) syncDesignControls();
}
function translateError(message) {
  if (language === 'pl') return message;
  if (message.startsWith('Podaj dodatnią wartość: ')) {
    const label = message.slice('Podaj dodatnią wartość: '.length, -1);
    return `Enter a positive value for ${POSITIVE_EN[label] || label}.`;
  }
  return ERROR_EN[message] || message;
}
function inputValues() {
  const values = Object.fromEntries(new FormData(form).entries());
  if (designValues) Object.assign(values, designValues);
  if (values.shape === 'svg' && importedSvg) {
    values.customPoints = importedSvg.points;
    values.svgAspect = importedSvg.aspect;
  }
  return values;
}

function syncDesignControls() {
  for (const key of DESIGN_VARIABLES) {
    const value = designValues[key];
    document.querySelector(`[data-design="${key}"]`).value = value;
    document.querySelector(`[data-design-number="${key}"]`).value = Math.round(value * 10) / 10;
    const button = document.querySelector(`[data-lock="${key}"]`);
    button.textContent = designLocks[key] ? '🔒' : '🔓';
    button.setAttribute('aria-pressed', String(designLocks[key]));
    button.setAttribute('aria-label', `${tr(designLocks[key] ? 'unlockHint' : 'lockHint')}: ${tr({
      frequency: 'frequencyLabel', width: 'widthLabel', depth: 'depthLabel', cavityHeight: 'heightLabel',
      neckDiameter: 'neckDiameterLabel', neckLength: 'neckLengthLabel',
    }[key])}`);
  }
}

function initializeDesign() {
  const initialFrequency = Number(document.querySelector('[data-design="frequency"]').value);
  const seed = autoDesign({ ...inputValues(), frequency: initialFrequency });
  designValues = seed.errors.length ? {
    frequency: initialFrequency, width: 145, depth: 145, cavityHeight: 109, neckDiameter: 20, neckLength: 30,
  } : {
    frequency: initialFrequency, width: seed.input.width, depth: seed.input.depth,
    cavityHeight: seed.cavityHeight, neckDiameter: seed.input.neckDiameter, neckLength: seed.input.neckLength,
  };
  if (seed.errors.length) { solverMessage = seed.errors[0]; solverBlocked = true; }
  syncDesignControls();
}

function updateDesignValue(key, value) {
  const numeric = Number(value), [minimum, maximum] = DESIGN_LIMITS[key];
  if (!Number.isFinite(numeric) || numeric < minimum || numeric > maximum) {
    solverMessage = 'Wartość suwaka jest poza dozwolonym zakresem.';
    syncDesignControls();
    render();
    return;
  }
  const previous = { ...designValues };
  const shapeInput = form.querySelector('input[name="shape"]:checked');
  const previousShape = shapeInput.value;
  if (previousShape === 'round' && ['width', 'depth'].includes(key) &&
      Math.abs(numeric - designValues[key === 'width' ? 'depth' : 'width']) > 0.01) {
    form.querySelector('input[name="shape"][value="ellipse"]').checked = true;
  }
  const candidate = { ...designValues, [key]: numeric };
  const solution = solveDesign(inputValues(), candidate, designLocks, key);
  if (solution.values) {
    designValues = solution.values;
    solverMessage = '';
    solverBlocked = false;
  } else {
    designValues = previous;
    form.querySelector(`input[name="shape"][value="${previousShape}"]`).checked = true;
    solverMessage = solution.error;
  }
  syncDesignControls();
  render();
}

function resolveLayoutChange() {
  const layout = inputValues();
  if (layout.shape === 'svg' && !importedSvg) {
    solverBlocked = true;
    solverMessage = 'Zaimportuj poprawny obrys SVG.';
    render();
    return;
  }
  const solution = solveDesign(layout, designValues, designLocks, null);
  if (solution.values) {
    designValues = solution.values;
    solverMessage = '';
    solverBlocked = false;
  } else {
    solverMessage = solution.error;
    solverBlocked = true;
  }
  syncDesignControls();
  render();
}
function material(environment) {
  const name = environment === 'indoor' ? 'PETG' : 'ASA';
  set('#material-name', name);
  set('#material-description', tr(environment === 'outdoor' ? 'materialASAOutdoor' : environment === 'warm' ? 'materialASAWarm' : 'materialPETG'));
  set('#print-advice', tr(environment === 'indoor' ? 'printAdvicePETG' : 'printAdviceASA'));
}

function drawing(result) {
  const n = result.input, back = n.coverPlacement === 'back', inward = n.neckDirection === 'inward';
  const outline = profileOutline(n);
  const topOutline = `<polygon points="${outline.map(([x, y]) => `${64 + 76 * x / result.footprintX},${105 + 76 * y / result.footprintY}`).join(' ')}"/>`;
  const pinAngles = n.shape === 'hex' ? Array.from({ length: 6 }, (_, i) => -Math.PI / 2 + (i + 0.5) * Math.PI / 3)
    : n.shape === 'round' ? [Math.PI / 4, 3 * Math.PI / 4, 5 * Math.PI / 4, 7 * Math.PI / 4] : null;
  const topPins = pinAngles
    ? pinAngles.map(angle => `<circle cx="${64 + 31 * Math.cos(angle)}" cy="${105 + 31 * Math.sin(angle)}" r="2.5"/>`).join('')
    : [[64, 79], [96, 105], [64, 131], [32, 105]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.5"/>`).join('');
  const widthLabel = n.shape === 'round' && Math.abs(n.width - n.depth) < 0.01 ? `Ø ${number.format(n.width)}`
    : `${number.format(result.footprintX)} × ${number.format(result.footprintY)}`;
  const bodyWidth = result.footprintX;
  const sideHeight = Math.min(106, Math.max(42, result.baseHeight / bodyWidth * 154));
  const x0 = 132, x1 = 346, baseBottom = 187, baseTop = baseBottom - sideHeight;
  const wallPx = Math.max(8, Math.min(17, n.wall / bodyWidth * 428));
  const bottomPx = Math.max(8, Math.min(16, n.bottom / result.baseHeight * sideHeight * 1.5));
  const lidHeight = 9, lidY = baseTop - lidHeight, center = (x0 + x1) / 2;
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
  const solverNote = document.querySelector('#solver-note');
  solverNote.classList.toggle('hidden', !solverMessage || solverBlocked);
  solverNote.textContent = solverMessage && !solverBlocked ? translateError(solverMessage) : '';
  set('#svg-status', svgImportError ? tr(svgImportError) : importedSvg ? `${tr('svgLoaded')} ${importedSvg.name}` : tr('svgHint'));
  set('#export-subtitle', tr(input.wallMount ? 'partsMount' : partCount === 4 ? 'parts4' : 'parts3'));
  set('#base-part-name', tr(back ? inward ? 'baseNeck' : 'basePort' : 'baseSockets'));
  set('#base-print-note', tr(back ? 'printBaseFront' : 'printBaseBottom'));
  set('#lid-part-name', tr(back ? 'rearLid' : 'neckLid'));
  set('#lid-print-note', tr(back ? 'printRearLid' : inward ? 'printNeckLidIn' : 'printNeckLidOut'));
  set('#dowel-part-name', `${tr('dowels')} ×${input.shape === 'hex' ? 6 : 4}`);
  set('#dowel-print-note', tr('printDowels'));
  set('#neck-part-name', tr('neckPart'));
  set('#neck-print-note', tr('printNeck'));
  set('#joiner-part-name', tr('joinerPart'));
  set('#joiner-print-note', tr('joinerNote'));
  set('#mount-part-name', tr('mountPart'));
  set('#mount-print-note', tr('mountNote'));
  if (separateNeck) set('#print-advice', document.querySelector('#print-advice').textContent + tr('neckGlueAdvice'));
  document.querySelector('#neck-part').classList.toggle('hidden', !separateNeck);
  downloadButtons.neck.classList.toggle('hidden', !separateNeck);
  document.querySelector('.export-actions').classList.toggle('has-neck', separateNeck);

  const result = solverBlocked ? { errors: [solverMessage] } : calculateDesign(input, designValues);
  currentResult = result.errors.length ? null : result;
  const segmentedXY = !!currentResult && (result.splitX > 1 || result.splitY > 1);
  document.querySelector('#joiner-part').classList.toggle('hidden', !segmentedXY);
  downloadButtons.joiner.classList.toggle('hidden', !segmentedXY);
  document.querySelector('#mount-part').classList.toggle('hidden', !input.wallMount);
  downloadButtons.mount.classList.toggle('hidden', !input.wallMount);
  for (const [part, button] of Object.entries(downloadButtons)) button.disabled = !currentResult || (part === 'neck' && !separateNeck) || (part === 'joiner' && !segmentedXY) || (part === 'mount' && !input.wallMount);
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
  const segmented = segmentedXY || result.splitZ > 1;
  set('#fit-badge', tr(segmented ? 'segmented' : result.orientation === 'standard' ? 'fit' : 'rotate'));
  set('#split-note', segmented ? tr('splitNote').replace('{x}', result.splitX).replace('{y}', result.splitY).replace('{z}', result.splitZ) : '');
  if (segmented) set('#export-subtitle', tr('segmentedParts'));
  set('#download-base span[data-i18n]', tr(segmented ? 'downloadBaseZip' : 'downloadBase'));
  set('#download-lid span[data-i18n]', tr(segmentedXY ? 'downloadLidZip' : 'downloadLid'));
  document.querySelector('#drawing').innerHTML = drawing(result);
  const n = result.input;
  const outer = n.shape === 'round' && Math.abs(n.width - n.depth) < 0.01 ? `Ø ${fmt(n.width)}` : `${fmt(result.footprintX)} × ${fmt(result.footprintY)}`;
  const inner = n.shape === 'round' && Math.abs(result.innerWidth - result.innerDepth) < 0.01 ? `Ø ${fmt(result.innerWidth)}` : `${fmt(result.innerWidth)} × ${fmt(result.innerDepth)}`;
  document.querySelector('#stats').innerHTML = [
    stat(tr('statOuter'), outer), stat(tr('statInner'), inner),
    stat(tr('statCavityHeight'), fmt(result.cavityHeight)), stat(tr('statBaseHeight'), fmt(result.baseHeight)),
    stat(tr('statLidHeight'), fmt(result.lidHeight)),
    stat(tr('statNeckHole'), `Ø ${fmt(n.neckDiameter)}`), stat(tr('statNeckArea'), fmt(Math.PI * (n.neckDiameter / 2) ** 2, 'mm²')),
    stat(tr('statNeckLength'), fmt(n.neckLength)),
    stat(tr('statDirection'), tr(inward ? 'inward' : 'outward')),
    stat(tr('statCover'), tr(back ? 'coverBack' : 'coverNeck')),
    ...(inward ? [stat(tr('statTipClearance'), fmt(result.tipClearance)), stat(tr('statDisplaced'), fmt(result.displacedVolume / 1000, 'cm³'))] : []),
    ...(separateNeck ? [stat(tr('statSeparateNeck'), fmt(result.neckPrintHeight))] : []),
    stat(tr('statDowels'), `${result.dowelCount} × Ø ${fmt(result.dowelDiameter)}`),
    stat(tr('statSockets'), `Ø ${fmt(result.socketDiameter)} × ${fmt(result.socketDepth)}`),
    stat(tr('statPinClearance'), fmt(n.pinClearance)),
  ].join('');
  set('#dowel-print-note', result.splitZ > 1 ? tr('zDowelNote').replace('{count}', result.splitZ)
    : `${tr('printDowels')} · Ø ${number.format(result.dowelDiameter)} × ${number.format(result.dowelLength)} mm`);
}

async function download(part) {
  if (!currentResult) return;
  const result = currentResult, button = downloadButtons[part];
  button.disabled = true;
  statusText.textContent = tr('generatingFiles');
  try {
    const parts = modelParts(result, part);
    if (!parts.length) return;
    const multiple = parts.length > 1;
    const filename = multiple ? `helmholtz_${Math.round(result.input.frequency)}Hz_${part}_segments.zip` : parts[0].name;
    const blob = multiple ? await zipStls(parts) : binaryStl(parts[0].mesh, filename);
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
    if (result === currentResult) statusText.textContent = tr('autoFit');
  } catch (error) {
    console.error(error);
    if (result === currentResult) statusText.textContent = tr('exportFailed');
  } finally {
    if (result === currentResult) button.disabled = false;
  }
}

for (const key of DESIGN_VARIABLES) {
  document.querySelector(`[data-design="${key}"]`).addEventListener('input', event => updateDesignValue(key, event.target.value));
  document.querySelector(`[data-design-number="${key}"]`).addEventListener('change', event => updateDesignValue(key, event.target.value));
  document.querySelector(`[data-lock="${key}"]`).addEventListener('click', () => {
    designLocks[key] = !designLocks[key];
    if (solverBlocked) resolveLayoutChange(); else { syncDesignControls(); render(); }
  });
}
form.addEventListener('input', event => {
  if (event.target.dataset.design || event.target.dataset.designNumber ||
      ['shape', 'neckDirection', 'coverPlacement', 'temperature'].includes(event.target.name) || event.target.id === 'svg-file') return;
  render();
});
form.addEventListener('change', event => {
  if (event.target.dataset.design || event.target.dataset.designNumber || event.target.id === 'svg-file') return;
  if (event.target.name === 'shape' && event.target.value === 'svg') document.querySelector('.advanced').open = true;
  if (['shape', 'neckDirection', 'coverPlacement', 'temperature'].includes(event.target.name)) resolveLayoutChange();
  else render();
});
printPanel.addEventListener('input', render);
printPanel.addEventListener('change', render);
document.querySelector('#svg-file').addEventListener('change', async event => {
  const file = event.target.files[0];
  importedSvg = null;
  svgImportError = '';
  if (file) {
    try {
      if (file.size > 1000000) throw new Error('invalidSvg');
      importedSvg = { ...importSvgOutline(await file.text()), name: file.name };
      form.querySelector('input[name="shape"][value="svg"]').checked = true;
      document.querySelector('.advanced').open = true;
    } catch (error) {
      svgImportError = error.message === 'concaveSvg' ? 'svgConcave' : error.message === 'openSvg' ? 'svgOpen' : 'svgInvalid';
    }
  }
  resolveLayoutChange();
});
languageSelect.addEventListener('change', () => {
  language = languageSelect.value;
  number = new Intl.NumberFormat(language === 'pl' ? 'pl-PL' : 'en-US', { maximumFractionDigits: 1 });
  applyLanguage();
  render();
});
for (const [part, button] of Object.entries(downloadButtons)) button.addEventListener('click', () => download(part));
initializeDesign();
applyLanguage();
render();
