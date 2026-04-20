// ─── TravStudio — Internal Operations Command Centre ─────────────────────────
const T = {
  green: '#1DBF73',
  greenDeep: '#0D9488',
  ink: '#0F172A',
  inkLight: '#1E293B',
  parchment: '#F8FAFC',
  rose: '#E11D48',
  amber: '#F59E0B',
  blue: '#2563EB',
  purple: '#8B5CF6',
  border: 'rgba(15,23,42,0.08)',
  borderDark: 'rgba(255,255,255,0.08)',
};

// ── Style Injection ──────────────────────────────────────────────────────
const style = document.createElement('style');
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,800&family=Inter:wght@400;500;600;700;800&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
  
  * { box-sizing: border-box; font-family: 'Inter', sans-serif; }
  
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  .fade-in { animation: fadeIn 0.4s ease-out; }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  input, textarea { outline: none; }
  ::placeholder { color: rgba(15,23,42,0.3); }
`;
document.head.appendChild(style);

function inr(n) { return '₹' + Math.round(n || 0).toLocaleString('en-IN'); }
function studioGet(key) {
  try { return JSON.parse(localStorage.getItem(`trav.studio.${key}`) || 'null'); } catch { return null; }
}
function studioSet(key, val) {
  try { localStorage.setItem(`trav.studio.${key}`, JSON.stringify(val)); } catch {}
}

const getTheme = (isDark) => ({
  bg: isDark ? T.ink : T.parchment,
  sidebar: isDark ? T.inkLight : '#FFFFFF',
  card: isDark ? T.inkLight : '#FFFFFF',
  cardHover: isDark ? '#263345' : '#F1F5F9',
  border: isDark ? T.borderDark : T.border,
  text: isDark ? '#FFFFFF' : T.ink,
  textSoft: isDark ? 'rgba(255,255,255,0.7)' : '#475569',
  textMuted: isDark ? 'rgba(255,255,255,0.4)' : '#94A3B8',
  accent: T.green,
  accentDeep: T.greenDeep,
});

// ── Shared UI Components ──────────────────────────────────────────────────
const Ico = ({ name, size=20, color }) => (
  <span className="material-symbols-rounded" style={{ fontSize:size, color:color, verticalAlign:'middle', display:'inline-block' }}>{name}</span>
);

function StudioBadge({ label, color, theme }) {
  const c = color || theme.accent;
  return (
    <span style={{ display:'inline-flex', padding:'3px 10px', borderRadius:999, fontSize:10, fontWeight:800, letterSpacing:'.06em', textTransform:'uppercase', background:`${c}15`, color:c, border:`1px solid ${c}30` }}>
      {label}
    </span>
  );
}

function SCard({ children, style, onClick, theme, title, onJson }) {
  return (
    <div onClick={onClick} style={{ background:theme.card, borderRadius:20, border:`1px solid ${theme.border}`, padding:24, ...style, cursor:onClick?'pointer':'default', transition:'all .2s', position:'relative' }}
      onMouseEnter={e => { if(onClick) e.currentTarget.style.borderColor = theme.accent; }}
      onMouseLeave={e => { if(onClick) e.currentTarget.style.borderColor = theme.border; }}>
      {(title || onJson) && (
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:20, alignItems:'center' }}>
          {title && <div style={{ fontSize:10, fontWeight:800, color:theme.textMuted, letterSpacing:'.08em' }}>{title.toUpperCase()}</div>}
          {onJson && <div onClick={(e)=>{ e.stopPropagation(); onJson(); }} style={{ cursor:'pointer', color:theme.textMuted, opacity:0.6 }}><Ico name="code" size={16}/></div>}
        </div>
      )}
      {children}
    </div>
  );
}

function SBtn({ children, kind='primary', size='md', icon, onClick, theme, full, style }) {
  const bg = kind==='primary' ? theme.accent : 'transparent';
  const fg = kind==='primary' ? '#fff' : theme.text;
  const bd = kind==='primary' ? theme.accent : theme.border;
  return (
    <button onClick={onClick} style={{ height:size==='sm'?32:44, padding:size==='sm'?'0 12px':'0 24px', borderRadius:10, border:`1px solid ${bd}`, background:bg, color:fg, fontSize:size==='sm'?11:13, fontWeight:700, display:'inline-flex', alignItems:'center', gap:8, width:full?'100%':'auto', justifyContent:'center', cursor:'pointer', transition:'all .2s', ...style }}>
      {icon && <Ico name={icon} size={size==='sm'?16:18} color={fg}/>}
      {children}
    </button>
  );
}

// ── Interaction Layer: SideDrawer Shell ──────────────────────────────────
function SideDrawer({ open, onHide, title, children, theme }) {
  if (!open) return null;
  return (
    <div style={{ position:'fixed', inset:0, zIndex:2000, display:'flex', justifyContent:'flex-end' }}>
       <div onClick={onHide} style={{ position:'absolute', inset:0, background:'rgba(15,23,42,0.4)', backdropFilter:'blur(8px)', transition:'all 0.3s' }} />
       <div style={{ position:'relative', width:540, background:theme.sidebar, borderLeft:`1px solid ${theme.border}`, height:'100%', boxShadow:'-20px 0 60px rgba(0,0,0,0.15)', display:'flex', flexDirection:'column', animation:'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <div style={{ padding:'32px 40px', borderBottom:`1px solid ${theme.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
             <h3 style={{ fontSize:22, fontWeight:800, fontFamily:'Fraunces', margin:0 }}>{title}</h3>
             <div onClick={onHide} style={{ cursor:'pointer', color:theme.textMuted, opacity:0.6 }}><Ico name="close" size={28}/></div>
          </div>
          <div style={{ flex:1, overflowY:'auto', padding:40 }}>{children}</div>
       </div>
    </div>
  );
}

