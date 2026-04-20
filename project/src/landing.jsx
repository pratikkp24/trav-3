// Editable live feed. Each item rotates in the ribbon at the top of the hero.
// Every entry nudges the user to act — book, see, or call a trip directly.
// kind: 'booking' (someone just booked) | 'scarcity' (low spots) | 'drop' (new trip drop) | 'offer' (coupon live)
const LANDING_TICKER = [
  { id:'t1', kind:'booking',  tripId:'trip-rishikesh', icon:'whatsapp', text:'Priya from Delhi just locked a spot on',  highlight:'Rishikesh · May 16–18',       cta:'Book this trip' },
  { id:'t2', kind:'scarcity', tripId:'trip-nainital',  icon:'fire',     text:'Only',                                     highlight:'3 spots left on Nainital',     cta:'Grab a spot' },
  { id:'t3', kind:'drop',     tripId:'trip-jaipur',    icon:'spark',    text:'New drop live from Thursday ·',            highlight:'Jaipur Pink City Walk',         cta:'See trip' },
  { id:'t4', kind:'offer',    tripId:null,             icon:'gift',     text:'Code',                                     highlight:'WKND20 · 20% off this weekend', cta:'Apply & browse' },
];

function Landing({ onOpenTrip, onViewAllTrips, onOpenDrop, onOpenProfile, onTravHer, onOpenArticle, onAllTravelogues, theme='light' }) {
  const isDark = theme === 'dark';
  const [fromCity, setFromCity] = React.useState('Delhi');
  const [mode, setMode] = React.useState('weekend'); // weekend | long
  const [query, setQuery] = React.useState('');
  const isMobile = useIsMobile();
  const scrollToWeekend = () => {
    const el = document.getElementById('weekend-trips');
    if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
  };
  const onSearch = () => {
    if (onViewAllTrips) onViewAllTrips();
    else scrollToWeekend();
  };
  const onTickerCta = (item) => {
    if (item.kind === 'drop' && onOpenDrop) onOpenDrop();
    else if (item.tripId && onOpenTrip) onOpenTrip(item.tripId);
    else if (onViewAllTrips) onViewAllTrips();
    else scrollToWeekend();
  };
  return (
    <>
      <LiveTicker items={LANDING_TICKER} isMobile={isMobile} onCta={onTickerCta} theme={theme}/>
      <Hero fromCity={fromCity} setFromCity={setFromCity} mode={mode} setMode={setMode} query={query} setQuery={setQuery} onSeeTrips={scrollToWeekend} onSearch={onSearch} isMobile={isMobile} onOpenDrop={onOpenDrop} theme={theme}/>
      <WeekendTrips fromCity={fromCity} onOpen={onOpenTrip} onViewAll={onViewAllTrips} isMobile={isMobile} onOpenProfile={onOpenProfile}/>
      <BrowseCreators onOpen={onOpenProfile} isMobile={isMobile}/>
      <HowTraveling isMobile={isMobile}/>
      <HowItWorks isMobile={isMobile}/>
      <TravHer isMobile={isMobile} onOpen={onTravHer}/>
      <LatestTravelogues isMobile={isMobile} onOpen={onOpenArticle} onViewAll={onAllTravelogues}/>
      <GoingLonger isMobile={isMobile} onClickDest={onViewAllTrips}/>
    </>
  );
}

function BrowseCreators({ onOpen, isMobile }) {
  const sidePad = isMobile ? 16 : 36;
  return (
    <div style={{ background:'#fff', padding:`${isMobile?32:56}px 0` }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:`0 ${sidePad}px` }}>
        <div style={{ marginBottom:28 }}>
          <h2 style={{ fontSize:isMobile?24:40, fontWeight:800, color:T.ink, letterSpacing:'-.025em', margin:0, fontFamily:'Fraunces, serif' }}>Browse by creators</h2>
          <div style={{ fontSize:isMobile?14.5:16, color:T.grey, marginTop:8, maxWidth:600 }}>Hand-picked by people who know the roads better than anyone.</div>
        </div>
        
        <div className="scroll-x" style={{ display:'flex', gap:20, overflowX:'auto', padding:'4px 2px 24px', margin:'0 -4px' }}>
          {CREATORS.map(c => (
             <div key={c.id} onClick={() => onOpen(c.id)} className="snap" style={{ flex:'0 0 160px', textAlign:'center', cursor:'pointer' }}>
                <div style={{ position:'relative', width:120, height:120, margin:'0 auto 16px', transition:'transform .2s' }} onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'} onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
                   <img src={c.avatar} style={{ width:'100%', height:'100%', borderRadius:'50%', objectFit:'cover', border:`4px solid #fff`, boxShadow:'0 12px 30px rgba(15,30,46,.12)' }} />
                   <div style={{ position:'absolute', bottom:-4, right:-4, background:T.greenDeep, color:'#fff', padding:'3px 8px', borderRadius:999, fontSize:10, fontWeight:800, border:'2px solid #fff' }}>{c.stats.trips} trips</div>
                </div>
                <div style={{ fontSize:15, fontWeight:700, color:T.ink }}>{c.name}</div>
                <div style={{ fontSize:12, fontWeight:600, color:T.green, marginTop:2 }}>{c.handle}</div>
             </div>
          ))}
          {/* Become a creator card */}
          <div className="snap" style={{ flex:'0 0 160px', textAlign:'center', cursor:'pointer' }}>
             <div style={{ width:120, height:120, margin:'0 auto 16px', borderRadius:'50%', background:'#F4F6FA', border:`2.5px dashed ${T.greyLight}`, display:'flex', alignItems:'center', justifyContent:'center', color:T.grey }}>
                <Ico name="plus" size={32} color={T.grey} stroke={2}/>
             </div>
             <div style={{ fontSize:15, fontWeight:700, color:T.grey }}>Join us</div>
             <div style={{ fontSize:11, fontWeight:600, color:T.greyLight, marginTop:2 }}>Lead your trips</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ Live ticker (animated, action-led, editable list) ============ */
function LiveTicker({ items, isMobile, onCta, theme }) {
  const [idx, setIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    if (!items || items.length <= 1 || paused) return;
    const t = setInterval(() => setIdx(i => (i+1) % items.length), 4200);
    return () => clearInterval(t);
  }, [items, paused]);
  if (!items || items.length===0) return null;
  const kindTones = {
    booking:  { fg:T.green,    label:'JUST BOOKED' },
    scarcity: { fg:T.fire,     label:'FILLING FAST' },
    drop:     { fg:T.greenDeep,label:'NEW DROP' },
    offer:    { fg:'#A37A1A',  label:'OFFER LIVE' },
  };
  const isDark = theme === 'dark';
  const barBg = isDark ? T.ink : '#F0FAF4';
  const barFg = isDark ? '#fff' : T.ink;

  return (
    <div className={isDark ? 'keep-colors' : ''} onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} style={{ background:barBg, color:barFg, borderBottom:isDark?'none':`1px solid #E0F2F1`, position:'relative', overflow:'hidden' }}>
      {/* moving sheen */}
      <div style={{ position:'absolute', inset:0, background:`linear-gradient(90deg, transparent 0%, ${isDark?T.green:T.greenDeep}11 30%, transparent 60%)`, animation:'tk-shimmer 6s linear infinite', pointerEvents:'none' }}/>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:isMobile?'9px 14px':'10px 36px', display:'flex', alignItems:'center', gap:isMobile?10:14, position:'relative' }}>
        <span aria-label="live" style={{ position:'relative', width:9, height:9, flexShrink:0 }}>
          <span style={{ position:'absolute', inset:0, borderRadius:'50%', background:T.green, opacity:.55, animation:'tk-pulse 1.5s ease-out infinite' }}/>
          <span style={{ position:'absolute', inset:0, borderRadius:'50%', background:T.green }}/>
        </span>
        <div style={{ flex:1, minWidth:0, height:isMobile?20:22, position:'relative', overflow:'hidden' }}>
          {items.map((it,i) => {
            const tone = kindTones[it.kind] || kindTones.booking;
            return (
              <div key={it.id} style={{
                position:'absolute', inset:0, display:'flex', alignItems:'center', gap:isMobile?8:10,
                opacity: i===idx ? 1 : 0,
                transform: i===idx ? 'translateY(0)' : (i===((idx-1+items.length)%items.length) ? 'translateY(-110%)' : 'translateY(110%)'),
                transition:'opacity .35s ease, transform .35s ease',
                whiteSpace:'nowrap', overflow:'hidden',
              }}>
                <span style={{ fontSize:9.5, fontWeight:800, letterSpacing:'.14em', padding:'3px 8px', borderRadius:999, background:tone.fg, color:'#fff', display:'inline-flex', alignItems:'center', gap:5, flexShrink:0 }}>
                  <Ico name={it.icon} size={10} color="#fff"/>{tone.label}
                </span>
                <span style={{ fontSize:isMobile?12:13, color:isDark?'rgba(255,255,255,.9)':T.ink, fontWeight:500, overflow:'hidden', textOverflow:'ellipsis', minWidth:0 }}>
                  {it.text} <b style={{ color:isDark?'#fff':T.greenDeep, fontWeight:700 }}>{it.highlight}</b>
                </span>
              </div>
            );
          })}
        </div>
        <button onClick={()=>onCta && onCta(items[idx])} style={{
          flexShrink:0, height:isMobile?30:32, padding:isMobile?'0 11px':'0 14px', borderRadius:999,
          background:T.green, color:'#fff', border:'none', fontFamily:'inherit',
          fontSize:isMobile?11.5:12.5, fontWeight:800, cursor:'pointer',
          display:'inline-flex', alignItems:'center', gap:5,
          boxShadow:isDark?`0 4px 12px ${T.green}55`:`0 4px 12px ${T.green}33`,
        }}>
          {isMobile ? 'Book' : items[idx].cta} <Ico name="arrow-right" size={11} color="#fff" stroke={2.5}/>
        </button>
      </div>
      <style>{`
        @keyframes tk-pulse { 0% { transform:scale(1); opacity:.55 } 80% { transform:scale(2.4); opacity:0 } 100% { transform:scale(2.4); opacity:0 } }
        @keyframes tk-shimmer { 0% { transform:translateX(-30%) } 100% { transform:translateX(60%) } }
      `}</style>
    </div>
  );
}

