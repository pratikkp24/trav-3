
function TripDetail({ tripId, onBack, onBook, onCustomise, onOpenArticle }) {

  // We now receive tripId via props, keeping it instantly synced with view state!
  const t = tripId === 'trip-nainital' ? NAINITAL_TRIP : (tripId === 'trip-thailand' ? THAILAND_TRIP : RISHIKESH_TRIP);
  const isMobile = useIsMobile();
  const [reviewsOpen, setReviewsOpen] = React.useState(false);
  const [activeDay, setActiveDay] = React.useState(0);
  const [lightbox, setLightbox] = React.useState(null); // { photos, startIdx }
  const [persona, setPersona] = React.useState(() => {
    // trav.her trips default to the solo-female persona (rose theme) so the page
    // opens in its intended mode without a manual toggle.
    if (tripId === 'trip-nainital') return 'soloFemale';
    try { return localStorage.getItem('trav.persona') || 'standard'; } catch { return 'standard'; }
  });
  React.useEffect(() => { try { localStorage.setItem('trav.persona', persona); } catch {} }, [persona]);
  const theme = personaTheme(persona);
  const openLightbox = (photos, startIdx=0) => setLightbox({ photos, startIdx });
  const closeLightbox = () => setLightbox(null);
  const jumpToDay = (i) => {
    setActiveDay(i);
    const el = document.getElementById(`day-${i}`);
    if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
  };
  const [retentionOpen, setRetentionOpen] = React.useState(false);
  
  // Detect exit intent (mouse leaving window)
  useExitIntent(() => {
    // Session-scoped: once shown on this trip, don't show again this session
    const key = `trav.retention.shown.${tripId}`;
    if (sessionStorage.getItem(key)) return;
    setRetentionOpen(true);
    try { sessionStorage.setItem(key, '1'); } catch {}
  }, true);

  const sidePad = isMobile ? 16 : 36;
  return (
    <div style={{ background:'#F4F6FA', paddingBottom:isMobile?100:40 }}>
      <RetentionModal 
        isOpen={retentionOpen} 
        onClose={() => setRetentionOpen(false)} 
        onExit={() => setRetentionOpen(false)} 
        context="detail"
        tripName={t.dest}
      />
      <div style={{ maxWidth:1200, margin:'0 auto', padding:`${isMobile?14:24}px ${sidePad}px 0` }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:isMobile?12:18 }}>
          <Btn kind="outline" size="sm" icon="arrow-left" onClick={onBack}>{isMobile?'Back':'Back to trips'}</Btn>
          <div style={{ display:'flex', gap:6 }}>
            <button onClick={() => {
              share(`Hey! 🌴 Check out this weekend trip to ${t.dest} by trav.\n\n` +
                    `📅 ${t.dates.split('·')[1]?.trim()||t.dates}\n` +
                    `💸 ${inr(t.price)} / head\n\n` +
                    `${t.tagline}`);
            }} style={galleryActionBtn}>
              <Ico name="share" size={14} color={T.greenDeep}/> Share
            </button>
            <button style={galleryActionBtn} onClick={() => haptic('medium')}><Ico name="heart" size={14} color={T.ink} stroke={2}/>{!isMobile && ' Save'}</button>
          </div>
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:isMobile?6:10, marginBottom:isMobile?8:10, alignItems:'center' }}>
          {t.tags.map(tag => <span key={tag} style={{ background:theme.soft, color:theme.deep, border:`1px solid ${theme.ring}`, padding:isMobile?'4px 9px':'5px 12px', borderRadius:999, fontSize:isMobile?9.5:10.5, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase' }}>{tag}</span>)}
          {theme.label && (
            <span onClick={()=>setPersona('standard')} title="Switch back to default" style={{ cursor:'pointer', display:'inline-flex', alignItems:'center', gap:6, background:theme.primary, color:'#fff', padding:isMobile?'4px 9px 4px 7px':'5px 12px 5px 9px', borderRadius:999, fontSize:isMobile?9.5:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' }}>
              <Ico name={persona==='soloFemale'||persona==='couples'?'rose':persona==='corporate'?'briefcase':persona==='group'?'users':'spark'} size={11} color="#fff"/> {theme.label} <Ico name="x" size={10} color="#fff" stroke={2.4}/>
            </span>
          )}
        </div>
        <h1 style={{ fontSize:isMobile?34:52, fontWeight:700, letterSpacing:'-.03em', margin:0, lineHeight:1.05, color:T.ink, fontFamily:'Fraunces, serif' }}>{t.dest}</h1>
        <div style={{ fontSize:isMobile?15:18, marginTop:6, color:T.grey, fontStyle:'italic', fontFamily:'Fraunces, serif' }}>{t.tagline}</div>
        <div style={{ display:'flex', gap:isMobile?10:18, flexWrap:'wrap', alignItems:'center', marginTop:isMobile?10:14, fontSize:isMobile?12:13.5, color:T.inkSoft, fontWeight:500 }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:5 }}>
            <Ico name="star" size={13} color={T.amber}/> <b style={{ fontWeight:700, color:T.ink }}>{t.rating}</b>
            <span style={{ textDecoration:'underline', color:T.ink, fontWeight:600 }}>{t.ratingCount}</span>
          </span>
          <span style={{ color:T.greyLight }}>·</span>
          <span>{t.bookingsCount}+ booked</span>
          <span style={{ color:T.greyLight }}>·</span>
          <span style={{ display:'inline-flex', alignItems:'center', gap:6, color:T.fire, fontWeight:600 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:T.fire }}/>{t.spotsLeft} left
          </span>
        </div>
        <HeroGallery trip={t} isMobile={isMobile} onOpenLightbox={openLightbox}/>
      </div>
      <div style={{ maxWidth:1200, margin:`${isMobile?12:18}px auto 0`, padding:`0 ${sidePad}px` }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:isMobile?8:14, padding:'7px 14px', background:'#fff', border:`1px solid ${theme.primary}33`, borderRadius:999, fontSize:isMobile?11:12, fontWeight:600, color:theme.deep, boxShadow:'0 2px 10px rgba(15,30,46,.05)', flexWrap:'wrap' }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
            <Ico name="shield" size={12} color={theme.deep} stroke={2.4}/> Free cancellation up to 7 days
          </span>
          {!isMobile && <>
            <span style={{ width:1, height:11, background:T.greyLight }}/>
            <span style={{ display:'inline-flex', alignItems:'center', gap:5, color:T.inkSoft, fontWeight:500 }}>
              <Ico name={persona==='soloFemale'?'rose':'whatsapp'} size={11} color={theme.deep}/> {persona==='soloFemale'?'Women-only support':'WhatsApp support'}
            </span>
            <span style={{ width:1, height:11, background:T.greyLight }}/>
            <span style={{ display:'inline-flex', alignItems:'center', gap:5, color:T.inkSoft, fontWeight:500 }}>
              <Ico name="check" size={11} color={theme.deep} stroke={2.4}/> {persona==='soloFemale'?'Certified female lead':'Verified curator'}
            </span>
          </>}
        </div>
      </div>
      <div style={{ maxWidth:1200, margin:'10px auto 0', padding:`0 ${sidePad}px`, position:'relative' }}>
        <div style={{ background:'#fff', borderRadius:16, padding:isMobile?14:18, boxShadow:'0 8px 30px rgba(15,30,46,.08)', display:'grid', gridTemplateColumns:isMobile?'1fr 1fr':'repeat(4, minmax(0,1fr)) minmax(180px, auto)', gap:isMobile?14:0, alignItems:'stretch' }}>
          {[{icon:'calendar',label:'Duration',value:'2N / 3D'},{icon:'clock',label:'Dates',value:t.dates.split(' · ')[1]},{icon:'users',label:persona==='soloFemale'?'Cohort':'Group size',value:persona==='soloFemale'?'8 women max':'15 max'},{icon:'pin',label:'Pickup',value:(t.meetingPoint.split('·')[0]||'').trim().split(',')[0]||'Delhi'}].map((m,i,arr) => (
            <div key={m.label} style={{ padding:isMobile?0:'2px 16px', borderRight: !isMobile && i<arr.length-1 ? `1px solid ${T.greyLight}` : 'none', minWidth:0 }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:9.5, color:T.grey, letterSpacing:'.12em', fontWeight:700, textTransform:'uppercase' }}>
                <Ico name={m.icon} size={12} color={theme.deep}/>{m.label}
              </div>
              <div style={{ fontSize:isMobile?13:14.5, fontWeight:700, color:T.ink, marginTop:4, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{m.value}</div>
            </div>
          ))}
          <div style={{
            background:isMobile?'transparent':theme.soft,
            borderRadius:isMobile?0:12,
            borderLeft:isMobile?'none':`1px solid ${theme.primary}22`,
            borderTop:isMobile?`1px solid ${T.greyLight}`:'none',
            paddingLeft:isMobile?0:16, paddingRight:isMobile?0:16, paddingTop:isMobile?12:10, paddingBottom:isMobile?0:10,
            marginLeft:isMobile?0:8, marginTop:isMobile?4:0,
            gridColumn:isMobile?'1 / -1':'auto',
            display:'flex', flexDirection:isMobile?'row':'column', alignItems:isMobile?'center':'flex-start', justifyContent:isMobile?'space-between':'center', gap:isMobile?0:4,
            minWidth:0
          }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:9.5, color:theme.deep, letterSpacing:'.14em', fontWeight:800, textTransform:'uppercase' }}>
                <Ico name="spark" size={11} color={theme.deep} stroke={2.2}/> Starting at
              </div>
              <div style={{ display:'flex', alignItems:'baseline', gap:5, marginTop:3 }}>
                <span style={{ fontSize:isMobile?22:24, fontWeight:800, color:theme.deep, letterSpacing:'-.02em', lineHeight:1, fontFamily:'Fraunces, serif' }}>{inr(t.price)}</span>
                <span style={{ fontSize:11, color:T.grey, fontWeight:500 }}>/ person</span>
              </div>
            </div>
            <div style={{ fontSize:10.5, color:T.fire, fontWeight:700, display:'inline-flex', alignItems:'center', gap:5, marginTop:isMobile?0:6 }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:T.fire, animation:'pulse 1.5s ease-in-out infinite' }}/>{t.spotsLeft} of {t.spotsTotal} left
            </div>
          </div>
        </div>

        {isMobile && (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:12 }}>
            <button onClick={onBook} style={{ height:46, borderRadius:12, border:'none', background:theme.primary, color:'#fff', fontFamily:'inherit', fontSize:14, fontWeight:700, cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              <Ico name="check" size={15} color="#fff" stroke={2.5}/> Lock my spot
            </button>
            <button onClick={onCustomise||onBook} style={{ height:46, borderRadius:12, border:`1.5px solid ${theme.deep}`, background:'#fff', color:theme.deep, fontFamily:'inherit', fontSize:14, fontWeight:700, cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              <Ico name="settings" size={15} color={theme.deep} stroke={2}/> Customise
            </button>
          </div>
        )}

        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1.6fr 1fr', gap:isMobile?16:28, marginTop:isMobile?16:28 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:isMobile?14:20, minWidth:0 }}>
            <AvailableDepartures departures={t.departures} isMobile={isMobile}/>
            <TripOverview trip={t} isMobile={isMobile} theme={theme}/>
            <Section title="Itinerary Journey" isMobile={isMobile}>
              <ItineraryNav days={t.itinerary} active={activeDay} onJump={jumpToDay} isMobile={isMobile} isTravHer={persona==='soloFemale'}/>
              {t.itinerary.map((d,i) => <DayBlock key={i} day={d} idx={i} isLast={i===t.itinerary.length-1} isMobile={isMobile} gallery={t.gallery} onOpenLightbox={openLightbox} isTravHer={persona==='soloFemale'}/>)}
              <ItineraryVideos videos={t.videos} isMobile={isMobile}/>
            </Section>
            <SignatureStay stay={t.signatureStay} isMobile={isMobile}/>
            <PackList items={t.packList} isMobile={isMobile}/>
            <Section title="What's included" isMobile={isMobile}>
              <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:isMobile?0:28 }}>
                <div>
                  {t.inclusions.map(i => (
                    <div key={i} style={{ fontSize:13.5, color:T.ink, padding:'7px 0', display:'flex', gap:8, alignItems:'flex-start', borderBottom:`1px solid ${T.greyLight}` }}>
                      <Ico name="check" size={14} color={T.green} stroke={2.5}/>{i}
                    </div>
                  ))}
                </div>
                <div>
                  {t.exclusions.map(i => (
                    <div key={i} style={{ fontSize:13.5, color:T.grey, padding:'7px 0', display:'flex', gap:8, alignItems:'flex-start', borderBottom:`1px solid ${T.greyLight}` }}>
                      <Ico name="x" size={14} color={T.grey} stroke={2}/>{i}
                    </div>
                  ))}
                </div>
              </div>
            </Section>
            <Section title="What travelers said" isMobile={isMobile}>
              <div style={{ display:isMobile?'flex':'grid', gridTemplateColumns:isMobile?undefined:'repeat(3,1fr)', gap:14, overflowX:isMobile?'auto':'visible', margin:isMobile?'0 -16px':0, padding:isMobile?'2px 16px':0 }} className={isMobile?'scroll-x':''}>
                {t.reviews.slice(0,3).map((r,i) => (
                  <div key={i} style={{ background:'#F4F6FA', borderRadius:12, padding:16, minWidth:isMobile?260:'auto', flexShrink:0 }} className={isMobile?'snap':''}>
                    <div style={{ display:'flex', gap:3, marginBottom:10 }}>{[0,1,2,3,4].map(s=><Ico key={s} name="star" size={12} color={T.amber}/>)}</div>
                    <p style={{ fontSize:13, color:T.inkSoft, lineHeight:1.5, margin:0 }}>"{r.quote}"</p>
                    <div style={{ marginTop:10, fontSize:12, color:T.grey, fontWeight:600 }}>{r.name} · {r.city}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:16, display:'flex', justifyContent:isMobile?'center':'space-between', alignItems:'center', flexWrap:'wrap', gap:10 }}>
                {!isMobile && <div style={{ fontSize:12.5, color:T.grey }}>
                  <Ico name="star" size={12} color={T.amber}/> <b style={{ color:T.ink, fontWeight:700 }}>{t.rating}</b> · {t.ratingCount} reviews · {t.reviewStats?.recommend || 96}% would recommend
                </div>}
                <button onClick={()=>setReviewsOpen(true)} style={{
                  height:isMobile?44:38, padding:'0 18px', borderRadius:999,
                  background:'#fff', color:T.ink, border:`1.5px solid ${T.ink}`,
                  fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit',
                  display:'inline-flex', alignItems:'center', gap:8, width:isMobile?'100%':'auto', justifyContent:'center'
                }}>Read all {t.ratingCount} reviews <Ico name="arrow-right" size={13} color={T.ink} stroke={2.2}/></button>
              </div>
            </Section>
            <WhoIsThisFor persona={persona} setPersona={setPersona} isMobile={isMobile}/>
            <Section title="FAQ" isMobile={isMobile}>
              <Accordion items={t.faq}/>
              <div style={{ marginTop:8, paddingTop:12, borderTop:`1px solid ${T.greyLight}` }}>
                <a onClick={(e) => { e.preventDefault(); window.openFaq && window.openFaq(); }} style={{ fontSize:12.5, color:T.greenDeep, fontWeight:700, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:5, cursor:'pointer' }}>
                  Browse all FAQs <Ico name="arrow-right" size={12} color={T.greenDeep} stroke={2.4}/>
                </a>
              </div>
            </Section>
            <ExploreDeeper articleIds={t.relatedArticleIds} onOpenArticle={onOpenArticle} isMobile={isMobile}/>
            <AfterYouBook isMobile={isMobile}/>
          </div>
          {!isMobile ? (
            <div style={{ alignSelf:'start', position:'sticky', top:88, display:'flex', flexDirection:'column', gap:16 }}>
              <BookingCard trip={t} onBook={onBook} onCustomise={onCustomise} persona={persona} theme={theme}/>
              <TripSnapshotCard rows={t.tripSnapshot} viewingNow={t.viewingNow}/>
              <TravHerSideCard persona={persona} onPick={()=>setPersona('soloFemale')}/>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              <TripSnapshotCard rows={t.tripSnapshot} viewingNow={t.viewingNow}/>
              <TravHerSideCard persona={persona} onPick={()=>setPersona('soloFemale')}/>
            </div>
          )}
        </div>
      </div>
      {isMobile && <StickyBookingBar trip={t} onBook={onBook} onCustomise={onCustomise}/>}
      <ScarcityStickyBar trip={t} isMobile={isMobile}/>
      {reviewsOpen && <ReviewsAllModal trip={t} onClose={()=>setReviewsOpen(false)} onBook={onBook} isMobile={isMobile}/>}
      {lightbox && <PhotoLightbox photos={lightbox.photos} startIdx={lightbox.startIdx} title={lightbox.title} onClose={closeLightbox} isMobile={isMobile}/>}
    </div>
  );
}

/* =============================================================================
   Growth hook 6 — scarcity sticky bar on detail
   Appears at top of detail page when spotsLeft <= 3. Dismissable; dismissal
   persists per-trip so a returning user who already saw it isn't nagged.
   Hidden on mobile where StickyBookingBar already carries "N left".
============================================================================= */
function ScarcityStickyBar({ trip, isMobile }) {
  const key = 'trav.hook.scarcityDismissed.'+trip.id;
  const [dismissed, setDismissed] = React.useState(() => { try { return localStorage.getItem(key)==='1'; } catch { return false; } });
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive:true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (isMobile || dismissed || trip.spotsLeft > 3 || !scrolled) return null;
  const dismiss = () => { setDismissed(true); try { localStorage.setItem(key,'1'); } catch {} };
  const viewing = trip.viewingNow || (4 + (trip.id.length % 5));
  return (
    <div style={{ position:'fixed', top:72, left:'50%', transform:'translateX(-50%)', zIndex:75, maxWidth:560, width:'calc(100vw - 40px)' }}>
      <div style={{ display:'flex', alignItems:'center', gap:12, background:'#fff', border:`1.5px solid ${T.fire}66`, borderRadius:12, padding:'10px 12px 10px 14px', boxShadow:'0 12px 32px rgba(15,30,46,.15)' }}>
        <span style={{ width:8, height:8, borderRadius:'50%', background:T.fire, flexShrink:0, boxShadow:`0 0 0 4px ${T.fire}22` }}/>
        <div style={{ flex:1, fontSize:12.5, color:T.ink, lineHeight:1.4 }}>
          <b style={{ color:T.fire, fontWeight:800 }}>Only {trip.spotsLeft} spots left</b> · <span style={{ color:T.grey }}>{viewing} travelers viewing now</span>
        </div>
        <button onClick={()=>{ const el = document.querySelector('[data-book-cta]'); if (el) el.scrollIntoView({ behavior:'smooth', block:'center' }); else window.scrollTo({ top:document.body.scrollHeight, behavior:'smooth' }); }} style={{ height:28, padding:'0 12px', borderRadius:999, background:T.ink, color:'#fff', border:'none', fontSize:11.5, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Lock spot</button>
        <button onClick={dismiss} aria-label="Close" style={{ background:'transparent', border:'none', cursor:'pointer', padding:4 }}>
          <Ico name="x" size={12} color={T.grey}/>
        </button>
      </div>
    </div>
  );
}

function StickyBookingBar({ trip, onBook, onCustomise }) {
  return (
    <div style={{ position:'fixed', left:0, right:0, bottom:0, zIndex:80, background:'#fff', borderTop:`1px solid ${T.greyLight}`, boxShadow:'0 -8px 24px rgba(15,30,46,.08)', padding:'10px 14px calc(10px + env(safe-area-inset-bottom)) 14px', display:'flex', alignItems:'center', gap:10 }}>
      <div style={{ flex:'0 0 auto' }}>
        <div style={{ fontSize:18, fontWeight:800, color:T.ink, letterSpacing:'-.02em', lineHeight:1 }}>{inr(trip.price)}</div>
        <div style={{ fontSize:10.5, color:T.fire, fontWeight:700, marginTop:3, display:'inline-flex', alignItems:'center', gap:4 }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:T.fire }}/> {trip.spotsLeft} left
        </div>
      </div>
      <button onClick={onCustomise||onBook} style={{ flex:'0 0 auto', height:46, width:46, borderRadius:999, background:'#fff', color:T.ink, border:`1.5px solid ${T.greyLight}`, cursor:'pointer', fontFamily:'inherit', display:'inline-flex', alignItems:'center', justifyContent:'center' }} aria-label="Customise">
        <Ico name="settings" size={16} color={T.ink} stroke={2}/>
      </button>
      <button onClick={onBook} style={{ flex:'1 1 auto', height:46, padding:'0 14px', borderRadius:999, background:T.green, color:'#fff', border:'none', fontSize:14, fontWeight:800, cursor:'pointer', fontFamily:'inherit', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6 }}>
        Lock my spot <Ico name="arrow-right" size={14} color="#fff" stroke={2.4}/>
      </button>
    </div>
  );
}

function Section({ title, children, isMobile }) {
  return (
    <div style={{ background:'#fff', borderRadius:16, padding:isMobile?16:24, border:`1px solid ${T.greyLight}` }}>
      <h3 style={{ fontSize:isMobile?18:22, fontWeight:700, color:T.ink, letterSpacing:'-.015em', margin:`0 0 ${isMobile?14:18}px`, fontFamily:'Fraunces, serif' }}>{title}</h3>
      {children}
    </div>
  );
}

function MetaRow({ icon, label, value }) {
  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:10, color:T.grey, letterSpacing:'.12em', fontWeight:700, textTransform:'uppercase' }}>
        <Ico name={icon} size={11} color={T.greenDeep}/>{label}
      </div>
      <div style={{ fontSize:13, color:T.ink, fontWeight:500, marginTop:3, lineHeight:1.4 }}>{value}</div>
    </div>
  );
}

function ItineraryRatings({ trip }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:14, flexWrap:'wrap', padding:'10px 14px', background:'#F7F9FB', borderRadius:10, marginBottom:18 }}>
      <span style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:13, fontWeight:700, color:T.ink }}>
        <Ico name="star" size={14} color={T.amber}/> {trip.rating}
        <span style={{ color:T.grey, fontWeight:500 }}>· {trip.ratingCount} reviews</span>
      </span>
      <span style={{ width:1, height:14, background:T.greyLight }}/>
      <span style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:12.5, color:T.inkSoft, fontWeight:500 }}>
        <Ico name="users" size={13} color={T.greenDeep}/> {trip.bookingsCount}+ booked
      </span>
      <span style={{ width:1, height:14, background:T.greyLight }}/>
      <span style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:12.5, color:T.inkSoft, fontWeight:500 }}>
        <Ico name="shield" size={13} color={T.greenDeep}/> Curator verified
      </span>
      <span style={{ flex:1 }}/>
      <span style={{ fontSize:11.5, color:T.grey, fontWeight:500 }}>{trip.itinerary.length}-day plan · every hour mapped</span>
    </div>
  );
}