// ── Countdown Timer Component ─────────────────────────────────────────────
function TatTimer({ deadline, theme }) {
  const [timeLeft, setTimeLeft] = React.useState('');
  const [isOverdue, setIsOverdue] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      const remaining = new Date(deadline) - new Date();
      if (remaining <= 0) {
        setTimeLeft('OVERDUE');
        setIsOverdue(true);
        clearInterval(timer);
      } else {
        const h = Math.floor(remaining / 3600000);
        const m = Math.floor((remaining % 3600000) / 60000);
        setTimeLeft(`${h}h ${m}m`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  return <span style={{ fontWeight:800, color:isOverdue?T.rose:T.amber }}>{timeLeft}</span>;
}

// ── Request Hub ──────────────────────────────────────────────────────────
function SectionRequests({ theme }) {
  const [activeLane, setActiveLane] = React.useState('user');
  const [requests, setRequests] = React.useState(studioGet('requests') || []);
  const [selected, setSelected] = React.useState(null);

  const handleUpdate = (id, merge) => {
    const next = requests.map(r => r.id === id ? { ...r, ...merge } : r);
    setRequests(next); studioSet('requests', next);
    if(selected?.id === id) setSelected({ ...selected, ...merge });
  };

  const currentRequests = requests.filter(r => r.domain === activeLane);

  return (
    <div className="fade-in">
      <div style={{ display:'flex', gap:32, marginBottom:32, borderBottom:`1.5px solid ${theme.border}` }}>
        {['user', 'creator', 'dmc'].map(l => (
          <div key={l} onClick={()=>setActiveLane(l)} style={{ paddingBottom:12, fontSize:15, fontWeight:800, color:activeLane===l?theme.accent:theme.textMuted, cursor:'pointer', borderBottom:activeLane===l?`3px solid ${theme.accent}`:'3px solid transparent', textTransform:'capitalize', transition:'all .2s' }}>
            {l} Requests
          </div>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(360px, 1fr))', gap:24 }}>
        {currentRequests.map(req => (
          <SCard key={req.id} theme={theme} onClick={()=>setSelected(req)}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
              <StudioBadge label={req.status} color={req.status==='new'?T.blue:theme.accent} theme={theme}/>
              {req.tatDeadline && <div style={{ fontSize:11, fontWeight:700, color:theme.textMuted }}><Ico name="schedule" size={14} style={{ marginRight:4 }}/> <TatTimer deadline={req.tatDeadline} theme={theme}/></div>}
            </div>
            <div style={{ fontSize:20, fontWeight:800, fontFamily:'Fraunces, serif', marginBottom:6 }}>{req.dest}</div>
            <div style={{ fontSize:12, fontWeight:600, color:theme.textSoft, marginBottom:16 }}>Submitted by {req.userName}</div>
            <div style={{ fontSize:13, lineHeight:1.6, color:theme.textSoft, background:theme.bg, padding:16, borderRadius:12 }}>"{req.notes}"</div>
          </SCard>
        ))}
      </div>
      <SideDrawer open={!!selected} onHide={()=>setSelected(null)} title="Request Breakdown" theme={theme}>
         {selected && <RequestDetail req={selected} theme={theme} onUpdate={(m)=>handleUpdate(selected.id, m)} />}
      </SideDrawer>
    </div>
  );
}

function RequestDetail({ req, theme, onUpdate }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:40 }}>
       <div>
          <div style={{ fontSize:10, fontWeight:800, color:theme.textMuted, marginBottom:16, letterSpacing:'.08em' }}>SUBMITTED BRIEF</div>
          <div style={{ fontSize:20, fontWeight:800, marginBottom:10 }}>{req.dest} Journey</div>
          <div style={{ background:theme.bg, padding:24, borderRadius:20, border:`1px solid ${theme.border}`, fontSize:14, lineHeight:1.7, color:theme.textSoft }}>"{req.notes}"</div>
       </div>
       <div style={{ display:'flex', gap:16 }}>
          <MiniStat theme={theme} label="Submitted" val={req.submittedDaysAgo + ' days ago'} icon="calendar_today" col={T.blue} />
          <MiniStat theme={theme} label="User Tier" val="Verified Premium" icon="verified" col={T.greenDeep} />
       </div>
       <div>
          <div style={{ fontSize:10, fontWeight:800, color:theme.textMuted, marginBottom:16, letterSpacing:'.08em' }}>ACTION ENGINE</div>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
             {req.status !== 'assigned' && <SBtn theme={theme} full icon="send" onClick={()=>onUpdate({ status:'assigned', assignedTo:{name:'DMC North'}, tatDeadline: new Date(Date.now()+7200000).toISOString() })}>Delegate to DMC North</SBtn>}
             <SBtn theme={theme} kind="outline" full icon="chat_bubble">Ask Client for Clarification</SBtn>
             <SBtn theme={theme} kind="outline" full style={{ color:T.rose, borderColor:`${T.rose}30` }}>Decline Request</SBtn>
          </div>
       </div>
    </div>
  );
}

function MiniStat({ theme, label, val, icon, col }) {
  return (
    <div style={{ flex:1, padding:16, background:theme.bg, borderRadius:16, border:`1px solid ${theme.border}` }}>
       <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:4 }}>
          <Ico name={icon} size={14} color={col}/>
          <div style={{ fontSize:9, fontWeight:800, color:theme.textMuted, letterSpacing:'.05em' }}>{label.toUpperCase()}</div>
       </div>
       <div style={{ fontSize:13, fontWeight:700 }}>{val}</div>
    </div>
  );
}

