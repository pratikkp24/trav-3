// Travelogue Article — lower sections (gallery, taste memories, notes, related, CTA).

function TravelogueLowerSections({ article, onOpenTrip }) {
  return (
    <>
      <CapturedMoments photos={article.gallery}/>
      <TasteMemories items={article.taste}/>
      <NotesForTravelers notes={article.notes}/>
      <RelatedItineraries tripIds={article.relatedTripIds} onOpenTrip={onOpenTrip}/>
      <InspireCTA/>
    </>
  );
}

function CapturedMoments({ photos }) {
  const [light, setLight] = React.useState(null);
  // Use a masonry-ish grid with two "tall" tiles for rhythm.
  return (
    <div style={{ maxWidth:1200, margin:'40px auto 0', padding:'0 36px' }}>
      <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:16 }}>
        <h2 style={{ fontFamily:'Fraunces, serif', fontSize:26, fontWeight:700, letterSpacing:'-.02em', color:T.ink, margin:0 }}>Captured Moments</h2>
        <div style={{ fontSize:12.5, color:T.grey }}>{photos.length} photos · tap to expand</div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gridAutoRows:'180px', gap:14 }}>
        {photos.map((p, i) => {
          const big = i===0 || i===5;
          return (
            <div key={i} onClick={()=>setLight(p)} style={{ gridRow: big ? 'span 2' : 'span 1', borderRadius:14, overflow:'hidden', cursor:'pointer', position:'relative', border:`1px solid ${T.greyLight}` }}>
              <ImgPlaceholder src={p.src} tone={p.tone} ink={p.ink} accent={p.accent} label={p.label} radius={0}/>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, transparent 60%, rgba(0,0,0,.3))', display:'flex', alignItems:'flex-end', padding:12 }}>
                <span style={{ fontSize:11.5, color:'#fff', fontWeight:600, textShadow:'0 1px 3px rgba(0,0,0,.4)' }}>{p.label}</span>
              </div>
              <div style={{ position:'absolute', top:10, right:10, width:30, height:30, borderRadius:'50%', background:'rgba(255,255,255,.9)', display:'flex', alignItems:'center', justifyContent:'center', opacity:.0, transition:'opacity .2s' }} className="zoom">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.ink} strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5M11 8v6M8 11h6"/></svg>
              </div>
            </div>
          );
        })}
      </div>
      {light && (
        <div onClick={()=>setLight(null)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.82)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:40 }}>
          <div style={{ width:'min(900px, 92vw)', height:'min(600px, 80vh)', borderRadius:16, overflow:'hidden', position:'relative' }}>
            <ImgPlaceholder {...light} radius={0}/>
            <div style={{ position:'absolute', top:14, right:14, width:38, height:38, borderRadius:'50%', background:'rgba(255,255,255,.95)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
              <Ico name="x" size={18} color={T.ink}/>
            </div>
            <div style={{ position:'absolute', left:20, bottom:18, color:'#fff', fontSize:14, fontWeight:600, textShadow:'0 1px 3px rgba(0,0,0,.4)' }}>{light.label}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function TasteMemories({ items }) {
  const [idx, setIdx] = React.useState(0);
  const visible = items.slice(idx, idx+3);
  return (
    <div style={{ maxWidth:1080, margin:'40px auto 0', padding:'0 36px' }}>
      <h2 style={{ fontFamily:'Fraunces, serif', fontSize:26, fontWeight:700, letterSpacing:'-.02em', color:T.ink, textAlign:'center', margin:'0 0 16px' }}>Taste Memories</h2>
      <div style={{ position:'relative', background:'linear-gradient(100deg, #F9E4E8 0%, #F4E3DA 50%, #E4EEDE 100%)', borderRadius:20, padding:'24px 56px', border:`1px solid ${T.greyLight}` }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:28 }}>
          {visible.map((t, i) => (
            <div key={i} style={{ textAlign:'center' }}>
              <div style={{ width:84, height:84, borderRadius:'50%', background:'#FBD6DA', margin:'0 auto 14px', display:'flex', alignItems:'center', justifyContent:'center', border:'4px solid #fff', boxShadow:'0 4px 12px rgba(0,0,0,.06)' }}>
                <TasteGlyph i={idx + i} tone={t.tone}/>
              </div>
              <div style={{ fontSize:11.5, fontWeight:700, color:T.ink, letterSpacing:'.08em', marginBottom:4 }}>{t.name.toUpperCase()}</div>
              <div style={{ fontSize:11, color:T.grey, textTransform:'uppercase', letterSpacing:'.06em' }}>({t.loc})</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign:'center', marginTop:20, fontSize:13, color:T.inkSoft, fontStyle:'italic' }}>The best places that you can go to!</div>
        {idx + 3 < items.length && (
          <button onClick={()=>setIdx(Math.min(idx+1, items.length-3))} style={{ position:'absolute', right:-18, top:'50%', transform:'translateY(-50%)', width:44, height:44, borderRadius:'50%', background:'#fff', border:`1px solid ${T.greyLight}`, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', boxShadow:'0 4px 12px rgba(0,0,0,.08)' }}>
            <Ico name="chevron-right" size={18} color={T.ink}/>
          </button>
        )}
        {idx > 0 && (
          <button onClick={()=>setIdx(Math.max(0, idx-1))} style={{ position:'absolute', left:-18, top:'50%', transform:'translateY(-50%) rotate(180deg)', width:44, height:44, borderRadius:'50%', background:'#fff', border:`1px solid ${T.greyLight}`, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', boxShadow:'0 4px 12px rgba(0,0,0,.08)' }}>
            <Ico name="chevron-right" size={18} color={T.ink}/>
          </button>
        )}
      </div>
    </div>
  );
}

function TasteGlyph({ i, tone }) {
  // Abstract food bowls — noodle, thali, sashimi, tapas, greens
  const glyphs = [
    <g key="a"><ellipse cx="24" cy="28" rx="16" ry="5" fill="#e8c89a"/><path d="M10 26c4-10 24-10 28 0" stroke="#b87430" strokeWidth="1.5" fill="none"/><path d="M16 20c1 2 3 3 5 2M22 18c2 2 4 2 6 0M28 22c1 1 3 1 5-1" stroke="#b87430" strokeWidth="1.3" fill="none"/></g>,
    <g key="b"><circle cx="24" cy="26" r="14" fill="#f0b87a"/><circle cx="24" cy="26" r="14" fill="none" stroke="#a0623a" strokeWidth="1.5"/><circle cx="19" cy="22" r="3" fill="#c8e394"/><circle cx="28" cy="22" r="3" fill="#ee8a6a"/><circle cx="21" cy="30" r="3" fill="#f2d576"/><circle cx="29" cy="30" r="3" fill="#c3c3e8"/></g>,
    <g key="c"><ellipse cx="24" cy="26" rx="14" ry="4" fill="#e8a880"/><rect x="12" y="22" width="8" height="5" rx="1.5" fill="#f28a6a"/><rect x="22" y="22" width="8" height="5" rx="1.5" fill="#f0b87a"/><rect x="13" y="22" width="6" height="1.5" fill="#fff"/><rect x="23" y="22" width="6" height="1.5" fill="#fff"/></g>,
    <g key="d"><path d="M8 26c2-6 30-6 32 0" stroke="#b87430" strokeWidth="2" fill="#f0b87a"/><circle cx="16" cy="22" r="2" fill="#ee8a6a"/><circle cx="24" cy="20" r="2" fill="#c8e394"/><circle cx="32" cy="22" r="2" fill="#f2d576"/></g>,
    <g key="e"><ellipse cx="24" cy="28" rx="14" ry="5" fill="#c8e394"/><path d="M14 26c3-4 8-5 10-3M22 24c4-3 8-3 12 1" stroke="#4a7a3a" strokeWidth="1.5" fill="none"/></g>,
  ];
  return (
    <svg width="52" height="52" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="22" fill="rgba(255,255,255,.5)"/>
      {glyphs[i % glyphs.length]}
    </svg>
  );
}

function NotesForTravelers({ notes }) {
  return (
    <div style={{ maxWidth:960, margin:'40px auto 0', padding:'0 36px' }}>
      <h2 style={{ fontFamily:'Fraunces, serif', fontSize:26, fontWeight:700, letterSpacing:'-.02em', color:T.ink, textAlign:'center', margin:'0 0 16px' }}>Notes for Future Travelers</h2>
      <div style={{ position:'relative', padding:22, borderRadius:20, border:`2px solid ${T.green}`, background:'#fff' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
          {notes.map((n, i) => (
            <div key={i} style={{ background:n.tone, borderRadius:14, padding:'18px 18px 18px 18px', display:'flex', gap:14 }}>
              <div style={{ width:38, height:38, borderRadius:'50%', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'0 1px 3px rgba(0,0,0,.06)' }}>
                <NoteGlyph name={n.icon} color={n.fg}/>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:14.5, fontWeight:700, color:T.ink, marginBottom:5 }}>{n.title}</div>
                <div style={{ fontSize:12.5, color:T.inkSoft, lineHeight:1.55 }}>{n.body}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Compass in the center */}
        <div style={{ position:'absolute', left:'50%', top:'50%', transform:'translate(-50%, -50%)', width:58, height:58, borderRadius:'50%', background:'#fff', border:`1px solid ${T.greyLight}`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 12px rgba(0,0,0,.06)' }}>
          <svg width="28" height="28" viewBox="0 0 24 24"><path d="M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" fill={T.ink}/></svg>
        </div>
      </div>
    </div>
  );
}

function NoteGlyph({ name, color }) {
  const p = { width:18, height:18, viewBox:'0 0 24 24', fill:'none', stroke:color, strokeWidth:1.8, strokeLinecap:'round', strokeLinejoin:'round' };
  switch (name) {
    case 'car': return <svg {...p}><path d="M5 17h14v-5l-2-5H7l-2 5v5z"/><circle cx="8" cy="17" r="1.5"/><circle cx="16" cy="17" r="1.5"/></svg>;
    case 'scooter': return <svg {...p}><circle cx="7" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M10 17h6l-3-8h-2M13 9l2-4h3"/></svg>;
    case 'buoy': return <svg {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M5.6 5.6l3.2 3.2M15.2 15.2l3.2 3.2M18.4 5.6l-3.2 3.2M8.8 15.2l-3.2 3.2"/></svg>;
    case 'phone': return <svg {...p}><rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/></svg>;
    default: return <svg {...p}><circle cx="12" cy="12" r="8"/></svg>;
  }
}

function RelatedItineraries({ tripIds, onOpenTrip }) {
  const trips = tripIds.map(id => WEEKEND_TRIPS.find(t=>t.id===id)).filter(Boolean);
  if (!trips.length) return null;
  return (
    <div style={{ maxWidth:1200, margin:'48px auto 0', padding:'0 36px' }}>
      <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:16 }}>
        <div>
          <h2 style={{ fontFamily:'Fraunces, serif', fontSize:26, fontWeight:700, letterSpacing:'-.02em', color:T.ink, margin:'0 0 4px' }}>Related Itineraries</h2>
          <div style={{ fontSize:13, color:T.grey }}>Like what you read? These trips let you live it.</div>
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20 }}>
        {trips.map(t => (
          <div key={t.id} onClick={()=>onOpenTrip && onOpenTrip(t.id)} style={{ border:`1px solid ${T.greyLight}`, borderRadius:16, overflow:'hidden', cursor:'pointer', background:'#fff' }}>
            <div style={{ height:160, position:'relative' }}>
              <ImgPlaceholder {...t.img} radius={0}/>
              <div style={{ position:'absolute', top:12, left:12, background:T.ink, color:'#fff', padding:'4px 10px', borderRadius:999, fontSize:11, fontWeight:700 }}>{t.dest}</div>
            </div>
            <div style={{ padding:'16px 18px' }}>
              <div style={{ fontSize:12, color:T.grey, marginBottom:4 }}>{t.dates}</div>
              <div style={{ fontSize:15, fontWeight:700, color:T.ink, marginBottom:8 }}>Weekend · {t.creator}</div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div style={{ fontSize:16, fontWeight:800, color:T.ink, fontFamily:'Fraunces, serif' }}>₹{t.price.toLocaleString('en-IN')}</div>
                <span style={{ fontSize:12, fontWeight:700, color:T.greenDeep, display:'inline-flex', alignItems:'center', gap:4 }}>View <Ico name="arrow-right" size={12} color={T.greenDeep}/></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InspireCTA() {
  return (
    <div style={{ maxWidth:1200, margin:'48px auto 0', padding:'0 36px 60px' }}>
      <div style={{ background:T.offWhite, border:`1px solid ${T.greyLight}`, borderRadius:22, overflow:'hidden', display:'grid', gridTemplateColumns:'1fr 1.1fr', minHeight:280 }}>
        <div style={{ position:'relative', minHeight:260 }}>
          <ImgPlaceholder src="https://loremflickr.com/1200/800/bonfire,night,friends?lock=451" tone="#2a1f18" ink="#0a0502" accent="#e6a33a" label="Bonfire" radius={0}/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg, transparent 70%, #FAFAFA)' }}/>
        </div>
        <div style={{ padding:'36px 40px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
          <h2 style={{ fontFamily:'Fraunces, serif', fontSize:28, fontWeight:700, letterSpacing:'-.02em', color:T.ink, margin:'0 0 10px', lineHeight:1.15 }}>
            Your Journey Could <span style={{ fontStyle:'italic', color:T.greenDeep }}>Inspire Thousands</span>
          </h2>
          <div style={{ fontSize:14, color:T.grey, lineHeight:1.55, marginBottom:20 }}>
            Share your travel story with us. If selected, we'll publish it on the travelogue for the world to read — and tag you forever.
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:20 }}>
            <button style={{ height:46, padding:'0 22px', borderRadius:999, background:T.green, border:'none', color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:8 }}>
              <Ico name="send" size={14} color="#fff"/> Share my story
            </button>
            <span style={{ fontSize:13, fontWeight:600, color:T.greenDeep, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:4 }}>See how it works <Ico name="chevron-right" size={13} color={T.greenDeep}/></span>
          </div>
          <div style={{ background:'#fff', border:`1px solid ${T.greyLight}`, borderLeft:`3px solid ${T.green}`, borderRadius:'0 10px 10px 0', padding:'12px 16px' }}>
            <div style={{ fontSize:13, fontStyle:'italic', color:T.inkSoft, lineHeight:1.5, marginBottom:5 }}>“I shared my trekking story and it got featured — hundreds of travelers have reached out since.”</div>
            <div style={{ fontSize:11.5, color:T.grey, fontWeight:600 }}>— Ananya, Trav Creator</div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TravelogueLowerSections });
