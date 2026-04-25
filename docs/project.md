# topDLE

## Goal

topDLE is a minimal and SEO-friendly catalog of daily guessing games (Wordle-like), with bilingual content and fast client interactions.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS (Kraken-inspired theme tokens)
- No extra runtime dependencies

## Core Features

- Responsive card grid (1 column mobile, 2 columns desktop)
- Fully clickable cards with hover description
- Client-side search by game name
- Sorting by manual, name, newest, oldest
- Dark mode default with localStorage persistence
- PT/EN locale with localStorage persistence
- Hybrid pagination: server `?page=` + client infinite scroll

## Run

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run start
```
