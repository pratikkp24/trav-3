// Trav Coins — lightweight client-side wallet for the prototype.
// Caps are enforced here so the UI reads one source of truth (COIN_RULES).
// Persistence: localStorage.trav.wallet. Everything is best-effort (try/catch)
// because this module has to survive a blown localStorage in dev.

const COIN_RULES = {
  VALUE_PER_COIN: 1,              // 1 Coin = Re 1
  BOOKING_CASHBACK_PCT: 0.005,    // 0.5%
  BOOKING_CASHBACK_CAP: 100,      // per booking
  REFERRAL_SIGNUP: 50,            // each side on referred signup
  REFERRAL_FIRST_BOOKING: 100,    // each side on friend's first booking
  TRAVELOGUE_APPROVED: 25,        // max 1 per quarter
  TRIP_RATING: 10,                // per rated trip
  PROFILE_COMPLETE: 50,           // one-time
  QUARTERLY_EARN_CAP: 500,        // per user per quarter
  LIFETIME_BALANCE_CAP: 1500,     // wallet max
  EXPIRY_DAYS: 183,               // ~6 months
  MIN_REDEEM: 500,                // minimum burn per booking
  MAX_REDEEM_ABS: 500,            // absolute cap per booking
  MAX_REDEEM_PCT: 0.05,           // % of trip cap per booking
  MIN_TRIP_FOR_REDEEM: 5000,      // trip must be ≥ Rs 5,000
  REFERRALS_PER_YEAR: 5,          // successful referrals cap
  CREDIT_DELAY_HOURS: 24,         // after trip ends
};

// A realistic seeded wallet so the demo has state immediately.
function _seedWallet() {
  const now = Date.now();
  const day = 24*60*60*1000;
  const expiryFromCreated = (created) => created + COIN_RULES.EXPIRY_DAYS * day;
  const tx = [
    { id:'tx-1', type:'BOOKING_CASHBACK', amount:75, desc:'Cashback · Rishikesh booking', createdAt: now - 90*day, expiresAt: expiryFromCreated(now - 90*day), status:'credited' },
    { id:'tx-2', type:'REFERRAL_SIGNUP', amount:50, desc:'Friend @kriti signed up', createdAt: now - 70*day, expiresAt: expiryFromCreated(now - 70*day), status:'credited' },
    { id:'tx-3', type:'REFERRAL_FIRST_BOOKING', amount:100, desc:"@kriti's first trip booked", createdAt: now - 60*day, expiresAt: expiryFromCreated(now - 60*day), status:'credited' },
    { id:'tx-4', type:'REFERRAL_SIGNUP', amount:50, desc:'Friend @ishan signed up', createdAt: now - 20*day, expiresAt: expiryFromCreated(now - 20*day), status:'credited' },
    { id:'tx-5', type:'TRIP_RATING', amount:10, desc:'Rated Coorg trip', createdAt: now - 15*day, expiresAt: expiryFromCreated(now - 15*day), status:'credited' },
    { id:'tx-6', type:'TRAVELOGUE_APPROVED', amount:25, desc:'Travelogue: "Three nights in Coorg" approved', createdAt: now - 10*day, expiresAt: expiryFromCreated(now - 10*day), status:'credited' },
    // One earning marked pending (awaiting trip completion + 24h)
    { id:'tx-7', type:'BOOKING_CASHBACK', amount:85, desc:'Cashback · Goa (credits 24h after trip)', createdAt: now - 2*day, expiresAt: expiryFromCreated(now - 2*day), status:'pending' },
    // One redemption
    { id:'tx-8', type:'REDEEM', amount:-15, desc:'Redeemed on Jaipur booking', createdAt: now - 80*day, expiresAt: null, status:'burned' },
    // One coin set that's expiring in 18 days — triggers the warning card
    { id:'tx-9', type:'BOOKING_CASHBACK', amount:40, desc:'Cashback · older trip (expiring soon)', createdAt: now - (COIN_RULES.EXPIRY_DAYS - 18)*day, expiresAt: now + 18*day, status:'credited' },
  ];
  // Balance = credited positive + redeem negative. Pending does NOT count.
  const balance = tx.filter(t => t.status === 'credited').reduce((s,t)=>s+t.amount,0)
                + tx.filter(t => t.status === 'burned').reduce((s,t)=>s+t.amount,0);
  const qStart = _quarterStart(now);
  const earnedThisQuarter = tx
    .filter(t => t.amount > 0 && t.status === 'credited' && t.createdAt >= qStart)
    .reduce((s,t)=>s+t.amount, 0);
  return {
    balance,
    earnedThisQuarter,
    totalEarnedLifetime: tx.filter(t=>t.amount>0 && t.status==='credited').reduce((s,t)=>s+t.amount,0),
    totalRedeemedLifetime: Math.abs(tx.filter(t=>t.amount<0).reduce((s,t)=>s+t.amount,0)),
    referralsThisYear: 2,
    profileBonusClaimed: true,
    transactions: tx,
    quarterKey: _quarterKey(now),
    yearKey: new Date(now).getFullYear(),
  };
}

