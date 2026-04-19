
const POLICIES = [
  { id: 'terms', title: 'Terms of Service', effective: 'May 1, 2026', content: `
    <h3>1. Definitions</h3>
    <p><b>"Booking"</b> the confirmed reservation of a Trip on the Platform, evidenced by a unique booking identifier and confirmation message.</p>
    <p><b>"Creator"</b> an individual or entity that publishes travel content on the Platform and may earn commission on Bookings attributed to such content.</p>
    <p><b>"DMC"</b> Destination Management Company — a third-party tour operator that provides on-ground travel services for Trips listed on the Platform.</p>
    <p><b>"Platform"</b> the trav website, mobile application, sub-products including trav.her, and all features and services made available by the Company.</p>
    <p><b>"Trip"</b> a travel itinerary, package, or experience offered for booking on the Platform.</p>
    <p><b>"User"</b> any person who accesses or uses the Platform, whether registered or unregistered.</p>
    
    <h3>2. Eligibility</h3>
    <p>2.1 You must be at least 18 (eighteen) years of age and competent to enter into a binding contract under the Indian Contract Act, 1872 to use the Platform or make a Booking.</p>
    <p>2.2 By using the Platform, you represent and warrant that you meet the eligibility criteria, that the information you provide is true, accurate, and complete, and that your use of the Platform does not violate any applicable law.</p>
    <p>2.3 Users below the age of 18 may travel only when accompanied by an adult who has made the Booking in their name and assumes responsibility for them.</p>
    
    <h3>3. Nature of the Platform — Marketplace Facilitator</h3>
    <p>3.1 The Company operates the Platform as a marketplace facilitator that enables connection between Users (travelers), Creators (content publishers), and DMCs (service providers).</p>
    <p>3.2 The Company is not the provider of the underlying travel services. The actual provision of accommodation, transport, food, activities, and other on-ground services is the responsibility of the relevant DMC, which is independently liable for the quality and timely delivery of such services.</p>
    <p>3.3 The Company qualifies as an "intermediary" within the meaning of Section 2(1)(w) of the Information Technology Act, 2000 and complies with applicable provisions including the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021.</p>

    <h3>4. User Account</h3>
    <p>4.1 You may need to create an account to access certain features. You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.</p>
    <p>4.2 You must notify the Company immediately at support@trav.guide of any unauthorized use of your account.</p>

    <h3>5. Bookings, Pricing, and Payments</h3>
    <p>5.1 All Bookings are subject to the Booking Policy and Payment Terms published on the Platform. By making a Booking, you accept those policies.</p>
    <p>5.2 Prices are displayed in Indian Rupees (INR) and are inclusive of applicable Goods and Services Tax (GST) unless stated otherwise. The total payable amount is shown to you at checkout before payment.</p>
    <p>5.3 Payments are processed by RBI-licensed payment aggregators including but not limited to Razorpay. The Company does not store full card details on its servers.</p>
  `},
  { id: 'privacy', title: 'Privacy Policy', effective: 'May 1, 2026', content: `
    <h3>1. Data Fiduciary</h3>
    <p>The Company is the Data Fiduciary in respect of personal data collected through the Platform.</p>
    <p>Registered Office: [Registered Office Address, Bengaluru, Karnataka, India]</p>
    <p>Contact for data protection matters: privacy@trav.guide</p>
    
    <h3>2. Personal Data We Collect</h3>
    <p>2.1 Information you provide: (a) Identity data: name, DOB, gender; (b) Contact data: email, mobile, address; (c) Booking data: travel dates, destination, emergency contact; (d) Payment data: tokenised transaction history; (e) Verification data: KYC for high-value transactions; (f) User Content: photos, reviews; (g) Communications.</p>
    <p>2.2 Information collected automatically: (a) Device data: OS, IP, browser; (b) Usage data: pages visited, query history; (c) Location data: approximate and, with consent, precise for trav.her safety features.</p>

    <h3>3. Lawful Basis</h3>
    <p>Your data is processed for account management (contract), booking performance (contract), payment security (legitimate interest), and safety check-ins (consent/vital interest).</p>

    <h3>4. Data Sharing</h3>
    <p>We share data with DMC partners (limited to trip delivery needs), Payment aggregators (Razorpay), Cloud providers (AWS/Vercel), and Government authorities when required by law. We do not sell your personal data.</p>
  `},
  { id: 'refunds', title: 'Refund and Cancellation', effective: 'May 1, 2026', content: `
    <h3>1. Customer-Initiated Cancellation</h3>
    <table style="width:100%; border-collapse:collapse; margin:24px 0; font-size:14px;">
      <thead>
        <tr style="background:#f4f6fa; text-align:left;">
          <th style="padding:14px; border:1px solid #e0e4eb;">Time before Trip departure</th>
          <th style="padding:14px; border:1px solid #e0e4eb;">Refund (% of total)</th>
          <th style="padding:14px; border:1px solid #e0e4eb;">Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom:1px solid #f0f2f5;"><td style="padding:14px; border:1px solid #e0e4eb;">More than 30 days</td><td style="padding:14px; border:1px solid #e0e4eb; font-weight:700; color:#1DBF73;">90%</td><td style="padding:14px; border:1px solid #e0e4eb;">10% retained as admin fee</td></tr>
        <tr style="border-bottom:1px solid #f0f2f5;"><td style="padding:14px; border:1px solid #e0e4eb;">15 to 30 days</td><td style="padding:14px; border:1px solid #e0e4eb; font-weight:700;">75%</td><td style="padding:14px; border:1px solid #e0e4eb;">DMC partial confirmation locked</td></tr>
        <tr style="border-bottom:1px solid #f0f2f5;"><td style="padding:14px; border:1px solid #e0e4eb;">7 to 14 days</td><td style="padding:14px; border:1px solid #e0e4eb; font-weight:700;">50%</td><td style="padding:14px; border:1px solid #e0e4eb;">Hotel and vehicle locked</td></tr>
        <tr style="border-bottom:1px solid #f0f2f5;"><td style="padding:14px; border:1px solid #e0e4eb;">3 to 7 days</td><td style="padding:14px; border:1px solid #e0e4eb; font-weight:700;">25%</td><td style="padding:14px; border:1px solid #e0e4eb;">Most costs sunk with DMC</td></tr>
        <tr style="border-bottom:1px solid #f0f2f5;"><td style="padding:14px; border:1px solid #e0e4eb;">Less than 3 days</td><td style="padding:14px; border:1px solid #e0e4eb; font-weight:700; color:#FF385C;">No refund</td><td style="padding:14px; border:1px solid #e0e4eb;">Free reschedule subject to availability</td></tr>
      </tbody>
    </table>

    <h3>2. trav-Initiated Cancellation (Force Majeure)</h3>
    <p>In cases of weather landslides, infrastructure failure, or DMC non-availability, travelers are entitled to a full refund OR free reschedule with an inconvenience credit ranging from INR 1,000 to 2,000.</p>
    
    <h3>3. Timelines</h3>
    <p><b>UPI:</b> 24 hours | <b>Razorpay:</b> 5-7 business days | <b>trav Coins:</b> 24 hours.</p>
  `},
  { id: 'travher-safety', title: 'trav.her Safety Mark', effective: 'May 1, 2026', content: `
    <h3>1. Purpose</h3>
    <p>The trav.her Safety Mark is a certification awarded by the Company to accommodation properties and Trips that meet the trav.her safety criteria designed for solo female travelers.</p>
    
    <h3>2. Certification Criteria</h3>
    <ul>
      <li><b>Staffing:</b> Female staff present on the property at all times.</li>
      <li><b>Surveillance:</b> CCTV in common areas, verified by physical inspection.</li>
      <li><b>Lighting:</b> Well-lit premises, verified by night-time inspection.</li>
      <li><b>Reviews:</b> At least 5 (five) verified reviews from solo female travelers.</li>
      <li><b>Accessibility:</b> Located in a safe area, accessible by main road.</li>
    </ul>

    <h3>3. Verification Process</h3>
    <p>Each property is verified through documentation review, in-person site visits by the Company's team, customer interviews, and ongoing monitoring through traveler feedback.</p>

    <h3>4. Limitations</h3>
    <p>The Safety Mark represents the Company's reasonable efforts to identify properties that meet the criteria. It is a quality certification but not an absolute guarantee of safety. Travelers are responsible for exercising their own judgment.</p>
  `},
  { id: 'booking', title: 'Booking Policy', effective: 'May 1, 2026', content: `
    <h3>1. The Booking Contract</h3>
    <p>1.1 A Booking is formed when (a) you select a Trip, (b) make full payment, and (c) receive an electronic Booking confirmation.</p>
    <p>1.2 Until the confirmation is received, the Booking is a request and may be declined for reasons including unavailability.</p>
    
    <h3>2. Inclusions and Exclusions</h3>
    <p>2.1 Each Trip listing on the Platform clearly states what is included (accommodation, transport, meals, activities) and what is excluded (personal expenses, additional meals).</p>
    <p>2.2 Travelers must carry valid government-issued photo identification.</p>
    
    <h3>3. Health and Fitness</h3>
    <p>Travelers are responsible for assessing their own health and fitness for the Trip and any activities included. Pre-existing medical conditions should be disclosed at the time of Booking.</p>
  `},
  { id: 'payments', title: 'Payment Terms', effective: 'May 1, 2026', content: `
    <h3>1. Methods</h3>
    <p>We accept UPI, Credit/Debit cards, and Net Banking. International cards may be charged a conversion fee by the issuing bank.</p>
    
    <h3>2. Processing and Security</h3>
    <p>Payments are processed by Razorpay. The Company does not store full card data. Tokenisation is used in compliance with RBI guidelines.</p>
    
    <h3>3. Failed Payments</h3>
    <p>If a payment fails, the Booking is held for 30 minutes during retry; if not completed, the spot is released.</p>
  `},
  { id: 'grievance', title: 'Grievance Redressal', effective: 'May 1, 2026', content: `
    <h3>1. Scope</h3>
    <p>Covers grievances relating to bookings, payments, service quality, safety, and data privacy.</p>
    
    <h3>2. Timelines</h3>
    <ul>
      <li><b>Acknowledgement:</b> Within 24 hours.</li>
      <li><b>Resolution:</b> Within 15 days (Standard); Within 30 days (Privacy).</li>
      <li><b>Safety:</b> Immediate response; resolution within 24 hours.</li>
    </ul>

    <h3>3. Grievance Officer</h3>
    <p><b>Name:</b> Sudarshan | <b>Email:</b> grievance@trav.guide | <b>Phone:</b> +91-XXXXX-XXXXX</p>
  `},
  { id: 'pricing-taxes', title: 'Pricing & Tax', effective: 'May 1, 2026', content: `
    <h3>1. Pricing Transparency</h3>
    <p>All prices displayed on the Platform are in Indian Rupees (INR). Each price is the total amount payable inclusive of all applicable taxes and convenience fees.</p>
    
    <h3>2. GST Rates</h3>
    <ul>
      <li><b>Tour Services:</b> 5% GST under SAC 9985.</li>
      <li><b>Convenience Fees:</b> 18% GST.</li>
    </ul>

    <h3>3. Dynamic Pricing</h3>
    <p>Prices may vary based on seasons, group size, and inventory. The price displayed at the time of Booking is binding for that specific transaction.</p>
  `},
  { id: 'coins', title: 'trav Coins Terms', effective: 'May 1, 2026', content: `
    <h3>1. Earning Mechanics</h3>
    <p>Users earn trav Coins (1 Coin = INR 1) through bookings (0.5%), referrals (50-100 coins), and travelogue submissions (25 coins).</p>
    
    <h3>2. Earning Limits</h3>
    <ul>
      <li><b>Quarterly Cap:</b> 500 coins per user.</li>
      <li><b>Lifetime Wallet Cap:</b> 1,500 coins.</li>
      <li><b>Expiry:</b> 6 months from the date of earning.</li>
    </ul>

    <h3>3. Redemption</h3>
    <p>Minimum 500 coins required to redeem. Maximum redeemable per booking is 5% of the total amount or 500 coins, whichever is lower.</p>
  `},
  { id: 'community', title: 'Community Guidelines', effective: 'May 1, 2026', content: `
    <h3>1. Values</h3>
    <p>trav is built on respect, honesty, and helpfulness. We maintain a zero-tolerance policy for harassment, hate speech, or discrimination.</p>

    <h3>2. Prohibited Conduct</h3>
    <p>Threats, intimidation, incitement to violence, and the sharing of sexually explicit content are strictly prohibited and result in a permanent ban.</p>
    
    <h3>3. trav.her Safety</h3>
    <p>Misrepresentation of identity to gain access to the women-only trav.her community results in immediate and permanent exclusion.</p>
  `},
  { id: 'cookie', title: 'Cookie Policy', effective: 'May 1, 2026', content: `
    <h3>1. Categories of Cookies</h3>
    <ul>
      <li><b>Necessary:</b> For login, security, and payments.</li>
      <li><b>Functional:</b> For language and accessibility settings.</li>
      <li><b>Analytics:</b> Google Analytics 4, Mixpanel, and Hotjar for platform optimization.</li>
      <li><b>Marketing:</b> Meta Pixel and Google Ads for ad performance tracking.</li>
    </ul>

    <h3>2. Consent Management</h3>
    <p>Users can manage preferences via the "Cookie Preferences" link in the footer or through browser settings.</p>
  `},
  { id: 'referral', title: 'Referral Terms', effective: 'May 1, 2026', content: `
    <h3>1. Eligibility</h3>
    <p>Referrers must have an active account. Referees must be new users who have never previously registered on the Platform.</p>
    
    <h3>2. Rewards</h3>
    <p>Referees get 50 coins on signup. Referrers get 100 coins once the referee completes their first booking within 90 days.</p>
    
    <h3>3. Annual Cap</h3>
    <p>Users are rewarded for a maximum of 5 (five) successful referrals per calendar year.</p>
  `},
  { id: 'ugc', title: 'Content & UGC', effective: 'May 1, 2026', content: `
    <h3>1. License Grant</h3>
    <p>Users retain ownership but grant the Company a royalty-free, worldwide license to use, reproduce, and display content for platform promotion.</p>
    
    <h3>2. Quality Standards</h3>
    <p>Content must be original, based on first-hand experience, and free of plagiarised material or watermarks from other platforms.</p>
    
    <h3>3. Removal</h3>
    <p>Users may request content removal at any time via support@trav.guide; processing is handled within 7 days.</p>
  `},
  { id: 'grievance-officer', title: 'Grievance Officer', effective: 'May 1, 2026', content: `
    <h3>1. Official Appointment</h3>
    <p>In compliance with the IT Rules, 2021, the following officer is appointed to resolve user grievances:</p>
    <ul>
      <li><b>Name:</b> Sudarshan [Last Name]</li>
      <li><b>Designation:</b> Grievance Officer</li>
      <li><b>Email:</b> grievance@trav.guide</li>
      <li><b>Office Hours:</b> Mon-Fri, 10 AM - 6 PM IST</li>
    </ul>
  `},
  { id: 'promo-terms', title: 'Promo Code Terms', effective: 'May 1, 2026', content: `
    <h3>1. Usage Restrictions</h3>
    <p>Promo codes are valid for a single booking per user unless stated otherwise. Codes cannot be combined with trav Coins or other offers.</p>
    
    <h3>2. No Cash Value</h3>
    <p>Codes are non-transferable and cannot be exchanged for cash. If a booking is cancelled, the discount is forfeited and not refunded.</p>
  `},
  { id: 'marketing-consent', title: 'Marketing Consent', effective: 'May 1, 2026', content: `
    <h3>1. Channel-Specific Opt-in</h3>
    <p>During signup, you provide separate consent for Email, SMS, and WhatsApp marketing. Default is always opt-out.</p>
    
    <h3>2. Withdrawal</h3>
    <p>You may withdraw consent at any time by clicking "unsubscribe", replying STOP, or blocking our number on WhatsApp.</p>
  `}
];

