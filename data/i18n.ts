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
    lede: "Bibliotecas de UI com personalidade. Zero cara de IA, zero gradiente roxo, zero card igual a todos os outros.",
    all: "Todas",
    categories: {
      components: "Componentes",
      blocks: "Blocos",
      animations: "Animações",
      charts: "Gráficos",
      icons: "Ícones",
      resources: "Recursos",
    },
    filter: "Filtrar por categoria",
    search: "Buscar",
    searchLabel: "Buscar bibliotecas",
    clear: "Limpar busca",
    empty: "Nenhuma biblioteca encontrada.",
    newTab: "abre em nova aba",
    preview: "Prévia do site",
    noPreview: "Sem prévia",
    seo: {
      title: "Escape the Slop — Bibliotecas de UI sem cara de IA",
      description:
        "Curadoria de bibliotecas de UI para React e Tailwind com personalidade: componentes, blocos, animações, gráficos e ícones para fugir do visual genérico de IA.",
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
    lede: "UI libraries with personality. Zero AI look, zero purple gradients, zero cookie-cutter cards.",
    all: "All",
    categories: {
      components: "Components",
      blocks: "Blocks",
      animations: "Animations",
      charts: "Charts",
      icons: "Icons",
      resources: "Resources",
    },
    filter: "Filter by category",
    search: "Search",
    searchLabel: "Search libraries",
    clear: "Clear search",
    empty: "No libraries found.",
    newTab: "opens in a new tab",
    preview: "Preview of the site",
    noPreview: "No preview",
    seo: {
      title: "Escape the Slop — UI libraries that don't look like AI",
      description:
        "A curated list of React and Tailwind UI libraries with real personality: components, blocks, animations, charts and icons to escape the generic AI look.",
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
    lede: "Des bibliothèques d'UI avec de la personnalité. Zéro look IA, zéro dégradé violet, zéro carte identique aux autres.",
    all: "Toutes",
    categories: {
      components: "Composants",
      blocks: "Blocs",
      animations: "Animations",
      charts: "Graphiques",
      icons: "Icônes",
      resources: "Ressources",
    },
    filter: "Filtrer par catégorie",
    search: "Rechercher",
    searchLabel: "Rechercher des bibliothèques",
    clear: "Effacer la recherche",
    empty: "Aucune bibliothèque trouvée.",
    newTab: "s'ouvre dans un nouvel onglet",
    preview: "Aperçu du site",
    noPreview: "Pas d'aperçu",
    seo: {
      title: "Escape the Slop — Des bibliothèques d'UI sans look IA",
      description:
        "Une sélection de bibliothèques d'UI React et Tailwind pleines de personnalité : composants, blocs, animations, graphiques et icônes pour échapper à l'esthétique générique de l'IA.",
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
    lede: "Bibliotecas de UI con personalidad. Cero aspecto de IA, cero degradados morados, cero tarjetas iguales a todas las demás.",
    all: "Todas",
    categories: {
      components: "Componentes",
      blocks: "Bloques",
      animations: "Animaciones",
      charts: "Gráficos",
      icons: "Iconos",
      resources: "Recursos",
    },
    filter: "Filtrar por categoría",
    search: "Buscar",
    searchLabel: "Buscar bibliotecas",
    clear: "Borrar búsqueda",
    empty: "No se encontró ninguna biblioteca.",
    newTab: "se abre en una pestaña nueva",
    preview: "Vista previa del sitio",
    noPreview: "Sin vista previa",
    seo: {
      title: "Escape the Slop — Bibliotecas de UI sin aspecto de IA",
      description:
        "Una selección de bibliotecas de UI para React y Tailwind con personalidad: componentes, bloques, animaciones, gráficos e iconos para escapar del aspecto genérico de la IA.",
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
