// ─── CreatorStudio — Curation & Community Hub ───────────────────────────────
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

  input, textarea { outline: none; }
  ::placeholder { color: rgba(15,23,42,0.3); }
  
  .scroll-hide::-webkit-scrollbar { display: none; }
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
    <button onClick={onClick} style={{ height:size==='sm'?32:44, padding:size==='sm'?'0 12px':'0 28px', borderRadius:10, border:`1px solid ${bd}`, background:bg, color:fg, fontSize:size==='sm'?11:13, fontWeight:700, display:'inline-flex', alignItems:'center', gap:8, width:full?'100%':'auto', justifyContent:'center', cursor:'pointer', transition:'all .2s', ...style }}>
      {icon && <Ico name={icon} size={size==='sm'?16:18} color={fg}/>}
      {children}
    </button>
  );
}

// ── Sections ──────────────────────────────────────────────────────────────

// 1. Stories Portfolio
function SectionStories({ creator, theme }) {
  const [items, setItems] = React.useState(studioGet('stories') || []);
  const [editing, setEditing] = React.useState(null);

  const handleSave = (story) => {
    const isNew = !story.id;
    const item = isNew ? { ...story, id: 'story-' + Date.now(), author: { name: creator.name, handle: creator.handle, initials: creator.name[0] }, date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }), status: 'draft' } : story;
    const updated = isNew ? [item, ...items] : items.map(i => i.id === item.id ? item : i);
    setItems(updated); studioSet('stories', updated); setEditing(null);
  };

  if (editing) return <StoryBuilder story={editing} onSave={handleSave} onBack={() => setEditing(null)} theme={theme} />;

  return (
    <div className="fade-in">
       <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32 }}>
          <div>
             <h2 style={{ fontSize:28, fontWeight:800, fontFamily:'Fraunces', color:theme.text }}>Travelogues</h2>
             <p style={{ color:theme.textSoft }}>Manage your stories and photo journals.</p>
          </div>
          <SBtn theme={theme} icon="add" onClick={()=>setEditing({})}>Create New Story</SBtn>
       </div>

       <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:24 }}>
          {items.map(story => (
            <SCard key={story.id} theme={theme} onClick={()=>setEditing(story)}>
               <div style={{ position:'relative', height:180, borderRadius:12, overflow:'hidden', background:`url(${story.hero?.src}) center/cover`, marginBottom:16 }}>
                  <div style={{ position:'absolute', top:12, right:12 }}><StudioBadge label={story.status} color={story.status==='published'?T.green:T.amber} theme={theme}/></div>
               </div>
               <div style={{ fontSize:15, fontWeight:800, color:theme.textMuted, marginBottom:6 }}>{story.category?.toUpperCase() || 'ADVENTURE'}</div>
               <div style={{ fontSize:18, fontWeight:800, fontFamily:'Fraunces', lineHeight:1.3 }}>{story.title || 'Untitled Story'}</div>
               <div style={{ fontSize:12, color:theme.textMuted, marginTop:12 }}>{story.date} · {story.readMin || 0} min read</div>
            </SCard>
          ))}
          {items.length === 0 && <div style={{ gridColumn:'1/-1', padding:80, textAlign:'center', border:`1.5px dashed ${theme.border}`, borderRadius:24, color:theme.textMuted }}>Your portfolio is empty. Start writing your first travelogue.</div>}
       </div>
    </div>
  );
}

