// Game content for all 10 sessions, taken from Game_Content.docx (client text).
// Every text has a Bisaya (b) and an English (e) version.
// To change any wording, edit it here. The interactions themselves are in game_stages.js.
const G=[
 {
  "n": 1,
  "title": "Plant Needs Quest",
  "mission": {
   "b": "Tabangi ang Plant nga Mahimong Healthy"
  },
  "done": {
   "b": "🏆 100% MASTERY ACHIEVED! Sakto ang tanang lima ka challenge. 🔓 Na-unlock na ang Story sa Session 1.",
   "e": "🏆 100% MASTERY ACHIEVED! All five challenges are correct. 🔓 The story for Session 1 is now unlocked."
  },
  "ch": [
   {
    "t": "💧 Hatagi og Water ang Plant",
    "p": {
     "b": "Uga ang soil. Unsa ang kinahanglan sa plant?",
     "e": "The soil is dry. What does the plant need?"
    },
    "i": {
     "b": "Drag Water ngadto sa plant.",
     "e": "Drag the Water card to the plant to help with the dry soil."
    },
    "ok": {
     "b": "💧 Sakto! Ang plant kinahanglan og water para motubo ug mabuhi.",
     "e": "💧 Correct! The plant needs water to grow and survive."
    },
    "bad": {
     "b": "Dili pa sakto! Hunahunaa unsay kulang sa uga nga soil ug unsay masuhop sa roots.",
     "e": "Not quite yet! Think about what is missing from dry soil and what the roots absorb."
    },
    "clue": {
     "b": "Hunahunaa unsay kasagarang kulang sa yuta kon uga na kini. Unsa ang kinahanglan masulod sa roots?",
     "e": "Think about what is usually missing when soil is dry. What needs to enter the roots?"
    }
   },
   {
    "t": "☀️ Pangitaa ang Sunlight",
    "p": {
     "b": "Tabangan nato ang plant nga makadawat og sunlight.",
     "e": "Let’s help the plant receive sunlight."
    },
    "i": {
     "b": "I-drag ang object palayo sa plant.",
     "e": "Drag the object blocking the light away from the plant so sunlight can reach it."
    },
    "ok": {
     "b": "☀️ Sakto! Ang plants nagkinahanglan og sunlight para makahimo og food.",
     "e": "☀️ Correct! Plants need sunlight to make food."
    },
    "bad": {
     "b": "Dili pa sakto! Pangitaa ang butang nga nagbabag sa sunlight ug tangtanga kini sa agianan.",
     "e": "Not quite yet! Find the object blocking sunlight and move it out of the way."
    },
    "clue": {
     "b": "Tan-awa unsay nagtabon sa kahayag ibabaw sa plant. Unsa ang makapugong sa kahayag?",
     "e": "Look at what is blocking the light above the plant. What could be stopping the light?"
    }
   },
   {
    "t": "🌬️ Hatagi og Air ang Plant",
    "p": {
     "b": "Kinahanglan sa plant ang carbon dioxide gikan sa air. Ablihi ang lugar.",
     "e": "The plant needs carbon dioxide from the air. Open the area."
    },
    "i": {
     "b": "I-slide ang window para maablihan.",
     "e": "Slide the window to the open position so carbon dioxide can enter."
    },
    "ok": {
     "b": "🌬️ Sakto! Ang plant mogamit og carbon dioxide gikan sa air.",
     "e": "🌬️ Correct! The plant uses carbon dioxide from the air."
    },
    "bad": {
     "b": "Dili pa sakto! Hinumdomi nga ang plant nagkuha og carbon dioxide gikan sa hangin pinaagi sa gagmayng lungag sa leaves.",
     "e": "Not quite yet! Remember that plants take in carbon dioxide from the air through tiny openings in leaves."
    },
    "clue": {
     "b": "Hunahunaa unsang gas gikan sa hangin gigamit sa plant sa paghimo og food.",
     "e": "Think about which gas from the air the plant uses to make food."
    }
   },
   {
    "t": "🌱 Ibutang ang Nutrients",
    "p": {
     "b": "Tabangi ang plant. Ibutang ang nutrients sa soil.",
     "e": "Help the plant. Put the nutrients in the soil."
    },
    "i": {
     "b": "I-drag ang nutrients/minerals ngadto sa soil.",
     "e": "Drag the nutrients/minerals card into the soil near the roots."
    },
    "ok": {
     "b": "🌱 Sakto! Ang plant makakuha og minerals gikan sa soil.",
     "e": "🌱 Correct! The plant gets minerals from the soil."
    },
    "bad": {
     "b": "Dili pa sakto! Pangitaa ang card nga nagrepresentar sa mineral nutrients nga naa sa soil.",
     "e": "Not quite yet! Find the card representing mineral nutrients in the soil."
    },
    "clue": {
     "b": "Ang soil naghatag og tubig ug dissolved minerals. Unsang card ang nagrepresentar sa mineral nutrients?",
     "e": "Soil provides water and dissolved minerals. Which card represents mineral nutrients?"
    }
   },
   {
    "t": "🌿 Complete the Plant Needs",
    "p": {
     "b": "I-connect ang tanan nga kinahanglan sa plant.",
     "e": "Connect everything the plant needs."
    },
    "i": {
     "b": "I-connect Water, Sunlight, Air, ug Nutrients ngadto sa plant.",
     "e": "Connect Water, Sunlight, Air, and Nutrients to the plant; complete all four connections."
    },
    "ok": {
     "b": "🌿 Mission Complete! Nakita na nimo ang four basic needs sa plant.",
     "e": "🌿 Mission Complete! You have identified the plant’s four basic needs."
    },
    "bad": {
     "b": "Dili pa sakto! Susiha pag-usab ang upat ka panginahanglan ug ang papel sa matag usa.",
     "e": "Not quite yet! Review the four needs and the role of each one."
    },
    "clue": {
     "b": "Ipares ang matag panginahanglan sa plant sa papel niini: paghimo og food, pagkuha sa materyales, ug pagtubo.",
     "e": "Match each plant need to its role: making food, obtaining materials, and growing."
    }
   }
  ]
 },
 {
  "n": 2,
  "title": "Root Rescue",
  "mission": {
   "b": "Tabangi ang Roots"
  },
  "done": {
   "b": "🏆 100% MASTERY ACHIEVED! Sakto ang tanang lima ka challenge. 🔓 Na-unlock na ang Story sa Session 2.",
   "e": "🏆 100% MASTERY ACHIEVED! All five challenges are correct. 🔓 The story for Session 2 is now unlocked."
  },
  "ch": [
   {
    "t": "💧 Collect Water and Minerals",
    "p": {
     "b": "I-drag ang water ug minerals padulong sa roots.",
     "e": "Drag the water and minerals toward the roots."
    },
    "i": {
     "b": "Drag and collect.",
     "e": "Drag the water and mineral droplets to the root area for the plant to take them in."
    },
    "ok": {
     "b": "💧🧂 Sakto! Ang roots mo-absorb og water ug minerals.",
     "e": "💧🧂 Correct! The roots absorb water and minerals."
    },
    "bad": {
     "b": "Dili pa sakto! Hunahunaa kung asa gikan ang water ug minerals nga masuhop sa plant.",
     "e": "Not quite yet! Think about where the water and minerals absorbed by the plant come from."
    },
    "clue": {
     "b": "Ang parte sa plant nga naa ilalom sa yuta makatabang sa pagkuha sa mga materyales gikan sa soil.",
     "e": "The plant part underground helps take in materials from the soil."
    }
   },
   {
    "t": "⚓ Anchor the Plant",
    "p": {
     "b": "Tabangi ang plant nga dili matumba.",
     "e": "Help the plant stay upright and not fall over."
    },
    "i": {
     "b": "I-drag ang roots paubos ngadto sa soil.",
     "e": "Drag the root structure down into the soil so the plant stays anchored and does not fall over."
    },
    "ok": {
     "b": "⚓ Sakto! Ang roots mo-anchor sa plant.",
     "e": "⚓ Correct! The roots anchor the plant in the soil."
    },
    "bad": {
     "b": "Dili pa sakto! Ang plant kinahanglan og bahin nga mokupot niini sa soil.",
     "e": "Not quite yet! The plant needs a part that holds it in the soil."
    },
    "clue": {
     "b": "Hunahunaa unsay nagkupot sa plant sa yuta aron dili kini dali matumba.",
     "e": "Think about what holds the plant in the soil so it does not fall over easily."
    }
   },
   {
    "t": "🔬 Find the Root Hairs",
    "p": {
     "b": "Pangitaa ang gagmay nga structures sa root.",
     "e": "Find the tiny structures on the root."
    },
    "i": {
     "b": "I-zoom ug i-tap ang root hairs.",
     "e": "Zoom in on the root image, then tap the tiny root hairs."
    },
    "ok": {
     "b": "🔬 Sakto! Ang root hairs makatabang sa water absorption.",
     "e": "🔬 Correct! Root hairs help absorb water."
    },
    "bad": {
     "b": "Dili pa sakto! I-zoom ang gawas nga bahin sa root ug pangitaa ang gagmayng buhok-sama nga pagtubo.",
     "e": "Not quite yet! Zoom in on the root surface and look for tiny hair-like growths."
    },
    "clue": {
     "b": "I-zoom ang gagmayng buhok-sama nga pagtubo duol sa ibabaw sa root.",
     "e": "Zoom in on the tiny hair-like growths near the root surface."
    }
   },
   {
    "t": "🌱 Match the Root Jobs",
    "p": {
     "b": "I-match ang water, minerals, ug anchoring sa ilang sakto nga jobs.",
     "e": "Match water, minerals, and anchoring with their correct functions."
    },
    "i": {
     "b": "Drag and connect.",
     "e": "Drag the labels for water absorption, mineral absorption, and anchoring to the matching root-job cards."
    },
    "ok": {
     "b": "🌱 Sakto! Absorb water, absorb minerals, ug anchor the plant.",
     "e": "🌱 Correct! The roots absorb water, absorb minerals, and anchor the plant."
    },
    "bad": {
     "b": "Dili pa sakto! Ipares ang matag root job sa sakto nga aksyon.",
     "e": "Not quite yet! Match each root job to the correct action."
    },
    "clue": {
     "b": "Ipares ang pagkuha sa water, pagkuha sa minerals, ug pagpabiling lig-on sa ilang mga hulagway.",
     "e": "Match water uptake, mineral uptake, and keeping the plant steady to their pictures."
    }
   },
   {
    "t": "🌱 Complete the Root System",
    "p": {
     "b": "Ibutang ang sakto nga picture sa matag root job.",
     "e": "Place the correct picture beside each root function."
    },
    "i": {
     "b": "Water → Absorb Water; Minerals → Absorb Minerals; Roots → Anchor.",
     "e": "Place the pictures of water, minerals, and roots beside the functions they show."
    },
    "ok": {
     "b": "🌱 Root Rescue Complete!",
     "e": "🌱 Root Rescue Complete!"
    },
    "bad": {
     "b": "Dili pa sakto! Tan-awa pag-usab kung unsang hulagway ang nagpakita sa matag root function.",
     "e": "Not quite yet! Review which picture shows each root function."
    },
    "clue": {
     "b": "Hunahunaa kung unsang root function ang makita sa matag card; dili pareho ang tanang function.",
     "e": "Think about which root function each card shows; the functions are not all the same."
    }
   }
  ]
 },
 {
  "n": 3,
  "title": "Water Path",
  "mission": {
   "b": "Tabangi ang Water nga Makasulod sa Plant"
  },
  "done": {
   "b": "🏆 100% MASTERY ACHIEVED! Sakto ang tanang lima ka challenge. 🔓 Na-unlock na ang Story sa Session 3.",
   "e": "🏆 100% MASTERY ACHIEVED! All five challenges are correct. 🔓 The story for Session 3 is now unlocked."
  },
  "ch": [
   {
    "t": "🌧️ Collect the Water",
    "p": {
     "b": "Kuhaa ang water gikan sa rain.",
     "e": "Collect the water from the rain."
    },
    "i": {
     "b": "I-move ang container aron masalo ang water.",
     "e": "Move the container under the raindrops to collect the water."
    },
    "ok": {
     "b": "💧 Sakto! Nakuha nimo ang water.",
     "e": "💧 Correct! You collected the water."
    },
    "bad": {
     "b": "Dili pa sakto! Ibutang ang container sa ilawom sa droplets aron masalo ang rainwater.",
     "e": "Not quite yet! Place the container under the droplets to catch rainwater."
    },
    "clue": {
     "b": "Ang water kinahanglan una makasulod gikan sa soil. Pangitaa ang bahin sa root nga adunay daghang gagmayng pagtubo.",
     "e": "Water must first enter from the soil. Look for the root area with many tiny projections."
    }
   },
   {
    "t": "🔬 Find the Entry Point",
    "p": {
     "b": "Asa mosulod ang water sa plant?",
     "e": "Where does water enter the plant?"
    },
    "i": {
     "b": "I-drag ang water ngadto sa root hairs.",
     "e": "Drag the water droplets from the soil to the root hairs in the picture."
    },
    "ok": {
     "b": "💧 Sakto! Ang root hairs mo-absorb sa water.",
     "e": "💧 Correct! Root hairs absorb water."
    },
    "bad": {
     "b": "Dili pa sakto! Pangitaa ang gagmayng root hairs nga direktang duol sa soil.",
     "e": "Not quite yet! Look for the tiny root hairs in contact with the soil."
    },
    "clue": {
     "b": "Ang tubig gikan sa soil mosulod sa plant pinaagi sa root surface, ilabi na sa gagmayng root hairs.",
     "e": "Water from the soil enters through the root surface, especially the tiny root hairs."
    }
   },
   {
    "t": "🔍 Zoom the Root Hairs",
    "p": {
     "b": "I-zoom ug pangitaa kung asa moagi ang water.",
     "e": "Zoom in and find where the water passes through."
    },
    "i": {
     "b": "Zoom → Tap the root hairs.",
     "e": "Zoom in on the root area and tap the root hairs shown in the image."
    },
    "ok": {
     "b": "🔬 Sakto! Nakita nimo ang entry point.",
     "e": "🔬 Correct! You found the entry point."
    },
    "bad": {
     "b": "Dili pa sakto! Susiha ang gipadakong root image ug pangitaa ang gagmayng hair-like structures.",
     "e": "Not quite yet! Check the enlarged root image for tiny hair-like structures."
    },
    "clue": {
     "b": "Palapdi ang hulagway sa root ug pangitaa ang pinong buhok-sama nga bahin nga duol sa soil.",
     "e": "Enlarge the root image and look for the fine hair-like parts touching the soil."
    }
   },
   {
    "t": "🛤️ Build the Water Path",
    "p": {
     "b": "I-arrange ang pathway sa sakto nga order.",
     "e": "Arrange the pathway in the correct order."
    },
    "i": {
     "b": "Soil → Root Hairs → Roots.",
     "e": "Arrange the cards in the order water follows from the soil into the root."
    },
    "ok": {
     "b": "🛤️ Sakto nga pathway!",
     "e": "🛤️ Correct pathway!"
    },
    "bad": {
     "b": "Dili pa sakto! Hunahunaa ang unang lakang sa tubig sa dili pa kini mosulod sa plant.",
     "e": "Not quite yet! Think about the first step water takes before entering the plant."
    },
    "clue": {
     "b": "Sugdi sa gawas sa plant, dayon sundi ang tubig padulong sa root. Unsa ang una niini maagian?",
     "e": "Start outside the plant, then follow water toward the root. What does it pass first?"
    }
   },
   {
    "t": "💧 Guide the Water",
    "p": {
     "b": "I-guide ang water gikan sa soil padulong sa roots.",
     "e": "Guide the water from the soil to the roots."
    },
    "i": {
     "b": "Drag: Soil → Root Hairs → Roots.",
     "e": "Drag the water droplets along the path from soil to root hairs and then into the roots."
    },
    "ok": {
     "b": "💧 Water Path Complete!",
     "e": "💧 Water Path Complete!"
    },
    "bad": {
     "b": "Dili pa sakto! Sunda ang water droplets sa matag lakang; ayaw laktawi ang entry point.",
     "e": "Not quite yet! Follow the water droplets step by step; do not skip the entry point."
    },
    "clue": {
     "b": "Sunda ang mga arrow gikan sa soil. Ang tubig dili molukso diretso sa dahon.",
     "e": "Follow the arrows from the soil. Water does not jump straight to the leaf."
    }
   }
  ]
 },
 {
  "n": 4,
  "title": "Stem Highway",
  "mission": {
   "b": "Ayuhon ang Plant Highway"
  },
  "done": {
   "b": "🏆 100% MASTERY ACHIEVED! Sakto ang tanang lima ka challenge. 🔓 Na-unlock na ang Story sa Session 4.",
   "e": "🏆 100% MASTERY ACHIEVED! All five challenges are correct. 🔓 The story for Session 4 is now unlocked."
  },
  "ch": [
   {
    "t": "🛡️ Support the Plant",
    "p": {
     "b": "Tabangi ang stem nga mapabilin nga upright.",
     "e": "Help the stem keep the plant upright."
    },
    "i": {
     "b": "Ibutang ang support pieces sa stem.",
     "e": "Place the support pieces on the stem so the plant stands upright."
    },
    "ok": {
     "b": "🛡️ Sakto!",
     "e": "🛡️ Correct!"
    },
    "bad": {
     "b": "Dili pa sakto! Pangitaa ang stem nga nagkupot sa leaves ug nagkonektar sa roots.",
     "e": "Not quite yet! Find the stem that holds the leaves and connects to the roots."
    },
    "clue": {
     "b": "Pangitaa ang taas nga plant part nga nagkupot sa leaves ug nagkonektar niini sa roots.",
     "e": "Find the upright plant part that holds the leaves and connects them to the roots."
    }
   },
   {
    "t": "🔗 Connect the Plant Parts",
    "p": {
     "b": "I-connect ang stem sa mga plant parts.",
     "e": "Connect the stem to the plant parts."
    },
    "i": {
     "b": "Draw connections.",
     "e": "Draw connections from the stem to the roots and leaves to show how they are related."
    },
    "ok": {
     "b": "🔗 Sakto!",
     "e": "🔗 Correct!"
    },
    "bad": {
     "b": "Dili pa sakto! Ang stem konektado sa roots sa ubos ug leaves sa ibabaw.",
     "e": "Not quite yet! The stem connects to the roots below and the leaves above."
    },
    "clue": {
     "b": "Ikonektar ang ubos nga bahin sa plant ngadto sa dahon pinaagi sa sentrong support structure.",
     "e": "Connect the lower part of the plant to the leaves through the central support structure."
    }
   },
   {
    "t": "🛣️ Repair the Highway",
    "p": {
     "b": "Ayuhon ang highway aron makaagi ang materials.",
     "e": "Repair the highway so materials can pass through."
    },
    "i": {
     "b": "I-drag ang missing stem pieces sa sakto nga lugar.",
     "e": "Drag the missing stem pieces into the gaps to reconnect the pathway."
    },
    "ok": {
     "b": "🛣️ Highway repaired!",
     "e": "🛣️ Highway repaired!"
    },
    "bad": {
     "b": "Dili pa sakto! Ipares ang piraso sa porma sa gintang aron mahimong padayon ang stem.",
     "e": "Not quite yet! Match the piece to the gap so the stem becomes continuous."
    },
    "clue": {
     "b": "Tan-awa ang gintang sa agianan. Asa nga piraso ang mohaom aron magpadayon ang transport?",
     "e": "Look at the gap in the pathway. Which piece fits so transport can continue?"
    }
   },
   {
    "t": "🚚 Move the Materials",
    "p": {
     "b": "I-guide ang materials pinaagi sa stem.",
     "e": "Guide the materials through the stem."
    },
    "i": {
     "b": "Drag water and food along the pathway.",
     "e": "Drag the water and food icons along their appropriate transport pathways in the stem."
    },
    "ok": {
     "b": "🚚 Sakto!",
     "e": "🚚 Correct!"
    },
    "bad": {
     "b": "Dili pa sakto! Bulaga ang pathway sa water/minerals ug ang pathway sa sugars.",
     "e": "Not quite yet! Separate the water/mineral pathway from the sugar pathway."
    },
    "clue": {
     "b": "Adunay duha ka klase sa materyales: water ug minerals, ug sugars/food. Sunda ang matag usa sa agianan niini.",
     "e": "There are two kinds of materials: water and minerals, and sugars/food. Follow each along its pathway."
    }
   },
   {
    "t": "🌿 Complete the Stem Jobs",
    "p": {
     "b": "Ibutang ang sakto nga picture sa Support, Connection, ug Transport.",
     "e": "Place the correct picture under Support, Connection, and Transport."
    },
    "i": {
     "b": "Drag the correct cards.",
     "e": "Place each picture showing support, connection, and transport under the correct label."
    },
    "ok": {
     "b": "🌿 Stem Highway Complete!",
     "e": "🌿 Stem Highway Complete!"
    },
    "bad": {
     "b": "Dili pa sakto! Basaha ang tulo ka labels ug tan-awa kung unsang function ang gipakita sa matag hulagway.",
     "e": "Not quite yet! Read the three labels and check which function each picture shows."
    },
    "clue": {
     "b": "Ipares ang Support, Connection, ug Transport sa mga hulagway nga nagpakita sa ilang function.",
     "e": "Match Support, Connection, and Transport to the pictures that show those functions."
    }
   }
  ]
 },
 {
  "n": 5,
  "title": "Xylem vs. Phloem",
  "mission": null,
  "done": {
   "b": "🏆 100% MASTERY ACHIEVED! Sakto ang tanang lima ka challenge. 🔓 Na-unlock na ang Story sa Session 5.",
   "e": "🏆 100% MASTERY ACHIEVED! All five challenges are correct. 🔓 The story for Session 5 is now unlocked."
  },
  "ch": [
   {
    "t": "🔵 Find the Xylem",
    "p": {
     "b": "Pangitaa ang xylem.",
     "e": "Find the xylem."
    },
    "i": {
     "b": "I-tap ang xylem.",
     "e": "Tap the transport tissue that carries water and dissolved minerals."
    },
    "ok": {
     "b": "🔵 Sakto! Ang xylem nagdala og water ug minerals.",
     "e": "🔵 Correct! The xylem transports water and minerals."
    },
    "bad": {
     "b": "Dili pa sakto! Pangitaa ang tissue nga nagdala sa water ug dissolved minerals gikan sa roots.",
     "e": "Not quite yet! Find the tissue that carries water and dissolved minerals from the roots."
    },
    "clue": {
     "b": "Pangitaa ang agianan sa stem nga nagdala sa water ug dissolved minerals gikan sa roots.",
     "e": "Find the stem pathway that carries water and dissolved minerals from the roots."
    }
   },
   {
    "t": "🟢 Find the Phloem",
    "p": {
     "b": "Pangitaa ang phloem.",
     "e": "Find the phloem."
    },
    "i": {
     "b": "I-tap ang phloem.",
     "e": "Tap the transport tissue that carries sugars/food from the leaves."
    },
    "ok": {
     "b": "Sakto! Ang phloem nagdala sa sugars ug ubang organic substances.",
     "e": "Correct! Phloem carries sugars and other organic substances."
    },
    "bad": {
     "b": "Dili pa sakto! Ang sugars nga gihimo sa leaves gigamit sa ubang plant parts; pangitaa ang food pathway.",
     "e": "Not quite yet! Sugars made in leaves are used by other plant parts; find the food pathway."
    },
    "clue": {
     "b": "Ang laing agianan nagdala sa sugars nga gihimo sa leaves. Pangitaa kini nga label.",
     "e": "The other pathway carries sugars made in the leaves. Look for that label."
    }
   },
   {
    "t": "📦 Sort the Materials",
    "p": {
     "b": "I-sort ang materials sa sakto nga pathway.",
     "e": "Sort the materials into the correct pathways."
    },
    "i": {
     "b": "Water → Xylem; Minerals → Xylem; Food → Phloem.",
     "e": "Sort Water and Minerals into Xylem, and Sugars/Food into Phloem."
    },
    "ok": {
     "b": "📦 Sakto!",
     "e": "📦 Correct!"
    },
    "bad": {
     "b": "Dili pa sakto! Hinumdomi: ang water ug minerals lahi og pathway sa sugars.",
     "e": "Not quite yet! Remember that water and minerals use a different pathway from sugars."
    },
    "clue": {
     "b": "Hunahunaa kung asa moagi ang water ug minerals, ug asa moagi ang sugars.",
     "e": "Think about which pathway water and minerals use and which pathway sugars use."
    }
   },
   {
    "t": "⬆️ Follow the Xylem",
    "p": {
     "b": "I-guide ang water gikan sa roots paingon sa leaves.",
     "e": "Guide the water from the roots to the leaves."
    },
    "i": {
     "b": "Trace Roots → Xylem → Leaves.",
     "e": "Trace the pathway from Roots to Xylem and then to Leaves."
    },
    "ok": {
     "b": "⬆️ Sakto!",
     "e": "⬆️ Correct!"
    },
    "bad": {
     "b": "Dili pa sakto! Sunda ang water gikan sa roots padulong sa leaves ug pangitaa ang tissue nga agianan niini.",
     "e": "Not quite yet! Follow water from the roots toward the leaves and find its transport tissue."
    },
    "clue": {
     "b": "Sunda ang tubig gikan sa roots padulong sa ibabaw. Asa nga transport tissue ang gamiton niini?",
     "e": "Follow water from the roots upward. Which transport tissue does it use?"
    }
   },
   {
    "t": "🍬 Follow the Phloem",
    "p": {
     "b": "I-guide ang food gikan sa leaves ngadto sa ubang parts sa plant.",
     "e": "Guide the food from the leaves to the other parts of the plant."
    },
    "i": {
     "b": "Connect Leaves → Phloem → Whole Plant.",
     "e": "Connect Leaves to Phloem and then to the other plant parts."
    },
    "ok": {
     "b": "🍬 Transport Sorting Complete!",
     "e": "🍬 Transport Sorting Complete!"
    },
    "bad": {
     "b": "Dili pa sakto! Ang food gikan sa leaves kinahanglan moagi sa phloem aron maabot ang ubang parts.",
     "e": "Not quite yet! Food from leaves must travel through phloem to reach other parts."
    },
    "clue": {
     "b": "Ang leaves makahimo og sugars, ug kinahanglan kini madala ngadto sa ubang bahin sa plant. Sunda ang agianan sa food.",
     "e": "Leaves make sugars, and these must be carried to other plant parts. Follow the food pathway."
    }
   }
  ]
 },
 {
  "n": 6,
  "title": "Leaf Food Factory",
  "mission": {
   "b": "Tabangi ang Leaf nga Makahimo og Food"
  },
  "done": {
   "b": "🏆 100% MASTERY ACHIEVED! Sakto ang tanang lima ka challenge. 🔓 Na-unlock na ang Story sa Session 6.",
   "e": "🏆 100% MASTERY ACHIEVED! All five challenges are correct. 🔓 The story for Session 6 is now unlocked."
  },
  "ch": [
   {
    "t": "☀️ Catch the Sunlight",
    "p": {
     "b": "Tabangi ang leaf nga makadawat og sunlight.",
     "e": "Help the leaf receive sunlight."
    },
    "i": {
     "b": "I-move ang leaf ngadto sa sunlight.",
     "e": "Drag the leaf to the area receiving sunlight."
    },
    "ok": {
     "b": "☀️ Sakto!",
     "e": "☀️ Correct!"
    },
    "bad": {
     "b": "Dili pa sakto! Ang leaf kinahanglan makadawat og kahayag aron makapadayon sa food-making process.",
     "e": "Not quite yet! The leaf needs light to continue the food-making process."
    },
    "clue": {
     "b": "Ang dahon naggamit sa kahayag aron makahimo og food. Ibutang kini sa dapit diin modawat kini og kahayag.",
     "e": "The leaf uses light to make food. Place it where it can receive light."
    }
   },
   {
    "t": "💧 Bring the Water",
    "p": {
     "b": "I-guide ang water gikan sa xylem ngadto sa leaf.",
     "e": "Guide the water from the xylem to the leaf."
    },
    "i": {
     "b": "Drag the water.",
     "e": "Drag water from the xylem pathway to the leaf."
    },
    "ok": {
     "b": "💧 Sakto!",
     "e": "💧 Correct!"
    },
    "bad": {
     "b": "Dili pa sakto! Sunda ang water pathway gikan sa roots ug xylem hangtod sa leaf.",
     "e": "Not quite yet! Follow the water pathway from roots through xylem to the leaf."
    },
    "clue": {
     "b": "Ang water gikan sa roots mosaka sa usa ka transport tissue. Sunda ang agianan nga moabot sa leaf.",
     "e": "Water from the roots moves up through a transport tissue. Follow the pathway that reaches the leaf."
    }
   },
   {
    "t": "🌬️ Open the Stomata",
    "p": {
     "b": "Ablihi ang stomata para makasulod ang carbon dioxide.",
     "e": "Open the stomata so carbon dioxide can enter."
    },
    "i": {
     "b": "Tap the stomata.",
     "e": "Tap the stomata on the leaf illustration to show the gas-entry route."
    },
    "ok": {
     "b": "Sakto! Ang stomata motugot sa gas exchange; carbon dioxide makasulod ug water vapor mogawas.",
     "e": "Correct! Stomata allow gas exchange; carbon dioxide can enter and water vapor can leave."
    },
    "bad": {
     "b": "Dili pa sakto! Pangitaa ang gagmayng openings sa leaf nga motugot sa gas exchange.",
     "e": "Not quite yet! Find the tiny openings in the leaf that allow gas exchange."
    },
    "clue": {
     "b": "Ang stomata gagmayng lungag sa leaf. Pangitaa ang mga lungag diin makasulod ang gas.",
     "e": "Stomata are tiny openings in the leaf. Find the openings through which gas can enter."
    }
   },
   {
    "t": "🏭 Start the Food Factory",
    "p": {
     "b": "Ibutang ang tulo ka kinahanglan sa photosynthesis.",
     "e": "Place the three things needed for photosynthesis."
    },
    "i": {
     "b": "Drag Sunlight, Water, ug Carbon Dioxide ngadto sa leaf.",
     "e": "Drag Sunlight, Water, and Carbon Dioxide to the leaf."
    },
    "ok": {
     "b": "🏭 Food factory ready!",
     "e": "🏭 Food factory ready!"
    },
    "bad": {
     "b": "Dili pa sakto! I-check kung kompleto ba ang tulo ka input sa photosynthesis.",
     "e": "Not quite yet! Check whether all three inputs for photosynthesis are included."
    },
    "clue": {
     "b": "Hunahunaa ang tulo ka input sa photosynthesis: kahayag, tubig, ug usa ka gas gikan sa hangin.",
     "e": "Think of the three inputs for photosynthesis: light, water, and a gas from the air."
    }
   },
   {
    "t": "🍬 Make the Food",
    "p": {
     "b": "I-connect ang Sunlight + Water + Carbon Dioxide → Photosynthesis → Food + Oxygen.",
     "e": "Connect Sunlight + Water + Carbon Dioxide → Photosynthesis → Food + Oxygen."
    },
    "i": {
     "b": "Connect/build the process.",
     "e": "Connect Sunlight + Water + Carbon Dioxide to Photosynthesis, then to Food + Oxygen."
    },
    "ok": {
     "b": "🍬 Food Factory Complete!",
     "e": "🍬 Food Factory Complete!"
    },
    "bad": {
     "b": "Dili pa sakto! Ibutang ang inputs una, dayon ang proseso ug ang mga produkto niini.",
     "e": "Not quite yet! Place the inputs first, then the process and its products."
    },
    "clue": {
     "b": "Human mahatag ang inputs, hunahunaa ang proseso sa paghimo og sugar ug ang gas nga mogawas isip produkto.",
     "e": "After supplying the inputs, think about the process that makes sugar and the gas released as a product."
    }
   }
  ]
 },
 {
  "n": 7,
  "title": "Water Journey",
  "mission": {
   "b": "Tabangi ang Water nga Makaabot sa Leaves"
  },
  "done": {
   "b": "🏆 100% MASTERY ACHIEVED! Sakto ang tanang lima ka challenge. 🔓 Na-unlock na ang Story sa Session 7.",
   "e": "🏆 100% MASTERY ACHIEVED! All five challenges are correct. 🔓 The story for Session 7 is now unlocked."
  },
  "ch": [
   {
    "t": "🛤️ Build the Pathway",
    "p": {
     "b": "I-arrange ang water pathway.",
     "e": "Arrange the water pathway."
    },
    "i": {
     "b": "Soil → Roots → Xylem → Stem → Leaves.",
     "e": "Arrange the cards in this order: Soil, Roots, Xylem, Stem, Leaves."
    },
    "ok": {
     "b": "🛤️ Sakto!",
     "e": "🛤️ Correct!"
    },
    "bad": {
     "b": "Dili pa sakto! Susiha ang han-ay gikan sa gawas sa plant padulong sa ibabaw nga dahon.",
     "e": "Not quite yet! Check the order from outside the plant to the upper leaves."
    },
    "clue": {
     "b": "Ang tubig magsugod sa soil, mosulod sa roots, ug mosaka sa transport tissue sa stem.",
     "e": "Water starts in the soil, enters the roots, and moves up through transport tissue in the stem."
    }
   },
   {
    "t": "⬆️ Activate Root Pressure",
    "p": {
     "b": "Tabangi ang roots nga mo-push sa water pataas.",
     "e": "Help the roots push the water upward."
    },
    "i": {
     "b": "Tap the roots.",
     "e": "Tap the roots to show root pressure that can help move water upward."
    },
    "ok": {
     "b": "⬆️ Root Pressure activated!",
     "e": "⬆️ Root pressure activated!"
    },
    "bad": {
     "b": "Dili pa sakto! Hunahunaa ang pressure nga mahimong mugikan sa roots ug makatabang sa water movement.",
     "e": "Not quite yet! Think about pressure that can come from roots and help water movement."
    },
    "clue": {
     "b": "Ang roots mahimong mopahinabo og pressure nga makatabang sa pagduso sa water pataas. Pangitaa ang root control.",
     "e": "Roots can create pressure that helps push water upward. Look for the root control."
    }
   },
   {
    "t": "🥤 Show Capillary Action",
    "p": {
     "b": "I-guide ang water nga mosaka sa narrow tube.",
     "e": "Guide the water as it rises through the narrow tube."
    },
    "i": {
     "b": "Drag water upward.",
     "e": "Drag the water upward inside the narrow tube shown."
    },
    "ok": {
     "b": "💧 Capillary Action!",
     "e": "💧 Capillary action!"
    },
    "bad": {
     "b": "Dili pa sakto! Ang capillary action mahitabo sa nipis nga agianan; sundi ang water sulod sa tube.",
     "e": "Not quite yet! Capillary action occurs in a narrow passage; follow the water inside the tube."
    },
    "clue": {
     "b": "Sa nipis nga tube, ang water mahimong mosaka tungod sa attraction sa tubig sa tube surface ug sa usag usa.",
     "e": "In a narrow tube, water can rise because of attraction between water and the tube surface and among water molecules."
    }
   },
   {
    "t": "🍃 Activate Transpiration Pull",
    "p": {
     "b": "I-swipe pataas ang water vapor nga mogawas sa leaves.",
     "e": "Swipe upward to move the water vapor leaving the leaves."
    },
    "i": {
     "b": "Swipe upward.",
     "e": "Swipe upward on the water-vapor arrows leaving the leaves."
    },
    "ok": {
     "b": "🍃 Transpiration Pull activated!",
     "e": "🍃 Transpiration pull activated!"
    },
    "bad": {
     "b": "Dili pa sakto! Ang pagkawala sa water vapor sa leaves maoy may kalabotan sa pull sa tubig sulod sa plant.",
     "e": "Not quite yet! Water vapor leaving the leaves is related to the pull on water inside the plant."
    },
    "clue": {
     "b": "Hunahunaa unsay mahitabo sa water vapor nga mogawas sa leaves ug unsay epekto niini sa tubig sulod sa xylem.",
     "e": "Think about what happens when water vapor leaves the leaves and how that affects water inside the xylem."
    }
   },
   {
    "t": "🌳 Tall Tree Challenge",
    "p": {
     "b": "I-connect ang factor nga makatabang sa water nga makaabot sa taas nga leaves.",
     "e": "Connect the factor that helps water reach the leaves at the top."
    },
    "i": {
     "b": "Drag Transpiration Pull ngadto sa tall tree.",
     "e": "Drag the Transpiration Pull label to the tall-tree diagram and connect it to the water pathway."
    },
    "ok": {
     "b": "Sakto! Ang transpiration pull usa ka importanteng puwersa sa paglihok sa water paingon sa taas nga leaves.",
     "e": "Correct! Transpiration pull is an important force moving water toward high leaves."
    },
    "bad": {
     "b": "Dili pa sakto! Hunahunaa ang proseso nga nagsugod sa pagkawala sa water vapor sa leaves ug nagbira sa water pataas.",
     "e": "Not quite yet! Think of the process that starts with water vapor leaving leaves and pulls water upward."
    },
    "clue": {
     "b": "Ang taas nga leaves nagkinahanglan og padayon nga paglihok sa water. Unsang proseso ang nagmugna sa kusog nga pull gikan sa leaves?",
     "e": "High leaves need water to keep moving upward. Which process creates the pulling force from the leaves?"
    }
   }
  ]
 },
 {
  "n": 8,
  "title": "Phloem Express",
  "mission": {
   "b": "I-deliver ang Food sa Plant"
  },
  "done": {
   "b": "🏆 100% MASTERY ACHIEVED! Sakto ang tanang lima ka challenge. 🔓 Na-unlock na ang Story sa Session 8.",
   "e": "🏆 100% MASTERY ACHIEVED! All five challenges are correct. 🔓 The story for Session 8 is now unlocked."
  },
  "ch": [
   {
    "t": "🍬 Load the Food",
    "p": {
     "b": "I-load ang food nga gihimo sa leaf ngadto sa phloem.",
     "e": "Load the food made by the leaf into the phloem."
    },
    "i": {
     "b": "Drag food into phloem.",
     "e": "Drag the sugar/food icon made by the leaf into the phloem."
    },
    "ok": {
     "b": "🍬 Food loaded!",
     "e": "🍬 Food loaded!"
    },
    "bad": {
     "b": "Dili pa sakto! Leaves naghimo sa sugars; pangitaa ang tissue nga modawat ug magdala niini.",
     "e": "Not quite yet! Leaves make sugars; find the tissue that receives and carries them."
    },
    "clue": {
     "b": "Ang food nga gihimo sa leaves kinahanglan mosulod sa food-transport tissue. Pangitaa ang label sa maong tissue.",
     "e": "Food made in leaves must enter the food-transport tissue. Find the label for that tissue."
    }
   },
   {
    "t": "🗺️ Choose the Destination",
    "p": {
     "b": "Pilia ang plant parts nga makadawat sa food.",
     "e": "Choose the plant parts that receive food."
    },
    "i": {
     "b": "Tap roots, stem, flowers, ug fruits.",
     "e": "Tap the plant parts that may receive and use or store sugars."
    },
    "ok": {
     "b": "🗺️ Sakto!",
     "e": "🗺️ Correct!"
    },
    "bad": {
     "b": "Dili pa sakto! Hunahunaa kung asa gamiton o tipigan sa plant ang sugars alang sa pagtubo ug reproduction.",
     "e": "Not quite yet! Think about where the plant uses or stores sugars for growth and reproduction."
    },
    "clue": {
     "b": "Ang mga parte nga motubo o magtipig og materyales makadawat og sugars gikan sa leaves. Hunahunaa asa pa kinahanglan ang food.",
     "e": "Parts that grow or store materials can receive sugars from leaves. Think about where food is needed."
    }
   },
   {
    "t": "🚚 Guide the Food",
    "p": {
     "b": "I-guide ang food gikan sa leaves pinaagi sa phloem.",
     "e": "Guide the food from the leaves through the phloem."
    },
    "i": {
     "b": "Trace Leaves → Phloem → Other Parts.",
     "e": "Trace the pathway from Leaves through Phloem to Other Parts."
    },
    "ok": {
     "b": "🚚 Sakto!",
     "e": "🚚 Correct!"
    },
    "bad": {
     "b": "Dili pa sakto! Susiha ang food pathway gikan sa leaves pinaagi sa phloem.",
     "e": "Not quite yet! Check the food pathway from leaves through phloem."
    },
    "clue": {
     "b": "Sunda ang sugar gikan sa leaf ngadto sa transport tissue ug dayon ngadto sa laing plant part.",
     "e": "Follow sugar from the leaf into the transport tissue and then to another plant part."
    }
   },
   {
    "t": "📦 Deliver the Food",
    "p": {
     "b": "I-deliver ang food sa roots, stem, flowers, ug fruits.",
     "e": "Deliver the food to the roots, stem, flowers, and fruits."
    },
    "i": {
     "b": "Drag each package to a destination.",
     "e": "Drag each food package to its destination: roots, stem, flowers, or fruits."
    },
    "ok": {
     "b": "📦 Deliveries complete!",
     "e": "📦 Deliveries complete!"
    },
    "bad": {
     "b": "Dili pa sakto! Roots, stem, flowers, ug fruits mahimong makadawat og sugars; tan-awa ang matag destinasyon.",
     "e": "Not quite yet! Roots, stems, flowers, and fruits can receive sugars; check each destination."
    },
    "clue": {
     "b": "Ihatod ang matag package sa plant part nga naggamit o nagtipig og sugars alang sa pagtubo ug reproduction.",
     "e": "Deliver each package to a plant part that uses or stores sugars for growth and reproduction."
    }
   },
   {
    "t": "🔄 Complete Translocation",
    "p": {
     "b": "Ipakita ang movement sa food pinaagi sa phloem.",
     "e": "Show how food moves through the phloem."
    },
    "i": {
     "b": "Connect Leaves → Phloem → Whole Plant; place Translocation.",
     "e": "Connect Leaves → Phloem → Other Parts and place the Translocation label on the process."
    },
    "ok": {
     "b": "Maayo! Ang translocation mao ang pagbalhin sa sugars ug ubang organic substances pinaagi sa phloem.",
     "e": "Great! Translocation is the movement of sugars and other organic substances through phloem."
    },
    "bad": {
     "b": "Dili pa sakto! Pangitaa ang scientific term nga nagpasabot sa pagbalhin sa sugars pinaagi sa phloem.",
     "e": "Not quite yet! Find the scientific term for moving sugars through phloem."
    },
    "clue": {
     "b": "Ang pagbalhin sa sugars ug ubang organic substances pinaagi sa phloem adunay espesyal nga ngalan.",
     "e": "The movement of sugars and other organic substances through phloem has a specific name."
    }
   }
  ]
 },
 {
  "n": 9,
  "title": "Plant Team",
  "mission": {
   "b": "Pagtrabahoon ang Roots, Stem, ug Leaves as a Team"
  },
  "done": {
   "b": "🏆 100% MASTERY ACHIEVED! Sakto ang tanang lima ka challenge. 🔓 Na-unlock na ang Story sa Session 9.",
   "e": "🏆 100% MASTERY ACHIEVED! All five challenges are correct. 🔓 The story for Session 9 is now unlocked."
  },
  "ch": [
   {
    "t": "🌱 Root's Job",
    "p": {
     "b": "Hatagi ang roots sa ilang trabaho.",
     "e": "Give the roots their correct job."
    },
    "i": {
     "b": "Drag Water and Minerals to roots.",
     "e": "Drag Water and Minerals to the roots in the complete plant diagram."
    },
    "ok": {
     "b": "🌱 Sakto!",
     "e": "🌱 Correct!"
    },
    "bad": {
     "b": "Dili pa sakto! Ang roots mao ang unang bahin nga mosuhop sa water ug minerals gikan sa soil.",
     "e": "Not quite yet! Roots are the first plant part to absorb water and minerals from soil."
    },
    "clue": {
     "b": "Ang roots mosuhop og water ug minerals gikan sa soil. Ipares ang mga materyales sa parte nga mosuhop niini.",
     "e": "Roots absorb water and minerals from soil. Match the materials to the part that takes them in."
    }
   },
   {
    "t": "🌿 Stem's Job",
    "p": {
     "b": "Tabangi ang stem sa pag-connect ug pag-transport.",
     "e": "Help the stem connect plant parts and transport materials."
    },
    "i": {
     "b": "Connect Roots → Stem → Leaves.",
     "e": "Connect Roots → Stem → Leaves to show how the organs are linked."
    },
    "ok": {
     "b": "🌿 Sakto!",
     "e": "🌿 Correct!"
    },
    "bad": {
     "b": "Dili pa sakto! I-connect ang roots ug leaves pinaagi sa stem.",
     "e": "Not quite yet! Connect the roots and leaves through the stem."
    },
    "clue": {
     "b": "Ang stem nagkupot sa plant ug nagdala sa transport tissues tali sa roots ug leaves.",
     "e": "The stem supports the plant and carries transport tissues between roots and leaves."
    }
   },
   {
    "t": "🍃 Leaf's Job",
    "p": {
     "b": "Hatagi ang leaf sa kinahanglan para sa photosynthesis.",
     "e": "Give the leaf what it needs for photosynthesis."
    },
    "i": {
     "b": "Drag Sunlight, Water, ug Carbon Dioxide into the leaf.",
     "e": "Drag Sunlight, Water, and Carbon Dioxide to the leaf."
    },
    "ok": {
     "b": "🍃 Sakto!",
     "e": "🍃 Correct!"
    },
    "bad": {
     "b": "Dili pa sakto! Ang photosynthesis mahitabo sa leaves ug nagkinahanglan og tulo ka input.",
     "e": "Not quite yet! Photosynthesis happens in leaves and needs three inputs."
    },
    "clue": {
     "b": "Ang leaf nanginahanglan og kahayag, water, ug carbon dioxide aron makahimo og sugar.",
     "e": "A leaf needs light, water, and carbon dioxide to make sugar."
    }
   },
   {
    "t": "🔵🟢 Connect the Two Systems",
    "p": {
     "b": "I-build ang water ug food transport systems.",
     "e": "Build the water and food transport systems."
    },
    "i": {
     "b": "Roots → Xylem → Leaves; Leaves → Phloem → Whole Plant.",
     "e": "Build both pathways: Roots → Xylem → Leaves and Leaves → Phloem → Whole Plant."
    },
    "ok": {
     "b": "🔵🟢 Sakto!",
     "e": "🔵🟢 Correct!"
    },
    "bad": {
     "b": "Dili pa sakto! Siguroha nga ang xylem ug phloem dili mag-ilis sa ilang mga karga.",
     "e": "Not quite yet! Make sure xylem and phloem are not switched."
    },
    "clue": {
     "b": "Ang usa ka agianan nagdala sa water ug minerals pataas; ang laing agianan nag-apod-apod sa sugars gikan sa leaves.",
     "e": "One pathway carries water and minerals upward; the other distributes sugars from the leaves."
    }
   },
   {
    "t": "🤝 Complete the Plant Team",
    "p": {
     "b": "Hatagi ang roots, stem, ug leaves sa ilang sakto nga jobs.",
     "e": "Match the roots, stem, and leaves with their correct jobs."
    },
    "i": {
     "b": "Assign Water + Minerals; Support + Connection + Transport; Make Food.",
     "e": "Match roots with water/mineral uptake, the stem with support/connection/transport, and leaves with food-making."
    },
    "ok": {
     "b": "🤝 Plant Team Complete!",
     "e": "🤝 Plant Team Complete!"
    },
    "bad": {
     "b": "Dili pa sakto! Ipares pag-usab ang matag organ sa iyang nag-unang trabaho.",
     "e": "Not quite yet! Match each organ to its main job again."
    },
    "clue": {
     "b": "Tan-awa ang tulo ka organ: roots, stem, ug leaves. Ipares ang matag usa sa function nga labing angay niini.",
     "e": "Look at the three organs—roots, stem, and leaves. Match each to its best-fitting function."
    }
   }
  ]
 },
 {
  "n": 10,
  "title": "Plant Transport Master",
  "mission": {
   "b": "Tabangi ang Roots"
  },
  "done": {
   "fin_b": "🏆 PLANT TRANSPORT MASTER! 100% MASTERY ACHIEVED! Nahuman nimo ang tanang 10 ka session. Maayo ang imong pagsabot sa plant transport system!",
   "fin_e": "🏆 PLANT TRANSPORT MASTER! 100% MASTERY ACHIEVED! You have completed all 10 sessions and demonstrated your understanding of the plant transport system.",
   "rev_b": "Hinumdomi: ang roots mosuhop og water ug minerals; ang xylem nagdala sa water ug minerals; ang leaves naghimo og sugars pinaagi sa photosynthesis; ang stomata motabang sa gas exchange ug water-vapor loss; ug ang phloem nagdala sa sugars pinaagi sa translocation. Ang root pressure, capillary action, ug transpiration pull makatabang sa paglihok sa water.",
   "rev_e": "Remember: roots absorb water and minerals; xylem carries water and minerals; leaves make sugars through photosynthesis; stomata help with gas exchange and water-vapor loss; and phloem transports sugars through translocation. Root pressure, capillary action, and transpiration pull help water move."
  },
  "ch": [
   {
    "t": "💧 Build Water and Mineral Transport",
    "p": {
     "b": "I-build ang sakto nga pathway sa water ug minerals.",
     "e": "Build the correct pathway for water and minerals."
    },
    "i": {
     "b": "Soil → Roots → Xylem → Stem → Leaves.",
     "e": "Arrange Soil, Roots, Xylem, Stem, and Leaves in the correct order for the water pathway."
    },
    "ok": {
     "b": "💧 Water system complete!",
     "e": "💧 Water system complete!"
    },
    "bad": {
     "b": "Dili pa sakto! Sunda ang water gikan sa soil paingon sa roots ug dayon sa xylem.",
     "e": "Not quite yet! Follow water from soil to roots and then into xylem."
    },
    "clue": {
     "b": "Sunda ang water ug minerals gikan sa soil. Hunahunaa unsang tissue ang nagdala niini paingon sa stem ug leaves.",
     "e": "Follow water and minerals from the soil. Think about which tissue carries them toward the stem and leaves."
    }
   },
   {
    "t": "☀️ Activate Photosynthesis",
    "p": {
     "b": "Hatagi ang leaves sa tanan nilang kinahanglan para sa photosynthesis.",
     "e": "Give the leaves everything they need for photosynthesis."
    },
    "i": {
     "b": "Drag Sunlight, Water, ug Carbon Dioxide; activate Photosynthesis.",
     "e": "Give the leaves Sunlight, Water, and Carbon Dioxide, then tap Photosynthesis."
    },
    "ok": {
     "b": "☀️ Photosynthesis activated!",
     "e": "☀️ Photosynthesis activated!"
    },
    "bad": {
     "b": "Dili pa sakto! Susiha kung unsang input ang gikan sa kahayag, sa soil, ug sa hangin.",
     "e": "Not quite yet! Check which input comes from light, the soil, and the air."
    },
    "clue": {
     "b": "Ang photosynthesis nagkinahanglan og enerhiya gikan sa kahayag ug materyales nga gikan sa tubig ug hangin.",
     "e": "Photosynthesis needs energy from light and materials from water and air."
    }
   },
   {
    "t": "🍬 Make and Transport Food",
    "p": {
     "b": "Human makahimo og food ang leaves, i-guide kini ngadto sa ubang plant parts.",
     "e": "After the leaves make food, guide it to the other plant parts."
    },
    "i": {
     "b": "Build Leaves → Phloem → Whole Plant; place Translocation.",
     "e": "Connect Leaves → Phloem → Whole Plant and place the Translocation label."
    },
    "ok": {
     "b": "🍬 Food transport complete!",
     "e": "🍬 Food transport complete!"
    },
    "bad": {
     "b": "Dili pa sakto! Ang sugars gikan sa leaves kinahanglan ipanghatag sa phloem.",
     "e": "Not quite yet! Sugars made in leaves must be distributed through phloem."
    },
    "clue": {
     "b": "Human mabuhat ang sugars sa leaves, kinahanglan kini maapod-apod sa ubang plant parts pinaagi sa food-transport tissue.",
     "e": "After sugars are made in the leaves, they must be distributed to other plant parts through the food-transport tissue."
    }
   },
   {
    "t": "💨 Activate Water Transport Factors",
    "p": {
     "b": "I-connect ang matag factor sa water transport system.",
     "e": "Connect each factor to the water transport system."
    },
    "i": {
     "b": "Place Root Pressure, Capillary Action, ug Transpiration Pull.",
     "e": "Drag Root Pressure, Capillary Action, and Transpiration Pull to the water-transport diagram and match each to its illustration."
    },
    "ok": {
     "b": "💨 Water transport factors complete!",
     "e": "💨 Water transport factors complete!"
    },
    "bad": {
     "b": "Dili pa sakto! Ipares ang matag factor sa clue niini: roots, nipis nga tube, o water vapor gikan sa leaves.",
     "e": "Not quite yet! Match each factor to its clue: roots, a narrow tube, or water vapor leaving leaves."
    },
    "clue": {
     "b": "Usa ka factor may kalabotan sa pressure sa roots, usa sa paglihok sa water sa nipis nga tube, ug usa sa pagkawala sa water vapor sa leaves.",
     "e": "One factor relates to pressure from roots, one to water moving in a narrow tube, and one to water vapor loss from leaves."
    }
   },
   {
    "t": "🌳 Final Plant Transport Master",
    "p": {
     "b": "I-rebuild ang complete plant transport system.",
     "e": "Rebuild the complete plant transport system."
    },
    "i": {
     "b": "Connect the complete water system, photosynthesis, food transport, and water transport factors.",
     "e": "Connect the water/mineral pathway, photosynthesis, sugar transport, and the three water-movement factors in one complete diagram."
    },
    "ok": {
     "b": "🏆 PLANT TRANSPORT MASTER! 100% MASTERY ACHIEVED!",
     "e": "🏆 PLANT TRANSPORT MASTER! 100% MASTERY ACHIEVED!"
    },
    "bad": {
     "b": "Dili pa sakto! Susiha ang matag koneksyon sa complete system ug siguroha nga lahi ang water pathway ug food pathway.",
     "e": "Not quite yet! Review every connection in the complete system and keep the water pathway separate from the food pathway."
    },
    "clue": {
     "b": "Hunahunaa ang tibuok sistema: pagsuhop sa water/minerals, paghimo og food sa leaves, pagdala sa water pinaagi sa xylem, ug pagdala sa sugars pinaagi sa phloem.",
     "e": "Think about the whole system: water/mineral uptake, food-making in leaves, water transport through xylem, and sugar transport through phloem."
    }
   }
  ]
 }
];

// ---- Small fixes where the document looked like a copy-paste slip (please confirm with the client) ----
// 1) Session 1 mission English + missing English missions (the document only gave Bisaya).
const MISSION_EN=["Help the plant become healthy","Help the roots","Help the water enter the plant","Fix the plant highway",null,"Help the leaf make food","Help the water reach the leaves","Deliver the food to the plant","Make the roots, stem, and leaves work as a team","Show what you know about the whole plant transport system"];
G.forEach((s,i)=>{if(s.mission&&MISSION_EN[i])s.mission.e=MISSION_EN[i]});
// 2) Session 10 mission in the document says "Tabangi ang Roots" (same as Session 2). Replaced with a fitting one.
G[9].mission={b:"Ipakita ang imong kahibalo sa tibuok plant transport system",e:MISSION_EN[9]};
// 3) Session 3, Challenge 1 clue was about root hairs (it belongs to Challenge 2). Replaced with a clue that fits collecting rain.
G[2].ch[0].clue={b:"Hunahunaa kung asa mahulog ang ulan. Asa nimo ibutang ang container aron mosulod ang mga tulo niini?",e:"Think about where the rain falls. Where should the container go so the drops fall into it?"};
export default G;
