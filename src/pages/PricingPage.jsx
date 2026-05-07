/* Tesla — Pricing page */
import React from 'react'
import { Pricing, Compare, CTA, PageHero } from '../sections'
import { SectionHeading, Button, Card, Icon } from '../ui'

const faqs = [
  {
    q: 'Are there any hidden fees?',
    a: 'No. Advisory fees are clearly stated in your investment agreement and shown transparently on your dashboard. There are no account maintenance fees, no inactivity fees, and no withdrawal fees. You always see exactly what you pay.',
  },
  {
    q: 'What is the minimum investment amount?',
    a: 'Our Foundation tier starts at $5,000. Higher tiers begin at $10,000, $20,000, $30,000, $50,000, and $100,000. Each tier is designed to deliver proportionally higher projected returns as your capital grows.',
  },
  {
    q: 'Can I change my investment tier at any time?',
    a: 'Yes. You can upgrade from Starter to Active or Elite at any time from your account dashboard. Our team will guide you through the process and ensure a smooth transition with no disruption to your portfolio.',
  },
  {
    q: 'How are my funds protected?',
    a: 'All client funds are held in fully segregated accounts at tier-1 custodian banks. Cash balances are SIPC-insured up to $500,000. We are registered and regulated, and your funds are never commingled with company assets.',
  },
  {
    q: 'How quickly can I access my returns?',
    a: 'Withdrawal requests are processed within 1–3 business days. There are no lock-up periods. You can submit a withdrawal at any time directly from your dashboard.',
  },
  {
    q: 'What does the Elite plan include?',
    a: 'The Tesla Elite plan ($50,000+, unlimited cap) gives you our highest daily ROI of 3.0%, a dedicated relationship manager, bespoke portfolio strategy, weekly performance briefings, and access to exclusive investment opportunities not available on lower tiers.',
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
        eyebrow="Investment Packages"
        title="Choose the tier that aligns with your financial goals."
        subtitle="Transparent returns, dedicated support, and clear performance reporting — at every level."
        cta={
          <Button size="lg" onClick={() => onAuthOpen('signup')} iconRight={<Icon.arrow size={14} />}>
            Start Investing
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