// 2. High-Fidelity Editorial Wizard
function StoryBuilder({ story, onSave, onBack, theme }) {
  const [activeTab, setActiveTab] = React.useState('narrative');
  
  const defaults = {
    title: '', dek: '', intro: [''], bodyParas: [''], sectionTitle: '',
    category: 'Adventure', readMin: 5,
    hero: { src: '', tone: '#2b6a8a', label: '' },
    pullQuote1: '', pullQuote2: '',
    experiences: [{ title: '', icon: 'star', body: '' }],
    budget: [{ icon: 'bed', label: 'Accommodation', amount: 0 }],
    notes: [{ title: 'Safety', icon: 'shield', body: '' }],
    gallery: [], videos: [], relatedTripIds: []
  };

  const [data, setData] = React.useState(() => ({...defaults, ...story}));

  const update = (merge) => setData(prev => ({...prev, ...merge}));

  return (
    <div className="fade-in">
       {/* Wizard Header */}
       <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:32 }}>
          <SBtn theme={theme} kind="outline" size="sm" icon="arrow_back" onClick={onBack}>Exit</SBtn>
          <div style={{ display:'flex', gap:8, background:theme.sidebar, padding:6, borderRadius:14, border:`1px solid ${theme.border}` }}>
             {['narrative', 'intel', 'media', 'publish'].map(t => (
               <div key={t} onClick={()=>setActiveTab(t)} style={{ padding:'8px 16px', borderRadius:10, fontSize:12, fontWeight:800, cursor:'pointer', background:activeTab===t?theme.accent:'transparent', color:activeTab===t?'#fff':theme.textSoft, textTransform:'uppercase', letterSpacing:'.05em' }}>
                  {t}
               </div>
             ))}
          </div>
          <div style={{ marginLeft:'auto' }}>
             <SBtn theme={theme} icon="publish" onClick={()=>onSave({...data, status:'published'})}>Publish Story</SBtn>
          </div>
       </div>

       <div style={{ maxWidth:800, margin:'0 auto' }}>
          {activeTab === 'narrative' && (
            <div className="fade-in" style={{ display:'flex', flexDirection:'column', gap:32 }}>
               <SCard theme={theme} title="Cover & Hook">
                  <input style={{ width:'100%', fontSize:28, fontWeight:800, fontFamily:'Fraunces', border:'none', background:'transparent', color:theme.text, marginBottom:16 }} placeholder="Main Chapter Title" value={data.title} onChange={e=>update({title:e.target.value})}/>
                  <textarea style={{ width:'100%', fontSize:16, color:theme.textSoft, border:'none', background:'transparent', lineHeight:1.5, resize:'none' }} placeholder="Dek: The hook that defines the vibe of this trip..." value={data.dek} onChange={e=>update({dek:e.target.value})}/>
               </SCard>
               <SCard theme={theme} title="The Opening">
                  <textarea style={{ width:'100%', minHeight:150, padding:20, background:theme.bg, border:`1px solid ${theme.border}`, borderRadius:16, fontSize:14, lineHeight:1.8 }} placeholder="Begin your journey here... Describe the first feeling of arriving." value={data.intro[0]} onChange={e=>update({intro:[e.target.value]})}/>
               </SCard>
               <SCard theme={theme} title="Editorial Pull-Quote">
                  <input style={{ width:'100%', fontSize:18, fontWeight:800, fontStyle:'italic', fontFamily:'Fraunces', border:'none', borderLeft: `4px solid ${theme.accent}`, paddingLeft:20, background:'transparent' }} placeholder="A sentence that stays with the reader..." value={data.pullQuote1} onChange={e=>update({pullQuote1:e.target.value})}/>
               </SCard>
            </div>
          )}

          {activeTab === 'intel' && (
            <div className="fade-in" style={{ display:'flex', flexDirection:'column', gap:32 }}>
               <SCard theme={theme} title="Featured Experiences">
                  {data.experiences.map((exp, i) => (
                    <div key={i} style={{ padding:20, background:theme.bg, borderRadius:16, marginBottom:12, border:`1px solid ${theme.border}` }}>
                       <div style={{ display:'flex', gap:12, marginBottom:10 }}>
                          <input style={{ width:100, fontWeight:700, fontSize:12 }} value={exp.icon} onChange={e=>{ let ex=[...data.experiences]; ex[i].icon=e.target.value; update({experiences:ex}); }} placeholder="Icon Code"/>
                          <input style={{ flex:1, fontWeight:800, fontSize:15 }} value={exp.title} onChange={e=>{ let ex=[...data.experiences]; ex[i].title=e.target.value; update({experiences:ex}); }} placeholder="Experience Title"/>
                       </div>
                       <textarea style={{ width:'100%', border:'none', background:'transparent', fontSize:13, lineHeight:1.6 }} placeholder="What makes this special?" value={exp.body} onChange={e=>{ let ex=[...data.experiences]; ex[i].body=e.target.value; update({experiences:ex}); }}/>
                    </div>
                  ))}
                  <SBtn theme={theme} kind="ghost" size="sm" icon="add" onClick={()=>update({experiences:[...data.experiences, {title:'', icon:'star', body:''}]})}>Add Experience</SBtn>
               </SCard>
               <SCard theme={theme} title="Cost Breakdown (Budget)">
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                     {data.budget.map((b, i) => (
                       <div key={i} style={{ display:'flex', gap:10, alignItems:'center', background:theme.bg, padding:12, borderRadius:12 }}>
                          <input style={{ flex:1, fontWeight:700, fontSize:12 }} value={b.label} onChange={e=>{ let bg=[...data.budget]; bg[i].label=e.target.value; update({budget:bg}); }}/>
                          <input type="number" style={{ width:80, fontWeight:800, textAlign:'right' }} value={b.amount} onChange={e=>{ let bg=[...data.budget]; bg[i].amount=parseInt(e.target.value)||0; update({budget:bg}); }}/>
                       </div>
                     ))}
                  </div>
               </SCard>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="fade-in" style={{ display:'flex', flexDirection:'column', gap:32 }}>
               <SCard theme={theme} title="Hero Media">
                  <input style={{ width:'100%', padding:12, background:theme.bg, border:`1px solid ${theme.border}`, borderRadius:10, marginBottom:12 }} placeholder="Hero Image URL" value={data.hero.src} onChange={e=>update({hero:{...data.hero, src:e.target.value}})}/>
               </SCard>
               <SCard theme={theme} title="Captured Moments (Gallery)">
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12 }}>
                     {data.gallery.map((img, i) => (
                       <div key={i} style={{ aspectRatio:'1/1', background:`url(${img.src}) center/cover`, borderRadius:12, border:`2px solid ${theme.border}` }} />
                     ))}
                     <div style={{ aspectRatio:'1/1', border:`2px dashed ${theme.border}`, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}><Ico name="add" color={theme.textMuted}/></div>
                  </div>
               </SCard>
               <SCard theme={theme} title="Video Reels Sync">
                   <p style={{ fontSize:12, color:theme.textMuted, marginBottom:16 }}>Link Instagram or YouTube reels for immersive social proof.</p>
                   <SBtn theme={theme} kind="outline" size="sm" icon="link">Link Social Content</SBtn>
               </SCard>
            </div>
          )}

          {activeTab === 'publish' && (
            <div className="fade-in">
               <SCard theme={theme} style={{ textAlign:'center', padding:60 }}>
                  <Ico name="auto_awesome" size={48} color={theme.accent} style={{ marginBottom:20 }}/>
                  <h3 style={{ fontSize:24, fontWeight:800, fontFamily:'Fraunces', marginBottom:8 }}>Ready to curate?</h3>
                  <p style={{ fontSize:14, color:theme.textSoft, marginBottom:32 }}>Your story is schema-compliant. Publishing will make it visible in the Travelogue Index.</p>
                  <SBtn theme={theme} icon="publish" size="lg" onClick={()=>onSave({...data, status:'published'})}>Publish Production</SBtn>
               </SCard>
            </div>
          )}
       </div>
    </div>
  );
}