// ── Support Desk ────────────────────────────────────────────────────────
function SectionSupport({ theme }) {
  const [tickets, setTickets] = React.useState(studioGet('tickets') || []);
  const [selected, setSelected] = React.useState(null);

  const toggleResolve = (id) => {
    const next = tickets.map(t => t.id === id ? { ...t, status: t.status==='resolved'?'open':'resolved' } : t);
    setTickets(next); studioSet('tickets', next);
    if(selected?.id === id) setSelected(next.find(x=>x.id===id));
  };

  return (
    <div className="fade-in">
       <h2 style={{ fontSize:28, fontWeight:800, fontFamily:'Fraunces', marginBottom:32 }}>Support Desk</h2>
       <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {tickets.map(t => (
            <SCard theme={theme} key={t.id} onClick={()=>setSelected(t)}>
               <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                  <div style={{ flex:1 }}>
                     <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:12 }}>
                        <StudioBadge label={t.status} color={t.status==='resolved'?T.green:T.rose} theme={theme}/>
                        <StudioBadge label={t.priority} color={t.priority==='high'?T.rose:T.amber} theme={theme}/>
                     </div>
                     <div style={{ fontSize:18, fontWeight:800, color:theme.text }}>{t.subject}</div>
                     <div style={{ fontSize:13, color:theme.textSoft, marginTop:4, opacity:0.8 }}>{t.body}</div>
                  </div>
                  <Ico name={t.status==='resolved'?'check_circle':'pending'} size={24} color={t.status==='resolved'?T.green:T.blue}/>
               </div>
            </SCard>
          ))}
       </div>
       <SideDrawer open={!!selected} onHide={()=>setSelected(null)} title="Ticket Lifecycle" theme={theme}>
          {selected && <TicketDetail ticket={selected} theme={theme} onToggle={()=>toggleResolve(selected.id)} />}
       </SideDrawer>
    </div>
  );
}

