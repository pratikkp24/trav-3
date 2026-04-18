function BookingDetail({ bookingId, onBack, onInvoice }) {
  const stored = getBookings();
  const pending = getPendingBooking();
  const b = stored.find(x=>x.id===bookingId) || (pending?.id===bookingId?pending:null) || USER_BOOKINGS.find(x=>x.id===bookingId) || USER_BOOKINGS[0];
  const t = (b.trip?.id === 'trip-nainital' && typeof NAINITAL_TRIP !== 'undefined') ? NAINITAL_TRIP : RISHIKESH_TRIP;
  const [copied, setCopied] = React.useState(false);
  const [modal, setModal] = React.useState(null);
  const copy = () => { navigator.clipboard?.writeText(b.id); setCopied(true); setTimeout(()=>setCopied(false), 1400); };
  const isUp = b.status==='upcoming';
  const total = b.paid + b.balance;
  const th = personaTheme(b.persona);
  const isSolo = b.persona==='soloFemale';
  const isCorp = b.persona==='corporate';
  const isMobile = useIsMobile();
  return (
    <div style={{ background:'#F4F6FA', minHeight:'calc(100vh - 64px)', paddingBottom:60 }}>
      <div style={{ background:isSolo?`linear-gradient(135deg, #2a1218, ${T.ink})`:isCorp?`linear-gradient(135deg, ${T.ink}, #1a2230)`:T.ink, color:'#fff', padding:isMobile?'20px 16px':'24px 36px', borderBottom:isSolo?`3px solid ${T.rose}`:'none' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div onClick={onBack} style={{ display:'inline-flex', alignItems:'center', gap:6, cursor:'pointer', color:'rgba(255,255,255,.75)', fontSize:13, fontWeight:500, marginBottom:14 }}>
            <Ico name="arrow-left" size={13} color="rgba(255,255,255,.75)"/>{isMobile?'Back':'Back to My bookings'}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
            <span style={{ background:isUp?'#F0FAF4':'#FBEFE7', color:isUp?T.greenDeep:T.rose, padding:'4px 12px', borderRadius:999, fontSize:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' }}>{isUp?'Confirmed':b.status}</span>
            {th.label && <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(255,255,255,.12)', color:'#fff', padding:'4px 10px 4px 8px', borderRadius:999, fontSize:10.5, fontWeight:700, letterSpacing:'.08em', border:`1px solid ${isSolo?T.rose:'rgba(255,255,255,.18)'}` }}>
              <Ico name={isSolo?'rose':isCorp?'briefcase':'spark'} size={11} color={isSolo?T.rose:'#fff'}/> {th.label.toUpperCase()}
            </span>}
            <span onClick={copy} title="Copy" style={{ fontSize:12, color:'rgba(255,255,255,.65)', fontFamily:'ui-monospace, Menlo, monospace', cursor:'pointer', display:'inline-flex', alignItems:'center', gap:6 }}>
              {b.id} <Ico name={copied?'check':'copy'} size={12} color="rgba(255,255,255,.6)"/>
            </span>
          </div>
          <h1 style={{ fontSize:isMobile?32:40, fontWeight:800, letterSpacing:'-.025em', margin:'10px 0 4px', fontFamily:'Fraunces, serif' }}>{b.trip.dest}</h1>
          <div style={{ fontSize:14, color:'rgba(255,255,255,.75)', lineHeight:1.5 }}>{b.trip.dates} · {b.guests} travelers · Led by {b.trip.creator}</div>
        </div>
      </div>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:isMobile?'20px 16px 0':'28px 36px 0', display:'grid', gridTemplateColumns:isMobile?'1fr':'1.6fr 1fr', gap:24 }}>
        <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
          {isUp && <CountdownCard days={b.departsIn} theme={th} persona={b.persona}/>}
          {isSolo && isUp && <SoloFemaleAssuranceCard/>}
          {isCorp && isUp && <CorporateAssuranceCard/>}
          <ItineraryCard trip={t}/>
          <InclusionsCard trip={t}/>
          <PickupCard trip={t}/>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:18, position:isMobile?'static':'sticky', top:88, alignSelf:'start' }}>
          <PaymentCard b={b} total={total} onInvoice={onInvoice} onCancel={()=>setModal('cancel')} theme={th}/>
          <TripLeadCard persona={b.persona}/>
          <HelpCard isUp={isUp} onReschedule={()=>setModal('reschedule')} onModify={()=>setModal('modify')} onCallback={()=>setModal('callback')} onReview={()=>setModal('review')} status={b.status}/>
        </div>
      </div>
      {modal==='cancel' && <CancelTripModal b={b} total={total} onClose={()=>setModal(null)}/>}
      {modal==='reschedule' && <RescheduleModal b={b} onClose={()=>setModal(null)}/>}
      {modal==='modify' && <ModifyTravelersModal b={b} onClose={()=>setModal(null)}/>}
      {modal==='callback' && <RequestCallbackModal onClose={()=>setModal(null)}/>}
      {modal==='review' && <WriteReviewModal b={b} onClose={()=>setModal(null)}/>}
    </div>
  );
}

function CountdownCard({ days, theme, persona }) {
  const th = theme || personaTheme(persona);
  return (
    <div style={{ background:`linear-gradient(135deg, ${th.soft}, #FAFBFC)`, border:`1px solid ${th.ring}`, borderRadius:14, padding:20, display:'flex', alignItems:'center', gap:16 }}>
      <div style={{ width:56, height:56, borderRadius:14, background:th.primary, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff' }}>
        <Ico name="calendar" size={24} color="#fff"/>
      </div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:11, color:th.deep, letterSpacing:'.12em', fontWeight:700, textTransform:'uppercase' }}>Your trip is live</div>
        <div style={{ fontSize:22, fontWeight:800, color:T.ink, fontFamily:'Fraunces, serif', letterSpacing:'-.02em', marginTop:2 }}>{days} days to departure</div>
      </div>
      <Btn kind="dark" size="sm" icon="whatsapp">Group</Btn>
    </div>
  );
}

