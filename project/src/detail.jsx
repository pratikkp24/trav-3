function TripDetail({ onBack, onBook, onCustomise, onOpenArticle }) {
  const t = RISHIKESH_TRIP;
  const [reviewsOpen, setReviewsOpen] = React.useState(false);
  const [activeDay, setActiveDay] = React.useState(0);
  const jumpToDay = (i) => {
    setActiveDay(i);
    const el = document.getElementById(`day-${i}`);
    if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
  };
  return (
    <div style={{ background:'#F4F6FA', paddingBottom:40 }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'24px 36px 0' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}>
          <Btn kind="outline" size="sm" icon="arrow-left" onClick={onBack}>Back to trips</Btn>
          <div style={{ display:'flex', gap:6 }}>
            <button style={galleryActionBtn}><Ico name="send" size={14} color={T.ink} stroke={2}/> Share</button>
            <button style={galleryActionBtn}><Ico name="heart" size={14} color={T.ink} stroke={2}/> Save</button>
          </div>
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:10 }}>
          {t.tags.map(tag => <span key={tag} style={{ background:'#F0FAF4', color:T.greenDeep, border:`1px solid ${T.green}33`, padding:'5px 12px', borderRadius:999, fontSize:10.5, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase' }}>{tag}</span>)}
        </div>
        <h1 style={{ fontSize:52, fontWeight:700, letterSpacing:'-.03em', margin:0, lineHeight:1.05, color:T.ink, fontFamily:'Fraunces, serif' }}>{t.dest}</h1>
        <div style={{ fontSize:18, marginTop:6, color:T.grey, fontStyle:'italic', fontFamily:'Fraunces, serif' }}>{t.tagline}</div>
        <div style={{ display:'flex', gap:18, flexWrap:'wrap', alignItems:'center', marginTop:14, fontSize:13.5, color:T.inkSoft, fontWeight:500 }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
            <Ico name="star" size={14} color={T.amber}/> <b style={{ fontWeight:700, color:T.ink }}>{t.rating}</b>
            <span style={{ textDecoration:'underline', color:T.ink, fontWeight:600 }}>{t.ratingCount} reviews</span>
          </span>
          <span style={{ color:T.greyLight }}>·</span>
          <span>{t.bookingsCount}+ booked</span>
          <span style={{ color:T.greyLight }}>·</span>
          <span style={{ display:'inline-flex', alignItems:'center', gap:6, color:T.fire, fontWeight:600 }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:T.fire }}/>{t.spotsLeft} of {t.spotsTotal} spots left
          </span>
          <span style={{ color:T.greyLight }}>·</span>
          <span style={{ display:'inline-flex', alignItems:'center', gap:5 }}>
            <Ico name="pin" size={13} color={T.grey}/> Rishikesh, Uttarakhand
          </span>
        </div>
        <HeroGallery trip={t}/>
      </div>
      <div style={{ maxWidth:1200, margin:'18px auto 0', padding:'0 36px' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:14, padding:'7px 14px', background:'#fff', border:`1px solid ${T.green}33`, borderRadius:999, fontSize:12, fontWeight:600, color:T.greenDeep, boxShadow:'0 2px 10px rgba(15,30,46,.05)' }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
            <Ico name="shield" size={12} color={T.greenDeep} stroke={2.4}/> Free cancellation up to 7 days
          </span>
          <span style={{ width:1, height:11, background:T.greyLight }}/>
          <span style={{ display:'inline-flex', alignItems:'center', gap:5, color:T.inkSoft, fontWeight:500 }}>
            <Ico name="whatsapp" size={11} color={T.greenDeep}/> WhatsApp support
          </span>
          <span style={{ width:1, height:11, background:T.greyLight }}/>
          <span style={{ display:'inline-flex', alignItems:'center', gap:5, color:T.inkSoft, fontWeight:500 }}>
            <Ico name="check" size={11} color={T.greenDeep} stroke={2.4}/> Verified curator
          </span>
        </div>
      </div>
      <div style={{ maxWidth:1200, margin:'10px auto 0', padding:'0 36px', position:'relative' }}>
        <div style={{ background:'#fff', borderRadius:16, padding:20, boxShadow:'0 8px 30px rgba(15,30,46,.08)', display:'grid', gridTemplateColumns:'repeat(4,1fr) auto', gap:20, alignItems:'center' }}>
          {[{icon:'calendar',label:'Duration',value:'2N / 3D'},{icon:'clock',label:'Dates',value:t.dates.split(' · ')[1]},{icon:'users',label:'Group size',value:'15 max'},{icon:'pin',label:'Pickup',value:'Akshardham, Delhi'}].map(m => (
            <div key={m.label}>
              <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:10, color:T.grey, letterSpacing:'.12em', fontWeight:700, textTransform:'uppercase' }}>
                <Ico name={m.icon} size={12} color={T.greenDeep}/>{m.label}
              </div>
              <div style={{ fontSize:15, fontWeight:700, color:T.ink, marginTop:3 }}>{m.value}</div>
            </div>
          ))}
          <div style={{ textAlign:'right', borderLeft:`1px solid ${T.greyLight}`, paddingLeft:20 }}>
            <div style={{ fontSize:10, color:T.grey, letterSpacing:'.12em', fontWeight:700 }}>STARTING AT</div>
            <div style={{ fontSize:28, fontWeight:800, color:T.greenDeep, letterSpacing:'-.02em' }}>{inr(t.price)}</div>
            <div style={{ fontSize:11, color:T.fire, fontWeight:600, marginTop:2 }}>{t.spotsLeft} of {t.spotsTotal} spots left</div>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:28, marginTop:28 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            <AvailableDepartures departures={t.departures}/>
            <TripOverview trip={t}/>
            <Section title="Itinerary Journey">
              <ItineraryNav days={t.itinerary} active={activeDay} onJump={jumpToDay}/>
              {t.itinerary.map((d,i) => <DayBlock key={i} day={d} idx={i} isLast={i===t.itinerary.length-1}/>)}
              <ItineraryVideos videos={t.videos}/>
            </Section>
            <SignatureStay stay={t.signatureStay}/>
            <PackList items={t.packList}/>
            <Section title="What's included">
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:28 }}>
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
            <Section title="What travelers said">
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
                {t.reviews.slice(0,3).map((r,i) => (
                  <div key={i} style={{ background:'#F4F6FA', borderRadius:12, padding:16 }}>
                    <div style={{ display:'flex', gap:3, marginBottom:10 }}>{[0,1,2,3,4].map(s=><Ico key={s} name="star" size={12} color={T.amber}/>)}</div>
                    <p style={{ fontSize:13, color:T.inkSoft, lineHeight:1.5, margin:0 }}>"{r.quote}"</p>
                    <div style={{ marginTop:10, fontSize:12, color:T.grey, fontWeight:600 }}>{r.name} · {r.city}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:16, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:10 }}>
                <div style={{ fontSize:12.5, color:T.grey }}>
                  <Ico name="star" size={12} color={T.amber}/> <b style={{ color:T.ink, fontWeight:700 }}>{t.rating}</b> · {t.ratingCount} reviews · {t.reviewStats?.recommend || 96}% would recommend
                </div>
                <button onClick={()=>setReviewsOpen(true)} style={{
                  height:38, padding:'0 18px', borderRadius:999,
                  background:'#fff', color:T.ink, border:`1.5px solid ${T.ink}`,
                  fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit',
                  display:'inline-flex', alignItems:'center', gap:8
                }}>Read all {t.ratingCount} reviews <Ico name="arrow-right" size={13} color={T.ink} stroke={2.2}/></button>
              </div>
            </Section>
            <Section title="FAQ"><Accordion items={t.faq}/></Section>
            <ExploreDeeper articleIds={t.relatedArticleIds} onOpenArticle={onOpenArticle}/>
            <AfterYouBook/>
          </div>
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
        </div>
      </div>
      {reviewsOpen && <ReviewsAllModal trip={t} onClose={()=>setReviewsOpen(false)} onBook={onBook}/>}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ background:'#fff', borderRadius:16, padding:24, border:`1px solid ${T.greyLight}` }}>
      <h3 style={{ fontSize:22, fontWeight:700, color:T.ink, letterSpacing:'-.015em', margin:'0 0 18px', fontFamily:'Fraunces, serif' }}>{title}</h3>
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

