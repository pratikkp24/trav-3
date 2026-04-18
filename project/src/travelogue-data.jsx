// Travelogue index + full Goa article
// Replaces the old "Stories" section with richer editorial content.

const TRAVELOGUE_CATEGORIES = ['All','Adventure','Food','Culture','Wellness','Slow Travel'];

const TRAVELOGUES = [
  {
    id:'goa-2025',
    title:"Goa 2025: The Ultimate Insider's Guide to India's Sunshine State",
    dek:"Beyond the beaches and parties — discover the hidden soul of Goa, from secret waterfalls to the viral cafes taking over your feed.",
    author:{ name:'Sudarrshan Bajaj', handle:'@sudarrshan', verified:true },
    date:'Nov 21, 2025',
    readMin:9,
    category:'Adventure',
    hero:{ src:'https://loremflickr.com/1200/800/goa,palolem,palm?lock=301', tone:'#2d7a9e', ink:'#071d2b', accent:'#f2d8a6', label:'Goa · palms + boats' },
    featured:true,
  },
  {
    id:'dalhousie-pines',
    title:'Pines, Meadows & Slow Mornings — Dalhousie to Khajjiar',
    dek:'A five-day, slow-moving trip from Delhi that trades hurried sightseeing for long walks, apple orchards, and real silence.',
    author:{ name:'Riddhiman Jain', handle:'@riddh' },
    date:'Oct 09, 2025', readMin:7, category:'Slow Travel',
    hero:{ src:'https://loremflickr.com/1200/800/dalhousie,pine,meadow?lock=302', tone:'#3b6a4e', ink:'#0f2e1f', accent:'#dfe9c6', label:'Dalhousie · meadow' },
  },
  {
    id:'khwahhish-stays',
    title:'Khwahhish Stays — A Sustainable Escape Near Manali',
    dek:"A bamboo A-frame in the pines, solar-heated showers, and a kitchen that runs on what the valley grows that week.",
    author:{ name:'Dharna', handle:'@dharna' },
    date:'Sep 30, 2025', readMin:6, category:'Culture',
    hero:{ src:'https://loremflickr.com/1200/800/cabin,manali,pine?lock=303', tone:'#5a4230', ink:'#1a0f08', accent:'#e8c998', label:'Manali · A-frame' },
  },
  {
    id:'kashmir-april',
    title:'Kashmir in April — Before the Tulips and the Tourists',
    dek:'Srinagar wakes slow in April. Empty shikaras, fresh almond blossom, and the last of the valley\'s crisp winter light.',
    author:{ name:'Ayesha M.', handle:'@ayesha' },
    date:'Sep 12, 2025', readMin:8, category:'Culture',
    hero:{ src:'https://loremflickr.com/1200/800/srinagar,dal,shikara?lock=304', tone:'#4a6788', ink:'#0c1524', accent:'#f1d7d0', label:'Kashmir · lake' },
  },
  {
    id:'pondy-plates',
    title:'Pondicherry, One Plate at a Time',
    dek:"French press mornings in the White Town, a biryani nobody told you about, and the best filter kaapi on the east coast.",
    author:{ name:'Arnav K.', handle:'@arnav' },
    date:'Aug 28, 2025', readMin:6, category:'Food',
    hero:{ src:'https://loremflickr.com/1200/800/pondicherry,french,colonial?lock=305', tone:'#c66a3d', ink:'#3a180a', accent:'#f5d9a4', label:'Pondy · colonial lane' },
  },
  {
    id:'rishikesh-yoga',
    title:'Rishikesh, But Slower — A Week on the Mat',
    dek:'Not a retreat, not a vacation. Just seven days of sunrise yoga, Ganga walks, and learning that you don\'t need the WiFi password.',
    author:{ name:'Meera T.', handle:'@meera' },
    date:'Aug 14, 2025', readMin:5, category:'Wellness',
    hero:{ src:'https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=1200&q=80&auto=format&fit=crop', tone:'#3e5d3e', ink:'#0d1f14', accent:'#f0d7a6', label:'Rishikesh · Ganga' },
  },
];