// 3. Main Shell & Onboarding Logic
const STUDIO_CREATORS = [
  { id:'c1', name:'Meher Wanders', handle:'@meher', companions:['adventure','solo-female'], followers:'4.2k', rating:'4.8', trips:6 },
  { id:'c2', name:'Sudarrshan Bajaj', handle:'@sudarrshan', companions:['slow-travel','food'], followers:'12k', rating:'4.9', trips:12 },
  { id:'c4', name:'Dharna', handle:'@dharna', companions:['sustainable','culture'], followers:'8k', rating:'4.7', trips:4 }
];

function CreatorStudio() {
  const [user, setUser] = React.useState(() => studioGet('creator'));
  const [isDark, setIsDark] = React.useState(true);
  const [view, setView] = React.useState('dash');
  const theme = getTheme(isDark);

  const handleLogin = (u) => { setUser(u); studioSet('creator', u); };
  const handleLogout = () => { setUser(null); localStorage.removeItem('trav.studio.creator'); };

  if (!user) return <LoginGate onLogin={handleLogin} theme={theme} />;

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:theme.bg, color:theme.text }}>
       <Sidebar active={view} onNav={setView} creator={user} isDark={isDark} onToggleTheme={()=>setIsDark(!isDark)} theme={theme} onLogout={handleLogout}/>
       <main style={{ flex:1, padding:60, overflowY:'auto', maxWidth:1200, margin:'0 auto' }}>
          {view === 'dash' && <SectionDash creator={user} theme={theme}/>}
          {view === 'stories' && <SectionStories creator={user} theme={theme}/>}
          {view === 'tasks' && <SectionTasks creator={user} theme={theme}/>}
          {view === 'propose' && <SectionPropose creator={user} theme={theme}/>}
       </main>
    </div>
  );
}

