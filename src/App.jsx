/* Tesla — app shell */
import React from 'react'
import { useTweaks, TweaksPanel, TweakSection, TweakSlider, TweakRadio } from './tweaks'
import {
  NavBar, Hero, TrustStrip, Features, Simulator, Pricing,
  Compare, Docs, DashboardPreview, CTA, Footer, MarketTicker,
} from './sections'
import { CommandPalette } from './composites'
import { AuthDialog } from './auth'

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (this.state.error) return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 16, padding: 32, textAlign: 'center',
      }}>
        <div style={{ fontSize: 40 }}>⚠️</div>
        <h1 style={{ fontSize: 22, fontWeight: 600 }}>Something went wrong</h1>
        <p style={{ color: 'var(--text-3)', fontSize: 14, maxWidth: 400 }}>
          {this.state.error.message}
        </p>
        <button
          onClick={() => this.setState({ error: null })}
          style={{
            padding: '10px 20px', borderRadius: 8, background: 'var(--accent)',
            color: '#fff', fontWeight: 500, fontSize: 14, marginTop: 8,
          }}
        >
          Try again
        </button>
      </div>
    )
    return this.props.children
  }
}

const TWEAK_DEFAULTS = {
  accentHue: 245,
  glow: 0.35,
  radius: 12,
  heroLayout: 'split',
  density: 1.0,
}

function App() {
  const [cmdOpen, setCmdOpen] = React.useState(false)
  const [auth, setAuth] = React.useState({ open: false, mode: 'signup' })
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS)

  React.useEffect(() => {
    const r = document.documentElement
    r.style.setProperty('--accent-h', t.accentHue)
    r.style.setProperty('--glow-strength', t.glow)
    r.style.setProperty('--radius', t.radius + 'px')
    r.style.setProperty('--density', t.density)
  }, [t.accentHue, t.glow, t.radius, t.density])

  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCmdOpen((v) => !v)
      }
      if (e.key === 'Escape') {
        setCmdOpen(false)
        setAuth((a) => ({ ...a, open: false }))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const openAuth = (mode) => setAuth({ open: true, mode })
  const closeAuth = () => setAuth((a) => ({ ...a, open: false }))

  return (
    <>
      <NavBar onCmdK={() => setCmdOpen(true)} onAuthOpen={openAuth} />
      <MarketTicker />
      <main>
        <Hero onAuthOpen={openAuth} layout={t.heroLayout} />
        <TrustStrip />
        <Features />
        <Simulator />
        <Pricing onAuthOpen={openAuth} />
        <Compare />
        <Docs />
        <DashboardPreview />
        <CTA onAuthOpen={openAuth} />
      </main>
      <Footer />

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
      <AuthDialog open={auth.open} mode={auth.mode} onClose={closeAuth} />

      <TweaksPanel>
        <TweakSection label="Brand" />
        <TweakSlider label="Accent hue" value={t.accentHue} min={0} max={360} step={1}
          unit="°" onChange={(v) => setTweak('accentHue', v)} />
        <TweakSlider label="Glow" value={t.glow} min={0} max={1} step={0.05}
          onChange={(v) => setTweak('glow', v)} />
        <TweakSlider label="Radius" value={t.radius} min={0} max={24} step={1}
          unit="px" onChange={(v) => setTweak('radius', v)} />
        <TweakSection label="Layout" />
        <TweakRadio label="Hero" value={t.heroLayout}
          options={['split', 'centered']}
          onChange={(v) => setTweak('heroLayout', v)} />
        <TweakSlider label="Density" value={t.density} min={0.7} max={1.3} step={0.05}
          onChange={(v) => setTweak('density', v)} />
      </TweaksPanel>
    </>
  )
}

export default function Root() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  )
}
