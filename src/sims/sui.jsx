import React, { useEffect, useRef } from "react";
import { BASE } from "../games/ui.jsx";
export { Drag, Meter, useCountdown, fmt, BASE } from "../games/ui.jsx";

/* Picture taken from the supplied simulation screens (public/sims/icons). */
export function Ico({ n, size = 44, className = "", alt = "" }) {
  return <img className={`sm-ico ${className}`} src={`${BASE}sims/icons/${n}.webp`} alt={alt} width={size} height={size} draggable="false" />;
}

/* Calls fn every `ms` while `active`. */
export function useTick(ms, active, fn) {
  const ref = useRef(fn); ref.current = fn;
  useEffect(() => {
    if (!active) return undefined;
    const id = setInterval(() => ref.current(), ms);
    return () => clearInterval(id);
  }, [ms, active]);
}

export function Say({ tone = "info", children }) {
  return <p className={`sm-say ${tone}`} role="status" aria-live="polite">{children}</p>;
}
