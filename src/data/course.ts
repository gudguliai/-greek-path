// Greek Path course content — ported from the original course.js, with stable
// card ids so spaced-review records survive content edits.

export type Card = {
  id: string; // "u1-l1-c1" — stable key for spaced review
  scene: string;
  greek: string;
  say: string;
  meaning: string;
};

export type Lesson = {
  title: string;
  cards: Card[];
};

export type Unit = {
  title: string;
  description: string;
  lessons: Lesson[];
};

export type ConversationStep = {
  speaker: 'native' | 'learner';
  greek: string;
  say: string;
  meaning: string;
  accepted?: string[]; // accent-insensitive variants for the learner's typed response
};

export type Conversation = {
  id: string;
  unit: number; // 1-based unit index
  title: string;
  scene: string;
  steps: ConversationStep[];
};

export const course: Unit[] = [
  {
    title: 'Hear the building blocks',
    description: 'The alphabet, familiar sounds, and first greetings.',
    lessons: [
      {
        title: 'Your first Greek sounds',
        cards: [
          { id: 'u1-l1-c1', scene: '🔤', greek: 'Α α', say: 'a · like ‘a’ in father', meaning: 'The first Greek letter' },
          { id: 'u1-l1-c2', scene: '🔤', greek: 'Β β', say: 'v · like ‘v’ in very', meaning: 'A Greek v sound' },
          { id: 'u1-l1-c3', scene: '🔤', greek: 'Ε ε', say: 'e · like ‘e’ in bed', meaning: 'A Greek e sound' },
        ],
      },
      {
        title: 'More letters to hear',
        cards: [
          { id: 'u1-l2-c1', scene: '🎵', greek: 'Κ κ', say: 'k · like ‘k’ in kite', meaning: 'A Greek k sound' },
          { id: 'u1-l2-c2', scene: '🎵', greek: 'Μ μ', say: 'm · like ‘m’ in mother', meaning: 'A Greek m sound' },
          { id: 'u1-l2-c3', scene: '🎵', greek: 'Ν ν', say: 'n · like ‘n’ in name', meaning: 'A Greek n sound' },
        ],
      },
      {
        title: 'Hello',
        cards: [
          { id: 'u1-l3-c1', scene: '👋', greek: 'Γεια', say: 'ya', meaning: 'Hello' },
          { id: 'u1-l3-c2', scene: '👋', greek: 'Γεια σου', say: 'ya sou', meaning: 'Hello, to one person' },
          { id: 'u1-l3-c3', scene: '🌅', greek: 'Καλημέρα', say: 'ka-lee-ME-ra', meaning: 'Good morning' },
        ],
      },
      {
        title: 'Kind words',
        cards: [
          { id: 'u1-l4-c1', scene: '🙏', greek: 'Ευχαριστώ', say: 'ef-ha-ri-STO', meaning: 'Thank you' },
          { id: 'u1-l4-c2', scene: '🌼', greek: 'Παρακαλώ', say: 'pa-ra-ka-LO', meaning: 'Please / you’re welcome' },
          { id: 'u1-l4-c3', scene: '😔', greek: 'Συγγνώμη', say: 'see-GNO-mee', meaning: 'Excuse me / sorry' },
        ],
      },
      {
        title: 'Yes and no',
        cards: [
          { id: 'u1-l5-c1', scene: '✅', greek: 'Ναι', say: 'neh', meaning: 'Yes' },
          { id: 'u1-l5-c2', scene: '❌', greek: 'Όχι', say: 'O-hi', meaning: 'No' },
          { id: 'u1-l5-c3', scene: '🤔', greek: 'Ίσως', say: 'EE-sos', meaning: 'Maybe' },
        ],
      },
    ],
  },
  {
    title: 'Meet people',
    description: 'Say who you are and connect with new people.',
    lessons: [
      {
        title: 'Me and you',
        cards: [
          { id: 'u2-l1-c1', scene: '🙂', greek: 'Εγώ', say: 'e-GO', meaning: 'I / me' },
          { id: 'u2-l1-c2', scene: '🫵', greek: 'Εσύ', say: 'e-SEE', meaning: 'You' },
          { id: 'u2-l1-c3', scene: '🤝', greek: 'Εγώ είμαι', say: 'e-GO EE-me', meaning: 'I am' },
        ],
      },
      {
        title: 'Names',
        cards: [
          { id: 'u2-l2-c1', scene: '🏷️', greek: 'Πώς σε λένε;', say: 'pos se LE-ne', meaning: 'What is your name?' },
          { id: 'u2-l2-c2', scene: '🏷️', greek: 'Με λένε…', say: 'me LE-ne', meaning: 'My name is…' },
          { id: 'u2-l2-c3', scene: '😊', greek: 'Χάρηκα', say: 'HA-ri-ka', meaning: 'Nice to meet you' },
        ],
      },
      {
        title: 'People around you',
        cards: [
          { id: 'u2-l3-c1', scene: '👨', greek: 'Άντρας', say: 'AN-dras', meaning: 'Man' },
          { id: 'u2-l3-c2', scene: '👩', greek: 'Γυναίκα', say: 'yee-NE-ka', meaning: 'Woman' },
          { id: 'u2-l3-c3', scene: '🧒', greek: 'Παιδί', say: 'pe-THEE', meaning: 'Child' },
        ],
      },
      {
        title: 'Friends and family',
        cards: [
          { id: 'u2-l4-c1', scene: '👩‍👧', greek: 'Μαμά', say: 'ma-MA', meaning: 'Mom' },
          { id: 'u2-l4-c2', scene: '👨‍👧', greek: 'Μπαμπάς', say: 'ba-BAS', meaning: 'Dad' },
          { id: 'u2-l4-c3', scene: '🧑‍🤝‍🧑', greek: 'Φίλος', say: 'FEE-los', meaning: 'Friend' },
        ],
      },
      {
        title: 'A short introduction',
        cards: [
          { id: 'u2-l5-c1', scene: '🙋', greek: 'Είμαι η Άννα', say: 'EE-me i A-na', meaning: 'I am Anna' },
          { id: 'u2-l5-c2', scene: '🤝', greek: 'Χαίρω πολύ', say: 'HE-ro po-LEE', meaning: 'Pleased to meet you' },
          { id: 'u2-l5-c3', scene: '💬', greek: 'Και εσύ;', say: 'ke e-SEE', meaning: 'And you?' },
        ],
      },
    ],
  },
  {
    title: 'Everyday things',
    description: 'Use common words for food, home, color, and numbers.',
    lessons: [
      {
        title: 'Coffee and drinks',
        cards: [
          { id: 'u3-l1-c1', scene: '☕', greek: 'Καφές', say: 'ka-FES', meaning: 'Coffee' },
          { id: 'u3-l1-c2', scene: '💧', greek: 'Νερό', say: 'ne-RO', meaning: 'Water' },
          { id: 'u3-l1-c3', scene: '🧃', greek: 'Χυμός', say: 'hee-MOS', meaning: 'Juice' },
        ],
      },
      {
        title: 'Food',
        cards: [
          { id: 'u3-l2-c1', scene: '🍞', greek: 'Ψωμί', say: 'pso-MEE', meaning: 'Bread' },
          { id: 'u3-l2-c2', scene: '🧀', greek: 'Τυρί', say: 'tee-REE', meaning: 'Cheese' },
          { id: 'u3-l2-c3', scene: '🍎', greek: 'Μήλο', say: 'MEE-lo', meaning: 'Apple' },
        ],
      },
      {
        title: 'At home',
        cards: [
          { id: 'u3-l3-c1', scene: '🏠', greek: 'Σπίτι', say: 'SPEE-ti', meaning: 'Home' },
          { id: 'u3-l3-c2', scene: '🚪', greek: 'Πόρτα', say: 'POR-ta', meaning: 'Door' },
          { id: 'u3-l3-c3', scene: '🪟', greek: 'Παράθυρο', say: 'pa-RA-thee-ro', meaning: 'Window' },
        ],
      },
      {
        title: 'Colors',
        cards: [
          { id: 'u3-l4-c1', scene: '🔵', greek: 'Μπλε', say: 'ble', meaning: 'Blue' },
          { id: 'u3-l4-c2', scene: '🔴', greek: 'Κόκκινο', say: 'KO-kee-no', meaning: 'Red' },
          { id: 'u3-l4-c3', scene: '🟢', greek: 'Πράσινο', say: 'PRA-see-no', meaning: 'Green' },
        ],
      },
      {
        title: 'First numbers',
        cards: [
          { id: 'u3-l5-c1', scene: '1️⃣', greek: 'Ένα', say: 'E-na', meaning: 'One' },
          { id: 'u3-l5-c2', scene: '2️⃣', greek: 'Δύο', say: 'THEE-o', meaning: 'Two' },
          { id: 'u3-l5-c3', scene: '3️⃣', greek: 'Τρία', say: 'TREE-a', meaning: 'Three' },
        ],
      },
    ],
  },
  {
    title: 'Your day',
    description: 'Talk about time, needs, and familiar routines.',
    lessons: [
      {
        title: 'Time of day',
        cards: [
          { id: 'u4-l1-c1', scene: '🌅', greek: 'Πρωί', say: 'pro-EE', meaning: 'Morning' },
          { id: 'u4-l1-c2', scene: '☀️', greek: 'Σήμερα', say: 'SEE-me-ra', meaning: 'Today' },
          { id: 'u4-l1-c3', scene: '🌙', greek: 'Βράδυ', say: 'VRA-thee', meaning: 'Evening' },
        ],
      },
      {
        title: 'Days',
        cards: [
          { id: 'u4-l2-c1', scene: '📅', greek: 'Δευτέρα', say: 'thef-TE-ra', meaning: 'Monday' },
          { id: 'u4-l2-c2', scene: '📅', greek: 'Σαββατοκύριακο', say: 'sa-va-to-KEE-ri-ko', meaning: 'Weekend' },
          { id: 'u4-l2-c3', scene: '📆', greek: 'Αύριο', say: 'A-vri-o', meaning: 'Tomorrow' },
        ],
      },
      {
        title: 'Things you like',
        cards: [
          { id: 'u4-l3-c1', scene: '❤️', greek: 'Μου αρέσει', say: 'mou a-RE-see', meaning: 'I like it' },
          { id: 'u4-l3-c2', scene: '👍', greek: 'Πολύ', say: 'po-LEE', meaning: 'A lot / very' },
          { id: 'u4-l3-c3', scene: '👎', greek: 'Δεν μου αρέσει', say: 'then mou a-RE-see', meaning: 'I do not like it' },
        ],
      },
      {
        title: 'What you need',
        cards: [
          { id: 'u4-l4-c1', scene: '🙋', greek: 'Θέλω', say: 'THE-lo', meaning: 'I want' },
          { id: 'u4-l4-c2', scene: '💧', greek: 'Χρειάζομαι νερό', say: 'hri-A-zo-me ne-RO', meaning: 'I need water' },
          { id: 'u4-l4-c3', scene: '✅', greek: 'Εντάξει', say: 'en-DA-ksee', meaning: 'Okay' },
        ],
      },
      {
        title: 'Work and learning',
        cards: [
          { id: 'u4-l5-c1', scene: '💼', greek: 'Δουλειά', say: 'thou-LYA', meaning: 'Work' },
          { id: 'u4-l5-c2', scene: '📚', greek: 'Μαθαίνω', say: 'ma-THE-no', meaning: 'I am learning' },
          { id: 'u4-l5-c3', scene: '🇬🇷', greek: 'Ελληνικά', say: 'e-lee-nee-KA', meaning: 'Greek language' },
        ],
      },
    ],
  },
  {
    title: 'Move through the city',
    description: 'Find places, ask directions, and get around.',
    lessons: [
      {
        title: 'Here and there',
        cards: [
          { id: 'u5-l1-c1', scene: '📍', greek: 'Εδώ', say: 'e-THO', meaning: 'Here' },
          { id: 'u5-l1-c2', scene: '➡️', greek: 'Εκεί', say: 'e-KEE', meaning: 'There' },
          { id: 'u5-l1-c3', scene: '❓', greek: 'Πού;', say: 'pou', meaning: 'Where?' },
        ],
      },
      {
        title: 'Simple directions',
        cards: [
          { id: 'u5-l2-c1', scene: '⬅️', greek: 'Αριστερά', say: 'a-ri-ste-RA', meaning: 'Left' },
          { id: 'u5-l2-c2', scene: '➡️', greek: 'Δεξιά', say: 'thek-sya', meaning: 'Right' },
          { id: 'u5-l2-c3', scene: '⬆️', greek: 'Ευθεία', say: 'ef-thee-A', meaning: 'Straight ahead' },
        ],
      },
      {
        title: 'Places in town',
        cards: [
          { id: 'u5-l3-c1', scene: '☕', greek: 'Καφέ', say: 'ka-FE', meaning: 'Café' },
          { id: 'u5-l3-c2', scene: '🍽️', greek: 'Εστιατόριο', say: 'e-stya-TO-ryo', meaning: 'Restaurant' },
          { id: 'u5-l3-c3', scene: '🏪', greek: 'Κατάστημα', say: 'ka-TA-sti-ma', meaning: 'Shop' },
        ],
      },
      {
        title: 'Transport',
        cards: [
          { id: 'u5-l4-c1', scene: '🚌', greek: 'Λεωφορείο', say: 'le-o-fo-REE-o', meaning: 'Bus' },
          { id: 'u5-l4-c2', scene: '🚕', greek: 'Ταξί', say: 'ta-KSEE', meaning: 'Taxi' },
          { id: 'u5-l4-c3', scene: '🚉', greek: 'Σταθμός', say: 'sta-THMOS', meaning: 'Station' },
        ],
      },
      {
        title: 'In a shop',
        cards: [
          { id: 'u5-l5-c1', scene: '💶', greek: 'Πόσο κάνει;', say: 'PO-so KA-nee', meaning: 'How much is it?' },
          { id: 'u5-l5-c2', scene: '🛍️', greek: 'Θα το πάρω', say: 'tha to PA-ro', meaning: 'I’ll take it' },
          { id: 'u5-l5-c3', scene: '🙏', greek: 'Ευχαριστώ πολύ', say: 'ef-ha-ri-STO po-LEE', meaning: 'Thank you very much' },
        ],
      },
    ],
  },
  {
    title: 'Travel with confidence',
    description: 'Handle the essential moments of a trip to Greece.',
    lessons: [
      {
        title: 'At the hotel',
        cards: [
          { id: 'u6-l1-c1', scene: '🏨', greek: 'Ξενοδοχείο', say: 'kse-no-tho-HEE-o', meaning: 'Hotel' },
          { id: 'u6-l1-c2', scene: '🗝️', greek: 'Κλειδί', say: 'klee-THEE', meaning: 'Key' },
          { id: 'u6-l1-c3', scene: '🛏️', greek: 'Δωμάτιο', say: 'tho-MA-tyo', meaning: 'Room' },
        ],
      },
      {
        title: 'At a restaurant',
        cards: [
          { id: 'u6-l2-c1', scene: '📋', greek: 'Μενού', say: 'me-NOU', meaning: 'Menu' },
          { id: 'u6-l2-c2', scene: '🍽️', greek: 'Το λογαριασμό, παρακαλώ', say: 'to lo-ga-rya-SMO pa-ra-ka-LO', meaning: 'The bill, please' },
          { id: 'u6-l2-c3', scene: '😋', greek: 'Νόστιμο', say: 'NO-sti-mo', meaning: 'Delicious' },
        ],
      },
      {
        title: 'Sun and sea',
        cards: [
          { id: 'u6-l3-c1', scene: '🏖️', greek: 'Παραλία', say: 'pa-ra-LEE-a', meaning: 'Beach' },
          { id: 'u6-l3-c2', scene: '☀️', greek: 'Ήλιος', say: 'EE-lyos', meaning: 'Sun' },
          { id: 'u6-l3-c3', scene: '🌊', greek: 'Θάλασσα', say: 'THA-la-sa', meaning: 'Sea' },
        ],
      },
      {
        title: 'When you need help',
        cards: [
          { id: 'u6-l4-c1', scene: '🆘', greek: 'Βοήθεια!', say: 'vo-EE-thya', meaning: 'Help!' },
          { id: 'u6-l4-c2', scene: '🚻', greek: 'Πού είναι η τουαλέτα;', say: 'pou EE-ne i tou-a-LE-ta', meaning: 'Where is the bathroom?' },
          { id: 'u6-l4-c3', scene: '🤷', greek: 'Δεν καταλαβαίνω', say: 'then ka-ta-la-VE-no', meaning: 'I do not understand' },
        ],
      },
      {
        title: 'Your first conversation',
        cards: [
          { id: 'u6-l5-c1', scene: '👋', greek: 'Γεια σου!', say: 'ya sou', meaning: 'Hello!' },
          { id: 'u6-l5-c2', scene: '☕', greek: 'Έναν καφέ, παρακαλώ', say: 'E-nan ka-FE pa-ra-ka-LO', meaning: 'A coffee, please' },
          { id: 'u6-l5-c3', scene: '👋', greek: 'Αντίο', say: 'an-DEE-o', meaning: 'Goodbye' },
        ],
      },
    ],
  },
];

