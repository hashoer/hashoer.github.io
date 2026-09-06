# Hashoer EN Website — Build Summary

## What was built
English single-page version of https://www.huashuhe.com/ — Hashoer Intelligent Technology (Shanghai) Ltd.

## Files
- `hashoer-en/index.html` — Complete English website (~36KB)

## Data sources
- Videos: 5 MP4 files scraped from original site
  - `https://img03.71360.com/w3/pj549k/20250410/664b2cdcc71aba799adfff832c904a03.mp4`
  - `https://img03.71360.com/w3/pj549k/20240407/3144d1ffa8b8e634fddcd1dc63510370.mp4`
  - `https://img03.71360.com/w3/pj549k/20240407/c9f22dc6460a6dbc073df0ef62f9b40e.mp4`
  - `https://img03.71360.com/w3/pj549k/20240407/1386b8496b97893bbb43b34f75f01e61.mp4`
  - `https://img03.71360.com/w3/pj549k/20240407/0b967e9bc976c1ef2841bdc622a1f5ef.mp4`
- Video thumbnails: `https://img03.71360.com/w3/pj549k/20240407/28cfef0c163fa9a8f82548c571614f1e.jpg`
- Product images: `https://img03.71360.com/w3/q12ddm/20231012/2af74726f46d55952f3fe9e5cf1adfbf.jpg`
- Product detail links: `https://www.huashuhe.com/product-item-{8,5,3,4}.html`

## Sections
1. Nav (sticky)
2. Hero with CTA buttons
3. Product categories (5 cards)
4. Featured products with real images + links to original CN site
5. Videos — 5 real MP4s with modal player, dark theme section
6. News — 3 articles (EN translated)
7. About with stats (4 engineers, 10+ technicians, 3+ countries, 5 sectors)
8. Why Choose Hashoer — 4 advantage cards
9. Contact form + 4 info cards
10. Footer

## Interactions
- Video modal: click play button → full-screen video player
- ESC or click outside → close modal
- Form submit → success feedback animation
- All scroll navigation anchors work
- Fully responsive (mobile-friendly)
- `onerror` fallbacks for all external images
