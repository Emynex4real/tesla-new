/* Tesla — Investment Plans */
import React from 'react'
import { Check, Crown, Zap, Star } from 'lucide-react'

function PlanCard({ title, priceRange, features, icon: Icon, badge, delay }) {
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
        boxShadow: hovered ? '0 0 40px oklch(0.78 0.15 var(--accent-h) / 0.15)' : 'none',
        transition: 'border-color 250ms ease, box-shadow 250ms ease',
      }}
    >
      {badge && (
        <div style={{
          position: 'absolute', top: 0, right: 0,
          background: 'var(--accent)', color: 'var(--bg)',
          fontSize: 10, fontWeight: 700, padding: '4px 14px',
          borderBottomLeftRadius: 10, letterSpacing: '0.08em',
        }}>
          {badge}
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{
          width: 46, height: 46, borderRadius: 12,
          background: 'var(--bg-2)', border: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--accent)', marginBottom: 14,
          transition: 'transform 250ms ease',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
        }}>
          <Icon size={22} />
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{title}</h3>
        <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.03em', fontFamily: 'var(--font-mono)' }}>
          {priceRange} <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--text-3)', fontFamily: 'var(--font-display)' }}>/ USD</span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'linear-gradient(to right, transparent, var(--line), transparent)', marginBottom: 20 }} />

      {/* Features */}
      <ul style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24, listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
        {features.map((f, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--text-2)' }}>
            <span style={{
              width: 18, height: 18, borderRadius: '50%',
              background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, marginTop: 1,
            }}>
              <Check size={11} style={{ color: 'var(--accent)' }} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button className="db-btn db-btn-primary db-btn-lg">Invest Now</button>
        <button className="db-btn db-btn-ghost db-btn-lg">Invest Using Balance</button>
      </div>
    </div>
  )
}

export default function InvestmentPlans() {
  return (
    <div className="db-content">
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Investment Plans</h2>
        <p style={{ fontSize: 13.5, color: 'var(--text-3)' }}>Choose a portfolio strategy that fits your goals.</p>
      </div>

      <div className="db-grid-3">
        <PlanCard
          title="VIP Plan" priceRange="3,000.00"
          icon={Crown} badge="VIP" delay={1}
          features={[
            'Returns: Daily ROI',
            'Return Amount: $300.00 USD',
            'Duration: 90 Times',
            'Capital Back: No',
            'Affiliate Bonus: 10% – 50%',
          ]}
        />
        <PlanCard
          title="Growth Plan" priceRange="$1k – $2k"
          icon={Zap} badge="POPULAR" delay={2}
          features={[
            'Returns: Every Week',
            'Return Amount: 20.00%',
            'Duration: Lifetime',
            'Capital Back: No',
            'Affiliate Bonus: 5% – 30%',
          ]}
        />
        <PlanCard
          title="Starter MAX" priceRange="$100 – $1k"
          icon={Star} badge="NEW" delay={3}
          features={[
            'Returns: Every Day',
            'Return Amount: 10.00%',
            'Duration: 100 Times',
            'Capital Back: No',
            'Affiliate Bonus: 2% – 15%',
          ]}
        />
      </div>
    </div>
  )
}
