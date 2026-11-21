import React, { useCallback, useEffect, useRef, useState } from "react";
import { GAMES } from "./games/data.js";
import { Game1, Game2, Game3, Game4, Game5 } from "./games/games1.jsx";
import { Game6, Game7, Game8, Game9, Game10 } from "./games/games2.jsx";
import { BASE } from "./games/ui.jsx";
import { HEART_COUNT, RETRY_WAIT_SECONDS } from "./mechanics.js";

const COMPONENTS = [Game1, Game2, Game3, Game4, Game5, Game6, Game7, Game8, Game9, Game10];

export default function LessonGame({ lessonNumber, onDone }) {
  const meta = GAMES[lessonNumber - 1];
  const Game = COMPONENTS[lessonNumber - 1];
  const [stage, setStage] = useState("intro"); // intro | play | win | lose
  const [hearts, setHearts] = useState(HEART_COUNT);
  const [wait, setWait] = useState(0);
  const [reason, setReason] = useState("");
  const [run, setRun] = useState(0);
  const mistakes = useRef(0);

  useEffect(() => { setStage("intro"); setHearts(HEART_COUNT); setWait(0); setRun(0); mistakes.current = 0; }, [lessonNumber]);
  useEffect(() => { if (stage === "play" && hearts <= 0) { setReason("You ran out of hearts."); setStage("lose"); setWait(RETRY_WAIT_SECONDS); } }, [hearts, stage]);
  useEffect(() => {
    if (stage !== "lose" || wait <= 0) return undefined;
    const id = setTimeout(() => setWait((w) => w - 1), 1000);
    return () => clearTimeout(id);
  }, [stage, wait]);

  const wrong = useCallback(() => { mistakes.current += 1; setHearts((h) => Math.max(0, h - 1)); }, []);
  const win = useCallback(() => setStage((s) => (s === "play" ? "win" : s)), []);
  const lose = useCallback((why) => { setReason(why || "Time is up."); setStage((s) => { if (s === "play") { setWait(RETRY_WAIT_SECONDS); return "lose"; } return s; }); }, []);
  const retry = () => { setHearts(HEART_COUNT); setRun((n) => n + 1); setStage("play"); };

  if (!meta) return null;
  const panel = `${BASE}games/panel-${lessonNumber}.webp`;
  const hearty = <div className="client-heart-row" aria-label={`${hearts} of ${HEART_COUNT} hearts left`}>{Array.from({ length: HEART_COUNT }, (_, i) => <span key={i} className={i < hearts ? "heart-on" : "heart-off"}>♥</span>)}</div>;

  return (
    <section className="client-lesson lg">
      <div className="client-lesson-head"><span className="client-lesson-icon">🎮</span><div><p className="client-kicker">LESSON {lessonNumber} · GAME</p><h2>{meta.title}</h2><p className="client-muted">Character: {meta.character} · Worth 10 points</p></div></div>

      {stage === "intro" && (
        <div className="lg-intro">
          <img className="lg-panel" src={panel} alt={`Lesson ${lessonNumber} game scene`} />
          <div className="lg-intro-t">
            <p className="lg-mission">{meta.mission}</p>
            <h3>Game flow</h3><ol>{meta.flow.map((f) => <li key={f}>{f}</li>)}</ol>
            <h3>How it works</h3><ul>{meta.mechanics.map((m) => <li key={m}>{m}</li>)}</ul>
            <p className="lg-win">🏆 Win condition: {meta.win}</p>
            <p className="client-muted">You have {HEART_COUNT} hearts. A wrong move removes one heart. If all hearts or the time run out, you must wait 1 minute before trying again.</p>
            <button type="button" className="pri lg-start" onClick={() => setStage("play")}>▶ Start game</button>
          </div>
        </div>
      )}

      {stage === "play" && (
        <div className="lg-play">
          <div className="lg-bar">{hearty}<img className="lg-thumb" src={panel} alt="" /></div>
          <Game key={`${lessonNumber}-${run}`} ctx={{ wrong, win, lose }} />
        </div>
      )}

      {stage === "win" && (
        <div className="lg-end win">
          <img className="lg-panel" src={panel} alt="" />
          <div><h3>🎉 You did it!</h3><p>{meta.win}</p><p className="client-muted">{mistakes.current === 0 ? "Perfect — no mistakes!" : `Mistakes: ${mistakes.current} (−${(mistakes.current * 0.5).toFixed(1)} points)`}</p>
            <button type="button" className="pri lg-start" onClick={() => onDone(mistakes.current)}>Finish Game ✓</button></div>
        </div>
      )}

      {stage === "lose" && (
        <div className="lg-end lose">
          <div className="lg-sad">🥀</div>
          <div><h3>{reason}</h3><p>The plant needs a rest. {wait > 0 ? `You can try again in ${wait} second${wait === 1 ? "" : "s"}.` : "You can try again now."}</p>
            <button type="button" className="pri lg-start" disabled={wait > 0} onClick={retry}>{wait > 0 ? `Wait ${wait}s…` : "↻ Try again"}</button></div>
        </div>
      )}
    </section>
  );
}
