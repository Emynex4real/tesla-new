/* Tesla — Transfer Money */
import React from 'react'
import { User, DollarSign, Send, ShieldCheck, History } from 'lucide-react'

const CONTACTS = [
  { name: 'Alex',  initials: 'AX' },
  { name: 'Sarah', initials: 'SR' },
  { name: 'David', initials: 'DV' },
]

export default function TransferMoney() {
  const [email,  setEmail]  = React.useState('')
  const [amount, setAmount] = React.useState('')
  const CHARGE = 0.5
  const fees  = amount ? (parseFloat(amount) * (CHARGE / 100)).toFixed(2) : '0.00'
  const total = amount ? (parseFloat(amount) + parseFloat(fees)).toFixed(2) : '0.00'

  return (
    <div className="db-content">
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>

        {/* Left: Transfer form */}
        <div className="db-card db-rise" style={{
          flex: 1, minWidth: 320, padding: 30, position: 'relative', overflow: 'hidden',
        }}>
          {/* Glow */}
          <div style={{
            position: 'absolute', top: -60, right: -60,
            width: 200, height: 200, borderRadius: '50%',
            background: 'var(--accent)', opacity: 0.05, filter: 'blur(60px)',
            pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, position: 'relative' }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Internal Transfer</h2>
              <p style={{ fontSize: 13, color: 'var(--text-3)' }}>Send funds instantly to other users.</p>
            </div>
            <div style={{
              background: 'var(--bg-2)', border: '1px solid var(--line)',
              borderRadius: 'var(--radius)', padding: '8px 14px', textAlign: 'right',
            }}>
              <p style={{ fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-4)', marginBottom: 2 }}>Balance</p>
              <p style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>$0.00</p>
            </div>
          </div>

          {/* Quick contacts */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-4)', marginBottom: 12 }}>
              Recent Contacts
            </p>
            <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 4 }}>
              {CONTACTS.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setEmail(`${c.name.toLowerCase()}@example.com`)}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                    background: 'none', border: 'none', cursor: 'pointer', minWidth: 56,
                  }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: 'var(--surface-2)', border: '2px solid var(--line)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700, color: 'var(--accent)',
                    transition: 'border-color 180ms ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}
                  >
                    {c.initials}
                  </div>
                  <span style={{ fontSize: 10, color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.name}</span>
                </button>
              ))}
              <button style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                background: 'none', border: 'none', cursor: 'pointer', minWidth: 56,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'var(--surface-2)', border: '1px solid var(--line)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-4)',
                }}>
                  <History size={18} />
                </div>
                <span style={{ fontSize: 10, color: 'var(--text-4)' }}>History</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'relative' }}>
            <div>
              <label style={{ fontSize: 12.5, color: 'var(--text-2)', display: 'block', marginBottom: 6 }}>Receiver Email</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-4)' }} />
                <input
                  type="email" className="db-input" placeholder="Enter receiver's email"
                  value={email} onChange={e => setEmail(e.target.value)}
                  style={{ paddingLeft: 38 }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 12.5, color: 'var(--text-2)', display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span>Amount</span>
                <span style={{ color: 'var(--text-4)', fontSize: 11 }}>Min: $1,000 &bull; Max: $10,000</span>
              </label>
              <div style={{ position: 'relative' }}>
                <DollarSign size={16} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-4)' }} />
                <input
                  type="number" className="db-input mono" placeholder="0.00"
                  value={amount} onChange={e => setAmount(e.target.value)}
                  style={{ paddingLeft: 38 }}
                />
              </div>
            </div>

            <div style={{
              background: 'var(--bg-2)', border: '1px solid var(--line)',
              borderRadius: 'var(--radius)', padding: '12px 16px',
              display: 'flex', flexDirection: 'column', gap: 6,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}>
                <span style={{ color: 'var(--text-3)' }}>Transfer Fee ({CHARGE}%)</span>
                <span style={{ color: 'var(--text-2)' }}>${fees}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700 }}>
                <span style={{ color: 'var(--text-2)' }}>Total Deducted</span>
                <span style={{ color: 'var(--neg)' }}>-${total}</span>
              </div>
            </div>

            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              background: 'oklch(0.78 0.15 var(--accent-h) / 0.06)',
              border: '1px solid var(--accent-line)',
              borderRadius: 'var(--radius-sm)', padding: '10px 12px',
            }}>
              <ShieldCheck size={15} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.55, margin: 0 }}>
                Transfers are irreversible. Ensure the receiver's email address is correct before proceeding.
              </p>
            </div>

            <button className="db-btn db-btn-primary db-btn-lg" style={{
              boxShadow: '0 8px 30px oklch(0.78 0.15 var(--accent-h) / 0.25)',
            }}>
              Transfer Funds <Send size={16} />
            </button>
          </div>
        </div>

        {/* Right: Info panel */}
        <div style={{ width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="db-card db-rise db-rise-2" style={{ padding: 22 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Transfer Limits</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[['Minimum', '$1,000.00', 0.1], ['Maximum', '$10,000.00', 1]].map(([label, val, pct]) => (
                <div key={label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 5 }}>
                    <span style={{ color: 'var(--text-3)' }}>{label}</span>
                    <span style={{ color: 'var(--text)', fontWeight: 600 }}>{val}</span>
                  </div>
                  <div style={{ height: 4, background: 'var(--surface-2)', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct * 100}%`, background: 'var(--accent)', borderRadius: 999 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="db-card db-rise db-rise-3" style={{
            padding: 22, position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)',
            border: 'none',
          }}>
            <div style={{ position: 'absolute', right: -20, bottom: -20, opacity: 0.15 }}>
              <Send size={100} style={{ color: 'var(--bg)' }} />
            </div>
            <div style={{ position: 'relative' }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--bg)', marginBottom: 8 }}>Instant Transfer</h3>
              <p style={{ fontSize: 13, color: 'oklch(0.14 0.008 38 / 0.75)', lineHeight: 1.6, margin: 0 }}>
                Zero delay on internal transfers. Funds are credited to the receiver's wallet immediately upon confirmation.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
