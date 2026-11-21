import {useState,useEffect,useRef} from "react";
import CLIENT from "./client_lessons.js";
import ClientLesson from "./ClientLesson.jsx";
import {PHASES as PH, POINTS_BY_PHASE as PTS, TOTAL_POINTS as TOTAL, PASSING_POINTS as NEED, MISTAKE_DEDUCTION as MISTAKE, scoreActivity, scoreLesson} from "./mechanics.js";
import {processWords,best,mistakes,norm,SR} from "./read.js";
const D=CLIENT.map((d)=>({...d,t:d.title,s:{p:"🌱",n:(d.storyTitle||"Content pending").trim()},z:d.quiz}));

const fmt=n=>Number.isInteger(n)?String(n):n.toFixed(1);
const fresh=()=>({u:0,p:[null,null,null,null,null],lock:0,g:0,gm:0});   // g = game challenges completed (0-5), gm = mistakes made in the game
const AK=id=>"dm26b_"+id;
const loadA=id=>{try{return JSON.parse(localStorage.getItem(AK(id))||"{}")}catch(e){return{}}};
const S10=a=>Array.from({length:10},(_,i)=>Math.max(0,Math.min(5,+(a&&a[i])||0)));
const B=import.meta.env.BASE_URL;
const api=async(url,o={},t)=>{
  const r=await fetch(url,{...o,headers:{"Content-Type":"application/json",...(t?{Authorization:"Bearer "+t}:{})},body:o.body&&JSON.stringify(o.body)}).catch(()=>{throw Object.assign(new Error("No internet connection. Please connect and try again."),{status:0})});
  const j=await r.json().catch(()=>({}));
  if(!r.ok)throw Object.assign(new Error(j.error||"Something went wrong. Please try again."),{status:r.status});
  return j;
};
const sh=a=>[...a].sort(()=>Math.random()-.5);

function Plant({n}){
  const h=10+n*7,k=Math.min(n,8);
  return <div className="pl"><svg viewBox="0 0 60 100" aria-hidden="true">
    <ellipse cx="30" cy="94" rx="24" ry="6" fill="var(--soil)"/>
    <path d={`M30 92V${92-h}`} stroke="var(--leaf)" strokeWidth="4" strokeLinecap="round" fill="none"/>
    {Array.from({length:k},(_,j)=>{const i=j+1,y=92-i*h/(k+1),f=i%2?1:-1,x=30+f*9;
      return <ellipse key={i} cx={x} cy={y} rx="8" ry="4" fill="var(--leaf)" transform={`rotate(${-f*25} ${x} ${y})`}/>})}
    {n>9&&<><circle cx="30" cy={88-h} r="7" fill="#e8475f"/><circle cx="30" cy={88-h} r="3" fill="var(--sun)"/></>}
  </svg></div>;
}

const ICON={"Water":"💧","Sunlight":"☀️","Air (CO₂)":"💨","CO₂":"💨","Nutrients":"🧪","Stone":"🪨","Money":"💰","Absorb water":"💧","Absorb minerals":"💎","Anchor the plant":"⚓","Make food":"🍳","Makes food":"🍳","Release oxygen":"🫧","Soil":"🟫","Root Hairs":"🧵","Roots":"🌿","Flower":"🌸","Flowers":"🌸","Fruits":"🍎","Support":"🧱","Connect parts":"🔗","Connects and carries":"🔗","Absorbs water":"💧","Transport":"🚚","Xylem":"🔵","Phloem":"🟢","Minerals":"💎","Food":"🍬","Root Pressure":"⬆️","Capillary Action":"🥤","Transpiration Pull":"🌬️","Photosynthesis":"✨","Translocation":"🚚","Stem":"🎋","Leaves":"🍃","Whole plant":"🪴"};
const ic=x=>ICON[x]||"";
const L=(a,b,t)=>a+(b-a)*t;
const mix=(c1,c2,t)=>"#"+[1,3,5].map(i=>Math.round(L(parseInt(c1.substr(i,2),16),parseInt(c2.substr(i,2),16),t)).toString(16).padStart(2,"0")).join("");
const KIND=x=>/sun/i.test(x)?"sun":/(^|\s)(air|co₂)/i.test(x)?"air":/oxygen/i.test(x)?"oxy":/mineral|nutrient/i.test(x)?"min":/phloem|translocation|food|photosynth/i.test(x)?"food":/xylem|capillary|transpiration|transport|connect|stem|support/i.test(x)?"stem":/water|pressure/i.test(x)?"water":/root|soil|anchor/i.test(x)?"root":/flower|fruit/i.test(x)?"bloom":/leaves/i.test(x)?"leaf":"all";
const LP="M0 0 C14 -17 42 -17 58 0 C42 15 14 15 0 0Z",LP2="M0 0 C14 -17 42 -17 58 0 C40 -6 14 -4 0 0Z",VN="M2 0 Q30 -1 54 0 M16 -1 L26 -8 M16 1 L26 7 M32 -1 L42 -7 M32 1 L42 6";
const ROOTS=["M150 202 C150 228 148 248 150 270","M150 214 C130 224 118 236 108 254","M150 222 C170 232 184 242 194 260","M149 240 C138 250 134 262 126 278","M151 246 C162 256 168 266 176 282"];
const STEMC="M150 200 C150 160 153 125 152 94";
const SP=Array.from({length:18},(_,i)=>{const t=i/18*6.283;return{dx:Math.cos(t)*(60+i%3*28),dy:Math.sin(t)*(50+i%2*26)-10,c:["#ffc21a","#2f7bff","#ffffff","#ff8fb1"][i%4],r:3+i%3,d:i*35}});

