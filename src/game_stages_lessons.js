import OLD from "./game_stages.js";
const z=(id,label,icon,o={})=>({id,label,icon,...o});
const it=(id,label,icon,to,o={})=>({id,label,icon,to,...o});
const sp=(id,ok)=>({id,ok});
const nd=(id,label,icon,x,y)=>({id,label,icon,x,y});
const slots=n=>Array.from({length:n},(_,i)=>z("s"+(i+1),String(i+1),"",{cap:1,slot:true}));
const d={};
const set=(sid,cid,spec)=>d[sid+"-"+cid]=spec;

// Lesson 1: Leaf Detective
set(1,1,{scene:"garden",keep:[],stages:[{type:"tap",scene:"garden",need:12,spots:[sp("leaf0",true),sp("leaf1",true),sp("leaf2",true),sp("leaf3",true),sp("leaf4",true),sp("leaf5",true),sp("leaf6",true),sp("leaf7",true),sp("leaf8",true),sp("leaf9",true),sp("leaf10",true),sp("leaf11",true),sp("stem",false),sp("flower0",false)]}]});
set(1,2,{scene:"garden",keep:[],stages:[{type:"drop",zones:[z("count","How many leaves?","🔢")],items:[it("six","6 leaves","🍃",null),it("eight","8 leaves","☘️",null),it("ten","10 leaves","🌱",null),it("twelve","12 leaves","🌿","count"),it("fourteen","14 leaves","🍀",null),it("sixteen","16 leaves","🌳",null),it("eighteen","18 leaves","🌾",null),it("twenty","20 leaves","🌲",null)]}]});
set(1,3,{scene:"garden",keep:[],stages:[{type:"plantSort",need:8}]});
set(1,4,{scene:"garden",keep:["Photosynthesis"],stages:[{type:"connect",nodes:[nd("leaf","Leaf","🍃",18,24),nd("food","Makes food","🍎",79,24),nd("root","Root absorbs water","🌱",18,51),nd("anchor","Anchors plant","⚓",79,51),nd("stem","Transports water","🎋",18,78),nd("flower","Attracts pollinators","🌺",79,78),nd("soil","Holds minerals","🟫",49,52),nd("sun","Uses sunlight","☀️",49,24),nd("air","Takes in CO₂","💨",18,65),nd("water","Absorbs water","💧",79,65),nd("fruit","Stores seeds","🍎",49,88)],edges:[["leaf","food"]]}]});
set(1,5,{scene:"garden",keep:[],stages:[{type:"drop",zones:[z("summary","Whole Gumamela Plant","🌺",{at:[8,5,84,86]})],items:[it("plant","Complete gumamela plant","🪴","summary"),it("leaf","Single leaf","🍃",null),it("stem","Stem only","🎋",null),it("roots","Roots only","🌱",null),it("flower","Flower only","🌺",null),it("tree","Tree","🌳",null),it("cactus","Cactus","🌵",null),it("grass","Grass","🌾",null),it("fruit","Fruit","🍎",null)]}]});
// Lesson 2: Root Finder
set(2,1,{scene:"root",keep:[],stages:[{type:"drop",zones:[z("roots","Roots ilalom sa yuta","🌱")],items:[it("roots","Roots","🌱","roots"),it("leaf","Leaves","🍃",null),it("flower","Flower","🌸",null)]}]});
set(2,2,{scene:"root",keep:[],stages:[{type:"drop",zones:[z("roots","Main roots","🌿")],items:[it("r1","Main root 1","🌱","roots"),it("r2","Main root 2","🌱","roots"),it("r3","Main root 3","🌱","roots"),it("leaf","Leaf","🍃",null)]}]});
set(2,3,{scene:"root",keep:["Water","Minerals"],stages:[{type:"drop",zones:[z("roots","Roots","🌿",{at:[8,40,84,56]})],items:[it("water","Water","💧","roots"),it("min","Minerals","💎","roots"),it("sun","Sunlight","☀️",null),it("sugar","Sugar","🍬",null)]}]});
set(2,4,{scene:"root",keep:[],stages:[{type:"connect",nodes:[nd("roots","Roots","🌿",25,25),nd("abs","Absorption","💧",75,25),nd("anchor","Anchorage","⚓",75,75),nd("leaf","Leaves","🍃",25,75)],edges:[["roots","abs"],["roots","anchor"]]}]});
set(2,5,{scene:"root",keep:[],stages:[{type:"drop",zones:[z("report","Root report","📋")],items:[it("water","Absorbs water","💧","report"),it("anchor","Anchors plant","⚓","report"),it("food","Makes food","🍎",null)]}]});
// Lesson 3: Stem Messenger
set(3,1,{scene:"garden",keep:[],stages:[{type:"connect",nodes:[nd("roots","Roots / Start","🌱",50,82),nd("middle","Learner 2","👧",50,55),nd("top","Learner 3 / End","👦",50,25),nd("side","Off route","👤",15,52)],edges:[["roots","middle"],["middle","top"]]}]});
set(3,2,{scene:"root",keep:["Water"],stages:[{type:"drop",zones:[z("learner","First learner","👦")],items:[it("water","Water card","💧","learner"),it("food","Food card","🍬",null),it("sun","Sunlight card","☀️",null)]}]});
set(3,3,{scene:"garden",keep:["Water"],stages:[{type:"connect",nodes:[nd("first","First learner","👦",50,80),nd("next","Next learner","👧",50,50),nd("last","Last learner","👦",50,20),nd("soil","Soil","🟫",15,80)],edges:[["first","next"],["next","last"]]}]});
set(3,4,{scene:"garden",keep:["Water"],stages:[{type:"drop",zones:[z("leaves","Leaf group","🍃",{at:[15,3,70,28]})],items:[it("water","Water card","💧","leaves"),it("food","Food card","🍬",null),it("min","Mineral card","💎",null)]}]});
set(3,5,{scene:"garden",keep:[],stages:[{type:"drop",zones:[z("flower","Flower / plant group","🌸",{at:[20,5,60,28]})],items:[it("food","Food card","🍬","flower"),it("water","Water card","💧",null),it("stone","Stone","🪨",null)]}]});
// Lesson 4: Plant Needs Hunt
set(4,1,{scene:"garden",keep:["Sunlight"],stages:[{type:"drop",zones:[z("set","Inventory","📦")],items:[it("sun","Sunlight card","☀️","set"),it("water","Water","💧",null),it("soil","Soil","🟫",null)]}]});
set(4,2,{scene:"garden",keep:["Water"],stages:[{type:"drop",zones:[z("set","Inventory","📦")],items:[it("water","Water card","💧","set"),it("sun","Sunlight","☀️",null),it("air","Air","💨",null)]}]});
set(4,3,{scene:"garden",keep:["Air (CO₂)"],stages:[{type:"drop",zones:[z("set","Inventory","📦")],items:[it("air","Air / CO₂ card","💨","set"),it("stone","Stone","🪨",null),it("food","Food","🍬",null)]}]});
set(4,4,{scene:"root",keep:["Nutrients"],stages:[{type:"drop",zones:[z("set","Plant needs set","📦")],items:[it("min","Mineral card","💎","set"),it("sun","Sunlight","☀️",null),it("air","Air","💨",null)]}]});
set(4,5,{scene:"garden",keep:[],stages:[{type:"drop",zones:[z("plant","Plant needs diagram","🪴",{at:[10,10,80,72]})],items:[it("sun","Sunlight","☀️","plant"),it("water","Water","💧","plant"),it("air","Air","💨","plant"),it("min","Minerals","💎","plant"),it("stone","Stone","🪨",null)]}]});
// Lesson 5: Food Maker Challenge
set(5,1,{scene:"leaf",keep:["Sunlight"],stages:[{type:"drop",zones:[z("factory","Leaf factory","🍃")],items:[it("sun","Sunlight card","☀️","factory"),it("stone","Stone","🪨",null)]}]});
set(5,2,{scene:"leaf",keep:["Water"],stages:[{type:"drop",zones:[z("leaf","Leaf","🍃",{at:[10,10,80,65]})],items:[it("water","Water card from xylem","💧","leaf"),it("food","Food","🍬",null)]}]});
set(5,3,{scene:"leaf",keep:["Air (CO₂)"],stages:[{type:"drop",zones:[z("stomata","Stomata sa dahon","🍃")],items:[it("air","Air / CO₂ card","💨","stomata"),it("water","Water","💧",null),it("stone","Stone","🪨",null)]}]});
set(5,4,{scene:"leaf",keep:[],stages:[{type:"drop",zones:[z("factory","Centre of leaf factory","🏭")],items:[it("sun","Sunlight","☀️","factory"),it("water","Water","💧","factory"),it("air","Air / CO₂","💨","factory"),it("stone","Stone","🪨",null)]}]});
set(5,5,{scene:"xs",keep:["Photosynthesis","Phloem"],stages:[{type:"connect",nodes:[nd("leaf","Leaf factory","🍃",20,25),nd("food","Sugar / food","🍬",75,25),nd("phloem","Phloem","🟢",75,75),nd("root","Roots","🌱",20,75)],edges:[["leaf","food"],["food","phloem"]]}]});
// Lesson 6: Root Collector
set(6,1,{scene:"root",keep:["Water"],stages:[{type:"drop",zones:[z("roots","Root area","🌿",{at:[8,40,84,56]})],items:[it("w1","Water drop","💧","roots"),it("w2","Water drop","💧","roots"),it("sun","Sunlight","☀️",null)]}]});
set(6,2,{scene:"root",keep:["Minerals"],stages:[{type:"drop",zones:[z("roots","Root area","🌿",{at:[8,40,84,56]})],items:[it("m1","Mineral card","💎","roots"),it("m2","Mineral card","🧂","roots"),it("sun","Sunlight","☀️",null)]}]});
set(6,3,{scene:"root",keep:[],stages:[{type:"drop",zones:[z("water","Water group","💧"),z("min","Mineral group","💎")],items:[it("w1","Water card","💧","water"),it("w2","Water card","💧","water"),it("m1","Mineral card","🧂","min"),it("m2","Mineral card","💎","min")]}]});
set(6,4,{scene:"root",keep:["Water","Minerals"],stages:[{type:"drop",zones:[z("stem","Stem pathway","🎋",{at:[28,5,45,70]})],items:[it("water","Water","💧","stem"),it("min","Minerals","💎","stem"),it("food","Food","🍬",null)]}]});
set(6,5,{scene:"root",keep:[],stages:[{type:"drop",zones:[z("finish","Mission complete","🏁")],items:[it("water","Delivered water","💧","finish"),it("min","Delivered minerals","💎","finish"),it("stone","Stone","🪨",null)]}]});
// Lesson 7: Nutrition Delivery
set(7,1,{scene:"garden",keep:["Water"],stages:[{type:"drop",zones:[z("stem","Stem lower pathway","🎋",{at:[38,25,25,52]})],items:[it("water","Water card","💧","stem"),it("food","Food card","🍬",null)]}]});
set(7,2,{scene:"garden",keep:["Water"],stages:[{type:"swipe"}]});
set(7,3,{scene:"garden",keep:["Food"],stages:[{type:"drop",zones:[z("stem","Stem upper pathway","🎋",{at:[38,25,25,52]})],items:[it("food","Food card","🍬","stem"),it("water","Water card","💧",null)]}]});
set(7,4,{scene:"garden",keep:["Food"],stages:[{type:"drop",zones:[z("roots","Roots","🌱",{at:[8,60,84,35]}),z("stem","Stem","🎋",{at:[38,25,25,50]})],items:[it("food1","Food card","🍬","roots"),it("food2","Food card","🍎","stem"),it("water","Water","💧",null)]}]});
set(7,5,{scene:"garden",keep:[],stages:[{type:"connect",nodes:[nd("roots","Roots","🌱",50,85),nd("stem","Stem","🎋",50,52),nd("leaves","Leaves","🍃",50,18),nd("food","Food travels","🍬",85,55)],edges:[["roots","stem"],["stem","leaves"],["leaves","food"]]}]});
// Lesson 8: Complete Plant Team
set(8,1,{scene:"garden",keep:[],stages:[{type:"drop",zones:[z("roots","Roots group","🌱"),z("stem","Stem group","🎋"),z("leaves","Leaves group","🍃")],items:[it("root","Roots","🌱","roots"),it("stemitem","Stem","🎋","stem"),it("leaf","Leaves","🍃","leaves")]}]});
set(8,2,{scene:"root",keep:["Water"],stages:[{type:"drop",zones:[z("roots","Roots sa yuta","🌱",{at:[8,40,84,56]})],items:[it("water","Water card","💧","roots"),it("sun","Sunlight","☀️",null)]}]});
set(8,3,{scene:"garden",keep:["Xylem","Phloem"],stages:[{type:"connect",nodes:[nd("roots","Roots","🌱",20,80),nd("xylem","Xylem ↑","🔵",50,55),nd("leaves","Leaves","🍃",80,20),nd("phloem","Phloem ↓","🟢",80,80)],edges:[["roots","xylem"],["xylem","leaves"],["leaves","phloem"]]}]});
set(8,4,{scene:"leaf",keep:["Photosynthesis"],stages:[{type:"drop",zones:[z("leaf","Leaf group / food factory","🍃")],items:[it("water","Water","💧","leaf"),it("sun","Sunlight","☀️","leaf"),it("air","Air / CO₂","💨","leaf"),it("stone","Stone","🪨",null)]}]});
set(8,5,{scene:"garden",keep:[],stages:[{type:"connect",nodes:[nd("roots","Roots","🌱",15,80),nd("stem","Stem","🎋",50,50),nd("leaves","Leaves","🍃",85,20),nd("plant","Whole plant","🪴",85,80)],edges:[["roots","stem"],["stem","leaves"],["leaves","plant"]]}]});
export default {...OLD,...d};
