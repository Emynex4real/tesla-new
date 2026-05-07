/* Tesla — Markets page */
import React from 'react'
import { DashboardPreview, CTA, PageHero } from '../sections'
import { SectionHeading, Button, Card, Icon, Badge } from '../ui'
import { Candlestick } from '../composites'

const assetClasses = [
  {
    icon: <Icon.chart size={22} />,
    name: 'US Equities',
    badge: '$0 commission',
    desc: 'Invest in thousands of US stocks and ADRs with zero commission, fractional shares, and real-time pricing.',
    features: ['Fractional shares from $1', 'Extended-hours trading', 'Dividend reinvestment', 'Real-time quotes'],
  },
  {
    icon: <Icon.layers size={22} />,
    name: 'ETFs & Funds',
    badge: 'Instant diversification',
    desc: 'Diversify across sectors, themes, and geographies instantly with over 2,000 commission-free ETFs.',
    features: ['2,000+ ETFs', 'Sector & thematic funds', 'Auto-rebalancing', 'Dividend tracking'],
  },
  {
    icon: <Icon.bolt size={22} />,
    name: 'Real Estate',
    badge: 'Passive income',
    desc: 'Access institutional-grade real estate investment trusts (REITs) and earn passive rental income without owning property.',
    features: ['Diversified REIT portfolios', 'Quarterly dividend income', 'Low minimum investment', 'Liquid & tradeable'],
  },
  {
    icon: <Icon.trending size={22} />,
    name: 'Options',
    badge: 'Advanced strategies',
    desc: 'Single and multi-leg options with live Greeks, P&L visualisation, and smart order routing.',
    features: ['Spreads & condors', 'Live Greeks display', 'Expiry calendar', 'Roll positions easily'],
  },
  {
    icon: <Icon.globe size={22} />,
    name: 'Forex',
    badge: 'Institutional spreads',
    desc: 'Access 40+ currency pairs around the clock with tight institutional spreads and no hidden markups.',
    features: ['40+ currency pairs', 'Tight bid-ask spreads', '24/5 trading', 'Live exchange rates'],
  },
  {
    icon: <Icon.activity size={22} />,
    name: 'Futures',
    badge: 'One account',
    desc: 'Trade commodity and financial futures in the same account as your stocks and bonds — no separate sign-up.',
    features: ['Index & commodity futures', 'Real-time margin view', 'Overnight positions', 'Rollover alerts'],
  },
]

const exchanges = [
  { code: 'NYSE',     name: 'New York'    },
  { code: 'NASDAQ',   name: 'New York'    },
  { code: 'LSE',      name: 'London'      },
  { code: 'TSE',      name: 'Tokyo'       },
  { code: 'XETRA',    name: 'Frankfurt'   },
  { code: 'HKEX',     name: 'Hong Kong'   },
  { code: 'ASX',      name: 'Sydney'      },
  { code: 'EURONEXT', name: 'Amsterdam'   },
]

function LiveChart() {
  const candles = React.useMemo(() => {
    const arr = []; let p = 185
    for (let i = 0; i < 52; i++) {
      const o = p
      const c = o + (Math.random() - 0.44) * 5
      const h = Math.max(o, c) + Math.random() * 2
      const l = Math.min(o, c) - Math.random() * 2
      arr.push({ o, c, h, l }); p = c
    }
    return arr
  }, [])
  return <Candlestick candles={candles} height={180} />
}

export default function MarketsPage({ onAuthOpen }) {
  return (
    <>
      <PageHero
        eyebrow="Markets"
        title="Every market. One account."
        subtitle="Stocks, ETFs, real estate, options, FX, and futures — all accessible from a single account with institutional-grade execution and custody."
        cta={
          <Button size="lg" onClick={() => onAuthOpen('signup')} iconRight={<Icon.arrow size={14} />}>
            Start investing
          </Button>
        }
      />

      <section style={{ paddingBlock: 'var(--section-pad)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Asset classes"
            title="Invest in what you believe in."
            subtitle="Six asset classes. One account. No switching between apps or brokers."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {assetClasses.map((a) => (
              <Card key={a.name} padded interactive>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 44, height: 44, borderRadius: 12,
                    background: 'var(--accent-soft)', color: 'var(--accent)',
                  }}>
                    {a.icon}
                  </div>
                  <Badge tone="accent" mono>{a.badge}</Badge>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{a.name}</h3>
                <p style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 16 }}>{a.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {a.features.map((f) => (
                    <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'var(--text-3)' }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0 }}><Icon.check size={12} /></span>
                      {f}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingBlock: 'var(--section-pad)', background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Live markets"
            title="Real-time data, always."
            subtitle="See market-moving prices the moment they happen — with full depth-of-book and professional charting tools."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <Card padded={false} elevation={2} style={{ overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--line)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <Badge tone="default" mono>AAPL</Badge>
                    <Badge tone="positive" dot mono>LIVE</Badge>
                  </div>
                  <div className="mono" style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>$185.42</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="mono" style={{ color: 'var(--pos)', fontSize: 14, fontWeight: 500 }}>+2.38%</div>
                  <div style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 4 }}>Today</div>
                </div>
              </div>
              <div style={{ padding: 12 }}>
                <LiveChart />
              </div>
            </Card>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { sym: 'AAPL', name: 'Apple Inc.',      price: '$224.31', ch: '+0.42%', pos: true  },
                { sym: 'NVDA', name: 'NVIDIA',          price: '$945.07', ch: '+2.18%', pos: true  },
                { sym: 'MSFT', name: 'Microsoft',       price: '$432.15', ch: '+0.55%', pos: true  },
                { sym: 'TSLA', name: 'Tesla Inc.',      price: '$248.60', ch: '+0.92%', pos: true  },
                { sym: 'SPY',  name: 'S&P 500 ETF',    price: '$538.24', ch: '-0.18%', pos: false },
              ].map((m) => (
                <Card key={m.sym} padded={false} interactive style={{ padding: '14px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 9,
                        background: 'var(--bg-2)', border: '1px solid var(--line)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-2)',
                      }}>{m.sym}</div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500 }}>{m.name}</div>
                        <div className="mono" style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 2 }}>{m.sym}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="mono" style={{ fontSize: 14, fontWeight: 500 }}>{m.price}</div>
                      <div className="mono" style={{ fontSize: 12, marginTop: 2, color: m.pos ? 'var(--pos)' : 'var(--neg)' }}>{m.ch}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DashboardPreview />

      <section style={{ paddingBlock: 'var(--section-pad)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Global access"
            title="Markets around the world."
            subtitle="Connected to major exchanges across North America, Europe, and Asia-Pacific."
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {exchanges.map((ex) => (
              <Card key={ex.code} padded interactive>
                <div className="mono" style={{ fontSize: 16, fontWeight: 600, marginBottom: 6, color: 'var(--accent)' }}>{ex.code}</div>
                <div style={{ fontSize: 13, color: 'var(--text-3)' }}>{ex.name}</div>
              </Card>
            ))}
          </div>
          <div style={{ marginTop: 24, padding: '18px 24px', borderRadius: 'var(--radius)', background: 'var(--surface)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>Coverage expanding</div>
              <div style={{ fontSize: 13, color: 'var(--text-3)' }}>120+ countries supported · 30+ currencies · More exchanges added quarterly</div>
            </div>
            <Button variant="outline" size="sm" iconRight={<Icon.arrow size={12} />}>View all markets</Button>
          </div>
        </div>
      </section>

      <CTA onAuthOpen={onAuthOpen} />
    </>
  )
}