function TicketDetail({ ticket, theme, onToggle }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:40 }}>
       <div>
          <div style={{ fontSize:10, fontWeight:800, color:theme.textMuted, marginBottom:16, letterSpacing:'.08em' }}>ISSUE DESCRIPTION</div>
          <h4 style={{ fontSize:20, fontWeight:800, marginBottom:10 }}>{ticket.subject}</h4>
          <p style={{ fontSize:14, color:theme.textSoft, lineHeight:1.7, background:theme.bg, padding:20, borderRadius:16 }}>{ticket.body}</p>
       </div>
       <div>
          <div style={{ fontSize:10, fontWeight:800, color:theme.textMuted, marginBottom:24, letterSpacing:'.08em' }}>RESOLUTION TIMELINE</div>
          <div style={{ display:'flex', flexDirection:'column', gap:0, paddingLeft:14, borderLeft:`2px solid ${theme.border}` }}>
             <TimelineItem theme={theme} label="Ticket Raised" time="10:42 AM" active/>
             <TimelineItem theme={theme} label="Auto-Priority Set: High" time="10:43 AM" active/>
             <TimelineItem theme={theme} label="Assigned to Ops Captain" time="11:05 AM" active/>
             <TimelineItem theme={theme} label="Conflict Resolved" time="--" active={ticket.status==='resolved'}/>
          </div>
       </div>
       <div style={{ marginTop:'auto', paddingTop:32 }}>
          <SBtn theme={theme} full onClick={onToggle} kind={ticket.status==='resolved'?'outline':'primary'}>
             {ticket.status==='resolved'?'Re-open Ticket':'Finalize Resolution'}
          </SBtn>
       </div>
    </div>
  );
}

function TimelineItem({ theme, label, time, active }) {
  return (
    <div style={{ position:'relative', paddingBottom:32, paddingLeft:24 }}>
       <div style={{ position:'absolute', left:-7, top:0, width:12, height:12, borderRadius:99, background:active?theme.accent:theme.bg, border:`2px solid ${active?theme.accent:theme.border}`, boxShadow:active?`0 0 10px ${theme.accent}40`:'' }} />
       <div style={{ fontSize:14, fontWeight:700, color:active?theme.text:theme.textMuted }}>{label}</div>
       <div style={{ fontSize:11, color:theme.textMuted, marginTop:2 }}>{time}</div>
    </div>
  );
}

// ── Full-Scale Itinerary CMS ──────────────────────────────────────────────
function SectionItineraries({ theme }) {
  const [items, setItems] = React.useState(studioGet('itineraries') || []);
  const [editing, setEditing] = React.useState(null);

  const handleSave = (itin) => {
    const isNew = !itin.id;
    const item = isNew ? { ...itin, id: 'trip-' + Date.now(), status: 'approved' } : itin;
    const updated = isNew ? [item, ...items] : items.map(i => i.id === item.id ? item : i);
    setItems(updated); studioSet('itineraries', updated); setEditing(null);
  };

  if (editing) return <TripBuilder itin={editing} onSave={handleSave} onBack={() => setEditing(null)} theme={theme} />;

  return (
    <div className="fade-in">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32 }}>
        <div>
          <h2 style={{ fontSize:28, fontWeight:800, fontFamily:'Fraunces' }}>live.catalog</h2>
          <p style={{ color:theme.textSoft, fontSize:14 }}>Production-grade supply management hub.</p>
        </div>
        <SBtn theme={theme} icon="add" onClick={()=>setEditing({})}>Create Supply</SBtn>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:24 }}>
        {items.length === 0 ? (
          <div style={{ gridColumn:'1/-1', padding:80, textAlign:'center', border:`1.5px dashed ${theme.border}`, borderRadius:24, color:theme.textMuted }}>No itineraries found.</div>
        ) : (
          items.map(item => (
            <SCard key={item.id} theme={theme} onClick={()=>setEditing(item)}>
               <div style={{ display:'flex', gap:8, marginBottom:16 }}>
                  <StudioBadge label={item.type || 'weekend'} color={item.type==='longhaul'?T.purple:T.blue} theme={theme}/>
                  <StudioBadge label={item.category || 'domestic'} color={T.greenDeep} theme={theme}/>
               </div>
               <div style={{ fontSize:20, fontWeight:800, fontFamily:'Fraunces' }}>{item.title || 'Untitled Trip'}</div>
               <div style={{ fontSize:13, color:theme.textSoft, marginTop:8, display:'flex', alignItems:'center', gap:6 }}><Ico name="location_on" size={14}/> {item.dest} · {item.nightsLabel}</div>
            </SCard>
          ))
        )}
      </div>
    </div>
  );
}