// The full Goa article used for the detail view.
const GOA_ARTICLE = {
  id:'goa-2025',
  title:"Goa 2025: The Ultimate Insider's Guide to India's Sunshine State",
  dek:"Beyond the beaches and parties — discover the hidden soul of Goa, from secret waterfalls to the viral cafes taking over your feed.",
  author:{ name:'Sudarrshan Bajaj', handle:'@sudarrshan', verified:true, initials:'SB' },
  date:'Nov 21, 2025', readMin:9, category:'Adventure',
  hero:{ src:'https://loremflickr.com/1600/900/goa,palolem,palm?lock=311', tone:'#2d7a9e', ink:'#071d2b', accent:'#f2d8a6', label:'Palolem · palms' },
  pullQuote1:"Goa isn't just a place; it's a state of mind. But you have to know where to look.",
  intro:[
    "If your idea of Goa is still just Baga Lane, loud music, and crowded shacks — you are visiting a Goa that vanished years ago. The real magic lies in the Susegad, a Portuguese concept roughly translating to \"quiet contentment.\" This guide is your passport to the Other Goa.",
    "We are trading plastic chairs for heritage villas, crowded shores for secret cliffs, and generic curries for culinary masterpieces. Whether you are a solo soul-searcher, a couple seeking romance, or a group of friends who appreciate aesthetics over noise — this is the only itinerary you will ever need.",
  ],
  sectionTitle:'Why This Year Is Different',
  bodyParas:[
    "The shift is palpable. The \"North\" is getting chicer — high-end concept bars, buzzing coffee culture, natural wine nights. The \"South\" is holding on to its sleepy charm but quietly opening up just enough for the adventurous soul. The launch of the new Mopa (Manohar) Airport has rewritten the logistics game, making the far North — Arambol, Mandrem — more accessible than ever.",
    "You'll wake up to the smell of fresh poi (Goan bread) in a hundred-year-old villa. You'll ride a scooter through paddy fields that turn neon green in the monsoon. You'll end your day not just with a beer, but with a craft gin cocktail in a speakeasy hidden inside an old administrative building. This is the Goa of 2025.",
  ],
  pullQuote2:"In the end, we only regret the vacations we didn't take and the sunsets we slept through.",
  videos:[
    { handle:'@thegoodfoodandlifestyle', title:'Dear Zindagi! Parra Road', src:'https://loremflickr.com/400/700/goa,parra,road?lock=321', tone:'#3a6a3a', accent:'#e8d49a', ink:'#0a1e0f' },
    { handle:'@swethachangappa', title:'SAVRI Waterfall GOA ❤', src:'https://loremflickr.com/400/700/waterfall,goa,jungle?lock=322', tone:'#2a5a4a', accent:'#b9e8c9', ink:'#061a12' },
    { handle:'@shenaztreasury', title:'Waterfalls in Goa · Hidden', src:'https://loremflickr.com/400/700/waterfall,forest,goa?lock=323', tone:'#3a7a8a', accent:'#c8e8ee', ink:'#041a22' },
    { handle:'@therohitshow', title:'Vibe of Fontainhas · Goa', src:'https://loremflickr.com/400/700/fontainhas,panjim,goa?lock=324', tone:'#b95a3a', accent:'#f0c89a', ink:'#2a0f06' },
  ],
  budget:[
    { icon:'bed', label:'Accommodation', amount:9000 },
    { icon:'scooter', label:'Scooter Rental', amount:1800 },
    { icon:'fuel', label:'Fuel', amount:1000 },
    { icon:'car', label:'Airport Transfer', amount:1500 },
    { icon:'plate', label:'Food & Drink', amount:8000 },
    { icon:'plane', label:'Activities', amount:2500 },
    { icon:'misc', label:'Misc', amount:2000 },
  ],
  experiences:[
    { title:'The "Secret" Island', icon:'palm', body:"Take a ferry to Divar Island. No parties, no noise — just winding roads and sleepy Portuguese villas. It's like stepping into a time capsule." },
    { title:'Sunrise Kayaking', icon:'kayak', body:"Head to the Sal Backwaters or Olaulim for a sunrise kayak session. Meditative, and shows you a side of Goa most tourists sleep through." },
    { title:'The Cliffside Picnic', icon:'picnic', body:"Skip the overcrowded forts. Pack a picnic and head to Cabo de Rama ruins in the south for a sunset that rivals Santorini." },
    { title:'Feni Tasting', icon:'feni', body:"Visit a local distillery (like Cazulo) to understand that Feni isn't just \"strong alcohol\" — it's a heritage spirit with nuanced notes of cashew or coconut." },
    { title:'Waterfall Trekking', icon:'boot', body:"Drive to the Netravali Wildlife Sanctuary to find the Mainapi or Savri Waterfalls. Raw, uncommercialized, and absolutely breathtaking." },
    { title:'The Heritage Walk', icon:'column', body:"Strolling through the Latin Quarters of Fontainhas in Panjim — mustard walls, azulejo tiles, and the hum of old Goa." },
    { title:'The "Dear Zindagi" Moment', icon:'bike', body:"Cycling or scootering down the palm-lined Parra Road at golden hour, just because you can." },
    { title:'The Secret Swim', icon:'swim', body:"Finding the \"Blue Lagoon\" at Cola Beach — a freshwater lagoon hiding between two cliffs, a short trek from the sand." },
    { title:'The Cafe Trail', icon:'cafe', body:"Exploring the restored Portuguese villas turned cafes in Assagao — earth tones, poi toasts, and a pace that forgets the clock." },
  ],
  // Captured Moments — 11 placeholders in varied tones
  gallery:[
    { src:'https://loremflickr.com/600/600/goa,basilica,church?lock=331', tone:'#b6b3a6', ink:'#2a261e', accent:'#e8e1ce', label:'Basilica' },
    { src:'https://loremflickr.com/600/600/thali,goan,food?lock=332', tone:'#a15a2c', ink:'#2a0f06', accent:'#f2c590', label:'Thali' },
    { src:'https://loremflickr.com/600/600/bar,goa,night?lock=333', tone:'#6c1f1a', ink:'#1e0a09', accent:'#f0b79a', label:'Joseph Bar' },
    { src:'https://loremflickr.com/600/600/goa,sunset,beach?lock=334', tone:'#9a6838', ink:'#2a170c', accent:'#f0c890', label:'Sunset' },
    { src:'https://loremflickr.com/600/600/kayak,river,goa?lock=335', tone:'#2f6a54', ink:'#082017', accent:'#c7e3b9', label:'Kayak' },
    { src:'https://loremflickr.com/600/600/fontainhas,colonial,goa?lock=336', tone:'#c1804a', ink:'#3a1a0b', accent:'#f2cfa6', label:'Fontainhas' },
    { src:'https://loremflickr.com/600/600/parra,road,palm?lock=337', tone:'#3a6a3a', ink:'#0a1e10', accent:'#e8d49a', label:'Parra Road' },
    { src:'https://loremflickr.com/600/600/panjim,river,goa?lock=338', tone:'#845030', ink:'#241208', accent:'#e8c89a', label:'Panjim' },
    { src:'https://loremflickr.com/600/600/lighthouse,goa,coast?lock=339', tone:'#2d506a', ink:'#05121e', accent:'#e8d0b8', label:'Lighthouse' },
    { src:'https://loremflickr.com/600/600/goa,church,old?lock=340', tone:'#84522e', ink:'#261208', accent:'#e8c590', label:'Old Church' },
    { src:'https://loremflickr.com/600/600/goa,palm,beach?lock=341', tone:'#2b6a8a', ink:'#041828', accent:'#e8d8a8', label:'Palms' },
  ],
  taste:[
    { name:'Gunpowder', loc:'Assagao', tone:'#e8c4b4' },
    { name:'Vinayak Family Restaurant', loc:'Assagao', tone:'#f2d4a6' },
    { name:"Fisherman's Wharf", loc:'Cavelossim / Salcette', tone:'#f0b79a' },
    { name:'Joseph Bar', loc:'Fontainhas', tone:'#d89a82' },
    { name:'Cafe Bodega', loc:'Panjim', tone:'#c8d8a4' },
  ],
  notes:[
    { title:'Transport App', icon:'car', tone:'#DDEBF7', fg:'#1a3a5a', body:"Download GoaMiles. The local taxi \"mafia\" can be expensive and aggressive. GoaMiles is the government-approved app with fixed rates." },
    { title:'The Helmet Rule', icon:'scooter', tone:'#FDF1D7', fg:'#5a3a0f', body:"Police are strict about helmets for both rider and pillion. Do not rent a bike without two helmets." },
    { title:'Beach Safety', icon:'buoy', tone:'#E0F2E9', fg:'#0b3e26', body:"If you see a Red Flag — do not swim. The undercurrents in Goa are strong and deceptive." },
    { title:'Network Issues', icon:'phone', tone:'#F7DEE6', fg:'#5a1a3a', body:"South Goa (especially Cola / Netravali) has patchy network. Download offline maps before you leave your hotel." },
  ],
  relatedTripIds:['trip-rishikesh','trip-jaipur','trip-nainital'],
};

Object.assign(window, { TRAVELOGUE_CATEGORIES, TRAVELOGUES, GOA_ARTICLE });
