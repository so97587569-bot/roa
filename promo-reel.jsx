const NOIR = '#1d1b19', PAPER = '#f1ece4', INK = '#201f1d', GOLD = '#b68235', GOLD_L = '#d1a45f', MUTE = '#a69d91';
const SERIF = '"Cormorant Garamond","Noto Serif KR",serif';
const BODY = '"Lora","Noto Serif KR",serif';

const MOTION = {
  enter: (T, a, b, from, to) => animate({ from, to, start: a, end: b, ease: Easing.easeOutCubic })(T),
  draw: (T, a, b, from, to) => animate({ from, to, start: a, end: b, ease: Easing.easeInOutCubic })(T),
  pop: (T, a, b, from, to) => animate({ from, to, start: a, end: b, ease: Easing.easeOutBack })(T),
};
const { enter, draw, pop } = MOTION;
const fade = (T, inA, inB, outA, outB) => Math.min(enter(T, inA, inB, 0, 1), outA == null ? 1 : 1 - draw(T, outA, outB, 0, 1));

function Light({ T }) {
  const x = draw(T, 0, 15, -600, 900);
  return <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
    <div style={{ position: 'absolute', top: -300, left: x, width: 520, height: 1700, transform: 'rotate(24deg)',
      background: 'linear-gradient(90deg, rgba(241,236,228,0) 0%, rgba(241,236,228,0.06) 50%, rgba(241,236,228,0) 100%)' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)' }} />
  </div>;
}

function Wordmark({ T, C }) {
  const letters = 'ATELIER NOIR'.split('');
  const out = 1 - draw(T, C.Arch - 0.45, C.Arch + 0.1, 0, 1);
  const lift = draw(T, C.Arch - 0.45, C.Arch + 0.1, 0, -60);
  return <div style={{ position: 'absolute', left: 0, right: 0, top: 330, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 70, opacity: out, transform: `translateY(${lift}px)` }}>
    <div style={{ display: 'flex', fontFamily: SERIF, fontSize: 150, fontWeight: 400, color: PAPER, letterSpacing: '0.16em', lineHeight: 1 }}>
      {letters.map((ch, i) => {
        const a = 0.55 + i * 0.05;
        return <span key={i} style={{ display: 'inline-block', minWidth: ch === ' ' ? 50 : 0, opacity: enter(T, a, a + 0.6, 0, 1), transform: `translateY(${enter(T, a, a + 0.6, 50, 0)}px)` }}>{ch}</span>;
      })}
    </div>
    <div style={{ fontFamily: BODY, fontSize: 26, letterSpacing: '0.5em', color: GOLD_L, opacity: enter(T, 1.3, 1.9, 0, 1), transform: `translateY(${enter(T, 1.3, 1.9, 16, 0)}px)` }}>COFFEE · DESSERT · ARCHITECTURE</div>
  </div>;
}

// the one continuous element: gold hairline -> arch base -> first menu arch
function HeroArch({ T, C }) {
  const toArch = (a, b) => draw(T, C.Arch - 0.3, C.Arch + 0.4, a, b);
  const toMenu = (a, b) => draw(T, C.Menu - 0.2, C.Menu + 0.6, a, b);
  const lineW = draw(T, 0.15, 1.2, 0, 1100);
  let w = T < C.Arch - 0.3 ? lineW : toArch(1100, 640);
  let cx = toArch(960, 1300);
  let base = toArch(535, 960);
  let h = draw(T, C.Arch + 0.2, C.Arch + 1.1, 0, 820);
  if (T >= C.Menu - 0.2) { w = toMenu(640, 460); cx = toMenu(1300, 450); base = toMenu(960, 860); h = toMenu(820, 600); }
  const exit = draw(T, C.Taste - 0.3, C.Taste + 0.4, 0, 1);
  const r = w / 2;
  const imgA = 1 - draw(T, C.Menu + 0.2, C.Menu + 0.7, 0, 1);
  const kb = draw(T, C.Arch + 0.2, C.Menu + 0.2, 1.28, 1.04);
  const kb2 = draw(T, C.Menu + 0.2, C.Taste, 1.15, 1.0);
  return <div style={{ position: 'absolute', left: cx - w / 2 - exit * 260, top: base - h, width: w, height: h, opacity: 1 - exit }}>
    <div style={{ position: 'absolute', inset: 0, borderRadius: `${Math.min(r, h)}px ${Math.min(r, h)}px 0 0`, overflow: 'hidden', border: h > 2 ? `2px solid ${GOLD}` : 'none', borderBottom: 'none' }}>
      <img src="assets/menu-latte.png" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${kb2})` }} />
      <img src="assets/interior.png" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: imgA, transform: `scale(${kb})` }} />
    </div>
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 2, background: GOLD }} />
  </div>;
}

function ArchTagline({ T, C }) {
  const o1 = fade(T, C.Arch + 0.8, C.Arch + 1.4, C.Menu - 0.4, C.Menu + 0.1);
  const o2 = fade(T, C.Arch + 1.2, C.Arch + 1.8, C.Menu - 0.4, C.Menu + 0.1);
  const shift = draw(T, C.Menu - 0.4, C.Menu + 0.1, 0, -80);
  return <div style={{ position: 'absolute', left: 170, top: 330, display: 'flex', flexDirection: 'column', gap: 26, transform: `translateX(${shift}px)` }}>
    <div style={{ fontFamily: BODY, fontSize: 22, letterSpacing: '0.4em', color: GOLD_L, opacity: o1 }}>SPACE · LIGHT · ARCH</div>
    <div style={{ fontFamily: SERIF, fontSize: 92, color: PAPER, lineHeight: 1.15, opacity: o1, transform: `translateY(${enter(T, C.Arch + 0.8, C.Arch + 1.4, 30, 0)}px)` }}>취향을 공간으로,</div>
    <div style={{ fontFamily: SERIF, fontSize: 92, color: GOLD_L, fontStyle: 'italic', lineHeight: 1.15, opacity: o2, transform: `translateY(${enter(T, C.Arch + 1.2, C.Arch + 1.8, 30, 0)}px)` }}>순간을 작품으로.</div>
  </div>;
}

const MENU = [
  { name: '누아르 크림라떼', price: '7,000', img: null, cx: 450 },
  { name: '바스크 치즈케이크', price: '7,500', img: 'assets/menu-cheesecake.png', cx: 960 },
  { name: '다크 초콜릿 테린', price: '6,500', img: 'assets/menu-chocolate.png', cx: 1470 },
];
function MenuRow({ T, C }) {
  const exit = draw(T, C.Taste - 0.3, C.Taste + 0.4, 0, 1);
  return <div style={{ position: 'absolute', inset: 0, opacity: 1 - exit, transform: `translateX(${-exit * 260}px)` }}>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 110, textAlign: 'center', fontFamily: BODY, fontSize: 24, letterSpacing: '0.5em', color: GOLD_L, opacity: enter(T, C.Menu + 0.5, C.Menu + 1.1, 0, 1) }}>SIGNATURE MENU</div>
    {MENU.map((m, i) => {
      const a = C.Menu + 0.5 + i * 0.25;
      const h = i === 0 ? 0 : draw(T, a, a + 0.7, 0, 600);
      const la = C.Menu + 1.1 + i * 0.25;
      return <React.Fragment key={i}>
        {m.img && <div style={{ position: 'absolute', left: m.cx - 230, top: 860 - h, width: 460, height: h, borderRadius: `${Math.min(230, h)}px ${Math.min(230, h)}px 0 0`, overflow: 'hidden', border: h > 2 ? `2px solid ${GOLD}` : 'none', borderBottom: `2px solid ${GOLD}` }}>
          <img src={m.img} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${draw(T, a, C.Taste, 1.2, 1.02)})` }} />
        </div>}
        <div style={{ position: 'absolute', left: m.cx - 260, width: 520, top: 890, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: enter(T, la, la + 0.5, 0, 1), transform: `translateY(${enter(T, la, la + 0.5, 20, 0)}px)` }}>
          <div style={{ fontFamily: SERIF, fontSize: 46, color: PAPER }}>{m.name}</div>
          <div style={{ fontFamily: BODY, fontSize: 26, color: GOLD_L, fontFeatureSettings: '"tnum"' }}>{m.price}원</div>
        </div>
      </React.Fragment>;
    })}
  </div>;
}

