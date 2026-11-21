import React, { useCallback, useEffect, useRef, useState } from "react";
import { SIMS, SIM_BI } from "./sims/data.js";
import { Sim1, Sim2, Sim3, Sim4, Sim5 } from "./sims/sims1.jsx";
import { Sim6, Sim7, Sim8, Sim9, Sim10 } from "./sims/sims2.jsx";
import { BASE } from "./sims/sui.jsx";

const COMPONENTS = [Sim1, Sim2, Sim3, Sim4, Sim5, Sim6, Sim7, Sim8, Sim9, Sim10];

export default function LessonSim({ lessonNumber, title, onDone }) {
  const meta = SIMS[lessonNumber - 1];
  const Sim = COMPONENTS[lessonNumber - 1];
  const [stage, setStage] = useState("intro"); // intro | play | win | fail
  const [run, setRun] = useState(0);
  const [why, setWhy] = useState("");
  const [shown, setShown] = useState(0);
  const mistakes = useRef(0);

  useEffect(() => { setStage("intro"); setRun(0); mistakes.current = 0; setShown(0); }, [lessonNumber]);
  const mistake = useCallback(() => { mistakes.current += 1; setShown(mistakes.current); }, []);
  const win = useCallback(() => setStage((s) => (s === "play" ? "win" : s)), []);
  const fail = useCallback((m) => { setWhy(m || "The mission was not completed."); setStage((s) => (s === "play" ? "fail" : s)); }, []);
  if (!meta) return null;
  const panel = `${BASE}sims/panel-${lessonNumber}.webp`;

  return (
    <section className="client-lesson sm">
      <div className="client-lesson-head"><span className="client-lesson-icon">🧪</span><div><p className="client-kicker">LESSON {lessonNumber} · SIMULATION</p><h2>Mission: {meta.mission}</h2><p className="client-muted">{title} · Worth 10 points</p></div></div>

      {stage === "intro" && (
        <div className="sm-intro">
          <img className="sm-panel" src={panel} alt={`Simulation scene for lesson ${lessonNumber}`} />
          <div>
            <p className="sm-bi">{SIM_BI[lessonNumber - 1]}</p>
            <h3>Description</h3><p>{meta.desc}</p>
            <h3>Mechanics</h3><ul>{meta.mech.map((m) => <li key={m}>{m}</li>)}</ul>
            <p className="sm-note">Each mistake deducts 0.5 point from this activity. You can try again right away if the mission fails.</p>
            <button type="button" className="pri sm-start" onClick={() => setStage("play")}>▶ Start simulation</button>
          </div>
        </div>
      )}

      {stage === "play" && (
        <div className="sm-play">
          <div className="sm-bar"><span className="sm-mis">⚠ Mistakes: <b>{shown}</b></span><img className="sm-thumb" src={panel} alt="" /></div>
          <Sim key={`${lessonNumber}-${run}`} ctx={{ mistake, win, fail }} />
        </div>
      )}

      {stage === "win" && (
        <div className="sm-intro sm-end">
          <img className="sm-panel" src={panel} alt="" />
          <div><h3>🎉 Mission complete!</h3><p>{meta.mission}</p><p className="sm-note">{mistakes.current === 0 ? "Perfect — no mistakes!" : `Mistakes: ${mistakes.current} (−${(mistakes.current * 0.5).toFixed(1)} points)`}</p>
            <button type="button" className="pri sm-start" onClick={() => onDone(mistakes.current)}>Finish Simulation ✓</button></div>
        </div>
      )}

      {stage === "fail" && (
        <div className="sm-intro sm-end">
          <div className="sm-sad">🥀</div>
          <div><h3>Mission not complete</h3><p>{why}</p>
            <button type="button" className="pri sm-start" onClick={() => { setRun((n) => n + 1); setStage("play"); }}>↻ Try again</button></div>
        </div>
      )}
    </section>
  );
}
