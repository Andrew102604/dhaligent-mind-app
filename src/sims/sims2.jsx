import React, { useRef, useState } from "react";
import { Drag, Meter, Ico, Say, useTick, useCountdown, fmt } from "./sui.jsx";

const clamp = (v, a = 0, b = 100) => Math.max(a, Math.min(b, v));

/* ═════════ Simulation 6 · Feed the Papaya Plant (real time) ═════════ */
const PP = [
  { id: "roots", name: "Roots", ico: "roots" }, { id: "stem", name: "Stem", ico: "stem6" }, { id: "flowers", name: "Flowers", ico: "flower6" },
  { id: "fruits", name: "Fruits", ico: "fruit6" }, { id: "shoots", name: "Shoots", ico: "shoot" },
];
const FEED_GOAL = 3;
export function Sim6({ ctx }) {
  const [en, setEn] = useState({ roots: 60, stem: 55, flowers: 65, fruits: 50, shoots: 60 });
  const [fed, setFed] = useState({ roots: 0, stem: 0, flowers: 0, fruits: 0, shoots: 0 });
  const [packets, setPackets] = useState(1);
  const [cool, setCool] = useState([0, 0, 0]);
  const [health, setHealth] = useState(100);
  const [points, setPoints] = useState(0);
  const [held, setHeld] = useState(false);
  const [msg, setMsg] = useState({ t: "info", s: "Tap a leaf to collect a sugar packet, then deliver it to a plant part that needs energy." });
  const [done, setDone] = useState(false);
  const st = useRef({}); st.current = { en, fed, health };
  useTick(250, !done, () => {
    setCool((c) => c.map((x) => Math.max(0, x - 0.25)));
    const e = { ...st.current.en }; let miss = 0;
    PP.forEach((p) => { e[p.id] -= 0.9 * 0.25 * 2.2; if (e[p.id] <= 0) { e[p.id] = 35; miss++; } });
    setEn(e);
    if (miss) { setMsg({ t: "bad", s: "⚠ A plant part ran out of energy! Plant health dropped." }); setHealth((h) => { const n = h - 12 * miss; if (n <= 0) setTimeout(() => ctx.fail("The papaya plant ran out of health. Deliver sugar faster next time!"), 200); return Math.max(0, n); }); }
  });
  const collect = (i) => {
    if (cool[i] > 0 || packets >= 3 || done) return;
    setPackets((p) => p + 1); setCool((c) => c.map((x, k) => (k === i ? 2 : x))); setMsg({ t: "info", s: "🍬 Sugar packet collected from the leaf." });
  };
  const deliver = (pid) => {
    if (done) return;
    if (packets <= 0) { setMsg({ t: "info", s: "No sugar packet yet. Tap a leaf to collect one first." }); return; }
    setHeld(false); setPackets((p) => p - 1);
    if (en[pid] >= 85) { ctx.mistake(); setMsg({ t: "bad", s: `${PP.find((p) => p.id === pid).name} is already full! The sugar was wasted. Feed a part that needs energy.` }); return; }
    setEn((e) => ({ ...e, [pid]: Math.min(100, e[pid] + 35) })); setPoints((x) => x + 10);
    const f = { ...fed, [pid]: fed[pid] + 1 }; setFed(f);
    setMsg({ t: "ok", s: `✅ Delivered to the ${PP.find((p) => p.id === pid).name.toLowerCase()}! +10 Energy Points.` });
    if (PP.every((p) => f[p.id] >= FEED_GOAL)) { setDone(true); setTimeout(ctx.win, 1300); }
  };
  const total = PP.reduce((a, p) => a + Math.min(FEED_GOAL, fed[p.id]), 0);
  return (
    <div className="sm-s6">
      <div className="sm-row"><Meter label={`Plant health: ${health}%`} value={health} tone={health < 40 ? "red" : "green"} /><span className="sm-pill">⚡ {points}</span></div>
      <Meter label={`Plant parts fed: ${total}/${PP.length * FEED_GOAL}`} value={(total / (PP.length * FEED_GOAL)) * 100} tone="gold" />
      <div className="sm-leafrow">{cool.map((c, i) => <button type="button" key={i} className="sm-leafbtn" onClick={() => collect(i)} disabled={c > 0 || packets >= 3} aria-label={`Leaf ${i + 1}`}><Ico n="leaf" size={34} /><small>{c > 0 ? "…" : "tap"}</small></button>)}</div>
      <div className="sm-hand">
        {packets > 0 ? <Drag id="sugar" selected={held} onTap={() => setHeld((h) => !h)} onDrop={(_, z) => deliver(z)} className="sm-chip"><Ico n="sugar" size={34} /><b>Sugar packets ×{packets}</b></Drag> : <span className="sm-pill">No packets — tap a leaf</span>}
        <small>Drag a packet onto a plant part, or tap the packet then the part.</small>
      </div>
      <div className="sm-parts">
        {PP.map((p) => (
          <div key={p.id} data-drop={p.id} data-e={Math.round(en[p.id])} onClick={() => held && deliver(p.id)} className={`sm-part${en[p.id] < 30 ? " low" : ""}${held ? " ready" : ""}`}>
            <Ico n={p.ico} size={40} /><b>{p.name}</b>
            <div className="sm-pbar"><i style={{ width: `${clamp(en[p.id])}%` }} className={en[p.id] < 30 ? "low" : ""} /></div>
            <small>Fed {Math.min(FEED_GOAL, fed[p.id])}/{FEED_GOAL}</small>
          </div>
        ))}
      </div>
      <Say tone={msg.t}>{msg.s}</Say>
    </div>
  );
}

