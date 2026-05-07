/* Tesla — Money Logs (transfer log) */
import React from 'react'
import { Search, ArrowRightLeft, CheckCircle, Clock } from 'lucide-react'

function StatusBadge({ status }) {
  const map = {
    completed: { label: 'Completed', cls: 'db-badge-success', Icon: CheckCircle },
    pending:   { label: 'Pending',   cls: 'db-badge-pending', Icon: Clock },
  }
  const { label, cls, Icon } = map[status] || map.pending
  return <span className={`db-badge ${cls}`}><Icon size={12} /> {label}</span>
}

const LOGS = [
  { id: 'TRF-441122', from: 'You',  to: 'alex@example.com',  amount: '2,000.00', date: 'Feb 5, 2026',  fee: '10.00', status: 'completed' },
  { id: 'TRF-441133', from: 'You',  to: 'sarah@example.com', amount: '1,500.00', date: 'Jan 30, 2026', fee: '7.50',  status: 'pending'   },
]

export default function MoneyLogs() {
  const [q, setQ] = React.useState('')
  const filtered = LOGS.filter(l =>
    l.id.toLowerCase().includes(q.toLowerCase()) || l.to.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <div className="db-content">
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, marginBottom: 28 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Money Logs</h2>
          <p style={{ fontSize: 13.5, color: 'var(--text-3)' }}>History of all internal fund transfers.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ position: 'relative' }}>
            <input className="db-input" placeholder="Search..." value={q} onChange={e => setQ(e.target.value)} style={{ paddingRight: 36, width: 200 }} />
            <Search size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-4)' }} />
          </div>
          <button className="db-btn db-btn-primary">Filter</button>
        </div>
      </div>

      <div className="db-table-wrap">
        <div style={{ overflowX: 'auto' }}>
          <table className="db-table">
            <thead>
              <tr>
                <th>ID</th><th>From</th><th>To</th><th>Amount</th><th>Fee</th><th>Date</th>
                <th style={{ textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((log, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{log.id}</td>
                  <td style={{ color: 'var(--text)', fontWeight: 500 }}>{log.from}</td>
                  <td style={{ color: 'var(--text-2)' }}>{log.to}</td>
                  <td style={{ color: 'var(--neg)', fontWeight: 700 }}>-${log.amount}</td>
                  <td style={{ fontSize: 12, color: 'var(--text-4)' }}>${log.fee}</td>
                  <td>{log.date}</td>
                  <td style={{ textAlign: 'right' }}><StatusBadge status={log.status} /></td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7">
                    <div className="db-empty">
                      <div className="db-empty-icon"><ArrowRightLeft size={26} style={{ color: 'var(--text-4)' }} /></div>
                      <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', margin: 0 }}>No Transfer Logs</p>
                      <p style={{ fontSize: 13, color: 'var(--text-3)', margin: 0 }}>No matching records found.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
