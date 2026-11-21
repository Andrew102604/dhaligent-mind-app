import React, { useEffect, useMemo, useState } from "react";
import { Drag, Meter, Ico, Say, BASE } from "./sui.jsx";

const pct = (x, t) => `${(x / t) * 100}%`;

/* ═════════ Simulation 1 · Help Gumamela Grow ═════════ */
const ORG = [
  { id: "root", name: "Root", ico: "root", fn: "Anchors the plant and absorbs water and minerals from the soil.", bi: "Naggunit sa tanom ug mokuha og tubig ug minerals gikan sa yuta.", hint: "This organ stays underground." },
  { id: "stem", name: "Stem", ico: "stem", fn: "Supports the plant and carries water and food between the roots and the leaves.", bi: "Nagsuporta sa tanom ug nagdala og tubig ug pagkaon.", hint: "It holds up the plant, in the middle." },
  { id: "leaf", name: "Leaf", ico: "leaf", fn: "Makes food for the plant using sunlight, water, and air.", bi: "Naghimo og pagkaon gamit ang kahayag, tubig, ug hangin.", hint: "It grows from the stem to catch sunlight." },
  { id: "flower", name: "Flower", ico: "flower", fn: "Helps the plant make new seeds.", bi: "Makatabang sa paghimo og bag-ong liso.", hint: "It is found at the top of the plant." },
  { id: "fruit", name: "Fruit", ico: "fruit", fn: "Grows from the flower. It holds and protects the seeds.", bi: "Motubo gikan sa bulak ug nagkupot sa mga liso.", hint: "It grows from the flower." },
  { id: "seed", name: "Seed", ico: "seed", fn: "Grows into a new plant.", bi: "Motubo nga bag-ong tanom.", hint: "It can be planted in the soil." },
];
const ZONE1 = { flower: [50, 15], fruit: [76, 31], leaf: [24, 47], stem: [50, 55], root: [50, 84], seed: [18, 84] };
export function Sim1({ ctx }) {
  const [placed, setPlaced] = useState({});
  const [sel, setSel] = useState(null);
  const [msg, setMsg] = useState({ t: "info", s: "Click an organ to read its function, then drag it to the correct position on the plant." });
  const [shake, setShake] = useState("");
  const count = Object.keys(placed).length;
  const cur = ORG.find((o) => o.id === sel);
  const attempt = (oid, zid) => {
    if (placed[zid]) return;
    const o = ORG.find((x) => x.id === oid);
    if (oid === zid) {
      const p = { ...placed, [zid]: true }; setPlaced(p); setSel(null);
      setMsg({ t: "ok", s: `✅ Correct! The ${o.name.toLowerCase()} goes there. +10 Growth Points!` });
      if (Object.keys(p).length === ORG.length) setTimeout(ctx.win, 2200);
    } else {
      ctx.mistake(); setShake(zid); setTimeout(() => setShake(""), 450);
      setMsg({ t: "bad", s: `Not there. Hint: ${o.hint} Read its function and try again.` });
    }
  };
  const bloom = count === ORG.length;
  return (
    <div className="sm-s1">
      <div className="sm-row"><Meter label={`Growth Points: ${count * 10} / ${ORG.length * 10}`} value={(count / ORG.length) * 100} /></div>
      <div className="sm-s1-grid">
        <div className={`sm-plant${bloom ? " bloom" : ""}`}>
          <svg viewBox="0 0 300 380" aria-hidden="true">
            <rect x="0" y="262" width="300" height="118" fill="#8a5a33" /><rect x="0" y="262" width="300" height="10" fill="#5c9a3c" />
            <path d="M150 268 L150 90" stroke="#4d9a45" strokeWidth="12" strokeLinecap="round" />
            <path d="M150 215 C120 205 95 185 85 160 C115 160 140 180 150 215Z" fill="#5fb455" /><path d="M150 190 C180 175 205 160 215 135 C185 135 160 155 150 190Z" fill="#5fb455" />
            <path d="M150 268 C140 295 125 315 110 340 M150 268 C150 300 150 325 152 355 M150 268 C165 295 185 315 200 338 M135 300 C115 305 98 312 88 325" stroke="#d9b27a" strokeWidth="5" fill="none" strokeLinecap="round" />
          </svg>
          {bloom && <img className="sm-hib" src={`${BASE}sims/icons/hib.webp`} alt="Gumamela in full bloom" />}
          {ORG.map((o) => (
            <div key={o.id} data-drop={o.id} onClick={() => sel && attempt(sel, o.id)}
              className={`sm-zone${placed[o.id] ? " done" : ""}${shake === o.id ? " shake" : ""}${sel ? " ready" : ""}`}
              style={{ left: pct(ZONE1[o.id][0], 100), top: pct(ZONE1[o.id][1], 100) }} aria-label={`Plant position ${o.id}`}>
              {placed[o.id] ? <><Ico n={o.ico} size={34} /><small>{o.name}</small></> : <span>?</span>}
            </div>
          ))}
        </div>
        <div className="sm-side">
          <p className="sm-h">Organs</p>
          <div className="sm-chips">
            {ORG.filter((o) => !placed[o.id]).map((o) => (
              <Drag key={o.id} id={o.id} selected={sel === o.id} onTap={(id) => setSel((s) => (s === id ? null : id))} onDrop={(id, z) => { setSel(id); attempt(id, z); }} className="sm-chip"><Ico n={o.ico} size={38} /><b>{o.name}</b></Drag>
            ))}
          </div>
          <div className="sm-info">{cur ? <><b>{cur.name}</b><p>{cur.fn}</p><small>({cur.bi})</small></> : <p>Click an organ to read what it does.</p>}</div>
        </div>
      </div>
      <Say tone={msg.t}>{msg.s}</Say>
    </div>
  );
}

