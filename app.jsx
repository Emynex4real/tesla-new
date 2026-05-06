/* Helios Capital — app shell */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentHue": 245,
  "glow": 0.35,
  "radius": 12,
  "heroLayout": "split",
  "density": 1.0
}/*EDITMODE-END*/;

function App() {
  const [cmdOpen, setCmdOpen] = React.useState(false);
  const [auth, setAuth] = React.useState({ open: false, mode: 'signup' });
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks to root
  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--accent-h', t.accentHue);
    r.style.setProperty('--glow-strength', t.glow);
    r.style.setProperty('--radius', t.radius + 'px');
    r.style.setProperty('--density', t.density);
  }, [t.accentHue, t.glow, t.radius, t.density]);

  // Cmd+K / mode prefill
  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
      if (e.key === 'Escape') {
        setCmdOpen(false);
        setAuth((a) => ({ ...a, open: false }));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openAuth = (mode) => setAuth({ open: true, mode });
  const closeAuth = () => setAuth((a) => ({ ...a, open: false }));

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
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
