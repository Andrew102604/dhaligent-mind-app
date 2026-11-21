import {useState,useEffect,useRef,useMemo} from "react";
import {createPortal} from "react-dom";
import OLD_G from "./game_content.js";
import G_LESSONS from "./game_lessons_1_8.js";
import SPEC from "./game_stages_lessons.js";
const G = [...G_LESSONS, ...OLD_G.slice(8)];

// ---------- shared text ----------
const COMMON={b:"❌ Dili pa sakto! Sulayi pag-usab. Gamita ang clue ug hunahunaa pag-ayo ang pangutana.",e:"❌ Not quite yet! Try again. Use the clue and think carefully about the question."};
const Bi=({t,cls="",lab})=>t?<div className={"bi "+cls}><p className="bs">{lab?lab+" ":""}{t.b}</p>{t.e&&<p className="en">{t.e}</p>}</div>:null;

// what an effect label means, so every picture can react to it
const kind=x=>/sun/i.test(x)?"sun":/(^|\s)(air|co₂|co2|carbon)/i.test(x)?"air":/oxygen/i.test(x)?"oxy":/pressure/i.test(x)?"press":/transpiration|pull/i.test(x)?"pull":/capillary/i.test(x)?"cap":/mineral|nutrient/i.test(x)?"min":/anchor/i.test(x)?"anchor":/container|bucket/i.test(x)?"bucket":/phloem|translocation|food|sugar|photosynth/i.test(x)?"food":/xylem|stem|support|transport/i.test(x)?"stem":/water|rain/i.test(x)?"water":/hair/i.test(x)?"hair":/root|soil/i.test(x)?"root":/flower|fruit/i.test(x)?"bloom":/leaf|leaves/i.test(x)?"leaf":"x";
const TR="all .9s ease";
const hit=(pick,id,extra={})=>pick?{onClick:()=>pick(id),onKeyDown:e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();pick(id)}},role:"button",tabIndex:0,"aria-label":id.replace("_"," "),style:{cursor:"pointer",outline:"none",...extra}}:{};

// ---------- pictures (SVG) ----------
const RP=["M150 72 C150 120 148 200 150 262","M150 88 C122 102 98 120 78 152","M150 102 C182 114 204 130 224 160","M149 136 C124 150 112 176 98 208","M151 150 C178 164 190 188 202 216","M150 190 C136 204 130 226 122 250","M150 200 C166 214 172 234 180 252"];
const GR=Array.from({length:42},(_,i)=>{const x=i*7.2,h=6+(i*37)%7;return `M${x} 70 L${x+2} ${70-h} L${x+4} 70Z`}).join("");
const GRAINS=[[30,120,4],[60,200,5],[240,110,5],[262,190,4],[210,270,6],[40,262,4],[100,100,3],[196,92,3],[270,250,4],[18,170,3]];
function Dots({n,cx,cy,rx,ry,fill,stroke,cls="drift"}){return Array.from({length:n},(_,k)=>{const a=k/n*6.283;return <circle key={k} className={cls} cx={cx} cy={cy} r="3" fill={fill} stroke={stroke} strokeWidth=".6" style={{"--dx":Math.cos(a)*rx+"px","--dy":Math.sin(a)*ry+"px",animationDelay:k*.25+"s"}}/>})}
function Flow({path,n=4,dur=2.4,fill="#3b9bff",r=3.2}){return Array.from({length:n},(_,i)=><circle key={i} r={r} fill={fill} stroke="#fff" strokeWidth=".7"><animateMotion dur={dur+"s"} begin={(i*dur/n)+"s"} repeatCount="indefinite" path={path}/></circle>)}

function RootScene({k,loose}){
  const up=loose&&!k.has("anchor");
  return <div className="scene"><svg viewBox="0 0 300 300" role="img" aria-label={up?"A plant lying loose with its roots out of the soil":"A plant with its roots underground"}>
    <defs>
      <linearGradient id="rsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6fa8ff"/><stop offset="1" stopColor="#e3f1ff"/></linearGradient>
      <linearGradient id="rsoil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8a5a36"/><stop offset="1" stopColor="#3b2216"/></linearGradient>
    </defs>
    <rect width="300" height="76" fill="url(#rsky)"/>
    <rect y="72" width="300" height="228" fill="url(#rsoil)"/>
    <rect y="66" width="300" height="9" fill="#5aa84a"/><path d={GR} fill="#6dbb58"/>
    {GRAINS.map(([x,y,r],i)=><ellipse key={i} cx={x} cy={y} rx={r} ry={r*.7} fill="#a58b6c" opacity=".55"/>)}
    {up&&<g opacity=".5"><ellipse cx="150" cy="76" rx="42" ry="7" fill="#2b1608"/></g>}
    <g style={{transform:up?"translate(-26px,-46px) rotate(-32deg)":"none",transformOrigin:"150px 72px",transition:TR}}>
      <path d="M150 72 L150 22" stroke="#3a8f4a" strokeWidth="5" strokeLinecap="round"/>
      {[[150,50,1],[150,36,-1],[150,62,-1]].map(([x,y,s],i)=><ellipse key={i} cx={x+s*10} cy={y} rx="11" ry="5" fill="#2f9e4f" transform={`rotate(${-s*25} ${x+s*10} ${y})`}/>)}
      <g fill="none" strokeLinecap="round">
        {RP.map((d,i)=><path key={"o"+i} d={d} stroke="#2b1608" strokeOpacity=".5" strokeWidth={i?4.6:6.6}/>)}
        {RP.map((d,i)=><path key={i} d={d} stroke="#d9a066" strokeWidth={i?2.6:4.4}/>)}
        {RP.map((d,i)=><path key={"h"+i} d={d} stroke="#f6e3bb" strokeOpacity=".75" strokeWidth="9" strokeDasharray="1.2 3.2"/>)}
        {k.has("hair")&&RP.map((d,i)=><path key={"g"+i} className="pulse" d={d} stroke="#ffe27a" strokeWidth="11" strokeOpacity=".6"/>)}
      </g>
    </g>
    {[[70,170],[235,190],[100,120],[210,236]].map(([x,y],i)=><path key={i} d="M0 -6 C3 -1 4 2 0 4 C-4 2 -3 -1 0 -6Z" transform={`translate(${x} ${y})`} fill="#3b9bff" opacity=".85"/>)}
    {[[60,230],[250,140],[130,270]].map(([x,y],i)=><path key={i} d="M0 -5 L5 0 L0 5 L-5 0Z" transform={`translate(${x} ${y})`} fill="#ffd23f" stroke="#b8860b" strokeWidth=".8"/>)}
    {k.has("water")&&<Dots n={8} cx={150} cy={170} rx={80} ry={34} fill="#3b9bff" stroke="#1b6fd1"/>}
    {k.has("min")&&<Dots n={8} cx={150} cy={200} rx={80} ry={30} fill="#ffd23f" stroke="#b8860b"/>}
  </svg></div>;
}

