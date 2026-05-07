/* Tesla — Compare page */
import React from 'react'
import { Compare, CTA, PageHero } from '../sections'
import { SectionHeading, Button, Card, Icon, Badge } from '../ui'

const advantages = [
  {
    icon: <Icon.scale size={24} />,
    title: 'Fully transparent fee structure',
    desc: 'Most investment firms bury fees inside fund structures, performance cuts, and management layers. We charge a single, clearly stated advisory fee. No performance penalties, no hidden layers, no surprises on your statement.',
    stat: '0%',
    statLabel: 'Hidden charges',
  },
  {
    icon: <Icon.shieldCheck size={24} />,
    title: 'Institutional-grade custody',
    desc: 'Client investments are held in fully segregated accounts at tier-1 custodian banks — the same standard used by sovereign wealth funds and large family offices. SIPC-insured up to $500,000 with independent third-party audits.',
    stat: '$500K',
    statLabel: 'SIPC insured',
  },
  {
    icon: <Icon.user size={24} />,
    title: 'Real humans, 24/7',
    desc: 'When something matters, you need a person — not a chatbot or a knowledge base article. Tesla provides a live concierge desk staffed around the clock by real investment professionals who know your account and can act immediately.',
    stat: '24/7',
    statLabel: 'Live concierge',
  },
]

const whySwitch = [
  { label: 'Average saving vs legacy broker fees',   value: '$400+',  sub: 'per year on a $50K portfolio' },
  { label: 'Faster order fills vs neobank routing',  value: '3×',     sub: 'faster average execution'    },
  { label: 'Client retention rate',                  value: '98%',    sub: 'stay after 12 months'         },
]

export default function ComparePage({ onAuthOpen }) {
  return (
    <>
      <PageHero
        eyebrow="Compare"
        title="See how we stack up."
        subtitle="A transparent, line-by-line comparison between Tesla and the alternatives. No spin — just facts."
      />

      <Compare />

      <section style={{ paddingBlock: 'var(--section-pad)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Why Tesla"
            title="Three things we do differently."
            subtitle="These aren't minor improvements — they're the reasons investors who switch don't go back."
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {advantages.map((a, i) => (
              <Card key={a.title} padded interactive className="flex flex-col gap-6 sm:grid sm:gap-8 sm:items-center" style={{ gridTemplateColumns: '1fr auto' }}>
                <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 48, height: 48, borderRadius: 14,
                    background: 'var(--accent-soft)', color: 'var(--accent)', flexShrink: 0,
                  }}>
                    {a.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{a.title}</h3>
                    <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 680 }}>{a.desc}</p>
                  </div>
                </div>
                <div className="text-center border-t pt-4 sm:border-t-0 sm:pt-0 sm:pl-8 sm:border-l [border-color:var(--line)]" style={{ minWidth: 120 }}>
                  <div className="mono" style={{ fontSize: 28, fontWeight: 700, color: 'var(--accent)', letterSpacing: '-0.02em' }}>{a.stat}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{a.statLabel}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingBlock: 'var(--section-pad)', background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="By the numbers"
            title="The difference in your pocket."
            subtitle="Real numbers from real investors who moved to Tesla."
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {whySwitch.map((w) => (
              <Card key={w.label} padded style={{ textAlign: 'center' }}>
                <div className="mono" style={{ fontSize: 40, fontWeight: 700, color: 'var(--accent)', letterSpacing: '-0.03em', marginBottom: 8 }}>{w.value}</div>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6 }}>{w.label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-4)' }}>{w.sub}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingBlock: 'var(--section-pad)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Ready to switch?"
            title="Moving to Tesla takes 10 minutes."
            subtitle="Transfer your existing investments with our automated ACATS transfer. No selling, no tax events, no paperwork."
            align="center"
          />
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button size="lg" onClick={() => onAuthOpen('signup')} iconRight={<Icon.arrow size={14} />}>Open an account</Button>
            <Button size="lg" variant="outline">Learn about transfers</Button>
          </div>
          <div style={{ marginTop: 24, textAlign: 'center', fontSize: 12, color: 'var(--text-4)' }}>
            ACATS transfers are free. No exit fees. Your positions transfer in kind — no selling required.
          </div>
        </div>
      </section>

      <CTA onAuthOpen={onAuthOpen} />
    </>
  )
}
