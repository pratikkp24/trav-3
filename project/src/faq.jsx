// A comprehensive FAQ page covering all aspects of booking, support, and trip experiences.

function FaqPage({ onBack }) {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = React.useState('booking');
  const [openQ, setOpenQ] = React.useState('');

  const categories = [
    { id: 'booking', label: 'Booking & Modification', icon: 'bag' },
    { id: 'payment', label: 'Payments & Refunds', icon: 'credit-card' },
    { id: 'trip', label: 'During the Trip', icon: 'compass' },
    { id: 'safety', label: 'Safety & trav.her', icon: 'shield' },
  ];

  const allFaqs = {
    booking: [
      { q: 'How do I cancel or modify my booking?', a: 'Up to 15 days before departure: full refund. 7–14 days: 50% refund. Less than 7 days: no refund. You can manage this from the "My Bookings" page.' },
      { q: 'How do I change my trip dates?', a: 'Free date change up to 14 days before. After that, a ₹500 fee applies. You can pick your new date directly from the Booking Detail page.' },
      { q: "What's included in my booking?", a: 'Each trip lists exact inclusions under "What\'s included". Generally: stay, transport, breakfast, signature activities. Personal expenses and extra meals are not included.' },
      { q: 'How do I join the trip WhatsApp group?', a: 'The WhatsApp group is created 48 hours before departure. You\'ll automatically receive an invite link via WhatsApp on the number you booked with.' },
      { q: 'Can I add a traveler later?', a: 'Yes, if there are spots available. Go to your Booking Details, click "Modify Travelers", and add to your headcount. The delta will be auto-charged.' }
    ],
    payment: [
      { q: 'What is the token payment?', a: 'You can lock in your spot with just a ₹2,000 token. The remaining balance is auto-charged 7 days before departure.' },
      { q: 'Where is my refund?', a: 'Refunds settle in 5–7 working days back to the original payment method. We send you an SMS + email when initiated. If it\'s past day 7, raise a support ticket.' },
      { q: 'Are taxes included?', a: 'Yes. The final price shown at checkout includes the base trip price, a small convenience fee, and 5% GST for tour operator services.' },
      { q: 'Can I get a corporate GST invoice?', a: 'Yes, definitely. You can select "Corporate" persona during booking to enter your GST details. The invoice will be auto-emailed to you.' }
    ],
    trip: [
      { q: 'Who else is on this trip?', a: 'Our trips typically feature a mixed group with a 22–34 age range. The exact group list is shared on the WhatsApp group 48 hours before departure.' },
      { q: 'Is it solo-friendly?', a: 'Very. Most of our travelers come solo. You will have a buddy by breakfast on day 2, guaranteed. Twin sharing means you\'ll be paired with another solo traveler of the same gender.' },
      { q: 'Where do the trips start from?', a: 'Weekend Escapes start from centralized pickup points in your origin city (e.g., Akshardham Metro in Delhi). Long Haul trips may require you to arrange your own flights to the destination.' },
      { q: 'What should I pack?', a: 'A detailed packing list is available on the specific itinerary page under your bookings. A digital brief will also be sent 3 days before departure.' }
    ],
    safety: [
      { q: 'What is trav.her?', a: 'trav.her is our dedicated initiative for female travelers. Trips marked with trav.her guarantee a women-only cohort and a certified female trip lead.' },
      { q: 'What safety measures are in place?', a: 'All partner stays are heavily vetted. Trip leads undergo safety training. Female travelers also get a panic-button SIM tag (for hill locations) and 24/7 SOS desk access.' },
      { q: 'Can I request a female trip lead?', a: 'If you join a trav.her cohort, you are guaranteed a female trip lead. For mixed trips, trip leads are assigned based on destination expertise.' }
    ]
  };

  const activeFaqs = allFaqs[activeTab] || [];

  const toggleQ = (q) => setOpenQ(openQ === q ? '' : q);

  const pad = isMobile ? 16 : 36;

  return (
    <div style={{ background: T.offWhite, minHeight: 'calc(100vh - 64px)', paddingBottom: isMobile ? 100 : 80 }}>
      {/* Hero Section */}
      <div style={{ background: T.ink, color: '#fff', padding: `${isMobile ? 32 : 48}px ${pad}px`, borderBottom: `4px solid ${T.green}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <button onClick={onBack} style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', color: 'rgba(255,255,255,.7)', fontSize: 13, fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
            {'\u2190'} Back
          </button>
          <div style={{ display:'inline-flex', alignItems:'center', padding:'5px 14px', borderRadius:999, background:'rgba(255,255,255,.1)', color:'#fff', fontSize:10.5, fontWeight:800, letterSpacing:'.14em', marginBottom: 12 }}>
            KNOWLEDGE BASE
          </div>
          <h1 style={{ fontSize: isMobile ? 40 : 54, fontWeight: 800, letterSpacing: '-.025em', margin: 0, fontFamily: 'Fraunces, serif', lineHeight: 1.1 }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontSize: isMobile ? 15 : 17, color: 'rgba(255,255,255,.8)', marginTop: 12, maxWidth: 600, lineHeight: 1.5 }}>
            Everything you need to know about booking, traveling, and resolving issues with trav.
          </p>
        </div>
      </div>

      {/* Content Layout */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: `${isMobile ? 24 : 40}px ${pad}px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '260px 1fr', gap: isMobile ? 24 : 48 }}>
          
          {/* Sidebar / Tabs */}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: 8, overflowX: isMobile ? 'auto' : 'visible', paddingBottom: isMobile ? 12 : 0, margin: isMobile ? '0 -16px' : 0, padding: isMobile ? '0 16px 12px' : 0 }} className={isMobile ? 'scroll-x' : ''}>
            {categories.map(c => {
              const active = activeTab === c.id;
              return (
                <button key={c.id} onClick={() => setActiveTab(c.id)} className={isMobile ? 'snap' : ''} style={{
                  flexShrink: 0, background: active ? '#fff' : 'transparent', color: active ? T.greenDeep : T.grey,
                  border: active ? `1px solid ${T.greenDeep}` : '1px solid transparent',
                  padding: '12px 16px', borderRadius: 12, fontSize: 13.5, fontWeight: active ? 700 : 600,
                  cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                  display: 'flex', alignItems: 'center', gap: 10,
                  boxShadow: active ? '0 4px 12px rgba(0,0,0,.03)' : 'none', transition: 'all .2s'
                }}>
                  <Ico name={c.icon} size={15} color={active ? T.greenDeep : T.grey}/>
                  {c.label}
                </button>
              );
            })}
          </div>

          {/* FAQ Accordions */}
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: T.ink, fontFamily: 'Fraunces, serif', marginBottom: 20 }}>
              {categories.find(c => c.id === activeTab)?.label}
            </h2>
            <div style={{ background: '#fff', borderRadius: 16, border: `1px solid ${T.greyLight}`, overflow: 'hidden' }}>
              {activeFaqs.map((f, i) => {
                const isOpen = openQ === f.q;
                return (
                  <div key={i} style={{ borderBottom: i === activeFaqs.length - 1 ? 'none' : `1px solid ${T.greyLight}` }}>
                    <div onClick={() => toggleQ(f.q)} style={{ padding: '20px 24px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, background: isOpen ? '#FAFBFC' : '#fff' }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: isOpen ? T.greenDeep : T.ink, lineHeight: 1.4 }}>{f.q}</span>
                      <div style={{ transform: `rotate(${isOpen ? 180 : 0}deg)`, transition: 'transform .2s', flexShrink: 0, marginTop: 2 }}>
                        <Ico name="chevron-down" size={16} color={isOpen ? T.greenDeep : T.grey}/>
                      </div>
                    </div>
                    {isOpen && (
                      <div style={{ padding: '0 24px 24px', fontSize: 14, color: T.inkSoft, lineHeight: 1.6, background: '#FAFBFC' }}>
                        {f.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Support CTA inside FAQ */}
            <div style={{ marginTop: 32, background: '#F0FAF4', border: `1px solid ${T.green}33`, borderRadius: 16, padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: T.ink, fontFamily: 'Fraunces, serif' }}>Still need help?</div>
                <div style={{ fontSize: 13, color: T.grey, marginTop: 4 }}>Our support team is online and replies within 28 minutes.</div>
              </div>
              <button onClick={() => window.openSupport && window.openSupport()} style={{ height: 42, padding: '0 20px', borderRadius: 999, background: T.ink, color: '#fff', border: 'none', fontSize: 13.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                Contact Support
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

Object.assign(window, { FaqPage });