/* ═════════ Simulation 2 · Build Gumamela's Root System ═════════ */
const PARTS = [
  { id: "main", name: "Main root", fn: "Grows straight down. It anchors the plant." },
  { id: "side", name: "Side roots", fn: "Branch out sideways to spread through the soil." },
  { id: "hair", name: "Root hairs", fn: "Tiny hairs that absorb water and minerals." },
  { id: "cap", name: "Root cap", fn: "Protects the tip of the root as it grows." },
];
const MOUNDS = ["rock", "main", "worm", "cap", "pebble", "side", "worm", "hair", "rock"];
const SORT2 = [
  { id: "carrot", name: "Carrot", e: "🥕", t: "taproot" }, { id: "grass", name: "Grass", e: "🌿", t: "fibrous" }, { id: "mango", name: "Mango tree", e: "🌳", t: "taproot" },
  { id: "rice", name: "Rice plant", e: "🌾", t: "fibrous" }, { id: "dande", name: "Dandelion", e: "🌼", t: "taproot" }, { id: "onion", name: "Onion", e: "🧅", t: "fibrous" },
];
const ZONE2 = { main: [50, 33], side: [24, 50], hair: [78, 66], cap: [50, 90] };
export function Sim2({ ctx }) {
  const [stage, setStage] = useState(0);
  const [open, setOpen] = useState([]);
  const [got, setGot] = useState([]);
  const [sorted, setSorted] = useState({});
  const [sel, setSel] = useState(null);
  const [placed, setPlaced] = useState({});
  const [msg, setMsg] = useState({ t: "info", s: "Explore the underground area. Tap the soil mounds to dig!" });
  const [shake, setShake] = useState("");
  const dig = (i) => {
    if (open.includes(i)) return;
    setOpen((o) => [...o, i]); const it = MOUNDS[i]; const p = PARTS.find((x) => x.id === it);
    if (p) { const g = [...got, it]; setGot(g); setMsg({ t: "ok", s: `✅ Found: ${p.name}! ${p.fn}` }); if (g.length === 4) setTimeout(() => { setStage(1); setMsg({ t: "info", s: "Sort each example into Taproot or Fibrous Root." }); }, 1600); }
    else setMsg({ t: "info", s: it === "worm" ? "🐛 Just an earthworm. Keep digging!" : "🪨 Only a stone. Keep digging!" });
  };
  const sortIt = (cid, bin) => {
    const c = SORT2.find((x) => x.id === cid); if (!c || sorted[cid]) return;
    if (c.t === bin) {
      const s = { ...sorted, [cid]: bin }; setSorted(s); setSel(null); setMsg({ t: "ok", s: `✅ ${c.name} has a ${bin === "taproot" ? "taproot" : "fibrous root system"}.` });
      if (Object.keys(s).length === SORT2.length) setTimeout(() => { setStage(2); setMsg({ t: "info", s: "Attach the collected parts to the root model." }); }, 1200);
    } else { ctx.mistake(); setMsg({ t: "bad", s: `Not quite. ${c.name} does not belong with ${bin === "taproot" ? "taproots" : "fibrous roots"}. Try the other group.` }); }
  };
  const attach = (pid, zid) => {
    if (placed[zid]) return;
    if (pid === zid) {
      const p = { ...placed, [zid]: true }; setPlaced(p); setSel(null); setMsg({ t: "ok", s: `✅ ${PARTS.find((x) => x.id === pid).name} attached!` });
      if (Object.keys(p).length === 4) setTimeout(() => { setStage(3); setTimeout(ctx.win, 2600); }, 900);
    } else { ctx.mistake(); setShake(zid); setTimeout(() => setShake(""), 450); setMsg({ t: "bad", s: "That part does not belong there. Read its function and look at the model again." }); }
  };
  const prog = stage === 0 ? got.length : stage === 1 ? 4 + Object.keys(sorted).length : stage === 2 ? 10 + Object.keys(placed).length : 14;
  return (
    <div className="sm-s2">
      <Meter label="Root system progress" value={(prog / 14) * 100} />
      {stage === 0 && (<>
        <div className="sm-tray">{PARTS.map((p) => <span key={p.id} className={got.includes(p.id) ? "on" : ""}>{got.includes(p.id) ? p.name : "?"}</span>)}</div>
        <div className="sm-mounds">{MOUNDS.map((it, i) => <button type="button" key={i} onClick={() => dig(i)} className={open.includes(i) ? "open" : ""} aria-label={`Soil mound ${i + 1}`}>{open.includes(i) ? (PARTS.find((x) => x.id === it)?.name || (it === "worm" ? "🐛" : "🪨")) : "⛏️"}</button>)}</div>
      </>)}
      {stage === 1 && (<>
        <div className="sm-chips">{SORT2.filter((c) => !sorted[c.id]).map((c) => <Drag key={c.id} id={c.id} selected={sel === c.id} onTap={(id) => setSel((s) => (s === id ? null : id))} onDrop={sortIt} className="sm-chip"><span className="sm-e">{c.e}</span><b>{c.name}</b></Drag>)}</div>
        <div className="sm-bins">
          {["taproot", "fibrous"].map((b) => (
            <div key={b} data-drop={b} onClick={() => sel && sortIt(sel, b)} className={`sm-bin${sel ? " ready" : ""}`}>
              <Ico n={b} size={96} /><b>{b === "taproot" ? "Taproot" : "Fibrous Root"}</b>
              <small>{b === "taproot" ? "one thick main root" : "many thin roots"}</small>
              <div className="sm-bin-in">{SORT2.filter((c) => sorted[c.id] === b).map((c) => <span key={c.id}>{c.e} {c.name}</span>)}</div>
            </div>
          ))}
        </div>
      </>)}
      {stage >= 2 && (
        <div className="sm-s2-grid">
          <div className={`sm-model${stage === 3 ? " water" : ""}`}>
            <svg viewBox="0 0 300 300" aria-hidden="true">
              <rect width="300" height="300" fill="#8a5a33" /><rect width="300" height="34" fill="#5c9a3c" />
              <g stroke="#e6c08a" strokeWidth="9" fill="none" strokeLinecap="round"><path d="M150 34 L150 245" /><path d="M150 100 Q110 110 70 150" /><path d="M150 140 Q195 145 235 195" /></g>
              <g stroke="#f4e2c0" strokeWidth="2" strokeLinecap="round">{[[230,190,246,184],[232,200,250,200],[226,206,240,216],[238,196,252,188],[72,146,60,140],[70,154,58,158]].map(([a,b,c,d],i)=><line key={i} x1={a} y1={b} x2={c} y2={d} />)}</g>
              <path d="M138 245 Q150 280 162 245Z" fill="#b8842f" />
            </svg>
            {Object.keys(ZONE2).map((z) => <div key={z} data-drop={z} onClick={() => sel && attach(sel, z)} className={`sm-zone sm-zone-s${placed[z] ? " done" : ""}${shake === z ? " shake" : ""}`} style={{ left: pct(ZONE2[z][0], 100), top: pct(ZONE2[z][1], 100) }}>{placed[z] ? <small>{PARTS.find((p) => p.id === z).name}</small> : <span>?</span>}</div>)}
            {stage === 3 && <div className="sm-absorb" aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <i key={i} style={{ "--d": `${i * 0.25}s`, left: `${20 + (i % 4) * 20}%` }} />)}</div>}
          </div>
          <div className="sm-side">
            {stage === 2 ? <>
              <p className="sm-h">Collected parts</p>
              <div className="sm-chips">{PARTS.filter((p) => !placed[p.id]).map((p) => <Drag key={p.id} id={p.id} selected={sel === p.id} onTap={(id) => setSel((s) => (s === id ? null : id))} onDrop={attach} className="sm-chip wide"><b>{p.name}</b><small>{p.fn}</small></Drag>)}</div>
            </> : <p className="sm-win">💧 Water absorption unlocked! The root system is complete.</p>}
          </div>
        </div>
      )}
      <Say tone={msg.t}>{msg.s}</Say>
    </div>
  );
}

