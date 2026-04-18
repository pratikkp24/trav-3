// Travelogue Article — lower sections (gallery, taste memories, notes, related, CTA).

function TravelogueLowerStyle() {
  return (
    <style dangerouslySetInnerHTML={{__html: `
.mosaic { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; grid-auto-rows: 160px; max-width: 1192px; margin: 0 auto; padding: 0 36px; }
.tile { border-radius: 12px; overflow: hidden; position: relative; box-shadow: var(--shadow-1); cursor: pointer; }
.tile .ph { position: absolute; inset: 0; }
.tile .lbl { position: absolute; left: 12px; bottom: 10px; color: #fff; font-size: 12px; font-weight: 600; letter-spacing: 0.02em; text-shadow: 0 1px 4px rgba(0,0,0,0.6); }
.tile.big { grid-row: span 2; }
.tile.wide { grid-column: span 2; }

.taste-split { display:grid; grid-template-columns: 1.1fr 0.9fr; gap: 24px; max-width: 1192px; margin: 0 auto; padding: 0 36px; }
.memo-tactile {
  position: relative; padding: 44px 42px 52px; background: linear-gradient(#fbfdfb, #f3faf6);
  border: 1px solid var(--line); border-radius: var(--radius);
  box-shadow: 0 1px 0 rgba(0,0,0,0.02), 0 30px 60px -36px rgba(17,17,17,0.22), 0 10px 20px -10px rgba(17,17,17,0.1);
  transform: rotate(-0.5deg); overflow: hidden;
}
.memo-tactile::before { content:""; position: absolute; inset: 92px 0 24px 0; background-image: repeating-linear-gradient(to bottom, transparent 0 31px, rgba(29,191,115,0.22) 31px 32px); pointer-events: none; }
.memo-tactile::after { content:""; position: absolute; top: 0; bottom: 0; left: 72px; width: 1px; background: rgba(233, 80, 80, 0.45); }
.memo-tactile .holes { position: absolute; left: 16px; top: 30px; display: flex; flex-direction: column; gap: 80px; }
.memo-tactile .holes span { width: 12px; height: 12px; border-radius: 50%; background: var(--off); box-shadow: inset 0 1px 2px rgba(0,0,0,0.2); }
.memo-tactile .doodle { position: absolute; right: 24px; top: 30px; font-family: "Caveat", cursive; font-size: 15px; color: var(--green-deep); transform: rotate(4deg); border: 1px dashed var(--green); padding: 5px 10px; border-radius: 4px; background: var(--tint); }
.memo-tactile h3 { font-family: "Caveat", cursive; font-weight: 700; font-size: 38px; color: var(--ink); margin: 0 0 2px; transform: rotate(-1deg); padding-left: 40px; }
.memo-tactile .sub { font-family: "Caveat", cursive; font-size: 19px; color: var(--grey); margin-bottom: 20px; padding-left: 40px; transform: rotate(-0.5deg); }
.memo-tactile ol { list-style: none; padding: 0 0 0 40px; margin: 0; position: relative; font-family: "Kalam", "Caveat", cursive; font-weight: 400; color: var(--ink-2); font-size: 19px; line-height: 32px; }
.memo-tactile ol li { display: grid; grid-template-columns: 22px 22px 1fr auto; gap: 10px; align-items: baseline; padding: 0; margin-bottom: 0; }
.memo-tactile ol li .n { font-family: "Caveat", cursive; font-weight: 700; color: var(--green-deep); font-size: 22px; }
.memo-tactile ol li .emo { font-size: 17px; line-height: 1; }
.memo-tactile ol li .what em { font-style: italic; color: var(--grey); }
.memo-tactile ol li .where { color: var(--green-deep); font-size: 15px; font-family: "Caveat", cursive; }
.memo-tactile ol li.done .what { text-decoration: line-through; text-decoration-color: rgba(29,191,115,0.7); color: var(--grey); }
.memo-tactile .scribble { font-family: "Caveat", cursive; font-weight: 600; font-size: 20px; color: var(--green-deep); margin: 26px 0 0 40px; display: flex; align-items: center; gap: 10px; transform: rotate(-0.8deg); }
.memo-tactile .pencil-mark { position: absolute; right: 40px; bottom: 26px; width: 90px; height: 4px; border-radius: 2px; background: linear-gradient(90deg, transparent, rgba(17,17,17,0.35), transparent); transform: rotate(-8deg); filter: blur(0.3px); }

.taste-list { background: #fff; border: 1px solid var(--line); border-radius: var(--radius); padding: 20px 24px; box-shadow: var(--shadow-1); }
.taste-list .head { display:flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
.taste-list .head h4 { font-family:"Fraunces",serif; font-size: 18px; margin: 0; font-weight: 600; }
.taste-list .head .lead { font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--grey); font-weight: 600; }
.taste-list .entry { display: grid; grid-template-columns: 44px 1fr auto; gap: 14px; align-items: center; padding: 14px 4px; border-bottom: 1px solid var(--line-2); }
.taste-list .entry:last-child { border-bottom: none; }
.taste-list .entry .glyph { width: 42px; height: 42px; border-radius: 12px; background: var(--tint); display:grid; place-items:center; font-size: 19px; }
.taste-list .entry .name { font-family:"Fraunces",serif; font-weight: 600; font-size: 16px; }
.taste-list .entry .name small { display:block; font-family:"Inter",sans-serif; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--grey); margin-top: 2px; font-weight: 500; }
.taste-list .entry .dish { font-family: "Fraunces", serif; font-style: italic; font-size: 13px; color: var(--grey); text-align: right; }
.taste-list .entry .dish small { display:block; font-style: normal; font-family:"Inter",sans-serif; font-size: 10px; color: var(--green-deep); letter-spacing: 0.08em; font-weight: 600; }


.corkboard { position: relative; padding: 44px 32px 70px; min-height: 560px; border-radius: var(--radius); background: radial-gradient(ellipse at top left, rgba(255,255,255,0.18), transparent 55%), url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.5  0 0 0 0 0.38  0 0 0 0 0.2  0 0 0 0.3 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>"), linear-gradient(135deg, #c9a776, #a87c45); box-shadow: inset 0 0 60px rgba(0,0,0,0.22), 0 26px 50px -26px rgba(60,40,10,0.45); border: 1px solid rgba(0,0,0,0.12); max-width: 1192px; margin: 0 auto; padding: 0 36px; }
.corkboard .ticket { position: absolute; top: 22px; right: 30px; padding: 10px 14px; background: var(--tint); color: var(--green-deep); font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.22em; font-weight: 600; transform: rotate(4deg); box-shadow: 0 8px 16px -6px rgba(0,0,0,0.3); border: 1px dashed var(--green); border-radius: 3px; }
.sticky { position: absolute; width: 210px; min-height: 200px; padding: 24px 20px 22px; font-family: "Kalam", "Caveat", cursive; color: #1a1a1a; box-shadow: 0 2px 0 rgba(0,0,0,0.04), 0 18px 30px -14px rgba(30,20,0,0.38), 0 4px 8px -2px rgba(30,20,0,0.2); line-height: 1.4; border-radius: 2px; }
.sticky h4 { font-family: "Caveat", cursive; font-weight: 700; font-size: 24px; margin: 12px 0 8px; color: #1a1a1a; }
.sticky p { font-family: "Kalam", cursive; font-weight: 300; font-size: 14px; line-height: 1.5; margin: 0; color: #2a2a2a; }
.sticky .pin { position: absolute; top: -8px; left: 50%; transform: translateX(-50%); width: 18px; height: 18px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #4be3a0, var(--green-deep) 80%); box-shadow: 0 3px 6px rgba(0,0,0,0.35), inset -2px -2px 4px rgba(0,0,0,0.25); z-index: 2; }
.sticky .kicker { font-family: "Inter", sans-serif; font-size: 9px; letter-spacing: 0.24em; font-weight: 700; text-transform: uppercase; color: rgba(0,0,0,0.5); }
.s-yellow { background: #f6e27a; } .s-peach  { background: #f6c9a4; } .s-mint   { background: #c6ecd4; } .s-pink   { background: #f4b7c0; } .s-blue   { background: #bcd7ee; }
.n1 { top: 30px; left: 28px;  transform: rotate(-4deg); } .n2 { top: 48px; left: 258px; transform: rotate(3deg); } .n3 { top: 280px; left: 58px; transform: rotate(2.5deg); } .n4 { top: 260px; left: 290px; transform: rotate(-3deg); }
.board-polaroid { position: absolute; top: 170px; right: 28px; width: 180px; padding: 12px 12px 38px; background: #fff; transform: rotate(5deg); box-shadow: 0 14px 28px -10px rgba(0,0,0,0.45); border-radius: 3px; }
.board-polaroid .ph { aspect-ratio: 1/1; background: linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.4)), repeating-linear-gradient(45deg, #3d6b3a 0 10px, #4e7f48 10px 20px); position: relative; border-radius: 2px; }
.board-polaroid .ph::after { content:"GOA · 2025"; position: absolute; left: 8px; bottom: 8px; font-family: "JetBrains Mono", monospace; font-size: 9px; letter-spacing: 0.2em; color: rgba(255,255,255,0.85); }
.board-polaroid .cap { font-family: "Caveat", cursive; font-size: 17px; color: #1a1a1a; text-align: center; margin-top: 8px; transform: rotate(-1deg); }
.board-polaroid .pin { position: absolute; top: -8px; left: 50%; transform: translateX(-50%); width: 16px; height: 16px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #ff9999, #b02020 80%); box-shadow: 0 3px 6px rgba(0,0,0,0.35), inset -2px -2px 4px rgba(0,0,0,0.25); }

.related-head { display:flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; max-width: 1192px; margin: 0 auto; padding: 0 36px; }
.related-head h2 { font-family:"Fraunces",serif; font-size: 36px; margin: 0 0 4px; letter-spacing: -0.02em; font-weight: 600; }
.related-head p { margin: 0; color: var(--grey); }
.related-head a { color: var(--green); font-weight: 600; text-decoration: none; font-size: 14px; cursor: pointer; }
.related-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 1192px; margin: 0 auto; padding: 0 36px; }
.itin { background: #fff; border: 1px solid var(--line); border-radius: var(--radius); overflow: hidden; transition: 0.2s; cursor:pointer;}
.itin:hover { border-color: var(--green); box-shadow: var(--shadow-2); }
.itin .cover { position: relative; aspect-ratio: 16/10; overflow: hidden; }
.itin .cover .ph { position: absolute; inset: 0; }
.itin .tag { position: absolute; top: 14px; left: 14px; background: rgba(17,17,17,0.8); color: #fff; padding: 6px 12px; border-radius: 999px; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; }
.itin .body { padding: 16px 18px 20px; }
.itin .when { font-size: 12px; color: var(--grey); letter-spacing: 0.04em; }
.itin h4 { font-family:"Fraunces",serif; font-size: 17px; font-weight: 600; margin: 8px 0 6px; }
.itin h4 span { color: var(--grey); font-weight: 400; }
.itin .price { display:flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid var(--line-2); margin-top: 12px; }
.itin .price b { font-family:"Fraunces",serif; font-size: 18px; font-weight: 700; }
.itin .price a { color: var(--green); font-weight: 600; font-size: 13px; text-decoration: none; }

.cta { background: linear-gradient(135deg, #0f2a1c 0%, #1a3d28 100%); color: #fff; border-radius: var(--radius); display:grid; grid-template-columns: 1fr 1.1fr; gap: 0; overflow: hidden; box-shadow: var(--shadow-2); max-width: 1192px; margin: 0 auto; padding: 0 36px; }
.cta .imagery { position: relative; min-height: 280px; background: linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), repeating-linear-gradient(45deg, #2a1a0a 0 14px, #3a2a1a 14px 28px); }
.cta .imagery::after { content:""; position: absolute; inset: 0; background: radial-gradient(ellipse at 30% 70%, rgba(255,120,60,0.45), transparent 60%); }
.cta .copy { padding: 44px; }
.cta .copy h3 { font-family:"Fraunces",serif; font-weight: 500; font-size: 36px; line-height: 1.1; letter-spacing: -0.02em; margin: 0 0 14px; }
.cta .copy h3 em { font-style: italic; color: var(--green); }
.cta .copy p { color: rgba(255,255,255,0.75); margin: 0 0 22px; max-width: 44ch; }
.cta .copy .quote { margin-top: 24px; padding: 16px 18px; background: rgba(255,255,255,0.06); border-left: 2px solid var(--green); border-radius: 10px; }
.cta .copy .quote i { font-family:"Fraunces",serif; font-style: italic; font-size: 14px; color: rgba(255,255,255,0.9); }
.cta .copy .quote small { display:block; margin-top: 6px; color: var(--grey-2); font-size: 12px; }
`}} />
  );
}

