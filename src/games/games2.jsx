import React, { useEffect, useState } from "react";
import { Drag, Meter, MCQ, SeqTap, useCountdown, BASE } from "./ui.jsx";


function PartVisual({ type, size = 34 }) {
  const props = { width: size, height: size, viewBox: "0 0 100 100", role: "img", "aria-label": type };
  if (type === "roots") return <svg {...props}><path d="M50 5 V48 M50 28 L28 48 M50 35 L72 55 M50 48 L40 78 M50 48 L62 85 M28 48 L18 70 M72 55 L82 77" fill="none" stroke="#c58b50" strokeWidth="8" strokeLinecap="round"/><path d="M8 49 H92" stroke="#8b6a45" strokeWidth="2" strokeDasharray="4 4"/></svg>;
  if (type === "stem") return <svg {...props}><path d="M50 94 C48 65 53 35 50 6" stroke="#398b43" strokeWidth="15" fill="none" strokeLinecap="round"/><path d="M50 56 Q27 43 18 25 M51 38 Q72 28 82 12" stroke="#398b43" strokeWidth="7" fill="none" strokeLinecap="round"/></svg>;
  return <svg {...props}><path d="M12 78 C12 30 55 8 89 12 C88 54 57 91 12 78Z" fill="#55a94f" stroke="#26733b" strokeWidth="3"/><path d="M15 78 Q47 52 85 15" fill="none" stroke="#d5ef9a" strokeWidth="3"/></svg>;
}

/* ───────── Lesson 6 · Phloem sugar delivery (limited time per request) ───────── */
const DEST = [
  { id: "roots", label: "Roots", icon: "roots" }, { id: "stem", label: "Stem", icon: "stem" },
  { id: "flowers", label: "Flowers", icon: "🌺" }, { id: "fruits", label: "Fruits", icon: "🍈" },
];
const REQ = [
  { c: "I live underground and store food for the plant.", a: "roots" },
  { c: "I am sweet and growing bigger, and I hold the seeds.", a: "fruits" },
  { c: "I need energy to help make new seeds.", a: "flowers" },
  { c: "I hold up the plant and have new growing tips.", a: "stem" },
  { c: "I absorb water from the soil, but I cannot make my own food.", a: "roots" },
  { c: "I am small and green and growing every day.", a: "fruits" },
  { c: "Bees visit me, and I need sugar to bloom.", a: "flowers" },
  { c: "I connect the roots to the leaves.", a: "stem" },
];
export function Game6({ ctx }) {
  const [i, setI] = useState(0);
  const [bad, setBad] = useState([]);
  const [route, setRoute] = useState(null);
  const [tk, setTk] = useState(0);
  const SECS = 12;
  const left = useCountdown(SECS, i < REQ.length && !route, () => { ctx.wrong(); setBad([]); setTk((k) => k + 1); }, `${i}-${tk}`);
  const pick = (id) => {
    if (route || bad.includes(id)) return;
    if (id === REQ[i].a) {
      setRoute(id);
      setTimeout(() => { setRoute(null); setBad([]); if (i + 1 >= REQ.length) { setI(REQ.length); setTimeout(ctx.win, 700); } else setI(i + 1); }, 900);
    } else { ctx.wrong(); setBad((b) => [...b, id]); }
  };
  const fast = left > SECS / 2;
  return (
    <div className="lg-g6">
      <div className="lg-row"><Meter label="Papaya health" value={(i / REQ.length) * 100} /><span className="lg-bonus">🍬 {i}/{REQ.length}</span></div>
      {i < REQ.length ? (<>
        <div className="lg-bubble"><b>Request {i + 1}:</b> “{REQ[i].c}”</div>
        <div className="lg-tbar"><i className={left < 4 ? "low" : ""} style={{ width: `${(left / SECS) * 100}%` }} /></div>
        <p className="lg-sub">Pick the route: carry the sugar from the leaves through the phloem to the part that needs food. {fast && "⚡ Fast delivery = bonus!"}</p>
        <div className="lg-route"><span className="lg-sugar">🍬</span><span className={route ? "lg-flow on" : "lg-flow"}>🍃 ➜ phloem ➜</span></div>
        <div className="lg-dests">
          {DEST.map((d) => <button type="button" key={d.id} onClick={() => pick(d.id)} disabled={bad.includes(d.id) || !!route} className={`lg-dest${route === d.id ? " good" : ""}${bad.includes(d.id) ? " bad" : ""}`}><span><PartVisual type={d.icon} /></span>{d.label}</button>)}
        </div>
      </>) : <p className="lg-prompt good">🍈 All sugar delivered — the papaya is healthy!</p>}
    </div>
  );
}

