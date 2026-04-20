// ─────────────────────────────────────────────────────────────────────────────
// studio-data.jsx — shared mock data & localStorage helpers for all 3 studios
// Namespace: trav.studio.*
// ─────────────────────────────────────────────────────────────────────────────

// ── Mock Ops Users ─────────────────────────────────────────────────────────
const STUDIO_OPS_USERS = [
  { id: 'ops1', name: 'Priya Mehta', email: 'priya@trav.app', role: 'admin', avatar: 'PM' },
  { id: 'ops2', name: 'Karan Shah', email: 'karan@trav.app', role: 'ops', avatar: 'KS' },
  { id: 'ops3', name: 'Nitya Bose', email: 'nitya@trav.app', role: 'editorial', avatar: 'NB' },
];

const STUDIO_CREATORS = [
  { id: 'tanya_travels', name: 'Tanya Khanijow', handle: '@tanya_travels', email: 'tanya@gmail.com', verified: true, trips: 8, rating: 4.8, followers: '12.4k', specialization: 'Mountains, Solo', status: 'active' },
  { id: 'meher.wanders', name: 'Meher Wanders', handle: '@meher.wanders', email: 'meher@gmail.com', verified: true, trips: 12, rating: 4.9, followers: '8.2k', specialization: 'Himalayas, Women-only', status: 'active' },
  { id: 'rajasthan_ravi', name: 'Ravi Singh', handle: '@rajasthan_ravi', email: 'ravi@gmail.com', verified: true, trips: 5, rating: 4.7, followers: '5.1k', specialization: 'Heritage, Rajasthan', status: 'active' },
];

const STUDIO_DMCS = [
  { id: 'dmc-himalayan', name: 'Himalayan Trails Co.', contact: 'Suresh Thakur', email: 'ops@himalayantrails.in', serviceAreas: ['Himachal', 'Uttarakhand'], verified: true, activeSince: '2022-03-01', status: 'active' },
  { id: 'dmc-rajputana', name: 'Rajputana Journeys', contact: 'Fatima Siddiqui', email: 'info@rajputana.in', serviceAreas: ['Rajasthan'], verified: true, activeSince: '2021-11-15', status: 'active' },
  { id: 'dmc-coastal', name: 'Coastal Escapes Ltd.', contact: 'Marco D\'Souza', email: 'hello@coastalescapes.in', serviceAreas: ['Goa', 'Kerala'], verified: true, activeSince: '2023-01-10', status: 'active' },
];

// ── NEW: Unified Request Ecosystem ──────────────────────────────────────────
// Domains: 'user' | 'creator' | 'dmc'
const STUDIO_REQUESTS = [
  { 
    id: 'req-u1', 
    domain: 'user', 
    userId: 'u1', 
    userName: 'Aditi Rao', 
    dest: 'Spiti Valley', 
    notes: 'Photography focus, 8 days.',
    status: 'new',
    submittedAt: new Date(Date.now() - 3600000).toISOString(), // 1h ago
    assignedTo: null, 
    tatDeadline: null,
    trail: []
  },
  { 
    id: 'req-c1', 
    domain: 'creator', 
    userId: 'tanya_travels', 
    userName: 'Tanya Khanijow', 
    dest: 'Ladakh Winter', 
    notes: 'Proposing a "Frozen Zanskar" curated trip for Jan 2027.',
    status: 'assigned',
    assignedTo: { type: 'dmc', id: 'dmc-himalayan', name: 'Himalayan Trails' },
    submittedAt: new Date(Date.now() - 7200000).toISOString(),
    tatDeadline: new Date(Date.now() + 3600000).toISOString(), // 1h remaining
    trail: [{ role: 'ops', text: 'Assigning to Himalayan Trails for ground feasibility check.' }]
  },
  { 
    id: 'req-d1', 
    domain: 'dmc', 
    userId: 'dmc-rajputana', 
    userName: 'Rajputana Journeys', 
    dest: 'Marwar Heritage', 
    notes: 'Updating ground costs for Jaisalmer heritage circuit.',
    status: 'under-review',
    assignedTo: { type: 'internal', id: 'ops2', name: 'Karan Shah' },
    submittedAt: new Date(Date.now() - 14400000).toISOString(),
    tatDeadline: null,
    trail: []
  }
];

