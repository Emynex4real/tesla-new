/* Tesla — Invest Log */
import React from 'react'
import { Search, Calendar, TrendingUp } from 'lucide-react'

export default function InvestLog() {
  return (
    <div className="db-content">
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, marginBottom: 28 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Investment Logs</h2>
          <p style={{ fontSize: 13.5, color: 'var(--text-3)' }}>Track your active and past portfolios.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ position: 'relative' }}>
            <input className="db-input" placeholder="Transaction ID" style={{ paddingRight: 36, width: 180 }} />
            <Search size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-4)' }} />
          </div>
          <div style={{ position: 'relative' }}>
            <input className="db-input" placeholder="mm/dd/yyyy" style={{ paddingRight: 36, width: 160 }} />
            <Calendar size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-4)' }} />
          </div>
          <button className="db-btn db-btn-primary">Search</button>
        </div>
      </div>

      <div className="db-table-wrap">
        <div style={{ overflowX: 'auto' }}>
          <table className="db-table">
            <thead>
              <tr>
                <th>Trx</th><th>User</th><th>Gateway</th><th>Amount</th>
                <th>Currency</th><th>Charge</th><th>Payment Date</th>
                <th style={{ textAlign: 'right' }}>Upcoming</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="8">
                  <div className="db-empty">
                    <div className="db-empty-icon"><TrendingUp size={26} style={{ color: 'var(--text-4)' }} /></div>
                    <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', margin: 0 }}>No Investments Found</p>
                    <p style={{ fontSize: 13, color: 'var(--text-3)', margin: 0 }}>You haven't started an investment plan yet.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
