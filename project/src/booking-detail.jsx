function BookingDetail({ bookingId, onBack, onInvoice }) {
  const b = USER_BOOKINGS.find(x=>x.id===bookingId) || USER_BOOKINGS[0];
  const t = RISHIKESH_TRIP;
  const [copied, setCopied] = React.useState(false);
  const copy = () => { navigator.clipboard?.writeText(b.id); setCopied(true); setTimeout(()=>setCopied(false), 1400); };
  const isUp = b.status==='upcoming';
  const total = b.paid + b.balance;
  return (
    <div style={{ background:'#F4F6FA', minHeight:'calc(100vh - 64px)', paddingBottom:60 }}>
      <div style={{ background:T.ink, color:'#fff', padding:'24px 36px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div onClick={onBack} style={{ display:'inline-flex', alignItems:'center', gap:6, cursor:'pointer', color:'rgba(255,255,255,.75)', fontSize:13, fontWeight:500, marginBottom:14 }}>
            <Ico name="arrow-left" size={13} color="rgba(255,255,255,.75)"/>Back to My bookings
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:14, flexWrap:'wrap' }}>
            <span style={{ background:isUp?'#F0FAF4':'#FBEFE7', color:isUp?T.greenDeep:T.rose, padding:'4px 12px', borderRadius:999, fontSize:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' }}>{isUp?'Confirmed':b.status}</span>
            <span onClick={copy} title="Copy" style={{ fontSize:12, color:'rgba(255,255,255,.65)', fontFamily:'ui-monospace, Menlo, monospace', cursor:'pointer', display:'inline-flex', alignItems:'center', gap:6 }}>
              {b.id} <Ico name={copied?'check':'copy'} size={12} color="rgba(255,255,255,.6)"/>
            </span>
          </div>
          <h1 style={{ fontSize:40, fontWeight:800, letterSpacing:'-.025em', margin:'10px 0 4px', fontFamily:'Fraunces, serif' }}>{b.trip.dest}</h1>
          <div style={{ fontSize:14, color:'rgba(255,255,255,.75)' }}>{b.trip.dates} · {b.guests} travelers · Led by {b.trip.creator}</div>
        </div>
      </div>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'28px 36px 0', display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:24 }}>
        <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
          {isUp && <CountdownCard days={b.departsIn}/>}
          <ItineraryCard trip={t}/>
          <InclusionsCard trip={t}/>
          <PickupCard trip={t}/>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:18, position:'sticky', top:88, alignSelf:'start' }}>
          <PaymentCard b={b} total={total} onInvoice={onInvoice}/>
          <TripLeadCard/>
          <HelpCard/>
        </div>
      </div>
    </div>
  );
}

