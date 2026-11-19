# Escape the Slop

Hub de bibliotecas de UI com personalidade, para fugir do visual genérico de IA.

## Adicionar uma biblioteca

1. Edite `data/libs.ts` e acrescente `{ slug, name, url, category }` (use `wait` em ms se o site demora a carregar).
2. Rode `npm run previews` (ou `npm run previews -- <slug>` para uma só). Isso tira a captura em `public/previews/<slug>.jpg`.

Requer um Chromium do Playwright instalado (`npx playwright-core install chromium`) ou `CHROMIUM_PATH` apontando para um.

## Rodar

`npm run dev`
