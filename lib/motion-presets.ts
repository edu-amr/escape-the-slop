// shared motion values for the `motion` package, read from Grok Bot's own bundle.
// pass a preset as `transition`; under reduced motion use `REDUCED` and drop the movement, keep the fade.

/** a menu, popover or panel arriving: Grok's default UI spring */
export const SPRING_UI = {
  type: "spring",
  stiffness: 175,
  damping: 26,
  mass: 1,
} as const;

/** entering or leaving; the same curve as the --animate-* tokens in styles.css */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** seconds, as motion takes them */
export const DURATION = { fast: 0.12, base: 0.2, slow: 0.3 } as const;

/** Grok's reduced-motion stand-in: a short fade, no travel */
export const REDUCED = { duration: 0.12, ease: "easeOut" } as const;

/** Grok's cubic-bezier set, as motion arrays */
export const EASE = {
  /** --ease-sharp: popups, tooltips, dialogs, small swaps */
  sharp: [0.165, 0.84, 0.44, 1],
  /** --ease-heavy: segmented control thumb */
  heavy: [0.645, 0.045, 0.355, 1],
  /** --ease-drawer */
  drawer: [0.32, 0.72, 0, 1],
  /** route wipes, sidebar width, rows, chat activity */
  out: [0.22, 1, 0.36, 1],
  /** layout moves: pills, reactions, hover tray, footer */
  standard: [0.2, 0, 0, 1],
  /** hover cards, offers, popIn, reactions entering */
  quint: [0.23, 1, 0.32, 1],
  /** small panels and badges */
  expo: [0.16, 1, 0.3, 1],
  /** status swap text */
  swift: [0.1, 0.9, 0.2, 1],
  /** the activity mark pop */
  back: [0.34, 1.56, 0.64, 1],
  /** exit: chip leaving */
  accelerate: [0.4, 0, 1, 1],
  /** dragged row dropping home, with a little overshoot */
  drop: [0.25, 1.15, 0.4, 1],
} as const;

/** the Anysphere ui kit duration tokens Grok uses, in seconds */
export const GROK_DURATION = {
  instant: 0.05,
  fast: 0.1,
  normal: 0.15,
  slow: 0.2,
  slower: 0.3,
  drawer: 0.5,
} as const;

/** a centred dialog leaving: a 120ms fade on the out curve, the exit half of overlays.css's one dialog motion */
export const SHEET_EXIT = { duration: 0.12, ease: [0.22, 1, 0.36, 1] } as const;

/** pane push and pop: incoming slides 100% (pop: -30%), outgoing leaves -30% (pop: 100%), 200ms */
export const WIPE = {
  duration: 0.2,
  ease: EASE.out,
  pushFrom: "100%",
  popFrom: "-30%",
} as const;

/** a side panel's page push and pop (the bot and room panels): 250ms on the out curve; the page underneath drifts 25%
 * and fades as the new one covers it */
export const PANEL_PUSH = {
  duration: 0.25,
  ease: EASE_OUT,
  pushFrom: "100%",
  under: "-25%",
} as const;

/** tooltips (ms): a first hover waits 400; leaving holds 140, then a 100ms fade. A trigger reached while one is up, within
 * 300ms of one closing, or by keyboard focus, shows at once. */
export const TOOLTIP = {
  openDelay: 400,
  closeDelay: 140,
  exit: 100,
  warm: 300,
} as const;

// bencho.dev's small token set (ref/BENCHO-MOTION.md): grok's look, bencho's feel. springs near critical damping for
// overlays, opacity on its own 160ms clock, tiny distances, exits shorter than entrances.
export const BENCHO = {
  dur: { fast: 0.16, base: 0.22, slow: 0.42, long: 0.6 },
  ease: {
    out: [0.22, 1, 0.36, 1],
    pop: [0.24, 1.34, 0.38, 1],
    release: [0.28, 1.4, 0.36, 1],
    menuIn: [0.16, 1, 0.3, 1],
  },
  spring: {
    settle: { type: "spring", stiffness: 380, damping: 34 },
    lively: { type: "spring", stiffness: 500, damping: 18 },
    modal: { type: "spring", stiffness: 340, damping: 30, mass: 0.8 },
    popover: { type: "spring", stiffness: 420, damping: 34, mass: 0.7 },
    panel: { type: "spring", stiffness: 320, damping: 32, mass: 0.7 },
  },
} as const;

