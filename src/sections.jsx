/* Tesla — page sections */
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, Card, Badge, Tabs, Slider, SectionHeading, Icon } from './ui'
import { Logo, KeyHint, Sparkline, AreaChart, Candlestick, MarketTicker } from './composites'

/* ── useReveal — scroll-triggered entrance animation ─ */
function useReveal(threshold = 0.12) {
  const ref = React.useRef(null)
  const [visible, setVisible] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ── NavBar ───────────────────────────────────────── */
export function NavBar({ onCmdK, onAuthOpen }) {
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const location = useLocation()
  const links = [
    { label: 'Platform',     href: '/platform'     },
    { label: 'Markets',      href: '/markets'       },
    { label: 'Pricing',      href: '/pricing'       },
    { label: 'Compare',      href: '/compare'       },
    { label: 'How it works', href: '/how-it-works'  },
  ]

  const closeMenu = () => setMobileOpen(false)

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'oklch(0.14 0.008 145 / 0.82)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      transition: 'background 220ms ease, border-color 220ms ease',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <Link to="/" aria-label="Tesla home" style={{ display: 'inline-flex' }}>
          <Logo />
        </Link>

        <nav aria-label="Primary" className="nav-desktop">
          {links.map((l) => {
            const active = location.pathname === l.href
            return (
              <Link key={l.label} to={l.href}
                style={{
                  fontSize: 13, padding: '8px 12px', borderRadius: 8, display: 'inline-block',
                  color: active ? 'var(--text)' : 'var(--text-2)',
                  background: active ? 'var(--surface)' : 'transparent',
                  transition: 'color 180ms ease, background 180ms ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'var(--surface)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = active ? 'var(--text)' : 'var(--text-2)'; e.currentTarget.style.background = active ? 'var(--surface)' : 'transparent'; }}
              >{l.label}</Link>
            )
          })}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={onCmdK}
            aria-label="Open command palette"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '0 10px 0 12px', height: 34,
              background: 'var(--surface)', border: '1px solid var(--line)',
              borderRadius: 10, color: 'var(--text-3)', fontSize: 12,
              transition: 'border-color 200ms ease, color 200ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--line-2)'; e.currentTarget.style.color = 'var(--text-2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--text-3)'; }}
          >
            <Icon.search size={13} />
            <span className="cmdk-text">Search…</span>
            <KeyHint keys={['⌘', 'K']} />
          </button>
          <div className="nav-auth-desktop">
            <button
              onClick={() => onAuthOpen('login')}
              style={{
                fontSize: 13, color: 'var(--text-2)', padding: '8px 12px',
                borderRadius: 8, transition: 'color 180ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-2)')}
            >Sign in</button>
            <Button size="sm" onClick={() => onAuthOpen('signup')} iconRight={<Icon.arrow size={13} />}>
              Open account
            </Button>
          </div>
          <button
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen((v) => !v)}
            style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'var(--surface)', border: '1px solid var(--line)',
              alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)',
            }}
          >{mobileOpen ? <Icon.x /> : <Icon.menu />}</button>
        </div>
      </div>

      {mobileOpen && (
        <div style={{ borderTop: '1px solid var(--line)', padding: '8px 18px 14px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {links.map((l) => (
            <Link key={l.label} to={l.href} onClick={closeMenu}
              style={{ padding: '10px 12px', fontSize: 14, color: location.pathname === l.href ? 'var(--text)' : 'var(--text-2)', borderRadius: 8, display: 'block' }}>
              {l.label}
            </Link>
          ))}
          <div style={{ display: 'flex', gap: 8, marginTop: 8, paddingTop: 12, borderTop: '1px solid var(--line)' }}>
            <Button variant="secondary" size="sm" style={{ flex: 1 }} onClick={() => { onAuthOpen('login'); closeMenu() }}>Sign in</Button>
            <Button size="sm" style={{ flex: 1 }} onClick={() => { onAuthOpen('signup'); closeMenu() }}>Open account</Button>
          </div>
        </div>
      )}
    </header>
  )
}

