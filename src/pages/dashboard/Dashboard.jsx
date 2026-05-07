/* Tesla — Dashboard shell */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, TrendingUp, Download, Upload,
  ArrowRightLeft, FileText, ShieldCheck, Headphones,
  LogOut, Menu, X, Bell, User, ChevronRight,
  Users, Wallet,
} from 'lucide-react'
import '../../styles/dashboard.css'
import DashboardHome    from './DashboardHome'
import InvestmentPlans  from './InvestmentPlans'
import InvestLog        from './InvestLog'
import Deposit          from './Deposit'
import DepositLog       from './DepositLog'
import Withdraw         from './Withdraw'
import WithdrawLog      from './WithdrawLog'
import TransferMoney    from './TransferMoney'
import MoneyLogs        from './MoneyLogs'
import InterestLog      from './InterestLog'
import TransactionLog   from './TransactionLog'
import ReferralLog      from './ReferralLog'
import TwoFactorAuth    from './TwoFactorAuth'
import DashboardSupport from './DashboardSupport'
import UpdatePlan       from './UpdatePlan'

/* ── Sidebar nav item ──────────────────────────────── */
function NavItem({ icon: Icon, label, active, onClick, hasDropdown, isOpen }) {
  return (
    <button
      className={`db-nav-item${active ? ' active' : ''}`}
      onClick={onClick}
    >
      <Icon size={18} />
      <span style={{ flex: 1 }}>{label}</span>
      {hasDropdown && (
        <ChevronRight size={15} className={`db-chevron${isOpen ? ' rotated' : ''}`} />
      )}
      {active && !hasDropdown && (
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: 'var(--bg)', flexShrink: 0,
        }} />
      )}
    </button>
  )
}

function DropdownItem({ label, active, onClick }) {
  return (
    <button className={`db-dropdown-item${active ? ' active' : ''}`} onClick={onClick}>
      <span className="db-dropdown-dot" />
      {label}
    </button>
  )
}

