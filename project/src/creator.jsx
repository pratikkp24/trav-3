
function CreatorProfile({ creatorId, onBack, onOpenTrip, isMobile, theme }) {
  const isDark = theme === 'dark';
  const creator = CREATORS.find(c => c.id === creatorId) || CREATORS[0];
  const curatedTrips = ALL_TRIPS.filter(t => creator.curatedTripIds.includes(t.id));
  
  const [following, setFollowing] = React.useState(() => {
    try { return localStorage.getItem(`trav.following.${creator.id}`) === 'true'; } catch { return false; }
  });

  React.useEffect(() => {
    // Inject Instagram Script
    if (!document.getElementById('instagram-embed-script')) {
      const script = document.createElement('script');
      script.id = 'instagram-embed-script';
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    } else if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [creatorId]);

  const toggleFollow = () => {
    const newState = !following;
    setFollowing(newState);
    haptic('medium');
    try { localStorage.setItem(`trav.following.${creator.id}`, newState); } catch {}
  };

  const sidePad = isMobile ? 16 : 36;

  return (
    <div style={{ background: isDark ? T.inkDeep : '#F8FAFC', minHeight: '100vh', paddingBottom: 80 }}>
      {/* Header / Nav */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: `${isMobile ? 14 : 24}px ${sidePad}px` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <Btn kind="outline" size="sm" icon="arrow-left" onClick={onBack}>{isMobile ? 'Back' : 'Back to trips'}</Btn>
          <div style={{ display: 'flex', gap:10 }}>
             <button style={actionBtn}><Ico name="share" size={16} color={isDark?'#fff':T.greenDeep}/></button>
          </div>
        </div>

        {/* Profile Card */}
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 24 : 48, alignItems: isMobile ? 'center' : 'flex-start', textAlign: isMobile ? 'center' : 'left' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: isMobile ? 160 : 220, height: isMobile ? 160 : 220, borderRadius: '50%', overflow: 'hidden', border: `6px solid ${isDark ? '#2a3e52' : '#fff'}`, boxShadow: '0 12px 32px rgba(15,30,46,.12)' }}>
              <img src={creator.avatar} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={creator.name} />
            </div>
            {creator.isVerified && (
              <div style={{ position: 'absolute', bottom: 12, right: 12, background: T.green, color: '#fff', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,.1)' }}>
                <Ico name="check" size={16} color="#fff" stroke={3}/>
              </div>
            )}
          </div>
          
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: isMobile ? 32 : 48, fontWeight: 800, color: isDark ? '#fff' : T.ink, fontFamily: 'Fraunces, serif', margin: 0 }}>{creator.name}</h1>
            <div style={{ fontSize: 18, color: T.green, fontWeight: 600, marginTop: 4 }}>{creator.handle}</div>
            <div style={{ fontSize: 18, color: isDark ? 'rgba(255,255,255,.8)' : T.grey, marginTop: 20, maxWidth: 500, lineHeight: 1.5 }}>{creator.bio}</div>
            
            {/* Social Stats Highlights */}
            {creator.social && (
              <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', color: T.ink, padding: '6px 14px', borderRadius: 999, fontSize: 13, fontWeight: 700, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #E2E8F0' }}>
                  <Ico name="sparkle-ring" size={14} color={T.greenDeep} stroke={2.5}/> {creator.stats.travFollowers} <span style={{ color: T.grey, fontWeight: 600, fontSize: 11, marginLeft: 2 }}>Trav Followers</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#FF000011', color: '#CC0000', padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, border: '1px solid #FF000022' }}>
                  <Ico name="youtube" size={14} color="#FF0000" stroke={2.5}/> {creator.social.youtube.subs}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#FDEAF0', color: '#B5365A', padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, border: '1px solid #FDEAF0' }}>
                  <Ico name="instagram" size={14} color="#B5365A" stroke={2.5}/> {creator.social.instagram.followers}
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: 12, marginTop: 28, justifyContent: isMobile ? 'center' : 'flex-start' }}>
              <button 
                onClick={toggleFollow}
                style={{ 
                  height: 44, padding: '0 24px', borderRadius: 12, border: 'none', 
                  background: following ? (isDark ? '#2a3e52' : '#F1F5F9') : T.green, 
                  color: following ? (isDark ? '#fff' : T.ink) : '#fff', 
                  fontSize: 15, fontWeight: 700, cursor: 'pointer', 
                  transition: 'all .2s' 
                }}
              >
                {following ? 'Following' : 'Follow'}
              </button>
              <button style={{ height: 44, padding: '0 24px', borderRadius: 12, border: `1.5px solid ${isDark ? '#2a3e52' : '#cbd5e1'}`, background: 'transparent', color: isDark ? '#fff' : T.ink, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Message</button>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 12, marginTop: 32, overflowX: isMobile ? 'auto' : 'visible' }}>
              <StatCard label="Followers" value={creator.stats.travFollowers} theme={isDark?'dark':'light'} />
              <StatCard label="Trips Curated" value={creator.stats.trips} theme={isDark?'dark':'light'} />
              <StatCard label="Rating" value={creator.stats.rating} suffix="★" theme={isDark?'dark':'light'} />
            </div>
          </div>
        </div>

        {/* Curated Trips Section */}
        <div style={{ marginTop: 64 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
            <div>
              <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 800, color: isDark ? '#fff' : T.ink, fontFamily: 'Fraunces, serif', margin: 0 }}>Curated Trips</h2>
              <div style={{ color: T.grey, fontSize: 14, marginTop: 4 }}>Hand-picked itineraries with exclusive local access.</div>
            </div>
            {!isMobile && <button style={{ background: 'transparent', border: 'none', color: T.green, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>See all →</button>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 24 }}>
            {curatedTrips.slice(0, 3).map(trip => (
              <TripCard key={trip.id} trip={trip} onOpen={() => onOpenTrip(trip.id)} onOpenProfile={() => {}} />
            ))}
          </div>
        </div>

        {/* Instagram Feed (Specific Live Embeds) */}
        {creator.reels && creator.reels.some(r => r.platform === 'instagram') && (
          <div style={{ marginTop: 64 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 800, color: isDark ? '#fff' : T.ink, fontFamily: 'Fraunces, serif', margin: 0 }}>From the Gram</h2>
                <div style={{ color: T.grey, fontSize: 14, marginTop: 4 }}>Live travel logs and social proof.</div>
              </div>
              <button 
                onClick={() => window.open(creator.social.instagram.link, '_blank')}
                style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', border: 'none', color: '#fff', fontWeight: 700, fontSize: 13, padding: '8px 16px', borderRadius: 999, cursor: 'pointer', boxShadow: '0 4px 12px rgba(220, 39, 67, 0.2)' }}
              >
                Follow on Instagram
              </button>
            </div>
            <div className="scroll-x" style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 24, margin: '0 -4px' }}>
              {creator.reels.filter(r => r.platform === 'instagram').map(reel => (
                <div key={reel.id} style={{ flex: '0 0 340px', position: 'relative' }}>
                  <div style={{ width: '100%', height: 480, borderRadius: 24, overflow: 'hidden', background: isDark ? '#1a2e42' : '#fff', boxShadow: '0 8px 32px rgba(0,0,0,.08)', border: `1px solid ${isDark ? '#2a3e52' : '#e2e8f0'}` }}>
                    <iframe 
                      src={`https://www.instagram.com/p/${reel.id}/embed/`}
                      width="100%" 
                      height="100%" 
                      frameBorder="0" 
                      scrolling="no" 
                      allowTransparency="true"
                      style={{ border: 'none', width: '100%', height: '100%' }}
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* YouTube Feed (Travel Shorts) */}
        {creator.reels && creator.reels.some(r => r.platform === 'youtube') && (
          <div style={{ marginTop: 64 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 800, color: isDark ? '#fff' : T.ink, fontFamily: 'Fraunces, serif', margin: 0 }}>Travel Vlogs</h2>
                <div style={{ color: T.grey, fontSize: 14, marginTop: 4 }}>High-production highlights from the road.</div>
              </div>
              <button 
                onClick={() => window.open(creator.social.youtube.link, '_blank')}
                style={{ background: '#FF0000', border: 'none', color: '#fff', fontWeight: 700, fontSize: 13, padding: '8px 16px', borderRadius: 999, cursor: 'pointer', boxShadow: '0 4px 12px rgba(255, 0, 0, 0.2)' }}
              >
                Subscribe
              </button>
            </div>
            <div className="scroll-x" style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 24, margin: '0 -4px' }}>
              {creator.reels.filter(r => r.platform === 'youtube').map(reel => (
                <div key={reel.id} style={{ flex: '0 0 340px', position: 'relative' }}>
                  <div style={{ width: '100%', height: 480, borderRadius: 24, overflow: 'hidden', background: '#000', boxShadow: '0 8px 32px rgba(0,0,0,.15)', position: 'relative' }}>
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/${reel.id}?rel=0&modestbranding=1&controls=0`}
                      title={reel.title}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      style={{ border: 'none' }}
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Travel Stories Section */}
        {creator.stories.length > 0 && (
          <div style={{ marginTop: 64 }}>
            <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 800, color: isDark ? '#fff' : T.ink, fontFamily: 'Fraunces, serif', marginBottom: 24 }}>Travel Stories</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 20 }}>
              {/* Featured big card */}
              <div style={{ gridRow: isMobile ? 'auto' : 'span 2', position: 'relative', height: isMobile ? 300 : 520, borderRadius: 24, overflow: 'hidden' }}>
                <img src={creator.stories[0].img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,.8) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 24 }}>
                   <h3 style={{ color: '#fff', fontSize: 24, margin: '0 0 10px', fontWeight: 700 }}>{creator.stories[0].title}</h3>
                   <div style={{ color: 'rgba(255,255,255,.8)', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>READ STORY <Ico name="arrow-right" size={14} color="#fff"/></div>
                </div>
              </div>
              {/* Two small cards if exist */}
              {creator.stories.slice(1, 3).map(story => (
                <div key={story.id} style={{ position: 'relative', height: isMobile ? 240 : 250, borderRadius: 24, overflow: 'hidden' }}>
                    <img src={story.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,.7) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 18 }}>
                       <h3 style={{ color: '#fff', fontSize: 18, margin: 0, fontWeight: 700 }}>{story.title}</h3>
                    </div>
                </div>
              ))}
              {/* Extra placeholder card */}
              <div style={{ position: 'relative', height: isMobile ? 240 : 250, borderRadius: 24, overflow: 'hidden', background: isDark ? '#1a2e42' : '#fff', border: `1.5px dashed ${isDark ? '#2a3e52' : '#cbd5e1'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 48, fontWeight: 800, color: isDark ? '#fff' : T.ink, opacity: 0.1, marginBottom: 8 }}>4</div>
                    <div style={{ color: isDark ? '#fff' : T.ink, fontWeight: 700, fontSize: 14 }}>Postcards from Pondicherry</div>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* What Travelers Say */}
        {creator.reviews.length > 0 && (
          <div style={{ marginTop: 64 }}>
             <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 800, color: isDark ? '#fff' : T.ink, fontFamily: 'Fraunces, serif', marginBottom: 24 }}>What Travelers Say</h2>
             <div style={{ display: 'flex', gap: 16, overflowX: 'auto', padding: '10px 0 30px', margin: '0 -10px' }}>
                {creator.reviews.map(rev => (
                  <div key={rev.id} style={{ flex: '0 0 280px', background: isDark ? '#1a2e42' : '#fff', padding: 24, borderRadius: 24, boxShadow: '0 4px 20px rgba(0,0,0,.05)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
                       {[1,2,3,4,5].map(i => <Ico key={i} name="star" size={14} color={T.amber} fill={T.amber}/>)}
                    </div>
                    <div style={{ flex: 1, fontSize: 14, color: isDark ? 'rgba(255,255,255,.9)' : T.ink, fontStyle: 'italic', lineHeight: 1.6 }}>"{rev.text}"</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 20 }}>
                       <div style={{ width: 32, height: 32, borderRadius: '50%', background: T.greenLight, color: T.greenDeep, display: 'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800 }}>{rev.initials}</div>
                       <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: isDark ? '#fff' : T.ink }}>{rev.name}</div>
                          <div style={{ fontSize: 11, color: T.grey }}>{rev.trip}</div>
                       </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* Creator CTA */}
        <div style={{ marginTop: 64, background: isDark ? '#1a2e42' : T.ink, borderRadius: 32, padding: isMobile ? '48px 24px' : '80px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
           <div style={{ position: 'absolute', top: 20, left: 20, opacity: 0.1 }}><Ico name="plane" size={64} color="#fff"/></div>
           <div style={{ position: 'absolute', bottom: 20, right: 20, opacity: 0.1, transform: 'rotate(15deg)' }}><Ico name="pin" size={48} color="#fff"/></div>
           
           <h2 style={{ fontSize: isMobile ? 32 : 56, color: '#fff', margin: '0 0 16px', fontWeight: 800, fontFamily: 'Fraunces, serif', lineHeight: 1.1 }}>Turn your adventures into shared journeys.</h2>
           <div style={{ color: 'rgba(255,255,255,.7)', fontSize: 18, maxWidth: 640, margin: '0 auto 32px' }}>Join our curated community of expert travelers and start leading trips that inspire.</div>
           <Btn kind="primary" size="lg">Apply as creator</Btn>
           
           <div style={{ position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)', fontSize: 120, fontWeight: 900, color: '#fff', opacity: 0.03, pointerEvents: 'none', whiteSpace: 'nowrap' }}>ADVENTURE</div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ label, value, suffix = '', theme = 'light' }) {
  const isDark = theme === 'dark';
  return (
    <div style={{ flex: 1, minWidth: 100, background: isDark ? '#1a2e42' : '#fff', padding: '16px 20px', borderRadius: 16, border: isDark ? '1px solid rgba(255,255,255,0.05)' : 'none', boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.05)' }}>
      <div style={{ fontSize: 24, fontWeight: 800, color: isDark ? '#fff' : T.ink }}>{value}{suffix}</div>
      <div style={{ fontSize: 12, color: T.grey, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', marginTop: 4 }}>{label}</div>
    </div>
  );
}

const actionBtn = { background: 'transparent', border: 'none', cursor: 'pointer', padding: 6 };

Object.assign(window, { CreatorProfile });
