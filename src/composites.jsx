/* Helios Capital — composite components */
import React from 'react'
import { Icon, Tabs } from './ui'

/* ── Logo ─────────────────────────────────────────── */
export function Logo({ size = 22, mono = false }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <defs>
          <linearGradient id="helios-grad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="oklch(0.85 0.14 245)" />
            <stop offset="1" stopColor="oklch(0.55 0.18 245)" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="6" fill={mono ? 'currentColor' : 'url(#helios-grad)'} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <rect
            key={a} x="15" y="2" width="2" height="5" rx="1"
            fill={mono ? 'currentColor' : 'url(#helios-grad)'}
            transform={`rotate(${a} 16 16)`}
            opacity={0.9}
          />
        ))}
      </svg>
      <span style={{ fontWeight: 600, letterSpacing: '-0.01em', fontSize: 16 }}>
        Helios <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>Capital</span>
      </span>
    </span>
  )
}

/* ── KeyHint ──────────────────────────────────────── */
export function KeyHint({ keys = ['⌘', 'K'] }) {
  return (
    <span style={{ display: 'inline-flex', gap: 3 }}>
      {keys.map((k, i) => (
        <kbd key={i} className="mono" style={{
          fontSize: 10.5, padding: '2px 6px',
          background: 'var(--bg-2)', border: '1px solid var(--line-2)',
          borderBottomWidth: 2, borderRadius: 5, color: 'var(--text-2)',
          minWidth: 18, textAlign: 'center', display: 'inline-block',
        }}>{k}</kbd>
      ))}
    </span>
  )
}

/* ── Sparkline ────────────────────────────────────── */
export function Sparkline({ data, width = 80, height = 24, color = 'var(--text-2)', fill = false }) {
  const min = Math.min(...data), max = Math.max(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * (height - 4) - 2
    return [x, y]
  })
  const line = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const area = `${line} L ${width} ${height} L 0 ${height} Z`
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      {fill && <path d={area} fill={color} opacity="0.12" />}
      <path d={line} fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── AreaChart ────────────────────────────────────── */
export function AreaChart({ data, height = 240, color = 'var(--accent)', label = 'Portfolio', showAxis = true, showGrid = true }) {
  const ref = React.useRef(null)
  const [w, setW] = React.useState(600)
  const [hover, setHover] = React.useState(null)
  React.useLayoutEffect(() => {
    if (!ref.current) return
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width))
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])

  const padL = 44, padR = 12, padT = 16, padB = showAxis ? 28 : 12
  const inner = { w: w - padL - padR, h: height - padT - padB }
  const min = Math.min(...data.map((d) => d.v))
  const max = Math.max(...data.map((d) => d.v))
  const range = max - min || 1

  const pts = data.map((d, i) => {
    const x = padL + (i / (data.length - 1)) * inner.w
    const y = padT + inner.h - ((d.v - min) / range) * inner.h
    return { x, y, ...d }
  })
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const area = `${line} L ${pts[pts.length - 1].x} ${padT + inner.h} L ${pts[0].x} ${padT + inner.h} Z`

  const yTicks = 4
  const yTickVals = Array.from({ length: yTicks + 1 }, (_, i) => min + (i / yTicks) * range)

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    if (x < padL || x > padL + inner.w) { setHover(null); return }
    const i = Math.round(((x - padL) / inner.w) * (data.length - 1))
    setHover(pts[i])
  }

  const last = pts[pts.length - 1]

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%' }}
      onMouseMove={onMove} onMouseLeave={() => setHover(null)}
    >
      <svg width="100%" height={height}>
        <defs>
          <linearGradient id="ac-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={color} stopOpacity="0.3" />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {showGrid && yTickVals.map((v, i) => {
          const y = padT + inner.h - (i / yTicks) * inner.h
          return <line key={i} x1={padL} x2={padL + inner.w} y1={y} y2={y} stroke="var(--line)" strokeDasharray="3 3" />
        })}
        {showAxis && yTickVals.map((v, i) => {
          const y = padT + inner.h - (i / yTicks) * inner.h
          return (
            <text key={i} x={padL - 8} y={y + 3} textAnchor="end"
              fontSize="10" fill="var(--text-4)" fontFamily="var(--font-mono)">
              {Math.round(v).toLocaleString()}
            </text>
          )
        })}
        <path d={area} fill="url(#ac-fill)" />
        <path d={line} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={last.x} cy={last.y} r="4" fill={color} />
        <circle cx={last.x} cy={last.y} r="8" fill={color} opacity="0.2" />
        {hover && (
          <>
            <line x1={hover.x} x2={hover.x} y1={padT} y2={padT + inner.h} stroke="var(--text-3)" strokeDasharray="2 3" />
            <circle cx={hover.x} cy={hover.y} r="4" fill="var(--text)" stroke={color} strokeWidth="2" />
          </>
        )}
      </svg>
      {hover && (
        <div style={{
          position: 'absolute', left: Math.min(Math.max(hover.x - 60, 8), w - 130), top: 4,
          padding: '8px 10px', borderRadius: 8,
          background: 'var(--surface-2)', border: '1px solid var(--line-2)',
          fontFamily: 'var(--font-mono)', fontSize: 12, pointerEvents: 'none',
          boxShadow: 'var(--shadow-2)',
        }}>
          <div style={{ color: 'var(--text-3)', fontSize: 10 }}>{hover.t}</div>
          <div style={{ color: 'var(--text)', fontWeight: 500 }}>${hover.v.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
        </div>
      )}
    </div>
  )
}

