# Guia de contribuição

Obrigado por querer ajudar! Este guia explica como contribuir sem surpresas.

## Antes de começar

- Procure nas [issues](https://github.com/edu-amr/escape-the-slop/issues) se o assunto já existe.
- Para mudanças grandes, abra uma issue antes para conversarmos sobre a ideia.
- Siga o [Código de Conduta](CODE_OF_CONDUCT.md).

## Preparar o ambiente

```bash
git clone https://github.com/<seu-usuario>/escape-the-slop.git
cd escape-the-slop
npm install      # instala também os hooks do Husky
npm run dev
```

Node.js 20.9 ou superior (`.nvmrc`).

## Fluxo de trabalho

1. Faça um fork e crie uma branch a partir de `main`: `feat/nome-curto` ou `fix/nome-curto`.
2. Faça a mudança, mantendo o escopo pequeno (uma PR, um assunto).
3. Rode `npm run check`. Ele executa lint, formatação, tipos e validação das bibliotecas, igual ao CI.
4. Faça o commit no padrão abaixo e abra a PR preenchendo o modelo.

## Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/pt-br/), em português:

```text
feat: adiciona a biblioteca Fancy Components
fix: corrige o fechamento do menu de idioma
docs: atualiza o passo a passo do README
chore: atualiza dependências
```

Tipos aceitos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
O commitlint recusa mensagens fora do padrão.

## Padrões de código

- **TypeScript estrito** e componentes React funcionais.
- **Imports** ordenados pelo ESLint (`npm run lint:fix` resolve).
- **Tailwind**: classes inline, sem CSS novo por componente. A ordem é corrigida pelo Prettier
  (`npm run format`), e o ESLint barra classes duplicadas ou conflitantes.
- **Textos da interface** ficam em `data/i18n.ts`, nos **4 idiomas** (pt-br, en, fr, es). Não deixe texto fixo em componente.
- **Acessibilidade**: elementos interativos precisam de nome acessível e foco visível.
- Não adicione dependências sem necessidade; explique o motivo na PR.

## Adicionar uma biblioteca

Veja a seção [Como adicionar uma biblioteca](README.md#como-adicionar-uma-biblioteca). Em resumo:
inclua o item em `data/libs.ts`, gere a prévia com `npm run previews -- <slug>` e rode `npm run check`.

**Critérios para entrar na lista**

- Tem **identidade visual própria**; não vale ser só mais um conjunto no estilo shadcn padrão.
- O site está no ar e a licença é clara (ou há um jeito claro de usar).
- A prévia é uma captura limpa da página inicial, sem pop-ups, banners de cookies ou telas de verificação.
- Não é duplicada (o `npm run check:libs` avisa).

## Fontes e arquivos de terceiros

Só adicione fontes, imagens e código com licença que permita o uso, e guarde o texto da licença ao lado
do arquivo. Fontes só de "uso pessoal" não entram.

## Abrindo a Pull Request

- Título no padrão de commit.
- Descreva **o que mudou e por quê**, e anexe capturas de tela se mexeu na interface.
- Marque o que foi testado (idiomas, celular, tema).
- Mantenha a PR verde: o CI precisa passar.

Obrigado! 💙
