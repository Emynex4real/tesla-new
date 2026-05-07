/* Tesla — Dashboard home overview */
import React from 'react'
import { Download, Upload, TrendingUp, Clock, Users, Wallet, Copy, Check } from 'lucide-react'

function StatCard({ title, value, icon: Icon, accentColor, delay }) {
  return (
    <div className={`db-card db-rise db-rise-${delay}`} style={{ padding: 22, position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', right: -16, top: -16,
        width: 80, height: 80, borderRadius: '50%',
        background: accentColor,
        opacity: 0.12, filter: 'blur(20px)',
      }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative' }}>
        <div>
          <p style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 500, marginBottom: 6 }}>{title}</p>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.03em' }}>{value}</h3>
        </div>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: 'var(--surface-2)', border: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: accentColor,
        }}>
          <Icon size={18} />
        </div>
      </div>
    </div>
  )
}

function BalanceCard({ setView }) {
  return (
    <div className="db-card db-rise" style={{
      gridColumn: 'span 2',
      padding: 32,
      background: 'linear-gradient(135deg, var(--surface) 0%, var(--bg-2) 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* decorative wallet icon */}
      <div style={{
        position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)',
        opacity: 0.05,
      }}>
        <Wallet size={120} />
      </div>
      {/* glow */}
      <div style={{
        position: 'absolute', top: -40, left: -40,
        width: 200, height: 200, borderRadius: '50%',
        background: 'var(--accent)', opacity: 0.06, filter: 'blur(60px)',
      }} />

      <div style={{ position: 'relative' }}>
        <p style={{ fontSize: 12.5, color: 'var(--text-3)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--pos)', display: 'inline-block', animation: 'pulse-dot 2s ease infinite' }} />
          Total Balance
        </p>
        <h2 style={{ fontSize: 52, fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--text)', lineHeight: 1, marginBottom: 28 }}>
          <span style={{ fontSize: 28, color: 'var(--text-3)', verticalAlign: 'super', marginRight: 6 }}>$</span>
          0.00
        </h2>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="db-btn db-btn-primary" onClick={() => setView('deposit')}>
            <Download size={15} /> Deposit
          </button>
          <button className="db-btn db-btn-ghost" onClick={() => setView('withdraw')}>
            <Upload size={15} /> Withdraw
          </button>
        </div>
      </div>
    </div>
  )
}

function ReferralSection() {
  const [copied, setCopied] = React.useState(false)
  const link = 'https://teslaxasset.com/register/ref-demo'

  const copy = () => {
    navigator.clipboard.writeText(link).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="db-card db-rise db-rise-6" style={{ padding: 22, marginTop: 20 }}>
      <h4 style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <Users size={16} style={{ color: 'var(--accent)' }} /> Referral Link
      </h4>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{
          flex: 1, background: 'var(--bg-2)', border: '1px solid var(--line)',
          borderRadius: 'var(--radius)', padding: '10px 14px',
          fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-3)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {link}
        </div>
        <button
          onClick={copy}
          className="db-btn"
          style={{
            background: copied ? 'var(--pos)' : 'var(--accent)',
            color: 'var(--bg)', minWidth: 90,
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  )
}

export default function DashboardHome({ setView }) {
  return (
    <div className="db-content">
      {/* Row 1: balance card (wide) + 2 quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 20 }}>
        <BalanceCard setView={setView} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <StatCard title="Total Deposit"  value="$0.00" icon={Download} accentColor="var(--pos)"    delay={1} />
          <StatCard title="Total Withdraw" value="$0.00" icon={Upload}   accentColor="oklch(0.75 0.18 50)" delay={2} />
        </div>
      </div>

      {/* Row 2: 4 secondary stats */}
      <div className="db-grid-4" style={{ marginBottom: 20 }}>
        <StatCard title="Total Invested"    value="$0.00" icon={TrendingUp} accentColor="oklch(0.75 0.18 50)"  delay={3} />
        <StatCard title="Pending Invest"    value="$0.00" icon={Clock}      accentColor="oklch(0.80 0.15 200)" delay={4} />
        <StatCard title="Pending Withdraw"  value="$0.00" icon={Clock}      accentColor="oklch(0.75 0.15 250)" delay={5} />
        <StatCard title="Referral Earnings" value="$0.00" icon={Users}      accentColor="var(--pos)"           delay={6} />
      </div>

      {/* Referral link */}
      <ReferralSection />

      {/* Network tree placeholder */}
      <div className="db-card db-rise db-rise-6" style={{ marginTop: 20, padding: 0 }}>
        <div className="db-empty" style={{ padding: '60px 24px' }}>
          <div className="db-empty-icon">
            <Users size={28} style={{ color: 'var(--text-4)' }} />
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: 0 }}>No References Found</h3>
          <p style={{ fontSize: 13, color: 'var(--text-3)', maxWidth: 360, lineHeight: 1.6, margin: 0 }}>
            Share your referral link to build your network. Your reference tree will appear here once you have active referrals.
          </p>
        </div>
      </div>
    </div>
  )
}