function SectionDash({ creator, theme }) {
  return (
    <div className="fade-in">
       <h1 style={{ fontSize:42, fontWeight:800, fontFamily:'Fraunces', marginBottom:8 }}>Hello, {creator.name.split(' ')[0]}</h1>
       <p style={{ color:theme.textSoft, fontSize:16, marginBottom:40 }}>You have {creator.trips} live trips and active stories in the works.</p>
       
       <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:24, marginBottom:60 }}>
          {[{label:'Followers', val:creator.followers, icon:'groups', col:theme.accent}, {label:'Rating', val:creator.rating, icon:'star', col:T.amber}, {label:'Stories', val:'12', icon:'history_edu', col:T.purple}, {label:'Earnings', val:inr(28400), icon:'payments', col:T.greenDeep}].map(k => (
            <SCard key={k.label} theme={theme} style={{ padding:24 }}>
               <div style={{ width:40, height:40, borderRadius:12, background:`${k.col}15`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16 }}><Ico name={k.icon} size={20} color={k.col}/></div>
               <div style={{ fontSize:28, fontWeight:800 }}>{k.val}</div>
               <div style={{ fontSize:10, fontWeight:800, color:theme.textMuted, textTransform:'uppercase', letterSpacing:'.08em' }}>{k.label}</div>
            </SCard>
          ))}
       </div>

       <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:24 }}>
          <SCard theme={theme} title="Quick Actions">
             <div style={{ display:'flex', gap:12 }}>
                <SBtn theme={theme} kind="outline" full icon="history_edu" onClick={()=>window.location.hash='#stories'}>Draft Story</SBtn>
                <SBtn theme={theme} kind="outline" full icon="map" onClick={()=>window.location.hash='#propose'}>Propose Trip</SBtn>
             </div>
          </SCard>
       </div>
    </div>
  );
}

function Sidebar({ active, onNav, creator, isDark, onToggleTheme, theme, onLogout }) {
  const MENU = [
    { id:'dash', label:'Overview', icon:'bolt' },
    { id:'stories', label:'Travelogues', icon:'history_edu' },
    { id:'tasks', label:'Briefs Log', icon:'send' },
    { id:'propose', label:'New Proposal', icon:'edit' },
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
             <div style={{ width:44, height:44, borderRadius:14, background:T.purple+'20', color:T.purple, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:800 }}>{creator.name[0]}</div>
             <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:800 }}>{creator.name.split(' ')[0]}</div>
                <div onClick={onLogout} style={{ fontSize:11, color:T.rose, fontWeight:700, cursor:'pointer' }}>LOGOUT</div>
             </div>
          </div>
       </div>
    </div>
  );
}

function SectionTasks({ creator, theme }) {
  return (
    <div className="fade-in">
       <h2 style={{ fontSize:28, fontWeight:800, fontFamily:'Fraunces', marginBottom:32 }}>Inbound Briefs</h2>
       <div style={{ padding:80, textAlign:'center', border:`1.5px dashed ${theme.border}`, borderRadius:24, color:theme.textMuted }}>No active briefs assigned. You're all caught up!</div>
    </div>
  );
}

function SectionPropose({ creator, theme }) {
  return (
    <div className="fade-in">
       <SCard theme={theme} style={{ maxWidth:600, margin:'0 auto' }} title="Raise Trip Proposal">
          <p style={{ fontSize:14, color:theme.textSoft, marginBottom:24 }}>Draft a new trip concept for feasibility review.</p>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
             <input style={{ width:'100%', height:44, borderRadius:12, border:`1px solid ${theme.border}`, background:theme.bg, color:theme.text, padding:'0 16px' }} placeholder="Trip Concept Title"/>
             <textarea style={{ width:'100%', minHeight:120, borderRadius:12, border:`1px solid ${theme.border}`, background:theme.bg, color:theme.text, padding:16 }} placeholder="Describe the soul of this journey..."/>
             <SBtn theme={theme} full icon="send">Submit to Ops</SBtn>
          </div>
       </SCard>
    </div>
  );
}

function LoginGate({ onLogin, theme }) {
  return (
    <div style={{ minHeight:'100vh', display:'flex', background:theme.bg, color:theme.text }}>
       <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:60 }}>
          <div style={{ maxWidth:440, width:'100%' }}>
             <div style={{ fontSize:22, fontWeight:900, color:theme.accent, marginBottom:60 }}>trav STUDIO</div>
             <h1 style={{ fontSize:48, fontFamily:'Fraunces', fontWeight:800, lineHeight:1.1, marginBottom:16 }}>Write the road.</h1>
             <p style={{ color:theme.textSoft, fontSize:18, marginBottom:40 }}>The editorial engine for India's best storytellers.</p>
             <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {(window.STUDIO_CREATORS || []).map(c => (
                  <div key={c.id} onClick={()=>onLogin(c)} style={{ display:'flex', alignItems:'center', gap:16, padding:20, borderRadius:20, background:theme.sidebar, border:`1.5px solid ${theme.border}`, cursor:'pointer', transition:'all .2s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = theme.accent}
                    onMouseLeave={e => e.currentTarget.style.borderColor = theme.border}>
                     <div style={{ width:44, height:44, borderRadius:12, background:T.purple+'20', color:T.purple, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:800 }}>{c.name[0]}</div>
                     <div style={{ flex:1 }}><div style={{ fontWeight:800, fontSize:16 }}>{c.name}</div><div style={{ fontSize:12, color:theme.textMuted }}>{c.handle}</div></div>
                     <Ico name="arrow_forward" size={18} color={theme.textMuted}/>
                  </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CreatorStudio/>);
