// Trav Coins — UI surfaces.
// Includes:
//   • TravCoinsPage — public /trav-coins explainer page
//   • WalletPanel   — profile Wallet tab
//   • BookingCoinsModule — pre-payment hint inside QuickBook price card
//   • BookingCoinsCelebration — post-success card on confirmation page
//   • CoinsReadyInline / CoinsExpiringInline — dismissable nudges

// ─── Shared coin glyph ──────────────────────────────────────────────────────
// Using the emoji for now — renders consistently across the UI, no filter issues
// inside .theme-flip because emojis are glyphs, not colored elements.
function CoinGlyph({ size=16 }) {
  return <span style={{ fontSize:size, lineHeight:1, display:'inline-block' }}>🪙</span>;
}

function coinBadge(text, { bg=T.goldSoft, fg=T.goldDeep }={}) {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 10px', borderRadius:999, background:bg, color:fg, fontSize:10.5, fontWeight:800, letterSpacing:'.1em', border:`1px solid ${T.gold}33` }}>
      {text}
    </span>
  );
}

/* =============================================================================
   1. Public explainer page — /trav-coins
============================================================================= */
function TravCoinsPage({ onBack, onSignup, onOpenWallet, loggedIn }) {
  const isMobile = useIsMobile();
  const w = getWallet();
  const hasActivity = w.balance > 0 || w.transactions.some(t => t.status === 'credited');

  return (
    <div style={{ background:T.offWhite, minHeight:'calc(100vh - 64px)' }}>
      {/* HERO */}
      <section style={{ background:`linear-gradient(180deg, ${T.goldSoft} 0%, #fff 100%)`, padding: isMobile ? '32px 16px 40px' : '60px 36px 80px', borderBottom:`1px solid ${T.greyLight}` }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: isMobile ? 24 : 48, alignItems:'center' }}>
          <div>
            <Btn kind="ghost" size="sm" icon="arrow-left" onClick={onBack} style={{ marginBottom:18, marginLeft:-10 }}>Back</Btn>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'5px 12px', borderRadius:999, background:'#fff', color:T.goldDeep, fontSize:11, fontWeight:800, letterSpacing:'.14em', border:`1px solid ${T.gold}55`, marginBottom:14 }}>
              <CoinGlyph size={14}/> TRAV COINS · REWARDS
            </div>
            <h1 style={{ fontSize: isMobile ? 34 : 52, fontWeight:700, color:T.ink, letterSpacing:'-.025em', margin:0, fontFamily:'Fraunces, serif', lineHeight:1.05 }}>
              Book trips.<br/>Earn coins.<br/><span style={{ color:T.goldDeep }}>Spend them on trips.</span>
            </h1>
            <p style={{ fontSize: isMobile ? 14 : 16, color:T.grey, marginTop:16, maxWidth:540, lineHeight:1.55 }}>
              1 Trav Coin = ₹1. Earn on every booking, referral, review, or travelogue.
              Small, honest rewards that actually stack into a discount on your next trip.
            </p>
            <div style={{ display:'flex', gap:10, marginTop:22, flexWrap:'wrap' }}>
              <Btn kind="primary" size="lg" trailing="arrow-right" onClick={loggedIn ? onOpenWallet : onSignup}>
                {loggedIn ? 'Open my wallet' : 'Sign up to start earning'}
              </Btn>
              <a href="#how-earn" style={{ textDecoration:'none' }}>
                <Btn kind="outline" size="lg">How it works</Btn>
              </a>
            </div>
            <div style={{ marginTop:18, padding:'10px 14px', background:'#fff', borderRadius:12, border:`1px solid ${T.gold}33`, display:'inline-flex', alignItems:'center', gap:10, maxWidth:520 }}>
              <Ico name="shield" size={15} color={T.goldDeep}/>
              <span style={{ fontSize:12, color:T.inkSoft, lineHeight:1.4 }}>
                Max <b style={{ color:T.ink }}>500 coins earned per quarter</b> per user. We keep it honest so the program lasts.
              </span>
            </div>
          </div>
          {/* Wallet preview card */}
          <div style={{ background:'#fff', borderRadius:20, border:`1.5px solid ${T.gold}55`, padding:20, boxShadow:'0 20px 50px rgba(245,166,35,.12)' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
              <span style={{ fontSize:10.5, fontWeight:800, color:T.grey, letterSpacing:'.14em' }}>YOUR WALLET</span>
              {coinBadge('LIVE')}
            </div>
            <div style={{ display:'flex', alignItems:'baseline', gap:10 }}>
              <CoinGlyph size={32}/>
              <div>
                <div style={{ fontSize:40, fontWeight:800, color:T.ink, fontFamily:'Fraunces, serif', letterSpacing:'-.02em', lineHeight:1 }}>{hasActivity ? w.balance : 0}</div>
                <div style={{ fontSize:12, color:T.grey, marginTop:4 }}>Trav Coins · = ₹{hasActivity ? w.balance : 0}</div>
              </div>
            </div>
            {hasActivity ? (
              <>
                <div style={{ height:8, borderRadius:999, background:T.greyLight, overflow:'hidden', marginTop:16 }}>
                  <div style={{ height:'100%', width:`${Math.min(100, (w.balance / COIN_RULES.MIN_REDEEM) * 100)}%`, background:`linear-gradient(90deg, ${T.gold}, ${T.goldDeep})`, borderRadius:999 }}/>
                </div>
                <div style={{ fontSize:11.5, color:T.grey, marginTop:6 }}>
                  {w.balance >= COIN_RULES.MIN_REDEEM
                    ? <span style={{ color:T.greenDeep, fontWeight:700 }}>✓ Ready to redeem on your next trip</span>
                    : <>{COIN_RULES.MIN_REDEEM - w.balance} more to unlock redemption</>}
                </div>
                <Btn kind="outline" size="sm" full trailing="arrow-right" onClick={onOpenWallet} style={{ marginTop:14 }}>Open wallet</Btn>
              </>
            ) : (
              <>
                <div style={{ fontSize:12.5, color:T.grey, marginTop:14, lineHeight:1.5 }}>Sign up to start earning on your first booking, referral, or review.</div>
                <Btn kind="primary" size="sm" full trailing="arrow-right" onClick={onSignup} style={{ marginTop:14 }}>Sign up to start earning</Btn>
              </>
            )}
          </div>
        </div>
      </section>

      {/* HOW YOU EARN */}
      <section id="how-earn" style={{ padding: isMobile ? '40px 16px' : '72px 36px', maxWidth:1100, margin:'0 auto' }}>
        <h2 style={{ fontSize: isMobile?26:36, fontWeight:700, color:T.ink, letterSpacing:'-.02em', margin:0, fontFamily:'Fraunces, serif' }}>How you earn</h2>
        <p style={{ fontSize:14, color:T.grey, marginTop:8, maxWidth:560 }}>Six ways to stack coins. Every one has a cap — so the wallet stays meaningful.</p>
        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap:14, marginTop:24 }}>
          {[
            { icon:'bag',   title:'Book a trip',           sub:'0.5% back in Trav Coins, credited 24h after the trip ends.',    cap:`Up to ${COIN_RULES.BOOKING_CASHBACK_CAP} coins / booking` },
            { icon:'users', title:'Refer a friend',        sub:'Both get 50 coins when they sign up. 100 more each on their first booking.', cap:`Max ${COIN_RULES.REFERRALS_PER_YEAR} successful referrals / year` },
            { icon:'star',  title:'Rate your trip',        sub:'10 coins for every honest 30-second review after you travel.',   cap:`10 coins / rated trip` },
            { icon:'edit',  title:'Publish a travelogue',  sub:'25 coins when a curator approves your story.',                    cap:`Max 1 approved / quarter` },
            { icon:'check', title:'Complete your profile', sub:'50 coins, one-time. Adds name, email, phone, ID.',                cap:`One-time bonus` },
            { icon:'sparkle-ring', title:'Global cap',      sub:'So rewards stay honest and don\'t get farmed.',                   cap:`${COIN_RULES.QUARTERLY_EARN_CAP} coins / quarter · ${COIN_RULES.LIFETIME_BALANCE_CAP} max wallet` },
          ].map(c => (
            <div key={c.title} style={{ background:'#fff', borderRadius:16, padding:18, border:`1px solid ${T.greyLight}` }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                <div style={{ width:34, height:34, borderRadius:10, background:T.goldSoft, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Ico name={c.icon} size={16} color={T.goldDeep}/>
                </div>
                <div style={{ fontSize:14.5, fontWeight:700, color:T.ink, fontFamily:'Fraunces, serif' }}>{c.title}</div>
              </div>
              <div style={{ fontSize:12.5, color:T.grey, lineHeight:1.55, minHeight:50 }}>{c.sub}</div>
              <div style={{ marginTop:10 }}>{coinBadge(c.cap)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW YOU REDEEM */}
      <section style={{ background:'#fff', padding: isMobile ? '40px 16px' : '72px 36px', borderTop:`1px solid ${T.greyLight}`, borderBottom:`1px solid ${T.greyLight}` }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <h2 style={{ fontSize: isMobile?26:36, fontWeight:700, color:T.ink, letterSpacing:'-.02em', margin:0, fontFamily:'Fraunces, serif' }}>How you redeem</h2>
          <p style={{ fontSize:14, color:T.grey, marginTop:8, maxWidth:560 }}>At checkout, toggle coins on. We take them off your total. No fees, no fine print.</p>
          <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile?18:32, marginTop:26, alignItems:'start' }}>
            <div>
              <div style={{ fontSize:11, fontWeight:800, color:T.grey, letterSpacing:'.14em', marginBottom:10 }}>THE RULES</div>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13.5 }}>
                <tbody>
                  {[
                    ['Min redemption', `${COIN_RULES.MIN_REDEEM} coins`],
                    ['Max per booking', `min(5% of trip, ${COIN_RULES.MAX_REDEEM_ABS} coins)`],
                    ['Min trip value', `₹${COIN_RULES.MIN_TRIP_FOR_REDEEM.toLocaleString('en-IN')}`],
                    ['Burn order', 'FIFO — oldest coins first'],
                    ['Applies to', 'Trip base only · not fees or GST'],
                    ['Stacking', `Can't stack with FIRSTRIP promo`],
                  ].map(([k,v]) => (
                    <tr key={k} style={{ borderBottom:`1px solid ${T.greyLight}` }}>
                      <td style={{ padding:'12px 0', color:T.grey }}>{k}</td>
                      <td style={{ padding:'12px 0', color:T.ink, fontWeight:600, textAlign:'right' }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <div style={{ fontSize:11, fontWeight:800, color:T.grey, letterSpacing:'.14em', marginBottom:10 }}>WHY THESE LIMITS</div>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {[
                  { t:'Margins stay honest', s:'We never burn margin we don\'t have. If we promised 10%, we\'d have to pull it later.' },
                  { t:'Creators still earn', s:'Coins come from our margin, not the creator or DMC share. Your trip cost stays the same for them.' },
                  { t:'No farming', s:'Quarterly and wallet caps block bot-style rewards farming. Honest travelers always come out ahead.' },
                  { t:'Expiry keeps it fresh', s:`Coins expire ${Math.round(COIN_RULES.EXPIRY_DAYS/30)} months after earning. Use them on your next trip.` },
                ].map(r => (
                  <div key={r.t} style={{ padding:14, borderRadius:12, border:`1px solid ${T.greyLight}`, background:T.offWhite }}>
                    <div style={{ fontSize:13.5, fontWeight:700, color:T.ink, fontFamily:'Fraunces, serif' }}>{r.t}</div>
                    <div style={{ fontSize:12.5, color:T.grey, marginTop:4, lineHeight:1.5 }}>{r.s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REFER & EARN */}
      <section style={{ padding: isMobile ? '40px 16px' : '72px 36px', maxWidth:1100, margin:'0 auto' }}>
        <h2 style={{ fontSize: isMobile?26:36, fontWeight:700, color:T.ink, letterSpacing:'-.02em', margin:0, fontFamily:'Fraunces, serif' }}>Refer a friend</h2>
        <p style={{ fontSize:14, color:T.grey, marginTop:8, maxWidth:560 }}>Both sides earn. Both sides travel.</p>
        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap:14, marginTop:24 }}>
          {[
            { n:'01', t:'Share your link', s:'Copy the link. Drop it in WhatsApp, DM, or email.' },
            { n:'02', t:'They sign up',    s:'Both of you get 50 coins the moment they join trav.' },
            { n:'03', t:'They book a trip',s:'Both get 100 more coins on their first booking.' },
          ].map(s => (
            <div key={s.n} style={{ background:'#fff', borderRadius:16, padding:18, border:`1px solid ${T.greyLight}` }}>
              <div style={{ fontSize:11, fontWeight:800, color:T.goldDeep, letterSpacing:'.14em', marginBottom:6 }}>{s.n}</div>
              <div style={{ fontSize:16, fontWeight:700, color:T.ink, fontFamily:'Fraunces, serif', letterSpacing:'-.01em' }}>{s.t}</div>
              <div style={{ fontSize:12.5, color:T.grey, marginTop:6, lineHeight:1.5 }}>{s.s}</div>
            </div>
          ))}
        </div>
        <ReferralLinkCard compact={false}/>
      </section>

      {/* FAQ */}
      <section style={{ background:T.offWhite, padding: isMobile ? '40px 16px' : '72px 36px', borderTop:`1px solid ${T.greyLight}` }}>
        <div style={{ maxWidth:820, margin:'0 auto' }}>
          <h2 style={{ fontSize: isMobile?26:36, fontWeight:700, color:T.ink, letterSpacing:'-.02em', margin:0, fontFamily:'Fraunces, serif', textAlign:'center' }}>Common questions</h2>
          <div style={{ marginTop:24, display:'flex', flexDirection:'column', gap:10 }}>
            {[
              { q:'Why are rewards smaller than other apps?', a:'Because honest ones last. We give 0.5% not 10% because that\'s what our margin actually supports. If we promised 10%, we\'d quietly pull it back in six months. Small and stable beats big and fake.' },
              { q:'When do coins hit my wallet?', a:'24 hours after your trip ends. Referral coins credit when your friend signs up. Review and travelogue coins credit when approved.' },
              { q:'Do coins expire?', a:'Yes — 6 months after earning. FIFO burn means oldest coins are spent first when you redeem.' },
              { q:'Can I stack coins with a coupon?', a:'No. Only one incentive can apply per booking. If FIRSTRIP is on, coins are off, and vice versa.' },
              { q:'What if my booking is cancelled?', a:'Pending cashback for that trip is reversed. Already-credited coins from referrals and reviews stay with you.' },
              { q:'Is there a wallet limit?', a:`Yes — ${COIN_RULES.LIFETIME_BALANCE_CAP} coins. Once you hit it, new earning pauses until you redeem. This keeps the program sustainable.` },
            ].map(f => <FAQItem key={f.q} q={f.q} a={f.a}/>)}
          </div>
          <div style={{ marginTop:32, textAlign:'center' }}>
            <Btn kind="primary" size="lg" trailing="arrow-right" onClick={loggedIn ? onOpenWallet : onSignup}>
              {loggedIn ? 'Open my wallet' : 'Sign up to start earning'}
            </Btn>
          </div>
        </div>
      </section>
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.greyLight}`, overflow:'hidden' }}>
      <div onClick={()=>setOpen(o=>!o)} style={{ padding:'16px 18px', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', gap:12 }}>
        <div style={{ fontSize:14, fontWeight:600, color:T.ink, fontFamily:'Fraunces, serif', letterSpacing:'-.01em' }}>{q}</div>
        <Ico name={open?'minus':'plus'} size={14} color={T.grey}/>
      </div>
      {open && <div style={{ padding:'0 18px 16px', fontSize:13, color:T.grey, lineHeight:1.6 }}>{a}</div>}
    </div>
  );
}

function ReferralLinkCard({ compact = false, onSimSignup, onSimBooking }) {
  const w = getWallet();
  const [copied, setCopied] = React.useState(false);
  const link = 'trav.app/r/aditi';
  const copy = () => { try { navigator.clipboard?.writeText(link); } catch {} setCopied(true); setTimeout(()=>setCopied(false), 1500); };
  const cap = COIN_RULES.REFERRALS_PER_YEAR;
  const used = w.referralsThisYear || 0;
  return (
    <div style={{ marginTop: compact ? 0 : 24, background:'#fff', borderRadius:16, border:`1.5px solid ${T.gold}55`, padding:18 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
        <CoinGlyph size={20}/>
        <div style={{ fontSize:15, fontWeight:700, color:T.ink, fontFamily:'Fraunces, serif' }}>Your referral link</div>
        <div style={{ marginLeft:'auto', fontSize:11.5, color:T.grey, fontWeight:600 }}>Used <b style={{ color:T.ink }}>{used}</b>/{cap} this year</div>
      </div>
      <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
        <div style={{ flex:'1 1 200px', minWidth:180, height:42, borderRadius:10, border:`1px solid ${T.greyLight}`, background:T.offWhite, display:'flex', alignItems:'center', padding:'0 14px', fontFamily:'ui-monospace, Menlo, monospace', fontSize:13, color:T.ink, fontWeight:600 }}>{link}</div>
        <Btn kind="primary" size="md" icon={copied?'check':'copy'} onClick={copy}>{copied?'Copied':'Copy link'}</Btn>
      </div>
      <div style={{ display:'flex', gap:8, marginTop:12, flexWrap:'wrap' }}>
        {[
          { i:'whatsapp', l:'WhatsApp' },
          { i:'send',     l:'Email' },
          { i:'spark',    l:'Instagram' },
          { i:'share',    l:'X' },
        ].map(s => (
          <button key={s.l} onClick={()=>alert(`Share via ${s.l} — coming soon`)} style={{ height:34, padding:'0 12px', borderRadius:999, background:T.offWhite, border:`1px solid ${T.greyLight}`, fontSize:12, fontWeight:600, color:T.ink, cursor:'pointer', fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:6 }}>
            <Ico name={s.i==='share'?'arrow-right':s.i} size={12} color={T.greenDeep}/> {s.l}
          </button>
        ))}
      </div>
      {/* Cap meter */}
      <div style={{ marginTop:14, height:6, borderRadius:999, background:T.greyLight, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${(used/cap)*100}%`, background:`linear-gradient(90deg, ${T.gold}, ${T.goldDeep})`, borderRadius:999 }}/>
      </div>
      {(onSimSignup || onSimBooking) && (
        <div style={{ marginTop:14, paddingTop:12, borderTop:`1px dashed ${T.greyLight}`, display:'flex', gap:8, flexWrap:'wrap' }}>
          <div style={{ fontSize:10.5, color:T.grey, fontWeight:700, letterSpacing:'.1em', alignSelf:'center' }}>DEMO:</div>
          {onSimSignup && <button onClick={onSimSignup} style={miniBtn}>Simulate friend signup (+50)</button>}
          {onSimBooking && <button onClick={onSimBooking} style={miniBtn}>Simulate friend first booking (+100)</button>}
        </div>
      )}
    </div>
  );
}

const miniBtn = { height:28, padding:'0 10px', borderRadius:999, background:'#fff', border:`1px solid ${T.greyLight}`, fontSize:11, fontWeight:700, color:T.inkSoft, cursor:'pointer', fontFamily:'inherit' };

/* =============================================================================
   2. Wallet panel (Profile > Wallet tab)
============================================================================= */
function WalletPanel({ isMobile, onOpenExplainer, onBrowseTrips }) {
  const [wallet, setWallet] = React.useState(getWallet);
  React.useEffect(() => {
    const h = () => setWallet(getWallet());
    window.addEventListener('trav:wallet-change', h);
    return () => window.removeEventListener('trav:wallet-change', h);
  }, []);
  const expiring = coinsExpiringWithin(30);
  const canRedeem = wallet.balance >= COIN_RULES.MIN_REDEEM;
  const qPct = Math.min(100, (wallet.earnedThisQuarter / COIN_RULES.QUARTERLY_EARN_CAP) * 100);

  const simSignup = () => {
    const w = getWallet();
    if ((w.referralsThisYear||0) >= COIN_RULES.REFERRALS_PER_YEAR) { alert(`Yearly referral cap of ${COIN_RULES.REFERRALS_PER_YEAR} reached.`); return; }
    const friend = '@friend' + Math.floor(Math.random()*90 + 10);
    creditCoins('REFERRAL_SIGNUP', COIN_RULES.REFERRAL_SIGNUP, { friend, desc:`Friend ${friend} signed up` });
    setWallet(getWallet());
  };
  const simFirstBooking = () => {
    creditCoins('REFERRAL_FIRST_BOOKING', COIN_RULES.REFERRAL_FIRST_BOOKING, { desc:"Friend's first trip booked" });
    setWallet(getWallet());
  };

  const earnings = wallet.transactions.filter(t => t.amount > 0);
  const redemptions = wallet.transactions.filter(t => t.amount < 0);

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
      {/* HERO STRIP */}
      <div style={{ borderRadius:16, overflow:'hidden', background:`linear-gradient(135deg, ${T.goldSoft}, #fff 130%)`, border:`1.5px solid ${T.gold}55`, padding: isMobile ? 18 : 24, position:'relative' }}>
        <div style={{ position:'absolute', top:-30, right:-30, width:160, height:160, borderRadius:'50%', background:`radial-gradient(circle, ${T.gold}22 0%, transparent 70%)`, pointerEvents:'none' }}/>
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:18, flexWrap:'wrap', position:'relative' }}>
          <div style={{ flex:'1 1 240px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 10px', borderRadius:999, background:'#fff', color:T.goldDeep, fontSize:10.5, fontWeight:800, letterSpacing:'.14em', border:`1px solid ${T.gold}44`, marginBottom:10 }}>
              <CoinGlyph size={12}/> TRAV COINS
            </div>
            <div style={{ display:'flex', alignItems:'baseline', gap:12 }}>
              <CoinGlyph size={32}/>
              <div style={{ fontSize: isMobile ? 44 : 56, fontWeight:800, color:T.ink, fontFamily:'Fraunces, serif', letterSpacing:'-.02em', lineHeight:1 }}>{wallet.balance}</div>
            </div>
            <div style={{ fontSize:13.5, color:T.grey, marginTop:6 }}>= ₹{wallet.balance} on your next booking</div>
            <div style={{ marginTop:14, maxWidth:360 }}>
              <div style={{ height:8, borderRadius:999, background:'#fff', border:`1px solid ${T.gold}33`, overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${Math.min(100, (wallet.balance / COIN_RULES.MIN_REDEEM) * 100)}%`, background:`linear-gradient(90deg, ${T.gold}, ${T.goldDeep})`, borderRadius:999 }}/>
              </div>
              <div style={{ fontSize:11.5, color:canRedeem?T.greenDeep:T.grey, fontWeight:canRedeem?700:500, marginTop:6 }}>
                {canRedeem ? <><Ico name="check" size={11} color={T.greenDeep} stroke={2.8}/> Ready to redeem</> : <>{COIN_RULES.MIN_REDEEM - wallet.balance} more to unlock redemption</>}
              </div>
            </div>
          </div>
          {/* Side stats */}
          <div style={{ display:'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(2, auto)', gap: isMobile?10:16, minWidth: isMobile ? '100%' : 240 }}>
            {[
              { l:'Earned this quarter', v:`${wallet.earnedThisQuarter}/${COIN_RULES.QUARTERLY_EARN_CAP}` },
              { l:'Lifetime earned',     v: wallet.totalEarnedLifetime },
              { l:'Lifetime redeemed',   v: wallet.totalRedeemedLifetime },
              { l:'Expiring in 30 days', v: expiring, alert: expiring > 0 },
            ].map(s => (
              <div key={s.l} style={{ background:'#fff', borderRadius:12, padding:'10px 12px', border:`1px solid ${T.greyLight}`, minWidth:110 }}>
                <div style={{ fontSize:9.5, color:T.grey, letterSpacing:'.12em', fontWeight:700, textTransform:'uppercase' }}>{s.l}</div>
                <div style={{ fontSize:18, fontWeight:800, color: s.alert ? T.gold : T.ink, fontFamily:'Fraunces, serif', letterSpacing:'-.01em', marginTop:2 }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display:'flex', gap:10, marginTop:18, flexWrap:'wrap', position:'relative' }}>
          <Btn kind="primary" size="md" trailing="arrow-right" onClick={onBrowseTrips}>Browse trips to redeem</Btn>
          <Btn kind="outline" size="md" icon="users">Refer a friend</Btn>
          <Btn kind="outline" size="md" icon="sparkle-ring" onClick={onOpenExplainer}>How coins work</Btn>
        </div>
      </div>

      {/* Quarterly meter */}
      <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.greyLight}`, padding:18 }}>
        <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:10, flexWrap:'wrap', gap:8 }}>
          <div>
            <div style={{ fontSize:15, fontWeight:700, color:T.ink, fontFamily:'Fraunces, serif' }}>Quarterly earning meter</div>
            <div style={{ fontSize:12, color:T.grey, marginTop:2 }}>Resets every 3 months. Keeps rewards honest.</div>
          </div>
          <div style={{ fontSize:13, fontWeight:700, color:T.goldDeep }}>{wallet.earnedThisQuarter} / {COIN_RULES.QUARTERLY_EARN_CAP}</div>
        </div>
        <div style={{ height:10, borderRadius:999, background:T.goldSoft, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${qPct}%`, background:`linear-gradient(90deg, ${T.gold}, ${T.goldDeep})`, borderRadius:999, transition:'width .3s' }}/>
        </div>
        {wallet.earnedThisQuarter >= COIN_RULES.QUARTERLY_EARN_CAP && (
          <div style={{ fontSize:11.5, color:T.goldDeep, fontWeight:700, marginTop:8 }}>Quarter cap hit — earning resumes next quarter.</div>
        )}
      </div>

      {/* Expiring warning */}
      {expiring > 0 && (
        <div style={{ background:`linear-gradient(135deg, ${T.goldSoft}, #fff 140%)`, borderRadius:14, border:`1.5px solid ${T.gold}66`, padding:16, display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
          <div style={{ width:40, height:40, borderRadius:10, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border:`1px solid ${T.gold}44` }}>
            <Ico name="clock" size={18} color={T.goldDeep}/>
          </div>
          <div style={{ flex:1, minWidth:180 }}>
            <div style={{ fontSize:13.5, fontWeight:700, color:T.ink, fontFamily:'Fraunces, serif' }}>{expiring} coins expire in the next 30 days</div>
            <div style={{ fontSize:12, color:T.grey, marginTop:3 }}>Oldest coins are burned first. Redeem them on your next booking.</div>
          </div>
          <Btn kind="primary" size="sm" trailing="arrow-right" onClick={onBrowseTrips}>Book a trip</Btn>
        </div>
      )}

      {/* Earning / Redemption lists */}
      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap:14 }}>
        <HistoryList title="Earning history" items={earnings} kind="earn"/>
        <HistoryList title="Redemption history" items={redemptions} kind="redeem"/>
      </div>

      {/* Referral card */}
      <ReferralLinkCard onSimSignup={simSignup} onSimBooking={simFirstBooking}/>
    </div>
  );
}

