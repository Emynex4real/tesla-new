/* Tesla — Withdraw */
import React from 'react'
import { Wallet, Landmark, CreditCard, ArrowRight, AlertCircle, ShieldCheck, X } from 'lucide-react'

function MethodCard({ title, time, fee, icon: Icon, active, onSelect }) {
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
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 10,
          background: active ? 'var(--accent)' : 'var(--bg-2)',
          border: `1px solid ${active ? 'var(--accent)' : 'var(--line)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: active ? 'var(--bg)' : 'var(--text-3)',
        }}>
          <Icon size={20} />
        </div>
        {active && <ShieldCheck size={17} style={{ color: 'var(--accent)' }} />}
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{title}</h3>
      <p style={{ fontSize: 11.5, color: 'var(--text-4)', marginBottom: 10 }}>Processing: {time}</p>
      <div style={{
        display: 'inline-block', fontSize: 11.5,
        fontFamily: 'var(--font-mono)', color: 'var(--text-3)',
        background: 'var(--bg-2)', border: '1px solid var(--line)',
        padding: '3px 8px', borderRadius: 6,
      }}>
        Fee: {fee}
      </div>
    </div>
  )
}

function WithdrawForm({ method, onClose }) {
  const [amount, setAmount] = React.useState('')
  const fee = amount ? (parseFloat(amount) * 0.01).toFixed(2) : '0.00'
  const receive = amount ? Math.max(0, parseFloat(amount) - parseFloat(fee)).toFixed(2) : '0.00'

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
        Withdraw via <span style={{ color: 'var(--accent)' }}>{method.title}</span>
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-3)', display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span>Amount</span>
            <span style={{ color: 'var(--text-4)' }}>Available: $0.00</span>
          </label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-2)' }}>$</span>
            <input
              type="number" placeholder="0.00" value={amount}
              onChange={e => setAmount(e.target.value)}
              className="db-input"
              style={{ paddingLeft: 28, paddingRight: 60 }}
            />
            <button
              style={{
                position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
                background: 'var(--surface-2)', border: 'none', cursor: 'pointer',
                fontSize: 10.5, fontWeight: 700, color: 'var(--text)',
                padding: '4px 8px', borderRadius: 6, fontFamily: 'var(--font-display)',
              }}
              onClick={() => {}}
            >
              MAX
            </button>
          </div>
        </div>

        <div>
          <label style={{ fontSize: 12, color: 'var(--text-3)', display: 'block', marginBottom: 6 }}>
            {method.title === 'USDT (TRC20)' ? 'Wallet Address' : 'Account Number / IBAN'}
          </label>
          <input
            type="text"
            placeholder={method.title === 'USDT (TRC20)' ? 'TR7NHqjeKQxGTCi8q8ZY...' : 'Enter account details'}
            className="db-input mono"
            style={{ fontSize: 13 }}
          />
        </div>

        <div style={{
          background: 'var(--bg-2)', border: '1px solid var(--line)',
          borderRadius: 'var(--radius)', padding: '14px 16px',
          display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}>
            <span style={{ color: 'var(--text-3)' }}>Requested</span>
            <span style={{ color: 'var(--text-2)' }}>${amount || '0.00'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}>
            <span style={{ color: 'var(--text-3)' }}>Processing Fee</span>
            <span style={{ color: 'var(--neg)' }}>-${fee}</span>
          </div>
          <div style={{ height: 1, background: 'var(--line)', margin: '2px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 700 }}>
            <span style={{ color: 'var(--text-2)' }}>You Receive</span>
            <span style={{ color: 'var(--pos)' }}>${receive}</span>
          </div>
        </div>

        <button className="db-btn db-btn-primary db-btn-lg">
          Confirm Withdrawal <ArrowRight size={16} />
        </button>

        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 10,
          background: 'oklch(0.70 0.20 25 / 0.08)',
          border: '1px solid oklch(0.70 0.20 25 / 0.2)',
          borderRadius: 'var(--radius-sm)', padding: '10px 12px',
        }}>
          <AlertCircle size={15} style={{ color: 'var(--neg)', flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.55, margin: 0 }}>
            Please ensure withdrawal details are correct. Transactions on the blockchain cannot be reversed.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Withdraw() {
  const [selected, setSelected] = React.useState(null)

  const methods = [
    { id: 1, title: 'USDT (TRC20)', time: '10–30 Mins',          fee: '1 USD', icon: Wallet   },
    { id: 2, title: 'Bank Transfer', time: '1–3 Business Days',  fee: '2%',    icon: Landmark },
    { id: 3, title: 'PayPal',        time: 'Instant',             fee: '3%',    icon: CreditCard },
  ]

  return (
    <div className="db-content">
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, marginBottom: 28 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Withdraw Funds</h2>
          <p style={{ fontSize: 13.5, color: 'var(--text-3)' }}>Transfer earnings to your external account.</p>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, var(--surface) 0%, var(--bg-2) 100%)',
          border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)',
          padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-4)', marginBottom: 3 }}>Available Balance</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>$0.00</p>
          </div>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'var(--surface-2)', border: '1px solid var(--line)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--pos)',
          }}>
            <Wallet size={18} />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-4)', marginBottom: 14 }}>
            Select Method
          </p>
          <div className="db-grid-2">
            {methods.map(m => (
              <MethodCard
                key={m.id} {...m}
                active={selected?.id === m.id}
                onSelect={() => setSelected(m)}
              />
            ))}
          </div>
        </div>

        <div>
          {selected ? (
            <WithdrawForm method={selected} onClose={() => setSelected(null)} />
          ) : (
            <div style={{
              border: '1px dashed var(--line)', borderRadius: 'var(--radius-lg)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '60px 24px', textAlign: 'center', color: 'var(--text-4)',
              minHeight: 380,
            }}>
              <div className="db-empty-icon" style={{ marginBottom: 14 }}>
                <Landmark size={28} style={{ opacity: 0.4 }} />
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6 }}>Select a withdrawal method<br />to proceed</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
