# Helmholtz STL Resonator Generator

## Polski

Generator projektów rezonatorów Helmholtza dostrojonych do wybranej częstotliwości i przeznaczonych do druku 3D. Rezonator składa się z komory powietrznej i szyjki; jego częstotliwość rezonansowa zależy od objętości komory oraz wymiarów szyjki.

Narzędzie automatycznie oblicza wymiary rezonatora z uwzględnieniem pola roboczego drukarki i temperatury powietrza. Obsługuje korpus okrągły, prostokątny, heksagonalny, eliptyczny, ośmiokątny i zaokrąglony oraz import pojedynczego wypukłego obrysu SVG. Sześć powiązanych suwaków steruje częstotliwością, wymiarami korpusu i geometrią szyjki. Poszczególne wartości można zablokować; po zmianie jednej wartości generator koryguje pozostałe odblokowane parametry, minimalizując ich względne zmiany i zachowując zadaną częstotliwość, jeśli pozwalają na to ograniczenia.

Rezonator może mieć szyjkę skierowaną na zewnątrz lub do środka oraz pokrywę przy szyjce albo na tylnej ściance. Generator tworzy modele STL korpusu, pokrywy i osobnych kołków montażowych; przy tylnej pokrywie i szyjce zewnętrznej dodaje osobny model szyjki. Elementy przekraczające pole robocze są dzielone na zamknięte segmenty STL w archiwach ZIP. Połączenia poziome korzystają z kołków, a pionowe z osobnych łączników do przyklejenia na zewnętrznej płaskiej stronie. Opcjonalne mocowanie ścienne obejmuje płytki z otworami typu keyhole, dystanse i kołki ze stożkowym znacznikiem punktów wiercenia. Narzędzie podaje obliczoną objętość, wymiary elementów, zalecany materiał i ustawienia druku. Interfejs jest dostępny po polsku i angielsku.

Strojenie wynika z przybliżonego modelu akustycznego. Rzeczywista częstotliwość gotowego wydruku może różnić się od obliczonej.

## English

A generator for 3D-printable Helmholtz resonators tuned to a selected frequency. A Helmholtz resonator consists of an air cavity and a neck; its resonant frequency depends on the cavity volume and neck geometry.

The tool automatically calculates resonator dimensions while accounting for the printer build volume and air temperature. It supports round, rectangular, hexagonal, elliptical, octagonal, and rounded bodies, plus a single convex outline imported from SVG. Six linked sliders control frequency, body dimensions, and neck geometry. Individual values can be locked; after one value changes, the generator adjusts the remaining unlocked parameters by minimizing relative changes and preserving the target frequency when the constraints allow it.

The resonator can have an outward or inward neck and a cover on either the neck side or the back wall. The generator creates STL models for the body, cover, and separate alignment dowels; a back cover with an outward neck also includes a separate neck model. Parts that exceed the build volume are divided into closed STL segments inside ZIP archives. Horizontal joints use dowels, while vertical seams use separate glue-on joiners on the flat outside face. Optional wall mounting adds keyhole plates, spacers, and pointed drill markers. The tool reports the calculated volume, part dimensions, recommended material, and print settings. The interface is available in Polish and English.

Tuning is based on an approximate acoustic model. The measured frequency of a printed resonator may differ from the calculated value.