function TripBuilder({ itin, onSave, onBack, theme }) {
  const [sectionJson, setSectionJson] = React.useState(null);
  const [showFullJson, setShowFullJson] = React.useState(false);

  const defaults = {
    id: itin.id || null, 
    type: 'longhaul', category: 'domestic',
    title: 'Spiti Valley — 8D7N Offbeat Circuit',
    dest: 'Spiti, HP',
    price: 24999,
    tagline: 'A journey into the middle land.',
    summary: 'Traverse through the high-altitude desert of Spiti, visiting ancient monasteries.',
    overviewHeadline: 'The Ultimate Himalayan Odyssey',
    nightsLabel: '7N/8D',
    route: ['Delhi', 'Shimla', 'Kaza', 'Tabo', 'Shimla', 'Delhi'],
    routeDistance: '~1200 KM',
    meetingPoint: 'Majnu ka Tilla · 09:00 PM',
    itinerary: [{ day: 'Day 1', title: 'Delhi to Shimla', blocks: [{ time: '09:00 PM', title: 'Volvo Pickup', body: 'Boarding at Majnu.', included: true }] }],
    signatureStay: { name: 'Spiti Heritage Homestay', blurb: 'Authentic mud-house stay.', amenities: [{icon:'wb_sunny', label:'Valley View'}] },
    transport: { interCity: { type: 'Premium AC Volvo', note: 'Semi-Sleeper' }, intraCity: { type: '4x4 Expedition SUV', note: 'Scorpio/Traveler' } },
    departures: [{ id: 'd1', dateRange: 'May 16 – May 23', price: 24999, status: 'available', note: 'Early Bird' }],
    inclusions: ['AC Volvo Delhi ↔ Shimla', '7 Nights Homestay Stay', 'Daily breakfast + dinner', 'Spiti 4x4 Intra-city transfers'],
    exclusions: ['Flights to Delhi', 'Lunch & Personal Expenses', 'Travel insurance'],
    packList: [{ cat: 'High Altitude', icon: 'wb_sunny', items: ['Fleece layers', 'Sunblock 50+', 'Lip balm'] }],
    gallery: [{ src: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0', tone:'#2b6a8a', label:'Kaza Monastery' }],
    videos: [],
    faq: [{ q: 'Is it safe?', a: 'Extremely safe for all travelers.' }],
    cancellationPolicy: [{ when: '15+ days', refund: 'Full refund', tone: T.greenDeep }],
    travelingAs: ['solo-female', 'friends'],
    relatedArticleIds: ['spiti-guide-2025']
  };

  const [data, setData] = React.useState(() => ({...defaults, ...itin}));

  const JsonOverlay = ({ id, val, onSave, onCancel }) => (
    <div style={{ position:'absolute', inset:0, background:theme.sidebar, zIndex:100, borderRadius:20, padding:16, display:'flex', flexDirection:'column', boxShadow:'inset 0 0 40px rgba(0,0,0,0.6)' }}>
       <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12, alignItems:'center' }}>
          <div style={{ fontSize:10, fontWeight:800, color:T.green, letterSpacing:'.1em' }}>TERMINAL: {id.toUpperCase()}</div>
          <div onClick={onCancel} style={{ cursor:'pointer', color:theme.textMuted }}><Ico name="close" size={18}/></div>
       </div>
       <textarea defaultValue={JSON.stringify(val, null, 2)} onBlur={e => { try { onSave(JSON.parse(e.target.value)); } catch(err){} }} style={{ flex:1, background:theme.bg, border:`1px solid ${theme.border}`, borderRadius:8, color:T.green, fontSize:11, fontFamily:'monospace', padding:10, outline:'none', resize:'none' }} />
       <div style={{ marginTop:10, textAlign:'right' }}><SBtn theme={theme} kind="ghost" size="sm" onClick={onCancel}>Sync & Close</SBtn></div>
    </div>
  );

  return (
    <div className="fade-in">
      <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:32 }}>
        <SBtn theme={theme} kind="outline" size="sm" icon="arrow_back" onClick={onBack}>Cancel</SBtn>
        <h2 style={{ fontSize:22, fontWeight:800, fontFamily:'Fraunces' }}>{data.id ? 'Edit' : 'Create'} Supply</h2>
        <div style={{ display:'flex', marginLeft:'auto', gap:12 }}>
           <SBtn theme={theme} kind="outline" icon="developer_mode" onClick={()=>setShowFullJson(true)}>JSON Console</SBtn>
           <SBtn theme={theme} icon="publish" onClick={() => onSave(data)}>Publish Production</SBtn>
        </div>
      </div>
      {showFullJson && (
         <div style={{ position:'fixed', inset:40, background:theme.bg, zIndex:3000, borderRadius:24, border:`1px solid ${theme.border}`, boxShadow:'0 0 0 100vh rgba(0,0,0,0.8)', padding:40, display:'flex', flexDirection:'column' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:24 }}><div><h3 style={{ fontSize:24, fontWeight:800, fontFamily:'Fraunces', margin:0 }}>Supply Terminal</h3></div><div onClick={()=>setShowFullJson(false)} style={{ cursor:'pointer', color:theme.textMuted }}><Ico name="close" size={28}/></div></div>
            <textarea value={JSON.stringify(data, null, 2)} onChange={e => { try { setData(JSON.parse(e.target.value)); } catch(err) {} }} style={{ flex:1, background:theme.sidebar, border:`1px solid ${theme.border}`, borderRadius:16, color:T.green, fontSize:12, fontFamily:'monospace', padding:24, outline:'none', resize:'none' }} />
            <div style={{ marginTop:24, textAlign:'right' }}><SBtn theme={theme} onClick={()=>setShowFullJson(false)}>Sync State</SBtn></div>
         </div>
      )}
      <div style={{ display:'grid', gridTemplateColumns:'2.5fr 1.5fr', gap:24 }}>
        <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
           <SCard theme={theme} title="Editorial & Pricing" onJson={()=>setSectionJson('meta')}>
              {sectionJson === 'meta' && <JsonOverlay id="meta" val={{ title:data.title, tagline:data.tagline, summary:data.summary, price:data.price }} onSave={v=>setData({...data,...v})} onCancel={()=>setSectionJson(null)} />}
              <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
                 <input value={data.title} onChange={e=>setData({...data, title:e.target.value})} placeholder="Hero Title" style={{ width:'100%', background:'transparent', border:'none', borderBottom:`1.5px solid ${theme.border}`, fontSize:24, fontWeight:800, color:theme.text }} />
                 <div style={{ display:'flex', gap:16 }}>
                    <input type="number" value={data.price} onChange={e=>setData({...data, price:parseInt(e.target.value)||0})} style={{ background:theme.bg, border:`1px solid ${theme.border}`, borderRadius:10, height:44, padding:'0 16px', fontWeight:800, color:theme.accent, flex:1 }} />
                    <input value={data.dest} onChange={e=>setData({...data, dest:e.target.value})} placeholder="Location" style={{ background:theme.bg, border:`1px solid ${theme.border}`, borderRadius:10, height:44, padding:'0 16px', flex:2 }} />
                 </div>
                 <textarea value={data.summary} onChange={e=>setData({...data, summary:e.target.value})} placeholder="Detailed summary..." style={{ width:'100%', height:100, background:theme.bg, border:`1px solid ${theme.border}`, borderRadius:12, padding:16, fontSize:14, lineHeight:1.6 }} />
              </div>
           </SCard>
           <SCard theme={theme} title="Itinerary Engine" onJson={()=>setSectionJson('itinerary')}>
              {sectionJson === 'itinerary' && <JsonOverlay id="itinerary" val={data.itinerary} onSave={v=>setData({...data, itinerary:v})} onCancel={()=>setSectionJson(null)} />}
              {data.itinerary.map((day, idx) => (
                 <div key={idx} style={{ padding:16, background:theme.bg, borderRadius:12, border:`1px solid ${theme.border}`, marginBottom:12, display:'flex', justifyContent:'space-between' }}>
                    <div style={{ fontWeight:700 }}>{day.day}: {day.title}</div>
                    <div style={{ color:theme.textMuted, fontSize:11 }}>{day.blocks?.length || 0} blocks</div>
                 </div>
              ))}
              <SBtn theme={theme} kind="ghost" size="sm" icon="add_circle">Append Day</SBtn>
           </SCard>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
           <SCard theme={theme} title="Inventory (Departures)" onJson={()=>setSectionJson('inventory')}>
              {sectionJson === 'inventory' && <JsonOverlay id="inventory" val={data.departures} onSave={v=>setData({...data, departures:v})} onCancel={()=>setSectionJson(null)} />}
              {data.departures.map((d, i) => (
                <div key={i} style={{ background:theme.bg, padding:14, borderRadius:12, border:`1px solid ${theme.border}`, marginBottom:10 }}>
                   <div style={{ fontSize:13, fontWeight:800 }}>{d.dateRange}</div>
                   <div style={{ display:'flex', justifyContent:'space-between', marginTop:6 }}>
                      <StudioBadge label={d.note} color={T.amber} theme={theme}/>
                      <div style={{ fontWeight:800, color:theme.accent }}>{inr(d.price)}</div>
                   </div>
                </div>
              ))}
           </SCard>
           <SCard theme={theme} title="Signature Stay" onJson={()=>setSectionJson('stay')}>
              <input value={data.signatureStay.name} onChange={e=>setData({...data, signatureStay:{...data.signatureStay, name:e.target.value}})} style={{ width:'100%', background:theme.bg, border:`1px solid ${theme.border}`, borderRadius:10, height:44, padding:'0 16px', fontWeight:800 }} />
           </SCard>
        </div>
      </div>
    </div>
  );
}

