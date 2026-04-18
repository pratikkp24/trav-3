function Profile({ onLogout, onOpenBooking, onOpenInvoice, onOpenTrip, onTravHer }) {
  const isMobile = useIsMobile();
  const [tab, setTab] = React.useState('upcoming');
  const [nav, setNav] = React.useState('bookings');
  const upcoming = USER_BOOKINGS.filter(b=>b.status==='upcoming');
  const past = USER_BOOKINGS.filter(b=>b.status==='past');
  const cancelled = USER_BOOKINGS.filter(b=>b.status==='cancelled');
  const current = tab==='upcoming'?upcoming:tab==='past'?past:cancelled;
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
          <div style={{ background:'#fff', borderRadius:16, padding:12, border:`1px solid ${T.greyLight}`, alignSelf:'start', height:'fit-content' }}>
            {[
              { id:'bookings', label:'My bookings', icon:'bag' },
              { id:'wishlist', label:'Wishlist', icon:'heart' },
              { id:'travher', label:'trav.her', icon:'rose' },
              { id:'refer', label:'Refer & earn', icon:'gift' },
              { id:'settings', label:'Settings', icon:'settings' },
            ].map(it => {
              const a = nav===it.id;
              return (
                <div key={it.id} onClick={()=>setNav(it.id)} style={{ padding:'12px 14px', borderRadius:10, display:'flex', alignItems:'center', gap:12, cursor:'pointer', background:a?'#F0FAF4':'transparent', color:a?T.greenDeep:T.ink, fontWeight:a?700:500, fontSize:13.5, marginBottom:2 }}>
                  <Ico name={it.icon} size={16} color={a?T.greenDeep:T.grey}/>{it.label}
                </div>
              );
            })}
            <div style={{ borderTop:`1px solid ${T.greyLight}`, marginTop:8, paddingTop:8 }}>
              <div onClick={onLogout} style={{ padding:'12px 14px', borderRadius:10, display:'flex', alignItems:'center', gap:12, cursor:'pointer', color:T.rose, fontSize:13.5, fontWeight:600 }}>
                <Ico name="logout" size={16} color={T.rose}/>Log out
              </div>
            </div>
          </div>
          <div>
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
                {current.length===0 && <EmptyState tab={tab}/>}
                {current.map(b => <BookingRow key={b.id} b={b} onOpenBooking={onOpenBooking} onOpenInvoice={onOpenInvoice}/>)}
                {tab==='upcoming' && <DropTeaser/>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingRow({ b, onOpenBooking, onOpenInvoice }) {
  const isUp=b.status==='upcoming', isPast=b.status==='past', isCanc=b.status==='cancelled';
  const chip = isUp?{bg:'#F0FAF4',fg:T.greenDeep,text:'Confirmed'}:isPast?{bg:'#F4F6FA',fg:T.grey,text:'Completed'}:{bg:'#FBEFE7',fg:T.rose,text:'Cancelled'};
  const open = () => onOpenBooking && onOpenBooking(b.id);
  return (
    <div style={{ border:`1px solid ${T.greyLight}`, borderRadius:14, overflow:'hidden', background:'#fff' }}>
      <div style={{ display:'grid', gridTemplateColumns:'180px 1fr auto', gap:18, padding:14, alignItems:'center' }}>
        <div onClick={open} style={{ width:180, height:120, borderRadius:10, overflow:'hidden', cursor:'pointer' }}>
          <ImgPlaceholder {...b.trip.img} radius={0} overlay={false}/>
        </div>
        <div onClick={open} style={{ cursor:'pointer' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
            <span style={{ background:chip.bg, color:chip.fg, padding:'3px 10px', borderRadius:999, fontSize:10.5, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase' }}>{chip.text}</span>
            <span style={{ fontSize:11, color:T.grey, fontFamily:'ui-monospace, Menlo, monospace' }}>{b.id}</span>
          </div>
          <div style={{ fontSize:20, fontWeight:700, color:T.ink, letterSpacing:'-.015em', fontFamily:'Fraunces, serif' }}>{b.trip.dest}</div>
          <div style={{ fontSize:13, color:T.grey, marginTop:4 }}>{b.trip.dates}</div>
          <div style={{ display:'flex', gap:16, marginTop:10, fontSize:12, color:T.grey }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:5 }}><Ico name="users" size={12} color={T.grey}/>{b.guests} travelers</span>
            <span style={{ display:'inline-flex', alignItems:'center', gap:5 }}><Ico name="star" size={12} color={T.grey}/>{b.trip.creator}</span>
            {isPast && b.rating && <span style={{ display:'inline-flex', alignItems:'center', gap:3, color:T.amber, fontWeight:600 }}>{[0,1,2,3,4].map(i=><Ico key={i} name="star" size={11} color={T.amber}/>)}</span>}
          </div>
        </div>
        <div style={{ textAlign:'right' }}>
          {isUp && <>
            <div style={{ fontSize:10.5, color:T.grey, letterSpacing:'.1em', fontWeight:700 }}>DEPARTS IN</div>
            <div style={{ fontSize:22, fontWeight:800, color:T.ink, letterSpacing:'-.02em' }}>{b.departsIn} <span style={{ fontSize:12, fontWeight:600, color:T.grey }}>days</span></div>
            <div style={{ fontSize:11, color:T.greenDeep, fontWeight:600, marginTop:2 }}>Paid {inr(b.paid)} · {inr(b.balance)} due</div>
          </>}
          {isPast && <div style={{ fontSize:11, color:T.grey }}>Paid {inr(b.paid)}</div>}
          {isCanc && <div style={{ fontSize:11, color:T.rose, fontWeight:600 }}>Refund {inr(b.refund)} processed</div>}
        </div>
      </div>
      <div style={{ borderTop:`1px solid ${T.greyLight}`, padding:'10px 14px', background:'#FAFBFC', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ fontSize:12, color:T.grey }}>
          {isUp && <>Pickup: Akshardham Metro, Gate 2 · 9:00 PM</>}
          {isPast && <>Thanks for traveling with trav ✨</>}
          {isCanc && <>Cancelled 3 Mar · Refund hit your source account</>}
        </div>
        <div style={{ display:'flex', gap:8 }}>
          {isUp && <>
            <Btn kind="outline" size="sm" icon="whatsapp">Group</Btn>
            <Btn kind="outline" size="sm" onClick={()=>onOpenInvoice&&onOpenInvoice(b.id)}>Invoice</Btn>
            <Btn kind="dark" size="sm" trailing="chevron-right" onClick={open}>View details</Btn>
          </>}
          {isPast && <>
            <Btn kind="outline" size="sm" onClick={()=>onOpenInvoice&&onOpenInvoice(b.id)}>Invoice</Btn>
            <Btn kind="dark" size="sm" onClick={open}>View details</Btn>
          </>}
          {isCanc && <Btn kind="outline" size="sm" onClick={open}>View details</Btn>}
        </div>
      </div>
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

Object.assign(window, { Profile });