function RootZoom({zoomed,pick,got}){
  const hairs=(y0,dir)=>Array.from({length:16},(_,i)=>{const x=10+i*18.2,s=(i%3-1)*8;return <path key={i} d={`M${x} ${y0} q${s} ${dir*16} ${s*1.6} ${dir*(30+i%4*7)}`} stroke="#f6e8c8" strokeWidth="2.6" strokeLinecap="round" fill="none"/>});
  const ring=id=>got.includes(id)&&<rect x="4" y={id==="hairs_t"?64:176} width="292" height="62" rx="14" fill="none" stroke="#ffe27a" strokeWidth="4" strokeDasharray="8 6"/>;
  return <div className="scene"><svg viewBox="0 0 300 300" role="img" aria-label={zoomed?"Zoomed-in root with tiny root hairs":"A root in the soil (zoom in to look closer)"} onClick={()=>{if(!zoomed&&pick)pick("zoom")}}>
    <defs><linearGradient id="zsoil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7a4d2c"/><stop offset="1" stopColor="#3b2216"/></linearGradient></defs>
    <rect width="300" height="300" fill="url(#zsoil)"/>
    <g style={{transform:zoomed?"none":"translate(100px,120px) scale(.34)",transformOrigin:"0 0",transition:"transform .8s ease"}}>
      <rect width="300" height="300" fill="url(#zsoil)"/>
      {GRAINS.map(([x,y,r],i)=><ellipse key={i} cx={x*1} cy={(y*.8+10)%300} rx={r*2} ry={r*1.4} fill="#a58b6c" opacity=".5"/>)}
      {[[40,40],[250,260],[120,276],[220,30],[30,262]].map(([x,y],i)=><path key={i} d="M0 -9 C5 -2 6 3 0 7 C-6 3 -5 -2 0 -9Z" transform={`translate(${x} ${y})`} fill="#3b9bff" opacity=".8"/>)}
      {hairs(130,-1)}{hairs(170,1)}
      <path d="M-20 150 L320 150" stroke="#2b1608" strokeOpacity=".5" strokeWidth="50" strokeLinecap="round"/>
      <path d="M-20 150 L320 150" stroke="#d9a066" strokeWidth="44" strokeLinecap="round"/>
      <path d="M-20 140 L320 140" stroke="#f0c890" strokeOpacity=".6" strokeWidth="9" strokeLinecap="round"/>
      {ring("hairs_t")}{ring("hairs_b")}
      <rect x="0" y="0" width="300" height="62" fill="transparent" {...hit(pick,"soil")}/>
      <rect x="0" y="238" width="300" height="62" fill="transparent" {...hit(pick,"soil")}/>
      <rect x="0" y="64" width="300" height="62" fill="transparent" {...hit(pick,"hairs_t")}/>
      <rect x="0" y="176" width="300" height="62" fill="transparent" {...hit(pick,"hairs_b")}/>
      <rect x="0" y="128" width="300" height="44" fill="transparent" {...hit(pick,"body")}/>
    </g>
  </svg></div>;
}

function XSection({pick,got}){
  const ves=Array.from({length:12},(_,i)=>{const a=i/12*6.283;return [Math.cos(a)*46,Math.sin(a)*46]});
  const pc=Array.from({length:18},(_,i)=>{const a=i/18*6.283;return [Math.cos(a)*88,Math.sin(a)*88]});
  const glow=id=>got.includes(id)?{filter:"drop-shadow(0 0 7px #ffe27a)"}:{};
  return <div className="scene"><svg viewBox="0 0 300 300" role="img" aria-label="Cross-section of a stem with two colored transport pathways">
    <defs><radialGradient id="xbg"><stop offset="0" stopColor="#fff6dc"/><stop offset="1" stopColor="#d9ecff"/></radialGradient></defs>
    <rect width="300" height="300" fill="url(#xbg)"/>
    <g transform="translate(150 150)">
      <circle r="124" fill="#6fa84a" {...hit(pick,"skin",{pointerEvents:"all"})}/>
      <circle r="114" fill="#d6ebb0" {...hit(pick,"cortex",{pointerEvents:"all"})}/>
      <circle r="88" fill="none" stroke="#25a244" strokeWidth="28" pointerEvents="stroke" {...hit(pick,"phloem",{pointerEvents:"stroke",...glow("phloem")})}/>
      {pc.map(([x,y],i)=><circle key={i} cx={x} cy={y} r="4" fill="#b9f0c4" pointerEvents="none"/>)}
      <circle r="66" fill="none" stroke="#e8f4c8" strokeWidth="14" pointerEvents="none"/>
      <circle r="46" fill="none" stroke="#2f7bff" strokeWidth="28" {...hit(pick,"xylem",{pointerEvents:"stroke",...glow("xylem")})}/>
      {ves.map(([x,y],i)=><circle key={i} cx={x} cy={y} r="6" fill="#d7e8ff" stroke="#1b4fc4" strokeWidth="1.5" pointerEvents="none"/>)}
      <circle r="30" fill="#fff2c4" {...hit(pick,"pith",{pointerEvents:"all"})}/>
    </g>
  </svg></div>;
}

