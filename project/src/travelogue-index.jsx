// Travelogue Index — Overhauled as a Travel Journal.
// Features a high-density, 2-column layout with premium "Jewel" accents.

function TravelogueIndex({ onOpenArticle }) {
  const [cat, setCat] = React.useState('All');
  const [q, setQ] = React.useState('');
  const list = TRAVELOGUES.filter(a =>
    (cat==='All' || a.category===cat) &&
    (!q || (a.title + ' ' + a.dek + ' ' + a.category).toLowerCase().includes(q.toLowerCase()))
  );
  const featured = list.find(a => a.featured) || list[0];
  const rest = list.filter(a => a.id !== (featured && featured.id));
  const isMobile = useIsMobile();

  const Tape = ({ style }) => (
    <div style={{ 
      position:'absolute', width:60, height:24, 
      background:'rgba(255,255,255,0.4)', backdropFilter:'blur(2px)', 
      zIndex:10, transform:'rotate(-4deg)', boxShadow:'0 2px 4px rgba(0,0,0,0.05)',
      border:'1px solid rgba(0,0,0,0.02)', ...style 
    }}/>
  );

  return (
    <div style={{ 
      background:'#ffffff', 
      minHeight:'100vh',
      backgroundImage: 'radial-gradient(#e5e4e0 1px, transparent 1px)',
      backgroundSize: '32px 32px',
      position:'relative'
    }}>
      {/* Header section — Side-by-Side Typography */}
      <div style={{ padding:isMobile?'32px 18px':'42px 36px 32px', position:'relative' }}>
         <div style={{ position:'absolute', top:0, left:isMobile?10:40, bottom:0, width:1, background:'rgba(193,74,54,0.08)', zIndex:1 }}/>
         
         <div style={{ maxWidth:1160, margin:'0 auto', position:'relative', zIndex:2, display:'flex', flexDirection:isMobile?'column':'row', alignItems:'center', justifyContent:'space-between', gap:20 }}>
            <div style={{ textAlign:'left' }}>
               <div style={{ fontFamily:'Caveat, cursive', fontSize:20, color:T.greenDeep, marginBottom:4 }}>Stories, notes, and fragments...</div>
               <h1 style={{ fontFamily:'Fraunces, serif', fontSize:isMobile?32:44, fontWeight:800, letterSpacing:'-.03em', color:T.ink, margin:0, lineHeight:1.1 }}>
                 The collection of <span style={{ fontFamily:'Caveat, cursive', color:T.rose, fontSize:isMobile?36:52 }}>memories</span> we brought back.
               </h1>
            </div>

            {/* Compact Filter + Search */}
            <div style={{ display:'flex', gap:10, flexWrap:'wrap', alignItems:'center', justifyContent:'flex-end' }}>
               <div style={{ position:'relative', minWidth:200, maxWidth:260 }}>
                  <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search the journal…" style={{ width:'100%', border:'none', background:'transparent', borderBottom:`1px solid ${T.ink}44`, padding:'4px 0 4px 28px', fontSize:15, fontFamily:'Caveat, cursive', outline:'none' }}/>
                  <div style={{ position:'absolute', left:0, top:6 }}><Ico name="search" size={16} color={T.ink}/></div>
               </div>
               
               <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                 {TRAVELOGUE_CATEGORIES.map((c, i) => {
                   const active = c===cat;
                   // Premium Jewel Palette
                   const jewelColors = [
                     { bg:'#0F1E2E', fg:'#fff' }, // All
                     { bg:'#065F46', fg:'#fff' }, // Adventure
                     { bg:'#1E3A8A', fg:'#fff' }, // Food
                     { bg:'#92400E', fg:'#fff' }, // Culture
                     { bg:'#581C87', fg:'#fff' }, // Wellness
                     { bg:'#991B1B', fg:'#fff' }, // Slow Travel
                   ];
                   const style = jewelColors[i % jewelColors.length];
                   
                   return (
                     <span key={c} onClick={()=>setCat(c)} style={{ 
                       padding:'5px 12px', borderRadius:20, fontSize:12, fontWeight:700, 
                       color:active?style.fg:T.ink, background:active?style.bg:'#f5f5f5', 
                       boxShadow:active?`0 4px 10px ${style.bg}44` : 'none',
                       cursor:'pointer', transform:active?'scale(1.05)':'none',
                       transition:'all .2s ease',
                       border:active?`1px solid ${style.bg}` : '1px solid rgba(0,0,0,0.05)',
                       fontFamily:'Poppins, sans-serif',
                       letterSpacing:'.02em'
                     }}>
                       {c}
                     </span>
                   );
                 })}
               </div>
            </div>
         </div>
      </div>

      <div style={{ maxWidth:1160, margin:'0 auto', padding:isMobile?'24px 18px 80px':'24px 36px 120px' }}>
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 2fr', gap:isMobile?48:80, alignItems:'start' }}>
          
          {/* Left Column: Featured Story (Image Top, Text Bottom) */}
          <div style={{ position:'sticky', top:100 }}>
            {featured && (
              <FeaturedJournalEntry article={featured} onOpen={()=>onOpenArticle(featured.id)} isMobile={isMobile}/>
            )}
          </div>

          {/* Right Column: Latest Entries (Starts from top) */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:15, marginBottom:28 }}>
               <div style={{ fontFamily:'Fraunces, serif', fontSize:24, fontWeight:800, color:T.ink }}>Latest Entries</div>
               <div style={{ height:1, flex:1, background:'rgba(0,0,0,0.05)' }}/>
               <div style={{ fontSize:12, color:T.grey, fontWeight:700 }}>{rest.length} STORIES FOUND</div>
            </div>
            
            <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:isMobile?48:40 }}>
              {rest.map((a, i) => <JournalCard key={a.id} article={a} index={i} onOpen={()=>onOpenArticle(a.id)} isMobile={isMobile}/>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedJournalEntry({ article, onOpen, isMobile }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} onClick={onOpen}
      style={{ 
        position:'relative', background:'#fff', 
        padding:isMobile?'12px 12px 24px':'16px 16px 42px',
        boxShadow: hover ? '0 30px 70px rgba(0,0,0,0.15)' : '0 10px 30px rgba(0,0,0,0.05)',
        cursor:'pointer', transition:'all .3s ease',
        transform: hover ? 'translateY(-5px)' : 'none',
        borderRadius:4,
        border:'1px solid rgba(0,0,0,0.05)'
      }}>
      <div style={{ position:'absolute', top:12, left:12, zIndex:10, background:T.ink, color:'#fff', padding:'4px 10px', fontSize:10, fontWeight:800, letterSpacing:'.12em', borderRadius:2 }}>FEATURED STORY</div>
      
      <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
        <div style={{ position:'relative', aspectRatio:'3/4', overflow:'hidden', borderRadius:2, background:'#f8f8f8' }}>
          <ImgPlaceholder {...article.hero} radius={0}/>
        </div>
        <div>
          <div style={{ color:T.greenDeep, fontSize:13, fontWeight:800, letterSpacing:'.1em', marginBottom:10, textTransform:'uppercase' }}>{article.category}</div>
          <h2 style={{ fontFamily:'Fraunces, serif', fontSize:isMobile?24:32, fontWeight:800, color:T.ink, margin:'0 0 14px', lineHeight:1.15 }}>{article.title}</h2>
          <p style={{ fontFamily:'Caveat, cursive', fontSize:isMobile?18:20, color:T.grey, lineHeight:1.4, margin:0 }}>"{article.dek}"</p>
          
          <div style={{ marginTop:28, display:'flex', alignItems:'center', gap:10 }}>
            <Avatar name={article.author.name} size={36}/>
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:T.ink }}>{article.author.name} {article.author.verified && '✓'}</div>
              <div style={{ fontSize:12, color:T.grey }}>{article.date} · {article.readMin} min read</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function JournalCard({ article, index, onOpen, isMobile }) {
  const [hover, setHover] = React.useState(false);
  const rotation = (index % 3 === 0) ? -1.5 : (index % 3 === 1) ? 1 : 2;
  
  return (
    <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} onClick={onOpen}
      style={{ 
        cursor:'pointer', 
        transform: isMobile ? 'none' : hover ? `scale(1.05) rotate(0deg)` : `rotate(${rotation}deg)`,
        transition:'all .3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        zIndex: hover ? 10 : 1
      }}>
      <div style={{ background:'#fff', padding:'10px 10px 48px', boxShadow:'0 10px 30px rgba(0,0,0,0.08)', borderRadius:2, position:'relative' }}>
         <div style={{ position:'absolute', top:-8, right:20, width:50, height:20, background:'rgba(255,255,255,0.4)', backdropFilter:'blur(2px)', transform:'rotate(5deg)', border:'1px solid rgba(0,0,0,0.02)' }}/>
         <div style={{ height:isMobile?220:200, overflow:'hidden', background:'#eee' }}>
            <ImgPlaceholder {...article.hero} radius={0}/>
         </div>
         <div style={{ position:'absolute', bottom:10, left:0, right:0, textAlign:'center', fontFamily:'Caveat, cursive', fontSize:18, color:T.ink, opacity:0.7 }}>
            {article.category} · {article.date}
         </div>
      </div>
      <div style={{ marginTop:20, padding:'0 5px' }}>
         <h3 style={{ fontFamily:'Fraunces, serif', fontSize:22, fontWeight:700, color:T.ink, margin:'0 0 8px', lineHeight:1.2 }}>{article.title}</h3>
         <p style={{ fontFamily:'Caveat, cursive', fontSize:17, color:T.grey, lineHeight:1.4, margin:0, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>"{article.dek}"</p>
         <div style={{ marginTop:16, display:'flex', alignItems:'center', gap:8 }}>
            <Avatar name={article.author.name} size={24}/>
            <div style={{ fontSize:13, fontWeight:700, color:T.ink }}>{article.author.name}</div>
         </div>
      </div>
    </div>
  );
}

Object.assign(window, { TravelogueIndex });