function Scene({n,total,placed,nocap}){
  const t=total?Math.min(1,n/total):0,win=t>=1,tr="transform 1s ease, fill 1s ease, opacity 1s ease";
  const K=new Set(placed.map(KIND)),has=k=>K.has(k)||K.has("all");
  const leaf=mix("#9a8f4e","#2f9e4f",t),stem=mix("#8c7f45","#3a8f4a",t),pet=mix("#a39b7a","#ff9f1c",t),petL=mix("#b8b08e","#ffd166",t);
  const lg=has("leaf")||has("food")||has("air")||has("oxy");
  const leafEl=(side,y,sz,i)=><g key={side+"_"+y} style={{transform:`translate(150px,${y}px) scale(${side},1) rotate(${L(55,-14,t)-i*9}deg) scale(${sz*L(.7,1,t)})`,transition:tr}}>
    <path d={LP} fill={leaf} style={{transition:tr}}/><path d={LP2} fill="#fff" opacity=".2"/><path d={VN} stroke="#0d3b1d" strokeOpacity=".35" strokeWidth="1.1" fill="none"/></g>;
  const cloud=(x,y,s,c)=><g transform={`translate(${x} ${y}) scale(${s})`} fill={c} style={{transition:tr}}><ellipse rx="28" ry="12"/><ellipse cx="-14" cy="-8" rx="16" ry="12"/><ellipse cx="10" cy="-12" rx="18" ry="14"/></g>;
  const dots=(cnt,cx,cy,rx,ry,fill,stroke)=>Array.from({length:cnt},(_,k)=>{const a=k/cnt*6.283;return <circle key={k} className="drift" cx={cx} cy={cy} r="2.5" fill={fill} stroke={stroke} strokeWidth=".6" style={{"--dx":Math.cos(a)*rx+"px","--dy":Math.sin(a)*ry+"px",animationDelay:k*.25+"s"}}/>});
  return <div className={"scene"+(win?" win":"")}>
    <svg viewBox="0 0 300 300" role="img" aria-label={win?"A healthy, happy plant":"A weak, wilting plant"}>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6fa8ff"/><stop offset="1" stopColor="#e3f1ff"/></linearGradient>
        <linearGradient id="soilG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8a5a36"/><stop offset="1" stopColor="#40261a"/></linearGradient>
        <radialGradient id="sunG"><stop offset="0" stopColor="#fff6c2"/><stop offset=".45" stopColor="#ffd23f" stopOpacity=".7"/><stop offset="1" stopColor="#ffd23f" stopOpacity="0"/></radialGradient>
        <linearGradient id="beam" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff3b0" stopOpacity=".8"/><stop offset="1" stopColor="#fff3b0" stopOpacity="0"/></linearGradient>
      </defs>
      <rect width="300" height="300" fill="url(#sky)"/>
      <g transform="translate(48 48)" style={{opacity:has("sun")?1:.55,transition:tr}}>
        <circle r="46" fill="url(#sunG)"/>
        <g className={has("sun")?"sunr":""}>{Array.from({length:12},(_,k)=>{const r=k*30*Math.PI/180;return <line key={k} x1={Math.cos(r)*20} y1={Math.sin(r)*20} x2={Math.cos(r)*30} y2={Math.sin(r)*30} stroke="#ffd23f" strokeWidth="3.5" strokeLinecap="round"/>})}</g>
        <circle r="15" fill="#ffd23f"/>
      </g>
      {has("sun")&&<><path className="shim" d="M58 62 L96 214 L190 178 Z" fill="url(#beam)"/><path className="shim" style={{animationDelay:"1s"}} d="M66 56 L170 130 L214 150 Z" fill="url(#beam)"/></>}
      {cloud(118,40,.9,"#fff")}{cloud(228,56,1.1,has("water")?"#b9c6dc":"#fff")}
      {has("water")&&Array.from({length:9},(_,k)=><g key={k} transform={`translate(${196+k*9} ${66+(k%3)*4})`}><path className="drop" d="M0 -6 C3 -1 4 2 0 4 C-4 2 -3 -1 0 -6Z" fill="#3b9bff" style={{animationDelay:k*.18+"s"}}/></g>)}
      <path d="M0 196 Q50 168 110 186 T210 180 T300 188 V204 H0Z" fill="#9bd48f"/>
      <rect y="198" width="300" height="12" fill="#5aa84a"/>
      {Array.from({length:40},(_,k)=>{const x=k*7.6,h=7+(k*37)%6;return <path key={k} d={`M${x} 200 L${x+2} ${200-h} L${x+4} 200Z`} fill={k%2?"#4a9a3d":"#6dbb58"}/>})}
      <rect y="206" width="300" height="94" fill="url(#soilG)"/>
      <rect y="206" width="300" height="94" fill="#1c0e06" style={{opacity:has("water")?.4:0,transition:tr}}/>
      {[[40,232,5],[85,270,4],[230,240,6],[262,275,4],[200,285,5],[60,255,3]].map(([x,y,r],k)=><ellipse key={k} cx={x} cy={y} rx={r} ry={r*.7} fill="#a58b6c" opacity=".6"/>)}
      <g fill="none" strokeLinecap="round">
        {ROOTS.map((d,k)=><path key={"o"+k} d={d} stroke="#2b1608" strokeOpacity=".55" strokeWidth={k?4.2:6}/>)}{ROOTS.map((d,k)=><path key={k} d={d} stroke="#d9a066" strokeWidth={k?2.4:4}/>)}
        {ROOTS.map((d,k)=><path key={"h"+k} d={d} stroke="#f0c890" strokeOpacity=".55" strokeWidth="7" strokeDasharray="1 3"/>)}
        {has("root")&&ROOTS.map((d,k)=><path key={"g"+k} className="pulse" d={d} stroke="#ffe27a" strokeWidth="6" strokeOpacity=".7"/>)}
      </g>
      {has("min")&&dots(9,150,246,72,28,"#ffd23f","#b8860b")}
      {has("water")&&dots(6,150,240,60,24,"#3b9bff","#1b6fd1")}
      <circle className="halo" cx="150" cy="120" r="105" fill="url(#sunG)" style={{opacity:win?.55:0,transition:tr}}/>
      <g className="plant"><g className="upper" style={{transform:`rotate(${L(34,0,t)}deg)`,transformOrigin:"150px 200px",transition:tr}}>
        {has("stem")&&<path className="pulse" d={STEMC} stroke="#9fd2ff" strokeWidth="12" strokeLinecap="round" fill="none"/>}
        {lg&&<ellipse className="pulse" cx="150" cy="140" rx="64" ry="56" fill="#fff2a8"/>}
        <path d="M147 203 C147 165 152 130 150 92 L154 92 C156 130 157 165 156 203Z" fill={stem} style={{transition:tr}}/>
        <path d={STEMC} stroke="#fff" strokeOpacity=".2" strokeWidth="1.6" fill="none"/>
        {[[178,1.1,0],[150,1,1],[122,.8,2]].map(([y,sz,i])=>[-1,1].map(sd=>leafEl(sd,y,sz,i)))}
        {has("stem")&&[0,1,2,3,4].map(k=><circle key={k} className="rise" cx="151" cy="192" r="2.8" fill="#3b9bff" style={{animationDelay:k*.4+"s"}}/>)}
        {has("food")&&[0,1,2,3,4].map(k=><circle key={k} className="down" cx="153" cy="100" r="2.8" fill="#ffc21a" style={{animationDelay:k*.4+"s"}}/>)}
        <g style={{transform:`translate(150px,90px) rotate(${L(75,0,t)}deg) scale(${L(.5,1,t)})`,transition:tr}}>
          {has("bloom")&&<circle className="pulse" r="34" fill="#fff2a8"/>}
          {Array.from({length:10},(_,k)=><ellipse key={k} cy="-17" rx="6.5" ry="13" fill={pet} transform={`rotate(${k*36})`} style={{transition:tr}}/>)}
          {Array.from({length:10},(_,k)=><ellipse key={"i"+k} cy="-11" rx="4.5" ry="8" fill={petL} transform={`rotate(${k*36+18})`} style={{transition:tr}}/>)}
          <circle r="8" fill="#8a4b12"/><circle r="5" fill="#b9701f"/>
        </g>
      </g></g>
      {has("air")&&Array.from({length:8},(_,k)=><circle key={k} className="drift" cx="150" cy="138" r="3" fill="#fff" stroke="#9fb4d6" strokeWidth=".7" style={{"--dx":(70+k*8)+"px","--dy":(-70+k*9)+"px",animationDelay:k*.3+"s"}}/>)}
      {has("oxy")&&Array.from({length:6},(_,k)=><circle key={k} className="bub" cx="150" cy="130" r="4" fill="#fff" fillOpacity=".55" stroke="#fff" style={{"--dx":(k-3)*16+"px",animationDelay:k*.35+"s"}}/>)}
      {win&&<g transform="translate(150 110)">{SP.map((s,k)=><circle key={k} className="sp" r={s.r} fill={s.c} style={{"--dx":s.dx+"px","--dy":s.dy+"px",animationDelay:s.d+"ms"}}/>)}</g>}
    </svg>
    {!nocap&&<p className="cap" aria-live="polite">{win?"🌸 The plant is healthy and happy!":n?"🌱 Getting better... keep going!":"🥀 The plant is weak. Help it!"}</p>}
  </div>;
}

