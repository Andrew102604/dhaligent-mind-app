import {useState,useMemo} from "react";
import SIM from "./sim_content.js";
import {Scene,ConceptMap} from "./SimScenes.jsx";

// shuffle that is the same every time for the same list, and never already in the right order
const shuf=a=>{let x=a.length*7+a[0].length,o=a.map((v,i)=>[v,i]);
  o.sort((p,q)=>{x=(x*9301+49297)%233280;return x%3-1});
  const r=o.map(v=>v[1]);return r.every((v,i)=>v===i)?[...r.slice(1),r[0]]:r};

function Shell({step,scene,zones,children,msg,tone}){
  return <div className="smgrid">
    <div className="smscene"><Scene s={scene}/>{zones}</div>
    <div className="smpanel"><p className="smtxt">{step.t}</p>{msg&&<p className={"smmsg "+(tone||"")} role="status" aria-live="polite">{msg}</p>}{children}</div>
  </div>;
}
const Next=({onNext,last,off,label})=><button className="pri smnext" disabled={off} onClick={onNext}>{label||(last?"Finish simulation ✔":"Continue ▶")}</button>;

function Info({step,onNext,last}){
  return <Shell step={step} scene={step.s}><Next onNext={onNext} last={last}/></Shell>;
}

function Pick({step,onWrong,onNext,last}){
  const [got,setGot]=useState([]),[bad,setBad]=useState([]),[msg,setMsg]=useState("");
  const need=step.opts.filter(o=>o.ok).length,fin=got.length>=need;
  const tap=(o,i)=>{if(fin||got.includes(i)||bad.includes(i))return;
    if(o.ok){setGot([...got,i]);setMsg("✅ Yes! "+o.l+".")}else{setBad([...bad,i]);onWrong();setMsg("❌ Not that one. "+(step.hint||"Try another."))}};
  return <Shell step={step} scene={step.s} msg={fin?"🎉 Great job! You found them all.":msg} tone={fin||msg.startsWith("✅")?"good":msg?"bad":""}>
    <div className="smopts">{step.opts.map((o,i)=><button key={i} className={"smopt "+(got.includes(i)?"good":bad.includes(i)?"bad":"")} disabled={got.includes(i)||bad.includes(i)||fin} onClick={()=>tap(o,i)}><span>{o.i}</span> {o.l}</button>)}</div>
    {fin&&<Next onNext={onNext} last={last}/>}
  </Shell>;
}

function Order({step,onWrong,onNext,last}){
  const seq=step.items,[perm]=useState(()=>shuf(seq)),[n,setN]=useState(0),[msg,setMsg]=useState(""),[shake,setShake]=useState(-1);
  const fin=n>=seq.length,placed=seq.slice(0,n).map((_,j)=>j);
  const pick=idx=>{if(fin)return;const w=seq[n];
    if(seq[idx]===w&&!placed.includes(idx)){setN(n+1);setMsg("✅ "+w+"!")}else if(!placed.includes(idx)){onWrong();setMsg("❌ Not yet. Think about which comes next.");setShake(idx);setTimeout(()=>setShake(-1),500)}};
  return <Shell step={step} scene={step.s} msg={fin?"🎉 That is the correct order!":msg} tone={fin||msg.startsWith("✅")?"good":msg?"bad":""}>
    <ol className="smseq" aria-label="Your order">{seq.slice(0,n).map((w,i)=><li key={i}>{w}</li>)}{!fin&&<li className="ph">?</li>}</ol>
    <div className="smopts">{perm.map(idx=>placed.includes(idx)?null:<button key={idx} className={"smopt "+(shake===idx?"shake":"")} onClick={()=>pick(idx)}>{seq[idx]}</button>)}</div>
    {fin&&<Next onNext={onNext} last={last}/>}
  </Shell>;
}

function Choose({step,onWrong,onNext,last}){
  const [n,setN]=useState(0),[msg,setMsg]=useState(""),it=step.items,fin=n>=it.length,cur=it[n];
  const tap=b=>{if(fin)return;if(b===cur.ans){setMsg("✅ "+cur.l+" → "+b);setN(n+1)}else{onWrong();setMsg("❌ Not quite. Think again about "+cur.l.toLowerCase()+".")}};
  return <Shell step={step} scene={step.s} msg={fin?"🎉 All matched! Great work.":msg} tone={fin||msg.startsWith("✅")?"good":msg?"bad":""}>
    <div className="smdots" aria-label={"Item "+Math.min(n+1,it.length)+" of "+it.length}>{it.map((_,i)=><i key={i} className={i<n?"on":i===n?"cur":""}/>)}</div>
    {!fin&&<div className="smchip"><span>{cur.i}</span> {cur.l}</div>}
    {!fin&&<div className="smbins">{step.bins.map((b,i)=><button key={b} className={"smbin b"+i} onClick={()=>tap(b)}>{b}</button>)}</div>}
    {fin&&<Next onNext={onNext} last={last}/>}
  </Shell>;
}

function Remove({step,onNext,last}){
  const [sel,setSel]=useState(-1),[seen,setSeen]=useState([]);
  const fin=seen.length>=step.items.length,it=sel>=0?step.items[sel]:null;
  const take=i=>{setSel(i);if(!seen.includes(i))setSeen([...seen,i])};
  return <Shell step={step} scene={{...step.s,...(it?it.fx:{})}} msg={it?it.msg:""} tone={it?"bad":""}>
    <div className="smopts">{step.items.map((o,i)=><button key={i} className={"smopt "+(seen.includes(i)?"seen":"")} disabled={sel>=0&&sel!==i} onClick={()=>take(i)}><span>{o.i}</span> Remove {o.l}</button>)}</div>
    {it&&<button className="sec smback" onClick={()=>setSel(-1)}>↺ Give it back</button>}
    <p className="m smnote">{fin?"✅ You tried them all!":"Try all of them ("+seen.length+"/"+step.items.length+")."}</p>
    {fin&&!it&&<Next onNext={onNext} last={last}/>}
  </Shell>;
}

