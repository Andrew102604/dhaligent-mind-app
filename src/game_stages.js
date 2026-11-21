// Interactions for the 50 challenges (the TEXT is in game_content.js).
// key "S-C" = session-challenge.  Every challenge has one or more stages; the challenge is complete when all stages are done.
//
// Stage types
//   drop    drag cards to zones (also tap a card, then tap a zone). zones can sit on the picture (at:[x,y,w,h] in %) or in a board.
//           item.to = zone id | [zone ids] | "next" (next free ordered zone) | null (never correct, a distractor)
//   tap     tap the right part of the picture (spots), optional zoom first
//   cards   pick picture cards (single or several correct)
//   connect tap/drag from one node to another to draw the correct connections
//   slide   slide the window open
//   swipe   swipe the water vapor upward
// scene = picture shown: garden | root | rootzoom | xs | leaf | tree | tubes | rain
// keep  = effects that stay on the picture after the challenge is complete (used in the same session)
const z=(id,label,icon,o={})=>({id,label,icon,...o});
const it=(id,label,icon,to,o={})=>({id,label,icon,to,...o});
const sp=(id,ok)=>({id,ok});
const nd=(id,label,icon,x,y)=>({id,label,icon,x,y});
const slots=n=>Array.from({length:n},(_,i)=>z("s"+(i+1),String(i+1),"",{cap:1,slot:true}));
const droplets=(n,to,o={})=>Array.from({length:n},(_,i)=>it("d"+i,"Water","💧",to,o));

const S={};

// ---------- SESSION 1: Plant Needs Quest (garden: the weak plant becomes healthy) ----------
S["1-1"]={scene:"garden",keep:["Water"],stages:[{type:"drop",
  zones:[z("plant","Plant","🌱",{at:[16,18,68,66]})],
  items:[it("w","Water","💧","plant"),it("s","Sunlight","☀️",null),it("n","Nutrients","🧪",null),it("a","Air (CO₂)","💨",null)],need:["w"]}]};
S["1-2"]={scene:"garden",keep:["Sunlight"],stages:[{type:"drop",
  blocker:{id:"box",emoji:"📦",at:[2,2]},
  zones:[z("away","Away from the plant","↗️"),z("plant","On the plant","🌱",{at:[30,38,40,40]})],
  items:[it("box","Box blocking the light","📦","away"),it("s","Sunlight","☀️",null),it("cup","Watering can","🚿",null)],need:["box"]}]};
S["1-3"]={scene:"garden",keep:["Air (CO₂)"],stages:[{type:"slide"}]};
S["1-4"]={scene:"garden",keep:["Nutrients"],stages:[{type:"drop",
  zones:[z("soil","Soil","🟫",{at:[0,70,100,30]})],
  items:[it("n","Nutrients / Minerals","🧪","soil"),it("s","Sunlight","☀️",null),it("a","Air (CO₂)","💨",null),it("st","Stone","🪨",null)],need:["n"]}]};
S["1-5"]={scene:"garden",nobase:true,stages:[{type:"drop",
  zones:[z("plant","Plant","🌱",{at:[14,16,72,72]})],
  items:[it("w","Water","💧","plant"),it("s","Sunlight","☀️","plant"),it("a","Air (CO₂)","💨","plant"),it("n","Nutrients","🧪","plant"),it("st","Stone","🪨",null),it("m","Money","💰",null)]}]};

// ---------- SESSION 2: Root Rescue ----------
S["2-1"]={scene:"root",keep:[],stages:[{type:"drop",
  zones:[z("roots","Roots","🌿",{at:[10,40,80,54]}),z("leaves","Leaves","🍃",{at:[26,2,48,20]})],
  items:[it("w","Water","💧","roots"),it("m","Minerals","🧂","roots"),it("s","Sunlight","☀️",null)]}]};
S["2-2"]={scene:"root",keep:["Anchor"],stages:[{type:"drop",loose:true,
  zones:[z("soil","Down into the soil","⬇️",{at:[8,44,84,50]}),z("air","Up in the air","☁️",{at:[8,2,84,20]})],
  items:[it("r","Roots","🌿","soil",{fx:"Anchor"}),it("f","Flower","🌸",null),it("l","Leaves","🍃",null)],need:["r"]}]};
