// Supplemental sections for the Trip Detail page:
// Trust strip, Departures, Trip Snapshot, Signature Stay, Pack list,
// Explore Deeper (travelogue cross-link), and "What happens after you book".

function TrustStrip({ trip }) {
  const items = [
    { icon:'check', label:'Free cancellation' },
    { icon:'star', label:`${trip.rating} rating · ${trip.ratingCount} reviews` },
    { icon:'users', label:`${trip.bookingsCount}+ bookings` },
    { icon:'shield', label:'Verified curator' },
    { icon:'whatsapp', label:'WhatsApp support' },
  ];
  return (
    <div style={{ maxWidth:1200, margin:'20px auto 0', padding:'0 36px' }}>
      <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.greyLight}`, padding:'12px 8px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10 }}>
        {items.map((it,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:8, padding:'4px 12px', fontSize:12.5, color:T.inkSoft, fontWeight:500 }}>
            <Ico name={it.icon} size={14} color={T.greenDeep} stroke={2.2}/>
            {it.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function AvailableDepartures({ departures, isMobile }) {
  const [sel, setSel] = React.useState(departures.find(d=>d.selected)?.id || departures[0].id);
  return (
    <Section title="Available Departures" isMobile={isMobile}>
      <div className={isMobile?'scroll-x':''} style={{ display:isMobile?'flex':'grid', gridTemplateColumns:isMobile?undefined:'repeat(3, 1fr)', gap:12, overflowX:isMobile?'auto':'visible', margin:isMobile?'0 -16px':0, padding:isMobile?'8px 16px 4px':0 }}>
        {departures.map(d => {
          const active = d.id===sel;
          return (
            <div key={d.id} onClick={()=>setSel(d.id)} className={isMobile?'snap':''} style={{ position:'relative', border:`${active?2:1}px solid ${active?T.green:T.greyLight}`, borderRadius:14, padding:'18px 16px 14px', cursor:'pointer', background: active ? '#F4FBF7' : '#fff', transition:'background .2s', minWidth:isMobile?220:'auto', flexShrink:0 }}>
              {d.label && (
                <div style={{ position:'absolute', top:-9, left:12, background:T.ink, color:'#fff', padding:'3px 10px', borderRadius:999, fontSize:9.5, fontWeight:800, letterSpacing:'.12em' }}>{d.label}</div>
              )}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
                <div style={{ fontSize:13, fontWeight:700, color:T.ink, letterSpacing:'.02em' }}>{d.dateRange}</div>
                <div style={{ fontSize:isMobile?17:20, fontWeight:800, color:T.ink, fontFamily:'Fraunces, serif' }}>₹{d.price.toLocaleString('en-IN')}</div>
              </div>
              <div style={{ fontSize:11.5, color: d.status==='filling' ? T.fire : T.grey, fontWeight:600, marginBottom:12 }}>{d.note}</div>
              <button style={{ width:'100%', height:isMobile?40:36, borderRadius:10, border: active ? 'none' : `1px solid ${T.greyLight}`, background: active ? T.green : '#fff', color: active ? '#fff' : T.ink, fontSize:12.5, fontWeight:700, cursor:'pointer', fontFamily:'inherit', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6 }}>
                {active ? <><Ico name="check" size={13} color="#fff" stroke={2.5}/> Selected</> : 'Select date'}
              </button>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function SignatureStay({ stay, isMobile }) {
  return (
    <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.greyLight}`, overflow:'hidden', display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1.2fr' }}>
      <div style={{ position:'relative', minHeight:isMobile?180:260 }}>
        <ImgPlaceholder {...stay.thumbs[0]} radius={0}/>
      </div>
      <div style={{ padding:isMobile?'18px 16px 14px':'22px 22px 18px' }}>
        <div style={{ fontSize:11, fontWeight:800, color:T.greenDeep, letterSpacing:'.18em', marginBottom:6 }}>SIGNATURE STAY</div>
        <h3 style={{ fontSize:22, fontWeight:700, color:T.ink, margin:'0 0 6px', fontFamily:'Fraunces, serif', letterSpacing:'-.015em' }}>{stay.name}</h3>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:4, fontSize:12.5, color:T.ink, fontWeight:600 }}>
            <Ico name="star" size={12} color={T.amber}/> {stay.rating}
          </span>
          <span style={{ fontSize:12, color:T.grey }}>· {stay.reviewsCount.toLocaleString()} reviews</span>
        </div>
        <div style={{ fontSize:12.5, color:T.grey, marginBottom:14 }}>{stay.type}</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:14 }}>
          {stay.amenities.map((a,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:8, fontSize:12.5, color:T.inkSoft, fontWeight:500 }}>
              <div style={{ width:22, height:22, borderRadius:6, background:'#F4F6FA', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Ico name={a.icon} size={12} color={T.greenDeep}/>
              </div>
              {a.label}
            </div>
          ))}
        </div>
        <div style={{ fontSize:12.5, color:T.grey, lineHeight:1.55, marginBottom:14 }}>{stay.blurb}</div>
        <div style={{ display:'flex', gap:8 }}>
          {stay.thumbs.map((th,i) => (
            <div key={i} style={{ width:52, height:40, borderRadius:8, overflow:'hidden' }}>
              <ImgPlaceholder {...th} radius={0}/>
            </div>
          ))}
          <div style={{ width:52, height:40, borderRadius:8, background:'#F4F6FA', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:T.grey }}>+5</div>
        </div>
      </div>
    </div>
  );
}

