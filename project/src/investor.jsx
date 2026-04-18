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
          Indians take fifty-two weekends a year.
          <br/>
          None of them have a{' '}
          <span style={{ color:T.green, fontStyle:'italic' }}>platform</span>{'.'}
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

        {/* bottom scroll cue */}
        <div style={{
          position: isMobile ? 'static' : 'absolute',
          bottom: isMobile ? 'auto' : 24,
          marginTop: isMobile ? 36 : 0,
          display:'flex', flexDirection:'column', alignItems:'center', gap:4,
          color:T.grey, fontSize:11, letterSpacing:'.14em', fontWeight:600,
          animation:'invBounceY 2.4s ease-in-out infinite',
        }}>
          <Ico name="chevron-down" size={14} color={T.grey}/>
          <span>WHY NOW</span>
        </div>
      </div>
    </section>
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

Object.assign(window, { InvestorPage });
