import React, { useEffect, useRef, useState } from "react";

export const BASE = import.meta.env.BASE_URL;
export const fmt = (t) => { const s = Math.ceil(t); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };

/* Countdown in seconds. `key` restarts it. onEnd fires once when it reaches 0. */
export function useCountdown(total, active, onEnd, key = 0) {
  const [left, setLeft] = useState(total);
  const endRef = useRef(onEnd);
  endRef.current = onEnd;
  useEffect(() => { setLeft(total); }, [key, total]);
  useEffect(() => {
    if (!active) return undefined;
    const id = setInterval(() => setLeft((l) => {
      if (l <= 0.11) { clearInterval(id); setTimeout(() => endRef.current && endRef.current(), 0); return 0; }
      return +(l - 0.1).toFixed(1);
    }), 100);
    return () => clearInterval(id);
  }, [active, key, total]);
  return left;
}

export function Meter({ label, value, tone = "green" }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="lg-meter" role="progressbar" aria-label={label} aria-valuenow={Math.round(v)} aria-valuemin={0} aria-valuemax={100}>
      <span className="lg-meter-l">{label}</span>
      <div className="lg-meter-b"><i className={`t-${tone}`} style={{ width: `${v}%` }} /></div>
    </div>
  );
}

/* Works with mouse AND touch. Drag onto an element that has data-drop="id", or just tap it. */
export function Drag({ id, onDrop, onTap, disabled, className = "", selected, children }) {
  const [pos, setPos] = useState(null);
  const st = useRef(null);
  const down = (e) => {
    if (disabled) return;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
    st.current = { x: e.clientX, y: e.clientY, moved: false };
  };
  const move = (e) => {
    const s = st.current; if (!s) return;
    if (!s.moved && Math.hypot(e.clientX - s.x, e.clientY - s.y) > 8) s.moved = true;
    if (s.moved) setPos({ x: e.clientX, y: e.clientY });
  };
  const up = (e) => {
    const s = st.current; st.current = null;
    if (!s) return;
    setPos(null);
    if (s.moved) {
      const t = document.elementsFromPoint(e.clientX, e.clientY).find((el) => el.dataset && el.dataset.drop !== undefined);
      if (t) onDrop && onDrop(id, t.dataset.drop);
    } else onTap && onTap(id);
  };
  const cancel = () => { st.current = null; setPos(null); };
  return (
    <div role="button" tabIndex={disabled ? -1 : 0} aria-pressed={!!selected}
      className={`lg-drag ${className}${selected ? " sel" : ""}${pos ? " dragging" : ""}${disabled ? " off" : ""}`}
      onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={cancel}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onTap && onTap(id); } }}>
      {children}
      {pos && <div className="lg-ghost" style={{ left: pos.x, top: pos.y }}>{children}</div>}
    </div>
  );
}

/* Multiple choice. Wrong picks cost a heart; the right pick calls onCorrect. */
export function MCQ({ prompt, sub, options, answer, onCorrect, wrong, cols = 2 }) {
  const [bad, setBad] = useState([]);
  const [ok, setOk] = useState(null);
  useEffect(() => { setBad([]); setOk(null); }, [prompt, sub]);
  const pick = (o) => {
    if (ok || bad.includes(o.id)) return;
    if (o.id === answer) { setOk(o.id); setTimeout(() => onCorrect && onCorrect(o.id), 650); }
    else { setBad((b) => [...b, o.id]); wrong && wrong(); }
  };
  return (
    <div className="lg-mcq">
      <p className="lg-prompt">{prompt}</p>
      {sub && <p className="lg-sub">{sub}</p>}
      <div className="lg-opts" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}>
        {options.map((o) => (
          <button type="button" key={o.id} onClick={() => pick(o)} disabled={!!ok || bad.includes(o.id)}
            className={`lg-opt${ok === o.id ? " good" : ""}${bad.includes(o.id) ? " bad" : ""}`}>
            {o.img && <img src={`${BASE}games/icons/${o.img}.webp`} alt="" />}
            {o.icon && <span className="lg-opt-i">{o.icon}</span>}
            <span>{o.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* Tap the items in the right order. `items` is the correct order; `shuffle` is the display order. */
export function SeqTap({ prompt, items, shuffle, onDone, wrong }) {
  const [n, setN] = useState(0);
  const [bad, setBad] = useState(null);
  const tap = (idx) => {
    if (idx < n) return;
    if (idx === n) { const k = n + 1; setN(k); if (k >= items.length) setTimeout(() => onDone && onDone(), 700); }
    else { wrong && wrong(); setBad(idx); setTimeout(() => setBad(null), 400); }
  };
  return (
    <div className="lg-seq">
      <p className="lg-prompt">{prompt}</p>
      <div className="lg-seq-grid">
        {shuffle.map((idx) => (
          <button type="button" key={idx} onClick={() => tap(idx)} className={`lg-seq-i${idx < n ? " done" : ""}${bad === idx ? " shake" : ""}`}>
            {idx < n && <b className="lg-seq-n">{idx + 1}</b>}
            <span className="lg-opt-i">{items[idx].icon}</span><span>{items[idx].label}</span>
          </button>
        ))}
      </div>
      <div className="lg-chain" aria-hidden="true">{items.map((it, i) => <span key={i} className={i < n ? "on" : ""}>{i < n ? it.icon : "•"}</span>)}</div>
    </div>
  );
}
