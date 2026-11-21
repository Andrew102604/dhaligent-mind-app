import React, { useEffect, useState } from "react";
import { Drag, Meter, MCQ, SeqTap, useCountdown, fmt, BASE } from "./ui.jsx";

const shuffleBy = (arr, order) => order.map((i) => arr[i]);

// Accurate botanical SVGs: each illustration matches the plant-part label.
function OrganVisual({ type, size = 54 }) {
  const common = { width: size, height: size, viewBox: "0 0 100 100", role: "img", "aria-label": type };
  if (type === "root") return <svg {...common}><path d="M50 8 C48 28 52 42 50 60 C48 75 39 83 35 94 M50 48 C35 52 27 62 20 72 M50 58 C64 58 73 68 80 80 M47 67 C39 69 34 76 31 83 M54 72 C62 75 66 81 69 89 M50 12 C43 20 42 27 43 34 M50 28 C58 33 61 39 61 46" fill="none" stroke="#d6a36a" strokeWidth="5" strokeLinecap="round"/><path d="M12 48 H88" stroke="#8b6a45" strokeWidth="2" strokeDasharray="4 4"/></svg>;
  if (type === "stem") return <svg {...common}><path d="M50 92 C48 65 53 35 50 8" stroke="#398b43" strokeWidth="13" fill="none" strokeLinecap="round"/><path d="M49 55 C31 44 24 34 19 23 M51 40 C67 31 74 23 79 12" stroke="#398b43" strokeWidth="7" fill="none" strokeLinecap="round"/><path d="M50 20 L50 85" stroke="#8dc66d" strokeWidth="3"/></svg>;
  if (type === "leaf") return <svg {...common}><path d="M12 78 C12 30 55 8 89 12 C88 54 57 91 12 78Z" fill="#55a94f" stroke="#26733b" strokeWidth="3"/><path d="M15 78 Q47 52 85 15 M43 58 L37 35 M57 48 L68 52 M29 67 L24 53" fill="none" stroke="#d5ef9a" strokeWidth="3" strokeLinecap="round"/></svg>;
  if (type === "seed") return <svg {...common}><ellipse cx="50" cy="54" rx="25" ry="34" fill="#9b6a35" stroke="#68451f" strokeWidth="4"/><path d="M42 29 Q58 49 43 76" fill="none" stroke="#d8ad72" strokeWidth="4" strokeLinecap="round"/></svg>;
  if (type === "flower") return <svg {...common}><g fill="#e94d79" stroke="#b72c59" strokeWidth="2"><ellipse cx="50" cy="27" rx="15" ry="25"/><ellipse cx="50" cy="73" rx="15" ry="25"/><ellipse cx="27" cy="50" rx="25" ry="15"/><ellipse cx="73" cy="50" rx="25" ry="15"/><ellipse cx="34" cy="34" rx="15" ry="23" transform="rotate(-45 34 34)"/><ellipse cx="66" cy="34" rx="15" ry="23" transform="rotate(45 66 34)"/></g><circle cx="50" cy="50" r="12" fill="#f6c843" stroke="#9d7620" strokeWidth="2"/></svg>;
  return <svg {...common}><path d="M50 18 C28 18 17 35 23 58 C28 78 43 88 50 91 C57 88 72 78 77 58 C83 35 72 18 50 18Z" fill="#f2a64a" stroke="#b66c24" strokeWidth="3"/><path d="M50 19 Q45 9 39 8 M50 19 Q59 8 66 10" fill="none" stroke="#398b43" strokeWidth="5" strokeLinecap="round"/><ellipse cx="43" cy="48" rx="3" ry="5" fill="#fff0c8"/><ellipse cx="58" cy="60" rx="3" ry="5" fill="#fff0c8"/></svg>;
}


