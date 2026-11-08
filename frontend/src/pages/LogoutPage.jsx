
import React from 'react'

export default function LogoutPage({ onNavigate }) {
  return (
    <section className="account-page page-card">
      <div style={{ textAlign: 'center', padding: '50px 20px' }}>
        <h1>Successfully Logged Out</h1>

        <p>
          You have successfully exited your demo account.
        </p>

        <button
          type="button"
          className="account-button-dark"
          onClick={() => onNavigate('sign-in')}
        >
          Return to Sign In
        </button>
      </div>
    </section>
  )
}