// ── App Shell ────────────────────────────────────────────────────────────
function SectionDash({ theme }) {
  return (
    <div className="fade-in">
       <h2 style={{ fontSize:32, fontWeight:800, fontFamily:'Fraunces', marginBottom:40 }}>Ops Command Centre</h2>
       <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:24 }}>
          <StatCard theme={theme} label="Active Users" val="1.8k" icon="group" col={theme.accent}/>
          <StatCard theme={theme} label="Open Briefs" val="12" icon="send" col={T.blue}/>
          <StatCard theme={theme} label="Open Tickets" val="2" icon="push_pin" col={T.rose}/>
          <StatCard theme={theme} label="Supply" val="₹8.4L" icon="payments" col={theme.accentDeep}/>
       </div>
    </div>
  );
}

function StatCard({ theme, label, val, icon, col, style }) {
  return (
    <SCard theme={theme} style={{ padding:24, ...style }}>
       <div style={{ display:'flex', justifyContent:'space-between', marginBottom:16 }}><div style={{ width:40, height:40, borderRadius:12, background:`${col}15`, display:'flex', alignItems:'center', justifyContent:'center' }}><Ico name={icon} size={20} color={col}/></div></div>
       <div style={{ fontSize:32, fontWeight:800 }}>{val}</div>
       <div style={{ fontSize:10, fontWeight:800, color:theme.textMuted, letterSpacing:'.08em', marginTop:4 }}>{label.toUpperCase()}</div>
    </SCard>
  );
}

