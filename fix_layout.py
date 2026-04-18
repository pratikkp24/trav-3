import re

# 1. FIX TRAVELOGUE-ARTICLE.JSX
with open('project/src/travelogue-article.jsx', 'r') as f:
    text = f.read()

# Fix CSS for padding and max-widths
text = text.replace('max-width: 1240px; margin: 0 auto;', 'max-width: 1192px; margin: 0 auto; padding: 0 36px;')
text = text.replace('''
.chapter {
  display: grid;
  grid-template-columns: 140px 1fr auto;
  gap: 32px; align-items: center;
  padding: 22px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  margin: 40px 0 56px;
}'''.strip(), '''
.chapter {
  display: grid;
  grid-template-columns: 140px 1fr auto;
  gap: 32px; align-items: center;
  padding: 22px 36px;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  margin: 0px auto 44px;
  max-width: 1192px;
}
'''.strip())

# Remove .clip.c... backgrounds from CSS as we will inline them
text = re.sub(r'\.clip\.c\d \.thumb \{[^}]+\}\n', '', text)

# Rewrite TrendingVideosNew to use images and remove trend-head
new_tv = """function TrendingVideosNew({ videos }) {
  return (
    <section>
      <div className="clips">
        {videos.map((v, i) => (
          <div className="clip" key={i} onClick={() => alert('Playing clip...')}>
            <div className="thumb" style={{
                backgroundImage: v.src ? `linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url('${v.src}')` : 'linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.5)), repeating-linear-gradient(135deg, #4c5560 0 12px, #5a6572 12px 24px)'
            }}></div>
            <div className="overlay">
              <div className="creator"><div className="av"></div><div className="who"><b>{v.title}</b><small>{v.handle}</small></div></div>
              <div className="time">0:42</div>
            </div>
            <div className="play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l14 8-14 8z"/></svg></div>
          </div>
        ))}
      </div>
    </section>
  );
}"""
text = re.sub(r'function TrendingVideosNew\(\{ videos \}\) \{.*?\n\}(?=\nObject\.assign)', new_tv + '\n', text, flags=re.DOTALL)

# Add sample images to Hero Polaroids
new_hero = """function ArticleHero({ article }) {
  const [leftTitle, rightTitle] = article.title.split('—');
  const photos = article.gallery || [];
  return (
    <>
    <TravelogueNewStyle />
    <section className="hero">
      <div className="hero-polaroids">
        <div className="polaroid p1">
          <div className="ph" style={{backgroundImage: photos[0] ? `url(${photos[0].src})` : '', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
          <div className="cap">{photos[0] ? photos[0].label : 'palm hour'}</div>
        </div>
        <div className="polaroid p2">
          <div className="ph" style={{backgroundImage: photos[1] ? `url(${photos[1].src})` : '', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
          <div className="cap">{photos[1] ? photos[1].label : 'sunrise run'}</div>
        </div>
        <div className="polaroid p3">
          <div className="ph" style={{backgroundImage: photos[2] ? `url(${photos[2].src})` : '', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
          <div className="cap">{photos[2] ? photos[2].label : 'cliff picnic'}</div>
        </div>
      </div>
      <div className="hero-copy">
        <div>
          <span className="kicker">{article.category}</span>
          <span className="date">{article.date}</span>
        </div>
        <h1>{leftTitle} {rightTitle ? <>— <em>{rightTitle.trim()}</em></> : ''}</h1>
        <p className="deck">{article.dek}</p>
        <div className="actions">
          <a className="btn primary" onClick={() => alert('Starting journey!')}>▶ Start the journey</a>
          <a className="btn ghost" onClick={() => alert('Share dialog opening...')}>↗ Share article</a>
        </div>
        <div className="hero-stats">
          <div><small>Issue</small><b>{article.date.split(' ')[0]} · {article.date.split(' ')[2]||'2025'}</b></div>
          <div><small>Read</small><b>4 min</b></div>
          <div><small>Photos</small><b>{photos.length}</b></div>
          <div><small>Dateline</small><b>Goa · IN</b></div>
        </div>
      </div>
    </section>
    </>
  );
}"""
text = re.sub(r'function ArticleHero.*?\n\}(?=\n\nfunction ChapterDivider)', new_hero, text, flags=re.DOTALL)

with open('project/src/travelogue-article.jsx', 'w') as f:
    f.write(text)


# 2. FIX TRAVELOGUE-ARTICLE-LOWER.JSX
with open('project/src/travelogue-article-lower.jsx', 'r') as f:
    text = f.read()

# Fix CSS max-width and margins
text = text.replace('max-width: 1240px; margin: 0 auto;', 'max-width: 1192px; margin: 0 auto; padding: 0 36px;')
text = text.replace('''
.chapter {
  display: grid;
  grid-template-columns: 140px 1fr auto;
  gap: 32px; align-items: center;
  padding: 22px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  margin: 40px 0 56px;
}'''.strip(), '''
.chapter {
  display: grid;
  grid-template-columns: 140px 1fr auto;
  gap: 32px; align-items: center;
  padding: 22px 36px;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  margin: 0 auto 44px;
  max-width: 1192px;
}
'''.strip())

# Remove .ph-a ... .ph-h backgrounds from CSS
text = re.sub(r'\.ph-[a-h] \{[^}]+\}\n', '', text)
text = re.sub(r'\.itin\.i\d \.ph \{[^}]+\}\n', '', text)

# Rewrite CapturedMoments to use images
new_cm = """function CapturedMoments({ photos }) {
  return (
    <section>
      <div className="mosaic">
        {photos.map((p, i) => {
          let extraClass = '';
          if (i === 0) extraClass = 'big';
          if (i === 5) extraClass = 'wide';
          return (
            <div className={`tile ${extraClass}`} key={i} onClick={() => alert('Image Lightbox preview coming soon!')}>
              <div className="ph" style={{
                  backgroundImage: p.src ? `linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.45)), url(${p.src})` : '',
                  backgroundSize: 'cover', backgroundPosition: 'center'
              }}></div>
              <div className="lbl">{p.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}"""
text = re.sub(r'function CapturedMoments.*?\n\}(?=\n\nfunction TasteMemories)', new_cm, text, flags=re.DOTALL)

# Rewrite RelatedItineraries to use images
new_ri = """function RelatedItineraries({ tripIds, onOpenTrip }) {
  const trips = tripIds.map(id => WEEKEND_TRIPS.find(t=>t.id===id)).filter(Boolean);
  return (
    <section>
      <div className="related-head">
        <div></div>
        <a onClick={() => window.scrollTo(0,0)}>See all itineraries →</a>
      </div>
      <div className="related-grid">
        {trips.map((t, i) => (
          <article className="itin" onClick={() => onOpenTrip && onOpenTrip(t.id)} key={t.id}>
            <div className="cover">
              <div className="ph" style={{
                  backgroundImage: t.image ? `linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.55)), url(${t.image})` : '',
                  backgroundSize: 'cover', backgroundPosition: 'center'
              }}></div>
              <div className="tag">{t.dest}</div>
            </div>
            <div className="body">
              <div className="when">{t.dates}</div>
              <h4>Weekend <span>· {t.creator}</span></h4>
              <div className="price"><b>₹{t.price.toLocaleString('en-IN')}</b><a>View →</a></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}"""
text = re.sub(r'function RelatedItineraries.*?\n\}(?=\n\nfunction InspireCTA)', new_ri, text, flags=re.DOTALL)

with open('project/src/travelogue-article-lower.jsx', 'w') as f:
    f.write(text)