function ItineraryNav({ days, active, onJump }) {
  return (
    <div style={{ display:'flex', gap:6, marginBottom:20, padding:4, background:'#F4F6FA', borderRadius:12, position:'sticky', top:72, zIndex:5, boxShadow:'0 1px 0 rgba(15,30,46,.04)' }}>
      {days.map((d,i) => {
        const isActive = active===i;
        return (
          <button key={i} onClick={()=>onJump(i)} style={{
            flex:'1 1 0', minWidth:0, padding:'10px 14px', border:'none',
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

function DayBlock({ day, idx, isLast }) {
  const dayNum = day.day.split(' ')[1];
  return (
    <div id={`day-${idx}`} style={{ marginBottom:isLast?0:32, scrollMarginTop:160 }}>
      {/* Hero banner */}
      <div style={{ position:'relative', borderRadius:14, overflow:'hidden', height:150, marginBottom:18 }}>
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

function TripOverview({ trip }) {
  const tiles = [
    { icon:'clock', label:'START',  v1:trip.meetingPoint.split('·')[1]?.trim() || 'Fri 9:00 PM', v2:trip.meetingPoint.split('·')[0]?.trim() || 'Akshardham, Delhi', tint:'#F0FAF4' },
    { icon:'bed',   label:'STAY',   v1:trip.hotel.name, v2:trip.hotel.tier, tint:'#FFF5D6' },
    { icon:'car',   label:'RIDE',   v1:'AC Volvo', v2:'Both ways', tint:'#F0F6FB' },
    { icon:'pin',   label:'RETURN', v1:trip.returnPoint.split(',').slice(-1)[0]?.trim() || 'Sun 7:00 PM', v2:trip.returnPoint.split(',').slice(0,-1).join(',') || 'Akshardham', tint:'#FBEFE7' },
  ];
  return (
    <div style={{ background:'#fff', borderRadius:16, padding:24, border:`1px solid ${T.greyLight}`, overflow:'hidden' }}>
      <div style={{ fontSize:11, fontWeight:800, color:T.greenDeep, letterSpacing:'.18em', marginBottom:8 }}>THE TRIP</div>
      <h3 style={{ fontSize:26, fontWeight:700, color:T.ink, letterSpacing:'-.02em', margin:'0 0 6px', fontFamily:'Fraunces, serif', lineHeight:1.15 }}>Two nights by the Ganga.</h3>
      <p style={{ fontSize:14.5, lineHeight:1.6, color:T.inkSoft, margin:'0 0 18px' }}>{trip.summary}</p>
      <div style={{ position:'relative', borderRadius:14, overflow:'hidden', height:170, marginBottom:14 }}>
        <ImgPlaceholder {...trip.gallery[0]} radius={0} overlay={false}/>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,.05) 25%, rgba(0,0,0,.78) 100%)' }}/>
        <div style={{ position:'absolute', left:18, bottom:14, right:18, color:'#fff', display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:9, fontSize:13, fontWeight:800, letterSpacing:'.18em' }}>
            DELHI <Ico name="arrow-right" size={12} color="#fff" stroke={2.4}/> RISHIKESH <Ico name="arrow-right" size={12} color="#fff" stroke={2.4}/> DELHI
          </span>
          <span style={{ flex:1 }}/>
          <span style={{ fontWeight:600, opacity:.9, fontSize:11, letterSpacing:'.1em' }}>~250 KM · 2 NIGHTS</span>
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10 }}>
        {tiles.map(m => (
          <div key={m.label} style={{ background:m.tint, borderRadius:12, padding:'13px 14px 12px' }}>
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

function ReviewsAllModal({ trip, onClose, onBook }) {
  const [activeTag, setActiveTag] = React.useState(null);
  const stats = trip.reviewStats || { distribution:[], tags:[], recommend:96 };
  const totalCount = stats.distribution.reduce((a,d)=>a+d.count, 0) || trip.reviews.length;
  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(10,15,22,.55)', backdropFilter:'blur(4px)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:'#fff', borderRadius:18, width:'100%', maxWidth:740, maxHeight:'88vh', display:'flex', flexDirection:'column', boxShadow:'0 24px 60px rgba(0,0,0,.25)', overflow:'hidden' }}>
        {/* Header */}
        <div style={{ padding:'22px 26px 18px', borderBottom:`1px solid ${T.greyLight}`, display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:14, flexShrink:0 }}>
          <div>
            <div style={{ fontSize:10.5, fontWeight:800, color:T.greenDeep, letterSpacing:'.18em', marginBottom:4 }}>342 STORIES FROM THE GANGA</div>
            <h3 style={{ fontFamily:'Fraunces, serif', fontSize:26, fontWeight:700, color:T.ink, margin:0, letterSpacing:'-.02em' }}>What travelers said</h3>
            <div style={{ fontSize:13, color:T.grey, marginTop:6, display:'inline-flex', alignItems:'center', gap:6 }}>
              <Ico name="star" size={13} color={T.amber}/>
              <b style={{ color:T.ink, fontWeight:700 }}>{trip.rating}</b>
              <span>· {trip.ratingCount} reviews · {stats.recommend}% would recommend</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background:'#F4F6FA', border:'none', width:34, height:34, borderRadius:'50%', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <Ico name="x" size={16} color={T.ink} stroke={2.2}/>
          </button>
        </div>
        {/* Summary block */}
        <div style={{ padding:'18px 26px', borderBottom:`1px solid ${T.greyLight}`, display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:24, flexShrink:0, background:'#FAFBFC' }}>
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
        <div style={{ overflowY:'auto', padding:'18px 26px 22px', flex:1 }}>
          {trip.reviews.map((r,i) => <ReviewCard key={i} r={r} alt={i%2}/>)}
        </div>
        {/* Footer CTA */}
        <div style={{ padding:'14px 22px', borderTop:`1px solid ${T.greyLight}`, background:'#FAFAFA', display:'flex', alignItems:'center', justifyContent:'space-between', gap:14, flexShrink:0 }}>
          <span style={{ fontSize:13, color:T.inkSoft, fontWeight:500 }}>Sounds like your kind of trip?</span>
          <Btn kind="primary" size="md" trailing="arrow-right" onClick={()=>{ onClose(); onBook && onBook(); }}>
            Lock my spot · ₹4,000 token
          </Btn>
        </div>
      </div>
    </div>
  );
}

function ItineraryVideos({ videos }) {
  if (!videos || !videos.length) return null;
  return (
    <div style={{ marginTop:20, paddingTop:20, borderTop:`1px solid ${T.greyLight}` }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
        <div>
          <div style={{ fontSize:11, fontWeight:800, color:T.greenDeep, letterSpacing:'.18em' }}>TRENDING ON THIS TRIP</div>
          <div style={{ fontSize:13.5, color:T.inkSoft, marginTop:2 }}>Videos from travelers who just got back</div>
        </div>
        <span style={{ fontSize:12, color:T.greenDeep, fontWeight:700, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:4 }}>
          See all <Ico name="arrow-right" size={12} color={T.greenDeep}/>
        </span>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:`repeat(${videos.length}, 1fr)`, gap:12 }}>
        {videos.map((v,i) => (
          <div key={i} style={{ position:'relative', borderRadius:12, overflow:'hidden', aspectRatio:'9/14', cursor:'pointer' }}>
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
  const p = trip.pricing;
  const total = (p.base + p.tax + p.convenience) * guests;
  const token = p.token * guests;
  const booked = trip.spotsTotal - trip.spotsLeft;
  const pct = Math.round((booked / trip.spotsTotal) * 100);
  return (
    <div style={{ background:'#fff', borderRadius:16, padding:22, border:`1px solid ${T.greyLight}`, boxShadow:'0 8px 30px rgba(15,30,46,.06)' }}>
      <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:14 }}>
        <div>
          <div style={{ fontSize:28, fontWeight:800, color:T.ink, letterSpacing:'-.02em' }}>{inr(trip.price)}</div>
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
      <div style={{ border:`1px solid ${T.greyLight}`, borderRadius:10, padding:12, marginBottom:14, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontSize:14, fontWeight:600, color:T.ink }}>{guests} Adults</span>
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

function HeroGallery({ trip }) {
  const g = trip.gallery || [trip.img];
  const main = g[0];
  const small = g.slice(1, 5);
  while (small.length < 4) small.push(main);
  const total = trip.galleryCount || g.length;
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