/* ───────── Lesson 7 · Leaf: label → spot → photosynthesis ───────── */
const LP = [
  { id: "blade", name: "Blade", x: 66, y: 60, clue: "Tap the broad, flat part that catches sunlight." },
  { id: "petiole", name: "Petiole", x: 13, y: 83, clue: "Tap the stalk that attaches the leaf to the stem." },
  { id: "veins", name: "Veins", x: 41, y: 38, clue: "Tap the lines that carry water, minerals, and sugar." },
  { id: "chlorophyll", name: "Chlorophyll", x: 59, y: 26, clue: "Tap the green substance that absorbs light energy." },
  { id: "stomata", name: "Stomata", x: 80, y: 79, clue: "Tap the tiny openings that let gases move in and out." },
];
function LeafArt() {
  return (
    <svg viewBox="0 0 300 260" className="lg-leaf" aria-hidden="true">
      <path d="M70 175 Q50 205 35 232" stroke="#166534" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M70 175 C55 85 150 25 265 32 C255 140 170 225 70 175 Z" fill="#4ade80" stroke="#15803d" strokeWidth="3" />
      <path d="M70 175 L258 36" stroke="#dcfce7" strokeWidth="5" strokeLinecap="round" />
      {["M105 145 L88 108", "M140 118 L124 78", "M178 90 L170 52", "M118 152 L150 188", "M158 122 L196 160", "M200 92 L236 116"].map((d) => <path key={d} d={d} stroke="#dcfce7" strokeWidth="2.5" strokeLinecap="round" />)}
      {[[150, 80], [170, 66], [135, 100], [190, 120], [160, 150], [120, 128], [205, 70], [185, 98]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="3.4" fill="#14532d" opacity=".55" />)}
      <circle cx="240" cy="205" r="27" fill="#bbf7d0" stroke="#166534" strokeWidth="3" />
      <ellipse cx="231" cy="205" rx="7" ry="11" fill="#fef9c3" stroke="#166534" strokeWidth="2" /><ellipse cx="249" cy="205" rx="7" ry="11" fill="#fef9c3" stroke="#166534" strokeWidth="2" />
    </svg>
  );
}
const PHOTO = [
  { id: "sun", label: "Sunlight", icon: "☀️", ok: true }, { id: "water", label: "Water", icon: "💧", ok: true }, { id: "co2", label: "Carbon dioxide", icon: "☁️", ok: true },
  { id: "soil", label: "Soil", icon: "🪨" }, { id: "sugar", label: "Sugar", icon: "🍬" }, { id: "plastic", label: "Plastic", icon: "🧴" },
];
export function Game7({ ctx }) {
  const [stage, setStage] = useState(0);
  const [placed, setPlaced] = useState({});
  const [sel, setSel] = useState(null);
  const [shake, setShake] = useState("");
  const [k, setK] = useState(0);
  const [fed, setFed] = useState([]);
  const [badF, setBadF] = useState([]);
  const labelDrop = (tok, slot) => {
    if (placed[slot]) return;
    if (tok === slot) { const p = { ...placed, [slot]: true }; setPlaced(p); setSel(null); if (Object.keys(p).length === LP.length) setTimeout(() => setStage(1), 800); }
    else { ctx.wrong(); setShake(slot); setTimeout(() => setShake(""), 400); }
  };
  const spot = (id) => {
    if (id === LP[k].id) { if (k + 1 >= LP.length) setStage(2); else setK(k + 1); }
    else { ctx.wrong(); setShake(id); setTimeout(() => setShake(""), 400); }
  };
  const feed = (it) => {
    if (fed.includes(it.id) || badF.includes(it.id)) return;
    if (it.ok) { const f = [...fed, it.id]; setFed(f); if (f.length === 3) setTimeout(() => { setStage(3); setTimeout(ctx.win, 1800); }, 600); }
    else { ctx.wrong(); setBadF((b) => [...b, it.id]); }
  };
  const total = LP.length * 2 + 3;
  const prog = stage === 0 ? Object.keys(placed).length : stage === 1 ? LP.length + k : stage === 2 ? LP.length * 2 + fed.length : total;
  const showArt = stage < 2;
  return (
    <div className="lg-g7">
      <Meter label="Leaf completion" value={(prog / total) * 100} />
      {stage === 0 && <p className="lg-prompt">Label the leaf. Drag each name onto its number <span className="lg-sub">(or tap a name, then tap the number)</span></p>}
      {stage === 1 && <p className="lg-prompt">Spot the part! <span className="lg-sub">({k + 1} of {LP.length})</span><br />{LP[k].clue}</p>}
      {showArt && (
        <div className="lg-leaf-wrap"><LeafArt />
          {LP.map((p, n) => (
            <div key={p.id} data-drop={p.id} onClick={() => (stage === 0 ? sel && labelDrop(sel, p.id) : spot(p.id))}
              className={`lg-hot${placed[p.id] || stage === 1 ? " on" : ""}${shake === p.id ? " shake" : ""}`} style={{ left: `${p.x}%`, top: `${p.y}%` }} aria-label={stage === 1 ? `Part ${n + 1}` : `Spot ${n + 1}`}>
              {stage === 0 && placed[p.id] ? <small>{p.name}</small> : null}
              <b>{n + 1}</b>
            </div>
          ))}
        </div>
      )}
      {stage === 0 && <div className="lg-tokens">{LP.filter((p) => !placed[p.id]).map((p) => <Drag key={p.id} id={p.id} selected={sel === p.id} onTap={(id) => setSel((s) => (s === id ? null : id))} onDrop={labelDrop} className="lg-token"><img src={`${BASE}games/icons/${["blade", "petiole", "veins", "stomata"].includes(p.id) ? p.id : "veins"}.webp`} alt="" style={p.id === "chlorophyll" ? { filter: "hue-rotate(-20deg) saturate(1.6)" } : undefined} /><b>{p.name}</b></Drag>)}</div>}
      {stage === 2 && (<>
        <p className="lg-prompt">Activate photosynthesis! Feed the leaf what it needs <span className="lg-sub">({fed.length}/3)</span></p>
        <div className="lg-feedleaf" aria-hidden="true">🍃{fed.map((f) => <span key={f}>{PHOTO.find((p) => p.id === f).icon}</span>)}</div>
        <div className="lg-opts" style={{ gridTemplateColumns: "repeat(3,minmax(0,1fr))" }}>
          {PHOTO.map((it) => <button type="button" key={it.id} onClick={() => feed(it)} disabled={fed.includes(it.id) || badF.includes(it.id)} className={`lg-opt${fed.includes(it.id) ? " good" : ""}${badF.includes(it.id) ? " bad" : ""}`}><span className="lg-opt-i">{it.icon}</span><span>{it.label}</span></button>)}
        </div>
      </>)}
      {stage === 3 && <div className="lg-photo"><div className="lg-glow">🍃</div><p className="lg-prompt good">✨ Photosynthesis! The leaf made 🍬 sugar and released 🫧 oxygen.</p></div>}
    </div>
  );
}

