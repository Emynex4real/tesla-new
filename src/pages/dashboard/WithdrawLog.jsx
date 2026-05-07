/* Tesla — Withdraw Log */
import React from 'react'
import { Search, CheckCircle, Clock, XCircle } from 'lucide-react'

function StatusBadge({ status }) {
  const map = {
    success:  { label: 'Success',  cls: 'db-badge-success',  Icon: CheckCircle },
    pending:  { label: 'Pending',  cls: 'db-badge-pending',  Icon: Clock },
    rejected: { label: 'Rejected', cls: 'db-badge-rejected', Icon: XCircle },
  }
  const { label, cls, Icon } = map[status] || map.pending
  return <span className={`db-badge ${cls}`}><Icon size={12} /> {label}</span>
}

const LOGS = [
  { id: 'WTH-112233', method: 'USDT (TRC20)',  date: 'Feb 2, 2026',  amount: '1,200.00', fee: '1.00', status: 'success' },
  { id: 'WTH-112244', method: 'Bank Transfer', date: 'Jan 28, 2026', amount: '5,000.00', fee: '100.00', status: 'pending' },
]

export default function WithdrawLog() {
  const [q, setQ] = React.useState('')
  const filtered = LOGS.filter(l =>
    l.id.toLowerCase().includes(q.toLowerCase()) ||
    l.method.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <div className="db-content">
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, marginBottom: 28 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Withdraw History</h2>
          <p style={{ fontSize: 13.5, color: 'var(--text-3)' }}>Track all your withdrawal requests.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ position: 'relative' }}>
            <input
              className="db-input" placeholder="Transaction ID"
              value={q} onChange={e => setQ(e.target.value)}
              style={{ paddingRight: 36, width: 200 }}
            />
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
                <th>Method</th>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Fee</th>
                <th style={{ textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((log, i) => (
                <tr key={i}>
                  <td style={{ color: 'var(--text)', fontWeight: 600 }}>{log.method}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{log.id}</td>
                  <td>{log.date}</td>
                  <td style={{ color: 'var(--neg)', fontWeight: 700 }}>-${log.amount}</td>
                  <td style={{ fontSize: 12, color: 'var(--text-4)' }}>${log.fee}</td>
                  <td style={{ textAlign: 'right' }}><StatusBadge status={log.status} /></td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6">
                    <div className="db-empty">
                      <div className="db-empty-icon">
                        <Search size={24} style={{ color: 'var(--text-4)' }} />
                      </div>
                      <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>No Logs Found</p>
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
