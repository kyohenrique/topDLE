# SEO

## Metadata API

Global metadata is declared in `app/layout.tsx`:

- title template
- description
- canonical
- Open Graph
- robots

Page-level metadata is declared in `app/page.tsx` for targeted title/description.

## Hybrid Pagination

- Server-side: initial page is read from `?page=` in `app/page.tsx`.
- Client-side: infinite scroll progressively reveals more cards.
- URL synchronization: client updates the `?page=` query as visible pages increase.

This keeps first render crawlable while preserving smooth browsing.