/* ── Sidebar ───────────────────────────────────────── */
function Sidebar({ isOpen, setIsOpen, currentView, setCurrentView, onLogout }) {
  const [investOpen,  setInvestOpen]  = React.useState(false)
  const [depositOpen, setDepositOpen] = React.useState(false)
  const [withdrawOpen, setWithdrawOpen] = React.useState(false)

  const go = (view) => { setCurrentView(view); setIsOpen(false) }

  return (
    <>
      {/* mobile overlay */}
      {isOpen && (
        <div className="db-overlay" onClick={() => setIsOpen(false)} />
      )}

      <aside className={`db-sidebar${isOpen ? ' open' : ''}`}>
        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="/logo.png" alt="Logo" style={{ height: 30, width: 'auto', display: 'block' }} />
          </a>
          <button
            onClick={() => setIsOpen(false)}
            className="db-nav-item"
            style={{ width: 32, height: 32, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Close sidebar"
          >
            <X size={18} style={{ display: 'block' }} />
          </button>
        </div>

        {/* Main menu */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <p className="db-nav-label">Main Menu</p>

          <NavItem
            icon={LayoutDashboard} label="Dashboard"
            active={currentView === 'dashboard'}
            onClick={() => go('dashboard')}
          />

          {/* Investment */}
          <NavItem
            icon={TrendingUp} label="Investment"
            hasDropdown isOpen={investOpen}
            active={currentView === 'investment-plans' || currentView === 'invest-log'}
            onClick={() => setInvestOpen(v => !v)}
          />
          <div className={`db-dropdown-wrap${investOpen ? ' open' : ''}`}>
            <DropdownItem label="Investment Plans" active={currentView === 'investment-plans'} onClick={() => go('investment-plans')} />
            <DropdownItem label="Invest Log"       active={currentView === 'invest-log'}       onClick={() => go('invest-log')} />
          </div>

          {/* Deposit */}
          <NavItem
            icon={Download} label="Deposit"
            hasDropdown isOpen={depositOpen}
            active={currentView === 'deposit' || currentView === 'deposit-log'}
            onClick={() => setDepositOpen(v => !v)}
          />
          <div className={`db-dropdown-wrap${depositOpen ? ' open' : ''}`}>
            <DropdownItem label="Deposit"     active={currentView === 'deposit'}     onClick={() => go('deposit')} />
            <DropdownItem label="Deposit Log" active={currentView === 'deposit-log'} onClick={() => go('deposit-log')} />
          </div>

          {/* Withdraw */}
          <NavItem
            icon={Upload} label="Withdraw"
            hasDropdown isOpen={withdrawOpen}
            active={currentView === 'withdraw' || currentView === 'withdraw-log'}
            onClick={() => setWithdrawOpen(v => !v)}
          />
          <div className={`db-dropdown-wrap${withdrawOpen ? ' open' : ''}`}>
            <DropdownItem label="Withdraw"     active={currentView === 'withdraw'}     onClick={() => go('withdraw')} />
            <DropdownItem label="Withdraw Log" active={currentView === 'withdraw-log'} onClick={() => go('withdraw-log')} />
          </div>

          <NavItem
            icon={ArrowRightLeft} label="Transfer Money"
            active={currentView === 'transfer-money'}
            onClick={() => go('transfer-money')}
          />

          <p className="db-nav-label">History</p>

          <NavItem icon={FileText} label="Money Logs"       active={currentView === 'money-logs'}       onClick={() => go('money-logs')} />
          <NavItem icon={FileText} label="Interest Logs"    active={currentView === 'interest-logs'}    onClick={() => go('interest-logs')} />
          <NavItem icon={FileText} label="Transaction Logs" active={currentView === 'transaction-logs'} onClick={() => go('transaction-logs')} />
          <NavItem icon={Users}    label="Referral Logs"    active={currentView === 'referral-logs'}    onClick={() => go('referral-logs')} />

          <p className="db-nav-label">Settings</p>

          <NavItem icon={ShieldCheck} label="2FA Security" active={currentView === '2fa-security'} onClick={() => go('2fa-security')} />
          <NavItem icon={Headphones}  label="Support"      active={currentView === 'support'}       onClick={() => go('support')} />
          <NavItem icon={LogOut}      label="Logout"       onClick={onLogout} />
        </nav>

        {/* Plan badge */}
        <div style={{
          marginTop: 20, paddingTop: 16,
          borderTop: '1px solid var(--line)',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 11.5, color: 'var(--text-3)', marginBottom: 6 }}>
            Current plan — <span style={{ color: 'var(--text)', fontWeight: 600 }}>N/A</span>
          </p>
          <button
            onClick={() => go('update-plan')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--accent)', fontSize: 12.5, fontWeight: 700,
              display: 'inline-flex', alignItems: 'center', gap: 4,
              fontFamily: 'var(--font-display)',
            }}
          >
            Update Plan <ChevronRight size={13} style={{ transform: 'rotate(90deg)' }} />
          </button>
        </div>
      </aside>
    </>
  )
}

/* ── View renderer ─────────────────────────────────── */
function renderView(view, setView) {
  switch (view) {
    case 'investment-plans': return <InvestmentPlans />
    case 'invest-log':       return <InvestLog />
    case 'deposit':          return <Deposit />
    case 'deposit-log':      return <DepositLog />
    case 'withdraw':         return <Withdraw />
    case 'withdraw-log':     return <WithdrawLog />
    case 'transfer-money':   return <TransferMoney />
    case 'money-logs':       return <MoneyLogs />
    case 'interest-logs':    return <InterestLog />
    case 'transaction-logs': return <TransactionLog />
    case 'referral-logs':    return <ReferralLog />
    case '2fa-security':     return <TwoFactorAuth />
    case 'support':          return <DashboardSupport />
    case 'update-plan':      return <UpdatePlan setView={setView} />
    default:                 return <DashboardHome setView={setView} />
  }
}

/* ── Main dashboard ────────────────────────────────── */
export default function Dashboard() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [currentView, setCurrentView] = React.useState('dashboard')

  const handleLogout = () => {
    localStorage.clear()
    sessionStorage.clear()
    navigate('/')
  }

  return (
    <div className="db-root">
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        currentView={currentView}
        setCurrentView={setCurrentView}
        onLogout={handleLogout}
      />

      <main className="db-main">
        {/* Top header */}
        <header className="db-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              className="db-hamburger db-nav-item"
              style={{ width: 36, height: 36, padding: 0, alignItems: 'center', justifyContent: 'center', background: 'none' }}
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Bell */}
            <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', padding: 4 }}>
              <Bell size={19} />
              <span style={{
                position: 'absolute', top: 2, right: 2,
                width: 7, height: 7, borderRadius: '50%',
                background: 'var(--accent)',
              }} />
            </button>

            {/* User */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              paddingLeft: 16, borderLeft: '1px solid var(--line)',
            }}>
              <div style={{ textAlign: 'right' }} className="hide-mobile">
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>Michael Temidayo</p>
                <p style={{ fontSize: 11, color: 'var(--text-3)' }}>Verified Investor</p>
              </div>
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: 'var(--surface-2)', border: '1px solid var(--line)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)',
              }}>
                <User size={19} />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div key={currentView}>
          {renderView(currentView, setCurrentView)}
        </div>
      </main>
    </div>
  )
}
