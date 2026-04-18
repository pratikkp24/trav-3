// About page — founder-written introduction. 8 sections, mobile-first, editorial.

const ABOUT_NAVY = '#0F1F3D';

function AboutPage({ onBack, onOpenAllTrips, onTravHer, onSupport }) {
  const isMobile = useIsMobile();
  return (
    <div style={{ background:'#fff' }}>
      <style>{`
        @keyframes ab-bounce { 0%,100% { transform:translateY(0); opacity:.7 } 50% { transform:translateY(4px); opacity:1 } }
        .ab-team-card { transition: border-color .18s ease, box-shadow .18s ease, transform .18s ease; }
        .ab-team-card:hover { border-color:${T.green}; box-shadow:0 10px 26px rgba(15,30,46,.08); transform:translateY(-2px); }
        .ab-link { transition: opacity .15s ease; }
        .ab-link:hover { opacity:.78; }
      `}</style>
      <AboutHero onBack={onBack} onOpenAllTrips={onOpenAllTrips} isMobile={isMobile}/>
      <WhyWeBuilt isMobile={isMobile}/>
      <WhatWeBelieve isMobile={isMobile}/>
      <WhatWereBuilding isMobile={isMobile} onTravHer={onTravHer}/>
      <WhoWeAre isMobile={isMobile}/>
      <Recognition isMobile={isMobile}/>
      <WhatsNext isMobile={isMobile}/>
      <ReachUs isMobile={isMobile} onOpenAllTrips={onOpenAllTrips}/>
    </div>
  );
}

/* ============ Section 1 — Hero ============ */

function AboutHero({ onBack, onOpenAllTrips, isMobile }) {
  const pad = isMobile ? 16 : 36;
  const utilH = 32;
  const minH = `calc(100vh - 64px - ${utilH}px)`;
  return (
    <section style={{ background:T.offWhite, borderBottom:`1px solid ${T.greyLight}` }}>
      <div style={{ height:utilH, padding:`0 ${pad}px`, display:'flex', alignItems:'center', justifyContent:'space-between', maxWidth:1180, margin:'0 auto' }}>
        <button onClick={onBack} className="ab-link" style={{ background:'transparent', border:'none', padding:0, cursor:'pointer', color:T.grey, fontSize:12, fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:6 }}>
          <span style={{ fontSize:13, lineHeight:1 }}>{'\u2190'}</span> {isMobile?'Back':'Back to home'}
        </button>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:11, color:T.grey, fontWeight:700, letterSpacing:'.14em' }}>
          BUILT IN BENGALURU · 2026
        </div>
      </div>
      <div style={{ maxWidth:880, margin:'0 auto', padding:`${isMobile?28:40}px ${pad}px ${isMobile?40:64}px`, minHeight: isMobile?'auto':minH, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', position:'relative' }}>
        <div style={{ display:'inline-flex', alignItems:'center', padding:'5px 14px', borderRadius:999, background:'#F0FAF4', color:T.greenDeep, fontSize:10.5, fontWeight:800, letterSpacing:'.14em', border:`1px solid ${T.green}33` }}>
          ABOUT TRAV
        </div>
        <div style={{ height:32 }}/>
        <h1 style={{ fontFamily:'Fraunces, serif', fontWeight:700, color:T.ink, fontSize:isMobile?38:64, lineHeight:1.05, letterSpacing:'-.025em', margin:0 }}>
          We're building the platform for India's <span style={{ color:T.green, fontStyle:'italic' }}>weekend</span>{'.'}
        </h1>
        <div style={{ height:32 }}/>
        <p style={{ maxWidth:720, fontSize:isMobile?15.5:18, lineHeight:1.55, color:T.inkSoft, margin:0 }}>
          Indians take fifty-two weekends a year. Until now, planning one meant juggling Instagram, WhatsApp, six OTAs, and a group chat that never converts. trav is one product where discovery, planning, group coordination, and creator-led booking finally live in the same place.
        </p>
        <div style={{ height:36 }}/>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:14 }}>
          <button onClick={onOpenAllTrips} style={{ height:isMobile?50:54, padding:`0 ${isMobile?24:30}px`, borderRadius:999, background:T.green, color:'#fff', border:'none', cursor:'pointer', fontFamily:'inherit', fontSize:isMobile?14:15, fontWeight:700, display:'inline-flex', alignItems:'center', gap:10, boxShadow:`0 10px 26px ${T.green}44` }}>
            Explore weekend trips <Ico name="arrow-right" size={15} color="#fff" stroke={2.4}/>
          </button>
          <div style={{ fontSize:12, color:T.grey }}>
            Or <a href="mailto:partners@trav.guide" className="ab-link" style={{ color:T.greenDeep, fontWeight:700, textDecoration:'none' }}>Partner with trav</a>
            <span style={{ color:T.greyLight, margin:'0 6px' }}>·</span>
            <a href="mailto:careers@trav.guide" className="ab-link" style={{ color:T.greenDeep, fontWeight:700, textDecoration:'none' }}>Join the team</a>
          </div>
        </div>
        <div style={{ position:isMobile?'static':'absolute', bottom:isMobile?'auto':24, marginTop:isMobile?32:0, display:'flex', flexDirection:'column', alignItems:'center', gap:4, color:T.grey, fontSize:11, letterSpacing:'.14em', fontWeight:600, animation:'ab-bounce 2.4s ease-in-out infinite' }}>
          <Ico name="chevron-down" size={14} color={T.grey}/>
          <span>WHY WE BUILT THIS</span>
        </div>
      </div>
    </section>
  );
}