function Sidebar({ active, onNav, isDark, onToggleTheme, theme }) {
  const MENU = [
    {id:'dash', icon:'bolt', label:'Ops Hub'}, 
    {id:'requests', icon:'send', label:'Requests'}, 
    {id:'itineraries', icon:'calendar_today', label:'live.catalog'}, 
    {id:'support', icon:'push_pin', label:'Support'}
  ];
  return (
    <div style={{ width:280, background:theme.sidebar, borderRight:`1px solid ${theme.border}`, display:'flex', flexDirection:'column', height:'100vh', position:'sticky', top:0, zIndex:10 }}>
       <div style={{ padding:40, borderBottom:`1px solid ${theme.border}` }}><div style={{ fontSize:22, fontWeight:900, color:theme.accent, letterSpacing:'-0.02em' }}>trav STUDIO</div></div>
       <nav style={{ flex:1, padding:24 }}>
          {MENU.map(i => (
             <div key={i.id} onClick={()=>onNav(i.id)} style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 20px', borderRadius:14, cursor:'pointer', background:active===i.id?`${theme.accent}15`:'transparent', color:active===i.id?theme.accent:theme.textSoft, fontWeight:active===i.id?800:700, fontSize:15, marginBottom:6, transition:'all .2s' }}>
                <Ico name={i.icon} size={20} color={active===i.id?theme.accent:theme.textSoft}/>
                {i.label}
             </div>
          ))}
       </nav>
       <div style={{ padding:24, borderTop:`1px solid ${theme.border}` }}>
          <div onClick={onToggleTheme} style={{ display:'flex', alignItems:'center', gap:12, padding:14, background:theme.bg, borderRadius:14, cursor:'pointer', border:`1px solid ${theme.border}`, marginBottom:16 }}>
             <Ico name={isDark?'sunny':'dark_mode'} size={18}/>
             <div style={{ fontSize:13, fontWeight:800 }}>{isDark?'Light':'Dark'} Mode</div>
          </div>
          <div onClick={onLogout} style={{ display:'flex', alignItems:'center', gap:12, padding:14, background:T.rose+'10', color:T.rose, borderRadius:14, cursor:'pointer', border:`1px solid ${T.rose}20` }}>
             <Ico name="logout" size={18} color={T.rose}/>
             <div style={{ fontSize:13, fontWeight:800 }}>Logout Staff</div>
          </div>
       </div>
    </div>
  );
}