function ItineraryNav({ days, active, onJump, isMobile, isTravHer }) {
  const accent = isTravHer ? T.rose : T.greenDeep;
  const bg = isTravHer ? T.roseCream : '#F4F6FA';
  return (
    <div className={isMobile?'scroll-x':''} style={{ display:'flex', gap:6, marginBottom:isMobile?16:20, padding:4, background:bg, borderRadius:12, position:'sticky', top:isMobile?64:72, zIndex:5, boxShadow:'0 1px 0 rgba(15,30,46,.04)', overflowX:isMobile?'auto':'visible' }}>
      {days.map((d,i) => {
        const isActive = active===i;
        return (
          <button key={i} onClick={()=>onJump(i)} className={isMobile?'snap':''} style={{
            flex:isMobile?'0 0 auto':'1 1 0', minWidth:isMobile?140:0, padding:isMobile?'9px 12px':'10px 14px', border:'none',
            borderRadius:9, cursor:'pointer', fontFamily:'inherit',
            background: isActive ? '#fff' : 'transparent',
            boxShadow: isActive ? '0 2px 10px rgba(15,30,46,.08)' : 'none',
            textAlign:'left', transition:'all .15s'
          }}>
            <div style={{ fontSize:9.5, fontWeight:800, letterSpacing:'.16em', color: isActive ? accent : T.grey, textTransform:'uppercase' }}>{d.day} · {d.date.split(',')[0]}</div>
            <div style={{ fontSize:13, fontWeight:700, color:T.ink, marginTop:3, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{d.title}</div>
          </button>
        );
      })}
    </div>
  );
}

function timeTone(time) {
  const m = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return { bg:'#F0FAF4', fg:T.greenDeep, icon:'clock' };
  let h = parseInt(m[1]);
  const isPM = m[3].toUpperCase()==='PM';
  if (isPM && h<12) h+=12;
  if (!isPM && h===12) h=0;
  if (h < 9)  return { bg:'#FFF5D6', fg:'#A37A1A',     icon:'sunrise' };
  if (h < 12) return { bg:'#F0FAF4', fg:T.greenDeep,   icon:'coffee' };
  if (h < 17) return { bg:'#F0F6FB', fg:'#2d6a84',     icon:'sun' };
  if (h < 20) return { bg:'#FBEFE7', fg:T.rose,        icon:'spark' };
  return       { bg:'#1F2C3D', fg:'#fff',              icon:'moon' };
}

function Moment({ block, isLast }) {
  const tone = timeTone(block.time);
  return (
    <div style={{ position:'relative', paddingBottom:isLast ? 4 : 18 }}>
      <div style={{ position:'absolute', left:-25, top:5, width:22, height:22, borderRadius:'50%', background:tone.bg, border:'2px solid #fff', boxShadow:'0 0 0 1.5px '+tone.bg, display:'flex', alignItems:'center', justifyContent:'center', zIndex:2 }}>
        <Ico name={tone.icon} size={11} color={tone.fg} stroke={2.2}/>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:5, flexWrap:'wrap' }}>
        <span style={{ fontSize:10.5, fontWeight:800, padding:'4px 10px', borderRadius:999, background:tone.bg, color:tone.fg, letterSpacing:'.06em', fontFamily:'ui-monospace, Menlo, monospace' }}>{block.time}</span>
        <span style={{ fontSize:14.5, fontWeight:700, color:T.ink }}>{block.title}</span>
        {block.included && (
          <span style={{ marginLeft:'auto', display:'inline-flex', alignItems:'center', gap:4, fontSize:9.5, fontWeight:800, color:T.greenDeep, letterSpacing:'.12em' }}>
            <Ico name="check" size={10} color={T.greenDeep} stroke={3}/> INCLUDED
          </span>
        )}
      </div>
      <div style={{ fontSize:13.5, color:T.grey, lineHeight:1.55, fontFamily:'Fraunces, serif', fontStyle:'italic' }}>{block.body}</div>
    </div>
  );
}