/* ============ Section 2 — Why we built this ============ */

function WhyWeBuilt({ isMobile }) {
  const pad = isMobile ? 16 : 36;
  return (
    <section style={{ background:'#fff', padding:`${isMobile?44:72}px ${pad}px ${isMobile?40:64}px` }}>
      <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:isMobile?'1fr':'1.4fr 1fr', gap:isMobile?28:48, alignItems:'flex-start' }}>
        <div>
          <div style={{ fontSize:11, fontWeight:800, color:T.greenDeep, letterSpacing:'.18em', marginBottom:10 }}>WHY WE BUILT THIS</div>
          <h2 style={{ fontFamily:'Fraunces, serif', fontWeight:700, color:T.ink, fontSize:isMobile?26:36, letterSpacing:'-.025em', lineHeight:1.15, margin:0 }}>
            Travel planning is broken at exactly the moment it should feel easiest.
          </h2>
          <div style={{ fontSize:isMobile?14.5:16, color:T.inkSoft, lineHeight:1.65, marginTop:isMobile?16:22 }}>
            It's Thursday night. You want to be somewhere by Saturday morning. You open Instagram and see a creator's reel from Coorg. You screenshot it. You google it. You jump to MakeMyTrip for hotels, RedBus for transport, WhatsApp for the group chat, and somewhere along the way the trip dies in a thread that never closes.
            <br/><br/>
            We built trav because there should be one place for that whole journey. A platform that respects the way people actually plan weekend trips today — creator-led, group-driven, WhatsApp-coordinated, decided in twelve hours.
          </div>
        </div>
        <FounderQuote isMobile={isMobile}/>
      </div>
    </section>
  );
}

function FounderQuote({ isMobile }) {
  return (
    <div style={{ background:'#F0FAF4', borderRadius:18, padding:isMobile?22:28, border:`1px solid ${T.green}33` }}>
      <div style={{ fontSize:42, color:T.green, fontFamily:'Fraunces, serif', lineHeight:1, marginBottom:8 }}>{'"'}</div>
      <div style={{ fontFamily:'Fraunces, serif', fontStyle:'italic', fontSize:isMobile?17:19, color:T.ink, lineHeight:1.45, letterSpacing:'-.01em' }}>
        Six tabs and a group chat is not a planning tool. It's a planning tax.
      </div>
      <div style={{ marginTop:18, paddingTop:14, borderTop:`1px dashed ${T.green}55`, display:'flex', alignItems:'center', gap:10 }}>
        <div style={{ width:36, height:36, borderRadius:'50%', background:`linear-gradient(135deg, ${T.green}, ${T.greenDeep})`, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:800 }}>PK</div>
        <div>
          <div style={{ fontSize:13, fontWeight:700, color:T.ink }}>Pratik Kumar</div>
          <div style={{ fontSize:11.5, color:T.grey }}>Founder & CEO</div>
        </div>
      </div>
    </div>
  );
}

