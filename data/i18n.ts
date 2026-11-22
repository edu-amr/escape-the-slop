import type { CategoryKey } from "@/data/libs";
import type { Locale } from "@/lib/site";

export type Dictionary = {
  by: string;
  language: string;
  title: string;
  lede: string;
  all: string;
  categories: Record<CategoryKey, string>;
  filter: string;
  search: string;
  searchLabel: string;
  clear: string;
  empty: string;
  latest: string;
  az: string;
  shuffle: string;
  submit: string;
  searchOrFilter: string;
  searchPlaceholder: string;
  clearAll: string;
  close: string;
  hintNavigate: string;
  hintOpen: string;
  footerTag: string;
  footerFade: string;
  github: string;
  newTab: string;
  preview: string;
  noPreview: string;
  seo: { title: string; description: string; keywords: string[] };
};

export const DICTIONARIES: Record<Locale, Dictionary> = {
  "pt-br": {
    by: "by",
    language: "Idioma",
    title: "Escape the Slop",
    lede: "Tudo que você precisa para um front-end que não parece feito por IA. Componentes, animações, ícones, ilustrações e mais: bibliotecas com personalidade, sem gradiente roxo e sem card igual a todos os outros.",
    all: "Todas",
    categories: {
      components: "Componentes",
      blocks: "Blocos",
      animations: "Animações",
      charts: "Gráficos",
      icons: "Ícones",
      inspiration: "Inspiração",
      resources: "Recursos",
    },
    filter: "Filtrar por categoria",
    search: "Buscar",
    searchLabel: "Buscar bibliotecas",
    clear: "Limpar busca",
    empty: "Nenhuma biblioteca encontrada.",
    latest: "Recentes",
    az: "A–Z",
    shuffle: "Aleatório",
    submit: "Enviar um site",
    searchOrFilter: "Buscar ou filtrar",
    searchPlaceholder: "Buscar bibliotecas, categorias…",
    clearAll: "Limpar filtros",
    close: "Fechar",
    hintNavigate: "navegar",
    hintOpen: "abrir",
    footerTag: "Para todas as bibliotecas com personalidade",
    footerFade: " — esperando para serem encontradas!",
    github: "Ver o código no GitHub",
    newTab: "abre em nova aba",
    preview: "Prévia do site",
    noPreview: "Sem prévia",
    seo: {
      title: "Escape the Slop — Bibliotecas de UI sem cara de IA",
      description:
        "Curadoria de bibliotecas de UI para React e Tailwind com personalidade: componentes, blocos, animações, gráficos, ícones e ilustrações para fugir do visual genérico de IA.",
      keywords: [
        "bibliotecas de UI",
        "componentes React",
        "Tailwind CSS",
        "shadcn/ui",
        "design system",
        "animações React",
        "ícones SVG",
        "UI sem cara de IA",
      ],
    },
  },
  en: {
    by: "by",
    language: "Language",
    title: "Escape the Slop",
    lede: "Everything you need for a front-end that doesn't look made by AI. Components, animations, icons, illustrations and more: libraries with personality, no purple gradients and no cookie-cutter cards.",
    all: "All",
    categories: {
      components: "Components",
      blocks: "Blocks",
      animations: "Animations",
      charts: "Charts",
      icons: "Icons",
      inspiration: "Inspiration",
      resources: "Resources",
    },
    filter: "Filter by category",
    search: "Search",
    searchLabel: "Search libraries",
    clear: "Clear search",
    empty: "No libraries found.",
    latest: "Latest",
    az: "A–Z",
    shuffle: "Shuffle",
    submit: "Submit a site",
    searchOrFilter: "Search or filter",
    searchPlaceholder: "Search libraries, categories…",
    clearAll: "Clear all filters",
    close: "Close",
    hintNavigate: "navigate",
    hintOpen: "open",
    footerTag: "For all the libraries with personality",
    footerFade: " — just waiting to be found!",
    github: "View the code on GitHub",
    newTab: "opens in a new tab",
    preview: "Preview of the site",
    noPreview: "No preview",
    seo: {
      title: "Escape the Slop — UI libraries that don't look like AI",
      description:
        "A curated list of React and Tailwind UI libraries with real personality: components, blocks, animations, charts, icons and illustrations to escape the generic AI look.",
      keywords: [
        "UI libraries",
        "React components",
        "Tailwind CSS",
        "shadcn/ui",
        "design system",
        "React animations",
        "SVG icons",
        "anti AI slop UI",
      ],
    },
  },
  fr: {
    by: "by",
    language: "Langue",
    title: "Escape the Slop",
    lede: "Tout ce qu'il faut pour un front-end qui n'a pas l'air fait par l'IA. Composants, animations, icônes, illustrations et plus : des bibliothèques pleines de personnalité, sans dégradé violet et sans carte identique aux autres.",
    all: "Toutes",
    categories: {
      components: "Composants",
      blocks: "Blocs",
      animations: "Animations",
      charts: "Graphiques",
      icons: "Icônes",
      inspiration: "Inspiration",
      resources: "Ressources",
    },
    filter: "Filtrer par catégorie",
    search: "Rechercher",
    searchLabel: "Rechercher des bibliothèques",
    clear: "Effacer la recherche",
    empty: "Aucune bibliothèque trouvée.",
    latest: "Récents",
    az: "A–Z",
    shuffle: "Aléatoire",
    submit: "Proposer un site",
    searchOrFilter: "Rechercher ou filtrer",
    searchPlaceholder: "Rechercher des bibliothèques, catégories…",
    clearAll: "Effacer les filtres",
    close: "Fermer",
    hintNavigate: "naviguer",
    hintOpen: "ouvrir",
    footerTag: "Pour toutes les bibliothèques avec du caractère",
    footerFade: " — qui n’attendent qu’à être trouvées !",
    github: "Voir le code sur GitHub",
    newTab: "s'ouvre dans un nouvel onglet",
    preview: "Aperçu du site",
    noPreview: "Pas d'aperçu",
    seo: {
      title: "Escape the Slop — Des bibliothèques d'UI sans look IA",
      description:
        "Une sélection de bibliothèques d'UI React et Tailwind pleines de personnalité : composants, blocs, animations, graphiques, icônes et illustrations pour échapper à l'esthétique générique de l'IA.",
      keywords: [
        "bibliothèques d'UI",
        "composants React",
        "Tailwind CSS",
        "shadcn/ui",
        "design system",
        "animations React",
        "icônes SVG",
        "UI sans look IA",
      ],
    },
  },
  es: {
    by: "by",
    language: "Idioma",
    title: "Escape the Slop",
    lede: "Todo lo que necesitas para un front-end que no parece hecho por IA. Componentes, animaciones, iconos, ilustraciones y más: bibliotecas con personalidad, sin degradados morados y sin tarjetas iguales a todas las demás.",
    all: "Todas",
    categories: {
      components: "Componentes",
      blocks: "Bloques",
      animations: "Animaciones",
      charts: "Gráficos",
      icons: "Iconos",
      inspiration: "Inspiración",
      resources: "Recursos",
    },
    filter: "Filtrar por categoría",
    search: "Buscar",
    searchLabel: "Buscar bibliotecas",
    clear: "Borrar búsqueda",
    empty: "No se encontró ninguna biblioteca.",
    latest: "Recientes",
    az: "A–Z",
    shuffle: "Aleatorio",
    submit: "Enviar un sitio",
    searchOrFilter: "Buscar o filtrar",
    searchPlaceholder: "Buscar bibliotecas, categorías…",
    clearAll: "Borrar filtros",
    close: "Cerrar",
    hintNavigate: "navegar",
    hintOpen: "abrir",
    footerTag: "Para todas las bibliotecas con personalidad",
    footerFade: " — ¡esperando a ser encontradas!",
    github: "Ver el código en GitHub",
    newTab: "se abre en una pestaña nueva",
    preview: "Vista previa del sitio",
    noPreview: "Sin vista previa",
    seo: {
      title: "Escape the Slop — Bibliotecas de UI sin aspecto de IA",
      description:
        "Una selección de bibliotecas de UI para React y Tailwind con personalidad: componentes, bloques, animaciones, gráficos, iconos e ilustraciones para escapar del aspecto genérico de la IA.",
      keywords: [
        "bibliotecas de UI",
        "componentes React",
        "Tailwind CSS",
        "shadcn/ui",
        "design system",
        "animaciones React",
        "iconos SVG",
        "UI sin aspecto de IA",
      ],
    },
  },
};
