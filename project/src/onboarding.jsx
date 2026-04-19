function OnboardingJourney({ onComplete, onSkip, theme }) {
  const isMobile = useIsMobile();
  const [step, setStep] = React.useState(1);
  const totalSteps = 6;
  const [data, setData] = React.useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    nationality: 'Indian',
    city: null,
    persona: null,
    interests: [],
    notifications: { whatsapp: true, email: true, push: false },
    isWoman: false,
    agreedToTerms: false
  });

  const next = () => {
    if (step < totalSteps) setStep(step + 1);
    else finish();
  };

  const back = () => {
    if (step > 1) setStep(step - 1);
  };

  const finish = () => {
    SAVE_USER_PREFS(data);
    onComplete && onComplete(data);
  };

  // Click outside to skip/close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onSkip();
  };

  return (
    <div 
      onClick={handleBackdropClick}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(15, 30, 46, 0.4)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: isMobile ? 12 : 20
      }}>
      <div style={{
        width: '100%', maxWidth: 520, 
        background: '#fff', borderRadius: 24,
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        display: 'flex', flexDirection: 'column',
        maxHeight: '90vh', overflow: 'hidden',
        position: 'relative'
      }} onClick={e => e.stopPropagation()}>
        
        {/* Modal Progress Indicator */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: '#f5f5f5' }}>
          <div style={{ height: '100%', width: `${(step/totalSteps)*100}%`, background: T.green, transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} />
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '32px 20px' : '40px 48px' }}>
          {step === 1 && <StepOneLastStep data={data} setData={setData} onNext={next} onSkip={finish} isMobile={isMobile} />}
          {step === 2 && <StepCity data={data} setData={setData} onNext={next} onSkip={finish} isMobile={isMobile} />}
          {step === 3 && <StepPersona data={data} setData={setData} onNext={next} onBack={back} onSkip={finish} isMobile={isMobile} />}
          {step === 4 && <StepInterests data={data} setData={setData} onNext={next} onBack={back} onSkip={finish} isMobile={isMobile} />}
          {step === 5 && <StepNotifications data={data} setData={setData} onNext={next} onBack={back} onSkip={finish} isMobile={isMobile} />}
          {step === 6 && <StepConsent data={data} setData={setData} onNext={finish} onBack={back} onSkip={finish} isMobile={isMobile} />}
        </div>
      </div>
    </div>
  );
}

function StepOneLastStep({ data, setData, onNext, onSkip, isMobile }) {
  const isValid = data.name && data.email && data.phone;

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 24, fontWeight: 900, color: T.green, letterSpacing: '-.02em', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>trav</span>
          <div style={{ width: 6, height: 6, background: T.green, borderRadius: 1 }} />
        </div>
      </div>

      <h2 style={{ fontSize: 26, fontWeight: 800, color: T.ink, textAlign: 'center', marginBottom: 8, letterSpacing: '-.01em' }}>One last step</h2>
      <p style={{ fontSize: 13, color: T.grey, textAlign: 'center', lineHeight: 1.5, marginBottom: 32, maxWidth: 360 }}>
        We'll use this to book trips for you. Skip anything you'd rather add later.
      </p>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Field label="FULL NAME" value={data.name} onChange={v => setData({...data, name: v})} placeholder="Aditi Rao" />
        <Field label="EMAIL" value={data.email} onChange={v => setData({...data, email: v})} placeholder="aditi.r@gmail.com" type="email" />
        
        <div>
          <label style={{ fontSize: 10, fontWeight: 800, color: T.grey, letterSpacing: '.08em', marginBottom: 8, display: 'block' }}>MOBILE</label>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ 
              width: 56, height: 48, borderRadius: 12, border: `1.5px solid ${T.greyLight}`, 
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, color: T.ink 
            }}>+91</div>
            <input 
              value={data.phone} 
              onChange={e => setData({...data, phone: e.target.value})}
              placeholder="98xxx xxxxx"
              style={{
                flex: 1, height: 48, borderRadius: 12, border: `1.5px solid ${T.greyLight}`,
                padding: '0 16px', fontSize: 14, fontWeight: 500, outline: 'none', transition: 'border-color 0.2s'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          <Field label="DOB - optional" value={data.dob} onChange={v => setData({...data, dob: v})} placeholder="DD / MM / YYYY" style={{ flex: 1 }} />
          <Field label="NATIONALITY - optional" value={data.nationality} onChange={v => setData({...data, nationality: v})} placeholder="Indian" style={{ flex: 1 }} />
        </div>
      </div>

      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 40 }}>
        <button onClick={onSkip} style={{ background: 'transparent', border: 'none', color: T.grey, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Skip for now</button>
        <button 
          onClick={onNext}
          style={{
            height: 48, padding: '0 40px', borderRadius: 999, background: T.green,
            color: '#fff', border: 'none', fontSize: 14, fontWeight: 800, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8, transition: 'transform 0.2s active'
          }}>
          Finish setup <Ico name="arrow-right" size={16} color="#fff" stroke={3} />
        </button>
      </div>

      <div style={{ marginTop: 24, fontSize: 11, color: T.grey, textAlign: 'center' }}>
        You can edit all of this in <b style={{ color: T.ink }}>Profile → Settings</b>.
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text', style = {} }) {
  return (
    <div style={style}>
      <label style={{ fontSize: 10, fontWeight: 800, color: T.grey, letterSpacing: '.08em', marginBottom: 8, display: 'block' }}>{label}</label>
      <input 
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', height: 48, borderRadius: 12, border: `1.5px solid ${T.greyLight}`,
          padding: '0 16px', fontSize: 14, fontWeight: 500, outline: 'none', transition: 'border-color 0.2s',
          fontFamily: 'inherit'
        }}
        onFocus={e => e.target.style.borderColor = T.green}
        onBlur={e => e.target.style.borderColor = T.greyLight}
      />
    </div>
  );
}