/* ───────── Lesson 8 · Transpiration: flow, stomata, cycle ───────── */
const FLOW = [
  { icon: "🟤", label: "Soil" }, { icon: "roots", label: "Roots" }, { icon: "🧪", label: "Xylem" },
  { icon: "stem", label: "Stem" }, { icon: "leaf", label: "Leaves" }, { icon: "👄", label: "Stomata" },
];
const SCEN = [
  { q: "☀️ Bright morning and the soil has plenty of water.", a: "open", w: 70 },
  { q: "🥀 The soil is very dry and the leaves start to wilt.", a: "close", w: 25 },
  { q: "🌙 It is night and there is no sunlight.", a: "close", w: 50 },
];
const CYC = [
  { q: "Water evaporates from the leaves through the stomata. What does this create?", a: "pull", o: [["pull", "A pull that draws more water upward"], ["stop", "A block that stops the water"], ["sugar", "More sugar in the roots"]] },
  { q: "Water molecules stick to each other. What is this called?", a: "cohesion", o: [["cohesion", "Cohesion"], ["adhesion", "Adhesion"], ["osmosis", "Photosynthesis"]] },
  { q: "Water molecules stick to the xylem walls. What is this called?", a: "adhesion", o: [["cohesion", "Cohesion"], ["adhesion", "Adhesion"], ["osmosis", "Respiration"]] },
];
export function Game8({ ctx }) {
  const [stage, setStage] = useState(0);
  const [i, setI] = useState(0);
  const [bal, setBal] = useState(50);
  const total = 1 + SCEN.length + CYC.length;
  const prog = stage === 0 ? 0 : stage === 1 ? 1 + i : stage === 2 ? 1 + SCEN.length + i : total;
  useEffect(() => { if (stage === 3) { const t = setTimeout(ctx.win, 3200); return () => clearTimeout(t); } return undefined; }, [stage]);
  return (
    <div className="lg-g8">
      <Meter label="Transpiration cycle" value={(prog / total) * 100} tone="blue" />
      {stage === 0 && <SeqTap prompt="Keep the water moving! Tap each part in the order water travels." items={FLOW} shuffle={[3, 5, 1, 0, 4, 2]} wrong={ctx.wrong} onDone={() => { setStage(1); setI(0); }} />}
      {stage === 1 && (<>
        <Meter label="Water balance" value={bal} tone={bal < 40 ? "red" : "green"} />
        <MCQ prompt="Stomata challenge: open or close the stomata?" sub={SCEN[i].q} cols={2} wrong={() => { ctx.wrong(); setBal(15); }}
          options={[{ id: "open", label: "Open the stomata", icon: "🟢" }, { id: "close", label: "Close the stomata", icon: "🔴" }]} answer={SCEN[i].a}
          onCorrect={() => { setBal(SCEN[i].w + 25); if (i + 1 >= SCEN.length) { setStage(2); setI(0); } else setI(i + 1); }} />
      </>)}
      {stage === 2 && <MCQ prompt={`Keep the chain reaction going (${i + 1} of ${CYC.length})`} sub={CYC[i].q} cols={1} wrong={ctx.wrong} options={CYC[i].o.map(([id, label]) => ({ id, label }))} answer={CYC[i].a}
        onCorrect={() => { if (i + 1 >= CYC.length) setStage(3); else setI(i + 1); }} />}
      {stage === 3 && (
        <div className="lg-cycle"><div className="lg-cycle-ring">{FLOW.map((f, n) => <span key={f.label} style={{ "--n": n }}>{["roots","stem","leaf"].includes(f.icon) ? <PartVisual type={f.icon} size={28} /> : f.icon}</span>)}<i /></div>
          <p className="lg-prompt good">💧 Continuous transpiration cycle! Water exits the stomata and new water is pulled upward.</p></div>
      )}
    </div>
  );
}

