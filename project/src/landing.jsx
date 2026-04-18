function Landing({ onOpenTrip, onViewAllTrips }) {
  const [fromCity, setFromCity] = React.useState('Delhi');
  const scrollToWeekend = () => {
    const el = document.getElementById('weekend-trips');
    if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
  };
  return (
    <>
      <Hero fromCity={fromCity} setFromCity={setFromCity} onSeeTrips={scrollToWeekend}/>
      <WeekendTrips fromCity={fromCity} onOpen={onOpenTrip} onViewAll={onViewAllTrips}/>
      <HowTraveling/>
      <HowItWorks/>
      <TravHer/>
      <GoingLonger/>
    </>
  );
}

function Hero({ fromCity, setFromCity, onSeeTrips }) {
  const UN = (id) => `https://images.unsplash.com/photo-${id}?w=400&q=80&auto=format&fit=crop`;
  const LFT = (tags, lock) => `https://loremflickr.com/400/400/${tags}?lock=${lock}`;
  const leftTiles = [
    { k:'varkala', src:LFT('varkala,kerala,cliff', 201), tone:'#2d7a9e', ink:'#071d2b', accent:'#e8d48a', r:-4, size:'lg', top:30, left:0, label:'Varkala' },
    { k:'hampi', src:UN('1582510003544-4d00b7f74220'), tone:'#3a7a55', ink:'#0d2a1a', accent:'#f0d488', r:3, size:'md', top:18, left:118, label:'Hampi' },
    { k:'qutub', src:LFT('qutub,delhi,monument', 202), tone:'#8a6a3a', ink:'#2a1c0a', accent:'#f3d49a', r:-2, size:'md', top:14, left:238, label:'Qutub' },
    { k:'paris', src:LFT('paris,bridge,seine', 203), tone:'#556a88', ink:'#1c2538', accent:'#e4d8b9', r:2, size:'md', top:178, left:8, label:'Bridge' },
    { k:'spiti', src:UN('1626621341517-bbf3d9990a23'), tone:'#7a84a0', ink:'#1c2438', accent:'#efe8f2', r:-3, size:'md', top:168, left:128, label:'Spiti' },
    { k:'agra', src:UN('1524492412937-b28074a5d7da'), tone:'#c07a5a', ink:'#3a1c10', accent:'#f4d6b0', r:4, size:'md', top:188, left:248, label:'Agra' },
  ];
  const rightTiles = [
    { k:'atrium', src:LFT('atrium,colonial,arch', 204), tone:'#3e6a76', ink:'#0d1f26', accent:'#f0d49a', r:-3, size:'md', top:18, left:0, label:'Atrium' },
    { k:'arc', src:LFT('archdetriomphe,paris', 205), tone:'#556a88', ink:'#1a2230', accent:'#f0c078', r:3, size:'md', top:10, left:120, label:'Arc' },
    { k:'rome', src:LFT('rome,colosseum', 206), tone:'#9a6a3a', ink:'#2a180a', accent:'#f4d8a6', r:-2, size:'lg', top:22, left:240, label:'Rome' },
    { k:'paris2', src:LFT('paris,eiffel', 207), tone:'#4a5a74', ink:'#141c2a', accent:'#e9d8b5', r:2, size:'md', top:178, left:10, label:'Paris' },
    { k:'bali', src:UN('1537996194471-e657df975ab4'), tone:'#b8774a', ink:'#321808', accent:'#f4cd90', r:-4, size:'md', top:168, left:130, label:'Bali' },
    { k:'prague', src:LFT('prague,czech,old', 208), tone:'#6a5a84', ink:'#1f1830', accent:'#e4d8b9', r:3, size:'md', top:188, left:250, label:'Prague' },
  ];
  return (
    <div style={{ position:'relative', background:'#fff', overflow:'hidden' }}>
      <MonumentBand/>
      <div style={{ position:'relative', minHeight:520, display:'grid', gridTemplateColumns:'minmax(0,1fr) minmax(680px,760px) minmax(0,1fr)', alignItems:'stretch' }}>
        <div style={{ position:'relative', height:420, marginTop:40, minWidth:0 }}>
          <div style={{ position:'absolute', right:20, top:0, width:360, height:400, maxWidth:'calc(100% - 20px)' }}>{leftTiles.map(t=><PhotoTile key={t.k} t={t}/>)}</div>
        </div>
        <div style={{ padding:'100px 20px 80px', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', position:'relative', zIndex:2 }}>
          <div style={{ position:'absolute', inset:'40px -40px 40px -40px', background:'radial-gradient(ellipse at center, rgba(255,255,255,.96) 0%, rgba(255,255,255,.88) 55%, rgba(255,255,255,0) 100%)', pointerEvents:'none', zIndex:-1 }}/>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#F0FAF4', color:T.greenDeep, padding:'6px 14px', borderRadius:999, fontSize:12, fontWeight:600, marginBottom:22, border:`1px solid ${T.green}33` }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:T.green }}/>New drop · {TRAV.nextDrop}
          </div>
          <h1 style={{ fontSize:76, fontWeight:700, letterSpacing:'-.04em', lineHeight:1.02, margin:0, color:T.ink, fontFamily:'Fraunces, serif' }}>
            Your weekend,<br/>perfectly <span style={{ color:T.green, fontStyle:'italic' }}>travelled.</span>
          </h1>
          <div style={{ marginTop:20, fontSize:17, color:T.grey, lineHeight:1.5, maxWidth:520 }}>
            Creator-led weekend trips. Friday night → Sunday evening.<br/>₹7–10K. Just 15 spots. No leaves needed.
          </div>
          <div style={{ marginTop:28, display:'inline-flex', alignItems:'center', gap:10, background:'#fff', border:`1px solid ${T.greyLight}`, borderRadius:999, padding:'6px 6px 6px 18px', boxShadow:'0 6px 24px rgba(15,30,46,.06)' }}>
            <Ico name="pin" size={14} color={T.grey}/>
            <span style={{ fontSize:13, color:T.grey, fontWeight:500 }}>Traveling from</span>
            <div style={{ display:'flex', gap:4, alignItems:'center' }}>
              {TRAV.cities.slice(0,4).map(c => {
                const a = c===fromCity;
                return <div key={c} onClick={()=>setFromCity(c)} style={{ padding:'7px 13px', borderRadius:999, cursor:'pointer', fontSize:12.5, fontWeight:a?700:500, background:a?T.ink:'transparent', color:a?'#fff':T.ink, transition:'all .15s' }}>{c}</div>;
              })}
              <div style={{ display:'inline-flex', alignItems:'center', gap:3, padding:'7px 10px', color:T.grey, fontSize:12.5, cursor:'pointer' }}>more <Ico name="chevron-down" size={11} color={T.grey}/></div>
            </div>
          </div>
          <div style={{ display:'flex', gap:12, marginTop:28, flexWrap:'wrap', justifyContent:'center' }}>
            <Btn kind="primary" size="lg" trailing="arrow-right" onClick={onSeeTrips}>See this weekend's trips</Btn>
            <Btn kind="outline" size="lg" icon="whatsapp">Get Thursday Drops</Btn>
          </div>
        </div>
        <div style={{ position:'relative', height:420, marginTop:40, minWidth:0 }}>
          <div style={{ position:'absolute', left:20, top:0, width:360, height:400, maxWidth:'calc(100% - 20px)' }}>{rightTiles.map(t=><PhotoTile key={t.k} t={t}/>)}</div>
        </div>
      </div>
    </div>
  );
}

function PhotoTile({ t }) {
  const sizes = { sm:90, md:108, lg:130 };
  const sz = sizes[t.size] || 108;
  return (
    <div style={{ position:'absolute', top:t.top, left:t.left, width:sz, height:sz, borderRadius:16, overflow:'hidden', transform:`rotate(${t.r}deg)`, boxShadow:'0 10px 24px rgba(15,30,46,.14)', border:'4px solid #fff', transition:'transform .25s' }}
      onMouseEnter={e=>e.currentTarget.style.transform=`rotate(0deg) scale(1.05)`}
      onMouseLeave={e=>e.currentTarget.style.transform=`rotate(${t.r}deg) scale(1)`}>
      <ImgPlaceholder src={t.src} tone={t.tone} ink={t.ink} accent={t.accent} label={t.label} radius={0} overlay={false}/>
    </div>
  );
}

function MonumentBand() {
  return (
    <div style={{ position:'absolute', left:0, right:0, bottom:0, height:80, pointerEvents:'none', opacity:.22 }}>
      <svg viewBox="0 0 1400 80" preserveAspectRatio="xMidYEnd slice" width="100%" height="100%">
        <g fill={T.green}>
          <path d="M30 80 L30 44 L36 40 L42 44 L42 80 Z"/>
          <path d="M60 80 L60 36 Q66 28 72 36 L72 80 Z"/>
          <rect x="88" y="52" width="34" height="28"/>
          <ellipse cx="170" cy="38" rx="28" ry="8" opacity=".6"/>
          <path d="M220 80 L220 42 Q240 20 260 42 L260 80 Z"/>
          <rect x="270" y="54" width="40" height="26"/>
          <path d="M380 80 L420 48 L450 65 L490 40 L530 70 L560 55 L580 80 Z"/>
          <rect x="820" y="54" width="26" height="26"/>
          <path d="M860 80 L860 44 L880 30 L900 44 L900 80 Z"/>
          <rect x="920" y="52" width="40" height="28"/>
          <ellipse cx="990" cy="36" rx="22" ry="6" opacity=".6"/>
          <path d="M1040 80 L1048 60 L1044 44 L1056 32 L1068 44 L1064 60 L1072 80 Z"/>
          <rect x="1090" y="52" width="70" height="28"/>
          <circle cx="1102" cy="66" r="4" fill="#fff"/><circle cx="1118" cy="66" r="4" fill="#fff"/>
          <circle cx="1134" cy="66" r="4" fill="#fff"/><circle cx="1150" cy="66" r="4" fill="#fff"/>
          <path d="M1190 80 L1190 52 Q1210 32 1230 52 L1230 80 Z"/>
          <path d="M1290 80 L1320 52 L1350 68 L1380 46 L1400 80 Z"/>
        </g>
      </svg>
    </div>
  );
}

function WeekendTrips({ fromCity, onOpen, onViewAll }) {
  return (
    <div id="weekend-trips" style={{ background:'#F4F6FA', padding:'72px 36px', scrollMarginTop:72 }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:28, flexWrap:'wrap', gap:14 }}>
          <div>
            <h2 style={{ fontSize:40, fontWeight:800, letterSpacing:'-.025em', margin:0, color:T.ink, fontFamily:'Fraunces, serif' }}>This weekend from {fromCity}</h2>
            <div style={{ fontSize:14.5, color:T.grey, marginTop:6 }}>Dropping Thursday. 15 spots per trip.</div>
          </div>
          <div style={{ background:T.amberSoft, border:`1px solid ${T.amber}55`, borderLeft:`4px solid ${T.amber}`, padding:'10px 16px', borderRadius:8, display:'flex', gap:8, alignItems:'center' }}>
            <Ico name="clock" size={14} color={T.amber}/>
            <span style={{ fontSize:13, fontWeight:600, color:'#b3791f' }}>Next drop: {TRAV.nextDrop}</span>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
          {WEEKEND_TRIPS.map(t => <TripCard key={t.id} trip={t} onOpen={()=>onOpen(t.id)}/>)}
        </div>
        <div style={{ display:'flex', justifyContent:'center', marginTop:32 }}>
          <button onClick={onViewAll} style={{
            height:48, padding:'0 28px', borderRadius:999,
            background:'#fff', color:T.ink, border:`1.5px solid ${T.ink}`,
            fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:'inherit',
            display:'inline-flex', alignItems:'center', gap:10,
            boxShadow:'0 2px 8px rgba(15,30,46,.04)',
            transition:'all .15s'
          }}
          onMouseEnter={e=>{e.currentTarget.style.background=T.ink;e.currentTarget.style.color='#fff';[...e.currentTarget.querySelectorAll('svg')].forEach(s=>s.setAttribute('stroke','#fff'));}}
          onMouseLeave={e=>{e.currentTarget.style.background='#fff';e.currentTarget.style.color=T.ink;[...e.currentTarget.querySelectorAll('svg')].forEach(s=>s.setAttribute('stroke',T.ink));}}>
            View all {ALL_TRIPS.length} trips
            <Ico name="arrow-right" size={15} color={T.ink} stroke={2.2}/>
          </button>
        </div>
      </div>
    </div>
  );
}

function TripCard({ trip, onOpen }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={onOpen} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{ background:'#fff', borderRadius:16, overflow:'hidden', border:`1px solid ${T.greyLight}`, boxShadow:hover?'0 18px 40px rgba(15,30,46,.12)':'0 2px 8px rgba(15,30,46,.04)', transform:hover?'translateY(-3px)':'translateY(0)', transition:'all .2s', cursor:'pointer' }}>
      <div style={{ height:240, position:'relative' }}>
        <ImgPlaceholder {...trip.img} radius={0} overlay={false}/>
        <div style={{ position:'absolute', top:14, left:14, display:'flex', gap:6 }}>
          {trip.tags.map(tag => <span key={tag} style={{ background:'rgba(255,255,255,.92)', color:T.ink, padding:'5px 11px', borderRadius:999, fontSize:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' }}>{tag}</span>)}
        </div>
        <div style={{ position:'absolute', bottom:12, left:12, background:'rgba(20,30,40,.75)', color:'#fff', padding:'5px 11px 5px 5px', borderRadius:999, fontSize:12, fontWeight:500, display:'inline-flex', alignItems:'center', gap:7 }}>
          <span style={{ width:20, height:20, borderRadius:'50%', background:T.green, display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color:'#fff' }}>{trip.creator[1].toUpperCase()}</span>
          {trip.creator}
        </div>
      </div>
      <div style={{ padding:'18px 18px 4px', display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12 }}>
        <div>
          <div style={{ fontSize:22, fontWeight:700, color:T.ink, letterSpacing:'-.015em', lineHeight:1.1 }}>{trip.dest}</div>
          <div style={{ fontSize:13, color:T.grey, marginTop:6 }}>{trip.dates}</div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontSize:9.5, color:T.grey, letterSpacing:'.14em', fontWeight:700 }}>STARTING AT</div>
          <div style={{ fontSize:22, fontWeight:800, color:T.greenDeep, letterSpacing:'-.02em', marginTop:2 }}>{inr(trip.price)}</div>
        </div>
      </div>
      <div style={{ margin:'14px 18px 16px', padding:'10px 12px', borderTop:`1px solid ${T.greyLight}`, display:'flex', alignItems:'center', gap:10 }}>
        {trip.heat==='filling' && <><Ico name="fire" size={14} color={T.fire}/><span style={{ fontSize:12.5, color:T.fire, fontWeight:600 }}>{trip.spotsLeft} of {trip.spotsTotal} spots · filling fast</span></>}
        {trip.heat==='almost-full' && <><Ico name="spark" size={14} color="#e11d48"/><span style={{ fontSize:12.5, color:'#e11d48', fontWeight:600 }}>{trip.spotsLeft} of {trip.spotsTotal} spots · almost full</span></>}
        {!trip.heat && <><Ico name="users" size={14} color={T.grey}/><span style={{ fontSize:12.5, color:T.grey, fontWeight:500 }}>{trip.spotsLeft} of {trip.spotsTotal} spots left</span></>}
      </div>
    </div>
  );
}

function HowTraveling() {
  const options = [
    { icon:'users', label:'Group', color:'#3ea370', bg:'#E7F7EE' },
    { icon:'heart', label:'Romantic', color:T.rose, bg:T.roseCream },
    { icon:'bed', label:'Business', color:'#4a6788', bg:'#EAF1F9' },
    { icon:'heart', label:'Solo', color:'#c45a6e', bg:'#FDEAEE' },
    { icon:'users', label:'Family', color:'#3ea370', bg:'#E7F7EE' },
  ];
  return (
    <div style={{ background:'#F4F6FA', padding:'24px 36px 72px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <h2 style={{ fontSize:40, fontWeight:800, letterSpacing:'-.025em', textAlign:'center', color:T.ink, margin:'0 0 32px', fontFamily:'Fraunces, serif' }}>How are you traveling?</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:20 }}>
          {options.map(o => (
            <div key={o.label} style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.greyLight}`, padding:'28px 16px', textAlign:'center', cursor:'pointer' }}>
              <div style={{ width:56, height:56, borderRadius:'50%', background:o.bg, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 14px' }}>
                <Ico name={o.icon} size={24} color={o.color} stroke={1.8}/>
              </div>
              <div style={{ fontSize:14, fontWeight:700, color:T.ink }}>{o.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <div style={{ background:'#F4F6FA', padding:'48px 36px 72px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:40 }}>
        {HOW_IT_WORKS.map(s => (
          <div key={s.n}>
            <div style={{ fontSize:72, fontWeight:800, color:'#D8DEE8', fontFamily:'Fraunces, serif', lineHeight:1 }}>{s.n}</div>
            <h3 style={{ fontSize:26, fontWeight:700, color:T.ink, letterSpacing:'-.02em', margin:'0 0 12px', fontFamily:'Fraunces, serif' }}>{s.title}</h3>
            <div style={{ fontSize:14, color:T.grey, lineHeight:1.6, maxWidth:320 }}>{s.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TravHer() {
  return (
    <div style={{ background:T.roseCream, padding:'72px 36px', borderLeft:`6px solid ${T.rose}` }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'center' }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <h2 style={{ fontSize:56, fontWeight:800, color:T.rose, letterSpacing:'-.035em', margin:0, fontFamily:'Fraunces, serif' }}>trav.her</h2>
            <Ico name="rose" size={40}/>
          </div>
          <div style={{ fontSize:20, color:T.roseSoft, marginTop:6, fontStyle:'italic', fontFamily:'Fraunces, serif' }}>for women who go.</div>
          <div style={{ marginTop:32, display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
            {[{icon:'shield',label:'Verified safe stays'},{icon:'users',label:'Women-only community'},{icon:'star',label:'Creator curated'},{icon:'heart',label:'SOS buddy system'}].map(f => (
              <div key={f.label} style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', border:`1px solid ${T.rose}33` }}>
                  <Ico name={f.icon} size={16} color={T.rose}/>
                </div>
                <span style={{ fontSize:15, fontWeight:600, color:T.rose }}>{f.label}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop:28 }}><Btn kind="rose" size="lg" icon="whatsapp">Join trav.her on WhatsApp</Btn></div>
        </div>
        <div style={{ position:'relative' }}>
          <div style={{ aspectRatio:'4/3', borderRadius:18, overflow:'hidden', boxShadow:'0 12px 30px rgba(0,0,0,.18)' }}>
            <ImgPlaceholder src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1200&q=80&auto=format&fit=crop" tone="#a07a4a" ink="#3a2614" accent="#f3d39c" label="trav.her · golden hour" radius={18} overlay={false}/>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoingLonger() {
  return (
    <div style={{ background:'#F4F6FA', padding:'88px 36px 72px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <h2 style={{ fontSize:40, fontWeight:800, color:T.ink, letterSpacing:'-.025em', margin:'0 0 32px', fontFamily:'Fraunces, serif' }}>Going longer</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
          {GOING_LONGER.map(g => (
            <div key={g.dest} style={{ borderRadius:16, overflow:'hidden', cursor:'pointer', aspectRatio:'3/4', position:'relative' }}>
              <ImgPlaceholder src={g.src} tone={g.tone} accent={g.accent} ink="#0a1418" label={g.dest.toLowerCase()} radius={16} overlay={false}/>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,.75) 100%)' }}/>
              <div style={{ position:'absolute', left:18, bottom:18, right:18, color:'#fff' }}>
                <div style={{ fontSize:26, fontWeight:800, letterSpacing:'-.02em', fontFamily:'Fraunces, serif' }}>{g.dest}</div>
                <div style={{ fontSize:13, color:'rgba(255,255,255,.88)', marginTop:2 }}>{g.duration} · ₹{g.from}K+</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Landing });