function StepCity({ data, setData, onNext, isMobile }) {
  return (
    <div className="fade-in">
      <div style={{ fontSize: 10, fontWeight: 800, color: T.green, letterSpacing: '.14em', marginBottom: 12, textAlign: 'center' }}>LOCATION</div>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: T.ink, textAlign: 'center', marginBottom: 8, letterSpacing: '-.02em' }}>Where are you based?</h2>
      <p style={{ color: T.grey, fontSize: 13, textAlign: 'center', lineHeight: 1.5, marginBottom: 32 }}>Tell us your home city to see local departures.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12, marginBottom: 32 }}>
        {ONBOARDING_CITIES.map(c => {
          const active = data.city === c.id;
          return (
            <div 
              key={c.id} 
              onClick={() => { setData({...data, city: c.id}); setTimeout(onNext, 400); }}
              style={{
                padding: '16px', borderRadius: 16, border: `1.5px solid ${active ? T.green : T.greyLight}`,
                background: active ? '#F0FAF4' : '#fff',
                cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 14
              }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Ico name={c.icon} size={18} color={active ? T.green : T.grey} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: T.ink }}>{c.name}</div>
              </div>
              {active && <div style={{ marginLeft: 'auto' }}><Ico name="check" size={16} color={T.green} stroke={4} /></div>}
            </div>
          );
        })}
      </div>

      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onSkip} style={{ background: 'transparent', border: 'none', color: T.grey, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Skip for now</button>
        <button 
          onClick={onNext}
          style={{
            height: 44, padding: '0 32px', borderRadius: 999, background: data.city ? T.green : T.greyLight,
            color: '#fff', border: 'none', fontSize: 14, fontWeight: 800, cursor: data.city ? 'pointer' : 'default',
          }}>
          Continue
        </button>
      </div>
    </div>
  );
}

