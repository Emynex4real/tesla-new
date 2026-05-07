/* Tesla — 2FA Security */
import React from 'react'
import { Shield, Smartphone, Lock, Copy, Check, AlertTriangle } from 'lucide-react'

const SECRET = 'TESLA-8821-SECURE-KEY'

export default function TwoFactorAuth() {
  const [step, setStep]     = React.useState(1)
  const [loading, setLoading] = React.useState(false)
  const [copied, setCopied]   = React.useState(false)

  const generate = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep(2) }, 1400)
  }

  const copy = () => {
    navigator.clipboard.writeText(SECRET).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="db-content">
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <Shield size={26} style={{ color: 'var(--accent)' }} /> Security Center
        </h2>
        <p style={{ fontSize: 13.5, color: 'var(--text-3)' }}>Manage your account protection and authentication methods.</p>
      </div>

      <div className="db-card db-rise" style={{ maxWidth: 680, padding: 36 }}>
        {step === 1 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 58, height: 58, borderRadius: 16,
                background: 'var(--surface-2)', border: '1px solid var(--line)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Smartphone size={28} style={{ color: 'var(--text)' }} />
              </div>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Two-Factor Authentication (2FA)</h3>
                <span style={{
                  fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em',
                  background: 'oklch(0.70 0.20 25 / 0.1)', color: 'var(--neg)',
                  border: '1px solid oklch(0.70 0.20 25 / 0.25)',
                  borderRadius: 6, padding: '3px 8px',
                }}>DISABLED</span>
              </div>
            </div>

            <div style={{
              borderLeft: `3px solid var(--accent)`,
              paddingLeft: 18,
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.65, margin: 0 }}>
                2FA strengthens access security by requiring two methods to verify your identity.
              </p>
              <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.65, margin: 0 }}>
                It protects against phishing, social engineering, and password brute-force attacks.
              </p>
            </div>

            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              background: 'oklch(0.82 0.14 80 / 0.08)', border: '1px solid oklch(0.82 0.14 80 / 0.2)',
              borderRadius: 'var(--radius)', padding: '12px 14px',
            }}>
              <AlertTriangle size={17} style={{ color: 'var(--warn)', flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55, margin: 0 }}>
                We strongly recommend enabling 2FA. Without it, your funds are at a higher risk of unauthorized access.
              </p>
            </div>

            <button
              className="db-btn db-btn-primary"
              onClick={generate}
              disabled={loading}
              style={{ alignSelf: 'flex-start', opacity: loading ? 0.6 : 1 }}
            >
              <Lock size={16} />
              {loading ? 'Generating Keys…' : 'Generate Secret Key to Enable 2FA'}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'oklch(0.78 0.16 155 / 0.1)',
              border: '1px solid oklch(0.78 0.16 155 / 0.25)',
              borderRadius: 'var(--radius)', padding: '12px 14px',
              color: 'var(--pos)',
            }}>
              <Check size={17} />
              <span style={{ fontSize: 13.5, fontWeight: 600 }}>Secret key generated successfully.</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', margin: 0 }}>
                  1. Scan this QR code with your Google Authenticator app:
                </p>
                <div style={{ background: '#fff', padding: 12, borderRadius: 12, display: 'inline-block', width: 'fit-content' }}>
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=ExampleTesla2FA"
                    alt="2FA QR Code"
                    width={160}
                    height={160}
                    style={{ display: 'block' }}
                  />
                </div>
                <div>
                  <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-4)', marginBottom: 8 }}>
                    Or enter code manually:
                  </p>
                  <div
                    onClick={copy}
                    style={{
                      background: 'var(--bg-2)', border: '1px solid var(--line)',
                      borderRadius: 'var(--radius)', padding: '10px 14px',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      cursor: 'pointer', transition: 'border-color 180ms ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--line-2)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}
                  >
                    <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)', letterSpacing: '0.08em' }}>
                      {SECRET}
                    </code>
                    {copied
                      ? <Check size={15} style={{ color: 'var(--pos)' }} />
                      : <Copy size={15} style={{ color: 'var(--text-4)' }} />
                    }
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 10 }}>
                    2. Enter the PIN from Google Authenticator:
                  </p>
                  <input
                    type="text"
                    placeholder="000 000"
                    maxLength={6}
                    className="db-input mono"
                    style={{ textAlign: 'center', fontSize: 22, letterSpacing: '0.4em', padding: '14px 16px' }}
                  />
                </div>
                <button className="db-btn db-btn-primary db-btn-lg" style={{ boxShadow: '0 0 30px oklch(0.78 0.15 145 / 0.3)' }}>
                  Enable 2FA Now
                </button>
                <button
                  className="db-btn"
                  style={{ background: 'none', color: 'var(--text-3)', fontWeight: 400, fontSize: 13 }}
                  onClick={() => setStep(1)}
                >
                  Cancel Setup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
