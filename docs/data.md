# Data Model

Each game follows this schema:

- `id`
- `name` (`pt`/`en`)
- `description` (`pt`/`en`)
- `url`
- `category[]`
- `order`
- `createdAt`
- `image`

## Source

The dataset is stored in `data/games.ts` as a typed static array (`Game[]`).

## Notes

- Names and descriptions are bilingual and short/consistent.
- `order` supports manual sorting.
- `createdAt` supports newest/oldest sorting.
- `image` points to local SVG assets under `public/logos`.