function StepPersona({ data, setData, onNext, onBack, isMobile }) {
  const personas = [
    { id: 'solo', label: 'Solo', icon: 'user' },
    { id: 'couple', label: 'Couple', icon: 'heart' },
    { id: 'group', label: 'Group', icon: 'users' },
    { id: 'family', label: 'Family', icon: 'users' },
    { id: 'corporate', label: 'Corporate', icon: 'briefcase' },
  ];

  return (
    <div className="fade-in">
      <div style={{ fontSize: 10, fontWeight: 800, color: T.green, letterSpacing: '.14em', marginBottom: 12, textAlign: 'center' }}>TRAVEL PERSONA</div>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: T.ink, textAlign: 'center', marginBottom: 8, letterSpacing: '-.02em' }}>How do you usually travel?</h2>
      <p style={{ color: T.grey, fontSize: 13, textAlign: 'center', lineHeight: 1.5, marginBottom: 32 }}>Personalizing your journeys.</p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 30 }}>
        {personas.map(p => {
          const active = data.persona === p.id;
          return (
            <div 
              key={p.id} 
              onClick={() => setData({...data, persona: p.id})}
              style={{
                flex: '1 1 calc(50% - 5px)', padding: '16px',
                borderRadius: 16, border: `1.5px solid ${active ? T.green : T.greyLight}`,
                background: '#fff', cursor: 'pointer', transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: 12
              }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: active ? '#F0FAF4' : '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Ico name={p.icon} size={16} color={active ? T.green : T.grey} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>{p.label}</div>
            </div>
          );
        })}
      </div>

      <div style={{ background: '#FFF0EA', borderRadius: 20, padding: '16px', marginBottom: 32, border: '1px solid #FFD9CC', display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, marginBottom: 2 }}>Are you a woman?</div>
          <div style={{ fontSize: 11, color: T.grey }}>Join <b>trav.her</b> community.</div>
        </div>
        <div onClick={() => setData({...data, isWoman: !data.isWoman})} style={{
          width: 44, height: 24, borderRadius: 20, background: data.isWoman ? T.green : T.greyLight,
          position: 'relative', cursor: 'pointer', transition: 'background 0.2s'
        }}>
          <div style={{
            position: 'absolute', top: 3, left: data.isWoman ? 23 : 3, width: 18, height: 18,
            borderRadius: '50%', background: '#fff', transition: 'left 0.2s'
          }} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: T.grey, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Back</button>
          <div style={{ width: 1, height: 12, background: T.greyLight }} />
          <button onClick={onSkip} style={{ background: 'transparent', border: 'none', color: T.grey, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Skip</button>
        </div>
        <button 
          onClick={onNext}
          disabled={!data.persona}
          style={{
            padding: '12px 24px', borderRadius: 999, background: data.persona ? T.green : T.greyLight,
            color: '#fff', border: 'none', fontSize: 14, fontWeight: 800, cursor: data.persona ? 'pointer' : 'default',
          }}>
          Continue
        </button>
      </div>
    </div>
  );
}

function StepInterests({ data, setData, onNext, onBack, isMobile }) {
  const toggle = (id) => {
    const list = data.interests.includes(id) 
      ? data.interests.filter(i => i !== id)
      : [...data.interests, id];
    setData({...data, interests: list});
  };

  return (
    <div className="fade-in">
      <div style={{ fontSize: 10, fontWeight: 800, color: T.green, letterSpacing: '.14em', marginBottom: 12, textAlign: 'center' }}>TRIP VIBES</div>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: T.ink, textAlign: 'center', marginBottom: 8, letterSpacing: '-.02em' }}>What excites you?</h2>
      <p style={{ color: T.grey, fontSize: 13, textAlign: 'center', lineHeight: 1.5, marginBottom: 24 }}>Select at least 3 perks.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 32 }}>
        {ONBOARDING_INTERESTS.map(i => {
          const active = data.interests.includes(i.id);
          return (
            <div 
              key={i.id} 
              onClick={() => toggle(i.id)}
              style={{
                aspectRatio: '1/1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                borderRadius: 12, border: `1.5px solid ${active ? T.green : T.greyLight}`,
                background: active ? T.green : '#fff', cursor: 'pointer', transition: 'all 0.2s'
              }}>
              <Ico name={i.icon} size={20} color={active ? '#fff' : T.grey} />
              <div style={{ fontSize: 9, fontWeight: 700, color: active ? '#fff' : T.ink, marginTop: 4, textAlign: 'center' }}>{i.label}</div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: T.grey, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Back</button>
          <div style={{ width: 1, height: 12, background: T.greyLight }} />
          <button onClick={onSkip} style={{ background: 'transparent', border: 'none', color: T.grey, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Skip</button>
        </div>
        <button 
          onClick={onNext}
          disabled={data.interests.length < 3}
          style={{
            padding: '12px 24px', borderRadius: 999, background: data.interests.length >= 3 ? T.green : T.greyLight,
            color: '#fff', border: 'none', fontSize: 14, fontWeight: 800, cursor: data.interests.length >= 3 ? 'pointer' : 'default',
          }}>
          Continue
        </button>
      </div>
    </div>
  );
}

function StepNotifications({ data, setData, onNext, onBack, isMobile }) {
  return (
    <div className="fade-in">
      <div style={{ fontSize: 10, fontWeight: 800, color: T.green, letterSpacing: '.14em', marginBottom: 12, textAlign: 'center' }}>STAY UPDATED</div>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: T.ink, textAlign: 'center', marginBottom: 8, letterSpacing: '-.02em' }}>Ready for takeoff?</h2>
      <p style={{ color: T.grey, fontSize: 13, textAlign: 'center', lineHeight: 1.5, marginBottom: 32 }}>We'll send you curated drops every Thursday.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
        <div style={{ padding: '16px', borderRadius: 16, border: `1.5px solid ${T.green}`, background: '#F0FAF4', display: 'flex', alignItems: 'center', gap: 14 }}>
          <Ico name="whatsapp" size={20} color={T.green} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>WhatsApp Updates</div>
            <div style={{ fontSize: 11, color: T.grey }}>Booking & Drop alerts</div>
          </div>
          <Ico name="check" size={18} color={T.green} stroke={4} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: T.grey, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Back</button>
          <div style={{ width: 1, height: 12, background: T.greyLight }} />
          <button onClick={onSkip} style={{ background: 'transparent', border: 'none', color: T.grey, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Skip</button>
        </div>
        <button 
          onClick={onNext}
          style={{
            height: 48, padding: '0 48px', borderRadius: 999, background: T.green,
            color: '#fff', border: 'none', fontSize: 15, fontWeight: 800, cursor: 'pointer',
          }}>
          Continue
        </button>
      </div>
    </div>
  );
}

function StepConsent({ data, setData, onNext, onBack, isMobile }) {
  return (
    <div className="fade-in">
      <div style={{ fontSize: 10, fontWeight: 800, color: T.green, letterSpacing: '.14em', marginBottom: 12, textAlign: 'center' }}>FINAL STEP</div>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: T.ink, textAlign: 'center', marginBottom: 8, letterSpacing: '-.02em' }}>One more thing...</h2>
      <p style={{ color: T.grey, fontSize: 13, textAlign: 'center', lineHeight: 1.5, marginBottom: 32 }}>We take your privacy seriously. Please review and agree to our terms to finish.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40, padding: '24px', background: '#f8fafc', borderRadius: 20, border: '1px solid #e2e8f0' }}>
        <div onClick={() => setData({...data, agreedToTerms: !data.agreedToTerms})} style={{ display: 'flex', gap: 14, cursor: 'pointer' }}>
          <div style={{ 
            width: 22, height: 22, borderRadius: 6, border: `2px solid ${data.agreedToTerms ? T.green : T.greyLight}`,
            background: data.agreedToTerms ? T.green : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            transition: 'all 0.2s'
          }}>
            {data.agreedToTerms && <Ico name="check" size={14} color="#fff" stroke={4} />}
          </div>
          <div style={{ fontSize: 13, color: T.ink, lineHeight: 1.5 }}>
            I agree to the <b style={{ color: T.green }}>Privacy Policy</b> and <b style={{ color: T.green }}>Terms of Service</b>. I understand how my data will be used to personalize my experience.
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 14 }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${T.green}`, background: T.green, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Ico name="check" size={14} color="#fff" stroke={4} />
          </div>
          <div style={{ fontSize: 13, color: T.ink, lineHeight: 1.5 }}>
            I opt-in to receive exclusive weekend drops and early access deals via WhatsApp and Email.
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <button 
          onClick={onNext}
          disabled={!data.agreedToTerms}
          style={{
            height: 52, width: '100%', borderRadius: 999, background: data.agreedToTerms ? T.green : T.greyLight,
            color: '#fff', border: 'none', fontSize: 16, fontWeight: 800, cursor: data.agreedToTerms ? 'pointer' : 'default',
            boxShadow: data.agreedToTerms ? '0 8px 20px rgba(29,191,115,0.2)' : 'none',
            transition: 'all 0.2s'
          }}>
          Finish & Explore India
        </button>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
          <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: T.grey, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            Go back
          </button>
          <div style={{ width: 1, height: 12, background: T.greyLight, marginTop: 4 }} />
          <button onClick={onSkip} style={{ background: 'transparent', border: 'none', color: T.grey, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { OnboardingJourney });