function SoloFemaleAssuranceCard() {
  const items = [
    { icon:'shield', label:'Verified safe stays', body:'All stays vetted by the trav.her safety team' },
    { icon:'users',  label:'Female trip lead',     body:'Tanya has led 42 women-only cohorts' },
    { icon:'phone',  label:'24/7 SOS line',        body:'One-tap connection to local police + concierge' },
  ];
  return (
    <div style={{ background:`linear-gradient(135deg, ${T.roseCream}, #fff)`, border:`1px solid ${T.rose}33`, borderRadius:14, padding:20 }}>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
        <Ico name="rose" size={18}/>
        <div style={{ fontSize:11, color:T.rose, letterSpacing:'.12em', fontWeight:800 }}>TRAV.HER PROTECTIONS · ACTIVE</div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'repeat(3, 1fr)', gap:10 }}>
        {items.map(it => (
          <div key={it.label} style={{ background:'#fff', borderRadius:10, padding:'12px 12px 11px', border:`1px solid ${T.rose}22` }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
              <Ico name={it.icon} size={13} color={T.rose}/>
              <div style={{ fontSize:11.5, fontWeight:700, color:T.ink }}>{it.label}</div>
            </div>
            <div style={{ fontSize:11, color:T.grey, lineHeight:1.45 }}>{it.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CorporateAssuranceCard() {
  const items = [
    { icon:'briefcase', label:'GST invoice ready', body:'Auto-emailed to your finance lead' },
    { icon:'users',     label:'Split billing',      body:'Each traveler gets their own statement' },
    { icon:'spark',     label:'Off-site mode',      body:'Quiet hours respected · WiFi at every stay' },
  ];
  return (
    <div style={{ background:'#F1F4F8', border:`1px solid ${T.ink}22`, borderRadius:14, padding:20 }}>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
        <Ico name="briefcase" size={16} color={T.ink}/>
        <div style={{ fontSize:11, color:T.ink, letterSpacing:'.12em', fontWeight:800 }}>CORPORATE OFF-SITE · ACTIVE</div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'repeat(3, 1fr)', gap:10 }}>
        {items.map(it => (
          <div key={it.label} style={{ background:'#fff', borderRadius:10, padding:'12px 12px 11px', border:`1px solid ${T.greyLight}` }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
              <Ico name={it.icon} size={13} color={T.ink}/>
              <div style={{ fontSize:11.5, fontWeight:700, color:T.ink }}>{it.label}</div>
            </div>
            <div style={{ fontSize:11, color:T.grey, lineHeight:1.45 }}>{it.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ItineraryCard({ trip }) {
  const [open, setOpen] = React.useState(0);
  return (
    <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.greyLight}`, overflow:'hidden' }}>
      <div style={{ padding:'18px 22px', borderBottom:`1px solid ${T.greyLight}`, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <h3 style={{ fontSize:18, fontWeight:700, color:T.ink, letterSpacing:'-.015em', margin:0, fontFamily:'Fraunces, serif' }}>Itinerary</h3>
          <div style={{ fontSize:12, color:T.grey, marginTop:2 }}>Day-by-day breakdown</div>
        </div>
        <span style={{ fontSize:11, color:T.grey, fontWeight:600 }}>Confirmed · mailed</span>
      </div>
      {trip.itinerary.map((d,i) => {
        const o = open===i;
        return (
          <div key={d.day} style={{ borderBottom:i===trip.itinerary.length-1?'none':`1px solid ${T.greyLight}` }}>
            <div onClick={()=>setOpen(o?-1:i)} style={{ padding:'16px 22px', cursor:'pointer', display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ width:44, height:44, borderRadius:10, background:o?T.ink:'#F4F6FA', color:o?'#fff':T.ink, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <div style={{ fontSize:9, fontWeight:700, letterSpacing:'.1em', opacity:.7 }}>DAY</div>
                <div style={{ fontSize:16, fontWeight:800, lineHeight:1 }}>{i+1}</div>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14.5, fontWeight:700, color:T.ink }}>{d.title}</div>
                <div style={{ fontSize:12, color:T.grey, marginTop:2 }}>{d.date} · {d.blocks.length} stops</div>
              </div>
              <Ico name="chevron-down" size={14} color={T.grey}/>
            </div>
            {o && (
              <div style={{ padding:'0 22px 18px 72px' }}>
                {d.blocks.map((blk,j)=>(
                  <div key={j} style={{ display:'grid', gridTemplateColumns:'74px 1fr', gap:12, paddingBottom:12, position:'relative' }}>
                    <div style={{ fontSize:11.5, fontWeight:700, color:T.greenDeep, paddingTop:2 }}>{blk.time}</div>
                    <div style={{ borderLeft:`1.5px dashed ${T.greyLight}`, paddingLeft:14, paddingBottom:6 }}>
                      <div style={{ fontSize:13.5, fontWeight:700, color:T.ink }}>{blk.title}</div>
                      <div style={{ fontSize:12.5, color:T.grey, marginTop:2, lineHeight:1.5 }}>{blk.body}</div>
                      
                      {/* Post-booking Upgrades */}
                      {/pickup/i.test(blk.title) && (
                        <div style={{ marginTop:12, padding:'12px', background:'#F4F6FA', borderRadius:10, border:`1px solid ${T.greyLight}`, display:'flex', alignItems:'center', gap:12 }}>
                          <div style={{ width:32, height:32, borderRadius:8, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', border:`1px solid ${T.greyLight}` }}>
                            <Ico name="map-pin" size={14} color={T.ink}/>
                          </div>
                          <div style={{ flex:1 }}>
                            <div style={{ fontSize:12.5, fontWeight:700, color:T.ink }}>Gate No. 2, Akshardham Metro</div>
                            <div style={{ fontSize:11.5, color:T.grey, marginTop:2 }}>Trip Lead Tanya will be holding a 'trav' placard.</div>
                          </div>
                          <Btn kind="outline" size="sm" icon="external-link">Map</Btn>
                        </div>
                      )}
                      
                      {/volvo/i.test(blk.title) && (
                        <div style={{ marginTop:12, padding:'12px', background:'#F0FAF4', borderRadius:10, border:`1px solid ${T.green}44`, display:'flex', alignItems:'center', gap:12 }}>
                          <div style={{ width:32, height:32, borderRadius:8, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', border:`1px solid ${T.green}44` }}>
                            <Ico name="ticket" size={14} color={T.greenDeep}/>
                          </div>
                          <div style={{ flex:1 }}>
                            <div style={{ fontSize:12.5, fontWeight:800, color:T.greenDeep, letterSpacing:'-.01em' }}>PNR: YT-782910</div>
                            <div style={{ fontSize:11.5, color:T.greenDeep, marginTop:2, opacity:0.8 }}>Bus HR-38 AB 1120 · Seats {trip.id==='trip-rishikesh'?'12, 13':'8'}</div>
                          </div>
                          <Btn kind="ghost" size="sm" style={{ color:T.greenDeep }}>Get PDF</Btn>
                        </div>
                      )}

                      {/check-in/i.test(blk.title) && (
                        <div style={{ marginTop:12, padding:'12px', background:'#FFF7EA', borderRadius:10, border:`1px solid ${T.amber}44`, display:'flex', alignItems:'center', gap:12 }}>
                          <div style={{ width:32, height:32, borderRadius:8, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', border:`1px solid ${T.amber}44` }}>
                            <Ico name="home" size={14} color={T.amber}/>
                          </div>
                          <div style={{ flex:1 }}>
                            <div style={{ fontSize:12.5, fontWeight:700, color:T.ink }}>{trip.hotel?.name || 'Base Camp'} · Tent 4</div>
                            <div style={{ fontSize:11.5, color:T.grey, marginTop:2 }}>Camp Manager: Sanjay (+91 99882 11223)</div>
                          </div>
                          <Btn kind="outline" size="sm" icon="phone">Call</Btn>
                        </div>
                      )}

                      {/rafting/i.test(blk.title) && (
                        <div style={{ marginTop:12, padding:'12px', background:'#F4F6FA', borderRadius:10, border:`1px solid ${T.greyLight}`, display:'flex', alignItems:'center', gap:12 }}>
                          <div style={{ width:32, height:32, borderRadius:8, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', border:`1px solid ${T.greyLight}` }}>
                            <Ico name="shield" size={14} color={T.ink}/>
                          </div>
                          <div style={{ flex:1 }}>
                            <div style={{ fontSize:12.5, fontWeight:700, color:T.ink }}>Ganga Wave Riders (License #BR492)</div>
                            <div style={{ fontSize:11.5, color:T.grey, marginTop:2 }}>Waiver signed digitally · Equipment vetted</div>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function InclusionsCard({ trip }) {
  return (
    <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.greyLight}`, padding:22 }}>
      <h3 style={{ fontSize:18, fontWeight:700, color:T.ink, letterSpacing:'-.015em', margin:'0 0 14px', fontFamily:'Fraunces, serif' }}>What's included</h3>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px 20px' }}>
        {trip.inclusions.map(i => (
          <div key={i} style={{ display:'flex', gap:8, fontSize:13, color:T.ink, lineHeight:1.45 }}>
            <div style={{ width:18, height:18, borderRadius:'50%', background:'#F0FAF4', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
              <Ico name="check" size={10} color={T.greenDeep} stroke={3}/>
            </div>
            {i}
          </div>
        ))}
      </div>
    </div>
  );
}

function PickupCard({ trip }) {
  return (
    <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.greyLight}`, padding:22 }}>
      <h3 style={{ fontSize:18, fontWeight:700, color:T.ink, letterSpacing:'-.015em', margin:'0 0 14px', fontFamily:'Fraunces, serif' }}>Pickup & drop</h3>
      <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:14 }}>
        {[{t:'Pickup',v:trip.meetingPoint,c:T.greenDeep},{t:'Drop-off',v:trip.returnPoint,c:T.rose}].map(p => (
          <div key={p.t} style={{ border:`1px solid ${T.greyLight}`, borderRadius:12, padding:14 }}>
            <div style={{ fontSize:10.5, fontWeight:700, color:p.c, letterSpacing:'.12em' }}>{p.t.toUpperCase()}</div>
            <div style={{ fontSize:13, color:T.ink, marginTop:4, lineHeight:1.45, fontWeight:500 }}>{p.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PaymentCard({ b, total, onInvoice, onCancel, theme }) {
  const isUp = b.status==='upcoming';
  const isCanc = b.status==='cancelled';
  const th = theme || personaTheme(b.persona);
  return (
    <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${th.ring}`, padding:20, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:th.primary }}/>
      <h3 style={{ fontSize:15, fontWeight:700, color:T.ink, margin:'4px 0 14px', letterSpacing:'-.01em' }}>Payment</h3>
      <div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:13, marginBottom:12 }}>
        <div style={{ display:'flex', justifyContent:'space-between' }}><span style={{ color:T.grey }}>Trip total</span><span style={{ color:T.ink, fontWeight:600 }}>{inr(total)}</span></div>
        <div style={{ display:'flex', justifyContent:'space-between' }}><span style={{ color:T.grey }}>Paid (token)</span><span style={{ color:th.deep, fontWeight:700 }}>− {inr(b.paid)}</span></div>
        {isUp && b.balance>0 && <div style={{ display:'flex', justifyContent:'space-between', paddingTop:8, borderTop:`1px dashed ${T.greyLight}` }}><span style={{ color:T.ink, fontWeight:700 }}>Balance due</span><span style={{ color:T.ink, fontWeight:800 }}>{inr(b.balance)}</span></div>}
        {isCanc && b.refund>0 && <div style={{ display:'flex', justifyContent:'space-between', paddingTop:8, borderTop:`1px dashed ${T.greyLight}` }}><span style={{ color:T.rose, fontWeight:700 }}>Refunded</span><span style={{ color:T.rose, fontWeight:800 }}>{inr(b.refund)}</span></div>}
      </div>
      {isUp && b.balance>0 && (
        <div style={{ background:'#FFF7EA', border:`1px solid ${T.amber}55`, borderRadius:10, padding:12, fontSize:12, color:T.ink, marginBottom:12, lineHeight:1.5 }}>
          <b>Auto-charged {b.departsIn<=7?'in 24h':'7 days before departure'}</b> to your saved UPI. Or pay now.
        </div>
      )}
      {isCanc && (
        <div style={{ background:'#FBEFE7', border:`1px solid ${T.rose}33`, borderRadius:10, padding:12, fontSize:12, color:T.ink, marginBottom:12, lineHeight:1.5 }}>
          <b>Refund processed.</b> Hits your source account in 5–7 working days.
        </div>
      )}
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {isUp && b.balance>0 && <Btn kind="primary" size="lg" full trailing="arrow-right">Pay {inr(b.balance)} now</Btn>}
        <Btn kind="outline" size="lg" full icon="download" onClick={onInvoice}>Download invoice</Btn>
        {isUp && <Btn kind="ghost" size="sm" full onClick={onCancel}>Request cancellation</Btn>}
      </div>
    </div>
  );
}

function TripLeadCard({ persona }) {
  const isSolo = persona === 'soloFemale';
  return (
    <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.greyLight}`, padding:20 }}>
      <h3 style={{ fontSize:15, fontWeight:700, color:T.ink, margin:'0 0 14px', letterSpacing:'-.01em' }}>Your trip lead</h3>
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        <div style={{ width:52, height:52, borderRadius:'50%', background:'linear-gradient(135deg, #d6a8c0, #c78fa8)', position:'relative' }}>
          {isSolo && <div title="Verified female lead" style={{ position:'absolute', bottom:-2, right:-2, width:18, height:18, borderRadius:'50%', background:T.rose, border:'2px solid #fff', display:'flex', alignItems:'center', justifyContent:'center' }}><Ico name="check" size={9} color="#fff" stroke={3}/></div>}
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:14, fontWeight:700, color:T.ink, display:'flex', alignItems:'center', gap:6 }}>Tanya Gupta {isSolo && <span style={{ fontSize:9.5, fontWeight:800, color:T.rose, letterSpacing:'.1em', background:T.roseCream, padding:'2px 6px', borderRadius:4 }}>SHE/HER</span>}</div>
          <div style={{ fontSize:12, color:T.grey }}>@tanya_travels · 42 trips led</div>
        </div>
      </div>
      <div style={{ display:'flex', gap:8, marginTop:14 }}>
        <Btn kind="outline" size="sm" icon="whatsapp" full>Chat</Btn>
        <Btn kind="outline" size="sm" icon="phone" full>Call</Btn>
      </div>
    </div>
  );
}

function HelpCard({ isUp, status, onReschedule, onModify, onCallback, onReview }) {
  const items = isUp ? [
    { label:'Reschedule dates', icon:'refresh', onClick:onReschedule },
    { label:'Modify travelers', icon:'users',   onClick:onModify },
    { label:'Browse FAQs',      icon:'help-circle', onClick: () => window.openFaq && window.openFaq() },
    { label:'Request callback', icon:'phone',   onClick:onCallback },
  ] : status==='past' ? [
    { label:'Write a review',   icon:'star',    onClick:onReview },
    { label:'Re-book this trip',icon:'refresh', onClick:()=>{} },
    { label:'Browse FAQs',      icon:'help-circle', onClick: () => window.openFaq && window.openFaq() },
    { label:'Request callback', icon:'phone',   onClick:onCallback },
  ] : [
    { label:'Re-book this trip',icon:'refresh', onClick:()=>{} },
    { label:'Browse FAQs',      icon:'help-circle', onClick: () => window.openFaq && window.openFaq() },
    { label:'Request callback', icon:'phone',   onClick:onCallback },
  ];
  return (
    <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.greyLight}`, padding:20 }}>
      <h3 style={{ fontSize:15, fontWeight:700, color:T.ink, margin:'0 0 4px', letterSpacing:'-.01em' }}>Need help?</h3>
      <div style={{ fontSize:12.5, color:T.grey, marginBottom:12 }}>24/7 support before and during your trip.</div>
      <div style={{ display:'flex', flexDirection:'column' }}>
        {items.map((it, i) => (
          <div key={it.label} onClick={it.onClick} style={{ display:'flex', alignItems:'center', gap:12, fontSize:13, color:T.ink, padding:'10px 0', borderBottom: i===items.length-1?'none':`1px dashed ${T.greyLight}`, cursor:'pointer' }}>
            <div style={{ width:30, height:30, borderRadius:8, background:'#F4F6FA', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Ico name={it.icon} size={14} color={T.greenDeep}/>
            </div>
            <span style={{ flex:1, fontWeight:500 }}>{it.label}</span>
            <Ico name="chevron-right" size={12} color={T.grey}/>
          </div>
        ))}
      </div>
    </div>
  );
}

function Invoice({ bookingId, onBack }) {
  const stored = getBookings();
  const pending = getPendingBooking();
  const b = stored.find(x=>x.id===bookingId) || (pending?.id===bookingId?pending:null) || USER_BOOKINGS.find(x=>x.id===bookingId) || USER_BOOKINGS[0];
  const t = (b.trip?.id === 'trip-nainital' && typeof NAINITAL_TRIP !== 'undefined') ? NAINITAL_TRIP : RISHIKESH_TRIP;
  const base = t.pricing.base * b.guests;
  const tax = t.pricing.tax * b.guests;
  const fee = t.pricing.convenience * b.guests;
  const total = base + tax + fee;
  const subtotal = base + fee;
  const cgst = Math.round(tax/2), sgst = tax - cgst;
  const isMobile = useIsMobile();
  return (
    <div style={{ background:'#F4F6FA', minHeight:'calc(100vh - 64px)', padding:isMobile ? '20px 16px 60px' : '28px 36px 60px' }}>
      <style>{`@media print { body { background:#fff!important; } .no-print { display:none!important; } .invoice-sheet { box-shadow:none!important; border:none!important; margin:0!important; } }`}</style>
      <div style={{ maxWidth:860, margin:'0 auto' }}>
        <div className="no-print" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <Btn kind="ghost" size="sm" icon="arrow-left" onClick={onBack}>Back</Btn>
          <div style={{ display:'flex', gap:8 }}>
            <Btn kind="outline" size="sm" icon="send">Email invoice</Btn>
            <Btn kind="dark" size="sm" icon="download" onClick={()=>window.print()}>Download PDF</Btn>
          </div>
        </div>
        <div className="invoice-sheet" style={{ background:'#fff', borderRadius:8, border:`1px solid ${T.greyLight}`, boxShadow:'0 2px 12px rgba(0,0,0,.04)', padding:isMobile?20:48 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', paddingBottom:24, borderBottom:`2px solid ${T.ink}` }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:4, marginBottom:12 }}>
                <span style={{ fontSize:28, fontWeight:800, color:T.greenDark, letterSpacing:'-.03em', fontFamily:'Fraunces, serif' }}>trav</span>
                <span style={{ width:7, height:7, background:T.green, borderRadius:2, marginBottom:7 }}/>
              </div>
              <div style={{ fontSize:11.5, color:T.grey, lineHeight:1.5 }}>trav.guide Pvt Ltd<br/>A-201, Cyber Hub, Gurgaon 122002<br/>GSTIN: 06AABCT1234Q1Z5 · CIN: U63040HR2024PTC</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:32, fontWeight:800, color:T.ink, letterSpacing:'-.03em', fontFamily:'Fraunces, serif' }}>TAX INVOICE</div>
              <div style={{ fontSize:11, color:T.grey, marginTop:6 }}>Invoice #: INV-{b.id.slice(-6)}</div>
              <div style={{ fontSize:11, color:T.grey }}>Issue date: 14 May 2026</div>
              <div style={{ fontSize:11, color:T.grey }}>Booking ID: {b.id}</div>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:32, padding:'24px 0', borderBottom:`1px solid ${T.greyLight}` }}>
            <div>
              <div style={{ fontSize:10.5, fontWeight:700, color:T.grey, letterSpacing:'.12em', marginBottom:6 }}>BILLED TO</div>
              <div style={{ fontSize:13.5, color:T.ink, fontWeight:700 }}>Aditi Rao</div>
              <div style={{ fontSize:11.5, color:T.grey, lineHeight:1.55, marginTop:3 }}>aditi.r@mail.com<br/>+91 98•••••12<br/>New Delhi, 110001</div>
            </div>
            <div>
              <div style={{ fontSize:10.5, fontWeight:700, color:T.grey, letterSpacing:'.12em', marginBottom:6 }}>TRIP</div>
              <div style={{ fontSize:13.5, color:T.ink, fontWeight:700 }}>{b.trip.dest} · {t.tagline}</div>
              <div style={{ fontSize:11.5, color:T.grey, lineHeight:1.55, marginTop:3 }}>{b.trip.dates}<br/>{b.guests} travelers · twin sharing<br/>Trip lead: {b.trip.creator}</div>
            </div>
          </div>
          <table style={{ width:'100%', borderCollapse:'collapse', margin:'24px 0' }}>
            <thead>
              <tr style={{ background:'#FAFBFC' }}>
                <th style={thCell}>Description</th>
                <th style={{...thCell, textAlign:'center', width:70 }}>Qty</th>
                <th style={{...thCell, textAlign:'right', width:110 }}>Rate</th>
                <th style={{...thCell, textAlign:'right', width:110 }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdCell}><div style={{ fontWeight:600, color:T.ink }}>Weekend trip · {b.trip.dest}</div><div style={{ fontSize:11, color:T.grey, marginTop:2 }}>HSN 998555 · Tour operator services</div></td>
                <td style={{...tdCell, textAlign:'center' }}>{b.guests}</td>
                <td style={{...tdCell, textAlign:'right' }}>{inr(t.pricing.base)}</td>
                <td style={{...tdCell, textAlign:'right', fontWeight:600 }}>{inr(base)}</td>
              </tr>
              <tr>
                <td style={tdCell}><div style={{ fontWeight:600, color:T.ink }}>Convenience fee</div></td>
                <td style={{...tdCell, textAlign:'center' }}>{b.guests}</td>
                <td style={{...tdCell, textAlign:'right' }}>{inr(t.pricing.convenience)}</td>
                <td style={{...tdCell, textAlign:'right', fontWeight:600 }}>{inr(fee)}</td>
              </tr>
            </tbody>
          </table>
          <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:24 }}>
            <div style={{ width:320 }}>
              <div style={totRow}><span>Subtotal</span><span>{inr(subtotal)}</span></div>
              <div style={totRow}><span>CGST @ 2.5%</span><span>{inr(cgst)}</span></div>
              <div style={totRow}><span>SGST @ 2.5%</span><span>{inr(sgst)}</span></div>
              <div style={{ ...totRow, borderTop:`2px solid ${T.ink}`, paddingTop:12, marginTop:6 }}>
                <span style={{ fontSize:13, fontWeight:800, color:T.ink }}>TOTAL (INR)</span>
                <span style={{ fontSize:20, fontWeight:800, color:T.ink, letterSpacing:'-.01em' }}>{inr(total)}</span>
              </div>
              <div style={{ ...totRow, marginTop:6, color:T.greenDeep, fontWeight:700 }}><span>Paid via {b.paid>0?'UPI':'—'}</span><span>− {inr(b.paid)}</span></div>
              {b.balance>0 && <div style={{ ...totRow, color:T.rose, fontWeight:700 }}><span>Balance due</span><span>{inr(b.balance)}</span></div>}
            </div>
          </div>
          <div style={{ padding:'18px 20px', background:'#FAFBFC', borderRadius:8, border:`1px solid ${T.greyLight}`, fontSize:11, color:T.grey, lineHeight:1.6 }}>
            <b style={{ color:T.ink }}>Terms:</b> GST computed under the place of supply of tour operator services. This is a computer-generated invoice and does not require a signature. For refunds, see cancellation policy at trav.guide/policy.
          </div>
          <div style={{ marginTop:32, textAlign:'center', fontSize:11, color:T.grey }}>Thank you for travelling with trav. ✨</div>
        </div>
      </div>
    </div>
  );
}

