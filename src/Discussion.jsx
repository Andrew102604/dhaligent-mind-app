import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import CONTENT from "./discussion_content.js";
// Self-hosted fonts (work offline in the installed PWA)
import "@fontsource/nunito/latin-600.css";
import "@fontsource/nunito/latin-700.css";
import "@fontsource/nunito/latin-800.css";
import "@fontsource/sarabun/latin-700.css";
import "@fontsource/sarabun/latin-800.css";
import "@fontsource/livvic/latin-500.css";
import "@fontsource/livvic/latin-600.css";
import "@fontsource/livvic/latin-700.css";

const BASE = import.meta.env.BASE_URL;
const FONT_MAP = { sarabun: "Sarabun", nunito: "Nunito", livvic: "Livvic" };

function fontStyle(face, bold) {
  const raw = face || "";
  const key = raw.toLowerCase().replace(/\s*(ultra-bold|semi-bold|bold|regular)$/i, "").trim();
  const family = FONT_MAP[key] ? `"${FONT_MAP[key]}", ` : "";
  let weight = bold ? 800 : 600;
  if (/ultra-bold/i.test(raw)) weight = 800;
  else if (/semi-bold/i.test(raw)) weight = 700;
  else if (/bold/i.test(raw)) weight = 800;
  return { fontFamily: `${family}"Nunito", "Poppins", system-ui, sans-serif`, fontWeight: weight };
}

/* One original PowerPoint text box. Font sizes are in pt on a 1440pt-wide slide and are
   expressed in cqw, so the text scales with the slide (and grows in full screen). If the
   text would overflow its box, it is shrunk automatically until it fits. */
function TextBox({ box, index }) {
  const outer = useRef(null);
  const inner = useRef(null);

  const fit = useCallback(() => {
    const o = outer.current, n = inner.current;
    if (!o || !n) return;
    let f = 1;
    o.style.setProperty("--fit", f);
    const cs = getComputedStyle(o);
    const avail = o.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    const over = () => n.offsetHeight > avail * 1.08 + 1 || o.scrollWidth > o.clientWidth + 1;
    let guard = 0;
    while (over() && f > 0.45 && guard++ < 14) { f -= 0.04; o.style.setProperty("--fit", f.toFixed(2)); }
  }, []);

  useLayoutEffect(() => {
    fit();
    const ro = new ResizeObserver(fit);
    if (outer.current) ro.observe(outer.current);
    document.fonts?.addEventListener?.("loadingdone", fit);
    document.fonts?.ready?.then(fit);
    return () => { ro.disconnect(); document.fonts?.removeEventListener?.("loadingdone", fit); };
  }, [fit]);

  const justify = box.anc === "ctr" ? "center" : box.anc === "b" ? "flex-end" : "flex-start";
  const style = {
    left: `${box.x}%`, top: `${box.y}%`, width: `${box.w}%`, height: `${box.h}%`,
    padding: `${box.pt}cqw ${box.pr}cqw ${box.pb}cqw ${box.pl}cqw`,
    justifyContent: justify,
    transform: box.rot ? `rotate(${box.rot}deg)` : undefined,
    "--i": index,
  };

  const first = box.p[0] || { r: [] };
  const firstSize = first.r[0]?.s || 20;
  return (
    <div className="dp-tb" ref={outer} style={style}>
      <div ref={inner}>
        {box.p.map((p, k) => {
          const size = p.r[0]?.s || firstSize;
          // line height: negative = fixed spacing in pt, otherwise a multiple of the 1.2 default
          const lhPt = p.ls < 0 ? -p.ls : (p.ls || 1) * 1.2 * size;
          const extra = Math.max(0, lhPt - 1.2 * size) / 2; // PowerPoint puts spare line space above the text
          const pStyle = {
            textAlign: p.a === "ctr" ? "center" : p.a === "r" ? "right" : p.a === "just" ? "justify" : "left",
            lineHeight: `calc(var(--fit, 1) * ${(lhPt / 14.4).toFixed(3)}cqw)`,
            paddingLeft: p.ml ? `${p.ml}cqw` : undefined,
            textIndent: p.in ? `${p.in}cqw` : undefined,
            marginTop: p.sb ? `calc(var(--fit, 1) * ${(p.sb / 14.4).toFixed(3)}cqw)` : undefined,
            position: "relative",
            top: extra ? `calc(var(--fit, 1) * ${(extra / 14.4).toFixed(3)}cqw)` : undefined,
          };
          return (
            <p key={k} style={pStyle}>
              {p.bu && (
                <span className="dp-bu" style={{ width: `${-(p.in || 0)}cqw`, fontSize: `calc(var(--fit, 1) * ${(size / 14.4).toFixed(3)}cqw)`, color: p.r[0]?.c || "#1c2b3a" }}>{p.bu}</span>
              )}
              {p.r.length === 0 ? "\u00a0" : p.r.map((r, j) => (
                <span key={j} style={{
                  fontSize: `calc(var(--fit, 1) * ${(r.s / 14.4).toFixed(3)}cqw)`,
                  color: r.c || "#1c2b3a", fontStyle: r.i ? "italic" : "normal",
                  ...fontStyle(r.f, r.b),
                }}>{r.t}</span>
              ))}
            </p>
          );
        })}
      </div>
    </div>
  );
}