function Act({a,children,visual,onBad}){
  const so=Array.isArray(a[2][0]);
  const [items]=useState(()=>so?sh(a[2]):null);
  const [choices]=useState(()=>so?null:sh([...a[1],...a[2]]));
  const [i,setI]=useState(0),[p,setP]=useState([]),[bad,setBad]=useState(-1);
  const total=so?items.length:a[1].length,placed=so?items.slice(0,i).map(x=>x[0]):p,fin=placed.length>=total;
  const tap=k=>{
    let ok;
    if(so){ok=items[i][1]===k;if(ok)setI(i+1)}
    else{const c=choices[k];ok=a[3]?a[1][p.length]===c:a[1].includes(c);if(ok)setP([...p,c])}
    if(!ok&&onBad)onBad();
    setBad(ok?-1:k);
  };
  const ctl=<>
    <p className="pr">{a[0]}</p>
    {so?<>
      {!fin&&<><p className="big">{ic(items[i][0])} {items[i][0]}</p>
        <div className="row">{a[1].map((b,k)=><button key={b} className={"ch "+(bad===k?"bad":"")} onClick={()=>tap(k)}>{ic(b)} {b}</button>)}</div></>}
      <div className="path">{placed.map(x=><b key={x} className="pk">{ic(x)} {x} ✓</b>)}</div>
    </>:<>
      <div className="path">{p.map((x,j)=><span key={x}>{j>0&&a[3]?" → ":""}<b className="pk">{ic(x)} {x}</b></span>)}
        {a[3]&&Array.from({length:total-p.length},(_,j)=><span key={"h"+j}>{p.length+j>0?" → ":""}<b className="pk ph">?</b></span>)}</div>
      <div className="row">{choices.map((c,k)=>p.includes(c)?null:<button key={c} className={"ch "+(bad===k?"bad":"")} onClick={()=>tap(k)}>{ic(c)} {c}</button>)}</div>
    </>}
    {bad>=0&&!fin&&<p className="warn">Not quite. Try again!</p>}
    {fin&&<><p className="good2">🎉 Nice work! You got it.</p>{children}</>}
  </>;
  return visual?<div className="game"><Scene n={placed.length} total={total} placed={placed}/><div className="ctl">{ctl}</div></div>:ctl;
}
export {Act,Scene};

function Steps({l,end}){
  const [w,setW]=useState(0);
  return <>
    <ul className="wl">{l.slice(0,w+1).map((x,i)=><li key={i}>{x}</li>)}</ul>
    {w<l.length-1?<button className="pri" onClick={()=>setW(w+1)}>Next</button>:end}
  </>;
}

function SimRun({d,onDone}){
  const [m,setM]=useState(0);
  return <Steps l={d.m.l} end={<Act a={d.m.a} onBad={()=>setM(x=>x+1)}><button className="pri" onClick={()=>onDone(m)}>Next: discussion</button></Act>}/>;
}

