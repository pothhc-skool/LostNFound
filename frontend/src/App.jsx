import { useState, useEffect } from 'react';
import Sidebar from "./components/Sidebar";
import { NAV_ITEMS } from "./components/navItems";
import Icon from './components/Icon'
import HomePage from './pages/HomePage'
import SignInPage from './pages/SignInPage'
import PlaceholderPage from './pages/PlaceholderPage'
import AccountPage from "./pages/AccountPage";
import './styles/tokens.css'
import './App.css'
import ReportPage from './pages/ReportPage'
import ReportConfirmationPage from './pages/ReportConfirmationPage'

const knownPages = new Set([
  ...NAV_ITEMS.map(item => item.key),
  'report-confirmation',
])

function readPage() {
  const candidate = window.location.hash.replace(/^#\/?/, '')
  return knownPages.has(candidate) ? candidate : 'home'
}

export default function App() {
  const [activePage, setActivePage] = useState(readPage)
  const [menuOpen, setMenuOpen] = useState(() => window.innerWidth >= 800)

  useEffect(() => {
    function syncHash() { setActivePage(readPage()) }
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  function navigate(page) {
    if (!knownPages.has(page)) return
    window.location.hash = `/${page}`
    setActivePage(page)
    if (window.innerWidth < 800) setMenuOpen(false)
  }

  return <div className={`app-shell ${menuOpen ? 'app-shell--sidebar-open' : ''}`}>
    <Sidebar open={menuOpen} onNavigate={navigate} activePage={activePage} onClose={() => setMenuOpen(false)} />
    <main className="main-area">
      <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="app-navigation" onClick={() => setMenuOpen(current => !current)}><Icon name={menuOpen ? 'close' : 'menu'} size={24}/></button>
      {activePage === 'home' ? (
  <HomePage onNavigate={navigate} />
) : activePage === 'sign-in' ? (
  <SignInPage onNavigate={navigate} />
) : activePage === 'my-account' ? (
  <AccountPage onNavigate={navigate} />
) : activePage === 'forms' ? (
  <ReportPage onNavigate={navigate} />
) : activePage === 'report-confirmation' ? (
  <ReportConfirmationPage onNavigate={navigate} />
) : (
  <PlaceholderPage page={activePage} onNavigate={navigate} />
)}
    </main>
  </div>




}
