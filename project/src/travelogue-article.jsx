// Travelogue Article — upper half (hero, meta, prose, pull quotes, videos, budget).
// Pairs with travelogue-article-lower.jsx.

function TravelogueNewStyle() {
  return (
    <style dangerouslySetInnerHTML={{__html: `
:root {
  --green: #1DBF73;
  --green-deep: #169E5A;
  --green-ink: #0e6b3d;
  --tint: #E8F8F2;
  --tint-2: #d8f1e4;
  --off: #FAFAFA;
  --paper: #ffffff;
  --ink: #111111;
  --ink-2: #2a2a2a;
  --grey: #6E6E6E;
  --grey-2: #9a9a9a;
  --line: #E6E6E6;
  --line-2: #f1f1f1;
  --radius: 16px;
  --radius-sm: 10px;
  --shadow-1: 0 1px 0 rgba(17,17,17,0.04), 0 12px 30px -18px rgba(17,17,17,0.18);
  --shadow-2: 0 24px 60px -30px rgba(17,17,17,0.25);
}
.chapter {
  display: grid;
  grid-template-columns: 140px 1fr auto;
  gap: 32px; align-items: center;
  padding: 22px 36px;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  margin: 0px auto 44px;
  max-width: 1192px;
}
.chapter .num {
  font-family: "Fraunces", serif; font-weight: 500; font-size: 64px; line-height: 1;
  color: var(--green); font-variation-settings: "opsz" 144;
}
.chapter .num span { color: var(--grey-2); font-size: 18px; display:block; letter-spacing: 0.22em; text-transform: uppercase; margin-bottom: 4px; font-family: "Inter", sans-serif; font-weight: 600; }
.chapter .title {
  font-family: "Fraunces", serif; font-weight: 500; font-size: 38px; line-height: 1.05;
  letter-spacing: -0.02em;
}
.chapter .title em { font-style: italic; color: var(--green); font-weight: 500; }
.chapter .title small { display:block; font-family:"Inter",sans-serif; font-size: 13px; color: var(--grey); font-weight: 400; margin-top: 6px; letter-spacing: 0; text-transform: none; }
.chapter .meta {
  font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--grey);
  text-align: right;
}
.chapter .meta b { display:block; color: var(--ink); font-size: 14px; letter-spacing: 0.06em; margin-top: 4px; font-weight: 600; }

.hero {
  padding-top: 40px; padding-bottom: 40px;
  display: grid; grid-template-columns: 1.05fr 1fr; gap: 56px; align-items: center; max-width: 1192px; margin: 0 auto; padding: 0 36px;
}
.hero-polaroids { position: relative; height: 520px; }
.polaroid {
  position: absolute; background: #fff; padding: 14px 14px 42px;
  box-shadow: 0 26px 50px -20px rgba(17,17,17,0.35), 0 2px 0 rgba(0,0,0,0.02);
  border-radius: 3px;
}
.polaroid .ph { width: 240px; aspect-ratio: 4/5; position: relative; overflow: hidden; }
.polaroid .cap {
  font-family: "Caveat", cursive; font-size: 20px; color: var(--ink);
  text-align: center; margin-top: 10px; line-height: 1;
}
.polaroid::after {
  content:""; position: absolute; top: -14px; left: 50%; width: 80px; height: 22px;
  background: rgba(220, 210, 170, 0.55); transform: translateX(-50%) rotate(-3deg);
  box-shadow: 0 2px 4px rgba(0,0,0,0.08);
}
.p1 { top: 18px; left: 0; transform: rotate(-6deg); z-index: 1; }
.p2 { top: 40px; left: 210px; transform: rotate(3deg); z-index: 3; }
.p3 { top: 220px; left: 80px; transform: rotate(-2deg); z-index: 2; }
.ph-pal   { background: #2f5a3a; }
.ph-beach { background: #d9a467; }
.ph-fort  { background: #c46a4c; }

.hero-copy .kicker {
  display:inline-flex; align-items:center; gap: 10px;
  padding: 6px 12px; border-radius: 999px;
  background: var(--tint); color: var(--green-deep);
  font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
}
.hero-copy .date { display:inline-block; margin-left: 12px; color: var(--grey); font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 500; }
.hero-copy h1 { font-family: "Fraunces", serif; font-weight: 500; font-size: 64px; line-height: 1.02; letter-spacing: -0.03em; margin: 20px 0 20px; }
.hero-copy h1 em { font-style: italic; color: var(--green); font-weight: 500; }
.hero-copy .deck { font-size: 17px; line-height: 1.6; color: var(--grey); max-width: 46ch; margin: 0 0 28px; }
.hero-copy .actions { display: flex; gap: 12px; margin-bottom: 34px; }
.btn {
  display:inline-flex; align-items:center; gap: 8px; padding: 12px 22px; border-radius: 999px;
  font-weight: 600; font-size: 14px; text-decoration: none; border: 1px solid transparent; cursor: pointer; transition: 0.2s;
}
.btn.primary { background: var(--green); color: #fff; }
.btn.ghost { border-color: var(--line); color: var(--ink); background: #fff; }
.hero-stats { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--line); padding-top: 22px; gap: 16px; }
.hero-stats div small { display:block; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--grey); font-weight: 600; margin-bottom: 4px; }
.hero-stats div b { font-family: "Fraunces", serif; font-size: 20px; font-weight: 600; }

.ledger-wrap { display: grid; grid-template-columns: 0.95fr 1.05fr; gap: 24px; align-items: stretch; max-width: 1192px; margin: 0 auto; padding: 0 36px; }
.panel { background: #fff; border: 1px solid var(--line); border-radius: var(--radius); padding: 28px; box-shadow: var(--shadow-1); display: flex; flex-direction: column; }
.panel-head { display:flex; align-items: center; justify-content: space-between; padding-bottom: 18px; border-bottom: 1px solid var(--line); margin-bottom: 18px; }
.panel-head .t { font-family: "Fraunces", serif; font-weight: 600; font-size: 22px; letter-spacing: -0.01em; }
.panel-head .t em { font-style: italic; color: var(--green); }
.panel-head .m { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--grey); }

.ledger .row { display:grid; grid-template-columns: 40px 1fr auto; align-items:center; gap: 16px; padding: 14px 4px; border-bottom: 1px solid var(--line-2); }
.ledger .ic { width: 36px; height: 36px; border-radius: 10px; background: var(--tint); display:grid; place-items:center; color: var(--green-deep); }
.ledger .nm { font-weight: 600; font-size: 14px; }
.ledger .nm small { display:block; font-size: 12px; color: var(--grey); font-weight: 400; margin-top: 1px; }
.ledger .amt { font-family: "Fraunces", serif; font-weight: 600; font-size: 17px; font-variant-numeric: tabular-nums; text-align:right; }
.ledger .amt small { display:block; font-size: 11px; color: var(--grey); font-weight: 400; font-family:"Inter",sans-serif; }
.total-bar { margin-top: 18px; background: var(--green); color: #fff; border-radius: 12px; padding: 16px 22px; display:flex; justify-content: space-between; align-items: center; }
.total-bar .l { font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 700; }
.total-bar .v { font-family: "Fraunces", serif; font-weight: 700; font-size: 26px; font-variant-numeric: tabular-nums; }

.xp-grid { display:grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.xp { display:grid; grid-template-columns: 34px 1fr; gap: 12px; padding: 14px; border: 1px solid var(--line); border-radius: 12px; background: #fff; transition: 0.2s; }
.xp .ic { width: 34px; height: 34px; border-radius: 10px; background: var(--tint); color: var(--green-deep); display:grid; place-items:center; }
.xp .num { font-size: 10px; letter-spacing: 0.2em; color: var(--grey); text-transform: uppercase; font-weight: 600; }
.xp h4 { font-family: "Fraunces", serif; font-weight: 600; font-size: 15px; margin: 2px 0 6px; }
.xp p { font-size: 12.5px; color: var(--grey); line-height: 1.5; margin: 0; }

.trend-head { display:flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; max-width: 1192px; margin: 0 auto; padding: 0 36px; }
.trend-head .l .eyebrow { font-size: 11px; letter-spacing: 0.22em; color: var(--green-deep); text-transform: uppercase; font-weight: 700; }
.trend-head .l h2 { font-family: "Fraunces", serif; font-size: 36px; margin: 6px 0 4px; letter-spacing: -0.02em; font-weight: 600; }
.trend-head .l p { color: var(--grey); margin: 0; }
.trend-head .r { display:flex; align-items:center; gap: 10px; background: #fff; border: 1px solid var(--line); padding: 6px 12px; border-radius: 999px; font-size: 12px; color: var(--grey); }
.trend-head .r .yt { background: #FF0000; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; }
.clips { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; max-width: 1192px; margin: 0 auto; padding: 0 36px; }
.clip { position: relative; aspect-ratio: 9/16; border-radius: 14px; overflow: hidden; cursor: pointer; }
.clip .thumb { position: absolute; inset: 0; background-size: cover; background-position: center; }
.clip .overlay { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-between; padding: 14px; color: #fff; }
.clip .creator { display:flex; align-items: center; gap: 8px; font-size: 12px; }
.clip .creator .av { width: 26px; height: 26px; border-radius: 50%; background: rgba(255,255,255,0.9); }
.clip .creator .who b { display:block; font-size: 12px; font-weight: 600; }
.clip .creator .who small { font-size: 10px; opacity: 0.9; }
.clip .play { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 54px; height: 54px; border-radius: 50%; background: var(--green); display:grid; place-items:center; }
.clip .play svg { width: 22px; height: 22px; color: #fff; }
.clip .time { font-family: "Inter", sans-serif; font-weight: 600; font-size: 11px; padding: 3px 8px; background: rgba(0,0,0,0.6); border-radius: 4px; align-self: flex-end; }
`}} />
  );
}

