import React from 'react'
import './ReportConfirmationPage.css'

/**
 * Page 5 — report confirmation DESIGN PREVIEW.
 * No backend submission exists; never claim that a report was stored.
 * When an API is implemented, replace this preview with an authenticated,
 * server-confirmed receipt, including the server-issued report ID.
 */
export default function ReportConfirmationPage({ onNavigate }) {
  return (
    <section className="confirmation-page" aria-labelledby="confirmation-title">
      <header className="confirmation-page-heading">
        <div>
          <h1 id="confirmation-title">Lost and Found Report</h1>
          <p>Submission confirmation — frontend preview</p>
        </div>
        <div className="confirmation-page-heading-actions" aria-label="Prototype status">
          <span className="confirmation-notification">♧ &nbsp; No reports submitted</span>
          <span className="confirmation-demo-user"><span className="confirmation-avatar">JD</span> Demo user</span>
        </div>
      </header>

      <div className="confirmation-center">
        <div className="confirmation-card">
          <div className="confirmation-success-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="m6 17 7 7L27 9" /></svg>
          </div>
          <div className="confirmation-main-copy">
            <h2>Report confirmation preview</h2>
            <p>This is how the confirmation will appear after a successful report submission. No report has been submitted yet.</p>
          </div>

          <div className="confirmation-reference">
            <div className="confirmation-reference-heading">
              <span>Sample report ID</span>
              <span className="confirmation-sample-pill">SAMPLE</span>
            </div>
            <strong>LF-2026-001847</strong>
            <p>Example reference only. A real report ID will be assigned by the backend after submission.</p>
          </div>

          <div className="confirmation-next">
            <div className="confirmation-next-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 19 5v6c0 5-3 8-7 11-4-3-7-6-7-11V5l7-3Z"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <div>
              <h3>What happens next?</h3>
              <p>After a real report is submitted, Campus Security will review its details and coordinate follow-up. Students will be able to track status updates from their account.</p>
            </div>
          </div>

          <div className="confirmation-actions">
            <button type="button" className="confirmation-button confirmation-button--primary" onClick={() => onNavigate?.('home')}>Return to home</button>
            <button type="button" className="confirmation-button confirmation-button--secondary" onClick={() => onNavigate?.('forms')}>Submit another report</button>
          </div>
        </div>
        <p className="confirmation-disclaimer">Design preview only. The sample report ID does not represent a real submission.</p>
        <img className="confirmation-brand" src="/images/branding/fsc-lost-found-horizontal.png" alt="FSC Lost & Found" />
      </div>
    </section>
  )
}
