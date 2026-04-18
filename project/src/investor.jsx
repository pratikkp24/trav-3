// Investor page — compact 2-scroll pitch with ONE primary action: download the deck.
// No sign-up, no form. The pitch speaks for itself. Everything above sells the story;
// the button below seals the ask.

function InvestorPage({ onBack }) {
  const [downloading, setDownloading] = React.useState(false);
  const download = () => {
    setDownloading(true);
    // Placeholder: in production this links to the hosted PDF in /decks
    const a = document.createElement('a');
    a.href = 'trav-pitch-deck.pdf';
    a.download = 'trav-pitch-deck-2026.pdf';
    a.click();
    setTimeout(()=>setDownloading(false), 1400);
  };

  const stats = [
    { k:'₹2.4Cr', v:'ARR run-rate', sub:'Apr 2026 · +38% QoQ' },
    { k:'12,400', v:'weekend travelers', sub:'FY26 · repeat rate 41%' },
    { k:'180+', v:'creator partners', sub:'Across 14 cities' },
    { k:'4.8★', v:'avg trip rating', sub:'Across 1,240 reviews' },
  ];
  const pillars = [
    { icon:'spark', t:'Creator-led demand', b:'180+ niche travel creators drive trips. We pay post-booking — CAC stays under ₹600.' },
    { icon:'shield', t:'Trust-first supply', b:'Every DMC is vetted, insured, and reviewed. Women-only trips via trav.her with a 96 NPS.' },
    { icon:'users', t:'Community moat', b:'12k WhatsApp community, 41% repeat rate, 22% invite-based bookings.' },
  ];
  const numbers = [
    { k:'GMV FY27 target', v:'₹120Cr', sub:'4.3× FY26 @ 22% CM' },
    { k:'Take rate', v:'28–32%', sub:'vs OTA ~9%' },
    { k:'Contribution margin', v:'22%', sub:'Post-CAC, post-ops' },
    { k:'Raising', v:'$4M Seed', sub:'18-month runway · ₹100Cr ARR' },
  ];

  return (
    <div style={{ background:T.offWhite, minHeight:'calc(100vh - 64px)' }}>
      {/* ───── HERO ───── */}
      <div style={{ position:'relative', overflow:'hidden', borderBottom:`1px solid ${T.greyLight}` }}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 1200px 520px at 30% 0%, ${T.green}14 0%, transparent 60%), radial-gradient(ellipse 900px 400px at 85% 20%, ${T.rose}12 0%, transparent 60%)`, pointerEvents:'none' }}/>
        <div style={{ maxWidth:1180, margin:'0 auto', padding:'32px 36px 72px', position:'relative' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:34 }}>
            <Btn kind="ghost" size="sm" icon="arrow-left" onClick={onBack}>Back to home</Btn>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:11, color:T.grey, fontWeight:600, letterSpacing:'.12em' }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:T.green }}/> RAISING SEED · APRIL 2026
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1.35fr 1fr', gap:60, alignItems:'center' }}>
            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 12px', borderRadius:999, background:'#fff', color:T.greenDeep, fontSize:11, fontWeight:800, letterSpacing:'.14em', border:`1px solid ${T.green}33`, marginBottom:20 }}>
                <Ico name="spark" size={11} color={T.greenDeep}/> FOR INVESTORS
              </div>
              <h1 style={{ fontSize:56, fontWeight:700, color:T.ink, letterSpacing:'-.035em', lineHeight:1.02, margin:0, fontFamily:'Fraunces, serif' }}>
                We turn travel inspiration into <span style={{ color:T.green, fontStyle:'italic' }}>bookable</span> itineraries.
              </h1>
              <div style={{ fontSize:17, color:T.grey, marginTop:18, lineHeight:1.55, maxWidth:560 }}>
                trav bridges the gap between creator-led travel demand and vetted, bookable supply.
                One product, three loops: creators generate intent, travelers convert faster, DMCs earn without middlemen.
                The Indian outbound + domestic short-haul market is $42B and unpriced for trust.
              </div>
              <div style={{ marginTop:32, display:'flex', alignItems:'center', gap:14, flexWrap:'wrap' }}>
                <button onClick={download} disabled={downloading} style={{
                  height:56, padding:'0 30px', borderRadius:999, background:downloading?T.greenDeep:T.green, color:'#fff',
                  border:'none', fontSize:15, fontWeight:700, cursor:downloading?'progress':'pointer', fontFamily:'inherit',
                  display:'inline-flex', alignItems:'center', gap:10, boxShadow:`0 10px 24px ${T.green}55`,
                  transition:'all .15s'
                }}>
                  <Ico name="download" size={17} color="#fff" stroke={2.3}/>
                  {downloading ? 'Preparing deck…' : 'Download pitch deck'}
                </button>
                <div style={{ fontSize:12.5, color:T.grey, lineHeight:1.4 }}>
                  <b style={{ color:T.ink, fontWeight:700 }}>PDF · 28 slides · 4.2 MB</b><br/>
                  Updated April 2026
                </div>
              </div>
            </div>
            <div style={{ background:'#fff', borderRadius:22, border:`1px solid ${T.greyLight}`, padding:28, boxShadow:'0 20px 60px rgba(15,30,46,.08)' }}>
              <div style={{ fontSize:10.5, fontWeight:800, color:T.greenDeep, letterSpacing:'.18em', marginBottom:14 }}>SNAPSHOT · Q1 FY26</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:0 }}>
                {stats.map((s,i) => (
                  <div key={s.v} style={{
                    padding:'18px 6px 18px 0',
                    borderRight: i%2===0 ? `1px solid ${T.greyLight}` : 'none',
                    paddingLeft: i%2===1 ? 18 : 0,
                    borderBottom: i<2 ? `1px solid ${T.greyLight}` : 'none',
                  }}>
                    <div style={{ fontSize:30, fontWeight:800, color:T.ink, letterSpacing:'-.02em', fontFamily:'Fraunces, serif', lineHeight:1 }}>{s.k}</div>
                    <div style={{ fontSize:13, fontWeight:600, color:T.ink, marginTop:8 }}>{s.v}</div>
                    <div style={{ fontSize:11.5, color:T.grey, marginTop:3 }}>{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ───── PILLARS ───── */}
      <div style={{ maxWidth:1180, margin:'0 auto', padding:'72px 36px 40px' }}>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:28, flexWrap:'wrap', gap:16 }}>
          <div>
            <div style={{ fontSize:11, fontWeight:800, color:T.greenDeep, letterSpacing:'.18em', marginBottom:6 }}>THE THESIS</div>
            <h2 style={{ fontSize:36, fontWeight:700, color:T.ink, letterSpacing:'-.025em', margin:0, fontFamily:'Fraunces, serif' }}>Three compounding loops.</h2>
          </div>
          <div style={{ fontSize:13, color:T.grey, maxWidth:420, lineHeight:1.55 }}>
            Every trip booked strengthens demand, supply, and community — independently. Compounding, not one-shot.
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16 }}>
          {pillars.map(p => (
            <div key={p.t} style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.greyLight}`, padding:24 }}>
              <div style={{ width:42, height:42, borderRadius:12, background:'#F0FAF4', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14 }}>
                <Ico name={p.icon} size={18} color={T.greenDeep}/>
              </div>
              <div style={{ fontSize:18, fontWeight:700, color:T.ink, fontFamily:'Fraunces, serif', letterSpacing:'-.015em', marginBottom:6 }}>{p.t}</div>
              <div style={{ fontSize:13.5, color:T.grey, lineHeight:1.55 }}>{p.b}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ───── NUMBERS + CTA ───── */}
      <div style={{ maxWidth:1180, margin:'0 auto', padding:'0 36px 80px' }}>
        <div style={{ background:T.ink, color:'#fff', borderRadius:22, padding:'44px 44px 36px', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', right:-120, top:-120, width:380, height:380, borderRadius:'50%', background:`radial-gradient(circle, ${T.green}44 0%, transparent 70%)`, pointerEvents:'none' }}/>
          <div style={{ position:'relative' }}>
            <div style={{ fontSize:11, fontWeight:800, color:T.green, letterSpacing:'.18em', marginBottom:8 }}>THE ASK</div>
            <h2 style={{ fontSize:34, fontWeight:700, letterSpacing:'-.025em', margin:0, fontFamily:'Fraunces, serif', maxWidth:700 }}>
              $4M Seed to hit ₹100Cr ARR in 18 months.
            </h2>
            <div style={{ fontSize:14.5, color:'rgba(255,255,255,.7)', marginTop:10, maxWidth:620, lineHeight:1.55 }}>
              The full model — unit economics, cohort curves, creator LTV, and the 24-month roadmap — is in the deck.
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:0, marginTop:36, marginBottom:34 }}>
              {numbers.map((n,i) => (
                <div key={n.k} style={{ padding:'2px 20px 2px 0', borderRight: i<3 ? '1px solid rgba(255,255,255,.14)' : 'none', paddingLeft: i>0 ? 20 : 0 }}>
                  <div style={{ fontSize:11, color:'rgba(255,255,255,.55)', letterSpacing:'.14em', fontWeight:700, marginBottom:8 }}>{n.k.toUpperCase()}</div>
                  <div style={{ fontSize:26, fontWeight:800, letterSpacing:'-.02em', fontFamily:'Fraunces, serif' }}>{n.v}</div>
                  <div style={{ fontSize:12, color:'rgba(255,255,255,.6)', marginTop:4 }}>{n.sub}</div>
                </div>
              ))}
            </div>
            <button onClick={download} disabled={downloading} style={{
              height:56, padding:'0 30px', borderRadius:999, background:'#fff', color:T.ink,
              border:'none', fontSize:15, fontWeight:700, cursor:downloading?'progress':'pointer', fontFamily:'inherit',
              display:'inline-flex', alignItems:'center', gap:10,
              transition:'all .15s'
            }}>
              <Ico name="download" size={17} color={T.ink} stroke={2.3}/>
              {downloading ? 'Preparing deck…' : 'Download pitch deck'}
            </button>
            <div style={{ fontSize:12, color:'rgba(255,255,255,.55)', marginTop:18, lineHeight:1.5 }}>
              Questions? Email <a href="mailto:investors@trav.guide" style={{ color:T.green, textDecoration:'none', fontWeight:700 }}>investors@trav.guide</a> · We reply within 24 hours.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { InvestorPage });
