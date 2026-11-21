// Pictures for the simulations (all drawn with SVG, no image files needed).
const tx={fontFamily:"Poppins,system-ui,sans-serif",fontWeight:700,fontSize:13,fill:"#fff",paintOrder:"stroke",stroke:"#0a2a6a",strokeWidth:3,strokeLinejoin:"round"};
const has=(g,k)=>(g||[]).includes(k);
const Glow=({on,children})=>on?<g className="smpulse">{children}</g>:null;
function Flow({path,n=4,dur=3,fill="#3b9bff",r=4}){
  return Array.from({length:n},(_,i)=><circle key={i} r={r} fill={fill} stroke="#fff" strokeWidth=".8"><animateMotion dur={dur+"s"} begin={(i*dur/n)+"s"} repeatCount="indefinite" path={path}/></circle>);
}
const Drop=({x,y,s=1,c="#3b9bff"})=><path d="M0 -7 C4 -1 5 3 0 5 C-5 3 -4 -1 0 -7Z" transform={`translate(${x} ${y}) scale(${s})`} fill={c} stroke="#1b6fd1" strokeWidth=".7"/>;
const Gem=({x,y})=><path d="M0 -6 L6 0 L0 6 L-6 0Z" transform={`translate(${x} ${y})`} fill="#ffd23f" stroke="#b8860b" strokeWidth=".8"/>;
const Arrow=({x,y,r=0,c="#ffd23f",s=1})=><path d="M0 14 L0 -6 L-6 0 M0 -6 L6 0" transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} stroke={c} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>;

const ROOTS=["M160 200 C160 250 158 300 160 348","M160 214 C138 226 118 246 104 276","M160 226 C182 238 202 254 216 282","M159 250 C140 264 132 290 124 322","M161 262 C180 276 188 300 194 326","M160 288 C148 300 142 316 138 338","M160 296 C172 308 178 322 182 340"];
const TIPS=[[160,348],[104,276],[216,282],[124,322],[194,326],[138,338],[182,340]];
const GRASS=Array.from({length:44},(_,i)=>{const x=i*7.4,h=6+(i*37)%7;return `M${x} 201 L${x+2} ${201-h} L${x+4} 201Z`}).join("");