const thCell = { padding:'10px 12px', textAlign:'left', fontSize:10.5, fontWeight:700, color:T.grey, letterSpacing:'.1em', borderBottom:`1px solid ${T.greyLight}`, textTransform:'uppercase' };
const tdCell = { padding:'12px', fontSize:13, color:T.ink, borderBottom:`1px solid ${T.greyLight}`, verticalAlign:'top' };
const totRow = { display:'flex', justifyContent:'space-between', fontSize:12.5, color:T.ink, padding:'4px 0' };

/* ============================================================
   Modal shell — shared by all flow modals
   ============================================================ */
function FlowModal({ onClose, title, subtitle, icon, iconTone='ink', children, footer, maxWidth=460 }) {
  React.useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose && onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);
  const tones = { ink:{bg:'#F4F6FA',fg:T.ink}, green:{bg:'#F0FAF4',fg:T.greenDeep}, rose:{bg:T.roseCream,fg:T.rose}, amber:{bg:'#FFF5D6',fg:'#a37a1a'} };
  const tn = tones[iconTone] || tones.ink;
  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(10,15,22,.55)', backdropFilter:'blur(4px)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:'#fff', borderRadius:18, width:'100%', maxWidth, maxHeight:'92vh', display:'flex', flexDirection:'column', boxShadow:'0 24px 60px rgba(0,0,0,.25)', overflow:'hidden' }}>
        <div style={{ padding:'20px 22px 16px', borderBottom:`1px solid ${T.greyLight}`, display:'flex', alignItems:'flex-start', gap:12 }}>
          {icon && (
            <div style={{ width:38, height:38, borderRadius:10, background:tn.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Ico name={icon} size={17} color={tn.fg}/>
            </div>
          )}
          <div style={{ flex:1, minWidth:0 }}>
            <h3 style={{ fontFamily:'Fraunces, serif', fontSize:19, fontWeight:700, color:T.ink, margin:0, letterSpacing:'-.02em', lineHeight:1.2 }}>{title}</h3>
            {subtitle && <div style={{ fontSize:12.5, color:T.grey, marginTop:3, lineHeight:1.45 }}>{subtitle}</div>}
          </div>
          <button onClick={onClose} aria-label="Close" style={{ background:'#F4F6FA', border:'none', width:30, height:30, borderRadius:'50%', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <Ico name="x" size={14} color={T.ink}/>
          </button>
        </div>
        <div style={{ padding:'20px 22px', overflowY:'auto', flex:1 }}>{children}</div>
        {footer && <div style={{ padding:'14px 18px', borderTop:`1px solid ${T.greyLight}`, background:'#FAFBFC' }}>{footer}</div>}
      </div>
    </div>
  );
}

function StepDots({ count, active }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:18 }}>
      {Array.from({length:count}).map((_,i) => (
        <span key={i} style={{ height:4, flex:1, borderRadius:999, background: i<=active ? T.greenDeep : T.greyLight, transition:'background .2s' }}/>
      ))}
    </div>
  );
}

