import {useState} from "react";
import ST,{CHARS} from "./story_content.js";

// MIC = true  -> the student reads each Bisaya line out loud and the app listens (mistakes cost points, like before).
// MIC = false -> the student just taps "Sunod / Next" (no listening, no points lost).
const MIC=true;
const MIC_LANG="fil-PH";   // browsers cannot recognise Bisaya (Cebuano), Filipino is the closest language they support

const Who=({w})=><b className={"who w-"+w.toLowerCase()}>{w}</b>;
const Sub=({t,show})=>show&&t?<p className="sub">{t}</p>:null;

// The story of one session. Bisaya is the main language, English appears as a subtitle under each line.
export default function StoryTab({sid,icon,done,ReadAloud,onDone}){
  const S=ST[sid-1];
  const [i,setI]=useState(0),[m,setM]=useState(0),[en,setEn]=useState(true);
  const all=done||i>=S.p.length;
  const next=x=>{setM(v=>v+x);setI(v=>v+1)};
  return <div className="story">
    <h2 className="storyt">{icon} {S.tb}{en&&<><br/><span className="st2">{S.te}</span></>}</h2>
    <p className="m">Session {sid} of 10 · Ang Misteryo sa Tanom</p>
    <details className="card chars" open={sid===1}><summary>👧🧒 Ang Atong mga Karakter</summary>
      {CHARS.map(c=><p key={c.n}><Who w={c.n}/> — {c.b}</p>)}</details>
    <label className="tg"><input type="checkbox" checked={en} onChange={e=>setEn(e.target.checked)}/> English subtitles</label>
    {!all&&<p className="m">{MIC?"🎤 Basaha og lanog ang matag linya. Mopadayon ang story kon nahuman na nimo ang linya.":"Basaha ang linya, dayon i-tap ang Sunod."}</p>}
    <div className="sl2">{S.p.slice(0,all?S.p.length:i).map((x,k)=><div key={k} className="ln2"><p className="bs">{x.b}</p><Sub t={x.s} show={en}/></div>)}</div>
    {!all&&<div className="cur">
      {MIC?<ReadAloud key={i} text={S.p[i].b} lang={MIC_LANG} onDone={next}/>
          :<div className="ln2"><p className="bs">{S.p[i].b}</p></div>}
      <Sub t={S.p[i].s} show={en}/>
      {!MIC&&<button type="button" className="pri" onClick={()=>next(0)}>Sunod / Next ▶</button>}
    </div>}
    {all&&<div className="sfin">
      {S.hb&&<div className="fx"><b>HAGIT</b><br/>{S.hb}{en&&<><br/><span className="en">{S.he}</span></>}</div>}
      {S.qb&&<p className="q"><b>PANGUTANA SA SUNOD NGA SESSION</b><br/>{S.qb}{en&&<><br/><span className="en">{S.qe}</span></>}</p>}
      <button type="button" className="pri" onClick={()=>onDone(m)}>Start the simulation</button>
    </div>}
  </div>;
}