// ---------- the Gumamela (hibiscus) plant ----------
export function PlantScene({s={}}){
  const wilt=!!s.wilt,tall=!!s.tall,top=tall?60:106,g=s.glow,hide=s.hide;
  const sunOn=s.sun!==false,waterOn=s.water!==false,nutrOn=s.nutr!==false,airOn=s.air!==false;
  const L=tall?[[-1,178],[1,152],[-1,128],[1,104],[-1,82]]:[[-1,174],[1,152],[-1,130],[1,110]];
  const leafFill=wilt?(s.sun===false?"#c9d28a":"#b7a54a"):"#2f9e4f";
  const waterPath=`M159 330 C159 280 160 240 160 200 L160 ${top+8}`,foodPath=`M160 ${top+14} L160 200 C160 250 158 290 158 330`;
  const stemTop=hide==="stem"?null:`M160 200 C160 ${200-(200-top)/3} 158 ${top+34} 160 ${top}`;
  const tilt=hide==="roots"?-16:wilt?8:0;
  return <svg viewBox="0 0 320 360" role="img" aria-label={wilt?"A wilting Gumamela plant":"A healthy Gumamela plant"}>
    <defs>
      <linearGradient id="pk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5f9bff"/><stop offset="1" stopColor="#d9ecff"/></linearGradient>
      <linearGradient id="ps" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8a5a36"/><stop offset="1" stopColor="#3b2216"/></linearGradient>
    </defs>
    <rect width="320" height="204" fill="url(#pk)"/><rect y="200" width="320" height="160" fill="url(#ps)"/>
    <rect y="196" width="320" height="8" fill="#5aa84a"/><path d={GRASS} fill="#6dbb58"/>
    {sunOn&&<g><circle cx="46" cy="44" r="22" fill="#ffd23f" stroke="#f5a800" strokeWidth="3"/>{Array.from({length:10},(_,i)=><line key={i} x1="46" y1="44" x2={46+Math.cos(i*.628)*36} y2={44+Math.sin(i*.628)*36} stroke="#ffd23f" strokeWidth="3" strokeLinecap="round" opacity=".9"/>)}<circle cx="46" cy="44" r="22" fill="#ffd23f" stroke="#f5a800" strokeWidth="3"/></g>}
    <g fill="#fff" opacity=".9"><ellipse cx="250" cy="40" rx="30" ry="12"/><ellipse cx="270" cy="34" rx="20" ry="11"/></g>
    {airOn&&<g fill="#fff" fillOpacity=".55" stroke="#bfe3ff" strokeWidth="1">{[[230,100,6],[252,126,4],[212,140,5],[266,86,3]].map(([x,y,r],i)=><circle key={i} className="smdrift" style={{animationDelay:i*.6+"s"}} cx={x} cy={y} r={r}/>)}</g>}
    {/* soil details */}
    <g fill="#a58b6c" opacity=".5">{[[40,236,5],[70,300,6],[250,230,5],[272,310,4],[220,340,6],[40,330,4],[100,222,3],[210,222,3]].map(([x,y,r],i)=><ellipse key={i} cx={x} cy={y} rx={r} ry={r*.7}/>)}</g>
    {(waterOn||s.soil)&&[[96,236],[226,242],[88,300],[236,306],[128,262],[192,280],[110,330],[210,332]].map(([x,y],i)=><Drop key={i} x={x} y={y} s={s.soil?1.5:1}/>)}
    {(nutrOn||s.soil)&&[[112,262],[208,224],[70,272],[246,290],[148,334],[176,310]].map(([x,y],i)=><Gem key={i} x={x} y={y}/>)}
    {/* roots */}
    {hide!=="roots"&&<g fill="none" strokeLinecap="round">
      <Glow on={has(g,"roots")}><ellipse cx="160" cy="278" rx="74" ry="76" fill="#ffe27a" fillOpacity=".28" stroke="#ffe27a" strokeWidth="3" strokeDasharray="7 6"/></Glow>
      {ROOTS.map((d,i)=><path key={"o"+i} d={d} stroke="#2b1608" strokeOpacity=".5" strokeWidth={i?6:8}/>)}
      {ROOTS.map((d,i)=><path key={i} d={d} stroke="#e1ad72" strokeWidth={i?3.6:5.4}/>)}
      {s.hair&&TIPS.map(([x,y],k)=>[0,1,2,3,4].map(j=>{const a=j*1.26+k;return <line key={k+"-"+j} x1={x} y1={y} x2={x+Math.cos(a)*11} y2={y+Math.sin(a)*11} stroke="#fff8e0" strokeWidth="2.2" strokeLinecap="round"/>}))}
      {s.hair&&<Glow on><ellipse cx="160" cy="300" rx="84" ry="52" fill="none" stroke="#ffe27a" strokeWidth="3" strokeDasharray="6 6"/></Glow>}
    </g>}
    {/* above ground */}
    <g style={{transform:`rotate(${tilt}deg) translate(0,${hide==="stem"?64:0}px)`,transformOrigin:"160px 200px",transition:"transform 1s ease"}}>
      {stemTop&&<g>
        <Glow on={has(g,"stem")}><path d={stemTop} stroke="#ffe27a" strokeWidth="22" strokeLinecap="round" fill="none" opacity=".55"/></Glow>
        <path d={stemTop} stroke="#1f6b34" strokeWidth="11" strokeLinecap="round" fill="none"/>
        <path d={stemTop} stroke={wilt?"#8aa04a":"#3aa856"} strokeWidth="7" strokeLinecap="round" fill="none" style={{transition:"stroke 1s"}}/>
        {s.forces&&(s.forces==="cap"||s.forces==="all")&&<path d={`M154 ${top+20} L154 196 M166 ${top+20} L166 196`} stroke="#bfe3ff" strokeWidth="1.8" strokeDasharray="3 4" fill="none"/>}
      </g>}
      {hide==="stem"&&<text x="160" y="200" textAnchor="middle" style={{...tx,fill:"#ffd2d2"}}>✖ no stem</text>}
      {hide!=="leaves"&&L.map(([d,y],i)=><g key={i} transform={`translate(160 ${y})`}>
        <g style={{transform:`scale(${d},1) rotate(${wilt?52:-8}deg)`,transformOrigin:"0 0",transition:"transform 1s ease"}}>
          <path d="M0 0 C14 -14 40 -14 54 0 C40 14 14 14 0 0Z" fill={leafFill} stroke="#1f6b34" strokeWidth="2" style={{transition:"fill 1s"}}/>
          <path d="M2 0 L50 0" stroke="#1f6b34" strokeWidth="1.6" opacity=".6"/>
        </g>
      </g>)}
      {hide!=="leaves"&&<Glow on={has(g,"leaves")}><ellipse cx="160" cy={top+52} rx="78" ry="62" fill="#ffe27a" fillOpacity=".25" stroke="#ffe27a" strokeWidth="3" strokeDasharray="7 6"/></Glow>}
      {/* fruit (capsule) */}
      <g transform={`translate(196 ${top+74})`}><path d="M-8 -22 C-8 -14 -4 -8 0 -4" stroke="#3aa856" strokeWidth="3" fill="none"/>
        <ellipse cx="0" cy="4" rx="9" ry="13" fill={wilt?"#a8895a":"#b9783a"} stroke="#6b4423" strokeWidth="2"/></g>
      <Glow on={has(g,"fruit")}><circle cx="196" cy={top+78} r="22" fill="#ffe27a" fillOpacity=".3" stroke="#ffe27a" strokeWidth="3" strokeDasharray="6 5"/></Glow>
      {/* flower */}
      <g transform={`translate(160 ${top-6})`}><g style={{transform:`rotate(${wilt?58:0}deg) scale(${wilt?.85:1})`,transformOrigin:"0 12px",transition:"transform 1s ease"}}>
        {[0,72,144,216,288].map(a=><ellipse key={a} cx="0" cy="-17" rx="12" ry="19" transform={`rotate(${a})`} fill={wilt?"#cf9a94":"#e63946"} stroke="#a4161a" strokeWidth="1.6" style={{transition:"fill 1s"}}/>)}
        <circle r="7" fill="#a4161a"/><path d="M0 0 L0 -22" stroke="#f3c623" strokeWidth="3" strokeLinecap="round"/>
        {[[-4,-26],[4,-24],[0,-30]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="2.6" fill="#ffd23f" stroke="#b8860b" strokeWidth=".6"/>)}
      </g></g>
      <Glow on={has(g,"flower")}><circle cx="160" cy={top-8} r="34" fill="#ffe27a" fillOpacity=".3" stroke="#ffe27a" strokeWidth="3" strokeDasharray="6 5"/></Glow>
    </g>
    {(s.flow==="water"||s.flow==="both")&&<Flow path={waterPath} fill="#3b9bff"/>}
    {(s.flow==="food"||s.flow==="both")&&<Flow path={foodPath} fill="#ff9f1c" n={4} dur={3.4}/>}
    {s.forces&&(s.forces==="root"||s.forces==="all")&&<g><Arrow x={118} y={310} s={1.3}/><text x="14" y="334" style={tx}>Root Pressure</text></g>}
    {s.forces&&(s.forces==="cap"||s.forces==="all")&&<g><Arrow x={206} y={196} s={1.1} c="#bfe3ff"/><text x="214" y="186" style={tx}>Capillary Action</text></g>}
    {s.forces&&(s.forces==="pull"||s.forces==="all")&&<g><Arrow x={236} y={top+12} s={1.2} c="#7ee0a0"/><text x="196" y={top-2} style={tx}>Transpiration Pull</text>{[0,1,2].map(i=><circle key={i} className="smdrift" style={{animationDelay:i*.5+"s",["--dx"]:"10px",["--dy"]:"-18px"}} cx={214+i*10} cy={top+34} r="3" fill="#fff" opacity=".7"/>)}</g>}
    {s.labels&&<g><text x="104" y="226" style={tx}>Roots</text><text x="168" y="156" style={tx}>Stem</text><text x="214" y={top+40} style={tx}>Leaves</text></g>}
  </svg>;
}

