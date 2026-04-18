function TripDetail({ onBack, onBook, onCustomise, onOpenArticle }) {
  const t = RISHIKESH_TRIP;
  const isMobile = useIsMobile();
  const [reviewsOpen, setReviewsOpen] = React.useState(false);
  const [activeDay, setActiveDay] = React.useState(0);
  const jumpToDay = (i) => {
    setActiveDay(i);
    const el = document.getElementById(`day-${i}`);
    if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
  };
  const sidePad = isMobile ? 16 : 36;
  return (
    <div style={{ background:'#F4F6FA', paddingBottom:isMobile?100:40 }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:`${isMobile?14:24}px ${sidePad}px 0` }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:isMobile?12:18 }}>
          <Btn kind="outline" size="sm" icon="arrow-left" onClick={onBack}>{isMobile?'Back':'Back to trips'}</Btn>
          <div style={{ display:'flex', gap:6 }}>
            <button style={galleryActionBtn}><Ico name="send" size={14} color={T.ink} stroke={2}/>{!isMobile && ' Share'}</button>
            <button style={galleryActionBtn}><Ico name="heart" size={14} color={T.ink} stroke={2}/>{!isMobile && ' Save'}</button>
          </div>
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:isMobile?6:10, marginBottom:isMobile?8:10 }}>
          {t.tags.map(tag => <span key={tag} style={{ background:'#F0FAF4', color:T.greenDeep, border:`1px solid ${T.green}33`, padding:isMobile?'4px 9px':'5px 12px', borderRadius:999, fontSize:isMobile?9.5:10.5, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase' }}>{tag}</span>)}
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
        <HeroGallery trip={t} isMobile={isMobile}/>
      </div>
      <div style={{ maxWidth:1200, margin:`${isMobile?12:18}px auto 0`, padding:`0 ${sidePad}px` }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:isMobile?8:14, padding:'7px 14px', background:'#fff', border:`1px solid ${T.green}33`, borderRadius:999, fontSize:isMobile?11:12, fontWeight:600, color:T.greenDeep, boxShadow:'0 2px 10px rgba(15,30,46,.05)', flexWrap:'wrap' }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
            <Ico name="shield" size={12} color={T.greenDeep} stroke={2.4}/> Free cancellation up to 7 days
          </span>
          {!isMobile && <>
            <span style={{ width:1, height:11, background:T.greyLight }}/>
            <span style={{ display:'inline-flex', alignItems:'center', gap:5, color:T.inkSoft, fontWeight:500 }}>
              <Ico name="whatsapp" size={11} color={T.greenDeep}/> WhatsApp support
            </span>
            <span style={{ width:1, height:11, background:T.greyLight }}/>
            <span style={{ display:'inline-flex', alignItems:'center', gap:5, color:T.inkSoft, fontWeight:500 }}>
              <Ico name="check" size={11} color={T.greenDeep} stroke={2.4}/> Verified curator
            </span>
          </>}
        </div>
      </div>
      <div style={{ maxWidth:1200, margin:'10px auto 0', padding:`0 ${sidePad}px`, position:'relative' }}>
        <div style={{ background:'#fff', borderRadius:16, padding:isMobile?14:20, boxShadow:'0 8px 30px rgba(15,30,46,.08)', display:'grid', gridTemplateColumns:isMobile?'1fr 1fr':'repeat(4,1fr) auto', gap:isMobile?14:20, alignItems:'center' }}>
          {[{icon:'calendar',label:'Duration',value:'2N / 3D'},{icon:'clock',label:'Dates',value:t.dates.split(' · ')[1]},{icon:'users',label:'Group size',value:'15 max'},{icon:'pin',label:'Pickup',value:'Akshardham, Delhi'}].map(m => (
            <div key={m.label}>
              <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:9.5, color:T.grey, letterSpacing:'.12em', fontWeight:700, textTransform:'uppercase' }}>
                <Ico name={m.icon} size={12} color={T.greenDeep}/>{m.label}
              </div>
              <div style={{ fontSize:isMobile?13:15, fontWeight:700, color:T.ink, marginTop:3 }}>{m.value}</div>
            </div>
          ))}
          <div style={{ textAlign:isMobile?'left':'right', borderLeft:isMobile?'none':`1px solid ${T.greyLight}`, borderTop:isMobile?`1px solid ${T.greyLight}`:'none', paddingLeft:isMobile?0:20, paddingTop:isMobile?12:0, marginTop:isMobile?4:0, gridColumn:isMobile?'1 / -1':'auto', display:isMobile?'flex':'block', alignItems:'baseline', justifyContent:'space-between' }}>
            <div>
              <div style={{ fontSize:9.5, color:T.grey, letterSpacing:'.12em', fontWeight:700 }}>STARTING AT</div>
              <div style={{ fontSize:isMobile?24:28, fontWeight:800, color:T.greenDeep, letterSpacing:'-.02em' }}>{inr(t.price)}</div>
            </div>
            <div style={{ fontSize:11, color:T.fire, fontWeight:600, marginTop:isMobile?0:2 }}>{t.spotsLeft} of {t.spotsTotal} left</div>
          </div>
        </div>

        {isMobile && (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:12 }}>
            <button onClick={onBook} style={{ height:46, borderRadius:12, border:'none', background:T.green, color:'#fff', fontFamily:'inherit', fontSize:14, fontWeight:700, cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              <Ico name="check" size={15} color="#fff" stroke={2.5}/> Lock my spot
            </button>
            <button onClick={onCustomise||onBook} style={{ height:46, borderRadius:12, border:`1.5px solid ${T.greenDeep}`, background:'#fff', color:T.greenDeep, fontFamily:'inherit', fontSize:14, fontWeight:700, cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              <Ico name="settings" size={15} color={T.greenDeep} stroke={2}/> Customise
            </button>
          </div>
        )}

        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1.6fr 1fr', gap:isMobile?16:28, marginTop:isMobile?16:28 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:isMobile?14:20, minWidth:0 }}>
            <AvailableDepartures departures={t.departures} isMobile={isMobile}/>
            <TripOverview trip={t} isMobile={isMobile}/>
            <Section title="Itinerary Journey" isMobile={isMobile}>
              <ItineraryNav days={t.itinerary} active={activeDay} onJump={jumpToDay} isMobile={isMobile}/>
              {t.itinerary.map((d,i) => <DayBlock key={i} day={d} idx={i} isLast={i===t.itinerary.length-1} isMobile={isMobile}/>)}
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
            <Section title="FAQ" isMobile={isMobile}><Accordion items={t.faq}/></Section>
            <ExploreDeeper articleIds={t.relatedArticleIds} onOpenArticle={onOpenArticle} isMobile={isMobile}/>
            <AfterYouBook isMobile={isMobile}/>
          </div>
          {!isMobile ? (
            <div style={{ alignSelf:'start', position:'sticky', top:88, display:'flex', flexDirection:'column', gap:16 }}>
              <BookingCard trip={t} onBook={onBook} onCustomise={onCustomise}/>
              <TripSnapshotCard rows={t.tripSnapshot} viewingNow={t.viewingNow}/>
              <div style={{ background:T.roseCream, borderRadius:16, padding:18, border:`1px solid ${T.rose}22` }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
                  <Ico name="rose" size={22}/>
                  <span style={{ fontSize:14, fontWeight:700, color:T.rose, fontFamily:'Fraunces, serif' }}>trav.her option</span>
                </div>
                <div style={{ fontSize:12.5, color:T.inkSoft, lineHeight:1.5 }}>Women-only cohort of 8, female trip lead, verified safe stays.</div>
              </div>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              <TripSnapshotCard rows={t.tripSnapshot} viewingNow={t.viewingNow}/>
              <div style={{ background:T.roseCream, borderRadius:16, padding:16, border:`1px solid ${T.rose}22` }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
                  <Ico name="rose" size={22}/>
                  <span style={{ fontSize:14, fontWeight:700, color:T.rose, fontFamily:'Fraunces, serif' }}>trav.her option</span>
                </div>
                <div style={{ fontSize:12.5, color:T.inkSoft, lineHeight:1.5 }}>Women-only cohort of 8, female trip lead, verified safe stays.</div>
              </div>
            </div>
          )}
        </div>
      </div>
      {isMobile && <StickyBookingBar trip={t} onBook={onBook} onCustomise={onCustomise}/>}
      {reviewsOpen && <ReviewsAllModal trip={t} onClose={()=>setReviewsOpen(false)} onBook={onBook} isMobile={isMobile}/>}
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

function ItineraryNav({ days, active, onJump, isMobile }) {
  return (
    <div className={isMobile?'scroll-x':''} style={{ display:'flex', gap:6, marginBottom:isMobile?16:20, padding:4, background:'#F4F6FA', borderRadius:12, position:'sticky', top:isMobile?64:72, zIndex:5, boxShadow:'0 1px 0 rgba(15,30,46,.04)', overflowX:isMobile?'auto':'visible' }}>
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
            <div style={{ fontSize:9.5, fontWeight:800, letterSpacing:'.16em', color: isActive ? T.greenDeep : T.grey, textTransform:'uppercase' }}>{d.day} · {d.date.split(',')[0]}</div>
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

function DayBlock({ day, idx, isLast, isMobile }) {
  const dayNum = day.day.split(' ')[1];
  return (
    <div id={`day-${idx}`} style={{ marginBottom:isLast?0:isMobile?24:32, scrollMarginTop:isMobile?140:160 }}>
      {/* Hero banner */}
      <div style={{ position:'relative', borderRadius:14, overflow:'hidden', height:isMobile?130:150, marginBottom:isMobile?14:18 }}>
        {day.img && <ImgPlaceholder {...day.img} radius={0} overlay={false}/>}
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
      {/* Timeline */}
      <div style={{ position:'relative', paddingLeft:25 }}>
        <div style={{ position:'absolute', left:10, top:6, bottom:6, width:2, background:`linear-gradient(180deg, ${T.green} 0%, ${T.greyLight} 100%)`, borderRadius:2 }}/>
        {day.blocks.map((b,j) => <Moment key={j} block={b} isLast={j===day.blocks.length-1}/>)}
      </div>
    </div>
  );
}

function TripOverview({ trip, isMobile }) {
  const tiles = [
    { icon:'clock', label:'START',  v1:trip.meetingPoint.split('·')[1]?.trim() || 'Fri 9:00 PM', v2:trip.meetingPoint.split('·')[0]?.trim() || 'Akshardham, Delhi', tint:'#F0FAF4' },
    { icon:'bed',   label:'STAY',   v1:trip.hotel.name, v2:trip.hotel.tier, tint:'#FFF5D6' },
    { icon:'car',   label:'RIDE',   v1:'AC Volvo', v2:'Both ways', tint:'#F0F6FB' },
    { icon:'pin',   label:'RETURN', v1:trip.returnPoint.split(',').slice(-1)[0]?.trim() || 'Sun 7:00 PM', v2:trip.returnPoint.split(',').slice(0,-1).join(',') || 'Akshardham', tint:'#FBEFE7' },
  ];
  return (
    <div style={{ background:'#fff', borderRadius:16, padding:isMobile?16:24, border:`1px solid ${T.greyLight}`, overflow:'hidden' }}>
      <div style={{ fontSize:11, fontWeight:800, color:T.greenDeep, letterSpacing:'.18em', marginBottom:8 }}>THE TRIP</div>
      <h3 style={{ fontSize:isMobile?22:26, fontWeight:700, color:T.ink, letterSpacing:'-.02em', margin:'0 0 6px', fontFamily:'Fraunces, serif', lineHeight:1.15 }}>Two nights by the Ganga.</h3>
      <p style={{ fontSize:isMobile?13.5:14.5, lineHeight:1.6, color:T.inkSoft, margin:'0 0 16px' }}>{trip.summary}</p>
      <div style={{ position:'relative', borderRadius:14, overflow:'hidden', height:isMobile?140:170, marginBottom:14 }}>
        <ImgPlaceholder {...trip.gallery[0]} radius={0} overlay={false}/>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,.05) 25%, rgba(0,0,0,.78) 100%)' }}/>
        <div style={{ position:'absolute', left:isMobile?14:18, bottom:isMobile?12:14, right:isMobile?14:18, color:'#fff', display:'flex', alignItems:'center', gap:isMobile?6:10, flexWrap:'wrap' }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:isMobile?6:9, fontSize:isMobile?11:13, fontWeight:800, letterSpacing:isMobile?'.12em':'.18em' }}>
            DELHI <Ico name="arrow-right" size={isMobile?10:12} color="#fff" stroke={2.4}/> RISHIKESH <Ico name="arrow-right" size={isMobile?10:12} color="#fff" stroke={2.4}/> DELHI
          </span>
          {!isMobile && <span style={{ flex:1 }}/>}
          {!isMobile && <span style={{ fontWeight:600, opacity:.9, fontSize:11, letterSpacing:'.1em' }}>~250 KM · 2 NIGHTS</span>}
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr 1fr':'repeat(4,1fr)', gap:isMobile?8:10 }}>
        {tiles.map(m => (
          <div key={m.label} style={{ background:m.tint, borderRadius:12, padding:isMobile?'12px 12px 10px':'13px 14px 12px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:9.5, color:T.grey, letterSpacing:'.14em', fontWeight:800 }}>
              <Ico name={m.icon} size={11} color={T.greenDeep} stroke={2.2}/> {m.label}
            </div>
            <div style={{ fontSize:13.5, fontWeight:700, color:T.ink, marginTop:6, lineHeight:1.25 }}>{m.v1}</div>
            <div style={{ fontSize:11.5, color:T.grey, marginTop:2, lineHeight:1.3 }}>{m.v2}</div>
          </div>
        ))}
      </div>
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

function BookingCard({ trip, onBook, onCustomise }) {
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
    <div style={{ background:'#fff', borderRadius:16, padding:22, border:`1px solid ${T.greyLight}`, boxShadow:'0 8px 30px rgba(15,30,46,.06)' }}>
      <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:14 }}>
        <div>
          <div style={{ fontSize:28, fontWeight:800, color:T.ink, letterSpacing:'-.02em' }}>{inr(selectedDate.price)}</div>
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
      <div style={{ borderTop:`1px dashed ${T.greyLight}`, paddingTop:12, marginBottom:16, display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
        <span style={{ fontSize:11, color:T.grey, letterSpacing:'.1em', fontWeight:700 }}>TOTAL</span>
        <span style={{ fontSize:22, fontWeight:800, color:T.greenDeep, letterSpacing:'-.02em' }}>{inr(total)}</span>
      </div>
      <Btn kind="primary" size="lg" full trailing="arrow-right" onClick={onBook}>Lock my spot · {inr(token)} token</Btn>
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

function HeroGallery({ trip, isMobile }) {
  const g = trip.gallery || [trip.img];
  const main = g[0];
  const small = g.slice(1, 5);
  while (small.length < 4) small.push(main);
  const total = trip.galleryCount || g.length;
  if (isMobile) {
    return (
      <div className="scroll-x" style={{ marginTop:14, display:'flex', gap:8, overflowX:'auto', borderRadius:14, height:240, marginLeft:-16, marginRight:-16, paddingLeft:16, paddingRight:16 }}>
        {g.slice(0,5).map((im,i) => (
          <div key={i} className="snap" style={{ position:'relative', flex:'0 0 88%', borderRadius:14, overflow:'hidden' }}>
            <ImgPlaceholder {...im} radius={0}/>
            {i===0 && (
              <button style={{ position:'absolute', right:10, bottom:10, height:30, padding:'0 12px', borderRadius:999, background:'rgba(0,0,0,.55)', backdropFilter:'blur(6px)', color:'#fff', border:'1px solid rgba(255,255,255,.3)', fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:6 }}>
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
      <div style={{ gridColumn:'1 / 2', gridRow:'1 / 3', position:'relative', cursor:'pointer' }} className="hg-tile">
        <ImgPlaceholder {...main} radius={0}/>
      </div>
      {small.map((im, i) => {
        const isLastRight = i === 3;
        return (
          <div key={i} style={{ position:'relative', cursor:'pointer', overflow:'hidden' }} className="hg-tile">
            <ImgPlaceholder {...im} radius={0}/>
            {isLastRight && (
              <button style={{
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

Object.assign(window, { TripDetail, HeroGallery });