S["2-3"]={scene:"root",keep:[],stages:[
  {type:"cards",
    p:{b:"Tan-awa pag-ayo ang roots. Asa makita ang gagmay nga root hairs?",e:"Look closely at the roots. Where can you find the tiny root hairs?"},
    i:{b:"Pilia ang hulagway nga nagpakita sa root area, dayon i-tap kini.",e:"Choose the picture showing the root area, then tap it."},
    choices:[{id:"a",label:"Leaves",icon:"🍃",ok:false},{id:"b",label:"Root area",icon:"🌱",ok:true},{id:"c",label:"Stem",icon:"🎋",ok:false},{id:"d",label:"Flower",icon:"🌸",ok:false}]},
  {type:"tap",scene:"rootzoom",zoom:true,need:1,spots:[sp("hairs_t",true),sp("hairs_b",true),sp("body",false),sp("soil",false)]}]};
S["2-4"]={scene:"root",keep:[],stages:[{type:"drop",
  zones:[z("w","Water drops","💧"),z("m","Mineral crystals","💎"),z("a","Plant standing steady","🌿")],
  items:[it("aw","Absorb water","💧","w"),it("am","Absorb minerals","💎","m"),it("an","Anchor the plant","⚓","a")]}]};
S["2-5"]={scene:"root",keep:[],stages:[{type:"drop",
  zones:[z("fw","Absorb Water","⬇️"),z("fm","Absorb Minerals","⬇️"),z("fa","Anchor","⚓")],
  items:[it("w","Water","💧","fw"),it("m","Minerals","💎","fm"),it("r","Roots","🌿","fa")]}]};

// ---------- SESSION 3: Water Path ----------
S["3-1"]={scene:"rain",keep:[],stages:[{type:"drop",
  zones:[z("rain","Under the rain","🌧️",{at:[4,36,48,58]}),z("dry","Away from the rain","☀️",{at:[56,36,40,58]})],
  items:[it("c","Container","🪣","rain",{fx:"Container"}),it("u","Umbrella","☂️",null)]}]};
S["3-2"]={scene:"root",keep:[],stages:[{type:"drop",
  zones:[z("hairs","Root hairs","🧵",{at:[16,40,68,52]}),z("leaf","Leaf","🍃"),z("flower","Flower","🌸")],
  items:droplets(3,"hairs")}]};
S["3-3"]={scene:"rootzoom",keep:[],stages:[{type:"tap",scene:"rootzoom",zoom:true,need:1,spots:[sp("hairs_t",true),sp("hairs_b",true),sp("body",false),sp("soil",false)]}]};
S["3-4"]={scene:"root",keep:[],stages:[{type:"drop",arrows:true,
  zones:slots(3),
  items:[it("a","Soil","🟫","s1"),it("b","Root Hairs","🧵","s2"),it("c","Roots","🌿","s3"),it("l","Leaf","🍃",null)]}]};
S["3-5"]={scene:"root",keep:[],stages:[{type:"drop",arrows:true,
  zones:[z("p1","Soil","🟫",{cap:1,ord:true}),z("p2","Root Hairs","🧵",{cap:1,ord:true}),z("p3","Roots","🌿",{cap:1,ord:true}),z("leaf","Leaf","🍃",{cap:1})],
  items:droplets(3,"next")}]};

// ---------- SESSION 4: Stem Highway ----------
S["4-1"]={scene:"garden",keep:["Support"],stages:[{type:"drop",
  zones:[z("stem","Stem","🎋",{at:[38,26,24,48]}),z("leaves","Leaves","🍃"),z("roots","Roots","🌿")],
  items:[it("p1","Support piece","🧱","stem",{fx:"Support"}),it("p2","Support piece","🧱","stem",{fx:"Support"}),it("p3","Support piece","🧱","stem",{fx:"Support"})]}]};
