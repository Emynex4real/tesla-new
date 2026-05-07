/* Tesla — Referral Log */
import React from 'react'
import { Users } from 'lucide-react'

export default function ReferralLog() {
  return (
    <div className="db-content">
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Referral Logs</h2>
        <p style={{ fontSize: 13.5, color: 'var(--text-3)' }}>Track commissions earned through your referral network.</p>
      </div>

      {/* Summary cards */}
      <div className="db-grid-3" style={{ marginBottom: 24 }}>
        {[
          ['Total Referrals', '0'],
          ['Active Referrals', '0'],
          ['Total Earned', '$0.00'],
        ].map(([label, val]) => (
          <div key={label} className="db-card" style={{ padding: 22 }}>
            <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6 }}>{label}</p>
            <p style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>{val}</p>
          </div>
        ))}
      </div>

      <div className="db-table-wrap">
        <div style={{ overflowX: 'auto' }}>
          <table className="db-table">
            <thead>
              <tr>
                <th>Username</th><th>Level</th><th>Commission</th><th>Joined</th>
                <th style={{ textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5">
                  <div className="db-empty">
                    <div className="db-empty-icon"><Users size={26} style={{ color: 'var(--text-4)' }} /></div>
                    <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', margin: 0 }}>No Referrals Yet</p>
                    <p style={{ fontSize: 13, color: 'var(--text-3)', margin: 0 }}>Share your referral link from the dashboard to start earning.</p>
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