/* ═════════ Simulation 3 · Water Journey ═════════ */
const MAP3 = [".......", ".#.x.#.", "...x...", "x#...#.", "...#...", ".x...x.", ".#.#.#.", "CHH.HHC"];
const SPAWN = [2, 4, 6, 0, 3];
const NEED3 = 5, MAXMOVE = 16;
export function Sim3({ ctx }) {
  const [n, setN] = useState(0);
  const [pos, setPos] = useState([0, SPAWN[0]]);
  const [moves, setMoves] = useState(0);
  const [msg, setMsg] = useState({ t: "info", s: "Guide the droplet through the soil to the root hairs. Avoid rocks and dry soil!" });
  const [ripple, setRipple] = useState(null);
  const respawn = (k) => { setPos([0, SPAWN[k % SPAWN.length]]); setMoves(0); };
  const lost = (why) => { ctx.mistake(); setMsg({ t: "bad", s: why }); respawn(n); };
  const move = (dr, dc) => {
    if (ripple) return;
    const r = pos[0] + dr, c = pos[1] + dc;
    if (r < 0 || c < 0 || r > 7 || c > 6) return;
    const ch = MAP3[r][c];
    if (ch === "#") { ctx.mistake(); setMsg({ t: "bad", s: "🪨 A rock blocks the way. Go around it!" }); return; }
    if (ch === "x") { lost("🏜️ Dry soil! The droplet dried up. A new droplet is ready."); return; }
    if (ch === "C") { lost("🧢 That is the root cap. Water cannot enter here. Aim for the root hairs!"); return; }
    if (ch === "H") {
      const k = n + 1; setPos([r, c]); setRipple([r, c]); setMsg({ t: "ok", s: "💧 Osmosis! Water moved into the root hair cell. Water Meter up!" });
      setTimeout(() => { setRipple(null); setN(k); if (k >= NEED3) setTimeout(ctx.win, 600); else respawn(k); }, 1200);
      return;
    }
    if (moves + 1 >= MAXMOVE) { lost("The droplet ran out of energy. A new droplet is ready."); return; }
    setPos([r, c]); setMoves((m) => m + 1);
  };
  useEffect(() => {
    const h = (e) => { const m = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }[e.key]; if (m) { e.preventDefault(); move(m[0], m[1]); } };
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  });
  const tap = (r, c) => { const dr = r - pos[0], dc = c - pos[1]; if (Math.abs(dr) + Math.abs(dc) === 1) move(dr, dc); };
  return (
    <div className="sm-s3">
      <div className="sm-row"><Meter label={`Water Meter: ${n * 20}% (need ${NEED3 * 20}%)`} value={(n / NEED3) * 100} tone="blue" /><span className="sm-pill">💧 {n}/{NEED3}</span></div>
      <div className="sm-row"><span className="sm-pill">Droplet energy: {MAXMOVE - moves}</span><span className="sm-pill">Droplet {Math.min(n + 1, NEED3)} of {NEED3}</span></div>
      <div className="sm-soil" role="grid">
        {MAP3.map((row, r) => row.split("").map((ch, c) => {
          const me = pos[0] === r && pos[1] === c;
          return (
            <div key={`${r}${c}`} className={`sm-sc ${ch === "#" ? "rock" : ch === "x" ? "dry" : ch === "H" ? "hair" : ch === "C" ? "cap" : "wet"}${me ? " me" : ""}${ripple && ripple[0] === r && ripple[1] === c ? " ripple" : ""}`} onClick={() => tap(r, c)}>
              {me ? <Ico n="drop" size={34} /> : ch === "#" ? "🪨" : ch === "x" ? "🏜️" : ch === "H" ? <Ico n="root" size={30} /> : ch === "C" ? <small>cap</small> : ""}
            </div>
          );
        }))}
      </div>
      <div className="sm-dpad">
        <button type="button" onClick={() => move(-1, 0)} aria-label="Up">▲</button><button type="button" onClick={() => move(0, -1)} aria-label="Left">◀</button>
        <button type="button" onClick={() => move(1, 0)} aria-label="Down">▼</button><button type="button" onClick={() => move(0, 1)} aria-label="Right">▶</button>
      </div>
      <p className="sm-leg"><Ico n="root" size={20} /> root hair (enter here) · 🪨 rock · 🏜️ dry soil · cap = root cap (blocked)</p>
      <Say tone={msg.t}>{msg.s}</Say>
    </div>
  );
}

