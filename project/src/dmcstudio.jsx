// ─── DMCStudio — Supply & Fulfillment Portal ────────────────────────────────
const T = {
  green: '#1DBF73',
  greenDeep: '#0D9488',
  ink: '#0F172A',
  inkLight: '#1E293B',
  parchment: '#FDFCFB',
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
  
  .fade-in { animation: fadeIn 0.4s ease-out; }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .slide-in { animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
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
  accent: T.blue,
  accentDeep: '#1D4ED8',
});

// ── Shared UI Components ──────────────────────────────────────────────────
const Ico = ({ name, size=20, color, style }) => (
  <span className="material-symbols-rounded" style={{ fontSize:size, color:color, verticalAlign:'middle', display:'inline-block', ...style }}>{name}</span>
);

function StudioBadge({ label, color, theme }) {
  const c = color || theme.accent;
  return (
    <span style={{ display:'inline-flex', padding:'3px 10px', borderRadius:999, fontSize:10, fontWeight:800, letterSpacing:'.06em', textTransform:'uppercase', background:`${c}15`, color:c, border:`1px solid ${c}30` }}>
      {label}
    </span>
  );
}

function SCard({ children, style, onClick, theme, title }) {
  return (
    <div onClick={onClick} style={{ background:theme.card, borderRadius:20, border:`1px solid ${theme.border}`, padding:24, ...style, cursor:onClick?'pointer':'default', transition:'all .2s', position:'relative' }}
      onMouseEnter={e => { if(onClick) e.currentTarget.style.borderColor = theme.accent; }}
      onMouseLeave={e => { if(onClick) e.currentTarget.style.borderColor = theme.border; }}>
      {title && <div style={{ fontSize:10, fontWeight:800, color:theme.textMuted, letterSpacing:'.08em', marginBottom:16 }}>{title.toUpperCase()}</div>}
      {children}
    </div>
  );
}

function SBtn({ children, kind='primary', size='md', icon, onClick, theme, full, style }) {
  const bg = kind==='primary' ? theme.accent : (kind==='outline'? 'transparent' : 'rgba(0,0,0,0.05)');
  const fg = kind==='primary' ? '#fff' : theme.text;
  const bd = kind==='primary' ? theme.accent : (kind==='outline'? theme.border : 'transparent');
  return (
    <button onClick={onClick} style={{ height:size==='sm'?32:44, padding:size==='sm'?'0 12px':'0 24px', borderRadius:10, border:`1px solid ${bd}`, background:bg, color:fg, fontSize:size==='sm'?11:13, fontWeight:700, display:'inline-flex', alignItems:'center', gap:8, width:full?'100%':'auto', justifyContent:'center', cursor:'pointer', transition:'all .2s', ...style }}>
      {icon && <Ico name={icon} size={size==='sm'?16:18} color={fg}/>}
      {children}
    </button>
  );
}

// ── Sections ──────────────────────────────────────────────────────────────

function SectionDash({ dmc, theme }) {
  const deps = (studioGet('departures') || []).filter(d => d.dmcId === dmc.id);
  const bookings = studioGet('bookings') || [];
  const activeTravelers = deps.reduce((sum, d) => sum + d.spotsConfirmed, 0);

  return (
    <div className="fade-in">
       <h1 style={{ fontSize:42, fontWeight:800, fontFamily:'Fraunces', marginBottom:8, color:theme.text }}>Ops Hub: {dmc.name}</h1>
       <p style={{ color:theme.textSoft, fontSize:16, marginBottom:40 }}>Managing {deps.length} active departures and {activeTravelers} travelers.</p>
       
       <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:24, marginBottom:48 }}>
          {[
            {label:'Departures', val:deps.length, icon:'flights_and_hotels', col:theme.accent},
            {label:'Total Travelers', val:activeTravelers, icon:'group', col:T.purple},
            {label:'Logistics Status', val:'On Track', icon:'verified', col:T.greenDeep},
            {label:'Pending Briefs', val:'2', icon:'quick_reference_all', col:T.amber}
          ].map(k => (
            <SCard key={k.label} theme={theme} style={{ padding:24 }}>
               <div style={{ width:40, height:40, borderRadius:12, background:`${k.col}15`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16 }}><Ico name={k.icon} size={20} color={k.col}/></div>
               <div style={{ fontSize:28, fontWeight:800 }}>{k.val}</div>
               <div style={{ fontSize:10, fontWeight:800, color:theme.textMuted, textTransform:'uppercase', letterSpacing:'.08em' }}>{k.label}</div>
            </SCard>
          ))}
       </div>

       <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:24 }}>
          <SCard theme={theme} title="Upcoming Launches">
             <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {deps.map(d => (
                  <div key={d.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:16, background:theme.bg, borderRadius:12, border:`1px solid ${theme.border}` }}>
                     <div>
                        <div style={{ fontSize:15, fontWeight:800 }}>{d.dest}</div>
                        <div style={{ fontSize:12, color:theme.textMuted }}>{d.date}</div>
                     </div>
                     <StudioBadge label={d.status} color={d.status==='on-track'?T.green:T.rose} theme={theme}/>
                  </div>
                ))}
             </div>
          </SCard>
          <SCard theme={theme} title="Supply Alert">
             <div style={{ textAlign:'center', padding:'20px 0' }}>
                <Ico name="notifications_active" size={32} color={T.amber} style={{ marginBottom:12 }}/>
                <div style={{ fontSize:14, fontWeight:700 }}>2 Room Blocks Expiring</div>
                <div style={{ fontSize:12, color:theme.textMuted, marginTop:4 }}>Bhutan Heritage Hill, Paro</div>
             </div>
          </SCard>
       </div>
    </div>
  );
}