function Hero({ fromCity, setFromCity, mode, setMode, query, setQuery, onSeeTrips, onSearch, isMobile, onOpenDrop, theme }) {
  const isDark = theme === 'dark';
  const [showLongWeekends, setShowLongWeekends] = React.useState(false);
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
  if (isMobile) {
    return (
      <div style={{ position:'relative', background:'#fff', overflow:'hidden', padding:'20px 16px 32px' }}>
        <div onClick={onOpenDrop} style={{ cursor:'pointer', display:'inline-flex', alignItems:'center', gap:6, background:'#F0FAF4', color:T.greenDeep, padding:'5px 12px', borderRadius:999, fontSize:11, fontWeight:600, marginBottom:14, border:`1px solid ${T.green}33` }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:T.green }}/>New drop · {TRAV.nextDrop}
        </div>
        <h1 className="keep-colors" style={{ fontSize:36, fontWeight:700, letterSpacing:'-.03em', lineHeight:1.05, margin:0, color:isDark?'#fff':T.ink, fontFamily:'Fraunces, serif' }}>
          Your weekend,<br/>perfectly <span style={{ color:T.green, fontStyle:'italic' }}>travelled.</span>
        </h1>
        <div className="keep-colors" style={{ marginTop:10, fontSize:14, color:isDark?'rgba(255,255,255,0.7)':T.grey, lineHeight:1.55 }}>
          Creator-led weekend trips. Just 15 spots. No leaves needed.
        </div>
        <SearchBar mode={mode} setMode={setMode} fromCity={fromCity} setFromCity={setFromCity} query={query} setQuery={setQuery} onSearch={onSearch} isMobile/>
        <div style={{ marginTop:14, display:'flex', flexDirection:'column', gap:8 }}>
          <Btn kind="primary" size="lg" full trailing="arrow-right" onClick={onSeeTrips}>See this weekend's trips</Btn>
          <Btn kind="outline" size="lg" full icon="whatsapp" onClick={onOpenDrop}>Get Thursday Drops</Btn>
        </div>
        <div style={{ marginTop:18, textAlign:'center' }}>
          <button onClick={()=>setShowLongWeekends(true)} style={{ background:'transparent', border:'none', color:T.greenDeep, fontSize:13.5, fontWeight:700, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:6, textDecoration:'underline', textDecorationColor:`${T.greenDeep}44`, textUnderlineOffset:4 }}>
            <Ico name="calendar" size={14} color={T.greenDeep}/> View 2026 Long Weekends
          </button>
        </div>
        <div className="scroll-x" style={{ marginTop:24, display:'flex', gap:10, overflowX:'auto', margin:'24px -16px 0', padding:'2px 16px 8px' }}>
          {[...leftTiles, ...rightTiles].slice(0, 8).map(t => (
            <div key={t.k} className="snap" style={{ flex:'0 0 110px', height:140, borderRadius:14, overflow:'hidden', boxShadow:'0 6px 18px rgba(15,30,46,.1)' }}>
              <ImgPlaceholder src={t.src} tone={t.tone} ink={t.ink} accent={t.accent} label={t.label} radius={0}/>
            </div>
          ))}
        </div>
        {showLongWeekends && <LongWeekendsModal onClose={()=>setShowLongWeekends(false)} />}
      </div>
    );
  }
  return (
    <div style={{ position:'relative', background:'#fff', overflow:'hidden' }}>
      <div style={{ position:'relative', minHeight:520, display:'grid', gridTemplateColumns:'minmax(0,1fr) minmax(680px,760px) minmax(0,1fr)', alignItems:'stretch' }}>
        <div style={{ position:'relative', height:420, marginTop:40, minWidth:0 }}>
          <div style={{ position:'absolute', right:20, top:0, width:360, height:400, maxWidth:'calc(100% - 20px)' }}>{leftTiles.map(t=><PhotoTile key={t.k} t={t}/>)}</div>
        </div>
        <div style={{ padding:'100px 20px 80px', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', position:'relative', zIndex:2 }}>
          <div style={{ position:'absolute', inset:'40px -40px 40px -40px', background:'radial-gradient(ellipse at center, rgba(255,255,255,.96) 0%, rgba(255,255,255,.88) 55%, rgba(255,255,255,0) 100%)', pointerEvents:'none', zIndex:-1 }}/>
          <div onClick={onOpenDrop} style={{ cursor:'pointer', display:'inline-flex', alignItems:'center', gap:8, background:'#F0FAF4', color:T.greenDeep, padding:'6px 14px', borderRadius:999, fontSize:12, fontWeight:600, marginBottom:22, border:`1px solid ${T.green}33` }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:T.green }}/>New drop · {TRAV.nextDrop}
          </div>
          <h1 className="keep-colors" style={{ fontSize:76, fontWeight:700, letterSpacing:'-.04em', lineHeight:1.02, margin:0, color:isDark?'#fff':T.ink, fontFamily:'Fraunces, serif' }}>
            Your weekend,<br/>perfectly <span style={{ color:T.green, fontStyle:'italic' }}>travelled.</span>
          </h1>
          <div className="keep-colors" style={{ marginTop:20, fontSize:17, color:isDark?'rgba(255,255,255,0.7)':T.grey, lineHeight:1.5, maxWidth:520 }}>
            Creator-led weekend trips. Friday night → Sunday evening.<br/>₹7–10K. Just 15 spots. No leaves needed.
          </div>
          <SearchBar mode={mode} setMode={setMode} fromCity={fromCity} setFromCity={setFromCity} query={query} setQuery={setQuery} onSearch={onSearch} isMobile={false}/>
          <div style={{ display:'flex', gap:12, marginTop:18, flexWrap:'wrap', justifyContent:'center' }}>
            <Btn kind="primary" size="lg" trailing="arrow-right" onClick={onSeeTrips}>See this weekend's trips</Btn>
            <Btn kind="outline" size="lg" icon="whatsapp" onClick={onOpenDrop}>Get Thursday Drops</Btn>
          </div>
          <div style={{ marginTop:24 }}>
            <button onClick={()=>setShowLongWeekends(true)} style={{ background:'transparent', border:'none', color:T.greenDeep, fontSize:14, fontWeight:700, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:6, textDecoration:'underline', textDecorationColor:`${T.greenDeep}44`, textUnderlineOffset:4 }}>
              <Ico name="calendar" size={15} color={T.greenDeep}/> Plan ahead: View 2026 Long Weekends
            </button>
          </div>
        </div>
        <div style={{ position:'relative', height:420, marginTop:40, minWidth:0 }}>
          <div style={{ position:'absolute', left:20, top:0, width:360, height:400, maxWidth:'calc(100% - 20px)' }}>{rightTiles.map(t=><PhotoTile key={t.k} t={t}/>)}</div>
        </div>
      </div>
      {showLongWeekends && <LongWeekendsModal onClose={()=>setShowLongWeekends(false)} />}
    </div>
  );
}