function _quarterStart(ts) {
  const d = new Date(ts);
  const q = Math.floor(d.getMonth() / 3);
  return new Date(d.getFullYear(), q*3, 1).getTime();
}
function _quarterKey(ts) {
  const d = new Date(ts);
  return `${d.getFullYear()}-Q${Math.floor(d.getMonth()/3)+1}`;
}

function getWallet() {
  try {
    const raw = localStorage.getItem('trav.wallet');
    if (raw) {
      const w = JSON.parse(raw);
      // Reset quarterly counter if quarter rolled over
      const nowKey = _quarterKey(Date.now());
      if (w.quarterKey !== nowKey) { w.quarterKey = nowKey; w.earnedThisQuarter = 0; }
      const yr = new Date(Date.now()).getFullYear();
      if (w.yearKey !== yr) { w.yearKey = yr; w.referralsThisYear = 0; }
      return w;
    }
  } catch {}
  const w = _seedWallet();
  try { localStorage.setItem('trav.wallet', JSON.stringify(w)); } catch {}
  return w;
}

function _saveWallet(w) {
  try { localStorage.setItem('trav.wallet', JSON.stringify(w)); } catch {}
  try { window.dispatchEvent(new CustomEvent('trav:wallet-change', { detail: w })); } catch {}
  return w;
}

function creditCoins(type, amount, meta = {}) {
  const w = getWallet();
  const reasons = [];
  let credit = Math.max(0, Math.round(amount));
  // Per-action caps
  if (type === 'BOOKING_CASHBACK') credit = Math.min(credit, COIN_RULES.BOOKING_CASHBACK_CAP);
  // Quarterly cap
  const qHeadroom = Math.max(0, COIN_RULES.QUARTERLY_EARN_CAP - w.earnedThisQuarter);
  if (credit > qHeadroom) { reasons.push('quarterly cap'); credit = qHeadroom; }
  // Lifetime balance cap
  const bHeadroom = Math.max(0, COIN_RULES.LIFETIME_BALANCE_CAP - w.balance);
  if (credit > bHeadroom) { reasons.push('wallet cap'); credit = bHeadroom; }
  const rejected = Math.max(0, Math.round(amount)) - credit;
  if (credit === 0) {
    console.log('[trav.coins] credit rejected', { type, amount, reasons });
    return { credited: 0, rejected, reason: reasons.join(', ') };
  }
  const now = Date.now();
  const tx = {
    id: 'tx-' + Math.random().toString(36).slice(2,9),
    type, amount: credit, desc: meta.desc || _defaultDesc(type, meta),
    createdAt: now,
    expiresAt: now + COIN_RULES.EXPIRY_DAYS * 24*60*60*1000,
    status: meta.pending ? 'pending' : 'credited',
    meta,
  };
  w.transactions.unshift(tx);
  if (tx.status === 'credited') {
    w.balance += credit;
    w.earnedThisQuarter += credit;
    w.totalEarnedLifetime += credit;
  }
  if (type === 'REFERRAL_FIRST_BOOKING' || type === 'REFERRAL_SIGNUP') {
    // Count a successful referral only on SIGNUP (to avoid double-counting)
    if (type === 'REFERRAL_SIGNUP') w.referralsThisYear = (w.referralsThisYear||0) + 1;
  }
  _saveWallet(w);
  console.log('[trav.coins] credited', tx);
  return { credited: credit, rejected, reason: reasons.join(', ') || null };
}

function _defaultDesc(type, meta) {
  switch (type) {
    case 'BOOKING_CASHBACK': return meta.bookingId ? `Cashback · ${meta.bookingId}` : 'Booking cashback';
    case 'REFERRAL_SIGNUP': return meta.friend ? `Friend ${meta.friend} signed up` : 'Friend signed up';
    case 'REFERRAL_FIRST_BOOKING': return meta.friend ? `${meta.friend}'s first trip` : "Friend's first trip";
    case 'TRAVELOGUE_APPROVED': return 'Travelogue approved';
    case 'TRIP_RATING': return 'Trip rating';
    case 'PROFILE_COMPLETE': return 'Profile complete bonus';
    case 'REDEEM': return meta.bookingId ? `Redeemed on ${meta.bookingId}` : 'Redeemed on booking';
    default: return type;
  }
}