function SectionDepartures({ dmc, theme }) {
  const deps = (studioGet('departures') || []).filter(d => d.dmcId === dmc.id);
  const bookings = studioGet('bookings') || [];
  const [selected, setSelected] = React.useState(null);

  return (
    <div className="fade-in">
       <div style={{ marginBottom:32 }}>
          <h2 style={{ fontSize:28, fontWeight:800, fontFamily:'Fraunces', color:theme.text }}>Departures Portfolio</h2>
          <p style={{ color:theme.textSoft }}>High-fidelity manifest management for fulfillment partners.</p>
       </div>

       <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(380px, 1fr))', gap:24 }}>
          {deps.map(d => (
            <SCard key={d.id} theme={theme} onClick={()=>setSelected(d)}>
               <div style={{ display:'flex', justifyContent:'space-between', marginBottom:16 }}>
                  <StudioBadge label={d.status} color={d.status==='on-track'?T.green:T.rose} theme={theme}/>
                  <div style={{ fontSize:12, fontWeight:700, color:theme.textSoft }}>{d.spotsConfirmed}/{d.spotsTotal} PAX</div>
               </div>
               <div style={{ fontSize:20, fontWeight:800, fontFamily:'Fraunces', marginBottom:4 }}>{d.dest}</div>
               <div style={{ fontSize:13, color:theme.textMuted, marginBottom:20 }}>{d.date}</div>
               
               <div style={{ display:'flex', gap:8, borderTop:`1px solid ${theme.border}`, paddingTop:16 }}>
                  <div style={{ flex:1, fontSize:10, fontWeight:800, color:theme.textMuted }}>HOTEL: <span style={{ color:d.supplyStatus.hotel==='confirmed'?T.green:T.rose }}>{d.supplyStatus.hotel.toUpperCase()}</span></div>
                  <div style={{ flex:1, fontSize:10, fontWeight:800, color:theme.textMuted }}>TRANS: <span style={{ color:d.supplyStatus.transport==='confirmed'?T.green:T.rose }}>{d.supplyStatus.transport.toUpperCase()}</span></div>
               </div>
            </SCard>
          ))}
       </div>

       {selected && <ManifestDrawer dep={selected} bookings={bookings.filter(b => b.depId === selected.id)} onClose={()=>setSelected(null)} theme={theme} />}
    </div>
  );
}

