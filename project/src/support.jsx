// Support page — chat-first, app-feel. Quick-actions + ticket form + live status + FAQ.

function SupportPage({ onBack }) {
  const isMobile = useIsMobile();
  const [topic, setTopic] = React.useState('');
  const [bookingId, setBookingId] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [method, setMethod] = React.useState('whatsapp');
  const [urgency, setUrgency] = React.useState('normal');
  const [submitted, setSubmitted] = React.useState(false);
  const [openFaq, setOpenFaq] = React.useState(-1);
  const [fileName, setFileName] = React.useState('');

  const submit = () => {
    if (!topic || !desc.trim()) return;
    setSubmitted(true);
    setTimeout(()=>{ setTopic(''); setBookingId(''); setDesc(''); setUrgency('normal'); setFileName(''); }, 100);
  };

  const pad = isMobile ? 16 : 36;
  return (
    <div style={{ background:T.offWhite, minHeight:'calc(100vh - 64px)', paddingBottom:isMobile?100:60 }}>
      <SupportHero isMobile={isMobile} onBack={onBack}/>
      <div style={{ maxWidth:1180, margin:'0 auto', padding:`0 ${pad}px` }}>
        <QuickActions isMobile={isMobile}/>
        <ChannelCards isMobile={isMobile}/>
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1.7fr 1fr', gap:isMobile?16:22, marginTop:isMobile?20:32 }}>
          <TicketForm
            isMobile={isMobile}
            topic={topic} setTopic={setTopic}
            bookingId={bookingId} setBookingId={setBookingId}
            desc={desc} setDesc={setDesc}
            method={method} setMethod={setMethod}
            urgency={urgency} setUrgency={setUrgency}
            fileName={fileName} setFileName={setFileName}
            submitted={submitted} setSubmitted={setSubmitted}
            onSubmit={submit}
          />
          <RightRail isMobile={isMobile} openFaq={openFaq} setOpenFaq={setOpenFaq}/>
        </div>
        <TrustStats isMobile={isMobile}/>
      </div>
    </div>
  );
}

/* ============ Hero ============ */

function SupportHero({ isMobile, onBack }) {
  const pad = isMobile ? 16 : 36;
  return (
    <div style={{ background:T.offWhite, borderBottom:`1px solid ${T.greyLight}`, padding:`0 ${pad}px` }}>
      <div style={{ maxWidth:1180, margin:'0 auto' }}>
        <div style={{ height:32, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <button onClick={onBack} className="sup-link" style={{ background:'transparent', border:'none', padding:0, cursor:'pointer', color:T.grey, fontSize:12, fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:6 }}>
            <span style={{ fontSize:13, lineHeight:1 }}>{'\u2190'}</span> {isMobile?'Back':'Back to home'}
          </button>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:11, color:T.grey, fontWeight:700, letterSpacing:'.14em' }}>
            <span style={{ position:'relative', width:7, height:7 }}>
              <span style={{ position:'absolute', inset:0, borderRadius:'50%', background:T.green, animation:'sup-pulse 1.6s ease-out infinite' }}/>
              <span style={{ position:'absolute', inset:0, borderRadius:'50%', background:T.green }}/>
            </span>
            ALL CHANNELS LIVE
          </div>
        </div>
        <div style={{ padding:`${isMobile?20:36}px 0 ${isMobile?32:48}px`, maxWidth:800 }}>
          <div style={{ display:'inline-flex', alignItems:'center', padding:'5px 14px', borderRadius:999, background:'#F0FAF4', color:T.greenDeep, fontSize:10.5, fontWeight:800, letterSpacing:'.14em', border:`1px solid ${T.green}33`, marginBottom:isMobile?14:20 }}>
            WE'RE HERE
          </div>
          <h1 style={{ fontSize:isMobile?34:54, fontWeight:700, color:T.ink, letterSpacing:'-.028em', margin:0, fontFamily:'Fraunces, serif', lineHeight:1.05 }}>
            Need a hand? <span style={{ color:T.green, fontStyle:'italic' }}>We're on it.</span>
          </h1>
          <p style={{ fontSize:isMobile?15:17, color:T.inkSoft, marginTop:isMobile?12:18, lineHeight:1.55, maxWidth:580, marginBottom:0 }}>
            Real humans on WhatsApp. Avg response 28 minutes. Let's get you back to your trip.
          </p>
        </div>
      </div>
      <style>{`
        @keyframes sup-pulse { 0% { transform: scale(1); opacity:.55 } 80% { transform: scale(2.4); opacity:0 } 100% { transform: scale(2.4); opacity:0 } }
        .sup-link { transition: opacity .15s ease; } .sup-link:hover { opacity:.78; }
        .sup-card { transition: border-color .18s ease, box-shadow .18s ease, transform .18s ease; }
        .sup-card:hover { border-color:${T.green}; box-shadow:0 10px 26px rgba(15,30,46,.08); transform:translateY(-2px); }
      `}</style>
    </div>
  );
}