function ChapterDividerLower({ num, roman, title, metaL, metaR }) {
  return (
    <div className="chapter">
      <div className="num"><span>Chapter {num}</span>{roman}</div>
      <div className="title" dangerouslySetInnerHTML={{__html: title}}></div>
      <div className="meta">{metaL}<b>{metaR}</b></div>
    </div>
  );
}

function TravelogueLowerSections({ article, onOpenTrip }) {
  return (
    <>
      <TravelogueLowerStyle/>
      <ChapterDividerLower num="04" roman="IV" title="<em>Captured</em> Moments<small>Eleven photographs, one afternoon, and a borrowed scooter.</small>" metaL="Gallery" metaR="11 photos"/>
      <CapturedMoments photos={article.gallery}/>
      
      <ChapterDividerLower num="05" roman="V" title="<em>Taste</em> Memories<small>Small plates, long evenings, one short list.</small>" metaL="Picks" metaR="07 places"/>
      <TasteMemories items={article.taste}/>
      
      <ChapterDividerLower num="06" roman="VI" title="Notes for <em>Future</em> Travelers<small>Four short things I wish someone had told me first.</small>" metaL="Pinned" metaR="04 notes"/>
      <NotesForTravelers notes={article.notes}/>
      
      <ChapterDividerLower num="07" roman="VII" title="<em>Related</em> Itineraries<small>Like what you read? These trips let you live it.</small>" metaL="Curated" metaR="03 trips"/>
      <RelatedItineraries tripIds={article.relatedTripIds} onOpenTrip={onOpenTrip}/>
      
      <section style={{padding: '72px 0'}}>
        <InspireCTA/>
      </section>
    </>
  );
}