function DayBlock({ day, idx, isLast, isMobile, gallery, onOpenLightbox }) {
  const dayNum = day.day.split(' ')[1];
  // Build a 3-photo set Airbnb-style: main = day.img, then 2 supporting from trip.gallery.
  const supports = (gallery || []).filter(g => g.src !== day.img?.src).slice(idx*2, idx*2+2);
  const allPhotos = [day.img, ...supports].filter(Boolean);
  while (allPhotos.length < 3 && (gallery||[]).length) allPhotos.push(gallery[(allPhotos.length+idx) % gallery.length]);
  const open = (startIdx=0) => onOpenLightbox && onOpenLightbox(allPhotos, startIdx, `${day.day} · ${day.title}`);
  return (
    <div id={`day-${idx}`} style={{ marginBottom:isLast?0:isMobile?24:32, scrollMarginTop:isMobile?140:160 }}>
      <DayPhotos photos={allPhotos} day={day} dayNum={dayNum} isMobile={isMobile} onOpen={open}/>
      {/* Timeline */}
      <div style={{ position:'relative', paddingLeft:25, marginTop:isMobile?14:18 }}>
        <div style={{ position:'absolute', left:10, top:6, bottom:6, width:2, background:`linear-gradient(180deg, ${T.green} 0%, ${T.greyLight} 100%)`, borderRadius:2 }}/>
        {day.blocks.map((b,j) => <Moment key={j} block={b} isLast={j===day.blocks.length-1}/>)}
      </div>
    </div>
  );
}

