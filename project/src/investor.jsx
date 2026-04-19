// Investor memo — two-screen editorial. The Idea + Why Now / The Ask.

const INV_NAVY = '#0F1F3D';

function InvestorPage({ onBack }) {
  const isMobile = useIsMobile();
  const download = () => {
    const a = document.createElement('a');
    a.href = 'trav-pitch-deck.pdf';
    a.download = 'trav-pitch-deck-2026.pdf';
    a.click();
  };

  return (
    <div style={{ background:'#fff' }}>
      <style>{`
        @keyframes invFadeUp { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform: translateY(0); } }
        @keyframes invBounceY { 0%,100% { transform: translateY(0); opacity:.7; } 50% { transform: translateY(4px); opacity:1; } }
        .inv-why-card { transition: border-color .18s ease, box-shadow .18s ease, transform .18s ease; }
        .inv-why-card:hover { border-color: ${T.green}; box-shadow: 0 10px 30px rgba(15,31,61,.08); transform: translateY(-2px); }
        .inv-link:hover { opacity:.8; }
      `}</style>

      <InvHero onBack={onBack} onDownload={download} isMobile={isMobile}/>
      <InvForces isMobile={isMobile}/>
      <InvWhyNow isMobile={isMobile}/>
      <InvAsk onDownload={download} isMobile={isMobile}/>
      <InvFooter isMobile={isMobile}/>
    </div>
  );
}

/* =============== Screen 1 — The Idea =============== */

function InvHero({ onBack, onDownload, isMobile }) {
  const pad = isMobile ? 16 : 36;
  const utilH = 32;
  // Screen 1 fills viewport minus global Nav (~64px) and the slim utility row.
  const contentMinH = `calc(100vh - 64px - ${utilH}px)`;

  return (
    <section style={{ background:'#fff', borderBottom:`1px solid ${T.greyLight}` }}>
      {/* utility row */}
      <div style={{
        height:utilH, padding:`0 ${pad}px`, display:'flex', alignItems:'center', justifyContent:'space-between',
        maxWidth:1180, margin:'0 auto'
      }}>
        <button onClick={onBack} className="inv-link" style={{
          background:'transparent', border:'none', padding:0, cursor:'pointer',
          color:T.grey, fontSize:12, fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:6,
        }}>
          <span style={{ fontSize:13, lineHeight:1 }}>{'\u2190'}</span>
          {isMobile ? 'Back' : 'Back to home'}
        </button>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:11, color:T.grey, fontWeight:700, letterSpacing:'.14em' }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:T.green, boxShadow:`0 0 0 4px ${T.green}22` }}/>
          RAISING SEED · APRIL 2026
        </div>
      </div>

      {/* centered hero */}
      <div style={{
        maxWidth:920, margin:'0 auto', padding:`${isMobile?24:40}px ${pad}px ${isMobile?32:56}px`,
        minHeight: isMobile ? 'auto' : contentMinH,
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        textAlign:'center', position:'relative',
      }}>
        {/* chip */}
        <div style={{
          display:'inline-flex', alignItems:'center', padding:'5px 14px', borderRadius:999,
          background:'#F0FAF4', color:T.greenDeep, fontSize:10.5, fontWeight:800,
          letterSpacing:'.14em', border:`1px solid ${T.green}33`,
        }}>
          INVESTOR MEMO · APRIL 2026
        </div>

        <div style={{ height:32 }}/>

        {/* H1 */}
        <h1 style={{
          fontFamily:'Fraunces, serif', fontWeight:700, color:T.ink,
          fontSize: isMobile ? 38 : 68, lineHeight:1.05, letterSpacing:'-.025em',
          margin:0,
        }}>
          Annual vacations are <span style={{ color:T.greySoft, textDecoration:'line-through' }}>dead.</span>
          <br/>
          The weekend is the new{' '}
          <span style={{ color:T.green, fontStyle:'italic' }}>vacation.</span>{'.'}
        </h1>

        <div style={{ height:32 }}/>

        {/* subtext */}
        <div style={{ maxWidth:720, fontSize:isMobile?16:18, lineHeight:1.55, color:T.inkSoft }}>
          Flights have IndiGo. Stays have Airbnb. Hotels have OYO.
          <br/>
          Weekend trips have a fragmented mess of OTAs, group operators, and Instagram screenshots.
          <div style={{ height:isMobile?14:18 }}/>
          <span style={{ color:T.ink, fontWeight:600 }}>trav is the platform for the category.</span>
        </div>

        <div style={{ height:40 }}/>
        
        {/* Market Momentum Graphic */}
        <div style={{ width:'100%', maxWidth:720, padding:`0 ${isMobile?0:40}px`, marginBottom:40 }}>
          <MarketMomentum isMobile={isMobile}/>
        </div>

        {/* CTA cluster */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:14 }}>
          <button onClick={onDownload} style={{
            height:52, padding:`0 ${isMobile?24:30}px`, borderRadius:999,
            background:T.green, color:'#fff', border:'none', cursor:'pointer',
            fontFamily:'inherit', fontSize:15, fontWeight:700,
            display:'inline-flex', alignItems:'center', gap:10,
            boxShadow:`0 10px 26px ${T.green}44`,
          }}>
            <Ico name="download" size={16} color="#fff" stroke={2.3}/>
            Download investor deck
          </button>
          <div style={{ fontSize:11, color:T.grey, letterSpacing:'.04em' }}>
            PDF · Confidential · April 2026
          </div>
          <a
            href="mailto:investors@trav.guide?subject=trav · investor inquiry"
            className="inv-link"
            style={{ fontSize:13, color:T.green, fontWeight:600, textDecoration:'none' }}
          >
            Or email investors@trav.guide {'\u2192'}
          </a>
        </div>

      </div>
    </section>
  );
}