/* ============ Section 3 — What we believe ============ */

function WhatWeBelieve({ isMobile }) {
  const pad = isMobile ? 16 : 36;
  const cards = [
    { icon:'copy',     title:'One product beats six tabs.',                  body:'Discovery, planning, group coordination, payment, and post-trip community should live together. Anything else is a planning tax.' },
    { icon:'users',    title:'Creators surface intent better than algorithms.', body:'A reel from a creator who actually went there beats a thousand AI recommendations. We pay creators only when their content converts to a real booking.' },
    { icon:'shield',   title:'Trust is the unmet primitive in Indian travel.', body:'Solo female travelers, first-time bookers, and group organizers all need the same thing OTAs don\'t sell — verified safety, accountable supply, and a human on WhatsApp when something breaks.' },
    { icon:'calendar', title:'Weekends are the wedge. Vacations are not.',    body:'Annual vacations are emotional, deliberated, infrequent. Weekends are impulse-driven and recurring. We build for the weekend because that\'s where the frequency — and the loyalty — actually live.' },
  ];
  return (
    <section style={{ background:T.offWhite, padding:`${isMobile?44:72}px ${pad}px ${isMobile?40:64}px` }}>
      <div style={{ maxWidth:1080, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:isMobile?22:36 }}>
          <div style={{ fontSize:11, fontWeight:800, color:T.greenDeep, letterSpacing:'.18em' }}>WHAT WE BELIEVE</div>
          <h2 style={{ fontFamily:'Fraunces, serif', fontWeight:700, color:T.ink, fontSize:isMobile?26:38, letterSpacing:'-.025em', lineHeight:1.15, margin:'12px auto 0', maxWidth:780 }}>
            Four convictions that shape every product decision.
          </h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:isMobile?12:18 }}>
          {cards.map((c,i) => (
            <div key={c.title} style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.greyLight}`, padding:isMobile?20:24, position:'relative' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:'#F0FAF4', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Ico name={c.icon} size={16} color={T.greenDeep} stroke={2}/>
                </div>
                <div style={{ fontSize:10.5, fontWeight:800, color:T.greenDeep, letterSpacing:'.14em' }}>0{i+1}</div>
              </div>
              <div style={{ fontFamily:'Fraunces, serif', fontWeight:700, fontSize:isMobile?17:18, color:T.ink, letterSpacing:'-.015em', lineHeight:1.3, marginBottom:8 }}>{c.title}</div>
              <div style={{ fontSize:13.5, color:T.grey, lineHeight:1.6 }}>{c.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Section 4 — What we're building ============ */

function WhatWereBuilding({ isMobile, onTravHer }) {
  const pad = isMobile ? 16 : 36;
  const sides = [
    { icon:'spark',  title:'For travelers',     body:'Browse curated weekend trips from your city. Customize hotel, transport, meal plan. Book with friends. Pay your share. Get on WhatsApp with the trip group. Go.' },
    { icon:'star',   title:'For creators',      body:"Turn the trips you're already showing on Instagram into bookable itineraries. Earn commission on every booking your content drives. The first creator-attributed booking layer in Indian travel." },
    { icon:'shield', title:'For DMC partners',  body:'Get qualified weekend bookings without OTA-style discounting wars. Lower take rate. Faster settlement. A scorecard that rewards good operators with more inventory weight, not just more spend.' },
  ];
  return (
    <section style={{ background:'#fff', padding:`${isMobile?40:64}px ${pad}px ${isMobile?36:64}px` }}>
      <div style={{ maxWidth:1080, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:isMobile?22:36 }}>
          <div style={{ fontSize:11, fontWeight:800, color:T.greenDeep, letterSpacing:'.18em' }}>WHAT WE'RE BUILDING</div>
          <h2 style={{ fontFamily:'Fraunces, serif', fontWeight:700, color:T.ink, fontSize:isMobile?26:38, letterSpacing:'-.025em', lineHeight:1.15, margin:'12px auto 0', maxWidth:780 }}>
            One product. Three sides. A single weekend journey.
          </h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)', gap:isMobile?12:16 }}>
          {sides.map(s => (
            <div key={s.title} style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.greyLight}`, padding:isMobile?20:22 }}>
              <div style={{ width:38, height:38, borderRadius:10, background:'#F0FAF4', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:12 }}>
                <Ico name={s.icon} size={16} color={T.greenDeep} stroke={2}/>
              </div>
              <div style={{ fontFamily:'Fraunces, serif', fontWeight:700, fontSize:isMobile?17:18, color:T.ink, letterSpacing:'-.015em', marginBottom:6 }}>{s.title}</div>
              <div style={{ fontSize:13.5, color:T.grey, lineHeight:1.6 }}>{s.body}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:isMobile?20:28, padding:isMobile?'18px 18px':'22px 24px', background:T.roseCream, borderRadius:14, border:`1px solid ${T.rose}33`, textAlign:'center' }}>
          <div style={{ fontFamily:'Fraunces, serif', fontStyle:'italic', fontSize:isMobile?13.5:14, color:T.rose, lineHeight:1.55, maxWidth:760, margin:'0 auto' }}>
            And one sub-product within all of this — <b style={{ fontWeight:700 }}>trav.her</b> — exists for the women who travel solo. Verified safe stays. Live check-in. SOS. The trust layer the rest of Indian travel still hasn't built.
          </div>
          <div style={{ marginTop:10 }}>
            <button onClick={onTravHer} className="ab-link" style={{ background:'transparent', border:'none', padding:0, color:T.rose, fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:5, textDecoration:'underline', textUnderlineOffset:3 }}>
              Learn about trav.her <Ico name="arrow-right" size={12} color={T.rose} stroke={2.4}/>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ Section 5 — Who we are ============ */

