// Quiz questions and answer keys transcribed from the supplied QUIZ 1-10.docx.
const LESSON_TITLES = [
  "Plant Organs and Their Functions",
  "Structure and Function of Roots",
  "Water Absorption and Osmosis in Roots",
  "Structure and Function of Stem",
  "Xylem",
  "Phloem",
  "Structure and Functions of Leaves",
  "Transpiration and the Movement of Water",
  "Integration of Roots, Stem, and Leaves in Plant Transport",
  "Factors Affecting Plant Transport"
];
const QUIZZES = {
  "1": [
    {
      "q": "Which plant organ absorbs water and minerals from the soil?",
      "choices": [
        "Leaf",
        "Stem",
        "Root",
        "Flower"
      ],
      "answer": 2
    },
    {
      "q": "Which plant organ makes food through photosynthesis?",
      "choices": [
        "Leaf",
        "Root",
        "Fruit",
        "Seed"
      ],
      "answer": 0
    },
    {
      "q": "Which organ supports leaves, flowers, and fruits?",
      "choices": [
        "Stem",
        "Root",
        "Seed",
        "Flower"
      ],
      "answer": 0
    },
    {
      "q": "Flowers help plants to:",
      "choices": [
        "Reproduce",
        "Absorb water",
        "Store minerals",
        "Support leaves"
      ],
      "answer": 0
    },
    {
      "q": "Seeds can grow into:",
      "choices": [
        "Water",
        "Soil",
        "New plants",
        "Roots"
      ],
      "answer": 2
    },
    {
      "q": "Which organ stores food in some plants?",
      "choices": [
        "Roots",
        "Flowers",
        "Seeds",
        "Fruits"
      ],
      "answer": 0
    },
    {
      "q": "What do roots use to hold a plant firmly in place?",
      "choices": [
        "Water",
        "Anchoring function",
        "Sugar",
        "Flowers"
      ],
      "answer": 1
    },
    {
      "q": "Which plant part carries water from roots to leaves?",
      "choices": [
        "Stem",
        "Seed",
        "Fruit",
        "Flower"
      ],
      "answer": 0
    },
    {
      "q": "Why are leaves important?",
      "choices": [
        "They absorb minerals.",
        "They store seeds.",
        "They make food.",
        "They anchor plants."
      ],
      "answer": 2
    },
    {
      "q": "What may develop after pollination and fertilization?",
      "choices": [
        "Leaf",
        "Root",
        "Fruit",
        "Stem"
      ],
      "answer": 2
    },
    {
      "q": "Which statement best describes plant organs?",
      "choices": [
        "They work independently.",
        "Only roots are important.",
        "Each organ has a special function.",
        "Leaves do all functions."
      ],
      "answer": 2
    },
    {
      "q": "What would most likely happen if roots were damaged?",
      "choices": [
        "Plant absorbs more water.",
        "Plant may not obtain enough water.",
        "Plant produces more flowers.",
        "Plant grows faster."
      ],
      "answer": 1
    },
    {
      "q": "How do roots and leaves work together?",
      "choices": [
        "Roots make food.",
        "Leaves absorb minerals.",
        "Roots supply water while leaves make food.",
        "Both absorb sunlight."
      ],
      "answer": 2
    },
    {
      "q": "Which sequence correctly shows plant growth support?",
      "choices": [
        "Leaves → Roots → Soil",
        "Roots → Water uptake → Plant growth",
        "Flowers → Fruits → Roots",
        "Seeds → Leaves → Water"
      ],
      "answer": 1
    },
    {
      "q": "Why do plant organs need to work together?",
      "choices": [
        "To make plants colorful",
        "To help the plant survive and grow",
        "To stop photosynthesis",
        "To prevent reproduction"
      ],
      "answer": 1
    }
  ],
  "2": [
    {
      "q": "What is the main function of roots?",
      "choices": [
        "Produce flowers",
        "Absorb water and minerals",
        "Make seeds",
        "Produce fruits"
      ],
      "answer": 1
    },
    {
      "q": "Where are roots usually found?",
      "choices": [
        "Above the leaves",
        "Inside the fruit",
        "Under the soil",
        "On the flowers"
      ],
      "answer": 2
    },
    {
      "q": "Which root part absorbs water and minerals from the soil?",
      "choices": [
        "Root cap",
        "Root hairs",
        "Main root",
        "Side root"
      ],
      "answer": 1
    },
    {
      "q": "Which root part protects the growing tip of the root?",
      "choices": [
        "Root cap",
        "Root hairs",
        "Stem",
        "Vein"
      ],
      "answer": 0
    },
    {
      "q": "Some roots store food for later use. Which plant is an example?",
      "choices": [
        "Rice",
        "Grass",
        "Carrot",
        "Mango"
      ],
      "answer": 2
    },
    {
      "q": "Why are root hairs important to plants?",
      "choices": [
        "They make food.",
        "They absorb water and minerals.",
        "They produce flowers.",
        "They release oxygen."
      ],
      "answer": 1
    },
    {
      "q": "How do roots help plants during strong winds?",
      "choices": [
        "By making food",
        "By producing seeds",
        "By holding the plant firmly in the soil",
        "By attracting insects"
      ],
      "answer": 2
    },
    {
      "q": "Which statement correctly describes a taproot system?",
      "choices": [
        "It has many thin roots of equal size.",
        "It has one main root with smaller side roots.",
        "It grows above the soil.",
        "It produces flowers."
      ],
      "answer": 1
    },
    {
      "q": "Which statement correctly describes a fibrous root system?",
      "choices": [
        "It has one thick root only.",
        "It stores large amounts of food.",
        "It has many thin roots growing from the base of the stem.",
        "It develops into fruits."
      ],
      "answer": 2
    },
    {
      "q": "Why do rice plants have fibrous root systems?",
      "choices": [
        "To spread through the soil and hold the plant in place",
        "To produce flowers faster",
        "To make food directly",
        "To attract pollinators"
      ],
      "answer": 0
    },
    {
      "q": "A plant easily falls over after a heavy rainstorm. Which root function is most likely not working properly?",
      "choices": [
        "Food production",
        "Pollination",
        "Anchorage",
        "Seed formation"
      ],
      "answer": 2
    },
    {
      "q": "A carrot and a grass plant have different root systems. Which statement best compares them?",
      "choices": [
        "Both have taproots.",
        "Carrot has a taproot, while grass has a fibrous root system.",
        "Grass has a taproot, while carrot has a fibrous root system.",
        "Both have fibrous roots."
      ],
      "answer": 1
    },
    {
      "q": "If most of the root hairs of a plant are damaged, what will most likely happen?",
      "choices": [
        "The plant will absorb less water.",
        "The plant will produce more flowers.",
        "The leaves will make more food.",
        "The roots will grow into fruits."
      ],
      "answer": 0
    },
    {
      "q": "Why are carrot roots thicker than grass roots?",
      "choices": [
        "They store food for later use.",
        "They absorb sunlight.",
        "They produce seeds.",
        "They release oxygen."
      ],
      "answer": 0
    },
    {
      "q": "Which statement best explains why roots are important?",
      "choices": [
        "Roots only hold plants in place.",
        "Roots only store food.",
        "Roots absorb water and minerals, anchor plants, and may store food.",
        "Roots only produce flowers."
      ],
      "answer": 2
    }
  ],
  "3": [
    {
      "q": "Which part of the root absorbs most water from the soil?",
      "choices": [
        "Root cap",
        "Root hairs",
        "Stem",
        "Leaf"
      ],
      "answer": 1
    },
    {
      "q": "Plants need water mainly for ______.",
      "choices": [
        "making food and growth",
        "producing rocks",
        "making soil",
        "producing insects"
      ],
      "answer": 0
    },
    {
      "q": "Water absorbed by roots first comes from the ______.",
      "choices": [
        "air",
        "fruit",
        "soil",
        "flower"
      ],
      "answer": 2
    },
    {
      "q": "What process allows water to move into root hair cells?",
      "choices": [
        "Pollination",
        "Germination",
        "Osmosis",
        "Fertilization"
      ],
      "answer": 2
    },
    {
      "q": "Osmosis is the movement of ______.",
      "choices": [
        "minerals",
        "water",
        "leaves",
        "stems"
      ],
      "answer": 1
    },
    {
      "q": "Why are root hairs important?",
      "choices": [
        "They make seeds.",
        "They absorb water efficiently.",
        "They make flowers.",
        "They produce fruits."
      ],
      "answer": 1
    },
    {
      "q": "What happens after water enters the root hairs?",
      "choices": [
        "It moves into the root.",
        "It changes into sugar.",
        "It becomes oxygen.",
        "It leaves the plant."
      ],
      "answer": 0
    },
    {
      "q": "Which example best demonstrates osmosis?",
      "choices": [
        "A flower blooming",
        "A dry sponge absorbing water",
        "A seed growing",
        "A leaf falling"
      ],
      "answer": 1
    },
    {
      "q": "Why is moist soil important to plants?",
      "choices": [
        "It provides water for absorption.",
        "It provides sunlight.",
        "It produces oxygen.",
        "It makes flowers."
      ],
      "answer": 0
    },
    {
      "q": "What does a selectively permeable membrane do?",
      "choices": [
        "Blocks all substances",
        "Allows all substances",
        "Allows some substances to pass",
        "Produces water"
      ],
      "answer": 2
    },
    {
      "q": "A plant growing in very dry soil starts to wilt. What is the most likely reason?",
      "choices": [
        "Increased pollination",
        "Insufficient water absorption",
        "Excessive fruit production",
        "Too much oxygen"
      ],
      "answer": 1
    },
    {
      "q": "How does osmosis help plants survive?",
      "choices": [
        "It produces seeds.",
        "It moves water into root cells.",
        "It creates flowers.",
        "It forms fruits."
      ],
      "answer": 1
    },
    {
      "q": "Which condition promotes greater water absorption?",
      "choices": [
        "Dry soil",
        "Moist soil",
        "Rocky stem",
        "Closed stomata"
      ],
      "answer": 1
    },
    {
      "q": "If root hairs are damaged, what will most likely happen?",
      "choices": [
        "More water is absorbed.",
        "Less water is absorbed.",
        "More flowers develop.",
        "More fruits grow."
      ],
      "answer": 1
    },
    {
      "q": "Why is water absorption considered the first step in plant transport?",
      "choices": [
        "It starts water movement through the plant.",
        "It produces seeds.",
        "It forms flowers.",
        "It closes stomata."
      ],
      "answer": 0
    }
  ],
  "4": [
    {
      "q": "What plant organ connects the roots to the leaves?",
      "choices": [
        "Flower",
        "Stem",
        "Seed",
        "Fruit"
      ],
      "answer": 1
    },
    {
      "q": "Which tissue carries water and minerals?",
      "choices": [
        "Phloem",
        "Cortex",
        "Xylem",
        "Epidermis"
      ],
      "answer": 2
    },
    {
      "q": "Which tissue transports sugars?",
      "choices": [
        "Xylem",
        "Epidermis",
        "Phloem",
        "Cortex"
      ],
      "answer": 2
    },
    {
      "q": "What is the outermost layer of the stem?",
      "choices": [
        "Cortex",
        "Phloem",
        "Epidermis",
        "Cambium"
      ],
      "answer": 2
    },
    {
      "q": "Which stem part helps stems grow thicker?",
      "choices": [
        "Cambium",
        "Xylem",
        "Cortex",
        "Phloem"
      ],
      "answer": 0
    },
    {
      "q": "Why is the stem important to plants?",
      "choices": [
        "It supports leaves and transports materials.",
        "It makes seeds.",
        "It absorbs sunlight.",
        "It pollinates flowers."
      ],
      "answer": 0
    },
    {
      "q": "What is the main function of the cortex?",
      "choices": [
        "Gas exchange",
        "Food storage",
        "Reproduction",
        "Pollination"
      ],
      "answer": 1
    },
    {
      "q": "Why is xylem compared to a water pipe?",
      "choices": [
        "It stores sugar.",
        "It transports water.",
        "It absorbs light.",
        "It forms flowers."
      ],
      "answer": 1
    },
    {
      "q": "Why is phloem compared to a delivery truck?",
      "choices": [
        "It delivers food throughout the plant.",
        "It absorbs minerals.",
        "It makes seeds.",
        "It stores water."
      ],
      "answer": 0
    },
    {
      "q": "What does the epidermis do?",
      "choices": [
        "Produces sugar",
        "Protects the stem",
        "Stores food",
        "Carries water"
      ],
      "answer": 1
    },
    {
      "q": "A stem is severely damaged. Which process will be directly affected?",
      "choices": [
        "Water and food transport",
        "Pollination",
        "Seed dispersal",
        "Germination"
      ],
      "answer": 0
    },
    {
      "q": "Why are both xylem and phloem needed?",
      "choices": [
        "Both transport different materials.",
        "Both produce flowers.",
        "Both absorb sunlight.",
        "Both store seeds."
      ],
      "answer": 0
    },
    {
      "q": "What would happen if phloem stopped working?",
      "choices": [
        "Sugar transport would decrease.",
        "Water transport would increase.",
        "Roots would absorb more water.",
        "Flowers would multiply."
      ],
      "answer": 0
    },
    {
      "q": "How do stem tissues work together?",
      "choices": [
        "By transporting materials and supporting growth",
        "By producing sunlight",
        "By making soil",
        "By attracting insects"
      ],
      "answer": 0
    },
    {
      "q": "Why is the stem called the plant's highway?",
      "choices": [
        "It transports materials between organs.",
        "It stores seeds.",
        "It makes flowers.",
        "It absorbs sunlight."
      ],
      "answer": 0
    }
  ],
  "5": [
    {
      "q": "What is xylem?",
      "choices": [
        "A flower part",
        "A transport tissue",
        "A fruit",
        "A seed"
      ],
      "answer": 1
    },
    {
      "q": "What does xylem transport?",
      "choices": [
        "Sugars only",
        "Water and minerals",
        "Oxygen only",
        "Flowers"
      ],
      "answer": 1
    },
    {
      "q": "Where does water enter the xylem?",
      "choices": [
        "Leaves",
        "Flowers",
        "Roots",
        "Fruits"
      ],
      "answer": 2
    },
    {
      "q": "Xylem mainly moves materials toward the ______.",
      "choices": [
        "roots",
        "leaves",
        "soil",
        "seeds"
      ],
      "answer": 1
    },
    {
      "q": "Which material is carried by xylem?",
      "choices": [
        "Sugar",
        "Water",
        "Fruit",
        "Seed"
      ],
      "answer": 1
    },
    {
      "q": "Why is xylem important?",
      "choices": [
        "It transports water throughout the plant.",
        "It produces food.",
        "It forms flowers.",
        "It stores seeds."
      ],
      "answer": 0
    },
    {
      "q": "What kind of pathways are found in xylem?",
      "choices": [
        "Hollow pathways",
        "Leaf pathways",
        "Fruit pathways",
        "Flower pathways"
      ],
      "answer": 0
    },
    {
      "q": "Besides transport, xylem also helps ______.",
      "choices": [
        "support the plant",
        "produce flowers",
        "attract insects",
        "make seeds"
      ],
      "answer": 0
    },
    {
      "q": "Why do leaves need water from xylem?",
      "choices": [
        "For photosynthesis",
        "For pollination",
        "For seed production",
        "For fruit coloring"
      ],
      "answer": 0
    },
    {
      "q": "Which sequence shows xylem transport?",
      "choices": [
        "Roots → Stem → Leaves",
        "Leaves → Stem → Roots",
        "Flowers → Roots → Leaves",
        "Fruits → Leaves → Roots"
      ],
      "answer": 0
    },
    {
      "q": "What would happen if xylem stopped working?",
      "choices": [
        "Water could not reach leaves.",
        "Sugar transport would stop.",
        "Flowers would bloom faster.",
        "Seeds would form immediately."
      ],
      "answer": 0
    },
    {
      "q": "Why would photosynthesis decrease if xylem were damaged?",
      "choices": [
        "Leaves would receive less water.",
        "Leaves would receive more sugar.",
        "Roots would stop growing.",
        "Flowers would disappear."
      ],
      "answer": 0
    },
    {
      "q": "Which plant would be healthier?",
      "choices": [
        "Plant with damaged xylem",
        "Plant with functioning xylem",
        "Plant without roots",
        "Plant without leaves"
      ],
      "answer": 1
    },
    {
      "q": "Why are dissolved minerals important?",
      "choices": [
        "They support growth.",
        "They make sunlight.",
        "They produce flowers.",
        "They stop transpiration."
      ],
      "answer": 0
    },
    {
      "q": "Why is xylem essential to plant survival?",
      "choices": [
        "It distributes water and minerals.",
        "It produces fruits.",
        "It attracts insects.",
        "It forms flowers."
      ],
      "answer": 0
    }
  ],
  "6": [
    {
      "q": "What does phloem transport?",
      "choices": [
        "Water",
        "Sugars",
        "Soil",
        "Flowers"
      ],
      "answer": 1
    },
    {
      "q": "Where are sugars produced?",
      "choices": [
        "Roots",
        "Stem",
        "Leaves",
        "Seeds"
      ],
      "answer": 2
    },
    {
      "q": "What process makes sugar?",
      "choices": [
        "Germination",
        "Photosynthesis",
        "Pollination",
        "Transpiration"
      ],
      "answer": 1
    },
    {
      "q": "Which tissue carries food?",
      "choices": [
        "Xylem",
        "Phloem",
        "Cortex",
        "Epidermis"
      ],
      "answer": 1
    },
    {
      "q": "Sugar can be transported to the ______.",
      "choices": [
        "roots",
        "fruits",
        "stems",
        "all of these"
      ],
      "answer": 3
    },
    {
      "q": "Why do roots need sugar?",
      "choices": [
        "For energy and growth",
        "For photosynthesis",
        "For pollination",
        "For seed dispersal"
      ],
      "answer": 0
    },
    {
      "q": "Why do fruits receive sugar?",
      "choices": [
        "For growth and storage",
        "For water absorption",
        "For transpiration",
        "For pollination"
      ],
      "answer": 0
    },
    {
      "q": "Phloem can transport sugar in ______.",
      "choices": [
        "one direction only",
        "different directions",
        "circles only",
        "roots only"
      ],
      "answer": 1
    },
    {
      "q": "What is the main function of phloem?",
      "choices": [
        "Transport food",
        "Make water",
        "Produce oxygen",
        "Absorb sunlight"
      ],
      "answer": 0
    },
    {
      "q": "Which material is moved by phloem?",
      "choices": [
        "Sugars",
        "Rocks",
        "Water only",
        "Soil"
      ],
      "answer": 0
    },
    {
      "q": "What would happen if phloem became damaged?",
      "choices": [
        "Less food would reach plant parts.",
        "More water would be absorbed.",
        "Roots would grow faster.",
        "Flowers would multiply."
      ],
      "answer": 0
    },
    {
      "q": "Why do growing fruits need phloem?",
      "choices": [
        "To receive sugars",
        "To absorb sunlight",
        "To make water",
        "To open stomata"
      ],
      "answer": 0
    },
    {
      "q": "How is phloem different from xylem?",
      "choices": [
        "Phloem transports sugars.",
        "Phloem transports minerals only.",
        "Phloem transports water only.",
        "Phloem absorbs soil."
      ],
      "answer": 0
    },
    {
      "q": "Why don't sugars remain only in leaves?",
      "choices": [
        "Other plant parts also need food.",
        "Leaves cannot store sugar.",
        "Roots make food.",
        "Flowers absorb sugar."
      ],
      "answer": 0
    },
    {
      "q": "Why is phloem important?",
      "choices": [
        "It distributes food throughout the plant.",
        "It absorbs minerals.",
        "It creates water.",
        "It makes flowers."
      ],
      "answer": 0
    }
  ],
  "7": [
    {
      "q": "What is the broad, flat part of a leaf called?",
      "choices": [
        "Petiole",
        "Midrib",
        "Leaf blade",
        "Stomata"
      ],
      "answer": 2
    },
    {
      "q": "What part attaches the leaf blade to the stem?",
      "choices": [
        "Vein",
        "Petiole",
        "Midrib",
        "Root"
      ],
      "answer": 1
    },
    {
      "q": "What green substance absorbs light energy for photosynthesis?",
      "choices": [
        "Oxygen",
        "Chlorophyll",
        "Sugar",
        "Water"
      ],
      "answer": 1
    },
    {
      "q": "What are stomata?",
      "choices": [
        "Leaf veins",
        "Tiny openings in leaves",
        "Root hairs",
        "Flower parts"
      ],
      "answer": 1
    },
    {
      "q": "What process allows leaves to make food?",
      "choices": [
        "Germination",
        "Pollination",
        "Photosynthesis",
        "Fertilization"
      ],
      "answer": 2
    },
    {
      "q": "Why is the leaf blade broad and flat?",
      "choices": [
        "To absorb more sunlight",
        "To store seeds",
        "To absorb minerals",
        "To anchor the plant"
      ],
      "answer": 0
    },
    {
      "q": "What is the function of the petiole?",
      "choices": [
        "Makes sugar",
        "Connects the leaf to the stem",
        "Stores food",
        "Produces flowers"
      ],
      "answer": 1
    },
    {
      "q": "Why are veins important in leaves?",
      "choices": [
        "They transport water, minerals, and sugars.",
        "They absorb sunlight.",
        "They make seeds.",
        "They produce oxygen."
      ],
      "answer": 0
    },
    {
      "q": "What gases move through the stomata?",
      "choices": [
        "Carbon dioxide and oxygen",
        "Nitrogen and helium",
        "Hydrogen and carbon",
        "Oxygen and sugar"
      ],
      "answer": 0
    },
    {
      "q": "Why are leaves called food factories?",
      "choices": [
        "They absorb water.",
        "They support flowers.",
        "They make food through photosynthesis.",
        "They store seeds."
      ],
      "answer": 2
    },
    {
      "q": "A plant's stomata become blocked. Which function will be affected first?",
      "choices": [
        "Gas exchange",
        "Root growth",
        "Seed production",
        "Fruit formation"
      ],
      "answer": 0
    },
    {
      "q": "How does chlorophyll help plants survive?",
      "choices": [
        "It absorbs light energy needed for photosynthesis.",
        "It absorbs minerals.",
        "It transports water.",
        "It stores food."
      ],
      "answer": 0
    },
    {
      "q": "What will likely happen if many leaf veins are damaged?",
      "choices": [
        "Movement of materials through the leaf will be reduced.",
        "Roots will absorb more water.",
        "Flowers will bloom faster.",
        "Seeds will germinate immediately."
      ],
      "answer": 0
    },
    {
      "q": "Which leaf structure is directly responsible for gas exchange?",
      "choices": [
        "Midrib",
        "Veins",
        "Petiole",
        "Stomata"
      ],
      "answer": 3
    },
    {
      "q": "Why are leaves essential to plant survival?",
      "choices": [
        "They make food and exchange gases.",
        "They absorb minerals from soil.",
        "They anchor the plant.",
        "They produce roots."
      ],
      "answer": 0
    }
  ],
  "8": [
    {
      "q": "What is transpiration?",
      "choices": [
        "Food production",
        "Water evaporation from plants",
        "Seed formation",
        "Pollination"
      ],
      "answer": 1
    },
    {
      "q": "Through which structures does most transpiration occur?",
      "choices": [
        "Roots",
        "Flowers",
        "Fruits",
        "Stomata"
      ],
      "answer": 3
    },
    {
      "q": "What escapes from leaves during transpiration?",
      "choices": [
        "Sugar",
        "Minerals",
        "Water vapor",
        "Soil"
      ],
      "answer": 2
    },
    {
      "q": "What tissue carries water upward through the plant?",
      "choices": [
        "Phloem",
        "Cortex",
        "Epidermis",
        "Xylem"
      ],
      "answer": 3
    },
    {
      "q": "Where does water absorbed by roots eventually travel?",
      "choices": [
        "Leaves",
        "Flowers only",
        "Fruits only",
        "Seeds only"
      ],
      "answer": 0
    },
    {
      "q": "What is the first step in water movement through a plant?",
      "choices": [
        "Transpiration",
        "Photosynthesis",
        "Water absorption by roots",
        "Pollination"
      ],
      "answer": 2
    },
    {
      "q": "How does water move from roots to leaves?",
      "choices": [
        "Through xylem",
        "Through flowers",
        "Through fruits",
        "Through seeds"
      ],
      "answer": 0
    },
    {
      "q": "Why is transpiration important?",
      "choices": [
        "It helps move water upward.",
        "It forms flowers.",
        "It strengthens roots.",
        "It produces fruits."
      ],
      "answer": 0
    },
    {
      "q": "What may happen when a plant loses too much water?",
      "choices": [
        "It grows faster.",
        "It wilts.",
        "It produces more flowers.",
        "It forms more fruits."
      ],
      "answer": 1
    },
    {
      "q": "How can plants reduce water loss?",
      "choices": [
        "By closing stomata",
        "By making more leaves",
        "By producing more roots",
        "By increasing photosynthesis"
      ],
      "answer": 0
    },
    {
      "q": "Why does transpiration help pull water upward?",
      "choices": [
        "It creates a pulling force in the xylem.",
        "It produces roots.",
        "It increases soil moisture.",
        "It stores sugar."
      ],
      "answer": 0
    },
    {
      "q": "A plant wilts during a hot day. What is the most likely reason?",
      "choices": [
        "Excessive water loss",
        "Increased pollination",
        "Too many fruits",
        "Increased sugar production"
      ],
      "answer": 0
    },
    {
      "q": "What would likely happen if stomata remained closed for a long time?",
      "choices": [
        "Water loss would decrease.",
        "Water loss would increase.",
        "Roots would stop growing immediately.",
        "Flowers would bloom faster."
      ],
      "answer": 0
    },
    {
      "q": "Why do water molecules sticking together help transport water?",
      "choices": [
        "They help maintain a continuous water column.",
        "They make sugar.",
        "They produce oxygen.",
        "They form seeds."
      ],
      "answer": 0
    },
    {
      "q": "Why is transpiration important in plant transport?",
      "choices": [
        "It supports the movement of water and minerals.",
        "It creates food.",
        "It absorbs sunlight.",
        "It stores water."
      ],
      "answer": 0
    }
  ],
  "9": [
    {
      "q": "Which plant organ absorbs water and minerals?",
      "choices": [
        "Roots",
        "Stem",
        "Leaves",
        "Flowers"
      ],
      "answer": 0
    },
    {
      "q": "Which organ produces food through photosynthesis?",
      "choices": [
        "Roots",
        "Flowers",
        "Leaves",
        "Seeds"
      ],
      "answer": 2
    },
    {
      "q": "Which organ provides support and transport pathways?",
      "choices": [
        "Flower",
        "Stem",
        "Fruit",
        "Seed"
      ],
      "answer": 1
    },
    {
      "q": "Which tissue carries water and minerals upward?",
      "choices": [
        "Phloem",
        "Cortex",
        "Cambium",
        "Xylem"
      ],
      "answer": 3
    },
    {
      "q": "Which tissue distributes sugars throughout the plant?",
      "choices": [
        "Phloem",
        "Xylem",
        "Epidermis",
        "Root hairs"
      ],
      "answer": 0
    },
    {
      "q": "Why do leaves need water supplied by roots?",
      "choices": [
        "For photosynthesis",
        "For pollination",
        "For reproduction",
        "For seed dispersal"
      ],
      "answer": 0
    },
    {
      "q": "What happens after roots absorb water?",
      "choices": [
        "It enters the xylem.",
        "It becomes sugar.",
        "It becomes oxygen.",
        "It leaves the plant."
      ],
      "answer": 0
    },
    {
      "q": "How does phloem help the plant?",
      "choices": [
        "It transports sugars to plant parts.",
        "It absorbs sunlight.",
        "It anchors the plant.",
        "It stores minerals."
      ],
      "answer": 0
    },
    {
      "q": "What process helps pull water upward through the xylem?",
      "choices": [
        "Pollination",
        "Fertilization",
        "Germination",
        "Transpiration"
      ],
      "answer": 3
    },
    {
      "q": "Why do roots, stems, and leaves work together?",
      "choices": [
        "To transport materials needed for growth",
        "To produce flowers only",
        "To create fruits only",
        "To make seeds only"
      ],
      "answer": 0
    },
    {
      "q": "If the roots are severely damaged, what will most likely happen?",
      "choices": [
        "Reduced water absorption",
        "Increased photosynthesis",
        "More flower production",
        "Faster fruit growth"
      ],
      "answer": 0
    },
    {
      "q": "Why is the stem important in plant transport?",
      "choices": [
        "It serves as a pathway for materials.",
        "It produces sunlight.",
        "It absorbs minerals.",
        "It stores seeds."
      ],
      "answer": 0
    },
    {
      "q": "Which sequence correctly describes plant transport?",
      "choices": [
        "Roots → Xylem → Leaves → Phloem",
        "Leaves → Roots → Flowers",
        "Flowers → Fruits → Roots",
        "Seeds → Leaves → Stem"
      ],
      "answer": 0
    },
    {
      "q": "What will happen if leaves cannot make enough food?",
      "choices": [
        "Plant growth may decrease.",
        "Roots absorb more water.",
        "Stems become fruits.",
        "Flowers become roots."
      ],
      "answer": 0
    },
    {
      "q": "Why is plant transport considered a system?",
      "choices": [
        "Plant organs depend on one another.",
        "Only roots perform all functions.",
        "Only leaves are important.",
        "Only stems perform transport."
      ],
      "answer": 0
    }
  ],
  "10": [
    {
      "q": "Which factor determines whether roots can absorb enough water?",
      "choices": [
        "Water availability",
        "Flower color",
        "Seed size",
        "Fruit shape"
      ],
      "answer": 0
    },
    {
      "q": "Which environmental factor affects how quickly water evaporates?",
      "choices": [
        "Temperature",
        "Fruit production",
        "Pollination",
        "Germination"
      ],
      "answer": 0
    },
    {
      "q": "What is humidity?",
      "choices": [
        "Amount of water vapor in the air",
        "Amount of soil in a pot",
        "Number of leaves on a plant",
        "Amount of sunlight"
      ],
      "answer": 0
    },
    {
      "q": "How can wind affect transpiration?",
      "choices": [
        "It can increase water loss.",
        "It can stop photosynthesis.",
        "It can produce flowers.",
        "It can create roots."
      ],
      "answer": 0
    },
    {
      "q": "Why is light important to plant transport?",
      "choices": [
        "It affects the opening and closing of stomata.",
        "It changes roots into stems.",
        "It forms minerals.",
        "It creates soil."
      ],
      "answer": 0
    },
    {
      "q": "What may happen if the soil becomes very dry?",
      "choices": [
        "Roots may absorb less water.",
        "Flowers may increase.",
        "Fruits may double in size.",
        "Seeds may immediately germinate."
      ],
      "answer": 0
    },
    {
      "q": "How does high humidity affect transpiration?",
      "choices": [
        "It slows water evaporation.",
        "It speeds water evaporation.",
        "It stops photosynthesis.",
        "It increases sugar production."
      ],
      "answer": 0
    },
    {
      "q": "Why are healthy roots important?",
      "choices": [
        "They absorb water and minerals efficiently.",
        "They produce sunlight.",
        "They make oxygen.",
        "They form flowers."
      ],
      "answer": 0
    },
    {
      "q": "What can happen if roots are damaged by disease?",
      "choices": [
        "Water absorption may decrease.",
        "Photosynthesis increases.",
        "More flowers develop.",
        "More fruits form."
      ],
      "answer": 0
    },
    {
      "q": "Why is suitable soil important?",
      "choices": [
        "It supports root growth and water absorption.",
        "It increases pollination.",
        "It forms chlorophyll.",
        "It produces oxygen."
      ],
      "answer": 0
    },
    {
      "q": "A plant is exposed to very hot weather. What will most likely happen?",
      "choices": [
        "Transpiration increases.",
        "Root growth stops immediately.",
        "Flowers become fruits.",
        "Sugar production stops permanently."
      ],
      "answer": 0
    },
    {
      "q": "Which condition will likely result in faster transpiration?",
      "choices": [
        "Dry air",
        "Humid air",
        "Cool air",
        "Wet soil"
      ],
      "answer": 0
    },
    {
      "q": "How can damaged leaves affect plant transport?",
      "choices": [
        "Less food may be produced.",
        "More water will be absorbed.",
        "Roots will disappear.",
        "Flowers will grow faster."
      ],
      "answer": 0
    },
    {
      "q": "Why might stomata close during water stress?",
      "choices": [
        "To reduce water loss",
        "To increase pollination",
        "To form seeds",
        "To absorb minerals"
      ],
      "answer": 0
    },
    {
      "q": "Which statement best explains why environmental factors affect plant transport?",
      "choices": [
        "They influence water movement and food distribution.",
        "They determine flower color only.",
        "They affect seeds only.",
        "They only affect fruits."
      ],
      "answer": 0
    }
  ]
};

const LESSONS = LESSON_TITLES.map((title, index) => ({
  title,
  subtitle: '',
  game: [],
  story: [],
  storyEnglish: [],
  storyTitle: '',
  simulation: [],
  discussion: [],
  quiz: QUIZZES[String(index + 1)] || []
}));

export default LESSONS;
export { LESSONS, QUIZZES };