/* ═════════ Simulation 7 · Finish the Papaya Leaf Factory ═════════ */
const LP = [
  { id: "blade", name: "Blade", ico: "blade", fn: "The broad, flat part that catches sunlight.", z: [52, 50] },
  { id: "petiole", name: "Petiole", ico: "pet", fn: "The stalk that attaches the leaf to the stem.", z: [18, 88] },
  { id: "veins", name: "Veins", ico: "vein", fn: "Carry water, minerals, and sugar through the leaf.", z: [52, 28] },
  { id: "chloro", name: "Chlorophyll", ico: null, fn: "The green substance that absorbs light energy.", z: [74, 62] },
  { id: "stomata", name: "Stomata", ico: "sto", fn: "Tiny openings that let gases move in and out.", z: [82, 18] },
];
function ChloroIcon({ size = 38 }) {
  return <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="#7ed13b" stroke="#15803d" strokeWidth="2" />{[[12, 14], [24, 12], [28, 24], [14, 26], [20, 20]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="3.4" fill="#14532d" />)}</svg>;
}
const COLLECT = [
  { id: "sun1", k: "sun" }, { id: "o2a", k: "bad", label: "O₂" }, { id: "w1", k: "water" }, { id: "co1", k: "co2" }, { id: "sun2", k: "sun" },
  { id: "sug", k: "bad", label: "Sugar" }, { id: "w2", k: "water" }, { id: "co2b", k: "co2" }, { id: "soil", k: "bad", label: "Soil" },
];
export function Sim7({ ctx }) {
  const [stage, setStage] = useState(0);
  const [placed, setPlaced] = useState({});
  const [sel, setSel] = useState(null);
  const [m, setM] = useState(0);
  const [bad, setBad] = useState([]);
  const [got, setGot] = useState({ sun: 0, water: 0, co2: 0 });
  const [taken, setTaken] = useState([]);
  const [msg, setMsg] = useState({ t: "info", s: "Drag each leaf part to its place on the leaf. Tap a part to read what it does." });
  const [run, setRun] = useState(false);
  const cur = LP.find((l) => l.id === sel);
  const place = (pid, zid) => {
    if (placed[zid]) return;
    if (pid === zid) { const p = { ...placed, [zid]: true }; setPlaced(p); setSel(null); setMsg({ t: "ok", s: `✅ ${LP.find((l) => l.id === pid).name} assembled!` }); if (Object.keys(p).length === 5) setTimeout(() => { setStage(1); setMsg({ t: "info", s: "Match each leaf structure to its function." }); }, 1100); }
    else { ctx.mistake(); setMsg({ t: "bad", s: "That part does not go there. Read its function and look at the leaf again." }); }
  };
  const need = 2;
  const gather = (it) => {
    if (taken.includes(it.id)) return;
    if (it.k === "bad") { ctx.mistake(); setBad((b) => [...b, it.id]); setMsg({ t: "bad", s: `${it.label} is not needed for photosynthesis inputs!` }); return; }
    if (got[it.k] >= need) { setMsg({ t: "info", s: "You already have enough of that. Collect the others!" }); return; }
    const g = { ...got, [it.k]: got[it.k] + 1 }; setGot(g); setTaken((t) => [...t, it.id]);
    if (g.sun >= need && g.water >= need && g.co2 >= need) setTimeout(() => { setStage(3); setMsg({ t: "ok", s: "All inputs collected! Start photosynthesis." }); }, 700);
  };
  const MATCH = LP.map((l) => ({ q: l.fn, a: l.id }));
  const prog = stage === 0 ? Object.keys(placed).length : stage === 1 ? 5 + m : stage === 2 ? 10 : 11 + (run ? 1 : 0);
  return (
    <div className="sm-s7">
      <Meter label="Leaf factory" value={(prog / 12) * 100} />
      {stage === 0 && (
        <div className="sm-s7-grid">
          <div className="sm-leafbox" aria-label="Leaf outline">
            <svg viewBox="0 0 300 260" aria-hidden="true"><path d="M70 175 Q50 205 35 232" stroke="#b9d9b0" strokeWidth="8" fill="none" strokeLinecap="round" /><path d="M70 175 C55 85 150 25 265 32 C255 140 170 225 70 175 Z" fill="#dff3d6" stroke="#8cc17e" strokeWidth="3" strokeDasharray="8 6" /></svg>
            {LP.map((l) => <div key={l.id} data-drop={l.id} onClick={() => sel && place(sel, l.id)} className={`sm-zone sm-zone-s${placed[l.id] ? " done" : ""}`} style={{ left: `${l.z[0]}%`, top: `${l.z[1]}%` }}>{placed[l.id] ? (l.ico ? <Ico n={l.ico} size={32} /> : <ChloroIcon size={30} />) : <span>?</span>}</div>)}
          </div>
          <div className="sm-side">
            <p className="sm-h">Leaf parts</p>
            <div className="sm-chips">{LP.filter((l) => !placed[l.id]).map((l) => <Drag key={l.id} id={l.id} selected={sel === l.id} onTap={(id) => setSel((s) => (s === id ? null : id))} onDrop={(id, z) => { setSel(id); place(id, z); }} className="sm-chip">{l.ico ? <Ico n={l.ico} size={36} /> : <ChloroIcon />}<b>{l.name}</b></Drag>)}</div>
            <div className="sm-info">{cur ? <><b>{cur.name}</b><p>{cur.fn}</p></> : <p>Tap a part to read its function.</p>}</div>
          </div>
        </div>
      )}
      {stage === 1 && (
        <div className="sm-mcq"><p className="sm-h">Which structure does this? ({m + 1} of 5)</p><p className="sm-q">{MATCH[m].q}</p>
          <div className="sm-opts">{LP.map((l) => <button type="button" key={l.id} className="sm-opt" onClick={() => { if (l.id === MATCH[m].a) { setMsg({ t: "ok", s: "✅ Correct match!" }); if (m + 1 >= 5) { setStage(2); setMsg({ t: "info", s: "Collect 2 sunlight, 2 water, and 2 carbon dioxide. Avoid the wrong items!" }); } else setM(m + 1); } else { ctx.mistake(); setMsg({ t: "bad", s: "Not a match. Think about what that structure does." }); } }}>{l.ico ? <Ico n={l.ico} size={30} /> : <ChloroIcon size={28} />}{l.name}</button>)}</div></div>
      )}
      {stage === 2 && (<>
        <div className="sm-need">☀️ {got.sun}/{need} &nbsp; 💧 {got.water}/{need} &nbsp; CO₂ {got.co2}/{need}</div>
        <div className="sm-field">{COLLECT.map((it) => (
          <button type="button" key={it.id} disabled={taken.includes(it.id) || bad.includes(it.id)} onClick={() => gather(it)} className={`sm-item${taken.includes(it.id) ? " gone" : ""}${bad.includes(it.id) ? " bad" : ""}`} aria-label={it.k === "bad" ? it.label : it.k}>
            {it.k === "sun" ? <Ico n="sun" size={44} /> : it.k === "water" ? <Ico n="water" size={40} /> : it.k === "co2" ? <b className="sm-co2">CO₂</b> : <b>{it.label}</b>}
          </button>))}</div>
      </>)}
      {stage === 3 && (
        <div className="sm-photo">
          <div className={`sm-factory${run ? " run" : ""}`}><div className="sm-in"><Ico n="sun" size={40} /><Ico n="water" size={36} /><b className="sm-co2">CO₂</b></div><div className="sm-arrow">➜</div><Ico n="blade" size={90} className="sm-bigleaf" /><div className="sm-arrow">➜</div><div className="sm-out">{run ? <><Ico n="sugar" size={48} /><b>Sugar + O₂</b></> : <b>?</b>}</div></div>
          {!run ? <button type="button" className="sm-btn" onClick={() => { setRun(true); setTimeout(ctx.win, 2600); }}>▶ Start photosynthesis</button> : <p className="sm-win">🍬 The leaf produced sugar and released oxygen!</p>}
        </div>
      )}
      <Say tone={msg.t}>{msg.s}</Say>
    </div>
  );
}