/* ───────── Lesson 9 · Plant system simulator ───────── */
const SIM = [
  { t: "🌅 Morning! The soil is moist.", q: "What do the roots do?", a: "abs", o: [["abs", "Absorb water and minerals through the root hairs"], ["food", "Make sugar using sunlight"], ["vap", "Release water vapor to the air"]], m: ["Water", 25] },
  { t: "💧 Water is inside the roots.", q: "How does it reach the leaves?", a: "xy", o: [["xy", "The xylem in the stem carries it upward"], ["ph", "The phloem carries water up to the leaves"], ["st", "It stays in the roots"]], m: ["Water", 50] },
  { t: "☀️ Water reaches the leaves in bright sunlight.", q: "What happens in the leaves?", a: "ps", o: [["ps", "Photosynthesis: sugar is made from water, CO₂, and light"], ["sp", "The leaves absorb minerals from the soil"], ["no", "Nothing — leaves only look green"]], m: ["Sugar", 70] },
  { t: "🍬 The leaves have made sugar!", q: "How does the sugar get to the roots, fruits, and flowers?", a: "ph", o: [["ph", "The phloem distributes the sugar"], ["xy", "The xylem carries the sugar down"], ["ev", "The sugar evaporates through stomata"]], m: ["Sugar", 90] },
  { t: "🌬️ Some water leaves through the stomata.", q: "What is the effect?", a: "tp", o: [["tp", "Transpiration helps pull more water up the xylem"], ["bl", "It blocks the xylem tubes"], ["fr", "It stops the fruit from growing"]], m: ["Water", 100] },
  { t: "🔍 Cause and effect: the roots get damaged.", q: "What is the most likely result?", a: "less", o: [["less", "Less water reaches the leaves, so less food is made and fruits grow poorly"], ["more", "The leaves make more food"], ["same", "Nothing changes"]], m: ["Health", 100] },
];
export function Game9({ ctx }) {
  const [i, setI] = useState(0);
  const [mt, setMt] = useState({ Water: 0, Sugar: 0, Health: 0 });
  const [done, setDone] = useState(false);
  const step = SIM[i];
  const health = Math.round((i / SIM.length) * 100);
  return (
    <div className="lg-g9">
      <div className="lg-metersx"><Meter label="💧 Water" value={mt.Water} tone="blue" /><Meter label="🍬 Sugar" value={mt.Sugar} tone="gold" /><Meter label="🌿 Plant health" value={done ? 100 : health} /></div>
      {!done ? (<>
        <div className="lg-day">Stage {i + 1} of {SIM.length} · {step.t}</div>
        <MCQ prompt={step.q} cols={1} wrong={ctx.wrong} options={step.o.map(([id, label]) => ({ id, label }))} answer={step.a}
          onCorrect={() => { setMt((m) => ({ ...m, [step.m[0]]: step.m[1] })); if (i + 1 >= SIM.length) { setDone(true); setTimeout(ctx.win, 1200); } else setI(i + 1); }} />
      </>) : <p className="lg-prompt good">🍈🍈🍈 Maximum plant health! The papaya produced healthy fruits.</p>}
    </div>
  );
}

