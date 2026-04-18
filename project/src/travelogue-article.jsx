// Travelogue Article — upper half (hero, meta, prose, pull quotes, videos, budget).
// Pairs with travelogue-article-lower.jsx.

function TravelogueArticle({ onBack, onOpenTrip }) {
  const a = GOA_ARTICLE;
  return (
    <div style={{ background:'#fff' }}>
      {/* Sub-header breadcrumb */}
      <div style={{ background:'#fff', borderBottom:`1px solid ${T.greyLight}`, padding:'14px 36px', position:'sticky', top:64, zIndex:10, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <span onClick={onBack} style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:13.5, fontWeight:600, color:T.ink, cursor:'pointer' }}>
            <Ico name="arrow-left" size={15} color={T.ink}/> Travelogue
          </span>
          <span style={{ width:1, height:20, background:T.greyLight }}/>
          <span style={{ fontSize:13, color:T.grey }}><span style={{ color:T.ink, fontWeight:600 }}>{a.title.split(':')[0]}</span> — {a.category} · {a.date}</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <Avatar name={a.author.name} size={28}/>
          <div style={{ lineHeight:1.1 }}>
            <div style={{ fontSize:10, color:T.grey, letterSpacing:'.14em', fontWeight:600 }}>WRITTEN BY</div>
            <div style={{ fontSize:13, fontWeight:700, color:T.ink }}>{a.author.name}</div>
          </div>
          <span style={{ width:1, height:20, background:T.greyLight, marginLeft:6 }}/>
          <button style={{ display:'inline-flex', alignItems:'center', gap:6, background:'transparent', border:'none', fontSize:13, color:T.ink, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
            <Ico name="send" size={14} color={T.ink}/> Share
          </button>
        </div>
      </div>

      {/* Hero */}
      <ArticleHero article={a}/>

      {/* Intro body + pull quotes */}
      <div style={{ maxWidth:760, margin:'0 auto', padding:'40px 36px 20px' }}>
        <PullQuote text={a.pullQuote1}/>
        <Prose paras={a.intro}/>
        <div style={{ margin:'34px 0' }}>
          <h2 style={{ fontFamily:'Fraunces, serif', fontSize:28, fontWeight:700, letterSpacing:'-.02em', color:T.ink, margin:'0 0 14px' }}>{a.sectionTitle}</h2>
          <Prose paras={a.bodyParas}/>
        </div>
        <PullQuote text={a.pullQuote2}/>
      </div>

      {/* Trending Videos */}
      <TrendingVideos videos={a.videos}/>

      {/* Budget Breakdown */}
      <BudgetBreakdown rows={a.budget}/>

      {/* Experience Collection */}
      <ExperienceCollection items={a.experiences}/>

      {/* Gallery, Taste, Notes, Related, CTA are in lower file */}
      <TravelogueLowerSections article={a} onOpenTrip={onOpenTrip}/>
    </div>
  );
}

function ArticleHero({ article }) {
  return (
    <div style={{ position:'relative', height:520, overflow:'hidden' }}>
      <ImgPlaceholder {...article.hero} radius={0} aspect={null}/>
      {/* overlay tint */}
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(7,29,43,.22) 0%, rgba(7,29,43,.12) 50%, rgba(7,29,43,.28) 100%)' }}/>
      {/* Title card */}
      <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', padding:36 }}>
        <div style={{ maxWidth:640, background:'rgba(14,30,50,.32)', backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)', border:'1px solid rgba(255,255,255,.22)', borderRadius:20, padding:'32px 36px', color:'#fff', boxShadow:'0 24px 60px rgba(0,0,0,.25)' }}>
          <h1 style={{ fontFamily:'Fraunces, serif', fontSize:40, fontWeight:700, letterSpacing:'-.02em', margin:'0 0 14px', lineHeight:1.1, textWrap:'pretty' }}>{article.title}</h1>
          <div style={{ fontSize:14.5, lineHeight:1.55, color:'rgba(255,255,255,.9)', marginBottom:22 }}>{article.dek}</div>
          <div style={{ display:'flex', alignItems:'center', gap:14, flexWrap:'wrap' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <Avatar name={article.author.name} size={32}/>
              <div style={{ fontSize:13, fontWeight:600, display:'flex', alignItems:'center', gap:6 }}>
                {article.author.name}
                {article.author.verified && <span style={{ width:14, height:14, borderRadius:'50%', background:T.green, color:'#fff', fontSize:9, display:'inline-flex', alignItems:'center', justifyContent:'center', fontWeight:800 }}>✓</span>}
              </div>
            </div>
            <span style={{ fontSize:13, color:'rgba(255,255,255,.75)' }}>· {article.date}</span>
            <span style={{ background:T.green, color:'#fff', padding:'5px 12px', borderRadius:999, fontSize:12, fontWeight:700, display:'inline-flex', alignItems:'center', gap:6 }}>
              <Ico name="spark" size={12} color="#fff"/> {article.category}
            </span>
          </div>
          <div style={{ display:'flex', gap:10, marginTop:18 }}>
            <button style={{ width:38, height:38, borderRadius:'50%', background:'linear-gradient(135deg, #f09433, #e6683c 40%, #dc2743 60%, #cc2366 80%, #bc1888)', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#fff"/></svg>
            </button>
            <button style={{ height:38, padding:'0 16px', borderRadius:999, background:'rgba(255,255,255,.18)', color:'#fff', border:'1px solid rgba(255,255,255,.3)', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:8 }}>
              <Ico name="send" size={13} color="#fff"/> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PullQuote({ text }) {
  return (
    <div style={{ background:'#EAF7EF', borderLeft:`3px solid ${T.green}`, padding:'18px 22px', borderRadius:'0 10px 10px 0', margin:'20px 0' }}>
      <div style={{ fontFamily:'Fraunces, serif', fontSize:19, fontStyle:'italic', color:T.inkSoft, lineHeight:1.45, letterSpacing:'-.005em' }}>“{text}”</div>
    </div>
  );
}

function Prose({ paras }) {
  return (
    <div>
      {paras.map((p, i) => (
        <p key={i} style={{ fontSize:15.5, lineHeight:1.78, color:'#2e3d52', margin:'0 0 18px', textWrap:'pretty' }}>{p}</p>
      ))}
    </div>
  );
}

function TrendingVideos({ videos }) {
  return (
    <div style={{ maxWidth:1200, margin:'0 auto', padding:'24px 36px 20px' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
        <h2 style={{ fontFamily:'Fraunces, serif', fontSize:26, fontWeight:700, letterSpacing:'-.02em', color:T.ink, margin:0 }}>Trending Videos</h2>
        <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, color:T.grey }}>
          Powered by
          <span style={{ display:'inline-flex', alignItems:'center', gap:5, color:'#FF0033', fontWeight:700 }}>
            <span style={{ width:18, height:18, borderRadius:4, background:'#FF0033', display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff"><path d="M8 5l11 7-11 7z"/></svg>
            </span>
            Shorts
          </span>
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:16 }}>
        {videos.map((v, i) => (
          <div key={i} style={{ position:'relative', aspectRatio:'9/16', borderRadius:14, overflow:'hidden', border:`1px solid ${T.greyLight}`, cursor:'pointer' }}>
            <ImgPlaceholder src={v.src} tone={v.tone} ink={v.ink} accent={v.accent} label="" radius={0}/>
            <div style={{ position:'absolute', top:12, left:12, right:12, display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:28, height:28, borderRadius:'50%', background:'rgba(255,255,255,.85)', flexShrink:0 }}/>
              <div style={{ overflow:'hidden' }}>
                <div style={{ fontSize:12.5, fontWeight:700, color:'#fff', textShadow:'0 1px 4px rgba(0,0,0,.4)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{v.title}</div>
                <div style={{ fontSize:10.5, color:'rgba(255,255,255,.85)', textShadow:'0 1px 3px rgba(0,0,0,.4)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{v.handle}</div>
              </div>
            </div>
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ width:56, height:56, borderRadius:'50%', background:'#FF0033', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 8px 20px rgba(0,0,0,.4)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M8 5l11 7-11 7z"/></svg>
              </div>
            </div>
            <div style={{ position:'absolute', bottom:10, left:10, right:10, display:'flex', justifyContent:'flex-end' }}>
              <span style={{ background:'rgba(14,30,50,.55)', color:'#fff', fontSize:10, fontWeight:600, padding:'3px 8px', borderRadius:999 }}>0:42</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BudgetBreakdown({ rows }) {
  const total = rows.reduce((a,r)=>a+r.amount, 0);
  return (
    <div style={{ maxWidth:760, margin:'48px auto 0', padding:'0 36px' }}>
      <h2 style={{ fontFamily:'Fraunces, serif', fontSize:26, fontWeight:700, letterSpacing:'-.02em', color:T.ink, textAlign:'center', margin:'0 0 22px' }}>Trip Budget Breakdown</h2>
      <div style={{ background:'#F7F9FB', border:`1px solid ${T.greyLight}`, borderRadius:16, overflow:'hidden' }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', padding:'16px 22px', borderBottom: i<rows.length-1 ? `1px solid ${T.greyLight}` : 'none', background: i%2===1 ? '#fff' : 'transparent' }}>
            <BudgetIcon name={r.icon}/>
            <div style={{ flex:1, marginLeft:16, fontSize:14.5, color:T.ink, fontWeight:500 }}>{r.label}</div>
            <div style={{ fontSize:14.5, color:T.ink, fontWeight:600, fontVariantNumeric:'tabular-nums' }}>₹{r.amount.toLocaleString('en-IN')}</div>
          </div>
        ))}
        <div style={{ background:T.green, padding:'16px 22px', display:'flex', alignItems:'center', justifyContent:'space-between', color:'#fff' }}>
          <div style={{ fontSize:14.5, fontWeight:700 }}>Total Spend</div>
          <div style={{ fontSize:18, fontWeight:800, fontVariantNumeric:'tabular-nums', fontFamily:'Fraunces, serif' }}>₹{total.toLocaleString('en-IN')}</div>
        </div>
      </div>
      <div style={{ fontSize:12, color:T.grey, textAlign:'center', marginTop:10 }}>Per person, 5 nights · October 2025 rates</div>
    </div>
  );
}

function BudgetIcon({ name }) {
  const base = { width:36, height:36, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 };
  const map = {
    bed:{ bg:'#FCE3C6', stroke:'#7a3a0a', draw:<g><path d="M6 18v-6h16v6M6 14h16M10 12V9a2 2 0 012-2h4a2 2 0 012 2v3" fill="none" strokeWidth="1.8"/></g> },
    scooter:{ bg:'#FEEFB6', stroke:'#7a5a0a', draw:<g strokeWidth="1.8" fill="none"><circle cx="7" cy="18" r="3"/><circle cx="20" cy="18" r="3"/><path d="M10 18h7l-3-8h-3M14 10l2-4h3"/></g> },
    fuel:{ bg:'#FFE09a', stroke:'#6b4a0a', draw:<g strokeWidth="1.8" fill="none"><path d="M5 21V6a1 1 0 011-1h8a1 1 0 011 1v15M4 21h12M7 11h6"/><path d="M15 9l3 2v7a2 2 0 002 2"/></g> },
    car:{ bg:'#1a2736', stroke:'#fff', draw:<g strokeWidth="1.8" fill="none"><path d="M5 17h14v-5l-2-5H7l-2 5v5z"/><circle cx="8" cy="17" r="1.5"/><circle cx="16" cy="17" r="1.5"/></g> },
    plate:{ bg:'#FCD6D6', stroke:'#7a1a1a', draw:<g strokeWidth="1.8" fill="none"><circle cx="13" cy="13" r="8"/><circle cx="13" cy="13" r="4.5"/></g> },
    plane:{ bg:'#CFE4FA', stroke:'#1a3a5a', draw:<g strokeWidth="1.8" fill="none"><path d="M3 13l7-2 4-8 2 1-2 8 7 2-1 2-7-1-4 8-2-1 2-7-6-1z"/></g> },
    misc:{ bg:'#E5E0EA', stroke:'#3a2a4a', draw:<g strokeWidth="1.8" fill="none"><path d="M13 3l10 10-10 10L3 13z"/></g> },
  };
  const m = map[name] || map.misc;
  return (
    <div style={{ ...base, background:m.bg }}>
      <svg width="24" height="24" viewBox="0 0 26 26" stroke={m.stroke} strokeLinecap="round" strokeLinejoin="round">{m.draw}</svg>
    </div>
  );
}

function ExperienceCollection({ items }) {
  const palettes = [
    { bg:'#E8F4F8', fg:'#1a3a4a' }, { bg:'#FDF1D7', fg:'#5a3a0f' }, { bg:'#E0F2E9', fg:'#0b3e26' },
    { bg:'#F7DEE6', fg:'#5a1a3a' }, { bg:'#E5E0EA', fg:'#3a2a4a' }, { bg:'#DDEBF7', fg:'#1a3a5a' },
    { bg:'#FBE8D8', fg:'#5a2a0f' }, { bg:'#EDF4D8', fg:'#3a4a0f' }, { bg:'#FDE2E2', fg:'#5a1a1a' },
  ];
  return (
    <div style={{ maxWidth:1080, margin:'64px auto 0', padding:'0 36px' }}>
      <h2 style={{ fontFamily:'Fraunces, serif', fontSize:26, fontWeight:700, letterSpacing:'-.02em', color:T.ink, textAlign:'center', margin:'0 0 28px' }}>Experience Collection</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16 }}>
        {items.map((it, i) => (
          <div key={i} style={{ background:'#F7F9FB', border:`1px solid ${T.greyLight}`, borderRadius:14, padding:'18px 18px 20px', display:'flex', gap:14 }}>
            <div style={{ width:44, height:44, borderRadius:12, background:palettes[i%palettes.length].bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <ExperienceGlyph name={it.icon} color={palettes[i%palettes.length].fg}/>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:14.5, fontWeight:700, color:T.ink, marginBottom:6, lineHeight:1.25 }}>{it.title}</div>
              <div style={{ fontSize:12.5, color:T.grey, lineHeight:1.55, textWrap:'pretty' }}>{it.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceGlyph({ name, color }) {
  const p = { width:22, height:22, viewBox:'0 0 24 24', fill:'none', stroke:color, strokeWidth:1.8, strokeLinecap:'round', strokeLinejoin:'round' };
  switch (name) {
    case 'palm': return <svg {...p}><path d="M12 22V10"/><path d="M12 10c-2-3-6-4-9-3 2 1 4 3 5 5M12 10c2-3 6-4 9-3-2 1-4 3-5 5M12 10c0-3 2-6 5-7-1 3-2 5-2 8M12 10c0-3-2-6-5-7 1 3 2 5 2 8"/></svg>;
    case 'kayak': return <svg {...p}><path d="M3 14c3 3 15 3 18 0M8 14V9l4-3 4 3v5M10 14v-3M14 14v-3"/></svg>;
    case 'picnic': return <svg {...p}><path d="M3 14l9-9 9 9M4 14h16v6H4zM4 14v6M20 14v6"/></svg>;
    case 'feni': return <svg {...p}><path d="M7 6h10l-1 13a2 2 0 01-2 2h-4a2 2 0 01-2-2L7 6z"/><path d="M8 10h8"/><path d="M10 3h4"/></svg>;
    case 'boot': return <svg {...p}><path d="M6 3h4v10h5a3 3 0 013 3v4H6V3z"/><path d="M6 18h12"/></svg>;
    case 'column': return <svg {...p}><path d="M5 4h14v3H5zM5 20h14v-3H5zM7 7v10M12 7v10M17 7v10"/></svg>;
    case 'bike': return <svg {...p}><circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h4l4 8M10 9l-2-4h3"/></svg>;
    case 'swim': return <svg {...p}><circle cx="9" cy="7" r="2"/><path d="M3 17c2-2 3-1 5 0s3 2 5 0 3-1 5 0 2 1 3 0M13 13l-2-3 4-2-5-2"/></svg>;
    case 'cafe': return <svg {...p}><path d="M4 8h13v6a5 5 0 01-5 5H9a5 5 0 01-5-5V8z"/><path d="M17 10h2a2 2 0 010 4h-2M7 3v2M11 3v2M15 3v2"/></svg>;
    default: return <svg {...p}><circle cx="12" cy="12" r="8"/></svg>;
  }
}

Object.assign(window, { TravelogueArticle });