function HistoryList({ title, items, kind }) {
  return (
    <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.greyLight}`, overflow:'hidden' }}>
      <div style={{ padding:'14px 18px', borderBottom:`1px solid ${T.greyLight}`, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ fontSize:14, fontWeight:700, color:T.ink, fontFamily:'Fraunces, serif' }}>{title}</div>
        <div style={{ fontSize:11.5, color:T.grey }}>{items.length} entries</div>
      </div>
      <div style={{ maxHeight:320, overflowY:'auto' }}>
        {items.length === 0 ? (
          <div style={{ padding:'32px 20px', textAlign:'center', color:T.grey, fontSize:12.5 }}>
            {kind==='earn' ? 'No coins earned yet. Book your first trip.' : 'No redemptions yet.'}
          </div>
        ) : items.map(t => (
          <div key={t.id} style={{ padding:'12px 16px', borderBottom:`1px solid ${T.greyLight}`, display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ width:32, height:32, borderRadius:8, background: t.status==='pending' ? T.amberSoft : t.status==='expired' ? '#F4F6FA' : (kind==='earn' ? T.goldSoft : '#F0FAF4'), display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Ico name={iconForTx(t.type)} size={14} color={t.status==='pending' ? '#A37A1A' : t.status==='expired' ? T.grey : (kind==='earn' ? T.goldDeep : T.greenDeep)}/>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:12.5, fontWeight:600, color:T.ink, overflow:'hidden', textOverflow:'ellipsis' }}>{t.desc}</div>
              <div style={{ fontSize:11, color:T.grey, marginTop:2 }}>
                {new Date(t.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
                {t.status === 'pending' && <> · <span style={{ color:'#A37A1A', fontWeight:700 }}>pending · credits 24h after trip</span></>}
                {t.status === 'expired' && <> · <span style={{ color:T.grey }}>expired</span></>}
              </div>
            </div>
            <div style={{ fontSize:14, fontWeight:800, color: t.amount > 0 ? (t.status==='pending' ? '#A37A1A' : T.goldDeep) : T.greenDeep, fontFamily:'Fraunces, serif' }}>
              {t.amount > 0 ? '+' : ''}{t.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function iconForTx(type) {
  return ({
    BOOKING_CASHBACK:'bag', REFERRAL_SIGNUP:'users', REFERRAL_FIRST_BOOKING:'gift',
    TRAVELOGUE_APPROVED:'edit', TRIP_RATING:'star', PROFILE_COMPLETE:'check',
    REDEEM:'arrow-right', EXPIRE:'clock',
  })[type] || 'spark';
}

/* =============================================================================
   3. Booking coins module (pre-payment hint) — slots into QuickBook price card
============================================================================= */
function BookingCoinsModule({ tripAmount, couponCode, applied, setApplied, onOpenExplainer }) {
  const [wallet, setWallet] = React.useState(getWallet);
  React.useEffect(() => {
    const h = () => setWallet(getWallet());
    window.addEventListener('trav:wallet-change', h);
    return () => window.removeEventListener('trav:wallet-change', h);
  }, []);
  const earnOnThis = earnPreview(tripAmount);
  const qualifies = tripAmount >= COIN_RULES.MIN_TRIP_FOR_REDEEM;
  const canRedeem = qualifies && wallet.balance >= COIN_RULES.MIN_REDEEM;
  const atLifetimeCap = wallet.balance >= COIN_RULES.LIFETIME_BALANCE_CAP;

  // Calculate how many coins apply given rules
  const redeemResult = canRedeem ? redeemCoins(tripAmount, undefined, { couponApplied: couponCode }) : null;
  const canApply = canRedeem && !redeemResult?.reason;

  // If user turns applied ON, clear any FIRSTRIP coupon (stacking block)
  React.useEffect(() => {
    if (applied && couponCode === 'FIRSTRIP') {
      // Parent will clear; we surface a message
    }
  }, [applied, couponCode]);

  return (
    <div style={{ margin:'0 0 12px', background:T.goldSoft, borderRadius:12, border:`1.5px solid ${T.gold}66`, padding:'12px 14px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom: (qualifies && canApply) || atLifetimeCap ? 10 : 0 }}>
        <CoinGlyph size={18}/>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:13, fontWeight:700, color:T.ink, fontFamily:'Fraunces, serif' }}>
            You'll earn {earnOnThis} Trav Coin{earnOnThis===1?'':'s'} on this booking
          </div>
          <div style={{ fontSize:11.5, color:'#6a5016', marginTop:2, lineHeight:1.4 }}>
            {wallet.balance === 0 ? (
              <>Start your wallet. Credited 24h after your trip ends.</>
            ) : wallet.balance < COIN_RULES.MIN_REDEEM ? (
              <>Wallet: <b>🪙 {wallet.balance}</b> · {COIN_RULES.MIN_REDEEM - wallet.balance} more to unlock redemption.</>
            ) : (
              <>Wallet: <b>🪙 {wallet.balance}</b> · credited 24h after trip.</>
            )}
          </div>
        </div>
      </div>

      {!qualifies && wallet.balance >= COIN_RULES.MIN_REDEEM && (
        <div style={{ fontSize:11.5, color:'#6a5016', padding:'8px 10px', background:'#fff', borderRadius:8, border:`1px dashed ${T.gold}55` }}>
          Trips below ₹{COIN_RULES.MIN_TRIP_FOR_REDEEM.toLocaleString('en-IN')} don't qualify for coin redemption — but you'll still earn on this booking.
        </div>
      )}

      {qualifies && canApply && (
        <>
          <div style={{ background:'#fff', borderRadius:10, padding:'10px 12px', border:`1px solid ${T.gold}44`, display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:12.5, fontWeight:700, color:T.ink }}>
                Apply {redeemResult.coinsBurned} coins (₹{redeemResult.discount} off)
              </div>
              <div style={{ fontSize:11, color:T.grey, marginTop:2 }}>FIFO burn · cannot stack with FIRSTRIP</div>
            </div>
            <Toggle on={applied} setOn={setApplied} color={T.gold}/>
          </div>
          {atLifetimeCap && !applied && (
            <div style={{ fontSize:11.5, color:T.goldDeep, fontWeight:600, marginTop:8, padding:'6px 10px', background:'#fff', borderRadius:8 }}>
              Wallet is at the {COIN_RULES.LIFETIME_BALANCE_CAP} coin cap. Redeem now so you keep earning on future trips.
            </div>
          )}
          {applied && couponCode === 'FIRSTRIP' && (
            <div style={{ fontSize:11.5, color:T.rose, fontWeight:600, marginTop:8 }}>FIRSTRIP removed — only one incentive can apply.</div>
          )}
        </>
      )}

      <div style={{ marginTop:8, textAlign:'right' }}>
        <button onClick={onOpenExplainer} style={{ background:'transparent', border:'none', cursor:'pointer', fontSize:11, color:T.goldDeep, fontWeight:700, fontFamily:'inherit', padding:0 }}>
          How Trav Coins work →
        </button>
      </div>
    </div>
  );
}

/* =============================================================================
   4. Booking celebration card (post-success)
============================================================================= */
function BookingCoinsCelebration({ tripAmount, coinsEarned, postBalance }) {
  const canRedeemAfter = postBalance >= COIN_RULES.MIN_REDEEM;
  const toNext = Math.max(0, COIN_RULES.MIN_REDEEM - postBalance);
  return (
    <div className="keep-colors" style={{ margin:'20px auto 0', maxWidth:480, background:`linear-gradient(135deg, ${T.goldSoft}, #fff 140%)`, borderRadius:16, border:`1.5px solid ${T.gold}66`, padding:20, textAlign:'center' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginBottom:8 }}>
        <CoinGlyph size={22}/>
        <span style={{ fontSize:10.5, fontWeight:800, color:T.goldDeep, letterSpacing:'.14em' }}>TRAV COINS</span>
      </div>
      <div style={{ fontSize:22, fontWeight:700, color:T.ink, fontFamily:'Fraunces, serif', letterSpacing:'-.02em' }}>
        You'll earn {coinsEarned} Trav Coin{coinsEarned===1?'':'s'}
      </div>
      <div style={{ fontSize:12.5, color:T.grey, marginTop:6, lineHeight:1.5 }}>Credited 24 hours after your trip ends. Use them on your next booking.</div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:16, textAlign:'left' }}>
        <div style={{ padding:'10px 12px', background:'#fff', borderRadius:10, border:`1px solid ${T.gold}33` }}>
          <div style={{ fontSize:10, fontWeight:700, color:T.grey, letterSpacing:'.1em' }}>WALLET AFTER THIS TRIP</div>
          <div style={{ display:'flex', alignItems:'baseline', gap:6, marginTop:4 }}>
            <CoinGlyph size={14}/>
            <span style={{ fontSize:20, fontWeight:800, color:T.ink, fontFamily:'Fraunces, serif' }}>{postBalance}</span>
          </div>
          <div style={{ height:6, borderRadius:999, background:T.goldSoft, overflow:'hidden', marginTop:6 }}>
            <div style={{ height:'100%', width:`${Math.min(100, (postBalance / COIN_RULES.MIN_REDEEM) * 100)}%`, background:`linear-gradient(90deg, ${T.gold}, ${T.goldDeep})`, borderRadius:999 }}/>
          </div>
          <div style={{ fontSize:10.5, color: canRedeemAfter ? T.greenDeep : T.grey, fontWeight:700, marginTop:4 }}>
            {canRedeemAfter ? '✓ Redeemable now' : `${toNext} more for redemption`}
          </div>
        </div>
        <div style={{ padding:'10px 12px', background:'#fff', borderRadius:10, border:`1px solid ${T.gold}33` }}>
          <div style={{ fontSize:10, fontWeight:700, color:T.grey, letterSpacing:'.1em' }}>REFER A FRIEND</div>
          <div style={{ fontSize:12.5, color:T.ink, marginTop:4, lineHeight:1.4 }}>Both get <b>50 coins</b> on signup, <b>100 more</b> on their first trip.</div>
          <div style={{ fontSize:11, color:T.goldDeep, fontWeight:700, marginTop:6, cursor:'pointer' }}>Share your link →</div>
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
   5. Inline nudges