/* ───────── Lesson 1 · Gumamela: drag the organ onto its function ───────── */
const ORG = [
  { id: "root", name: "Root", icon: "root", fn: "Holds the plant in the soil and takes in water and minerals", bi: "Naggunit sa tanom ug mokuha og tubig ug minerals" },
  { id: "stem", name: "Stem", icon: "stem", fn: "Holds up the plant and carries water and nutrients", bi: "Nagsuporta sa tanom ug nagdala og tubig ug sustansya" },
  { id: "leaf", name: "Leaf", icon: "leaf", fn: "Makes food using sunlight, water, and air", bi: "Naghimo og pagkaon gamit ang kahayag, tubig, ug hangin" },
  { id: "flower", name: "Flower", icon: "flower", fn: "Helps the plant make new seeds", bi: "Makatabang sa paghimo og bag-ong liso" },
  { id: "fruit", name: "Fruit", icon: "fruit", fn: "Holds the seeds", bi: "Nagkupot sa mga liso" },
];
const PLANT = ["seed", "root", "stem", "leaf", "flower", "fruit"];
export function Game1({ ctx }) {
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState(false);
  const [shake, setShake] = useState("");
  const cur = ORG[idx];
  const attempt = (fid) => {
    if (!cur) return;
    if (fid === cur.id) {
      const n = idx + 1; setIdx(n); setSel(false);
      if (n >= ORG.length) setTimeout(ctx.win, 900);
    } else { ctx.wrong(); setShake(fid); setTimeout(() => setShake(""), 450); }
  };
  return (
    <div className="lg-g1">
      <div className="lg-plant"><div className="lg-plant-e" key={idx}><OrganVisual type={PLANT[idx]} size={82} /></div><Meter label="Growth meter" value={(idx / ORG.length) * 100} /></div>
      {cur ? (
        <>
          <p className="lg-prompt">New organ unlocked! Drag it to the correct function <span className="lg-sub">(or tap it, then tap the function)</span></p>
          <div className="lg-unlock"><Drag id={cur.id} selected={sel} onTap={() => setSel((s) => !s)} onDrop={(_, t) => attempt(t)} className="lg-organ"><span className="lg-organ-i"><OrganVisual type={cur.icon} /></span><b>{cur.name}</b></Drag></div>
        </>
      ) : <p className="lg-prompt good">🌺 Gumamela is fully grown!</p>}
      <div className="lg-fns">
        {shuffleBy(ORG, [2, 4, 0, 3, 1]).map((o) => {
          const done = ORG.indexOf(o) < idx;
          return (
            <div key={o.id} data-drop={o.id} onClick={() => sel && attempt(o.id)} className={`lg-fn${done ? " done" : ""}${shake === o.id ? " shake" : ""}${sel ? " ready" : ""}`}>
              <div className="lg-fn-h">{done ? <><span><OrganVisual type={o.icon} size={34} /></span><b>{o.name}</b></> : <span className="lg-fn-q">?</span>}</div>
              <p>{o.fn}</p><small>({o.bi})</small>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ───────── Lesson 2 · Roots: collect → classify → build ───────── */
const PARTS = [
  { id: "main", label: "Main root", clue: "The big, strong root that grows deep into the soil." },
  { id: "lateral", label: "Lateral roots", clue: "Side roots that branch out and spread through the soil." },
  { id: "hair", label: "Root hair", clue: "Tiny hairs that absorb water and minerals." },
  { id: "cap", label: "Root cap", clue: "Protects the tip of the root as it pushes through the soil." },
];
const DECOY = [{ id: "petiole", label: "Petiole" }, { id: "stomata", label: "Stomata" }];
const SORT = [
  { n: "Carrot", t: "taproot", e: "🥕" }, { n: "Grass", t: "fibrous", e: "🌾" }, { n: "Mango tree", t: "taproot", e: "🥭" },
  { n: "Rice plant", t: "fibrous", e: "🌾" }, { n: "Dandelion", t: "taproot", e: "🌼" }, { n: "Onion", t: "fibrous", e: "🧅" },
];
const BUILD = [
  { icon: "🧢", label: "Root cap protects the tip as the root pushes down" },
  { icon: "⬇️", label: "Main root grows deep" },
  { icon: "🌿", label: "Lateral roots branch out" },
  { icon: "💧", label: "Root hairs absorb water and minerals" },
];
export function Game2({ ctx }) {
  const [stage, setStage] = useState(0);
  const [i, setI] = useState(0);
  const [got, setGot] = useState([]);
  const total = 4 + SORT.length + 1;
  const prog = stage === 0 ? i : stage === 1 ? 4 + i : stage === 2 ? 4 + SORT.length : total;
  const next = () => { setI(0); setStage((s) => s + 1); };
  const pool = [...PARTS, ...DECOY];
  return (
    <div className="lg-g2">
      <div className="lg-row"><Meter label="Root network health" value={(prog / total) * 100} /><div className="lg-bonus" aria-label="Bonus">💧 {got.length} &nbsp; 🧪 {Math.max(0, got.length - 1)}</div></div>
      {stage === 0 && (<>
        <div className="lg-tray">{PARTS.map((p, k) => <span key={p.id} className={k < i ? "on" : ""}>{k < i ? p.label : "?"}</span>)}</div>
        <MCQ prompt={`Collect root part ${i + 1} of 4`} sub={PARTS[i].clue} cols={3} wrong={ctx.wrong}
          options={shuffleBy(pool, [3, 5, 0, 2, 4, 1]).filter((o) => !PARTS.slice(0, i).some((p) => p.id === o.id)).map((o) => ({ id: o.id, label: o.label }))}
          answer={PARTS[i].id} onCorrect={() => { setGot((g) => [...g, i]); i + 1 >= 4 ? next() : setI(i + 1); }} />
      </>)}
      {stage === 1 && (
        <MCQ prompt={`${SORT[i].e} ${SORT[i].n}`} sub={`Which root system does it have? (${i + 1} of ${SORT.length})`} cols={2} wrong={ctx.wrong}
          options={[{ id: "taproot", label: "Taproot", img: "taproot" }, { id: "fibrous", label: "Fibrous root", img: "fibrous" }]}
          answer={SORT[i].t} onCorrect={() => { setGot((g) => [...g, 10 + i]); i + 1 >= SORT.length ? next() : setI(i + 1); }} />
      )}
      {stage === 2 && (
        <SeqTap prompt="Build the root system. Tap the steps in the order the root grows." items={BUILD} shuffle={[2, 3, 0, 1]} wrong={ctx.wrong} onDone={() => { setStage(3); setTimeout(ctx.win, 900); }} />
      )}
      {stage === 3 && <p className="lg-prompt good">🌱 Healthy root network!</p>}
    </div>
  );
}

/* ───────── Lesson 3 · Water maze + osmosis ───────── */
const MAZE = ["S..#...", "##.x.#.", ".o...#.", ".###x#.", "...o...", "#x##.##", "o.....R"];
const NEED = 3;
export function Game3({ ctx }) {
  const [pos, setPos] = useState([0, 0]);
  const [taken, setTaken] = useState([]);
  const [msg, setMsg] = useState("Use the arrows (or tap a nearby square) to guide the droplet.");
  const [phase, setPhase] = useState("maze");
  const [lvl, setLvl] = useState(0);
  const move = (dr, dc) => {
    if (phase !== "maze") return;
    const r = pos[0] + dr, c = pos[1] + dc;
    if (r < 0 || c < 0 || r >= 7 || c >= 7) return;
    const ch = MAZE[r][c];
    if (ch === "#") { ctx.wrong(); setMsg("🪨 A rock blocks the way!"); return; }
    if (ch === "x") { ctx.wrong(); setMsg("🏜️ Dry soil! The droplet cannot pass."); return; }
    if (ch === "R") {
      if (taken.length < NEED) { setMsg(`The root hair needs more water! Collect all ${NEED} droplets first (${taken.length}/${NEED}).`); return; }
      setPos([r, c]); setPhase("osmosis"); return;
    }
    setPos([r, c]);
    if (ch === "o" && !taken.includes(`${r},${c}`)) { setTaken((t) => [...t, `${r},${c}`]); setMsg("💧 Droplet collected!"); }
    else setMsg("Keep going toward the root hair.");
  };
  useEffect(() => {
    const h = (e) => {
      const m = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }[e.key];
      if (m) { e.preventDefault(); move(m[0], m[1]); }
    };
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  });
  useEffect(() => {
    if (phase !== "stem") return undefined;
    const id = setInterval(() => setLvl((l) => { if (l >= 100) { clearInterval(id); return 100; } return l + 4; }), 90);
    return () => clearInterval(id);
  }, [phase]);
  useEffect(() => { if (lvl >= 100) { const t = setTimeout(ctx.win, 900); return () => clearTimeout(t); } return undefined; }, [lvl]);
  const tapCell = (r, c) => { const dr = r - pos[0], dc = c - pos[1]; if (Math.abs(dr) + Math.abs(dc) === 1) move(dr, dc); };
  if (phase === "osmosis") return (
    <div className="lg-osm">
      <p className="lg-prompt">Osmosis! The droplets reached the root hair.</p>
      <div className="lg-osm-box">
        <div className="lg-osm-side"><b>Soil</b><small>more water</small><div className="lg-osm-dots">{Array.from({ length: 9 }, (_, k) => <i key={k} style={{ "--d": `${k * 0.3}s` }} />)}</div></div>
        <div className="lg-osm-mem">membrane</div>
        <div className="lg-osm-side cell"><b>Root hair cell</b><small>less water</small></div>
      </div>
      <p className="lg-sub">Water moves through a selectively permeable membrane from where there is more water to where there is less. <em>(Ang tubig molihok gikan sa mas daghan paingon sa mas gamay.)</em></p>
      <button type="button" className="lg-btn" onClick={() => setPhase("stem")}>Send the water up to the stem →</button>
    </div>
  );
  if (phase === "stem") return (
    <div className="lg-osm">
      <p className="lg-prompt">Water travels up through the root into the stem…</p>
      <div className="lg-stem-tube"><div className="lg-stem-fill" style={{ height: `${lvl}%` }} /></div>
      <Meter label="Water level" value={lvl} tone="blue" />
    </div>
  );
  return (
    <div className="lg-g3">
      <div className="lg-row"><Meter label="Water level" value={(taken.length / NEED) * 100} tone="blue" /><span className="lg-bonus">💧 {taken.length}/{NEED}</span></div>
      <p className="lg-sub" role="status">{msg}</p>
      <div className="lg-maze" role="grid">
        {MAZE.map((row, r) => row.split("").map((ch, c) => {
          const me = pos[0] === r && pos[1] === c, got = taken.includes(`${r},${c}`);
          const cls = ch === "#" ? "rock" : ch === "x" ? "dry" : ch === "R" ? "goal" : "soil";
          return <div key={`${r}${c}`} className={`lg-cell ${cls}${me ? " me" : ""}`} onClick={() => tapCell(r, c)}>{me ? "💧" : ch === "#" ? "🪨" : ch === "x" ? "🏜️" : ch === "R" ? "🌱" : ch === "o" && !got ? "💦" : ""}</div>;
        }))}
      </div>
      <div className="lg-dpad" aria-label="Move">
        <button type="button" onClick={() => move(-1, 0)} aria-label="Up">▲</button>
        <button type="button" onClick={() => move(0, -1)} aria-label="Left">◀</button>
        <button type="button" onClick={() => move(1, 0)} aria-label="Down">▼</button>
        <button type="button" onClick={() => move(0, 1)} aria-label="Right">▶</button>
      </div>
      <p className="lg-sub">🌱 = root hair (goal) · 🪨 rock · 🏜️ dry soil · 💦 droplet</p>
    </div>
  );
}

/* ───────── Lesson 4 · Stem layers + transport test (timed) ───────── */
const LAYERS = [
  { id: "epidermis", name: "Epidermis", clue: "Outermost layer — protects the inside of the stem", c: "#5fbf3a" },
  { id: "cortex", name: "Cortex", clue: "Stores food and may help support the plant", c: "#f1d3a3" },
  { id: "phloem", name: "Phloem", clue: "Carries food made by the leaves", c: "#7ed13b" },
  { id: "cambium", name: "Cambium", clue: "Makes new cells so the stem grows thicker", c: "#a0683a" },
  { id: "xylem", name: "Xylem", clue: "Carries water and minerals up from the roots", c: "#3b82f6" },
];
const CARGO = [
  { prompt: "💧 Water and minerals must travel UP from the roots to the leaves.", answer: "xylem" },
  { prompt: "🍬 Sugar made in the leaves must reach the rest of the plant.", answer: "phloem" },
  { prompt: "📏 The stem needs to grow thicker.", answer: "cambium" },
];
export function Game4({ ctx }) {
  const [placed, setPlaced] = useState({});
  const [sel, setSel] = useState(null);
  const [shake, setShake] = useState("");
  const [stage, setStage] = useState(0);
  const [k, setK] = useState(0);
  const left = useCountdown(120, stage < 2, () => ctx.lose("Time is up!"));
  const drop = (tok, slot) => {
    if (placed[slot]) return;
    if (tok === slot) {
      const p = { ...placed, [slot]: true }; setPlaced(p); setSel(null);
      if (Object.keys(p).length === LAYERS.length) setTimeout(() => setStage(1), 800);
    } else { ctx.wrong(); setShake(slot); setTimeout(() => setShake(""), 400); }
  };
  const tokens = shuffleBy(LAYERS, [3, 0, 4, 2, 1]).filter((l) => !placed[l.id]);
  return (
    <div className="lg-g4">
      <div className="lg-row"><Meter label="Stem stability" value={((Object.keys(placed).length + (stage > 0 ? k : 0)) / (LAYERS.length + CARGO.length)) * 100} /><span className={`lg-timer${left < 20 ? " low" : ""}`}>⏱ {fmt(left)}</span></div>
      {stage === 0 && (<>
        <p className="lg-prompt">Assemble the stem. Drag each layer to its function <span className="lg-sub">(or tap a layer, then tap the function)</span></p>
        <div className="lg-g4-wrap">
          <div className="lg-rings" aria-hidden="true">{LAYERS.map((l, i) => <div key={l.id} className={placed[l.id] ? "on" : ""} style={{ "--s": `${100 - i * 19}%`, "--c": l.c }} />)}<span className="lg-pith" /></div>
          <div className="lg-slots">
            {LAYERS.map((l) => (
              <div key={l.id} data-drop={l.id} onClick={() => sel && drop(sel, l.id)} className={`lg-slot${placed[l.id] ? " done" : ""}${shake === l.id ? " shake" : ""}`}>
                {placed[l.id] ? <b><img src={`${BASE}games/icons/${l.id}.webp`} alt="" />{l.name}</b> : <span className="lg-slot-q">?</span>}
                <small>{l.clue}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="lg-tokens">{tokens.map((l) => <Drag key={l.id} id={l.id} selected={sel === l.id} onTap={(id) => setSel((s) => (s === id ? null : id))} onDrop={drop} className="lg-token"><img src={`${BASE}games/icons/${l.id}.webp`} alt="" /><b>{l.name}</b></Drag>)}</div>
      </>)}
      {stage === 1 && (
        <MCQ prompt={`Transport test ${k + 1} of ${CARGO.length}`} sub={CARGO[k].prompt} cols={3} wrong={ctx.wrong}
          options={[{ id: "xylem", label: "Xylem", img: "xylem" }, { id: "phloem", label: "Phloem", img: "phloem" }, { id: "cambium", label: "Cambium", img: "cambium" }]}
          answer={CARGO[k].answer} onCorrect={() => { if (k + 1 >= CARGO.length) { setK(CARGO.length); setStage(2); setTimeout(ctx.win, 900); } else setK(k + 1); }} />
      )}
      {stage === 2 && <p className="lg-prompt good">🎋 The stem is stable and supports the plant!</p>}
    </div>
  );
}

/* ───────── Lesson 5 · Xylem pipes (rotate to connect) ───────── */
const N = 1, E = 2, S = 4, W = 8;
const rot = (m) => ((m << 1) | (m >> 3)) & 15;
const ROCK = [0, 0, true];
const GRID = [
  [[5, 1], [3, 0], [10, 0], [5, 1]],
  [[5, 1], ROCK, [14, 0], [5, 1]],
  [[5, 1], [3, 2], ROCK, [5, 1]],
  [[3, 2], [14, 1], [10, 1], [9, 1]],
  [[3, 1], [5, 1], [10, 0], [3, 3]],
];
const SRC = [4, 1];
const LEAVES = [0, 3];
const spin = (m, n) => { let x = m; for (let i = 0; i < n; i++) x = rot(x); return x; };
function flow(g) {
  const wet = new Set(); const q = [SRC];
  if (!(g[SRC[0]][SRC[1]] & S)) return wet;
  wet.add(SRC.join(","));
  while (q.length) {
    const [r, c] = q.shift(); const m = g[r][c];
    [[N, -1, 0, S], [E, 0, 1, W], [S, 1, 0, N], [W, 0, -1, E]].forEach(([bit, dr, dc, opp]) => {
      const nr = r + dr, nc = c + dc;
      if (!(m & bit) || nr < 0 || nc < 0 || nr >= g.length || nc >= g[0].length) return;
      if (!(g[nr][nc] & opp) || wet.has(`${nr},${nc}`)) return;
      wet.add(`${nr},${nc}`); q.push([nr, nc]);
    });
  }
  return wet;
}
function Pipe({ m, wet }) {
  const col = wet ? "#38bdf8" : "#94a3b8";
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      {m & N ? <rect x="15" y="0" width="10" height="21" fill={col} /> : null}
      {m & S ? <rect x="15" y="19" width="10" height="21" fill={col} /> : null}
      {m & E ? <rect x="19" y="15" width="21" height="10" fill={col} /> : null}
      {m & W ? <rect x="0" y="15" width="21" height="10" fill={col} /> : null}
      <circle cx="20" cy="20" r="7" fill={col} />
    </svg>
  );
}
export function Game5({ ctx }) {
  const [g, setG] = useState(() => GRID.map((row) => row.map(([m, r, rock]) => (rock ? 0 : spin(m, r)))));
  const [msg, setMsg] = useState("Tap a pipe to rotate it. Connect the roots to both leaves, then press Pump!");
  const [done, setDone] = useState(false);
  const left = useCountdown(150, !done, () => ctx.lose("Time is up!"));
  const wet = flow(g);
  const turn = (r, c) => {
    if (done) return;
    if (GRID[r][c][2]) { setMsg("🪨 That pathway is blocked. Build around it!"); return; }
    setG((old) => old.map((row, i) => row.map((m, j) => (i === r && j === c ? rot(m) : m))));
  };
  const pump = () => {
    const ok = LEAVES.every((c) => wet.has(`0,${c}`) && (g[0][c] & N));
    if (ok) { setDone(true); setMsg("💧 Water reached every leaf!"); setTimeout(ctx.win, 1000); }
    else { ctx.wrong(); setMsg("The water did not reach both leaves. Keep connecting the pipes!"); }
  };
  return (
    <div className="lg-g5">
      <div className="lg-row"><Meter label="Leaves hydrated" value={(LEAVES.filter((c) => wet.has(`0,${c}`) && g[0][c] & N).length / 2) * 100} tone="blue" /><span className={`lg-timer${left < 30 ? " low" : ""}`}>⏱ {fmt(left)}{left > 100 ? " ⚡" : ""}</span></div>
      <p className="lg-sub" role="status">{msg}</p>
      <div className="lg-leaves">{[0, 1, 2, 3].map((c) => <span key={c}>{LEAVES.includes(c) ? (wet.has(`0,${c}`) && g[0][c] & N ? "🌿" : "🥀") : ""}</span>)}</div>
      <div className="lg-pipes">
        {g.map((row, r) => row.map((m, c) => (
          <button type="button" key={`${r}${c}`} className={`lg-pipe${GRID[r][c][2] ? " rock" : ""}`} onClick={() => turn(r, c)} aria-label={`Pipe row ${r + 1} column ${c + 1}`}>
            {GRID[r][c][2] ? "🪨" : <Pipe m={m} wet={wet.has(`${r},${c}`)} />}
          </button>
        )))}
      </div>
      <div className="lg-roots-in">🌱 Roots: water + minerals enter here ⬆</div>
      <button type="button" className="lg-btn" onClick={pump} disabled={done}>💧 Pump the water!</button>
    </div>
  );
}
