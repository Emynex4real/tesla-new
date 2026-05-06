/* Tesla — Pricing page */
import React from 'react'
import { Pricing, Compare, CTA, PageHero } from '../sections'
import { SectionHeading, Button, Card, Icon } from '../ui'

const faqs = [
  {
    q: 'Are there any hidden fees?',
    a: 'No. Tesla charges zero commissions on US stocks and ETFs. Crypto spot trades are 0.20% taker / 0.10% maker. There are no account maintenance fees, no inactivity fees, and no withdrawal fees. You always see the full cost before you confirm a trade.',
  },
  {
    q: 'What is payment for order flow, and does Tesla use it?',
    a: 'Payment for order flow (PFOF) is when a broker sells your trade to a market maker instead of sending it to an exchange. This can result in worse prices for you. Tesla never uses PFOF — your orders are routed directly for best execution.',
  },
  {
    q: 'Can I change my plan at any time?',
    a: 'Yes. You can upgrade or downgrade between Standard, Active, and Elite at any time from your account settings. Downgrades take effect at the end of your current billing cycle.',
  },
  {
    q: 'Is there a minimum balance to open an account?',
    a: 'No. You can open a Tesla account with any amount — even $1. There are no minimum deposit requirements on Standard or Active plans.',
  },
  {
    q: 'How does the 30-day Active trial work?',
    a: 'When you sign up for Active, you get your first 30 days completely free. No credit card is charged until the trial ends. Cancel any time before day 30 and you will never be billed.',
  },
  {
    q: 'What does the Elite plan include for institutions?',
    a: 'Elite gives you a dedicated trading desk, OTC liquidity for block orders, white-glove onboarding, custom reporting and compliance exports, and a dedicated relationship manager. Pricing is based on trading volume — contact our sales team for a quote.',
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

export default function PricingPage({ onAuthOpen }) {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple, honest pricing."
        subtitle="No hidden fees, no payment for order flow, no surprises. Choose the plan that fits your goals and change it any time."
        cta={
          <Button size="lg" onClick={() => onAuthOpen('signup')} iconRight={<Icon.arrow size={14} />}>
            Start for free
          </Button>
        }
      />

      <Pricing onAuthOpen={onAuthOpen} />

      <Compare />

      <section style={{ paddingBlock: 'var(--section-pad)' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <SectionHeading
            eyebrow="FAQ"
            title="Pricing questions, answered."
            subtitle="The most common questions about what you pay — and what you get."
            align="center"
          />
          <FAQ items={faqs} />
        </div>
      </section>

      <CTA onAuthOpen={onAuthOpen} />
    </>
  )
}
