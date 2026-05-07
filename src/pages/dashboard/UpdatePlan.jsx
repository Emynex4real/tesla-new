/* Tesla — Update Plan */
import React from 'react'
import { Check, Crown, Gem, Star, Zap, Wallet, ArrowRight } from 'lucide-react'

function AffiliateBadges({ levels }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-4)', marginBottom: 10 }}>
        Affiliate Bonus
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {levels.map((pct, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              border: '1px solid var(--accent-line)',
              background: 'var(--accent-soft)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            }}>
              {pct}%
            </div>
            <span style={{ fontSize: 9, color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Lvl {i + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PlanCard({ title, priceDisplay, badge, icon: Icon, features, affiliateLevels, delay }) {
  const [hovered, setHovered] = React.useState(false)

  return (
    <div
      className={`db-card db-rise db-rise-${delay}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: 28,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        borderColor: hovered ? 'var(--accent-line)' : 'var(--line)',
        boxShadow: hovered ? '0 0 50px oklch(0.78 0.15 145 / 0.18)' : 'none',
        transition: 'border-color 300ms ease, box-shadow 300ms ease',
      }}
    >
      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, transparent 60%, var(--accent-soft) 100%)',
        pointerEvents: 'none',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 300ms ease',
      }} />

      {badge && (
        <div style={{
          position: 'absolute', top: 0, right: 0,
          background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)',
          color: 'var(--bg)', fontSize: 9.5, fontWeight: 700,
          padding: '5px 16px', borderBottomLeftRadius: 14, letterSpacing: '0.1em',
        }}>
          {badge}
        </div>
      )}

      <div style={{ marginBottom: 20, position: 'relative' }}>
        <div style={{
          width: 50, height: 50, borderRadius: 14,
          background: 'var(--bg-2)', border: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--accent)', marginBottom: 16,
          transition: 'transform 250ms ease',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
        }}>
          <Icon size={24} />
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{title}</h3>
        <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.03em', fontFamily: 'var(--font-mono)' }}>
          {priceDisplay} <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--text-3)', fontFamily: 'var(--font-display)' }}>/ USD</span>
        </div>
      </div>

      <div style={{ height: 1, background: 'var(--line)', marginBottom: 20 }} />

      <ul style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
        {features.map((f, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--text-2)' }}>
            <span style={{
              width: 18, height: 18, borderRadius: '50%',
              background: 'var(--accent-soft)', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Check size={11} style={{ color: 'var(--accent)' }} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <AffiliateBadges levels={affiliateLevels} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, position: 'relative' }}>
        <button className="db-btn db-btn-primary db-btn-lg" style={{ gap: 8 }}>
          Invest Now <ArrowRight size={15} />
        </button>
        <button className="db-btn db-btn-ghost db-btn-lg">
          <Wallet size={15} style={{ color: 'var(--text-3)' }} /> Invest Using Balance
        </button>
      </div>
    </div>
  )
}

export default function UpdatePlan() {
  return (
    <div className="db-content">
      <div style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto 40px' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)', marginBottom: 10, letterSpacing: '-0.02em' }}>
          Upgrade Your Portfolio
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-3)', lineHeight: 1.65 }}>
          Select a higher tier to unlock exclusive benefits, faster returns, and increased affiliate bonuses.
        </p>
      </div>

      <div className="db-grid-3">
        <PlanCard
          title="VIP Plan" priceDisplay="3,000.00"
          badge="VIP" icon={Crown} delay={1}
          features={['Returns: Daily ROI', 'Return Amount: $300.00', 'Duration: 90 Times', 'Capital Back: No', 'Support: 24/7 Priority']}
          affiliateLevels={[10, 20, 30, 40, 50]}
        />
        <PlanCard
          title="Investing Plan" priceDisplay="$1k – $2k"
          badge="INVESTING" icon={Gem} delay={2}
          features={['Returns: Weekly ROI', 'Return Amount: 20.00%', 'Duration: Lifetime', 'Capital Back: No', 'Support: Standard']}
          affiliateLevels={[5, 10, 15, 20, 30]}
        />
        <PlanCard
          title="MAX Plan" priceDisplay="$100 – $1k"
          badge="MAX" icon={Star} delay={3}
          features={['Returns: Daily ROI', 'Return Amount: 10.00%', 'Duration: 100 Times', 'Capital Back: No', 'Support: Basic']}
          affiliateLevels={[2, 5, 8, 10, 15]}
        />
        <PlanCard
          title="Tesla Investment" priceDisplay="500.00"
          badge="SPECIAL" icon={Zap} delay={4}
          features={['Returns: Every Hour', 'Return Amount: $10.00', 'Duration: Lifetime', 'Capital Back: No', 'Auto-Reinvestment']}
          affiliateLevels={[8, 12, 16, 20, 30]}
        />
      </div>
    </div>
  )
}
