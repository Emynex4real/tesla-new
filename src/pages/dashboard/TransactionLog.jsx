/* Tesla — Transaction Log */
import React from 'react'
import { Search, FileText, CheckCircle, Clock, XCircle } from 'lucide-react'

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
  { id: 'TX-998811', type: 'Deposit',    desc: 'USDT (TRC20)',  amount: '+$5,000.00', date: 'Jan 24, 2026', status: 'success'  },
  { id: 'TX-998822', type: 'Withdrawal', desc: 'Bank Transfer', amount: '-$1,200.00', date: 'Jan 28, 2026', status: 'pending'  },
  { id: 'TX-998833', type: 'Transfer',   desc: 'To alex@…',     amount: '-$2,000.00', date: 'Feb 5, 2026',  status: 'success'  },
  { id: 'TX-998844', type: 'Deposit',    desc: 'Credit Card',   amount: '+$500.00',   date: 'Jan 10, 2026', status: 'rejected' },
]

export default function TransactionLog() {
  const [q, setQ] = React.useState('')
  const filtered = LOGS.filter(l =>
    l.id.toLowerCase().includes(q.toLowerCase()) ||
    l.type.toLowerCase().includes(q.toLowerCase()) ||
    l.desc.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <div className="db-content">
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, marginBottom: 28 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Transaction Logs</h2>
          <p style={{ fontSize: 13.5, color: 'var(--text-3)' }}>A complete history of all your account activity.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ position: 'relative' }}>
            <input className="db-input" placeholder="Search transactions..." value={q} onChange={e => setQ(e.target.value)} style={{ paddingRight: 36, width: 220 }} />
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
                <th>ID</th><th>Type</th><th>Description</th><th>Amount</th><th>Date</th>
                <th style={{ textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((log, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{log.id}</td>
                  <td>
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 6,
                      background: 'var(--surface-2)', color: 'var(--text-2)',
                    }}>{log.type}</span>
                  </td>
                  <td style={{ color: 'var(--text-2)' }}>{log.desc}</td>
                  <td style={{
                    fontWeight: 700, fontFamily: 'var(--font-mono)',
                    color: log.amount.startsWith('+') ? 'var(--pos)' : 'var(--neg)',
                  }}>{log.amount}</td>
                  <td>{log.date}</td>
                  <td style={{ textAlign: 'right' }}><StatusBadge status={log.status} /></td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6">
                    <div className="db-empty">
                      <div className="db-empty-icon"><FileText size={26} style={{ color: 'var(--text-4)' }} /></div>
                      <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', margin: 0 }}>No Transactions Found</p>
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