// ---------- cross-section of the stem ----------
export function XSecScene({s={}}){
  const g=s.glow,B=Array.from({length:8},(_,i)=>i*45*Math.PI/180);
  return <svg viewBox="0 0 320 320" role="img" aria-label="Cross-section of a Gumamela stem with xylem and phloem">
    <rect width="320" height="320" fill="#0b3a9a"/>
    <circle cx="160" cy="146" r="122" fill="#8a5a36" stroke="#4b2e17" strokeWidth="4"/>
    <circle cx="160" cy="146" r="110" fill="#cfe8b0"/>
    <circle cx="160" cy="146" r="42" fill="#f1f6dd"/>
    {B.map((a,i)=>{const c=Math.cos(a),n=Math.sin(a);return <g key={i}>
      <circle cx={160+c*64} cy={146+n*64} r="13" fill="#3b9bff" stroke="#145bb5" strokeWidth="2.5"/>
      <circle cx={160+c*86} cy={146+n*86} r="9" fill="#ffb02e" stroke="#b86a00" strokeWidth="2.5"/></g>})}
    <Glow on={has(g,"xylem")}><circle cx="160" cy="146" r="72" fill="none" stroke="#9fd0ff" strokeWidth="5" strokeDasharray="8 6"/></Glow>
    <Glow on={has(g,"phloem")}><circle cx="160" cy="146" r="92" fill="none" stroke="#ffd98a" strokeWidth="5" strokeDasharray="8 6"/></Glow>
    <line x1="160" y1="146" x2="248" y2="82" stroke="#fff" strokeWidth="2"/><text x="252" y="80" style={tx}>Xylem</text>
    <line x1="160" y1="146" x2="62" y2="236" stroke="#fff" strokeWidth="2"/><text x="6" y="256" style={tx}>Phloem</text>
    <circle cx="160" cy="146" r="4" fill="#fff"/>
    <g transform="translate(0 288)"><circle cx="22" cy="0" r="8" fill="#3b9bff" stroke="#145bb5" strokeWidth="2"/><text x="36" y="5" style={tx}>Xylem: water + minerals ⬆</text></g>
    <g transform="translate(0 310)"><circle cx="22" cy="0" r="8" fill="#ffb02e" stroke="#b86a00" strokeWidth="2"/><text x="36" y="5" style={tx}>Phloem: food ⬆⬇</text></g>
  </svg>;
}

