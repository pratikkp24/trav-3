// Travelogue Index — replaces the old "Stories" section.
// Editorial grid with a featured hero tile + filter chips + card grid.

function TravelogueIndex({ onOpenArticle }) {
  const [cat, setCat] = React.useState('All');
  const [q, setQ] = React.useState('');
  const list = TRAVELOGUES.filter(a =>
    (cat==='All' || a.category===cat) &&
    (!q || (a.title + ' ' + a.dek + ' ' + a.category).toLowerCase().includes(q.toLowerCase()))
  );
  const featured = list.find(a => a.featured) || list[0];
  const rest = list.filter(a => a.id !== (featured && featured.id));

  return (
    <div style={{ background:'#fff' }}>
      {/* Header band */}
      <div style={{ background:T.offWhite, padding:'56px 36px 42px', borderBottom:`1px solid ${T.greyLight}` }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ fontSize:12, fontWeight:700, letterSpacing:'.22em', color:T.greenDeep, marginBottom:14 }}>THE TRAVELOGUE</div>
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:32, flexWrap:'wrap' }}>
            <div style={{ maxWidth:680 }}>
              <h1 style={{ fontFamily:'Fraunces, serif', fontSize:56, fontWeight:700, letterSpacing:'-.03em', color:T.ink, margin:'0 0 14px', lineHeight:1.02 }}>
                Stories from the road, <span style={{ fontStyle:'italic', color:T.greenDeep }}>written by the people who took it.</span>
              </h1>
              <div style={{ fontSize:15, color:T.grey, lineHeight:1.6, maxWidth:560 }}>
                Long-form guides, weekend notes, and the small discoveries that don't fit on an itinerary. Curated by trav creators and community.
              </div>
            </div>
            <button style={{ height:48, padding:'0 22px', borderRadius:999, background:'#fff', border:`1.5px solid ${T.greenDeep}`, color:T.greenDeep, fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:10 }}>
              <Ico name="send" size={15} color={T.greenDeep}/> Share your story
            </button>
          </div>

          {/* Search + filter chips */}
          <div style={{ marginTop:28, display:'flex', gap:10, flexWrap:'wrap', alignItems:'center' }}>
            <div style={{ flex:'1 1 320px', minWidth:260, maxWidth:440, height:46, background:'#fff', border:`1px solid ${T.greyLight}`, borderRadius:999, display:'flex', alignItems:'center', padding:'0 6px 0 18px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.grey} strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by city, vibe, theme…" style={{ flex:1, height:'100%', border:'none', outline:'none', padding:'0 12px', fontSize:14, fontFamily:'inherit', color:T.ink, background:'transparent' }}/>
            </div>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {TRAVELOGUE_CATEGORIES.map(c => {
                const active = c===cat;
                return (
                  <span key={c} onClick={()=>setCat(c)} style={{ padding:'0 14px', height:34, display:'inline-flex', alignItems:'center', borderRadius:999, fontSize:13, fontWeight:active?700:500, color:active?'#fff':T.ink, background:active?T.ink:'#fff', border:`1px solid ${active?T.ink:T.greyLight}`, cursor:'pointer' }}>{c}</span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Featured + grid */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'48px 36px 80px' }}>
        {featured && (
          <FeaturedTravelogue article={featured} onOpen={()=>onOpenArticle(featured.id)}/>
        )}
        <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', margin:'56px 0 22px' }}>
          <div style={{ fontFamily:'Fraunces, serif', fontSize:26, fontWeight:700, color:T.ink, letterSpacing:'-.02em' }}>More travelogues</div>
          <div style={{ fontSize:13, color:T.grey }}>{rest.length} stor{rest.length===1?'y':'ies'}</div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:24 }}>
          {rest.map(a => <TravelogueCard key={a.id} article={a} onOpen={()=>onOpenArticle(a.id)}/>)}
        </div>
      </div>
    </div>
  );
}

