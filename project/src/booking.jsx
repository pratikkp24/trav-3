// Booking — single-page "Customise your trip" flow.
// All sections live on one page (no multi-step stepper), with a sticky
// price-details panel on the right. After submit, shows the confirmation state.

function Booking({ mode='quick', onBack, onBookAnother, onViewBookings }) {
  const [showRetention, setShowRetention] = React.useState(false);
  const t = React.useMemo(() => resolveViewTrip() || RISHIKESH_TRIP, []);
  
  // Intercept the back action
  const handleBackIntercept = () => setShowRetention(true);
  
  // Detect exit intent (mouse leaving window)
  useExitIntent(() => setShowRetention(true), !showRetention);

  return (
    <>
      {mode === 'quick' ? (
        <QuickBook onBack={handleBackIntercept} onBookAnother={onBookAnother} onViewBookings={onViewBookings}/>
      ) : (
        <CustomiseFlow onBack={handleBackIntercept} onBookAnother={onBookAnother}/>
      )}
      
      <RetentionModal 
        isOpen={showRetention} 
        onClose={() => setShowRetention(false)} 
        onExit={onBack} 
        context="booking"
        tripName={t.dest}
      />
    </>
  );
}

function CustomiseFlow({ onBack, onBookAnother }) {
  const isMobile = useIsMobile();
  const t = React.useMemo(() => resolveViewTrip() || RISHIKESH_TRIP, []);
  const [confirmed, setConfirmed] = React.useState(false);

  // Who's going
  const [vibe, setVibe] = React.useState('solo');
  const [guests, setGuests] = React.useState(1);
  const [isFemale, setIsFemale] = React.useState(true);
  const [travHer, setTravHer] = React.useState(false);
  const [splitPay, setSplitPay] = React.useState(false);

  // Customisation
  const [transport, setTransport] = React.useState('standard');
  const [stay, setStay] = React.useState('comfort');
  const [meals, setMeals] = React.useState('basic');
  const [addons, setAddons] = React.useState({ yoga:true, photographer:false, insurance:true });

  // Traveler details
  const [gstOn, setGstOn] = React.useState(false);

  React.useEffect(()=>{ if (vibe==='solo') setGuests(1); if (vibe==='couple') setGuests(2); if (vibe==='group' && guests<3) setGuests(4); if (vibe==='family' && guests<3) setGuests(4); }, [vibe]);

  const p = t.pricing;
  const transportDelta = { standard:0, selfdrive:-1200, premium:800 }[transport];
  const stayDelta = { backpacker:0, comfort:1500, luxury:3500 }[stay];
  const mealsDelta = { basic:0, full:900, none:-400 }[meals];
  const aP = { yoga:0, photographer:1499, insurance:299 };
  const addonTotal = Object.entries(addons).reduce((s,[k,v])=>s+(v?aP[k]:0),0);
  const basePerPerson = p.base + transportDelta + stayDelta + mealsDelta;
  const base = basePerPerson * guests;
  const tax = Math.round(p.tax * guests);
  const fee = Math.round(p.convenience * guests);
  const addOns = addonTotal * guests;
  const th = travHer ? 500 * guests : 0;
  const total = base + tax + fee + addOns + th;
  const token = p.token * guests;
  const balance = total - token;

  if (confirmed) return <CallbackQueued trip={t} onBookAnother={onBookAnother}/>;

  return (
    <div style={{ background:'#F4F6FA', minHeight:'calc(100vh - 64px)', padding:isMobile ? '20px 16px 100px' : '28px 36px 80px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14, flexWrap:'wrap', gap:10 }}>
          <Btn kind="ghost" size="sm" icon="arrow-left" onClick={onBack}>{isMobile ? 'Back' : 'Back to itinerary'}</Btn>
          <button onClick={()=>alert('Our team will call you within 10 minutes.')} style={{
            height:36, padding:'0 14px', borderRadius:999, border:`1px solid ${T.greyLight}`, background:'#fff',
            fontSize:12.5, fontWeight:600, color:T.ink, cursor:'pointer', fontFamily:'inherit',
            display:'inline-flex', alignItems:'center', gap:8
          }}>
            <Ico name="phone" size={13} color={T.greenDeep}/> Request a callback
          </button>
        </div>

        <div style={{ marginBottom:22 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 12px', borderRadius:999, background:T.roseCream, color:T.rose, fontSize:11, fontWeight:800, letterSpacing:'.12em', marginBottom:10 }}>
            <Ico name="rose" size={12}/> CUSTOM QUOTE · CALLBACK
          </div>
          <h1 style={{ fontSize:isMobile?28:34, fontWeight:700, color:T.ink, letterSpacing:'-.025em', margin:0, fontFamily:'Fraunces, serif', lineHeight:1.1 }}>Customise your trip</h1>
          <div style={{ fontSize:14, color:T.grey, marginTop:6, maxWidth:640, lineHeight:1.5 }}>
            Pick what you want. A trav curator calls you in 10 minutes with a personalised quote. No payment taken until you confirm.
          </div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, marginTop:14, background:'#EEF2F9', padding:'7px 14px', borderRadius:999, fontSize:12.5, color:T.inkSoft, fontWeight:600, maxWidth:'100%' }}>
            <Ico name="calendar" size={13} color={T.greenDeep}/>
            <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>Delhi → {t.dest} · 2N/3D · {inr(t.price)}/pp · {t.dates.split(' · ')[1]}</span>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1.6fr 1fr', gap:24, alignItems:'start' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <CardSection title="Who's going?" eyebrow="Step 01">
              <VibePicker vibe={vibe} setVibe={setVibe} isFemale={isFemale} setIsFemale={setIsFemale} travHer={travHer} setTravHer={setTravHer}/>
              <div style={{ marginTop:16, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div style={{ background:'#F7F9FB', borderRadius:12, padding:14 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:T.ink, marginBottom:10 }}>How many people?</div>
                  <div style={{ display:'flex', alignItems:'center', gap:10, background:'#fff', borderRadius:10, padding:'8px 10px', border:`1px solid ${T.greyLight}` }}>
                    <button onClick={()=>setGuests(Math.max(1,guests-1))} style={stepBtn3}>−</button>
                    <span style={{ flex:1, textAlign:'center', fontSize:22, fontWeight:700, color:T.ink }}>{guests}</span>
                    <button onClick={()=>setGuests(Math.min(vibe==='solo'?1:8,guests+1))} style={stepBtn3}>+</button>
                  </div>
                </div>
                {guests>1 ? (
                  <div style={{ background:'#F7F9FB', borderRadius:12, padding:14, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:10 }}>
                      <div>
                        <div style={{ fontSize:12, fontWeight:700, color:T.ink }}>Split payment?</div>
                        <div style={{ fontSize:11.5, color:T.grey, marginTop:2 }}>Each traveler pays their share.</div>
                      </div>
                      <Toggle on={splitPay} setOn={setSplitPay}/>
                    </div>
                    {splitPay && <div style={{ marginTop:8, fontSize:12, fontWeight:700, color:T.greenDeep, display:'inline-flex', alignItems:'center', gap:6, cursor:'pointer' }}>Invite friends via link <Ico name="copy" size={11} color={T.greenDeep}/></div>}
                  </div>
                ) : (
                  <SpotsFilledBar trip={t}/>
                )}
              </div>
              {guests>1 && <div style={{ marginTop:12 }}><SpotsFilledBar trip={t}/></div>}
            </CardSection>

            <CardSection title="Transport preference" eyebrow="Step 02">
              <OptionGrid value={transport} setValue={setTransport} opts={[
                { id:'standard', tag:'STANDARD', name:'Include transport from Delhi', note:'(₹ included)', delta:0, icon:'car' },
                { id:'selfdrive', tag:'SELF-DRIVE', name:'I have my own vehicle', note:'(-₹1,200)', delta:-1200, icon:'car' },
                { id:'premium', tag:'PREMIUM', name:"I'm flying", note:'(+₹800)', delta:800, icon:'plane' },
              ]}/>
            </CardSection>

            <CardSection title="Accommodation" eyebrow="Step 03">
              <OptionGrid value={stay} setValue={setStay} opts={[
                { id:'backpacker', tag:'BACKPACKER', name:'Camp / Shared', note:'(included)', delta:0, icon:'bed' },
                { id:'comfort', tag:'COMFORT', name:'Private Room', note:'(+₹1,500)', delta:1500, icon:'bed' },
                { id:'luxury', tag:'LUXURY', name:'Premium Stay', note:'(+₹3,500)', delta:3500, icon:'bed' },
              ]}/>
            </CardSection>

            <CardSection title="Meal plan" eyebrow="Step 04">
              <OptionGrid value={meals} setValue={setMeals} opts={[
                { id:'basic', tag:'BASIC', name:'Breakfast only', note:'(included)', delta:0, icon:'sun' },
                { id:'full', tag:'FULL BOARD', name:'All meals', note:'(+₹900)', delta:900, icon:'star' },
                { id:'none', tag:'NO FRILLS', name:'No meals', note:'(-₹400)', delta:-400, icon:'x' },
              ]}/>
            </CardSection>

            <CardSection title="Add-ons" eyebrow="Step 05">
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {[
                  { k:'yoga', name:'Sunrise yoga session', sub:'Sunday 6:30 AM riverside flow.', price:0, icon:'sun' },
                  { k:'photographer', name:'Pro photographer', sub:'Shared gallery delivered in 3 days.', price:1499, icon:'star' },
                  { k:'insurance', name:'Trip insurance', sub:'Medical, cancellation, lost baggage.', price:299, icon:'shield' },
                ].map(it => {
                  const on=addons[it.k];
                  return (
                    <div key={it.k} onClick={()=>setAddons({ ...addons, [it.k]: !on })} style={{ padding:14, borderRadius:12, cursor:'pointer', border:`1.5px solid ${on?T.green:T.greyLight}`, background:on?'#F0FAF4':'#fff', display:'flex', gap:12, alignItems:'center' }}>
                      <div style={{ width:38, height:38, borderRadius:10, background:on?T.green:'#F4F6FA', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <Ico name={it.icon} size={16} color={on?'#fff':T.grey}/>
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13.5, fontWeight:700, color:T.ink }}>{it.name}</div>
                        <div style={{ fontSize:12, color:T.grey, marginTop:2 }}>{it.sub}</div>
                      </div>
                      <div style={{ fontSize:13.5, fontWeight:700, color:on?T.greenDeep:T.ink }}>{it.price===0?'Free':`+${inr(it.price)}`}</div>
                    </div>
                  );
                })}
              </div>
            </CardSection>

            <CardSection title="Your details" eyebrow="Step 06">
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div><span style={lbl}>Full name</span><input style={inp} placeholder="As on your ID"/></div>
                <div><span style={lbl}>Mobile</span><input style={inp} placeholder="+91 98xxx xxxxx"/></div>
                <div style={{ gridColumn:'1/-1' }}><span style={lbl}>Email</span><input style={inp} placeholder="you@mail.com"/></div>
              </div>
              <div style={{ marginTop:14, padding:14, borderRadius:12, border:`1px solid ${T.greyLight}`, background:gstOn?'#F7F9FB':'#fff' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10 }}>
                  <div>
                    <div style={{ fontSize:13.5, fontWeight:700, color:T.ink }}>Need a GST invoice?</div>
                    <div style={{ fontSize:12, color:T.grey, marginTop:2 }}>We'll email you a GSTIN-compliant invoice with your booking.</div>
                  </div>
                  <Toggle on={gstOn} setOn={setGstOn}/>
                </div>
                {gstOn && (
                  <div style={{ marginTop:12, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                    <div style={{ gridColumn:'1/-1' }}><span style={lbl}>GSTIN</span><input style={inp} placeholder="22AAAAA0000A1Z5"/></div>
                    <div style={{ gridColumn:'1/-1' }}><span style={lbl}>Registered company name</span><input style={inp} placeholder="Acme Pvt Ltd"/></div>
                    <div><span style={lbl}>Billing state</span><input style={inp} placeholder="Karnataka"/></div>
                    <div><span style={lbl}>PIN code</span><input style={inp} placeholder="560001"/></div>
                  </div>
                )}
              </div>
            </CardSection>

            <CardSection title="What happens next" eyebrow="Step 07">
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {[
                  { icon:'phone', title:'A curator calls you in 10 minutes', body:'Walk-through of your customised quote and itinerary tweaks.' },
                  { icon:'send', title:'Personalised quote on WhatsApp + email', body:'Approved by you before any payment is taken.' },
                  { icon:'check', title:'Lock your spot when you\'re ready', body:'Pay only the ₹2,000 token once the quote is final.' },
                ].map((it,i)=>(
                  <div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start', padding:'10px 0' }}>
                    <div style={{ width:34, height:34, borderRadius:10, background:'#F0FAF4', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <Ico name={it.icon} size={15} color={T.greenDeep}/>
                    </div>
                    <div>
                      <div style={{ fontSize:13.5, fontWeight:700, color:T.ink }}>{it.title}</div>
                      <div style={{ fontSize:12.5, color:T.grey, marginTop:2, lineHeight:1.45 }}>{it.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardSection>
          </div>

          <div style={{ alignSelf:'start', position:isMobile?'static':'sticky', top:88, display:'flex', flexDirection:'column', gap:12, marginTop:isMobile?10:0 }}>
            <PriceCard trip={t} guests={guests} basePerPerson={basePerPerson} base={base} tax={tax} fee={fee} addOns={addOns} th={th} travHer={travHer} transport={transport} stay={stay} meals={meals} addons={addons} total={total} token={token} balance={balance} gstOn={gstOn} mode="customise" onPay={()=>setConfirmed(true)}/>
            <div style={{ padding:'12px 16px', background:'#fff', borderRadius:14, border:`1px solid ${T.greyLight}`, display:'flex', alignItems:'center', gap:10 }}>
              <Ico name="shield" size={16} color={T.greenDeep}/>
              <div style={{ fontSize:12, color:T.grey, lineHeight:1.4 }}>
                <b style={{ color:T.ink, fontWeight:700 }}>Price Guarantee</b> · match any lower price elsewhere for this exact itinerary.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardSection({ title, eyebrow, children }) {
  return (
    <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.greyLight}`, padding:22 }}>
      <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:14 }}>
        <h3 style={{ fontSize:18, fontWeight:700, color:T.ink, letterSpacing:'-.015em', margin:0, fontFamily:'Fraunces, serif' }}>{title}</h3>
        {eyebrow && <span style={{ fontSize:10.5, fontWeight:800, color:T.grey, letterSpacing:'.14em' }}>{eyebrow}</span>}
      </div>
      {children}
    </div>
  );
}

function VibePicker({ vibe, setVibe, isFemale, setIsFemale, travHer, setTravHer }) {
  const vibes = [
    { id:'solo', label:'Solo', icon:'users' },
    { id:'couple', label:'Couple', icon:'heart' },
    { id:'group', label:'Group', icon:'users' },
    { id:'family', label:'Family', icon:'users' },
  ];
  const highlightSolo = vibe==='solo' && isFemale;
  return (
    <div>
      <div style={{ fontSize:10.5, fontWeight:800, color:T.grey, letterSpacing:'.16em', marginBottom:10 }}>SELECT YOUR VIBE</div>
      <div style={{ display:'grid', gridTemplateColumns:isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap:10 }}>
        {vibes.map(v => {
          const a = vibe===v.id;
          const soloFem = v.id==='solo' && isFemale;
          const activeColor = soloFem && a ? T.rose : T.green;
          return (
            <div key={v.id} onClick={()=>setVibe(v.id)} style={{
              padding:isMobile ? '12px 8px' : '16px 10px', borderRadius:14, cursor:'pointer', textAlign:'center', position:'relative',
              background: a ? activeColor : '#fff',
              color: a ? '#fff' : T.ink,
              border: `1.5px solid ${a ? activeColor : T.greyLight}`,
              boxShadow: a ? '0 6px 14px rgba(15,30,46,.12)' : 'none',
              transition:'all .15s'
            }}>
              {a && <div style={{ position:'absolute', top:-8, right:-8, width:22, height:22, borderRadius:'50%', background:activeColor, border:`2px solid #fff`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Ico name="check" size={11} color="#fff" stroke={3}/>
              </div>}
              <div style={{ display:'flex', justifyContent:'center', marginBottom:6 }}>
                {v.id==='couple' ? <Ico name="heart" size={22} color={a?'#fff':T.ink}/> : v.id==='solo' && isFemale ? <Ico name="rose" size={22}/> : <Ico name={v.icon} size={22} color={a?'#fff':T.ink}/>}
              </div>
              <div style={{ fontSize:isMobile?12:13, fontWeight:700 }}>{v.label}</div>
            </div>
          );
        })}
      </div>

      {vibe==='solo' && (
        <div style={{ marginTop:14, padding:16, borderRadius:14, background:highlightSolo?T.roseCream:'#F7F9FB', border:`1.5px solid ${highlightSolo?T.rose:T.greyLight}`, transition:'all .2s' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:14, flexWrap:'wrap' }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <Ico name="rose" size={30}/>
              <div>
                <div style={{ fontSize:13.5, fontWeight:700, color:highlightSolo?T.rose:T.ink, fontFamily:'Fraunces, serif' }}>
                  {highlightSolo ? 'trav.her · solo-female cohort highlighted' : 'Traveling as a woman?'}
                </div>
                <div style={{ fontSize:12, color:T.grey, marginTop:2, maxWidth:520, lineHeight:1.45 }}>
                  {highlightSolo
                    ? 'Women-only group of 8, verified safe stays, female trip lead. +₹500/traveler.'
                    : 'Toggle this on to unlock the trav.her women-only cohort with female trip lead and verified safe stays.'}
                </div>
              </div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:T.grey, fontWeight:600 }}>
                I'm a woman <Toggle on={isFemale} setOn={setIsFemale} color={T.rose}/>
              </div>
              {isFemale && (
                <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:T.rose, fontWeight:700 }}>
                  Join trav.her <Toggle on={travHer} setOn={setTravHer} color={T.rose}/>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SpotsFilledBar({ trip }) {
  const booked = trip.spotsTotal - trip.spotsLeft;
  const pct = Math.round((booked / trip.spotsTotal) * 100);
  return (
    <div style={{ background:'#F7F9FB', borderRadius:12, padding:14 }}>
      <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, fontWeight:700, marginBottom:6 }}>
        <span style={{ color:T.ink }}>Spots filling up</span>
        <span style={{ color:pct>=60?T.fire:T.greenDeep }}>{booked}/{trip.spotsTotal} filled · {pct}%</span>
      </div>
      <div style={{ height:8, borderRadius:999, background:T.greyLight, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${pct}%`, background:pct>=60?`linear-gradient(90deg, ${T.fire}, #dc2626)`:`linear-gradient(90deg, ${T.green}, ${T.greenDeep})`, borderRadius:999, transition:'width .3s' }}/>
      </div>
      <div style={{ fontSize:11.5, color:T.grey, marginTop:6, display:'flex', alignItems:'center', gap:6 }}>
        <Ico name="fire" size={11} color={T.fire}/> {trip.spotsLeft} spots left · {trip.viewingNow} viewing now
      </div>
    </div>
  );
}

function OptionGrid({ value, setValue, opts }) {
  const isMobile = useIsMobile();
  return (
    <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'repeat(3, 1fr)', gap:10 }}>
      {opts.map(o => {
        const a = value===o.id;
        return (
          <div key={o.id} onClick={()=>setValue(o.id)} style={{
            padding:'14px 12px', borderRadius:12, cursor:'pointer', position:'relative',
            border:`1.5px solid ${a?T.green:T.greyLight}`,
            background:a?'#F0FAF4':'#fff',
            transition:'all .15s',
            display:isMobile?'flex':'block',
            alignItems:isMobile?'center':'stretch',
            gap:isMobile?12:0
          }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:isMobile?0:6, width:isMobile?32:undefined, flexShrink:0 }}>
              {!isMobile && <span style={{ fontSize:10, fontWeight:800, color:a?T.greenDeep:T.grey, letterSpacing:'.14em' }}>{o.tag}</span>}
              <div style={{ width:18, height:18, borderRadius:'50%', border:`1.5px solid ${a?T.green:T.greyLight}`, background:a?T.green:'transparent', display:'flex', alignItems:'center', justifyContent:'center' }}>{a && <Ico name="check" size={10} color="#fff" stroke={3}/>}</div>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13.5, fontWeight:700, color:T.ink, lineHeight:1.3 }}>{o.name}</div>
              <div style={{ fontSize:11.5, color:o.delta<0?T.greenDeep:o.delta>0?T.rose:T.grey, fontWeight:600, marginTop:4 }}>{o.note}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PriceCard({ trip, guests, basePerPerson, base, tax, fee, addOns, th, travHer, transport, stay, meals, addons, total, token, balance, gstOn, mode='quick', onPay }) {
  const labelMap = { yoga:'Sunrise yoga', photographer:'Pro photographer', insurance:'Trip insurance' };
  const pricesA = { yoga:0, photographer:1499, insurance:299 };
  return (
    <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.greyLight}`, overflow:'hidden' }}>
      <div style={{ padding:'16px 18px 0', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ fontSize:11, fontWeight:800, color:T.grey, letterSpacing:'.14em' }}>PRICE DETAILS</div>
        <span style={{ display:'inline-flex', alignItems:'center', gap:4, fontSize:10, fontWeight:800, background:'#FFF5D6', color:'#b3791f', padding:'3px 9px', borderRadius:999, letterSpacing:'.08em' }}>
          <Ico name="fire" size={10} color="#b3791f"/> FILLING FAST
        </span>
      </div>
      <div style={{ padding:'8px 18px 0', fontSize:12, color:T.grey }}>{guests} {guests===1?'Adult':'Adults'} · 3 Nights</div>
      <div style={{ padding:'12px 18px 0', display:'flex', flexDirection:'column', gap:7, fontSize:13 }}>
        <Row2 icon="calendar" l={`Base (${inr(p_baseFromDelta(trip, transport, stay, meals))} × ${guests})`} r={inr(base)}/>
        <Row2 icon="car" l="Transport" r={transportLabel(transport)}/>
        <Row2 icon="bed" l="Stay" r={stayLabel(stay)}/>
        <Row2 icon="sun" l="Meals" r={mealsLabel(meals)}/>
        {Object.entries(addons).filter(([,v])=>v && pricesA[v?.toString?.()]===undefined).map(([k])=>(
          <Row2 key={k} icon={k==='photographer'?'star':k==='insurance'?'shield':'sun'} l={labelMap[k]} r={pricesA[k]?`+${inr(pricesA[k]*guests)}`:'Free'}/>
        ))}
        {travHer && <Row2 icon="rose" l="trav.her cohort" r={`+${inr(th)}`}/>}
        <Row2 l="Taxes" r={inr(tax)}/>
        <Row2 l="Convenience fee" r={inr(fee)}/>
        {gstOn && <Row2 icon="check" l="GST invoice" r="Included"/>}
      </div>
      <div style={{ margin:'14px 18px 0', padding:'14px 0 0', borderTop:`1px dashed ${T.greyLight}` }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:T.grey, letterSpacing:'.12em' }}>YOUR PRICE</div>
            <div style={{ fontSize:11.5, color:T.grey, marginTop:3 }}>Total for {guests}</div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:26, fontWeight:800, color:T.ink, letterSpacing:'-.02em' }}>{inr(total)}</div>
            <div style={{ fontSize:11.5, color:T.grey, marginTop:2 }}>{inr(Math.round(total/guests))} / person</div>
          </div>
        </div>
      </div>
      <div style={{ padding:'14px 18px 18px' }}>
        {mode==='customise' ? (
          <>
            <div style={{ background:'#F0FAF4', borderRadius:10, padding:'10px 12px', display:'flex', gap:8, alignItems:'center', border:`1px solid ${T.green}33`, marginBottom:12 }}>
              <Ico name="phone" size={14} color={T.greenDeep}/>
              <span style={{ fontSize:11.5, color:T.greenDeep, fontWeight:600, lineHeight:1.35 }}>A curator calls you in 10 minutes to confirm this quote. No charge now.</span>
            </div>
            <Btn kind="primary" size="lg" full trailing="arrow-right" onClick={onPay}>Request a callback</Btn>
            <div style={{ marginTop:10, fontSize:11, color:T.grey, textAlign:'center', lineHeight:1.4 }}>
              Quote held for 24 hours. Pay only when you confirm.
            </div>
          </>
        ) : (
          <>
            <div style={{ background:'#F0FAF4', borderRadius:10, padding:'10px 12px', display:'flex', justifyContent:'space-between', alignItems:'baseline', border:`1px solid ${T.green}33`, marginBottom:12 }}>
              <span style={{ fontSize:12, color:T.greenDeep, fontWeight:700 }}>Pay now (token)</span>
              <span style={{ fontSize:16, fontWeight:800, color:T.greenDeep }}>{inr(token)}</span>
            </div>
            <div style={{ marginBottom:14 }}>
              <label style={{ display:'flex', alignItems:'flex-start', gap:10, cursor:'pointer' }}>
                <input type="checkbox" checked={termsAgreed} onChange={e=>setTermsAgreed(e.target.checked)} style={{ marginTop:3, accentColor:T.greenDeep }}/>
                <div style={{ fontSize:11.5, color:T.grey, lineHeight:1.4 }}>
                  I agree to the <span style={{ textDecoration:'underline', color:T.ink }}>Terms of Service</span> and <span style={{ textDecoration:'underline', color:T.ink }}>Refund Policy</span>.
                </div>
              </label>
            </div>
            <Btn kind="primary" size="lg" full trailing="arrow-right" disabled={!termsAgreed} onClick={startPayment}>Confirm & Pay {inr(token)}</Btn>
            <div style={{ marginTop:10, fontSize:11, color:T.grey, textAlign:'center', lineHeight:1.4 }}>
              Balance {inr(balance)} auto-collected 7 days before. Free cancellation up to 7 days.
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function p_baseFromDelta(trip, transport, stay, meals){
  const transportDelta = { standard:0, selfdrive:-1200, premium:800 }[transport];
  const stayDelta = { backpacker:0, comfort:1500, luxury:3500 }[stay];
  const mealsDelta = { basic:0, full:900, none:-400 }[meals];
  return trip.pricing.base + transportDelta + stayDelta + mealsDelta;
}
function transportLabel(t){ return ({ standard:'Standard', selfdrive:'Self-drive · -₹1,200', premium:'Flying · +₹800' }[t]); }
function stayLabel(s){ return ({ backpacker:'Backpacker', comfort:'Comfort · +₹1,500', luxury:'Luxury · +₹3,500' }[s]); }
function mealsLabel(m){ return ({ basic:'Basic · Breakfast', full:'Full board · +₹900', none:'No meals · -₹400' }[m]); }

function Row2({ icon, l, r }) {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
      <span style={{ color:T.grey, display:'inline-flex', alignItems:'center', gap:8 }}>
        {icon && <Ico name={icon} size={12} color={T.greenDeep}/>} {l}
      </span>
      <span style={{ color:T.ink, fontWeight:600 }}>{r}</span>
    </div>
  );
}

function ConfirmedOnePage({ trip, guests, total, token, onBookAnother, onRetry, onViewBookings, bookingId, payment, status='success' }) {
  // WhatsApp recovery deep link — prefilled message so the ops team has context.
  const waMsg = encodeURIComponent(`Hi trav, I need help with booking ${bookingId || ''} for ${trip.dest} (${guests} ${guests===1?'traveler':'travelers'}). Status: ${status}.`);
  const waHref = `https://wa.me/919999999999?text=${waMsg}`;
  const dropHold = () => { try { clearPendingBooking(); } catch {} onBookAnother && onBookAnother(); };
  const isTH = !!trip.travHer;
  const accent = isTH ? T.rose : T.green;
  const accentDeep = isTH ? '#9c3a2a' : T.greenDeep;
  const accentSoft = isTH ? T.roseCream : '#F0FAF4';

  // Visual/text map per payment status
  const variant = {
    success:   { icon:'check',  tone:accent,    soft:accentSoft,   deep:accentDeep, eyebrow:'SPOT LOCKED',     title:"You're in.",            copy: <>Spot locked for {guests} on <b style={{ color:T.ink }}>{trip.dest}</b>. Itinerary mailed, WhatsApp group ready.</> },
    simulated: { icon:'check',  tone:accent,    soft:accentSoft,   deep:accentDeep, eyebrow:'SPOT LOCKED · SIMULATED', title:"You're in.",     copy: <>Razorpay SDK wasn't reachable so we simulated this confirmation. In production, the real flow runs identically — spot is still logged for <b style={{ color:T.ink }}>{trip.dest}</b>.</> },
    pending:   { icon:'clock',  tone:T.amber,   soft:'#FFF5D6',    deep:'#A37A1A',  eyebrow:'PAYMENT PENDING', title:'Hold on, banking is slow.', copy: <>Your bank hasn't confirmed yet — this can take up to 10 minutes. We've reserved your seats for <b style={{ color:T.ink }}>{trip.dest}</b> meanwhile.</> },
    failed:    { icon:'alert',  tone:T.rose,    soft:T.roseCream,  deep:'#9c3a2a',  eyebrow:'PAYMENT FAILED',  title:"That didn't go through.", copy: <>Your bank declined the charge. Nothing's been debited. Try again with the same method or switch to UPI for the fastest retry.</> },
  }[status] || { icon:'check', tone:accent, soft:accentSoft, deep:accentDeep, eyebrow:'SPOT LOCKED', title:"You're in.", copy:null };

  return (
    <div style={{ background:'#F4F6FA', minHeight:'calc(100vh - 64px)', padding:'60px 36px' }}>
      <div style={{ maxWidth:720, margin:'0 auto', background:'#fff', borderRadius:20, border:`1px solid ${T.greyLight}`, padding:'40px 40px 28px', textAlign:'center', boxShadow:'0 12px 40px rgba(15,30,46,.06)' }}>
        <div style={{ width:72, height:72, borderRadius:'50%', background:variant.soft, margin:'0 auto 18px', display:'flex', alignItems:'center', justifyContent:'center', border:`2px solid ${variant.tone}55` }}>
          <Ico name={variant.icon} size={32} color={variant.tone} stroke={3}/>
        </div>
        <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 11px', borderRadius:999, background:variant.soft, color:variant.deep, fontSize:10.5, fontWeight:800, letterSpacing:'.14em', marginBottom:12 }}>
          {variant.eyebrow}
        </div>
        <h2 style={{ fontSize:32, fontWeight:700, color:T.ink, letterSpacing:'-.02em', margin:0, fontFamily:'Fraunces, serif' }}>{variant.title}</h2>
        <div style={{ fontSize:15, color:T.grey, marginTop:10, maxWidth:480, margin:'10px auto 0', lineHeight:1.55 }}>
          {variant.copy}
        </div>
        <div style={{ margin:'28px auto 0', maxWidth:480, border:`1px dashed ${T.greyLight}`, borderRadius:14, padding:20, textAlign:'left', background:status==='failed'?'#FFFBFA':'#fff' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:10 }}>
            <div>
              <div style={{ fontSize:10.5, color:T.grey, letterSpacing:'.12em', fontWeight:700 }}>BOOKING ID</div>
              <div style={{ fontSize:16, fontWeight:700, color:T.ink, fontFamily:'ui-monospace, Menlo, monospace', marginTop:2 }}>{bookingId}</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:10.5, color:T.grey, letterSpacing:'.12em', fontWeight:700 }}>{status==='failed'?'ATTEMPTED':status==='pending'?'ON HOLD':'PAID'}</div>
              <div style={{ fontSize:18, fontWeight:800, color:variant.deep }}>{inr(token)}</div>
            </div>
          </div>
          {payment?.razorpay_payment_id && (
            <div style={{ marginTop:14, paddingTop:12, borderTop:`1px dashed ${T.greyLight}`, display:'flex', justifyContent:'space-between', alignItems:'center', gap:10, flexWrap:'wrap' }}>
              <div>
                <div style={{ fontSize:10.5, color:T.grey, letterSpacing:'.12em', fontWeight:700 }}>RAZORPAY PAYMENT ID</div>
                <div style={{ fontSize:13, fontWeight:600, color:T.inkSoft, fontFamily:'ui-monospace, Menlo, monospace', marginTop:2 }}>{payment.razorpay_payment_id}</div>
              </div>
              <span style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'4px 10px', borderRadius:999, background:variant.soft, color:variant.deep, fontSize:10.5, fontWeight:800, letterSpacing:'.1em' }}>
                <Ico name="shield" size={11} color={variant.deep} stroke={2.4}/> {payment.simulated?'TEST · SIMULATED':'TEST MODE'}
              </span>
            </div>
          )}
          {status==='pending' && (
            <div style={{ marginTop:14, paddingTop:12, borderTop:`1px dashed ${T.greyLight}`, fontSize:12, color:T.grey, lineHeight:1.6 }}>
              We'll WhatsApp you the moment the bank confirms. If nothing comes through in 30 minutes, any amount debited is auto-reversed.
            </div>
          )}
          {status==='failed' && (
            <div style={{ marginTop:14, paddingTop:12, borderTop:`1px dashed ${T.greyLight}`, fontSize:12, color:T.grey, lineHeight:1.6 }}>
              Common reasons: daily UPI limit hit, card OTP timed out, bank server blip. Your spot is saved for 30 minutes.
            </div>
          )}
        </div>
        <div style={{ display:'flex', gap:10, marginTop:22, justifyContent:'center', flexWrap:'wrap' }}>
          {status==='failed' && <Btn kind="primary" size="lg" icon="refresh" onClick={onRetry}>Retry payment</Btn>}
          {status==='pending' && <Btn kind="primary" size="lg" icon="refresh" onClick={onRetry}>Resume payment</Btn>}
          {(status==='success' || status==='simulated') && <Btn kind="dark" size="lg" icon="whatsapp">Join WhatsApp group</Btn>}
          {(status==='success' || status==='simulated') && <Btn kind="outline" size="lg" onClick={onViewBookings}>View my bookings</Btn>}
          {(status==='failed' || status==='pending') && <a href={waHref} target="_blank" rel="noreferrer" style={{ textDecoration:'none' }}><Btn kind="outline" size="lg" icon="whatsapp">WhatsApp us</Btn></a>}
          {status==='pending' && <Btn kind="ghost" size="lg" onClick={dropHold}>Drop hold</Btn>}
          {status!=='pending' && <Btn kind="outline" size="lg" onClick={onBookAnother}>{status==='failed'?'Browse other trips':'Book another'}</Btn>}
        </div>
        {(status==='success' || status==='simulated') && (
          <div style={{ marginTop:20, padding:'12px 16px', background:'#FFF5D6', borderRadius:12, border:`1px solid ${T.amber}55`, display:'flex', alignItems:'center', gap:10, textAlign:'left' }}>
            <Ico name="gift" size={18} color="#A37A1A"/>
            <div style={{ flex:1, fontSize:12.5, color:'#5a4316', lineHeight:1.5 }}>
              <b style={{ color:T.ink }}>Invite a friend, both get ₹500 off.</b> Your referral link is in the WhatsApp group.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Toggle({ on, setOn, color=T.green }) {
  return (
    <div onClick={()=>setOn(!on)} style={{ width:42, height:24, borderRadius:999, background:on?color:'#D0D5DD', cursor:'pointer', position:'relative', flexShrink:0 }}>
      <div style={{ position:'absolute', top:2, left:on?20:2, width:20, height:20, borderRadius:'50%', background:'#fff', transition:'left .15s', boxShadow:'0 1px 3px rgba(0,0,0,.2)' }}/>
    </div>
  );
}

const lbl = { fontSize:10.5, color:T.grey, letterSpacing:'.12em', fontWeight:700, textTransform:'uppercase', marginBottom:6, display:'block' };
const inp = { width:'100%', height:42, borderRadius:10, border:`1px solid ${T.greyLight}`, padding:'0 14px', fontSize:14, fontFamily:'inherit', outline:'none', background:'#fff', color:T.ink };
const stepBtn3 = { width:30, height:30, borderRadius:8, border:`1px solid ${T.greyLight}`, background:'#fff', cursor:'pointer', fontSize:16, fontWeight:700, color:T.ink, fontFamily:'inherit', display:'inline-flex', alignItems:'center', justifyContent:'center' };

// ───── QUICK BOOK — fast payment page (just pick travelers, pay) ─────
function QuickBook({ onBack, onBookAnother, onViewBookings }) {
  const isMobile = useIsMobile();
  // Trip-aware: resolve from the current view (Rishikesh / Nainital / future trips)
  const t = React.useMemo(() => resolveViewTrip() || RISHIKESH_TRIP, []);
  const isTH = !!t.travHer;
  const brandColor = isTH ? '#C14A36' : '#1DBF73';
  const [guests, setGuests] = React.useState(2);
  const [stayType, setStayType] = React.useState('double');
  const [foodPref, setFoodPref] = React.useState('veg');
  const [termsAgreed, setTermsAgreed] = React.useState(false);
  const [pay, setPay] = React.useState('upi');
  const [gstOn, setGstOn] = React.useState(false);
  const [couponInput, setCouponInput] = React.useState('');
  const [coupon, setCoupon] = React.useState(null);
  const [couponErr, setCouponErr] = React.useState('');

  // Auto-apply coupon if the user got one via the first-trip login hook.
  React.useEffect(() => {
    const stored = getActiveCoupon();
    if (!stored || coupon) return;
    const codes = { 'TRAV500':{type:'flat', value:500, label:'₹500 off'}, 'WEEKEND10':{type:'pct', value:10, label:'10% off'}, 'FIRSTRIP':{type:'pct', value:10, label:'10% off · first trip'} };
    if (codes[stored]) setCoupon({ code: stored, ...codes[stored] });
  }, []);

  const STAY_OPTIONS = [
    { id:'triple', label:'Triple Sharing', offset:-500, icon:'users' },
    { id:'double', label:'Double Sharing', offset:0, icon:'users' },
    { id:'single', label:'Single Room', offset:2500, icon:'bed' },
  ];

  const selectedStay = STAY_OPTIONS.find(s => s.id === stayType);
  const p = t.pricing;
  const stayOffsetTotal = selectedStay.offset * guests;
  const base = p.base * guests + stayOffsetTotal;
  const tax = p.tax * guests;
  const fee = p.convenience * guests;
  const subtotal = base + tax + fee;
  const discount = coupon ? (coupon.type==='pct' ? Math.round(subtotal * coupon.value / 100) : coupon.value) : 0;
  const total = Math.max(0, subtotal - discount);
  const token = p.token * guests;
  const balance = Math.max(0, total - token);

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    const codes = { 'TRAV500':{type:'flat', value:500, label:'₹500 off'}, 'WEEKEND10':{type:'pct', value:10, label:'10% off'}, 'FIRSTRIP':{type:'pct', value:10, label:'10% off · first trip'} };
    if (codes[code]) { setCoupon({ code, ...codes[code] }); setCouponErr(''); setActiveCoupon(code); }
    else { setCouponErr('Invalid code. Try TRAV500, WEEKEND10 or FIRSTRIP.'); }
  };
  const removeCoupon = () => { setCoupon(null); setCouponInput(''); setCouponErr(''); setActiveCoupon(''); };

  const [paying, setPaying] = React.useState(false);
  const [payment, setPayment] = React.useState(null); // { id, simulated }
  const [payStatus, setPayStatus] = React.useState('idle'); // idle | success | simulated | pending | failed
  const [bookingId, setBookingId] = React.useState(null);

  // Persist a booking row that Profile > My Bookings can read.
  const persistBooking = (status, resp) => {
    const id = bookingId || newBookingId(t);
    if (!bookingId) setBookingId(id);
    const b = {
      id,
      trip: { id: t.id, dest: t.dest, dates: t.dates, img: t.img, creator: t.creator || '@trav.curated' },
      status: status==='pending' ? 'upcoming' : status==='failed' ? 'upcoming' : 'upcoming',
      state: status==='success' || status==='simulated' ? 'confirmed' : status==='pending' ? 'payment-pending' : 'payment-pending',
      guests,
      paid: (status==='success' || status==='simulated') ? token : 0,
      balance,
      departsIn: 14,
      rating: null,
      persona: isTH ? 'soloFemale' : 'standard',
      holdExpiresHours: status==='pending' ? 24 : status==='failed' ? 0.5 : undefined,
      paymentId: resp?.razorpay_payment_id,
      simulated: !!resp?.simulated,
      coupon: coupon?.code,
      createdAt: Date.now(),
      source: 'quick-book',
    };
    if (status==='pending' || status==='failed') savePendingBooking(b);
    else { saveBooking(b); clearPendingBooking(); }
    return id;
  };

  const startPayment = () => {
    if (paying) return;
    setPaying(true);
    setPayStatus('idle');
    const profile = loadTravProfile();
    openRazorpay({
      amount: token,
      name: 'trav',
      description: `Token for ${t.dest} · ${guests} ${guests===1?'traveler':'travelers'}`,
      prefill: { name: profile.name, email: profile.email, contact: (profile.phone||'').replace(/\D/g,'').slice(-10) },
      notes: { trip_id: t.id, dest: t.dest, guests: String(guests), method_pref: pay, coupon: coupon?.code || '' },
      theme: { color: brandColor },
      onSuccess: (resp) => {
        setPaying(false); setPayment(resp);
        const status = resp?.simulated ? 'simulated' : 'success';
        persistBooking(status, resp);
        setPayStatus(status);
        setActiveCoupon('');
      },
      onDismiss: () => {
        setPaying(false);
        // User closed Razorpay before completing — treat as pending hold so the
        // PaymentPendingBanner/Inline hooks pick it up and the confirmation
        // page renders the "pending" state with Resume CTA.
        persistBooking('pending');
        setPayStatus('pending');
      },
      onFailure: (err) => {
        setPaying(false);
        setPayment({ razorpay_payment_id: err?.metadata?.payment_id, errorDescription: err?.description });
        persistBooking('failed');
        setPayStatus('failed');
      },
    });
  };

  const showConfirmation = ['success','simulated','pending','failed'].includes(payStatus);
  if (showConfirmation) {
    return <ConfirmedOnePage
      trip={t} guests={guests} total={total} token={token}
      onBookAnother={onBookAnother}
      onRetry={()=>{ setPayStatus('idle'); setPayment(null); startPayment(); }}
      onViewBookings={onViewBookings}
      bookingId={bookingId}
      payment={payment}
      status={payStatus}
    />;
  }

  return (
    <div style={{ background:'#F4F6FA', minHeight:'calc(100vh - 64px)', padding:isMobile?'20px 16px 100px':'28px 36px 80px' }}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}>
          <Btn kind="ghost" size="sm" icon="arrow-left" onClick={onBack}>{isMobile?'Back':'Back to itinerary'}</Btn>
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:11.5, color:T.grey, fontWeight:600 }}>
            <Ico name="shield" size={13} color={T.greenDeep}/> Secure payment · SSL encrypted
          </div>
        </div>

        <div style={{ marginBottom:22 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 12px', borderRadius:999, background:'#F0FAF4', color:T.greenDeep, fontSize:11, fontWeight:800, letterSpacing:'.12em', marginBottom:10, border:`1px solid ${T.green}33` }}>
            <Ico name="fire" size={11} color={T.greenDeep}/> QUICK BOOK · PAY NOW
          </div>
          <h1 style={{ fontSize:isMobile?28:34, fontWeight:700, color:T.ink, letterSpacing:'-.025em', margin:0, fontFamily:'Fraunces, serif', lineHeight:1.1 }}>Lock your spot</h1>
          <div style={{ fontSize:14, color:T.grey, marginTop:6, maxWidth:640, lineHeight:1.5 }}>
            Standard inclusions for {t.dest}. Pay the {inr(p.token)} token — balance auto-collected 7 days before departure.
          </div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, marginTop:14, background:'#EEF2F9', padding:'7px 14px', borderRadius:999, fontSize:12.5, color:T.inkSoft, fontWeight:600, maxWidth:'100%' }}>
            <Ico name="calendar" size={13} color={T.greenDeep}/>
            <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>Delhi → {t.dest} · 2N/3D · {inr(t.price)}/pp · {t.dates.split(' · ')[1]}</span>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1.5fr 1fr', gap:20, alignItems:'start' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <CardSection title="Travelers" eyebrow="Step 01">
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:14, background:'#F7F9FB', borderRadius:12 }}>
                <div>
                  <div style={{ fontSize:13.5, fontWeight:700, color:T.ink }}>How many adults?</div>
                  <div style={{ fontSize:12, color:T.grey, marginTop:2 }}>₹{p.token.toLocaleString('en-IN')} token locks the spot for each.</div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <button onClick={()=>setGuests(Math.max(1,guests-1))} style={stepBtn3}>−</button>
                  <span style={{ fontSize:22, fontWeight:800, color:T.ink, minWidth:30, textAlign:'center' }}>{guests}</span>
                  <button onClick={()=>setGuests(Math.min(6,guests+1))} style={stepBtn3}>+</button>
                </div>
              </div>
              <SpotsFilledBar trip={t}/>
            </CardSection>

            <CardSection title="Stay preference" eyebrow="Step 01.5">
              <div style={{ display:'flex', gap:8 }}>
                {STAY_OPTIONS.map(opt => {
                  const active = stayType === opt.id;
                  return (
                    <div key={opt.id} onClick={()=>setStayType(opt.id)} style={{
                      flex:1, padding:'14px 10px', background:active?'#F0FAF4':'#fff',
                      border:`1.5px solid ${active?T.green:T.greyLight}`, borderRadius:12,
                      cursor:'pointer', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:8,
                      transition:'all .15s'
                    }}>
                      <div style={{ width:32, height:32, borderRadius:'50%', background:active?T.green:'#F4F6FA', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <Ico name={opt.icon} size={14} color={active?'#fff':T.grey}/>
                      </div>
                      <div style={{ fontSize:12, fontWeight:700, color:T.ink }}>{opt.label.split(' ')[0]}</div>
                      <div style={{ fontSize:13, fontWeight:800, color:active?T.greenDeep:T.ink }}>{inr(p.base + opt.offset)}</div>
                    </div>
                  );
                })}
              </div>
            </CardSection>

            <CardSection title="Lead traveler" eyebrow="Step 02">
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div><span style={lbl}>Full name</span><input style={inp} placeholder="As on your ID"/></div>
                <div><span style={lbl}>Mobile</span><input style={inp} placeholder="+91 98xxx xxxxx"/></div>
                <div style={{ gridColumn:'1/-1' }}><span style={lbl}>Email</span><input style={inp} placeholder="you@mail.com"/></div>
              </div>
              <div style={{ marginTop:12, padding:12, borderRadius:12, border:`1px solid ${T.greyLight}`, background:gstOn?'#F7F9FB':'#fff' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10 }}>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:T.ink }}>GST invoice</div>
                    <div style={{ fontSize:11.5, color:T.grey, marginTop:2 }}>For business expense or reimbursement.</div>
                  </div>
                  <Toggle on={gstOn} setOn={setGstOn}/>
                </div>
                {gstOn && (
                  <div style={{ marginTop:10, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                    <div style={{ gridColumn:'1/-1' }}><span style={lbl}>GSTIN</span><input style={inp} placeholder="22AAAAA0000A1Z5"/></div>
                    <div style={{ gridColumn:'1/-1' }}><span style={lbl}>Company name</span><input style={inp} placeholder="Acme Pvt Ltd"/></div>
                  </div>
                )}
              </div>
            </CardSection>

            <CardSection title="Dietary & Group preferance" eyebrow="Step 02.5">
              <div style={{ display:'flex', gap:10 }}>
                {['veg', 'non-veg', 'jain'].map(pref => {
                  const active = foodPref === pref;
                  return (
                    <div key={pref} onClick={()=>setFoodPref(pref)} style={{
                      flex:1, padding:'10px', borderRadius:10, cursor:'pointer', textAlign:'center',
                      background:active?T.greenDeep:'#F7F9FB', color:active?'#fff':T.ink,
                      border:`1px solid ${active?T.greenDeep:T.greyLight}`,
                      fontSize:12, fontWeight:700, textTransform:'uppercase'
                    }}>
                      {pref}
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop:12 }}>
                <span style={lbl}>Special requests (optional)</span>
                <input style={inp} placeholder="Allergies, birthday surprise, etc."/>
              </div>
            </CardSection>

            <CardSection title="Payment method" eyebrow="Step 03">
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {[
                  { id:'upi', name:'UPI', sub:'GPay, PhonePe, Paytm', icon:'spark' },
                  { id:'card', name:'Card', sub:'Visa, Mastercard, Rupay', icon:'calendar' },
                  { id:'netbanking', name:'Net banking', sub:'All major banks', icon:'shield' },
                ].map(m => {
                  const a=pay===m.id;
                  return (
                    <div key={m.id} onClick={()=>setPay(m.id)} style={{ padding:14, borderRadius:12, cursor:'pointer', border:`1.5px solid ${a?T.green:T.greyLight}`, background:a?'#F0FAF4':'#fff', display:'flex', gap:12, alignItems:'center' }}>
                      <div style={{ width:18, height:18, borderRadius:'50%', border:`2px solid ${a?T.green:T.greyLight}`, display:'flex', alignItems:'center', justifyContent:'center' }}>{a && <div style={{ width:8, height:8, borderRadius:'50%', background:T.green }}/>}</div>
                      <Ico name={m.icon} size={16} color={a?T.greenDeep:T.grey}/>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13.5, fontWeight:700, color:T.ink }}>{m.name}</div>
                        <div style={{ fontSize:12, color:T.grey, marginTop:2 }}>{m.sub}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {pay==='upi' && <div style={{ marginTop:12, background:'#F7F9FB', borderRadius:12, padding:14 }}><span style={lbl}>Your UPI ID</span><input style={inp} placeholder="yourname@okhdfcbank"/></div>}
              {pay==='card' && <div style={{ marginTop:12, background:'#F7F9FB', borderRadius:12, padding:14, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                <div style={{ gridColumn:'1/-1' }}><span style={lbl}>Card number</span><input style={inp} placeholder="1234 5678 9012 3456"/></div>
                <div><span style={lbl}>Expiry</span><input style={inp} placeholder="MM/YY"/></div>
                <div><span style={lbl}>CVV</span><input style={inp} placeholder="•••"/></div>
              </div>}
            </CardSection>
          </div>

          <div style={{ alignSelf:'start', position:isMobile?'static':'sticky', top:88, display:'flex', flexDirection:'column', gap:12, marginTop:isMobile?10:0 }}>
            <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.greyLight}`, overflow:'hidden' }}>
              <div style={{ height:130, position:'relative' }}>
                <ImgPlaceholder {...t.img} radius={0} overlay={false}/>
                <div style={{ position:'absolute', bottom:10, left:14, color:'#fff', textShadow:'0 1px 4px rgba(0,0,0,.4)' }}>
                  <div style={{ fontSize:20, fontWeight:700, fontFamily:'Fraunces, serif' }}>{t.dest}</div>
                  <div style={{ fontSize:11.5, opacity:.95 }}>{t.dates.split(' · ')[1]}</div>
                </div>
              </div>
              <div style={{ padding:18 }}>
                <div style={{ fontSize:11, fontWeight:800, color:T.grey, letterSpacing:'.14em', marginBottom:12 }}>ORDER SUMMARY</div>
                <div style={{ display:'flex', flexDirection:'column', gap:7, fontSize:13 }}>
                  <Row2 icon="users" l={`Base (${inr(p.base)} × ${guests})`} r={inr(p.base * guests)}/>
                  {selectedStay.offset !== 0 && (
                    <Row2 icon={selectedStay.icon} l={`${selectedStay.label} (${inr(selectedStay.offset)} × ${guests})`} r={`${selectedStay.offset > 0 ? '+':''}${inr(stayOffsetTotal)}`}/>
                  )}
                  <Row2 l="Taxes" r={inr(tax)}/>
                  <Row2 l="Convenience fee" r={inr(fee)}/>
                  {coupon && <Row2 icon="gift" l={`Coupon · ${coupon.code}`} r={`-${inr(discount)}`}/>}
                </div>

                {/* Coupon code input */}
                <div style={{ marginTop:14, paddingTop:14, borderTop:`1px solid ${T.greyLight}` }}>
                  <div style={{ fontSize:10.5, fontWeight:800, color:T.grey, letterSpacing:'.14em', marginBottom:8, display:'flex', alignItems:'center', gap:6 }}>
                    <Ico name="gift" size={11} color={T.greenDeep}/> COUPON CODE
                  </div>
                  {coupon ? (
                    <div style={{ background:'#F0FAF4', border:`1px solid ${T.green}55`, borderRadius:10, padding:'10px 12px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <div style={{ width:26, height:26, borderRadius:'50%', background:T.green, display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <Ico name="check" size={13} color="#fff" stroke={3}/>
                        </div>
                        <div>
                          <div style={{ fontSize:12.5, fontWeight:800, color:T.greenDeep, fontFamily:'ui-monospace, Menlo, monospace' }}>{coupon.code}</div>
                          <div style={{ fontSize:11, color:T.greenDeep, marginTop:1 }}>{coupon.label} applied · {inr(discount)}</div>
                        </div>
                      </div>
                      <button onClick={removeCoupon} style={{ background:'transparent', border:'none', cursor:'pointer', padding:6, borderRadius:6, color:T.greenDeep, fontFamily:'inherit', fontSize:11.5, fontWeight:700 }}>Remove</button>
                    </div>
                  ) : (
                    <>
                      <div style={{ display:'flex', gap:8 }}>
                        <input value={couponInput} onChange={e=>{setCouponInput(e.target.value); setCouponErr('');}} onKeyDown={e=>{if(e.key==='Enter') applyCoupon();}} placeholder="Enter code" style={{ flex:1, height:40, borderRadius:10, border:`1.5px solid ${couponErr?T.rose:T.greyLight}`, padding:'0 12px', fontSize:13, fontFamily:'ui-monospace, Menlo, monospace', fontWeight:600, outline:'none', textTransform:'uppercase', color:T.ink, background:'#fff' }}/>
                        <button onClick={applyCoupon} disabled={!couponInput.trim()} style={{ height:40, padding:'0 16px', borderRadius:10, background: couponInput.trim()?T.ink:'#E6E6E6', color:'#fff', border:'none', fontSize:12.5, fontWeight:700, cursor: couponInput.trim()?'pointer':'not-allowed', fontFamily:'inherit' }}>Apply</button>
                      </div>
                      {couponErr ? (
                        <div style={{ fontSize:11, color:T.rose, marginTop:6, fontWeight:600 }}>{couponErr}</div>
                      ) : (
                        <div style={{ fontSize:10.5, color:T.grey, marginTop:6 }}>Try <b style={{ color:T.ink, fontFamily:'ui-monospace, Menlo, monospace' }}>WEEKEND10</b> for 10% off</div>
                      )}
                    </>
                  )}
                </div>

                <div style={{ borderTop:`1px dashed ${T.greyLight}`, marginTop:14, paddingTop:12, display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                  <span style={{ fontSize:11, fontWeight:700, color:T.grey, letterSpacing:'.12em' }}>TOTAL</span>
                  <div style={{ textAlign:'right' }}>
                    {discount>0 && <div style={{ fontSize:12, color:T.grey, textDecoration:'line-through', marginBottom:1 }}>{inr(subtotal)}</div>}
                    <span style={{ fontSize:22, fontWeight:800, color:discount>0?T.greenDeep:T.ink, letterSpacing:'-.02em' }}>{inr(total)}</span>
                    {discount>0 && <div style={{ fontSize:10.5, color:T.greenDeep, fontWeight:700, marginTop:2 }}>You saved {inr(discount)}</div>}
                  </div>
                </div>
                <div style={{ marginTop:10, background:'#F0FAF4', borderRadius:10, padding:'10px 12px', display:'flex', justifyContent:'space-between', alignItems:'baseline', border:`1px solid ${T.green}33`, marginBottom:14 }}>
                  <span style={{ fontSize:12, color:T.greenDeep, fontWeight:700 }}>Pay now (token)</span>
                  <span style={{ fontSize:18, fontWeight:800, color:T.greenDeep }}>{inr(token)}</span>
                </div>

                {/* Policy Checkbox */}
                <div style={{ marginBottom:14 }}>
                  <label style={{ display:'flex', alignItems:'flex-start', gap:10, cursor:'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={termsAgreed} 
                      onChange={e=>setTermsAgreed(e.target.checked)} 
                      style={{ marginTop:3, accentColor:T.greenDeep, width:16, height:16 }}
                    />
                    <div style={{ fontSize:11.5, color:T.grey, lineHeight:1.4 }}>
                      I agree to the <span style={{ textDecoration:'underline', color:T.ink, fontWeight:600 }}>Terms of Service</span> and <span style={{ textDecoration:'underline', color:T.ink, fontWeight:600 }}>Refund Policy</span>.
                    </div>
                  </label>
                </div>

                <Btn 
                  kind="primary" 
                  size="lg" 
                  full 
                  trailing="arrow-right" 
                  disabled={!termsAgreed || paying}
                  onClick={startPayment}
                >
                  {paying ? 'Opening payment...' : `Confirm & Pay ${inr(token)}`}
                </Btn>
                <div style={{ marginTop:10, fontSize:11, color:T.grey, textAlign:'center', lineHeight:1.4 }}>
                  Balance {inr(balance)} auto-collected 7 days before. Free cancellation up to 7 days.
                </div>
              </div>
            </div>
            <div style={{ padding:'12px 16px', background:'#fff', borderRadius:14, border:`1px solid ${T.greyLight}`, fontSize:11.5, color:T.grey, display:'flex', alignItems:'flex-start', gap:10 }}>
              <Ico name="spark" size={14} color={T.greenDeep}/>
              <div>
                Want different transport, stay or meals? <span onClick={onBack} style={{ color:T.greenDeep, fontWeight:700, cursor:'pointer', textDecoration:'underline' }}>Customise the trip instead</span> and a curator will call you with a personalised quote.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CallbackQueued({ trip, onBookAnother }) {
  return (
    <div style={{ background:'#F4F6FA', minHeight:'calc(100vh - 64px)', padding:'60px 36px' }}>
      <div style={{ maxWidth:720, margin:'0 auto', background:'#fff', borderRadius:20, border:`1px solid ${T.greyLight}`, padding:'40px 40px 28px', textAlign:'center', boxShadow:'0 12px 40px rgba(15,30,46,.06)' }}>
        <div style={{ width:72, height:72, borderRadius:'50%', background:T.roseCream, margin:'0 auto 18px', display:'flex', alignItems:'center', justifyContent:'center', border:`2px solid ${T.rose}55` }}>
          <Ico name="phone" size={30} color={T.rose} stroke={2.5}/>
        </div>
        <div style={{ fontSize:11, fontWeight:800, color:T.rose, letterSpacing:'.16em', marginBottom:8 }}>CALLBACK QUEUED</div>
        <h2 style={{ fontSize:32, fontWeight:700, color:T.ink, letterSpacing:'-.02em', margin:0, fontFamily:'Fraunces, serif' }}>We'll call you in 10 minutes.</h2>
        <div style={{ fontSize:15, color:T.grey, marginTop:10, maxWidth:480, margin:'10px auto 0', lineHeight:1.55 }}>
          Your customised <b style={{ color:T.ink }}>{trip.dest}</b> quote is with a curator. You'll also get the quote on WhatsApp & email. No payment until you confirm.
        </div>
        <div style={{ margin:'28px auto 0', maxWidth:480, display:'flex', flexDirection:'column', gap:10 }}>
          {[
            { icon:'whatsapp', title:'Quote on WhatsApp + email', body:'In the next 30 minutes.' },
            { icon:'phone', title:'Curator call', body:'From +91 98xxx xxxxx — saved in your contacts.' },
            { icon:'check', title:'Pay the token only when you confirm', body:'Quote is held for 24 hours.' },
          ].map((it,i)=>(
            <div key={i} style={{ display:'flex', gap:12, alignItems:'center', padding:14, border:`1px solid ${T.greyLight}`, borderRadius:12, textAlign:'left' }}>
              <div style={{ width:36, height:36, borderRadius:10, background:'#F0FAF4', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Ico name={it.icon} size={15} color={T.greenDeep}/>
              </div>
              <div>
                <div style={{ fontSize:13.5, fontWeight:700, color:T.ink }}>{it.title}</div>
                <div style={{ fontSize:12.5, color:T.grey, marginTop:2 }}>{it.body}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', gap:10, marginTop:22, justifyContent:'center', flexWrap:'wrap' }}>
          <Btn kind="dark" size="lg" icon="whatsapp">Open WhatsApp</Btn>
          <Btn kind="outline" size="lg" onClick={onBookAnother}>Browse more trips</Btn>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Booking });