const COFFEE = ['산미 있는 커피', '고소한 커피', '부드러운 크림', '달콤한 커피'];
const DESSERT = ['꾸덕한 디저트', '부드러운 디저트', '달콤한 디저트', '담백한 디저트'];
function Option({ label, check }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', border: `1.5px solid ${check > 0.5 ? GOLD : '#d6cfc4'}`, borderRadius: 4, fontFamily: BODY, fontSize: 24, color: INK }}>
    <div style={{ width: 22, height: 22, border: '1.5px solid #7d766d', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 3, background: GOLD, transform: `scale(${check})` }} />
    </div>{label}
  </div>;
}
function TasteCard({ T, C }) {
  const inT = (a, b) => pop(T, C.Taste + 0.1, C.Taste + 0.9, a, b);
  const out = draw(T, C.Close - 0.3, C.Close + 0.3, 0, 1);
  const c1 = pop(T, C.Taste + 1.1, C.Taste + 1.4, 0, 1);
  const c2 = pop(T, C.Taste + 1.5, C.Taste + 1.8, 0, 1);
  const res = enter(T, C.Taste + 1.9, C.Taste + 2.4, 0, 1);
  return <div style={{ position: 'absolute', left: 1060, top: 130, width: 680, padding: 44, background: PAPER, display: 'flex', flexDirection: 'column', gap: 26,
    opacity: Math.min(enter(T, C.Taste + 0.1, C.Taste + 0.5, 0, 1), 1 - out),
    transform: `translateY(${inT(160, 0)}px) rotate(${inT(7, -1.5)}deg) scale(${1 - out * 0.12})`, boxShadow: '0 30px 80px rgba(0,0,0,0.45)' }}>
    <div style={{ textAlign: 'center', borderBottom: '1px solid #d6cfc4', paddingBottom: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontFamily: BODY, fontSize: 16, letterSpacing: '0.4em', color: '#6c655d' }}>ATELIER NOIR</div>
      <div style={{ fontFamily: SERIF, fontSize: 48, letterSpacing: '0.14em', color: INK }}>TASTE CARD</div>
    </div>
    <div style={{ fontFamily: BODY, fontSize: 17, letterSpacing: '0.25em', color: '#8a5f22' }}>COFFEE</div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: -12 }}>
      {COFFEE.map((l, i) => <Option key={l} label={l} check={i === 2 ? c1 : 0} />)}
    </div>
    <div style={{ fontFamily: BODY, fontSize: 17, letterSpacing: '0.25em', color: '#8a5f22' }}>DESSERT</div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: -12 }}>
      {DESSERT.map((l, i) => <Option key={l} label={l} check={i === 1 ? c2 : 0} />)}
    </div>
    <div style={{ borderTop: '1px solid #d6cfc4', paddingTop: 20, opacity: res, transform: `translateY(${enter(T, C.Taste + 1.9, C.Taste + 2.4, 14, 0)}px)`, fontFamily: SERIF, fontSize: 40, color: INK, textAlign: 'center' }}>
      누아르 크림라떼 <span style={{ color: GOLD }}>×</span> 바스크 치즈케이크
    </div>
  </div>;
}
function TasteCopy({ T, C }) {
  const out = draw(T, C.Close - 0.3, C.Close + 0.2, 0, 1);
  const o = (a) => Math.min(enter(T, a, a + 0.6, 0, 1), 1 - out);
  return <div style={{ position: 'absolute', left: 170, top: 380, display: 'flex', flexDirection: 'column', gap: 24 }}>
    <div style={{ fontFamily: BODY, fontSize: 22, letterSpacing: '0.4em', color: GOLD_L, opacity: o(C.Taste + 0.4) }}>MY TASTE PAIRING</div>
    <div style={{ fontFamily: SERIF, fontSize: 84, color: PAPER, lineHeight: 1.15, opacity: o(C.Taste + 0.5), transform: `translateY(${enter(T, C.Taste + 0.5, C.Taste + 1.1, 30, 0)}px)` }}>당신의 취향을</div>
    <div style={{ fontFamily: SERIF, fontSize: 84, color: GOLD_L, fontStyle: 'italic', lineHeight: 1.15, opacity: o(C.Taste + 0.8), transform: `translateY(${enter(T, C.Taste + 0.8, C.Taste + 1.4, 30, 0)}px)` }}>한 잔의 작품으로.</div>
  </div>;
}

