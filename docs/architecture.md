# Architecture

## Directory Layout

- `app`: App Router pages, metadata and global layout
- `components`: Reusable UI units (`games-explorer`, `game-card`, `footer`)
- `data`: Static game dataset
- `types`: Shared domain types
- `lib`: Constants, i18n helpers and game filtering/sorting
- `styles`: Design-system-oriented base style layer
- `docs`: Project documentation

## Rendering Strategy

- `app/page.tsx` is a server component that reads `?page=` and seeds initial pagination.
- `components/games-explorer.tsx` is a client component for interactive state:
  - locale
  - theme
  - search
  - sorting
  - infinite scroll

## State Ownership

- Interactive UI state is local to the explorer component for simplicity.
- Data remains static and typed to avoid extra APIs and reduce complexity.