// Validate a redemption. Returns { discount, coinsBurned, reason }.
// If reason is truthy, redemption is NOT allowed.
// Pass { commit: true } to actually burn. UI calls commit only on payment success.
function redeemCoins(tripAmount, maxCoinsToUse, { couponApplied = '', commit = false } = {}) {
  const w = getWallet();
  if (couponApplied === 'FIRSTRIP') {
    return { discount:0, coinsBurned:0, reason:'Only one incentive can apply — remove FIRSTRIP to use coins.' };
  }
  if (tripAmount < COIN_RULES.MIN_TRIP_FOR_REDEEM) {
    return { discount:0, coinsBurned:0, reason:`Trips below ${'\u20b9'}${COIN_RULES.MIN_TRIP_FOR_REDEEM.toLocaleString('en-IN')} don't qualify.` };
  }
  if (w.balance < COIN_RULES.MIN_REDEEM) {
    return { discount:0, coinsBurned:0, reason:`Minimum redemption is ${COIN_RULES.MIN_REDEEM} coins.` };
  }
  const perBookingCap = Math.min(Math.floor(tripAmount * COIN_RULES.MAX_REDEEM_PCT), COIN_RULES.MAX_REDEEM_ABS, w.balance);
  const coinsBurned = Math.min(maxCoinsToUse || perBookingCap, perBookingCap);
  if (coinsBurned < COIN_RULES.MIN_REDEEM) {
    return { discount:0, coinsBurned:0, reason:`Minimum redemption is ${COIN_RULES.MIN_REDEEM} coins.` };
  }
  const discount = coinsBurned * COIN_RULES.VALUE_PER_COIN;
  if (commit) {
    // FIFO burn across credited (non-expired) transactions
    let remaining = coinsBurned;
    const now = Date.now();
    const credited = [...w.transactions]
      .filter(t => t.amount > 0 && t.status === 'credited' && (!t.expiresAt || t.expiresAt > now))
      .sort((a,b) => a.createdAt - b.createdAt);
    // We don't mutate credited tx amounts (keeps history clean); record a single REDEEM tx.
    w.balance -= coinsBurned;
    w.totalRedeemedLifetime += coinsBurned;
    w.transactions.unshift({
      id: 'tx-' + Math.random().toString(36).slice(2,9),
      type:'REDEEM', amount: -coinsBurned,
      desc: `Redeemed on booking · ${'\u20b9'}${discount} off`,
      createdAt: now, expiresAt: null, status:'burned',
    });
    _saveWallet(w);
  }
  return { discount, coinsBurned, reason: null };
}

function expireOldCoins() {
  const w = getWallet();
  const now = Date.now();
  let expired = 0;
  w.transactions = w.transactions.map(t => {
    if (t.amount > 0 && t.status === 'credited' && t.expiresAt && t.expiresAt <= now) {
      expired += t.amount;
      return { ...t, status: 'expired' };
    }
    return t;
  });
  if (expired > 0) {
    w.balance = Math.max(0, w.balance - expired);
    w.transactions.unshift({
      id: 'tx-' + Math.random().toString(36).slice(2,9),
      type: 'EXPIRE', amount: -expired,
      desc: `${expired} coins expired`,
      createdAt: now, expiresAt: null, status: 'expired',
    });
    _saveWallet(w);
  }
  return expired;
}

function coinsExpiringWithin(days = 30) {
  const w = getWallet();
  const cutoff = Date.now() + days*24*60*60*1000;
  return w.transactions
    .filter(t => t.amount > 0 && t.status === 'credited' && t.expiresAt && t.expiresAt <= cutoff)
    .reduce((s,t) => s + t.amount, 0);
}

// Compute what a given trip amount earns — mirrors the rule for display.
function earnPreview(tripAmount) {
  return Math.min(COIN_RULES.BOOKING_CASHBACK_CAP, Math.round(tripAmount * COIN_RULES.BOOKING_CASHBACK_PCT));
}

Object.assign(window, {
  COIN_RULES, getWallet, creditCoins, redeemCoins, expireOldCoins,
  coinsExpiringWithin, earnPreview,
});