function SearchBar({ mode, setMode, fromCity, setFromCity, query, setQuery, onSearch, isMobile }) {
  const [cityOpen, setCityOpen] = React.useState(false);
  const [results, setResults] = React.useState([]);
  const [showResults, setShowResults] = React.useState(false);
  
  const allDestinations = React.useMemo(() => {
    const dests = ALL_TRIPS.map(t => t.dest);
    return [...new Set(dests)];
  }, []);

  const onQueryChange = (val) => {
    setQuery(val);
    if (val.length > 1) {
      const filtered = allDestinations.filter(d => d.toLowerCase().includes(val.toLowerCase()));
      setResults(filtered);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const selectDest = (dest) => {
    setQuery(dest);
    setShowResults(false);
    setTimeout(() => onSearch(dest), 50);
  };

  const placeholder = mode==='weekend' ? 'Bali, Goa, beach…' : 'Bali, Bhutan, longer…';
  return (
    <div style={{ marginTop:isMobile?16:24, width:isMobile?'100%':'auto', maxWidth:isMobile?'100%':640, position:'relative' }}>
      {/* Unified search shell — toggle tabs sit at the top, search row below, one connected card */}
      <div style={{ background:'#fff', border:`1px solid ${T.greyLight}`, borderRadius:isMobile?18:24, boxShadow:'0 12px 40px rgba(15,30,46,.10)', overflow:'visible' }}>
        {/* Mode tabs as airbnb-style ribbon at the top of the card */}
        <div style={{ display:'flex', alignItems:'center', gap:isMobile?2:4, padding:isMobile?'10px 10px 0':'12px 14px 0', justifyContent:isMobile?'center':'flex-start' }}>
          {[
            { id:'weekend', label:'Weekend',      icon:'calendar' },
            { id:'long',    label:'Long weekend', icon:'spark' },
          ].map(m => {
            const a = mode===m.id;
            return (
              <button key={m.id} onClick={()=>setMode(m.id)} style={{
                position:'relative',
                height:isMobile?30:34, padding:isMobile?'0 14px':'0 16px', borderRadius:999, border:'none',
                background: a ? '#F4F6FA' : 'transparent',
                color: a ? T.ink : T.grey,
                fontFamily:'inherit', fontSize:isMobile?12:13, fontWeight:a?700:600, cursor:'pointer',
                display:'inline-flex', alignItems:'center', gap:6,
                transition:'all .15s',
              }}>
                <Ico name={m.icon} size={12} color={a?T.greenDeep:T.grey}/> {m.label}
              </button>
            );
          })}
        </div>
        {/* Search row */}
        <div style={{ padding:isMobile?'8px 8px 8px':'10px 10px 10px', display:'flex', alignItems:'stretch', gap:isMobile?4:0, flexDirection:isMobile?'column':'row' }}>
          {/* From */}
          <div style={{ position:'relative', flex:isMobile?'unset':'0 0 auto' }}>
            <button onClick={()=>setCityOpen(o=>!o)} style={{ background:'transparent', border:'none', cursor:'pointer', fontFamily:'inherit', padding:isMobile?'8px 14px':'6px 16px', display:'flex', alignItems:'center', gap:10, width:isMobile?'100%':'auto', textAlign:'left', borderRadius:isMobile?12:999, transition:'background .15s' }} onMouseEnter={e=>e.currentTarget.style.background='#FAFBFC'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <Ico name="pin" size={14} color={T.greenDeep}/>
              <div>
                <div style={{ fontSize:9, fontWeight:800, color:T.grey, letterSpacing:'.14em', lineHeight:1 }}>FROM</div>
                <div style={{ fontSize:13, fontWeight:700, color:T.ink, marginTop:3, display:'inline-flex', alignItems:'center', gap:5 }}>{fromCity} <Ico name="chevron-down" size={11} color={T.grey}/></div>
              </div>
            </button>
            {cityOpen && (
              <div style={{ position:'absolute', top:'calc(100% + 6px)', left:0, background:'#fff', borderRadius:12, border:`1px solid ${T.greyLight}`, boxShadow:'0 16px 36px rgba(15,30,46,.18)', padding:6, zIndex:30, minWidth:160 }}>
                {TRAV.cities.map(c => (
                  <button key={c} onClick={()=>{setFromCity(c); setCityOpen(false);}} style={{ display:'block', width:'100%', padding:'9px 12px', borderRadius:8, border:'none', background: c===fromCity?'#F0FAF4':'transparent', color: c===fromCity?T.greenDeep:T.ink, textAlign:'left', fontSize:13, fontWeight: c===fromCity?700:500, cursor:'pointer', fontFamily:'inherit' }}>{c}</button>
                ))}
              </div>
            )}
          </div>
          {!isMobile && <div style={{ width:1, background:T.greyLight, margin:'10px 2px' }}/>}
          {/* Where / vibe */}
          <div style={{ flex:1, position:'relative', display:'flex', alignItems:'center', gap:10, padding:isMobile?'8px 14px':'6px 16px', minWidth:0, borderTop:isMobile?`1px solid ${T.greyLight}`:'none', borderRadius:isMobile?12:999, transition:'background .15s' }} onMouseEnter={e=>!isMobile && (e.currentTarget.style.background='#FAFBFC')} onMouseLeave={e=>!isMobile && (e.currentTarget.style.background='transparent')}>
            <Ico name={mode==='weekend'?'spark':'star'} size={14} color={T.greenDeep}/>
            <div style={{ flex:1, minWidth:0, textAlign:'left' }}>
              <div style={{ fontSize:9, fontWeight:800, color:T.grey, letterSpacing:'.14em', lineHeight:1 }}>WHERE</div>
              <input value={query} onChange={e=>onQueryChange(e.target.value)} onFocus={()=>query.length > 1 && setShowResults(true)} onBlur={()=>setTimeout(()=>setShowResults(false), 200)} onKeyDown={e=>{if(e.key==='Enter') onSearch();}} placeholder={placeholder} style={{ width:'100%', border:'none', outline:'none', fontSize:13.5, fontWeight:600, color:T.ink, padding:0, marginTop:3, fontFamily:'inherit', background:'transparent' }}/>
            </div>
            {showResults && results.length > 0 && (
              <div style={{ position:'absolute', top:'calc(100% + 12px)', left:isMobile?0:0, right:isMobile?0:0, background:'#fff', borderRadius:16, border:`1px solid ${T.greyLight}`, boxShadow:'0 16px 40px rgba(15,30,46,.18)', padding:8, zIndex:40 }}>
                <div style={{ fontSize:10, fontWeight:800, color:T.grey, letterSpacing:'.1em', padding:'4px 12px 8px' }}>SUGGESTIONS</div>
                {results.slice(0, 5).map(res => (
                  <button key={res} onClick={()=>selectDest(res)} style={{ display:'flex', alignItems:'center', gap:10, width:'100%', padding:'10px 12px', borderRadius:10, border:'none', background:'transparent', color:T.ink, textAlign:'left', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }} onMouseEnter={e=>e.currentTarget.style.background='#F4F6FA'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <Ico name="pin" size={14} color={T.grey}/> {res}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Search button */}
          <button onClick={() => { haptic(); onSearch(); }} aria-label="Search trips" style={{
            flexShrink:0, height:isMobile?44:48, padding:isMobile?'0 18px':'0 22px', borderRadius:999,
            background:T.green, color:'#fff', border:'none', cursor:'pointer', fontFamily:'inherit',
            fontSize:isMobile?13.5:14, fontWeight:800,
            display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8,
            boxShadow:`0 4px 14px ${T.green}55`, marginTop:isMobile?2:0, marginLeft:isMobile?0:4,
            transition:'transform .15s, box-shadow .15s',
          }} onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow=`0 8px 22px ${T.green}66`; }} onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow=`0 4px 14px ${T.green}55`; }}>
            <SearchIcon/> Search
          </button>
        </div>
      </div>
    </div>
  );
}

function SearchIcon() {
  return <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>;
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

function WeekendTrips({ fromCity, onOpen, onViewAll, isMobile }) {
  return (
    <div id="weekend-trips" style={{ background:'#F4F6FA', padding:isMobile?'32px 0':'72px 36px', scrollMarginTop:72 }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:isMobile?'0 16px':0 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:isMobile?18:28, flexWrap:'wrap', gap:10 }}>
          <div>
            <h2 style={{ fontSize:isMobile?24:40, fontWeight:800, letterSpacing:'-.025em', margin:0, color:T.ink, fontFamily:'Fraunces, serif' }}>This weekend from {fromCity}</h2>
            <div style={{ fontSize:isMobile?12.5:14.5, color:T.grey, marginTop:isMobile?4:6 }}>Dropping Thursday. 15 spots per trip.</div>
          </div>
          {!isMobile && <div style={{ background:T.amberSoft, border:`1px solid ${T.amber}55`, borderLeft:`4px solid ${T.amber}`, padding:'10px 16px', borderRadius:8, display:'flex', gap:8, alignItems:'center' }}>
            <Ico name="clock" size={14} color={T.amber}/>
            <span style={{ fontSize:13, fontWeight:600, color:'#b3791f' }}>Next drop: {TRAV.nextDrop}</span>
          </div>}
        </div>
        <div className={isMobile?'scroll-x':''} style={{ display:isMobile?'flex':'grid', gridTemplateColumns:isMobile?undefined:'repeat(3,1fr)', gap:isMobile?14:24, overflowX:isMobile?'auto':'visible', margin:isMobile?'0 -16px':0, padding:isMobile?'0 16px':0 }}>
          {WEEKEND_TRIPS.map(t => <div key={t.id} className={isMobile?'snap':''} style={{ minWidth:isMobile?280:'auto', flexShrink:0 }}><TripCard trip={t} onOpen={()=>onOpen(t.id)}/></div>)}
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
  const [wished, setWished] = React.useState(() => getWishlist().includes(trip.id));
  const isTH = !!trip.travHer;
  const isHoliday = !!trip.holiday;
  const accent = isTH ? T.rose : T.greenDeep;
  const ringHover = isTH ? 'rgba(190,62,42,.18)' : 'rgba(15,30,46,.12)';

  const toggleWish = (e) => {
    e.stopPropagation();
    haptic();
    setWished(toggleWishlist(trip.id));
  };

  return (
    <div onClick={onOpen} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{ background:'#fff', borderRadius:16, overflow:'hidden', border:`1px solid ${isTH?'#F2D6CE':T.greyLight}`, boxShadow:hover?`0 18px 40px ${ringHover}`:'0 2px 8px rgba(15,30,46,.04)', transform:hover?'translateY(-3px)':'translateY(0)', transition:'all .2s', cursor:'pointer', position:'relative' }}>
      
      {/* Badges container */}
      <div style={{ position:'absolute', top:14, right:-4, zIndex:10, display:'flex', flexDirection:'column', gap:8, alignItems:'flex-end' }}>
        {isTH && (
          <div style={{ background:`linear-gradient(135deg, ${T.rose} 0%, #d04a36 100%)`, color:'#fff', padding:'6px 12px 6px 16px', fontSize:10, fontWeight:800, letterSpacing:'.14em', textTransform:'uppercase', display:'inline-flex', alignItems:'center', gap:5, boxShadow:'0 4px 12px rgba(190,62,42,.35)', clipPath:'polygon(0 0, 100% 0, 100% 100%, 0 100%, 6px 50%)' }}>
            <Ico name="rose" size={11} color="#fff"/> trav.her
          </div>
        )}
        {isHoliday && (
          <div style={{ background:`linear-gradient(135deg, ${T.amber} 0%, #a37a1a 100%)`, color:'#fff', padding:'6px 12px 6px 16px', fontSize:10, fontWeight:800, letterSpacing:'.14em', textTransform:'uppercase', display:'inline-flex', alignItems:'center', gap:5, boxShadow:'0 4px 12px rgba(163,122,26,.35)', clipPath:'polygon(0 0, 100% 0, 100% 100%, 0 100%, 6px 50%)' }}>
            <Ico name="calendar" size={11} color="#fff"/> {trip.holiday}
          </div>
        )}
      </div>

      <div style={{ height:240, position:'relative' }}>
        <ImgPlaceholder {...trip.img} radius={0} overlay={false}/>
        {isTH && <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(190,62,42,0) 55%, rgba(190,62,42,.32) 100%)' }}/>}
        
        {/* Top-left tags */}
        <div style={{ position:'absolute', top:14, left:14, display:'flex', gap:6, zIndex:2 }}>
          {trip.tags.map(tag => <span key={tag} style={{ background:'rgba(255,255,255,.92)', color:T.ink, padding:'5px 11px', borderRadius:999, fontSize:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' }}>{tag}</span>)}
        </div>

        {/* Wishlist Heart */}
        <button onClick={toggleWish} style={{
          position:'absolute', bottom:14, right:14, zIndex:20,
          width:40, height:40, borderRadius:'50%', background:'rgba(255,255,255,.95)', border:'none',
          display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer',
          boxShadow:'0 4px 12px rgba(0,0,0,.15)', transition:'transform .2s'
        }} onMouseEnter={e=>e.currentTarget.style.transform='scale(1.1)'} onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
          <Ico name="heart" size={20} color={wished ? T.rose : T.ink} fill={wished ? T.rose : 'none'} stroke={2.2}/>
        </button>

        <div onClick={(e)=>{ e.stopPropagation(); onOpenProfile && onOpenProfile(trip.creatorId); }} style={{ position:'absolute', bottom:12, left:12, background:'rgba(20,30,40,.75)', color:'#fff', padding:'5px 11px 5px 5px', borderRadius:999, fontSize:12, fontWeight:500, display:'inline-flex', alignItems:'center', gap:7, cursor:'pointer' }}>
          <span style={{ width:20, height:20, borderRadius:'50%', background:isTH?T.rose:T.green, display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color:'#fff' }}>{(CREATORS.find(c=>c.id===trip.creatorId)?.name[0] || 'T').toUpperCase()}</span>
          {CREATORS.find(c=>c.id===trip.creatorId)?.handle || '@trav'}
        </div>
      </div>

      <div style={{ padding:'18px 18px 4px', display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12 }}>
        <div>
          <div style={{ fontSize:22, fontWeight:700, color:T.ink, letterSpacing:'-.015em', lineHeight:1.1 }}>{trip.dest}</div>
          <div style={{ fontSize:13, color:T.grey, marginTop:6 }}>{trip.dates}</div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontSize:22, fontWeight:800, color:accent, letterSpacing:'-.02em' }}>{inr(trip.price)}</div>
          <div style={{ fontSize:9.5, color:T.grey, letterSpacing:'0.05em', fontWeight:700, marginTop:2 }}>STARTING</div>
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

function HowTraveling({ isMobile }) {
  const options = [
    { icon:'users', label:'Group', color:'#3ea370', bg:'#E7F7EE',
      pitch:"Squad of 4+? We'll curate a trip your group actually agrees on. One itinerary, one invoice, zero group-chat chaos.",
      features:['Private departures','Custom dates','Dedicated trip lead'] },
    { icon:'heart', label:'Romantic', color:T.rose, bg:T.roseCream,
      pitch:"Date-night energy, two nights long. Boutique stays, quiet corners, one surprise built in.",
      features:['Couples-only rooms','Candlelit dinner','No group pressure'] },
    { icon:'bed', label:'Business', color:'#4a6788', bg:'#EAF1F9',
      pitch:"Workations that don't feel like work. Fast wifi, quiet rooms, and an evening view worth closing the laptop for.",
      features:['Fibre-speed wifi','Private workspace','Weekday check-in'] },
    { icon:'heart', label:'Solo female', color:'#B5365A', bg:'#FDEAF0',
      pitch:"Women-only weekends, curated by women who've been there. Verified stays, female trip leads, and a group that genuinely looks out for each other.",
      features:['Women-only cohort','Female trip lead','Safety-vetted stays'] },
    { icon:'users', label:'Family', color:'#3ea370', bg:'#E7F7EE',
      pitch:"Kid-friendly escapes that don't bore the grown-ups. From interconnecting rooms to activities sized for 6-year-olds and 60-year-olds.",
      features:['Kid-safe activities','Family rooms','Flexible pace'] },
  ];
  const [selected, setSelected] = React.useState('Solo female');
  const selectedIndex = options.findIndex(o => o.label === selected);
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : null;
  const triangleLeft = selectedIndex >= 0 ? `calc(${selectedIndex * 20}% + 10%)` : '50%';

  return (
    <div style={{ background:'#F4F6FA', padding:isMobile?'18px 0 40px':'24px 36px 72px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:isMobile?'0 16px':0 }}>
        <h2 style={{ fontSize:isMobile?22:40, fontWeight:800, letterSpacing:'-.025em', textAlign:isMobile?'left':'center', color:T.ink, margin:`0 0 ${isMobile?16:32}px`, fontFamily:'Fraunces, serif' }}>How are you traveling?</h2>
        <div className={isMobile?'scroll-x':''} style={{ display:isMobile?'flex':'grid', gridTemplateColumns:isMobile?undefined:'repeat(5,1fr)', gap:isMobile?10:20, overflowX:isMobile?'auto':'visible', margin:isMobile?'0 -16px':0, padding:isMobile?'0 16px':0 }}>
          {options.map(o => {
            const isSel = o.label === selected;
            return (
              <div key={o.label} className={isMobile?'snap':''}
                onClick={() => setSelected(o.label)}
                style={{
                  background:'#fff', borderRadius:16,
                  border:isSel ? `2px solid ${o.color}` : `1px solid ${T.greyLight}`,
                  padding:isMobile?'18px 14px':'28px 16px', textAlign:'center', cursor:'pointer',
                  minWidth:isMobile?108:'auto', flexShrink:0,
                  boxShadow:isSel ? '0 6px 20px rgba(15,30,46,.10)' : 'none',
                  transition:'box-shadow .15s, border-color .15s',
                }}>
                <div style={{ width:isMobile?44:56, height:isMobile?44:56, borderRadius:'50%', background:o.bg, display:'flex', alignItems:'center', justifyContent:'center', margin:`0 auto ${isMobile?10:14}px` }}>
                  <Ico name={o.icon} size={isMobile?20:24} color={o.color} stroke={1.8}/>
                </div>
                <div style={{ fontSize:isMobile?12.5:14, fontWeight:700, color:T.ink }}>{o.label}</div>
              </div>
            );
          })}
        </div>
        {selectedOption && (
          <div style={{ position:'relative', marginTop:isMobile?10:14 }}>
            {!isMobile && (
              <div style={{
                position:'absolute', top:-8, left:triangleLeft, transform:'translateX(-50%)',
                width:0, height:0,
                borderLeft:'8px solid transparent', borderRight:'8px solid transparent',
                borderBottom:`8px solid #fff`,
                filter:'drop-shadow(0 -1px 0 '+T.greyLight+')',
              }}/>
            )}
            <div style={{
              background:'#fff', borderRadius:16, border:`1px solid ${T.greyLight}`,
              padding:isMobile?18:22, boxShadow:'0 6px 18px rgba(15,30,46,.08)',
              display:'flex', flexDirection:isMobile?'column':'row', alignItems:isMobile?'flex-start':'center',
              gap:isMobile?12:18,
            }}>
              <div style={{
                width:isMobile?40:48, height:isMobile?40:48, borderRadius:'50%',
                background:selectedOption.bg, display:'flex', alignItems:'center', justifyContent:'center',
                flexShrink:0,
              }}>
                <Ico name={selectedOption.icon} size={isMobile?20:22} color={selectedOption.color} stroke={1.8}/>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:isMobile?18:20, fontWeight:700, color:T.ink, fontFamily:'Fraunces, serif', marginBottom:6 }}>
                  {selectedOption.label}
                </div>
                <div style={{ fontSize:isMobile?13.5:14, color:T.grey, lineHeight:1.55, marginBottom:10 }}>
                  {selectedOption.pitch}
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {selectedOption.features.map(f => (
                    <span key={f} style={{
                      fontSize:12, fontWeight:600, color:selectedOption.color,
                      background:selectedOption.bg, borderRadius:999,
                      padding:'5px 10px',
                    }}>{f}</span>
                  ))}
                </div>
              </div>
              <a href="#" onClick={e=>e.preventDefault()} style={{
                fontSize:13.5, fontWeight:600, color:selectedOption.color,
                textDecoration:'none', alignSelf:isMobile?'flex-end':'flex-end',
                whiteSpace:'nowrap',
              }}>See trips →</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function HowItWorks({ isMobile }) {
  return (
    <div style={{ background:'#F4F6FA', padding:isMobile?'18px 16px 40px':'48px 36px 72px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)', gap:isMobile?24:40 }}>
        {HOW_IT_WORKS.map(s => (
          <div key={s.n}>
            <div style={{ fontSize:isMobile?54:72, fontWeight:800, color:'#D8DEE8', fontFamily:'Fraunces, serif', lineHeight:1 }}>{s.n}</div>
            <h3 style={{ fontSize:isMobile?20:26, fontWeight:700, color:T.ink, letterSpacing:'-.02em', margin:`0 0 ${isMobile?8:12}px`, fontFamily:'Fraunces, serif' }}>{s.title}</h3>
            <div style={{ fontSize:isMobile?13.5:14, color:T.grey, lineHeight:1.6, maxWidth:320 }}>{s.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TravHer({ isMobile, onOpen }) {
  return (
    <div style={{ background:T.roseCream, padding:isMobile?'48px 16px':'92px 36px', borderLeft:isMobile?'none':`6px solid ${T.rose}`, borderTop:isMobile?`4px solid ${T.rose}`:'none', position:'relative', overflow:'hidden' }}>
      {/* Subtle organic background blobs */}
      {!isMobile && (
        <>
          <div style={{ position:'absolute', top:-60, right:-60, width:300, height:300, borderRadius:'50%', background:'linear-gradient(135deg, #fff, transparent)', opacity:.4, filter:'blur(40px)' }}/>
          <div style={{ position:'absolute', bottom:-100, left:200, width:400, height:400, borderRadius:'50%', background:'linear-gradient(135deg, transparent, #fff)', opacity:.3, filter:'blur(60px)' }}/>
        </>
      )}
      
      <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:isMobile?'1fr':'1.1fr 0.9fr', gap:isMobile?32:64, alignItems:'center', position:'relative', zIndex:2 }}>
        <div>
          <div style={{ display:'flex', alignItems:'flex-baseline', gap:12 }}>
            <h2 style={{ fontSize:isMobile?64:96, fontWeight:800, color:T.rose, letterSpacing:'-.04em', margin:0, fontFamily:'Fraunces, serif', lineHeight:0.9 }}>trav.her</h2>
            <div style={{ transform:'translateY(-12px)' }}><Ico name="rose" size={isMobile?32:48}/></div>
          </div>
          <div style={{ fontSize:isMobile?18:24, color:T.roseSoft, marginTop:8, fontStyle:'italic', fontFamily:'Fraunces, serif', opacity:.85 }}>for women who go.</div>
          
          <div style={{ marginTop:isMobile?32:48, display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:isMobile?16:24 }}>
            {[
              {icon:'shield',label:'Verified safe stays'},
              {icon:'users',label:'Women-only community'},
              {icon:'star',label:'Creator curated'},
              {icon:'heart',label:'SOS buddy system'}
            ].map(f => (
              <div key={f.label} style={{ display:'flex', alignItems:'center', gap:14, background:'rgba(255,255,255,0.4)', padding:isMobile?'12px 16px':'16px 20px', borderRadius:16, border:'1px solid rgba(255,255,255,0.6)', backdropFilter:'blur(4px)' }}>
                <div style={{ width:isMobile?32:38, height:isMobile?32:38, borderRadius:12, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 12px rgba(190,62,42,0.08)' }}>
                  <Ico name={f.icon} size={isMobile?14:18} color={T.rose}/>
                </div>
                <span style={{ fontSize:isMobile?14:16, fontWeight:700, color:T.ink, opacity:.9 }}>{f.label}</span>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop:isMobile?32:48, display:'flex', gap:14, flexWrap:'wrap' }}>
            <Btn kind="rose" size="lg" icon="whatsapp" onClick={() => window.open('https://wa.me/919999999999')}>Join on WhatsApp</Btn>
            <Btn kind="outline" size="lg" style={{ background:'rgba(255,255,255,0.6)', borderColor:T.rose, color:T.rose }} onClick={onOpen}>Explore trav.her trips →</Btn>
          </div>
        </div>
        
        <div style={{ position:'relative' }}>
          <div style={{ 
            aspectRatio:'4/5', 
            borderRadius:isMobile?24:32, 
            overflow:'hidden', 
            boxShadow:'0 30px 70px rgba(190,62,42,0.25)',
            border:'10px solid #fff',
            transform:isMobile?'none':'rotate(2deg) scale(1.02)',
            transition:'transform .4s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
          onMouseEnter={e=>!isMobile && (e.currentTarget.style.transform='rotate(0deg) scale(1.05)')}
          onMouseLeave={e=>!isMobile && (e.currentTarget.style.transform='rotate(2deg) scale(1.02)')}
          >
            <ImgPlaceholder src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1200&q=80&auto=format&fit=crop" tone="#a07a4a" ink="#3a2614" accent="#f3d39c" label="trav.her · solo exploration" radius={0} overlay={false}/>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, transparent 60%, rgba(190,62,42,0.3) 100%)' }}/>
          </div>
          
          {/* Floating badge */}
          {!isMobile && (
            <div style={{ position:'absolute', bottom:40, left:-30, background:'#fff', padding:'12px 18px', borderRadius:16, boxShadow:'0 15px 35px rgba(0,0,0,0.1)', border:`1px solid ${T.greyLight}`, display:'flex', alignItems:'center', gap:10, animation: 'float-slow 4s ease-in-out infinite' }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:T.green, boxShadow:`0 0 10px ${T.green}` }}/>
              <span style={{ fontSize:13, fontWeight:700, color:T.ink }}>52 women active now</span>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

function LatestTravelogues({ isMobile, onOpen, onViewAll }) {
  const latest = TRAVELOGUES.slice(0, 2);
  const sidePad = isMobile ? 18 : 40;
  
  // Journal Decoration: Realistic Paper Clip
  const PaperClip = ({ style }) => (
    <svg style={{ position:'absolute', zIndex:20, filter:'drop-shadow(2px 3px 2px rgba(0,0,0,0.2))', ...style }} width="28" height="52" viewBox="0 0 24 48" fill="none">
      <path d="M18 12V34C18 39.5228 13.5228 44 8 44C2.47715 44 -2 39.5228 -2 34V10C-2 4.47715 2.47715 0 8 0C13.5228 0 18 4.47715 18 10V34C18 39.5147 13.5147 44 8 44" stroke="#2563EB" strokeWidth="4" strokeLinecap="round"/>
      <path d="M12 12V34C12 36.2091 10.2091 38 8 38C5.79086 38 4 36.2091 4 34V10C4 7.79086 5.79086 6 8 6C10.2091 6 12 7.79086 12 10" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  return (
    <div style={{ 
      background:'#F9F6F0', // Aged paper color
      padding:isMobile?'32px 0':'56px 0', 
      position:'relative', 
      overflow:'hidden',
      backgroundImage: 'radial-gradient(#d1cfc9 1px, transparent 1px)',
      backgroundSize: '32px 32px' // Subtle dots like a bullet journal
    }}>
      {/* Decorative notebook elements */}
      {!isMobile && (
        <div style={{ position:'absolute', top:0, left:'50%', bottom:0, width:1, background:'rgba(209,207,201,0.5)', zIndex:1 }}/>
      )}

      <div style={{ maxWidth:1100, margin:'0 auto', padding:`0 ${sidePad}px`, position:'relative', zIndex:2 }}>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:isMobile?32:56, flexWrap:'wrap', gap:20 }}>
          <div style={{ textAlign:'left' }}>
            <h2 style={{ fontSize:isMobile?28:44, fontWeight:800, color:T.ink, letterSpacing:'-.04em', margin:0, fontFamily:'Fraunces, serif' }}>The Travel Journal</h2>
            <div style={{ fontSize:isMobile?16:18, color:T.grey, marginTop:4, fontFamily:'Caveat, cursive', opacity:.8 }}>Notes, memories, and discoveries from the road.</div>
          </div>
          
          <button onClick={onViewAll} style={{ 
            background:'none', border:'none', color:T.ink, fontSize:isMobile?18:22, fontWeight:700, cursor:'pointer', fontFamily:'Caveat, cursive',
            textDecoration:'underline', textDecorationThickness:2, textUnderlineOffset:6, display:'inline-flex', alignItems:'center', gap:10,
            padding:0, marginBottom:8
          }}>
            Explore the full travelogue <Ico name="arrow-right" size={18}/>
          </button>
        </div>
        
        <div style={{ display:isMobile?'flex':'grid', flexDirection:isMobile?'column':undefined, gridTemplateColumns:isMobile?undefined:'1fr 1fr', gap:isMobile?32:48 }}>
          {latest.map((article, i) => {
            const isEven = i % 2 === 0;
            return (
              <div key={article.id} onClick={() => onOpen(article.id)} style={{ 
                cursor:'pointer', 
                transform:isMobile?'none':`translateY(${isEven?20:-20}px) rotate(${isEven?1.5:-1.5}deg)`,
                transition:'transform .3s ease'
              }}
              onMouseEnter={e=>!isMobile && (e.currentTarget.style.transform=`translateY(${isEven?20:-20}px) rotate(0deg) scale(1.02)`)}
              onMouseLeave={e=>!isMobile && (e.currentTarget.style.transform=`translateY(${isEven?20:-20}px) rotate(${isEven?1.5:-1.5}deg) scale(1)`)}
              >
                {/* Polaroid Frame */}
                <div style={{ 
                  background:'#fff', 
                  padding:isMobile?'10px 10px 32px':'12px 12px 42px', 
                  boxShadow:'0 20px 50px rgba(0,0,0,0.12)', 
                  borderRadius:2, 
                  position:'relative',
                  overflow:'hidden'
                }}>
                  <PaperClip style={{ top:-10, left:20 }}/>
                  <div style={{ width:'calc(100% + 40px)', margin:isMobile?'-10px -10px 12px':'-12px -12px 18px', aspectRatio:'4/3', overflow:'hidden', background:'#f8f8f8' }}>
                    {article.hero.src && (
                      <img 
                        src={article.hero.src} 
                        alt="" 
                        style={{ width:'100%', height:'100%', display:'block', objectFit:'cover' }}
                      />
                    )}
                  </div>
                  
                  {/* Handwritten Caption */}
                  <div style={{ 
                    fontFamily:'Caveat, cursive', fontSize:isMobile?16:20, color:T.ink, opacity:0.8,
                    textAlign:'center'
                  }}>
                    {article.category} · {article.date}
                  </div>
                </div>

                {/* Entry Content */}
                <div style={{ marginTop:28, padding:isMobile?'0 8px':'0 12px' }}>
                  <h3 style={{ fontSize:isMobile?24:32, fontWeight:700, color:T.ink, margin:'0 0 14px', fontFamily:'Fraunces, serif', lineHeight:1.15 }}>{article.title}</h3>
                  <p style={{ fontSize:isMobile?15:17, color:T.grey, lineHeight:1.6, margin:0, fontFamily:'Caveat, cursive', maxHeight:isMobile?80:120, overflow:'hidden' }}>
                    "{article.dek}"
                  </p>
                  
                  <div style={{ marginTop:24, display:'flex', alignItems:'center', gap:10 }}>
                    <Avatar name={article.author.name} size={isMobile?32:36}/>
                    <div style={{ fontSize:isMobile?14:16, fontWeight:700, color:T.ink, fontFamily:'Poppins, sans-serif' }}>{article.author.name}</div>
                    <div style={{ height:1, flex:1, background:'rgba(0,0,0,0.05)', marginLeft:10 }}/>
                    <div style={{ fontSize:13, color:T.grey, fontWeight:600 }}>ENTRY #{i+1}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


function GoingLonger({ isMobile, onClickDest }) {
  return (
    <div style={{ background:'#F4F6FA', padding:isMobile?'32px 0 40px':'88px 36px 72px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:isMobile?'0 16px':0 }}>
        <h2 style={{ fontSize:isMobile?22:40, fontWeight:800, color:T.ink, letterSpacing:'-.025em', margin:`0 0 ${isMobile?16:32}px`, fontFamily:'Fraunces, serif' }}>Going longer</h2>
        <div className={isMobile?'scroll-x':''} style={{ display:isMobile?'flex':'grid', gridTemplateColumns:isMobile?undefined:'repeat(4,1fr)', gap:isMobile?12:20, overflowX:isMobile?'auto':'visible', margin:isMobile?'0 -16px':0, padding:isMobile?'0 16px':0 }}>
          {GOING_LONGER.map(g => (
            <div key={g.dest} onClick={() => onClickDest && onClickDest(g.dest)} className={isMobile?'snap':''} style={{ borderRadius:16, overflow:'hidden', cursor:'pointer', aspectRatio:'3/4', position:'relative', minWidth:isMobile?200:'auto', flexShrink:0 }}>
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

function LongWeekendsModal({ onClose }) {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);
  const LONG_WEEKENDS_2026 = [
    { month: 'January', title: 'Republic Day', dates: 'Jan 24–26', days: 3, strategy: 'Public holiday on Mon' },
    { month: 'March', title: 'Holi Weekend', dates: 'Mar 1–4', days: 4, strategy: 'Take Mar 2 (Mon) off' },
    { month: 'April', title: 'Good Friday', dates: 'Apr 3–5', days: 3, strategy: 'Public holiday on Fri' },
    { month: 'May', title: 'Buddha Purnima', dates: 'May 1–3', days: 3, strategy: 'Public holiday on Fri' },
    { month: 'August', title: 'Independence Day', dates: 'Aug 14–16', days: 3, strategy: 'Take Aug 14 (Fri) off' },
    { month: 'October', title: 'Gandhi Jayanti', dates: 'Oct 2–4', days: 3, strategy: 'Public holiday on Fri' },
    { month: 'November', title: 'Diwali', dates: 'Nov 7–9', days: 3, strategy: 'Public holiday on Mon' },
    { month: 'December', title: 'Christmas', dates: 'Dec 25–27', days: 3, strategy: 'Public holiday on Fri' }
  ];
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(15,30,46,.4)', backdropFilter:'blur(4px)', zIndex:999, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{ background:'#fff', borderRadius:24, width:'100%', maxWidth:500, maxHeight:'85vh', display:'flex', flexDirection:'column', boxShadow:'0 24px 60px rgba(15,30,46,.2)', position:'relative', animation:'modalFade .2s ease' }}>
        <div style={{ padding:'24px 24px 16px', borderBottom:`1px solid ${T.greyLight}`, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <h2 style={{ margin:0, fontSize:22, fontWeight:800, color:T.ink, fontFamily:'Fraunces, serif' }}>2026 Long Weekends</h2>
          <button onClick={onClose} style={{ background:'transparent', border:'none', cursor:'pointer', padding:6, display:'flex' }}><Ico name="x" size={20} color={T.ink}/></button>
        </div>
        <div style={{ padding:24, overflowY:'auto', flex:1 }}>
          <div style={{ fontSize:14, color:T.grey, marginBottom:20, lineHeight:1.5 }}>Plan ahead and claim your leaves early. Here’s a list of major long weekends to help you perfectly travel this year.</div>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {LONG_WEEKENDS_2026.map((w, i) => (
              <div key={i} style={{ display:'flex', gap:16, alignItems:'center', background:'#F9FAFB', padding:14, borderRadius:16, border:`1px solid ${T.greyLight}` }}>
                <div style={{ width:48, height:48, borderRadius:12, background:'#F0FAF4', color:T.greenDeep, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <div style={{ fontSize:11, fontWeight:800, textTransform:'uppercase' }}>{w.month.slice(0,3)}</div>
                  <div style={{ fontSize:16, fontWeight:800, lineHeight:1.1 }}>{w.days}</div>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:16, fontWeight:700, color:T.ink, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{w.title} <span style={{ fontWeight:400, color:T.grey, fontSize:13 }}>· {w.dates}</span></div>
                  <div style={{ fontSize:13, color:T.grey, marginTop:2, display:'inline-flex', alignItems:'center', gap:4, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:'100%' }}><Ico name="spark" size={11} color={T.amber}/> {w.strategy}</div>
                </div>
                <div style={{ flexShrink:0, fontSize:13, fontWeight:700, color:T.ink, background:'#E6E6E6', padding:'4px 10px', borderRadius:999 }}>{w.days} days</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding:20, borderTop:`1px solid ${T.greyLight}`, textAlign:'center', background:'#FAFBFC', borderBottomLeftRadius:24, borderBottomRightRadius:24 }}>
          <Btn kind="primary" size="md" full onClick={onClose}>Done planning</Btn>
        </div>
        <style>{`@keyframes modalFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </div>
    </div>
  );
}

Object.assign(window, { Landing, LongWeekendsModal, TripCard });
