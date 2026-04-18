// Travelogue Article — upper half (hero, meta, prose, pull quotes, videos, budget).
// Pairs with travelogue-article-lower.jsx.

function TravelogueArticle({ onBack, onOpenTrip }) {
  const a = GOA_ARTICLE;
  const wordCount = [...(a.intro||[]), ...(a.bodyParas||[])].join(' ').split(/\s+/).length;
  const readMin = Math.max(4, Math.round(wordCount / 220));
  return (
    <div style={{ background:'#fff' }}>
      {/* Sub-header breadcrumb */}
      <div style={{ background:'#fff', borderBottom:`1px solid ${T.greyLight}`, padding:'12px 36px', position:'sticky', top:64, zIndex:10, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
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

      {/* Journal-style meta strip */}
      <JournalMetaStrip article={a} readMin={readMin} wordCount={wordCount}/>

      {/* Body: two-column journal prose with drop cap + margin rail */}
      <div style={{ maxWidth:1120, margin:'0 auto', padding:'28px 36px 8px', display:'grid', gridTemplateColumns:'1fr 220px', gap:40 }}>
        <div>
          <ProseTwoCol intro={a.intro} dropCap/>
          <PullQuote text={a.pullQuote1}/>
          <h2 style={{ fontFamily:'Fraunces, serif', fontSize:26, fontWeight:700, letterSpacing:'-.02em', color:T.ink, margin:'22px 0 12px' }}>{a.sectionTitle}</h2>
          <ProseTwoCol paras={a.bodyParas}/>
          <PullQuote text={a.pullQuote2}/>
        </div>
        <MarginRail article={a} readMin={readMin}/>
      </div>

      {/* Editorial block: full-width videos, then centered budget */}
      <TrendingVideos videos={a.videos}/>
      <BudgetBreakdown rows={a.budget}/>

      {/* Experience Collection */}
      <ExperienceCollection items={a.experiences}/>

      {/* Gallery, Taste, Notes, Related, CTA are in lower file */}
      <TravelogueLowerSections article={a} onOpenTrip={onOpenTrip}/>
    </div>
  );
}

function JournalMetaStrip({ article, readMin, wordCount }) {
  const items = [
    { k:'ISSUE', v:article.date },
    { k:'COLUMN', v:article.category },
    { k:'READ', v:`${readMin} min` },
    { k:'WORDS', v:wordCount.toLocaleString('en-IN') },
    { k:'PHOTOS', v:(article.gallery||[]).length },
    { k:'DATELINE', v:'GOA · IN' },
  ];
  return (
    <div style={{ maxWidth:1120, margin:'18px auto 0', padding:'0 36px' }}>
      <div style={{ display:'grid', gridTemplateColumns:`repeat(${items.length}, 1fr)`, gap:0, border:`1px solid ${T.greyLight}`, borderRadius:12, overflow:'hidden', background:'#FAFAF7' }}>
        {items.map((it, i) => (
          <div key={it.k} style={{ padding:'12px 14px', borderRight: i<items.length-1 ? `1px solid ${T.greyLight}` : 'none' }}>
            <div style={{ fontSize:9.5, letterSpacing:'.18em', color:T.grey, fontWeight:800 }}>{it.k}</div>
            <div style={{ fontSize:13, color:T.ink, fontWeight:700, marginTop:3, fontFamily:'Fraunces, serif' }}>{it.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProseTwoCol({ intro, paras, dropCap }) {
  const list = paras || intro || [];
  if (!list.length) return null;
  return (
    <div style={{ columnCount:2, columnGap:28, columnRule:`1px solid ${T.greyLight}` }}>
      {list.map((p, i) => (
        <p key={i} style={{
          fontSize:14.5, lineHeight:1.72, color:'#2e3d52',
          margin: i===0 ? '0 0 14px' : '0 0 14px',
          textWrap:'pretty',
          breakInside:'avoid-column',
        }}>
          {dropCap && i===0 ? (
            <>
              <span style={{ float:'left', fontFamily:'Fraunces, serif', fontSize:54, lineHeight:.9, fontWeight:700, color:T.greenDeep, marginRight:8, marginTop:3 }}>{p.charAt(0)}</span>
              {p.slice(1)}
            </>
          ) : p}
        </p>
      ))}
    </div>
  );
}

function MarginRail({ article, readMin }) {
  return (
    <aside style={{ position:'sticky', top:140, alignSelf:'start', display:'flex', flexDirection:'column', gap:16 }}>
      <div style={{ border:`1px solid ${T.greyLight}`, borderRadius:12, padding:'14px 16px', background:'#FAFAF7' }}>
        <div style={{ fontSize:9.5, letterSpacing:'.18em', color:T.grey, fontWeight:800, marginBottom:10 }}>IN THIS JOURNAL</div>
        <ol style={{ listStyle:'none', padding:0, margin:0, counterReset:'toc' }}>
          {['The Other Goa','Why This Year Is Different','North vs South','Taste memories','Budget & logistics','Related trips'].map((s, i) => (
            <li key={i} style={{ counterIncrement:'toc', fontSize:12.5, color:T.inkSoft, padding:'6px 0', borderBottom: i<5 ? `1px solid ${T.greyLight}` : 'none', lineHeight:1.35, display:'flex', gap:8 }}>
              <span style={{ color:T.grey, fontWeight:700, fontFamily:'Fraunces, serif', minWidth:18 }}>{String(i+1).padStart(2,'0')}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </div>
      <div style={{ border:`1px solid ${T.green}33`, borderRadius:12, padding:'14px 16px', background:'#F0FAF4' }}>
        <div style={{ fontSize:9.5, letterSpacing:'.18em', color:T.greenDeep, fontWeight:800, marginBottom:8 }}>FIELD NOTE</div>
        <div style={{ fontSize:12.5, color:T.inkSoft, lineHeight:1.55, fontFamily:'Fraunces, serif', fontStyle:'italic' }}>
          "Leave north after 9 PM on Saturday. The causeway south is empty, and the stars do the rest."
        </div>
        <div style={{ fontSize:11, color:T.grey, fontWeight:600, marginTop:6 }}>— {article.author.name}</div>
      </div>
      <div style={{ border:`1px solid ${T.greyLight}`, borderRadius:12, padding:'14px 16px', background:'#fff' }}>
        <div style={{ fontSize:9.5, letterSpacing:'.18em', color:T.grey, fontWeight:800, marginBottom:8 }}>CITED PLACES</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {['Assagao','Panjim','Divar','Cabo de Rama','Netravali','Arambol','Mandrem'].map(p => (
            <span key={p} style={{ fontSize:11, padding:'4px 9px', borderRadius:999, background:'#F4F6FA', color:T.ink, fontWeight:600 }}>{p}</span>
          ))}
        </div>
      </div>
    </aside>
  );
}

function ArticleHero({ article }) {
  return (
    <div style={{ maxWidth:1200, margin:'24px auto 0', padding:'0 36px' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1.05fr 1fr', borderRadius:24, overflow:'hidden', border:`1px solid ${T.greyLight}`, boxShadow:'0 18px 48px rgba(7,29,43,.10)', background:'#fff', minHeight:480 }}>
        {/* Left: clean image, no text overlay */}
        <div style={{ position:'relative', minHeight:480, height:'100%' }}>
          <div style={{ position:'absolute', inset:0 }}>
            <ImgPlaceholder {...article.hero} radius={0} aspect={null}/>
          </div>
        </div>
        {/* Right: text panel */}
        <div style={{ padding:'44px 44px 36px', display:'flex', flexDirection:'column', justifyContent:'center', gap:20 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, alignSelf:'flex-start' }}>
            <span style={{ background:T.green, color:'#fff', padding:'5px 12px', borderRadius:999, fontSize:11.5, fontWeight:700, display:'inline-flex', alignItems:'center', gap:6, letterSpacing:'.02em' }}>
              <Ico name="spark" size={11} color="#fff"/> {article.category}
            </span>
            <span style={{ fontSize:11, fontWeight:700, color:T.grey, letterSpacing:'.16em' }}>· {article.date.toUpperCase()}</span>
          </div>
          <h1 style={{ fontFamily:'Fraunces, serif', fontSize:40, fontWeight:700, letterSpacing:'-.02em', color:T.ink, margin:0, lineHeight:1.1, textWrap:'pretty' }}>{article.title}</h1>
          <div style={{ fontSize:15, lineHeight:1.6, color:T.inkSoft }}>{article.dek}</div>
          <div style={{ display:'flex', alignItems:'center', gap:12, paddingTop:6, borderTop:`1px solid ${T.greyLight}`, marginTop:6 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, paddingTop:16 }}>
              <Avatar name={article.author.name} size={36}/>
              <div style={{ lineHeight:1.2 }}>
                <div style={{ fontSize:10, color:T.grey, letterSpacing:'.14em', fontWeight:700 }}>WRITTEN BY</div>
                <div style={{ fontSize:13.5, fontWeight:700, color:T.ink, display:'flex', alignItems:'center', gap:6, marginTop:2 }}>
                  {article.author.name}
                  {article.author.verified && <span style={{ width:14, height:14, borderRadius:'50%', background:T.green, color:'#fff', fontSize:9, display:'inline-flex', alignItems:'center', justifyContent:'center', fontWeight:800 }}>✓</span>}
                </div>
              </div>
            </div>
            <span style={{ flex:1 }}/>
            <div style={{ display:'flex', gap:10, paddingTop:16 }}>
              <button style={{ width:38, height:38, borderRadius:'50%', background:'linear-gradient(135deg, #f09433, #e6683c 40%, #dc2743 60%, #cc2366 80%, #bc1888)', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#fff"/></svg>
              </button>
              <button style={{ height:38, padding:'0 16px', borderRadius:999, background:'#F4F6FA', color:T.ink, border:`1px solid ${T.greyLight}`, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:8 }}>
                <Ico name="send" size={13} color={T.ink}/> Share
              </button>
            </div>
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

function TrendingVideos({ videos, compact }) {
  const cols = compact ? 2 : 4;
  const wrapStyle = compact
    ? { padding:0 }
    : { maxWidth:1200, margin:'36px auto 0', padding:'0 36px' };
  return (
    <div style={wrapStyle}>
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:compact?14:18, gap:18, flexWrap:'wrap' }}>
        <div>
          <div style={{ fontSize:11, fontWeight:800, color:T.greenDeep, letterSpacing:'.18em', marginBottom:6 }}>ON CAMERA</div>
          <h2 style={{ fontFamily:'Fraunces, serif', fontSize:compact?22:28, fontWeight:700, letterSpacing:'-.02em', color:T.ink, margin:0, lineHeight:1.1 }}>Trending on this trail</h2>
          <div style={{ fontSize:13, color:T.grey, marginTop:6 }}>{videos.length} creator clips worth pausing for</div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:compact?11:12, color:T.grey, padding:'7px 12px', background:'#F4F6FA', borderRadius:999 }}>
          Powered by
          <span style={{ display:'inline-flex', alignItems:'center', gap:5, color:'#FF0033', fontWeight:700 }}>
            <span style={{ width:compact?16:18, height:compact?16:18, borderRadius:4, background:'#FF0033', display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
              <svg width={compact?9:10} height={compact?9:10} viewBox="0 0 24 24" fill="#fff"><path d="M8 5l11 7-11 7z"/></svg>
            </span>
            Shorts
          </span>
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:`repeat(${cols}, 1fr)`, gap:compact?12:16 }}>
        {videos.map((v, i) => (
          <div key={i} style={{ position:'relative', aspectRatio:'9/16', borderRadius:14, overflow:'hidden', border:`1px solid ${T.greyLight}`, cursor:'pointer' }}>
            <ImgPlaceholder src={v.src} tone={v.tone} ink={v.ink} accent={v.accent} label="" radius={0}/>
            <div style={{ position:'absolute', top:compact?10:12, left:compact?10:12, right:compact?10:12, display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:compact?24:28, height:compact?24:28, borderRadius:'50%', background:'rgba(255,255,255,.85)', flexShrink:0 }}/>
              <div style={{ overflow:'hidden' }}>
                <div style={{ fontSize:compact?11.5:12.5, fontWeight:700, color:'#fff', textShadow:'0 1px 4px rgba(0,0,0,.4)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{v.title}</div>
                <div style={{ fontSize:compact?9.5:10.5, color:'rgba(255,255,255,.85)', textShadow:'0 1px 3px rgba(0,0,0,.4)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{v.handle}</div>
              </div>
            </div>
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ width:compact?46:56, height:compact?46:56, borderRadius:'50%', background:'#FF0033', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 8px 20px rgba(0,0,0,.4)' }}>
                <svg width={compact?18:22} height={compact?18:22} viewBox="0 0 24 24" fill="#fff"><path d="M8 5l11 7-11 7z"/></svg>
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

function BudgetBreakdown({ rows, compact }) {
  const total = rows.reduce((a,r)=>a+r.amount, 0);
  const wrapStyle = compact ? { padding:0 } : { maxWidth:760, margin:'48px auto 0', padding:'0 36px' };
  const rowPad = compact ? '11px 16px' : '16px 22px';
  return (
    <div style={wrapStyle}>
      <h2 style={{ fontFamily:'Fraunces, serif', fontSize:compact?22:26, fontWeight:700, letterSpacing:'-.02em', color:T.ink, textAlign:compact?'left':'center', margin:`0 0 ${compact?14:22}px` }}>Trip Budget</h2>
      <div style={{ background:'#F7F9FB', border:`1px solid ${T.greyLight}`, borderRadius:16, overflow:'hidden' }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', padding:rowPad, borderBottom: i<rows.length-1 ? `1px solid ${T.greyLight}` : 'none', background: i%2===1 ? '#fff' : 'transparent' }}>
            <BudgetIcon name={r.icon} compact={compact}/>
            <div style={{ flex:1, marginLeft:compact?12:16, fontSize:compact?13:14.5, color:T.ink, fontWeight:500 }}>{r.label}</div>
            <div style={{ fontSize:compact?13:14.5, color:T.ink, fontWeight:600, fontVariantNumeric:'tabular-nums' }}>₹{r.amount.toLocaleString('en-IN')}</div>
          </div>
        ))}
        <div style={{ background:T.green, padding:rowPad, display:'flex', alignItems:'center', justifyContent:'space-between', color:'#fff' }}>
          <div style={{ fontSize:compact?13:14.5, fontWeight:700 }}>Total Spend</div>
          <div style={{ fontSize:compact?16:18, fontWeight:800, fontVariantNumeric:'tabular-nums', fontFamily:'Fraunces, serif' }}>₹{total.toLocaleString('en-IN')}</div>
        </div>
      </div>
      <div style={{ fontSize:compact?11:12, color:T.grey, textAlign:compact?'left':'center', marginTop:10 }}>Per person, 5 nights · October 2025 rates</div>
    </div>
  );
}

function BudgetIcon({ name, compact }) {
  const sz = compact ? 30 : 36;
  const base = { width:sz, height:sz, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 };
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
      <svg width={compact?20:24} height={compact?20:24} viewBox="0 0 26 26" stroke={m.stroke} strokeLinecap="round" strokeLinejoin="round">{m.draw}</svg>
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
    <div style={{ maxWidth:1080, margin:'36px auto 0', padding:'0 36px' }}>
      <h2 style={{ fontFamily:'Fraunces, serif', fontSize:26, fontWeight:700, letterSpacing:'-.02em', color:T.ink, textAlign:'center', margin:'0 0 22px' }}>Experience Collection</h2>
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