/* ── Candlestick ──────────────────────────────────── */
export function Candlestick({ candles, height = 180 }) {
  const ref = React.useRef(null)
  const [w, setW] = React.useState(600)
  React.useLayoutEffect(() => {
    if (!ref.current) return
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width))
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])
  const padX = 8
  const inner = w - padX * 2
  const lo = Math.min(...candles.map((c) => c.l))
  const hi = Math.max(...candles.map((c) => c.h))
  const range = hi - lo || 1
  const cw = inner / candles.length
  const bw = Math.max(2, cw * 0.6)
  const yFor = (v) => height - ((v - lo) / range) * (height - 16) - 8
  return (
    <div ref={ref} style={{ width: '100%' }}>
      <svg width="100%" height={height}>
        {candles.map((c, i) => {
          const x = padX + i * cw + cw / 2
          const up = c.c >= c.o
          const color = up ? 'var(--pos)' : 'var(--neg)'
          return (
            <g key={i}>
              <line x1={x} x2={x} y1={yFor(c.h)} y2={yFor(c.l)} stroke={color} strokeWidth="1" />
              <rect
                x={x - bw / 2}
                y={yFor(Math.max(c.o, c.c))}
                width={bw}
                height={Math.max(1, Math.abs(yFor(c.c) - yFor(c.o)))}
                fill={color} opacity={up ? 0.85 : 1}
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/* ── MarketTicker ─────────────────────────────────── */
export function MarketTicker() {
  const seedTickers = React.useMemo(() => ([
    { sym: 'BTC',   name: 'Bitcoin',    price: 67841.20, ch:  1.42 },
    { sym: 'ETH',   name: 'Ethereum',   price: 3520.18,  ch: -0.84 },
    { sym: 'SOL',   name: 'Solana',     price: 178.62,   ch:  3.21 },
    { sym: 'AAPL',  name: 'Apple',      price: 224.31,   ch:  0.42 },
    { sym: 'NVDA',  name: 'NVIDIA',     price: 945.07,   ch:  2.18 },
    { sym: 'GOOGL', name: 'Alphabet',   price: 178.94,   ch: -0.31 },
    { sym: 'TSLA',  name: 'Tesla Inc.', price: 248.50,   ch:  1.07 },
    { sym: 'AVAX',  name: 'Avalanche',  price: 38.21,    ch: -1.62 },
    { sym: 'MSFT',  name: 'Microsoft',  price: 432.15,   ch:  0.55 },
    { sym: 'LINK',  name: 'Chainlink',  price: 16.84,    ch:  4.10 },
  ]), [])

  const [tickers, setTickers] = React.useState(seedTickers)
  React.useEffect(() => {
    const id = setInterval(() => {
      setTickers((prev) => prev.map((t) => {
        const drift = (Math.random() - 0.5) * 0.004
        const price = +(t.price * (1 + drift)).toFixed(2)
        const ch    = +(t.ch + (Math.random() - 0.5) * 0.08).toFixed(2)
        return { ...t, price, ch }
      }))
    }, 1600)
    return () => clearInterval(id)
  }, [])

  const row = (key) => (
    <div key={key} style={{ display: 'inline-flex', alignItems: 'center', gap: 0 }}>
      {tickers.map((t, i) => (
        <span key={i} style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          padding: '0 24px', borderRight: '1px solid var(--line)',
        }}>
          <span style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600, letterSpacing: '0.04em' }}>{t.sym}</span>
          <span className="mono" style={{ fontSize: 12, color: 'var(--text)' }}>
            ${t.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="mono" style={{ fontSize: 11, color: t.ch >= 0 ? 'var(--pos)' : 'var(--neg)' }}>
            {t.ch >= 0 ? '+' : ''}{t.ch.toFixed(2)}%
          </span>
        </span>
      ))}
    </div>
  )

  return (
    <div style={{
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
      background: 'var(--bg-2)',
      overflow: 'hidden',
      maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
      WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
    }}>
      <div style={{
        display: 'inline-flex',
        whiteSpace: 'nowrap',
        animation: 'marquee 60s linear infinite',
        height: 38, alignItems: 'center',
      }}>
        {row('a')}
        {row('b')}
      </div>
    </div>
  )
}

/* ── CommandPalette ───────────────────────────────── */
export function CommandPalette({ open, onClose }) {
  const [q, setQ] = React.useState('')
  const [active, setActive] = React.useState(0)
  const inputRef = React.useRef(null)

  const items = React.useMemo(() => [
    { group: 'Navigate', icon: <Icon.chart />,    label: 'Open Markets',         hint: 'Live prices',                action: 'markets' },
    { group: 'Navigate', icon: <Icon.wallet />,   label: 'Open Vault',           hint: 'Custody & cold storage',     action: 'vault' },
    { group: 'Navigate', icon: <Icon.activity />, label: 'Portfolio',            hint: 'Performance & holdings',     action: 'portfolio' },
    { group: 'Navigate', icon: <Icon.book />,     label: 'Documentation',        hint: 'API & guides',               action: 'docs' },
    { group: 'Trade',    icon: <Icon.trending />, label: 'New order — BTC/USD',  hint: 'Spot',                       action: 'order-btc' },
    { group: 'Trade',    icon: <Icon.trending />, label: 'New order — ETH/USD',  hint: 'Spot',                       action: 'order-eth' },
    { group: 'Trade',    icon: <Icon.bolt />,     label: 'Repeat last order',    hint: 'BTC/USD · 0.5 · limit',      action: 'repeat' },
    { group: 'Account',  icon: <Icon.user />,     label: 'Switch account',       hint: 'Personal · Active',          action: 'switch' },
    { group: 'Account',  icon: <Icon.lock />,     label: 'Lock session',         hint: '⌘L',                        action: 'lock' },
    { group: 'Account',  icon: <Icon.bell />,     label: 'Notification settings',                                    action: 'notif' },
    { group: 'Help',     icon: <Icon.search />,   label: 'Search docs',                                              action: 'search-docs' },
    { group: 'Help',     icon: <Icon.mail />,     label: 'Contact concierge',    hint: 'Available 24/7',             action: 'support' },
  ], [])

  const filtered = React.useMemo(() => {
    if (!q.trim()) return items
    const needle = q.toLowerCase()
    return items.filter((it) => (it.label + ' ' + it.group + ' ' + (it.hint || '')).toLowerCase().includes(needle))
  }, [q, items])

  const grouped = React.useMemo(() => {
    const map = {}
    filtered.forEach((it) => { (map[it.group] ||= []).push(it) })
    return map
  }, [filtered])

  React.useEffect(() => {
    if (open) { setQ(''); setActive(0); setTimeout(() => inputRef.current?.focus(), 50) }
  }, [open])
  React.useEffect(() => { setActive(0) }, [q])

  const onKey = (e) => {
    if (e.key === 'Escape')    { onClose(); return }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(filtered.length - 1, a + 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActive((a) => Math.max(0, a - 1)) }
    if (e.key === 'Enter')     { e.preventDefault(); onClose() }
  }

  if (!open) return null
  let runIdx = -1

  return (
    <div role="dialog" aria-modal="true" aria-label="Command palette"
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'oklch(0 0 0 / 0.5)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: '12vh', animation: 'fadein 180ms ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: 'min(640px, 92vw)',
          background: 'var(--surface)', border: '1px solid var(--line-2)',
          borderRadius: 16, boxShadow: 'var(--shadow-pop)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKey}
      >
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 16px', borderBottom: '1px solid var(--line)',
        }}>
          <Icon.search size={16} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search markets, accounts, actions…"
            style={{
              flex: 1, background: 'transparent', border: 0, outline: 'none',
              fontSize: 15, color: 'var(--text)',
            }}
          />
          <kbd className="mono" style={{
            fontSize: 10, padding: '2px 6px', background: 'var(--bg-2)',
            border: '1px solid var(--line-2)', borderRadius: 5, color: 'var(--text-3)',
          }}>ESC</kbd>
        </div>
        <div style={{ maxHeight: 420, overflow: 'auto', padding: 8 }}>
          {filtered.length === 0 && (
            <div style={{ padding: '40px 16px', textAlign: 'center', color: 'var(--text-3)', fontSize: 14 }}>
              No results for "{q}"
            </div>
          )}
          {Object.entries(grouped).map(([group, list]) => (
            <div key={group} style={{ marginBottom: 8 }}>
              <div style={{
                padding: '8px 12px 4px', fontSize: 10,
                color: 'var(--text-4)', textTransform: 'uppercase',
                letterSpacing: '0.12em', fontFamily: 'var(--font-mono)',
              }}>{group}</div>
              {list.map((it) => {
                runIdx++
                const isActive = runIdx === active
                return (
                  <button
                    key={it.action}
                    role="option" aria-selected={isActive}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                      padding: '10px 12px', borderRadius: 10,
                      background: isActive ? 'var(--surface-2)' : 'transparent',
                      color: 'var(--text)', textAlign: 'left',
                      transition: 'background 120ms ease',
                    }}
                  >
                    <span style={{
                      width: 28, height: 28, borderRadius: 7,
                      background: 'var(--bg-2)', border: '1px solid var(--line)',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--text-2)',
                    }}>{it.icon}</span>
                    <span style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: 10 }}>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{it.label}</span>
                      {it.hint && <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{it.hint}</span>}
                    </span>
                    {isActive && <Icon.arrow size={14} />}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '10px 14px', borderTop: '1px solid var(--line)',
          fontSize: 11, color: 'var(--text-4)', fontFamily: 'var(--font-mono)',
        }}>
          <span style={{ display: 'inline-flex', gap: 14 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><KeyHint keys={['↑', '↓']} /> navigate</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><KeyHint keys={['↵']} /> open</span>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>Powered by Helios <KeyHint keys={['⌘', 'K']} /></span>
        </div>
      </div>
    </div>
  )
}
