const T = {
  green:'#1DBF73', greenDeep:'#169E5A', greenDark:'#0b6f3f',
  ink:'#0F1E2E', inkSoft:'#1a2e42',
  offWhite:'#FAFAFA', cream:'#FAF5EE', roseCream:'#FBEFE7',
  grey:'#6E6E6E', greyLight:'#E6E6E6',
  rose:'#C14A36', roseSoft:'#E8614D',
  amber:'#E6A33A', amberSoft:'#FFF5D6', fire:'#F97316',
  // Trav Coins gold — a touch warmer than amber. goldSoft = hero gradient base.
  gold:'#F5A623', goldDeep:'#C17F12', goldSoft:'#FFF6E0',
};

// Native environment check
const isIosApp = !!(window.webkit && window.webkit.messageHandlers);

function haptic(type = 'medium') {
  if (isIosApp && window.webkit.messageHandlers.haptic) {
    window.webkit.messageHandlers.haptic.postMessage({ type });
  } else if (window.navigator && window.navigator.vibrate) {
    // Fallback for Android/Web
    window.navigator.vibrate(10);
  }
}

function share(text, url) {
  const shareData = { text: text || 'Check out this trip on Trav!', url: url || window.location.href };
  if (isIosApp && window.webkit.messageHandlers.share) {
    window.webkit.messageHandlers.share.postMessage({ 
      text: shareData.text + (shareData.url ? '\n' + shareData.url : '') 
    });
  } else if (navigator.share) {
    navigator.share(shareData).catch(() => {});
  } else {
    // Fallback to clipboard
    const fullText = shareData.text + (shareData.url ? '\n' + shareData.url : '');
    navigator.clipboard.writeText(fullText);
    alert('Link copied to clipboard!');
  }
}

