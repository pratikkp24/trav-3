function TravHerPage({ onJoin }) {
  return (
    <div style={{ background:T.offWhite }}>
      <TravHerHero onJoin={onJoin}/>
      <SafetySection/>
      <SoloCollection/>
      <Testimonials/>
      <FounderQuote/>
      <TravHerCTA onJoin={onJoin}/>
    </div>
  );
}

function TravHerHero({ onJoin }) {
  return (
    <div style={{ background:'linear-gradient(180deg, #FBEFE7 0%, #FAF5EE 100%)', padding:'56px 36px 80px', position:'relative', overflow:'hidden' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1.05fr 1fr', gap:40, alignItems:'center' }}>
        <div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#fff', padding:'7px 14px', borderRadius:999, fontSize:11, fontWeight:700, color:T.rose, letterSpacing:'.12em', border:`1px solid ${T.rose}22`, marginBottom:22 }}>
            <Ico name="spark" size={12} color={T.rose}/>EXCLUSIVE FOR WOMEN
          </div>
          <h1 style={{ fontSize:84, fontWeight:800, color:T.ink, letterSpacing:'-.04em', lineHeight:1.0, margin:0, fontFamily:'Fraunces, serif' }}>
            trav.her <span style={{ display:'inline-block', transform:'translateY(-6px)' }}><Ico name="rose" size={64}/></span>
            <br/>
            <span style={{ color:T.rose }}>for women who go<span style={{ color:T.ink }}>.</span></span>
          </h1>
          <div style={{ fontSize:18, color:T.grey, marginTop:22, lineHeight:1.5, maxWidth:500 }}>
            A community for Indian women who travel solo. Not a product. A place.
          </div>
          <div style={{ marginTop:32 }}>
            <button onClick={onJoin} style={{ height:58, padding:'0 28px', borderRadius:14, background:T.rose, color:'#fff', border:'none', fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:10, boxShadow:`0 10px 24px ${T.rose}55` }}>
              Join trav.her on WhatsApp <Ico name="rose" size={16}/>
            </button>
          </div>
          <div style={{ display:'flex', gap:28, marginTop:40 }}>
            {[{n:'5,200+',l:'women'},{n:'42',l:'cities'},{n:'98%',l:'safe-rated'}].map(s => (
              <div key={s.l}>
                <div style={{ fontSize:28, fontWeight:800, color:T.ink, letterSpacing:'-.02em', fontFamily:'Fraunces, serif' }}>{s.n}</div>
                <div style={{ fontSize:11, color:T.grey, fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', marginTop:2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position:'relative' }}>
          <div style={{ aspectRatio:'4/5', borderRadius:22, overflow:'hidden', transform:'rotate(2deg)', boxShadow:'0 30px 60px rgba(0,0,0,.18)', border:'8px solid #fff' }}>
            <ImgPlaceholder src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1200&q=80&auto=format&fit=crop" tone="#a86a48" ink="#2a1408" accent="#f4c896" label="Golden hour · Solo" radius={0} overlay={false}/>
          </div>
          <div style={{ position:'absolute', bottom:-28, left:-28, background:'#fff', padding:18, borderRadius:16, boxShadow:'0 18px 40px rgba(15,30,46,.18)', maxWidth:270, border:`1px solid ${T.greyLight}` }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
              <span style={{ width:8, height:8, borderRadius:'50%', background:T.green, boxShadow:`0 0 0 4px ${T.green}33` }}/>
              <span style={{ fontSize:10.5, fontWeight:700, color:T.grey, letterSpacing:'.14em' }}>LIVE PRESENCE</span>
            </div>
            <div style={{ fontSize:13.5, color:T.ink, lineHeight:1.45 }}><b style={{ fontWeight:700 }}>42 women</b> are currently exploring <b style={{ fontWeight:700 }}>Gokarna solo</b> with trav.her</div>
          </div>
          <div style={{ position:'absolute', top:-20, right:-10, background:'#fff', padding:'10px 14px', borderRadius:12, boxShadow:'0 10px 24px rgba(0,0,0,.12)', display:'flex', alignItems:'center', gap:8, border:`1px solid ${T.greyLight}` }}>
            <div style={{ display:'flex' }}>
              {['#E8614D','#1DBF73','#E6A33A','#556a88'].map((c,i)=>(
                <div key={i} style={{ width:26, height:26, borderRadius:'50%', background:c, marginLeft:i?-9:0, border:'2px solid #fff' }}/>
              ))}
            </div>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:T.ink }}>Riya, Meera +40</div>
              <div style={{ fontSize:10, color:T.grey }}>just joined today</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SafetySection() {
  const cards = [
    { tone:'#E8EEF8', icon:'shield', title:'Verified DMC-operated', body:'Every local partner goes through a 14-point background check. No third-party randoms.' },
    { tone:'#FBEFE7', icon:'bag', title:'Fixed price', body:'No bargaining stress. No hidden taxes at check-out. What you see is what you pay.' },
    { tone:'#FAFAFA', icon:'bed', title:'Female reviewed', body:'Every stay is pre-vetted by our community for safety and comfort.' },
  ];
  return (
    <div style={{ background:T.offWhite, padding:'80px 36px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <h2 style={{ fontSize:44, fontWeight:800, color:T.ink, letterSpacing:'-.025em', margin:0, fontFamily:'Fraunces, serif' }}>Your safety is our silent priority.</h2>
          <div style={{ fontSize:15, color:T.grey, marginTop:10 }}>We've built layers of protection that stay out of your way until you need them.</div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:18, marginBottom:20 }}>
          {cards.map((c,i)=>(
            <div key={c.title} style={{ background:c.tone, padding:28, borderRadius:18, border:`1px solid ${T.greyLight}` }}>
              <div style={{ width:44, height:44, borderRadius:12, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:42, boxShadow:'0 2px 6px rgba(0,0,0,.04)' }}>
                <Ico name={c.icon} size={20} color={i===0?T.greenDeep:i===1?T.rose:T.ink}/>
              </div>
              <div style={{ fontSize:18, fontWeight:800, color:T.ink, letterSpacing:'-.015em', fontFamily:'Fraunces, serif', marginBottom:8 }}>{c.title}</div>
              <div style={{ fontSize:13, color:T.grey, lineHeight:1.55 }}>{c.body}</div>
            </div>
          ))}
        </div>
        <div style={{ background:T.ink, color:'#fff', padding:'26px 28px', borderRadius:18, display:'flex', alignItems:'center', gap:18 }}>
          <div style={{ width:48, height:48, borderRadius:'50%', background:'rgba(255,255,255,.08)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Ico name="bell" size={20} color="#fff"/>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:20, fontWeight:700, letterSpacing:'-.015em', fontFamily:'Fraunces, serif' }}>24/7 Check-in Protocol</div>
            <div style={{ fontSize:13, color:'rgba(255,255,255,.7)', marginTop:4, lineHeight:1.5 }}>Our concierge team tracks your arrival and stays in touch until you're safely in your room.</div>
          </div>
          <button style={{ height:46, padding:'0 22px', borderRadius:12, background:T.green, color:'#fff', border:'none', fontSize:13.5, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>View Protocol</button>
        </div>
      </div>
    </div>
  );
}

const SOLO_TRIPS = [
  { dest:'Coorg Solo', region:'KARNATAKA', nights:'3 Nights', price:9499, tag:'Filling Fast', src:'https://loremflickr.com/600/800/coorg,coffee,plantation?lock=401', tone:'#4a6a38', ink:'#0f1f0a', accent:'#f0d488' },
  { dest:'Pondi Solo', region:'TAMIL NADU', nights:'3 Nights', price:8999, tag:null, src:'https://loremflickr.com/600/800/pondicherry,french,colonial?lock=402', tone:'#d9a840', ink:'#3a2408', accent:'#f8e8c0' },
  { dest:'Gokarna Solo', region:'COASTAL KARNATAKA', nights:'2 Nights', price:7999, tag:null, src:'https://loremflickr.com/600/800/gokarna,beach,coast?lock=403', tone:'#c26a3a', ink:'#2a0f04', accent:'#f7d8a8' },
  { dest:'Spiti Solo', region:'HIMACHAL', nights:'5 Nights', price:14999, tag:'New', src:'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80&auto=format&fit=crop', tone:'#7a84a0', ink:'#1c2438', accent:'#e8eaf2' },
];

function SoloCollection() {
  return (
    <div style={{ background:'#fff', padding:'72px 36px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:28, flexWrap:'wrap', gap:14 }}>
          <div>
            <h2 style={{ fontSize:40, fontWeight:800, color:T.ink, letterSpacing:'-.025em', margin:0, fontFamily:'Fraunces, serif' }}>The Solo Collection</h2>
            <div style={{ fontSize:14.5, color:T.grey, marginTop:6 }}>Designed for peace, curated for discovery.</div>
          </div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, color:T.rose, fontSize:14, fontWeight:700, cursor:'pointer' }}>View all trips <Ico name="arrow-right" size={14} color={T.rose}/></div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
          {SOLO_TRIPS.map(t => (
            <div key={t.dest} style={{ cursor:'pointer' }}>
              <div style={{ position:'relative', aspectRatio:'3/4', borderRadius:18, overflow:'hidden' }}>
                <ImgPlaceholder src={t.src} tone={t.tone} ink={t.ink} accent={t.accent} label={t.dest} radius={0} overlay={false}/>
                {t.tag && <div style={{ position:'absolute', top:12, right:12, background:T.fire, color:'#fff', padding:'5px 11px', borderRadius:999, fontSize:10.5, fontWeight:700, letterSpacing:'.05em', display:'inline-flex', alignItems:'center', gap:4 }}>
                  <Ico name="fire" size={10} color="#fff"/>{t.tag}
                </div>}
                <div style={{ position:'absolute', bottom:14, left:14, right:14, color:'#fff' }}>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:'.14em', opacity:.9 }}>{t.region}</div>
                  <div style={{ fontSize:22, fontWeight:800, fontFamily:'Fraunces, serif', letterSpacing:'-.015em', marginTop:4, textShadow:'0 1px 6px rgba(0,0,0,.3)' }}>{t.dest}</div>
                </div>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 4px 0' }}>
                <div>
                  <span style={{ fontSize:18, fontWeight:800, color:T.rose, letterSpacing:'-.01em' }}>₹{t.price.toLocaleString('en-IN')}</span>
                  <span style={{ fontSize:12, color:T.grey, marginLeft:6 }}>/ {t.nights}</span>
                </div>
                <div style={{ width:34, height:34, borderRadius:'50%', border:`1.5px solid ${T.greyLight}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Ico name="arrow-right" size={14} color={T.ink}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  const items = [
    { name:'Sneha K.', trip:'Gokarna · Nov', tone:'#b8774a', quote:'I came alone and left with six friends. The trip lead checked on me every morning — it felt like traveling with sisters, not strangers.' },
    { name:'Priya M.', trip:'Spiti · Oct', tone:'#556a88', quote:"Mom was nervous until she saw the safety protocol. Now she tells her friends to send their daughters on trav.her." },
    { name:'Diya R.', trip:'Coorg · Sep', tone:'#4a6a38', quote:'First solo trip. I was scared. The WhatsApp group was active 2 weeks before we even met. By day 1, it felt like home.' },
  ];
  return (
    <div style={{ background:T.roseCream, padding:'80px 36px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <div style={{ fontSize:11, fontWeight:700, color:T.rose, letterSpacing:'.14em', marginBottom:10 }}>REAL WOMEN · REAL TRIPS</div>
          <h2 style={{ fontSize:40, fontWeight:800, color:T.ink, letterSpacing:'-.025em', margin:0, fontFamily:'Fraunces, serif' }}>What our travelers say.</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:18 }}>
          {items.map(it => (
            <div key={it.name} style={{ background:'#fff', padding:26, borderRadius:18, border:`1px solid ${T.rose}22` }}>
              <div style={{ fontSize:22, color:T.rose, lineHeight:0.6, fontFamily:'Fraunces, serif' }}>"</div>
              <div style={{ fontSize:14.5, color:T.ink, lineHeight:1.55, margin:'10px 0 20px', fontFamily:'Fraunces, serif' }}>{it.quote}</div>
              <div style={{ display:'flex', alignItems:'center', gap:12, paddingTop:14, borderTop:`1px dashed ${T.greyLight}` }}>
                <div style={{ width:40, height:40, borderRadius:'50%', background:it.tone }}/>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:T.ink }}>{it.name}</div>
                  <div style={{ fontSize:11.5, color:T.grey }}>{it.trip}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FounderQuote() {
  return (
    <div style={{ background:T.offWhite, padding:'80px 36px 60px' }}>
      <div style={{ maxWidth:760, margin:'0 auto', background:'#fff', borderRadius:20, padding:'44px 48px', border:`1px solid ${T.greyLight}`, boxShadow:'0 10px 30px rgba(15,30,46,.04)' }}>
        <div style={{ fontSize:72, color:T.rose, lineHeight:0.5, fontFamily:'Fraunces, serif' }}>"</div>
        <div style={{ fontSize:22, color:T.ink, lineHeight:1.5, margin:'14px 0 28px', fontFamily:'Fraunces, serif', letterSpacing:'-.01em' }}>
          I started trav.her because the women in my life kept saying <i>"I wish I could, but..."</i> — and I wanted to build the <i>but</i> away.
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <div style={{ width:48, height:48, borderRadius:'50%', background:'linear-gradient(135deg, #d6a8c0, #c78fa8)' }}/>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:T.ink }}>Aarushi Nair</div>
            <div style={{ fontSize:12, color:T.rose, fontWeight:600 }}>Founder, trav.guide</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TravHerCTA({ onJoin }) {
  return (
    <div style={{ background:T.offWhite, padding:'40px 36px 100px', textAlign:'center' }}>
      <div style={{ maxWidth:640, margin:'0 auto' }}>
        <h2 style={{ fontSize:48, fontWeight:800, color:T.ink, letterSpacing:'-.03em', margin:0, fontFamily:'Fraunces, serif' }}>Ready for your first solo trip?</h2>
        <div style={{ fontSize:15.5, color:T.grey, marginTop:14, lineHeight:1.55 }}>Join 5,000+ women who travel with confidence. No spam, just curated adventures and a safer way to see the world.</div>
        <div style={{ marginTop:28 }}>
          <button onClick={onJoin} style={{ height:58, padding:'0 32px', borderRadius:14, background:T.green, color:'#fff', border:'none', fontSize:15.5, fontWeight:700, cursor:'pointer', fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:10, boxShadow:`0 10px 24px ${T.green}55` }}>
            Join trav.her on WhatsApp <Ico name="rose" size={16}/>
          </button>
        </div>
        <div style={{ fontSize:12, color:T.grey, marginTop:14 }}>Join our community group for trip updates & safety tips.</div>
      </div>
    </div>
  );
}

Object.assign(window, { TravHerPage });