/* ═════════ Simulation 8 · Keep Water Moving (60 seconds) ═════════ */
const PHASE8 = [
  { n: "🌤️ Warm morning · moist soil", heat: 1.0, soil: 1.0 }, { n: "🔥 Hot, windy noon · water evaporates fast", heat: 2.2, soil: 0.8 },
  { n: "🏜️ Dry spell · little water in the soil", heat: 1.4, soil: 0.25 }, { n: "🌇 Cool evening · mild and calm", heat: 0.5, soil: 1.0 },
];
export function Sim8({ ctx }) {
  const [open, setOpen] = useState(true);
  const [x, setX] = useState(65);
  const [flow, setFlow] = useState(70);
  const [health, setHealth] = useState(100);
  const [msg, setMsg] = useState({ t: "info", s: "Open the stomata to keep water flowing, but close them when water is being lost too fast!" });
  const [done, setDone] = useState(false);
  const left = useCountdown(60, !done, () => { setDone(true); setMsg({ t: "ok", s: "✅ The timer ended and the water is still flowing!" }); setTimeout(ctx.win, 1000); });
  const elapsed = 60 - left;
  const ph = PHASE8[Math.min(3, Math.floor(elapsed / 15))];
  const s = useRef({}); s.current = { open, x, flow, health, ph };
  useTick(250, !done, () => {
    const { open: o, x: X, flow: F, health: H, ph: P } = s.current; const dt = 0.25;
    const out = o ? 6 * P.heat : 0.8, inn = P.soil * (o ? 7 : 2.5);
    const nx = clamp(X + (inn - out) * dt);
    const nf = clamp(F + ((o ? 100 : 5) - F) * 0.08);
    let nh = H;
    if (nx < 20) nh -= 6 * dt; if (nf < 20) nh -= 3 * dt; if (nx >= 35 && nf >= 35) nh += 2 * dt;
    nh = clamp(nh);
    setX(nx); setFlow(nf); setHealth(nh);
    if (nx < 20) setMsg({ t: "bad", s: "⚠ The xylem is running low! Close the stomata to stop water loss." });
    else if (nf < 20) setMsg({ t: "bad", s: "⚠ The water has almost stopped moving! Open the stomata so transpiration pulls water up." });
    if (nh <= 0) { setDone(true); setTimeout(() => ctx.fail("The Papaya wilted because the water stopped moving or ran out."), 300); }
  });
  return (
    <div className="sm-s8" data-x={Math.round(x)} data-flow={Math.round(flow)} data-open={open ? 1 : 0} data-phase={Math.min(3, Math.floor(elapsed / 15))}>
      <div className="sm-row"><span className={`sm-pill${left < 10 ? " low" : ""}`}>⏱ {fmt(left)}</span><Meter label={`Plant health: ${Math.round(health)}%`} value={health} tone={health < 40 ? "red" : "green"} /></div>
      <div className="sm-day">{ph.n}</div>
      <div className="sm-s8-grid">
        <div className="sm-xylem" aria-label="Xylem"><div className="sm-xfill" style={{ height: `${x}%` }} /><span>{Math.round(x)}%</span></div>
        <div className="sm-gauges">
          <Meter label="Xylem water level" value={x} tone={x < 25 ? "red" : "blue"} />
          <Meter label="Water flow (transpiration rate)" value={flow} tone={flow < 25 ? "red" : "gold"} />
          <div className={`sm-stoma${open ? " open" : ""}`}><Ico n="stoma" size={92} /><b>{open ? "Stomata OPEN" : "Stomata CLOSED"}</b></div>
          <button type="button" className="sm-btn" onClick={() => setOpen((o) => !o)} disabled={done}>{open ? "🔴 Close the stomata" : "🟢 Open the stomata"}</button>
        </div>
      </div>
      <Say tone={msg.t}>{msg.s}</Say>
    </div>
  );
}