function ManifestDrawer({ dep, bookings, onClose, theme }) {
  return (
    <div style={{ position:'fixed', inset:0, zIndex:1000, display:'flex', justifyContent:'flex-end' }}>
       <div style={{ position:'absolute', inset:0, background:'rgba(15,23,42,0.4)', backdropFilter:'blur(8px)' }} onClick={onClose} />
       <div className="slide-in" style={{ width:700, background:theme.bg, height:'100vh', position:'relative', boxShadow:'-20px 0 60px rgba(0,0,0,0.2)', display:'flex', flexDirection:'column' }}>
          <div style={{ padding:32, borderBottom:`1px solid ${theme.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
             <div>
                <h3 style={{ fontSize:24, fontWeight:800, fontFamily:'Fraunces' }}>{dep.dest} Manifest</h3>
                <div style={{ fontSize:13, color:theme.textMuted }}>{dep.date} · {bookings.length} Confirmed Guests</div>
             </div>
             <button onClick={onClose} style={{ background:theme.sidebar, border:'none', width:40, height:40, borderRadius:'50%', cursor:'pointer' }}><Ico name="close" /></button>
          </div>

          <div style={{ flex:1, overflowY:'auto', padding:32 }}>
             <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead>
                   <tr style={{ textAlign:'left', borderBottom:`2px solid ${theme.border}` }}>
                      <th style={{ padding:'12px 8px', fontSize:11, fontWeight:800, color:theme.textMuted }}>GUEST</th>
                      <th style={{ padding:'12px 8px', fontSize:11, fontWeight:800, color:theme.textMuted }}>INFO</th>
                      <th style={{ padding:'12px 8px', fontSize:11, fontWeight:800, color:theme.textMuted }}>ROOMING</th>
                      <th style={{ padding:'12px 8px', fontSize:11, fontWeight:800, color:theme.textMuted }}>STATUS</th>
                      <th style={{ padding:'12px 8px' }}></th>
                   </tr>
                </thead>
                <tbody>
                   {bookings.map(b => (
                     <tr key={b.id} style={{ borderBottom:`1px solid ${theme.border}` }}>
                        <td style={{ padding:20, verticalAlign:'top' }}>
                           <div style={{ fontWeight:800, fontSize:14 }}>{b.name}</div>
                           <div style={{ fontSize:12, color:theme.textMuted }}>{b.gender}, {b.age}y</div>
                        </td>
                        <td style={{ padding:20, verticalAlign:'top' }}>
                           <div style={{ fontSize:11, fontWeight:700, color:theme.textMuted }}>MEAL</div>
                           <div style={{ fontSize:12, fontWeight:600 }}>{b.meal}</div>
                        </td>
                        <td style={{ padding:20, verticalAlign:'top' }}>
                           <div style={{ fontSize:12, fontWeight:700 }}>{b.room}</div>
                        </td>
                        <td style={{ padding:20, verticalAlign:'top' }}>
                           <StudioBadge label={b.payment} color={b.payment==='paid'?T.green:T.amber} theme={theme}/>
                        </td>
                        <td style={{ padding:20, textAlign:'right' }}>
                           <a href={`https://wa.me/${b.phone.replace(/\+/g,'')}`} target="_blank" style={{ textDecoration:'none' }}>
                             <SBtn theme={theme} kind="ghost" size="sm" icon="chat">WhatsApp</SBtn>
                           </a>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>
    </div>
  );
}

// ── Sidebar & Navigation ──────────────────────────────────────────────────
function Sidebar({ active, onNav, dmc, isDark, onToggleTheme, theme, onLogout }) {
  const MENU = [
    { id:'dash', label:'Ops Hub', icon:'bolt' },
    { id:'departures', label:'Departures', icon:'flights_and_hotels' },
    { id:'briefs', label:'Assignments', icon:'assignment' },
    { id:'supply', label:'Supply Registry', icon:'inventory' },
  ];
  return (
    <div style={{ width:280, background:theme.sidebar, borderRight:`1px solid ${theme.border}`, height:'100vh', display:'flex', flexDirection:'column', padding:40, position:'sticky', top:0 }}>
       <div style={{ fontSize:22, fontWeight:900, color:theme.accent, marginBottom:60, letterSpacing:'-0.03em' }}>trav STUDIO</div>
       <nav style={{ flex:1 }}>
          {MENU.map(i => (
             <div key={i.id} onClick={()=>onNav(i.id)} style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 20px', borderRadius:14, cursor:'pointer', background:active===i.id?`${theme.accent}15`:'transparent', color:active===i.id?theme.accent:theme.textSoft, fontWeight:active===i.id?800:700, fontSize:15, marginBottom:6 }}>
                <Ico name={i.icon} size={20} color={active===i.id?theme.accent:theme.textSoft}/>
                {i.label}
             </div>
          ))}
       </nav>
       <div style={{ borderTop:`1.5px solid ${theme.border}`, paddingTop:32 }}>
          <div onClick={onToggleTheme} style={{ display:'flex', alignItems:'center', gap:10, padding:14, background:theme.bg, borderRadius:12, cursor:'pointer', marginBottom:24, border:`1px solid ${theme.border}` }}>
             <Ico name={isDark?'sunny':'dark_mode'} size={14}/>
             <div style={{ fontSize:12, fontWeight:800 }}>{isDark?'Light':'Dark'} Mode</div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
             <div style={{ width:44, height:44, borderRadius:14, background:theme.accent+'20', color:theme.accent, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:800 }}>{dmc.name[0]}</div>
             <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:800 }}>{dmc.name.split(' ')[0]}</div>
                <div onClick={onLogout} style={{ fontSize:11, color:T.rose, fontWeight:700, cursor:'pointer' }}>LOGOUT</div>
             </div>
          </div>
       </div>
    </div>
  );
}

