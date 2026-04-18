function App() {
  const [view, setView] = React.useState(() => {
    try { const v=localStorage.getItem('trav.view'); if(v) return JSON.parse(v); } catch {}
    return { screen:'landing', tripId:null, bookingId:null };
  });
  const [loggedIn, setLoggedIn] = React.useState(() => {
    try { return localStorage.getItem('trav.loggedIn')==='1'; } catch { return false; }
  });
  const [showLogin, setShowLogin] = React.useState(false);
  React.useEffect(()=>{ try { localStorage.setItem('trav.view', JSON.stringify(view)); } catch {} }, [view]);
  React.useEffect(()=>{ try { localStorage.setItem('trav.loggedIn', loggedIn?'1':'0'); } catch {} }, [loggedIn]);

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
  const openBookingDetail = (bookingId) => set({ screen:'booking-detail', tripId:null, bookingId });
  const openInvoice = (bookingId) => set({ screen:'invoice', tripId:null, bookingId });
  const handleLoginClick = () => { if(loggedIn) openProfile(); else setShowLogin(true); };
  const handleLoginSuccess = () => { setLoggedIn(true); setShowLogin(false); openProfile(); };
  const handleLogout = () => { setLoggedIn(false); goHome(); };

  return (
    <div style={{ background:'#fff', minHeight:'100vh' }}>
      <Nav onLogo={goHome} active={view.screen==='travher'?'travher':(view.screen==='travelogue'||view.screen==='travelogue-article'?'travelogue':'destinations')} loggedIn={loggedIn} onLogin={handleLoginClick} onProfile={openProfile} onTravHer={openTravHer} onTravelogue={openTravelogue}/>
      {view.screen==='landing' && <Landing onOpenTrip={openTrip} onViewAllTrips={openAllTrips}/>}
      {view.screen==='all-trips' && <AllTripsIndex onOpenTrip={openTrip}/>}
      {view.screen==='investor' && <InvestorPage onBack={goHome}/>}
      {view.screen==='support' && <SupportPage onBack={goHome}/>}
      {view.screen==='detail' && <TripDetail onBack={goHome} onBook={openBooking} onCustomise={openCustomise} onOpenArticle={openArticle}/>}
      {view.screen==='booking' && <Booking mode={view.mode||'quick'} onBack={backToDetail} onBookAnother={goHome}/>}
      {view.screen==='profile' && <Profile onLogout={handleLogout} onOpenBooking={openBookingDetail} onOpenInvoice={openInvoice}/>}
      {view.screen==='booking-detail' && <BookingDetail bookingId={view.bookingId} onBack={openProfile} onInvoice={()=>openInvoice(view.bookingId)}/>}
      {view.screen==='invoice' && <Invoice bookingId={view.bookingId} onBack={()=>openBookingDetail(view.bookingId)}/>}
      {view.screen==='travher' && <TravHerPage onJoin={()=>alert('Opening WhatsApp group…')}/>}
      {view.screen==='travelogue' && <TravelogueIndex onOpenArticle={openArticle}/>}
      {view.screen==='travelogue-article' && <TravelogueArticle onBack={openTravelogue} onOpenTrip={openTrip}/>}
      {!['booking','profile','booking-detail','invoice'].includes(view.screen) && <Footer onTravelogue={openTravelogue} onInvestor={openInvestor} onSupport={openSupport}/>}
      <MobileBottomNavWrapper view={view} loggedIn={loggedIn} onHome={goHome} onTrips={openAllTrips} onTravelogue={openTravelogue} onProfile={openProfile} onLogin={handleLoginClick} onSearch={openAllTrips}/>
      <SupportFabWrapper view={view} onOpen={openSupport}/>
      {showLogin && <LoginModal onClose={()=>setShowLogin(false)} onLogin={handleLoginSuccess}/>}
    </div>
  );
}

function MobileBottomNavWrapper({ view, loggedIn, onHome, onTrips, onTravelogue, onProfile, onLogin, onSearch }) {
  const isMobile = useIsMobile();
  if (!isMobile) return null;
  // Hide on focused checkout flows where a primary CTA already lives at the bottom
  if (['detail','booking'].includes(view.screen)) return null;
  return <MobileBottomNav active={view.screen} loggedIn={loggedIn} onHome={onHome} onTrips={onTrips} onTravelogue={onTravelogue} onProfile={onProfile} onLogin={onLogin} onSearch={onSearch}/>;
}

function SupportFabWrapper({ view, onOpen }) {
  const isMobile = useIsMobile();
  // Hide FAB on the support page itself, on booking flow (focused checkout), and the investor memo (editorial purity).
  const hide = ['support','booking','investor'].includes(view.screen);
  return <SupportFab onOpen={onOpen} isMobile={isMobile} hide={hide}/>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