function CapturedMoments({ photos }) {
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
}

function TasteMemories({ items }) {
  return (
    <section className="taste-split">
      <div className="memo-tactile">
        <div className="holes"><span></span><span></span><span></span><span></span></div>
        <div className="doodle">→ keep this one</div>
        <h3>where to eat in Goa</h3>
        <div className="sub">(from the notes app, copied over)</div>
        <ol>
          {items.map((t, i) => (
             <li className={i < 2 ? "done" : ""} key={i}>
               <span className="n">{i+1}.</span>
               <span className="emo">{['🥟','🍛','🦐','🥐','🍸','🌴','☕'][i%7]}</span>
               <span className="what">{t.name} — <em>{t.rec || t.loc}</em></span>
               <span className="where">{t.loc}</span>
             </li>
          ))}
        </ol>
        <div className="scribble">the best places you can actually go to.</div>
        <div className="pencil-mark"></div>
      </div>

      <div className="taste-list">
        <div className="head"><h4>At a glance</h4><div className="lead">— By neighbourhood —</div></div>
        {items.slice(0, 5).map((t, i) => (
          <div className="entry" key={i}>
            <div className="glyph">{['🥟','🍛','🦐','🍸','☕'][i%5]}</div>
            <div className="name">{t.name}<small>{t.loc}</small></div>
            <div className="dish">{t.rec || t.loc}<small>₹ {i===2?'₹ ₹':''}</small></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function NotesForTravelers({ notes }) {
  const classes = ["s-blue n1", "s-peach n2", "s-mint n3", "s-pink n4"];
  return (
    <section>
      <div className="corkboard">
        <div className="ticket">GOA · 2025 · 011</div>
        {notes.map((n, i) => (
          <div className={`sticky ${classes[i%classes.length]}`} key={i}>
            <div className="pin" style={i===1 ? {background:'radial-gradient(circle at 35% 35%,#ffd070,#a8761a 80%)'} : i===3 ? {background:'radial-gradient(circle at 35% 35%,#ff9bbd,#a32555 80%)'} : {}}></div>
            <div className="kicker">No. 0{i+1} · {n.title}</div>
            <h4>{n.title}</h4>
            <p>{n.body}</p>
          </div>
        ))}
        <div className="board-polaroid">
          <div className="pin"></div>
          <div className="ph"></div>
          <div className="cap">the scooter, day 3</div>
        </div>
      </div>
    </section>
  );
}

function RelatedItineraries({ tripIds, onOpenTrip }) {
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
}

function InspireCTA() {
  return (
    <div className="cta">
      <div className="imagery"></div>
      <div className="copy">
        <h3>Your journey could <em>inspire thousands</em>.</h3>
        <p>Share your travel story with us. If selected, we'll publish it on the travelogue for the world to read — and tag you forever.</p>
        <div className="actions" style={{display:'flex', gap: 10}}>
          <a className="btn primary">✎ Share my story</a>
          <a className="btn ghost" style={{background:'transparent', color:'#fff', borderColor:'rgba(255,255,255,0.25)'}}>See how it works →</a>
        </div>
        <div className="quote">
          <i>"I shared my trekking story and it got featured — hundreds of travelers reached out since."</i>
          <small>— Ananya, Trav Creator</small>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TravelogueLowerSections });