function LeafScene({k,pick,got,shade}){
  const dark=shade&&!k.has("sun"),st=[[122,158],[178,122],[200,174]];
  return <div className="scene"><svg viewBox="0 0 300 300" role="img" aria-label="A leaf in the sky">
    <defs>
      <linearGradient id="lsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6fa8ff"/><stop offset="1" stopColor="#e3f1ff"/></linearGradient>
      <radialGradient id="lsun"><stop offset="0" stopColor="#fff6c2"/><stop offset=".5" stopColor="#ffd23f" stopOpacity=".7"/><stop offset="1" stopColor="#ffd23f" stopOpacity="0"/></radialGradient>
      <linearGradient id="lbeam" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff3b0" stopOpacity=".85"/><stop offset="1" stopColor="#fff3b0" stopOpacity="0"/></linearGradient>
      <linearGradient id="lleaf" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#2a8f46"/><stop offset="1" stopColor="#5fc76a"/></linearGradient>
    </defs>
    <rect width="300" height="300" fill="url(#lsky)"/>
    <g transform="translate(46 46)">
      <circle r="44" fill="url(#lsun)" opacity={dark?.25:1} style={{transition:TR}}/>
      <circle r="15" fill="#ffd23f" opacity={dark?.3:1} style={{transition:TR}}/>
    </g>
    {dark&&<g fill="#9aa8c4"><ellipse cx="48" cy="48" rx="34" ry="14"/><ellipse cx="32" cy="40" rx="18" ry="13"/><ellipse cx="62" cy="38" rx="20" ry="15"/></g>}
    {k.has("sun")&&<path className="shim" d="M52 60 L120 110 L40 190 Z" fill="url(#lbeam)"/>}
    <path d="M40 230 Q20 262 28 298" stroke="#6b4a2a" strokeWidth="8" strokeLinecap="round" fill="none"/>
    <path d="M40 230 Q20 262 28 298" stroke="#3b9bff" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" fill="none"/>
    <path d="M40 230 C30 120 130 40 262 62 C282 170 190 262 40 230Z" fill="url(#lleaf)" stroke="#1e6b34" strokeWidth="2" {...hit(pick,"blade",{pointerEvents:"all"})}/>
    <path d="M40 230 C30 120 130 40 262 62 C282 170 190 262 40 230Z" fill="#000" opacity={dark?.35:0} style={{transition:TR}} pointerEvents="none"/>
    <path d="M44 228 Q150 150 258 66" stroke="#d7f5c8" strokeWidth="5" strokeLinecap="round" fill="none" pointerEvents="none"/>
    <path d="M90 190 L116 214 M120 168 L146 196 M150 146 L178 172 M176 128 L214 140 M100 178 L82 144 M132 152 L118 112 M170 126 L170 88 M212 100 L226 70" stroke="#d7f5c8" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity=".8" pointerEvents="none"/>
    <path d="M44 228 Q150 150 258 66" stroke="transparent" strokeWidth="16" fill="none" {...hit(pick,"vein",{pointerEvents:"stroke"})}/>
    {st.map(([x,y],i)=><g key={i} {...hit(pick,"st"+(i+1))}>
      <circle cx={x} cy={y} r="15" fill="transparent"/>
      <ellipse cx={x} cy={y} rx="9" ry="5.5" fill="#1e6b34"/><ellipse cx={x} cy={y} rx="4.5" ry="2.2" fill={got.includes("st"+(i+1))?"#ffe27a":"#0e3d1c"}/>
      {got.includes("st"+(i+1))&&<circle cx={x} cy={y} r="13" fill="none" stroke="#ffe27a" strokeWidth="2.5"/>}
    </g>)}
    {k.has("water")&&<Flow path="M28 296 Q20 262 42 228 Q150 150 250 70" n={5} dur={3.4}/>}
    {k.has("air")&&st.map(([x,y],i)=><circle key={i} r="4" fill="#fff" stroke="#9fb4d6" strokeWidth=".8"><animateMotion dur="2.2s" begin={i*.5+"s"} repeatCount="indefinite" path={`M${x+80} ${y+70} L${x} ${y}`}/></circle>)}
    {k.has("oxy")&&st.map(([x,y],i)=><circle key={i} r="4" fill="#fff" fillOpacity=".6" stroke="#fff"><animateMotion dur="2.4s" begin={i*.6+"s"} repeatCount="indefinite" path={`M${x} ${y} L${x-40} ${y-80}`}/></circle>)}
    {k.has("food")&&<Flow path="M240 76 Q150 150 50 224 L28 290" n={5} dur={3} fill="#ffc21a"/>}
  </svg></div>;
}

function TreeScene({k,pick,got}){
  const roots=["M150 252 C140 270 120 284 96 296","M150 252 C160 270 182 284 206 296","M150 254 C150 272 148 286 150 298","M148 256 C130 262 100 266 70 262","M152 256 C170 262 200 266 230 262"];
  const water=k.has("water")||k.has("stem")||k.has("cap")||k.has("press")||k.has("pull");
  const ring=id=>got.includes(id);
  return <div className="scene"><svg viewBox="0 0 300 300" role="img" aria-label="A tall tree with roots, a trunk and leaves">
    <defs>
      <linearGradient id="tsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6fa8ff"/><stop offset="1" stopColor="#e3f1ff"/></linearGradient>
      <linearGradient id="tsoil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8a5a36"/><stop offset="1" stopColor="#3b2216"/></linearGradient>
      <linearGradient id="trunk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#6b4a2a"/><stop offset=".5" stopColor="#9a7040"/><stop offset="1" stopColor="#5a3c20"/></linearGradient>
    </defs>
    <rect width="300" height="300" fill="url(#tsky)"/>
    <ellipse cx="238" cy="40" rx="30" ry="12" fill="#fff"/><ellipse cx="222" cy="34" rx="16" ry="11" fill="#fff"/>
    <rect y="250" width="300" height="50" fill="url(#tsoil)"/><rect y="244" width="300" height="9" fill="#5aa84a"/>
    {roots.map((d,i)=><path key={i} d={d} stroke="#d9a066" strokeWidth="4" strokeLinecap="round" fill="none"/>)}
    <path d="M136 252 C140 200 142 150 139 100 L163 100 C160 150 162 200 166 252Z" fill="url(#trunk)" {...hit(pick,"stem")}/>
    <g {...hit(pick,"leaves")}>
      {[[150,74,44,"#2f9e4f"],[110,96,32,"#38a85a"],[190,96,32,"#38a85a"],[128,52,30,"#44b866"],[172,54,30,"#44b866"],[150,40,24,"#52c874"]].map(([x,y,r,c],i)=><circle key={i} cx={x} cy={y} r={r} fill={c}/>)}
    </g>
    {[[118,64],[176,50],[150,86],[100,98],[198,96]].map(([x,y],i)=><g key={i} transform={`translate(${x} ${y})`} pointerEvents="none">{Array.from({length:5},(_,j)=><ellipse key={j} cy="-6" rx="4.4" ry="7" fill="#e0245e" transform={`rotate(${j*72})`}/>)}<circle r="3" fill="#ffd23f"/></g>)}
    <rect x="60" y="254" width="180" height="46" fill="transparent" {...hit(pick,"roots")}/>
    {ring("roots")&&<rect x="64" y="256" width="172" height="40" rx="14" fill="none" stroke="#ffe27a" strokeWidth="3" strokeDasharray="7 5"/>}
    {water&&<Flow path="M151 256 L151 104" n={6} dur={k.has("pull")?1.8:3}/>}
    {k.has("food")&&<Flow path="M153 104 L153 252 L150 296" n={6} dur={3} fill="#ffc21a"/>}
    {k.has("press")&&[0,1,2].map(i=><circle key={i} cx="150" cy="268" r="8" fill="none" stroke="#9fd2ff" strokeWidth="3"><animate attributeName="r" values="8;46" dur="1.8s" begin={i*.6+"s"} repeatCount="indefinite"/><animate attributeName="opacity" values=".9;0" dur="1.8s" begin={i*.6+"s"} repeatCount="indefinite"/></circle>)}
    {k.has("cap")&&<g stroke="#9fd2ff" strokeWidth="3" fill="none" opacity=".8"><path d="M146 240 L146 180"/><path d="M156 230 L156 170"/></g>}
    {k.has("pull")&&[0,1,2,3,4].map(i=><circle key={i} r="5" fill="#fff" fillOpacity=".75"><animateMotion dur="2.4s" begin={i*.5+"s"} repeatCount="indefinite" path={`M${120+i*15} 40 L${110+i*20} -10`}/></circle>)}
  </svg></div>;
}