function WhoWeAre({ isMobile }) {
  const pad = isMobile ? 16 : 36;
  const team = [
    { init:'BV', name:'Bhavya',     role:'Product Lead',           bio:'End-to-end product and user journey.',                tone:T.green },
    { init:'SH', name:'Sudarshan',  role:'Product Lead',           bio:'Growth, DMC partnerships, trav.her.',                 tone:T.greenDeep },
    { init:'RD', name:'Riddhiman',  role:'Junior Product',         bio:'Specs, requirements, documentation.',                 tone:'#4a6788' },
    { init:'PT', name:'Pratyush',   role:'Tech Lead',              bio:'Backend and engineering.',                            tone:'#6a4a88' },
    { init:'AB', name:'Abhishek',   role:'Chief Architect',        bio:'Infrastructure and platform.',                        tone:'#3b6a4e' },
    { init:'AN', name:'Anuja',      role:'Community & Growth',     bio:'WhatsApp community, creators.',                       tone:T.rose },
  ];
  return (
    <section style={{ background:T.offWhite, padding:`${isMobile?44:72}px ${pad}px ${isMobile?40:64}px` }}>
      <div style={{ maxWidth:1080, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:isMobile?22:34 }}>
          <div style={{ fontSize:11, fontWeight:800, color:T.greenDeep, letterSpacing:'.18em' }}>WHO WE ARE</div>
          <h2 style={{ fontFamily:'Fraunces, serif', fontWeight:700, color:T.ink, fontSize:isMobile?26:38, letterSpacing:'-.025em', lineHeight:1.15, margin:'12px auto 0', maxWidth:780 }}>
            A small team obsessed with one category.
          </h2>
        </div>

        {/* Founder card */}
        <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.greyLight}`, padding:isMobile?20:32, marginBottom:isMobile?20:28, display:'grid', gridTemplateColumns:isMobile?'1fr':'160px 1fr', gap:isMobile?16:28, alignItems:'flex-start' }}>
          <div style={{ width:isMobile?96:160, height:isMobile?96:160, borderRadius:'50%', background:`linear-gradient(135deg, ${T.green}, ${T.greenDeep})`, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:isMobile?32:46, fontWeight:800, fontFamily:'Fraunces, serif', flexShrink:0, marginLeft:isMobile?0:0 }}>PK</div>
          <div>
            <div style={{ fontFamily:'Fraunces, serif', fontWeight:700, fontSize:isMobile?22:26, color:T.ink, letterSpacing:'-.02em' }}>Pratik Kumar</div>
            <div style={{ fontSize:13, color:T.greenDeep, fontWeight:700, marginTop:3, letterSpacing:'.02em' }}>Founder & CEO</div>
            <div style={{ fontSize:isMobile?13.5:14.5, color:T.inkSoft, lineHeight:1.65, marginTop:14 }}>
              Pratik built trav after spending years watching Indian travelers — including himself — try to plan weekend trips across Instagram, WhatsApp, and six different OTAs. He started trav to compress that whole experience into one product. Background in product and growth before founding trav.
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:14, marginTop:14, flexWrap:'wrap' }}>
              <a href="#" className="ab-link" style={{ color:T.grey, display:'inline-flex', alignItems:'center', gap:6, fontSize:12, fontWeight:600, textDecoration:'none' }}>
                <Ico name="users" size={13} color={T.grey}/> LinkedIn
              </a>
              <a href="#" className="ab-link" style={{ color:T.grey, display:'inline-flex', alignItems:'center', gap:6, fontSize:12, fontWeight:600, textDecoration:'none' }}>
                <Ico name="send" size={13} color={T.grey}/> X (Twitter)
              </a>
              <a href="mailto:pratik@trav.guide" className="ab-link" style={{ color:T.grey, display:'inline-flex', alignItems:'center', gap:6, fontSize:12, fontWeight:600, textDecoration:'none' }}>
                <Ico name="copy" size={13} color={T.grey}/> pratik@trav.guide
              </a>
              <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:10.5, fontWeight:700, color:T.greenDeep, background:'#F0FAF4', padding:'4px 10px', borderRadius:999, border:`1px solid ${T.green}33`, letterSpacing:'.04em' }}>
                Previously at MakeMyTrip
              </span>
            </div>
          </div>
        </div>

        <div style={{ height:1, background:T.greyLight, margin:isMobile?'0 0 18px':'0 0 26px' }}/>

        {/* Team grid */}
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)', gap:isMobile?12:14 }}>
          {team.map(m => (
            <div key={m.name} className="ab-team-card" style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.greyLight}`, padding:16, display:'flex', alignItems:'flex-start', gap:12 }}>
              <div style={{ width:48, height:48, borderRadius:'50%', background:`linear-gradient(135deg, ${m.tone}, ${m.tone}cc)`, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:800, flexShrink:0 }}>{m.init}</div>
              <div style={{ minWidth:0 }}>
                <div style={{ fontFamily:'Fraunces, serif', fontWeight:700, fontSize:15, color:T.ink, letterSpacing:'-.01em' }}>{m.name}</div>
                <div style={{ fontSize:11.5, color:T.grey, fontWeight:600, marginTop:2 }}>{m.role}</div>
                <div style={{ fontSize:12.5, color:T.inkSoft, marginTop:6, lineHeight:1.45 }}>{m.bio}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop:isMobile?20:28, textAlign:'center' }}>
          <div style={{ fontFamily:'Fraunces, serif', fontStyle:'italic', fontSize:isMobile?13:14, color:T.grey, lineHeight:1.6, maxWidth:560, margin:'0 auto' }}>
            We're a small team building Phase 1 in 2026 and hiring across product, engineering, and growth.
          </div>
          <div style={{ marginTop:10 }}>
            <a href="mailto:careers@trav.guide" className="ab-link" style={{ color:T.greenDeep, fontSize:13, fontWeight:700, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:5 }}>
              See open roles <Ico name="arrow-right" size={12} color={T.greenDeep} stroke={2.4}/>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ Section 6 — Recognition ============ */