/* ───────── Lesson 10 · Environmental control panel ───────── */
const SL = [
  { id: "sun", label: "☀️ Sunlight", lo: 40, hi: 80 }, { id: "water", label: "💧 Water", lo: 50, hi: 90 },
  { id: "temp", label: "🌡️ Temperature", lo: 40, hi: 65 }, { id: "hum", label: "☁️ Humidity", lo: 40, hi: 80 }, { id: "wind", label: "🌬️ Wind", lo: 15, hi: 55 },
];
const EVENTS = [
  { t: "🏜️ Drought: the soil is bone dry and the air is dry.", s: { sun: 60, water: 8, temp: 60, hum: 20, wind: 35 } },
  { t: "🔥 Heat wave: scorching heat and strong, dry wind.", s: { sun: 95, water: 45, temp: 97, hum: 15, wind: 85 } },
  { t: "⛈️ Storm: dark clouds, soaked soil, and howling wind.", s: { sun: 8, water: 98, temp: 50, hum: 90, wind: 97 } },
  { t: "🥶 Cold, cloudy, damp morning.", s: { sun: 10, water: 60, temp: 8, hum: 95, wind: 20 } },
  { t: "🌤️ The final round: hot, humid, and windy all at once!", s: { sun: 92, water: 30, temp: 90, hum: 92, wind: 90 } },
];
const dist = (v, lo, hi) => (v < lo ? lo - v : v > hi ? v - hi : 0);
const eff = (vals) => Math.round(100 - SL.reduce((a, s) => a + Math.min(40, dist(vals[s.id], s.lo, s.hi)) * 0.5, 0) * 1.35);
const NEED10 = 85;
export function Game10({ ctx }) {
  const [r, setR] = useState(0);
  const [vals, setVals] = useState(EVENTS[0].s);
  const [health, setHealth] = useState(100);
  const [msg, setMsg] = useState("");
  const [fin, setFin] = useState(false);
  const e = eff(vals);
  const lock = () => {
    if (e >= NEED10) {
      setMsg("✅ Transport is efficient. Round cleared!");
      if (r + 1 >= EVENTS.length) { setFin(true); setTimeout(ctx.win, 1100); }
      else setTimeout(() => { setR(r + 1); setVals(EVENTS[r + 1].s); setMsg(""); setHealth((h) => Math.min(100, h + 5)); }, 900);
    } else { ctx.wrong(); setHealth((h) => Math.max(10, h - 12)); setMsg(`Transport is only ${e}%. It must reach ${NEED10}%. Keep adjusting!`); }
  };
  return (
    <div className="lg-g10">
      <div className="lg-metersx"><Meter label="❤️ Plant health" value={health} /><Meter label="🚰 Transport efficiency" value={e} tone={e >= NEED10 ? "green" : e > 55 ? "gold" : "red"} /></div>
      <div className="lg-day">Round {Math.min(r + 1, EVENTS.length)} of {EVENTS.length} · {EVENTS[Math.min(r, EVENTS.length - 1)].t}</div>
      <div className="lg-sliders">
        {SL.map((s) => (
          <label key={s.id} className="lg-slider"><span>{s.label}<b>{vals[s.id]}</b></span>
            <input type="range" min="0" max="100" value={vals[s.id]} disabled={fin} onChange={(ev) => setVals((v) => ({ ...v, [s.id]: +ev.target.value }))} aria-label={s.label} /></label>
        ))}
      </div>
      <p className="lg-sub" role="status">{msg || "Adjust the plant's needs until transport efficiency is high, then lock it in."}</p>
      <button type="button" className="lg-btn" onClick={lock} disabled={fin}>🔒 Lock in settings</button>
    </div>
  );
}