// Read aloud: the app listens. Missed word = red, repeated word = yellow, each one is a mistake.
function ReadAloud({text,onDone,lang}){
  const toks=text.split(/\s+/).filter(Boolean),sp=toks.map(t=>/[a-z0-9]/i.test(t)),exp=toks.filter((t,i)=>sp[i]).map(norm);
  const [st,setSt]=useState(()=>exp.map(()=>0)),[idx,setIdx]=useState(0),[on,setOn]=useState(false),[err,setErr]=useState("");
  const R=useRef({st:exp.map(()=>0),idx:0,rec:null,want:false,fin:false});
  const stop=()=>{R.current.want=false;setOn(false);try{R.current.rec&&R.current.rec.abort()}catch(e){}};
  useEffect(()=>()=>stop(),[]);
  const loose=!!lang&&lang!=="en-US";
  const handle=alts=>{const r=R.current;if(r.fin)return;const o=best(exp,r.st,r.idx,alts,loose);r.st=o.st;r.idx=o.idx;setSt(o.st);setIdx(o.idx);
    if(o.idx>=exp.length){r.fin=true;stop();setTimeout(()=>onDone(mistakes(o.st)),900)}};
  const start=()=>{const C=SR();if(!C){setErr("unsupported");return}
    setErr("");const rec=new C();rec.lang=lang||"en-US";rec.continuous=true;rec.interimResults=false;rec.maxAlternatives=5;
    rec.onresult=e=>{for(let i=e.resultIndex;i<e.results.length;i++)if(e.results[i].isFinal)handle(Array.from(e.results[i],a=>a.transcript.split(/\s+/)))};
    rec.onerror=e=>{if(e.error==="not-allowed"||e.error==="service-not-allowed"){stop();setErr("mic")}else if(e.error==="network"){stop();setErr("net")}};
    rec.onend=()=>{if(R.current.want)try{rec.start()}catch(x){}};
    R.current.rec=rec;R.current.want=true;setOn(true);try{rec.start()}catch(x){}};
  let j=-1;
  return <div className="readbox">
    <p className="read" aria-live="polite">{toks.map((t,i)=>{const w=sp[i]?(++j):-1,c=w<0?"":["","ok","miss","rep"][st[w]]+(w===idx&&on?" cur":"");return <span key={i} className={c}>{t} </span>})}</p>
    <div className="row">
      <button className="pri" onClick={on?stop:start}>{on?"⏹ Stop":"🎤 Read it out loud"}</button>
      {err==="unsupported"&&<button className="sec" onClick={()=>onDone(0)}>I read it (this browser cannot listen)</button>}
    </div>
    {err==="mic"&&<p className="warn">Please allow the microphone, then tap the button again.</p>}
    {err==="net"&&<p className="warn">Listening needs an internet connection. Please connect and try again.</p>}
    {err==="unsupported"&&<p className="warn">This browser cannot listen. Use Chrome, Edge, or Safari.</p>}
    <p className="m">Read every word out loud. <span className="lg miss">Red</span> = missed word, <span className="lg rep">Yellow</span> = repeated word. Each one costs {MISTAKE} point.</p>
  </div>;
}

function ReadLines({l,end}){
  const [i,setI]=useState(0),[m,setM]=useState(0),[fin,setFin]=useState(false);
  return <>
    <ul className="wl">{l.slice(0,i).map((x,k)=><li key={k}>{x}</li>)}</ul>
    {fin?end(m):<ReadAloud key={i} text={l[i]} onDone={x=>{setM(m+x);i<l.length-1?setI(i+1):setFin(true)}}/>}
  </>;
}

function Disc({d,onDone}){
  const [w,setW]=useState(0),[m,setM]=useState(0),[ok,setOk]=useState(false),s=d.d[w],last=w>=d.d.length-1;
  return <>
    <h2>{s[0]}</h2>
    <ReadAloud key={w} text={s[1]} onDone={x=>{setM(m+x);setOk(true)}}/>
    {ok&&(last?<button className="pri" onClick={()=>onDone(m)}>Take the quiz</button>:<button className="pri" onClick={()=>{setW(w+1);setOk(false)}}>Next</button>)}
  </>;
}

function Quiz({d,onDone}){
  const [q]=useState(()=>d.z.map(x=>Array.isArray(x[1])
    ?[x[0],sh(x[1].map((t,j)=>[t,j===x[2]]))]
    :[x[0],[["True",x[1]],["False",!x[1]]]]));
  const [i,setI]=useState(0),[s,setS]=useState(0),[k,setK]=useState(-1);
  const n=q.length,over=i>=n;
  useEffect(()=>{if(over)onDone(n-s)},[over]);
  useEffect(()=>{if(k<0)return;const ok=q[i][1][k][1],t=setTimeout(()=>{setI(x=>x+1);setK(-1)},ok?1100:2000);return()=>clearTimeout(t)},[k]);
  if(over)return <p className="m">Checking your score...</p>;
  const cur=q[i],a=k>=0;
  return <>
    <div className="track"><i style={{width:(i/n*100)+"%"}}/></div><p className="m">Question {i+1} of {n}</p><p className="pr">{cur[0]}</p>
    <div className="opts">{cur[1].map((o,j)=><button key={j} className={"op "+(a?(o[1]?"good":j===k?"bad":""):"")} disabled={a}
      onClick={()=>{setK(j);if(o[1])setS(s+1)}}>{o[0]}</button>)}</div>
    {a&&<p className={cur[1][k][1]?"good2":"warn"} aria-live="polite">{cur[1][k][1]?"🎉 Correct!":"Not quite. The right answer is highlighted."} <span className="m">Next question...</span></p>}
  </>;
}