// ---------- the leaf (photosynthesis) ----------
export function LeafScene({s={}}){
  return <svg viewBox="0 0 320 300" role="img" aria-label="A green Gumamela leaf making food with sunlight, water and carbon dioxide">
    <defs><linearGradient id="lk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5f9bff"/><stop offset="1" stopColor="#cfe6ff"/></linearGradient></defs>
    <rect width="320" height="300" fill="url(#lk)"/>
    <circle cx="44" cy="44" r="22" fill="#ffd23f" stroke="#f5a800" strokeWidth="3"/>{Array.from({length:10},(_,i)=><line key={i} x1="44" y1="44" x2={44+Math.cos(i*.628)*38} y2={44+Math.sin(i*.628)*38} stroke="#ffd23f" strokeWidth="3" strokeLinecap="round"/>)}<circle cx="44" cy="44" r="22" fill="#ffd23f" stroke="#f5a800" strokeWidth="3"/>
    <path d="M24 262 C60 240 80 226 112 210" stroke="#3aa856" strokeWidth="10" strokeLinecap="round" fill="none"/>
    <path d="M40 188 C90 84 232 80 296 168 C232 252 92 262 40 188Z" fill={s.start?"#37b25a":"#2f9e4f"} stroke="#1f6b34" strokeWidth="4" style={{transition:"fill 1s"}}/>
    <path d="M44 190 C120 168 210 166 290 168 M120 172 L150 118 M170 168 L204 116 M120 176 L146 226 M176 172 L208 222" stroke="#1f6b34" strokeWidth="2.4" opacity=".7" fill="none"/>
    {s.start&&<ellipse className="smpulse" cx="168" cy="170" rx="104" ry="62" fill="#fff" fillOpacity=".12" stroke="#fff" strokeWidth="3" strokeDasharray="8 6"/>}
    {[[100,222],[148,236],[196,232],[240,214]].map(([x,y],i)=><g key={i}><ellipse cx={x} cy={y} rx="9" ry="4.5" fill={s.stoma?"#ffe27a":"#1f6b34"} stroke="#0f3f1f" strokeWidth="1.5"/>{s.stoma&&<circle className="smpulse" cx={x} cy={y} r="13" fill="none" stroke="#ffe27a" strokeWidth="2.5"/>}</g>)}
    {s.sunIn&&<g><Arrow x={96} y={106} r={-55} s={1.4} c="#ffd23f"/><text x="64" y="86" style={tx}>Sunlight</text></g>}
    {s.waterIn&&<g><Arrow x={70} y={226} r={55} s={1.2} c="#7ec4ff"/><text x="8" y="282" style={tx}>Water</text></g>}
    {s.co2In&&<g><Arrow x={196} y={290} r={0} s={1.2} c="#e6e6e6"/><text x="214" y="288" style={tx}>CO₂ in</text></g>}
    {s.food&&<g>{[[150,150],[184,166],[216,150]].map(([x,y],i)=><circle key={i} className="smpulse" cx={x} cy={y} r="11" fill="#ff9f1c" stroke="#fff" strokeWidth="2"/>)}<text x="124" y="136" style={tx}>Food (glucose)</text></g>}
    {s.o2&&<g>{[0,1,2].map(i=><circle key={i} className="smdrift" style={{animationDelay:i*.6+"s",["--dx"]:"26px",["--dy"]:"-22px"}} cx={252+i*8} cy={156-i*12} r="7" fill="#bff5d0" stroke="#fff" strokeWidth="1.5"/>)}<text x="228" y="108" style={tx}>Oxygen (O₂) out</text></g>}
  </svg>;
}

