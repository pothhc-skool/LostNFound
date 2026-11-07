import React from 'react'
import Icon from '../components/Icon'

const steps = [
  { title: 'Submit a Report', description: 'Tell us what you lost or found with a quick campus report.' },
  { title: 'AI Matchmaking', description: 'Our system compares reports to identify likely matches.' },
  { title: 'Secure Verification & Pickup', description: 'Confirm ownership and arrange a safe campus pickup.' },
]

export default function HomePage({ onNavigate }) {
  return <section className="page-card home-page" aria-labelledby="welcome-title">
    <header className="home-intro">
      <p className="eyebrow">FSC CAMPUS SERVICES</p>
      <h1 id="welcome-title">Welcome to FSC Lost &amp; Found</h1>
      <p>The central hub for recovering lost items and reporting found property on campus.</p>
    </header>

    <div className="home-content">
      <div className="hero-actions" aria-label="Get started">
        <section className="hero hero--report" aria-labelledby="hero-heading">
          <span className="hero-icon"><Icon name="packageSearch" size={50}/></span>
          <h2 id="hero-heading">Lost something? Found something?</h2>
          <p>Start with a simple report and let us help make the connection.</p>
          <button type="button" className="primary-button" onClick={() => onNavigate('forms')}>
            Go to Forms <Icon name="arrow" size={20}/>
          </button>
        </section>

        <section className="hero hero--signin" aria-labelledby="signin-heading">
          <span className="hero-icon"><Icon name="signin" size={46}/></span>
          <h2 id="signin-heading">Already have an account?</h2>
          <p>Sign in to view your reports and stay updated on your items.</p>
          <button type="button" className="primary-button" onClick={() => onNavigate('sign-in')}>
            Go to Sign In <Icon name="arrow" size={20}/>
          </button>
        </section>
      </div>

      <section className="how-it-works" aria-labelledby="how-heading">
        <div className="how-intro">
          <div>
            <p className="eyebrow">A SIMPLE, SECURE<br/>PROCESS</p>
            <h2 id="how-heading">How it Works</h2>
          </div>
          <p>Three steps to get your item back where it belongs.</p>
        </div>
        <ol className="steps-list">
          {steps.map((step, index) => <li key={step.title} className="step">
            <span className="step-number">{index + 1}</span>
            <div><h3>{index + 1}. {step.title}</h3><p>{step.description}</p></div>
          </li>)}
        </ol>
      </section>
    </div>
  </section>
}