function MarketMomentum({ isMobile }) {
  return (
    <div style={{ padding:'32px 28px', background:'#fff', borderRadius:24, border:`1px solid ${T.greyLight}`, textAlign:'left', boxShadow:'0 12px 30px rgba(0,0,0,.03)' }}>
      <style>{`
        @keyframes drawLine { from { stroke-dashoffset: 800; } to { stroke-dashoffset: 0; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:32 }}>
        <div>
          <div style={{ fontSize:10.5, fontWeight:800, color:T.greenDeep, letterSpacing:'.12em', textTransform:'uppercase' }}>Market Sentiment</div>
          <div style={{ fontSize:20, fontWeight:700, color:T.ink, marginTop:4, fontFamily:'Fraunces, serif' }}>The Frequency Shift</div>
        </div>
        <div style={{ display:'flex', gap:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ width:10, height:2, background:T.greyLight, borderRadius:1 }}/>
            <span style={{ fontSize:10, color:T.grey, fontWeight:700 }}>ANNUAL VACATION</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ width:10, height:2, background:T.green, borderRadius:1 }}/>
            <span style={{ fontSize:10, color:T.greenDeep, fontWeight:800 }}>WEEKEND HABITS</span>
          </div>
        </div>
      </div>
      <div style={{ height:140, position:'relative', display:'flex', alignItems:'flex-end' }}>
        {/* Y Axis Labels */}
        <div style={{ position:'absolute', left:-10, top:0, height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between', fontSize:9, color:T.grey, fontWeight:700 }}>
          <span>12.0x</span>
          <span>6.0x</span>
          <span>1.0x</span>
        </div>
        
        <div style={{ flex:1, height:'100%', position:'relative', marginLeft:24 }}>
          {/* Grid lines */}
          <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
            <div style={{ borderBottom:`1px solid ${T.offWhite}`, width:'100%' }}/>
            <div style={{ borderBottom:`1px solid ${T.offWhite}`, width:'100%' }}/>
            <div style={{ borderBottom:`1px solid ${T.ink}11`, width:'100%' }}/>
          </div>

          <svg viewBox="0 0 700 120" width="100%" height="100%" preserveAspectRatio="none" style={{ position:'absolute', bottom:0, left:0, overflow:'visible' }}>
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={T.green} stopOpacity="0.4"/>
                <stop offset="100%" stopColor={T.green} stopOpacity="1"/>
              </linearGradient>
            </defs>
            {/* Annual Line (Base) */}
            <path d="M0,80 L700,80" fill="none" stroke={T.greyLight} strokeWidth="1.5" strokeDasharray="6 4" />
            
            {/* Growth Curve */}
            <path d="M0,110 Q120,110 280,95 T700,5" 
              fill="none" stroke="url(#chartGrad)" strokeWidth="4" strokeLinecap="round"
              style={{ strokeDasharray: 800, strokeDashoffset: 800, animation: 'drawLine 2s ease-out forwards' }} />
            
            <circle cx="700" cy="5" r="5" fill={T.greenDeep} style={{ animation: 'fadeIn .5s 1.8s both' }}/>
          </svg>

          {/* Callout Label */}
          <div style={{ 
            position:'absolute', top:-15, right:-10, 
            background:T.greenDeep, color:'#fff', padding:'5px 10px', borderRadius:8,
            fontSize:12, fontWeight:800, boxShadow:`0 4px 12px ${T.green}44`,
            animation: 'fadeIn .5s 2s both'
          }}>
            5.2x Frequency
          </div>
        </div>
      </div>
      <div style={{ marginTop:24, display:'flex', justifyContent:'space-between', paddingLeft:24, fontSize:10, color:T.grey, fontWeight:700, letterSpacing:'.05em' }}>
        <span>2018</span>
        <span>2020</span>
        <span>2022</span>
        <span>2024</span>
        <span style={{ color:T.ink }}>2026 PROJ.</span>
      </div>
    </div>
  );
}

/* =============== New Section — Converging Forces Diagram =============== */

function InvForces({ isMobile }) {
  const pad = isMobile ? 16 : 36;
  return (
    <section style={{ background:T.offWhite, padding:`${isMobile?40:80}px ${pad}px`, borderBottom:`1px solid ${T.greyLight}` }}>
      <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:isMobile?40:80, alignItems:'center' }}>
        <div>
          <div style={{ fontSize:11, fontWeight:800, color:T.green, letterSpacing:'.18em', marginBottom:14 }}>CONVERGING FORCES</div>
          <h2 style={{ fontFamily:'Fraunces, serif', fontWeight:700, color:T.ink, fontSize:isMobile?32:46, lineHeight:1.05, margin:0 }}>
            Market dynamics<br/>favors the platform.
          </h2>
          <p style={{ fontSize:16, color:T.inkSoft, lineHeight:1.55, marginTop:20 }}>
            We're not just building an agency; we're capturing a structural shift in how Indians spend their time and money.
          </p>
        </div>
        <ForcesDiagram/>
      </div>
    </section>
  );
}

function ForcesDiagram() {
  return (
    <div style={{ position:'relative', height:320, background:'#fff', borderRadius:24, border:`1px solid ${T.greyLight}`, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
      <style>{`
        @keyframes forcePulse { 0% { transform:scale(1); opacity:.2; } 50% { transform:scale(1.2); opacity:.1; } 100% { transform:scale(1); opacity:.2; } }
        @keyframes forceRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
      
      {/* Central Nucleus */}
      <div style={{ position:'relative', zIndex:2, width:80, height:80, background:T.greenDeep, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 0 40px ${T.green}44` }}>
        <span style={{ position:'absolute', inset:-15, borderRadius:'50%', border:`2px solid ${T.green}33`, animation:'forcePulse 3s ease-in-out infinite' }}/>
        <span style={{ fontFamily:'Fraunces, serif', fontSize:22, fontWeight:700, color:'#fff', letterSpacing:'-.01em' }}>trav</span>
      </div>

      {/* Orbiting Nodes */}
      {[
        { id:1, label:'Recurring Behavior', icon:'calendar', angle:0 },
        { id:2, label:'Creator Economy', icon:'spark', angle:120 },
        { id:3, label:'The Trust Deficit', icon:'shield', angle:240 },
      ].map(node => (
        <div key={node.id} style={{
          position:'absolute',
          transform: `rotate(${node.angle}deg) translateY(-110px) rotate(-${node.angle}deg)`,
          display:'flex', flexDirection:'column', alignItems:'center', gap:8
        }}>
          <div style={{ width:48, height:48, background:'#fff', borderRadius:'50%', border:`1px solid ${T.greyLight}`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 12px rgba(0,0,0,.04)' }}>
            <Ico name={node.icon} size={20} color={T.green}/>
          </div>
          <div style={{ fontSize:11, fontWeight:700, color:T.ink, whiteSpace:'nowrap', background:'#fff', padding:'2px 8px', borderRadius:99, border:`1px solid ${T.greyLight}` }}>{node.label}</div>
        </div>
      ))}

      {/* Connection Lines */}
      <svg style={{ position:'absolute', inset:0, pointerEvents:'none' }} viewBox="0 0 400 320">
        {[0, 120, 240].map(angle => (
           <line key={angle} x1="200" y1="160" x2={200 + Math.cos((angle-90)*Math.PI/180)*110} y2={160 + Math.sin((angle-90)*Math.PI/180)*110} stroke={T.green} strokeWidth="1.5" strokeDasharray="4 4" opacity=".4" />
        ))}
      </svg>
    </div>
  );
}

/* =============== Screen 2 (top half) — Why Now =============== */

function InvWhyNow({ isMobile }) {
  const pad = isMobile ? 16 : 36;

  const cards = [
    {
      n:'01',
      title:'Weekend travel is now a recurring behaviour.',
      body:'Short-haul, impulse-friendly, no-leave-needed trips have replaced the annual vacation as the dominant Indian travel pattern. The frequency math changes everything downstream.',
    },
    {
      n:'02',
      title:'Creators are the new acquisition layer.',
      body:'India\u2019s travel creator economy moved from advertising to commerce. Demand generation now sits with niche creators, not paid OTA channels \u2014 and that demand is shoppable for the first time.',
    },
    {
      n:'03',
      title:'Trust is the unmet primitive.',
      body:'OTAs optimise for price. Group operators optimise for community. Nobody optimises for trust \u2014 verified supply, safety guarantees, and accountable post-booking experience. trav.her is the first move.',
    },
  ];

  return (
    <section style={{ background:'#fff', padding:`${isMobile?40:64}px ${pad}px ${isMobile?32:56}px` }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>

        <div style={{ textAlign:'center' }}>
          <div style={{
            fontSize:11, fontWeight:800, color:T.green, letterSpacing:'.18em',
          }}>WHY NOW</div>

          <h2 style={{
            fontFamily:'Fraunces, serif', fontWeight:700, color:T.ink,
            fontSize: isMobile ? 28 : 42, lineHeight:1.12, letterSpacing:'-.022em',
            margin:'14px auto 0', maxWidth:880,
          }}>
            Three forces are converging {'\u2014'} for the first time.
          </h2>

          <div style={{
            fontSize:14, fontStyle:'italic', color:T.grey, lineHeight:1.55,
            margin:'14px auto 0', maxWidth:640,
          }}>
            Each is structural. Each is non-reversible. Together they create the conditions for a new category to be owned.
          </div>
        </div>

        <div style={{ height:32 }}/>

        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? 16 : 22,
        }}>
          {cards.map((c, i) => (
            <InvWhyCard key={c.n} n={c.n} title={c.title} body={c.body} delay={i*120}/>
          ))}
        </div>

        <div style={{
          margin: `${isMobile?24:32}px auto 0`, maxWidth:720, textAlign:'center',
          fontSize:14, fontStyle:'italic', color:T.grey, lineHeight:1.6,
        }}>
          These three forces compound into a single platform that owns the moment, owns the supply, and owns the trust. A category large enough to build a generational company inside.
        </div>
      </div>
    </section>
  );
}

function InvWhyCard({ n, title, body, delay=0 }) {
  return (
    <div className="inv-why-card" style={{
      background:'#fff', border:`1px solid ${T.greyLight}`, borderRadius:12,
      padding:24, animation:`invFadeUp .6s ease both`, animationDelay:`${delay}ms`,
    }}>
      <div style={{
        fontFamily:'Fraunces, serif', fontSize:28, fontWeight:600,
        color:T.green, lineHeight:1, marginBottom:14, letterSpacing:'-.02em',
      }}>{n}</div>
      <div style={{
        fontFamily:'Fraunces, serif', fontSize:18, fontWeight:600, color:T.ink,
        lineHeight:1.3, letterSpacing:'-.015em', marginBottom:10,
      }}>{title}</div>
      <div style={{ fontSize:13, color:T.ink, lineHeight:1.6, opacity:.78 }}>
        {body}
      </div>
    </div>
  );
}

/* =============== Screen 2 (bottom half) — The Ask =============== */

function InvAsk({ onDownload, isMobile }) {
  const pad = isMobile ? 16 : 36;
  return (
    <section style={{ background:INV_NAVY, color:'#fff', padding:`${isMobile?40:72}px ${pad}px ${isMobile?44:80}px` }}>
      <div style={{ maxWidth:760, margin:'0 auto', textAlign:'center' }}>
        <div style={{
          fontSize:11, fontWeight:800, color:T.green, letterSpacing:'.18em',
        }}>THE ASK</div>

        <h2 style={{
          fontFamily:'Fraunces, serif', fontWeight:700, color:'#fff',
          fontSize: isMobile ? 28 : 42, lineHeight:1.12, letterSpacing:'-.022em',
          margin:'14px 0 0',
        }}>
          Raising seed to own the category.
        </h2>

        <div style={{
          fontSize:14, color:'#E5E7EB', lineHeight:1.55,
          margin:'18px auto 0', maxWidth:600,
        }}>
          Twelve cities. Twelve months. One product across travelers, creators, and operators.
          <br/>
          The model {'\u2014'} TAM and SAM, unit economics, cohort retention, creator LTV, supply-side margin profile, and the 24-month operating plan {'\u2014'} is in the deck.
        </div>

        <div style={{ height:48 }}/>
        
        {/* Market Funnel Visualization */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 32, alignItems: 'center', marginBottom: 48 }}>
           <MarketFunnel isMobile={isMobile}/>
           <EcosystemGrid isMobile={isMobile}/>
        </div>

        <div style={{ height:32 }}/>

        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
          <button onClick={onDownload} style={{
            height:56, padding:`0 ${isMobile?24:32}px`, borderRadius:999,
            background:'#fff', color:INV_NAVY, border:'none', cursor:'pointer',
            fontFamily:'inherit', fontSize:15, fontWeight:700,
            display:'inline-flex', alignItems:'center', gap:10,
            width: isMobile ? '100%' : 'auto',
            boxShadow:'0 12px 30px rgba(0,0,0,.28)',
          }}>
            <Ico name="download" size={16} color={INV_NAVY} stroke={2.3}/>
            Download investor deck
          </button>

          <a
            href="https://calendly.com/trav-investors/30min"
            target="_blank"
            rel="noreferrer"
            className="inv-link"
            style={{
              fontSize:13, color:T.green, fontWeight:600, textDecoration:'none',
              marginTop:0,
            }}
          >
            Or schedule a 30-minute call {'\u2192'}
          </a>

          <div style={{ fontSize:11, color:'#D0D5DD', marginTop:0 }}>
            investors@trav.guide · we reply within 24 hours
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============== Editorial mini-footer =============== */

function InvFooter({ isMobile }) {
  const pad = isMobile ? 16 : 36;
  return (
    <footer style={{
      background:T.offWhite, borderTop:`1px solid ${T.greyLight}`,
      padding:`${isMobile?16:18}px ${pad}px`,
    }}>
      <div style={{
        maxWidth:1180, margin:'0 auto',
        display:'flex', flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent:'space-between',
        gap: isMobile ? 10 : 12,
        minHeight: isMobile ? 'auto' : 32,
      }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
            <span style={{
              fontFamily:'Fraunces, serif', fontSize:18, fontWeight:700, color:T.greenDark, letterSpacing:'-.02em',
            }}>trav</span>
            <span style={{ width:6, height:6, borderRadius:'50%', background:T.green, display:'inline-block' }}/>
          </div>
          <span style={{ fontSize:11, color:T.grey }}>Confidential · For investor review only</span>
        </div>

        <div style={{ display:'inline-flex', alignItems:'center', gap:14, flexWrap:'wrap' }}>
          <a href="mailto:investors@trav.guide" className="inv-link" style={{
            fontSize:11, color:T.ink, textDecoration:'none', fontWeight:600,
          }}>investors@trav.guide</a>
          <a href="#" className="inv-link" style={{ fontSize:11, color:T.grey, textDecoration:'none' }}>Privacy</a>
          <a href="#" className="inv-link" style={{ fontSize:11, color:T.grey, textDecoration:'none' }}>Terms</a>
        </div>
      </div>
    </footer>
  );
}

function MarketFunnel({ isMobile }) {
  return (
    <div style={{ textAlign:'left', padding:24, background:'rgba(255,255,255,.03)', borderRadius:20, border:'1px solid rgba(255,255,255,.08)' }}>
      <div style={{ fontSize:10, fontWeight:800, color:T.green, letterSpacing:'.1em', marginBottom:20 }}>MARKET OPPORTUNITY (INDIA)</div>
      {[
        { label:'TOTAL TRAVEL MARKET', val:'$52BN', sub:'Domestic leisure travel', fill:'rgba(255,255,255,.05)' },
        { label:'SERVICEABLE MARKET', val:'$24BN', sub:'Short-haul & Weekend category', fill:'rgba(255,255,255,.08)' },
        { label:'OUR TARGET SHARE', val:'$2.8BN', sub:'12% segment penetration', fill:T.green, color:INV_NAVY },
      ].map((lvl,i) => (
        <div key={lvl.label} style={{ marginBottom:14, position:'relative' }}>
          <div style={{ background:lvl.fill, padding:'14px 20px', borderRadius:12, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
               <div style={{ fontSize:10, fontWeight:700, opacity:.7, color:lvl.color||'#fff' }}>{lvl.label}</div>
               <div style={{ fontSize:13, color:lvl.color||'#fff', opacity:.6, marginTop:2 }}>{lvl.sub}</div>
            </div>
            <div style={{ fontSize:22, fontWeight:800, color:lvl.color||'#fff', fontFamily:'Fraunces, serif' }}>{lvl.val}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EcosystemGrid({ isMobile }) {
  return (
    <div style={{ textAlign:'left' }}>
      <div style={{ fontSize:10, fontWeight:800, color:'rgba(255,255,255,.4)', letterSpacing:'.1em', marginBottom:20 }}>THE PRODUCT ECOSYSTEM</div>
      <div style={{ display:'grid', gap:10 }}>
        {[
          { icon:'users', label:'Travelers', sub:'Native mobile app focused on checkout & discovery.' },
          { icon:'camera', label:'Creators', sub:'Dashboard for trip orchestration & revenue tracking.' },
          { icon:'tent', label:'Operators', sub:'LMS for real-time inventory & guest verification.' },
        ].map(it => (
          <div key={it.label} style={{ display:'flex', gap:16, alignItems:'center', padding:14, background:'rgba(255,255,255,.02)', borderRadius:12 }}>
            <div style={{ width:40, height:40, borderRadius:8, background:'rgba(255,255,255,.06)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Ico name={it.icon} size={20} color={T.green}/>
            </div>
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:'#fff' }}>{it.label}</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,.5)', marginTop:2 }}>{it.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { InvestorPage });