/* ============================================================
   1. CancelTripModal — reason → refund preview → confirm → done
   ============================================================ */
function CancelTripModal({ b, total, onClose }) {
  const [step, setStep] = React.useState(0);
  const [reason, setReason] = React.useState(null);
  const [reasonNote, setReasonNote] = React.useState('');
  const reasons = [
    { id:'plans',   icon:'calendar', label:'Plans changed',     sub:"Work, family, or schedule shifted" },
    { id:'cost',    icon:'star',     label:'Cost concerns',     sub:"Budget changed or want to defer" },
    { id:'weather', icon:'alert',    label:'Weather worry',     sub:'Forecast looks rough for the dates' },
    { id:'group',   icon:'users',    label:'Group changed',     sub:'Co-traveler dropped or count shifted' },
    { id:'other',   icon:'edit',     label:'Something else',    sub:"You'll tell us in one line" },
  ];
  const tier = (() => {
    const d = b.departsIn ?? 0;
    if (d >= 15) return CANCELLATION_TIERS[0];
    if (d >= 7)  return CANCELLATION_TIERS[1];
    if (d >= 3)  return CANCELLATION_TIERS[2];
    return CANCELLATION_TIERS[3];
  })();
  const refund = Math.round(b.paid * tier.refund);
  const fee = b.paid - refund;

  if (step === 3) {
    return (
      <FlowModal onClose={onClose} title="Cancellation requested" subtitle="We've started your refund — no further action needed." icon="check" iconTone="green">
        <div style={{ background:'#F0FAF4', border:`1px solid ${T.green}33`, borderRadius:12, padding:18, marginBottom:14 }}>
          <div style={{ fontSize:11, color:T.greenDeep, letterSpacing:'.12em', fontWeight:800 }}>REFUND IN PROGRESS</div>
          <div style={{ fontSize:28, fontWeight:800, color:T.ink, fontFamily:'Fraunces, serif', letterSpacing:'-.02em', marginTop:4 }}>{inr(refund)}</div>
          <div style={{ fontSize:12.5, color:T.grey, marginTop:4 }}>Hits your source account in 5–7 working days.</div>
        </div>
        <div style={{ fontSize:13, color:T.inkSoft, lineHeight:1.6, marginBottom:8 }}>
          You'll get a confirmation on WhatsApp + email. Your spot just opened up — someone on the waitlist will love it.
        </div>
        <div style={{ background:'#FAFBFC', borderRadius:10, padding:'12px 14px', fontSize:12, color:T.grey, lineHeight:1.5 }}>
          Reference · <span style={{ fontFamily:'ui-monospace, Menlo, monospace', color:T.ink }}>CXL-{b.id.slice(-6)}</span>
        </div>
        <div style={{ marginTop:18, display:'flex', justifyContent:'flex-end' }}>
          <Btn kind="dark" size="md" onClick={onClose}>Got it</Btn>
        </div>
      </FlowModal>
    );
  }

  return (
    <FlowModal onClose={onClose} title={step===0?'Cancel this trip?':step===1?'Here\'s your refund':'One last check'} subtitle={`${b.trip.dest} · ${b.trip.dates}`} icon="alert" iconTone="rose" maxWidth={500}
      footer={
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:10 }}>
          {step>0 ? <Btn kind="ghost" size="sm" icon="arrow-left" onClick={()=>setStep(step-1)}>Back</Btn> : <button onClick={onClose} style={{ background:'transparent', border:'none', color:T.grey, fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>Keep my booking</button>}
          {step===0 && <Btn kind="dark" size="md" trailing="arrow-right" onClick={()=>reason && setStep(1)}>{reason?'Continue':'Pick a reason'}</Btn>}
          {step===1 && <Btn kind="dark" size="md" trailing="arrow-right" onClick={()=>setStep(2)}>Looks fair</Btn>}
          {step===2 && <Btn kind="primary" size="md" onClick={()=>setStep(3)} style={{ background:T.rose }}>Cancel for {inr(refund)} refund</Btn>}
        </div>
      }>
      <StepDots count={3} active={step}/>
      {step===0 && (
        <>
          <div style={{ fontSize:13, color:T.inkSoft, marginBottom:12, lineHeight:1.5 }}>Tell us what's pushing this — helps us improve. No judgment.</div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {reasons.map(r => {
              const a = reason===r.id;
              return (
                <div key={r.id} onClick={()=>setReason(r.id)} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', borderRadius:11, border:`1.5px solid ${a?T.ink:T.greyLight}`, background:a?'#FAFBFC':'#fff', cursor:'pointer', transition:'all .15s' }}>
                  <div style={{ width:34, height:34, borderRadius:9, background:a?T.ink:'#F4F6FA', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Ico name={r.icon} size={15} color={a?'#fff':T.grey}/>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13.5, fontWeight:700, color:T.ink }}>{r.label}</div>
                    <div style={{ fontSize:11.5, color:T.grey, marginTop:1 }}>{r.sub}</div>
                  </div>
                  {a && <Ico name="check" size={14} color={T.greenDeep} stroke={3}/>}
                </div>
              );
            })}
          </div>
          {reason==='other' && (
            <input value={reasonNote} onChange={e=>setReasonNote(e.target.value)} placeholder="One line is enough…" style={{ width:'100%', height:42, marginTop:12, borderRadius:10, border:`1px solid ${T.greyLight}`, padding:'0 14px', fontSize:13, fontFamily:'inherit', outline:'none' }}/>
          )}
        </>
      )}
      {step===1 && (
        <>
          <div style={{ background:'#FAFBFC', borderRadius:12, border:`1px solid ${T.greyLight}`, padding:16, marginBottom:14 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
              <div style={{ fontSize:11, color:T.grey, letterSpacing:'.12em', fontWeight:800 }}>YOU'RE IN THIS WINDOW</div>
              <span style={{ fontSize:10.5, fontWeight:800, color:T.greenDeep, background:'#F0FAF4', padding:'3px 9px', borderRadius:999, letterSpacing:'.08em' }}>{tier.window.toUpperCase()}</span>
            </div>
            <div style={{ fontSize:13.5, color:T.inkSoft, lineHeight:1.55 }}>{tier.note}</div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:10, fontSize:13.5, marginBottom:14 }}>
            <div style={{ display:'flex', justifyContent:'space-between' }}><span style={{ color:T.grey }}>You paid</span><span style={{ color:T.ink, fontWeight:600 }}>{inr(b.paid)}</span></div>
            <div style={{ display:'flex', justifyContent:'space-between' }}><span style={{ color:T.grey }}>Cancellation fee</span><span style={{ color:T.rose, fontWeight:600 }}>− {inr(fee)}</span></div>
            <div style={{ display:'flex', justifyContent:'space-between', paddingTop:10, borderTop:`1.5px solid ${T.greyLight}` }}>
              <span style={{ color:T.ink, fontWeight:800, fontSize:14 }}>You'll get back</span>
              <span style={{ color:T.greenDeep, fontWeight:800, fontSize:18, fontFamily:'Fraunces, serif' }}>{inr(refund)}</span>
            </div>
          </div>
          <div style={{ background:'#FFF7EA', borderRadius:10, padding:'10px 12px', fontSize:11.5, color:T.ink, lineHeight:1.5, border:`1px solid ${T.amber}33` }}>
            <b>Heads up:</b> if you'd rather move dates, rescheduling has zero fee until 7 days out.
          </div>
        </>
      )}
      {step===2 && (
        <>
          <div style={{ fontSize:14, color:T.ink, lineHeight:1.55, marginBottom:14 }}>
            You're cancelling <b>{b.trip.dest}</b> for <b>{b.guests}</b> {b.guests===1?'traveler':'travelers'} on <b>{b.trip.dates}</b>. We'll refund <b style={{ color:T.greenDeep }}>{inr(refund)}</b> to your source account.
          </div>
          <div style={{ background:T.roseCream, border:`1px solid ${T.rose}33`, borderRadius:11, padding:14, fontSize:12.5, color:T.ink, lineHeight:1.55 }}>
            <div style={{ fontSize:11, fontWeight:800, color:T.rose, letterSpacing:'.1em', marginBottom:6 }}>THIS CAN'T BE UNDONE</div>
            Your spot will be released. If you change your mind later you'll have to re-book at the current price.
          </div>
        </>
      )}
    </FlowModal>
  );
}

