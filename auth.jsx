/* Helios Capital — auth flow (multi-step signup with OTP) */

function AuthDialog({ open, mode, onClose }) {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={mode === 'login' ? 'Sign in' : 'Open account'}
      style={{
        position: 'fixed', inset: 0, zIndex: 150,
        background: 'oklch(0 0 0 / 0.55)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, animation: 'fadein 200ms ease',
      }}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(440px, 100%)',
          background: 'var(--surface)', border: '1px solid var(--line-2)',
          borderRadius: 18, boxShadow: 'var(--shadow-pop)', overflow: 'hidden',
          maxHeight: 'calc(100vh - 48px)', display: 'flex', flexDirection: 'column',
        }}
      >
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '18px 20px', borderBottom: '1px solid var(--line)',
        }}>
          <Logo />
          <button aria-label="Close" onClick={onClose}
            style={{
              width: 32, height: 32, borderRadius: 8, color: 'var(--text-3)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-2)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          ><Icon.x size={16} /></button>
        </div>
        <div style={{ overflow: 'auto' }}>
          {mode === 'login' ? <LoginFlow onClose={onClose} /> : <SignupFlow onClose={onClose} />}
        </div>
      </div>
    </div>
  );
}

function LoginFlow({ onClose }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const submit = (e) => {
    e.preventDefault();
    setError(null);
    if (!email.includes('@')) { setError('Enter a valid email'); return; }
    if (password.length < 4) { setError('Password is required'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onClose(); }, 1100);
  };

  return (
    <form onSubmit={submit} style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>Welcome back</h2>
        <p style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>Sign in to your Helios account.</p>
      </div>
      <Input label="Email" type="email" autoComplete="email" required
        value={email} onChange={(e) => setEmail(e.target.value)}
        iconLeft={<Icon.mail size={14} />} placeholder="you@example.com" />
      <Input label="Password" type="password" autoComplete="current-password" required
        value={password} onChange={(e) => setPassword(e.target.value)}
        iconLeft={<Icon.lock size={14} />} placeholder="••••••••" />
      {error && (
        <div role="alert" style={{
          padding: '10px 12px', borderRadius: 8,
          background: 'oklch(0.7 0.2 25 / 0.1)', border: '1px solid oklch(0.7 0.2 25 / 0.3)',
          color: 'var(--neg)', fontSize: 12.5,
        }}>{error}</div>
      )}
      <Button type="submit" loading={loading} size="lg" style={{ width: '100%', marginTop: 4 }} iconRight={<Icon.arrow size={14} />}>
        {loading ? 'Authenticating' : 'Sign in'}
      </Button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        <span style={{ fontSize: 11, color: 'var(--text-4)' }}>OR</span>
        <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
      </div>
      <div style={{ display: 'grid', gap: 8 }}>
        <Button variant="secondary" size="md" iconLeft={<Icon.wallet size={14} />}>Connect wallet</Button>
        <Button variant="ghost" size="sm">Forgot password?</Button>
      </div>
    </form>
  );
}

