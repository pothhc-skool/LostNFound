import Icon from './Icon'
import { NAV_ITEMS } from './navItems'

export default function Sidebar({ open, onNavigate, activePage, onClose }) {
  return <>
    {open && <button className="sidebar-backdrop" onClick={onClose} aria-label="Close navigation" />}
    <aside id="app-navigation" className={`sidebar ${open ? 'sidebar--open' : ''}`} aria-label="Main navigation" aria-hidden={!open}>
      <div className="sidebar-logo">
        <img src="/images/branding/fsc-lost-found-mascot.png" alt="FSC Lost & Found mascot logo" />
      </div>
      <nav className="sidebar-nav" aria-label="Main">
        {NAV_ITEMS.map(({ key, label, icon }) => <button key={key} type="button" tabIndex={open ? 0 : -1} className={`sidebar-link ${activePage === key ? 'sidebar-link--active' : ''}`} onClick={() => onNavigate(key)} aria-current={activePage === key ? 'page' : undefined}>
          <Icon name={icon} size={19} /><span>{label}</span>
        </button>)}
      </nav>
      <div className="sidebar-help">
        <span className="help-symbol" aria-hidden="true">?</span>
        <strong>Need Help?</strong>
        <p>Contact Campus Safety for urgent assistance.</p>
        <button type="button" onClick={() => onNavigate('contact-us')}>Get support <Icon name="arrow" size={15} /></button>
      </div>
    </aside>
  </>
}