/** a spring for the transform, with opacity on bencho's short 160ms fade */
export function withFade<T extends object>(
  spring: T,
): T & { opacity: { duration: number } } {
  return { ...spring, opacity: { duration: BENCHO.dur.fast } };
}

/** the phone's bot list: slides in from the start edge on the critically damped panel spring, follows a drag and keeps
 * its velocity on release; a fling past either threshold closes it */
export const DRAWER = {
  transition: withFade(BENCHO.spring.panel),
  scrim: { duration: 0.18 },
  closeFraction: 0.33,
  closeVelocity: 500,
} as const;

/** bencho's settle spring: a message landing, a container mounting; about 0.2% overshoot */
export const SPRING_SETTLE = { ...BENCHO.spring.settle, mass: 1 } as const;

/** a message's own fade while it settles (bencho msg-in), and the blur that masks a swap of one thing for another */
export const MSG_FADE = { duration: BENCHO.dur.fast, ease: EASE_OUT } as const;

/** an occasional centred dialog: it grows from .96 with a fade over 200ms on the out curve, over a scrim that fades in
 * 160ms; it leaves sooner than it came, at .98 in 120ms. Reduced motion keeps both fades and drops the scale. Modals
 * scale from their centre. A dialog animated this way sets data-raw-dialog on its sheet and scrim so overlays.css's
 * keyframe stays off it (one motion, not two). */
export function dialogMotion(reduced: boolean) {
  const leave = { duration: DURATION.fast, ease: EASE_OUT };
  return {
    // the whole transform string, not the scale shorthand, so the browser can run it off the main thread
    sheet: {
      initial: { opacity: 0, transform: reduced ? "none" : "scale(0.96)" },
      animate: {
        opacity: 1,
        transform: reduced ? "none" : "scale(1)",
        transition: reduced
          ? REDUCED
          : { duration: DURATION.base, ease: EASE_OUT },
      },
      exit: {
        opacity: 0,
        transform: reduced ? "none" : "scale(0.98)",
        transition: reduced ? REDUCED : leave,
      },
    },
    scrim: {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: reduced
          ? REDUCED
          : { duration: BENCHO.dur.fast, ease: EASE_OUT },
      },
      exit: { opacity: 0, transition: reduced ? REDUCED : leave },
    },
  } as const;
}

/** content swapped in place (a settings pane, a panel tab): bencho's step-swap entrance, 6px up over 220ms; the old
 * content goes at once so a switch is never waited on */
export const SWAP = {
  initial: { opacity: 0, y: 6 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: BENCHO.dur.base, ease: BENCHO.ease.out },
  },
} as const;

// the motion lab's spring set (2026-11 picks), mass 1. new motion uses these; older presets above stay as they ship.
export const SPRING = {
  /** opacity and small slides, a tooltip growing out of its trigger */
  fade: { type: "spring", stiffness: 420, damping: 32, mass: 1 },
  /** panels, columns, the sidebar */
  soft: { type: "spring", stiffness: 260, damping: 24, mass: 1 },
  /** release onto a value, a card gliding between rows */
  settle: { type: "spring", stiffness: 280, damping: 22, mass: 1 },
  /** a calm pop for direct acknowledgement (copy, check) */
  pop: { type: "spring", stiffness: 520, damping: 26, mass: 1 },
  /** a stretchy highlight: the edge facing the move */
  lead: { type: "spring", stiffness: 620, damping: 36, mass: 1 },
  /** a stretchy highlight: the edge that catches up */
  trail: { type: "spring", stiffness: 190, damping: 19, mass: 1 },
  /** container height, landing after its width */
  height: { type: "spring", stiffness: 300, damping: 22, mass: 1 },
  /** a layout move with no bounce */
  layout: { type: "spring", bounce: 0, visualDuration: 0.3 },
} as const;
