// Simulation flow for the 10 sessions (from "Simulation flow for 10 sessions.docx").
// Step kinds: info (read + continue) | pick (tap the right ones) | drag (drag items to places)
//             order (tap in the correct order) | choose (put each item in a group) | remove (take something away and see what happens) | map
// Scene flags (s): sc (plant|xsec|leaf|parts) wilt sun water air nutr glow flow soil hair tall forces hide labels ...
const I=(t,s={})=>({k:"info",t,s});
const P=(t,opts,s={},hint)=>({k:"pick",t,opts,s,hint});
const D=(t,items,zones,s={})=>({k:"drag",t,items,zones,s});
const O=(t,items,s={})=>({k:"order",t,items,s});
const C=(t,bins,items,s={})=>({k:"choose",t,bins,items,s});
const R=(t,items,s={})=>({k:"remove",t,items,s});
const ok=(l,i)=>({l,i,ok:true}),no=(l,i)=>({l,i,ok:false});
const ZR=[24,56,52,40],ZFL=[37,16,26,16],ZFR=[54,42,18,14],ZLV=[14,34,72,19];

const SIM=[
{n:1,mission:"Help the Plant Survive!",steps:[
 I("Welcome, plant helper! This is a healthy Gumamela plant. Your mission: help the plant survive!"),
 P("What does a Gumamela plant need to live? Tap each of the four needs.",[ok("Water","💧"),ok("Sunlight","☀️"),ok("Air","🌬️"),ok("Nutrients","✨")]),
 R("Let's see what happens when a need is missing. Tap a need to take it away from the plant.",[
  {l:"Water",i:"💧",fx:{water:false,wilt:1},msg:"Without water, the Gumamela wilts. Its leaves droop and the flower hangs down."},
  {l:"Sunlight",i:"☀️",fx:{sun:false,wilt:1},msg:"Without sunlight, the plant cannot make its food. It becomes weak and pale."},
  {l:"Air",i:"🌬️",fx:{air:false,wilt:1},msg:"Without air (carbon dioxide), the plant cannot make food, so it wilts."},
  {l:"Nutrients",i:"✨",fx:{nutr:false,wilt:1},msg:"Without nutrients from the soil, the plant cannot grow strong and healthy."}]),
 P("Quick check! Which things are the basic needs of a plant? Tap all four.",[ok("Water","💧"),ok("Sunlight","☀️"),ok("Air","🌬️"),ok("Nutrients","✨"),no("Music","🎵"),no("Candy","🍬")],{},"Plants do not need music or candy to live."),
]},
{n:2,mission:"Root Absorption Mission",steps:[
 I("Here is a Gumamela plant. Look at its roots under the soil.",{glow:["roots"]}),
 I("Water and minerals are in the soil around the roots.",{soil:true}),
 D("Drag the water 💧 to the roots.",[{l:"Water",i:"💧",type:"water"}],[{id:"roots",l:"Roots",accepts:"water",box:ZR,fx:{flow:"water",glow:["roots"]},ok:"The roots take in the water!"}],{soil:true}),
 I("Look! The roots absorb the water, and the water moves up the plant.",{soil:true,flow:"water",glow:["roots"]}),
 I("Minerals enter the roots too. They are dissolved in the water.",{soil:true,flow:"water",glow:["roots"]}),
 I("Roots also anchor the plant. They hold the Gumamela firmly in the soil so it does not fall.",{soil:true,glow:["roots"]}),
 P("What are the three important jobs of roots? Tap all three.",[ok("Absorb water","💧"),ok("Absorb minerals","💎"),ok("Anchor the plant","⚓"),no("Make food","🍬"),no("Make flowers","🌺")],{soil:true},"Food is made in the leaves, and flowers grow at the top."),
]},
{n:3,mission:"Follow the Water!",steps:[
 I("Follow the water! Here is the soil with water in it.",{soil:true}),
 I("Meet the root hairs. They are tiny hairs on the roots that take in water.",{soil:true,hair:true}),
 D("Drag the water from the soil to the root hairs.",[{l:"Water",i:"💧",type:"water"}],[{id:"hair",l:"Root hairs",accepts:"water",box:[26,66,48,30],fx:{flow:"water"},ok:"The root hairs take in the water!"}],{soil:true,hair:true}),
 I("The water moves like this: Soil → Root hairs → Roots.",{soil:true,hair:true,flow:"water"}),
 I("Water helps the plant to grow, to make food (photosynthesis), and to carry nutrients.",{soil:true,flow:"water"}),
 O("Trace the path of the water. Tap in the correct order.",["Soil","Root hairs","Roots"],{soil:true,hair:true}),
]},
{n:4,mission:"Stem Highway",steps:[
 I("Here is the whole Gumamela plant."),
 I("Look at the stem. It is glowing.",{glow:["stem"]}),
 I("The stem connects the roots, the leaves, the flower, and the fruit.",{glow:["stem","roots","leaves","flower","fruit"]}),
 I("Water and food particles travel inside the stem.",{glow:["stem"],flow:"both"}),
 I("The stem carries them to the different parts of the plant.",{flow:"both"}),
 I("Think of it this way: the stem is a HIGHWAY 🛣️, and water and food are CARS 🚗.",{glow:["stem"],flow:"both"}),
 D("Guide the cars to the right places. Water goes up to the leaves. Food goes to the roots and to the flower.",
  [{l:"Water car",i:"💧",type:"water"},{l:"Food car",i:"🍬",type:"food"},{l:"Food car",i:"🍬",type:"food"}],
  [{id:"leaves",l:"Leaves",accepts:"water",box:ZLV,ok:"The water car reached the leaves!",no:"Water goes up to the leaves."},
   {id:"flower",l:"Flower",accepts:"food",box:ZFL,ok:"The food car reached the flower!",no:"Food goes to the roots and the flower."},
   {id:"roots",l:"Roots",accepts:"food",box:ZR,ok:"The food car reached the roots!",no:"Food goes to the roots and the flower."}],{glow:["stem"],flow:"both"}),
]},
{n:5,mission:"Xylem or Phloem?",steps:[
 I("This is a slice (cross-section) of a Gumamela stem.",{sc:"xsec"}),
 I("Inside the stem are two kinds of tubes: XYLEM (blue) and PHLOEM (orange).",{sc:"xsec",glow:["xylem","phloem"]}),
 C("Which tube carries each one? Choose Xylem or Phloem.",["Xylem","Phloem"],[{l:"Water",i:"💧",ans:"Xylem"},{l:"Minerals",i:"💎",ans:"Xylem"},{l:"Food",i:"🍬",ans:"Phloem"}],{sc:"xsec"}),
 I("Directions: Xylem carries water and minerals UP ⬆. Phloem carries food to all parts of the plant ⬆⬇.",{sc:"xsec",glow:["xylem","phloem"]}),
 C("Matching challenge! Match each job to Xylem or Phloem.",["Xylem","Phloem"],[{l:"Carries water up from the roots",i:"⬆",ans:"Xylem"},{l:"Carries food made in the leaves",i:"🍬",ans:"Phloem"},{l:"Carries minerals from the soil",i:"💎",ans:"Xylem"},{l:"Carries glucose to the roots and fruit",i:"🍎",ans:"Phloem"}],{sc:"xsec"}),
]},
{n:6,mission:"Build the Food!",steps:[
 I("Here is a green Gumamela leaf. The leaf is the food factory of the plant.",{sc:"leaf"}),
 I("To make food, the leaf needs three things: sunlight ☀️, water 💧, and carbon dioxide 🌬️.",{sc:"leaf"}),
 D("Drag the three materials to the leaf.",
  [{l:"Sunlight",i:"☀️",type:"mat",fx:{sunIn:true}},{l:"Water",i:"💧",type:"mat",fx:{waterIn:true}},{l:"Carbon dioxide",i:"🌬️",type:"mat",fx:{co2In:true}}],
  [{id:"leaf",l:"Leaf",accepts:"mat",cap:3,box:[10,32,80,50],ok:"The leaf received it!"}],{sc:"leaf"}),
 I("Photosynthesis starts! The leaf uses sunlight to change water and carbon dioxide into food.",{sc:"leaf",sunIn:true,waterIn:true,co2In:true,start:true}),
 I("The food that is formed is called glucose 🍬.",{sc:"leaf",sunIn:true,waterIn:true,co2In:true,start:true,food:true}),
 I("The leaf also releases oxygen (O₂) 🫧.",{sc:"leaf",start:true,food:true,o2:true}),
 I("Tiny holes called stomata take in carbon dioxide and let oxygen out.",{sc:"leaf",start:true,food:true,o2:true,stoma:true,co2In:true}),
 P("Final challenge! Which materials are needed for photosynthesis? Tap all three.",[ok("Sunlight","☀️"),ok("Water","💧"),ok("Carbon dioxide","🌬️"),no("Glucose","🍬"),no("Oxygen","🫧")],{sc:"leaf"},"Glucose and oxygen are made by the leaf. They are not needed to start."),
]},
{n:7,mission:"Water to the Top!",steps:[
 I("Look at this tall Gumamela plant. The water starts in the soil.",{tall:true,soil:true}),
 I("The water follows this path: Soil → Roots → Xylem → Stem → Leaves.",{tall:true,soil:true,flow:"water",glow:["roots","stem","leaves"]}),
 I("Root Pressure pushes the water upward from the roots.",{tall:true,soil:true,flow:"water",forces:"root"}),
 I("Capillary Action helps the water climb up inside the very thin xylem tubes.",{tall:true,flow:"water",forces:"cap"}),
 I("Transpiration Pull: when water leaves the leaves as vapor, it pulls more water up from below.",{tall:true,flow:"water",forces:"pull"}),
 I("Together, they help the water reach the leaves, even in a tall Gumamela plant!",{tall:true,flow:"water",forces:"all"}),
 P("Which things help the water move upward? Tap all of them.",[ok("Root Pressure","⬆"),ok("Capillary Action","🧪"),ok("Transpiration Pull","🍃"),no("Gravity","⬇"),no("Soil color","🟤")],{tall:true,flow:"water"},"Gravity pulls things down, so it does not help the water go up."),
]},
{n:8,mission:"Deliver the Food!",steps:[
 I("The leaves of the Gumamela plant are making food.",{glow:["leaves"]}),
 I("The food is a sugar called glucose 🍬.",{glow:["leaves"]}),
 I("The food travels through the tubes called phloem.",{glow:["stem"]}),
 D("Drag the food from the leaves into the phloem (the stem).",[{l:"Food",i:"🍬",type:"food"}],[{id:"phloem",l:"Phloem",accepts:"food",box:[40,28,20,28],fx:{flow:"food"},ok:"The food entered the phloem!"}],{glow:["leaves"]}),
 I("The food moves toward the roots, the flower, the fruit, and the other parts.",{flow:"food",glow:["roots","flower","fruit"]}),
 I("This movement of food is called translocation.",{flow:"food"}),
 D("Deliver the food to the correct plant parts: the roots, the flower, and the fruit.",
  [{l:"Food",i:"🍬",type:"food"},{l:"Food",i:"🍬",type:"food"},{l:"Food",i:"🍬",type:"food"}],
  [{id:"roots",l:"Roots",accepts:"food",box:ZR,ok:"The roots got food!"},{id:"flower",l:"Flower",accepts:"food",box:ZFL,ok:"The flower got food!"},{id:"fruit",l:"Fruit",accepts:"food",box:ZFR,ok:"The fruit got food!"}],{flow:"food"}),
]},
{n:9,mission:"Plant Teamwork Challenge",steps:[
 I("Here are the roots, the stem, and the leaves of the Gumamela plant, one by one.",{sc:"parts"}),
 I("Each part has its own job: the roots take in water and minerals, the stem transports, and the leaves make food.",{sc:"parts",labels:true}),
 D("Connect each job to the right part. Drag the job to its part.",
  [{l:"Water and minerals",i:"💧",type:"roots"},{l:"Transport",i:"🚚",type:"stem"},{l:"Food",i:"🍬",type:"leaves"}],
  [{id:"roots",l:"Roots",accepts:"roots",box:[2.5,4,31,79],ok:"Yes! Roots take in water and minerals."},{id:"stem",l:"Stem",accepts:"stem",box:[35,4,31,79],ok:"Yes! The stem transports."},{id:"leaves",l:"Leaves",accepts:"leaves",box:[67.5,4,31,79],ok:"Yes! Leaves make food."}],{sc:"parts"}),
 I("The water moves like this: Roots → Xylem → Leaves.",{flow:"water",glow:["roots","stem","leaves"],labels:true}),
 I("The food moves like this: Leaves → Phloem → the whole plant.",{flow:"food",glow:["leaves","stem","roots"],labels:true}),
 R("What if one part is missing? Tap a part to take it away and see what happens.",[
  {l:"Roots",i:"🌱",fx:{hide:"roots",wilt:1},msg:"No roots: the plant cannot take in water and minerals, and it cannot stand firmly. It wilts."},
  {l:"Stem",i:"🌿",fx:{hide:"stem",wilt:1},msg:"No stem: water and food cannot travel between the roots and the leaves."},
  {l:"Leaves",i:"🍃",fx:{hide:"leaves",wilt:1},msg:"No leaves: the plant cannot make food, so it becomes weak."}]),
 C("Teamwork challenge! Which part does each job?",["Roots","Stem","Leaves"],[{l:"Takes in water from the soil",i:"💧",ans:"Roots"},{l:"Carries water and food",i:"🚚",ans:"Stem"},{l:"Makes food",i:"🍬",ans:"Leaves"},{l:"Holds the plant in the soil",i:"⚓",ans:"Roots"}],{}),
]},
{n:10,mission:"Inside the Plant: Transport Adventure",steps:[
 I("Welcome to the Transport Adventure! This is a complete Gumamela plant with its transport system.",{labels:true}),
 I("Our journey starts with water and minerals in the soil.",{soil:true,glow:["roots"]}),
 O("Follow the path of water and minerals. Tap in the correct order.",["Roots","Xylem","Stem","Leaves"],{soil:true,flow:"water"}),
 I("Three forces help the water go up: Root Pressure, Capillary Action, and Transpiration Pull.",{tall:true,flow:"water",forces:"all"}),
 I("In the leaves, photosynthesis starts using sunlight, water, and carbon dioxide.",{sc:"leaf",sunIn:true,waterIn:true,co2In:true,start:true}),
 I("The leaves make food (glucose) and release oxygen.",{sc:"leaf",start:true,food:true,o2:true,stoma:true}),
 I("The food moves through the phloem.",{flow:"food",glow:["stem"]}),
 O("Follow the path of food. Tap in the correct order.",["Leaves","Phloem","Whole plant"],{flow:"food"}),
 O("Final challenge! Connect the complete transport pathway. Tap the steps in the correct order.",["Water and minerals enter the roots","Water rises through the xylem","The leaves make food","The phloem carries the food","The whole plant uses the food"],{flow:"both"}),
 {k:"map",t:"Great job! Here is the final concept map of the complete transport system of the Gumamela plant.",s:{}},
]},
];
export default SIM;
