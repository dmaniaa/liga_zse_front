# Platforma turniejowa ZSE - front-end

## Instrukcje uruchamiania

```bash
# instalacja zależności
$ npm install

# uruchamianie testowe na localhost:3000
$ npm run dev

# build i uruchomienie wersji produkcyjnej
$ npm run build
$ npm run start

# generowanie projektu statycznego
$ npm run generate
```

Dla instrukcji jak modyfikować stronę, sprawdź [dokumentację frameworku Nuxt.js](https://nuxtjs.org).

Globalny styl znajduje się w /layouts/default.vue

Parę globalnych ustawień turnieju w /plugins/compConfig.js

Pasek nawigacyjny w /components/AppNavbar.vue

Strona główna w /pages/index.vue

Pliki które mają być dostępne dostępne pod ścieżką / znajdują się w /static/

Adres backendu znajduje się w pliku /nuxt.config.js w sekcji axios
