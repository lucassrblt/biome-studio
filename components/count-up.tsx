"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Compteur : la **valeur finale** est rendue côté serveur (HTML lisible par
 * Google, les lecteurs d'écran et sans JS). L'animation 0 → `to` n'est qu'un
 * effet visuel, déclenché côté client à l'entrée dans le viewport : elle écrit
 * directement dans le nœud texte (pas de re-render React), puis se termine sur
 * la même valeur que le HTML serveur. Rien n'est animé si prefers-reduced-motion.
 */
export function CountUp({
  to,
  duration = 1.4,
  prefix = "",
  suffix = "",
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const format = (v: number) => `${prefix}${Math.round(v)}${suffix}`;

  useEffect(() => {
    const node = ref.current?.firstChild;
    if (!inView || reduce || !node) return;
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        node.nodeValue = `${prefix}${Math.round(v)}${suffix}`;
      },
    });
    return () => {
      controls.stop();
      node.nodeValue = `${prefix}${to}${suffix}`;
    };
  }, [inView, to, duration, reduce, prefix, suffix]);

  // Un seul nœud texte (chaîne unique) : c'est lui que l'animation met à jour.
  return <span ref={ref}>{format(to)}</span>;
}