/* ── Hero ─────────────────────────────────────────── */
export function Hero({ onAuthOpen, layout }) {
  const useSplit = layout === 'split'
  const [ref, visible] = useReveal(0.05)

  const chartData = React.useMemo(() => {
    const arr = []; let v = 124000
    for (let i = 0; i < 90; i++) {
      v += (Math.random() - 0.45) * 1800 + i * 40
      arr.push({ t: `Day ${i + 1}`, v: Math.max(95000, Math.round(v)) })
    }
    return arr
  }, [])

  return (
    <section style={{ position: 'relative', overflow: 'hidden', paddingTop: 56 }}>
      <div aria-hidden="true" style={{
        position: 'absolute', top: -260, left: '50%', transform: 'translateX(-50%)',
        width: 1100, height: 700, pointerEvents: 'none',
        background: 'radial-gradient(closest-side, var(--accent-soft), transparent 70%)',
        filter: 'blur(40px)', opacity: 0.7,
      }} />
      <div className="grid-bg" aria-hidden="true" style={{
        position: 'absolute', inset: 0, opacity: 0.5,
        maskImage: 'radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)',
      }} />

      <div
        ref={ref}
        className={`container hero-grid ${visible ? 'reveal visible' : 'reveal'}`}
        style={{
          position: 'relative', display: 'grid',
          gridTemplateColumns: useSplit ? '1.05fr 1fr' : '1fr',
          gap: 56, alignItems: 'center',
          paddingTop: 64, paddingBottom: 72,
        }}
      >
        <div style={{ textAlign: useSplit ? 'left' : 'center', maxWidth: useSplit ? 'none' : 880, marginInline: useSplit ? '0' : 'auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
            <Badge tone="accent" dot>Live · Q2 2026</Badge>
            <span style={{ fontSize: 12, color: 'var(--text-3)' }}>SOC 2 Type II · ISO 27001</span>
          </div>
          <h1 style={{
            fontSize: useSplit ? 'clamp(40px, 6vw, 72px)' : 'clamp(40px, 7vw, 88px)',
            lineHeight: 1.02, fontWeight: 600, letterSpacing: '-0.035em',
            marginBottom: 20, textWrap: 'balance',
          }}>
            Invest with{' '}
            <span style={{
              background: 'linear-gradient(120deg, var(--text), var(--accent) 80%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            }}>conviction.</span>
          </h1>
          <p className="hero-p" style={{
            fontSize: 19, color: 'var(--text-2)', lineHeight: 1.5,
            maxWidth: 560, marginInline: useSplit ? '0' : 'auto',
            marginBottom: 32, textWrap: 'pretty',
          }}>
            An investment platform built for long-term wealth creation. Institutional-grade portfolios, transparent performance, and a dedicated team that puts your returns first.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: useSplit ? 'flex-start' : 'center', marginBottom: 32 }}>
            <Button size="lg" onClick={() => onAuthOpen('signup')} iconRight={<Icon.arrow size={14} />}>Open an account</Button>
            <Button size="lg" variant="outline" iconLeft={<Icon.bolt size={14} />}>Watch a 90-second demo</Button>
          </div>
          <div className="hero-stats" style={{
            display: 'inline-flex', flexWrap: 'wrap', gap: 22,
            paddingTop: 20, borderTop: '1px solid var(--line)',
            justifyContent: useSplit ? 'flex-start' : 'center',
          }}>
            {[
              { k: '$2.4B',  l: 'Assets under custody' },
              { k: '+18.7%', l: '3-year avg. return'   },
              { k: '24/7',   l: 'Client concierge'     },
              { k: '5,200+', l: 'Portfolios active'    },
            ].map((s) => (
              <div key={s.l}>
                <div className="mono" style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em' }}>{s.k}</div>
                <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        {useSplit && <HeroChart chartData={chartData} />}
      </div>
      {!useSplit && (
        <div className="container" style={{ paddingBottom: 96 }}>
          <HeroChart chartData={chartData} />
        </div>
      )}
    </section>
  )
}

function HeroChart({ chartData }) {
  const last  = chartData[chartData.length - 1].v
  const first = chartData[0].v
  const ch    = ((last - first) / first) * 100
  return (
    <Card padded={false} elevation={3} style={{ overflow: 'hidden', position: 'relative' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        padding: '18px 20px', borderBottom: '1px solid var(--line)',
      }}>
        <div>
          <div style={{ fontSize: 11.5, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
            Total Return · 90D
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <span className="mono" style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em' }}>
              ${last.toLocaleString()}
            </span>
            <Badge tone={ch >= 0 ? 'positive' : 'negative'} mono>
              {ch >= 0 ? '+' : ''}{ch.toFixed(2)}%
            </Badge>
          </div>
        </div>
        <div className="hero-chart-periods">
          {['1D','1W','1M','3M','1Y','All'].map((p, i) => (
            <button key={p} style={{
              fontSize: 11, padding: '5px 10px', borderRadius: 7,
              fontFamily: 'var(--font-mono)',
              background: i === 3 ? 'var(--surface-2)' : 'transparent',
              color: i === 3 ? 'var(--text)' : 'var(--text-3)',
              border: i === 3 ? '1px solid var(--line-2)' : '1px solid transparent',
            }}>{p}</button>
          ))}
        </div>
      </div>
      <div style={{ padding: 12 }}>
        <AreaChart data={chartData} height={280} />
      </div>
      <div className="hero-chart-footer" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid var(--line)' }}>
        {[
          { k: 'NAV',        v: '$' + last.toLocaleString() },
          { k: 'Realized',   v: '+$8,420'   },
          { k: 'Unrealized', v: '+$13,108'  },
          { k: 'Cash',       v: '$24,610'   },
        ].map((m, i) => (
          <div key={m.k} style={{ padding: '14px 16px', borderRight: i < 3 ? '1px solid var(--line)' : 'none' }}>
            <div style={{ fontSize: 10.5, color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{m.k}</div>
            <div className="mono" style={{ fontSize: 14, marginTop: 4 }}>{m.v}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}

/* ── TrustStrip ───────────────────────────────────── */
export function TrustStrip() {
  const partners = ['NORTHGATE BANK', 'CIRRUS CAPITAL', 'MERIDIAN ALLOY', 'PYTHIA RESEARCH', 'WELLBROOK', 'ATLAS PRIME', 'OMEGA DESK']
  return (
    <section className="container" style={{ paddingTop: 16, paddingBottom: 56 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap', justifyContent: 'center', opacity: 0.78 }}>
        <span style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.18em' }}>
          Trusted by desks at
        </span>
        {partners.map((p) => (
          <span key={p} style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 500, letterSpacing: '0.14em' }}>{p}</span>
        ))}
      </div>
    </section>
  )
}

/* ── Features (bento grid) ────────────────────────── */
export function Features() {
  const [ref, visible] = useReveal()

  const imageCards = [
    {
      img: '/feature-1.avif',
      bg: 'linear-gradient(135deg, oklch(0.22 0.06 200) 0%, oklch(0.14 0.04 220) 100%)',
      icon: <Icon.shieldCheck size={18} />,
      title: 'Institutional Custody',
      desc: 'Client funds held in fully segregated accounts at tier-1 custodian banks. SIPC-insured up to $500,000.',
    },
    {
      img: '/feature-2.avif',
      bg: 'linear-gradient(135deg, oklch(0.22 0.06 160) 0%, oklch(0.14 0.03 180) 100%)',
      icon: <Icon.globe size={18} />,
      title: 'Global Access',
      desc: 'Invest from anywhere in the world with 24/7 dedicated support across 30+ languages.',
    },
    {
      img: '/feature-3.avif',
      bg: 'linear-gradient(135deg, oklch(0.20 0.05 240) 0%, oklch(0.13 0.03 260) 100%)',
      icon: <Icon.scale size={18} />,
      title: 'Transparent Fees',
      desc: 'Annual advisory fees from 0.25%. No hidden commissions, no performance penalties, no surprises.',
    },
    {
      img: '/feature-4.avif',
      bg: 'linear-gradient(135deg, oklch(0.20 0.06 145) 0%, oklch(0.13 0.04 160) 100%)',
      icon: <Icon.cpu size={18} />,
      title: 'Algorithmic Strategies',
      desc: 'Proprietary algorithms continuously rebalance your portfolio to maximise risk-adjusted returns.',
    },
  ]

  return (
    <section id="platform" style={{ paddingBlock: 'var(--section-pad)' }}>
      <div className="container">
        <SectionHeading
          eyebrow="Platform"
          title="Everything your portfolio needs, in one place."
          subtitle="Portfolio management, custody, execution, and reporting — built as one product, not assembled from parts."
        />
        <div
          ref={ref}
          className={`bento ${visible ? 'reveal visible' : 'reveal'}`}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gridAutoRows: 'minmax(220px, auto)',
            gap: 16,
          }}
        >
          {/* Large chart card — spans 4 columns, top row */}
          <Card padded={false} style={{ gridColumn: 'span 4', overflow: 'hidden' }}>
            <BentoCharting />
          </Card>

          {/* First image card — spans 2 columns, top row */}
          <ImageFeatureCard card={imageCards[0]} style={{ gridColumn: 'span 2' }} />

          {/* Remaining 3 image cards — 2 cols each, bottom row */}
          <ImageFeatureCard card={imageCards[1]} style={{ gridColumn: 'span 2' }} />
          <ImageFeatureCard card={imageCards[2]} style={{ gridColumn: 'span 2' }} />
          <ImageFeatureCard card={imageCards[3]} style={{ gridColumn: 'span 2' }} />
        </div>
      </div>
    </section>
  )
}

function ImageFeatureCard({ card, style }) {
  const [imgLoaded, setImgLoaded] = React.useState(false)
  return (
    <div style={{
      position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      border: '1px solid var(--line)',
      background: card.bg,
      minHeight: 220, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      ...style,
    }}>
      {/* Real image — shown once loaded, sits on top of gradient bg */}
      <img
        src={card.img}
        alt={card.title}
        onLoad={() => setImgLoaded(true)}
        onError={() => {}}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', display: 'block',
          opacity: imgLoaded ? 1 : 0,
          transition: 'opacity 400ms ease',
        }}
      />
      {/* Dark gradient overlay — always visible so text stays readable */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, oklch(0.06 0.008 145 / 0.95) 0%, oklch(0.06 0.008 145 / 0.4) 55%, transparent 100%)',
      }} />
      {/* Text */}
      <div style={{ position: 'relative', padding: '20px 22px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 7 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 30, height: 30, borderRadius: 8,
            background: 'oklch(0.72 0.16 145 / 0.25)', color: 'var(--accent)',
          }}>{card.icon}</span>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>{card.title}</h3>
        </div>
        <p style={{ fontSize: 13, color: 'oklch(0.82 0.02 145)', lineHeight: 1.55, margin: 0 }}>
          {card.desc}
        </p>
      </div>
    </div>
  )
}

function BentoCharting() {
  const candles = React.useMemo(() => {
    const arr = []; let p = 148000
    for (let i = 0; i < 40; i++) {
      const o = p
      const c = o + (Math.random() - 0.42) * 900
      const h = Math.max(o, c) + Math.random() * 300
      const l = Math.min(o, c) - Math.random() * 300
      arr.push({ o, c, h, l }); p = c
    }
    return arr
  }, [])
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--line)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <Badge tone="default" mono>BALANCED PORTFOLIO</Badge>
            <Badge tone="positive" dot mono>LIVE</Badge>
          </div>
          <div className="mono" style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>$148,240.00</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Performance analytics</div>
          <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>Real-time · Multi-asset view</div>
        </div>
      </div>
      <div style={{ padding: 12, flex: 1 }}>
        <Candlestick candles={candles} height={170} />
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '12px 20px', borderTop: '1px solid var(--line)', flexWrap: 'wrap' }}>
        {['Equities','Bonds','Real Estate','Alternatives','Cash'].map((t) => (
          <span key={t} className="mono" style={{
            fontSize: 11, padding: '4px 8px', borderRadius: 6,
            background: 'var(--bg-2)', border: '1px solid var(--line)', color: 'var(--text-2)',
          }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

function BentoVault() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}>
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 9, background: 'var(--accent-soft)', color: 'var(--accent)', marginBottom: 14 }}>
          <Icon.shieldCheck size={18} />
        </div>
        <h3 style={{ fontSize: 18, marginBottom: 8 }}>Institutional-grade custody</h3>
        <p style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.55 }}>
          Client funds held in fully segregated accounts at tier-1 custodian banks. SIPC-insured up to $500,000.
        </p>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {[1,2,3,4,5,6,7].map((i) => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 999,
            background: i <= 6 ? 'var(--accent)' : 'var(--surface-2)',
            opacity: i <= 6 ? 0.9 - (6 - i) * 0.1 : 1,
          }} />
        ))}
      </div>
    </div>
  )
}