/* ============================================================
   2. RescheduleModal — pick new date → confirm → success
   ============================================================ */
function RescheduleModal({ b, onClose }) {
  const [step, setStep] = React.useState(0);
  const [pick, setPick] = React.useState(null);
  const options = [
    { id:'a', date:'Sat 25 Apr', sub:'Same trip · 12 spots open',   fee:0,    badge:'Recommended' },
    { id:'b', date:'Sat 2 May',  sub:'Same trip · 8 spots open',    fee:0 },
    { id:'c', date:'Sat 9 May',  sub:'Same trip · filling fast',    fee:0,    hot:true },
    { id:'d', date:'Sat 16 May', sub:'Same trip · just opened',     fee:500,  badge:'+₹500 fee · last-minute slot' },
  ];
  const sel = options.find(o=>o.id===pick);

  if (step === 2) {
    return (
      <FlowModal onClose={onClose} title="Trip rescheduled" subtitle={`Moved to ${sel.date}`} icon="check" iconTone="green">
        <div style={{ background:'#F0FAF4', border:`1px solid ${T.green}33`, borderRadius:12, padding:16, marginBottom:14 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:12, color:T.grey, marginBottom:6 }}>
            <span>OLD</span><span>NEW</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10 }}>
            <div style={{ flex:1, fontSize:13.5, fontWeight:700, color:T.grey, textDecoration:'line-through' }}>{b.trip.dates.split(' · ')[0]}</div>
            <Ico name="arrow-right" size={14} color={T.greenDeep}/>
            <div style={{ flex:1, textAlign:'right', fontSize:14, fontWeight:800, color:T.greenDeep, fontFamily:'Fraunces, serif' }}>{sel.date}</div>
          </div>
        </div>
        <div style={{ fontSize:13, color:T.inkSoft, lineHeight:1.55 }}>
          Your trip lead and group chat will be updated. Updated confirmation is on its way to your inbox.
        </div>
        <div style={{ marginTop:16, display:'flex', justifyContent:'flex-end' }}>
          <Btn kind="dark" size="md" onClick={onClose}>Done</Btn>
        </div>
      </FlowModal>
    );
  }

  return (
    <FlowModal onClose={onClose} title={step===0?'Pick a new date':'Confirm reschedule'} subtitle={`${b.trip.dest} · ${b.guests} traveler${b.guests===1?'':'s'}`} icon="refresh" iconTone="green" maxWidth={500}
      footer={
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          {step===0 ? <button onClick={onClose} style={{ background:'transparent', border:'none', color:T.grey, fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>Keep current dates</button> : <Btn kind="ghost" size="sm" icon="arrow-left" onClick={()=>setStep(0)}>Back</Btn>}
          {step===0 && <Btn kind="dark" size="md" trailing="arrow-right" onClick={()=>sel && setStep(1)}>{sel?'Continue':'Pick a date'}</Btn>}
          {step===1 && <Btn kind="primary" size="md" onClick={()=>setStep(2)}>Confirm move</Btn>}
        </div>
      }>
      <StepDots count={2} active={step}/>
      {step===0 && (
        <>
          <div style={{ fontSize:13, color:T.inkSoft, marginBottom:12, lineHeight:1.5 }}>Same trip, fresh dates. Zero fee until 7 days before departure.</div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {options.map(o => {
              const a = pick===o.id;
              return (
                <div key={o.id} onClick={()=>setPick(o.id)} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', borderRadius:11, border:`1.5px solid ${a?T.greenDeep:T.greyLight}`, background:a?'#F0FAF4':'#fff', cursor:'pointer' }}>
                  <div style={{ width:44, height:44, borderRadius:10, background:a?T.greenDeep:'#F4F6FA', color:a?'#fff':T.ink, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <div style={{ fontSize:9, fontWeight:700, letterSpacing:'.1em', opacity:.8 }}>{o.date.split(' ')[0].toUpperCase()}</div>
                    <div style={{ fontSize:14, fontWeight:800, lineHeight:1 }}>{o.date.split(' ')[1]}</div>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13.5, fontWeight:700, color:T.ink, display:'flex', alignItems:'center', gap:6 }}>
                      {o.date}
                      {o.hot && <span style={{ background:T.fire, color:'#fff', fontSize:9, fontWeight:800, padding:'2px 6px', borderRadius:4, letterSpacing:'.06em' }}>HOT</span>}
                    </div>
                    <div style={{ fontSize:11.5, color:T.grey, marginTop:1 }}>{o.sub}</div>
                  </div>
                  {o.fee>0 && <span style={{ fontSize:11, fontWeight:700, color:T.amber, background:'#FFF5D6', padding:'3px 8px', borderRadius:999 }}>+{inr(o.fee)}</span>}
                  {o.badge && o.fee===0 && <span style={{ fontSize:10, fontWeight:700, color:T.greenDeep, background:'#F0FAF4', padding:'3px 8px', borderRadius:999 }}>{o.badge}</span>}
                </div>
              );
            })}
          </div>
        </>
      )}
      {step===1 && sel && (
        <>
          <div style={{ background:'#FAFBFC', borderRadius:12, padding:16, marginBottom:14 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:11, color:T.grey, letterSpacing:'.12em', fontWeight:800, marginBottom:10 }}>
              <span>FROM</span><span>TO</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:14 }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:700, color:T.grey, textDecoration:'line-through' }}>{b.trip.dates.split(' · ')[0]}</div>
                <div style={{ fontSize:11, color:T.grey, marginTop:2 }}>Current</div>
              </div>
              <Ico name="arrow-right" size={16} color={T.greenDeep}/>
              <div style={{ flex:1, textAlign:'right' }}>
                <div style={{ fontSize:16, fontWeight:800, color:T.ink, fontFamily:'Fraunces, serif', letterSpacing:'-.02em' }}>{sel.date}</div>
                <div style={{ fontSize:11, color:T.greenDeep, marginTop:2, fontWeight:700 }}>New date</div>
              </div>
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:13, marginBottom:6 }}>
            <div style={{ display:'flex', justifyContent:'space-between' }}><span style={{ color:T.grey }}>Reschedule fee</span><span style={{ color:sel.fee>0?T.amber:T.greenDeep, fontWeight:700 }}>{sel.fee>0?inr(sel.fee):'Free'}</span></div>
            <div style={{ display:'flex', justifyContent:'space-between' }}><span style={{ color:T.grey }}>Token paid</span><span style={{ color:T.ink, fontWeight:600 }}>Stays on file</span></div>
          </div>
        </>
      )}
    </FlowModal>
  );
}