function DayPhotos({ photos, day, dayNum, isMobile, onOpen }) {
  // Mobile: horizontal scroll-snap carousel with dots
  if (isMobile) {
    const [active, setActive] = React.useState(0);
    const ref = React.useRef(null);
    const onScroll = () => {
      if (!ref.current) return;
      const w = ref.current.clientWidth;
      const i = Math.round(ref.current.scrollLeft / Math.max(w*0.9, 1));
      if (i !== active) setActive(i);
    };
    return (
      <div style={{ position:'relative' }}>
        <div ref={ref} onScroll={onScroll} className="scroll-x" style={{ display:'flex', gap:8, overflowX:'auto', borderRadius:14, height:200, margin:'0 -16px', padding:'0 16px' }}>
          {photos.map((p, i) => (
            <div key={i} onClick={()=>onOpen && onOpen(i)} className="snap" style={{ position:'relative', flex:'0 0 90%', borderRadius:14, overflow:'hidden', cursor:'pointer' }}>
              {p && <ImgPlaceholder {...p} radius={0} overlay={false}/>}
              <div style={{ position:'absolute', inset:0, background: i===0 ? 'linear-gradient(180deg, rgba(0,0,0,.05) 0%, rgba(0,0,0,.7) 100%)' : 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,.5) 100%)' }}/>
              {i===0 && (
                <>
                  <div style={{ position:'absolute', top:12, left:12, display:'inline-flex', alignItems:'center', gap:7, padding:'4px 10px 4px 4px', background:'rgba(255,255,255,.96)', borderRadius:999, boxShadow:'0 2px 10px rgba(0,0,0,.18)' }}>
                    <span style={{ width:22, height:22, borderRadius:'50%', background:T.green, color:'#fff', fontSize:10, fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Fraunces, serif' }}>{dayNum}</span>
                    <span style={{ fontSize:10, fontWeight:800, letterSpacing:'.14em', color:T.ink }}>{day.date.toUpperCase()}</span>
                  </div>
                  <div style={{ position:'absolute', left:14, right:14, bottom:14, color:'#fff' }}>
                    <div style={{ fontFamily:'Fraunces, serif', fontSize:22, fontWeight:700, letterSpacing:'-.02em', lineHeight:1.1, textShadow:'0 2px 12px rgba(0,0,0,.4)' }}>{day.title}</div>
                  </div>
                  <div style={{ position:'absolute', right:12, bottom:12, display:'inline-flex', alignItems:'center', gap:4, fontSize:10, fontWeight:700, color:'#fff', background:'rgba(0,0,0,.45)', backdropFilter:'blur(6px)', padding:'3px 9px', borderRadius:999, letterSpacing:'.06em' }}>
                    <Ico name="clock" size={10} color="#fff" stroke={2}/>{day.blocks.length} moments
                  </div>
                </>
              )}
              {i>0 && p?.label && (
                <div style={{ position:'absolute', left:12, bottom:10, color:'#fff', fontSize:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' }}>{p.label}</div>
              )}
              <div style={{ position:'absolute', top:10, right:10, fontSize:10.5, fontWeight:700, padding:'3px 8px', borderRadius:999, background:'rgba(0,0,0,.5)', color:'#fff', backdropFilter:'blur(6px)' }}>
                {i+1}/{photos.length}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', justifyContent:'center', gap:6, marginTop:8 }}>
          {photos.map((_,i) => (
            <span key={i} style={{ width: i===active ? 18 : 6, height:6, borderRadius:999, background: i===active ? T.green : T.greyLight, transition:'all .2s' }}/>
          ))}
        </div>
      </div>
    );
  }
  // Desktop: Airbnb-style 1-large + 2-small grid
  const [main, b, c] = photos;
  return (
    <div style={{ position:'relative', display:'grid', gridTemplateColumns:'1.6fr 1fr', gridTemplateRows:'1fr 1fr', gap:8, height:230, borderRadius:14, overflow:'hidden' }}>
      <div onClick={()=>onOpen && onOpen(0)} style={{ gridColumn:'1 / 2', gridRow:'1 / 3', position:'relative', cursor:'pointer' }}>
        {main && <ImgPlaceholder {...main} radius={0} overlay={false}/>}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,.05) 0%, rgba(0,0,0,.7) 100%)' }}/>
        <div style={{ position:'absolute', top:14, left:14, display:'inline-flex', alignItems:'center', gap:8, padding:'4px 12px 4px 4px', background:'rgba(255,255,255,.96)', borderRadius:999, boxShadow:'0 2px 10px rgba(0,0,0,.18)' }}>
          <span style={{ width:24, height:24, borderRadius:'50%', background:T.green, color:'#fff', fontSize:11, fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Fraunces, serif' }}>{dayNum}</span>
          <span style={{ fontSize:10.5, fontWeight:800, letterSpacing:'.14em', color:T.ink }}>{day.date.toUpperCase()}</span>
        </div>
        <div style={{ position:'absolute', left:18, bottom:14, right:18, color:'#fff' }}>
          <div style={{ fontFamily:'Fraunces, serif', fontSize:24, fontWeight:700, letterSpacing:'-.02em', lineHeight:1.1, textShadow:'0 2px 14px rgba(0,0,0,.3)' }}>{day.title}</div>
        </div>
        <div style={{ position:'absolute', right:14, bottom:14, display:'inline-flex', alignItems:'center', gap:5, fontSize:10.5, fontWeight:700, color:'#fff', background:'rgba(0,0,0,.4)', backdropFilter:'blur(6px)', padding:'4px 10px', borderRadius:999, letterSpacing:'.06em' }}>
          <Ico name="clock" size={11} color="#fff" stroke={2}/>{day.blocks.length} moments
        </div>
      </div>
      <div onClick={()=>onOpen && onOpen(1)} style={{ position:'relative', cursor:'pointer' }}>
        {b && <ImgPlaceholder {...b} radius={0} overlay={false}/>}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,.5) 100%)' }}/>
        {b?.label && <div style={{ position:'absolute', left:12, bottom:8, color:'#fff', fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' }}>{b.label}</div>}
      </div>
      <div onClick={()=>onOpen && onOpen(2)} style={{ position:'relative', cursor:'pointer' }}>
        {c && <ImgPlaceholder {...c} radius={0} overlay={false}/>}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,.5) 100%)' }}/>
        {c?.label && <div style={{ position:'absolute', left:12, bottom:8, color:'#fff', fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' }}>{c.label}</div>}
        <button onClick={(e)=>{ e.stopPropagation(); onOpen && onOpen(0); }} style={{
          position:'absolute', right:10, bottom:10, height:30, padding:'0 12px', borderRadius:999,
          background:'rgba(255,255,255,.95)', color:T.ink, border:`1px solid ${T.ink}`,
          fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:'inherit',
          display:'inline-flex', alignItems:'center', gap:6, boxShadow:'0 2px 8px rgba(0,0,0,.15)',
        }}>
          <Ico name="copy" size={11} color={T.ink} stroke={2}/> Show all
        </button>
      </div>
    </div>
  );
}

function TripOverview({ trip, isMobile, theme }) {
  const th = theme || { deep:T.greenDeep, soft:'#F0FAF4' };
  const isTravHer = th.deep && th.deep.indexOf('9c3a2a') >= 0;
  const tiles = trip.isLongHaul ? [
    { icon:'calendar', label:'DURATION', v1:trip.nightsLabel, v2:trip.duration+' days', tint:isTravHer?'#FBEFE7':'#F0FAF4' },
    { icon:'bed',   label:'STAY',   v1:trip.hotel.name, v2:trip.hotel.tier, tint:'#FFF5D6' },
    { icon:'users', label:'FLIGHTS', v1:'Not included', v2:'Custom quotes available', tint:'#F0F6FB' },
    { icon:'pin',   label:'VISA', v1:'Visa required', v2:'We assist end-to-end', tint:isTravHer?'#F0FAF4':'#FBEFE7' },
  ] : [
    { icon:'clock', label:'START',  v1:trip.meetingPoint.split('·')[1]?.trim() || 'Fri 9:00 PM', v2:trip.meetingPoint.split('·')[0]?.trim() || 'Akshardham, Delhi', tint:isTravHer?'#FBEFE7':'#F0FAF4' },
    { icon:'bed',   label:'STAY',   v1:trip.hotel.name, v2:trip.hotel.tier, tint:'#FFF5D6' },
    { icon:'car',   label:'RIDE',   v1:'AC Volvo', v2:'Both ways', tint:'#F0F6FB' },
    { icon:'pin',   label:'RETURN', v1:trip.returnPoint.split(',').slice(-1)[0]?.trim() || 'Sun 7:00 PM', v2:trip.returnPoint.split(',').slice(0,-1).join(',') || 'Akshardham', tint:isTravHer?'#F0FAF4':'#FBEFE7' },
  ];
  const route = trip.route || ['DELHI', trip.dest.split(',')[0].toUpperCase(), 'DELHI'];
  return (
    <div style={{ background:'#fff', borderRadius:16, padding:isMobile?16:24, border:`1px solid ${T.greyLight}`, overflow:'hidden' }}>
      <div style={{ fontSize:11, fontWeight:800, color:th.deep, letterSpacing:'.18em', marginBottom:8 }}>THE TRIP</div>
      <h3 style={{ fontSize:isMobile?22:26, fontWeight:700, color:T.ink, letterSpacing:'-.02em', margin:'0 0 6px', fontFamily:'Fraunces, serif', lineHeight:1.15 }}>{trip.overviewHeadline || `Two nights in ${trip.dest.split(',')[0]}.`}</h3>
      <p style={{ fontSize:isMobile?13.5:14.5, lineHeight:1.6, color:T.inkSoft, margin:'0 0 16px' }}>{trip.summary}</p>
      <div style={{ position:'relative', borderRadius:14, overflow:'hidden', height:isMobile?140:170, marginBottom:14 }}>
        <ImgPlaceholder {...trip.gallery[0]} radius={0} overlay={false}/>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,.05) 25%, rgba(0,0,0,.78) 100%)' }}/>
        <div style={{ position:'absolute', left:isMobile?14:18, bottom:isMobile?12:14, right:isMobile?14:18, color:'#fff', display:'flex', alignItems:'center', gap:isMobile?6:10, flexWrap:'wrap' }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:isMobile?6:9, fontSize:isMobile?11:13, fontWeight:800, letterSpacing:isMobile?'.12em':'.18em' }}>
            {route.map((leg, i) => (
              <React.Fragment key={i}>
                {i>0 && <Ico name="arrow-right" size={isMobile?10:12} color="#fff" stroke={2.4}/>}
                <span>{leg}</span>
              </React.Fragment>
            ))}
          </span>
          {!isMobile && <span style={{ flex:1 }}/>}
          {!isMobile && <span style={{ fontWeight:600, opacity:.9, fontSize:11, letterSpacing:'.1em' }}>{trip.routeDistance || '~250 KM'} · {trip.nightsLabel || '2 NIGHTS'}</span>}
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr 1fr':'repeat(4,1fr)', gap:isMobile?8:10 }}>
        {tiles.map(m => (
          <div key={m.label} style={{ background:m.tint, borderRadius:12, padding:isMobile?'12px 12px 10px':'13px 14px 12px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:9.5, color:T.grey, letterSpacing:'.14em', fontWeight:800 }}>
              <Ico name={m.icon} size={11} color={th.deep} stroke={2.2}/> {m.label}
            </div>
            <div style={{ fontSize:13.5, fontWeight:700, color:T.ink, marginTop:6, lineHeight:1.25 }}>{m.v1}</div>
            <div style={{ fontSize:11.5, color:T.grey, marginTop:2, lineHeight:1.3 }}>{m.v2}</div>
          </div>
        ))}
      </div>
      
      {/* Long Haul Logistics Extensions */}
      {trip.isLongHaul && trip.logistics && (
        <div style={{ padding:isMobile?16:20, borderRadius:12, border:`1px solid ${th.ring||T.greenLight}`, background:th.soft||'#F0FAF4', marginTop:16 }}>
          <div style={{ fontSize:10.5, color:th.deep||T.greenDeep, letterSpacing:'.1em', fontWeight:800, marginBottom:10 }}>LOGISTICS & PASSPORT</div>
          <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr 1fr', gap:isMobile?14:16 }}>
            <div><div style={{ fontSize:10.5, color:T.grey, fontWeight:700, letterSpacing:'.06em', marginBottom:4 }}>VISA</div><div style={{ fontSize:13, fontWeight:600, color:T.inkSoft, lineHeight:1.4 }}>{trip.logistics.visa}</div></div>
            <div><div style={{ fontSize:10.5, color:T.grey, fontWeight:700, letterSpacing:'.06em', marginBottom:4 }}>FLIGHTS</div><div style={{ fontSize:13, fontWeight:600, color:T.inkSoft, lineHeight:1.4 }}>{trip.logistics.flights}</div></div>
            <div><div style={{ fontSize:10.5, color:T.grey, fontWeight:700, letterSpacing:'.06em', marginBottom:4 }}>FOREX</div><div style={{ fontSize:13, fontWeight:600, color:T.inkSoft, lineHeight:1.4 }}>{trip.logistics.forex}</div></div>
          </div>
        </div>
      )}
    </div>
  );
}

function avatarColor(name) {
  const h = [...name].reduce((a,c)=>a+c.charCodeAt(0),0);
  return `hsl(${h*53 % 360}, 50%, 52%)`;
}

function ReviewCard({ r, alt }) {
  const initials = r.name.split(' ').map(s=>s[0]).join('').slice(0,2).toUpperCase();
  return (
    <div style={{ padding:'18px 20px', borderRadius:14, background: alt ? '#FAFAFA' : '#F7F9FB', marginBottom:12, border:`1px solid ${T.greyLight}66` }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10, flexWrap:'wrap' }}>
        <div style={{ display:'flex', gap:2 }}>{[0,1,2,3,4].map(s=><Ico key={s} name="star" size={13} color={T.amber}/>)}</div>
        <span style={{ fontSize:11, color:T.grey, fontFamily:'ui-monospace, Menlo, monospace', fontWeight:600, letterSpacing:'.04em' }}>{r.tripDate || ''}</span>
        {r.highlight && (
          <span style={{ marginLeft:'auto', fontSize:10.5, fontWeight:700, color:T.greenDeep, background:'#E7F7EE', padding:'4px 10px', borderRadius:999, letterSpacing:'.04em' }}>
            <Ico name="spark" size={10} color={T.greenDeep}/> {r.highlight}
          </span>
        )}
      </div>
      <p style={{ fontSize:15.5, color:T.ink, lineHeight:1.55, margin:'0 0 12px', fontFamily:'Fraunces, serif', fontStyle:'italic', letterSpacing:'-.005em' }}>“{r.quote}”</p>
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <div style={{ width:30, height:30, borderRadius:'50%', background:`linear-gradient(135deg, ${avatarColor(r.name)}, ${avatarColor(r.city)})`, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, fontFamily:'inherit' }}>{initials}</div>
        <div style={{ fontSize:12.5, fontWeight:700, color:T.ink }}>{r.name} <span style={{ color:T.grey, fontWeight:500 }}>· {r.city}</span></div>
      </div>
    </div>
  );
}

function ReviewsAllModal({ trip, onClose, onBook, isMobile }) {
  const [activeTag, setActiveTag] = React.useState(null);
  const stats = trip.reviewStats || { distribution:[], tags:[], recommend:96 };
  const totalCount = stats.distribution.reduce((a,d)=>a+d.count, 0) || trip.reviews.length;
  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(10,15,22,.55)', backdropFilter:'blur(4px)', zIndex:100, display:'flex', alignItems:isMobile?'stretch':'center', justifyContent:'center', padding:isMobile?0:20 }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:'#fff', borderRadius:isMobile?0:18, width:'100%', maxWidth:isMobile?'100%':740, maxHeight:isMobile?'100%':'88vh', height:isMobile?'100%':'auto', display:'flex', flexDirection:'column', boxShadow:'0 24px 60px rgba(0,0,0,.25)', overflow:'hidden' }}>
        {/* Header */}
        <div style={{ padding:isMobile?'18px 18px 14px':'22px 26px 18px', borderBottom:`1px solid ${T.greyLight}`, display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:14, flexShrink:0 }}>
          <div>
            <div style={{ fontSize:10.5, fontWeight:800, color:T.greenDeep, letterSpacing:'.18em', marginBottom:4 }}>342 STORIES FROM THE GANGA</div>
            <h3 style={{ fontFamily:'Fraunces, serif', fontSize:isMobile?22:26, fontWeight:700, color:T.ink, margin:0, letterSpacing:'-.02em' }}>What travelers said</h3>
            <div style={{ fontSize:13, color:T.grey, marginTop:6, display:'inline-flex', alignItems:'center', gap:6 }}>
              <Ico name="star" size={13} color={T.amber}/>
              <b style={{ color:T.ink, fontWeight:700 }}>{trip.rating}</b>
              <span>· {trip.ratingCount} reviews · {stats.recommend}% recommend</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background:'#F4F6FA', border:'none', width:36, height:36, borderRadius:'50%', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <Ico name="x" size={16} color={T.ink} stroke={2.2}/>
          </button>
        </div>
        {/* Summary block */}
        <div style={{ padding:isMobile?'14px 18px':'18px 26px', borderBottom:`1px solid ${T.greyLight}`, display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1.4fr', gap:isMobile?14:24, flexShrink:0, background:'#FAFBFC' }}>
          <div>
            <div style={{ fontSize:10, fontWeight:800, color:T.grey, letterSpacing:'.16em', marginBottom:10 }}>RATING BREAKDOWN</div>
            {stats.distribution.map(d => {
              const pct = totalCount ? Math.round((d.count/totalCount)*100) : 0;
              return (
                <div key={d.stars} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:5 }}>
                  <span style={{ fontSize:11, color:T.grey, fontWeight:600, width:14 }}>{d.stars}</span>
                  <Ico name="star" size={10} color={T.amber}/>
                  <div style={{ flex:1, height:6, background:T.greyLight, borderRadius:999, overflow:'hidden' }}>
                    <div style={{ width:`${pct}%`, height:'100%', background:`linear-gradient(90deg, ${T.amber}, #d48818)`, borderRadius:999 }}/>
                  </div>
                  <span style={{ fontSize:10.5, color:T.grey, fontWeight:600, width:30, textAlign:'right' }}>{d.count}</span>
                </div>
              );
            })}
          </div>
          <div>
            <div style={{ fontSize:10, fontWeight:800, color:T.grey, letterSpacing:'.16em', marginBottom:10 }}>WHAT THEY LOVED</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {stats.tags.map(tag => {
                const isActive = activeTag===tag.label;
                return (
                  <button key={tag.label} onClick={()=>setActiveTag(isActive?null:tag.label)} style={{
                    padding:'6px 12px', borderRadius:999, fontFamily:'inherit',
                    background: isActive ? T.ink : '#fff',
                    color: isActive ? '#fff' : T.ink,
                    border: `1px solid ${isActive ? T.ink : T.greyLight}`,
                    fontSize:12, fontWeight:600, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:5
                  }}>
                    {tag.label} <span style={{ color: isActive ? 'rgba(255,255,255,.7)' : T.grey, fontWeight:500 }}>{tag.count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {/* Scrollable reviews */}
        <div style={{ overflowY:'auto', padding:isMobile?'14px 18px 18px':'18px 26px 22px', flex:1 }}>
          {trip.reviews.map((r,i) => <ReviewCard key={i} r={r} alt={i%2}/>)}
        </div>
        {/* Footer CTA */}
        <div style={{ padding:isMobile?'12px 16px calc(12px + env(safe-area-inset-bottom)) 16px':'14px 22px', borderTop:`1px solid ${T.greyLight}`, background:'#FAFAFA', display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, flexShrink:0 }}>
          {!isMobile && <span style={{ fontSize:13, color:T.inkSoft, fontWeight:500 }}>Sounds like your kind of trip?</span>}
          <Btn kind="primary" size={isMobile?'lg':'md'} full={isMobile} trailing="arrow-right" onClick={()=>{ onClose(); onBook && onBook(); }}>
            Lock my spot · ₹4,000 token
          </Btn>
        </div>
      </div>
    </div>
  );
}

function ItineraryVideos({ videos, isMobile }) {
  if (!videos || !videos.length) return null;
  return (
    <div style={{ marginTop:isMobile?16:20, paddingTop:isMobile?16:20, borderTop:`1px solid ${T.greyLight}` }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
        <div>
          <div style={{ fontSize:11, fontWeight:800, color:T.greenDeep, letterSpacing:'.18em' }}>TRENDING ON THIS TRIP</div>
          <div style={{ fontSize:isMobile?12:13.5, color:T.inkSoft, marginTop:2 }}>Videos from travelers who just got back</div>
        </div>
        <span style={{ fontSize:12, color:T.greenDeep, fontWeight:700, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:4 }}>
          See all <Ico name="arrow-right" size={12} color={T.greenDeep}/>
        </span>
      </div>
      <div className={isMobile?'scroll-x':''} style={{ display:isMobile?'flex':'grid', gridTemplateColumns:isMobile?undefined:`repeat(${videos.length}, 1fr)`, gap:12, overflowX:isMobile?'auto':'visible', margin:isMobile?'0 -16px':0, padding:isMobile?'0 16px':0 }}>
        {videos.map((v,i) => (
          <div key={i} className={isMobile?'snap':''} style={{ position:'relative', borderRadius:12, overflow:'hidden', aspectRatio:'9/14', cursor:'pointer', minWidth:isMobile?150:'auto', flexShrink:0 }}>
            <ImgPlaceholder {...v} radius={0}/>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,.75) 100%)' }}/>
            <div style={{ position:'absolute', top:10, right:10, width:30, height:30, borderRadius:'50%', background:'rgba(255,255,255,.9)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Ico name="play" size={12} color={T.ink}/>
            </div>
            <div style={{ position:'absolute', left:12, bottom:10, right:12, color:'#fff' }}>
              <div style={{ fontSize:11.5, fontWeight:700, lineHeight:1.25, marginBottom:3 }}>{v.title}</div>
              <div style={{ fontSize:10.5, color:'rgba(255,255,255,.8)', fontWeight:500 }}>{v.handle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Accordion({ items }) {
  const [open, setOpen] = React.useState(0);
  return (
    <div>
      {items.map((it,i) => {
        const isOpen = open===i;
        return (
          <div key={i} style={{ borderBottom:`1px solid ${T.greyLight}` }}>
            <div onClick={()=>setOpen(isOpen?-1:i)} style={{ padding:'14px 0', display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer' }}>
              <span style={{ fontSize:14, fontWeight:600, color:T.ink }}>{it.q}</span>
              <div style={{ transform:`rotate(${isOpen?180:0}deg)`, transition:'transform .2s' }}><Ico name="chevron-down" size={16} color={T.grey}/></div>
            </div>
            {isOpen && <div style={{ fontSize:13.5, color:T.grey, lineHeight:1.6, paddingBottom:16 }}>{it.a}</div>}
          </div>
        );
      })}
    </div>
  );
}

function BookingCard({ trip, onBook, onCustomise, persona='standard', theme }) {
  const th = theme || personaTheme(persona);
  const tint = persona && persona !== 'standard';
  const [guests, setGuests] = React.useState(2);
  const [dateId, setDateId] = React.useState(trip.departures.find(d=>d.selected)?.id || trip.departures[0].id);
  const [dateOpen, setDateOpen] = React.useState(false);
  const selectedDate = trip.departures.find(d=>d.id===dateId) || trip.departures[0];
  const p = trip.pricing;
  const perPerson = selectedDate.price + p.tax + p.convenience;
  const total = perPerson * guests;
  const token = p.token * guests;
  const booked = trip.spotsTotal - trip.spotsLeft;
  const pct = Math.round((booked / trip.spotsTotal) * 100);
  return (
    <div style={{ background:'#fff', borderRadius:16, padding:22, border:`1px solid ${tint?th.ring:T.greyLight}`, boxShadow:`0 8px 30px ${tint?th.primary+'1f':'rgba(15,30,46,.06)'}`, position:'relative', overflow:'hidden' }}>
      {tint && <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:`linear-gradient(90deg, ${th.primary}, ${th.deep})` }}/>}
      {tint && <div style={{ display:'inline-flex', alignItems:'center', gap:6, marginBottom:12, padding:'4px 10px', background:th.soft, color:th.deep, borderRadius:999, fontSize:10.5, fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase' }}>
        <Ico name={persona==='soloFemale'||persona==='couples'?'rose':persona==='corporate'?'briefcase':'users'} size={10} color={th.deep}/> Booking as · {th.label.replace(' mode','')}
      </div>}
      <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:14 }}>
        <div>
          <div style={{ fontSize:28, fontWeight:800, color:tint?th.deep:T.ink, letterSpacing:'-.02em' }}>{inr(selectedDate.price)}</div>
          <div style={{ fontSize:12, color:T.grey }}>per person · taxes extra</div>
        </div>
      </div>
      <div style={{ marginBottom:14 }}>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:11.5, fontWeight:700, letterSpacing:'.02em', marginBottom:6 }}>
          <span style={{ color:T.ink }}>{booked} of {trip.spotsTotal} spots booked</span>
          <span style={{ color:pct>=60?T.fire:T.greenDeep }}>{pct}% full</span>
        </div>
        <div style={{ height:8, borderRadius:999, background:T.greyLight, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${pct}%`, background:pct>=60?`linear-gradient(90deg, ${T.fire}, #dc2626)`:`linear-gradient(90deg, ${T.green}, ${T.greenDeep})`, borderRadius:999, transition:'width .3s' }}/>
        </div>
        <div style={{ fontSize:11.5, color:T.grey, marginTop:6 }}>Only <b style={{ color:T.ink, fontWeight:700 }}>{trip.spotsLeft} spots left</b> · {trip.viewingNow} viewing now</div>
        
        {/* Vibe Check Snapshot */}
        <div style={{ marginTop:14, padding:'10px 12px', background:'#FAFBFC', border:`1px solid ${T.greyLight}`, borderRadius:10, display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ display:'flex' }}>
            <img src="https://i.pravatar.cc/100?img=12" alt="Traveler" style={{ width:24, height:24, borderRadius:'50%', border:'2px solid #fff' }}/>
            <img src="https://i.pravatar.cc/100?img=47" alt="Traveler" style={{ width:24, height:24, borderRadius:'50%', border:'2px solid #fff', marginLeft:-8 }}/>
            <img src="https://i.pravatar.cc/100?img=68" alt="Traveler" style={{ width:24, height:24, borderRadius:'50%', border:'2px solid #fff', marginLeft:-8 }}/>
          </div>
          <div style={{ fontSize:11, color:T.inkSoft, lineHeight:1.4 }}>
            <b style={{ color:T.ink, fontWeight:700 }}>Who's going?</b>
            <br/>4 Solos · 2 Couples · 3 First-timers
          </div>
        </div>
      </div>
      {/* Date selector */}
      <div style={{ border:`1px solid ${T.greyLight}`, borderRadius:10, marginBottom:10, position:'relative' }}>
        <button onClick={()=>setDateOpen(!dateOpen)} style={{ width:'100%', padding:'10px 12px', background:'transparent', border:'none', cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', justifyContent:'space-between', textAlign:'left' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <Ico name="calendar" size={15} color={T.greenDeep} stroke={2}/>
            <div>
              <div style={{ fontSize:9.5, color:T.grey, letterSpacing:'.14em', fontWeight:800 }}>DATE</div>
              <div style={{ fontSize:13.5, fontWeight:700, color:T.ink, marginTop:1 }}>{selectedDate.dateRange}</div>
            </div>
          </div>
          <div style={{ transform:`rotate(${dateOpen?180:0}deg)`, transition:'transform .15s' }}>
            <Ico name="chevron-down" size={15} color={T.grey}/>
          </div>
        </button>
        {dateOpen && (
          <div style={{ borderTop:`1px solid ${T.greyLight}`, padding:6, display:'flex', flexDirection:'column', gap:4 }}>
            {trip.departures.map(d => {
              const active = d.id===dateId;
              return (
                <button key={d.id} onClick={()=>{setDateId(d.id); setDateOpen(false);}} style={{ padding:'10px 10px', borderRadius:8, background:active?'#F0FAF4':'transparent', border:'none', cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', justifyContent:'space-between', textAlign:'left' }}>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:T.ink }}>{d.dateRange}</div>
                    <div style={{ fontSize:11, color: d.status==='filling' ? T.fire : T.grey, fontWeight:600, marginTop:2 }}>{d.note}</div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ fontSize:13, fontWeight:700, color:T.ink, fontFamily:'Fraunces, serif' }}>{inr(d.price)}</span>
                    {active && <Ico name="check" size={13} color={T.greenDeep} stroke={2.5}/>}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
      <div style={{ border:`1px solid ${T.greyLight}`, borderRadius:10, padding:12, marginBottom:14, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <div style={{ fontSize:9.5, color:T.grey, letterSpacing:'.14em', fontWeight:800 }}>TRAVELERS</div>
          <span style={{ fontSize:14, fontWeight:700, color:T.ink, marginTop:1, display:'inline-block' }}>{guests} Adults</span>
        </div>
        <div style={{ display:'flex', gap:6 }}>
          <button onClick={()=>setGuests(Math.max(1,guests-1))} style={stepBtn}>−</button>
          <button onClick={()=>setGuests(Math.min(6,guests+1))} style={stepBtn}>+</button>
        </div>
      </div>
      
      {trip.isLongHaul && (
        <div style={{ marginBottom:14 }}>
          <div style={{ padding:'10px 12px', background:'#FAFBFC', border:`1px solid ${T.greyLight}`, borderRadius:10 }}>
            <div style={{ fontSize:11, fontWeight:700, color:T.ink, marginBottom:4, display:'flex', alignItems:'center', gap:6 }}>
              <Ico name="pin" size={12} color={T.greenDeep} stroke={2.4}/> Passport Required
            </div>
            <div style={{ fontSize:11, color:T.grey, lineHeight:1.4 }}>
              Valid passport with minimum 6 months validity needed.
            </div>
            <div style={{ height:1, background:T.greyLight, margin:'8px 0' }}/>
            <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' }}>
              <input type="checkbox" style={{ accentColor:T.greenDeep, width:14, height:14 }} />
              <div style={{ fontSize:11, color:T.inkSoft, fontWeight:600 }}>I need flights as well (Request quote post-booking)</div>
            </label>
          </div>
        </div>
      )}

      <div style={{ borderTop:`1px dashed ${T.greyLight}`, paddingTop:12, marginBottom:16, display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
        <span style={{ fontSize:11, color:T.grey, letterSpacing:'.1em', fontWeight:700 }}>TOTAL</span>
        <span style={{ fontSize:22, fontWeight:800, color:tint?th.deep:T.greenDeep, letterSpacing:'-.02em' }}>{inr(total)}</span>
      </div>
      {tint ? (
        <button onClick={onBook} style={{ width:'100%', height:52, borderRadius:999, background:th.primary, color:'#fff', border:`1.5px solid ${th.primary}`, fontFamily:'inherit', fontSize:15, fontWeight:700, cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:10 }}>
          Lock my spot · {inr(token)} token <Ico name="arrow-right" size={16} color="#fff" stroke={2.2}/>
        </button>
      ) : (
        <Btn kind="primary" size="lg" full trailing="arrow-right" onClick={onBook}>Lock my spot · {inr(token)} token</Btn>
      )}
      <div style={{ marginTop:10, textAlign:'center' }}>
        <span onClick={onCustomise||onBook} style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:12.5, fontWeight:700, color:T.greenDeep, cursor:'pointer', textDecoration:'underline', textUnderlineOffset:3 }}>
          or customise your trip <Ico name="arrow-right" size={11} color={T.greenDeep}/>
        </span>
      </div>
      <button onClick={()=>alert('Our team will call you within 10 minutes on the number we have on file.')} style={{
        marginTop:12, width:'100%', height:38, background:'transparent', border:`1px dashed ${T.greyLight}`,
        borderRadius:10, cursor:'pointer', fontFamily:'inherit', fontSize:12.5, fontWeight:600, color:T.ink,
        display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8
      }}>
        <Ico name="phone" size={13} color={T.greenDeep}/> Request a callback
      </button>
      <div style={{ marginTop:10, fontSize:11, color:T.grey, textAlign:'center', lineHeight:1.4 }}>
        No charge until you confirm · Free cancellation up to 7 days
      </div>
    </div>
  );
}

const stepBtn = { width:28, height:28, borderRadius:8, border:`1px solid ${T.greyLight}`, background:'#fff', cursor:'pointer', fontSize:16, fontWeight:600, color:T.ink, fontFamily:'inherit' };

const galleryActionBtn = { height:36, padding:'0 14px', borderRadius:999, background:'#fff', color:T.ink, border:`1px solid ${T.greyLight}`, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:6, textDecoration:'underline', textUnderlineOffset:3 };

function HeroGallery({ trip, isMobile, onOpenLightbox }) {
  const g = trip.gallery || [trip.img];
  const main = g[0];
  const small = g.slice(1, 5);
  while (small.length < 4) small.push(main);
  const total = trip.galleryCount || g.length;
  const open = (i=0) => onOpenLightbox && onOpenLightbox(g, i, `${trip.dest} · gallery`);
  if (isMobile) {
    return (
      <div className="scroll-x" style={{ marginTop:14, display:'flex', gap:8, overflowX:'auto', borderRadius:14, height:240, marginLeft:-16, marginRight:-16, paddingLeft:16, paddingRight:16 }}>
        {g.slice(0,5).map((im,i) => (
          <div key={i} onClick={()=>open(i)} className="snap" style={{ position:'relative', flex:'0 0 88%', borderRadius:14, overflow:'hidden', cursor:'pointer' }}>
            <ImgPlaceholder {...im} radius={0}/>
            {i===0 && (
              <button onClick={(e)=>{ e.stopPropagation(); open(0); }} style={{ position:'absolute', right:10, bottom:10, height:30, padding:'0 12px', borderRadius:999, background:'rgba(0,0,0,.55)', backdropFilter:'blur(6px)', color:'#fff', border:'1px solid rgba(255,255,255,.3)', fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:6 }}>
                <Ico name="copy" size={11} color="#fff" stroke={2}/> All {total}
              </button>
            )}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div style={{ marginTop:20, display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gridTemplateRows:'1fr 1fr', gap:8, height:440, borderRadius:16, overflow:'hidden' }}>
      <div onClick={()=>open(0)} style={{ gridColumn:'1 / 2', gridRow:'1 / 3', position:'relative', cursor:'pointer' }} className="hg-tile">
        <ImgPlaceholder {...main} radius={0}/>
      </div>
      {small.map((im, i) => {
        const isLastRight = i === 3;
        return (
          <div key={i} onClick={()=>open(i+1)} style={{ position:'relative', cursor:'pointer', overflow:'hidden' }} className="hg-tile">
            <ImgPlaceholder {...im} radius={0}/>
            {isLastRight && (
              <button onClick={(e)=>{ e.stopPropagation(); open(0); }} style={{
                position:'absolute', right:14, bottom:14, height:36, padding:'0 14px', borderRadius:10,
                background:'#fff', color:T.ink, border:`1px solid ${T.ink}`,
                fontSize:12.5, fontWeight:700, cursor:'pointer', fontFamily:'inherit',
                display:'inline-flex', alignItems:'center', gap:8, boxShadow:'0 2px 8px rgba(15,30,46,.18)'
              }}>
                <span style={{ display:'inline-grid', gridTemplateColumns:'repeat(3, 4px)', gap:2 }}>
                  {[...Array(9)].map((_,j)=><span key={j} style={{ width:4, height:4, background:T.ink, borderRadius:1 }}/>)}
                </span>
                Show all {total} photos
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

function WhoIsThisFor({ persona, setPersona, isMobile }) {
  return (
    <div style={{ background:'#fff', borderRadius:16, padding:isMobile?16:24, border:`1px solid ${T.greyLight}` }}>
      <div style={{ marginBottom:isMobile?14:20 }}>
        <div style={{ fontSize:11, fontWeight:800, color:T.greenDeep, letterSpacing:'.18em' }}>WHO IS THIS TRIP FOR</div>
        <h3 style={{ fontSize:isMobile?20:24, fontWeight:700, color:T.ink, letterSpacing:'-.015em', margin:'4px 0 0', fontFamily:'Fraunces, serif' }}>Who this trip suits</h3>
      </div>
      <div className={isMobile?'scroll-x':''} style={{ display:isMobile?'flex':'grid', gridTemplateColumns:isMobile?undefined:'repeat(5, 1fr)', gap:isMobile?10:12, overflowX:isMobile?'auto':'visible', margin:isMobile?'0 -16px':0, padding:isMobile?'2px 16px':0 }}>
        {PERSONAS.map(p => {
          const th = personaTheme(p.id);
          return (
            <div key={p.id} className={isMobile?'snap':''} style={{
              flex:isMobile?'0 0 74%':'1 1 0', minWidth:isMobile?220:0,
              padding:isMobile?14:16, borderRadius:14,
              background:'#FAFBFC', border:`1px solid ${T.greyLight}`,
              position:'relative'
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                <div style={{ width:36, height:36, borderRadius:'50%', background:th.soft, display:'flex', alignItems:'center', justifyContent:'center', border:`1px solid ${th.ring}`, flexShrink:0 }}>
                  <Ico name={p.icon} size={17} color={th.deep}/>
                </div>
                <span style={{ fontSize:9, fontWeight:800, color:th.deep, background:'#fff', padding:'3px 8px', borderRadius:999, letterSpacing:'.1em', border:`1px solid ${th.ring}`, whiteSpace:'nowrap', textTransform:'uppercase' }}>{p.pitch}</span>
              </div>
              <div style={{ fontSize:14.5, fontWeight:700, color:T.ink, marginBottom:4, lineHeight:1.2 }}>{p.label}</div>
              <div style={{ fontSize:12, color:T.grey, lineHeight:1.4 }}>{p.sub}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TravHerSideCard({ persona, onPick, isMobile }) {
  const isOn = persona === 'soloFemale';
  return (
    <div style={{ background:isOn?T.roseCream:'#FFF6F2', borderRadius:16, padding:isMobile?14:18, border:`1.5px solid ${isOn?T.rose:T.rose+'33'}`, position:'relative', overflow:'hidden' }}>
      {isOn && <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${T.rose}, #9c3a2a)` }}/>}
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
        <Ico name="rose" size={22}/>
        <span style={{ fontSize:14, fontWeight:700, color:T.rose, fontFamily:'Fraunces, serif' }}>trav.her option</span>
        {isOn && <span style={{ marginLeft:'auto', fontSize:9.5, fontWeight:800, color:'#fff', background:T.rose, padding:'3px 8px', borderRadius:999, letterSpacing:'.1em' }}>ON</span>}
      </div>
      <div style={{ fontSize:12.5, color:T.inkSoft, lineHeight:1.5, marginBottom:isOn?0:10 }}>Women-only cohort of 8, female trip lead, verified safe stays.</div>
      {!isOn && (
        <button onClick={onPick} style={{ marginTop:8, height:36, padding:'0 14px', borderRadius:999, background:'#fff', border:`1.5px solid ${T.rose}`, color:T.rose, fontFamily:'inherit', fontSize:12.5, fontWeight:700, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:6 }}>
          Switch to trav.her <Ico name="arrow-right" size={11} color={T.rose} stroke={2.4}/>
        </button>
      )}
    </div>
  );
}

function PhotoLightbox({ photos, startIdx=0, title, onClose, isMobile }) {
  const [idx, setIdx] = React.useState(Math.max(0, Math.min(startIdx, photos.length-1)));
  const total = photos.length;
  const next = React.useCallback(() => setIdx(i => (i+1) % total), [total]);
  const prev = React.useCallback(() => setIdx(i => (i-1+total) % total), [total]);
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prevOverflow; };
  }, [next, prev, onClose]);
  React.useEffect(() => {
    const el = document.querySelector(`[data-thumb="${idx}"]`);
    if (el) el.scrollIntoView({ behavior:'smooth', inline:'center', block:'nearest' });
  }, [idx]);
  const current = photos[idx];
  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(8,12,18,.97)', zIndex:200, display:'flex', flexDirection:'column' }}>
      <div onClick={e=>e.stopPropagation()} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:isMobile?'12px 14px':'16px 22px', color:'#fff', flexShrink:0, borderBottom:'1px solid rgba(255,255,255,.08)' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
          {title && <div style={{ fontSize:isMobile?11:12, color:'rgba(255,255,255,.6)', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase' }}>{title}</div>}
          <div style={{ fontSize:isMobile?13:14, fontWeight:700, fontFamily:'Fraunces, serif', letterSpacing:'-.005em' }}>{idx+1} <span style={{ color:'rgba(255,255,255,.55)', fontWeight:500 }}>/ {total}</span></div>
        </div>
        <button onClick={onClose} aria-label="Close" style={{ background:'rgba(255,255,255,.1)', border:'none', width:38, height:38, borderRadius:'50%', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Ico name="x" size={18} color="#fff" stroke={2.2}/>
        </button>
      </div>
      <div onClick={e=>e.stopPropagation()} style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:isMobile?12:24, position:'relative', minHeight:0 }}>
        {!isMobile && (
          <button onClick={prev} aria-label="Previous" style={{ position:'absolute', left:24, top:'50%', transform:'translateY(-50%)', width:48, height:48, borderRadius:'50%', background:'rgba(255,255,255,.14)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1, transition:'background .15s' }} onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,.24)'} onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,.14)'}>
            <Ico name="arrow-left" size={20} color="#fff" stroke={2}/>
          </button>
        )}
        <div style={{ width:'100%', height:'100%', maxWidth:1100, maxHeight:'100%', borderRadius:14, overflow:'hidden', position:'relative', boxShadow:'0 30px 60px rgba(0,0,0,.5)' }}>
          {current && <ImgPlaceholder {...current} radius={0} overlay={false}/>}
        </div>
        {!isMobile && (
          <button onClick={next} aria-label="Next" style={{ position:'absolute', right:24, top:'50%', transform:'translateY(-50%)', width:48, height:48, borderRadius:'50%', background:'rgba(255,255,255,.14)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1, transition:'background .15s' }} onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,.24)'} onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,.14)'}>
            <Ico name="arrow-right" size={20} color="#fff" stroke={2}/>
          </button>
        )}
        {isMobile && (
          <div style={{ position:'absolute', bottom:14, left:0, right:0, display:'flex', justifyContent:'center', gap:14, pointerEvents:'none' }}>
            <button onClick={prev} aria-label="Previous" style={{ pointerEvents:'auto', width:42, height:42, borderRadius:'50%', background:'rgba(255,255,255,.18)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(8px)' }}>
              <Ico name="arrow-left" size={18} color="#fff" stroke={2}/>
            </button>
            <button onClick={next} aria-label="Next" style={{ pointerEvents:'auto', width:42, height:42, borderRadius:'50%', background:'rgba(255,255,255,.18)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(8px)' }}>
              <Ico name="arrow-right" size={18} color="#fff" stroke={2}/>
            </button>
          </div>
        )}
      </div>
      <div onClick={e=>e.stopPropagation()} style={{ flexShrink:0, padding:isMobile?'10px 12px calc(12px + env(safe-area-inset-bottom))':'14px 24px 18px' }}>
        {current?.label && (
          <div style={{ color:'#fff', fontSize:isMobile?13:15, fontWeight:600, marginBottom:10, fontFamily:'Fraunces, serif', letterSpacing:'-.005em', textAlign:'center' }}>{current.label}</div>
        )}
        <div className="scroll-x" style={{ display:'flex', gap:6, overflowX:'auto', justifyContent: total<=10 ? 'center' : 'flex-start', padding:'2px' }}>
          {photos.map((p,i) => (
            <button key={i} data-thumb={i} onClick={(e)=>{ e.stopPropagation(); setIdx(i); }} aria-label={`Photo ${i+1}`} style={{ flexShrink:0, width:isMobile?54:72, height:isMobile?40:54, borderRadius:6, overflow:'hidden', border: i===idx ? '2px solid #fff' : '2px solid transparent', cursor:'pointer', padding:0, background:'transparent', position:'relative', opacity: i===idx ? 1 : 0.55, transition:'opacity .15s' }}>
              <ImgPlaceholder {...p} radius={0} overlay={false}/>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TripDetail, HeroGallery, PhotoLightbox });
