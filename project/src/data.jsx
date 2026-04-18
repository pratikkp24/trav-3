const TRAV = {
  brand: 'trav',
  cities: ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai', 'Pune'],
  nextDrop: 'Apr 17, 9 AM',
};

const UNSPLASH = (id, w=1200) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;
const LF = (w, h, tags, lock) => `https://loremflickr.com/${w}/${h}/${tags}?lock=${lock}`;

const WEEKEND_TRIPS = [
  { id:'trip-rishikesh', dest:'Rishikesh', dates:'2N/3D · Fri 9 PM → Sun 7 PM', price:8499, tags:['Adventure','Wellness'], creator:'@tanya_travels', spotsLeft:6, spotsTotal:15, heat:'filling', img:{src:UNSPLASH('1571536802807-30451e3955d8'), tone:'#3b6a4e', ink:'#0f2e1f', accent:'#e8d9a9', label:'Rishikesh · Ganga + hills'} },
  { id:'trip-jaipur', dest:'Jaipur', dates:'2N/3D · Sat 6 AM → Sun 9 PM', price:9999, tags:['Heritage','Food'], creator:'@rajasthan_ravi', spotsLeft:11, spotsTotal:15, heat:null, img:{src:UNSPLASH('1477587458883-47145ed94245'), tone:'#c66a3d', ink:'#4a2414', accent:'#f2d9b3', label:'Jaipur · pink city'} },
  { id:'trip-nainital', dest:'Nainital', dates:'2N/3D · Fri 10 PM → Sun 8 PM', price:7999, tags:['Nature','Mountains'], creator:'@meher.wanders', spotsLeft:3, spotsTotal:15, heat:'almost-full', travHer:true, img:{src:UNSPLASH('1626621341517-bbf3d9990a23'), tone:'#355e4a', ink:'#0b2418', accent:'#a6c8b1', label:'Nainital · lake + pines'} },
];

// Expanded catalog for the "View all" filter index
const ALL_TRIPS = [
  // Weekend
  { id:'trip-rishikesh', dest:'Rishikesh', region:'UTTARAKHAND', title:'Rafting & Riverside Yoga', duration:'weekend', nights:'2N/3D', price:8499, tags:['Adventure','Wellness'], vibes:['adventure','wellness','nature'], travelingAs:['friends','solo-female','couple'], fillingFast:true, travHerExclusive:false, category:'domestic', img:{src:UNSPLASH('1571536802807-30451e3955d8'), tone:'#3b6a4e', ink:'#0f2e1f', accent:'#e8d9a9', label:'Rishikesh'} },
  { id:'trip-jaipur', dest:'Jaipur', region:'RAJASTHAN', title:'Pink City Heritage Walk', duration:'weekend', nights:'2N/3D', price:9999, tags:['Heritage','Food'], vibes:['heritage','culture'], travelingAs:['friends','couple','family'], fillingFast:false, travHerExclusive:false, category:'domestic', img:{src:UNSPLASH('1477587458883-47145ed94245'), tone:'#c66a3d', ink:'#4a2414', accent:'#f2d9b3', label:'Jaipur'} },
  { id:'trip-nainital', dest:'Nainital', region:'UTTARAKHAND', title:'Lake & Pine Mornings', duration:'weekend', nights:'2N/3D', price:7999, tags:['Nature','Mountains'], vibes:['nature','mountains'], travelingAs:['friends','couple','family'], fillingFast:true, travHerExclusive:false, category:'domestic', img:{src:UNSPLASH('1626621341517-bbf3d9990a23'), tone:'#355e4a', ink:'#0b2418', accent:'#a6c8b1', label:'Nainital'} },
  // 2–3 Days
  { id:'trip-manali', dest:'Old Manali', region:'HIMACHAL, HP', title:'Riverside Glamping & Yoga', duration:'2-3', nights:'3 Days · All Inclusive', price:8499, tags:['Adventure'], vibes:['adventure','nature','wellness'], travelingAs:['solo-female','couple','friends'], fillingFast:true, travHerExclusive:false, category:'domestic', img:{src:LF(1200, 800, 'manali,himalaya,pine,valley', 501), tone:'#3b6a4e', ink:'#0f2e1f', accent:'#e8d9a9', label:'Old Manali'} },
  { id:'trip-agra', dest:'Agra', region:'UTTAR PRADESH', title:'Mughal Heritage & High Tea', duration:'2-3', nights:'2 Days · Solo Friendly', price:6200, tags:['Heritage'], vibes:['heritage','culture'], travelingAs:['solo-female','couple'], fillingFast:false, travHerExclusive:true, category:'domestic', img:{src:UNSPLASH('1524492412937-b28074a5d7da'), tone:'#c6a45a', ink:'#2a1f0a', accent:'#f7e2b5', label:'Agra'} },
  { id:'trip-jodhpur', dest:'Jodhpur', region:'RAJASTHAN', title:'The Blue City Photo Walk', duration:'Blue City · 2D/1N', price:4500, tags:['Cultural'], vibes:['heritage','culture'], travelingAs:['friends','couple','solo-female'], fillingFast:false, travHerExclusive:false, category:'domestic', img:{src:LF(1200, 800, 'jodhpur,bluecity,fort', 502), tone:'#4a6788', ink:'#0c1524', accent:'#e8d8b8', label:'Jodhpur'} },
  // 4–6 Days
  { id:'trip-goa', dest:'South Goa', region:'GOA', title:'Secret Cove & Kayaking', duration:'4-6', nights:'4 Days · Chill Vibes', price:12800, tags:['Beach'], vibes:['beach','nature'], travelingAs:['friends','couple','solo-female'], fillingFast:true, travHerExclusive:false, category:'domestic', img:{src:LF(1200, 800, 'goa,palolem,palm,beach', 503), tone:'#2d7a9e', ink:'#071d2b', accent:'#f2d8a6', label:'South Goa'} },
  { id:'trip-triund', dest:'Triund', region:'HIMACHAL, HP', title:'Starry Night Ridge Hike', duration:'2-3', nights:'2 Days · High Altitude', price:5500, tags:['Trekking'], vibes:['adventure','mountains','nature'], travelingAs:['friends','solo-female'], fillingFast:false, travHerExclusive:false, category:'domestic', img:{src:LF(1200, 800, 'triund,mountains,trek,snow', 504), tone:'#4a6788', ink:'#0c1524', accent:'#dfe7f0', label:'Triund'} },
  { id:'trip-udaipur', dest:'Udaipur', region:'RAJASTHAN', title:'Lake View Suite Retreat', duration:'2-3', nights:'3 Days · Luxury Escape', price:18500, tags:['Romantic'], vibes:['romantic','heritage'], travelingAs:['couple','family'], fillingFast:false, travHerExclusive:false, category:'domestic', img:{src:LF(1200, 800, 'udaipur,palace,lake,night', 505), tone:'#c6a45a', ink:'#2a1408', accent:'#f4c896', label:'Udaipur'} },
  // Long Haul
  { id:'trip-thailand', dest:'Phuket & Krabi', region:'THAILAND', title:'Island Hopping & Scuba', duration:'5-7', nights:'6N/7D', price:48000, tags:['Beach','Adventure'], vibes:['beach','adventure'], travelingAs:['friends','couple'], fillingFast:true, travHerExclusive:false, category:'long-haul', img:{src:UNSPLASH('1504214208698-ea1916a2195a', 800), tone:'#2d78a8', ink:'#0a1f2b', accent:'#f4d28a', label:'Thailand'} },
  { id:'trip-kerala', dest:'Munnar & Alleppey', region:'KERALA', title:'Tea Estates & Backwaters', duration:'5-7', nights:'5N/6D', price:24000, tags:['Nature'], vibes:['nature','romantic'], travelingAs:['couple','family'], fillingFast:false, travHerExclusive:false, category:'long-haul', img:{src:UNSPLASH('1593693411515-c20261bcad6e', 800), tone:'#2f6a44', ink:'#0e2417', accent:'#d9c07a', label:'Kerala'} },
  { id:'trip-kashmir', dest:'Srinagar & Gulmarg', region:'KASHMIR', title:'Snow Peaks & Shikara Rides', duration:'5-7', nights:'6N/7D', price:35000, tags:['Mountains'], vibes:['mountains','romantic'], travelingAs:['couple','friends'], fillingFast:true, travHerExclusive:false, category:'long-haul', img:{src:LF(800, 1100, 'kashmir,dal,shikara', 43), tone:'#4a6788', ink:'#0c1524', accent:'#dfe7f0', label:'Kashmir'} },
  { id:'trip-bali', dest:'Ubud & Seminyak', region:'BALI', title:'Villa Retreat & Surf', duration:'8-10', nights:'7N/8D', price:65000, tags:['Wellness'], vibes:['wellness','beach'], travelingAs:['friends','solo-female'], fillingFast:false, travHerExclusive:true, category:'long-haul', img:{src:UNSPLASH('1537996194471-e657df975ab4', 800), tone:'#3a6a3a', ink:'#122112', accent:'#e8d49a', label:'Bali'} },
];