/* ═════════ Simulation 4 · Repair the Stem ═════════ */
const LAY = [
  { id: "epi", name: "Epidermis", fn: "The outer skin. It protects the stem.", c: "#5fbf3a", n: 1 },
  { id: "cor", name: "Cortex", fn: "Stores food and helps support the stem.", c: "#f2c94c", n: 2 },
  { id: "phl", name: "Phloem", fn: "Carries food made in the leaves to other parts.", c: "#7ed13b", n: 3 },
  { id: "cam", name: "Cambium", fn: "Makes new cells so the stem grows thicker.", c: "#a0683a", n: 4 },
  { id: "xyl", name: "Xylem", fn: "Carries water and minerals up from the roots.", c: "#3b82f6", n: 5 },
];
const RING = { epi: 100, cor: 80, phl: 62, cam: 46, xyl: 30 };
export function Sim4({ ctx }) {
  const [stage, setStage] = useState(0);
  const [found, setFound] = useState([]);
  const [placed, setPlaced] = useState({});
  const [sel, setSel] = useState(null);
  const [msg, setMsg] = useState({ t: "info", s: "The stem is damaged! Tap each torn piece to collect a stem structure." });
  const [ran, setRan] = useState(false);
  const [q, setQ] = useState(0);
  const cur = LAY.find((l) => l.id === sel);
  const place = (lid, rid) => {
    if (placed[rid] || !found.includes(lid)) return;
    if (lid === rid) {
      const p = { ...placed, [rid]: true }; setPlaced(p); setSel(null); setMsg({ t: "ok", s: `✅ ${LAY.find((l) => l.id === lid).name} is in the right layer!` });
      if (Object.keys(p).length === 5) setTimeout(() => { setStage(1); setMsg({ t: "info", s: "Level 2: run the transport test and watch what moves." }); }, 1200);
    } else { ctx.mistake(); setMsg({ t: "bad", s: "Wrong layer. Think about the job of each layer, from the outside going in. Try again." }); }
  };
  const QS = [{ q: "Which tissue carried water and minerals UP?", a: "xyl" }, { q: "Which tissue carried food made in the leaves?", a: "phl" }];
  return (
    <div className="sm-s4">
      <Meter label="Stem repair" value={((Object.keys(placed).length + (stage === 1 ? (ran ? 1 : 0) + q : 0)) / 8) * 100} />
      {stage === 0 && (
        <div className="sm-s4-grid">
          <div className="sm-rings" aria-label="Stem cross-section">
            {LAY.map((l) => <div key={l.id} data-drop={l.id} onClick={() => sel && place(sel, l.id)} className={`sm-ring${placed[l.id] ? " on" : ""}`} style={{ "--s": `${RING[l.id]}%`, "--c": l.c }}><b>{l.n}</b></div>)}
          </div>
          <div className="sm-side">
            <p className="sm-h">Torn pieces (tap to collect)</p>
            <div className="sm-chips">
              {LAY.filter((l) => !placed[l.id]).map((l) => found.includes(l.id)
                ? <Drag key={l.id} id={l.id} selected={sel === l.id} onTap={(id) => setSel((s) => (s === id ? null : id))} onDrop={(id, z) => { setSel(id); place(id, z); }} className="sm-chip"><Ico n={l.id} size={36} /><b>{l.name}</b></Drag>
                : <button type="button" key={l.id} className="sm-chip sm-lost" onClick={() => { setFound((f) => [...f, l.id]); setSel(l.id); setMsg({ t: "ok", s: `Collected: ${l.name}. Read its job, then drag it to its layer (1 = outermost, 5 = innermost).` }); }}>❔ Torn piece</button>)}
            </div>
            <div className="sm-info">{cur ? <><b>{cur.name}</b><p>{cur.fn}</p></> : <p>Collect a piece to read what it does.</p>}</div>
          </div>
        </div>
      )}
      {stage === 1 && (
        <div className="sm-test">
          <div className="sm-tubes"><div className={`sm-tube up${ran ? " go" : ""}`}><span>Xylem</span>{ran && Array.from({ length: 4 }, (_, i) => <i key={i} style={{ "--d": `${i * .6}s` }} />)}</div>
            <div className={`sm-tube down${ran ? " go" : ""}`}><span>Phloem</span>{ran && Array.from({ length: 4 }, (_, i) => <i key={i} style={{ "--d": `${i * .6}s` }} />)}</div></div>
          {!ran ? <button type="button" className="sm-btn" onClick={() => { setRan(true); setMsg({ t: "ok", s: "💧 Blue drops move UP. 🟡 Yellow food moves DOWN. Observe!" }); }}>▶ Run transport test</button>
            : q < 2 ? <div className="sm-opts"><p className="sm-h">{QS[q].q}</p>{LAY.filter((l) => ["xyl", "phl", "cam"].includes(l.id)).map((l) => <button type="button" key={l.id} className="sm-opt" onClick={() => { if (l.id === QS[q].a) { if (q === 1) { setQ(2); setTimeout(ctx.win, 1000); } else setQ(1); setMsg({ t: "ok", s: "✅ Correct!" }); } else { ctx.mistake(); setMsg({ t: "bad", s: "Not that tissue. Look at the test again." }); } }}><Ico n={l.id} size={30} />{l.name}</button>)}</div>
              : <p className="sm-win">🎋 The stem is fully functional!</p>}
        </div>
      )}
      <Say tone={msg.t}>{msg.s}</Say>
    </div>
  );
}