function LoginGate({ onLogin, theme }) {
  const staff = window.STUDIO_OPS_USERS || [];
  return (
    <div style={{ minHeight:'100vh', display:'flex', background:theme.bg, color:theme.text }}>
       <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:60 }}>
          <div style={{ maxWidth:440, width:'100%' }}>
             <div style={{ fontSize:22, fontWeight:900, color:theme.accent, marginBottom:60, letterSpacing:'-0.03em' }}>trav STUDIO</div>
             <h1 style={{ fontSize:48, fontFamily:'Fraunces', fontWeight:800, lineHeight:1.1, marginBottom:16 }}>The Command Centre.</h1>
             <p style={{ color:theme.textSoft, fontSize:18, marginBottom:40 }}>Internal operations and supply management hub.</p>
             <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {staff.map(s => (
                  <div key={s.id} onClick={()=>onLogin(s)} style={{ display:'flex', alignItems:'center', gap:16, padding:20, borderRadius:20, background:theme.sidebar, border:`1.5px solid ${theme.border}`, cursor:'pointer', transition:'all .2s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = theme.accent}
                    onMouseLeave={e => e.currentTarget.style.borderColor = theme.border}>
                     <div style={{ width:44, height:44, borderRadius:12, background:theme.accent+'20', color:theme.accent, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:800 }}>{s.avatar}</div>
                     <div style={{ flex:1 }}><div style={{ fontWeight:800, fontSize:16 }}>{s.name}</div><div style={{ fontSize:12, color:theme.textMuted }}>{s.role.toUpperCase()}</div></div>
                     <Ico name="arrow_forward" size={18} color={theme.textMuted}/>
                  </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
}

function TravStudio() {
  const [user, setUser] = React.useState(() => studioGet('ops-user'));
  const [isDark, setIsDark] = React.useState(true);
  const [view, setView] = React.useState('dash');
  const theme = getTheme(isDark);

  const handleLogin = (u) => { setUser(u); studioSet('ops-user', u); };
  const handleLogout = () => { setUser(null); localStorage.removeItem('trav.studio.ops-user'); };

  if (!user) return <LoginGate onLogin={handleLogin} theme={theme} />;

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:theme.bg, color:theme.text, transition:'background 0.3s ease' }}>
       <Sidebar active={view} onNav={setView} isDark={isDark} onToggleTheme={()=>setIsDark(!isDark)} theme={theme} onLogout={handleLogout}/>
       <main style={{ flex:1, padding:60, maxWidth:1400, margin:'0 auto', width:'100%' }}>
          {view === 'dash' && <SectionDash theme={theme}/>}
          {view === 'requests' && <SectionRequests theme={theme}/>}
          {view === 'itineraries' && <SectionItineraries theme={theme}/>}
          {view === 'support' && <SectionSupport theme={theme}/>}
       </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TravStudio/>);
