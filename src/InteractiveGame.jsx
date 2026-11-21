import React, {useState, useCallback} from "react";
import GameTab from "./Game.jsx";

function PlantScene({n=1,total=5,placed=[],pick,got=[]}) {
  // Keep the plant illustration static: game progress must never create extra leaves.
  const leaves = [
    [130,78,-32],[171,91,30],[118,108,-30],[184,119,30],
    [112,139,-28],[190,148,28],[124,166,-28],[177,177,27],
    [139,122,-12],[161,143,14],[132,194,-25],[172,202,25]
  ];
  return <div className="scene gumamela-scene" aria-label="Complete gumamela plant with flowers, leaves, stem and roots">
    <svg viewBox="0 0 300 300" role="img" aria-label="Complete gumamela plant with many leaves, red flowers, stem and roots">
      <defs>
        <linearGradient id="gumSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#a8d8ff"/><stop offset="1" stopColor="#f5fbff"/></linearGradient>
        <linearGradient id="gumSoil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#98613b"/><stop offset="1" stopColor="#704126"/></linearGradient>
      </defs>
      <rect width="300" height="300" fill="url(#gumSky)"/>
      <circle cx="250" cy="38" r="19" fill="#ffd34e"/>
      <path d="M0 225 Q70 208 145 226 T300 220 V300 H0Z" fill="url(#gumSoil)"/>
      <path d="M0 224 Q70 207 145 225 T300 219" fill="none" stroke="#579b45" strokeWidth="10"/>
      {/* Full main stem and branches */}
      <path d="M151 226 C147 190 153 154 149 119 C148 99 150 78 151 63" stroke="#287c3c" strokeWidth="9" fill="none" strokeLinecap="round"/>
      <path d="M151 226 C147 190 153 154 149 119 C148 99 150 78 151 63" stroke="transparent" strokeWidth="24" fill="none" strokeLinecap="round" onClick={()=>pick&&pick("stem")} role={pick?"button":undefined} tabIndex={pick?0:undefined} onKeyDown={e=>{if(pick&&(e.key==="Enter"||e.key===" ")){e.preventDefault();pick("stem")}}}/>
      <path d="M151 166 Q130 145 116 118 M151 151 Q175 133 190 111 M150 194 Q127 181 111 165 M151 188 Q174 170 190 157" stroke="#328d45" strokeWidth="4" fill="none" strokeLinecap="round"/>
      {/* Lots of leaves attached to the plant branches */}
      {leaves.map(([x,y,rot],i)=>placed.includes('leaf'+i)?null:<g key={i} data-plant-leaf={i} onClick={()=>pick&&pick('leaf'+i)} role={pick?'button':undefined} tabIndex={pick?0:undefined} onKeyDown={e=>{if(pick&&(e.key==='Enter'||e.key===' ')){e.preventDefault();pick('leaf'+i)}}} style={{cursor:pick?'pointer':'default'}}>
        <path d="M0 0 C-13 -12 -37 -11 -47 0 C-33 16 -12 17 0 0Z" transform={`translate(${x} ${y}) rotate(${rot})`} fill={i%4===0?'#62bd55':i%3===0?'#278c40':'#36a64c'} stroke={got.includes('leaf'+i)?'#ffe46b':'#206d34'} strokeWidth={got.includes('leaf'+i)?3:1.2}/>
        <path d="M-39 2 Q-22 4 0 -1" transform={`translate(${x} ${y}) rotate(${rot})`} fill="none" stroke="#b8e6a0" strokeWidth="1" opacity=".8"/>
        <rect x={x-19} y={y-12} width="38" height="26" fill="transparent"/>
      </g>)}
      {/* Three recognizable hibiscus flowers */}
      {[[130,70,0],[173,84,20],[151,49,-12]].map(([x,y,r],i)=><g key={'flower'+i} transform={`translate(${x} ${y}) rotate(${r})`} onClick={()=>pick&&pick("flower0")} role={pick?"button":undefined} tabIndex={pick?0:undefined} onKeyDown={e=>{if(pick&&(e.key==="Enter"||e.key===" ")){e.preventDefault();pick("flower0")}}} style={{cursor:pick?"pointer":"default"}}>
        {Array.from({length:5},(_,j)=><ellipse key={j} cx="0" cy="-9" rx="7" ry="12" fill={i===1?'#ed4774':'#e92f62'} stroke="#bd1749" strokeWidth=".7" transform={`rotate(${j*72})`}/>)}
        <circle r="4" fill="#ffd447" stroke="#d69a17" strokeWidth="1"/><path d="M0 0 L9 8" stroke="#e8b52d" strokeWidth="2"/>
      </g>)}
      {/* Roots are visibly connected to the stem and extend below soil */}
      <path d="M151 224 C144 239 125 251 116 278 M151 224 C161 242 181 254 190 280 M150 230 C149 248 151 270 148 292 M143 239 Q128 245 103 246 M164 243 Q181 240 205 249 M129 255 L121 270 M177 260 L187 273" stroke="#e1b27b" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <text x="12" y="20" fill="#17436a" fontSize="11" fontWeight="700">GUMAMELA PLANT</text>
      <text x="12" y="214" fill="#ffffff" fontSize="9" fontWeight="700">SOIL</text>
    </svg>
  </div>;
}

export default function InteractiveGame({lessonNumber, onDone}) {
  const [att,setAtt] = useState({p:[null,null,null,null,null,null],g:0,gm:0});
  const patch = useCallback((updater) => setAtt(prev => typeof updater === "function" ? {...prev,...updater(prev)} : {...prev,...updater}),[]);
  return <GameTab sid={lessonNumber} att={att} patch={patch} onMastery={()=>{}} onStory={onDone} Scene={PlantScene}/>;
}