function Drag({step,onWrong,onNext,last}){
  const items=step.items,zones=step.zones;
  const [left,setLeft]=useState(items.map((_,k)=>k)),[placed,setPlaced]=useState({}),[fx,setFx]=useState({});
  const [drag,setDrag]=useState(null),[sel,setSel]=useState(null),[msg,setMsg]=useState(""),[flash,setFlash]=useState(""),[tone,setTone]=useState("");
  const fin=left.length===0;
  const drop=(k,zid)=>{const it=items[k],z=zones.find(x=>x.id===zid);if(!z||!left.includes(k))return;
    if(z.accepts===it.type&&(placed[zid]||0)<(z.cap||1)){
      setPlaced({...placed,[zid]:(placed[zid]||0)+1});setLeft(left.filter(x=>x!==k));setFx({...fx,...(z.fx||{}),...(it.fx||{})});setSel(null);setMsg("✅ "+(z.ok||"Great!"));setTone("good")}
    else{onWrong();setMsg("❌ Not there. "+(z.no||"Try another place."));setTone("bad");setFlash(zid);setTimeout(()=>setFlash(""),500)}};
  const down=(e,k)=>{e.currentTarget.setPointerCapture(e.pointerId);setDrag({k,x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY})};
  const move=e=>{if(drag)setDrag({...drag,x:e.clientX,y:e.clientY})};
  const up=e=>{if(!drag)return;const k=drag.k,moved=Math.hypot(e.clientX-drag.sx,e.clientY-drag.sy)>8;setDrag(null);
    if(!moved){setSel(sel===k?null:k);return}
    const el=document.elementFromPoint(e.clientX,e.clientY),z=el&&el.closest&&el.closest("[data-zone]");if(z)drop(k,z.dataset.zone)};
  const zoneEls=zones.map(z=><button key={z.id} data-zone={z.id} aria-label={"Drop here: "+z.l} className={"smz "+(flash===z.id?"flash":"")+((placed[z.id]||0)>=(z.cap||1)?" full":"")+(sel!==null?" ready":"")}
    style={{left:z.box[0]+"%",top:z.box[1]+"%",width:z.box[2]+"%",height:z.box[3]+"%"}} onClick={()=>{if(sel!==null)drop(sel,z.id);else{setMsg("Drag an item here, or tap the item first and then tap this spot.");setTone("")}}}>
    <span>{(placed[z.id]||0)>=(z.cap||1)?"✓ ":""}{z.l}</span></button>);
  return <Shell step={step} scene={{...step.s,...fx}} zones={zoneEls} msg={fin?"🎉 Mission complete!":msg} tone={fin?"good":tone}>
    {!fin&&<p className="m smnote">Drag an item to the glowing spot (or tap the item, then tap the spot).</p>}
    <div className="smtray">{left.map(k=><button key={k} className={"smtok "+(sel===k?"sel":"")+(drag&&drag.k===k?" lift":"")} onPointerDown={e=>down(e,k)} onPointerMove={move} onPointerUp={up} onPointerCancel={()=>setDrag(null)}
      onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setSel(sel===k?null:k)}}}><span>{items[k].i}</span> {items[k].l}</button>)}</div>
    {drag&&<div className="smghost" style={{left:drag.x,top:drag.y}}><span>{items[drag.k].i}</span> {items[drag.k].l}</div>}
    {fin&&<Next onNext={onNext} last={last}/>}
  </Shell>;
}

function MapStep({step,onNext,last}){
  return <div className="smmap"><p className="smtxt">{step.t}</p><ConceptMap/><Next onNext={onNext} last={last}/></div>;
}

export default function SimTab({sid,done,onDone}){
  const S=SIM[sid-1],[i,setI]=useState(0),[m,setM]=useState(0),[replay,setReplay]=useState(false);
  if(!S)return null;
  if(done&&!replay)return <div className="sim"><h2>🧪 {S.mission}</h2><p className="smtxt">You already finished this simulation. Great job!</p>
    <div className="row"><button className="pri" onClick={()=>onDone(0)}>Go to Discussion ▶</button><button className="sec" onClick={()=>setReplay(true)}>↻ Play again (no points)</button></div></div>;
  const st=S.steps[i],last=i===S.steps.length-1,next=()=>last?onDone(m):setI(i+1),wrong=()=>setM(x=>x+1);
  const P={step:st,onWrong:wrong,onNext:next,last};
  return <div className="sim">
    <h2>🧪 {S.mission}</h2>
    <div className="smdots" aria-label={"Step "+(i+1)+" of "+S.steps.length}>{S.steps.map((_,k)=><i key={k} className={k<i?"on":k===i?"cur":""}/>)}</div>
    {st.k==="pick"?<Pick key={i} {...P}/>:st.k==="order"?<Order key={i} {...P}/>:st.k==="choose"?<Choose key={i} {...P}/>:st.k==="remove"?<Remove key={i} {...P}/>:st.k==="drag"?<Drag key={i} {...P}/>:st.k==="map"?<MapStep key={i} {...P}/>:<Info key={i} {...P}/>}
  </div>;
}
