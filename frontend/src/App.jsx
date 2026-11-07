import React, { useEffect, useState } from 'react'
import Sidebar, { NAV_ITEMS } from './components/Sidebar'
import Icon from './components/Icon'
import HomePage from './pages/HomePage'
import PlaceholderPage from './pages/PlaceholderPage'
import './styles/tokens.css'
import './App.css'

const knownPages = new Set(NAV_ITEMS.map(item => item.key))
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
      {activePage === 'home' ? <HomePage onNavigate={navigate}/> : <PlaceholderPage page={activePage} onNavigate={navigate} />}
    </main>
  </div>
}