/* ═════════ Simulation 5 · Water Highway Rescue ═════════ */
const N = 1, E = 2, S = 4, W = 8;
const rot = (m) => ((m << 1) | (m >> 3)) & 15;
const spin = (m, k) => { let x = m; for (let i = 0; i < k; i++) x = rot(x); return x; };
const ROCK = [0, 0, "rock"];
const G5 = [
  [[5, 1], [3, 0], [5, 1], [10, 0], [5, 1]],
  [[5, 1, "broken"], ROCK, [5, 1], ROCK, [5, 1]],
  [[5, 1], [3, 2], [5, 1, "broken"], [14, 1], [5, 1]],
  [[3, 2], [10, 1], [15, 0], [10, 1], [9, 1]],
  [[3, 0], [5, 0], [5, 1], [3, 3], [10, 0]],
];
const SRC5 = [4, 2], LEAVES5 = [0, 2, 4], KITS = 4;
function flow5(g, broken) {
  const eff = g.map((row, r) => row.map((m, c) => (broken.has(`${r},${c}`) ? 0 : m)));
  const wet = new Set(), q = [SRC5];
  if (!(eff[SRC5[0]][SRC5[1]] & S)) return wet;
  wet.add(SRC5.join(","));
  while (q.length) {
    const [r, c] = q.shift(); const m = eff[r][c];
    [[N, -1, 0, S], [E, 0, 1, W], [S, 1, 0, N], [W, 0, -1, E]].forEach(([bit, dr, dc, opp]) => {
      const nr = r + dr, nc = c + dc;
      if (!(m & bit) || nr < 0 || nc < 0 || nr > 4 || nc > 4 || !(eff[nr][nc] & opp) || wet.has(`${nr},${nc}`)) return;
      wet.add(`${nr},${nc}`); q.push([nr, nc]);
    });
  }
  return wet;
}
function Pipe5({ m, wet, broken }) {
  const col = broken ? "#b45309" : wet ? "#38bdf8" : "#94a3b8";
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      {m & N ? <rect x="15" y="0" width="10" height="21" fill={col} /> : null}{m & S ? <rect x="15" y="19" width="10" height="21" fill={col} /> : null}
      {m & E ? <rect x="19" y="15" width="21" height="10" fill={col} /> : null}{m & W ? <rect x="0" y="15" width="21" height="10" fill={col} /> : null}
      <circle cx="20" cy="20" r="7" fill={col} />
      {broken && <path d="M12 8 L20 20 L14 32 M28 8 L22 22 L28 34" stroke="#fff" strokeWidth="3" fill="none" />}
    </svg>
  );
}
export function Sim5({ ctx }) {
  const [g, setG] = useState(() => G5.map((row) => row.map(([m, r, k]) => (k === "rock" ? 0 : spin(m, r)))));
  const [broken, setBroken] = useState(() => new Set(["1,0", "2,2"]));
  const [kits, setKits] = useState(KITS);
  const [kit, setKit] = useState(false);
  const [msg, setMsg] = useState({ t: "info", s: "Tap a pipe to rotate it. Use a 🔧 repair kit on cracked pipes. Hydrate all 3 leaves!" });
  const [done, setDone] = useState(false);
  const wet = useMemo(() => flow5(g, broken), [g, broken]);
  const leafWet = LEAVES5.map((c) => wet.has(`0,${c}`) && !!(g[0][c] & N));
  const nWet = leafWet.filter(Boolean).length;
  useEffect(() => { if (nWet === 3 && !done) { setDone(true); setMsg({ t: "ok", s: "💧 Every leaf is hydrated! The water highway is restored." }); setTimeout(ctx.win, 1500); } }, [nWet, done]);
  const tapTile = (r, c) => {
    if (done) return;
    const key = `${r},${c}`;
    if (G5[r][c][2] === "rock") { setMsg({ t: "info", s: "🪨 That passage is blocked. Build the pipe route around it." }); return; }
    if (kit) {
      if (kits <= 0) return;
      setKit(false); setKits((k) => k - 1);
      if (broken.has(key)) { setBroken((b) => { const n = new Set(b); n.delete(key); return n; }); setMsg({ t: "ok", s: "🔧 Pipe repaired!" }); if (kits - 1 === 0 && broken.size > 1) setTimeout(() => ctx.fail("You ran out of repair kits before fixing every broken pipe."), 900); }
      else { ctx.mistake(); setMsg({ t: "bad", s: "That pipe was not broken. The repair kit was wasted!" }); if (kits - 1 === 0 && broken.size > 0) setTimeout(() => ctx.fail("You ran out of repair kits before fixing every broken pipe."), 900); }
      return;
    }
    setG((old) => old.map((row, i) => row.map((m, j) => (i === r && j === c ? rot(m) : m))));
  };
  return (
    <div className="sm-s5">
      <div className="sm-row"><Meter label={`Leaf hydration: ${nWet}/3 leaves (+${nWet * 33} points)`} value={(nWet / 3) * 100} tone="blue" /></div>
      <div className="sm-row"><button type="button" className={`sm-btn${kit ? " on" : ""}`} onClick={() => kits > 0 && setKit((k) => !k)} disabled={kits <= 0 || done}>🔧 Repair kit ×{kits}{kit ? " (tap a pipe)" : ""}</button></div>
      <div className="sm-leaves">{[0, 1, 2, 3, 4].map((c) => <span key={c}>{LEAVES5.includes(c) ? <Ico n="leaf" size={30} className={leafWet[LEAVES5.indexOf(c)] ? "" : "dry"} /> : ""}</span>)}</div>
      <div className="sm-pipes">
        {g.map((row, r) => row.map((m, c) => (
          <button type="button" key={`${r}${c}`} className={`sm-pipe${G5[r][c][2] === "rock" ? " rock" : ""}`} onClick={() => tapTile(r, c)} aria-label={`Pipe row ${r + 1} column ${c + 1}`}>
            {G5[r][c][2] === "rock" ? "🪨" : <Pipe5 m={m} wet={wet.has(`${r},${c}`)} broken={broken.has(`${r},${c}`)} />}
          </button>
        )))}
      </div>
      <p className="sm-leg"><Ico n="root" size={20} /> Roots: water + minerals enter at the bottom ⬆</p>
      <Say tone={msg.t}>{msg.s}</Say>
    </div>
  );
}