S["4-2"]={scene:"garden",keep:[],stages:[{type:"connect",
  nodes:[nd("leaves","Leaves","🍃",50,14),nd("stem","Stem","🎋",50,50),nd("roots","Roots","🌿",50,86),nd("soil","Soil","🟫",14,86)],
  edges:[["stem","roots"],["stem","leaves"]]}]};
S["4-3"]={scene:"garden",keep:[],stages:[{type:"drop",road:true,
  zones:[z("g1","Gap 1","",{shape:{w:60,h:30},cap:1}),z("g2","Gap 2","",{shape:{w:120,h:30},cap:1}),z("g3","Gap 3","",{shape:{w:88,h:30},cap:1})],
  items:[it("p2","Long piece","","g2",{shape:{w:120,h:30}}),it("p3","Medium piece","","g3",{shape:{w:88,h:30}}),it("p1","Short piece","","g1",{shape:{w:60,h:30}})]}]};
S["4-4"]={scene:"garden",keep:[],stages:[{type:"drop",
  zones:[z("xy","Water and minerals pathway","🔵"),z("ph","Sugar / food pathway","🟢")],
  items:[it("w","Water","💧","xy",{fx:"Xylem"}),it("m","Minerals","💎","xy",{fx:"Xylem"}),it("f","Food","🍬","ph",{fx:"Phloem"})]}]};
S["4-5"]={scene:"garden",keep:[],stages:[{type:"drop",
  zones:[z("sup","Support","🧱"),z("con","Connection","🔗"),z("tra","Transport","🚚")],
  items:[it("a","Plant standing upright","🪴","sup"),it("b","Roots joined to leaves","🌿🔗🍃","con"),it("c","Water going up","💧⬆️","tra")]}]};

// ---------- SESSION 5: Xylem vs. Phloem ----------
const XS=ok=>({scene:"xs",keep:[],stages:[{type:"tap",need:1,spots:[sp("xylem",ok==="xylem"),sp("phloem",ok==="phloem"),sp("pith",false),sp("cortex",false),sp("skin",false)]}]});
S["5-1"]=XS("xylem");
S["5-2"]=XS("phloem");
S["5-3"]={scene:"xs",keep:[],stages:[{type:"drop",
  zones:[z("x","Xylem","🔵"),z("p","Phloem","🟢")],
  items:[it("w","Water","💧","x"),it("m","Minerals","💎","x"),it("f","Sugars / Food","🍬","p")]}]};
S["5-4"]={scene:"garden",keep:[],stages:[{type:"connect",
  nodes:[nd("roots","Roots","🌿",14,80),nd("xylem","Xylem","🔵",50,48),nd("leaves","Leaves","🍃",86,16),nd("phloem","Phloem","🟢",72,86)],
  edges:[["roots","xylem"],["xylem","leaves"]]}]};
S["5-5"]={scene:"garden",keep:[],stages:[{type:"connect",
  nodes:[nd("leaves","Leaves","🍃",14,16),nd("phloem","Phloem","🟢",50,48),nd("plant","Whole Plant","🪴",86,80),nd("xylem","Xylem","🔵",24,84)],
  edges:[["leaves","phloem"],["phloem","plant"]]}]};

// ---------- SESSION 6: Leaf Food Factory ----------
S["6-1"]={scene:"leaf",keep:["Sunlight"],stages:[{type:"drop",shade:true,
  zones:[z("sun","Sunny spot","☀️"),z("shade","Shady spot","🌑")],
  items:[it("l","Leaf","🍃","sun",{fx:"Sunlight"})]}]};
S["6-2"]={scene:"leaf",keep:["Sunlight","Water"],stages:[{type:"drop",
  zones:[z("leaf","Leaf","🍃",{at:[14,24,72,52]}),z("soil","Soil","🟫"),z("flower","Flower","🌸")],
  items:[it("w1","Water","💧","leaf"),it("w2","Water","💧","leaf")]}]};
S["6-3"]={scene:"leaf",keep:["Sunlight","Water","Air (CO₂)"],stages:[{type:"tap",need:3,
  spots:[sp("st1",true),sp("st2",true),sp("st3",true),sp("vein",false),sp("blade",false)]}]};
