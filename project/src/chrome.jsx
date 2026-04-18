function Nav({ onLogo, active='destinations', loggedIn, onLogin, onProfile, onTravHer, onTravelogue }) {
  const isMobile = useIsMobile();
  return (
    <div style={{ height:isMobile?56:64, background:'#fff', borderBottom:`1px solid ${T.greyLight}`, display:'flex', alignItems:'center', padding:`0 ${isMobile?16:36}px`, gap:isMobile?14:30, position:'sticky', top:0, zIndex:20 }}>
      <div onClick={onLogo} style={{ display:'flex', alignItems:'center', gap:4, cursor:'pointer' }}>
        <span style={{ fontSize:isMobile?20:22, fontWeight:800, color:T.greenDark, letterSpacing:'-.03em', fontFamily:'Fraunces, serif' }}>trav</span>
        <span style={{ width:6, height:6, background:T.green, borderRadius:2, marginBottom:4 }}/>
      </div>
      {!isMobile && (
        <div style={{ display:'flex', gap:26 }}>
          {[{id:'destinations',label:'Destinations'},{id:'travelogue',label:'Travelogue'},{id:'travher',label:'trav.her'}].map(l => {
            const a = active===l.id;
            const clr = l.id==='travher' ? T.rose : (a?T.greenDeep:T.ink);
            const bb = l.id==='travher' && a ? `2px solid ${T.rose}` : (a?`2px solid ${T.greenDeep}`:'2px solid transparent');
            const onC = l.id==='travher' ? onTravHer : (l.id==='travelogue' ? onTravelogue : undefined);
            return <span key={l.id} onClick={onC} style={{ fontSize:14, fontWeight:a||l.id==='travher'?700:500, color:clr, borderBottom:bb, paddingBottom:3, cursor:'pointer' }}>{l.label}</span>;
          })}
        </div>
      )}
      <div style={{ flex:1 }}/>
      {!isMobile && <span style={{ fontSize:14, fontWeight:600, color:T.greenDeep, cursor:'pointer' }}>Weekend Trips</span>}
      {loggedIn ? (
        <div onClick={onProfile} style={{ display:'flex', alignItems:'center', gap:isMobile?6:10, cursor:'pointer', padding:isMobile?'4px 8px 4px 4px':'6px 12px 6px 6px', borderRadius:999, border:`1px solid ${T.greyLight}` }}>
          <div style={{ width:isMobile?26:30, height:isMobile?26:30, borderRadius:'50%', background:`linear-gradient(135deg, ${T.green}, ${T.greenDeep})`, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:isMobile?10:11, fontWeight:700 }}>AR</div>
          {!isMobile && <span style={{ fontSize:13, fontWeight:600, color:T.ink }}>Aditi</span>}
          <Ico name="chevron-down" size={12} color={T.grey}/>
        </div>
      ) : (
        <button onClick={onLogin} style={{ height:isMobile?36:40, padding:isMobile?'0 14px':'0 22px', borderRadius:999, background:'transparent', color:T.greenDeep, border:`1.5px solid ${T.greenDeep}`, fontSize:isMobile?12.5:14, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Login</button>
      )}
    </div>
  );
}

function Footer({ onTravelogue, onInvestor, onSupport }) {
  const cols = [
    { h:'Explore', items:[{label:'Destinations'},{label:'Weekend Trips'},{label:'Travelogue', onClick:onTravelogue}] },
    { h:'Company', items:[{label:'trav.her', highlight:true},{label:'For Creators'},{label:'Investors', onClick:onInvestor},{label:'Support', onClick:onSupport}] },
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
              <div key={i.label} onClick={i.onClick} style={{ fontSize:13.5, color:i.highlight?T.rose:T.ink, fontWeight:i.highlight?700:500, marginBottom:10, cursor:'pointer' }}>{i.label}</div>
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

function LoginModal({ onClose, onLogin }) {
  const [stage, setStage] = React.useState('phone');
  const [phone, setPhone] = React.useState('');
  const [otp, setOtp] = React.useState('');
  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(10,15,22,.5)', backdropFilter:'blur(4px)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:'#fff', borderRadius:18, width:'100%', maxWidth:420, padding:28, boxShadow:'0 24px 60px rgba(0,0,0,.25)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:4, justifyContent:'center', marginBottom:8 }}>
          <span style={{ fontSize:28, fontWeight:800, color:T.greenDark, letterSpacing:'-.03em', fontFamily:'Fraunces, serif' }}>trav</span>
          <span style={{ width:7, height:7, background:T.green, borderRadius:2, marginBottom:6 }}/>
        </div>
        <h2 style={{ fontSize:22, fontWeight:700, color:T.ink, textAlign:'center', margin:'0 0 6px', fontFamily:'Fraunces, serif', letterSpacing:'-.02em' }}>
          {stage==='phone' ? 'Welcome back' : 'Verify OTP'}
        </h2>
        <div style={{ fontSize:13, color:T.grey, textAlign:'center', marginBottom:22 }}>
          {stage==='phone' ? 'Enter your mobile to continue' : `Sent to +91 ${phone || '98xxx xxxxx'}`}
        </div>
        {stage==='phone' ? (
          <>
            <div style={{ display:'flex', gap:8, marginBottom:14 }}>
              <div style={{ height:48, padding:'0 14px', background:'#F4F6FA', borderRadius:10, display:'flex', alignItems:'center', fontSize:14, fontWeight:600, color:T.ink }}>+91</div>
              <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="98xxx xxxxx" style={{ flex:1, height:48, borderRadius:10, border:`1px solid ${T.greyLight}`, padding:'0 14px', fontSize:15, fontFamily:'inherit', outline:'none' }}/>
            </div>
            <Btn kind="primary" size="lg" full trailing="arrow-right" onClick={()=>setStage('otp')}>Get OTP</Btn>
            <div style={{ display:'flex', alignItems:'center', gap:10, margin:'20px 0 14px', color:T.grey, fontSize:12 }}>
              <div style={{ flex:1, height:1, background:T.greyLight }}/>or<div style={{ flex:1, height:1, background:T.greyLight }}/>
            </div>
            <Btn kind="outline" size="lg" full icon="whatsapp" onClick={()=>setStage('otp')}>Continue with WhatsApp</Btn>
          </>
        ) : (
          <>
            <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="• • • •" maxLength={4} style={{ width:'100%', height:56, borderRadius:12, border:`1.5px solid ${T.greyLight}`, padding:'0 14px', fontSize:24, textAlign:'center', letterSpacing:'.5em', fontFamily:'inherit', outline:'none', marginBottom:16 }}/>
            <Btn kind="primary" size="lg" full trailing="arrow-right" onClick={onLogin}>Verify &amp; continue</Btn>
            <div style={{ textAlign:'center', fontSize:12, color:T.grey, marginTop:14 }}>Didn't get it? <span style={{ color:T.greenDeep, fontWeight:600, cursor:'pointer' }}>Resend in 30s</span></div>
          </>
        )}
        <div style={{ fontSize:11, color:T.grey, textAlign:'center', marginTop:18, lineHeight:1.5 }}>By continuing you agree to our Terms &amp; Privacy Policy.</div>
      </div>
    </div>
  );
}

function MobileBottomNav({ active, onHome, onTrips, onTravelogue, onProfile, onSearch, loggedIn, onLogin }) {
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
    const color = isActive ? T.greenDeep : T.grey;
    return (
      <button onClick={t.onClick} style={{ flex:1, background:'transparent', border:'none', cursor:'pointer', padding:'8px 4px 6px', display:'flex', flexDirection:'column', alignItems:'center', gap:4, fontFamily:'inherit', position:'relative' }}>
        {isActive && <span style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:30, height:3, background:T.green, borderRadius:'0 0 999px 999px' }}/>}
        <Ico name={t.icon} size={20} color={color} stroke={isActive?2.4:1.8}/>
        <span style={{ fontSize:10, fontWeight:isActive?700:600, color, letterSpacing:'.02em' }}>{t.label}</span>
      </button>
    );
  };
  return (
    <div style={{ position:'fixed', left:0, right:0, bottom:0, zIndex:75, background:'#fff', borderTop:`1px solid ${T.greyLight}`, boxShadow:'0 -6px 20px rgba(15,30,46,.06)', padding:`6px 0 calc(6px + env(safe-area-inset-bottom)) 0`, display:'flex', alignItems:'flex-end' }}>
      {left.map(t => <Tab key={t.id} t={t}/>)}
      <div style={{ flex:'0 0 78px', display:'flex', justifyContent:'center', alignItems:'flex-end' }}>
        <button onClick={onSearch||onTrips} aria-label="Search trips" style={{ width:58, height:58, borderRadius:'50%', background:`linear-gradient(135deg, ${T.green}, ${T.greenDeep})`, color:'#fff', border:'4px solid #fff', cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 8px 22px rgba(29,191,115,.45)', marginTop:-26 }}>
          <SearchIco size={22}/>
        </button>
      </div>
      {right.map(t => <Tab key={t.id} t={t}/>)}
    </div>
  );
}

function SearchIco({ size=20, color='#fff' }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>;
}

Object.assign(window, { Nav, Footer, LoginModal, MobileBottomNav });
