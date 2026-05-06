/* Tesla — UI primitives */
import React from 'react'

/* ── Button ───────────────────────────────────────── */
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  children,
  className = '',
  ...props
}) {
  const sizes = {
    sm: { padding: '0 12px', height: 32, fontSize: 13, gap: 6, radius: 8 },
    md: { padding: '0 16px', height: 40, fontSize: 14, gap: 8, radius: 10 },
    lg: { padding: '0 22px', height: 48, fontSize: 15, gap: 10, radius: 12 },
  }[size]

  const variants = {
    primary: {
      background: 'var(--accent)',
      color: 'oklch(0.13 0.012 250)',
      border: '1px solid oklch(1 0 0 / 0.1)',
      boxShadow: 'var(--shadow-2), var(--glow)',
    },
    secondary: {
      background: 'var(--surface)',
      color: 'var(--text)',
      border: '1px solid var(--line)',
      boxShadow: 'var(--shadow-1)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-2)',
      border: '1px solid transparent',
    },
    outline: {
      background: 'transparent',
      color: 'var(--text)',
      border: '1px solid var(--line-2)',
    },
    destructive: {
      background: 'var(--neg)',
      color: 'oklch(0.13 0.012 250)',
      border: '1px solid oklch(1 0 0 / 0.1)',
    },
  }[variant]

  const isInteractive = !disabled && !loading

  return (
    <button
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`btn btn-${variant} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: sizes.gap,
        padding: sizes.padding,
        height: sizes.height,
        fontSize: sizes.fontSize,
        fontWeight: 500,
        letterSpacing: '-0.01em',
        borderRadius: `calc(var(--radius) * ${sizes.radius / 12})`,
        cursor: isInteractive ? 'pointer' : 'not-allowed',
        opacity: disabled ? 0.5 : 1,
        transition: 'transform 120ms ease, background 200ms ease, color 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
        whiteSpace: 'nowrap',
        ...variants,
      }}
      onMouseDown={(e) => isInteractive && (e.currentTarget.style.transform = 'translateY(0.5px)')}
      onMouseUp={(e) => isInteractive && (e.currentTarget.style.transform = 'translateY(0)')}
      onMouseLeave={(e) => isInteractive && (e.currentTarget.style.transform = 'translateY(0)')}
      {...props}
    >
      {loading ? <Spinner size={size === 'sm' ? 12 : 14} /> : iconLeft}
      {children}
      {!loading && iconRight}
    </button>
  )
}

export function Spinner({ size = 14 }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: '1.5px solid currentColor',
        borderTopColor: 'transparent',
        animation: 'spin 0.8s linear infinite',
        display: 'inline-block',
      }}
    />
  )
}

/* ── Card ─────────────────────────────────────────── */
export function Card({ children, elevation = 1, padded = true, interactive = false, className = '', style = {}, ...props }) {
  const shadow = { 0: 'none', 1: 'var(--shadow-1)', 2: 'var(--shadow-2)', 3: 'var(--shadow-pop)' }[elevation]
  return (
    <div
      className={`card ${className}`}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius-lg)',
        padding: padded ? 24 : 0,
        boxShadow: shadow,
        transition: 'transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease',
        cursor: interactive ? 'pointer' : 'default',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!interactive) return
        e.currentTarget.style.borderColor = 'var(--accent-line)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        if (!interactive) return
        e.currentTarget.style.borderColor = 'var(--line)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
      {...props}
    >
      {children}
    </div>
  )
}

/* ── Badge ────────────────────────────────────────── */
export function Badge({ tone = 'default', children, dot = false, mono = false, style = {}, ...props }) {
  const tones = {
    default:  { bg: 'var(--surface-2)',              fg: 'var(--text-2)',   border: 'var(--line)' },
    accent:   { bg: 'var(--accent-soft)',             fg: 'var(--accent)',   border: 'var(--accent-line)' },
    positive: { bg: 'oklch(0.78 0.16 155 / 0.12)',   fg: 'var(--pos)',      border: 'oklch(0.78 0.16 155 / 0.3)' },
    negative: { bg: 'oklch(0.70 0.20 25  / 0.12)',   fg: 'var(--neg)',      border: 'oklch(0.70 0.20 25  / 0.3)' },
    warn:     { bg: 'oklch(0.82 0.14 80  / 0.12)',   fg: 'var(--warn)',     border: 'oklch(0.82 0.14 80  / 0.3)' },
  }[tone]
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '3px 9px', borderRadius: 999,
        fontSize: 11, fontWeight: 500, letterSpacing: '0.02em',
        background: tones.bg, color: tones.fg,
        border: `1px solid ${tones.border}`,
        fontFamily: mono ? 'var(--font-mono)' : 'inherit',
        ...style,
      }}
      {...props}
    >
      {dot && (
        <span
          aria-hidden="true"
          style={{
            width: 6, height: 6, borderRadius: '50%',
            background: tones.fg,
            animation: tone === 'positive' ? 'pulse-dot 2s ease-in-out infinite' : 'none',
          }}
        />
      )}
      {children}
    </span>
  )
}

/* ── Input ────────────────────────────────────────── */
export function Input({ label, hint, error, iconLeft, iconRight, id, ...props }) {
  const fid = id || React.useId()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <label htmlFor={fid} style={{ fontSize: 12, color: 'var(--text-2)', fontWeight: 500, letterSpacing: '-0.01em' }}>
          {label}
        </label>
      )}
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '0 12px', height: 42,
          background: 'var(--bg-2)',
          border: `1px solid ${error ? 'var(--neg)' : 'var(--line)'}`,
          borderRadius: 'var(--radius)',
          transition: 'border-color 180ms ease, box-shadow 180ms ease',
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-soft)'; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = error ? 'var(--neg)' : 'var(--line)'; e.currentTarget.style.boxShadow = 'none'; }}
      >
        {iconLeft && <span style={{ color: 'var(--text-3)', display: 'flex' }}>{iconLeft}</span>}
        <input
          id={fid}
          aria-invalid={!!error}
          aria-describedby={hint || error ? `${fid}-hint` : undefined}
          style={{
            flex: 1, background: 'transparent', border: 0, outline: 'none',
            color: 'var(--text)', fontSize: 14, height: '100%',
          }}
          {...props}
        />
        {iconRight && <span style={{ color: 'var(--text-3)', display: 'flex' }}>{iconRight}</span>}
      </div>
      {(hint || error) && (
        <span id={`${fid}-hint`} style={{ fontSize: 12, color: error ? 'var(--neg)' : 'var(--text-3)' }}>
          {error || hint}
        </span>
      )}
    </div>
  )
}

/* ── Tabs ─────────────────────────────────────────── */
export function Tabs({ value, onChange, items, fullWidth = false }) {
  const [internal, setInternal] = React.useState(items[0]?.value)
  const active = value !== undefined ? value : internal
  const set = (v) => { if (onChange) onChange(v); else setInternal(v); }
  const refs = React.useRef({})
  const [bar, setBar] = React.useState({ x: 0, w: 0 })
  React.useLayoutEffect(() => {
    const el = refs.current[active]
    if (!el) return
    setBar({ x: el.offsetLeft, w: el.offsetWidth })
  }, [active, items.length])
  return (
    <div role="tablist" style={{
      position: 'relative',
      display: 'inline-flex',
      gap: 4,
      padding: 4,
      background: 'var(--bg-2)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius)',
      width: fullWidth ? '100%' : 'auto',
    }}>
      <span style={{
        position: 'absolute',
        left: bar.x, width: bar.w, top: 4, bottom: 4,
        background: 'var(--surface-2)',
        borderRadius: 'calc(var(--radius) - 4px)',
        border: '1px solid var(--line)',
        transition: 'left 240ms cubic-bezier(0.2,0.8,0.2,1), width 240ms cubic-bezier(0.2,0.8,0.2,1)',
        zIndex: 0,
      }} />
      {items.map((it) => (
        <button
          key={it.value}
          ref={(el) => (refs.current[it.value] = el)}
          role="tab"
          aria-selected={active === it.value}
          onClick={() => set(it.value)}
          style={{
            position: 'relative', zIndex: 1,
            padding: '8px 14px',
            fontSize: 13, fontWeight: 500,
            color: active === it.value ? 'var(--text)' : 'var(--text-3)',
            transition: 'color 200ms ease',
            flex: fullWidth ? 1 : 'unset',
            display: 'inline-flex', alignItems: 'center', gap: 8, justifyContent: 'center',
          }}
        >
          {it.icon}
          {it.label}
          {it.count !== undefined && (
            <span className="mono" style={{
              fontSize: 11, color: 'var(--text-4)', padding: '1px 6px',
              background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 6,
            }}>{it.count}</span>
          )}
        </button>
      ))}
    </div>
  )
}

/* ── Slider ───────────────────────────────────────── */
export function Slider({ value, onChange, min = 0, max = 100, step = 1, label, format = (v) => v, marks = [] }) {
  const id = React.useId()
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <label htmlFor={id} style={{ fontSize: 12, color: 'var(--text-2)', fontWeight: 500 }}>{label}</label>
          <span className="mono" style={{ fontSize: 16, color: 'var(--text)', fontWeight: 600 }}>{format(value)}</span>
        </div>
      )}
      <div style={{ position: 'relative', height: 28 }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)',
          height: 4, background: 'var(--bg-2)', borderRadius: 999, border: '1px solid var(--line)',
        }} />
        <div style={{
          position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
          height: 4, width: `${pct}%`, background: 'var(--accent)',
          borderRadius: 999, boxShadow: '0 0 12px var(--accent-soft)',
          transition: 'width 80ms linear',
        }} />
        {marks.map((m) => {
          const mp = ((m.value - min) / (max - min)) * 100
          return (
            <span key={m.value} style={{
              position: 'absolute', left: `${mp}%`, top: '50%', transform: 'translate(-50%, -50%)',
              width: 2, height: 10, background: 'var(--line-2)', borderRadius: 1,
            }} />
          )
        })}
        <input
          id={id}
          type="range"
          min={min} max={max} step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-valuemin={min} aria-valuemax={max} aria-valuenow={value}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            opacity: 0, cursor: 'pointer',
          }}
        />
        <span style={{
          position: 'absolute', left: `${pct}%`, top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 18, height: 18, borderRadius: '50%',
          background: 'var(--text)', border: '3px solid var(--accent)',
          boxShadow: '0 4px 12px oklch(0 0 0 / 0.4), 0 0 0 6px var(--accent-soft)',
          pointerEvents: 'none',
          transition: 'transform 80ms ease',
        }} />
      </div>
      {marks.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {marks.map((m) => (
            <span key={m.value} className="mono" style={{ fontSize: 10, color: 'var(--text-4)' }}>{m.label}</span>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── SectionHeading ───────────────────────────────── */
export function SectionHeading({ eyebrow, title, subtitle, align = 'left', maxWidth = 720 }) {
  return (
    <div style={{ textAlign: align, maxWidth, marginInline: align === 'center' ? 'auto' : undefined, marginBottom: 56 }}>
      {eyebrow && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)',
          textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 14,
        }}>
          <span style={{ width: 24, height: 1, background: 'var(--line-2)' }} />
          {eyebrow}
        </div>
      )}
      <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.05, fontWeight: 600, marginBottom: 16, letterSpacing: '-0.025em', textWrap: 'balance' }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: 17, color: 'var(--text-2)', lineHeight: 1.5, textWrap: 'pretty' }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

/* ── Icon set ─────────────────────────────────────── */
const I = (path, opts = {}) => (props) => (
  <svg
    width={props.size || 16} height={props.size || 16} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth={opts.sw || 1.6}
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}
  >
    {path}
  </svg>
)

export const Icon = {
  arrow:       I(<path d="M5 12h14M13 6l6 6-6 6" />),
  arrowDown:   I(<path d="M12 5v14M6 13l6 6 6-6" />),
  arrowUp:     I(<path d="M12 19V5M6 11l6-6 6 6" />),
  chart:       I(<><path d="M3 21V8M9 21V3M15 21v-8M21 21V11" /></>),
  shield:      I(<path d="M12 3l8 4v6c0 5-3.5 8-8 8s-8-3-8-8V7l8-4z" />),
  globe:       I(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>),
  bolt:        I(<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />),
  search:      I(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>),
  command:     I(<path d="M9 6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3z" />),
  check:       I(<path d="M5 12l5 5L20 7" />),
  x:           I(<path d="M6 6l12 12M18 6L6 18" />),
  menu:        I(<path d="M4 6h16M4 12h16M4 18h16" />),
  plus:        I(<path d="M12 5v14M5 12h14" />),
  lock:        I(<><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 1 1 8 0v4" /></>),
  zap:         I(<path d="M13 2L3 14h7l-1 8 11-14h-8l1-6z" />),
  layers:      I(<><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5M3 18l9 5 9-5" /></>),
  cpu:         I(<><rect x="5" y="5" width="14" height="14" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" /></>),
  shieldCheck: I(<><path d="M12 3l8 4v6c0 5-3.5 8-8 8s-8-3-8-8V7l8-4z" /><path d="m9 12 2 2 4-4" /></>),
  wallet:      I(<><rect x="3" y="6" width="18" height="14" rx="2" /><path d="M16 12h2" /></>),
  trending:    I(<path d="M3 17l6-6 4 4 8-8M14 7h7v7" />),
  user:        I(<><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>),
  mail:        I(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 7 9-7" /></>),
  activity:    I(<path d="M3 12h4l3-9 4 18 3-9h4" />),
  book:        I(<path d="M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4V4z" />),
  bell:        I(<><path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9z" /><path d="M10 21a2 2 0 0 0 4 0" /></>),
  star:        I(<path d="m12 3 2.6 6 6.4.6-4.8 4.4 1.4 6.4L12 17l-5.6 3.4L7.8 14 3 9.6l6.4-.6L12 3z" />),
  api:         I(<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 8h2v8H8zM14 8h2v8h-2zM8 12h8" /></>),
  scale:       I(<path d="M12 3v18M3 7h18M7 7l-3 8a3 3 0 0 0 6 0l-3-8zm10 0l-3 8a3 3 0 0 0 6 0l-3-8z" />),
  code:        I(<path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />),
  terminal:    I(<><rect x="2" y="3" width="20" height="16" rx="2" /><path d="M6 9l4 4-4 4M13 17h4" /></>),
  externalLink:I(<><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6M10 14L21 3" /></>),
}

/* ── Tooltip ──────────────────────────────────────── */
export function Tooltip({ children, label, side = 'top' }) {
  const [show, setShow] = React.useState(false)
  return (
    <span style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)} onBlur={() => setShow(false)}
    >
      {children}
      {show && (
        <span role="tooltip" style={{
          position: 'absolute',
          [side === 'top' ? 'bottom' : 'top']: 'calc(100% + 8px)',
          left: '50%', transform: 'translateX(-50%)',
          padding: '6px 10px', fontSize: 12,
          background: 'var(--surface-2)', color: 'var(--text)',
          border: '1px solid var(--line-2)', borderRadius: 8,
          boxShadow: 'var(--shadow-2)', whiteSpace: 'nowrap', pointerEvents: 'none',
          zIndex: 100,
        }}>{label}</span>
      )}
    </span>
  )
}
