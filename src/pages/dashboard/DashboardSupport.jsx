/* Tesla — Dashboard Support */
import React from 'react'
import { MessageSquare, Plus, Search, X, Send, ChevronRight } from 'lucide-react'

function TabBtn({ label, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="db-btn"
      style={{
        fontSize: 12.5, padding: '8px 16px',
        background: active ? 'var(--accent)' : 'var(--surface)',
        color: active ? 'var(--bg)' : 'var(--text-3)',
        border: `1px solid ${active ? 'var(--accent)' : 'var(--line)'}`,
        gap: 6,
      }}
    >
      {label}
      <span style={{
        fontSize: 10.5, padding: '1px 5px', borderRadius: 4,
        background: active ? 'oklch(0 0 0 / 0.15)' : 'var(--bg-2)',
        color: active ? 'var(--bg)' : 'var(--text-4)',
      }}>
        {count}
      </span>
    </button>
  )
}

function CreateTicketModal({ onClose }) {
  const [priority, setPriority] = React.useState('Medium')

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'oklch(0 0 0 / 0.72)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16, animation: 'fadein 150ms ease',
      }}
      onClick={onClose}
    >
      <div
        className="db-card"
        style={{ width: 'min(500px, 100%)', overflow: 'hidden' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '18px 22px', borderBottom: '1px solid var(--line)',
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: 0 }}>Open New Ticket</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', padding: 4 }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label style={{ fontSize: 12, color: 'var(--text-3)', display: 'block', marginBottom: 6 }}>Subject</label>
            <input className="db-input" placeholder="Briefly describe your issue" />
          </div>

          <div>
            <label style={{ fontSize: 12, color: 'var(--text-3)', display: 'block', marginBottom: 8 }}>Priority</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {['Low', 'Medium', 'High'].map(p => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  style={{
                    padding: '9px', borderRadius: 'var(--radius)', fontSize: 13,
                    fontFamily: 'var(--font-display)', cursor: 'pointer', fontWeight: 500,
                    border: `1px solid ${priority === p ? 'var(--accent)' : 'var(--line)'}`,
                    background: priority === p ? 'var(--accent)' : 'var(--bg-2)',
                    color: priority === p ? 'var(--bg)' : 'var(--text-3)',
                    transition: 'all 180ms ease',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: 12, color: 'var(--text-3)', display: 'block', marginBottom: 6 }}>Message</label>
            <textarea
              rows={5}
              placeholder="Describe your issue in detail…"
              className="db-input"
              style={{ resize: 'none', lineHeight: 1.6 }}
            />
          </div>

          <button className="db-btn db-btn-primary db-btn-lg">
            Submit Ticket <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function DashboardSupport() {
  const [tab, setTab]         = React.useState('all')
  const [modal, setModal]     = React.useState(false)
  const [q, setQ]             = React.useState('')
  const tickets               = []

  return (
    <div className="db-content">
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, marginBottom: 28 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Support Center</h2>
          <p style={{ fontSize: 13.5, color: 'var(--text-3)', maxWidth: 420 }}>
            Need help with your portfolio? Our team is available 24/7 to assist you.
          </p>
        </div>
        <button
          className="db-btn db-btn-white"
          onClick={() => setModal(true)}
        >
          <Plus size={16} /> Create Ticket
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <TabBtn label="All Tickets" count="0" active={tab === 'all'}      onClick={() => setTab('all')} />
          <TabBtn label="Answered"    count="0" active={tab === 'answered'} onClick={() => setTab('answered')} />
          <TabBtn label="Pending"     count="0" active={tab === 'pending'}  onClick={() => setTab('pending')} />
        </div>
        <div style={{ position: 'relative' }}>
          <input
            className="db-input" placeholder="Search tickets…"
            value={q} onChange={e => setQ(e.target.value)}
            style={{ paddingLeft: 36, width: 220 }}
          />
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-4)' }} />
        </div>
      </div>

      <div className="db-table-wrap" style={{ flex: 1 }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="db-table">
            <thead>
              <tr>
                <th>Ticket ID</th><th>Subject</th><th>Status</th><th>Last Reply</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {tickets.length > 0 ? tickets.map((t, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>#{t.id}</td>
                  <td style={{ color: 'var(--text)', fontWeight: 500 }}>{t.subject}</td>
                  <td><span className="db-badge db-badge-pending">Pending</span></td>
                  <td style={{ fontSize: 12, color: 'var(--text-4)' }}>2 mins ago</td>
                  <td style={{ textAlign: 'right' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', padding: 6, borderRadius: 6 }}>
                      <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5">
                    <div className="db-empty" style={{ padding: '80px 24px' }}>
                      <div className="db-empty-icon" style={{ width: 72, height: 72 }}>
                        <MessageSquare size={30} style={{ color: 'var(--text-4)', opacity: 0.5 }} />
                      </div>
                      <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: 0 }}>No Tickets Found</p>
                      <p style={{ fontSize: 13, color: 'var(--text-3)', maxWidth: 320, lineHeight: 1.6, margin: 0 }}>
                        You haven't opened any support requests yet. Create a ticket if you need assistance.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modal && <CreateTicketModal onClose={() => setModal(false)} />}
    </div>
  )
}