function TravelogueArticle({ onBack, onOpenTrip }) {
  const isMobile = useIsMobile();
  const a = GOA_ARTICLE;
  const wordCount = [...(a.intro||[]), ...(a.bodyParas||[])].join(' ').split(/\s+/).length;
  const readMin = Math.max(4, Math.round(wordCount / 220));

  const [retentionOpen, setRetentionOpen] = React.useState(false);
  useExitIntent(() => {
    if (sessionStorage.getItem('trav.retention.travelogue')) return;
    setRetentionOpen(true);
    try { sessionStorage.setItem('trav.retention.travelogue', '1'); } catch {}
  }, true);

  const goToTrip = () => { setRetentionOpen(false); onOpenTrip('trip-goa'); };
  return (
    <div style={{ background:'#fff' }}>
      <RetentionModal 
        isOpen={retentionOpen} 
        onClose={() => setRetentionOpen(false)} 
        onExit={onBack} 
        context="travelogue"
        tripName={a.title.split(':')[0]}
        onSecondary={goToTrip}
      />
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
      {/* <JournalMetaStrip article={a} readMin={readMin} wordCount={wordCount}/> */}

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
      <ChapterDivider num="02" roman="II" title="<em>On</em> Camera<small>Four creator clips worth pausing for — picked from the trail.</small>" metaL="Trending" metaR="This week" />

      <TrendingVideosNew videos={a.videos}/>

      <ChapterDivider num="03" roman="III" title="The <em>Ledger</em> &amp; the Days<small>What it cost, and what it was worth — side by side.</small>" metaL="Per person" metaR="5 nights" />

      <LedgerAndExperience budget={a.budget} experiences={a.experiences}/>


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
  const [leftTitle, rightTitle] = article.title.split('—');
  const photos = article.gallery || [];
  return (
    <>
    <TravelogueNewStyle />
    <section className="hero">
      <div className="hero-polaroids">
        <div className="polaroid p1">
          <div className="ph" style={{backgroundImage: photos[0] ? `url(${photos[0].src})` : '', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
          <div className="cap">{photos[0] ? photos[0].label : 'palm hour'}</div>
        </div>
        <div className="polaroid p2">
          <div className="ph" style={{backgroundImage: photos[1] ? `url(${photos[1].src})` : '', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
          <div className="cap">{photos[1] ? photos[1].label : 'sunrise run'}</div>
        </div>
        <div className="polaroid p3">
          <div className="ph" style={{backgroundImage: photos[2] ? `url(${photos[2].src})` : '', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
          <div className="cap">{photos[2] ? photos[2].label : 'cliff picnic'}</div>
        </div>
      </div>
      <div className="hero-copy">
        <div>
          <span className="kicker">{article.category}</span>
          <span className="date">{article.date}</span>
        </div>
        <h1>{leftTitle} {rightTitle ? <>— <em>{rightTitle.trim()}</em></> : ''}</h1>
        <p className="deck">{article.dek}</p>
        <div className="actions">
          <a className="btn primary" onClick={() => alert('Starting journey!')}>▶ Start the journey</a>
          <a className="btn ghost" onClick={() => alert('Share dialog opening...')}>↗ Share article</a>
        </div>
        <div className="hero-stats">
          <div><small>Issue</small><b>{article.date.split(' ')[0]} · {article.date.split(' ')[2]||'2025'}</b></div>
          <div><small>Read</small><b>4 min</b></div>
          <div><small>Photos</small><b>{photos.length}</b></div>
          <div><small>Dateline</small><b>Goa · IN</b></div>
        </div>
      </div>
    </section>
    </>
  );
}

function ChapterDivider({ num, roman, title, metaL, metaR }) {
  return (
    <div className="chapter">
      <div className="num"><span>Chapter {num}</span>{roman}</div>
      <div className="title" dangerouslySetInnerHTML={{__html: title}}></div>
      <div className="meta">{metaL}<b>{metaR}</b></div>
    </div>
  );
}

function LedgerAndExperience({ budget, experiences }) {
  const total = budget.reduce((a,r) => a+r.amount, 0);
  return (
    <section className="ledger-wrap">
      <div className="panel">
        <div className="panel-head"><div className="t">Trip <em>Budget</em></div><div className="m">₹ · Oct 2025</div></div>
        <div className="ledger">
          {budget.map((r, i) => (
            <div className="row" key={i}>
              <div className="ic"><BudgetIcon name={r.icon} compact={true}/></div>
              <div className="nm">{r.label}<small>Standard expense</small></div>
              <div className="amt">₹{r.amount.toLocaleString('en-IN')}<small>{((r.amount/total)*100).toFixed(1)}%</small></div>
            </div>
          ))}
        </div>
        <div className="total-bar"><div className="l">Total Spend</div><div className="v">₹{total.toLocaleString('en-IN')}</div></div>
      </div>
      <div className="panel">
        <div className="panel-head"><div className="t"><em>Experience</em> Collection</div><div className="m">{experiences.length.toString().padStart(2, '0')} picks</div></div>
        <div className="xp-grid">
          {experiences.slice(0, 9).map((xp, i) => (
            <article className="xp" key={i}>
              <div className="ic"><ExperienceGlyph name={xp.icon} color="currentColor"/></div>
              <div>
                <div className="num">No. {(i+1).toString().padStart(2, '0')}</div>
                <h4>{xp.title}</h4>
                <p>{xp.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
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

function TrendingVideosNew({ videos }) {
  return (
    <section>
      <div className="clips">
        {videos.map((v, i) => (
          <div className="clip" key={i} onClick={() => alert('Playing clip...')}>
            <div className="thumb" style={{
                backgroundImage: v.src ? `linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url('${v.src}')` : 'linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.5)), repeating-linear-gradient(135deg, #4c5560 0 12px, #5a6572 12px 24px)'
            }}></div>
            <div className="overlay">
              <div className="creator"><div className="av"></div><div className="who"><b>{v.title}</b><small>{v.handle}</small></div></div>
              <div className="time">0:42</div>
            </div>
            <div className="play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l14 8-14 8z"/></svg></div>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { TravelogueArticle });