============================================================================= */
function CoinsReadyInline({ onBrowse }) {
  const [dismissed, setDismissed] = React.useState(() => {
    try { return sessionStorage.getItem('trav.hook.coinsReadyDismissed') === '1'; } catch { return false; }
  });
  const w = getWallet();
  const recentRedeem = w.transactions.some(t => t.amount < 0 && t.status === 'burned' && Date.now() - t.createdAt < 14*24*60*60*1000);
  if (dismissed || w.balance < COIN_RULES.MIN_REDEEM || recentRedeem) return null;
  const dismiss = () => { setDismissed(true); try { sessionStorage.setItem('trav.hook.coinsReadyDismissed','1'); } catch {} };
  return (
    <div style={{ background:`linear-gradient(135deg, ${T.goldSoft}, #fff 140%)`, border:`1.5px solid ${T.gold}66`, borderRadius:14, padding:16, display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
      <div style={{ width:40, height:40, borderRadius:10, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border:`1px solid ${T.gold}44` }}>
        <CoinGlyph size={20}/>
      </div>
      <div style={{ flex:1, minWidth:180 }}>
        <div style={{ fontSize:13.5, fontWeight:700, color:T.ink, fontFamily:'Fraunces, serif' }}>🪙 {w.balance} coins ready to redeem</div>
        <div style={{ fontSize:12, color:T.grey, marginTop:2, lineHeight:1.4 }}>Worth ₹{w.balance} off your next booking.</div>
      </div>
      <Btn kind="primary" size="sm" trailing="arrow-right" onClick={onBrowse}>Book a trip</Btn>
      <button onClick={dismiss} aria-label="Dismiss" style={{ background:'transparent', border:'none', cursor:'pointer', padding:4, color:T.grey }}>
        <Ico name="x" size={14} color={T.grey}/>
      </button>
    </div>
  );
}

function CoinsExpiringInline({ onOpen }) {
  const [dismissed, setDismissed] = React.useState(() => {
    try { return sessionStorage.getItem('trav.hook.coinsExpiringDismissed') === '1'; } catch { return false; }
  });
  const expiring = coinsExpiringWithin(30);
  if (dismissed || expiring <= 0) return null;
  const dismiss = () => { setDismissed(true); try { sessionStorage.setItem('trav.hook.coinsExpiringDismissed','1'); } catch {} };
  return (
    <div style={{ background:'#fff', border:`1.5px solid ${T.gold}66`, borderRadius:14, padding:14, display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
      <div style={{ width:36, height:36, borderRadius:10, background:T.goldSoft, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        <Ico name="clock" size={16} color={T.goldDeep}/>
      </div>
      <div style={{ flex:1, minWidth:180 }}>
        <div style={{ fontSize:13, fontWeight:700, color:T.ink }}>🪙 {expiring} coins expire in 30 days</div>
        <div style={{ fontSize:11.5, color:T.grey, marginTop:2 }}>Use them on your next booking — FIFO burn.</div>
      </div>
      <button onClick={onOpen} style={{ height:32, padding:'0 12px', borderRadius:999, background:T.gold, color:'#fff', border:'none', fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>See details</button>
      <button onClick={dismiss} aria-label="Dismiss" style={{ background:'transparent', border:'none', cursor:'pointer', padding:4, color:T.grey }}>
        <Ico name="x" size={14} color={T.grey}/>
      </button>
    </div>
  );
}

Object.assign(window, {
  TravCoinsPage, WalletPanel, BookingCoinsModule, BookingCoinsCelebration,
  CoinsReadyInline, CoinsExpiringInline, CoinGlyph,
});
