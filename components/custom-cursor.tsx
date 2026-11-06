"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Curseur custom additif : un anneau teal qui suit la souris avec un léger
 * retard et grossit au survol des liens/boutons. Le curseur natif reste
 * visible (additif). Desktop pointeur fin uniquement, off si reduced-motion.
 */
export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    // Activé au premier mouvement (setState dans un callback, pas dans l'effet).
    const onMove = (e: MouseEvent) => {
      setEnabled(true);
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setActive(!!target?.closest("a, button, [data-cursor]"));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ x: sx, y: sy }}
    >
      <motion.span
        className="block rounded-full border-2 border-primary"
        style={{ marginLeft: -14, marginTop: -14 }}
        animate={{
          width: active ? 44 : 28,
          height: active ? 44 : 28,
          marginLeft: active ? -22 : -14,
          marginTop: active ? -22 : -14,
          opacity: active ? 0.9 : 0.45,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </motion.div>
  );
}