function FeaturedTravelogue({ article, onOpen }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} onClick={onOpen}
      style={{ position:'relative', borderRadius:22, overflow:'hidden', cursor:'pointer', border:`1px solid ${T.greyLight}`, boxShadow: hover ? '0 20px 50px rgba(14,30,50,.12)' : '0 8px 24px rgba(14,30,50,.06)', transition:'box-shadow .2s, transform .2s', transform: hover ? 'translateY(-2px)' : 'none' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', minHeight:360 }}>
        <div style={{ position:'relative', height:'100%', minHeight:360 }}>
          <ImgPlaceholder {...article.hero} radius={0}/>
          <div style={{ position:'absolute', top:18, left:18, display:'flex', gap:8 }}>
            <span style={{ background:'rgba(14,30,50,.55)', backdropFilter:'blur(6px)', color:'#fff', padding:'6px 12px', borderRadius:999, fontSize:11, fontWeight:700, letterSpacing:'.12em' }}>FEATURED</span>
            <span style={{ background:'rgba(255,255,255,.9)', color:T.greenDeep, padding:'6px 12px', borderRadius:999, fontSize:11.5, fontWeight:700 }}>{article.category}</span>
          </div>
        </div>
        <div style={{ padding:'36px 36px 32px', display:'flex', flexDirection:'column', justifyContent:'space-between', background:'#fff' }}>
          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'.2em', color:T.greenDeep, marginBottom:14 }}>INSIDER GUIDE</div>
            <h2 style={{ fontFamily:'Fraunces, serif', fontSize:30, fontWeight:700, letterSpacing:'-.02em', color:T.ink, margin:'0 0 14px', lineHeight:1.12, textWrap:'pretty' }}>{article.title}</h2>
            <div style={{ fontSize:14.5, color:T.grey, lineHeight:1.55 }}>{article.dek}</div>
          </div>
          <div style={{ marginTop:28, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <Avatar name={article.author.name} size={36}/>
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:T.ink, display:'flex', alignItems:'center', gap:6 }}>
                  {article.author.name}
                  {article.author.verified && <span style={{ width:14, height:14, borderRadius:'50%', background:T.green, color:'#fff', fontSize:9, display:'inline-flex', alignItems:'center', justifyContent:'center', fontWeight:800 }}>✓</span>}
                </div>
                <div style={{ fontSize:11.5, color:T.grey }}>{article.date} · {article.readMin} min read</div>
              </div>
            </div>
            <button style={{ height:40, padding:'0 18px', borderRadius:999, background:T.ink, color:'#fff', border:'none', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:8 }}>
              Read the story <Ico name="arrow-right" size={14} color="#fff"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TravelogueCard({ article, onOpen }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} onClick={onOpen}
      style={{ background:'#fff', borderRadius:16, overflow:'hidden', border:`1px solid ${T.greyLight}`, cursor:'pointer', transition:'transform .2s, box-shadow .2s', transform:hover?'translateY(-3px)':'none', boxShadow:hover?'0 14px 30px rgba(14,30,50,.10)':'0 2px 8px rgba(14,30,50,.04)' }}>
      <div style={{ height:190, position:'relative' }}>
        <ImgPlaceholder {...article.hero} radius={0}/>
        <div style={{ position:'absolute', top:12, left:12 }}>
          <span style={{ background:'rgba(255,255,255,.92)', color:T.ink, padding:'4px 10px', borderRadius:999, fontSize:11, fontWeight:700 }}>{article.category}</span>
        </div>
      </div>
      <div style={{ padding:'20px 20px 18px' }}>
        <h3 style={{ fontFamily:'Fraunces, serif', fontSize:19.5, fontWeight:700, letterSpacing:'-.01em', color:T.ink, margin:'0 0 10px', lineHeight:1.22, textWrap:'pretty' }}>{article.title}</h3>
        <div style={{ fontSize:13.5, color:T.grey, lineHeight:1.55, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden', marginBottom:16 }}>{article.dek}</div>
        <div style={{ display:'flex', alignItems:'center', gap:10, paddingTop:14, borderTop:`1px dashed ${T.greyLight}` }}>
          <Avatar name={article.author.name} size={28}/>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:12.5, fontWeight:600, color:T.ink }}>{article.author.name}</div>
            <div style={{ fontSize:11, color:T.grey }}>{article.date} · {article.readMin} min</div>
          </div>
          <Ico name="arrow-right" size={14} color={T.grey}/>
        </div>
      </div>
    </div>
  );
}

function Avatar({ name, size=32 }) {
  const initials = String(name||'').split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
  const hues = ['#1DBF73','#4A6788','#C14A36','#E6A33A','#2d7a9e','#8a5a9e'];
  const bg = hues[Math.abs([...String(name)].reduce((a,c)=>a+c.charCodeAt(0),0)) % hues.length];
  return (
    <div style={{ width:size, height:size, borderRadius:'50%', background:`linear-gradient(135deg, ${bg}, ${T.ink})`, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:size*0.35, fontWeight:700, flexShrink:0 }}>
      {initials}
    </div>
  );
}

Object.assign(window, { TravelogueIndex, Avatar });