S["6-4"]={scene:"leaf",nobase:true,keep:[],stages:[{type:"drop",
  zones:[z("leaf","Leaf","🍃",{at:[14,24,72,52]})],
  items:[it("s","Sunlight","☀️","leaf"),it("w","Water","💧","leaf"),it("c","Carbon Dioxide","💨","leaf",{fx:"Air (CO₂)"}),it("o","Oxygen","🫧",null),it("g","Sugar","🍬",null)]}]};
S["6-5"]={scene:"leaf",nobase:true,keep:[],stages:[{type:"drop",arrows:true,
  zones:[z("in","Inputs","⬇️"),z("proc","Process","⚙️"),z("out","Products","⬆️")],
  items:[it("s","Sunlight","☀️","in"),it("w","Water","💧","in"),it("c","Carbon Dioxide","💨","in",{fx:"Air (CO₂)"}),it("p","Photosynthesis","✨","proc"),it("f","Food","🍬","out"),it("o","Oxygen","🫧","out")]}]};

// ---------- SESSION 7: Water Journey ----------
S["7-1"]={scene:"tree",keep:[],stages:[{type:"drop",arrows:true,
  zones:slots(5),
  items:[it("a","Soil","🟫","s1"),it("b","Roots","🌿","s2"),it("c","Xylem","🔵","s3"),it("d","Stem","🎋","s4"),it("e","Leaves","🍃","s5"),it("p","Phloem","🟢",null)]}]};
S["7-2"]={scene:"tree",keep:["Root Pressure"],stages:[{type:"tap",need:1,spots:[sp("roots",true),sp("stem",false),sp("leaves",false)]}]};
S["7-3"]={scene:"tubes",keep:[],stages:[{type:"drop",
  zones:[z("narrow","Narrow tube","🥤",{at:[22,14,20,68]}),z("wide","Wide tube","🫙",{at:[52,14,32,68]})],
  items:[it("w","Water","💧","narrow",{fx:"Capillary"})]}]};
S["7-4"]={scene:"tree",keep:["Transpiration Pull"],stages:[{type:"swipe"}]};
S["7-5"]={scene:"tree",nobase:true,keep:[],stages:[{type:"drop",
  zones:[z("tree","Tall tree","🌳",{at:[6,4,88,92]})],
  items:[it("t","Transpiration Pull","🌬️","tree"),it("r","Root Pressure","⬆️",null),it("c","Capillary Action","🥤",null)],need:["t"]}]};

// ---------- SESSION 8: Phloem Express ----------
S["8-1"]={scene:"tree",keep:[],stages:[{type:"drop",
  zones:[z("ph","Phloem","🟢"),z("xy","Xylem","🔵")],
  items:[it("f1","Sugar / Food","🍬","ph",{fx:"Food"}),it("f2","Sugar / Food","🍬","ph",{fx:"Food"})]}]};
S["8-2"]={scene:"tree",keep:[],stages:[{type:"cards",
  choices:[{id:"r",label:"Roots",icon:"🌿",ok:true},{id:"s",label:"Stem",icon:"🎋",ok:true},{id:"f",label:"Flowers",icon:"🌸",ok:true},{id:"u",label:"Fruits",icon:"🍎",ok:true},{id:"n",label:"Rain",icon:"🌧️",ok:false},{id:"x",label:"Sunlight",icon:"☀️",ok:false}]}]};
S["8-3"]={scene:"tree",keep:[],stages:[{type:"connect",
  nodes:[nd("leaves","Leaves","🍃",14,16),nd("phloem","Phloem","🟢",50,48),nd("other","Other Parts","🪴",86,80),nd("xylem","Xylem","🔵",24,84)],
  edges:[["leaves","phloem"],["phloem","other"]]}]};
S["8-4"]={scene:"tree",keep:[],stages:[{type:"drop",
  zones:[z("roots","Roots","🌿",{cap:1}),z("stem","Stem","🎋",{cap:1}),z("flowers","Flowers","🌸",{cap:1}),z("fruits","Fruits","🍎",{cap:1}),z("rock","Rock","🪨",{cap:1})],
  items:[1,2,3,4].map(i=>it("pk"+i,"Food package","📦",["roots","stem","flowers","fruits"],{fx:"Food"}))}]};