function Recognition({ isMobile }) {
  const pad = isMobile ? 16 : 36;
  const badges = [
    { name:'DPIIT Startup India',   sub:'Recognised startup',          tone:'#0a3d62' },
    { name:'Startup Karnataka',     sub:'State recognition',           tone:'#dc3545' },
    { name:'NASSCOM 10,000 startups', sub:'Cohort 2026',               tone:'#1a73e8' },
  ];
  return (
    <section style={{ background:'#fff', padding:`${isMobile?32:48}px ${pad}px ${isMobile?32:48}px`, borderTop:`1px solid ${T.greyLight}`, borderBottom:`1px solid ${T.greyLight}` }}>
      <div style={{ maxWidth:1080, margin:'0 auto' }}>
        <div style={{ fontSize:11, fontWeight:800, color:T.grey, letterSpacing:'.18em', textAlign:'center', marginBottom:isMobile?16:22 }}>RECOGNITION</div>
        <div style={{ display:'flex', justifyContent:'center', gap:isMobile?10:14, flexWrap:'wrap' }}>
          {badges.map(b => (
            <div key={b.name} style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'10px 16px', borderRadius:12, background:'#FAFBFC', border:`1px solid ${T.greyLight}` }}>
              <div style={{ width:32, height:32, borderRadius:8, background:`${b.tone}18`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Ico name="shield" size={15} color={b.tone}/>
              </div>
              <div>
                <div style={{ fontSize:12.5, fontWeight:700, color:T.ink }}>{b.name}</div>
                <div style={{ fontSize:10.5, color:T.grey }}>{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize:11.5, color:T.grey, textAlign:'center', marginTop:14, lineHeight:1.5 }}>
          Recognised by the Government of India and the Karnataka Government as a registered startup.
        </div>
      </div>
    </section>
  );
}

/* ============ Section 7 — What's next ============ */

function WhatsNext({ isMobile }) {
  const pad = isMobile ? 16 : 36;
  const cities = ['Delhi','Mumbai','Bangalore','Pune','Hyderabad','Chennai','Kolkata','Ahmedabad','Jaipur','Lucknow','Chandigarh','Indore'];
  return (
    <section style={{ background:T.offWhite, padding:`${isMobile?44:72}px ${pad}px ${isMobile?40:64}px` }}>
      <div style={{ maxWidth:1080, margin:'0 auto', display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:isMobile?22:36, alignItems:'center' }}>
        <div>
          <div style={{ fontSize:11, fontWeight:800, color:T.greenDeep, letterSpacing:'.18em' }}>WHAT'S NEXT</div>
          <h2 style={{ fontFamily:'Fraunces, serif', fontWeight:700, color:T.ink, fontSize:isMobile?24:32, letterSpacing:'-.022em', lineHeight:1.15, margin:'12px 0 0' }}>
            Twelve cities. Twelve months. One platform.
          </h2>
          <div style={{ fontSize:isMobile?14:14.5, color:T.inkSoft, lineHeight:1.65, marginTop:14 }}>
            We're rolling out across India through 2026, starting from the cities where weekend trip behaviour is most concentrated. From there: international expansion in Year 2, beginning with Southeast Asia and the Middle East.
          </div>
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
          {cities.map((c,i) => {
            const live = i===0;
            return (
              <div key={c} style={{
                padding:'8px 14px 8px 10px', borderRadius:999,
                background: live ? '#F0FAF4' : '#fff',
                color: live ? T.greenDeep : T.inkSoft,
                border: `1.5px solid ${live ? T.green : T.greyLight}`,
                fontSize:12.5, fontWeight:live?700:600,
                display:'inline-flex', alignItems:'center', gap:7,
              }}>
                <span style={{ position:'relative', width:7, height:7, display:'inline-block' }}>
                  {live && <span style={{ position:'absolute', inset:0, borderRadius:'50%', background:T.green, opacity:.4, animation:'ab-bounce 1.6s ease-in-out infinite' }}/>}
                  <span style={{ position:'absolute', inset:0, borderRadius:'50%', background: live?T.green:T.greyLight }}/>
                </span>
                {c}
                <span style={{ fontSize:9.5, fontWeight:800, letterSpacing:'.1em', color:live?T.greenDeep:T.grey, marginLeft:2 }}>{live?'LIVE':'SOON'}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============ Section 8 — Reach us (navy) ============ */

function ReachUs({ isMobile, onOpenAllTrips }) {
  const pad = isMobile ? 16 : 36;
  const cols = [
    { eyebrow:'TRAVELERS', title:'Plan a weekend trip',         body:'Browse curated trips from your city. Book in five minutes.',                            cta:'Explore trips', icon:'pin',    onClick:onOpenAllTrips, href:null },
    { eyebrow:'PARTNERS',  title:'Partner with trav',           body:"Are you a DMC, hotel partner, or travel creator? We're actively onboarding.",          cta:'Become a partner', icon:'users', onClick:null, href:'mailto:partners@trav.guide' },
    { eyebrow:'INVESTORS', title:'Investor or press inquiry',   body:"We're raising seed and happy to talk to aligned partners.",                             cta:'Email investors@trav.guide', icon:'send', onClick:null, href:'mailto:investors@trav.guide' },
  ];
  return (
    <section style={{ background:ABOUT_NAVY, color:'#fff', padding:`${isMobile?48:72}px ${pad}px ${isMobile?56:80}px` }}>
      <div style={{ maxWidth:1080, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:isMobile?28:40 }}>
          <div style={{ fontSize:11, fontWeight:800, color:T.green, letterSpacing:'.18em' }}>REACH US</div>
          <h2 style={{ fontFamily:'Fraunces, serif', fontWeight:700, color:'#fff', fontSize:isMobile?26:36, letterSpacing:'-.025em', lineHeight:1.15, margin:'12px auto 0', maxWidth:680 }}>
            Three ways to talk to us.
          </h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)', gap:isMobile?12:16 }}>
          {cols.map(c => (
            <div key={c.eyebrow} style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.12)', borderRadius:16, padding:isMobile?20:24, display:'flex', flexDirection:'column' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:'rgba(29,191,115,.18)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Ico name={c.icon} size={15} color={T.green}/>
                </div>
                <div style={{ fontSize:10, fontWeight:800, color:T.green, letterSpacing:'.16em' }}>{c.eyebrow}</div>
              </div>
              <div style={{ fontFamily:'Fraunces, serif', fontWeight:700, fontSize:isMobile?17:18, color:'#fff', letterSpacing:'-.015em', lineHeight:1.3, marginBottom:8 }}>{c.title}</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,.7)', lineHeight:1.55, marginBottom:18, flex:1 }}>{c.body}</div>
              {c.href ? (
                <a href={c.href} className="ab-link" style={{ color:T.green, fontSize:13, fontWeight:700, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:5 }}>
                  {c.cta} <Ico name="arrow-right" size={12} color={T.green} stroke={2.4}/>
                </a>
              ) : (
                <button onClick={c.onClick} className="ab-link" style={{ background:'transparent', border:'none', padding:0, cursor:'pointer', color:T.green, fontSize:13, fontWeight:700, fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:5 }}>
                  {c.cta} <Ico name="arrow-right" size={12} color={T.green} stroke={2.4}/>
                </button>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop:isMobile?22:32, textAlign:'center', fontSize:13, color:'rgba(255,255,255,.6)' }}>
          Or just say hi: <a href="mailto:hello@trav.guide" className="ab-link" style={{ color:T.green, fontWeight:700, textDecoration:'none' }}>hello@trav.guide</a> · We reply within 24 hours.
        </div>
        <div style={{ marginTop:isMobile?18:28, textAlign:'center', fontSize:11, color:'rgba(255,255,255,.4)', letterSpacing:'.1em' }}>
          Made with care in Bengaluru, India
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { AboutPage });
