function ThursdayDropPage({ onOpenTrip, onBack }) {
  const isMobile = useIsMobile();
  const [activeCity, setActiveCity] = React.useState('Delhi');

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <DropHero isMobile={isMobile} />
      <WhyDrop isMobile={isMobile} />
      <ActiveDrop 
        isMobile={isMobile} 
        activeCity={activeCity} 
        onCityChange={setActiveCity} 
        onOpenTrip={onOpenTrip}
      />
      <PastDrops isMobile={isMobile} />
      <DropFooterCTA isMobile={isMobile} />
    </div>
  );
}

function DropHero({ isMobile }) {
  return (
    <section style={{ 
      background: 'linear-gradient(180deg, #F8FAFC 0%, #fff 100%)', 
      padding: isMobile ? '60px 20px 40px' : '100px 36px 80px',
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr', gap: 60, alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#E0F2FE', padding: '7px 14px', borderRadius: 999, fontSize: 11, fontWeight: 700, color: '#0369A1', letterSpacing: '.12em', marginBottom: 24 }}>
            <Ico name="bell" size={13} color="#0369A1" stroke={2.5}/> WEEKLY DROP LIVE
          </div>
          <h1 style={{ 
            fontSize: isMobile ? 52 : 84, fontWeight: 800, color: T.ink, 
            letterSpacing: '-.04em', lineHeight: 0.95, margin: '0 0 24px', 
            fontFamily: 'Fraunces, serif' 
          }}>
            Adventure delivered<br/>to your <span style={{ color: T.green }}>WhatsApp.</span>
          </h1>
          <p style={{ fontSize: 18, color: T.grey, lineHeight: 1.55, maxWidth: 540, marginBottom: 40 }}>
            Join 1,200+ weekend seekers. Every Thursday, we drop 3 exclusive curated trips from Delhi. First come, first served.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Btn kind="primary" size="lg" icon="whatsapp">Join the Broadcast</Btn>
            <Btn kind="outline" size="lg">View Full Catalog</Btn>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-end', perspective: 1000 }}>
          <WhatsAppMockup style={{ transform: isMobile ? 'none' : 'rotate(-2deg) translateY(20px)' }}>
            <WhatsAppBubble 
              text={`Good morning! This Thursday's drops are here.\n\nFrom Delhi this weekend:`} 
              items={[
                { label: '1 Rishikesh', price: '₹8,499/pp', sub: 'Fri 9:30 PM → Sun 7 PM · 6 spots left\nRafting + Bungee + Riverside Camp' },
                { label: '2 Jaipur', price: '₹9,999/pp', sub: 'Sat 6 AM → Sun 9 PM · 11 spots left\nHeritage walk + Fort + Rooftop dinner' },
                { label: '3 Nainital', price: '₹7,999/pp', sub: 'Fri 10 PM → Sun 8 PM · 3 spots left ⚡️\nLake + Snow View + Forest trek' }
              ]}
            />
            <div style={{ alignSelf: 'center', fontSize: 10, color: T.grey, marginTop: 4, textAlign: 'center' }}>
              Book any trip → <span style={{ color: '#0369A1', textDecoration: 'underline' }}>trav.guide/drops</span>
            </div>
            <div style={{ alignSelf: 'center', fontSize: 10, color: T.grey, marginTop: 12, opacity: 0.7 }}>
              This was sent to 1,200 people at the same time.
            </div>
          </WhatsAppMockup>
        </div>
      </div>
    </section>
  );
}