S["8-5"]={scene:"tree",keep:[],stages:[
  {type:"connect",
    nodes:[nd("leaves","Leaves","🍃",14,16),nd("phloem","Phloem","🟢",50,48),nd("other","Other Parts","🪴",86,80),nd("xylem","Xylem","🔵",24,84)],
    edges:[["leaves","phloem"],["phloem","other"]]},
  {type:"drop",
    p:{b:"Ibutang ang sakto nga label sa proseso.",e:"Place the correct label on the process."},
    i:{b:"I-drag ang Translocation label sa proseso sa food movement.",e:"Drag the Translocation label onto the food-movement process."},
    zones:[z("proc","Sugars moving through the phloem","🔄")],
    items:[it("t","Translocation","🚚","proc",{fx:"Food"}),it("p","Photosynthesis","✨",null),it("r","Transpiration","💨",null)]}]};

// ---------- SESSION 9: Plant Team ----------
S["9-1"]={scene:"garden",keep:[],stages:[{type:"drop",
  zones:[z("roots","Roots","🌿"),z("stem","Stem","🎋"),z("leaves","Leaves","🍃")],
  items:[it("w","Water","💧","roots"),it("m","Minerals","💎","roots"),it("s","Sunlight","☀️",null)]}]};
S["9-2"]={scene:"garden",keep:[],stages:[{type:"connect",
  nodes:[nd("leaves","Leaves","🍃",50,14),nd("stem","Stem","🎋",50,50),nd("roots","Roots","🌿",50,86),nd("soil","Soil","🟫",16,86)],
  edges:[["roots","stem"],["stem","leaves"]]}]};
S["9-3"]={scene:"garden",keep:[],stages:[{type:"drop",
  zones:[z("leaf","Leaf","🍃",{at:[14,16,72,56]})],
  items:[it("s","Sunlight","☀️","leaf"),it("w","Water","💧","leaf"),it("c","Carbon Dioxide","💨","leaf",{fx:"Air (CO₂)"}),it("o","Soil","🟫",null),it("g","Sugar","🍬",null)]}]};
S["9-4"]={scene:"garden",keep:[],stages:[
  {type:"connect",
    p:{b:"I-build ang water transport system.",e:"Build the water transport system."},
    i:{b:"Roots → Xylem → Leaves",e:"Connect Roots → Xylem → Leaves."},
    nodes:[nd("roots","Roots","🌿",14,80),nd("xylem","Xylem","🔵",50,48),nd("leaves","Leaves","🍃",86,16),nd("phloem","Phloem","🟢",72,86)],
    edges:[["roots","xylem"],["xylem","leaves"]]},
  {type:"connect",
    p:{b:"I-build ang food transport system.",e:"Build the food transport system."},
    i:{b:"Leaves → Phloem → Whole Plant",e:"Connect Leaves → Phloem → Whole Plant."},
    nodes:[nd("leaves","Leaves","🍃",14,16),nd("phloem","Phloem","🟢",50,48),nd("plant","Whole Plant","🪴",86,80),nd("xylem","Xylem","🔵",24,84)],
    edges:[["leaves","phloem"],["phloem","plant"]]}]};
S["9-5"]={scene:"garden",keep:[],stages:[{type:"drop",
  zones:[z("roots","Roots","🌿"),z("stem","Stem","🎋"),z("leaves","Leaves","🍃")],
  items:[it("a","Water + Minerals","💧💎","roots"),it("b","Support + Connection + Transport","🧱🔗🚚","stem",{fx:"Support"}),it("c","Make Food","🍬","leaves",{fx:"Food"})]}]};

// ---------- SESSION 10: Plant Transport Master ----------
S["10-1"]={scene:"tree",keep:[],stages:[{type:"drop",arrows:true,
  zones:slots(5),
  items:[it("a","Soil","🟫","s1"),it("b","Roots","🌿","s2"),it("c","Xylem","🔵","s3"),it("d","Stem","🎋","s4"),it("e","Leaves","🍃","s5"),it("p","Phloem","🟢",null)]}]};