function SectionBriefs({ dmc, theme }) {
  return (
    <div className="fade-in">
       <h2 style={{ fontSize:28, fontWeight:800, fontFamily:'Fraunces', marginBottom:32 }}>Ground Briefs</h2>
       <div style={{ padding:80, textAlign:'center', border:`1.5px dashed ${theme.border}`, borderRadius:24, color:theme.textMuted }}>No active briefs assigned. You're all caught up!</div>
    </div>
  );
}

function LoginGate({ onLogin, theme }) {
  const partners = window.STUDIO_DMCS || [];
  return (
    <div style={{ minHeight:'100vh', display:'flex', background:theme.bg, color:theme.text }}>
       <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:60 }}>
          <div style={{ maxWidth:440, width:'100%' }}>
             <div style={{ fontSize:22, fontWeight:900, color:theme.accent, marginBottom:60, letterSpacing:'-0.03em' }}>trav STUDIO</div>
             <h1 style={{ fontSize:48, fontFamily:'Fraunces', fontWeight:800, lineHeight:1.1, marginBottom:16 }}>Fulfill the journey.</h1>
             <p style={{ color:theme.textSoft, fontSize:18, marginBottom:40 }}>The enterprise portal for our ground-ops and supply partners.</p>
             <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {partners.map(d => (
                  <div key={d.id} onClick={()=>onLogin(d)} style={{ display:'flex', alignItems:'center', gap:16, padding:20, borderRadius:20, background:theme.sidebar, border:`1.5px solid ${theme.border}`, cursor:'pointer', transition:'all .2s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = theme.accent}
                    onMouseLeave={e => e.currentTarget.style.borderColor = theme.border}>
                     <div style={{ width:44, height:44, borderRadius:12, background:theme.accent+'20', color:theme.accent, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:800 }}>{d.name[0]}</div>
                     <div style={{ flex:1 }}><div style={{ fontWeight:800, fontSize:16 }}>{d.name}</div><div style={{ fontSize:12, color:theme.textMuted }}>DMC PARTNER · {d.serviceAreas?.join(', ')}</div></div>
                     <Ico name="arrow_forward" size={18} color={theme.textMuted}/>
                  </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
}

function DMCStudio() {
  const [user, setUser] = React.useState(() => studioGet('dmc'));
  const [isDark, setIsDark] = React.useState(true);
  const [view, setView] = React.useState('dash');
  const theme = getTheme(isDark);

  const handleLogin = (u) => { setUser(u); studioSet('dmc', u); };
  const handleLogout = () => { setUser(null); localStorage.removeItem('trav.studio.dmc'); };

  if (!user) return <LoginGate onLogin={handleLogin} theme={theme} />;

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:theme.bg, color:theme.text }}>
       <Sidebar active={view} onNav={setView} dmc={user} isDark={isDark} onToggleTheme={()=>setIsDark(!isDark)} theme={theme} onLogout={handleLogout}/>
       <main style={{ flex:1, padding:60, overflowY:'auto', maxWidth:1240, margin:'0 auto' }}>
          {view === 'dash' && <SectionDash dmc={user} theme={theme}/>}
          {view === 'departures' && <SectionDepartures dmc={user} theme={theme}/>}
          {view === 'briefs' && <SectionBriefs dmc={user} theme={theme}/>}
          {view === 'supply' && <div className="fade-in"><h1 style={{ fontFamily:'Fraunces' }}>Supply Registry</h1></div>}
       </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<DMCStudio/>);
