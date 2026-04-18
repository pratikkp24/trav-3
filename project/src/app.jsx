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
  React.useEffect(()=>{ try { localStorage.setItem('trav.view', JSON.stringify(view)); } catch {} }, [view]);
  React.useEffect(()=>{ try { localStorage.setItem('trav.loggedIn', loggedIn?'1':'0'); } catch {} }, [loggedIn]);
  React.useEffect(()=>{
    try { localStorage.setItem('trav.theme', theme); } catch {}
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
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
  const openAllTrips = () => set({ screen:'all-trips', tripId:null, bookingId:null });
  const openInvestor = () => set({ screen:'investor', tripId:null, bookingId:null });
  const openSupport = () => set({ screen:'support', tripId:null, bookingId:null });
  const openAbout = () => set({ screen:'about', tripId:null, bookingId:null });
  const openBookingDetail = (bookingId) => set({ screen:'booking-detail', tripId:null, bookingId });
  const openInvoice = (bookingId) => set({ screen:'invoice', tripId:null, bookingId });
  const handleLoginClick = () => { if(loggedIn) openProfile(); else setShowLogin(true); };
  const handleLoginSuccess = () => { setLoggedIn(true); setShowLogin(false); openProfile(); };
  const handleLogout = () => { setLoggedIn(false); goHome(); };

  return (
    <div style={{ background: theme==='dark'?'#0a0a0a':'#fff', minHeight:'100vh' }}>
      <Nav onLogo={goHome} active={view.screen==='travher'?'travher':(view.screen==='travelogue'||view.screen==='travelogue-article'?'travelogue':'destinations')} loggedIn={loggedIn} onLogin={handleLoginClick} onProfile={openProfile} onTravHer={openTravHer} onTravelogue={openTravelogue} theme={theme} onToggleTheme={toggleTheme}/>
      <div className="theme-flip">
        {view.screen==='landing' && <Landing onOpenTrip={openTrip} onViewAllTrips={openAllTrips}/>}
        {view.screen==='all-trips' && <AllTripsIndex onOpenTrip={openTrip}/>}
        {view.screen==='investor' && <InvestorPage onBack={goHome}/>}
        {view.screen==='support' && <SupportPage onBack={goHome}/>}
        {view.screen==='about' && <AboutPage onBack={goHome} onOpenAllTrips={openAllTrips} onTravHer={openTravHer} onSupport={openSupport}/>}
        {view.screen==='detail' && <TripDetail onBack={goHome} onBook={openBooking} onCustomise={openCustomise} onOpenArticle={openArticle}/>}
        {view.screen==='booking' && <Booking mode={view.mode||'quick'} onBack={backToDetail} onBookAnother={goHome} onViewBookings={openProfile}/>}
        {view.screen==='profile' && <Profile onLogout={handleLogout} onOpenBooking={openBookingDetail} onOpenInvoice={openInvoice} onOpenTrip={openTrip} onTravHer={openTravHer}/>}
        {view.screen==='booking-detail' && <BookingDetail bookingId={view.bookingId} onBack={openProfile} onInvoice={()=>openInvoice(view.bookingId)}/>}
        {view.screen==='invoice' && <Invoice bookingId={view.bookingId} onBack={()=>openBookingDetail(view.bookingId)}/>}
        {view.screen==='travher' && <TravHerPage onJoin={()=>alert('Opening WhatsApp group…')}/>}
        {view.screen==='travelogue' && <TravelogueIndex onOpenArticle={openArticle}/>}
        {view.screen==='travelogue-article' && <TravelogueArticle onBack={openTravelogue} onOpenTrip={openTrip}/>}
        {!['booking','profile','booking-detail','invoice'].includes(view.screen) && <Footer onTravelogue={openTravelogue} onInvestor={openInvestor} onSupport={openSupport} onAbout={openAbout}/>}
      </div>
      <MobileBottomNavWrapper view={view} loggedIn={loggedIn} onHome={goHome} onTrips={openAllTrips} onTravelogue={openTravelogue} onProfile={openProfile} onLogin={handleLoginClick} onSearch={openAllTrips} theme={theme}/>
      <SupportFabWrapper view={view} onOpen={openSupport}/>
      {showLogin && <LoginModal onClose={()=>setShowLogin(false)} onLogin={handleLoginSuccess}/>}
      <FirstTripBanner view={view} loggedIn={loggedIn} onLogin={handleLoginClick}/>
      <PaymentPendingBanner view={view} onResume={()=>set({ screen:'booking', tripId:(getPendingBooking()?.trip?.id)||view.tripId||null, bookingId:null, mode:'quick' })} onDismiss={()=>{clearPendingBooking();}}/>
    </div>
  );
}

/* =============================================================================
   Growth hook 1 — first-trip login prompt
   Floats bottom-left on landing for not-logged-in users. Clicking Login triggers
   the login modal and sets the FIRSTRIP coupon so the first checkout auto-applies.
============================================================================= */
function FirstTripBanner({ view, loggedIn, onLogin }) {
  const [dismissed, setDismissed] = React.useState(() => {
    try { return localStorage.getItem('trav.hook.firstTripDismissed')==='1'; } catch { return false; }
  });
  const dismiss = () => { setDismissed(true); try { localStorage.setItem('trav.hook.firstTripDismissed','1'); } catch {} };
  if (loggedIn || dismissed) return null;
  if (!['landing','all-trips','detail'].includes(view.screen)) return null;
  const take = () => { setActiveCoupon('FIRSTRIP'); onLogin(); };
  return (
    <div style={{
      position:'fixed', left:20, bottom:20, zIndex:70, maxWidth:340,
      background:'#fff', borderRadius:16, border:`1px solid ${T.greyLight}`,
      boxShadow:'0 18px 40px rgba(15,30,46,.18)', padding:'14px 16px 14px 14px',
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
  const [, tick] = React.useState(0);
  const pending = getPendingBooking();
  if (!pending) return null;
  // Hide during active checkout to avoid UI collision
  if (['booking','booking-detail','invoice'].includes(view.screen)) return null;
  const drop = () => { onDismiss(); tick(t=>t+1); };
  return (
    <div style={{
      position:'fixed', right:20, bottom:20, zIndex:71, maxWidth:360,
      background:'#fff', borderRadius:16, border:`1.5px solid ${T.amber}55`,
      boxShadow:'0 18px 40px rgba(15,30,46,.18)', padding:'14px 16px 14px 14px',
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