function PackList({ items, isMobile }) {
  return (
    <Section title="What to Pack" isMobile={isMobile}>
      <div style={{ fontSize:12.5, color:T.grey, marginTop:-10, marginBottom:14 }}>Detailed checklist shared on WhatsApp after booking · <span style={{ color:T.greenDeep, fontWeight:700 }}>AUTO-CURATED FOR THIS ITINERARY</span></div>
      <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr 1fr':'repeat(4, 1fr)', gap:isMobile?10:14 }}>
        {items.map((it,i) => (
          <div key={i} style={{ background:'#F7F9FB', borderRadius:12, padding:'16px 14px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
              <Ico name={it.icon} size={14} color={T.greenDeep}/>
              <span style={{ fontSize:13, fontWeight:700, color:T.ink }}>{it.cat}</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
              {it.items.map((x,j) => <div key={j} style={{ fontSize:12, color:T.grey, lineHeight:1.45 }}>· {x}</div>)}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ExploreDeeper({ articleIds, onOpenArticle, isMobile }) {
  const arts = (articleIds||[]).map(id => TRAVELOGUES.find(a=>a.id===id)).filter(Boolean);
  if (!arts.length) return null;
  return (
    <Section title="Explore this destination deeper" isMobile={isMobile}>
      <div style={{ fontSize:11, fontWeight:800, color:T.greenDeep, letterSpacing:'.18em', marginTop:-10, marginBottom:14 }}>PLAN BETTER WITH LOCAL INSIGHTS</div>
      <div className={isMobile?'scroll-x':''} style={{ display:isMobile?'flex':'grid', gridTemplateColumns:isMobile?undefined:'repeat(3, 1fr)', gap:14, overflowX:isMobile?'auto':'visible', margin:isMobile?'0 -16px':0, padding:isMobile?'0 16px':0 }}>
        {arts.map(a => (
          <div key={a.id} onClick={()=>onOpenArticle && onOpenArticle(a.id)} className={isMobile?'snap':''} style={{ border:`1px solid ${T.greyLight}`, borderRadius:12, overflow:'hidden', cursor:'pointer', background:'#fff', minWidth:isMobile?220:'auto', flexShrink:0 }}>
            <div style={{ height:110, position:'relative' }}>
              <ImgPlaceholder {...a.hero} radius={0}/>
            </div>
            <div style={{ padding:'10px 12px 12px' }}>
              <div style={{ fontSize:13, fontWeight:700, color:T.ink, lineHeight:1.3, marginBottom:4, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{a.title.split(':')[0]}</div>
              <div style={{ fontSize:11, color:T.grey }}>Read {a.readMin} min</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function AfterYouBook({ isMobile }) {
  const items = [
    { icon:'whatsapp', title:'Instant WhatsApp confirmation', body:'Receive digital vouchers and trip overview within minutes.' },
    { icon:'users', title:'Trip group created before departure', body:'Meet your curator and fellow travelers in a private, secure group.' },
    { icon:'phone', title:'24/7 travel support', body:"Concierge help for anything you need on the ground." },
  ];
  return (
    <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.greyLight}`, padding:isMobile?'22px 16px':'28px 24px' }}>
      <div style={{ textAlign:'center', marginBottom:isMobile?16:22 }}>
        <div style={{ fontSize:11, fontWeight:800, color:T.greenDeep, letterSpacing:'.18em', marginBottom:6 }}>AFTER YOU BOOK</div>
        <h3 style={{ fontSize:isMobile?18:22, fontWeight:700, color:T.ink, margin:0, fontFamily:'Fraunces, serif', letterSpacing:'-.015em' }}>What happens next</h3>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'repeat(3, 1fr)', gap:isMobile?12:16 }}>
        {items.map((it,i) => (
          <div key={i} style={{ textAlign:'center', padding:'16px 12px' }}>
            <div style={{ width:44, height:44, borderRadius:'50%', background:'#E7F7EE', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 10px' }}>
              <Ico name={it.icon} size={18} color={T.greenDeep}/>
            </div>
            <div style={{ fontSize:14, fontWeight:700, color:T.ink, marginBottom:4 }}>{it.title}</div>
            <div style={{ fontSize:12.5, color:T.grey, lineHeight:1.5 }}>{it.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TripSnapshotCard({ rows, viewingNow }) {
  return (
    <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.greyLight}`, padding:18 }}>
      <div style={{ fontSize:11, fontWeight:800, color:T.ink, letterSpacing:'.16em', marginBottom:12 }}>TRIP SNAPSHOT</div>
      <div style={{ display:'flex', flexDirection:'column' }}>
        {rows.map((r,i) => (
          <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom: i<rows.length-1 ? `1px solid ${T.greyLight}` : 'none' }}>
            <span style={{ fontSize:12.5, color:T.grey }}>{r.label}</span>
            <span style={{ fontSize:12.5, color:T.ink, fontWeight:600 }}>{r.value}</span>
          </div>
        ))}
      </div>
      {viewingNow ? (
        <div style={{ marginTop:14, padding:'10px 12px', background:'#F7F9FB', borderRadius:10, display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ display:'flex' }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width:22, height:22, borderRadius:'50%', background:`hsl(${i*80+120}, 45%, 55%)`, border:'2px solid #fff', marginLeft: i===0?0:-6, fontSize:9, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700 }}>{['A','R','K'][i]}</div>
            ))}
          </div>
          <div style={{ fontSize:11.5, color:T.grey, lineHeight:1.4 }}><span style={{ fontWeight:700, color:T.ink }}>{viewingNow}</span> viewing this right now</div>
        </div>
      ) : null}
    </div>
  );
}

function HeroMetaPills({ trip }) {
  return (
    <div style={{ display:'flex', gap:10, marginTop:14, flexWrap:'wrap' }}>
      <span style={{ background:'rgba(255,255,255,.95)', color:T.ink, padding:'6px 12px', borderRadius:999, fontSize:12, fontWeight:700, display:'inline-flex', alignItems:'center', gap:6 }}>
        <Ico name="star" size={12} color={T.amber}/> {trip.rating} <span style={{ color:T.grey, fontWeight:500 }}>· {trip.ratingCount} reviews</span>
      </span>
      <span style={{ background:'rgba(14,30,50,.38)', backdropFilter:'blur(6px)', color:'#fff', border:'1px solid rgba(255,255,255,.28)', padding:'6px 12px', borderRadius:999, fontSize:12, fontWeight:600 }}>
        {trip.bookingsCount}+ booked
      </span>
      <span style={{ background:'rgba(14,30,50,.38)', backdropFilter:'blur(6px)', color:'#fff', border:'1px solid rgba(255,255,255,.28)', padding:'6px 12px', borderRadius:999, fontSize:12, fontWeight:600, display:'inline-flex', alignItems:'center', gap:6 }}>
        <span style={{ width:7, height:7, borderRadius:'50%', background:T.fire, display:'inline-block' }}/> {trip.spotsLeft} of {trip.spotsTotal} spots left
      </span>
    </div>
  );
}

function CancellationPolicyCard({ rows }) {
  return (
    <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.greyLight}`, padding:22 }}>
      <h3 style={{ fontSize:18, fontWeight:700, color:T.rose, margin:'0 0 14px', fontFamily:'Fraunces, serif', letterSpacing:'-.01em' }}>Cancellation Policy</h3>
      <div>
        {rows.map((r,i) => (
          <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'12px 0', borderBottom: i<rows.length-1 ? `1px solid ${T.greyLight}` : 'none' }}>
            <span style={{ fontSize:13, color:T.inkSoft }}>{r.when}</span>
            <span style={{ fontSize:13, color:r.tone, fontWeight:700 }}>{r.refund}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IncludedCompact({ inclusions }) {
  return (
    <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.greyLight}`, padding:22 }}>
      <h3 style={{ fontSize:18, fontWeight:700, color:T.ink, margin:'0 0 14px', fontFamily:'Fraunces, serif', letterSpacing:'-.01em' }}>What's Included</h3>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {inclusions.slice(0,5).map((i,idx) => (
          <div key={idx} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
            <div style={{ width:18, height:18, borderRadius:'50%', background:'#E7F7EE', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
              <Ico name="check" size={10} color={T.greenDeep} stroke={3}/>
            </div>
            <div>
              <div style={{ fontSize:13.5, fontWeight:600, color:T.ink, lineHeight:1.3 }}>{i.split('(')[0].trim()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { TrustStrip, AvailableDepartures, SignatureStay, PackList, ExploreDeeper, AfterYouBook, TripSnapshotCard, HeroMetaPills, CancellationPolicyCard, IncludedCompact });