function Close({ T, C }) {
  const line = draw(T, C.Close + 0.1, C.Close + 0.9, 0, 900);
  const letters = 'ATELIER NOIR'.split('');
  return <div style={{ position: 'absolute', inset: 0 }}>
    <div style={{ position: 'absolute', left: 960 - line / 2, top: 560, width: line, height: 2, background: GOLD }} />
    <div style={{ position: 'absolute', left: 0, right: 0, top: 390, display: 'flex', justifyContent: 'center', fontFamily: SERIF, fontSize: 130, color: PAPER, letterSpacing: '0.16em', lineHeight: 1 }}>
      {letters.map((ch, i) => {
        const a = C.Close + 0.4 + i * 0.04;
        return <span key={i} style={{ display: 'inline-block', minWidth: ch === ' ' ? 44 : 0, opacity: enter(T, a, a + 0.5, 0, 1), transform: `translateY(${enter(T, a, a + 0.5, 40, 0)}px)` }}>{ch}</span>;
      })}
    </div>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 610, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, opacity: enter(T, C.Close + 0.9, C.Close + 1.4, 0, 1), transform: `translateY(${enter(T, C.Close + 0.9, C.Close + 1.4, 16, 0)}px)` }}>
      <div style={{ fontFamily: SERIF, fontSize: 44, color: GOLD_L, fontStyle: 'italic' }}>Grand Open 2026 · Seoul</div>
      <div style={{ fontFamily: BODY, fontSize: 22, letterSpacing: '0.5em', color: MUTE }}>COFFEE · DESSERT · ARCHITECTURE</div>
    </div>
  </div>;
}