const HOW_IT_WORKS = [
  { n:'01', title:'Choose your vibe', body:'Browse curated weekend trips by top travel creators. Every trip is vetted for safety, comfort, and max fun.' },
  { n:'02', title:'Lock your spot', body:'Book with a ₹2,000 token. We only take 15 travelers per trip to keep it boutique and meaningful.' },
  { n:'03', title:'Just show up', body:'Get a detailed itinerary, packing list, and WhatsApp group. Fri night, we meet at the pickup point.' },
];

const GOING_LONGER = [
  { dest:'Thailand', duration:'5–7 Days', from:45, tone:'#2d78a8', accent:'#f4d28a', src:UNSPLASH('1504214208698-ea1916a2195a', 800) },
  { dest:'Kerala', duration:'4–6 Days', from:22, tone:'#2f6a44', accent:'#d9c07a', src:UNSPLASH('1593693411515-c20261bcad6e', 800) },
  { dest:'Kashmir', duration:'5–7 Days', from:32, tone:'#4a6788', accent:'#dfe7f0', src:LF(800, 1100, 'kashmir,dal,shikara', 43) },
  { dest:'Bali', duration:'6–8 Days', from:55, tone:'#3a6a3a', accent:'#e8d49a', src:UNSPLASH('1537996194471-e657df975ab4', 800) },
];

