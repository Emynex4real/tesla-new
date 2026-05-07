/* Tesla — Deposit */
import React from 'react'
import { CreditCard, Landmark, Wallet, DollarSign, ArrowRight, X } from 'lucide-react'

function MethodCard({ title, limit, charge, time, icon: Icon, active, onSelect }) {
  return (
    <div
      onClick={onSelect}
      style={{
        padding: 22,
        borderRadius: 'var(--radius-lg)',
        border: `1px solid ${active ? 'var(--accent)' : 'var(--line)'}`,
        background: active ? 'var(--surface-2)' : 'var(--surface)',
        cursor: 'pointer',
        transition: 'border-color 200ms ease, box-shadow 200ms ease, background 200ms ease',
        boxShadow: active ? '0 0 30px oklch(0.78 0.15 var(--accent-h) / 0.2)' : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {active && (
        <div style={{
          position: 'absolute', top: 8, right: 10,
          background: 'var(--accent)', color: 'var(--bg)',
          fontSize: 9, fontWeight: 700, padding: '2px 8px',
          borderRadius: 4, letterSpacing: '0.08em',
        }}>
          SELECTED
        </div>
      )}
      <div style={{
        width: 42, height: 42, borderRadius: 10,
        background: active ? 'var(--accent)' : 'var(--bg-2)',
        border: `1px solid ${active ? 'var(--accent)' : 'var(--line)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: active ? 'var(--bg)' : 'var(--text-3)',
        marginBottom: 14,
      }}>
        <Icon size={20} />
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {[['Limit', limit], ['Charge', charge], ['Process Time', time]].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}>
            <span style={{ color: 'var(--text-3)' }}>{k}</span>
            <span style={{ color: 'var(--text-2)', fontWeight: 500 }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DepositForm({ method, onClose }) {
  const [amount, setAmount] = React.useState('')
  const fee = amount ? (parseFloat(amount) * 0.01).toFixed(2) : '0.00'
  const total = amount ? (parseFloat(amount) + parseFloat(fee)).toFixed(2) : '0.00'

  return (
    <div className="db-card" style={{ padding: 26, position: 'relative' }}>
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 14, right: 14,
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text-3)', padding: 4,
        }}
      >
        <X size={18} />
      </button>

      <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 22 }}>
        Deposit via <span style={{ color: 'var(--accent)' }}>{method.title}</span>
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-3)', display: 'block', marginBottom: 6 }}>Enter Amount</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-2)', fontSize: 14 }}>$</span>
            <input
              type="number" placeholder="0.00" value={amount}
              onChange={e => setAmount(e.target.value)}
              className="db-input"
              style={{ paddingLeft: 28, paddingRight: 50 }}
            />
            <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 11.5, color: 'var(--text-4)' }}>USD</span>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-2)', border: '1px solid var(--line)',
          borderRadius: 'var(--radius)', padding: '14px 16px',
          display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          {[['Conversion Rate', '1 USD = 1.00 USD'], ['Processing Fee', `$${fee}`]].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}>
              <span style={{ color: 'var(--text-3)' }}>{k}</span>
              <span style={{ color: 'var(--text-2)' }}>{v}</span>
            </div>
          ))}
          <div style={{ height: 1, background: 'var(--line)', margin: '4px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 700 }}>
            <span style={{ color: 'var(--text-2)' }}>You Pay</span>
            <span style={{ color: 'var(--accent)' }}>${total}</span>
          </div>
        </div>

        <button className="db-btn db-btn-primary db-btn-lg">
          Confirm Deposit <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}

export default function Deposit() {
  const [selected, setSelected] = React.useState(null)

  const methods = [
    { id: 1, title: 'USDT (TRC20)', limit: '$100 – $100k', charge: '0 + 1%', time: 'Automated',   icon: Wallet },
    { id: 2, title: 'Bank Transfer', limit: '$5k – $500k',  charge: '$20 + 0%', time: '1–3 Days', icon: Landmark },
    { id: 3, title: 'Credit Card',   limit: '$50 – $10k',   charge: '0 + 2.5%', time: 'Instant',  icon: CreditCard },
  ]

  return (
    <div className="db-content">
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Fund Your Account</h2>
        <p style={{ fontSize: 13.5, color: 'var(--text-3)' }}>Securely add capital using our supported payment gateways.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
        <div className="db-grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {methods.map(m => (
            <MethodCard
              key={m.id} {...m}
              active={selected?.id === m.id}
              onSelect={() => setSelected(m)}
            />
          ))}
        </div>

        <div>
          {selected ? (
            <DepositForm method={selected} onClose={() => setSelected(null)} />
          ) : (
            <div style={{
              border: '1px dashed var(--line)', borderRadius: 'var(--radius-lg)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '60px 24px', textAlign: 'center', color: 'var(--text-4)',
              minHeight: 320,
            }}>
              <DollarSign size={40} style={{ opacity: 0.4, marginBottom: 12 }} />
              <p style={{ fontSize: 13.5, lineHeight: 1.6 }}>Select a payment method<br />to proceed</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