function SignupFlow({ onClose }) {
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState({ email: '', name: '', otp: ['', '', '', '', '', ''], funding: '' });
  const [loading, setLoading] = React.useState(false);

  const totalSteps = 4;
  const next = (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep((s) => s + 1); }, 700);
  };

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        {Array.from({ length: totalSteps }).map((_, i) => (
          <span key={i} style={{
            flex: 1, height: 3, borderRadius: 999,
            background: i < step ? 'var(--accent)' : 'var(--bg-2)',
            transition: 'background 240ms ease',
          }} />
        ))}
      </div>

      {step === 1 && (
        <form onSubmit={next} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-4)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em' }}>STEP 1 / 4</div>
            <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 6, letterSpacing: '-0.02em' }}>Create your account</h2>
            <p style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>Takes about 90 seconds.</p>
          </div>
          <Input label="Full name" required value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            iconLeft={<Icon.user size={14} />} placeholder="Maya Chen" />
          <Input label="Email" type="email" required value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            iconLeft={<Icon.mail size={14} />} placeholder="you@example.com" />
          <Button type="submit" size="lg" loading={loading} style={{ width: '100%', marginTop: 4 }} iconRight={<Icon.arrow size={14} />}>Continue</Button>
          <div style={{ fontSize: 11.5, color: 'var(--text-4)', textAlign: 'center', lineHeight: 1.5 }}>
            By continuing you agree to our <a href="#" style={{ color: 'var(--text-2)', textDecoration: 'underline' }}>Terms</a> and <a href="#" style={{ color: 'var(--text-2)', textDecoration: 'underline' }}>Privacy Policy</a>.
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={next} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-4)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em' }}>STEP 2 / 4</div>
            <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 6, letterSpacing: '-0.02em' }}>Verify your email</h2>
            <p style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>
              We sent a 6-digit code to <strong style={{ color: 'var(--text)' }}>{data.email || 'your email'}</strong>.
            </p>
          </div>
          <OTPInput value={data.otp} onChange={(v) => setData({ ...data, otp: v })} />
          <Button type="submit" size="lg" loading={loading} style={{ width: '100%' }} iconRight={<Icon.arrow size={14} />}>Verify</Button>
          <Button variant="ghost" size="sm">Resend code</Button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={next} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-4)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em' }}>STEP 3 / 4</div>
            <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 6, letterSpacing: '-0.02em' }}>Pick a funding method</h2>
            <p style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>You can change this any time.</p>
          </div>
          {[
            { v: 'bank', l: 'Bank transfer (ACH)', s: 'Free · 1–2 business days' },
            { v: 'card', l: 'Debit card', s: 'Instant · 1.5% fee' },
            { v: 'wallet', l: 'Connect a crypto wallet', s: 'Sign with Phantom, Rainbow, or WalletConnect' },
            { v: 'wire', l: 'Wire transfer', s: 'Same-day · for deposits over $50K' },
          ].map((f) => (
            <button key={f.v} type="button" onClick={() => setData({ ...data, funding: f.v })}
              aria-pressed={data.funding === f.v}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 16px', borderRadius: 12,
                background: 'var(--bg-2)',
                border: data.funding === f.v ? '1px solid var(--accent)' : '1px solid var(--line)',
                boxShadow: data.funding === f.v ? '0 0 0 3px var(--accent-soft)' : 'none',
                color: 'var(--text)', textAlign: 'left',
                transition: 'border-color 180ms, box-shadow 180ms',
              }}
            >
              <span>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{f.l}</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{f.s}</div>
              </span>
              <span style={{
                width: 18, height: 18, borderRadius: '50%',
                border: '2px solid ' + (data.funding === f.v ? 'var(--accent)' : 'var(--line-2)'),
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {data.funding === f.v && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />}
              </span>
            </button>
          ))}
          <Button type="submit" size="lg" loading={loading} disabled={!data.funding} style={{ width: '100%' }} iconRight={<Icon.arrow size={14} />}>
            Continue
          </Button>
        </form>
      )}

      {step === 4 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, textAlign: 'center', padding: '12px 0' }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'var(--accent-soft)', color: 'var(--accent)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto', boxShadow: '0 0 0 8px var(--accent-soft)',
          }}><Icon.check size={26} /></div>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>You're in.</h2>
            <p style={{ fontSize: 13.5, color: 'var(--text-3)', marginTop: 6, lineHeight: 1.55 }}>
              Welcome to Helios, {data.name?.split(' ')[0] || 'trader'}. We've sent your account details to {data.email}.
            </p>
          </div>
          <Button onClick={onClose} size="lg" iconRight={<Icon.arrow size={14} />}>Go to dashboard</Button>
        </div>
      )}
    </div>
  );
}

function OTPInput({ value, onChange }) {
  const refs = React.useRef([]);
  const set = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...value]; next[i] = v;
    onChange(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };
  const onKey = (i, e) => {
    if (e.key === 'Backspace' && !value[i] && i > 0) refs.current[i - 1]?.focus();
  };
  const onPaste = (e) => {
    const txt = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!txt) return;
    e.preventDefault();
    const next = [...value];
    for (let i = 0; i < 6; i++) next[i] = txt[i] || '';
    onChange(next);
    refs.current[Math.min(txt.length, 5)]?.focus();
  };
  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }} onPaste={onPaste}>
      {value.map((d, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          type="text" inputMode="numeric" maxLength={1}
          aria-label={`Digit ${i + 1}`}
          value={d}
          onChange={(e) => set(i, e.target.value)}
          onKeyDown={(e) => onKey(i, e)}
          onFocus={(e) => e.target.select()}
          style={{
            width: 48, height: 56, textAlign: 'center',
            background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 12,
            fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 500,
            color: 'var(--text)', outline: 'none',
            transition: 'border-color 180ms, box-shadow 180ms',
          }}
          onFocusCapture={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-soft)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'var(--line)'; e.target.style.boxShadow = 'none'; }}
        />
      ))}
    </div>
  );
}

Object.assign(window, { AuthDialog });