// ---------- roots, stem and leaves one by one ----------
export function PartsScene({s={}}){
  const g=s.glow;
  return <svg viewBox="0 0 320 240" role="img" aria-label="The roots, the stem and the leaves of a Gumamela plant, shown separately">
    <rect width="320" height="240" fill="#0b3a9a"/>
    {[0,1,2].map(i=><rect key={i} x={8+i*104} y="10" width="100" height="190" rx="14" fill="#14489f" stroke="#7fb8ff" strokeWidth="2"/>)}
    <g fill="none" strokeLinecap="round"><path d="M58 40 C58 80 56 120 58 170 M58 60 C40 74 30 96 24 124 M58 70 C76 84 86 104 92 134 M57 100 C44 114 38 138 34 160 M59 110 C72 124 78 146 80 164" stroke="#e1ad72" strokeWidth="5"/></g>
    <path d="M162 40 C162 90 160 140 162 176" stroke="#3aa856" strokeWidth="14" strokeLinecap="round"/><path d="M162 60 L162 168" stroke="#1f6b34" strokeWidth="2" strokeDasharray="2 6"/>
    <path d="M232 170 C246 84 296 70 304 110 C296 160 256 180 232 170Z" fill="#2f9e4f" stroke="#1f6b34" strokeWidth="3"/><path d="M236 166 L296 112" stroke="#1f6b34" strokeWidth="2"/>
    {s.labels&&<g><text x="58" y="192" textAnchor="middle" style={tx}>Water + minerals</text><text x="162" y="192" textAnchor="middle" style={tx}>Transport</text><text x="262" y="192" textAnchor="middle" style={tx}>Food</text></g>}
    <text x="58" y="224" textAnchor="middle" style={tx}>Roots</text><text x="162" y="224" textAnchor="middle" style={tx}>Stem</text><text x="262" y="224" textAnchor="middle" style={tx}>Leaves</text>
  </svg>;
}

export function Scene({s={}}){
  return s.sc==="xsec"?<XSecScene s={s}/>:s.sc==="leaf"?<LeafScene s={s}/>:s.sc==="parts"?<PartsScene s={s}/>:<PlantScene s={s}/>;
}

// ---------- final concept map ----------
export function ConceptMap(){
  const N=({c,children})=><span className={"cmn "+(c||"")}>{children}</span>,A=({t})=><span className="cma">{t||"→"}</span>;
  return <div className="cmap" role="img" aria-label="Concept map of the complete transport system of a Gumamela plant">
    <h3>🗺️ Transport system of the Gumamela plant</h3>
    <div className="cmrow"><N c="soil">🟤 Soil: water + minerals</N><A/><N c="root">🌱 Roots</N><A/><N c="xy">💧 Xylem</N><A/><N c="stem">🌿 Stem</N><A/><N c="leaf">🍃 Leaves</N></div>
    <p className="cmnote">Forces that move the water up: Root Pressure • Capillary Action • Transpiration Pull</p>
    <div className="cmrow"><N c="leaf">🍃 Leaves + ☀️ sunlight + CO₂</N><A t="→ photosynthesis →"/><N c="food">🍬 Food (glucose) + 🌬️ oxygen</N></div>
    <div className="cmrow"><N c="food">🍬 Food</N><A/><N c="ph">🟠 Phloem</N><A t="→ translocation →"/><N c="all">🌺 Whole plant: roots, flower, fruit</N></div>
  </div>;
}