function BentoGlobal() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 9, background: 'var(--accent-soft)', color: 'var(--accent)', marginBottom: 14 }}>
          <Icon.globe size={18} />
        </div>
        <h3 style={{ fontSize: 18, marginBottom: 8 }}>Global by default</h3>
        <p style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.55 }}>
          Operate in 120+ countries with localized routing, 30+ languages, and round-the-clock concierge desks in NYC, London, Singapore.
        </p>
      </div>
      <div style={{ display: 'flex', gap: 4, marginTop: 12 }}>
        {['NYC','LON','SGP','TYO','FRA','SYD'].map((c) => (
          <span key={c} className="mono" style={{
            fontSize: 10, padding: '3px 7px', borderRadius: 5,
            background: 'var(--bg-2)', border: '1px solid var(--line)', color: 'var(--text-3)',
          }}>{c}</span>
        ))}
      </div>
    </div>
  )
}

function BentoFees() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 9, background: 'var(--accent-soft)', color: 'var(--accent)', marginBottom: 14 }}>
          <Icon.scale size={18} />
        </div>
        <h3 style={{ fontSize: 18, marginBottom: 8 }}>Transparent fee structure</h3>
        <p style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.55 }}>
          Annual advisory fees from 0.25%. No hidden commissions, no performance penalties, no surprise charges.
        </p>
      </div>
      <div className="mono" style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 12 }}>
        Equities &middot; Bonds &middot; Real Estate &middot; Alternatives &middot; Cash
      </div>
    </div>
  )
}