function WhyDrop({ isMobile }) {
  const cards = [
    { title: 'Zero Overthinking', body: 'We curate, you just pack. Our drops include everything from transport to stays and high-end experiences. No more 50 browser tabs open for a weekend getaway.', src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800' },
    { title: 'Verified Vibe', body: 'Every trip is host-vetted. 1,200+ members trust our weekly selection for safety and quality.', icon: 'shield', dark: true },
    { title: 'Premium Stays Only', body: "We don't do generic hotels. Expect riverside boutique camps, heritage havelis, and forest glass-houses.", avs: true }
  ];

  return (
    <section style={{ padding: isMobile ? '60px 20px' : '100px 36px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontSize: 44, fontWeight: 800, color: T.ink, fontFamily: 'Fraunces, serif', marginBottom: 40 }}>Why Thursday Drop?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24 }}>
          {/* Zero Overthinking */}
          <div style={{ background: '#fff', border: `1px solid ${T.greyLight}`, borderRadius: 24, padding: 32, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24, alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: T.greenDeep, marginBottom: 16 }}>{cards[0].title}</h3>
              <p style={{ fontSize: 15, color: T.grey, lineHeight: 1.6 }}>{cards[0].body}</p>
            </div>
            <div style={{ aspectRatio: '16/10', borderRadius: 16, overflow: 'hidden' }}>
              <img src={cards[0].src} alt="usp" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
            </div>
          </div>

          {/* Verified Vibe */}
          <div style={{ background: T.greenDeep, color: '#fff', borderRadius: 24, padding: 32, position: 'relative', overflow: 'hidden' }}>
            <Ico name="shield" size={32} color="#fff" stroke={2.5} style={{ marginBottom: 24 }}/>
            <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>{cards[1].title}</h3>
            <p style={{ fontSize: 16, opacity: 0.9, lineHeight: 1.6 }}>{cards[1].body}</p>
          </div>

          {/* trav.her branding match */}
          <div style={{ background: '#fff', border: `1px solid ${T.greyLight}`, borderRadius: 24, padding: 32 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: T.roseCream, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <Ico name="rose" size={20} color={T.rose}/>
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: T.ink, marginBottom: 8 }}>trav.her</h3>
            <p style={{ fontSize: 14, color: T.grey }}>Special curated safe solo drops for women every month. Look for the rose tag.</p>
          </div>

          {/* Premium Stays */}
          <div style={{ background: '#fff', border: `1px solid ${T.greyLight}`, borderRadius: 24, padding: 32, display: 'flex', alignItems: 'center', gap: 32 }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: T.ink, marginBottom: 12 }}>{cards[2].title}</h3>
              <p style={{ fontSize: 15, color: T.grey, lineHeight: 1.6 }}>{cards[2].body}</p>
              <div style={{ marginTop: 24, display: 'flex', alignItems: 'center' }}>
                {[1,2,3].map(i => (
                  <div key={i} style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid #fff', marginLeft: i>1 ? -12 : 0, overflow: 'hidden' }}>
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="av" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                  </div>
                ))}
                <div style={{ marginLeft: 10, fontSize: 12, fontWeight: 700, color: T.grey }}>+1.2k</div>
              </div>
            </div>
            <div style={{ width: 100, height: 100, opacity: 0.1 }}>
               <Ico name="bed" size={100} color={T.ink}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ActiveDrop({ isMobile, activeCity, onCityChange, onOpenTrip }) {
  const cities = ['Delhi', 'Mumbai', 'Bangalore'];
  const trips = [
    { id: 'trip-rishikesh', dest: 'Rishikesh', route: 'Delhi → Rishikesh', dates: 'Apr 18–20', cur: '@tanya_travels', price: 8499, left: 6, total: 15, tags: ['Camp', 'Meals', 'Rafting', 'Bungee'], img: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8' },
    { id: 'trip-jaipur', dest: 'Jaipur', route: 'Delhi → Jaipur', dates: 'Apr 18–19', cur: '@rajasthan_ravi', price: 9999, left: 11, total: 15, tags: ['Heritage', 'Royal Dining', 'Photo Tour'], img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245' },
    { id: 'trip-nainital', dest: 'Nainital', route: 'Delhi → Nainital', dates: 'Apr 18–20', cur: '@hillseeker', price: 7999, left: 3, total: 15, tags: ['Boating', 'Viewpoints', 'Picnic'], img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23' },
  ];

  return (
    <section style={{ background: '#F8F9FA', padding: isMobile ? '60px 20px' : '80px 36px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: T.grey, letterSpacing: '.14em', marginBottom: 12 }}>AVAILABLE NOW</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
          <h2 style={{ fontSize: 72, fontWeight: 800, color: T.ink, fontFamily: 'Fraunces, serif', lineHeight: 1, margin: 0 }}>THE WEEKEND DROP<br/><span style={{ fontSize: 24, color: T.grey, opacity: 0.8 }}>April 17, 2026</span></h2>
          <div style={{ background: '#EEF2F6', padding: 4, borderRadius: 12, display: 'flex', gap: 4 }}>
            {cities.map(c => (
              <button key={c} onClick={() => onCityChange(c)} style={{
                height: 40, padding: '0 20px', borderRadius: 10, border: 'none',
                background: activeCity === c ? T.greenDeep : 'transparent',
                color: activeCity === c ? '#fff' : T.ink,
                fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                transition: 'all 0.2s'
              }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 24 }}>
          {trips.map(t => (
            <div key={t.id} style={{ background: '#fff', borderRadius: 24, overflow: 'hidden', border: `1px solid ${T.greyLight}`, display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', aspectRatio: '16/10' }}>
                <img src={t.img} alt={t.dest} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.5)', padding: '5px 10px', borderRadius: 999, color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.fire, boxShadow: `0 0 10px ${T.fire}` }}/>
                  {t.left} OF {t.total} SPOTS LEFT
                </div>
                <div style={{ position: 'absolute', bottom: 12, left: 12, color: '#fff' }}>
                  <h3 style={{ fontSize: 32, fontWeight: 800, fontFamily: 'Fraunces, serif', margin: 0 }}>{t.dest}</h3>
                  <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.9 }}>{t.route} • {t.dates}</div>
                </div>
              </div>
              
              <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#F4F6FA' }} />
                    <div style={{ lineHeight: 1 }}>
                       <div style={{ fontSize: 9, color: T.grey, letterSpacing: '.05em', fontWeight: 800 }}>CURATED BY</div>
                       <div style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>{t.cur}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', lineHeight: 1 }}>
                    <div style={{ fontSize: 9, color: T.grey, letterSpacing: '.05em', fontWeight: 800 }}>PRICE</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: T.greenDeep }}>{inr(t.price)}<span style={{ fontSize: 12, fontWeight: 600, color: T.grey }}>/pp</span></div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
                  {t.tags.map(tg => (
                    <span key={tg} style={{ padding: '6px 12px', background: '#F0F9FF', color: '#0369A1', borderRadius: 999, fontSize: 11, fontWeight: 700 }}>
                      {tg}
                    </span>
                  ))}
                </div>

                <div style={{ marginTop: 'auto' }}>
                  <Btn kind="primary" full size="lg" trailing="arrow-right" onClick={() => onOpenTrip(t.id)}>BOOK NOW</Btn>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PastDrops({ isMobile }) {
  const drops = [
    { title: 'Apr 10 Drop', sub: 'Bir Billing & Kasol', travelCount: 15, img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800' },
    { title: 'Apr 3 Drop', sub: 'Pushkar & Udaipur', travelCount: 12, img: 'https://images.unsplash.com/photo-1514222139-b5b273ce5379?w=800' },
  ];

  return (
    <section style={{ padding: isMobile ? '60px 20px' : '82px 36px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, color: T.ink, fontFamily: 'Fraunces, serif', marginBottom: 32 }}>PAST DROPS</h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: 24 }}>
          {drops.map(d => (
            <div key={d.title} style={{ background: '#F8F9FA', borderRadius: 20, padding: 20, border: `1px solid ${T.greyLight}`, opacity: 0.8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: T.ink, margin: 0 }}>{d.title}</h3>
                  <div style={{ fontSize: 13, color: T.grey, marginTop: 4 }}>{d.sub}</div>
                </div>
                <div style={{ background: T.ink, color: '#fff', fontSize: 10, fontWeight: 800, padding: '4px 8px', borderRadius: 4 }}>SOLD OUT</div>
              </div>
              <div style={{ aspectRatio: '16/9', borderRadius: 12, overflow: 'hidden', marginBottom: 12, filter: 'grayscale(1)' }}>
                <img src={d.img} alt="past" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.grey }}>{d.travelCount} travellers experienced this.</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DropFooterCTA({ isMobile }) {
  return (
    <section style={{ padding: isMobile ? '60px 20px 100px' : '100px 36px 140px' }}>
      <div style={{ 
        maxWidth: 1200, margin: '0 auto', background: T.ink, borderRadius: 40, 
        padding: isMobile ? '60px 24px' : '100px 60px', textAlign: 'center',
        position: 'relative', overflow: 'hidden' 
      }}>
        {/* Abstract background blobs */}
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: 400, height: 400, background: T.greenDeep, opacity: 0.1, borderRadius: '50%', filter: 'blur(100px)' }}/>
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: 400, height: 400, background: T.green, opacity: 0.1, borderRadius: '50%', filter: 'blur(100px)' }}/>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ 
            fontSize: isMobile ? 42 : 72, fontWeight: 800, color: '#fff', 
            fontFamily: 'Fraunces, serif', letterSpacing: '-.03em', lineHeight: 1, margin: '0 0 24px' 
          }}>
            GET NEXT WEEK'S<br/>DROP
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', maxWidth: 540, margin: '0 auto 40px', lineHeight: 1.5 }}>
            Be the first to know when new trips go live every Thursday at 4 PM. No spam, just pure adventure.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
             <Btn kind="primary" size="lg" icon="whatsapp">Join Thursday Drop on WhatsApp</Btn>
             <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Already 4.2k+ explorers in the circle</div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ThursdayDropPage });