// ── NEW: Support Tickets ──────────────────────────────────────────────────
const STUDIO_TICKETS = [
  { id: 'tic-1', userId: 'u1', userName: 'Aditi Rao', subject: 'Refund tracking', body: 'My refund for the Manali trip hasn\'t reflected yet.', priority: 'high', status: 'open', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'tic-2', userId: 'u3', userName: 'Meera Varma', subject: 'TravHer Verification', body: 'Requesting verification for my Solo Female traveler badge.', priority: 'medium', status: 'resolved', createdAt: new Date(Date.now() - 172800000).toISOString() },
];

// ── NEW: Logistics & Fulfillment ────────────────────────────────AAAAAAAAAA
const STUDIO_DEPARTURES = [
  { 
    id: 'dep-rish-0516', 
    tripId: 'trip-rishikesh', 
    dest: 'Rishikesh Yoga', 
    date: 'May 16–18, 2026', 
    dmcId: 'dmc-himalayan',
    status: 'on-track', 
    spotsTotal: 15,
    spotsConfirmed: 12,
    supplyStatus: { hotel: 'confirmed', transport: 'confirmed', lead: 'assigned' }
  },
  { 
    id: 'dep-spiti-0620', 
    tripId: 'live.catalog.spiti', 
    dest: 'Spiti Odyssey', 
    date: 'Jun 20–28, 2026', 
    dmcId: 'dmc-himalayan',
    status: 'action-required', 
    spotsTotal: 12,
    spotsConfirmed: 4,
    supplyStatus: { hotel: 'pending', transport: 'confirmed', lead: 'unassigned' }
  },
  { 
    id: 'dep-jaipur-0524', 
    tripId: 'trip-jaipur', 
    dest: 'Jaipur Pink City', 
    date: 'May 24–25, 2026', 
    dmcId: 'dmc-rajputana',
    status: 'on-track', 
    spotsTotal: 15,
    spotsConfirmed: 15,
    supplyStatus: { hotel: 'confirmed', transport: 'confirmed', lead: 'assigned' }
  }
];

const STUDIO_BOOKINGS = [
  { id: 'b1', depId: 'dep-rish-0516', name: 'Aditi Rao', phone: '+91 98765 43210', gender: 'F', age: 28, room: 'Single', meal: 'Veg', payment: 'paid' },
  { id: 'b2', depId: 'dep-rish-0516', name: 'Kabir Singh', phone: '+91 91234 56789', gender: 'M', age: 31, room: 'Twin (Share)', meal: 'Non-Veg', payment: 'paid' },
  { id: 'b3', depId: 'dep-rish-0516', name: 'Sana Khan', phone: '+91 99887 76655', gender: 'F', age: 26, room: 'Twin (Share)', meal: 'Veg', payment: 'partial' },
  { id: 'b4', depId: 'dep-jaipur-0524', name: 'Rahul Verma', phone: '+91 98989 89898', gender: 'M', age: 35, room: 'Single', meal: 'Veg', payment: 'paid' },
];

const STUDIO_NS = 'trav.studio';

function studioGet(key) {
  try { return JSON.parse(localStorage.getItem(`${STUDIO_NS}.${key}`) || 'null'); } catch { return null; }
}
function studioSet(key, val) {
  try { localStorage.setItem(`${STUDIO_NS}.${key}`, JSON.stringify(val)); } catch {}
}
function studioGetOrSeed(key, seed) {
  const existing = studioGet(key);
  if (existing !== null) return existing;
  studioSet(key, seed);
  return seed;
}

function seedStudioData() {
  studioGetOrSeed('requests', STUDIO_REQUESTS);
  studioGetOrSeed('tickets', STUDIO_TICKETS);
  studioGetOrSeed('travelogues', []);
  studioGetOrSeed('departures', STUDIO_DEPARTURES);
  studioGetOrSeed('bookings', STUDIO_BOOKINGS);
}
seedStudioData();

Object.assign(window, {
  STUDIO_OPS_USERS, STUDIO_CREATORS, STUDIO_DMCS, STUDIO_DEPARTURES, STUDIO_BOOKINGS,
  studioGet, studioSet, studioGetOrSeed, seedStudioData
});
