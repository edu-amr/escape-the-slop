export type CategoryKey =
  "components" | "blocks" | "animations" | "charts" | "icons" | "resources";

export type Lib = {
  slug: string;
  name: string;
  url: string;
  category: CategoryKey;
  wait?: number;
};

export const LIBS: Lib[] = [
  {
    slug: "react-bits",
    name: "React Bits",
    url: "https://reactbits.dev/",
    category: "animations",
    wait: 9000,
  },
  {
    slug: "solar-icons",
    name: "Solar Icons",
    url: "https://solar-icons.dev/",
    category: "icons",
  },
  {
    slug: "tailark",
    name: "Tailark",
    url: "https://tailark.com/",
    category: "blocks",
  },
  {
    slug: "cult-ui",
    name: "Cult UI",
    url: "https://www.cult-ui.com/",
    category: "components",
  },
  {
    slug: "uiarc",
    name: "UIArc",
    url: "https://uiarc.dev/",
    category: "components",
  },
  {
    slug: "23rd",
    name: "23rd",
    url: "https://www.23rd.dev/",
    category: "components",
  },
  {
    slug: "beui",
    name: "BeUI",
    url: "https://beui.dev/",
    category: "components",
  },
  {
    slug: "transitions",
    name: "Transitions",
    url: "https://transitions.dev/",
    category: "animations",
  },
  {
    slug: "evilcharts",
    name: "Evil Charts",
    url: "https://evilcharts.com/",
    category: "charts",
  },
  {
    slug: "affect-ui",
    name: "Affect UI",
    url: "https://www.affectui.com/",
    category: "components",
  },
  {
    slug: "21st",
    name: "21st.dev",
    url: "https://21st.dev/",
    category: "resources",
  },
  {
    slug: "obsidian-ui",
    name: "Obsidian UI",
    url: "https://www.obsidianui.dev/",
    category: "components",
  },
  { slug: "svgl", name: "SVGL", url: "https://svgl.app/", category: "icons" },
  {
    slug: "dithercn",
    name: "DitherCN",
    url: "https://dithercn.dev/",
    category: "animations",
  },
  {
    slug: "cobe",
    name: "Cobe",
    url: "https://cobe.vercel.app/",
    category: "animations",
  },
  {
    slug: "tuff-ui",
    name: "Tuff UI",
    url: "https://tuffui.com/",
    category: "components",
  },
  {
    slug: "rare-ui",
    name: "Rare UI",
    url: "https://www.rareui.com",
    category: "components",
  },
  {
    slug: "board-ui",
    name: "Board UI",
    url: "https://www.boardui.com/pt-br",
    category: "components",
  },
  {
    slug: "animate-icons",
    name: "Animate Icons",
    url: "https://animateicons.in/",
    category: "icons",
  },
  {
    slug: "gauge-ui",
    name: "Gauge UI",
    url: "https://www.gauge-ui.dev/",
    category: "components",
  },
  {
    slug: "thinking-orbs",
    name: "Thinking Orbs",
    url: "https://www.thinkingorbs.com/",
    category: "animations",
  },
  {
    slug: "aceternity",
    name: "Aceternity UI",
    url: "https://ui.aceternity.com/",
    category: "animations",
  },
  {
    slug: "ui-layouts",
    name: "UI Layouts",
    url: "https://www.ui-layouts.com/",
    category: "blocks",
  },
  {
    slug: "smooth-ui",
    name: "SmoothUI",
    url: "https://smoothui.dev/",
    category: "animations",
  },
  {
    slug: "lightswind",
    name: "Lightswind",
    url: "https://lightswind.com/",
    category: "components",
  },
  {
    slug: "astryx",
    name: "Astryx",
    url: "https://astryx.atmeta.com/",
    category: "components",
  },
  {
    slug: "shadcn-space",
    name: "Shadcn Space",
    url: "https://shadcnspace.com/",
    category: "blocks",
  },
  {
    slug: "magic-ui",
    name: "Magic UI",
    url: "https://magicui.design/",
    category: "animations",
  },
  {
    slug: "retro-ui",
    name: "RetroUI",
    url: "https://www.retroui.dev/",
    category: "components",
  },
  {
    slug: "8bitcn",
    name: "8bitcn",
    url: "https://www.8bitcn.com/",
    category: "components",
  },
  {
    slug: "nes-css",
    name: "NES.css",
    url: "https://nostalgic-css.github.io/NES.css/",
    category: "components",
  },
  {
    slug: "98-css",
    name: "98.css",
    url: "https://jdan.github.io/98.css/",
    category: "components",
  },
  {
    slug: "paper-design",
    name: "Paper Design",
    url: "https://paper.design/",
    category: "animations",
  },
  {
    slug: "fancy-components",
    name: "Fancy Components",
    url: "https://www.fancycomponents.dev/",
    category: "animations",
  },
  {
    slug: "animata",
    name: "Animata",
    url: "https://animata.design/",
    category: "animations",
  },
  {
    slug: "kokonut-ui",
    name: "Kokonut UI",
    url: "https://kokonutui.com/",
    category: "components",
  },
  {
    slug: "skiper-ui",
    name: "Skiper UI",
    url: "https://skiper-ui.com/",
    category: "animations",
  },
  {
    slug: "motion-primitives",
    name: "Motion Primitives",
    url: "https://motion-primitives.com/",
    category: "animations",
  },
  {
    slug: "hover-dev",
    name: "Hover.dev",
    url: "https://hover.dev/",
    category: "animations",
  },
  {
    slug: "tremor",
    name: "Tremor",
    url: "https://tremor.so/",
    category: "charts",
  },
  {
    slug: "beautiful-ui",
    name: "Beautiful UI",
    url: "https://www.beautifului.dev/",
    category: "components",
  },
  {
    slug: "streamline",
    name: "Streamline",
    url: "https://www.streamlinehq.com/",
    category: "icons",
  },
  {
    slug: "ant-design",
    name: "Ant Design",
    url: "https://ant.design/components/overview",
    category: "components",
  },
  {
    slug: "daisy-ui",
    name: "daisyUI",
    url: "https://daisyui.com/",
    category: "components",
  },
  {
    slug: "material-ui",
    name: "Material UI",
    url: "https://mui.com/",
    category: "components",
  },
  {
    slug: "awesome-shadcn",
    name: "Awesome shadcn/ui",
    url: "https://awesomeshadcn.dev/",
    category: "resources",
  },
];

export const CATEGORY_KEYS: CategoryKey[] = [
  "components",
  "blocks",
  "animations",
  "charts",
  "icons",
  "resources",
];

export function hostOf(url: string) {
  return new URL(url).host.replace(/^www\./, "");
}