function Result({r,again,back,fix}){
  if(r.blocked)return <div className="res"><p className="exc try">Almost there!</p>
    <p>Please finish these parts first: <b>{r.blocked.join(", ")}</b>.</p>
    <p className="m">The next lesson opens only when all 5 activities are done and your score is at least 90%.</p>
    <button className="pri" onClick={fix}>Go to {r.blocked[0]}</button></div>;
  return r.ok
    ?<div className="res good"><p className="exc">EXCELLENT</p>
        <div className="badge" role="img" aria-label={r.stars+" star badge"}>{"★".repeat(r.stars)}<span>{"★".repeat(5-r.stars)}</span></div>
        <p className="big">{fmt(r.total)} / {TOTAL} pts ({Math.round(r.pct)}%)</p>
        <p>{r.last?"You completed all 10 lessons. Excellent work!":r.first?"The next lesson is unlocked.":"Lesson complete."}</p>
        <button className="pri" onClick={back}>Back to sessions</button></div>
    :<div className="res"><p className="exc try">YOU WILL MAKE IT</p>
        <p className="big">{fmt(r.total)} / {TOTAL} pts ({Math.round(r.pct)}%)</p>
        <p>You need at least 90% ({NEED} of {TOTAL} points) to go to the next lesson. Let's start again from the beginning.</p>
        <button className="pri" onClick={again}>Start again</button></div>;
}

function Fs(){
  const [on,setOn]=useState(!!document.fullscreenElement);
  useEffect(()=>{const h=()=>setOn(!!document.fullscreenElement);document.addEventListener("fullscreenchange",h);return()=>document.removeEventListener("fullscreenchange",h)},[]);
  if(!document.fullscreenEnabled)return null;
  return <button className="back" onClick={()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()} aria-label={on?"Exit full screen":"Full screen"}>
    {on?"✕":"⛶"}<span className="fst"> {on?"Exit full screen":"Full screen"}</span></button>;
}

function Net(){
  const [on,setOn]=useState(navigator.onLine);
  useEffect(()=>{const u=()=>setOn(true),d=()=>setOn(false);addEventListener("online",u);addEventListener("offline",d);return()=>{removeEventListener("online",u);removeEventListener("offline",d)}},[]);
  return <b className={"net "+(on?"on":"off")} role="status"><i aria-hidden="true"/>{on?"Online":"Offline"}</b>;
}

function Inst(){
  const [p,setP]=useState(null),[ok,setOk]=useState(()=>!!(window.matchMedia&&matchMedia("(display-mode: standalone)").matches));
  useEffect(()=>{const h=e=>{e.preventDefault();setP(e)},d=()=>{setP(null);setOk(true)};addEventListener("beforeinstallprompt",h);addEventListener("appinstalled",d);return()=>{removeEventListener("beforeinstallprompt",h);removeEventListener("appinstalled",d)}},[]);
  if(!p||ok)return null;
  return <button className="back" onClick={async()=>{p.prompt();try{await p.userChoice}catch(e){}setP(null)}} aria-label="Install app">⬇<span className="fst"> Install app</span></button>;
}

function AssignedQuizzes({tk}){
  const [items,setItems]=useState([]),[chosen,setChosen]=useState({}),[feedback,setFeedback]=useState({}),[err,setErr]=useState("");
  useEffect(()=>{api("/api/student/quizzes",{},tk).then(r=>setItems(r.quizzes||[])).catch(e=>setErr(e.message))},[tk]);
  const submit=async q=>{if(chosen[q.id]===undefined)return;try{const r=await api(`/api/student/quizzes/${q.id}/answer`,{method:"POST",body:{choice:Number(chosen[q.id])}},tk);setFeedback(v=>({...v,[q.id]:r.correct?"Correct! Great work.":"Not quite. Review the lesson and try again."}))}catch(e){setErr(e.message)}};
  if(!items.length&&!err)return null;
  return <section className="assigned-quizzes"><h2>✏️ Personalized quizzes</h2><p className="m">Questions assigned to you by your teacher.</p>{err&&<p className="warn">{err}</p>}{items.map(q=><article className="card" key={q.id}><p className="client-kicker">{q.title}</p><h3>{q.question}</h3><div className="client-choices">{q.options.map((o,i)=><label className="client-choice" key={i}><input type="radio" name={`assigned-${q.id}`} checked={Number(chosen[q.id])===i} onChange={()=>setChosen(v=>({...v,[q.id]:i}))}/>{o}</label>)}</div><button className="pri" onClick={()=>submit(q)} disabled={chosen[q.id]===undefined}>Check answer</button>{feedback[q.id]&&<p role="status" className={feedback[q.id].startsWith("Correct")?"good2":"warn"}>{feedback[q.id]}</p>}</article>)}</section>;
}

