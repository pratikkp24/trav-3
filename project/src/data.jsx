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
  { id:'trip-nainital', dest:'Nainital', dates:'2N/3D · Fri 10 PM → Sun 8 PM', price:7999, tags:['Nature','Mountains'], creator:'@hillseeker', spotsLeft:3, spotsTotal:15, heat:'almost-full', img:{src:UNSPLASH('1626621341517-bbf3d9990a23'), tone:'#355e4a', ink:'#0b2418', accent:'#a6c8b1', label:'Nainital · lake + pines'} },
];

// Expanded catalog for the "View all" filter index
const ALL_TRIPS = [
  // Weekend
  { id:'trip-rishikesh', dest:'Rishikesh', region:'UTTARAKHAND', title:'Rafting & Riverside Yoga', duration:'weekend', nights:'2N/3D', price:8499, tags:['Adventure','Wellness'], vibes:['adventure','wellness','nature'], travelingAs:['friends','solo-female','couple'], fillingFast:true, travHerExclusive:false, img:{src:UNSPLASH('1571536802807-30451e3955d8'), tone:'#3b6a4e', ink:'#0f2e1f', accent:'#e8d9a9', label:'Rishikesh'} },
  { id:'trip-jaipur', dest:'Jaipur', region:'RAJASTHAN', title:'Pink City Heritage Walk', duration:'weekend', nights:'2N/3D', price:9999, tags:['Heritage','Food'], vibes:['heritage','culture'], travelingAs:['friends','couple','family'], fillingFast:false, travHerExclusive:false, img:{src:UNSPLASH('1477587458883-47145ed94245'), tone:'#c66a3d', ink:'#4a2414', accent:'#f2d9b3', label:'Jaipur'} },
  { id:'trip-nainital', dest:'Nainital', region:'UTTARAKHAND', title:'Lake & Pine Mornings', duration:'weekend', nights:'2N/3D', price:7999, tags:['Nature','Mountains'], vibes:['nature','mountains'], travelingAs:['friends','couple','family'], fillingFast:true, travHerExclusive:false, img:{src:UNSPLASH('1626621341517-bbf3d9990a23'), tone:'#355e4a', ink:'#0b2418', accent:'#a6c8b1', label:'Nainital'} },
  // 2–3 Days
  { id:'trip-manali', dest:'Old Manali', region:'HIMACHAL, HP', title:'Riverside Glamping & Yoga', duration:'2-3', nights:'3 Days · All Inclusive', price:8499, tags:['Adventure'], vibes:['adventure','nature','wellness'], travelingAs:['solo-female','couple','friends'], fillingFast:true, travHerExclusive:false, img:{src:LF(1200, 800, 'manali,himalaya,pine,valley', 501), tone:'#3b6a4e', ink:'#0f2e1f', accent:'#e8d9a9', label:'Old Manali'} },
  { id:'trip-agra', dest:'Agra', region:'UTTAR PRADESH', title:'Mughal Heritage & High Tea', duration:'2-3', nights:'2 Days · Solo Friendly', price:6200, tags:['Heritage'], vibes:['heritage','culture'], travelingAs:['solo-female','couple'], fillingFast:false, travHerExclusive:true, img:{src:UNSPLASH('1524492412937-b28074a5d7da'), tone:'#c6a45a', ink:'#2a1f0a', accent:'#f7e2b5', label:'Agra'} },
  { id:'trip-jodhpur', dest:'Jodhpur', region:'RAJASTHAN', title:'The Blue City Photo Walk', duration:'2-3', nights:'2 Days · Urban Legend', price:4500, tags:['Cultural'], vibes:['heritage','culture'], travelingAs:['friends','couple','solo-female'], fillingFast:false, travHerExclusive:false, img:{src:LF(1200, 800, 'jodhpur,bluecity,fort', 502), tone:'#4a6788', ink:'#0c1524', accent:'#e8d8b8', label:'Jodhpur'} },
  // 4–6 Days
  { id:'trip-goa', dest:'South Goa', region:'GOA', title:'Secret Cove & Kayaking', duration:'4-6', nights:'4 Days · Chill Vibes', price:12800, tags:['Beach'], vibes:['beach','nature'], travelingAs:['friends','couple','solo-female'], fillingFast:true, travHerExclusive:false, img:{src:LF(1200, 800, 'goa,palolem,palm,beach', 503), tone:'#2d7a9e', ink:'#071d2b', accent:'#f2d8a6', label:'South Goa'} },
  { id:'trip-triund', dest:'Triund', region:'HIMACHAL, HP', title:'Starry Night Ridge Hike', duration:'2-3', nights:'2 Days · High Altitude', price:5500, tags:['Trekking'], vibes:['adventure','mountains','nature'], travelingAs:['friends','solo-female'], fillingFast:false, travHerExclusive:false, img:{src:LF(1200, 800, 'triund,mountains,trek,snow', 504), tone:'#4a6788', ink:'#0c1524', accent:'#dfe7f0', label:'Triund'} },
  { id:'trip-udaipur', dest:'Udaipur', region:'RAJASTHAN', title:'Lake View Suite Retreat', duration:'2-3', nights:'3 Days · Luxury Escape', price:18500, tags:['Romantic'], vibes:['romantic','heritage'], travelingAs:['couple','family'], fillingFast:false, travHerExclusive:false, img:{src:LF(1200, 800, 'udaipur,palace,lake,night', 505), tone:'#c6a45a', ink:'#2a1408', accent:'#f4c896', label:'Udaipur'} },
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

const USER_BOOKINGS = [
  { id:'TRAV-RSH-4F2A9C', trip:WEEKEND_TRIPS[0], status:'upcoming', guests:2, paid:4000, balance:5023, departsIn:3, rating:null },
  { id:'TRAV-JAI-9B31AE', trip:WEEKEND_TRIPS[1], status:'upcoming', guests:1, paid:2000, balance:7598, departsIn:24, rating:null },
  { id:'TRAV-COR-1C8D42', trip:{...WEEKEND_TRIPS[2], dest:'Coorg', dates:'2N/3D · completed Feb 2026', img:{src:LF(1200, 800, 'coorg,coffee,plantation', 101), tone:'#3e6a4a', ink:'#0d1f18', accent:'#c9d68a', label:'Coorg · coffee country'}}, status:'past', guests:2, paid:15998, balance:0, rating:5 },
  { id:'TRAV-ALI-2E5F11', trip:{...WEEKEND_TRIPS[1], dest:'Alibaug', dates:'2N/3D · cancelled', img:{src:LF(1200, 800, 'alibaug,coast,beach', 102), tone:'#2d6a84', ink:'#091824', accent:'#f3d49a', label:'Alibaug · coast'}}, status:'cancelled', guests:2, paid:0, balance:0, refund:3800 },
];

Object.assign(window, { TRAV, WEEKEND_TRIPS, ALL_TRIPS, HOW_IT_WORKS, GOING_LONGER, RISHIKESH_TRIP, USER_BOOKINGS });
