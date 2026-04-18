function App() {
  const [view, setView] = React.useState(() => {
    try { const v=localStorage.getItem('trav.view'); if(v) return JSON.parse(v); } catch {}
    return { screen:'landing', tripId:null, bookingId:null };
  });
  const [loggedIn, setLoggedIn] = React.useState(() => {
    try { return localStorage.getItem('trav.loggedIn')==='1'; } catch { return false; }
  });
  const [showLogin, setShowLogin] = React.useState(false);
  const [theme, setTheme] = React.useState(() => {
    try { return localStorage.getItem('trav.theme') || 'light'; } catch { return 'light'; }
  });
  const [aiOpen, setAiOpen] = React.useState(false);
  const isMobile = useIsMobile();

  React.useEffect(()=>{ try { localStorage.setItem('trav.view', JSON.stringify(view)); } catch {} }, [view]);
  React.useEffect(()=>{ try { localStorage.setItem('trav.loggedIn', loggedIn?'1':'0'); } catch {} }, [loggedIn]);
  React.useEffect(()=>{
    try { localStorage.setItem('trav.theme', theme); } catch {}
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  // Trav Coins — expire stale coins on app load so the wallet stays honest.
  React.useEffect(()=>{ try { expireOldCoins && expireOldCoins(); } catch {} }, []);
  const toggleTheme = () => setTheme(t => t==='dark'?'light':'dark');

  const set = (v) => { setView(v); window.scrollTo(0,0); };
  const openTrip = id => set({ screen:'detail', tripId:id, bookingId:null });
  const openBooking = () => set({ screen:'booking', tripId:view.tripId, bookingId:null, mode:'quick' });
  const openCustomise = () => set({ screen:'booking', tripId:view.tripId, bookingId:null, mode:'customise' });
  const backToDetail = () => set({ screen:'detail', tripId:view.tripId, bookingId:null });
  const goHome = () => set({ screen:'landing', tripId:null, bookingId:null });
  const openProfile = () => set({ screen:'profile', tripId:null, bookingId:null });
  const openTravHer = () => set({ screen:'travher', tripId:null, bookingId:null });
  const openTravelogue = () => set({ screen:'travelogue', tripId:null, bookingId:null });
  const openArticle = (articleId) => set({ screen:'travelogue-article', tripId:null, bookingId:null, articleId });
  const openAllTrips = (dest) => set({ screen:'all-trips', tripId:null, bookingId:null, filterDest: typeof dest === 'string' ? dest : null });
  const openInvestor = () => set({ screen:'investor', tripId:null, bookingId:null });
  const openSupport = () => set({ screen:'support', tripId:null, bookingId:null });
  const openAbout = () => set({ screen:'about', tripId:null, bookingId:null });
  const openTravCoins = () => set({ screen:'travcoins', tripId:null, bookingId:null });
  const openFaq = () => set({ screen:'faq', tripId:null, bookingId:null });
  const openBookingDetail = (bookingId) => set({ screen:'booking-detail', tripId:null, bookingId });
  const openInvoice = (bookingId) => set({ screen:'invoice', tripId:null, bookingId });

  React.useEffect(() => {
    window.openFaq = openFaq;
    window.openSupport = openSupport;
    window.openAiAssist = () => setAiOpen(true);
  }, []);

  const handleLoginClick = () => { if(loggedIn) openProfile(); else setShowLogin(true); };
  const handleLoginSuccess = () => { setLoggedIn(true); setShowLogin(false); openProfile(); };
  const handleLogout = () => { setLoggedIn(false); goHome(); };

  return (
    <div style={{ background: theme==='dark'?'#0a0a0a':'#fff', minHeight:'100vh' }}>
      <Nav onLogo={goHome} active={view.screen==='travher'?'travher':(view.screen==='travelogue'||view.screen==='travelogue-article'?'travelogue':'destinations')} loggedIn={loggedIn} onLogin={handleLoginClick} onProfile={openProfile} onTravHer={openTravHer} onTravelogue={openTravelogue} theme={theme} onToggleTheme={toggleTheme}/>
      <div className="theme-flip">
        {view.screen==='landing' && <Landing onOpenTrip={openTrip} onViewAllTrips={openAllTrips}/>}
        {view.screen==='all-trips' && <AllTripsIndex onOpenTrip={openTrip} filterDest={view.filterDest}/>}
        {view.screen==='investor' && <InvestorPage onBack={goHome}/>}
        {view.screen==='support' && <SupportPage onBack={goHome}/>}
        {view.screen==='faq' && <FaqPage onBack={goHome}/>}
        {view.screen==='about' && <AboutPage onBack={goHome} onOpenAllTrips={openAllTrips} onTravHer={openTravHer} onSupport={openSupport}/>}
        {view.screen==='travcoins' && <TravCoinsPage onBack={goHome} onSignup={handleLoginClick} onOpenWallet={openProfile} loggedIn={loggedIn}/>}
        {view.screen==='detail' && <TripDetail tripId={view.tripId} onBack={goHome} onBook={openBooking} onCustomise={openCustomise} onOpenArticle={openArticle}/>}
        {view.screen==='booking' && <Booking mode={view.mode||'quick'} onBack={backToDetail} onBookAnother={goHome} onViewBookings={openProfile}/>}
        {view.screen==='profile' && <Profile onLogout={handleLogout} onOpenBooking={openBookingDetail} onOpenInvoice={openInvoice} onOpenTrip={openTrip} onTravHer={openTravHer}/>}
        {view.screen==='booking-detail' && <BookingDetail bookingId={view.bookingId} onBack={openProfile} onInvoice={()=>openInvoice(view.bookingId)}/>}
        {view.screen==='invoice' && <Invoice bookingId={view.bookingId} onBack={()=>openBookingDetail(view.bookingId)}/>}
        {view.screen==='travher' && <TravHerPage onJoin={()=>alert('Opening WhatsApp group…')}/>}
        {view.screen==='travelogue' && <TravelogueIndex onOpenArticle={openArticle}/>}
        {view.screen==='travelogue-article' && <TravelogueArticle onBack={openTravelogue} onOpenTrip={openTrip}/>}
        {!['booking','profile','booking-detail','invoice'].includes(view.screen) && <Footer onTravelogue={openTravelogue} onInvestor={openInvestor} onSupport={openSupport} onAbout={openAbout} onTravCoins={openTravCoins}/>}
      </div>
      <MobileBottomNavWrapper view={view} loggedIn={loggedIn} onHome={goHome} onTrips={openAllTrips} onTravelogue={openTravelogue} onProfile={openProfile} onLogin={handleLoginClick} onSearch={openAllTrips} theme={theme}/>
      <SupportFabWrapper view={view} onOpen={openSupport}/>
      {showLogin && <LoginModal onClose={()=>setShowLogin(false)} onLogin={handleLoginSuccess}/>}
      <FirstTripBanner view={view} loggedIn={loggedIn} onLogin={handleLoginClick}/>
      <PaymentPendingBanner view={view} onResume={()=>set({ screen:'booking', tripId:(getPendingBooking()?.trip?.id)||view.tripId||null, bookingId:null, mode:'quick' })} onDismiss={()=>{clearPendingBooking();}}/>
      <ResumePaymentToast view={view} onResume={()=>set({ screen:'booking', tripId:(getPendingBooking()?.trip?.id)||view.tripId||null, bookingId:null, mode:'quick' })}/>
      <ExitIntentModal view={view} loggedIn={loggedIn} onBrowse={openAllTrips} onLogin={handleLoginClick}/>
      <BrowseResumePill view={view} onOpenTrip={openTrip}/>
      {aiOpen && <AssistantChat isMobile={isMobile} onClose={()=>setAiOpen(false)}/>}
    </div>
  );
}

/* =============================================================================
   Growth hook 1 — first-trip login prompt
   Floats bottom-left on landing for not-logged-in users. Clicking Login triggers
   the login modal and sets the FIRSTRIP coupon so the first checkout auto-applies.
============================================================================= */
function FirstTripBanner({ view, loggedIn, onLogin }) {
  const isMobile = useIsMobile();
  const [dismissed, setDismissed] = React.useState(() => {
    try { return localStorage.getItem('trav.hook.firstTripDismissed')==='1'; } catch { return false; }
  });
  const dismiss = () => { setDismissed(true); try { localStorage.setItem('trav.hook.firstTripDismissed','1'); } catch {} };
  if (loggedIn || dismissed) return null;
  if (!['landing','all-trips','detail'].includes(view.screen)) return null;
  const take = () => { setActiveCoupon('FIRSTRIP'); onLogin(); };
  return (
    <div style={{
      position:'fixed', left:isMobile?16:20, bottom:isMobile?84:20, zIndex:70, maxWidth:isMobile?'calc(100% - 32px)':340,
      background:'#fff', borderRadius:16, border:`1px solid ${T.greyLight}`,
      boxShadow:'0 18px 40px rgba(15,30,46,.18)', padding:isMobile?'12px 14px':'14px 16px 14px 14px',
      display:'flex', gap:12, alignItems:'flex-start',
    }}>
      <div style={{ width:36, height:36, borderRadius:10, background:'#F0FAF4', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        <Ico name="gift" size={18} color={T.greenDeep}/>
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:13.5, fontWeight:700, color:T.ink, fontFamily:'Fraunces, serif', letterSpacing:'-.01em' }}>Get 10% off your first trip</div>
        <div style={{ fontSize:12, color:T.grey, marginTop:3, lineHeight:1.4 }}>Login and we'll auto-apply <b style={{ color:T.ink, fontFamily:'ui-monospace, Menlo, monospace' }}>FIRSTRIP</b> at checkout.</div>
        <div style={{ display:'flex', gap:8, marginTop:10, alignItems:'center' }}>
          <button onClick={take} style={{ height:32, padding:'0 14px', borderRadius:999, background:T.green, color:'#fff', border:'none', fontSize:12.5, fontWeight:700, cursor:'pointer', fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:6 }}>
            Claim offer <Ico name="arrow-right" size={12} color="#fff" stroke={2.4}/>
          </button>
          <button onClick={dismiss} style={{ background:'transparent', border:'none', cursor:'pointer', fontSize:12, color:T.grey, fontFamily:'inherit' }}>Not now</button>
        </div>
      </div>
      <button onClick={dismiss} aria-label="Close" style={{ background:'transparent', border:'none', cursor:'pointer', padding:4, marginLeft:-4 }}>
        <Ico name="x" size={14} color={T.grey}/>
      </button>
    </div>
  );
}

/* =============================================================================
   Growth hook 2 — payment-pending resume banner
   If the user exited the checkout with a failed/pending payment, nudge them on
   every page until they either pay or explicitly drop the hold.
============================================================================= */
function PaymentPendingBanner({ view, onResume, onDismiss }) {
  const isMobile = useIsMobile();
  const [, tick] = React.useState(0);
  const pending = getPendingBooking();
  if (!pending) return null;
  // Hide during active checkout to avoid UI collision
  if (['booking','booking-detail','invoice'].includes(view.screen)) return null;
  const drop = () => { onDismiss(); tick(t=>t+1); };
  return (
    <div style={{
      position:'fixed', right:isMobile?16:20, bottom:isMobile?84:20, zIndex:71, maxWidth:isMobile?'calc(100% - 32px)':360,
      background:'#fff', borderRadius:16, border:`1.5px solid ${T.amber}55`,
      boxShadow:'0 18px 40px rgba(15,30,46,.18)', padding:isMobile?'12px 14px':'14px 16px 14px 14px',
      display:'flex', gap:12, alignItems:'flex-start',
    }}>
      <div style={{ width:36, height:36, borderRadius:10, background:'#FFF5D6', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        <Ico name="clock" size={18} color="#A37A1A"/>
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:13.5, fontWeight:700, color:T.ink, fontFamily:'Fraunces, serif', letterSpacing:'-.01em' }}>Your {pending.trip?.dest||'trip'} hold is still open</div>
        <div style={{ fontSize:12, color:T.grey, marginTop:3, lineHeight:1.4 }}>Finish paying to lock the spot. We haven't taken any money yet.</div>
        <div style={{ display:'flex', gap:8, marginTop:10, alignItems:'center' }}>
          <button onClick={onResume} style={{ height:32, padding:'0 14px', borderRadius:999, background:T.ink, color:'#fff', border:'none', fontSize:12.5, fontWeight:700, cursor:'pointer', fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:6 }}>
            Resume payment <Ico name="arrow-right" size={12} color="#fff" stroke={2.4}/>
          </button>
          <button onClick={drop} style={{ background:'transparent', border:'none', cursor:'pointer', fontSize:12, color:T.grey, fontFamily:'inherit' }}>Drop hold</button>
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
   Growth hook 3 — restore-session toast
   On any page load, if a pending booking exists, surface a top-right toast once
   per session inviting the user to resume. Dismissed per-session so it doesn't
   pile on top of PaymentPendingBanner forever.
============================================================================= */
function ResumePaymentToast({ view, onResume }) {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    if (sessionStorage.getItem('trav.hook.resumeToastShown') === '1') return;
    const pending = getPendingBooking();
    if (!pending) return;
    if (['booking','booking-detail','invoice'].includes(view.screen)) return;
    const t = setTimeout(()=>{ setShow(true); try { sessionStorage.setItem('trav.hook.resumeToastShown','1'); } catch {} }, 800);
    return () => clearTimeout(t);
  }, []);
  React.useEffect(() => {
    if (!show) return;
    const t = setTimeout(()=>setShow(false), 8000);
    return () => clearTimeout(t);
  }, [show]);
  if (!show) return null;
  const pending = getPendingBooking();
  if (!pending) return null;
  return (
    <div style={{ position:'fixed', top:80, right:20, zIndex:72, maxWidth:320,
      background:'#fff', borderRadius:14, border:`1.5px solid ${T.amber}66`,
      boxShadow:'0 18px 40px rgba(15,30,46,.18)', padding:'12px 14px',
      display:'flex', gap:10, alignItems:'flex-start', animation:'none' }}>
      <div style={{ width:32, height:32, borderRadius:8, background:'#FFF5D6', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        <Ico name="clock" size={16} color="#A37A1A"/>
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:13, fontWeight:700, color:T.ink, fontFamily:'Fraunces, serif' }}>Resume your {pending.trip?.dest||'trip'} payment?</div>
        <div style={{ fontSize:11.5, color:T.grey, marginTop:2, lineHeight:1.4 }}>Your seats are held. Pay now to lock it in.</div>
        <div style={{ display:'flex', gap:8, marginTop:8 }}>
          <button onClick={()=>{ setShow(false); onResume(); }} style={{ height:28, padding:'0 12px', borderRadius:999, background:T.ink, color:'#fff', border:'none', fontSize:11.5, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Resume</button>
          <button onClick={()=>setShow(false)} style={{ background:'transparent', border:'none', cursor:'pointer', fontSize:11.5, color:T.grey, fontFamily:'inherit' }}>Later</button>
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
   Growth hook 4 — exit-intent modal
   When a non-logged-in user on landing/detail/all-trips moves their cursor up
   past the viewport edge, pop a single modal offering the first-trip deal.
   Session-scoped: once dismissed or taken, doesn't re-fire in the same tab.
============================================================================= */
function ExitIntentModal({ view, loggedIn, onBrowse, onLogin }) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (loggedIn) return;
    if (sessionStorage.getItem('trav.hook.exitIntentShown') === '1') return;
    if (!['landing','all-trips','detail'].includes(view.screen)) return;
    const handler = (e) => {
      if (e.clientY <= 0 && e.relatedTarget === null) {
        setOpen(true);
        try { sessionStorage.setItem('trav.hook.exitIntentShown','1'); } catch {}
      }
    };
    document.addEventListener('mouseout', handler);
    return () => document.removeEventListener('mouseout', handler);
  }, [view.screen, loggedIn]);
  if (!open) return null;
  const take = () => { setActiveCoupon('FIRSTRIP'); setOpen(false); onLogin(); };
  return (
    <div onClick={()=>setOpen(false)} style={{ position:'fixed', inset:0, zIndex:90, background:'rgba(10,20,30,.55)', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div onClick={e=>e.stopPropagation()} className="keep-colors" style={{ background:'#fff', borderRadius:20, maxWidth:420, width:'100%', padding:'28px 28px 24px', boxShadow:'0 30px 60px rgba(0,0,0,.3)', position:'relative' }}>
        <button onClick={()=>setOpen(false)} aria-label="Close" style={{ position:'absolute', top:12, right:12, background:'transparent', border:'none', cursor:'pointer', padding:6 }}>
          <Ico name="x" size={16} color={T.grey}/>
        </button>
        <div style={{ width:56, height:56, borderRadius:'50%', background:'#F0FAF4', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14 }}>
          <Ico name="gift" size={26} color={T.greenDeep}/>
        </div>
        <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', color:T.greenDeep, marginBottom:6 }}>WAIT — ONE THING</div>
        <h3 style={{ fontSize:24, fontWeight:700, color:T.ink, margin:0, fontFamily:'Fraunces, serif', letterSpacing:'-.02em', lineHeight:1.15 }}>Lock 10% off your first trip.</h3>
        <div style={{ fontSize:13.5, color:T.grey, marginTop:10, lineHeight:1.55 }}>
          Free cancellation up to 7 days. Login and we'll auto-apply <b style={{ color:T.ink, fontFamily:'ui-monospace, Menlo, monospace' }}>FIRSTRIP</b> at checkout.
        </div>
        <div style={{ display:'flex', gap:10, marginTop:18, flexWrap:'wrap' }}>
          <button onClick={take} style={{ height:40, padding:'0 18px', borderRadius:999, background:T.green, color:'#fff', border:'none', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:6 }}>
            Claim 10% off <Ico name="arrow-right" size={13} color="#fff" stroke={2.4}/>
          </button>
          <button onClick={()=>{ setOpen(false); onBrowse(); }} style={{ height:40, padding:'0 16px', borderRadius:999, background:'transparent', color:T.ink, border:`1px solid ${T.greyLight}`, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
            Just browse
          </button>
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
   Growth hook 5 — browse-back resume pill
   When a user returns to landing after having viewed a trip detail without
   booking, show a bottom-center pill linking back to that trip. Persists the
   last-viewed trip id in localStorage so it survives reloads.
============================================================================= */
function BrowseResumePill({ view, onOpenTrip }) {
  const isMobile = useIsMobile();
  const [dismissed, setDismissed] = React.useState(false);
  // Record last-viewed trip whenever the user lands on a detail page.
  React.useEffect(() => {
    if (view.screen === 'detail' && view.tripId) {
      try { localStorage.setItem('trav.lastViewedTrip', JSON.stringify({ id:view.tripId, at:Date.now() })); } catch {}
    }
  }, [view.screen, view.tripId]);
  if (view.screen !== 'landing' || dismissed) return null;
  let last = null;
  try { last = JSON.parse(localStorage.getItem('trav.lastViewedTrip') || 'null'); } catch {}
  // Only show if viewed in the last 3 days and no confirmed booking for that trip exists
  if (!last || !last.id) return null;
  if (Date.now() - last.at > 3*24*60*60*1000) return null;
  const hasBooked = getBookings().some(b => b.trip?.id === last.id && b.state === 'confirmed');
  if (hasBooked) return null;
  const dest = last.id === 'trip-nainital' ? 'Nainital' : last.id === 'trip-jaipur' ? 'Jaipur' : 'Rishikesh';
  return (
    <div style={{ position:'fixed', left:'50%', transform:'translateX(-50%)', bottom:isMobile?84:20, zIndex:68, width:isMobile?'calc(100% - 32px)':'auto', maxWidth:isMobile?undefined:'calc(100vw - 40px)' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, background:T.ink, color:'#fff', borderRadius:isMobile?16:999, padding:isMobile?'12px 14px':'10px 14px 10px 16px', boxShadow:'0 18px 40px rgba(15,30,46,.28)' }}>
        <Ico name="arrow-right" size={13} color="#fff" stroke={2.4}/>
        <div style={{ fontSize:12.5, fontWeight:600 }}>Pick up where you left off · <b style={{ fontWeight:800 }}>{dest}</b></div>
        <button onClick={()=>onOpenTrip(last.id)} style={{ height:28, padding:'0 12px', borderRadius:999, background:T.green, color:'#fff', border:'none', fontSize:11.5, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>See trip</button>
        <button onClick={()=>{ setDismissed(true); try { localStorage.removeItem('trav.lastViewedTrip'); } catch {} }} aria-label="Dismiss" style={{ background:'transparent', border:'none', cursor:'pointer', padding:4, color:'rgba(255,255,255,.7)' }}>
          <Ico name="x" size={12} color="rgba(255,255,255,.7)"/>
        </button>
      </div>
    </div>
  );
}

function MobileBottomNavWrapper({ view, loggedIn, onHome, onTrips, onTravelogue, onProfile, onLogin, onSearch, theme }) {
  const isMobile = useIsMobile();
  if (!isMobile) return null;
  // Hide on focused checkout flows where a primary CTA already lives at the bottom
  if (['detail','booking'].includes(view.screen)) return null;
  return <MobileBottomNav active={view.screen} loggedIn={loggedIn} onHome={onHome} onTrips={onTrips} onTravelogue={onTravelogue} onProfile={onProfile} onLogin={onLogin} onSearch={onSearch} theme={theme}/>;
}

function SupportFabWrapper({ view, onOpen }) {
  const isMobile = useIsMobile();
  // Hide FAB on the support page itself, on booking flow (focused checkout), and the investor memo (editorial purity).
  const hide = ['support','booking','investor'].includes(view.screen);
  return <SupportFab onOpen={onOpen} isMobile={isMobile} hide={hide}/>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