function Admin({tk,me,back}){
  const blank={name:"",username:"",password:""};
  const [list,setList]=useState([]),[err,setErr]=useState(""),[f,setF]=useState(blank),[q,setQ]=useState("");
  const [quizzes,setQuizzes]=useState([]),[quizError,setQuizError]=useState(""),[quizForm,setQuizForm]=useState({student_id:"",title:"",question:"",options:["","","",""],answer:"0"});
  const load=()=>api("/api/admin/users",{},tk).then(r=>setList(r.users)).catch(e=>setErr(e.message));
  const loadQuizzes=()=>api("/api/teacher/quizzes",{},tk).then(r=>setQuizzes(r.quizzes||[])).catch(e=>setQuizError(e.message));
  useEffect(()=>{load();loadQuizzes();const t=setInterval(()=>{load();loadQuizzes()},30000);return()=>clearInterval(t)},[]);
  const act=async fn=>{setErr("");try{await fn();await load()}catch(e){setErr(e.message)}};
  const set=k=>e=>setF({...f,[k]:e.target.value});
  const add=e=>{e.preventDefault();act(async()=>{await api("/api/admin/users",{method:"POST",body:f},tk);setF(blank)})};
  const upd=(u,body)=>act(()=>api("/api/admin/users/"+u.id,{method:"PUT",body},tk));
  const del=u=>confirm(`Delete ${u.name}? This cannot be undone.`)&&act(()=>api("/api/admin/users/"+u.id,{method:"DELETE"},tk));
  const pw=u=>{const p=prompt(`New password for ${u.name} (at least 6 characters):`);if(p)upd(u,{password:p})};
  const quizChange=(k,v)=>setQuizForm(a=>({...a,[k]:v}));
  const saveQuiz=async e=>{e.preventDefault();setQuizError("");try{await api("/api/teacher/quizzes",{method:"POST",body:{...quizForm,student_id:Number(quizForm.student_id),answer:Number(quizForm.answer)}} ,tk);setQuizForm({student_id:"",title:"",question:"",options:["","","",""],answer:"0"});await loadQuizzes()}catch(e){setQuizError(e.message)}};
  const shown=list.filter(u=>(u.name+" "+u.username).toLowerCase().includes(q.toLowerCase()));
  const stu=list.filter(u=>u.role!=="admin"),fin=stu.filter(u=>u.done>=10).length,start=stu.filter(u=>u.done>0&&u.done<10).length,avg=stu.length?Math.round(stu.reduce((x,u)=>x+u.done,0)/stu.length/10*100):0;
  const stat=u=>u.done>=10?["Finished","fin"]:u.done>0?["In progress","go"]:["Not started","no"];
  return <main id="app">
    <nav className="bar"><button className="back" onClick={back}>‹ Back</button><span>Teacher Dashboard</span><Net/><Inst/><Fs/><img src={B+"bulb.png"} alt=""/></nav>
    <div className="wrap">
    <h1>Teacher Dashboard</h1><p className="m">Monitor student progress, lesson records, reading weaknesses, manage accounts, and assign personalized questions.</p><h2>Student records ({list.length})</h2>
    {err&&<p className="warn" role="alert">{err}</p>}
    <div className="sum" role="status"><div><b>{stu.length}</b><span>Students</span></div><div><b>{start}</b><span>In progress</span></div><div><b>{fin}</b><span>Finished all 10</span></div><div><b>{avg}%</b><span>Average progress</span></div>
      <button className="sec" onClick={load}>↻ Refresh</button></div>
    <form className="card" onSubmit={add}>
      <h2>Add a user</h2>
      <label>Full name<input value={f.name} onChange={set("name")} required/></label>
      <label>Username<input value={f.username} onChange={set("username")} autoCapitalize="none" required/></label>
      <label>Password<input type="text" value={f.password} onChange={set("password")} required/></label>
      <button className="pri">Add user</button>
    </form>
    <section className="teacher-quiz-builder card">
      <h2>🧑‍🏫 Personalized quiz builder</h2><p className="m">Create a question for an individual student. Assigned quizzes are saved in the database and appear on that student’s dashboard.</p>
      {quizError&&<p className="warn" role="alert">{quizError}</p>}
      <form onSubmit={saveQuiz} className="teacher-quiz-form">
        <label>Assign to student<select required value={quizForm.student_id} onChange={e=>quizChange("student_id",e.target.value)}><option value="">Choose a student</option>{stu.map(u=><option key={u.id} value={u.id}>{u.name} (@{u.username})</option>)}</select></label>
        <label>Quiz title<input required value={quizForm.title} onChange={e=>quizChange("title",e.target.value)} placeholder="e.g. Review: Plant Nutrition"/></label>
        <label>Question<textarea required value={quizForm.question} onChange={e=>quizChange("question",e.target.value)} placeholder="Write a question for this student" rows={2}/></label>
        {quizForm.options.map((o,i)=><label key={i}>Answer choice {i+1}<input required value={o} onChange={e=>quizChange("options",quizForm.options.map((v,j)=>i===j?e.target.value:v))}/></label>)}
        <label>Correct answer<select value={quizForm.answer} onChange={e=>quizChange("answer",e.target.value)}>{quizForm.options.map((o,i)=><option key={i} value={i}>Choice {i+1}{o.trim()?": "+o:""}</option>)}</select></label>
        <button className="pri" type="submit">Assign personalized question</button>
      </form>
      <h3>Assigned questions ({quizzes.length})</h3>
      {quizzes.length===0?<p className="m">No personalized questions assigned yet.</p>:<div className="teacher-quiz-list">{quizzes.map(x=><div key={x.id} className="teacher-quiz-item"><b>{x.title}</b><p>{x.question}</p><small>Student: {x.student_name} (@{x.student_username})</small></div>)}</div>}
    </section>
    <input placeholder="Search name or username" value={q} onChange={e=>setQ(e.target.value)} aria-label="Search users"/>
    <div className="ugrid">{shown.map(u=><div className="card" key={u.id}>
      <div className="hi"><div><b>{u.name}</b>{u.role==="admin"&&<span className="tag"> Admin</span>}<br/><span className="m">@{u.username}</span></div><b>{u.done}/10</b></div>
      <div className="track"><i style={{width:u.done/10*100+"%"}}/></div>
      <p className="m"><span className={"st "+stat(u)[1]}>{stat(u)[0]}</span> {u.done<10?"Now on Lesson "+(u.done+1):"All lessons complete"} · <span className="stars">★ {u.stars.reduce((x,y)=>x+y,0)}</span> / 50 stars</p>
      <div className="sg" aria-label="Progress per session">{Array.from({length:10},(_,i)=><span key={i} className={i<u.done?"dn":i===u.done?"nw":""} title={"Session "+(i+1)+(i<u.done?": done, "+u.stars[i]+" stars":i===u.done?": in progress":": locked")}><b>{i+1}</b><small>{i<u.done?(u.stars[i]?u.stars[i]+"★":"✓"):i===u.done?"…":"🔒"}</small></span>)}</div>
      <p className="m">Reading tracker: red = missed words · yellow = repeated words. Records will appear after lesson reading content is supplied.</p><div className="row">
        <button className="sec" onClick={()=>pw(u)}>Reset password</button>
        <button className="sec" onClick={()=>confirm(`Reset progress of ${u.name} to 0?`)&&upd(u,{done:0})}>Reset progress</button>
        {u.id!==me&&<button className="sec danger" onClick={()=>del(u)}>Delete</button>}
      </div>
    </div>)}</div>
    </div>
  </main>;
}