function TubesScene({k}){
  const nar=k.has("cap"),y=nar?64:206;
  return <div className="scene"><svg viewBox="0 0 300 300" role="img" aria-label="A narrow tube and a wide tube standing in water">
    <defs><linearGradient id="ubg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e3f1ff"/><stop offset="1" stopColor="#bcd8ff"/></linearGradient></defs>
    <rect width="300" height="300" fill="url(#ubg)"/>
    <rect x="24" y="234" width="252" height="48" rx="12" fill="#3b9bff" opacity=".75"/>
    <rect x="80" y={y} width="20" height={250-y} fill="#2f7bff" style={{transition:"all 1.6s ease"}}/>
    <rect x="78" y="50" width="24" height="206" rx="12" fill="#fff" fillOpacity=".25" stroke="#8fb7ee" strokeWidth="3"/>
    <rect x="172" y="212" width="56" height="38" fill="#2f7bff"/>
    <rect x="170" y="50" width="60" height="206" rx="12" fill="#fff" fillOpacity=".2" stroke="#8fb7ee" strokeWidth="3"/>
    {nar&&<Flow path="M90 246 L90 70" n={4} dur={2.4} r={2.6}/>}
  </svg></div>;
}

function RainScene({k}){
  const has=k.has("bucket");
  return <div className="scene"><svg viewBox="0 0 300 300" role="img" aria-label="Rain falling on the left side, sunshine on the right">
    <defs>
      <linearGradient id="rn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7d93b8"/><stop offset="1" stopColor="#d6e4f7"/></linearGradient>
      <radialGradient id="rsun"><stop offset="0" stopColor="#fff6c2"/><stop offset="1" stopColor="#ffd23f" stopOpacity="0"/></radialGradient>
    </defs>
    <rect width="300" height="300" fill="url(#rn)"/>
    <circle cx="246" cy="48" r="38" fill="url(#rsun)"/><circle cx="246" cy="48" r="14" fill="#ffd23f"/>
    <g fill="#8d9bb6"><ellipse cx="70" cy="46" rx="52" ry="20"/><ellipse cx="40" cy="36" rx="28" ry="18"/><ellipse cx="102" cy="34" rx="30" ry="20"/></g>
    {Array.from({length:14},(_,i)=><path key={i} className="drop" d="M0 0 L-4 12" stroke="#3b9bff" strokeWidth="2.5" strokeLinecap="round" fill="none" transform={`translate(${20+i*10} ${70+(i%4)*14})`} style={{animationDelay:i*.13+"s"}}/>)}
    <rect y="248" width="300" height="52" fill="#5aa84a"/><rect y="248" width="300" height="8" fill="#6dbb58"/>
    {has&&<g transform="translate(60 196)"><path d="M0 0 L8 50 L56 50 L64 0Z" fill="#9aa5b8" stroke="#6b7488" strokeWidth="2"/><rect x="11" y="22" width="42" height="28" fill="#3b9bff" opacity=".85"><animate attributeName="y" values="46;22" dur="3s" fill="freeze"/><animate attributeName="height" values="4;28" dur="3s" fill="freeze"/></rect><ellipse cx="32" cy="0" rx="32" ry="6" fill="#c3cbd9" stroke="#6b7488" strokeWidth="2"/></g>}
  </svg></div>;
}

function WindowArt({v}){
  const open=v/100;
  return <div className="scene"><svg viewBox="0 0 300 300" role="img" aria-label="A window that can slide open">
    <defs><linearGradient id="wsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6fa8ff"/><stop offset="1" stopColor="#e3f1ff"/></linearGradient></defs>
    <rect width="300" height="300" fill="#c9b79a"/>
    <rect x="30" y="30" width="240" height="220" fill="url(#wsky)"/>
    <ellipse cx="120" cy="226" rx="70" ry="10" fill="#5aa84a"/><path d="M120 226 L120 150" stroke="#3a8f4a" strokeWidth="5"/><ellipse cx="136" cy="168" rx="16" ry="7" fill="#2f9e4f" transform="rotate(-25 136 168)"/><ellipse cx="104" cy="186" rx="16" ry="7" fill="#2f9e4f" transform="rotate(25 104 186)"/>
    {open>.25&&Array.from({length:6},(_,i)=><circle key={i} r="4" fill="#fff" stroke="#9fb4d6"><animateMotion dur="2s" begin={i*.35+"s"} repeatCount="indefinite" path={`M290 ${60+i*28} L140 ${160}`}/></circle>)}
    <rect x="30" y="30" width="120" height="220" fill="#bfe0ff" fillOpacity=".35" stroke="#8a6a3a" strokeWidth="7"/>
    <g style={{transform:`translateX(${-open*104}px)`,transition:"transform .1s linear"}}>
      <rect x="150" y="30" width="120" height="220" fill="#bfe0ff" fillOpacity=".55" stroke="#6b4a1e" strokeWidth="7"/>
      <rect x="156" y="130" width="8" height="40" rx="4" fill="#6b4a1e"/>
    </g>
    <rect x="22" y="22" width="256" height="236" fill="none" stroke="#7a5a2c" strokeWidth="10"/>
    <rect x="12" y="258" width="276" height="16" fill="#9a7a4a"/>
  </svg></div>;
}

