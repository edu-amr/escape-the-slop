<div align="center">

# Escape the Slop

**Tudo que você precisa para um front-end que não parece feito por IA.**

Uma curadoria aberta de bibliotecas de componentes, blocos, animações, gráficos, ícones e ilustrações
com personalidade, sem gradiente roxo e sem card igual a todos os outros.

[Ver o site](https://escape-the-slop.vercel.app) · [Sugerir uma biblioteca](https://github.com/edu-amr/escape-the-slop/issues/new?template=nova-biblioteca.yml) · [Contribuir](CONTRIBUTING.md)

by [riivo](https://riivo.com.br) · Licença [MIT](LICENSE)

</div>

---

## Sobre

Quase todo projeto novo acaba com a mesma cara: cards arredondados, gradientes roxos e a mesma paleta.
O **Escape the Slop** reúne bibliotecas que têm identidade própria, cada uma com uma prévia do site,
para você achar rápido uma alternativa diferente.

- Busca por nome e filtro por categoria (componentes, blocos, animações, gráficos, ícones e recursos).
- Disponível em **português (padrão), inglês, francês e espanhol**.
- Feito para ser indexado: SEO completo, `hreflang`, sitemap, dados estruturados (JSON-LD),
  imagens Open Graph por idioma e `llms.txt` para mecanismos generativos (GEO).

## Stack

| Área          | Tecnologia                                                         |
| ------------- | ------------------------------------------------------------------ |
| Framework     | [Next.js](https://nextjs.org) 16 (App Router) e React 19           |
| Estilo        | [Tailwind CSS](https://tailwindcss.com) v4                         |
| Componentes   | Radix UI, copiados do `riivo-ui` (sem instalar a lib)              |
| Fundo animado | [Pixel Blast](https://reactbits.dev/backgrounds/pixel-blast) (MIT) |
| Qualidade     | ESLint, Prettier, commitlint, Husky e lint-staged                  |
| Hospedagem    | Vercel (Analytics e Speed Insights)                                |

## Como rodar

Requisitos: **Node.js 20.9 ou superior** (veja `.nvmrc`) e npm.

```bash
git clone https://github.com/edu-amr/escape-the-slop.git
cd escape-the-slop
npm install
npm run dev
```

Abra <http://localhost:3000>.

### Variáveis de ambiente

| Variável               | Para quê                                                              | Padrão                               |
| ---------------------- | --------------------------------------------------------------------- | ------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | URL pública do site (canonical, sitemap, Open Graph, `llms.txt`, SEO) | `https://escape-the-slop.vercel.app` |

Copie `.env.example` para `.env.local` para desenvolver. Na Vercel, defina a variável em Settings → Environment Variables com o domínio real (a barra final é ignorada).

## Scripts

| Comando              | O que faz                                                          |
| -------------------- | ------------------------------------------------------------------ |
| `npm run dev`        | Servidor de desenvolvimento                                        |
| `npm run build`      | Build de produção                                                  |
| `npm run lint`       | ESLint (Next, imports ordenados, classes do Tailwind)              |
| `npm run lint:fix`   | Corrige o que o ESLint consegue corrigir                           |
| `npm run format`     | Formata tudo com Prettier (inclui a ordem das classes do Tailwind) |
| `npm run typecheck`  | Checagem de tipos do TypeScript                                    |
| `npm run check:libs` | Valida `data/libs.ts` (slug, URL, categoria, duplicados)           |
| `npm run check`      | Roda tudo acima, igual ao CI                                       |
| `npm run previews`   | Tira as capturas de tela das bibliotecas                           |

## Como adicionar uma biblioteca

1. Edite [`data/libs.ts`](data/libs.ts) e acrescente um item:

   ```ts
   {
     slug: "minha-lib",          // kebab-case, único
     name: "Minha Lib",
     url: "https://minha-lib.dev/",
     category: "components",     // components | blocks | animations | charts | icons | inspiration | resources
     // wait: 9000,              // opcional: espera em ms para sites lentos
   },
   ```

2. Gere a prévia (precisa de um Chromium do Playwright: `npx playwright-core install chromium`,
   ou aponte `CHROMIUM_PATH`):

   ```bash
   npm run previews -- minha-lib
   ```

3. Confira o resultado em `public/previews/minha-lib.jpg` (sem pop-ups ou banners de cookies) e rode `npm run check`.

Critérios para entrar: a biblioteca precisa ter **identidade visual própria** (não vale ser só mais um
conjunto de componentes no estilo shadcn padrão), estar no ar e ter licença clara. Veja o
[guia de contribuição](CONTRIBUTING.md).

## Estrutura

```text
app/            rotas (pt na raiz, demais idiomas em /[lang]), sitemap, robots, llms.txt, manifest
components/     interface (cards, filtros, seletor de idioma, fundo Pixel Blast)
data/           libs.ts (as bibliotecas) e i18n.ts (textos nos 4 idiomas)
lib/            SEO, Open Graph, llms.txt, utilitários
scripts/        capture.mjs (prévias), check-libs.mjs (validação), crisp-chat.tsx
public/         prévias, bandeiras e ícones
```

## Qualidade e padrões

- **Commits** seguem o [Conventional Commits](https://www.conventionalcommits.org/pt-br/), validados
  pelo commitlint (`feat:`, `fix:`, `docs:`, `chore:`...). Mensagens em português.
- **Antes de cada commit** o Husky roda o lint-staged (ESLint e Prettier só nos arquivos alterados).
- **Imports** ordenados automaticamente (`simple-import-sort`) e **classes do Tailwind** ordenadas
  e checadas contra duplicadas e conflitantes.
- **CI** no GitHub Actions: lint, formatação, tipos, validação das bibliotecas e build.

## Licença

Código sob a [licença MIT](LICENSE). Pode usar, copiar e modificar à vontade.
O conteúdo de terceiros abaixo mantém as licenças originais.

## Licenças de terceiros

- Fundo [Pixel Blast](https://reactbits.dev), do React Bits, sob licença MIT.
- Fonte Libre Franklin (SIL OFL), em `app/fonts/`, com o texto da licença ao lado.
- Bandeiras do pacote [flag-icons](https://github.com/lipis/flag-icons) (MIT).
- As capturas de tela pertencem aos sites das respectivas bibliotecas e são usadas apenas para identificá-las.

## Contribuir

Contribuições são muito bem-vindas. Leia o [CONTRIBUTING.md](CONTRIBUTING.md) e o
[Código de Conduta](CODE_OF_CONDUCT.md). Para dúvidas de segurança, veja [SECURITY.md](SECURITY.md).