/* ============================================================
   3. ModifyTravelersModal — counter → confirm → success
   ============================================================ */
function ModifyTravelersModal({ b, onClose }) {
  const [count, setCount] = React.useState(b.guests);
  const [done, setDone] = React.useState(false);
  const t = RISHIKESH_TRIP;
  const perHead = t.pricing.base + t.pricing.tax + t.pricing.convenience;
  const newTotal = perHead * count;
  const oldTotal = perHead * b.guests;
  const diff = newTotal - oldTotal;
  const dec = () => setCount(c => Math.max(1, c-1));
  const inc = () => setCount(c => Math.min(8, c+1));
  if (done) {
    return (
      <FlowModal onClose={onClose} title="Travelers updated" subtitle={`${count} ${count===1?'traveler':'travelers'} on this trip`} icon="check" iconTone="green">
        <div style={{ background:'#F0FAF4', border:`1px solid ${T.green}33`, borderRadius:12, padding:16, marginBottom:14, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontSize:11, color:T.greenDeep, letterSpacing:'.1em', fontWeight:800 }}>NEW HEADCOUNT</div>
            <div style={{ fontSize:24, fontWeight:800, color:T.ink, fontFamily:'Fraunces, serif', marginTop:2 }}>{count} {count===1?'traveler':'travelers'}</div>
          </div>
          <div style={{ width:54, height:54, borderRadius:'50%', background:T.green, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, fontWeight:800, fontFamily:'Fraunces, serif' }}>{count}</div>
        </div>
        <div style={{ fontSize:13, color:T.inkSoft, lineHeight:1.55 }}>
          {diff>0 ? <>An additional <b>{inr(diff)}</b> will be auto-charged with your balance. New travelers get an onboarding email shortly.</> :
           diff<0 ? <>A refund of <b style={{ color:T.greenDeep }}>{inr(Math.abs(diff))}</b> will be processed in 5–7 working days.</> :
           <>Same headcount — nothing else to do.</>}
        </div>
        <div style={{ marginTop:18, display:'flex', justifyContent:'flex-end' }}>
          <Btn kind="dark" size="md" onClick={onClose}>Done</Btn>
        </div>
      </FlowModal>
    );
  }
  return (
    <FlowModal onClose={onClose} title="Modify travelers" subtitle={`${b.trip.dest} · currently ${b.guests}`} icon="users" iconTone="ink"
      footer={
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <button onClick={onClose} style={{ background:'transparent', border:'none', color:T.grey, fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>Cancel</button>
          <Btn kind="dark" size="md" onClick={()=>setDone(true)}>{count===b.guests?'No change':'Apply changes'}</Btn>
        </div>
      }>
      <div style={{ background:'#FAFBFC', borderRadius:14, padding:24, textAlign:'center', marginBottom:16 }}>
        <div style={{ fontSize:11, color:T.grey, letterSpacing:'.12em', fontWeight:800, marginBottom:14 }}>HOW MANY TRAVELERS?</div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:24 }}>
          <button onClick={dec} disabled={count<=1} style={{ width:46, height:46, borderRadius:'50%', background:count<=1?'#F4F6FA':'#fff', border:`1.5px solid ${T.greyLight}`, cursor:count<=1?'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', opacity:count<=1?.5:1 }}>
            <Ico name="minus" size={16} color={T.ink}/>
          </button>
          <div style={{ fontSize:48, fontWeight:800, color:T.ink, fontFamily:'Fraunces, serif', letterSpacing:'-.03em', minWidth:60 }}>{count}</div>
          <button onClick={inc} disabled={count>=8} style={{ width:46, height:46, borderRadius:'50%', background:count>=8?'#F4F6FA':'#fff', border:`1.5px solid ${T.greyLight}`, cursor:count>=8?'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', opacity:count>=8?.5:1 }}>
            <Ico name="plus" size={16} color={T.ink}/>
          </button>
        </div>
        <div style={{ fontSize:11.5, color:T.grey, marginTop:12 }}>Twin-sharing rooms · max 8 per cohort</div>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:13 }}>
        <div style={{ display:'flex', justifyContent:'space-between' }}><span style={{ color:T.grey }}>Per traveler</span><span style={{ color:T.ink, fontWeight:600 }}>{inr(perHead)}</span></div>
        <div style={{ display:'flex', justifyContent:'space-between' }}><span style={{ color:T.grey }}>New total</span><span style={{ color:T.ink, fontWeight:700 }}>{inr(newTotal)}</span></div>
        {diff!==0 && (
          <div style={{ display:'flex', justifyContent:'space-between', paddingTop:8, borderTop:`1px dashed ${T.greyLight}` }}>
            <span style={{ color:T.ink, fontWeight:700 }}>{diff>0?'Extra to pay':'To refund'}</span>
            <span style={{ color:diff>0?T.fire:T.greenDeep, fontWeight:800 }}>{diff>0?'+':'−'} {inr(Math.abs(diff))}</span>
          </div>
        )}
      </div>
    </FlowModal>
  );
}