// the picture + zones that sit on it
export function SceneBox({name,fx,g,sid,n,Scene,pick,got=[],zoomed,loose,shade,children}){
  const k=useMemo(()=>new Set(fx.map(kind)),[fx.join("|")]);
  let art;
  if(name==="garden")art=<Scene n={n!=null?n:(sid===1?g:4.99)} total={5} placed={fx} pick={pick} got={got} nocap/>;
  else if(name==="root")art=<RootScene k={k} loose={loose}/>;
  else if(name==="rootzoom")art=<RootZoom zoomed={zoomed} pick={pick} got={got}/>;
  else if(name==="xs")art=<XSection pick={pick} got={got}/>;
  else if(name==="leaf")art=<LeafScene k={k} pick={pick} got={got} shade={shade}/>;
  else if(name==="tree")art=<TreeScene k={k} pick={pick} got={got}/>;
  else if(name==="tubes")art=<TubesScene k={k}/>;
  else if(name==="rain")art=<RainScene k={k}/>;
  return <><div className="sc">{art}{children}</div>
    {name==="garden"&&sid===1&&<p className="cap" aria-live="polite">{g>=5?"🌸 The plant is healthy and happy!":g?"🌱 Getting better... keep going!":"🥀 The plant is weak. Help it!"}</p>}</>;
}

// ---------- layout ----------
export const Frame=({canvas,ctx,children})=><div className="gm"><div className="gm-l">{canvas}</div><div className="gm-r card">{ctx.head}{children}{ctx.foot}</div></div>;

// ---------- drag & drop card ----------
function Chip({it,sel,onSel,onDrop,disabled}){
  const R=useRef({x:null,moved:false,block:false}),[pos,setPos]=useState(null);
  const down=e=>{if(disabled||(e.button!==undefined&&e.button>0))return;try{e.currentTarget.setPointerCapture(e.pointerId)}catch(x){}R.current={x:e.clientX,y:e.clientY,moved:false,block:false}};
  const move=e=>{const r=R.current;if(r.x==null)return;if(!r.moved&&Math.hypot(e.clientX-r.x,e.clientY-r.y)>8)r.moved=true;if(r.moved)setPos({x:e.clientX,y:e.clientY})};
  const up=e=>{const r=R.current;if(r.x==null)return;r.x=null;if(!r.moved)return;r.moved=false;r.block=true;setPos(null);
    const el=document.elementFromPoint(e.clientX,e.clientY),zn=el&&el.closest&&el.closest("[data-zone]");if(zn)onDrop(it.id,zn.getAttribute("data-zone"))};
  const click=()=>{if(R.current.block){R.current.block=false;return}if(!disabled)onSel(it.id)};
  const body=it.shape?<><i className="shp" style={{width:it.shape.w,height:it.shape.h}}/><span className="sr">{it.label}</span></>:<>{it.icon} {it.label}</>;
  return <>
    <button type="button" className={"ch chip"+(sel?" sel":"")+(pos?" lift":"")} disabled={disabled} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={()=>{R.current.x=null;setPos(null)}} onClick={click} aria-pressed={sel}>{body}</button>
    {pos&&createPortal(<div className="ghost ch" style={{left:pos.x,top:pos.y}}>{body}</div>,document.body)}
  </>;
}

function Drop({st,ctx}){
  const {zones,items}=st;
  const [pl,setPl]=useState({}),[sel,setSel]=useState(null),[flash,setFlash]=useState(null);
  const need=st.need||items.filter(i=>i.to).map(i=>i.id);
  const cnt=(zid,p=pl)=>Object.values(p).filter(v=>v===zid).length;
  const cap=zid=>zones.find(z=>z.id===zid).cap||99;
  const ord=zones.filter(z=>z.ord).map(z=>z.id);
  const valid=(it,zid)=>{
    if(!zones.some(z=>z.id===zid)||cnt(zid)>=cap(zid))return false;
    if(it.to==="next")return ord.find(id=>cnt(id)<cap(id))===zid;
    return Array.isArray(it.to)?it.to.includes(zid):it.to===zid};
  const drop=(iid,zid)=>{
    if(ctx.fin||pl[iid])return;
    const it=items.find(i=>i.id===iid);setSel(null);
    if(valid(it,zid)){const np={...pl,[iid]:zid};setPl(np);if(need.every(id=>np[id]))ctx.ok()}
    else{setFlash(zid);setTimeout(()=>setFlash(null),500);ctx.bad()}};
  const fx=[...ctx.base,...items.filter(i=>pl[i.id]).map(i=>i.fx||i.label)];
  const blocked=st.blocker&&!pl[st.blocker.id];
  const chips=zid=>items.filter(i=>pl[i.id]===zid).map(i=><b key={i.id} className="pk">{i.shape?<i className="shp" style={{width:i.shape.w*.6,height:i.shape.h*.6}}/>:<>{i.icon} {i.label}</>} ✓</b>);
  const Zn=(z,i,ov)=><div key={z.id} data-zone={z.id} role="button" tabIndex={0} aria-label={z.label}
    className={"zn"+(ov?" ov":"")+(sel?" tgt":"")+(flash===z.id?" bad":"")+(z.slot?" slot":"")}
    style={ov?{left:z.at[0]+"%",top:z.at[1]+"%",width:z.at[2]+"%",height:z.at[3]+"%"}:z.shape?{minHeight:z.shape.h+34}:undefined}
    onClick={()=>sel&&drop(sel,z.id)} onKeyDown={e=>{if((e.key==="Enter"||e.key===" ")&&sel){e.preventDefault();drop(sel,z.id)}}}>
    {z.shape&&<i className="shp gap" style={{width:z.shape.w,height:z.shape.h}}/>}
    <span className="zl">{z.slot?<b className="num">{z.label}</b>:<>{z.icon} {z.label}</>}</span>
    <span className="zc">{chips(z.id)}</span></div>;
  const over=zones.filter(z=>z.at),board=zones.filter(z=>!z.at);
  const canvas=<SceneBox name={st.scene||ctx.scene} fx={fx} g={ctx.g} sid={ctx.sid} n={ctx.n} Scene={ctx.Scene} loose={st.loose} shade={st.shade}>
    {over.map((z,i)=>Zn(z,i,true))}
    {blocked&&<div className="blk" style={{left:st.blocker.at[0]+"%",top:st.blocker.at[1]+"%"}} aria-hidden="true">{st.blocker.emoji}</div>}</SceneBox>;
  return <Frame canvas={canvas} ctx={ctx}>
    {board.length>0&&<div className={"board"+(st.arrows?" arrows":"")+(st.road?" road":"")}>{board.map((z,i)=>Zn(z,i,false))}</div>}
    <div className="tray" aria-label="Cards">{items.map(i=>pl[i.id]?null:<Chip key={i.id} it={i} sel={sel===i.id} disabled={ctx.fin} onSel={id=>setSel(sel===id?null:id)} onDrop={drop}/>)}</div>
    <p className="m">{sel?"👆 Tap the right place for the card. / I-tap ang sakto nga lugar.":"👆 Drag a card, or tap it and then tap the place. / I-drag ang card o i-tap kini, dayon i-tap ang lugar."}</p>
  </Frame>;
}