export const conversations: Conversation[] = [
  {
    id: 'conv-1',
    unit: 1,
    title: 'First hello',
    scene: '👋',
    steps: [
      { speaker: 'native', greek: 'Γεια σου!', say: 'ya sou', meaning: 'Hello!' },
      { speaker: 'learner', greek: 'Γεια σου!', say: 'ya sou', meaning: 'Hello!', accepted: ['γεια', 'γεια σου'] },
      { speaker: 'native', greek: 'Τι κάνεις;', say: 'ti KA-nis', meaning: 'How are you?' },
      { speaker: 'learner', greek: 'Καλά, ευχαριστώ.', say: 'ka-LA ef-ha-ri-STO', meaning: 'Good, thanks.', accepted: ['καλά', 'καλα', 'καλά ευχαριστώ', 'καλα ευχαριστω'] },
      { speaker: 'native', greek: 'Χάρηκα!', say: 'HA-ri-ka', meaning: 'Nice to meet you!' },
      { speaker: 'learner', greek: 'Χάρηκα!', say: 'HA-ri-ka', meaning: 'Nice to meet you!', accepted: ['χάρηκα', 'χαρηκα'] },
    ],
  },
  {
    id: 'conv-2',
    unit: 2,
    title: 'Meeting someone',
    scene: '🙋',
    steps: [
      { speaker: 'native', greek: 'Πώς σε λένε;', say: 'pos se LE-ne', meaning: 'What is your name?' },
      { speaker: 'learner', greek: 'Με λένε Άννα.', say: 'me LE-ne A-na', meaning: 'My name is Anna.', accepted: ['με λένε άννα', 'με λένε αννα', 'άννα', 'αννα'] },
      { speaker: 'native', greek: 'Εγώ είμαι ο Νίκος.', say: 'e-GO EE-me o NEE-kos', meaning: 'I am Nikos.' },
      { speaker: 'learner', greek: 'Χαίρω πολύ.', say: 'HE-ro po-LEE', meaning: 'Pleased to meet you.', accepted: ['χαίρω πολύ', 'χαιρω πολυ'] },
      { speaker: 'native', greek: 'Και εσύ;', say: 'ke e-SEE', meaning: 'And you?' },
      { speaker: 'learner', greek: 'Είμαι καλά, ευχαριστώ.', say: 'EE-me ka-LA ef-ha-ri-STO', meaning: 'I am well, thanks.', accepted: ['καλά', 'καλα', 'είμαι καλά', 'ειμαι καλα'] },
    ],
  },
  {
    id: 'conv-3',
    unit: 3,
    title: 'At the café',
    scene: '☕',
    steps: [
      { speaker: 'native', greek: 'Τι θα πιείτε;', say: 'ti tha pee-EE-te', meaning: 'What will you drink?' },
      { speaker: 'learner', greek: 'Έναν καφέ, παρακαλώ.', say: 'E-nan ka-FE pa-ra-ka-LO', meaning: 'A coffee, please.', accepted: ['έναν καφέ', 'εναν καφε', 'έναν καφέ παρακαλώ', 'εναν καφε παρακαλω'] },
      { speaker: 'native', greek: 'Νερό ή χυμό;', say: 'ne-RO ee hee-MO', meaning: 'Water or juice?' },
      { speaker: 'learner', greek: 'Νερό, παρακαλώ.', say: 'ne-RO pa-ra-ka-LO', meaning: 'Water, please.', accepted: ['νερό', 'νερο', 'νερό παρακαλώ', 'νερο παρακαλω'] },
      { speaker: 'native', greek: 'Ευχαριστώ πολύ!', say: 'ef-ha-ri-STO po-LEE', meaning: 'Thank you very much!' },
      { speaker: 'learner', greek: 'Παρακαλώ!', say: 'pa-ra-ka-LO', meaning: 'You are welcome!', accepted: ['παρακαλώ', 'παρακαλω'] },
    ],
  },
  {
    id: 'conv-4',
    unit: 4,
    title: 'A busy day',
    scene: '📅',
    steps: [
      { speaker: 'native', greek: 'Τι κάνεις σήμερα;', say: 'ti KA-nis SEE-me-ra', meaning: 'What are you doing today?' },
      { speaker: 'learner', greek: 'Σήμερα μαθαίνω ελληνικά.', say: 'SEE-me-ra ma-THE-no e-lee-nee-KA', meaning: 'Today I am learning Greek.', accepted: ['μαθαίνω ελληνικά', 'μαθαινω ελληνικα', 'σήμερα μαθαίνω ελληνικά', 'σημερα μαθαινω ελληνικα'] },
      { speaker: 'native', greek: 'Θέλεις καφέ;', say: 'THE-lis ka-FE', meaning: 'Do you want coffee?' },
      { speaker: 'learner', greek: 'Ναι, ευχαριστώ!', say: 'neh ef-ha-ri-STO', meaning: 'Yes, thanks!', accepted: ['ναι', 'ναι ευχαριστώ', 'ναι ευχαριστω'] },
      { speaker: 'native', greek: 'Πολύ ωραία!', say: 'po-LEE o-RE-a', meaning: 'Very nice!' },
      { speaker: 'learner', greek: 'Εντάξει, αύριο πάλι!', say: 'en-DA-ksee A-vri-o PA-lee', meaning: 'Okay, again tomorrow!', accepted: ['εντάξει', 'ενταξει'] },
    ],
  },
  {
    id: 'conv-5',
    unit: 5,
    title: 'Asking for directions',
    scene: '📍',
    steps: [
      { speaker: 'learner', greek: 'Πού είναι το καφέ;', say: 'pou EE-ne to ka-FE', meaning: 'Where is the café?', accepted: ['πού είναι το καφέ', 'που ειναι το καφε', 'πού είναι', 'που ειναι'] },
      { speaker: 'native', greek: 'Ευθεία και αριστερά.', say: 'ef-thee-A ke a-ri-ste-RA', meaning: 'Straight ahead and left.' },
      { speaker: 'learner', greek: 'Αριστερά ή δεξιά;', say: 'a-ri-ste-RA ee thek-sya', meaning: 'Left or right?', accepted: ['αριστερά', 'αριστερα', 'αριστερά ή δεξιά', 'αριστερα ή δεξια'] },
      { speaker: 'native', greek: 'Αριστερά, δίπλα στο κατάστημα.', say: 'a-ri-ste-RA THEE-pla sto ka-TA-sti-ma', meaning: 'Left, next to the shop.' },
      { speaker: 'learner', greek: 'Ευχαριστώ πολύ!', say: 'ef-ha-ri-STO po-LEE', meaning: 'Thank you very much!', accepted: ['ευχαριστώ πολύ', 'ευχαριστω πολυ', 'ευχαριστώ', 'ευχαριστω'] },
      { speaker: 'native', greek: 'Παρακαλώ, καλή τύχη!', say: 'pa-ra-ka-LO ka-LEE TEE-hee', meaning: 'You are welcome, good luck!' },
    ],
  },
  {
    id: 'conv-6',
    unit: 6,
    title: 'Checking into the hotel',
    scene: '🏨',
    steps: [
      { speaker: 'native', greek: 'Καλησπέρα, καλώς ήρθατε!', say: 'ka-lee-SPE-ra ka-LOS EER-tha-te', meaning: 'Good evening, welcome!' },
      { speaker: 'learner', greek: 'Καλησπέρα, ευχαριστώ.', say: 'ka-lee-SPE-ra ef-ha-ri-STO', meaning: 'Good evening, thanks.', accepted: ['καλησπέρα', 'καλησπερα', 'καλησπέρα ευχαριστώ', 'καλησπερα ευχαριστω'] },
      { speaker: 'native', greek: 'Έχετε το δωμάτιο;', say: 'E-che-te to tho-MA-tyo', meaning: 'Do you have the room?' },
      { speaker: 'learner', greek: 'Ναι, το κλειδί, παρακαλώ.', say: 'neh to klee-THEE pa-ra-ka-LO', meaning: 'Yes, the key, please.', accepted: ['το κλειδί', 'το κλειδι', 'ναι το κλειδί', 'ναι το κλειδι'] },
      { speaker: 'native', greek: 'Ορίστε. Καλή διαμονή!', say: 'o-REE-ste ka-LEE dya-mo-NEE', meaning: 'Here you go. Enjoy your stay!' },
      { speaker: 'learner', greek: 'Ευχαριστώ, αντίο!', say: 'ef-ha-ri-STO an-DEE-o', meaning: 'Thanks, goodbye!', accepted: ['ευχαριστώ αντίο', 'ευχαριστω αντιο', 'αντίο', 'αντιο'] },
    ],
  },
];

// Flat helpers
export const flatLessons = course.flatMap((unit, unitIndex) =>
  unit.lessons.map((lesson, lessonIndex) => ({
    ...lesson,
    unitIndex,
    unitTitle: unit.title,
    globalIndex: course.slice(0, unitIndex).reduce((n, u) => n + u.lessons.length, 0) + lessonIndex,
  }))
);

export const allCards = flatLessons.flatMap((lesson) => lesson.cards);

export function findCard(cardId: string): Card | undefined {
  return allCards.find((c) => c.id === cardId);
}