/* ============================================================
   4. RequestCallbackModal — phone + slot → success
   ============================================================ */
function RequestCallbackModal({ onClose }) {
  const [phone, setPhone] = React.useState('98765 43210');
  const [slot, setSlot] = React.useState('now');
  const [done, setDone] = React.useState(false);
  const slots = [
    { id:'now',   label:'In 15 minutes',  sub:'A concierge picks up' },
    { id:'1h',    label:'In 1 hour',      sub:'Quick callback' },
    { id:'eve',   label:'After 6 PM',     sub:'Evening window' },
    { id:'tom',   label:'Tomorrow morning', sub:'9 – 11 AM' },
  ];
  if (done) {
    return (
      <FlowModal onClose={onClose} title="Callback locked in" subtitle={`We'll ring ${phone}`} icon="phone" iconTone="green">
        <div style={{ background:'#F0FAF4', border:`1px solid ${T.green}33`, borderRadius:12, padding:18, marginBottom:14, display:'flex', alignItems:'center', gap:14 }}>
          <div style={{ width:50, height:50, borderRadius:'50%', background:T.green, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Ico name="phone" size={20} color="#fff"/>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:11, color:T.greenDeep, letterSpacing:'.1em', fontWeight:800 }}>CALLING YOU</div>
            <div style={{ fontSize:18, fontWeight:800, color:T.ink, fontFamily:'Fraunces, serif', marginTop:2 }}>{slots.find(s=>s.id===slot).label}</div>
          </div>
        </div>
        <div style={{ fontSize:13, color:T.inkSoft, lineHeight:1.55 }}>
          Save the number <span style={{ fontFamily:'ui-monospace, Menlo, monospace', color:T.ink, fontWeight:700 }}>+91 9999 22 33 44</span> as <b>trav concierge</b> so it doesn't get flagged.
        </div>
        <div style={{ marginTop:16, display:'flex', justifyContent:'flex-end' }}>
          <Btn kind="dark" size="md" onClick={onClose}>Done</Btn>
        </div>
      </FlowModal>
    );
  }
  return (
    <FlowModal onClose={onClose} title="Talk to a human" subtitle="No bots, no menus — straight to a concierge" icon="phone" iconTone="green"
      footer={
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <button onClick={onClose} style={{ background:'transparent', border:'none', color:T.grey, fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>Maybe later</button>
          <Btn kind="primary" size="md" trailing="arrow-right" onClick={()=>setDone(true)}>Request callback</Btn>
        </div>
      }>
      <div style={{ marginBottom:18 }}>
        <div style={{ fontSize:11, color:T.grey, letterSpacing:'.12em', fontWeight:800, marginBottom:8 }}>CALL ME ON</div>
        <div style={{ display:'flex', gap:8 }}>
          <div style={{ height:46, padding:'0 14px', background:'#F4F6FA', borderRadius:10, display:'flex', alignItems:'center', fontSize:14, fontWeight:600, color:T.ink }}>+91</div>
          <input value={phone} onChange={e=>setPhone(e.target.value)} style={{ flex:1, height:46, borderRadius:10, border:`1px solid ${T.greyLight}`, padding:'0 14px', fontSize:14, fontFamily:'inherit', outline:'none' }}/>
        </div>
      </div>
      <div style={{ fontSize:11, color:T.grey, letterSpacing:'.12em', fontWeight:800, marginBottom:8 }}>WHEN?</div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
        {slots.map(s => {
          const a = slot===s.id;
          return (
            <div key={s.id} onClick={()=>setSlot(s.id)} style={{ padding:'12px 14px', borderRadius:11, border:`1.5px solid ${a?T.greenDeep:T.greyLight}`, background:a?'#F0FAF4':'#fff', cursor:'pointer' }}>
              <div style={{ fontSize:13, fontWeight:700, color:a?T.greenDeep:T.ink }}>{s.label}</div>
              <div style={{ fontSize:11, color:T.grey, marginTop:2 }}>{s.sub}</div>
            </div>
          );
        })}
      </div>
    </FlowModal>
  );
}

/* ============================================================
   5. WriteReviewModal — stars + text → success
   ============================================================ */
function WriteReviewModal({ b, onClose }) {
  const [stars, setStars] = React.useState(0);
  const [hover, setHover] = React.useState(0);
  const [highlight, setHighlight] = React.useState([]);
  const [text, setText] = React.useState('');
  const [done, setDone] = React.useState(false);
  const tags = ['Vibe', 'Trip lead', 'Stay', 'Food', 'Activities', 'Group'];
  const toggle = (t) => setHighlight(h => h.includes(t) ? h.filter(x=>x!==t) : [...h, t]);
  const captions = ['', 'Brutal', 'Meh', 'Good', 'Loved it', 'Life-changing'];
  if (done) {
    return (
      <FlowModal onClose={onClose} title="Review posted" subtitle="Thanks for keeping it real." icon="star" iconTone="amber">
        <div style={{ background:'#FFF5D6', border:`1px solid ${T.amber}55`, borderRadius:12, padding:18, marginBottom:14, textAlign:'center' }}>
          <div style={{ display:'inline-flex', gap:4, marginBottom:8 }}>
            {[1,2,3,4,5].map(i => <Ico key={i} name="star" size={22} color={i<=stars?T.amber:T.greyLight}/>)}
          </div>
          <div style={{ fontSize:14, color:T.ink, fontWeight:700, fontFamily:'Fraunces, serif', fontStyle:'italic' }}>"{text || captions[stars]}"</div>
        </div>
        <div style={{ fontSize:13, color:T.inkSoft, lineHeight:1.55 }}>
          We'll feature it on the trip page after a quick check. {stars>=4 && <>Want a referral link to share with your group? <span style={{ color:T.greenDeep, fontWeight:700, cursor:'pointer' }}>Generate one →</span></>}
        </div>
        <div style={{ marginTop:18, display:'flex', justifyContent:'flex-end' }}>
          <Btn kind="dark" size="md" onClick={onClose}>Done</Btn>
        </div>
      </FlowModal>
    );
  }
  return (
    <FlowModal onClose={onClose} title="How was the trip?" subtitle={`${b.trip.dest} · ${b.trip.dates.split(' · ')[0]}`} icon="star" iconTone="amber"
      footer={
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <button onClick={onClose} style={{ background:'transparent', border:'none', color:T.grey, fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>Skip</button>
          <Btn kind="primary" size="md" trailing="arrow-right" onClick={()=>stars>0 && setDone(true)}>{stars>0?'Post review':'Pick a rating'}</Btn>
        </div>
      }>
      <div style={{ background:'#FAFBFC', borderRadius:14, padding:'22px 18px 18px', textAlign:'center', marginBottom:18 }}>
        <div style={{ display:'inline-flex', gap:8, marginBottom:8 }}>
          {[1,2,3,4,5].map(i => (
            <button key={i} onClick={()=>setStars(i)} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(0)}
              style={{ background:'transparent', border:'none', cursor:'pointer', padding:4 }}>
              <Ico name="star" size={32} color={i<=(hover||stars)?T.amber:T.greyLight}/>
            </button>
          ))}
        </div>
        <div style={{ fontSize:13, color:T.grey, height:18 }}>{captions[hover||stars] || 'Tap to rate'}</div>
      </div>
      <div style={{ fontSize:11, color:T.grey, letterSpacing:'.12em', fontWeight:800, marginBottom:8 }}>WHAT STOOD OUT?</div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:16 }}>
        {tags.map(tg => {
          const a = highlight.includes(tg);
          return (
            <button key={tg} onClick={()=>toggle(tg)} style={{ padding:'6px 12px', borderRadius:999, border:`1.5px solid ${a?T.greenDeep:T.greyLight}`, background:a?'#F0FAF4':'#fff', color:a?T.greenDeep:T.ink, fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>{a?'✓ ':''}{tg}</button>
          );
        })}
      </div>
      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Tell future travelers the one thing they should know…" rows={3} style={{ width:'100%', borderRadius:11, border:`1.5px solid ${T.greyLight}`, padding:'12px 14px', fontSize:13.5, fontFamily:'inherit', outline:'none', resize:'vertical', lineHeight:1.5 }}/>
      <div style={{ fontSize:11, color:T.grey, marginTop:8 }}>Visible on the trip page after moderation. Be honest — that's the whole point.</div>
    </FlowModal>
  );
}

Object.assign(window, { BookingDetail, Invoice, CancelTripModal, RescheduleModal, ModifyTravelersModal, RequestCallbackModal, WriteReviewModal });