// Additional helper for legal blocks to avoid massive string templates
const LegalBlock = ({ title, effective, children }) => (
  <div style={{ marginBottom: 60 }}>
    <div style={{ fontSize: 11, fontWeight: 800, color: T.greenDeep, letterSpacing: '.18em', marginBottom: 10 }}>EFFECTIVE {effective.toUpperCase()}</div>
    <h1 style={{ fontSize: 42, fontWeight: 700, color: T.ink, fontFamily: 'Fraunces, serif', margin: '0 0 24px', letterSpacing: '-.02em' }}>{title}</h1>
    <div className="legal-content" dangerouslySetInnerHTML={{ __html: children }} />
  </div>
);

function PoliciesPage({ onBack, theme='light' }) {
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = React.useState(() => {
    return POLICIES[0].id; // We can handle hashes later if needed
  });

  const isMobile = useIsMobile();

  React.useEffect(() => {
    const handleHash = () => {
      const h = window.location.hash.replace('#', '');
      if (h) setActiveTab(h);
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const activePolicy = POLICIES.find(p => p.id === activeTab) || POLICIES[0];

  return (
    <div className="keep-colors" style={{ background: isDark ? '#0a0a0a' : '#fff', minHeight: '100vh', color: isDark ? '#fff' : T.ink }}>
      <nav style={{ height: 72, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#e0e4eb'}`, display: 'flex', alignItems:'center', padding: '0 24px', background: isDark ? '#0a0a0a' : '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={onBack} style={{ background:'transparent', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', width:32, height:32, borderRadius:'50%' }}>
            <Ico name="arrow-left" size={18} color={isDark ? '#fff' : T.ink}/>
          </button>
          <div style={{ width: 1, height: 24, background: isDark ? 'rgba(255,255,255,0.1)' : T.greyLight }}/>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, background: T.green, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 18 }}>t</span>
            </div>
            <span style={{ fontSize: 20, fontWeight: 800, color: isDark ? '#fff' : T.ink, letterSpacing: '-.02em' }}>trav <span style={{ color: T.grey, fontWeight: 500 }}>· Legal Center</span></span>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
        {/* Sidebar */}
        <div style={{ 
          width: isMobile ? '100%' : 280, 
          padding: '40px 24px', 
          borderRight: isMobile ? 'none' : '1px solid #f0f2f5',
          height: isMobile ? 'auto' : 'calc(100vh - 72px)',
          position: isMobile ? 'static' : 'sticky',
          top: 72,
          overflowY: 'auto'
        }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: T.grey, letterSpacing: '.12em', marginBottom: 20, textTransform: 'uppercase' }}>Resources</div>
          {POLICIES.map(p => (
            <a 
              key={p.id}
              href={`#${p.id}`}
              onClick={() => setActiveTab(p.id)}
              style={{
                display: 'block',
                padding: '12px 14px',
                borderRadius: 10,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: activeTab === p.id ? 700 : 500,
                color: activeTab === p.id ? T.greenDeep : T.inkSoft,
                background: activeTab === p.id ? T.greenLight + '44' : 'transparent',
                marginBottom: 4,
                transition: 'all .2s'
              }}
            >
              {p.title}
            </a>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: isMobile ? '40px 24px' : '60px 80px', maxWidth: 840 }}>
          <LegalBlock title={activePolicy.title} effective={activePolicy.effective}>
            {activePolicy.content}
          </LegalBlock>
          
          <div style={{ marginTop: 80, padding: 32, background: '#f8fafc', borderRadius: 20, border: '1px solid #e2e8f0' }}>
            <h4 style={{ margin: '0 0 8px', fontSize: 18, color: T.ink }}>Need legal clarification?</h4>
            <p style={{ margin: 0, fontSize: 14, color: T.inkSoft }}>If you have questions about these terms, reach our legal team at <a href="mailto:legal@trav.guide" style={{ color: T.greenDeep, fontWeight: 600 }}>legal@trav.guide</a>.</p>
          </div>
        </div>
      </div>

      <style>{`
        .legal-content h3 { font-family: 'Fraunces', serif; font-size: 22px; margin: 32px 0 16px; color: ${T.ink}; }
        .legal-content p { font-size: 16px; line-height: 1.7; color: ${T.inkSoft}; margin-bottom: 20px; }
        .legal-content ul { padding-left: 20px; margin-bottom: 24px; }
        .legal-content li { font-size: 16px; line-height: 1.7; color: ${T.inkSoft}; margin-bottom: 12px; }
      `}</style>
    </div>
  );
}

Object.assign(window, { PoliciesPage });