/* ═════════ Simulation 9 · Plant Transport Manager ═════════ */
export function Sim9({ ctx }) {
  const [v, setV] = useState({ wr: 45, wl: 30, sl: 20, sd: 30 });
  const [h, setH] = useState(40);
  const [msg, setMsg] = useState({ t: "info", s: "Keep every system running. Water → roots → xylem → leaves → sugar → phloem!" });
  const [done, setDone] = useState(false);
  const s = useRef({}); s.current = { v, h };
  useTick(500, !done, () => {
    const { v: V, h: H } = s.current; const dt = 0.5;
    const nv = { wr: clamp(V.wr - 1.5 * dt), wl: clamp(V.wl - 1.5 * dt), sl: clamp(V.sl - 1.2 * dt), sd: clamp(V.sd - 2 * dt) };
    const lows = [nv.wr < 25, nv.wl < 20, nv.sl < 15, nv.sd < 30].filter(Boolean).length;
    const nh = clamp(H + (lows === 0 ? 3 : -1.2 * lows) * dt);
    setV(nv); setH(nh);
    if (nh >= 100) { setDone(true); setMsg({ t: "ok", s: "🌿 100% Plant Health! All systems are balanced." }); setTimeout(ctx.win, 1200); }
    else if (nh <= 0) { setDone(true); setTimeout(() => ctx.fail("The Papaya plant's health dropped to 0%. Keep all four systems above their warning levels."), 300); }
  });
  const act = (k) => {
    if (done) return;
    setV((x) => {
      if (k === "absorb") { setMsg({ t: "ok", s: "💧 Roots absorbed water." }); return { ...x, wr: clamp(x.wr + 22) }; }
      if (k === "lift") { if (x.wr < 20) { setMsg({ t: "bad", s: "The roots need more water before the xylem can lift it." }); return x; } setMsg({ t: "ok", s: "⬆ Xylem lifted water to the leaves." }); return { ...x, wr: x.wr - 20, wl: clamp(x.wl + 20) }; }
      if (k === "make") { if (x.wl < 15) { setMsg({ t: "bad", s: "The leaves need water to make sugar. Lift water first." }); return x; } setMsg({ t: "ok", s: "🍬 Photosynthesis made sugar." }); return { ...x, wl: x.wl - 15, sl: clamp(x.sl + 22) }; }
      if (x.sl < 20) { setMsg({ t: "bad", s: "There is no sugar to distribute yet. Make sugar in the leaves first." }); return x; }
      setMsg({ t: "ok", s: "⬇ Phloem distributed sugar to the plant." }); return { ...x, sl: x.sl - 20, sd: clamp(x.sd + 24) };
    });
  };
  const SYS = [
    { k: "absorb", ico: "water", lab: "Absorb water", sub: "Roots", key: "wr", warn: 25, tone: "blue" },
    { k: "lift", ico: "water", lab: "Lift water", sub: "Xylem → leaves", key: "wl", warn: 20, tone: "blue" },
    { k: "make", ico: "photo", lab: "Make sugar", sub: "Leaves (photosynthesis)", key: "sl", warn: 15, tone: "green" },
    { k: "dist", ico: "sugar", lab: "Distribute sugar", sub: "Phloem", key: "sd", warn: 30, tone: "gold" },
  ];
  return (
    <div className="sm-s9" data-h={Math.round(h)}>
      <Meter label={`🌿 Plant Health: ${Math.round(h)}% (goal 100%)`} value={h} tone={h < 35 ? "red" : "green"} />
      <div className="sm-sys">
        {SYS.map((y) => (
          <div key={y.k} className={`sm-card${v[y.key] < y.warn ? " low" : ""}`}>
            <Ico n={y.ico} size={38} /><b>{y.lab}</b><small>{y.sub}</small>
            <Meter label={`${Math.round(v[y.key])}%`} value={v[y.key]} tone={v[y.key] < y.warn ? "red" : y.tone} />
            <button type="button" className="sm-btn" data-act={y.k} onClick={() => act(y.k)} disabled={done}>{y.lab}</button>
          </div>
        ))}
      </div>
      <Say tone={msg.t}>{msg.s}</Say>
    </div>
  );
}