function Login({onAuth}){
  const [signup,setSignup]=useState(true),[reg,setReg]=useState(false),[f,setF]=useState({name:"",username:"",password:""}),[err,setErr]=useState(""),[busy,setBusy]=useState(false),[show,setShow]=useState(false),[okMsg,setOkMsg]=useState("");
  useEffect(()=>{fetch("/api/config").then(r=>r.json()).then(c=>setSignup(c.signup!==false)).catch(()=>{})},[]);
  const set=k=>e=>setF({...f,[k]:e.target.value});
  const submit=async e=>{e.preventDefault();setBusy(true);setErr("");
    try{const r=await api(reg?"/api/register":"/api/login",{method:"POST",body:f});
      if(reg){setReg(false);setF({name:"",username:"",password:""});setShow(false);setOkMsg("Account created! Please log in with your username and password.")}
      else onAuth(r)}catch(x){setErr(x.message)}setBusy(false)};
  return <main id="app"><div className="login">
    <img className="logo" src={B+"logo.jpg"} alt="DhaLiGent Mind: Think, Understand, Achieve"/>
    <form className="card" onSubmit={submit}>
      <h2>{reg?"Create your account":"Log in to start learning"}</h2>
      <p className="m tagl">This app helps your mind learn and grow.</p>
      {reg&&<label>Full name<input value={f.name} onChange={set("name")} autoComplete="name" required/></label>}
      <label>Username<input value={f.username} onChange={set("username")} autoComplete="username" autoCapitalize="none" required/></label>
      <label>Password<div className="pw"><input type={show?"text":"password"} value={f.password} onChange={set("password")} autoComplete={reg?"new-password":"current-password"} required/>
        <button type="button" className="eye" onClick={()=>setShow(!show)} aria-label={show?"Hide password":"Show password"} aria-pressed={show} title={show?"Hide password":"Show password"}>
          {show?<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
          :<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.9 10.9 0 0 1 12 19c-7 0-11-7-11-7a19.8 19.8 0 0 1 5.06-5.94"/><path d="M9.9 4.24A10.9 10.9 0 0 1 12 4c7 0 11 7 11 7a19.9 19.9 0 0 1-3.17 4.19"/><path d="M14.12 14.12A3 3 0 1 1 9.88 9.88"/><path d="M1 1l22 22"/></svg>}</button></div></label>
      {okMsg&&!reg&&<p className="ok" role="status">{okMsg}</p>}
      {err&&<p className="warn" role="alert">{err}</p>}
      <button className="pri" disabled={busy}>{busy?"Please wait...":reg?"Create account":"Log in"}</button>
      {signup?<p className="m">{reg?"Already have an account? ":"First time here? "}
        <button type="button" className="link" onClick={()=>{setReg(!reg);setErr("");setOkMsg("");setShow(false)}}>{reg?"Log in":"Create an account"}</button></p>
      :<p className="m">No account yet? Ask your teacher to create one for you.</p>}
    </form>
  </div></main>;
}

export default function App(){
  const [tk,setTk]=useState(()=>{try{return localStorage.getItem("dm26t")}catch(e){return null}});
  const cached=(()=>{try{return tk?JSON.parse(localStorage.getItem("dm26u")):null}catch(e){return null}})();
  const pend=()=>{try{const p=JSON.parse(localStorage.getItem("dm26p")||"null")||{};return{done:Math.max(0,Math.min(10,Number(p.done)||0)),stars:S10(p.stars)}}catch(e){return{done:0,stars:S10()}}};
  const mx=(a,b)=>S10(a).map((x,i)=>Math.max(x,S10(b)[i]));
  const [user,setUser]=useState(cached),[ready,setReady]=useState(!tk||!!cached),[done,setDone]=useState(cached?Math.min(10,Math.max(Number(cached.done)||0,pend().done)):0);
  const [stars,setStars]=useState(()=>cached?mx(cached.stars,pend().stars):S10());
  const [atts,setAtts]=useState(()=>cached?loadA(cached.id):{}),[res,setRes]=useState(null);
 const [cur,setCur]=useState(0),[ph,setPh]=useState(-1),[run,setRun]=useState(0),[adm,setAdm]=useState(false);
  const out=()=>{try{localStorage.removeItem("dm26t");localStorage.removeItem("dm26u");localStorage.removeItem("dm26p")}catch(e){}setTk(null);setUser(null);setDone(0);setStars(S10());setAtts({});setRes(null);setPh(-1);setAdm(false)};
  const enter=r=>{try{localStorage.setItem("dm26t",r.token);localStorage.setItem("dm26u",JSON.stringify(r.user))}catch(e){}setTk(r.token);setUser(r.user);setDone(Math.min(10,Number(r.user.done)||0));setStars(S10(r.user.stars));setAtts(loadA(r.user.id));setRes(null);setPh(-1);setReady(true)};
  useEffect(()=>{if(!tk)return;
    api("/api/me",{},tk).then(r=>{setUser(r.user);setDone(Math.min(10,Math.max(Number(r.user.done)||0,pend().done)));setStars(mx(r.user.stars,pend().stars));try{localStorage.setItem("dm26u",JSON.stringify(r.user))}catch(e){}}).catch(e=>{if(e.status===401)out()}).finally(()=>setReady(true))},[]);
  const sync=()=>{const p=pend();if((p.done||p.stars.some(Boolean))&&tk)api("/api/progress",{method:"PUT",body:{done:p.done,stars:p.stars}},tk).then(()=>{try{localStorage.removeItem("dm26p")}catch(e){}}).catch(()=>{})};
  useEffect(()=>{if(!user)return;sync();addEventListener("online",sync);return()=>removeEventListener("online",sync)},[!!user]);
  useEffect(()=>{if(user)try{localStorage.setItem("dm26u",JSON.stringify({...user,done,stars}))}catch(e){}},[done,stars]);
  const att=atts[cur]||fresh();
  const setAtt=(s,v)=>setAtts(o=>{const n={...o,[s]:v};try{localStorage.setItem(AK(user.id),JSON.stringify(n))}catch(e){}return n});
  const patchAtt=(sIdx,fn)=>setAtts(o=>{const a=o[sIdx]||fresh(),n={...o,[sIdx]:{...a,...fn(a)}};try{localStorage.setItem(AK(user.id),JSON.stringify(n))}catch(e){}return n});
  const go=(i,p)=>{setCur(i);setPh(p);setRes(null);setRun(r=>r+1);scrollTo(0,0)};
  const home=()=>{setRes(null);setPh(-1)};
  const pass=st=>{const nd=Math.min(10,done===cur?cur+1:done),ns=stars.map((x,i)=>i===cur?Math.max(x,st):x);setDone(nd);setStars(ns);
    try{localStorage.setItem("dm26p",JSON.stringify({done:nd,stars:ns}))}catch(e){}sync()};
  // Score and progression follow the client five-activity, 50-point lesson mechanics.
  const finish=(k,mis=0,n=0,stay=false)=>{
    if(att.p[k]!=null){if(k<4&&!stay)go(cur,k+1);return}
    if(k===4){const miss=PH.filter((_,j)=>j<4&&att.p[j]==null);if(miss.length){setRes({blocked:miss});return}}
    const pts=scoreActivity(k,mis,n);
    const p=[...att.p];p[k]=Math.min(PTS[k],pts);
    patchAtt(cur,()=>({p,u:Math.max(att.u,Math.min(4,k+1))}));
    if(k<4){if(!stay)go(cur,k+1);return}
    const {total,percent:pct,passed:ok,stars:st}=scoreLesson(p);
    setRes({total,pct,ok,stars:st,first:done===cur,last:cur===9});
    if(ok)pass(st);else setAtt(cur,fresh());
  };
    if(!ready)return <main id="app"><p className="m">Loading...</p></main>;
    if(!user)return <Login onAuth={enter}/>;
    if(adm)return <Admin tk={tk} me={user.id} back={()=>setAdm(false)}/>;

  if(ph<0)return <main id="app">
    <nav className="bar"><img src={B+"bulb.png"} alt=""/><span className="brand">DhaLiGent Mind<sup>2026</sup></span><Net/><Inst/><Fs/></nav>
    <div className="home">
      <aside className="side">
        <img className="logo" src={B+"logo.jpg"} alt="DhaLiGent Mind: Think, Understand, Achieve"/>
        <div className="hi"><h1>Hi, {user.name.split(" ")[0]}!</h1><button className="sec" onClick={out}>Log out</button></div>
        <p className="m">Grade 8: Plant Transport</p>
        {user.role==="admin"&&<button className="pri" onClick={()=>setAdm(true)}>Teacher Dashboard</button>}
        <div className="prog"><div><b>{done} of 10 lessons complete</b><div className="track"><i style={{width:(done/10*100)+"%"}}/></div>
          <p className="m">{done>=10?"You finished all lessons. Great job!":"Testing mode: all 10 lessons are open. Your completion progress is still tracked separately."}</p></div><Plant n={done}/></div>
      </aside>
      <section><section className="student-profile card"><div className="profile-avatar" aria-hidden="true">{(user.name||"S").trim().charAt(0).toUpperCase()}</div><div><p className="client-kicker">STUDENT PROFILE</p><h2>{user.name}</h2><p className="m">Username: @{user.username}</p><p className="m">Lessons completed: {done}/10 · Stars earned: {stars.reduce((a,b)=>a+b,0)}</p></div></section><section className="card"><h2>📖 Reading tracker</h2><p className="m">Missed words will be marked red and repeated words yellow during read-aloud activities. Your word list will appear here after lesson reading materials are added.</p><div className="row"><span className="lg miss">Red · Missed words</span><span className="lg rep">Yellow · Repeated words</span></div><p className="m">No reading records yet.</p></section><AssignedQuizzes tk={tk}/><h2>Lessons</h2>
        <ol className="ls">{D.map((d,i)=><li key={i}><button className={i===done?"now":""} onClick={()=>go(i,Math.min((atts[i]||fresh()).u,4))}>
          <span className="n">{i+1}</span><span><b>{d.t}</b><br/><span className="m">{d.s.p} {d.s.n}</span>{stars[i]>0&&<span className="stars" aria-label={stars[i]+" stars"}> {"★".repeat(stars[i])}</span>}</span>
          {i<done?<span className="chk">✓</span>:i===done?<span className="tag">{i?"Continue":"Start"}</span>:<span className="tag">🔓 Open for testing</span>}</button></li>)}</ol>
      </section>
    </div>
  </main>;

  const d=D[cur],earned=att.p.reduce((x,y)=>x+(y||0),0);
  let body;
  if(res)body=<Result r={res} again={()=>go(cur,0)} back={home} fix={()=>go(cur,Math.max(0,PH.indexOf((res.blocked||[])[0])))}/>;
  else body=<ClientLesson key={cur+"-"+ph+"-"+run} lesson={d} lessonNumber={cur+1} phase={ph} onDone={(mis,raw)=>finish(ph,mis,raw)}/>;

  return <main id="app" key={cur+"-"+ph+"-"+run}>
    <nav className="bar"><button className="back" onClick={home}>‹ Sessions</button><span>Lesson {cur+1} of 10</span><Net/><Inst/><Fs/><img src={B+"bulb.png"} alt=""/></nav>
    <div className="wrap"><h1>{d.t}</h1>
    <div className="steps">{PH.map((n,k)=>{const lk=false,dn=att.p[k]!=null;
      return <i key={n} role="button" tabIndex={lk?-1:0} aria-disabled={lk} style={{cursor:lk?"not-allowed":"pointer"}} className={k===ph?"on":lk?"lock":dn?"ok":""}
        onClick={()=>{if(!lk)go(cur,k)}} onKeyDown={e=>(e.key==="Enter"||e.key===" ")&&!lk&&go(cur,k)}>{lk?"🔒 ":""}{n}</i>})}</div>
    <p className="score" role="status">Score: <b>{fmt(earned)}</b> / {TOTAL} <span className="m">· {att.p.filter(x=>x!=null).length}/5 activities done · complete all 5 activities and earn {NEED}/50 (90%) to pass this lesson</span></p>
    {body}
    </div>
  </main>;
}
