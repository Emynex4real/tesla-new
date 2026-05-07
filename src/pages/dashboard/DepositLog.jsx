/* Tesla — Deposit Log */
import React from 'react'
import { Search, CheckCircle, Clock, XCircle } from 'lucide-react'

function StatusBadge({ status }) {
  const map = {
    success:  { label: 'Success',  cls: 'db-badge-success',  Icon: CheckCircle },
    pending:  { label: 'Pending',  cls: 'db-badge-pending',  Icon: Clock },
    rejected: { label: 'Rejected', cls: 'db-badge-rejected', Icon: XCircle },
  }
  const { label, cls, Icon } = map[status] || map.pending
  return (
    <span className={`db-badge ${cls}`}>
      <Icon size={12} /> {label}
    </span>
  )
}

const LOGS = [
  { id: 'TRX-885921', gateway: 'USDT (TRC20)',  date: 'Jan 24, 2026', amount: '5,000.00',  conversion: '1 USD = 1 USD', status: 'success'  },
  { id: 'TRX-885922', gateway: 'Bank Transfer', date: 'Jan 22, 2026', amount: '10,000.00', conversion: '1 USD = 1 USD', status: 'pending'  },
  { id: 'TRX-885923', gateway: 'Credit Card',   date: 'Jan 10, 2026', amount: '500.00',    conversion: '1 USD = 1 USD', status: 'rejected' },
]

export default function DepositLog() {
  const [q, setQ] = React.useState('')
  const filtered = LOGS.filter(l =>
    l.id.toLowerCase().includes(q.toLowerCase()) ||
    l.gateway.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <div className="db-content">
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, marginBottom: 28 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Deposit History</h2>
          <p style={{ fontSize: 13.5, color: 'var(--text-3)' }}>View all your past funding transactions.</p>
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
                <th>Gateway</th>
                <th>Transaction ID</th>
                <th>Initiated</th>
                <th>Amount</th>
                <th>Conversion</th>
                <th style={{ textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((log, i) => (
                <tr key={i}>
                  <td style={{ color: 'var(--text)', fontWeight: 600 }}>{log.gateway}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{log.id}</td>
                  <td>{log.date}</td>
                  <td style={{ color: 'var(--pos)', fontWeight: 700 }}>+${log.amount}</td>
                  <td style={{ fontSize: 12, color: 'var(--text-4)' }}>{log.conversion}</td>
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
                      <p style={{ fontSize: 13, color: 'var(--text-3)' }}>Try a different search term.</p>
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
