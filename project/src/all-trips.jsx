// All Trips filter index — browse every itinerary with a left-side filter rail.

function AllTripsIndex({ onOpenTrip, fromCity='Delhi (NCR)' }) {
  const isMobile = useIsMobile();
  const [duration, setDuration] = React.useState('all'); // all | weekend | 2-3 | 4-6 | 7+
  const [travelingAs, setTravelingAs] = React.useState(null); // null | friends | solo-female | couple | family
  const [vibes, setVibes] = React.useState([]); // ['adventure', ...]
  const [budget, setBudget] = React.useState([]); // ['u5','5to10','10to20','20plus']
  const [sort, setSort] = React.useState('recommended');
  const [filterOpen, setFilterOpen] = React.useState(false);

  const allVibes = [
    { id:'adventure', label:'Adventure' },
    { id:'beach', label:'Beach' },
    { id:'heritage', label:'Heritage' },
    { id:'nature', label:'Nature' },
    { id:'wellness', label:'Wellness' },
    { id:'mountains', label:'Mountains' },
    { id:'romantic', label:'Romantic' },
  ];
  const budgetOpts = [
    { id:'u5', label:'Under ₹5,000', fn:p=>p<5000 },
    { id:'5to10', label:'₹5,000 – ₹10,000', fn:p=>p>=5000&&p<=10000 },
    { id:'10to20', label:'₹10,000 – ₹20,000', fn:p=>p>10000&&p<=20000 },
    { id:'20plus', label:'₹20,000+', fn:p=>p>20000 },
  ];

  const toggle = (arr, setArr, id) => setArr(arr.includes(id) ? arr.filter(x=>x!==id) : [...arr, id]);

  const filtered = ALL_TRIPS.filter(t => {
    if (duration!=='all' && t.duration!==duration) return false;
    if (travelingAs && !t.travelingAs.includes(travelingAs)) return false;
    if (vibes.length && !vibes.some(v => t.vibes.includes(v))) return false;
    if (budget.length) {
      const fns = budget.map(b => budgetOpts.find(x=>x.id===b).fn);
      if (!fns.some(fn => fn(t.price))) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a,b) => {
    if (sort==='price-low') return a.price - b.price;
    if (sort==='price-high') return b.price - a.price;
    if (sort==='filling') return (b.fillingFast?1:0) - (a.fillingFast?1:0);
    return 0;
  });

  const clearAll = () => { setDuration('all'); setTravelingAs(null); setVibes([]); setBudget([]); };
  const activeCount = (duration!=='all'?1:0) + (travelingAs?1:0) + vibes.length + budget.length;

  return (
    <div style={{ background:T.offWhite, minHeight:'calc(100vh - 64px)', padding:isMobile?'18px 0 100px':'32px 36px 80px' }}>
      {/* Mobile-only top bar with filter toggle */}
      {isMobile && (
        <div style={{ position:'sticky', top:56, zIndex:10, background:T.offWhite, padding:'0 16px 12px' }}>
          <div style={{ display:'flex', gap:8, alignItems:'center', justifyContent:'space-between' }}>
            <button onClick={()=>setFilterOpen(true)} style={{ flex:1, height:42, borderRadius:10, border:`1px solid ${T.greyLight}`, background:'#fff', color:T.ink, fontFamily:'inherit', fontSize:13, fontWeight:700, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, cursor:'pointer' }}>
              <Ico name="settings" size={14} color={T.greenDeep} stroke={2}/> Filters {activeCount>0 && <span style={{ background:T.green, color:'#fff', borderRadius:999, padding:'1px 7px', fontSize:11, fontWeight:800 }}>{activeCount}</span>}
            </button>
            <select value={sort} onChange={e=>setSort(e.target.value)} style={{ height:42, padding:'0 32px 0 14px', borderRadius:10, border:`1px solid ${T.greyLight}`, fontSize:13, fontWeight:600, color:T.ink, background:'#fff', fontFamily:'inherit', appearance:'none' }}>
              <option value="recommended">Recommended</option>
              <option value="price-low">Price ↑</option>
              <option value="price-high">Price ↓</option>
              <option value="filling">Filling fast</option>
            </select>
          </div>
        </div>
      )}
      <div style={{ maxWidth:1340, margin:'0 auto', display:'grid', gridTemplateColumns:isMobile?'1fr':'260px 1fr', gap:isMobile?0:32, alignItems:'start', padding:isMobile?'0 16px':0 }}>
        {/* LEFT — Filters (drawer on mobile, sticky aside on desktop) */}
        <aside onClick={isMobile?()=>setFilterOpen(false):undefined} style={isMobile ? { display:filterOpen?'block':'none', position:'fixed', inset:0, background:'rgba(10,15,22,.55)', zIndex:90, padding:0, overflow:'auto' } : { position:'sticky', top:88, alignSelf:'start' }}>
          <div onClick={isMobile?(e)=>e.stopPropagation():undefined} style={{ background:'#fff', borderRadius:isMobile?'18px 18px 0 0':18, border:`1px solid ${T.greyLight}`, padding:'22px 20px', position:isMobile?'absolute':'static', bottom:isMobile?0:'auto', left:0, right:0, maxHeight:isMobile?'85vh':'auto', overflowY:isMobile?'auto':'visible' }}>
            {isMobile && (
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14, paddingBottom:10, borderBottom:`1px solid ${T.greyLight}` }}>
                <div style={{ fontSize:16, fontWeight:700, color:T.ink, fontFamily:'Fraunces, serif' }}>Filters</div>
                <button onClick={()=>setFilterOpen(false)} style={{ background:'#F4F6FA', border:'none', width:34, height:34, borderRadius:'50%', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Ico name="x" size={16} color={T.ink}/>
                </button>
              </div>
            )}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <Ico name="spark" size={15} color={T.greenDeep}/>
                <span style={{ fontSize:12, fontWeight:800, color:T.ink, letterSpacing:'.14em' }}>FILTERS</span>
              </div>
              {activeCount>0 && (
                <span onClick={clearAll} style={{ fontSize:11.5, color:T.rose, fontWeight:700, cursor:'pointer', textDecoration:'underline' }}>Clear all ({activeCount})</span>
              )}
            </div>
            <div style={{ fontSize:12, color:T.grey, marginBottom:20 }}>Refine your adventure</div>

            <FilterBlock label="TRAVELING FROM">
              <div style={{ position:'relative' }}>
                <select style={{ width:'100%', height:40, borderRadius:10, border:`1px solid ${T.greyLight}`, padding:'0 12px', fontSize:13, fontWeight:600, color:T.ink, background:'#fff', fontFamily:'inherit', appearance:'none' }}>
                  <option>Delhi (NCR)</option>
                  {TRAV.cities.slice(1).map(c=><option key={c}>{c}</option>)}
                </select>
                <div style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}>
                  <Ico name="chevron-down" size={13} color={T.grey}/>
                </div>
              </div>
            </FilterBlock>

            <FilterBlock label="TRIP TYPE">
              <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                {[
                  { id:'all', label:'All' },
                  { id:'weekend', label:'This Weekend' },
                  { id:'2-3', label:'2–3 Days' },
                  { id:'4-6', label:'4–6 Days' },
                  { id:'7+', label:'7+ Days' },
                ].map(x => <Chip key={x.id} active={duration===x.id} onClick={()=>setDuration(x.id)}>{x.label}</Chip>)}
              </div>
            </FilterBlock>

            <FilterBlock label="TRAVELING AS">
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {[
                  { id:'friends', label:'Friends', icon:'users', color:T.greenDeep },
                  { id:'solo-female', label:'Solo Female', icon:'rose', color:T.rose },
                  { id:'couple', label:'Couple', icon:'heart', color:T.greenDeep },
                  { id:'family', label:'Family', icon:'users', color:T.greenDeep },
                ].map(x => {
                  const a = travelingAs===x.id;
                  const rose = x.id==='solo-female';
                  return (
                    <div key={x.id} onClick={()=>setTravelingAs(a?null:x.id)} style={{
                      padding:'10px 12px', borderRadius:10, cursor:'pointer',
                      display:'flex', alignItems:'center', gap:10,
                      background: a ? (rose?T.roseCream:'#F0FAF4') : '#fff',
                      color: a ? (rose?T.rose:T.greenDeep) : T.ink,
                      border: `1.5px solid ${a?(rose?T.rose:T.green):T.greyLight}`,
                      fontWeight: a?700:500, fontSize:13,
                      transition:'all .15s',
                    }}>
                      <Ico name={x.icon} size={15} color={a?(rose?T.rose:T.greenDeep):T.grey}/>
                      {x.label}
                    </div>
                  );
                })}
              </div>
            </FilterBlock>

            <FilterBlock label="VIBE">
              <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                {allVibes.map(v => <Chip key={v.id} active={vibes.includes(v.id)} onClick={()=>toggle(vibes, setVibes, v.id)}>#{v.label.toUpperCase()}</Chip>)}
              </div>
            </FilterBlock>

            <FilterBlock label="BUDGET PER PERSON" last>
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                {budgetOpts.map(b => {
                  const on = budget.includes(b.id);
                  return (
                    <div key={b.id} onClick={()=>toggle(budget, setBudget, b.id)} style={{ display:'flex', alignItems:'center', gap:10, padding:'6px 4px', cursor:'pointer' }}>
                      <div style={{ width:18, height:18, borderRadius:'50%', border:`2px solid ${on?T.green:T.greyLight}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        {on && <div style={{ width:8, height:8, borderRadius:'50%', background:T.green }}/>}
                      </div>
                      <span style={{ fontSize:13, color:T.ink, fontWeight: on?600:500 }}>{b.label}</span>
                    </div>
                  );
                })}
              </div>
            </FilterBlock>
          </div>
        </aside>

        {/* RIGHT — Header + grid */}
        <main>
          {!isMobile && (
            <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:26, flexWrap:'wrap', gap:16 }}>
              <div>
                <h1 style={{ fontSize:40, fontWeight:800, color:T.ink, letterSpacing:'-.025em', margin:0, fontFamily:'Fraunces, serif', lineHeight:1.1 }}>
                  Weekend Escapes from {fromCity.split(' ')[0]}
                </h1>
                <div style={{ fontSize:14.5, color:T.grey, marginTop:8, maxWidth:560 }}>
                  Curated 2–{duration==='7+'?'10':'7'} day adventures tailored for your squad. No planning required.
                </div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ fontSize:11, color:T.grey, letterSpacing:'.14em', fontWeight:700 }}>SORT BY</span>
                <div style={{ position:'relative' }}>
                  <select value={sort} onChange={e=>setSort(e.target.value)} style={{ height:40, padding:'0 34px 0 14px', borderRadius:10, border:`1px solid ${T.greyLight}`, fontSize:13, fontWeight:600, color:T.ink, background:'#fff', fontFamily:'inherit', appearance:'none', cursor:'pointer' }}>
                    <option value="recommended">Recommended</option>
                    <option value="price-low">Price · low to high</option>
                    <option value="price-high">Price · high to low</option>
                    <option value="filling">Filling fast first</option>
                  </select>
                  <div style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}>
                    <Ico name="chevron-down" size={13} color={T.grey}/>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isMobile && (
            <div style={{ marginBottom:14 }}>
              <h1 style={{ fontSize:24, fontWeight:800, color:T.ink, letterSpacing:'-.025em', margin:0, fontFamily:'Fraunces, serif', lineHeight:1.1 }}>
                {sorted.length} trips from {fromCity.split(' ')[0]}
              </h1>
              <div style={{ fontSize:12.5, color:T.grey, marginTop:4 }}>Curated for your squad. No planning required.</div>
            </div>
          )}

          {sorted.length===0 ? (
            <div style={{ background:'#fff', borderRadius:18, border:`1px dashed ${T.greyLight}`, padding:'60px 40px', textAlign:'center' }}>
              <div style={{ fontSize:16, fontWeight:700, color:T.ink, marginBottom:6 }}>No trips match those filters.</div>
              <div style={{ fontSize:13, color:T.grey, marginBottom:16 }}>Try loosening a filter or clear them all.</div>
              <Btn kind="outline" size="md" onClick={clearAll}>Clear filters</Btn>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'repeat(3, 1fr)', gap:isMobile?14:20 }}>
              {sorted.map(t => <AllTripCard key={t.id} trip={t} onOpen={()=>onOpenTrip(t.id)}/>)}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function FilterBlock({ label, children, last }) {
  return (
    <div style={{ marginBottom: last?0:22 }}>
      <div style={{ fontSize:10.5, fontWeight:800, color:T.grey, letterSpacing:'.14em', marginBottom:10 }}>{label}</div>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <span onClick={onClick} style={{
      padding:'7px 12px', borderRadius:999, cursor:'pointer',
      fontSize:11.5, fontWeight:700, letterSpacing:'.02em',
      background: active ? T.ink : '#F4F6FA',
      color: active ? '#fff' : T.inkSoft,
      border: `1px solid ${active?T.ink:T.greyLight}`,
      transition:'all .15s',
    }}>{children}</span>
  );
}

function AllTripCard({ trip, onOpen }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={onOpen} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={{
      borderRadius:18, overflow:'hidden', position:'relative', cursor:'pointer',
      aspectRatio:'3/4',
      border: trip.travHerExclusive ? `2px dashed ${T.rose}66` : (trip.fillingFast ? `2px solid ${T.fire}55` : 'none'),
      boxShadow: hover ? '0 18px 40px rgba(15,30,46,.18)' : '0 4px 12px rgba(15,30,46,.06)',
      transform: hover ? 'translateY(-4px)' : 'translateY(0)',
      transition: 'all .2s',
    }}>
      <ImgPlaceholder {...trip.img} radius={0} overlay={false}/>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,.85) 100%)' }}/>
      {/* top-left badge */}
      <div style={{ position:'absolute', top:14, left:14, display:'flex', gap:6, flexWrap:'wrap' }}>
        {trip.fillingFast && (
          <span style={{ background:T.fire, color:'#fff', padding:'5px 10px', borderRadius:8, fontSize:10.5, fontWeight:800, letterSpacing:'.08em', display:'inline-flex', alignItems:'center', gap:5 }}>
            <Ico name="fire" size={10} color="#fff"/> FILLING FAST
          </span>
        )}
        {trip.travHerExclusive && (
          <span style={{ background:T.rose, color:'#fff', padding:'5px 10px', borderRadius:8, fontSize:10.5, fontWeight:800, letterSpacing:'.08em' }}>
            TRAV.HER EXCLUSIVE
          </span>
        )}
        {!trip.fillingFast && !trip.travHerExclusive && trip.tags[0] && (
          <span style={{ background:'rgba(20,30,40,.55)', backdropFilter:'blur(8px)', color:'#fff', padding:'5px 10px', borderRadius:8, fontSize:10.5, fontWeight:800, letterSpacing:'.08em', border:'1px solid rgba(255,255,255,.2)' }}>
            {trip.tags[0].toUpperCase()}
          </span>
        )}
      </div>
      {/* content bottom */}
      <div style={{ position:'absolute', left:18, right:18, bottom:18, color:'#fff' }}>
        <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:11, fontWeight:700, letterSpacing:'.14em', color:'rgba(255,255,255,.85)', marginBottom:6 }}>
          <Ico name="pin" size={11} color={T.green}/> {trip.region}
        </div>
        <div style={{ fontSize:22, fontWeight:800, fontFamily:'Fraunces, serif', letterSpacing:'-.015em', lineHeight:1.15, marginBottom:12, textShadow:'0 2px 10px rgba(0,0,0,.4)' }}>
          {trip.title}
        </div>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:10 }}>
          <div style={{ fontSize:12, color:'rgba(255,255,255,.9)' }}>{trip.nights}</div>
          <div style={{ fontSize:22, fontWeight:800, color:'#fff', letterSpacing:'-.02em', textShadow:'0 2px 8px rgba(0,0,0,.5)' }}>₹{trip.price.toLocaleString('en-IN')}</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AllTripsIndex });