function Tap({st,ctx}){
  const [got,setGot]=useState([]),[zoomed,setZ]=useState(!st.zoom),[hint,setHint]=useState("");
  const need=st.need||1;
  const pick=id=>{
    if(ctx.fin)return;
    if(!zoomed){setHint("🔍 Zoom in first! / I-zoom una!");return}
    const s=st.spots.find(x=>x.id===id);if(!s||got.includes(id))return;setHint("");
    if(s.ok){const ng=[...got,id];setGot(ng);if(ng.length>=need)ctx.ok()}else ctx.bad()};
  const canvas=<SceneBox name={st.scene||ctx.scene} fx={ctx.base} g={ctx.g} sid={ctx.sid} n={ctx.n} Scene={ctx.Scene} pick={pick} got={got} zoomed={zoomed}/>;
  return <Frame canvas={canvas} ctx={ctx}>
    {st.zoom&&<button type="button" className="pri" disabled={ctx.fin} onClick={()=>{setZ(z=>!z);setHint("")}}>{zoomed?"🔍 Zoom out / I-zoom out":"🔍 Zoom in / I-zoom"}</button>}
    <p className="m">{need>1?`Found ${got.length} of ${need}. / Nakit-an ${got.length} sa ${need}.`:"👆 Tap the picture. / I-tap ang hulagway."}</p>
    {hint&&<p className="fb hint" role="status">{hint}</p>}
  </Frame>;
}

function Cards({st,ctx}){
  const [got,setGot]=useState([]),[badId,setBadId]=useState(null);
  const need=st.choices.filter(c=>c.ok).length;
  const pick=c=>{
    if(ctx.fin||got.includes(c.id))return;
    if(c.ok){const ng=[...got,c.id];setGot(ng);if(ng.length>=need)ctx.ok()}
    else{setBadId(c.id);setTimeout(()=>setBadId(null),500);ctx.bad()}};
  const canvas=<SceneBox name={ctx.scene} fx={ctx.base} g={ctx.g} sid={ctx.sid} n={ctx.n} Scene={ctx.Scene}/>;
  const L="ABCDEF";
  return <Frame canvas={canvas} ctx={ctx}>
    <div className="opts">{st.choices.map((c,i)=><button type="button" key={c.id} disabled={ctx.fin} aria-pressed={got.includes(c.id)}
      className={"op pic"+(got.includes(c.id)?" good":"")+(badId===c.id?" bad":"")} onClick={()=>pick(c)}>
      <span className="pi">{c.icon}</span><span>{st.choices.length>3&&need===1?L[i]+". ":""}{c.label}</span></button>)}</div>
    {need>1&&<p className="m">Found {got.length} of {need}. / Nakit-an {got.length} sa {need}.</p>}
  </Frame>;
}

function Connect({st,ctx}){
  const [E,setE]=useState([]),[a,setA]=useState(null),[bad,setBad]=useState(null),[rb,setRb]=useState(null);
  const box=useRef(null),R=useRef({id:null,x:0,y:0,moved:false,block:false});
  const key=(x,y)=>[x,y].sort().join("|");
  const need=st.edges.map(e=>key(e[0],e[1])),N=id=>st.nodes.find(n=>n.id===id);
  const tryC=(x,y)=>{
    if(ctx.fin||x===y)return;const k=key(x,y);if(E.includes(k))return;
    if(need.includes(k)){const ne=[...E,k];setE(ne);if(ne.length>=need.length)ctx.ok()}
    else{setBad(k);setTimeout(()=>setBad(null),500);ctx.bad()}};
  const nodeTap=id=>{if(a==null)setA(id);else if(a===id)setA(null);else{tryC(a,id);setA(null)}};
  const down=(e,id)=>{if(ctx.fin)return;try{e.currentTarget.setPointerCapture(e.pointerId)}catch(x){}R.current={id,x:e.clientX,y:e.clientY,moved:false,block:false}};
  const move=e=>{const r=R.current;if(r.id==null)return;if(!r.moved&&Math.hypot(e.clientX-r.x,e.clientY-r.y)>8)r.moved=true;
    if(r.moved&&box.current){const b=box.current.getBoundingClientRect();setRb({x:(e.clientX-b.left)/b.width*100,y:(e.clientY-b.top)/b.height*100})}};
  const up=e=>{const r=R.current;if(r.id==null)return;const id=r.id;r.id=null;if(!r.moved)return;r.moved=false;r.block=true;setRb(null);setA(null);
    const el=document.elementFromPoint(e.clientX,e.clientY),nn=el&&el.closest&&el.closest("[data-node]");if(nn)tryC(id,nn.getAttribute("data-node"))};
  const click=id=>{if(R.current.block){R.current.block=false;return}nodeTap(id)};
  const from=a&&N(a);
  const canvas=<div className="sc"><div className="cn" ref={box}>
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {st.edges.map(e=>{const k=key(e[0],e[1]);if(!E.includes(k))return null;const p=N(e[0]),q=N(e[1]);return <line key={k} className="ln" x1={p.x} y1={p.y} x2={q.x} y2={q.y}/>})}
      {from&&rb&&<line className="ln tmp" x1={from.x} y1={from.y} x2={rb.x} y2={rb.y}/>}
    </svg>
    {st.nodes.map(n=><button type="button" key={n.id} data-node={n.id} disabled={ctx.fin} className={"nd"+(a===n.id?" sel":"")+(bad&&bad.split("|").includes(n.id)?" bad":"")}
      style={{left:n.x+"%",top:n.y+"%"}} onPointerDown={e=>down(e,n.id)} onPointerMove={move} onPointerUp={up} onPointerCancel={()=>{R.current.id=null;setRb(null)}} onClick={()=>click(n.id)}>
      <span className="ni">{n.icon}</span><span>{n.label}</span></button>)}
  </div></div>;
  return <Frame canvas={canvas} ctx={ctx}>
    <p className="m">{need.length>1?`Connections: ${E.length} of ${need.length}. / Koneksyon: ${E.length} sa ${need.length}.`:""}</p>
    <p className="m">{a?"👆 Now tap the part to connect it to. / Karon i-tap ang parte nga i-connect.":"👆 Tap one part, then tap the next part (or drag a line between them). / I-tap ang usa ka parte, dayon ang sunod (o i-drag ang linya)."}</p>
  </Frame>;
}

