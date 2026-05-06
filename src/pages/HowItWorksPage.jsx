/* Tesla — How it works page */
import React from 'react'
import { Docs, Simulator, CTA, PageHero } from '../sections'
import { SectionHeading, Button, Card, Icon } from '../ui'

const faqs = [
  {
    q: 'Do I need any investment experience to get started?',
    a: 'No experience needed. Tesla is designed for everyone — from complete beginners to seasoned investors. Our managed portfolios are built by professionals, so you can invest confidently from day one without knowing anything about financial markets.',
  },
  {
    q: 'How long does it take to open an account?',
    a: 'Most accounts are approved in under 2 minutes. You will need a government-issued photo ID and a few personal details. Once approved, you can fund your account immediately.',
  },
  {
    q: 'How do I deposit money into my Tesla account?',
    a: 'You can connect your bank account and transfer funds via ACH (usually same-day) or wire transfer. There are no deposit fees, and there is no minimum amount required.',
  },
  {
    q: 'What is a managed portfolio?',
    a: 'A managed portfolio is a pre-built, professionally designed mix of investments tailored to a risk level — Conservative, Balanced, or Growth. Our investment team selects and rebalances the holdings for you, so you do not need to make individual stock picks.',
  },
  {
    q: 'Can I withdraw my money at any time?',
    a: 'Yes. You can request a withdrawal at any time. Funds typically arrive in your bank account within 1–2 business days. There are no withdrawal fees and no lock-up periods.',
  },
  {
    q: 'Is my money safe if Tesla closes?',
    a: 'Yes. Your securities are held in your name through our clearing partner, not on Tesla\'s balance sheet. Cash is SIPC-insured up to $500,000. Even if Tesla ceased operating, your assets would be fully recoverable.',
  },
]

function FAQ({ items }) {
  const [open, setOpen] = React.useState(null)
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: '1px solid var(--line)' }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '20px 0', fontSize: 15, fontWeight: 500, color: 'var(--text)',
              background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16,
            }}
          >
            <span>{item.q}</span>
            <span style={{
              color: 'var(--accent)', flexShrink: 0, display: 'inline-flex',
              transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
              transition: 'transform 200ms ease',
            }}>
              <Icon.plus size={16} />
            </span>
          </button>
          {open === i && (
            <div style={{ paddingBottom: 20, fontSize: 14, color: 'var(--text-3)', lineHeight: 1.7 }}>
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

const support = [
  {
    icon: <Icon.user size={20} />,
    title: 'Dedicated concierge',
    desc: 'Every account gets access to a real human support team available 24 hours a day, 7 days a week — no chatbots.',
  },
  {
    icon: <Icon.book size={20} />,
    title: 'Investor education',
    desc: 'Free access to guides, webinars, and market explainers written in plain English — no finance degree required.',
  },
  {
    icon: <Icon.bell size={20} />,
    title: 'Smart alerts',
    desc: 'Set price alerts, portfolio milestones, and news notifications so you stay informed without checking constantly.',
  },
]

export default function HowItWorksPage({ onAuthOpen }) {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="Start investing in minutes."
        subtitle="You do not need to be a financial expert. Tesla handles the complexity so you can focus on what matters — building wealth."
        cta={
          <Button size="lg" onClick={() => onAuthOpen('signup')} iconRight={<Icon.arrow size={14} />}>
            Open a free account
          </Button>
        }
      />

      <Docs />

      <section style={{ paddingBlock: 'var(--section-pad)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="We're here to help"
            title="Support every step of the way."
            subtitle="From your first deposit to your first million, our team is always available."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {support.map((s) => (
              <Card key={s.title} padded interactive>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 44, height: 44, borderRadius: 12,
                  background: 'var(--accent-soft)', color: 'var(--accent)', marginBottom: 16,
                }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Simulator />

      <section style={{ paddingBlock: 'var(--section-pad)' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions from new investors."
            subtitle="Everything you need to know before opening your account."
            align="center"
          />
          <FAQ items={faqs} />
        </div>
      </section>

      <CTA onAuthOpen={onAuthOpen} />
    </>
  )
}