/* ============ Quick action chips ============ */

function QuickActions({ isMobile }) {
  const items = [
    { icon:'bag',      label:'Modify booking' },
    { icon:'gift',     label:'Apply a coupon' },
    { icon:'copy',     label:'Get my invoice' },
    { icon:'shield',   label:'Cancel & refund' },
    { icon:'whatsapp', label:'Trip group access' },
    { icon:'pin',      label:'Pickup details' },
  ];
  return (
    <div style={{ marginTop:isMobile?20:32, marginBottom:isMobile?18:26 }}>
      <div style={{ fontSize:11, fontWeight:800, color:T.greenDeep, letterSpacing:'.18em', marginBottom:10 }}>QUICK FIXES</div>
      <div className={isMobile?'scroll-x':''} style={{ display:'flex', gap:8, overflowX:isMobile?'auto':'visible', flexWrap:isMobile?'nowrap':'wrap', margin:isMobile?'0 -16px':0, padding:isMobile?'0 16px':0 }}>
        {items.map(it => (
          <button key={it.label} className={isMobile?'snap':''} style={{
            flexShrink:0, height:40, padding:'0 14px', borderRadius:999,
            background:'#fff', color:T.ink, border:`1px solid ${T.greyLight}`,
            fontSize:12.5, fontWeight:600, cursor:'pointer', fontFamily:'inherit',
            display:'inline-flex', alignItems:'center', gap:7,
          }}>
            <Ico name={it.icon} size={13} color={T.greenDeep} stroke={2}/> {it.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============ Channel cards ============ */

function ChannelCards({ isMobile }) {
  const cards = [
    { icon:'whatsapp', primary:true,  title:'Chat on WhatsApp', sub:'Priyank usually replies in 30 min',  cta:'Open WhatsApp',       chip:'FASTEST · LIVE NOW' },
    { icon:'send',     primary:false, title:'Email us',         sub:'For invoices, refunds, anything written', cta:'support@trav.guide',  chip:'REPLIES IN 4 HRS' },
    { icon:'phone',    primary:false, title:'Call us',          sub:'For urgent issues during an active trip', cta:'+91 98xxx xxxxx',     chip:'TRIP IN PROGRESS ONLY' },
  ];
  return (
    <div style={{ marginTop:isMobile?4:8 }}>
      <div style={{ fontSize:11, fontWeight:800, color:T.greenDeep, letterSpacing:'.18em', marginBottom:isMobile?10:14 }}>REACH US DIRECTLY</div>
      <div className={isMobile?'scroll-x':''} style={{ display:isMobile?'flex':'grid', gridTemplateColumns:isMobile?undefined:'repeat(3,1fr)', gap:isMobile?12:14, overflowX:isMobile?'auto':'visible', margin:isMobile?'0 -16px':0, padding:isMobile?'0 16px':0 }}>
        {cards.map(c => (
          <div key={c.title} className={`sup-card ${isMobile?'snap':''}`} style={{
            minWidth:isMobile?280:'auto', flexShrink:0,
            background:'#fff', borderRadius:16, padding:isMobile?18:20,
            border:`1px solid ${T.greyLight}`,
            boxShadow: c.primary ? '0 8px 28px rgba(29,191,115,.12)' : '0 1px 2px rgba(15,30,46,.03)',
            position:'relative',
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
              <div style={{ width:34, height:34, borderRadius:10, background:'#F0FAF4', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Ico name={c.icon} size={15} color={T.greenDeep}/>
              </div>
              <div style={{ fontSize:9.5, fontWeight:800, letterSpacing:'.14em', color:T.greenDeep }}>{c.chip}</div>
            </div>
            <div style={{ fontFamily:'Fraunces, serif', fontSize:isMobile?17:18, fontWeight:700, color:T.ink, letterSpacing:'-.015em', marginBottom:4 }}>{c.title}</div>
            <div style={{ fontSize:13, color:T.grey, marginBottom:14, lineHeight:1.5, minHeight:isMobile?'auto':34 }}>{c.sub}</div>
            <button style={{
              width:'100%', height:40, borderRadius:10,
              background: c.primary ? T.green : '#fff',
              color: c.primary ? '#fff' : T.ink,
              border: c.primary ? 'none' : `1.5px solid ${T.greyLight}`,
              fontFamily:'inherit', fontSize:13, fontWeight:700, cursor:'pointer',
              display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6,
            }}>
              {c.cta} {c.primary && <Ico name="arrow-right" size={12} color="#fff" stroke={2.4}/>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ Ticket form ============ */

function TicketForm({ isMobile, topic, setTopic, bookingId, setBookingId, desc, setDesc, method, setMethod, urgency, setUrgency, fileName, setFileName, submitted, setSubmitted, onSubmit }) {
  const topics = ['Booking — modify or cancel', 'Refund query', 'Trip experience issue', 'Payment / invoice', 'trav.her query', 'Other'];

  if (submitted) return <SubmittedCard isMobile={isMobile} onAnother={()=>setSubmitted(false)}/>;

  return (
    <div style={{ background:'#fff', borderRadius:18, border:`1px solid ${T.greyLight}`, overflow:'hidden', boxShadow:'0 4px 18px rgba(15,30,46,.04)' }}>
      <div style={{ height:4, background:`linear-gradient(90deg, ${T.green} 0%, ${T.greenDeep} 100%)` }}/>
      <div style={{ padding:isMobile?18:24 }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 10px', borderRadius:999, background:'#F0FAF4', color:T.greenDeep, fontSize:9.5, fontWeight:800, letterSpacing:'.14em', border:`1px solid ${T.green}33`, marginBottom:10 }}>
          <Ico name="bell" size={10} color={T.greenDeep}/> RAISE A TICKET
        </div>
        <h2 style={{ fontSize:isMobile?20:24, fontWeight:700, color:T.ink, letterSpacing:'-.02em', margin:'0 0 6px', fontFamily:'Fraunces, serif' }}>Got a specific issue? Tell us.</h2>
        <div style={{ fontSize:13, color:T.grey, marginBottom:isMobile?16:20 }}>We'll respond on WhatsApp within 4 hours.</div>

        <FormField label="Topic" required>
          <div className={isMobile?'scroll-x':''} style={{ display:'flex', gap:6, overflowX:isMobile?'auto':'visible', flexWrap:isMobile?'nowrap':'wrap', margin:isMobile?'0 -2px':0 }}>
            {topics.map(t => {
              const a = topic===t;
              return (
                <button key={t} onClick={()=>setTopic(t)} className={isMobile?'snap':''} style={{
                  flexShrink:0, height:36, padding:'0 13px', borderRadius:999,
                  background: a ? T.ink : '#fff',
                  color: a ? '#fff' : T.ink,
                  border: `1.5px solid ${a ? T.ink : T.greyLight}`,
                  fontSize:12.5, fontWeight:a?700:600, cursor:'pointer', fontFamily:'inherit',
                }}>{t}</button>
              );
            })}
          </div>
        </FormField>

        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:14, marginTop:14 }}>
          <FormField label="Booking ID" sub="Optional — speeds things up">
            <input value={bookingId} onChange={e=>setBookingId(e.target.value.toUpperCase())} placeholder="TRAV-RSH-4F2A9C" style={inputStyle()}/>
          </FormField>
          <FormField label="Preferred contact">
            <div style={{ display:'flex', gap:6 }}>
              {[
                { id:'whatsapp', label:'WhatsApp', icon:'whatsapp' },
                { id:'email',    label:'Email',    icon:'send' },
                { id:'phone',    label:'Call',     icon:'phone' },
              ].map(m => {
                const a = method===m.id;
                return (
                  <button key={m.id} onClick={()=>setMethod(m.id)} style={{
                    flex:1, height:42, padding:'0 8px', borderRadius:10,
                    background: a ? '#F0FAF4' : '#fff',
                    color: a ? T.greenDeep : T.inkSoft,
                    border: `1.5px solid ${a ? T.green : T.greyLight}`,
                    fontFamily:'inherit', fontSize:12, fontWeight:a?700:600, cursor:'pointer',
                    display:'inline-flex', alignItems:'center', justifyContent:'center', gap:5,
                  }}>
                    <Ico name={m.icon} size={12} color={a?T.greenDeep:T.grey}/> {m.label}
                  </button>
                );
              })}
            </div>
          </FormField>
        </div>

        <div style={{ marginTop:14 }}>
          <FormField label="What's going on?" required>
            <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Tell us what happened — dates, names, screenshots, anything that helps." rows={4} style={{ ...inputStyle(), height:'auto', padding:'12px 14px', resize:'vertical', minHeight:100, lineHeight:1.5 }}/>
            <div style={{ fontSize:10.5, color:T.grey, marginTop:4, textAlign:'right' }}>{desc.length} chars</div>
          </FormField>
        </div>

        <div style={{ marginTop:14 }}>
          <FormField label="Attach a screenshot" sub="Optional · PNG/JPG up to 5MB">
            <label style={{ display:'block', cursor:'pointer' }}>
              <input type="file" accept="image/*" onChange={e=>setFileName(e.target.files?.[0]?.name||'')} style={{ display:'none' }}/>
              <div style={{ border:`2px dashed ${fileName?T.green:T.greyLight}`, borderRadius:12, padding:'18px 14px', textAlign:'center', background: fileName?'#F0FAF4':'#FAFBFC', transition:'all .15s' }}>
                {fileName ? (
                  <div style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:13, fontWeight:600, color:T.greenDeep }}>
                    <Ico name="check" size={14} color={T.greenDeep} stroke={2.5}/> {fileName}
                  </div>
                ) : (
                  <div style={{ fontSize:12.5, color:T.grey, fontWeight:500 }}>
                    <Ico name="copy" size={16} color={T.grey} stroke={2}/> &nbsp;Tap to upload or drag a file
                  </div>
                )}
              </div>
            </label>
          </FormField>
        </div>

        <div style={{ marginTop:14 }}>
          <FormField label="Urgency">
            <div style={{ display:'flex', gap:8 }}>
              {[
                { id:'normal',    label:'Normal',    sub:'4 hr SLA',   tone:T.greenDeep, bg:'#F0FAF4' },
                { id:'important', label:'Important', sub:'2 hr SLA',   tone:'#A37A1A',   bg:'#FFF5D6' },
                { id:'urgent',    label:'Urgent',    sub:'30 min · trip in progress', tone:T.rose, bg:T.roseCream },
              ].map(u => {
                const a = urgency===u.id;
                return (
                  <button key={u.id} onClick={()=>setUrgency(u.id)} style={{
                    flex:1, padding:'10px 8px', borderRadius:10,
                    background: a ? u.bg : '#fff',
                    border: `1.5px solid ${a ? u.tone : T.greyLight}`,
                    cursor:'pointer', fontFamily:'inherit', textAlign:'left',
                  }}>
                    <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12.5, fontWeight:700, color: a?u.tone:T.ink }}>
                      {u.id==='urgent' && <Ico name="fire" size={11} color={a?u.tone:T.grey}/>}
                      {u.label}
                    </div>
                    <div style={{ fontSize:10.5, color:T.grey, marginTop:2, lineHeight:1.3 }}>{u.sub}</div>
                  </button>
                );
              })}
            </div>
          </FormField>
        </div>

        <button onClick={onSubmit} disabled={!topic || !desc.trim()} style={{
          marginTop:isMobile?18:22, width:'100%', height:isMobile?50:54, borderRadius:12,
          background: (topic && desc.trim()) ? T.green : '#E6E6E6',
          color:'#fff', border:'none', fontFamily:'inherit',
          fontSize:isMobile?14.5:15, fontWeight:800, cursor:(topic && desc.trim())?'pointer':'not-allowed',
          display:'inline-flex', alignItems:'center', justifyContent:'center', gap:10,
          boxShadow: (topic && desc.trim()) ? `0 10px 24px ${T.green}55` : 'none',
        }}>
          Send to support team <Ico name="arrow-right" size={15} color="#fff" stroke={2.4}/>
        </button>
        <div style={{ marginTop:10, fontSize:11, color:T.grey, textAlign:'center', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6, width:'100%' }}>
          <Ico name="shield" size={11} color={T.greenDeep}/> Encrypted · Avg first response in 28 minutes
        </div>
      </div>
    </div>
  );
}

function SubmittedCard({ isMobile, onAnother }) {
  return (
    <div style={{ background:'#fff', borderRadius:18, border:`1px solid ${T.green}55`, padding:isMobile?'28px 22px':'40px 32px', textAlign:'center', boxShadow:`0 14px 36px ${T.green}22` }}>
      <div style={{ width:64, height:64, borderRadius:'50%', background:'#E7F7EE', margin:'0 auto 18px', display:'flex', alignItems:'center', justifyContent:'center', border:`2px solid ${T.green}55` }}>
        <Ico name="check" size={28} color={T.green} stroke={3}/>
      </div>
      <h3 style={{ fontSize:isMobile?22:26, fontWeight:700, color:T.ink, margin:0, fontFamily:'Fraunces, serif', letterSpacing:'-.02em' }}>Got it. We're on this.</h3>
      <p style={{ fontSize:isMobile?13.5:14.5, color:T.grey, marginTop:10, lineHeight:1.55 }}>
        Ticket <b style={{ color:T.ink, fontFamily:'ui-monospace, Menlo, monospace' }}>TRAV-S-8F4C2</b> created.<br/>
        Priyank from support will WhatsApp you in under 28 minutes.
      </p>
      <div style={{ display:'flex', gap:10, marginTop:20, justifyContent:'center', flexWrap:'wrap' }}>
        <Btn kind="dark" size="md" icon="whatsapp">Open WhatsApp now</Btn>
        <Btn kind="outline" size="md" onClick={onAnother}>Raise another ticket</Btn>
      </div>
    </div>
  );
}

function FormField({ label, sub, required, children }) {
  return (
    <div>
      <div style={{ fontSize:10.5, fontWeight:800, color:T.grey, letterSpacing:'.14em', marginBottom:6, display:'flex', alignItems:'center', gap:6 }}>
        {label.toUpperCase()} {required && <span style={{ color:T.rose }}>*</span>}
        {sub && <span style={{ fontSize:10, color:T.grey, fontWeight:500, letterSpacing:0, textTransform:'none' }}>· {sub}</span>}
      </div>
      {children}
    </div>
  );
}

function inputStyle() {
  return { width:'100%', height:44, borderRadius:10, border:`1.5px solid ${T.greyLight}`, padding:'0 14px', fontSize:13.5, fontFamily:'inherit', color:T.ink, background:'#fff', outline:'none', boxSizing:'border-box' };
}

/* ============ Right rail (FAQ + ai assist + status) ============ */

function RightRail({ isMobile, openFaq, setOpenFaq }) {
  const faqs = [
    { q:'How do I cancel or modify my booking?', a:'Up to 7 days before departure: full refund, no questions. 3–7 days: 50% refund. Less than 3 days: spot is held; you can transfer to a friend. Tap "Cancel & refund" above or message us on WhatsApp.' },
    { q:'Where is my refund?',                   a:'Refunds settle in 5–7 working days back to the original payment method. We send you a SMS + email when initiated. If it\'s past day 7, message us with your booking ID.' },
    { q:'How do I change my trip dates?',        a:'Free date change up to 14 days before. After that, ₹500 fee. Pick your new date and we\'ll move your spot if availability holds.' },
    { q:"What's included in my booking?",        a:'Each trip page lists exact inclusions/exclusions under "What\'s included". Generally: stay, transport, breakfast, signature activities. Personal expenses and extra meals are not.' },
    { q:'How do I join the trip WhatsApp group?',a:'Group is created 48 hours before departure. You\'ll receive an invite link via WhatsApp on the number you booked with.' },
  ];
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
      {/* AI assist */}
      <div style={{ background:'#fff', color:T.ink, borderRadius:16, padding:isMobile?16:20, border:`1px solid ${T.greyLight}`, position:'relative' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:9.5, fontWeight:800, color:T.greenDeep, letterSpacing:'.14em', marginBottom:8, background:'#F0FAF4', padding:'4px 10px', borderRadius:999, border:`1px solid ${T.green}33` }}>
          <Ico name="spark" size={10} color={T.greenDeep}/> NEW · AI ASSIST
        </div>
        <div style={{ fontSize:isMobile?15:16, fontWeight:700, lineHeight:1.35, fontFamily:'Fraunces, serif', letterSpacing:'-.015em', color:T.ink }}>
          Ask anything about your booking.
        </div>
        <div style={{ fontSize:12.5, color:T.grey, marginTop:6, lineHeight:1.55 }}>
          Get an instant answer from our trip-aware assistant — handover to a human anytime.
        </div>
        <button style={{ marginTop:14, height:36, padding:'0 14px', borderRadius:999, background:'#fff', color:T.ink, border:`1.5px solid ${T.ink}`, fontSize:12.5, fontWeight:700, cursor:'pointer', fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:6 }}>
          Try it <Ico name="arrow-right" size={12} color={T.ink} stroke={2.4}/>
        </button>
      </div>

      {/* FAQ */}
      <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.greyLight}`, padding:isMobile?16:20 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
          <div style={{ width:30, height:30, borderRadius:8, background:'#F0FAF4', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Ico name="bell" size={14} color={T.greenDeep}/>
          </div>
          <div style={{ fontSize:14.5, fontWeight:700, color:T.ink, fontFamily:'Fraunces, serif' }}>Common questions</div>
        </div>
        <div>
          {faqs.map((f,i) => {
            const open = openFaq===i;
            return (
              <div key={i} style={{ borderTop: i===0 ? 'none' : `1px solid ${T.greyLight}` }}>
                <div onClick={()=>setOpenFaq(open?-1:i)} style={{ padding:'12px 0', display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:10, cursor:'pointer' }}>
                  <span style={{ fontSize:13, fontWeight:600, color:T.ink, lineHeight:1.4 }}>{f.q}</span>
                  <div style={{ transform:`rotate(${open?180:0}deg)`, transition:'transform .15s', flexShrink:0, marginTop:2 }}>
                    <Ico name="chevron-down" size={14} color={T.grey}/>
                  </div>
                </div>
                {open && <div style={{ fontSize:12.5, color:T.grey, lineHeight:1.6, paddingBottom:14 }}>{f.a}</div>}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop:8, paddingTop:12, borderTop:`1px solid ${T.greyLight}` }}>
          <a href="#" style={{ fontSize:12.5, color:T.greenDeep, fontWeight:700, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:5 }}>
            Browse all FAQs <Ico name="arrow-right" size={12} color={T.greenDeep} stroke={2.4}/>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ============ Trust stats strip ============ */

function TrustStats({ isMobile }) {
  const stats = [
    { v:'28 min', k:'AVG FIRST RESPONSE', icon:'clock' },
    { v:'4.7/5',  k:'SUPPORT RATING',     icon:'star' },
    { v:'99%',    k:'RESOLVED ON WHATSAPP', icon:'whatsapp' },
  ];
  return (
    <div style={{ marginTop:isMobile?20:32, background:'#F0FAF4', borderRadius:18, padding:isMobile?'18px 16px':'24px 24px', border:`1px solid ${T.green}33` }}>
      <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr 1fr 1fr':'repeat(3,1fr)', gap:isMobile?6:14 }}>
        {stats.map((s,i) => (
          <div key={s.k} style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', padding:'4px 4px', borderRight: !isMobile && i<2 ? `1px solid ${T.green}33` : 'none' }}>
            <div style={{ width:isMobile?32:40, height:isMobile?32:40, borderRadius:'50%', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:8, border:`1px solid ${T.green}33` }}>
              <Ico name={s.icon} size={isMobile?14:16} color={T.greenDeep}/>
            </div>
            <div style={{ fontSize:isMobile?17:22, fontWeight:800, color:T.ink, letterSpacing:'-.02em', fontFamily:'Fraunces, serif', lineHeight:1 }}>{s.v}</div>
            <div style={{ fontSize:isMobile?9.5:10.5, color:T.greenDeep, fontWeight:700, letterSpacing:'.12em', marginTop:6 }}>{s.k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ Floating support FAB ============ */

function SupportFab({ onOpen, isMobile, hide }) {
  const [open, setOpen] = React.useState(false);
  if (hide) return null;
  return (
    <>
      <button onClick={()=>setOpen(o=>!o)} aria-label="Open support" style={{
        position:'fixed', right:isMobile?16:24, bottom: isMobile ? 84 : 24, zIndex:70,
        width:isMobile?52:60, height:isMobile?52:60, borderRadius:'50%',
        background:`linear-gradient(135deg, ${T.green}, ${T.greenDeep})`, color:'#fff',
        border:'3px solid #fff', cursor:'pointer', fontFamily:'inherit',
        display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow:`0 12px 28px ${T.green}66`,
      }}>
        <Ico name={open?'x':'whatsapp'} size={isMobile?20:24} color="#fff" stroke={2.2}/>
      </button>
      {open && (
        <div style={{ position:'fixed', right:isMobile?16:24, bottom: isMobile ? 144 : 96, zIndex:70, width:isMobile?'calc(100% - 32px)':280, maxWidth:320, background:'#fff', borderRadius:14, boxShadow:'0 18px 50px rgba(15,30,46,.18)', border:`1px solid ${T.greyLight}`, overflow:'hidden' }}>
          <div style={{ padding:'14px 16px', background:`linear-gradient(135deg, ${T.green}, ${T.greenDeep})`, color:'#fff' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ position:'relative', width:8, height:8 }}>
                <span style={{ position:'absolute', inset:0, borderRadius:'50%', background:'#fff', opacity:.4, animation:'sup-pulse 1.6s ease-out infinite' }}/>
                <span style={{ position:'absolute', inset:0, borderRadius:'50%', background:'#fff' }}/>
              </span>
              <div style={{ fontSize:13, fontWeight:700, fontFamily:'Fraunces, serif', letterSpacing:'-.01em' }}>Need help right now?</div>
            </div>
            <div style={{ fontSize:11.5, color:'rgba(255,255,255,.85)', marginTop:4, lineHeight:1.4 }}>Real human · avg 28 min response</div>
          </div>
          <div style={{ padding:14, display:'flex', flexDirection:'column', gap:8 }}>
            <button style={{ height:40, padding:'0 14px', borderRadius:10, background:T.green, color:'#fff', border:'none', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              <Ico name="whatsapp" size={14} color="#fff"/> Open WhatsApp
            </button>
            <button onClick={()=>{ setOpen(false); onOpen && onOpen(); }} style={{ height:40, padding:'0 14px', borderRadius:10, background:'#fff', color:T.ink, border:`1.5px solid ${T.greyLight}`, fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              <Ico name="bell" size={14} color={T.greenDeep}/> Raise a ticket
            </button>
          </div>
        </div>
      )}
    </>
  );
}

Object.assign(window, { SupportPage, SupportFab });