function Slide({ctx}){
  const [v,setV]=useState(0),[hint,setHint]=useState("");
  const end=()=>{if(ctx.fin)return;if(v>=95){setV(100);setHint("");ctx.ok()}else setHint("↔️ Slide it all the way open. / I-slide hangtod mabuksan.")};
  const canvas=<div className="sc"><WindowArt v={v}/></div>;
  return <Frame canvas={canvas} ctx={ctx}>
    <label className="sl">Window / Bintana
      <input type="range" min="0" max="100" step="5" value={v} disabled={ctx.fin} onChange={e=>{setV(+e.target.value);setHint("")}} onPointerUp={end} onKeyUp={end} onTouchEnd={end} aria-valuetext={v+" percent open"}/></label>
    <p className="m">{v>=95?"Open! / Abli na!":"Closed → Open / Sirado → Abli"}</p>
    {hint&&<p className="fb hint" role="status">{hint}</p>}
  </Frame>;
}

function Swipe({st,ctx}){
  const R=useRef(null),[hint,setHint]=useState(""),[fx,setFx]=useState([]);
  const done=()=>{setFx(["Transpiration Pull"]);ctx.ok()};
  const down=e=>{if(ctx.fin)return;try{e.currentTarget.setPointerCapture(e.pointerId)}catch(x){}R.current={y:e.clientY}};
  const up=e=>{const r=R.current;if(!r||ctx.fin)return;R.current=null;const dy=r.y-e.clientY;
    if(dy>40){setHint("");done()}else if(dy<-40)ctx.bad();else setHint("⬆️ Swipe upward on the arrows. / I-swipe pataas ang mga arrow.")};
  const canvas=<SceneBox name={ctx.scene} fx={[...ctx.base,...fx]} g={ctx.g} sid={ctx.sid} n={ctx.n} Scene={ctx.Scene}>
    <div className="swp" tabIndex={0} role="button" aria-label="Swipe up on the water vapor arrows" onPointerDown={down} onPointerUp={up} onPointerCancel={()=>{R.current=null}}
      onKeyDown={e=>{if(e.key==="ArrowUp"){e.preventDefault();if(!ctx.fin)done()}}}>
      {[0,1,2].map(i=><span key={i} className="arw up" style={{animationDelay:i*.3+"s"}}>⬆️</span>)}<span className="vp">💨</span></div>
  </SceneBox>;
  return <Frame canvas={canvas} ctx={ctx}>
    <p className="m">👆 Swipe up on the glowing arrows (or focus them and press the Up arrow key). / I-swipe pataas ang mga arrow.</p>
    {hint&&<p className="fb hint" role="status">{hint}</p>}
  </Frame>;
}

function PlantLeafSort({st,ctx}){
  const [placed,setPlaced]=useState({}),[drag,setDrag]=useState(null),[flash,setFlash]=useState(null);
  // These are the actual leaf positions in PlantScene. The draggable leaf-shaped
  // handles sit directly on the plant, not in a separate tray beside it.
  const leaves=[
    {id:"leaf0",label:"Healthy leaf",x:43,y:26,kind:"healthy",color:"#2e9c49",rot:-28},
    {id:"leaf1",label:"Healthy leaf",x:57,y:30,kind:"healthy",color:"#35aa4f",rot:28},
    {id:"leaf2",label:"Unhealthy yellow leaf",x:39,y:36,kind:"unhealthy",color:"#d5b83c",rot:-25},
    {id:"leaf3",label:"Healthy leaf",x:63,y:40,kind:"healthy",color:"#278b40",rot:27},
    {id:"leaf4",label:"Unhealthy spotted leaf",x:37,y:47,kind:"unhealthy",color:"#8c9a3d",rot:-25},
    {id:"leaf5",label:"Healthy leaf",x:63,y:50,kind:"healthy",color:"#35aa4f",rot:25},
    {id:"leaf6",label:"Unhealthy brown leaf",x:42,y:57,kind:"unhealthy",color:"#9b7044",rot:-25},
    {id:"leaf7",label:"Unhealthy yellow leaf",x:58,y:62,kind:"unhealthy",color:"#c8ad37",rot:25}
  ];
  const drop=(e)=>{
    if(!drag||ctx.fin)return;
    const el=document.elementFromPoint(e.clientX,e.clientY),zone=el&&el.closest&&el.closest("[data-zone]");
    if(!zone){setDrag(null);return}
    const target=zone.getAttribute("data-zone"),leaf=leaves.find(l=>l.id===drag);
    if(leaf&&leaf.kind===target){const next={...placed,[drag]:target};setPlaced(next);setFlash(null);if(leaves.every(l=>next[l.id]))ctx.ok()}
    else{setFlash(drag);ctx.bad()}
    setDrag(null);
  };
  const canvas=<div className="sc plant-sort-canvas">
    <div className="plant-sort-art"><ctx.Scene n={4} total={5} placed={Object.keys(placed)} got={[]} /></div>
    {leaves.map(l=>placed[l.id]?null:<button key={l.id} type="button" disabled={ctx.fin} className={'plant-leaf-token'+(flash===l.id?' wrong':'')+(drag===l.id?' dragging':'')} style={{left:l.x+'%',top:l.y+'%',background:l.color,'--leaf-rotation':l.rot+'deg'}} onPointerDown={e=>{if(ctx.fin)return;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}setDrag(l.id)}} onPointerUp={drop} onPointerCancel={()=>setDrag(null)} aria-label={'Drag '+l.label+' from the gumamela plant'} title={'Drag '+l.label+' from the plant'} />)}
  </div>;
  return <Frame canvas={canvas} ctx={ctx}>
    <p className="m">I-drag ang mga dahon mismo gikan sa gumamela plant ngadto sa saktong basket. Tan-awa ang kolor ug mga marka sa dahon.</p>
    <div className="plant-sort-targets">
      <div data-zone="healthy" className="plant-sort-zone" onPointerUp={drop} role="button" tabIndex={0}>🟢 Healthy leaves <small>{Object.values(placed).filter(v=>v==='healthy').length}/4</small></div>
      <div data-zone="unhealthy" className="plant-sort-zone" onPointerUp={drop} role="button" tabIndex={0}>🟤 Unhealthy leaves <small>{Object.values(placed).filter(v=>v==='unhealthy').length}/4</small></div>
    </div>
  </Frame>;
}