function CountdownCard({ days }) {
  return (
    <div style={{ background:`linear-gradient(135deg, #F0FAF4, #FAFBFC)`, border:`1px solid ${T.green}55`, borderRadius:14, padding:20, display:'flex', alignItems:'center', gap:16 }}>
      <div style={{ width:56, height:56, borderRadius:14, background:T.green, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff' }}>
        <Ico name="calendar" size={24} color="#fff"/>
      </div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:11, color:T.greenDeep, letterSpacing:'.12em', fontWeight:700, textTransform:'uppercase' }}>Your trip is live</div>
        <div style={{ fontSize:22, fontWeight:800, color:T.ink, fontFamily:'Fraunces, serif', letterSpacing:'-.02em', marginTop:2 }}>{days} days to departure</div>
      </div>
      <Btn kind="dark" size="sm" icon="whatsapp">Group</Btn>
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
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
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

function PaymentCard({ b, total, onInvoice }) {
  const isUp = b.status==='upcoming';
  return (
    <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.greyLight}`, padding:20 }}>
      <h3 style={{ fontSize:15, fontWeight:700, color:T.ink, margin:'0 0 14px', letterSpacing:'-.01em' }}>Payment</h3>
      <div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:13, marginBottom:12 }}>
        <div style={{ display:'flex', justifyContent:'space-between' }}><span style={{ color:T.grey }}>Trip total</span><span style={{ color:T.ink, fontWeight:600 }}>{inr(total)}</span></div>
        <div style={{ display:'flex', justifyContent:'space-between' }}><span style={{ color:T.grey }}>Paid (token)</span><span style={{ color:T.greenDeep, fontWeight:700 }}>− {inr(b.paid)}</span></div>
        {isUp && b.balance>0 && <div style={{ display:'flex', justifyContent:'space-between', paddingTop:8, borderTop:`1px dashed ${T.greyLight}` }}><span style={{ color:T.ink, fontWeight:700 }}>Balance due</span><span style={{ color:T.ink, fontWeight:800 }}>{inr(b.balance)}</span></div>}
      </div>
      {isUp && b.balance>0 && (
        <div style={{ background:'#FFF7EA', border:`1px solid ${T.amber}55`, borderRadius:10, padding:12, fontSize:12, color:T.ink, marginBottom:12, lineHeight:1.5 }}>
          <b>Auto-charged {b.departsIn<=7?'in 24h':'7 days before departure'}</b> to your saved UPI. Or pay now.
        </div>
      )}
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {isUp && b.balance>0 && <Btn kind="primary" size="lg" full trailing="arrow-right">Pay {inr(b.balance)} now</Btn>}
        <Btn kind="outline" size="lg" full icon="download" onClick={onInvoice}>Download invoice</Btn>
        {isUp && <Btn kind="ghost" size="sm" full>Request cancellation</Btn>}
      </div>
    </div>
  );
}

function TripLeadCard() {
  return (
    <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.greyLight}`, padding:20 }}>
      <h3 style={{ fontSize:15, fontWeight:700, color:T.ink, margin:'0 0 14px', letterSpacing:'-.01em' }}>Your trip lead</h3>
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        <div style={{ width:52, height:52, borderRadius:'50%', background:'linear-gradient(135deg, #d6a8c0, #c78fa8)' }}/>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:14, fontWeight:700, color:T.ink }}>Tanya Gupta</div>
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

function HelpCard() {
  return (
    <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.greyLight}`, padding:20 }}>
      <h3 style={{ fontSize:15, fontWeight:700, color:T.ink, margin:'0 0 4px', letterSpacing:'-.01em' }}>Need help?</h3>
      <div style={{ fontSize:12.5, color:T.grey, marginBottom:12 }}>24/7 support before and during your trip.</div>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:13, color:T.ink, padding:'8px 0', borderBottom:`1px dashed ${T.greyLight}` }}>Reschedule dates <Ico name="chevron-right" size={12} color={T.grey}/></div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:13, color:T.ink, padding:'8px 0', borderBottom:`1px dashed ${T.greyLight}` }}>Add a traveler <Ico name="chevron-right" size={12} color={T.grey}/></div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:13, color:T.ink, padding:'8px 0' }}>Contact concierge <Ico name="chevron-right" size={12} color={T.grey}/></div>
      </div>
    </div>
  );
}

function Invoice({ bookingId, onBack }) {
  const b = USER_BOOKINGS.find(x=>x.id===bookingId) || USER_BOOKINGS[0];
  const t = RISHIKESH_TRIP;
  const base = t.pricing.base * b.guests;
  const tax = t.pricing.tax * b.guests;
  const fee = t.pricing.convenience * b.guests;
  const total = base + tax + fee;
  const subtotal = base + fee;
  const cgst = Math.round(tax/2), sgst = tax - cgst;
  return (
    <div style={{ background:'#F4F6FA', minHeight:'calc(100vh - 64px)', padding:'28px 36px 60px' }}>
      <style>{`@media print { body { background:#fff!important; } .no-print { display:none!important; } .invoice-sheet { box-shadow:none!important; border:none!important; margin:0!important; } }`}</style>
      <div style={{ maxWidth:860, margin:'0 auto' }}>
        <div className="no-print" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <Btn kind="ghost" size="sm" icon="arrow-left" onClick={onBack}>Back</Btn>
          <div style={{ display:'flex', gap:8 }}>
            <Btn kind="outline" size="sm" icon="send">Email invoice</Btn>
            <Btn kind="dark" size="sm" icon="download" onClick={()=>window.print()}>Download PDF</Btn>
          </div>
        </div>
        <div className="invoice-sheet" style={{ background:'#fff', borderRadius:8, border:`1px solid ${T.greyLight}`, boxShadow:'0 2px 12px rgba(0,0,0,.04)', padding:48 }}>
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
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, padding:'24px 0', borderBottom:`1px solid ${T.greyLight}` }}>
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

Object.assign(window, { BookingDetail, Invoice });
