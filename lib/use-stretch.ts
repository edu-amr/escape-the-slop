import { animate, type MotionValue, useMotionValue, useTransform } from "motion/react";
import { useLayoutEffect, useRef } from "react";

import { SPRING } from "./motion-presets";

/** A highlight that stretches between two edges: the edge facing the move runs on the stiff lead spring and the other
 * catches up on the trail spring, so a long jump visibly stretches, then settles. The first placement, and any move
 * while `instant` (reduced motion, a resize), lands at once. */
export function useStretch(
  target: { start: number; end: number } | null,
  instant = false,
): {
  start: MotionValue<number>;
  end: MotionValue<number>;
  size: MotionValue<number>;
} {
  const start = useMotionValue(target?.start ?? 0);
  const end = useMotionValue(target?.end ?? 0);
  const placed = useRef(false);
  const from = target?.start;
  const to = target?.end;
  useLayoutEffect(() => {
    if (from === undefined || to === undefined) return;
    if (!placed.current || instant) {
      placed.current = true;
      start.jump(from);
      end.jump(to);
      return;
    }
    const forward = from > start.get();
    const a = animate(start, from, forward ? SPRING.trail : SPRING.lead);
    const b = animate(end, to, forward ? SPRING.lead : SPRING.trail);
    return () => {
      a.stop();
      b.stop();
    };
  }, [from, to, instant, start, end]);
  return {
    start,
    end,
    size: useTransform(() => Math.max(0, end.get() - start.get())),
  };
}
