function Profile({ onLogout, onOpenBooking, onOpenInvoice, onOpenTrip, onTravHer }) {
  const isMobile = useIsMobile();
  const [tab, setTab] = React.useState('upcoming');
  const [nav, setNav] = React.useState('bookings');

  // Merge bookings from localStorage (real completed payments) with seeded demo bookings.
  // Pending booking (hold / failed payment) sits on top so the user can resume.
  const stored = getBookings();
  const pending = getPendingBooking();
  const seeded = USER_BOOKINGS;
  const allBookings = [
    ...(pending ? [pending] : []),
    ...stored,
    ...seeded.filter(s => !stored.find(b => b.id === s.id)),
  ];
  const upcoming = allBookings.filter(b=>b.status==='upcoming');
  const past = allBookings.filter(b=>b.status==='past');
  const cancelled = allBookings.filter(b=>b.status==='cancelled');
  const current = tab==='upcoming'?upcoming:tab==='past'?past:cancelled;

  // Growth hook flags — surfaces only if the user has a pending booking.
  const hasPending = !!pending;
  return (
    <div style={{ background:'#F4F6FA', minHeight:'calc(100vh - 64px)', paddingBottom:isMobile?80:0 }}>
      <div style={{ background:`linear-gradient(135deg, ${T.ink}, ${T.inkSoft})`, color:'#fff', padding:isMobile?'24px 16px 60px':'40px 36px 80px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:isMobile?14:18, flexWrap:'wrap' }}>
            <div style={{ width:isMobile?60:72, height:isMobile?60:72, borderRadius:'50%', background:`linear-gradient(135deg, ${T.green}, ${T.greenDeep})`, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:isMobile?22:26, fontWeight:700, border:'3px solid rgba(255,255,255,.15)' }}>AR</div>
            <div style={{ minWidth:0, flex:isMobile?1:'initial' }}>
              <div style={{ fontSize:11, color:'rgba(255,255,255,.6)', letterSpacing:'.1em', fontWeight:700 }}>WELCOME BACK</div>
              <h1 style={{ fontSize:isMobile?22:32, fontWeight:700, letterSpacing:'-.02em', margin:'2px 0 0', fontFamily:'Fraunces, serif' }}>Aditi Rao</h1>
              <div style={{ fontSize:isMobile?11:13, color:'rgba(255,255,255,.7)', marginTop:4, overflow:'hidden', textOverflow:'ellipsis' }}>aditi.r@mail.com · +91 98•••••12</div>
            </div>
            {!isMobile && <div style={{ flex:1 }}/>}
            <div style={{ display:'flex', gap:isMobile?16:28, marginTop:isMobile?14:0, width:isMobile?'100%':'auto', justifyContent:isMobile?'space-between':'flex-start' }}>
              {[{n:'3',l:'trips taken'},{n:'5',l:'states'},{n:'28',l:'co-travelers'},{n:'12',l:'saved'}].map(s => (
                <div key={s.l} style={{ textAlign:'center' }}>
                  <div style={{ fontSize:isMobile?20:24, fontWeight:800, letterSpacing:'-.02em', fontFamily:'Fraunces, serif' }}>{s.n}</div>
                  <div style={{ fontSize:9.5, color:'rgba(255,255,255,.65)', letterSpacing:'.1em', fontWeight:600, textTransform:'uppercase' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth:1200, margin:'-48px auto 0', padding:isMobile?'0 16px 30px':'0 36px 60px', position:'relative' }}>
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'240px 1fr', gap:isMobile?14:24 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:12, alignSelf:'start' }}>
            <div style={{ background:'#fff', borderRadius:16, padding:12, border:`1px solid ${T.greyLight}` }}>
              {[
                { id:'bookings', label:'My bookings', icon:'bag' },
                { id:'requests', label:'Custom requests', icon:'spark', count:CUSTOM_REQUESTS.filter(r=>['submitted','curating','quote-ready'].includes(r.state)).length },
                { id:'wishlist', label:'Wishlist',     icon:'heart', count:5 },
                { id:'refer',    label:'Refer & earn', icon:'gift',  comingSoon:true },
                { id:'settings', label:'Settings',     icon:'settings' },
              ].map(it => {
                const a = nav===it.id;
                return (
                  <div key={it.id} onClick={()=>setNav(it.id)} style={{ padding:'12px 14px', borderRadius:10, display:'flex', alignItems:'center', gap:12, cursor:'pointer', background:a?'#F0FAF4':'transparent', color:a?T.greenDeep:T.ink, fontWeight:a?700:500, fontSize:13.5, marginBottom:2, position:'relative', overflow:'hidden' }}>
                    <Ico name={it.icon} size={16} color={a?T.greenDeep:T.grey}/>
                    <span style={{ flex:1 }}>{it.label}</span>
                    {it.count!=null && <span style={{ background:a?'#fff':'#F4F6FA', color:a?T.greenDeep:T.grey, padding:'2px 7px', borderRadius:999, fontSize:10.5, fontWeight:700 }}>{it.count}</span>}
                    {it.comingSoon && <ComingSoonRibbon/>}
                  </div>
                );
              })}
              <div style={{ borderTop:`1px solid ${T.greyLight}`, marginTop:8, paddingTop:8 }}>
                <div onClick={onLogout} style={{ padding:'12px 14px', borderRadius:10, display:'flex', alignItems:'center', gap:12, cursor:'pointer', color:T.rose, fontSize:13.5, fontWeight:600 }}>
                  <Ico name="logout" size={16} color={T.rose}/>Log out
                </div>
              </div>
            </div>

            {/* trav.her promo card — sits below the logout */}
            <TravHerPromoCard onOpen={onTravHer}/>
          </div>
          <div>
            {nav==='bookings' && (
              <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.greyLight}`, overflow:'hidden' }}>
                <div style={{ padding:'20px 24px 0' }}>
                  <h2 style={{ fontSize:24, fontWeight:700, color:T.ink, letterSpacing:'-.02em', margin:'0 0 14px', fontFamily:'Fraunces, serif' }}>My bookings</h2>
                  <div style={{ display:'flex', gap:4, borderBottom:`1px solid ${T.greyLight}` }}>
                    {[{id:'upcoming',label:'Upcoming',n:upcoming.length},{id:'past',label:'Past',n:past.length},{id:'cancelled',label:'Cancelled',n:cancelled.length}].map(tb => {
                      const a=tab===tb.id;
                      return (
                        <div key={tb.id} onClick={()=>setTab(tb.id)} style={{ padding:'12px 18px', cursor:'pointer', fontSize:13.5, fontWeight:a?700:500, color:a?T.greenDeep:T.grey, borderBottom:`2.5px solid ${a?T.greenDeep:'transparent'}`, marginBottom:-1, display:'flex', alignItems:'center', gap:6 }}>
                          {tb.label}
                          <span style={{ background:a?'#F0FAF4':'#F4F6FA', color:a?T.greenDeep:T.grey, padding:'2px 7px', borderRadius:999, fontSize:11, fontWeight:700 }}>{tb.n}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div style={{ padding:20, display:'flex', flexDirection:'column', gap:14 }}>
                  {tab==='upcoming' && hasPending && <PaymentPendingInline b={pending} onResume={()=>onOpenBooking && onOpenBooking(pending.id)}/>}
                  {tab==='past' && past.some(b=>b.state==='review-pending') && <ReviewReminderInline count={past.filter(b=>b.state==='review-pending').length}/>}
                  {current.length===0 && <EmptyState tab={tab}/>}
                  {current.map(b => <BookingRow key={b.id} b={b} onOpenBooking={onOpenBooking} onOpenInvoice={onOpenInvoice}/>)}
                  {tab==='upcoming' && <ReferralInline/>}
                  {tab==='upcoming' && <DropTeaser/>}
                </div>
              </div>
            )}
            {nav==='requests' && <CustomRequestsPanel isMobile={isMobile}/>}
            {nav==='wishlist' && <WishlistPanel onOpenTrip={onOpenTrip} isMobile={isMobile}/>}
            {nav==='refer'    && <ComingSoonPanel title="Refer & earn" tagline="Bring your travel buddies. Earn ₹500 each time they book." icon="gift"/>}
            {nav==='settings' && <SettingsPanel isMobile={isMobile}/>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ Coming-soon ribbon (corner banner inside the side-nav row) ============ */
function ComingSoonRibbon() {
  return (
    <div style={{ position:'absolute', top:6, right:-30, transform:'rotate(35deg)', background:`linear-gradient(135deg, ${T.amber}, #d48818)`, color:'#fff', fontSize:8, fontWeight:800, letterSpacing:'.12em', padding:'2px 30px', boxShadow:'0 2px 6px rgba(0,0,0,.12)', pointerEvents:'none' }}>
      SOON
    </div>
  );
}

/* ============ Coming-soon panel (right-side placeholder) ============ */
function ComingSoonPanel({ title, tagline, icon }) {
  return (
    <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.greyLight}`, padding:'48px 32px', textAlign:'center', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:-40, right:-40, width:200, height:200, borderRadius:'50%', background:`radial-gradient(circle, ${T.amber}22 0%, transparent 70%)`, pointerEvents:'none' }}/>
      <div style={{ position:'relative' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 12px', borderRadius:999, background:'#FFF5D6', color:'#A37A1A', fontSize:10.5, fontWeight:800, letterSpacing:'.14em', border:`1px solid ${T.amber}55`, marginBottom:18 }}>
          <Ico name="spark" size={11} color="#A37A1A"/> COMING SOON
        </div>
        <div style={{ width:64, height:64, borderRadius:'50%', background:'#FAFBFC', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', border:`1px solid ${T.greyLight}` }}>
          <Ico name={icon} size={26} color={T.greenDeep} stroke={1.6}/>
        </div>
        <h3 style={{ fontSize:24, fontWeight:700, color:T.ink, letterSpacing:'-.02em', margin:0, fontFamily:'Fraunces, serif' }}>{title}</h3>
        <p style={{ fontSize:14, color:T.grey, marginTop:10, lineHeight:1.55, maxWidth:380, marginLeft:'auto', marginRight:'auto' }}>{tagline}</p>
        <div style={{ marginTop:22 }}>
          <Btn kind="outline" size="md" icon="bell">Notify me when it's live</Btn>
        </div>
      </div>
    </div>
  );
}

/* ============ trav.her promo (sits under logout) ============ */
function TravHerPromoCard({ onOpen }) {
  return (
    <div onClick={onOpen} style={{ background:`linear-gradient(135deg, ${T.roseCream}, #fff 130%)`, borderRadius:16, padding:'18px 16px', border:`1px solid ${T.rose}33`, cursor:'pointer', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:-20, right:-20, width:90, height:90, borderRadius:'50%', background:`radial-gradient(circle, ${T.rose}22 0%, transparent 70%)`, pointerEvents:'none' }}/>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8, position:'relative' }}>
        <Ico name="rose" size={22}/>
        <span style={{ fontSize:14, fontWeight:700, color:T.rose, fontFamily:'Fraunces, serif', letterSpacing:'-.01em' }}>trav.her</span>
        <span style={{ marginLeft:'auto', display:'inline-flex', alignItems:'center', gap:4, fontSize:9.5, fontWeight:800, color:T.rose, background:'#fff', padding:'3px 8px', borderRadius:999, letterSpacing:'.1em', border:`1px solid ${T.rose}33` }}>
          FOR YOU
        </span>
      </div>
      <div style={{ fontSize:12.5, color:T.inkSoft, lineHeight:1.5, marginBottom:10, position:'relative' }}>Women-only cohorts of 8, female trip lead, verified safe stays.</div>
      <div style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:12, color:T.rose, fontWeight:700, position:'relative' }}>
        Explore trav.her <Ico name="arrow-right" size={12} color={T.rose} stroke={2.4}/>
      </div>
    </div>
  );
}

/* ============ Wishlist panel ============ */
function WishlistPanel({ onOpenTrip, isMobile }) {
  // Pretend the user has saved these trips
  const savedIds = ['trip-rishikesh','trip-goa','trip-udaipur','trip-manali','trip-triund'];
  const saved = (typeof ALL_TRIPS !== 'undefined' ? ALL_TRIPS : []).filter(t => savedIds.includes(t.id));
  const [removed, setRemoved] = React.useState({});
  const visible = saved.filter(t => !removed[t.id]);
  const remove = (id, e) => { e.stopPropagation(); setRemoved(r => ({ ...r, [id]:true })); };

  if (!visible.length) {
    return (
      <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.greyLight}`, padding:'56px 24px', textAlign:'center' }}>
        <div style={{ width:64, height:64, borderRadius:'50%', background:T.roseCream, margin:'0 auto 16px', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Ico name="heart" size={26} color={T.rose}/>
        </div>
        <h3 style={{ fontSize:22, fontWeight:700, color:T.ink, margin:0, fontFamily:'Fraunces, serif', letterSpacing:'-.02em' }}>Your wishlist is empty</h3>
        <p style={{ fontSize:13.5, color:T.grey, marginTop:10, lineHeight:1.55, maxWidth:380, marginLeft:'auto', marginRight:'auto' }}>Tap the heart on any trip you want to remember. We'll keep it here and ping you when prices drop.</p>
        <div style={{ marginTop:18 }}>
          <Btn kind="primary" size="md" trailing="arrow-right">Browse trips</Btn>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.greyLight}`, overflow:'hidden' }}>
      <div style={{ padding:'20px 24px 16px', borderBottom:`1px solid ${T.greyLight}`, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10 }}>
        <div>
          <h2 style={{ fontSize:isMobile?20:24, fontWeight:700, color:T.ink, letterSpacing:'-.02em', margin:0, fontFamily:'Fraunces, serif' }}>Your wishlist</h2>
          <div style={{ fontSize:13, color:T.grey, marginTop:4 }}>{visible.length} saved trip{visible.length===1?'':'s'} · price drops alert is on</div>
        </div>
        <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 11px', borderRadius:999, background:'#F0FAF4', color:T.greenDeep, fontSize:10.5, fontWeight:800, letterSpacing:'.12em', border:`1px solid ${T.green}33` }}>
          <Ico name="bell" size={10} color={T.greenDeep}/> NOTIFY ON PRICE DROP
        </div>
      </div>
      <div style={{ padding:isMobile?14:20, display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:isMobile?12:16 }}>
        {visible.map(t => <WishlistCard key={t.id} t={t} onOpenTrip={onOpenTrip} onRemove={(e)=>remove(t.id, e)}/>)}
      </div>
    </div>
  );
}

function WishlistCard({ t, onOpenTrip, onRemove }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={()=>onOpenTrip && onOpenTrip(t.id)} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={{
      borderRadius:14, overflow:'hidden', position:'relative', cursor:'pointer',
      border:`1px solid ${T.greyLight}`, background:'#fff',
      boxShadow: hover ? '0 14px 32px rgba(15,30,46,.12)' : '0 2px 8px rgba(15,30,46,.04)',
      transform: hover ? 'translateY(-2px)' : 'translateY(0)',
      transition:'all .2s',
    }}>
      <div style={{ position:'relative', height:160 }}>
        <ImgPlaceholder {...t.img} radius={0} overlay={false}/>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,.55) 100%)' }}/>
        <button onClick={onRemove} aria-label="Remove from wishlist" style={{
          position:'absolute', top:10, right:10, width:34, height:34, borderRadius:'50%',
          background:'rgba(255,255,255,.94)', border:`1px solid ${T.rose}33`,
          cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
          backdropFilter:'blur(6px)',
        }}>
          <Ico name="heart" size={15} color={T.rose}/>
        </button>
        {t.fillingFast && (
          <div style={{ position:'absolute', top:10, left:10, background:T.fire, color:'#fff', padding:'4px 9px', borderRadius:8, fontSize:9.5, fontWeight:800, letterSpacing:'.08em', display:'inline-flex', alignItems:'center', gap:4 }}>
            <Ico name="fire" size={9} color="#fff"/> FILLING FAST
          </div>
        )}
        <div style={{ position:'absolute', left:12, bottom:10, color:'#fff' }}>
          <div style={{ fontSize:10.5, fontWeight:700, letterSpacing:'.12em', color:'rgba(255,255,255,.85)' }}>{t.region}</div>
          <div style={{ fontSize:18, fontWeight:800, fontFamily:'Fraunces, serif', letterSpacing:'-.015em' }}>{t.dest}</div>
        </div>
      </div>
      <div style={{ padding:'12px 14px 14px', display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:10 }}>
        <div style={{ minWidth:0 }}>
          <div style={{ fontSize:13, fontWeight:600, color:T.ink, lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{t.title}</div>
          <div style={{ fontSize:11.5, color:T.grey, marginTop:3 }}>{t.nights}</div>
        </div>
        <div style={{ textAlign:'right', flexShrink:0 }}>
          <div style={{ fontSize:9.5, color:T.grey, letterSpacing:'.12em', fontWeight:700 }}>FROM</div>
          <div style={{ fontSize:17, fontWeight:800, color:T.greenDeep, letterSpacing:'-.02em', fontFamily:'Fraunces, serif' }}>{inr(t.price)}</div>
        </div>
      </div>
    </div>
  );
}