function BentoAPI() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 9, background: 'var(--accent-soft)', color: 'var(--accent)', marginBottom: 14 }}>
          <Icon.cpu size={18} />
        </div>
        <h3 style={{ fontSize: 18, marginBottom: 8 }}>Algorithmic strategies</h3>
        <p style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.55 }}>
          Proprietary algorithms continuously rebalance your portfolio to maximise risk-adjusted returns.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
        {['Auto-rebalancing', 'Tax-loss harvesting', 'Risk management'].map((item) => (
          <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: 'var(--text-3)' }}>
            <span style={{ color: 'var(--accent)', flexShrink: 0 }}><Icon.check size={12} /></span>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Simulator ────────────────────────────────────── */
export function Simulator() {
  const [deposit, setDeposit] = React.useState(25000)
  const [horizon, setHorizon] = React.useState(36)
  const [risk, setRisk]       = React.useState('balanced')
  const [ref, visible]        = useReveal()

  const profile = {
    conservative: { low: 0.025, mid: 0.045, high: 0.07,  vol: 'Low'      },
    balanced:     { low: 0.04,  mid: 0.075, high: 0.115, vol: 'Moderate' },
    growth:       { low: 0.05,  mid: 0.10,  high: 0.16,  vol: 'High'     },
  }[risk]

  const data = React.useMemo(() => {
    const arr = []
    for (let m = 0; m <= horizon; m++) {
      const t = m / 12
      arr.push({
        t: `M${m}`,
        v:    Math.round(deposit * Math.pow(1 + profile.mid,  t)),
        low:  Math.round(deposit * Math.pow(1 + profile.low,  t)),
        high: Math.round(deposit * Math.pow(1 + profile.high, t)),
      })
    }
    return arr
  }, [deposit, horizon, risk, profile.low, profile.mid, profile.high])

  const last = data[data.length - 1]

  return (
    <section style={{ paddingBlock: 'var(--section-pad)', background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <SectionHeading
          eyebrow="Portfolio Simulator"
          title="Model what your capital could do."
          subtitle="Project a deposit across our risk-tiered portfolios using historical return ranges. Illustrative only — past performance does not guarantee future results."
        />
        <div ref={ref} className={`sim-grid ${visible ? 'reveal visible' : 'reveal'}`} style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 28 }}>
          <Card padded>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
              <Slider
                label="Deposit" value={deposit} onChange={setDeposit}
                min={500} max={250000} step={500}
                format={(v) => '$' + v.toLocaleString()}
                marks={[{ value: 500, label: '$500' }, { value: 50000, label: '$50K' }, { value: 250000, label: '$250K' }]}
              />
              <Slider
                label="Time horizon" value={horizon} onChange={setHorizon}
                min={6} max={120} step={6}
                format={(v) => v + ' months'}
                marks={[{ value: 6, label: '6m' }, { value: 60, label: '5y' }, { value: 120, label: '10y' }]}
              />
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', fontWeight: 500, marginBottom: 8 }}>Risk profile</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
                  {[
                    { v: 'conservative', l: 'Conservative' },
                    { v: 'balanced',     l: 'Balanced'     },
                    { v: 'growth',       l: 'Growth'       },
                  ].map((o) => (
                    <button key={o.v} onClick={() => setRisk(o.v)} aria-pressed={risk === o.v}
                      style={{
                        padding: '10px 8px', fontSize: 12, fontWeight: 500,
                        borderRadius: 9, border: '1px solid var(--line)',
                        background: risk === o.v ? 'var(--accent-soft)' : 'var(--bg-2)',
                        color: risk === o.v ? 'var(--accent)' : 'var(--text-2)',
                        borderColor: risk === o.v ? 'var(--accent-line)' : 'var(--line)',
                        transition: 'all 180ms ease',
                      }}
                    >{o.l}</button>
                  ))}
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--text-4)', marginTop: 10, lineHeight: 1.5 }}>
                  Volatility: <span style={{ color: 'var(--text-3)' }}>{profile.vol}</span> · 10y backtest range:&nbsp;
                  <span className="mono">{(profile.low * 100).toFixed(1)}–{(profile.high * 100).toFixed(1)}% / yr</span>
                </div>
              </div>
            </div>
          </Card>

          <Card padded={false} elevation={2} style={{ overflow: 'hidden' }}>
            <div className="sim-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid var(--line)' }}>
              {[
                { k: 'Projected (mid)', v: '$' + last.v.toLocaleString(),    accent: true },
                { k: 'Lower band',      v: '$' + last.low.toLocaleString()               },
                { k: 'Upper band',      v: '$' + last.high.toLocaleString()              },
              ].map((m, i) => (
                <div key={m.k} style={{ padding: '18px 20px', borderRight: i < 2 ? '1px solid var(--line)' : 'none' }}>
                  <div style={{ fontSize: 10.5, color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{m.k}</div>
                  <div className="mono" style={{ fontSize: 22, fontWeight: 600, marginTop: 6, letterSpacing: '-0.02em', color: m.accent ? 'var(--accent)' : 'var(--text)' }}>{m.v}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: 12 }}>
              <AreaChart data={data} height={240} />
            </div>
            <div style={{ padding: '12px 20px', borderTop: '1px solid var(--line)', fontSize: 11, color: 'var(--text-4)', lineHeight: 1.5, fontFamily: 'var(--font-mono)' }}>
              Illustrative projection. Returns shown are based on 10-year historical performance of the chosen risk profile, net of advisory fees. Investments can lose value.
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

/* ── Pricing ──────────────────────────────────────── */
export function Pricing({ onAuthOpen }) {
  const [ref, visible] = useReveal()
  const tiers = [
    {
      name: 'Tesla Starter',
      roi: '1.5%',
      duration: '5 Days',
      minDeposit: '$500',
      maxDeposit: '$9,999',
      popular: false,
    },
    {
      name: 'Tesla Active',
      roi: '2.5%',
      duration: '2 Weeks',
      minDeposit: '$10,000',
      maxDeposit: '$49,999',
      popular: true,
    },
    {
      name: 'Tesla Elite',
      roi: '3.0%',
      duration: '1 Month',
      minDeposit: '$50,000',
      maxDeposit: 'Unlimited',
      popular: false,
    },
  ]
  return (
    <section id="pricing" style={{ paddingBlock: 'var(--section-pad)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 14 }}>
            Investment Packages
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-2)' }}>
            Choose the tier that aligns with your financial goals.
          </p>
        </div>
        <div ref={ref} className={`pricing-grid ${visible ? 'reveal visible' : 'reveal'}`}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, isolation: 'isolate' }}
        >
          {tiers.map((t) => (
            <div key={t.name} style={{
              position: 'relative',
              borderRadius: 16,
              padding: t.popular ? '0 0 28px' : '28px 28px',
              background: 'var(--surface)',
              border: `1.5px solid ${t.popular ? 'var(--accent)' : 'var(--line)'}`,
              boxShadow: t.popular ? '0 0 32px oklch(0.72 0.16 145 / 0.18)' : 'none',
              display: 'flex', flexDirection: 'column', gap: 0,
              overflow: 'hidden',
            }}>
              {t.popular && (
                <div style={{
                  background: 'var(--accent)',
                  padding: '10px 0',
                  textAlign: 'center',
                  fontSize: 12, fontWeight: 600, letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  marginBottom: 28,
                }}>
                  <Icon.star size={13} /> Most Popular
                </div>
              )}
              <div style={{ padding: t.popular ? '0 28px' : '0', flex: 1 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{t.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 28 }}>
                  <span style={{
                    fontSize: 48, fontWeight: 700, letterSpacing: '-0.03em',
                    color: 'var(--accent)', fontFamily: 'var(--font-mono)',
                    lineHeight: 1,
                  }}>{t.roi}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.3 }}>ROI<br />/ Daily</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1px solid var(--line)', marginBottom: 28 }}>
                  {[
                    { label: 'Duration',    value: t.duration    },
                    { label: 'Min Deposit', value: t.minDeposit  },
                    { label: 'Max Deposit', value: t.maxDeposit  },
                  ].map((row) => (
                    <div key={row.label} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '14px 0', borderBottom: '1px solid var(--line)',
                    }}>
                      <span style={{ fontSize: 14, color: 'var(--text-3)' }}>{row.label}</span>
                      <span className="mono" style={{
                        fontSize: 14, fontWeight: 600,
                        color: row.label === 'Duration' ? 'var(--accent)' : 'var(--text)',
                      }}>{row.value}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => onAuthOpen('signup')}
                  style={{
                    width: '100%', padding: '14px 0',
                    borderRadius: 10, fontSize: 13, fontWeight: 600,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'all 180ms ease',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    background: t.popular ? 'var(--accent)' : 'transparent',
                    color: t.popular ? '#fff' : 'var(--accent)',
                    border: `1.5px solid var(--accent)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = t.popular ? 'oklch(0.62 0.16 145)' : 'var(--accent-soft)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = t.popular ? 'var(--accent)' : 'transparent'
                  }}
                >
                  Start Investing <Icon.arrow size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Compare ──────────────────────────────────────── */
export function Compare() {
  const [ref, visible] = useReveal()
  const cols = ['[Company]', 'Traditional bank', 'Robo-advisor', 'Hedge fund']
  const rows = [
    { label: 'Minimum investment',          vals: ['$5,000',          '$50,000+',       '$500',           '$1,000,000+']   },
    { label: 'Annual advisory fee',         vals: ['From 0.25%',      '1.00–2.00%',     '0.25–0.50%',     '2% + 20%']      },
    { label: 'Dedicated account manager',   vals: ['Yes, all tiers',  'Wealth tier only','No',            'Yes']           },
    { label: 'Institutional-grade custody', vals: ['Segregated accts','Bank custodian',  'Custodial',      'Prime broker']  },
    { label: 'Algorithmic rebalancing',     vals: ['Yes, included',   'Manual only',    'Basic',          'Proprietary']   },
    { label: 'Real-time concierge desk',    vals: ['24/7',            'Business hours', 'Chatbot',        'Limited']       },
    { label: 'Hidden fees',                 vals: ['Never',           'Common',         'Occasional',     'Common']        },
    { label: 'Performance reporting',       vals: ['Plain-English',   'Quarterly PDF',  'App dashboard',  'Monthly bundle'] },
  ]
  return (
    <section id="compare" style={{ paddingBlock: 'var(--section-pad)', background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <SectionHeading
          eyebrow="How we compare"
          title="More value, less cost."
          subtitle="An honest line-by-line comparison against traditional banks, robo-advisors, and hedge funds."
        />
        <div ref={ref} className={visible ? 'reveal visible' : 'reveal'}>
          <Card padded={false} elevation={2} style={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
                <thead>
                  <tr style={{ background: 'var(--bg-2)' }}>
                    <th style={th()}></th>
                    {cols.map((c, i) => (
                      <th key={c} style={th(i === 0)}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                          {i === 0 && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />}
                          {c}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.label} style={{ borderTop: '1px solid var(--line)' }}>
                      <td style={td()}>{r.label}</td>
                      {r.vals.map((v, i) => (
                        <td key={i} style={td(i === 0)}>
                          <span style={{
                            fontFamily: i === 0 || /\d|%|\$/.test(v) ? 'var(--font-mono)' : 'inherit',
                            color: i === 0 ? 'var(--text)' : 'var(--text-2)',
                            fontWeight: i === 0 ? 500 : 400,
                            fontSize: 13.5,
                          }}>{v}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

function th(hero) {
  return {
    textAlign: 'left', padding: '16px 20px', fontSize: 12,
    color: hero ? 'var(--text)' : 'var(--text-3)',
    fontWeight: 500, letterSpacing: '-0.005em',
    borderBottom: '1px solid var(--line)',
    background: hero ? 'var(--accent-soft)' : 'transparent',
    width: hero ? '22%' : 'auto', whiteSpace: 'nowrap',
  }
}
function td(hero) {
  return {
    padding: '14px 20px', fontSize: 13.5, color: 'var(--text-2)',
    background: hero ? 'oklch(0.72 0.16 145 / 0.05)' : 'transparent',
    borderRight: '1px solid var(--line)',
  }
}

/* ── How It Works ─────────────────────────────────── */
export function Docs() {
  const [ref, visible] = useReveal()

  const steps = [
    {
      number: '01',
      icon: <Icon.user size={22} />,
      title: 'Open your account',
      desc: 'Sign up in under 2 minutes. No minimums, no paperwork — just a secure account ready to grow your wealth from day one.',
      tags: ['Free to open', 'No minimum balance', 'Identity verified securely'],
    },
    {
      number: '02',
      icon: <Icon.plus size={22} />,
      title: 'Add your funds',
      desc: 'Transfer from your bank account with a few taps. Your money is protected and insured the moment it arrives.',
      tags: ['Bank transfer', 'No transfer fees', 'Same-day processing'],
    },
    {
      number: '03',
      icon: <Icon.layers size={22} />,
      title: 'Pick your strategy',
      desc: 'Choose a managed portfolio that matches your goals — Conservative, Balanced, or Growth — or select your own assets.',
      tags: ['Expert-managed options', 'Multi-asset portfolios', 'Adjust any time'],
    },
    {
      number: '04',
      icon: <Icon.activity size={22} />,
      title: 'Watch your wealth grow',
      desc: 'Track your portfolio performance in plain language. No confusing jargon — just clear numbers and honest reporting.',
      tags: ['Daily performance updates', 'Plain-English reports', 'Tax documents included'],
    },
  ]

  const reassurances = [
    {
      icon: <Icon.shieldCheck size={20} />,
      title: 'Your money is always protected',
      desc: 'Cash balances are SIPC-insured up to $500,000. All investments held in fully segregated custodian accounts.',
    },
    {
      icon: <Icon.lock size={20} />,
      title: 'Bank-grade security',
      desc: 'SOC 2 Type II certified. Two-factor login, 256-bit encryption, and around-the-clock fraud monitoring.',
    },
    {
      icon: <Icon.scale size={20} />,
      title: 'Fully regulated and transparent',
      desc: 'Registered with FINRA and SIPC. No hidden fees, no surprises — your money is always accounted for.',
    },
  ]

  return (
    <section id="docs" style={{ paddingBlock: 'var(--section-pad)' }}>
      <div className="container">
        <SectionHeading
          eyebrow="How it works"
          title="Investing made simple."
          subtitle="You don't need to be a financial expert. Tesla handles the complexity so you can focus on what matters — growing your wealth."
        />

        <div ref={ref} className={visible ? 'reveal visible' : 'reveal'}>
          {/* Steps */}
          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
            {steps.map((s, i) => (
              <Card key={s.number} padded interactive style={{ position: 'relative', overflow: 'hidden' }}>
                <div aria-hidden="true" style={{
                  position: 'absolute', top: 12, right: 16,
                  fontSize: 52, fontWeight: 700, letterSpacing: '-0.04em',
                  color: 'var(--accent)', opacity: 0.07, lineHeight: 1,
                  fontFamily: 'var(--font-display)',
                }}>{s.number}</div>
                <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: '100%', gap: 16 }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 44, height: 44, borderRadius: 12,
                    background: 'var(--accent-soft)', color: 'var(--accent)',
                    flexShrink: 0,
                  }}>{s.icon}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 10 }}>{s.title}</h3>
                    <p style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.6 }}>{s.desc}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
                    {s.tags.map((tag) => (
                      <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: 'var(--text-3)' }}>
                        <span style={{ color: 'var(--accent)', flexShrink: 0 }}><Icon.check size={12} /></span>
                        {tag}
                      </div>
                    ))}
                  </div>
                  {i < steps.length - 1 && (
                    <div aria-hidden="true" className="step-arrow" style={{
                      position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                      color: 'var(--text-4)', zIndex: 2,
                    }}>
                      <Icon.arrow size={16} />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Reassurance strip */}
          <Card padded={false} elevation={1} className="reassure-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {reassurances.map((r, i) => (
              <div key={r.title} style={{
                padding: '28px 28px',
                borderRight: i < reassurances.length - 1 ? '1px solid var(--line)' : 'none',
                display: 'flex', gap: 16, alignItems: 'flex-start',
              }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 40, height: 40, borderRadius: 10,
                  background: 'var(--accent-soft)', color: 'var(--accent)', flexShrink: 0,
                }}>{r.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{r.title}</div>
                  <p style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.6 }}>{r.desc}</p>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </section>
  )
}

/* ── DashboardPreview ─────────────────────────────── */
export function DashboardPreview() {
  const [tab, setTab] = React.useState('overview')
  const [ref, visible] = useReveal()
  return (
    <section id="markets" style={{ paddingBlock: 'var(--section-pad)', background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <SectionHeading
          eyebrow="The workspace"
          title="Your wealth, clearly in view."
          subtitle="An investment workspace designed around clarity — see what matters, act with confidence, and stay in control."
        />
        <div ref={ref} className={visible ? 'reveal visible' : 'reveal'}>
          <Card padded={false} elevation={3} style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderBottom: '1px solid var(--line)', background: 'var(--bg-2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ width: 11, height: 11, borderRadius: '50%', background: 'oklch(0.7 0.18 25)'  }} />
                  <span style={{ width: 11, height: 11, borderRadius: '50%', background: 'oklch(0.78 0.16 80)' }} />
                  <span style={{ width: 11, height: 11, borderRadius: '50%', background: 'oklch(0.78 0.16 155)'}} />
                </div>
                <span className="mono" style={{ fontSize: 12, color: 'var(--text-3)' }}>app.tesla.com / dashboard</span>
              </div>
              <Tabs value={tab} onChange={setTab} items={[
                { value: 'overview',   label: 'Overview',   icon: <Icon.activity size={13} /> },
                { value: 'markets',    label: 'Markets',    icon: <Icon.chart size={13} />, count: 4 },
                { value: 'portfolio',  label: 'Portfolio',  icon: <Icon.layers size={13} /> },
              ]} />
            </div>
            {tab === 'overview'  && <DashOverview />}
            {tab === 'markets'   && <DashMarkets />}
            {tab === 'portfolio' && <DashPortfolio />}
          </Card>
        </div>
      </div>
    </section>
  )
}

function DashOverview() {
  const data = React.useMemo(() => {
    const arr = []; let v = 100000
    for (let i = 0; i < 60; i++) { v += (Math.random() - 0.4) * 1500; arr.push({ t: 'D'+(i+1), v: Math.round(v) }) }
    return arr
  }, [])
  return (
    <div className="dash-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 0 }}>
      <div style={{ padding: 20, borderRight: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Total assets</div>
            <div className="mono" style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 4 }}>$147,408.22</div>
          </div>
          <Badge tone="positive" mono>+ $4,820 · +3.38%</Badge>
        </div>
        <AreaChart data={data} height={210} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 20px 14px' }}>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 14 }}>Holdings</div>
          {[
            { sym: 'EQ',   name: 'Global Equities', alloc: 44, val: 64900, ch:  1.42 },
            { sym: 'FI',   name: 'Fixed Income',    alloc: 22, val: 32449, ch:  0.21 },
            { sym: 'RE',   name: 'Real Estate',     alloc: 15, val: 22137, ch:  0.88 },
            { sym: 'ALT',  name: 'Alternatives',    alloc: 10, val: 14741, ch: -0.34 },
            { sym: 'CASH', name: 'Cash & Equiv.',   alloc:  9, val: 13266, ch:  0    },
          ].map((h) => (
            <div key={h.sym} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
              <span style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-2)', border: '1px solid var(--line)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-2)' }}>
                {h.sym}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--text)' }}>{h.name}</span>
                  <span className="mono">${h.val.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ width: '60%', height: 3, background: 'var(--bg-2)', borderRadius: 999, overflow: 'hidden' }}>
                    <span style={{ display: 'block', width: `${h.alloc * 2.6}%`, height: '100%', background: 'var(--accent)' }} />
                  </span>
                  <span className="mono" style={{ fontSize: 11, color: h.ch > 0 ? 'var(--pos)' : h.ch < 0 ? 'var(--neg)' : 'var(--text-4)' }}>
                    {h.ch > 0 ? '+' : ''}{h.ch.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DashMarkets() {
  const rows = [
    { sym: 'AAPL', name: 'Apple Inc.',         price:   224.31, ch:  0.42, vol: '4.2B',  spark: [8,9,8,10,9,11,10,12,11,13,12,13,14,13,14] },
    { sym: 'MSFT', name: 'Microsoft Corp.',    price:   432.15, ch:  0.55, vol: '3.4B',  spark: [9,10,10,11,11,11,12,12,12,13,12,13,13,14,13] },
    { sym: 'NVDA', name: 'NVIDIA Corp.',       price:   945.07, ch:  2.18, vol: '21.0B', spark: [4,5,5,6,7,8,8,9,10,11,12,13,14,16,18] },
    { sym: 'GOOGL',name: 'Alphabet Inc.',      price:   178.94, ch: -0.31, vol: '2.1B',  spark: [10,11,11,10,11,11,10,11,11,10,11,11,10,10,10] },
    { sym: 'AMZN', name: 'Amazon.com Inc.',    price:   195.42, ch:  1.04, vol: '5.8B',  spark: [6,7,7,8,9,9,10,10,11,12,12,13,13,14,15] },
    { sym: 'BRK.B',name: 'Berkshire Hathaway',price:   406.18, ch:  0.18, vol: '1.2B',  spark: [10,10,11,11,11,12,12,11,12,12,13,13,12,13,13] },
    { sym: 'SPY',  name: 'S&P 500 ETF',        price:   538.24, ch:  0.62, vol: '18.4B', spark: [9,10,10,11,11,12,12,13,13,14,13,14,14,15,15] },
    { sym: 'BND',  name: 'Vanguard Bond ETF',  price:    73.51, ch: -0.12, vol: '820M',  spark: [12,12,11,12,12,11,12,11,12,12,11,11,12,11,12] },
  ]
  return (
    <div style={{ padding: 4 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Ticker','Name','Price','Change','Volume','30D'].map((h, i) => (
              <th key={h} style={{ textAlign: i > 1 ? 'right' : 'left', padding: '10px 16px', fontSize: 11, fontWeight: 500, color: 'var(--text-4)', letterSpacing: '0.04em', textTransform: 'uppercase', borderBottom: '1px solid var(--line)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.sym} style={{ borderBottom: '1px solid var(--line)', transition: 'background 120ms' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <td style={{ padding: '12px 16px' }}><span className="mono" style={{ fontSize: 12, fontWeight: 600 }}>{r.sym}</span></td>
              <td style={{ padding: '12px 16px', color: 'var(--text-2)', fontSize: 13 }}>{r.name}</td>
              <td className="mono" style={{ padding: '12px 16px', textAlign: 'right', fontSize: 13 }}>
                ${r.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="mono" style={{ padding: '12px 16px', textAlign: 'right', fontSize: 13, color: r.ch >= 0 ? 'var(--pos)' : 'var(--neg)' }}>
                {r.ch >= 0 ? '+' : ''}{r.ch.toFixed(2)}%
              </td>
              <td className="mono" style={{ padding: '12px 16px', textAlign: 'right', fontSize: 13, color: 'var(--text-2)' }}>{r.vol}</td>
              <td style={{ padding: '8px 16px', textAlign: 'right' }}>
                <Sparkline data={r.spark} width={84} height={24} color={r.ch >= 0 ? 'var(--pos)' : 'var(--neg)'} fill />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function DashPortfolio() {
  const allocs = [
    { name: 'Equities',       value: 44, color: 'var(--accent)' },
    { name: 'Fixed income',   value: 22, color: 'oklch(0.78 0.16 245)' },
    { name: 'Real estate',    value: 15, color: 'oklch(0.78 0.16 155)' },
    { name: 'Alternatives',   value: 10, color: 'oklch(0.72 0.14 30)'  },
    { name: 'Cash',           value:  9, color: 'oklch(0.6 0.04 250)'  },
  ]
  let acc = 0
  const segs = allocs.map((a) => { const start = acc; acc += a.value; return { ...a, start, end: acc } })
  return (
    <div className="dash-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
      <div style={{ padding: 24, borderRight: '1px solid var(--line)' }}>
        <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 16 }}>Allocation</div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <svg width={160} height={160} viewBox="0 0 160 160">
            {segs.map((s, i) => {
              const r = 64, cx = 80, cy = 80
              const a1 = (s.start / 100) * 2 * Math.PI - Math.PI / 2
              const a2 = (s.end   / 100) * 2 * Math.PI - Math.PI / 2
              const large = s.value > 50 ? 1 : 0
              const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1)
              const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2)
              return <path key={i} d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`} fill={s.color} opacity={0.85} stroke="var(--bg)" strokeWidth="2" />
            })}
            <circle cx={80} cy={80} r={36} fill="var(--surface)" />
            <text x={80} y={75} textAnchor="middle" fontSize="10" fill="var(--text-3)" fontFamily="var(--font-mono)">TOTAL</text>
            <text x={80} y={90} textAnchor="middle" fontSize="14" fill="var(--text)" fontFamily="var(--font-mono)" fontWeight="600">$147K</text>
          </svg>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {segs.map((s) => (
              <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />
                  <span style={{ color: 'var(--text-2)' }}>{s.name}</span>
                </span>
                <span className="mono" style={{ color: 'var(--text)' }}>{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 16 }}>Recent activity</div>
        {[
          { type: 'BUY',     sym: 'SPY',  q: 10,   p: 537.90,   t: '14:22'     },
          { type: 'BUY',     sym: 'MSFT', q: 5,    p: 431.20,   t: '11:08'     },
          { type: 'DEPOSIT', sym: 'USD',  q: 5000, p: 1,        t: '09:14'     },
          { type: 'DIV',     sym: 'AAPL', q: 8,    p: 0.25,     t: 'Yesterday' },
          { type: 'SELL',    sym: 'BND',  q: 20,   p: 73.40,    t: 'Yesterday' },
        ].map((a, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 4 ? '1px solid var(--line)' : 'none', fontSize: 13 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <Badge tone={['BUY','DEPOSIT','DIV'].includes(a.type) ? 'positive' : 'negative'} mono>{a.type}</Badge>
              <span className="mono" style={{ color: 'var(--text)' }}>{a.sym}</span>
            </span>
            <span className="mono" style={{ color: 'var(--text-3)', fontSize: 12 }}>
              {a.q} @ ${a.p.toLocaleString(undefined, { minimumFractionDigits: 2 })} · {a.t}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── CTA ──────────────────────────────────────────── */
export function CTA({ onAuthOpen }) {
  const [ref, visible] = useReveal()
  return (
    <section style={{ paddingBlock: 'calc(var(--section-pad) * 0.8)' }}>
      <div className="container">
        <Card padded={false} elevation={3} style={{
          position: 'relative', overflow: 'hidden',
          padding: 'clamp(40px, 6vw, 72px)',
          textAlign: 'center',
          background: 'radial-gradient(circle at 50% 0%, var(--accent-soft), var(--surface) 60%)',
          borderColor: 'var(--accent-line)',
        }}>
          <div className="grid-bg" aria-hidden="true" style={{
            position: 'absolute', inset: 0, opacity: 0.4,
            maskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)',
          }} />
          <div ref={ref} className={`${visible ? 'reveal visible' : 'reveal'}`} style={{ position: 'relative' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 600, letterSpacing: '-0.025em', marginBottom: 14, textWrap: 'balance' }}>
              Start building wealth today.
            </h2>
            <p style={{ fontSize: 17, color: 'var(--text-2)', marginBottom: 28, maxWidth: 540, marginInline: 'auto' }}>
              No minimums. Institutional-grade custody. Your portfolio, fully protected from day one.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button size="lg" onClick={() => onAuthOpen('signup')} iconRight={<Icon.arrow size={14} />}>Open an account</Button>
              <Button size="lg" variant="outline">Read the security paper</Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

/* ── Footer ───────────────────────────────────────── */
export function Footer() {
  const cols = {
    Product:   ['Markets', 'Portfolio', 'Custody', 'Analytics', 'Mobile'],
    Company:   ['About', 'Customers', 'Press', 'Careers', 'Contact'],
    Resources: ['Documentation', 'Status', 'Security', 'System metrics', 'Changelog'],
    Legal:     ['Privacy', 'Terms', 'Disclosures', 'Best execution', 'Form CRS'],
  }
  return (
    <footer style={{ borderTop: '1px solid var(--line)', paddingBlock: '64px 36px' }}>
      <div className="container">
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(4, 1fr)', gap: 32 }}>
          <div>
            <Logo />
            <p style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 14, lineHeight: 1.55, maxWidth: 280 }}>
              An investment platform built for long-term wealth creation. Trusted by 5,200+ portfolios worldwide.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
              <Badge tone="default" mono>SOC 2 Type II</Badge>
              <Badge tone="default" mono>ISO 27001</Badge>
            </div>
          </div>
          {Object.entries(cols).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontSize: 12, color: 'var(--text-2)', fontWeight: 500, marginBottom: 14, letterSpacing: '0.02em', textTransform: 'uppercase' }}>{title}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" style={{ fontSize: 13.5, color: 'var(--text-3)', transition: 'color 180ms' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
                    >{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom" style={{ marginTop: 56, paddingTop: 24, borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 12, color: 'var(--text-4)' }}>© 2026 Tesla, Inc. All rights reserved.</span>
          <span className="footer-legal" style={{ fontSize: 11.5, color: 'var(--text-4)', maxWidth: 700, textAlign: 'right', lineHeight: 1.5 }}>
            Investment advisory services offered through [Company] Advisors LLC, a registered investment adviser. Investing involves risk, including the possible loss of principal.
          </span>
        </div>
      </div>
    </footer>
  )
}

/* ── PageHero — inner page header ────────────────── */
export function PageHero({ eyebrow, title, subtitle, cta }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', paddingBlock: '72px 64px' }}>
      <div aria-hidden="true" style={{
        position: 'absolute', top: -180, left: '50%', transform: 'translateX(-50%)',
        width: 900, height: 500, pointerEvents: 'none',
        background: 'radial-gradient(closest-side, var(--accent-soft), transparent 70%)',
        filter: 'blur(40px)', opacity: 0.65,
      }} />
      <div className="grid-bg" aria-hidden="true" style={{
        position: 'absolute', inset: 0, opacity: 0.4,
        maskImage: 'radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)',
      }} />
      <div className="container" style={{ position: 'relative', textAlign: 'center', maxWidth: 800, marginInline: 'auto' }}>
        {eyebrow && (
          <div style={{ marginBottom: 18 }}>
            <Badge tone="accent">{eyebrow}</Badge>
          </div>
        )}
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 600, letterSpacing: '-0.03em',
          lineHeight: 1.06, marginBottom: 18, textWrap: 'balance',
        }}>{title}</h1>
        {subtitle && (
          <p style={{ fontSize: 18, color: 'var(--text-2)', lineHeight: 1.55, maxWidth: 600, marginInline: 'auto', textWrap: 'pretty' }}>
            {subtitle}
          </p>
        )}
        {cta && <div style={{ marginTop: 28, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>{cta}</div>}
      </div>
    </section>
  )
}

export { MarketTicker }