export const STAGE={drop:Drop,tap:Tap,cards:Cards,connect:Connect,slide:Slide,swipe:Swipe,plantSort:PlantLeafSort};

// ---------- one challenge ----------
function Challenge({sid,cid,ch,spec,base,g,Scene,onDone,after}){
  const [si,setSi]=useState(0),[fb,setFb]=useState(null),[clue,setClue]=useState(false),[fin,setFin]=useState(false);
  const mis=useRef(0),lock=useRef(false),stR=useRef(0),stOk=useRef(-1);
  const st=spec.stages[si],S=STAGE[st.type];
  const bad=()=>{if(lock.current)return;mis.current++;setFb("bad");setClue(true)};
  const ok=()=>{
    if(lock.current||stOk.current===stR.current)return;
    stOk.current=stR.current;
    if(stR.current<spec.stages.length-1){stR.current++;setSi(stR.current);setFb(null);setClue(false);return}
    lock.current=true;setFin(true);setFb("ok");setClue(false);onDone(mis.current)};
  const head=<>
    <div className="gmh"><span>{sid <= 8 ? `Lesson ${sid} of 8` : `Session ${sid} of 10`}</span><span>Challenge {cid} of 5</span></div>
    <div className="mast" role="img" aria-label={"Mastery "+g*20+" percent"}>{[0,1,2,3,4].map(i=><i key={i} className={i<g?"on":""}/>)}<b>{g*20}%</b></div>
    <h2 className="gct">{ch.t}</h2>
    <Bi t={st.p||ch.p} cls="sit"/>
    <Bi t={st.i||ch.i} cls="ins" lab="👉"/>
  </>;
  const foot=<div className="gfoot" aria-live="polite">
    {fb==="bad"&&!fin&&<div className="fb bad"><p className="bs">{COMMON.b}</p><p className="en">{COMMON.e}</p><Bi t={ch.bad}/></div>}
    {clue&&!fin&&<div className="fb clue"><p className="bs">💡 Clue</p><Bi t={ch.clue}/></div>}
    {fin&&<div className="fb ok"><Bi t={ch.ok}/></div>}
    {!fin&&!clue&&<button type="button" className="sec" onClick={()=>setClue(true)}>💡 Pangayo og clue / Get a clue</button>}
    {fin&&after}
  </div>;
  const ctx={head,foot,bad,ok,fin,base,g,sid,Scene,scene:spec.scene};
  return <S key={si} st={st} ctx={ctx}/>;
}

// ---------- the Game tab ----------
export default function GameTab({sid,att,patch,onMastery,onStory,Scene}){
  const S=G[sid-1];
  const saved=att.p[0]!=null;
  const [practice,setPractice]=useState(false),[pg,setPg]=useState(0),[cleared,setCleared]=useState(false),[last,setLast]=useState(0);
  const g=practice?pg:Math.min(5,att.g||0);
  const [view,setView]=useState(()=>(saved||(att.g||0)>=5)?"mastery":"play");
  const guard=useRef("");
  const idx=cleared?last:Math.min(g,4);
  const spec=SPEC[sid+"-"+(idx+1)],ch=S.ch[idx];
  const base=useMemo(()=>{if(spec.nobase)return[];let b=[];for(let j=0;j<idx;j++)b=b.concat((SPEC[sid+"-"+(j+1)]||{}).keep||[]);return b},[sid,idx]);
  const done=m=>{
    const key=(practice?"p":"s")+idx;if(guard.current===key)return;guard.current=key;   // a double tap can never count twice
    if(practice)setPg(idx+1);
    else{const total=(att.gm||0)+m;patch(a=>({g:Math.max(a.g||0,idx+1),gm:(a.gm||0)+m}));if(idx===4)onMastery(total)}
    setLast(idx);setCleared(true)};
  const next=()=>{setCleared(false);if(idx>=4)setView("mastery")};
  const again=()=>{guard.current="";setPractice(true);setPg(0);setCleared(false);setView("play")};
  const D=S.done||{};
  if(view==="mastery")return <div className="gm-m card">
    <div className="trophy" aria-hidden="true">🏆</div>
    {D.fin_b?<><Bi t={{b:D.fin_b,e:D.fin_e}}/><Bi t={{b:D.rev_b,e:D.rev_e}} cls="rev"/></>:<Bi t={{b:D.b,e:D.e}}/>}
    <div className="mast big" role="img" aria-label="Mastery 100 percent">{[0,1,2,3,4].map(i=><i key={i} className="on"/>)}<b>100%</b></div>
    <div className="row">
      <button type="button" className="pri" onClick={onStory}>📖 Go to Story {sid} / Padayon sa Story {sid}</button>
      <button type="button" className="sec" onClick={again}>🔁 Play again (practice) / Dulaa pag-usab</button>
    </div>
  </div>;
  const after=<button type="button" className="pri" onClick={next}>{idx>=4?"🏆 See my result / Tan-awa ang resulta":"Next Challenge ▶ / Sunod nga Challenge ▶"}</button>;
  return <div className="gtab">
    {S.mission&&idx===0&&!cleared&&<p className="mis"><b>🎯 Mission:</b> {S.mission.b}{S.mission.e?<span className="en"> / {S.mission.e}</span>:null}</p>}
    {practice&&<p className="m">🔁 Practice mode: your score is already saved. / Practice lang ni; nasave na ang imong score.</p>}
    <Challenge key={sid+"-"+idx+"-"+(practice?"p":"s")} sid={sid} cid={idx+1} ch={ch} spec={spec} base={base} g={g} Scene={Scene} onDone={done} after={after}/>
  </div>;
}
