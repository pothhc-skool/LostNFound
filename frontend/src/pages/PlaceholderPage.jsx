import React from 'react'
import Icon from '../components/Icon'

const labels = {
  search: 'Search',
  forms: 'Forms',
  'sign-in': 'Sign In',
  'contact-us': 'Contact Us',
  'about-us': 'About Us',
}

export default function PlaceholderPage({ page, onNavigate }) {
  return <section className="page-card placeholder-page">
    <p className="eyebrow">FSC CAMPUS SERVICES</p>
    <h1>{labels[page] || 'Page'}</h1>
    <p>This page is reserved for a future Figma design. We'll build and test it separately.</p>
    <button type="button" className="primary-button" onClick={() => onNavigate('home')}>Back to Home <Icon name="arrow" size={18}/></button>
  </section>
}