S["10-2"]={scene:"leaf",keep:[],stages:[
  {type:"drop",
    zones:[z("leaf","Leaf","🍃",{at:[14,24,72,52]})],
    items:[it("s","Sunlight","☀️","leaf"),it("w","Water","💧","leaf"),it("c","Carbon Dioxide","💨","leaf",{fx:"Air (CO₂)"}),it("o","Oxygen","🫧",null)]},
  {type:"cards",
    p:{b:"Kompleto na ang tulo ka kinahanglan. I-activate ang proseso.",e:"All three needs are ready. Activate the process."},
    i:{b:"I-tap ang Photosynthesis.",e:"Tap Photosynthesis."},
    choices:[{id:"p",label:"Photosynthesis",icon:"✨",ok:true},{id:"t",label:"Translocation",icon:"🚚",ok:false},{id:"x",label:"Transpiration",icon:"💨",ok:false}]}]};
S["10-3"]={scene:"tree",keep:[],stages:[
  {type:"connect",
    nodes:[nd("leaves","Leaves","🍃",14,16),nd("phloem","Phloem","🟢",50,48),nd("plant","Whole Plant","🪴",86,80),nd("xylem","Xylem","🔵",24,84)],
    edges:[["leaves","phloem"],["phloem","plant"]]},
  {type:"drop",
    p:{b:"Ibutang ang Translocation label.",e:"Place the Translocation label."},
    i:{b:"I-drag ang Translocation sa food pathway.",e:"Drag Translocation onto the food pathway."},
    zones:[z("proc","Food pathway: Leaves → Phloem → Whole Plant","🟢")],
    items:[it("t","Translocation","🚚","proc",{fx:"Food"}),it("p","Photosynthesis","✨",null),it("r","Transpiration","💨",null)]}]};
S["10-4"]={scene:"tree",keep:[],stages:[{type:"drop",
  zones:[z("roots","Roots pushing water up","🌿⬆️"),z("tube","Water in a narrow tube","🥤"),z("vapor","Water vapor leaving the leaves","🍃💨")],
  items:[it("a","Root Pressure","⬆️","roots",{fx:"Root Pressure"}),it("b","Capillary Action","🥤","tube",{fx:"Capillary"}),it("c","Transpiration Pull","🌬️","vapor",{fx:"Transpiration Pull"})]}]};
S["10-5"]={scene:"tree",keep:[],stages:[
  {type:"connect",
    p:{b:"I-build ang tibuok pathway: water ug food.",e:"Build the whole pathway: water and food."},
    i:{b:"Roots → Xylem → Leaves → Phloem → Whole Plant",e:"Connect Roots → Xylem → Leaves → Phloem → Whole Plant."},
    nodes:[nd("roots","Roots","🌿",12,84),nd("xylem","Xylem","🔵",30,50),nd("leaves","Leaves","🍃",56,16),nd("phloem","Phloem","🟢",80,42),nd("plant","Whole Plant","🪴",86,84)],
    edges:[["roots","xylem"],["xylem","leaves"],["leaves","phloem"],["phloem","plant"]]},
  {type:"drop",
    p:{b:"Ibutang ang matag factor ug proseso sa sakto nga pathway.",e:"Place each factor and process on the correct pathway."},
    i:{b:"Ang water pathway lahi sa food pathway.",e:"Keep the water pathway separate from the food pathway."},
    zones:[z("wp","Water pathway (Xylem)","🔵"),z("fp","Food pathway (Phloem)","🟢")],
    items:[it("a","Root Pressure","⬆️","wp",{fx:"Root Pressure"}),it("b","Capillary Action","🥤","wp",{fx:"Capillary"}),it("c","Transpiration Pull","🌬️","wp",{fx:"Transpiration Pull"}),it("d","Translocation","🚚","fp",{fx:"Food"}),it("e","Sugars","🍬","fp",{fx:"Food"})]}]};

export default S;
