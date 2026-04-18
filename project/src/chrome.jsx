function Nav({ onLogo, onDrop, active='destinations', loggedIn, onLogin, onProfile, onTravHer, onTravelogue, theme='light', onToggleTheme }) {
  const isMobile = useIsMobile();
  const isDark = theme==='dark';
  const navBg = isDark ? 'rgba(10,10,10,.85)' : '#fff';
  const border = isDark ? 'rgba(255,255,255,.08)' : T.greyLight;
  const textPri = isDark ? 'rgba(255,255,255,.92)' : T.ink;
  const textSec = isDark ? 'rgba(255,255,255,.58)' : T.grey;
  
  const isDrop = active === 'thursday-drop';
  
  return (
    <div className="safe-top" style={{ 
      height:isMobile ? 56 : 64, 
      background:navBg, 
      borderBottom:`1px solid ${border}`, 
      backdropFilter:'blur(10px)', 
      WebkitBackdropFilter:'blur(10px)', 
      display:'flex', 
      alignItems:'center', 
      padding:`0 ${isMobile?16:36}px`, 
      gap:isMobile?14:30, 
      position:'sticky', 
      top:0, 
      zIndex:20 
    }}>
      <div onClick={onDrop || onLogo} style={{ display:'flex', alignItems:'center', gap:4, cursor:'pointer' }}>
        <span style={{ fontSize:isMobile?20:21, fontWeight:800, color:isDark?'#fff':T.ink, letterSpacing:'-.02em', fontFamily:'Fraunces, serif' }}>
          {isDrop ? 'Thursday Drop' : 'trav'}
        </span>
        {!isDrop && <span style={{ width:6, height:6, background:T.green, borderRadius:2, marginBottom:4 }}/>}
      </div>
      {!isMobile && (
        <div style={{ display:'flex', gap:26, marginLeft:isDrop?40:0 }}>
          {isDrop ? (
            <>
              <span onClick={onLogo} style={{ fontSize:14, fontWeight:500, color:textPri, cursor:'pointer' }}>Trips</span>
              <span onClick={onTravHer} style={{ fontSize:14, fontWeight:700, color:T.rose, cursor:'pointer' }}>trav.her</span>
              <span style={{ fontSize:14, fontWeight:500, color:textPri, cursor:'pointer' }}>Community</span>
              <span onClick={onTravelogue} style={{ fontSize:14, fontWeight:500, color:textPri, cursor:'pointer' }}>Journal</span>
            </>
          ) : (
            [{id:'destinations',label:'Destinations'},{id:'travelogue',label:'Travelogue'},{id:'travher',label:'trav.her'}].map(l => {
              const a = active===l.id;
              const clr = l.id==='travher' ? T.rose : (a ? (isDark?'#fff':T.greenDeep) : textPri);
              const bb = l.id==='travher' && a ? `2px solid ${T.rose}` : (a?`2px solid ${isDark?T.green:T.greenDeep}`:'2px solid transparent');
              const onC = l.id==='travher' ? onTravHer : (l.id==='travelogue' ? onTravelogue : undefined);
              return <span key={l.id} onClick={onC} style={{ fontSize:14, fontWeight:a||l.id==='travher'?700:500, color:clr, borderBottom:bb, paddingBottom:3, cursor:'pointer' }}>{l.label}</span>;
            })
          )}
        </div>
      )}
      <div style={{ flex:1 }}/>
      {!isMobile && (
        <div style={{ display:'flex', alignItems:'center', gap:20 }}>
          <span onClick={()=>{window.openFaq&&window.openFaq();}} style={{ fontSize:14, fontWeight:600, color:textPri, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:4, padding:'4px 10px', borderRadius:999, background:isDark?'rgba(255,255,255,.05)':'#F4F6FA' }}>
            FAQ <Ico name="arrow-right" size={12}/>
          </span>
          <span style={{ fontSize:14, fontWeight:600, color:isDark?T.green:T.greenDeep, cursor:'pointer' }}>Weekend Trips</span>
        </div>
      )}
      <div className="mobile-hide" style={{ display:'flex', alignItems:'center', gap:20 }}>
        <button onClick={onToggleTheme} aria-label="Toggle theme" title={isDark?'Switch to light':'Switch to dark'} style={{ width:isMobile?34:38, height:isMobile?34:38, borderRadius:'50%', background:'transparent', border:`1px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', padding:0 }}>
          <Ico name={isDark?'sun':'moon'} size={isMobile?15:16} color={textPri} stroke={2}/>
        </button>
        {loggedIn ? (
          <div onClick={onProfile} style={{ display:'flex', alignItems:'center', gap:isMobile?6:10, cursor:'pointer', padding:isMobile?'4px 8px 4px 4px':'6px 12px 6px 6px', borderRadius:999, border:`1px solid ${border}` }}>
            <div style={{ width:isMobile?26:30, height:isMobile?26:30, borderRadius:'50%', background:`linear-gradient(135deg, ${T.green}, ${T.greenDeep})`, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:isMobile?10:11, fontWeight:700 }}>AR</div>
            <span style={{ fontSize:13, fontWeight:600, color:textPri }}>Aditi</span>
            <Ico name="chevron-down" size={12} color={textSec}/>
          </div>
        ) : (
          <button onClick={onLogin} style={{ height:isMobile?36:40, padding:isMobile?'0 14px':'0 22px', borderRadius:999, background:'transparent', color:isDark?T.green:T.greenDeep, border:`1.5px solid ${isDark?T.green:T.greenDeep}`, fontSize:isMobile?12.5:14, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Login</button>
        )}
      </div>
    </div>
  );
}

function Footer({ onTravelogue, onInvestor, onSupport, onAbout, onTravCoins }) {
  const cols = [
    { h:'Explore', items:[{label:'Destinations'},{label:'Weekend Trips'},{label:'Travelogue', onClick:onTravelogue},{label:'Trav Coins · Rewards', onClick:onTravCoins, gold:true}] },
    { h:'Company', items:[{label:'About us', onClick:onAbout},{label:'trav.her', highlight:true},{label:'For Creators'},{label:'Investors', onClick:onInvestor},{label:'Support', onClick:onSupport},{label:'FAQ', onClick:()=>window.openFaq&&window.openFaq()}] },
  ];
  return (
    <div style={{ background:'#fff', borderTop:`1px solid ${T.greyLight}`, padding:'56px 36px 24px', marginTop:60 }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1.3fr 1fr 1fr 1.3fr', gap:40 }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:4, marginBottom:16 }}>
            <span style={{ fontSize:22, fontWeight:800, color:T.greenDark, letterSpacing:'-.03em', fontFamily:'Fraunces, serif' }}>trav</span>
            <span style={{ width:6, height:6, background:T.green, borderRadius:2, marginBottom:4 }}/>
          </div>
          <div style={{ fontSize:13, color:T.grey, lineHeight:1.6, maxWidth:260 }}>Curating the best weekend experiences across India since 2024. No leaves, just life.</div>
          <div style={{ display:'flex', gap:16, marginTop:18, fontSize:13, fontWeight:600, color:T.greenDeep }}>
            <span style={{ cursor:'pointer' }}>Instagram</span>
            <span style={{ cursor:'pointer' }}>LinkedIn</span>
          </div>
        </div>
        {cols.map(col => (
          <div key={col.h}>
            <div style={{ fontSize:14, fontWeight:700, color:T.ink, marginBottom:14 }}>{col.h}</div>
            {col.items.map(i => (
              <div key={i.label} onClick={i.onClick} style={{ fontSize:13.5, color:i.highlight?T.rose:(i.gold?T.goldDeep:T.ink), fontWeight:(i.highlight||i.gold)?700:500, marginBottom:10, cursor:'pointer' }}>{i.label}</div>
            ))}
          </div>
        ))}
        <div>
          <div style={{ fontSize:14, fontWeight:700, color:T.ink, marginBottom:8 }}>The Newsletter</div>
          <div style={{ fontSize:12.5, color:T.grey, lineHeight:1.5, marginBottom:14 }}>Join 12,000+ travelers getting the Thursday Drop in their inbox.</div>
          <div style={{ display:'flex', gap:8 }}>
            <input placeholder="Email address" style={{ flex:1, height:44, borderRadius:10, border:`1px solid ${T.greyLight}`, padding:'0 14px', fontSize:13, fontFamily:'inherit', outline:'none' }}/>
            <button style={{ width:44, height:44, borderRadius:10, background:T.green, border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
              <Ico name="send" size={18} color="#fff"/>
            </button>
          </div>
        </div>
      </div>
      <div style={{ maxWidth:1200, margin:'40px auto 0', paddingTop:18, borderTop:`1px solid ${T.greyLight}`, textAlign:'center', fontSize:12, color:T.grey }}>© 2026 trav.guide. All rights reserved.</div>
    </div>
  );
}

function GoogleGlyph({ size=18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3A12 12 0 1124 12c3 0 5.7 1.1 7.8 3l5.7-5.7A20 20 0 1044 24c0-1.3-.1-2.6-.4-3.9z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8A12 12 0 0124 12c3 0 5.7 1.1 7.8 3l5.7-5.7A20 20 0 006.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3A12 12 0 0112.7 28.4l-6.6 5.1A20 20 0 0024 44z"/>
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3a12 12 0 01-4 5.5l6.3 5.3c-.4.4 6.4-4.7 6.4-14.8 0-1.3-.1-2.6-.4-3.9z"/>
    </svg>
  );
}

function LoginModal({ onClose, onLogin }) {
  const [stage, setStage] = React.useState('entry'); // entry | onboard
  const [mode, setMode] = React.useState('google');   // google | phone
  const [phone, setPhone] = React.useState('');
  const [otp, setOtp] = React.useState('');
  // Onboarding fields — Name & Email required, Phone required, DOB/Nationality optional
  const [profile, setProfile] = React.useState({
    name:'Aditi Rao', email:'aditi.r@gmail.com', phone:'', dob:'', nationality:''
  });
  const setF = (k,v) => setProfile(p=>({...p,[k]:v}));

  const save = (finalProfile, skipped=false) => {
    try { localStorage.setItem('trav.profile', JSON.stringify({ ...finalProfile, skipped, updatedAt:Date.now() })); } catch {}
    onLogin && onLogin();
  };
  const skip = () => save(profile, true);
  const confirm = () => {
    if (!profile.name.trim() || !profile.email.trim()) return;
    save(profile, false);
  };

  const input = (placeholder, value, onChange, extra={}) => (
    <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
      style={{ width:'100%', height:44, borderRadius:10, border:`1px solid ${T.greyLight}`, padding:'0 14px', fontSize:14, fontFamily:'inherit', outline:'none', background:'#fff', ...extra }}
      onFocus={e=>e.target.style.borderColor=T.greenDeep}
      onBlur={e=>e.target.style.borderColor=T.greyLight}/>
  );

  const fieldLabel = (txt, optional=false) => (
    <div style={{ fontSize:11, fontWeight:700, color:T.grey, letterSpacing:'.1em', marginBottom:6 }}>
      {txt.toUpperCase()} {optional && <span style={{ color:T.grey, fontWeight:500, letterSpacing:'.04em' }}>· optional</span>}
    </div>
  );

  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(10,15,22,.5)', backdropFilter:'blur(4px)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:'#fff', borderRadius:18, width:'100%', maxWidth:stage==='onboard'?460:420, padding:28, boxShadow:'0 24px 60px rgba(0,0,0,.25)', maxHeight:'90vh', overflowY:'auto' }}>
        <div style={{ display:'flex', alignItems:'center', gap:4, justifyContent:'center', marginBottom:8 }}>
          <span style={{ fontSize:28, fontWeight:800, color:T.greenDark, letterSpacing:'-.03em', fontFamily:'Fraunces, serif' }}>trav</span>
          <span style={{ width:7, height:7, background:T.green, borderRadius:2, marginBottom:6 }}/>
        </div>

        {stage==='entry' && (
          <>
            <h2 style={{ fontSize:22, fontWeight:700, color:T.ink, textAlign:'center', margin:'0 0 6px', fontFamily:'Fraunces, serif', letterSpacing:'-.02em' }}>Welcome to trav</h2>
            <div style={{ fontSize:13, color:T.grey, textAlign:'center', marginBottom:22 }}>Plan your weekend in under a minute.</div>

            <button onClick={()=>setStage('onboard')} style={{
              width:'100%', height:48, borderRadius:10, background:'#fff', color:T.ink,
              border:`1.5px solid ${T.greyLight}`, fontSize:14.5, fontWeight:600, cursor:'pointer', fontFamily:'inherit',
              display:'inline-flex', alignItems:'center', justifyContent:'center', gap:10,
              boxShadow:'0 1px 2px rgba(15,30,46,.04)', transition:'all .15s'
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=T.ink;e.currentTarget.style.boxShadow='0 4px 12px rgba(15,30,46,.1)';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=T.greyLight;e.currentTarget.style.boxShadow='0 1px 2px rgba(15,30,46,.04)';}}>
              <GoogleGlyph size={18}/> Continue with Google
            </button>

            <div style={{ display:'flex', alignItems:'center', gap:10, margin:'18px 0 14px', color:T.grey, fontSize:11, letterSpacing:'.08em', fontWeight:600 }}>
              <div style={{ flex:1, height:1, background:T.greyLight }}/>OR<div style={{ flex:1, height:1, background:T.greyLight }}/>
            </div>

            {mode==='google' ? (
              <button onClick={()=>setMode('phone')} style={{
                width:'100%', height:44, borderRadius:10, background:'#F4F6FA', color:T.ink,
                border:'none', fontSize:13.5, fontWeight:600, cursor:'pointer', fontFamily:'inherit',
                display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8
              }}>
                <Ico name="phone" size={14} color={T.ink}/> Continue with phone number
              </button>
            ) : (
              <>
                <div style={{ display:'flex', gap:8, marginBottom:10 }}>
                  <div style={{ height:44, padding:'0 12px', background:'#F4F6FA', borderRadius:10, display:'flex', alignItems:'center', fontSize:13.5, fontWeight:600, color:T.ink }}>+91</div>
                  <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="98xxx xxxxx" style={{ flex:1, height:44, borderRadius:10, border:`1px solid ${T.greyLight}`, padding:'0 14px', fontSize:14, fontFamily:'inherit', outline:'none' }}/>
                </div>
                <Btn kind="primary" size="md" full trailing="arrow-right" onClick={()=>setStage('onboard')}>Send OTP</Btn>
              </>
            )}

            <div style={{ fontSize:11, color:T.grey, textAlign:'center', marginTop:18, lineHeight:1.5 }}>By continuing you agree to our Terms &amp; Privacy.</div>
          </>
        )}

        {stage==='onboard' && (
          <>
            <h2 style={{ fontSize:22, fontWeight:700, color:T.ink, textAlign:'center', margin:'0 0 4px', fontFamily:'Fraunces, serif', letterSpacing:'-.02em' }}>One last step</h2>
            <div style={{ fontSize:13, color:T.grey, textAlign:'center', marginBottom:20 }}>We'll use this to book trips for you. Skip anything you'd rather add later.</div>

            <div style={{ display:'grid', gap:14 }}>
              <div>
                {fieldLabel('Full name')}
                {input('Aditi Rao', profile.name, v=>setF('name',v))}
              </div>
              <div>
                {fieldLabel('Email')}
                {input('you@gmail.com', profile.email, v=>setF('email',v), { type:'email' })}
              </div>
              <div>
                {fieldLabel('Mobile')}
                <div style={{ display:'flex', gap:8 }}>
                  <div style={{ height:44, padding:'0 12px', background:'#F4F6FA', borderRadius:10, display:'flex', alignItems:'center', fontSize:13.5, fontWeight:600, color:T.ink, flexShrink:0 }}>+91</div>
                  {input('98xxx xxxxx', profile.phone, v=>setF('phone',v))}
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                <div>
                  {fieldLabel('DOB', true)}
                  {input('DD / MM / YYYY', profile.dob, v=>setF('dob',v))}
                </div>
                <div>
                  {fieldLabel('Nationality', true)}
                  {input('Indian', profile.nationality, v=>setF('nationality',v))}
                </div>
              </div>
            </div>

            <div style={{ display:'flex', gap:10, marginTop:22 }}>
              <button onClick={skip} style={{
                height:46, padding:'0 18px', borderRadius:10, background:'transparent', color:T.grey,
                border:'none', fontSize:13.5, fontWeight:600, cursor:'pointer', fontFamily:'inherit', flexShrink:0
              }}>Skip for now</button>
              <Btn kind="primary" size="md" full trailing="arrow-right" onClick={confirm}>Finish setup</Btn>
            </div>
            <div style={{ fontSize:11, color:T.grey, textAlign:'center', marginTop:14, lineHeight:1.5 }}>You can edit all of this in <b style={{ color:T.ink, fontWeight:700 }}>Profile → Settings</b>.</div>
          </>
        )}
      </div>
    </div>
  );
}

function MobileBottomNav({ active, onHome, onTrips, onTravelogue, onProfile, onSearch, loggedIn, onLogin, theme='light' }) {
  const isDark = theme==='dark';
  const barBg = isDark ? 'rgba(10,10,10,.92)' : 'rgba(255,255,255,.94)';
  const border = isDark ? 'rgba(255,255,255,.08)' : 'rgba(15,30,46,.08)';
  const inactive = isDark ? 'rgba(255,255,255,.55)' : T.grey;
  const active$ = isDark ? T.green : T.greenDeep;
  const fabBorder = isDark ? '#0a0a0a' : '#fff';
  
  const left = [
    { id:'home',  label:'Home',  icon:'pin',     onClick:onHome,  activeWhen:['landing'] },
    { id:'trips', label:'Trips', icon:'calendar', onClick:onTrips, activeWhen:['all-trips','detail','booking'] },
  ];
  const right = [
    { id:'travelogue', label:'Stories', icon:'spark',  onClick:onTravelogue, activeWhen:['travelogue','travelogue-article'] },
    { id:'profile',    label:loggedIn?'You':'Login', icon:loggedIn?'users':'logout', onClick:loggedIn?onProfile:onLogin, activeWhen:['profile','booking-detail','invoice'] },
  ];

  const Tab = ({ t }) => {
    const isActive = t.activeWhen.includes(active);
    const color = isActive ? active$ : inactive;
    return (
      <button onClick={(e) => { e.preventDefault(); haptic(); t.onClick && t.onClick(); }} style={{ 
        flex:1, background:'transparent', border:'none', cursor:'pointer', padding:'10px 4px 6px', 
        display:'flex', flexDirection:'column', alignItems:'center', gap:4, fontFamily:'inherit', 
        position:'relative', outline:'none',
        transition:'transform .2s'
      }}>
        <div style={{ transform:isActive?'scale(1.1)':'scale(1)', transition:'transform .2s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
          <Ico name={t.icon} size={22} color={color} stroke={isActive?2.5:1.8}/>
        </div>
        <span style={{ 
          fontSize:10, fontWeight:isActive?800:600, color, letterSpacing:'.01em', 
          opacity:isActive?1:0.7, transform:isActive?'translateY(0)':'translateY(1px)',
          transition:'all .2s'
        }}>{t.label}</span>
        {isActive && <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:20, height:3, background:active$, borderRadius:'0 0 4px 4px', animation:'navTabIn .3s ease' }}/>}
      </button>
    );
  };

  return (
    <>
      <div className="safe-bottom" style={{ 
        position:'fixed', left:0, right:0, bottom:0, zIndex:75, background:barBg, 
        borderTop:`1px solid ${border}`, backdropFilter:'blur(15px)', WebkitBackdropFilter:'blur(15px)', 
        boxShadow: isDark?'0 -6px 24px rgba(0,0,0,.5)':'0 -6px 20px rgba(15,30,46,.08)', 
        padding:`4px 0 env(safe-area-inset-bottom)`, display:'flex', alignItems:'center' 
      }}>
        {left.map(t => <Tab key={t.id} t={t}/>)}
        <div style={{ flex:'0 0 72px', display:'flex', justifyContent:'center', position:'relative' }}>
          <button onClick={(e) => { e.preventDefault(); haptic(); (onSearch||onTrips)(); }} aria-label="Search trips" style={{ 
            width:56, height:56, borderRadius:'50%', 
            background:`linear-gradient(135deg, ${T.green}, ${T.greenDeep})`, 
            color:'#fff', border:`4px solid ${fabBorder}`, cursor:'pointer', 
            fontFamily:'inherit', display:'flex', alignItems:'center', justifyContent:'center', 
            boxShadow:'0 8px 24px rgba(29,191,115,.4)', 
            marginTop:-32,
            transition:'transform .2s, box-shadow .2s'
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.92)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}>
            <Ico name="search" size={24} color="#fff" stroke={2.5}/>
          </button>
        </div>
        {right.map(t => <Tab key={t.id} t={t}/>)}
      </div>
      <style>{`
        @keyframes navTabIn { from { width: 0; opacity: 0; } to { width: 20px; opacity: 1; } }
      `}</style>
    </>
  );
}

function SearchIco({ size=20, color='#fff' }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>;
}

Object.assign(window, { Nav, Footer, LoginModal, MobileBottomNav });
