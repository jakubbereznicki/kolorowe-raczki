## Kolorowe Centrum — wizytówka

Prosta strona-wizytówka szkoły dla dzieci (0–12 lat) z:
- home page z sekcjami (slider, galeria, kalendarz, o nas, kontakt),
- nawigacją z dropdownami,
- mini‑SPA routingiem (History API),
- RWD (<500 / <1024 / <1920),
- animacjami hover i scroll‑reveal.

### Jak uruchomić (bez instalacji paczek)
W tym repo nie korzystamy z menedżera paczek (brak `npm` w środowisku), więc jest prosty serwer na Node:

```bash
node dev-server.js
```

Potem otwórz `http://localhost:5173`.

### SCSS
Źródła SCSS są w `src/styles/`. Do działania w przeglądarce używany jest zbudowany CSS w `assets/styles.css`.
Jeśli chcesz kompilować SCSS automatycznie, doinstaluj w swoim systemie `sass` i dodaj watch (opcjonalnie).