function Piece() {
  const { T, CUES: C, authoredTotal } = useComposition();
  const end = authoredTotal || 15;
  const cam = T < C.Menu ? draw(T, C.Arch, C.Menu, 1, 1.05)
    : T < C.Taste ? draw(T, C.Menu, C.Menu + 0.6, 1.05, 1) + draw(T, C.Menu + 1.6, C.Taste, 0, 0.07)
    : T < C.Close ? draw(T, C.Taste - 0, C.Taste + 0.6, 1.07, 1) + draw(T, C.Taste + 0.8, C.Close, 0, 0.05)
    : draw(T, C.Close, end, 1.05, 1.0);
  const ox = T >= C.Taste && T < C.Close ? '70%' : '50%';
  const master = 1 - draw(T, end - 0.6, end, 0, 1);
  return <div style={{ position: 'absolute', inset: 0, background: NOIR, overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, transform: `scale(${cam})`, transformOrigin: `${ox} 50%`, opacity: master }}>
      <Wordmark T={T} C={C} />
      <ArchTagline T={T} C={C} />
      <MenuRow T={T} C={C} />
      <HeroArch T={T} C={C} />
      <TasteCopy T={T} C={C} />
      <TasteCard T={T} C={C} />
      <Shot from={C.Close - 0.3} to={end + 1}><Close T={T} C={C} /></Shot>
    </div>
    <Light T={T} />
  </div>;
}

function PromoReel() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS || { motionEditor: true });
  return <div style={{ position: 'absolute', inset: 0 }}>
    <CompositionStage width={1920} height={1080} bg={NOIR} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK}>
      <Piece />
    </CompositionStage>
    <TweaksPanel>
      <TweakSection label="Video" />
      <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
    </TweaksPanel>
  </div>;
}
window.PromoReel = PromoReel;