function Ico({ name, size=16, color='currentColor', stroke=1.8, fill='none' }) {
  const p = { width:size, height:size, viewBox:'0 0 24 24', fill, stroke:color, strokeWidth:stroke, strokeLinecap:'round', strokeLinejoin:'round' };
  switch (name) {
    case 'arrow-right': return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'arrow-left': return <svg {...p}><path d="M19 12H5M11 6l-6 6 6 6"/></svg>;
    case 'chevron-down': return <svg {...p}><path d="M6 9l6 6 6-6"/></svg>;
    case 'chevron-right': return <svg {...p}><path d="M9 6l6 6-6 6"/></svg>;
    case 'check': return <svg {...p}><path d="M5 12l5 5L20 6"/></svg>;
    case 'x': return <svg {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>;
    case 'users': return <svg {...p}><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle cx="17" cy="8" r="2.5"/><path d="M21.5 19c0-2.5-1.7-4.3-4-4.8"/></svg>;
    case 'shield': return <svg {...p}><path d="M12 3l8 3v6c0 4.5-3.2 8.5-8 9-4.8-.5-8-4.5-8-9V6l8-3z"/></svg>;
    case 'star': return <svg {...p} fill={color}><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z"/></svg>;
    case 'fire': return <svg {...p} fill={color}><path d="M12 2s3 5 3 8a3 3 0 01-6 0c0-1-1-2-1-2s-3 3-3 7a7 7 0 0014 0c0-5-7-13-7-13z"/></svg>;
    case 'spark': return <svg {...p} fill={color}><path d="M13 2L7 14h5l-1 8 7-12h-5l1-8z"/></svg>;
    case 'calendar': return <svg {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>;
    case 'pin': return <svg {...p}><path d="M12 22s-7-7-7-13a7 7 0 0114 0c0 6-7 13-7 13z"/><circle cx="12" cy="9" r="2.5"/></svg>;
    case 'clock': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'bell': return <svg {...p}><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/></svg>;
    case 'download': return <svg {...p}><path d="M12 3v13M6 11l6 6 6-6M4 21h16"/></svg>;
    case 'phone': return <svg {...p} fill={color}><path d="M6.6 10.8a15.5 15.5 0 006.6 6.6l2.2-2.2a1 1 0 011-.3c1.1.4 2.3.6 3.6.6a1 1 0 011 1v3.5a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.2 2.5.6 3.6a1 1 0 01-.3 1z"/></svg>;
    case 'copy': return <svg {...p}><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2"/></svg>;
    case 'send': return <svg {...p}><path d="M4 12l16-8-6 18-3-7-7-3z"/></svg>;
    case 'whatsapp': return <svg viewBox="0 0 24 24" width={size} height={size} fill={color}><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.5-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.6-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 00-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1112 20z"/></svg>;
    case 'heart': return <svg {...p} fill={color}><path d="M12 20.5l-8-7a5 5 0 117-7l1 1 1-1a5 5 0 117 7l-8 7z"/></svg>;
    case 'rose': return <svg viewBox="0 0 24 24" width={size} height={size}><path d="M12 3c2 0 3.5 1.5 3.5 3.5 0 1.2-.6 2-1.3 2.5.6.5 1.1 1.4 1.1 2.3 0 1.9-1.5 3.2-3.3 3.2s-3.3-1.3-3.3-3.2c0-.9.5-1.8 1.1-2.3C9 8.5 8.5 7.7 8.5 6.5 8.5 4.5 10 3 12 3z" fill={T.rose}/><path d="M12 14v6M12 20s2-1 2-3M12 20s-2-1-2-3" stroke="#2d5a2a" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>;
    case 'bed': return <svg {...p}><path d="M3 18v-8h18v8M3 14h18M7 10V7a2 2 0 012-2h3a2 2 0 012 2v3"/></svg>;
    case 'car': return <svg {...p}><path d="M5 17h14v-5l-2-5H7l-2 5v5z"/><circle cx="8" cy="17" r="1.5"/><circle cx="16" cy="17" r="1.5"/></svg>;
    case 'sun': return <svg {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.2 4.2l1.5 1.5M18.3 18.3l1.5 1.5M2 12h2M20 12h2M4.2 19.8l1.5-1.5M18.3 5.7l1.5-1.5"/></svg>;
    case 'bag': return <svg {...p}><path d="M5 8h14l-1 12a2 2 0 01-2 2H8a2 2 0 01-2-2L5 8z"/><path d="M9 8V6a3 3 0 016 0v2"/></svg>;
    case 'gift': return <svg {...p}><rect x="3" y="10" width="18" height="11" rx="1"/><path d="M3 10V8h18v2M12 10v11M8 10S6 7 8 5s4 3 4 5c0 0-2-3-4-2zM16 10s2-3 0-5-4 3-4 5c0 0 2-3 4-2z"/></svg>;
    case 'settings': return <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3 1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9 1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>;
    case 'logout': return <svg {...p}><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>;
    case 'sunrise': return <svg {...p}><path d="M3 18h18M5.6 14a6.4 6.4 0 0112.8 0M12 4v3M5 7l1.5 1.5M19 7l-1.5 1.5M2 18h2M20 18h2M8 21h8"/></svg>;
    case 'moon': return <svg {...p} fill={color}><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>;
    case 'coffee': return <svg {...p}><path d="M5 9h12v7a4 4 0 01-4 4H9a4 4 0 01-4-4V9z"/><path d="M17 11h2a2 2 0 010 4h-2M8 4s-1 1.5 0 3M12 4s-1 1.5 0 3"/></svg>;
    case 'mic': return <svg {...p}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3M9 21h6"/></svg>;
    case 'play': return <svg {...p} fill={color}><path d="M7 4l12 8-12 8z"/></svg>;
    case 'briefcase': return <svg {...p}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 12h18"/></svg>;
    case 'refresh': return <svg {...p}><path d="M3 12a9 9 0 0115-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 01-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg>;
    case 'edit': return <svg {...p}><path d="M12 20h9M16.5 3.5a2.1 2.1 0 113 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>;
    case 'alert': return <svg {...p}><path d="M10.3 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>;
    case 'minus': return <svg {...p}><path d="M5 12h14"/></svg>;
    case 'plus': return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>;
    case 'coin': return <svg viewBox="0 0 24 24" width={size} height={size}><circle cx="12" cy="12" r="10" fill={color==='currentColor'?'#F5A623':color} stroke="#C17F12" strokeWidth="1.2"/><text x="12" y="16" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff" fontFamily="Poppins, sans-serif">₹</text></svg>;
    case 'sparkle-ring': return <svg {...p}><circle cx="12" cy="12" r="7"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/></svg>;
    case 'search': return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>;
    case 'share': return <svg {...p}><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>;
    default: return null;
  }
}

function Btn({ kind='primary', size='md', icon, trailing, full, onClick, children, style, disabled }) {
  const sizes = { 
    sm:{h:36,fs:12.5,pad:'0 14px',gap:6,ico:13}, 
    md:{h:46,fs:14,pad:'0 20px',gap:8,ico:15}, 
    lg:{h:54,fs:15.5,pad:'0 26px',gap:10,ico:17} 
  }[size];
  
  const kinds = {
    primary:{bg:T.green,fg:'#fff',bd:T.green,active:T.greenDeep},
    dark:{bg:T.ink,fg:'#fff',bd:T.ink,active:'#1a2e42'},
    outline:{bg:'transparent',fg:T.ink,bd:T.greyLight,active:'rgba(15,30,46,.05)'},
    ghost:{bg:'transparent',fg:T.ink,bd:'transparent',active:'rgba(15,30,46,.05)'},
    outlineDark:{bg:'rgba(20,30,40,.55)',fg:'#fff',bd:'rgba(255,255,255,.25)',active:'rgba(255,255,255,.15)'},
    rose:{bg:T.rose,fg:'#fff',bd:T.rose,active:'#9c3a2a'},
  }[kind];

  return (
    <button 
      disabled={disabled}
      onClick={(e) => { if(!disabled) { haptic(); onClick && onClick(e); } }} 
      style={{
        height:sizes.h, fontSize:sizes.fs, padding:sizes.pad, gap:sizes.gap, borderRadius:999,
        background:disabled ? T.greyLight : kinds.bg, 
        color:disabled ? T.grey : kinds.fg, 
        border:`1.5px solid ${disabled ? T.greyLight : kinds.bd}`,
        display:'inline-flex', alignItems:'center', justifyContent:'center',
        fontWeight:700, cursor:disabled?'not-allowed':'pointer', width:full?'100%':'auto', fontFamily:'inherit',
        transition:'transform .15s cubic-bezier(0.34, 1.56, 0.64, 1), background .15s, opacity .15s',
        opacity:disabled ? 0.6 : 1,
        outline:'none',
        ...style,
      }}
      onMouseDown={e => { if(!disabled) e.currentTarget.style.transform = 'scale(0.95)'; }}
      onMouseUp={e => { if(!disabled) e.currentTarget.style.transform = 'scale(1)'; }}
      onMouseLeave={e => { if(!disabled) e.currentTarget.style.transform = 'scale(1)'; }}>
      {icon && <Ico name={icon} size={sizes.ico} color={disabled ? T.grey : kinds.fg} stroke={2.5}/>}
      <span style={{ transform:'translateY(-1px)' }}>{children}</span>
      {trailing && <Ico name={trailing} size={sizes.ico} color={disabled ? T.grey : kinds.fg} stroke={2.5}/>}
    </button>
  );
}

function ImgPlaceholder({ src, tone='#3b6a4e', ink='#0f2e1f', accent='#e8d9a9', label='', radius=14, style, overlay=true, aspect }) {
  const gid = 'gp-' + Math.abs([...label].reduce((a,c)=>a+c.charCodeAt(0),0));
  return (
    <div style={{ width:'100%', height:'100%', borderRadius:radius, overflow:'hidden', position:'relative', background:tone, ...(aspect?{aspectRatio:aspect}:{}), ...style }}>
      <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" style={{ position:'absolute', inset:0 }}>
        <defs>
          <linearGradient id={gid+'sky'} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tone} stopOpacity="0.55"/>
            <stop offset="60%" stopColor={accent} stopOpacity="0.35"/>
            <stop offset="100%" stopColor={tone} stopOpacity="1"/>
          </linearGradient>
          <radialGradient id={gid+'sun'} cx="72%" cy="24%" r="28%">
            <stop offset="0%" stopColor={accent} stopOpacity=".95"/>
            <stop offset="100%" stopColor={accent} stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="280" fill={tone}/>
        <rect width="400" height="280" fill={`url(#${gid}sky)`}/>
        <circle cx="288" cy="78" r="38" fill={`url(#${gid}sun)`}/>
        <path d="M0 210 L50 160 L100 190 L160 140 L220 180 L290 150 L360 190 L400 170 L400 280 L0 280 Z" fill={ink} opacity=".35"/>
        <path d="M0 230 L40 200 L90 220 L140 185 L200 215 L260 195 L330 225 L400 205 L400 280 L0 280 Z" fill={ink} opacity=".55"/>
        <path d="M0 255 L80 240 L160 250 L240 235 L320 248 L400 238 L400 280 L0 280 Z" fill={ink} opacity=".85"/>
      </svg>
      {src && (
        <img src={src} alt={label||''} loading="lazy" onError={e=>{ e.currentTarget.style.display='none'; }}
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
      )}
      {overlay && <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,.35) 100%)', pointerEvents:'none' }}/>}
      {label && <div style={{ position:'absolute', left:12, bottom:10, color:'rgba(255,255,255,.72)', fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', fontFamily:'ui-monospace, Menlo, monospace' }}>{label}</div>}
    </div>
  );
}

function inr(n) { return '₹' + Math.round(n).toLocaleString('en-IN'); }

function useIsMobile(breakpoint=768) {
  const [m, setM] = React.useState(typeof window !== 'undefined' && window.innerWidth < breakpoint);
  React.useEffect(() => {
    const onR = () => setM(window.innerWidth < breakpoint);
    window.addEventListener('resize', onR);
    return () => window.removeEventListener('resize', onR);
  }, [breakpoint]);
  return m;
}

// ─────────────────────────────────────────────────────────────────────────────
// Razorpay payment helper
// In production, `order_id` must come from the server (POST /orders with the
// secret key). Here, since this is a pure-frontend prototype, we open Checkout
// in "no-order" mode using only the public Test Key — Razorpay will accept
// this in test mode and route to its test simulator. Never embed the secret
// key on the client.
// ─────────────────────────────────────────────────────────────────────────────
const RAZORPAY_KEY_ID = 'rzp_test_SeVsqWZfuI4nS6';

function openRazorpay({
  amount,        // in INR (rupees, not paise)
  name = 'trav',
  description = 'Trip booking',
  prefill = {},
  notes = {},
  theme = { color:'#1DBF73' },
  onSuccess,     // (response) => void
  onDismiss,     // () => void
  onFailure,     // (error) => void
}) {
  if (typeof window === 'undefined' || !window.Razorpay) {
    // Graceful fallback: simulate success after a short delay so the UX
    // still moves forward in a sandbox without internet.
    console.warn('[trav] Razorpay SDK not loaded — simulating success.');
    setTimeout(() => onSuccess && onSuccess({
      razorpay_payment_id: 'pay_TEST_' + Math.random().toString(36).slice(2,12).toUpperCase(),
      simulated: true,
    }), 700);
    return;
  }
  const options = {
    key: RAZORPAY_KEY_ID,
    amount: Math.round(amount * 100), // paise
    currency: 'INR',
    name,
    description,
    image: 'https://avatars.githubusercontent.com/u/7713209?s=200',
    prefill: {
      name: prefill.name || '',
      email: prefill.email || '',
      contact: prefill.contact || '',
    },
    notes,
    theme,
    handler: function (response) {
      onSuccess && onSuccess(response);
    },
    modal: {
      ondismiss: function () {
        onDismiss && onDismiss();
      },
      escape: true,
      backdropclose: false,
    },
  };
  try {
    const rz = new window.Razorpay(options);
    rz.on && rz.on('payment.failed', function (resp) {
      onFailure && onFailure(resp.error || resp);
    });
    rz.open();
  } catch (err) {
    console.error('[trav] Razorpay open failed:', err);
    onFailure && onFailure(err);
  }
}

// Read the saved profile (set on login / settings) so checkout pre-fills.
function loadTravProfile() {
  try {
    const s = localStorage.getItem('trav.profile');
    if (s) return JSON.parse(s);
  } catch {}
  return { name:'Aditi Rao', email:'aditi.r@gmail.com', phone:'+91 98••••••12' };
}

// ─────────────────────────────────────────────────────────────────────────────
// Persistence helpers — bookings, pending payments, reviews, coupons, hooks.
// All keyed under `trav.*` in localStorage so state survives reloads and shows
// up in Profile → My Bookings.
// ─────────────────────────────────────────────────────────────────────────────
function getBookings() {
  try { return JSON.parse(localStorage.getItem('trav.bookings') || '[]'); } catch { return []; }
}
function saveBooking(b) {
  const list = getBookings().filter(x => x.id !== b.id);
  list.unshift(b);
  try { localStorage.setItem('trav.bookings', JSON.stringify(list)); } catch {}
  return b;
}
function updateBooking(id, patch) {
  const list = getBookings().map(b => b.id === id ? { ...b, ...patch } : b);
  try { localStorage.setItem('trav.bookings', JSON.stringify(list)); } catch {}
}
function getPendingBooking() {
  try { const s = localStorage.getItem('trav.pendingBooking'); return s ? JSON.parse(s) : null; } catch { return null; }
}
function savePendingBooking(b) {
  try { localStorage.setItem('trav.pendingBooking', JSON.stringify(b)); } catch {}
}
function clearPendingBooking() { try { localStorage.removeItem('trav.pendingBooking'); } catch {} }

function getReviews() {
  try { return JSON.parse(localStorage.getItem('trav.reviews') || '{}'); } catch { return {}; }
}
function saveReview(bookingId, review) {
  const all = getReviews();
  all[bookingId] = { ...review, at: Date.now() };
  try { localStorage.setItem('trav.reviews', JSON.stringify(all)); } catch {}
}

function getActiveCoupon() {
  try { return localStorage.getItem('trav.couponApplied') || ''; } catch { return ''; }
}
function setActiveCoupon(code) {
  try { if (code) localStorage.setItem('trav.couponApplied', code); else localStorage.removeItem('trav.couponApplied'); } catch {}
}

function getHookFlag(key) {
  try { return localStorage.getItem('trav.hook.'+key) === '1'; } catch { return false; }
}
function setHookFlag(key, v=true) {
  try { localStorage.setItem('trav.hook.'+key, v?'1':'0'); } catch {}
}

// Generate a booking id the same way ConfirmedOnePage does so we can refer to
// it from both the confirmation page and the Profile bookings list.
function newBookingId(trip) {
  const stub = (trip?.dest || 'XXX').replace(/[^A-Za-z]/g,'').slice(0,3).toUpperCase() || 'TRV';
  return 'TRAV-' + stub + '-' + Math.random().toString(36).slice(2,8).toUpperCase();
}

// Resolve the currently-viewed trip from localStorage so booking pages don't
// have to hardcode a trip id.
function resolveViewTrip() {
  try {
    const v = JSON.parse(localStorage.getItem('trav.view') || '{}');
    if (v.tripId === 'trip-nainital' && typeof NAINITAL_TRIP !== 'undefined') return NAINITAL_TRIP;
  } catch {}
  return typeof RISHIKESH_TRIP !== 'undefined' ? RISHIKESH_TRIP : null;
}

function personaTheme(persona) {
  if (persona === 'soloFemale') return { primary:T.rose, deep:'#9c3a2a', soft:T.roseCream, ring:`${T.rose}33`, label:'Solo female mode' };
  if (persona === 'corporate')  return { primary:T.ink,  deep:T.ink,    soft:'#F1F4F8',   ring:`${T.ink}22`,  label:'Corporate mode' };
  if (persona === 'couples')    return { primary:T.rose, deep:'#9c3a2a', soft:T.roseCream, ring:`${T.rose}33`, label:'Couples mode' };
  if (persona === 'group')      return { primary:T.greenDeep, deep:T.greenDeep, soft:'#F0FAF4', ring:`${T.green}33`, label:'Friends mode' };
  if (persona === 'first')      return { primary:T.amber, deep:'#a37a1a', soft:'#FFF5D6', ring:`${T.amber}55`, label:'First-timer mode' };
  return { primary:T.greenDeep, deep:T.greenDeep, soft:'#F0FAF4', ring:`${T.green}33`, label:null };
}

function getWishlist() {
  try { return JSON.parse(localStorage.getItem('trav.wishlist') || '[]'); } catch { return []; }
}

function toggleWishlist(tripId) {
  try {
    const list = getWishlist();
    const idx = list.indexOf(tripId);
    let now;
    if (idx >= 0) {
      list.splice(idx, 1);
      now = false;
    } else {
      list.push(tripId);
      now = true;
    }
    localStorage.setItem('trav.wishlist', JSON.stringify(list));
    return now;
  } catch { return false; }
}

Object.assign(window, {
  T, Ico, Btn, ImgPlaceholder, inr, useIsMobile, openRazorpay, loadTravProfile, RAZORPAY_KEY_ID,
  getBookings, saveBooking, updateBooking,
  getPendingBooking, savePendingBooking, clearPendingBooking,
  getReviews, saveReview,
  getActiveCoupon, setActiveCoupon,
  getHookFlag, setHookFlag,
  newBookingId, resolveViewTrip,
  haptic, share, personaTheme,
  getWishlist, toggleWishlist
});