/* ═════════ Simulation 10 · Save the Papaya Plant ═════════ */
const FACT = [
  { id: "water", lab: "Water supply", ico: "water", lo: 50, hi: 90 }, { id: "sun", lab: "Sunlight", ico: "sun", lo: 40, hi: 80 },
  { id: "hum", lab: "Humidity", ico: "rain", lo: 40, hi: 80 }, { id: "temp", lab: "Temperature", ico: "temp", lo: 40, hi: 65 }, { id: "wind", lab: "Wind", ico: "wind", lo: 15, hi: 55 },
];
const RND = [
  { n: "🏜️ Dry spell", b: { water: 15, sun: 60, hum: 35, temp: 60, wind: 30 } },
  { n: "🔥 Heat wave", b: { water: 45, sun: 95, hum: 20, temp: 95, wind: 55 } },
  { n: "⛈️ Storm", b: { water: 95, sun: 10, hum: 90, temp: 45, wind: 95 } },
  { n: "🌫️ Cold, foggy morning", b: { water: 60, sun: 10, hum: 95, temp: 10, wind: 15 } },
  { n: "🌪️ Final round: everything at once!", b: { water: 20, sun: 90, hum: 90, temp: 88, wind: 85 } },
];
const dist = (v, lo, hi) => (v < lo ? lo - v : v > hi ? v - hi : 0);
const PREP = 8, LIVE = 10;
export function Sim10({ ctx }) {
  const [r, setR] = useState(0);
  const [ph, setPh] = useState("prep");
  const [off, setOff] = useState({ water: 0, sun: 0, hum: 0, temp: 0, wind: 0 });
  const [health, setHealth] = useState(100);
  const [t, setT] = useState(PREP);
  const [msg, setMsg] = useState({ t: "info", s: "A new weather event! Adjust the controls during preparation, then keep Plant Health above 80%." });
  const val = {}; FACT.forEach((f) => { val[f.id] = clamp(RND[r].b[f.id] + off[f.id]); });
  const pen = FACT.reduce((a, f) => a + Math.min(40, dist(val[f.id], f.lo, f.hi)) * 0.5, 0);
  const eff = Math.round(clamp(100 - pen * 1.35));
  const rootH = Math.round(clamp(100 - Math.min(40, dist(val.water, 50, 90)) * 2.2));
  const leafH = Math.round(clamp(100 - ["sun", "hum", "temp", "wind"].reduce((a, k) => a + Math.min(40, dist(val[k], FACT.find((f) => f.id === k).lo, FACT.find((f) => f.id === k).hi)), 0) * 0.9));
  const s = useRef({}); s.current = { r, ph, t, health, eff };
  const nextRound = () => {
    const { r: R, health: H } = s.current;
    if (H < 80) { setPh("dead"); ctx.fail(`Plant Health fell to ${Math.round(H)}%. It must stay above 80% at the end of each round.`); return; }
    if (R + 1 >= RND.length) { setPh("ok"); setMsg({ t: "ok", s: "🌴 You kept the Papaya healthy through the final round!" }); setTimeout(ctx.win, 1300); return; }
    setR(R + 1); setOff({ water: 0, sun: 0, hum: 0, temp: 0, wind: 0 }); setPh("prep"); setT(PREP); setMsg({ t: "info", s: "The environment changed! Adjust the controls." });
  };
  useTick(250, ph === "prep" || ph === "live", () => {
    const { ph: P, t: T, eff: E } = s.current;
    const nt = +(T - 0.25).toFixed(2);
    if (P === "live") setHealth((h) => clamp(h + (E >= 85 ? 1.5 : E >= 60 ? -1.5 : -4) * 0.25));
    if (nt <= 0) { if (P === "prep") { setPh("live"); setT(LIVE); setMsg({ t: "info", s: "The round has started. Keep transport efficiency high!" }); } else nextRound(); }
    else setT(nt);
  });
  const set = (id, v) => setOff((o) => ({ ...o, [id]: +v }));
  return (
    <div className="sm-s10" data-round={r} data-phase={ph} data-health={Math.round(health)}>
      <div className="sm-day">Round {r + 1} of {RND.length} · {RND[r].n} · {ph === "prep" ? `Prepare: ${Math.ceil(t)}s` : ph === "live" ? `Live: ${Math.ceil(t)}s` : ""}</div>
      <div className="sm-metersx"><Meter label={`🌿 Plant Health: ${Math.round(health)}%`} value={health} tone={health < 80 ? "red" : "green"} /><Meter label={`🚰 Transport efficiency: ${eff}%`} value={eff} tone={eff >= 85 ? "green" : eff >= 60 ? "gold" : "red"} /><Meter label={`🌱 Root health: ${rootH}%`} value={rootH} tone="gold" /><Meter label={`🍃 Leaf health: ${leafH}%`} value={leafH} tone="gold" /></div>
      <div className="sm-gset">
        {FACT.map((f) => (
          <div key={f.id} className="sm-gline">
            <Ico n={f.ico} size={32} />
            <div className="sm-gmid"><span>{f.lab}: <b>{Math.round(val[f.id])}</b></span>
              <div className="sm-gauge"><em style={{ left: `${f.lo}%`, width: `${f.hi - f.lo}%` }} /><i style={{ left: `${val[f.id]}%` }} /></div>
              <input type="range" min="-60" max="60" value={off[f.id]} onChange={(e) => set(f.id, e.target.value)} aria-label={`${f.lab} control`} disabled={ph === "ok" || ph === "dead"} /></div>
          </div>))}
      </div>
      {ph === "prep" && <button type="button" className="sm-btn" onClick={() => { setPh("live"); setT(LIVE); }}>▶ Start the round now</button>}
      <p className="sm-leg">Green band = ideal range for the plant. Move each slider so the marker stays inside its band.</p>
      <Say tone={msg.t}>{msg.s}</Say>
    </div>
  );
}