function BookingRow({ b, onOpenBooking, onOpenInvoice }) {
  const isUp=b.status==='upcoming', isPast=b.status==='past', isCanc=b.status==='cancelled';
  const stateMap = {
    'departs-soon':     { bg:'#FBEFE7', fg:T.fire,      icon:'fire',     label:'Departs soon' },
    'confirmed':        { bg:'#F0FAF4', fg:T.greenDeep, icon:'check',    label:'Confirmed' },
    'waitlist':         { bg:'#FFF5D6', fg:'#A37A1A',   icon:'clock',    label:`Waitlist · #${b.waitlistPos||1}` },
    'payment-pending':  { bg:'#FBEFE7', fg:T.rose,      icon:'spark',    label:`Pay in ${b.holdExpiresHours||24}h` },
    'completed-reviewed':{ bg:'#F4F6FA',fg:T.grey,      icon:'check',    label:'Completed' },
    'review-pending':   { bg:'#FFF5D6', fg:'#A37A1A',   icon:'star',     label:'Review pending' },
    'refunded':         { bg:'#FBEFE7', fg:T.rose,      icon:'check',    label:'Refunded' },
    'refund-processing':{ bg:'#FFF5D6', fg:'#A37A1A',   icon:'refresh',  label:`Refund in ${b.refundEta||3}d` },
  };
  const statusChip = stateMap[b.state] || (isUp?{bg:'#F0FAF4',fg:T.greenDeep,icon:'check',label:'Confirmed'}:isPast?{bg:'#F4F6FA',fg:T.grey,icon:'check',label:'Completed'}:{bg:'#FBEFE7',fg:T.rose,icon:'check',label:'Cancelled'});
  const th = personaTheme(b.persona);
  const isSolo = b.persona==='soloFemale';
  const isCorp = b.persona==='corporate';
  const personaChip = isSolo ? { bg:T.roseCream, fg:T.rose, icon:'rose', label:'trav.her' } :
                      isCorp ? { bg:'#F1F4F8', fg:T.ink, icon:'briefcase', label:'Corporate' } : null;
  const [modal, setModal] = React.useState(null);
  const open = () => onOpenBooking && onOpenBooking(b.id);
  const total = b.paid + b.balance;
  const isWaitlist = b.state==='waitlist';
  const isPaymentPending = b.state==='payment-pending';
  const [paySuccess, setPaySuccess] = React.useState(null); // { id }
  const payNow = () => {
    const profile = loadTravProfile();
    openRazorpay({
      amount: b.balance,
      name: 'trav',
      description: `Confirm hold · ${b.trip.dest} · ${b.guests} travelers`,
      prefill: { name: profile.name, email: profile.email, contact: (profile.phone||'').replace(/\D/g,'').slice(-10) },
      notes: { booking_id: b.id, trip_id: b.trip.id||'', flow:'payment-pending' },
      theme: { color: b.persona==='soloFemale' ? '#C14A36' : '#1DBF73' },
      onSuccess: (resp) => setPaySuccess(resp),
      onDismiss: () => {},
      onFailure: (err) => alert('Payment failed: ' + (err?.description || 'Please try again.')),
    });
  };
  return (
    <div style={{ border:`1.5px solid ${(isSolo||isCorp)?th.ring:T.greyLight}`, borderRadius:14, overflow:'hidden', background:'#fff', position:'relative' }}>
      <div style={{ display:'grid', gridTemplateColumns:'180px 1fr auto', gap:18, padding:14, alignItems:'center' }}>
        <div onClick={open} style={{ width:180, height:120, borderRadius:10, overflow:'hidden', cursor:'pointer', position:'relative' }}>
          <ImgPlaceholder {...b.trip.img} radius={0} overlay={false}/>
          {isCanc && <div style={{ position:'absolute', inset:0, background:'rgba(15,30,46,.55)', display:'flex', alignItems:'center', justifyContent:'center' }}><span style={{ background:'#fff', color:T.rose, padding:'4px 10px', borderRadius:999, fontSize:10.5, fontWeight:800, letterSpacing:'.1em', transform:'rotate(-6deg)' }}>CANCELLED</span></div>}
        </div>
        <div onClick={open} style={{ cursor:'pointer' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6, flexWrap:'wrap' }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:5, background:statusChip.bg, color:statusChip.fg, padding:'3px 10px 3px 8px', borderRadius:999, fontSize:10.5, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase' }}>
              <Ico name={statusChip.icon} size={10} color={statusChip.fg} stroke={2.4}/> {statusChip.label}
            </span>
            {personaChip && (
              <span style={{ display:'inline-flex', alignItems:'center', gap:5, background:personaChip.bg, color:personaChip.fg, padding:'3px 9px 3px 7px', borderRadius:999, fontSize:10, fontWeight:800, letterSpacing:'.08em', textTransform:'uppercase' }}>
                <Ico name={personaChip.icon} size={10} color={personaChip.fg}/> {personaChip.label}
              </span>
            )}
            <span style={{ fontSize:11, color:T.grey, fontFamily:'ui-monospace, Menlo, monospace' }}>{b.id}</span>
          </div>
          <div style={{ fontSize:20, fontWeight:700, color:T.ink, letterSpacing:'-.015em', fontFamily:'Fraunces, serif' }}>{b.trip.dest}</div>
          <div style={{ fontSize:13, color:T.grey, marginTop:4 }}>{b.trip.dates}</div>
          <div style={{ display:'flex', gap:16, marginTop:10, fontSize:12, color:T.grey, flexWrap:'wrap' }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:5 }}><Ico name="users" size={12} color={T.grey}/>{b.guests} travelers</span>
            <span style={{ display:'inline-flex', alignItems:'center', gap:5 }}><Ico name="star" size={12} color={T.grey}/>{b.trip.creator}</span>
            {isPast && b.rating && <span style={{ display:'inline-flex', alignItems:'center', gap:3, color:T.amber, fontWeight:600 }}>{[0,1,2,3,4].map(i=><Ico key={i} name="star" size={11} color={T.amber}/>)}</span>}
          </div>
        </div>
        <div style={{ textAlign:'right' }}>
          {isUp && !isWaitlist && !isPaymentPending && <>
            <div style={{ fontSize:10.5, color:T.grey, letterSpacing:'.1em', fontWeight:700 }}>DEPARTS IN</div>
            <div style={{ fontSize:22, fontWeight:800, color:T.ink, letterSpacing:'-.02em' }}>{b.departsIn} <span style={{ fontSize:12, fontWeight:600, color:T.grey }}>days</span></div>
            <div style={{ fontSize:11, color:th.deep, fontWeight:600, marginTop:2 }}>Paid {inr(b.paid)} · {inr(b.balance)} due</div>
          </>}
          {isUp && isWaitlist && <>
            <div style={{ fontSize:10.5, color:T.grey, letterSpacing:'.1em', fontWeight:700 }}>POSITION</div>
            <div style={{ fontSize:22, fontWeight:800, color:'#A37A1A', letterSpacing:'-.02em' }}>#{b.waitlistPos} <span style={{ fontSize:12, fontWeight:600, color:T.grey }}>in line</span></div>
            <div style={{ fontSize:11, color:T.grey, marginTop:2 }}>You'll be charged only if a spot opens</div>
          </>}
          {isUp && isPaymentPending && <>
            <div style={{ fontSize:10.5, color:T.grey, letterSpacing:'.1em', fontWeight:700 }}>HOLD EXPIRES</div>
            <div style={{ fontSize:22, fontWeight:800, color:T.rose, letterSpacing:'-.02em' }}>{b.holdExpiresHours}h</div>
            <div style={{ fontSize:11, color:T.rose, fontWeight:600, marginTop:2 }}>Pay {inr(b.balance)} to confirm</div>
          </>}
          {isPast && <div style={{ fontSize:11, color:T.grey }}>Paid {inr(b.paid)}</div>}
          {isCanc && <div style={{ fontSize:11, color:T.rose, fontWeight:600 }}>Refund {inr(b.refund)} {b.state==='refund-processing'?'in progress':'processed'}</div>}
        </div>
      </div>
      {paySuccess && (
        <div style={{ padding:'10px 14px', background:'#F0FAF4', borderTop:`1px solid ${T.green}55`, display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
          <div style={{ width:28, height:28, borderRadius:'50%', background:T.green, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Ico name="check" size={15} color="#fff" stroke={3}/>
          </div>
          <div style={{ flex:1, minWidth:180 }}>
            <div style={{ fontSize:13, fontWeight:700, color:T.greenDeep }}>Payment received · booking confirmed</div>
            <div style={{ fontSize:11.5, color:T.grey, fontFamily:'ui-monospace, Menlo, monospace', marginTop:2 }}>{paySuccess.razorpay_payment_id} {paySuccess.simulated ? '· simulated' : '· test mode'}</div>
          </div>
        </div>
      )}
      <div style={{ borderTop:`1px solid ${T.greyLight}`, padding:'10px 14px', background:'#FAFBFC', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:10 }}>
        <div style={{ fontSize:12, color:T.grey, display:'inline-flex', alignItems:'center', gap:6 }}>
          {isUp && isWaitlist && <>You'll get WhatsApp + email the moment a spot opens.</>}
          {isUp && isPaymentPending && !paySuccess && <>We're holding your spot until the timer runs out.</>}
          {isUp && isPaymentPending && paySuccess && <>Spot locked · docs on WhatsApp shortly.</>}
          {isUp && !isWaitlist && !isPaymentPending && b.departsIn<=7 && <span style={{ display:'inline-flex', alignItems:'center', gap:4, color:T.fire, fontWeight:700 }}><span style={{ width:6, height:6, borderRadius:'50%', background:T.fire }}/> Departs soon</span>}
          {isUp && !isWaitlist && !isPaymentPending && b.departsIn>7 && <>Pickup: Akshardham Metro, Gate 2 · 9:00 PM</>}
          {isPast && b.state==='review-pending' && <>Tell us how it went — earn ₹200 trav credits.</>}
          {isPast && b.state!=='review-pending' && <>Thanks for traveling with trav ✨</>}
          {isCanc && b.state==='refund-processing' && <>Refund initiated · hits your source account in {b.refundEta} business days</>}
          {isCanc && b.state!=='refund-processing' && <>Cancelled 3 Mar · Refund hit your source account</>}
        </div>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {isUp && isPaymentPending && <>
            <Btn kind="ghost" size="sm" onClick={()=>setModal('cancel')} style={{ color:T.rose }}>Drop hold</Btn>
            <Btn kind="primary" size="sm" trailing="arrow-right" onClick={payNow}>Pay {inr(b.balance)}</Btn>
          </>}
          {isUp && isWaitlist && <>
            <Btn kind="ghost" size="sm" onClick={()=>setModal('cancel')} style={{ color:T.rose }}>Leave waitlist</Btn>
            <Btn kind="dark" size="sm" trailing="chevron-right" onClick={open}>View details</Btn>
          </>}
          {isUp && !isWaitlist && !isPaymentPending && <>
            <Btn kind="ghost" size="sm" icon="refresh" onClick={()=>setModal('reschedule')}>Reschedule</Btn>
            <Btn kind="ghost" size="sm" icon="users" onClick={()=>setModal('modify')}>Travelers</Btn>
            <Btn kind="ghost" size="sm" onClick={()=>setModal('cancel')} style={{ color:T.rose }}>Cancel</Btn>
            <Btn kind="dark" size="sm" trailing="chevron-right" onClick={open}>View details</Btn>
          </>}
          {isPast && <>
            <Btn kind="ghost" size="sm" icon="phone" onClick={()=>setModal('callback')}>Callback</Btn>
            {!b.rating && <Btn kind="outline" size="sm" icon="star" onClick={()=>setModal('review')}>Write review</Btn>}
            <Btn kind="outline" size="sm" onClick={()=>onOpenInvoice&&onOpenInvoice(b.id)}>Invoice</Btn>
            <Btn kind="dark" size="sm" onClick={open}>View details</Btn>
          </>}
          {isCanc && <>
            <Btn kind="ghost" size="sm" icon="phone" onClick={()=>setModal('callback')}>Help</Btn>
            <Btn kind="outline" size="sm" icon="refresh">Re-book</Btn>
            <Btn kind="dark" size="sm" onClick={open}>View refund</Btn>
          </>}
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

function DropTeaser() {
  return (
    <div style={{ background:'linear-gradient(135deg, #F0FAF4, #FAFBFC)', border:`1px dashed ${T.green}55`, borderRadius:14, padding:20, display:'flex', alignItems:'center', gap:14 }}>
      <div style={{ width:44, height:44, borderRadius:'50%', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <Ico name="spark" size={20} color={T.green}/>
      </div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:14, fontWeight:700, color:T.ink, fontFamily:'Fraunces, serif' }}>Thursday Drop lands in 2 days</div>
        <div style={{ fontSize:12.5, color:T.grey, marginTop:2 }}>3 new trips from Delhi. You've got early access as a past traveler.</div>
      </div>
      <Btn kind="primary" size="sm" trailing="arrow-right">Preview</Btn>
    </div>
  );
}

function EmptyState({ tab }) {
  return (
    <div style={{ padding:'48px 20px', textAlign:'center', color:T.grey }}>
      <div style={{ fontSize:32, marginBottom:10 }}>🧳</div>
      <div style={{ fontSize:14, fontWeight:600, color:T.ink, marginBottom:4 }}>No {tab} bookings</div>
      <div style={{ fontSize:12.5 }}>Your {tab} trips will show up here.</div>
    </div>
  );
}

/* ============ Custom Requests (user-submitted trip briefs) ============ */
function CustomRequestsPanel({ isMobile }) {
  const [tab, setTab] = React.useState('active');
  const [showNew, setShowNew] = React.useState(false);
  const active = CUSTOM_REQUESTS.filter(r=>['submitted','curating','quote-ready','confirmed'].includes(r.state));
  const archived = CUSTOM_REQUESTS.filter(r=>['expired','declined'].includes(r.state));
  const list = tab==='active' ? active : archived;
  return (
    <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.greyLight}`, overflow:'hidden' }}>
      <div style={{ padding:'20px 24px 0' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:10 }}>
          <div>
            <h2 style={{ fontSize:24, fontWeight:700, color:T.ink, letterSpacing:'-.02em', margin:'0 0 4px', fontFamily:'Fraunces, serif' }}>Custom requests</h2>
            <div style={{ fontSize:13, color:T.grey, marginBottom:14 }}>Tell us a trip idea, we'll build it. Curators reply in 24 hours.</div>
          </div>
          <Btn kind="primary" size="sm" icon="spark" onClick={()=>setShowNew(true)}>New request</Btn>
        </div>
        <div style={{ display:'flex', gap:4, borderBottom:`1px solid ${T.greyLight}` }}>
          {[{id:'active',label:'Active',n:active.length},{id:'archived',label:'Archived',n:archived.length}].map(tb => {
            const a=tab===tb.id;
            return (
              <div key={tb.id} onClick={()=>setTab(tb.id)} style={{ padding:'12px 18px', cursor:'pointer', fontSize:13.5, fontWeight:a?700:500, color:a?T.greenDeep:T.grey, borderBottom:`2.5px solid ${a?T.greenDeep:'transparent'}`, marginBottom:-1, display:'flex', alignItems:'center', gap:6 }}>
                {tb.label}
                <span style={{ background:a?'#F0FAF4':'#F4F6FA', color:a?T.greenDeep:T.grey, padding:'2px 7px', borderRadius:999, fontSize:11, fontWeight:700 }}>{tb.n}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ padding:20, display:'flex', flexDirection:'column', gap:14 }}>
        {list.length===0 && (
          <div style={{ padding:'40px 20px', textAlign:'center', color:T.grey }}>
            <div style={{ fontSize:30, marginBottom:10 }}>📝</div>
            <div style={{ fontSize:14, fontWeight:600, color:T.ink, marginBottom:4 }}>Nothing here yet</div>
            <div style={{ fontSize:12.5 }}>Your {tab} custom trip requests will show up here.</div>
          </div>
        )}
        {list.map(r => <RequestCard key={r.id} r={r}/>)}
      </div>
      {showNew && <NewRequestModal onClose={()=>setShowNew(false)}/>}
    </div>
  );
}

function RequestCard({ r }) {
  const states = {
    'submitted':   { bg:'#F4F6FA', fg:T.inkSoft,   icon:'clock',   label:'Submitted',   helper:'A curator will pick this up within 24 hours.' },
    'curating':    { bg:'#FFF5D6', fg:'#A37A1A',   icon:'spark',   label:'Curating',    helper:`Being crafted by ${r.curator||'@trav.team'}.` },
    'quote-ready': { bg:'#F0FAF4', fg:T.greenDeep, icon:'check',   label:'Quote ready', helper:'Quote expires in 48 hours.' },
    'confirmed':   { bg:'#F0FAF4', fg:T.greenDeep, icon:'check',   label:'Confirmed',   helper:'Payment received · trip docs on WhatsApp.' },
    'expired':     { bg:'#FBEFE7', fg:T.rose,      icon:'refresh', label:'Expired',     helper:'Quote expired. Re-submit to try again.' },
    'declined':    { bg:'#FBEFE7', fg:T.rose,      icon:'x',       label:'Declined',    helper:'We couldn\'t find a safe supply for this brief.' },
  };
  const s = states[r.state] || states.submitted;
  const th = personaTheme(r.persona);
  const [paid, setPaid] = React.useState(null);
  const token = 2000 * (r.travelers || 1);
  const bookQuote = () => {
    const profile = loadTravProfile();
    openRazorpay({
      amount: token,
      name: 'trav',
      description: `${r.title} · ${r.dest}`,
      prefill: { name: profile.name, email: profile.email, contact: (profile.phone||'').replace(/\D/g,'').slice(-10) },
      notes: { request_id: r.id, dest: r.dest, travelers: String(r.travelers||1), flow:'custom-quote' },
      theme: { color: r.persona==='soloFemale' ? '#C14A36' : '#1DBF73' },
      onSuccess: (resp) => setPaid(resp),
      onDismiss: () => {},
      onFailure: (err) => alert('Payment failed: ' + (err?.description || 'Please try again.')),
    });
  };
  return (
    <div style={{ border:`1px solid ${T.greyLight}`, borderRadius:14, overflow:'hidden', background:'#fff' }}>
      <div style={{ padding:'14px 16px', display:'flex', gap:14, alignItems:'flex-start', flexWrap:'wrap' }}>
        <div style={{ width:46, height:46, borderRadius:10, background:th.soft, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <Ico name="pin" size={20} color={th.deep} stroke={1.8}/>
        </div>
        <div style={{ flex:1, minWidth:200 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4, flexWrap:'wrap' }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:5, background:s.bg, color:s.fg, padding:'3px 10px 3px 8px', borderRadius:999, fontSize:10.5, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase' }}>
              <Ico name={s.icon} size={10} color={s.fg} stroke={2.4}/> {s.label}
            </span>
            <span style={{ fontSize:11, color:T.grey, fontFamily:'ui-monospace, Menlo, monospace' }}>{r.id}</span>
            {r.submittedDaysAgo!=null && <span style={{ fontSize:11.5, color:T.grey }}>· {r.submittedDaysAgo===0?'just now':`${r.submittedDaysAgo}d ago`}</span>}
          </div>
          <div style={{ fontSize:16, fontWeight:700, color:T.ink, letterSpacing:'-.01em', fontFamily:'Fraunces, serif' }}>{r.title}</div>
          <div style={{ display:'flex', gap:14, marginTop:6, fontSize:12, color:T.grey, flexWrap:'wrap' }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:5 }}><Ico name="calendar" size={12} color={T.grey}/>{r.dates}</span>
            <span style={{ display:'inline-flex', alignItems:'center', gap:5 }}><Ico name="users" size={12} color={T.grey}/>{r.travelers} {r.travelers===1?'traveler':'travelers'}</span>
            <span style={{ display:'inline-flex', alignItems:'center', gap:5 }}><Ico name="spark" size={12} color={T.grey}/>{r.budget}</span>
          </div>
          <div style={{ display:'flex', gap:6, marginTop:8, flexWrap:'wrap' }}>
            {r.vibe.map(v => <span key={v} style={{ background:'#F4F6FA', color:T.inkSoft, padding:'3px 9px', borderRadius:999, fontSize:10.5, fontWeight:600, letterSpacing:'.04em' }}>{v}</span>)}
          </div>
        </div>
        {r.state==='quote-ready' && r.quote && (
          <div style={{ textAlign:'right', minWidth:130 }}>
            <div style={{ fontSize:10, color:T.grey, letterSpacing:'.12em', fontWeight:700 }}>CURATOR QUOTE</div>
            <div style={{ fontSize:20, fontWeight:800, color:T.greenDeep, letterSpacing:'-.02em', fontFamily:'Fraunces, serif' }}>{inr(r.quote.price)}<span style={{ fontSize:11, fontWeight:600, color:T.grey }}> /head</span></div>
            <div style={{ fontSize:11, color:T.grey, marginTop:2 }}>{r.quote.tripsCount} option{r.quote.tripsCount>1?'s':''} ready</div>
          </div>
        )}
      </div>
      {paid && (
        <div style={{ padding:'10px 14px', background:'#F0FAF4', borderTop:`1px solid ${T.green}55`, display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
          <div style={{ width:28, height:28, borderRadius:'50%', background:T.green, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Ico name="check" size={15} color="#fff" stroke={3}/>
          </div>
          <div style={{ flex:1, minWidth:180 }}>
            <div style={{ fontSize:13, fontWeight:700, color:T.greenDeep }}>Token paid · curator is finalising docs</div>
            <div style={{ fontSize:11.5, color:T.grey, fontFamily:'ui-monospace, Menlo, monospace', marginTop:2 }}>{paid.razorpay_payment_id} {paid.simulated ? '· simulated' : '· test mode'}</div>
          </div>
        </div>
      )}
      <div style={{ borderTop:`1px solid ${T.greyLight}`, padding:'10px 14px', background:'#FAFBFC', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:10 }}>
        <div style={{ fontSize:12, color:T.grey }}>{paid ? 'Your trip docs will land on WhatsApp within 2 hours.' : s.helper}</div>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {r.state==='quote-ready' && !paid && <>
            <Btn kind="ghost" size="sm" icon="send">Message curator</Btn>
            <Btn kind="primary" size="sm" trailing="arrow-right" onClick={bookQuote}>Review &amp; book · {inr(token)} token</Btn>
          </>}
          {r.state==='curating' && <Btn kind="ghost" size="sm" icon="whatsapp">Chat curator</Btn>}
          {r.state==='submitted' && <Btn kind="ghost" size="sm" onClick={()=>{}} style={{ color:T.rose }}>Cancel request</Btn>}
          {r.state==='confirmed' && <Btn kind="dark" size="sm" trailing="chevron-right">View trip</Btn>}
          {r.state==='expired' && <Btn kind="outline" size="sm" icon="refresh">Resubmit</Btn>}
        </div>
      </div>
    </div>
  );
}

function NewRequestModal({ onClose }) {
  const [form, setForm] = React.useState({ title:'', dest:'', travelers:2, budget:'', notes:'' });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const inp = (ph, k, extra={}) => (
    <input value={form[k]} onChange={e=>set(k,e.target.value)} placeholder={ph}
      style={{ width:'100%', height:42, borderRadius:10, border:`1px solid ${T.greyLight}`, padding:'0 14px', fontSize:14, fontFamily:'inherit', outline:'none', ...extra }}/>
  );
  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(10,15,22,.55)', backdropFilter:'blur(4px)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:'#fff', borderRadius:18, width:'100%', maxWidth:520, padding:26, boxShadow:'0 24px 60px rgba(0,0,0,.25)', maxHeight:'90vh', overflowY:'auto' }}>
        <h3 style={{ fontSize:20, fontWeight:700, color:T.ink, margin:'0 0 4px', fontFamily:'Fraunces, serif', letterSpacing:'-.02em' }}>Tell us your trip idea</h3>
        <div style={{ fontSize:13, color:T.grey, marginBottom:18 }}>We'll reply with curated options in under 24 hours.</div>
        <div style={{ display:'grid', gap:12 }}>
          {inp('Give it a name — e.g. "Parents-first Kerala"', 'title')}
          {inp('Where? (destinations, regions, be loose)', 'dest')}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {inp('Travelers', 'travelers', { type:'number' })}
            {inp('Budget / head', 'budget')}
          </div>
          <textarea value={form.notes} onChange={e=>set('notes',e.target.value)} placeholder="Anything specific? vibe, dates, must-haves…"
            style={{ width:'100%', minHeight:100, borderRadius:10, border:`1px solid ${T.greyLight}`, padding:'12px 14px', fontSize:14, fontFamily:'inherit', outline:'none', resize:'vertical' }}/>
        </div>
        <div style={{ display:'flex', gap:10, marginTop:18, justifyContent:'flex-end' }}>
          <Btn kind="ghost" size="md" onClick={onClose}>Close</Btn>
          <Btn kind="primary" size="md" trailing="arrow-right" onClick={onClose}>Submit request</Btn>
        </div>
      </div>
    </div>
  );
}

/* ============ Settings panel ============ */
function SettingsPanel({ isMobile }) {
  const loadProfile = () => {
    try { const s=localStorage.getItem('trav.profile'); if(s) return JSON.parse(s); } catch {}
    return { name:'Aditi Rao', email:'aditi.r@gmail.com', phone:'+91 98••••••12', dob:'', nationality:'Indian' };
  };
  const [p, setP] = React.useState(loadProfile);
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(p);
  const save = () => {
    try { localStorage.setItem('trav.profile', JSON.stringify({ ...draft, updatedAt:Date.now() })); } catch {}
    setP(draft); setEditing(false);
  };
  const cancel = () => { setDraft(p); setEditing(false); };
  const inp = (k, ph, extra={}) => (
    <input value={draft[k]||''} onChange={e=>setDraft({...draft,[k]:e.target.value})} placeholder={ph}
      style={{ width:'100%', height:42, borderRadius:10, border:`1px solid ${T.greyLight}`, padding:'0 14px', fontSize:14, fontFamily:'inherit', outline:'none', ...extra }}/>
  );
  const row = (label, value, optional=false) => (
    <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'180px 1fr', gap:isMobile?4:14, padding:'16px 0', borderBottom:`1px solid ${T.greyLight}` }}>
      <div style={{ fontSize:11.5, fontWeight:700, color:T.grey, letterSpacing:'.1em', textTransform:'uppercase', paddingTop:isMobile?0:2 }}>
        {label}{optional && <span style={{ color:T.grey, fontWeight:500, letterSpacing:'.02em', textTransform:'none' }}> · optional</span>}
      </div>
      <div style={{ fontSize:14, color:value?T.ink:T.grey, fontWeight:value?500:400 }}>{value || 'Not set'}</div>
    </div>
  );
  return (
    <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.greyLight}`, overflow:'hidden' }}>
      <div style={{ padding:'20px 24px', borderBottom:`1px solid ${T.greyLight}`, display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:10, flexWrap:'wrap' }}>
        <div>
          <h2 style={{ fontSize:22, fontWeight:700, color:T.ink, letterSpacing:'-.02em', margin:'0 0 4px', fontFamily:'Fraunces, serif' }}>Your details</h2>
          <div style={{ fontSize:13, color:T.grey }}>Used on bookings, invoices, and trip-day communication.</div>
        </div>
        {!editing && <Btn kind="outline" size="sm" icon="spark" onClick={()=>{setDraft(p);setEditing(true);}}>Edit</Btn>}
      </div>
      <div style={{ padding:'4px 24px 20px' }}>
        {!editing ? (
          <>
            {row('Full name', p.name)}
            {row('Email', p.email)}
            {row('Mobile', p.phone)}
            {row('Date of birth', p.dob, true)}
            {row('Nationality', p.nationality, true)}
          </>
        ) : (
          <div style={{ display:'grid', gap:14, padding:'16px 0' }}>
            <div><div style={{ fontSize:11, fontWeight:700, color:T.grey, letterSpacing:'.1em', marginBottom:6 }}>FULL NAME</div>{inp('name','Your name')}</div>
            <div><div style={{ fontSize:11, fontWeight:700, color:T.grey, letterSpacing:'.1em', marginBottom:6 }}>EMAIL</div>{inp('email','you@gmail.com')}</div>
            <div><div style={{ fontSize:11, fontWeight:700, color:T.grey, letterSpacing:'.1em', marginBottom:6 }}>MOBILE</div>{inp('phone','+91 98xxx xxxxx')}</div>
            <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:12 }}>
              <div><div style={{ fontSize:11, fontWeight:700, color:T.grey, letterSpacing:'.1em', marginBottom:6 }}>DATE OF BIRTH · OPTIONAL</div>{inp('dob','DD / MM / YYYY')}</div>
              <div><div style={{ fontSize:11, fontWeight:700, color:T.grey, letterSpacing:'.1em', marginBottom:6 }}>NATIONALITY · OPTIONAL</div>{inp('nationality','Indian')}</div>
            </div>
            <div style={{ display:'flex', gap:10, marginTop:6, justifyContent:'flex-end' }}>
              <Btn kind="ghost" size="md" onClick={cancel}>Cancel</Btn>
              <Btn kind="primary" size="md" trailing="check" onClick={save}>Save changes</Btn>
            </div>
          </div>
        )}
      </div>
      <div style={{ padding:'16px 24px 20px', background:'#FAFBFC', borderTop:`1px solid ${T.greyLight}` }}>
        <div style={{ fontSize:12, fontWeight:700, color:T.grey, letterSpacing:'.1em', marginBottom:10 }}>PREFERENCES</div>
        {[
          { label:'Notifications · WhatsApp', value:'On', icon:'whatsapp' },
          { label:'Notifications · Email',    value:'On', icon:'send' },
          { label:'Payment methods',           value:'1 card on file', icon:'briefcase' },
          { label:'Saved co-travelers',        value:'3 profiles', icon:'users' },
        ].map(row => (
          <div key={row.label} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0' }}>
            <div style={{ width:32, height:32, borderRadius:8, background:'#fff', border:`1px solid ${T.greyLight}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Ico name={row.icon} size={14} color={T.greenDeep}/>
            </div>
            <div style={{ flex:1, fontSize:13.5, color:T.ink, fontWeight:500 }}>{row.label}</div>
            <div style={{ fontSize:12.5, color:T.grey }}>{row.value}</div>
            <Ico name="chevron-right" size={14} color={T.grey}/>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ Growth hook · payment-pending resume (inline in bookings tab) ============ */
function PaymentPendingInline({ b, onResume }) {
  return (
    <div style={{ background:`linear-gradient(135deg, #FFF5D6, #fff 140%)`, border:`1.5px solid ${T.amber}66`, borderRadius:14, padding:18, display:'flex', alignItems:'center', gap:14, flexWrap:'wrap' }}>
      <div style={{ width:42, height:42, borderRadius:10, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border:`1px solid ${T.amber}33` }}>
        <Ico name="clock" size={18} color="#A37A1A"/>
      </div>
      <div style={{ flex:1, minWidth:200 }}>
        <div style={{ fontSize:14, fontWeight:700, color:T.ink, fontFamily:'Fraunces, serif' }}>Payment pending · {b.trip.dest}</div>
        <div style={{ fontSize:12.5, color:'#6a5016', marginTop:3, lineHeight:1.4 }}>Your hold expires in ~{b.holdExpiresHours||24}h. Balance due: {inr(b.balance)}.</div>
      </div>
      <Btn kind="primary" size="sm" trailing="arrow-right" onClick={onResume}>Resume payment</Btn>
    </div>
  );
}

/* ============ Growth hook · review reminder (inline above past list) ============ */
function ReviewReminderInline({ count }) {
  return (
    <div style={{ background:`linear-gradient(135deg, #FFF8E7, #fff 130%)`, border:`1.5px dashed ${T.amber}66`, borderRadius:14, padding:16, display:'flex', alignItems:'center', gap:14, flexWrap:'wrap' }}>
      <div style={{ width:40, height:40, borderRadius:10, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        <Ico name="star" size={18} color={T.amber}/>
      </div>
      <div style={{ flex:1, minWidth:180 }}>
        <div style={{ fontSize:13.5, fontWeight:700, color:T.ink, fontFamily:'Fraunces, serif' }}>{count} trip{count>1?'s are':' is'} waiting on your review</div>
        <div style={{ fontSize:12, color:T.grey, marginTop:2, lineHeight:1.4 }}>30 seconds of honesty earns you <b style={{ color:T.ink }}>₹200 trav credits</b> per review.</div>
      </div>
    </div>
  );
}

/* ============ Growth hook · referral teaser (inline in upcoming bookings) ============ */
function ReferralInline() {
  const [copied, setCopied] = React.useState(false);
  const copy = () => { navigator.clipboard?.writeText('trav.app/r/aditi'); setCopied(true); setTimeout(()=>setCopied(false), 1500); };
  return (
    <div style={{ background:`linear-gradient(135deg, ${T.roseCream}, #fff 140%)`, border:`1px solid ${T.rose}33`, borderRadius:14, padding:18, display:'flex', alignItems:'center', gap:14, flexWrap:'wrap' }}>
      <div style={{ width:42, height:42, borderRadius:10, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        <Ico name="gift" size={18} color={T.rose}/>
      </div>
      <div style={{ flex:1, minWidth:200 }}>
        <div style={{ fontSize:14, fontWeight:700, color:T.ink, fontFamily:'Fraunces, serif' }}>Invite a friend, both get ₹500 off</div>
        <div style={{ fontSize:12.5, color:T.grey, marginTop:3, lineHeight:1.4 }}>Share <b style={{ color:T.rose, fontFamily:'ui-monospace, Menlo, monospace' }}>trav.app/r/aditi</b> · credits apply on first booking.</div>
      </div>
      <Btn kind="rose" size="sm" icon={copied?'check':'copy'} onClick={copy}>{copied?'Copied':'Copy link'}</Btn>
    </div>
  );
}

Object.assign(window, { Profile });