const RISHIKESH_TRIP = {
  ...WEEKEND_TRIPS[0],
  tagline:'White-water rafting & riverside camping.',
  summary:'Two nights by the Ganga. Rafting, yoga, bonfire, the works. Led by @tanya_travels.',
  overviewHeadline:'Two nights by the Ganga.',
  route:['DELHI','RISHIKESH','DELHI'],
  routeDistance:'~250 KM',
  nightsLabel:'2 NIGHTS',
  meetingPoint:'Akshardham Metro, Gate 2 · Fri 9:00 PM',
  returnPoint:'Akshardham Metro, Sun 7:00 PM',
  hotel:{ name:'Riverside Camp Shivpuri', tier:'Comfort tier' },
  inclusions:['Riverside tent stay (2 nights, twin sharing)','AC Volvo return from Delhi','Breakfast (3 days) + 1 riverside lunch','White water rafting (16 km)','Sunrise yoga + Ganga Aarti','Bonfire night with music'],
  exclusions:['Lunch & dinner (~₹1,500/day)','Personal expenses','Travel insurance','Additional adventure activities'],
  gallery:[
    { src:UNSPLASH('1571536802807-30451e3955d8', 1600), tone:'#2b6a8a', ink:'#041828', accent:'#e8d8a8', label:'Ganga at dusk' },
    { src:UNSPLASH('1626621341517-bbf3d9990a23', 900), tone:'#4a6788', ink:'#0c1524', accent:'#dfe7f0', label:'Himalayan trek' },
    { src:LF(900, 700, 'rafting,rapids,river', 71), tone:'#3e5d3e', ink:'#0d1f14', accent:'#f0d7a6', label:'White-water rafting' },
    { src:LF(900, 700, 'tent,camp,river', 81), tone:'#2b6a8a', ink:'#041828', accent:'#e8d8a8', label:'Riverside tent' },
    { src:LF(900, 700, 'bonfire,night,camp', 83), tone:'#b95a3a', ink:'#2a0f06', accent:'#f0c89a', label:'Bonfire night' },
  ],
  galleryCount: 28,
  itinerary:[
    { day:'Day 1', date:'Fri, 16 May', title:'Delhi → Rishikesh',
      img:{ src:UNSPLASH('1571536802807-30451e3955d8', 300), tone:'#2b6a8a', ink:'#041828', accent:'#e8d8a8', label:'Day 1 · Ganga arrival' },
      blocks:[
        { time:'9:00 PM', title:'Pickup · Akshardham', body:'Meet your group, grab snacks, meet the trip lead.', included:true },
        { time:'11:30 PM', title:'Overnight Volvo', body:'Recliner AC bus. Movies, music, catch some sleep.', included:true },
      ]},
    { day:'Day 2', date:'Sat, 17 May', title:'Rafting & bonfire',
      img:{ src:LF(300, 200, 'rafting,river,adventure', 71), tone:'#3e5d3e', ink:'#0d1f14', accent:'#f0d7a6', label:'Day 2 · Rapids + fire' },
      blocks:[
        { time:'6:30 AM', title:'Arrive Rishikesh', body:'Fresh air, quick tea stop at Lakshman Jhula.' },
        { time:'8:00 AM', title:'Camp check-in + breakfast', body:'Drop bags, get your wristband, stuff your face.', included:true },
        { time:'10:30 AM', title:'White water rafting', body:'Shivpuri → Rishikesh stretch. Grade 3 rapids. Riverside lunch included.', included:true },
        { time:'5:00 PM', title:'Ganga Aarti · Triveni Ghat', body:'Open your phone, open your eyes. You decide.' },
        { time:'8:30 PM', title:'Bonfire + open mic', body:'Kumaoni dal-chawal. Stories. Someone will bring a guitar.', included:true },
      ]},
    { day:'Day 3', date:'Sun, 18 May', title:'Yoga & return',
      img:{ src:LF(300, 200, 'yoga,sunrise,rishikesh', 72), tone:'#b95a3a', ink:'#2a0f06', accent:'#f0c89a', label:'Day 3 · Sunrise yoga' },
      blocks:[
        { time:'6:30 AM', title:'Sunrise yoga', body:'Optional. Riverside mat session with a local teacher.', included:true },
        { time:'9:00 AM', title:'Breakfast + free time', body:'Cafe hop on Tapovan lane, shop, journal, doze.', included:true },
        { time:'1:00 PM', title:'Departure', body:'Board the Volvo after lunch.', included:true },
        { time:'7:00 PM', title:'Arrive Delhi', body:'Drop at Akshardham. Hug your new group, book the next one.', included:true },
      ]},
  ],
  pricing:{ base:8499, tax:425, convenience:99, token:2000, total:9023 },
  rating: 4.8,
  ratingCount: 342,
  bookingsCount: '1.2k',
  viewingNow: 12,
  departures: [
    { id:'d1', dateRange:'May 16–18', label:'MOST POPULAR', price:8499, status:'filling', note:'Lowest price · filling fast', selected:true },
    { id:'d2', dateRange:'May 23–25', label:null, price:8799, status:'available', note:'Available' },
    { id:'d3', dateRange:'May 30–Jun 1', label:'BEST FOR WEEKEND', price:8999, status:'available', note:'Available' },
  ],
  signatureStay:{
    name:'Riverside Camp Shivpuri',
    tier:'Comfort tier',
    type:'Riverside Tent · Twin Sharing',
    rating:4.6,
    reviewsCount:2340,
    amenities:[
      { icon:'sun', label:'Riverside view' },
      { icon:'shield', label:'Safety verified' },
      { icon:'users', label:'2-Michelin meals' },
      { icon:'bed', label:'Private tent' },
    ],
    blurb:'Stay at a boutique riverside camp where the Ganga hums you to sleep. Twin-sharing tents with attached washroom, bonfire pit, and a dining deck.',
    thumbs: [
      { src:LF(600, 400, 'tent,camp,river', 81), tone:'#2b6a8a', ink:'#041828', accent:'#e8d8a8', label:'Tent' },
      { src:LF(600, 400, 'river,deck,himalaya', 82), tone:'#3e5d3e', ink:'#0d1f14', accent:'#f0d7a6', label:'Deck' },
      { src:LF(600, 400, 'bonfire,night,camp', 83), tone:'#b95a3a', ink:'#2a0f06', accent:'#f0c89a', label:'Bonfire' },
    ],
  },
  packList:[
    { cat:'Adventure Ready', icon:'shield', items:['Quick-dry shorts','Riverside sandals','Spare change of clothes'] },
    { cat:'Weather Ready', icon:'sun', items:['Light rain shell','Breathable cotton','Sun cap / sunglasses'] },
    { cat:'Activity Gear', icon:'spark', items:['Water bottle (1L)','Dry bag for phone','Headlamp or torch'] },
    { cat:'Essentials', icon:'bag', items:['Govt ID (original)','Cash (~₹2k)','Meds / first aid kit'] },
  ],
  videos:[
    { handle:'@theganga.vibes', title:'Rafting the rapids', src:LF(400, 700, 'rafting,rapids,river', 91), tone:'#2a5a4a', accent:'#b9e8c9', ink:'#061a12' },
    { handle:'@tanya_travels', title:'Sunrise Ganga Aarti', src:LF(400, 700, 'ganga,aarti,temple', 92), tone:'#b95a3a', accent:'#f0c89a', ink:'#2a0f06' },
    { handle:'@hillsbyriya', title:'Riverside camp tour', src:LF(400, 700, 'camp,river,himalaya', 93), tone:'#3a7a8a', accent:'#c8e8ee', ink:'#041a22' },
    { handle:'@wanderhaus', title:'Yoga at dawn', src:LF(400, 700, 'yoga,sunrise,mat', 94), tone:'#3a6a3a', accent:'#e8d49a', ink:'#0a1e0f' },
  ],
  relatedArticleIds:['goa-2025','rishikesh-yoga','dalhousie-pines'],
  cancellationPolicy:[
    { when:'15+ days before', refund:'Full refund', tone:T.greenDeep },
    { when:'7–14 days before', refund:'50% refund', tone:T.amber },
    { when:'Less than 7 days', refund:'No refund', tone:T.rose },
  ],
  tripSnapshot:[
    { label:'Transport', value:'AC Volvo (included)' },
    { label:'Meals', value:'Breakfast + 1 lunch' },
    { label:'Group size', value:'Max 15' },
    { label:'Trip type', value:'Mixed · solo-friendly' },
    { label:'Airfare', value:'Excluded' },
  ],
  reviewStats:{
    recommend: 96,
    distribution:[
      { stars:5, count:280 },
      { stars:4, count:50 },
      { stars:3, count:9 },
      { stars:2, count:2 },
      { stars:1, count:1 },
    ],
    tags:[
      { label:'Vibe', count:312 },
      { label:'Rafting', count:289 },
      { label:'Trip lead', count:241 },
      { label:'Food', count:198 },
      { label:'Stay', count:176 },
      { label:'Aarti', count:162 },
    ],
  },
  reviews:[
    { name:'Aditi R.', city:'Delhi', tripDate:'Mar 2026', highlight:'The bonfire', quote:'Felt like I had known the group for years by Sunday. Rafting guides were chill but sharp. Tanya runs a tight ship without ever making it feel rigid.' },
    { name:'Kabir S.', city:'Gurgaon', tripDate:'Feb 2026', highlight:'Aarti', quote:'Worth it for the Aarti alone. Trip was smooth end to end. Bus on time, camp warm, food unreal.' },
    { name:'Meera T.', city:'Noida', tripDate:'Feb 2026', highlight:'Zero stress', quote:'I stress about planning. This was the opposite of that. Showed up with a backpack, came back with eight new friends.' },
    { name:'Rohan V.', city:'Delhi', tripDate:'Jan 2026', highlight:'Rafting', quote:'Grade 3 rapids hit different at sunrise. Guides briefed us properly, gear was new, and they actually let us body-surf the calm stretch.' },
    { name:'Ananya P.', city:'Gurgaon', tripDate:'Jan 2026', highlight:'Solo-friendly', quote:'Did this solo. By the second meal I had a rafting buddy, a yoga buddy, and a chai buddy. Everyone was just easy.' },
    { name:'Sahil K.', city:'Faridabad', tripDate:'Dec 2025', highlight:'Trip lead Tanya', quote:'Tanya knew every shopkeeper, every cafe owner, every shortcut. Felt like travelling with a friend who happens to live there.' },
    { name:'Ishita N.', city:'Noida', tripDate:'Dec 2025', highlight:'The food', quote:'Camp dinner — rajma chawal, hot gulab jamun, bonfire. I could have stayed another night just for that.' },
    { name:'Vikram R.', city:'Delhi', tripDate:'Nov 2025', highlight:'Stay', quote:'Riverside tent at night, Ganga five steps away, jackal calls in the distance. Twin-sharing tent was clean, beds proper, attached washroom worked. No complaints.' },
    { name:'Priya M.', city:'Gurgaon', tripDate:'Nov 2025', highlight:'Sunrise yoga', quote:'Skipped yoga at home for years. Did it on the riverbank because everyone else was going. Best 45 minutes of the trip.' },
    { name:'Arjun T.', city:'Delhi', tripDate:'Oct 2025', highlight:'Vibe', quote:'No awkward icebreakers, no cringe games. Just a real group, real food, real river. Rebooked Manali before the Volvo dropped me back.' },
  ],
  faq:[
    { q:'Who else is on this trip?', a:'Mixed group, 22–34 age range on average. We share the group list 48 hours before departure on WhatsApp.' },
    { q:'What if I want to cancel?', a:'Free cancellation till 7 days before. 50% refund after that. Full policy on booking page.' },
    { q:'Is it solo-friendly?', a:'Most of our travelers come solo. You will have a buddy by breakfast on day 2, guaranteed.' },
    { q:'What about trav.her?', a:'This trip has a trav.her certified option — women-only cohort of 8 with a female lead. Toggle during booking.' },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Nainital · trav.her (solo-female / women-only cohort) full itinerary
// Mirrors the RISHIKESH_TRIP shape so the detail page renders end-to-end.
// ─────────────────────────────────────────────────────────────────────────────
const NAINITAL_TRIP = {
  ...WEEKEND_TRIPS[2], // id, dest, dates, price, tags, creator, spotsLeft, spotsTotal, heat, travHer:true, img
  tagline:'Lake mornings, pine-ridge walks, a women-only table of eight.',
  summary:'Two nights by the Naini Lake. Sunrise at Tiffin Top, a Mukteshwar picnic, and a slow bonfire. Led by @meher.wanders — a trav.her certified female lead.',
  overviewHeadline:'Two nights by the Naini Lake.',
  route:['DELHI','NAINITAL','DELHI'],
  routeDistance:'~310 KM',
  nightsLabel:'2 NIGHTS · WOMEN-ONLY',
  meetingPoint:'Anand Vihar ISBT, Gate 3 · Fri 10:00 PM',
  returnPoint:'Anand Vihar ISBT, Sun 8:00 PM',
  hotel:{ name:'The Pine House · Mallital', tier:'Comfort tier · women-only floor' },
  inclusions:[
    'Women-only stay (2 nights, twin-sharing) with attached washroom',
    'AC Volvo return from Delhi',
    'All breakfasts (3 days) + 1 riverside lunch + bonfire dinner',
    'Certified female trip lead on-call 24×7',
    'Tiffin Top sunrise hike with local female guide',
    'Boating on Naini Lake + Mukteshwar day trip',
    'Safety kit · panic-button SIM tag · insured transit',
  ],
  exclusions:[
    'Lunch & dinner on day 2 (~₹1,200/day)',
    'Personal expenses & shopping',
    'Flights (we ride Volvo)',
    'Optional spa at the stay',
  ],
  gallery:[
    { src:UNSPLASH('1626621341517-bbf3d9990a23', 1600), tone:'#355e4a', ink:'#0b2418', accent:'#a6c8b1', label:'Naini Lake at dawn' },
    { src:UNSPLASH('1464822759023-fed622ff2c3b', 1200),  tone:'#4a6788', ink:'#0c1524', accent:'#dfe7f0', label:'Pine ridge walk' },
    { src:LF(900, 700, 'nainital,lake,boating,woman', 301), tone:'#3e5d88', ink:'#091a2a', accent:'#e8d8a8', label:'Sunrise boating' },
    { src:LF(900, 700, 'mukteshwar,temple,woman,mountain', 302), tone:'#3e5d3e', ink:'#0d1f14', accent:'#f0d7a6', label:'Mukteshwar morning' },
    { src:LF(900, 700, 'bonfire,night,womenfriends', 303), tone:'#b95a3a', ink:'#2a0f06', accent:'#f0c89a', label:'Women-only bonfire' },
    { src:LF(900, 700, 'pine,forest,path,sunrise', 304), tone:'#2a6a4e', ink:'#071a10', accent:'#d8e8c8', label:'Tiffin Top trail' },
  ],
  galleryCount: 34,
  itinerary:[
    { day:'Day 1', date:'Fri, 30 May', title:'Delhi → Nainital',
      img:{ src:UNSPLASH('1626621341517-bbf3d9990a23', 1200), tone:'#355e4a', ink:'#0b2418', accent:'#a6c8b1', label:'Day 1 · Into the hills' },
      blocks:[
        { time:'10:00 PM', title:'Pickup · Anand Vihar ISBT', body:'Meet your women-only crew, pick up your safety tag, meet @meher.', included:true },
        { time:'11:30 PM', title:'Overnight Volvo', body:'Seats pre-blocked together. Blankets, tea stop at midnight, curtains drawn.', included:true },
      ]},
    { day:'Day 2', date:'Sat, 31 May', title:'Naini Lake & Mukteshwar',
      img:{ src:LF(1200, 800, 'mukteshwar,mountain,temple,sunrise', 302), tone:'#3e6a4a', ink:'#0d1f18', accent:'#c9d68a', label:'Day 2 · Lake + ridge' },
      blocks:[
        { time:'6:30 AM', title:'Arrive Nainital · chai at Mall Road', body:'First sunrise glimpse of Naini Lake. Shawls out.', included:true },
        { time:'8:00 AM', title:'Check-in + breakfast', body:'Drop bags at The Pine House. Breakfast on the deck — parathas, curd, apple jam from the orchard.', included:true },
        { time:'10:00 AM', title:'Sunrise boating + Naina Devi', body:'Gondola-style rowboats, 40 min on the lake. Quick darshan at Naina Devi.' },
        { time:'12:30 PM', title:'Drive to Mukteshwar', body:'90 min through pines. Stop at Chauli-ki-Jali for the cliff view.' },
        { time:'2:00 PM', title:'Mukteshwar picnic lunch', body:'Laid-out lunch in the apple orchard · dal-chawal, raita, jalebi.', included:true },
        { time:'5:00 PM', title:'Back to Mallital · free time', body:'Stroll Mall Road, Tibetan market, a late-afternoon espresso.' },
        { time:'8:30 PM', title:'Bonfire + women-only circle', body:'Kumaoni khana, stories, the occasional guitar. @meher passes the mic.', included:true },
      ]},
    { day:'Day 3', date:'Sun, 1 Jun', title:'Tiffin Top & return',
      img:{ src:LF(1200, 800, 'tiffintop,hike,sunrise,forest', 304), tone:'#2a6a4e', ink:'#071a10', accent:'#d8e8c8', label:'Day 3 · Sunrise hike' },
      blocks:[
        { time:'5:30 AM', title:'Tiffin Top sunrise hike', body:'2 km up, slow pace, female local guide. The Himalayas line up on a clear day.', included:true },
        { time:'8:30 AM', title:'Breakfast + lazy journal time', body:'Pancakes, orchard honey, a table that takes its time.', included:true },
        { time:'11:00 AM', title:'Checkout + last Mall Road run', body:'Pick up Bhimtal candles and Kumaoni stoles.' },
        { time:'1:00 PM', title:'Departure', body:'Board the Volvo after lunch.', included:true },
        { time:'8:00 PM', title:'Arrive Delhi', body:'Drop at Anand Vihar. Hug your new group, book the next one.', included:true },
      ]},
  ],
  pricing:{ base:7999, tax:399, convenience:99, token:2000, total:8497 },
  rating: 4.9,
  ratingCount: 198,
  bookingsCount: '680',
  viewingNow: 14,
  departures: [
    { id:'d1', dateRange:'May 30–Jun 1', label:'WOMEN-ONLY · 3 LEFT', price:7999, status:'filling', note:'Filling fast · female lead', selected:true },
    { id:'d2', dateRange:'Jun 6–8',      label:null,                 price:8299, status:'available', note:'Available' },
    { id:'d3', dateRange:'Jun 13–15',    label:'LONG WEEKEND',       price:8499, status:'available', note:'Available' },
  ],
  signatureStay:{
    name:'The Pine House · Mallital',
    tier:'Comfort tier · women-only floor',
    type:'Deodar-wood twin room · attached bath',
    rating:4.7,
    reviewsCount:1180,
    amenities:[
      { icon:'shield', label:'Women-only floor' },
      { icon:'sun', label:'Lake-view deck' },
      { icon:'bed', label:'Twin with attached bath' },
      { icon:'users', label:'Hot home-style meals' },
    ],
    blurb:'A 9-room family-run stay on the quiet Mallital end of the lake. Deodar wood floors, a deck over the pine line, and a host who checks in on every woman before lights-out.',
    thumbs: [
      { src:LF(600, 400, 'pinehouse,hill,cottage', 311), tone:'#3b6a4e', ink:'#0f2e1f', accent:'#e8d9a9', label:'Room' },
      { src:LF(600, 400, 'hill,deck,view,pine',   312), tone:'#2d6a84', ink:'#091824', accent:'#f3d49a', label:'Deck' },
      { src:LF(600, 400, 'bonfire,night,women',   313), tone:'#b95a3a', ink:'#2a0f06', accent:'#f0c89a', label:'Bonfire' },
    ],
  },
  packList:[
    { cat:'Hill ready', icon:'shield', items:['Fleece jacket','Layering thermals','Trek-light shoes'] },
    { cat:'Weather ready', icon:'sun', items:['Wind-cheater','Woollen cap','Sunglasses · sunscreen'] },
    { cat:'Safety kit (provided)', icon:'spark', items:['Panic-button SIM tag','Female lead hotline','First-aid kit'] },
    { cat:'Essentials', icon:'bag', items:['Govt ID (original)','Cash (~₹2k)','Reusable bottle'] },
  ],
  videos:[
    { handle:'@meher.wanders', title:'A women-only weekend in Nainital', src:LF(400, 700, 'nainital,woman,lake,pine', 391), tone:'#2a5a4a', accent:'#b9e8c9', ink:'#061a12' },
    { handle:'@hillsbyriya',   title:'Tiffin Top at 6 AM',               src:LF(400, 700, 'tiffintop,trail,sunrise',  392), tone:'#3a7a8a', accent:'#c8e8ee', ink:'#041a22' },
    { handle:'@solo.sisters',  title:'Mukteshwar picnic moment',         src:LF(400, 700, 'mukteshwar,picnic,orchard',393), tone:'#b95a3a', accent:'#f0c89a', ink:'#2a0f06' },
    { handle:'@wanderhaus',    title:'Boat · bonfire · bond',            src:LF(400, 700, 'boat,bonfire,women',      394), tone:'#3a6a3a', accent:'#e8d49a', ink:'#0a1e0f' },
  ],
  relatedArticleIds:['goa-2025','rishikesh-yoga','dalhousie-pines'],
  cancellationPolicy:[
    { when:'15+ days before',  refund:'Full refund', tone:T.greenDeep },
    { when:'7–14 days before', refund:'50% refund',  tone:T.amber },
    { when:'Less than 7 days', refund:'No refund',   tone:T.rose },
  ],
  tripSnapshot:[
    { label:'Cohort',     value:'Women-only · max 8' },
    { label:'Trip lead',  value:'Female · certified' },
    { label:'Transport',  value:'AC Volvo (included)' },
    { label:'Meals',      value:'All breakfasts + 2 meals' },
    { label:'Trip type',  value:'Solo-female first' },
  ],
  reviewStats:{
    recommend: 99,
    distribution:[
      { stars:5, count:170 },
      { stars:4, count:22 },
      { stars:3, count:4 },
      { stars:2, count:1 },
      { stars:1, count:1 },
    ],
    tags:[
      { label:'Safety',    count:198 },
      { label:'Trip lead', count:192 },
      { label:'Stay',      count:164 },
      { label:'Sunrise',   count:158 },
      { label:'Food',      count:141 },
      { label:'Bonfire',   count:120 },
    ],
  },
  reviews:[
    { name:'Riya S.',    city:'Gurgaon',  tripDate:'Mar 2026', highlight:'Felt safe', quote:'First solo trip. Meher made it feel like a sisters\' weekend. I didn\'t touch my phone for two days and it was wonderful.' },
    { name:'Ananya P.',  city:'Delhi',    tripDate:'Feb 2026', highlight:'Tiffin Top', quote:'6 AM hike, no loud music, no rush. Eight women, eight mugs of chai, a whole mountain to ourselves.' },
    { name:'Meera T.',   city:'Noida',    tripDate:'Feb 2026', highlight:'Stay',       quote:'Women-only floor + a host who actually cared. Slept like a child, woke up to pines.' },
    { name:'Isha K.',    city:'Delhi',    tripDate:'Jan 2026', highlight:'Bonfire',    quote:'The Saturday night circle — I cried, I laughed, I exchanged numbers with strangers who became friends.' },
    { name:'Naina G.',   city:'Gurgaon',  tripDate:'Jan 2026', highlight:'Trip lead',  quote:'Meher handled a weather curveball like a pro. Re-routed us to Mukteshwar and it became the highlight.' },
    { name:'Tara M.',    city:'Delhi',    tripDate:'Dec 2025', highlight:'Food',       quote:'The orchard picnic was straight out of a Studio Ghibli frame. Also: jalebi at 9,000 ft.' },
    { name:'Ritika V.',  city:'Faridabad',tripDate:'Dec 2025', highlight:'Pace',       quote:'Nothing rushed. Felt like the trip was designed around women who needed a break, not a checklist.' },
    { name:'Priya D.',   city:'Noida',    tripDate:'Nov 2025', highlight:'Safety',     quote:'The panic-button tag was a quiet comfort I didn\'t know I needed. Never used it — still glad it was there.' },
    { name:'Zoya A.',    city:'Delhi',    tripDate:'Nov 2025', highlight:'Sunrise boating', quote:'We rowed out at 6:30 AM. The lake was fog. Nobody spoke for twenty minutes. Best twenty minutes of my year.' },
    { name:'Sanya B.',   city:'Gurgaon',  tripDate:'Oct 2025', highlight:'Vibe',       quote:'Came back with seven WhatsApp groups and a new weekend crew. This is the one I rebook every quarter.' },
  ],
  faq:[
    { q:'Who is this trip for?',             a:'Women only. Age range skews 24–36. Comfortable with a moderate hike (Tiffin Top) and bus travel.' },
    { q:'Is the trip lead a woman?',         a:'Yes — every trav.her trip has a certified female lead. Meher has led 40+ cohorts.' },
    { q:'How is safety handled?',            a:'Women-only floor at the stay, female lead on-call 24×7, insured transit, panic-button SIM tag handed on boarding.' },
    { q:'What if I want to cancel?',         a:'Full refund up to 15 days before. 50% refund 7–14 days before. After that, no refund.' },
    { q:'Can I book as a pair?',             a:'Yes. Twin-sharing will automatically place you together. Mention at checkout.' },
  ],
};

const THAILAND_TRIP = {
  ...ALL_TRIPS.find(x => x.id === 'trip-thailand'),
  isLongHaul: true,
  logistics: {
    visa: 'Visa on Arrival / Exemption valid for Indians.',
    flights: 'Land package. Ex-Delhi/BOM (Flights can be requested post-booking)',
    forex: 'Best to carry 15k INR in local THB cash.'
  },
  multiCityRoute: ['Phuket Intl', 'Patong Beach', 'Phi Phi Islands', 'Krabi', 'Phuket Intl'],
  creator:'@wanderlust_th',
  spotsLeft:5,
  spotsTotal:12,
  viewingNow:28,
  departures:[
    { id:'d1', dateRange:'12 May – 18 May', price:48000, status:'filling', note:'Only 5 spots left' },
    { id:'d2', dateRange:'26 May – 01 Jun', price:48000, status:'open', note:'Available' },
    { id:'d3', dateRange:'15 Jun – 21 Jun', price:52000, status:'open', note:'Peak season' },
  ],
  pricing:{ token:12000, tax:2400, convenience:850 },
  rating: 4.9,
  ratingCount: 128,
  bookingsCount: '450',
  tagline:'Your definitive tropical island breakout.',
  dates: '6N/7D · Available weekly',
  summary:'A 7-day jump across the azure Andaman Sea. Curated cliff hikes, snorkeling, luxury speedboat hops, and deep neon nights. Zero visa stress.',
  overviewHeadline:'Six nights of sea and limestone.',
  route:['PHUKET', 'PHI PHI', 'KRABI'],
  routeDistance:'Island Hopping',
  nightsLabel:'6 NIGHTS',
  meetingPoint:'Phuket International Airport (HKT)',
  returnPoint:'Phuket International Airport (HKT)',
  hotel:{ name:'Katathani / Zeavola', tier:'Luxury tier' },
  overviewNotes:[
    { label:'Check-in:', v:'Phuket, 2:00 PM' },
    { label:'Return:', v:'Drop to HKT, 11:00 AM' }
  ],
  gallery:[
    { src:UNSPLASH('1504214208698-ea1916a2195a', 1000), caption:'Krabi limestone cliffs', tone:'#2d78a8', ink:'#0a1f2b', accent:'#f4d28a' },
    { src:UNSPLASH('1584622650111-993a426fbf0a', 1000), caption:'Phi Phi view', tone:'#3b6a4e', ink:'#0f2e1f', accent:'#e8d9a9' },
    { src:UNSPLASH('1506544777587-fd17800741da', 1000), caption:'Patong Beach', tone:'#2d7a9e', ink:'#071d2b', accent:'#f2d8a6' },
    { src:UNSPLASH('1550989461-9c86422d7ba4', 1000), caption:'Luxury villa', tone:'#c6a45a', ink:'#2a1408', accent:'#f4c896' },
  ],
  itinerary:[
    { day:'Day 1', date:'Mon, 12 May', title:'The Phuket Drop', desc:'Land in Phuket. Private transfer to Katathani resort.', img:{ src:UNSPLASH('1584622650111-993a426fbf0a', 1200), tone:'#3b6a4e', ink:'#0f2e1f', accent:'#e8d9a9', label:'Phuket landing' }, blocks:[
      { time:'2:00 PM', title:'Phuket Arrival', body:'Private transfer from HKT to your beachfront resort.', included:true },
      { time:'8:00 PM', title:'Bangla Road Nightlife', body:'Experience the neon-lit energy of Phuket.', included:false },
    ]},
    { day:'Day 2', date:'Tue, 13 May', title:'Phi Phi Bound', desc:'Early morning transfer to a private speedboat. Snorkel at Maya Bay.', img:{ src:UNSPLASH('1506544777587-fd17800741da', 1200), tone:'#2d7a9e', ink:'#071d2b', accent:'#f2d8a6', label:'Phi Phi islands' }, blocks:[
      { time:'8:00 AM', title:'Speedboat Hop', body:'Private speedboat to Phi Phi Don and Maya Bay.', included:true },
      { time:'1:00 PM', title:'Island Lunch', body:'Traditional Thai buffet on the beach.', included:true },
    ]},
    { day:'Day 3', date:'Wed, 14 May', title:'Island Slowness', desc:'A slow day on Phi Phi. Hike to the viewpoint, go kayaking.', img:{ src:UNSPLASH('1504214208698-ea1916a2195a', 1200), tone:'#3e6a4a', ink:'#0d1f18', accent:'#c9d68a', label:'Island vibes' }, blocks:[
      { time:'9:00 AM', title:'Phi Phi Viewpoint', body:'Short hike for the iconic twin-bay view.', included:true },
      { time:'7:00 PM', title:'Fire Show Dinner', body:'Dinner by the shore with spectacular fire twirlers.', included:true },
    ]},
  ],
  videos:[
    { handle:'@island_hopper', title:'Krabi cliffs', src:LF(400, 700, 'cliff,sea,boat', 91), tone:'#2a5a4a', accent:'#b9e8c9', ink:'#061a12' },
  ],
  whatToPack:[
    { name:'Swimwear (x4)', note:'Crucial. You will live in these.' },
    { name:'0-Markup Forex Card', note:'Niyo or Fi works perfectly.' },
    { name:'Dry Bag', note:'For speedboat transfers.' },
    { name:'Light Linen', note:'Breathable fabrics only for the humidity.' },
  ],
  whatsIncluded:[
    { label:'STAY', v:'6 Nights in 4-star+ rated curated properties.' },
    { label:'TRANSPORT', v:'Airport drops & premium speedboat transfers.' },
    { label:'FOOD', v:'Island breakfast daily, plus 2 curated dinners.' },
    { label:'TRIP CAPTAIN', v:'Bilingual expert throughout.' }
  ],
  stay: {
    name:'Katathani / Zeavola',
    desc:'Curated boutique luxury. Expect infinity pools plunging into the sea, private cabanas, and world-class hospitality.',
    img:UNSPLASH('1550989461-9c86422d7ba4', 600)
  },
  signatureStay:{
    name:'The Shore at Katathani',
    tier:'Luxury tier',
    type:'Seaview Pool Villa',
    rating:4.9,
    reviewsCount:3420,
    amenities:[
      { icon:'sun', label:'Infinity pool' },
      { icon:'shield', label:'Private beach' },
      { icon:'users', label:'World-class spa' },
      { icon:'bed', label:'Seaview villas' },
    ],
    blurb:'A pocket of pure tropical luxury. Private villas that spill directly into the Andaman Sea, with a staff-to-guest ratio that makes every moment feel personalized.',
    thumbs: [
      { src:UNSPLASH('1550989461-9c86422d7ba4', 600), tone:'#2d6a84', ink:'#091824', accent:'#f3d49a', label:'Villa' },
      { src:UNSPLASH('1584622650111-993a426fbf0a', 600), tone:'#3b6a4e', ink:'#0f2e1f', accent:'#e8d9a9', label:'View' },
    ],
  },
  packList:[
    { cat:'Tropical Ready', icon:'sun', items:['Quick-dry swimwear','Linen shirts','Safety beach-flipflops'] },
    { cat:'Activity Gear', icon:'spark', items:['Dry bag for boat','GoPro / Waterproof case','Snorkel kit (available)'] },
  ],
  tripSnapshot:[
    { label:'Transport', value:'Speedboat & private AC vans' },
    { label:'Meals', value:'Breakfast + 2 Dinners' },
    { label:'Group size', value:'Max 12' },
    { label:'Trip type', value:'Couples & friends' },
    { label:'Airfare', value:'Excluded' },
  ],
  cancellationPolicy:[
    { when:'30+ days before', refund:'Full refund', tone:T.greenDeep },
    { when:'15–29 days before', refund:'50% refund', tone:T.amber },
    { when:'Less than 15 days', refund:'No refund', tone:T.rose },
  ],
  inclusions:[
    'Luxury villa / boutique stay (6 nights, twin sharing)',
    'Airport transfers in private AC vans',
    'Premium speedboat island hopping (Phi Phi / Maya Bay)',
    'Daily beachfront breakfast + 2 curated dinners',
    'Bilingual trip captain & local expert lead',
    'Snorkeling gear & national park entry fees',
  ],
  exclusions:[
    'International flights (can be requested post-booking)',
    'Lunch & dinner except as mentioned (~$25/day)',
    'Personal expenses, scuba diving, and tips',
    'Travel insurance (mandatory)',
  ],
  faq:[
    { q:'Is Visa included?', a:'Visa is on arrival for Indians. We provide a checklist of documents, but the fee (~2000 THB) is to be paid at the airport.' },
    { q:'Which airport should I fly into?', a:'Phuket International (HKT). Please aim to land before 12:00 PM on Day 1.' },
    { q:'Can I book this solo?', a:'Absolutely. We will pair you with another solo traveler of the same gender in a twin villa.' },
  ],
  reviewStats:{
    recommend: 98,
    distribution:[{ stars:5, count:120 },{ stars:4, count:10 },{ stars:3, count:2 },{ stars:2, count:0 },{ stars:1, count:0 }],
    tags:[{ label:'Scuba', count:100 }, { label:'Vibe', count:89 }]
  },
  reviews:[
    { name:'Aditya P.', city:'Mumbai', tripDate:'Feb 2026', highlight:'The speedboats', quote:'The speedboat transfers make a huge difference. Felt like a premium private tour. Snorkeling at Maya Bay was the highlight.' }
  ],
  relatedArticleIds:[]
};

const USER_BOOKINGS = [
  // Upcoming — trav.her, departs soon, balance due
  { id:'TRAV-RSH-4F2A9C', trip:WEEKEND_TRIPS[0], status:'upcoming', guests:2, paid:4000, balance:5023, departsIn:3, rating:null, persona:'soloFemale', state:'departs-soon' },
  // Upcoming — corporate, pickup set, balance due later
  { id:'TRAV-JAI-9B31AE', trip:WEEKEND_TRIPS[1], status:'upcoming', guests:1, paid:2000, balance:7598, departsIn:24, rating:null, persona:'corporate', state:'confirmed' },
  // Upcoming — waitlisted, waiting for a spot to open
  { id:'TRAV-MAN-7H2K3P', trip:{...WEEKEND_TRIPS[2], dest:'Manali', dates:'3N/4D · Thu 7 PM → Sun 11 PM', img:{src:LF(1200, 800, 'manali,himalaya,snow,pine', 201), tone:'#3b6a4e', ink:'#0f2e1f', accent:'#e8d9a9', label:'Manali · pine valley'}}, status:'upcoming', guests:2, paid:0, balance:12999, departsIn:18, rating:null, persona:'couples', state:'waitlist', waitlistPos:2 },
  // Upcoming — payment pending (token unpaid, trip hold expires)
  { id:'TRAV-GOA-5P8X2M', trip:{...WEEKEND_TRIPS[1], dest:'South Goa', dates:'3N/4D · Fri 10 PM → Mon 8 AM', img:{src:LF(1200, 800, 'goa,beach,palm,sunset', 202), tone:'#2d7a9e', ink:'#071d2b', accent:'#f2d8a6', label:'South Goa · cove'}}, status:'upcoming', guests:4, paid:0, balance:14800, departsIn:42, rating:null, persona:'group', state:'payment-pending', holdExpiresHours:22 },
  // Past — reviewed, 5 stars
  { id:'TRAV-COR-1C8D42', trip:{...WEEKEND_TRIPS[2], dest:'Coorg', dates:'2N/3D · completed Feb 2026', img:{src:LF(1200, 800, 'coorg,coffee,plantation', 101), tone:'#3e6a4a', ink:'#0d1f18', accent:'#c9d68a', label:'Coorg · coffee country'}}, status:'past', guests:2, paid:15998, balance:0, rating:5, persona:'standard', state:'completed-reviewed' },
  // Past — review pending (can still write review)
  { id:'TRAV-UDA-9F3L7N', trip:{...WEEKEND_TRIPS[0], dest:'Udaipur', dates:'3N/4D · completed Jan 2026', img:{src:LF(1200, 800, 'udaipur,palace,lake,night', 203), tone:'#c6a45a', ink:'#2a1408', accent:'#f4c896', label:'Udaipur · lakeside'}}, status:'past', guests:2, paid:18500, balance:0, rating:null, persona:'couples', state:'review-pending' },
  // Cancelled — refund processed
  { id:'TRAV-ALI-2E5F11', trip:{...WEEKEND_TRIPS[1], dest:'Alibaug', dates:'2N/3D · cancelled', img:{src:LF(1200, 800, 'alibaug,coast,beach', 102), tone:'#2d6a84', ink:'#091824', accent:'#f3d49a', label:'Alibaug · coast'}}, status:'cancelled', guests:2, paid:0, balance:0, refund:3800, persona:'soloFemale', state:'refunded' },
  // Cancelled — refund in progress
  { id:'TRAV-AGR-4B7H9T', trip:{...WEEKEND_TRIPS[1], dest:'Agra', dates:'2N/3D · cancelled 2 days ago', img:{src:UNSPLASH('1524492412937-b28074a5d7da'), tone:'#c6a45a', ink:'#2a1f0a', accent:'#f7e2b5', label:'Agra · heritage'}}, status:'cancelled', guests:1, paid:0, balance:0, refund:6200, persona:'standard', state:'refund-processing', refundEta:3 },
];

// Custom trip requests — user-submitted briefs that the trav team curates into bookable itineraries
const CUSTOM_REQUESTS = [
  { id:'REQ-1042', title:'Birthday weekend in Jaisalmer', dest:'Jaisalmer', dates:'Late Mar 2026 · 3 nights', travelers:6, budget:'₹12–15k / head', vibe:['Heritage','Desert'], persona:'friends', state:'quote-ready', submittedDaysAgo:2, curator:'@priyank.trav', quote:{ price:13800, tripsCount:2 } },
  { id:'REQ-1039', title:'Solo yoga retreat, offbeat',    dest:'Gokarna',  dates:'First week Apr · 4 nights', travelers:1, budget:'₹8–11k',      vibe:['Wellness','Beach'],    persona:'soloFemale', state:'curating', submittedDaysAgo:1, curator:'@meher.wanders' },
  { id:'REQ-1028', title:'Team off-site · 12 people',     dest:'Lonavala', dates:'Apr 25–27 · 2 nights',      travelers:12, budget:'₹9k / head',   vibe:['Corporate','Adventure'], persona:'corporate', state:'submitted', submittedDaysAgo:0 },
  { id:'REQ-1019', title:'Parents-first road trip',       dest:'Coorg → Chikmagalur', dates:'Mar 14–18', travelers:4, budget:'₹20k / head',  vibe:['Nature','Slow'],      persona:'family',   state:'confirmed', submittedDaysAgo:8, curator:'@hillseeker', quote:{ price:19800, tripsCount:1 } },
  { id:'REQ-1001', title:'Hampi temples + boulder walk',  dest:'Hampi',    dates:'Feb 7–10',                  travelers:2, budget:'₹10k / head', vibe:['Heritage','Photography'], persona:'couples', state:'expired', submittedDaysAgo:38 },
];

const PERSONAS = [
  { id:'soloFemale', label:'Solo female', sub:'Women-only cohort, female trip lead.',   icon:'rose',      pitch:'For her' },
  { id:'corporate',  label:'Corporate',   sub:'GST invoice, split billing, off-site.', icon:'briefcase', pitch:'Off-site' },
  { id:'couples',    label:'Couples',     sub:'Private rooms, sunset add-ons.',        icon:'heart',     pitch:'Just us' },
  { id:'group',      label:'Friends',     sub:'4–8 friends, group rate, shared stay.', icon:'users',     pitch:'Squad' },
  { id:'first',      label:'First-timer', sub:'White-glove pickup and packing kit.',   icon:'spark',     pitch:'New here' },
];

const CANCELLATION_TIERS = [
  { window:'15+ days before', refund:1.0,  fee:0,    note:'Full refund · zero questions' },
  { window:'7–14 days before', refund:0.8,  fee:0.2,  note:'80% refund · 20% planning fee' },
  { window:'3–6 days before',  refund:0.5,  fee:0.5,  note:'50% refund · partner stays already locked' },
  { window:'<72 hours',        refund:0.0,  fee:1.0,  note:'No refund · trip is in motion' },
];

Object.assign(window, { TRAV, WEEKEND_TRIPS, ALL_TRIPS, HOW_IT_WORKS, GOING_LONGER, RISHIKESH_TRIP, NAINITAL_TRIP, THAILAND_TRIP, USER_BOOKINGS, CUSTOM_REQUESTS, PERSONAS, CANCELLATION_TIERS });
