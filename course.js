const course = [
  { title: "Hear the building blocks", description: "The alphabet, familiar sounds, and first greetings.", lessons: [
    { title: "Your first Greek sounds", cards: [
      { scene:"🔤", greek:"Α α", say:"a · like ‘a’ in father", meaning:"The first Greek letter", }, { scene:"🔤", greek:"Β β", say:"v · like ‘v’ in very", meaning:"A Greek v sound" }, { scene:"🔤", greek:"Ε ε", say:"e · like ‘e’ in bed", meaning:"A Greek e sound" }] },
    { title: "More letters to hear", cards: [
      { scene:"🎵", greek:"Κ κ", say:"k · like ‘k’ in kite", meaning:"A Greek k sound" }, { scene:"🎵", greek:"Μ μ", say:"m · like ‘m’ in mother", meaning:"A Greek m sound" }, { scene:"🎵", greek:"Ν ν", say:"n · like ‘n’ in name", meaning:"A Greek n sound" }] },
    { title: "Hello", cards: [
      { scene:"👋", greek:"Γεια", say:"ya", meaning:"Hello" }, { scene:"👋", greek:"Γεια σου", say:"ya sou", meaning:"Hello, to one person" }, { scene:"🌅", greek:"Καλημέρα", say:"ka-lee-ME-ra", meaning:"Good morning" }] },
    { title: "Kind words", cards: [
      { scene:"🙏", greek:"Ευχαριστώ", say:"ef-ha-ri-STO", meaning:"Thank you" }, { scene:"🌼", greek:"Παρακαλώ", say:"pa-ra-ka-LO", meaning:"Please / you’re welcome" }, { scene:"😔", greek:"Συγγνώμη", say:"see-GNO-mee", meaning:"Excuse me / sorry" }] },
    { title: "Yes and no", cards: [
      { scene:"✅", greek:"Ναι", say:"neh", meaning:"Yes" }, { scene:"❌", greek:"Όχι", say:"O-hi", meaning:"No" }, { scene:"🤔", greek:"Ίσως", say:"EE-sos", meaning:"Maybe" }] }
  ]},
  { title: "Meet people", description: "Say who you are and connect with new people.", lessons: [
    { title:"Me and you", cards:[{scene:"🙂",greek:"Εγώ",say:"e-GO",meaning:"I / me"},{scene:"🫵",greek:"Εσύ",say:"e-SEE",meaning:"You"},{scene:"🤝",greek:"Εγώ είμαι",say:"e-GO EE-me",meaning:"I am"}] },
    { title:"Names", cards:[{scene:"🏷️",greek:"Πώς σε λένε;",say:"pos se LE-ne",meaning:"What is your name?"},{scene:"🏷️",greek:"Με λένε…",say:"me LE-ne",meaning:"My name is…"},{scene:"😊",greek:"Χάρηκα",say:"HA-ri-ka",meaning:"Nice to meet you"}] },
    { title:"People around you", cards:[{scene:"👨",greek:"Άντρας",say:"AN-dras",meaning:"Man"},{scene:"👩",greek:"Γυναίκα",say:"yee-NE-ka",meaning:"Woman"},{scene:"🧒",greek:"Παιδί",say:"pe-THEE",meaning:"Child"}] },
    { title:"Friends and family", cards:[{scene:"👩‍👧",greek:"Μαμά",say:"ma-MA",meaning:"Mom"},{scene:"👨‍👧",greek:"Μπαμπάς",say:"ba-BAS",meaning:"Dad"},{scene:"🧑‍🤝‍🧑",greek:"Φίλος",say:"FEE-los",meaning:"Friend"}] },
    { title:"A short introduction", cards:[{scene:"🙋",greek:"Είμαι η Άννα",say:"EE-me i A-na",meaning:"I am Anna"},{scene:"🤝",greek:"Χαίρω πολύ",say:"HE-ro po-LEE",meaning:"Pleased to meet you"},{scene:"💬",greek:"Και εσύ;",say:"ke e-SEE",meaning:"And you?"}] }
  ]},
  { title: "Everyday things", description: "Use common words for food, home, color, and numbers.", lessons: [
    { title:"Coffee and drinks", cards:[{scene:"☕",greek:"Καφές",say:"ka-FES",meaning:"Coffee"},{scene:"💧",greek:"Νερό",say:"ne-RO",meaning:"Water"},{scene:"🧃",greek:"Χυμός",say:"hee-MOS",meaning:"Juice"}] },
    { title:"Food", cards:[{scene:"🍞",greek:"Ψωμί",say:"pso-MEE",meaning:"Bread"},{scene:"🧀",greek:"Τυρί",say:"tee-REE",meaning:"Cheese"},{scene:"🍎",greek:"Μήλο",say:"MEE-lo",meaning:"Apple"}] },
    { title:"At home", cards:[{scene:"🏠",greek:"Σπίτι",say:"SPEE-ti",meaning:"Home"},{scene:"🚪",greek:"Πόρτα",say:"POR-ta",meaning:"Door"},{scene:"🪟",greek:"Παράθυρο",say:"pa-RA-thee-ro",meaning:"Window"}] },
    { title:"Colors", cards:[{scene:"🔵",greek:"Μπλε",say:"ble",meaning:"Blue"},{scene:"🔴",greek:"Κόκκινο",say:"KO-kee-no",meaning:"Red"},{scene:"🟢",greek:"Πράσινο",say:"PRA-see-no",meaning:"Green"}] },
    { title:"First numbers", cards:[{scene:"1️⃣",greek:"Ένα",say:"E-na",meaning:"One"},{scene:"2️⃣",greek:"Δύο",say:"THEE-o",meaning:"Two"},{scene:"3️⃣",greek:"Τρία",say:"TREE-a",meaning:"Three"}] }
  ]},
  { title: "Your day", description: "Talk about time, needs, and familiar routines.", lessons: [
    { title:"Time of day", cards:[{scene:"🌅",greek:"Πρωί",say:"pro-EE",meaning:"Morning"},{scene:"☀️",greek:"Σήμερα",say:"SEE-me-ra",meaning:"Today"},{scene:"🌙",greek:"Βράδυ",say:"VRA-thee",meaning:"Evening"}] },
    { title:"Days", cards:[{scene:"📅",greek:"Δευτέρα",say:"thef-TE-ra",meaning:"Monday"},{scene:"📅",greek:"Σαββατοκύριακο",say:"sa-va-to-KEE-ri-ko",meaning:"Weekend"},{scene:"📆",greek:"Αύριο",say:"A-vri-o",meaning:"Tomorrow"}] },
    { title:"Things you like", cards:[{scene:"❤️",greek:"Μου αρέσει",say:"mou a-RE-see",meaning:"I like it"},{scene:"👍",greek:"Πολύ",say:"po-LEE",meaning:"A lot / very"},{scene:"👎",greek:"Δεν μου αρέσει",say:"then mou a-RE-see",meaning:"I do not like it"}] },
    { title:"What you need", cards:[{scene:"🙋",greek:"Θέλω",say:"THE-lo",meaning:"I want"},{scene:"💧",greek:"Χρειάζομαι νερό",say:"hri-A-zo-me ne-RO",meaning:"I need water"},{scene:"✅",greek:"Εντάξει",say:"en-DA-ksee",meaning:"Okay"}] },
    { title:"Work and learning", cards:[{scene:"💼",greek:"Δουλειά",say:"thou-LYA",meaning:"Work"},{scene:"📚",greek:"Μαθαίνω",say:"ma-THE-no",meaning:"I am learning"},{scene:"🇬🇷",greek:"Ελληνικά",say:"e-lee-nee-KA",meaning:"Greek language"}] }
  ]},
  { title: "Move through the city", description: "Find places, ask directions, and get around.", lessons: [
    { title:"Here and there", cards:[{scene:"📍",greek:"Εδώ",say:"e-THO",meaning:"Here"},{scene:"➡️",greek:"Εκεί",say:"e-KEE",meaning:"There"},{scene:"❓",greek:"Πού;",say:"pou",meaning:"Where?"}] },
    { title:"Simple directions", cards:[{scene:"⬅️",greek:"Αριστερά",say:"a-ri-ste-RA",meaning:"Left"},{scene:"➡️",greek:"Δεξιά",say:"thek-sya",meaning:"Right"},{scene:"⬆️",greek:"Ευθεία",say:"ef-thee-A",meaning:"Straight ahead"}] },
    { title:"Places in town", cards:[{scene:"☕",greek:"Καφέ",say:"ka-FE",meaning:"Café"},{scene:"🍽️",greek:"Εστιατόριο",say:"e-stya-TO-ryo",meaning:"Restaurant"},{scene:"🏪",greek:"Κατάστημα",say:"ka-TA-sti-ma",meaning:"Shop"}] },
    { title:"Transport", cards:[{scene:"🚌",greek:"Λεωφορείο",say:"le-o-fo-REE-o",meaning:"Bus"},{scene:"🚕",greek:"Ταξί",say:"ta-KSEE",meaning:"Taxi"},{scene:"🚉",greek:"Σταθμός",say:"sta-THMOS",meaning:"Station"}] },
    { title:"In a shop", cards:[{scene:"💶",greek:"Πόσο κάνει;",say:"PO-so KA-nee",meaning:"How much is it?"},{scene:"🛍️",greek:"Θα το πάρω",say:"tha to PA-ro",meaning:"I’ll take it"},{scene:"🙏",greek:"Ευχαριστώ πολύ",say:"ef-ha-ri-STO po-LEE",meaning:"Thank you very much"}] }
  ]},
  { title: "Travel with confidence", description: "Handle the essential moments of a trip to Greece.", lessons: [
    { title:"At the hotel", cards:[{scene:"🏨",greek:"Ξενοδοχείο",say:"kse-no-tho-HEE-o",meaning:"Hotel"},{scene:"🗝️",greek:"Κλειδί",say:"klee-THEE",meaning:"Key"},{scene:"🛏️",greek:"Δωμάτιο",say:"tho-MA-tyo",meaning:"Room"}] },
    { title:"At a restaurant", cards:[{scene:"📋",greek:"Μενού",say:"me-NOU",meaning:"Menu"},{scene:"🍽️",greek:"Το λογαριασμό, παρακαλώ",say:"to lo-ga-rya-SMO pa-ra-ka-LO",meaning:"The bill, please"},{scene:"😋",greek:"Νόστιμο",say:"NO-sti-mo",meaning:"Delicious"}] },
    { title:"Sun and sea", cards:[{scene:"🏖️",greek:"Παραλία",say:"pa-ra-LEE-a",meaning:"Beach"},{scene:"☀️",greek:"Ήλιος",say:"EE-lyos",meaning:"Sun"},{scene:"🌊",greek:"Θάλασσα",say:"THA-la-sa",meaning:"Sea"}] },
    { title:"When you need help", cards:[{scene:"🆘",greek:"Βοήθεια!",say:"vo-EE-thya",meaning:"Help!"},{scene:"🚻",greek:"Πού είναι η τουαλέτα;",say:"pou EE-ne i tou-a-LE-ta",meaning:"Where is the bathroom?"},{scene:"🤷",greek:"Δεν καταλαβαίνω",say:"then ka-ta-la-VE-no",meaning:"I do not understand"}] },
    { title:"Your first conversation", cards:[{scene:"👋",greek:"Γεια σου!",say:"ya sou",meaning:"Hello!"},{scene:"☕",greek:"Έναν καφέ, παρακαλώ",say:"E-nan ka-FE pa-ra-ka-LO",meaning:"A coffee, please"},{scene:"👋",greek:"Αντίο",say:"an-DEE-o",meaning:"Goodbye"}] }
  ]}
];
