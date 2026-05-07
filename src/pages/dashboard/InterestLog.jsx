/* Tesla — Interest Log */
import React from 'react'
import { TrendingUp } from 'lucide-react'

export default function InterestLog() {
  return (
    <div className="db-content">
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Interest Logs</h2>
        <p style={{ fontSize: 13.5, color: 'var(--text-3)' }}>View all interest payments credited to your account.</p>
      </div>

      <div className="db-table-wrap">
        <div style={{ overflowX: 'auto' }}>
          <table className="db-table">
            <thead>
              <tr>
                <th>Plan</th><th>Amount</th><th>Credit Date</th><th>Next Credit</th>
                <th style={{ textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5">
                  <div className="db-empty">
                    <div className="db-empty-icon"><TrendingUp size={26} style={{ color: 'var(--text-4)' }} /></div>
                    <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', margin: 0 }}>No Interest Logs</p>
                    <p style={{ fontSize: 13, color: 'var(--text-3)', margin: 0 }}>Interest payments will appear here once your investments are active.</p>
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
