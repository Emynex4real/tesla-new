/* Tesla — Platform page */
import React from 'react'
import { Features, DashboardPreview, CTA, PageHero } from '../sections'
import { SectionHeading, Button, Card, Icon } from '../ui'

const investors = [
  {
    icon: <Icon.user size={22} />,
    title: 'First-time investors',
    desc: 'Start with as little as $1. Our managed portfolios do the heavy lifting — you just watch your money grow with confidence.',
    features: ['Zero account minimums', 'Guided portfolio setup', 'Plain-English reports'],
  },
  {
    icon: <Icon.trending size={22} />,
    title: 'Growing investors',
    desc: 'Take full control with professional-grade tools, real-time data, and advanced analytics built for serious capital.',
    features: ['Self-directed investing', '120+ chart indicators', 'Multi-asset portfolios'],
  },
  {
    icon: <Icon.layers size={22} />,
    title: 'Institutions & advisors',
    desc: 'Institutional-grade execution, white-glove onboarding, and a dedicated relationship manager available around the clock.',
    features: ['Custom reporting & exports', 'OTC liquidity & block routing', 'Dedicated relationship manager'],
  },
]

const security = [
  {
    icon: <Icon.shieldCheck size={20} />,
    title: 'Multi-sig cold storage',
    desc: '$250M crime insurance. 95% of digital assets held offline at all times.',
  },
  {
    icon: <Icon.lock size={20} />,
    title: 'SOC 2 Type II certified',
    desc: 'Annual third-party audits. 256-bit encryption at rest and in transit.',
  },
  {
    icon: <Icon.scale size={20} />,
    title: 'SIPC-insured cash',
    desc: 'Cash balances protected up to $500,000 through SIPC membership.',
  },
  {
    icon: <Icon.globe size={20} />,
    title: 'FINRA registered',
    desc: 'Fully regulated broker-dealer. No payment for order flow — ever.',
  },
]

export default function PlatformPage({ onAuthOpen }) {
  return (
    <>
      <PageHero
        eyebrow="Platform"
        title="The complete investment platform."
        subtitle="Everything you need to invest with confidence — from your first portfolio to institutional-scale execution — all in one product."
        cta={
          <>
            <Button size="lg" onClick={() => onAuthOpen('signup')} iconRight={<Icon.arrow size={14} />}>Open an account</Button>
            <Button size="lg" variant="outline" iconLeft={<Icon.bolt size={14} />}>Watch a demo</Button>
          </>
        }
      />

      <Features />

      <section style={{ paddingBlock: 'var(--section-pad)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Built for everyone"
            title="Wherever you are on your wealth journey."
            subtitle="Tesla grows with you — from your first $100 to a seven-figure institutional portfolio."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {investors.map((inv) => (
              <Card key={inv.title} padded interactive>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 44, height: 44, borderRadius: 12,
                  background: 'var(--accent-soft)', color: 'var(--accent)', marginBottom: 16,
                }}>
                  {inv.icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{inv.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 18 }}>{inv.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {inv.features.map((f) => (
                    <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'var(--text-3)' }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0 }}><Icon.check size={13} /></span>
                      {f}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <DashboardPreview />

      <section style={{ paddingBlock: 'var(--section-pad)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Security"
            title="Your wealth is protected at every layer."
            subtitle="We use the same infrastructure as the world's largest financial institutions — so you never have to worry."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {security.map((s) => (
              <Card key={s.title} padded>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 40, height: 40, borderRadius: 10,
                  background: 'var(--accent-soft)', color: 'var(--accent)', marginBottom: 14,
                }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.6 }}>{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTA onAuthOpen={onAuthOpen} />
    </>
  )
}