function SlideLayer({ slide, className }) {
  return (
    <div className={`dp-stage ${className}`}>
      <img className="dp-bg" src={`${BASE}${slide.bg}`} alt="" draggable="false" />
      {slide.boxes.map((b, k) => <TextBox key={k} box={b} index={k} />)}
    </div>
  );
}

export default function Discussion({ lessonNumber, onDone }) {
  const slides = useMemo(() => CONTENT[lessonNumber - 1]?.slides || [], [lessonNumber]);
  const hasContent = slides.length > 0;
  const last = Math.max(0, slides.length - 1);

  const [i, setI] = useState(0);
  const [leave, setLeave] = useState(null); // { idx, dir }
  const [dir, setDir] = useState(1);
  const [full, setFull] = useState(false);
  const [fallback, setFallback] = useState(false);
  const stage = useRef(null);
  const touch = useRef(null);
  const timer = useRef(null);

  useEffect(() => { setI(0); setLeave(null); }, [lessonNumber]);

  // preload neighbouring slide images so changes are instant
  useEffect(() => {
    [i + 1, i + 2, i - 1].forEach((n) => { if (slides[n]) new Image().src = `${BASE}${slides[n].bg}`; });
  }, [i, slides]);

  const go = useCallback((target) => {
    setI((cur) => {
      const n = Math.max(0, Math.min(last, typeof target === "function" ? target(cur) : target));
      if (n === cur) return cur;
      const d = n > cur ? 1 : -1;
      setDir(d);
      setLeave({ idx: cur, dir: d });
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setLeave(null), 650);
      return n;
    });
  }, [last]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const toggleFull = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        try { screen.orientation?.unlock?.(); } catch {}
      } else if (fallback) setFallback(false);
      else if (stage.current?.requestFullscreen) {
        await stage.current.requestFullscreen();
        try { await screen.orientation?.lock?.("landscape"); } catch {}
      } else setFallback(true);
    } catch { setFallback((v) => !v); }
  }, [fallback]);

  useEffect(() => {
    const onFs = () => setFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.("input,textarea,select")) return;
      if (["ArrowRight", "PageDown", " "].includes(e.key)) { e.preventDefault(); go((v) => v + 1); }
      else if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); go((v) => v - 1); }
      else if (e.key === "Home") go(0);
      else if (e.key === "End") go(last);
      else if (e.key === "f" || e.key === "F") toggleFull();
      else if (e.key === "Escape" && fallback) setFallback(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, last, toggleFull, fallback]);

  const onTouchStart = (e) => { touch.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touch.current == null) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    touch.current = null;
    if (Math.abs(dx) > 50) go((v) => v + (dx < 0 ? 1 : -1));
  };

  const isFull = full || fallback;

  return (
    <section ref={stage} className={`dp${isFull ? " dp-full" : ""}${fallback ? " dp-fallback" : ""}`} aria-label="Discussion presentation">
      <header className="dp-top">
        <span className="dp-brand">DhaLiGent Mind · Discussion</span>
        <span className="dp-lesson">Lesson {lessonNumber} / 10</span>
      </header>

      <div className="dp-frame" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {hasContent ? (
          <div className="dp-deck" aria-live="polite">
            {leave && slides[leave.idx] && (
              <SlideLayer key={`out-${leave.idx}`} slide={slides[leave.idx]} className={leave.dir > 0 ? "dp-out-next" : "dp-out-prev"} />
            )}
            <SlideLayer key={`in-${lessonNumber}-${i}`} slide={slides[i]} className={leave ? (dir > 0 ? "dp-in-next" : "dp-in-prev") : "dp-in-first"} />
          </div>
        ) : (
          <div className="dp-deck dp-empty">
            <div className="dp-empty-icon" aria-hidden="true">🌱</div>
            <h2>Content coming soon</h2>
            <p>The discussion slides for this lesson have not been provided yet. No points are awarded until the content is added.</p>
          </div>
        )}
      </div>

      <footer className="dp-controls">
        <button type="button" className="dp-btn" onClick={() => go(i - 1)} disabled={i === 0}>← Previous</button>
        <div className="dp-progress" role="progressbar" aria-valuemin={1} aria-valuemax={slides.length || 1} aria-valuenow={i + 1}>
          <span>Slide {hasContent ? i + 1 : 0} of {slides.length}</span>
          <div className="dp-bar"><i style={{ width: `${hasContent ? ((i + 1) / slides.length) * 100 : 0}%` }} /></div>
        </div>
        {hasContent && i >= last
          ? <button type="button" className="dp-btn dp-primary" onClick={() => onDone(0)}>Finish Discussion ✓</button>
          : <button type="button" className="dp-btn dp-primary" onClick={() => go(i + 1)} disabled={!hasContent}>Next →</button>}
        <button type="button" className="dp-btn dp-fs" onClick={toggleFull} title="Full screen (F)">
          {isFull ? "✕ Exit full screen" : "⛶ Full screen"}
        </button>
      </footer>
      {!isFull && <p className="dp-hint">Tip: use ← → keys or swipe to change slides · press F for full screen (on phones, rotate to landscape)</p>}
    </section>
  );
}
