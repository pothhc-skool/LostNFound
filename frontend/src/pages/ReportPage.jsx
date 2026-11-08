import React, { useState } from 'react'
import { INITIAL_REPORT, REPORT_CATEGORIES, REPORT_FIELDS } from '../data/reportFields'
import './ReportPage.css'
import { isValidIncidentDate } from '../utils/reportValidation'

const CAMPUS_LOCATIONS = ['Campus Center', 'Greenley Library', 'Whitman Hall', 'Hale Hall', 'Lupton Hall', 'Nold Hall', 'Other / Unsure']

function Field({ label, name, children, help }) {
  return <label className="report-field"><span>{label}</span>{children}{help && <small>{help}</small>}</label>
}
function Section({ title, subtitle, children }) {
  return <section className="report-section"><div className="report-section-title"><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div><div className="report-section-body">{children}</div></section>
}

/** Page 4: UI prototype only. Never treat this form as a saved report. */
export default function ReportPage({ onNavigate }) {
  const [values, setValues] = useState(INITIAL_REPORT)
const update = (name, value) => { setValues(previous => ({ ...previous, [name]: value  }))
}
  const inputProps = name => ({ name: REPORT_FIELDS[name], value: values[name], onChange: event => update(name, event.target.value) })

function submit(event) {
  event.preventDefault()

  if (!isValidIncidentDate(values.incidentDate)) {
    window.alert('Please enter a valid date that is not in the future.')
    return
  }

  if (event.currentTarget.reportValidity()) {
    onNavigate('report-confirmation')
  }
}


  return <div className="report-page">
    <header className="report-header"><div><p className="report-kicker">FSC LOST &amp; FOUND · FRONTEND DEMO</p><h1>Lost and Found Report</h1><p>Choose whether you are reporting a lost item or a found item, then provide as much information as possible.</p></div><div className="report-header-side"><span>○ No reports submitted</span><span className="report-user">JD &nbsp; Demo user</span></div></header>
    <form onSubmit={submit} className="report-grid">
      <div className="report-column">
        <Section title="Personal information" subtitle="How can we contact you about this item?">
          <Field label="Name"><input {...inputProps('fullName')} placeholder="Enter your full name" maxLength={100} autoComplete="name" required /></Field>
          <Field label="Email address"><input {...inputProps('email')} type="email" placeholder="you@farmingdale.edu" autoComplete="email" maxLength={150} required /></Field>
          <Field label="Student ID" help="This field is only for the prototype. Do not enter your real student ID until a secure backend is connected."><input {...inputProps('studentId')} placeholder="Demo ID only" maxLength={20} /></Field>
          <Field label="Phone"><input {...inputProps('phone')} type="tel" placeholder="(555) 555-1234" autoComplete="tel" maxLength={25} /></Field>
          <div className="report-info">🔒 Your contact details should only be visible to authorized campus staff after secure account integration. This prototype does not save information.</div>
        </Section>
        <Section title="Item details" subtitle="Give identifying details that can help match the item.">
          <Field label="Category"><select {...inputProps('category')} required><option value="">Select category</option>{REPORT_CATEGORIES.map(category => <option key={category} value={category}>{category}</option>)}</select></Field>
          <Field label="Item name"><input {...inputProps('itemName')} placeholder="e.g. Black umbrella, blue backpack" maxLength={120} required /></Field>
          <Field label="Description"><textarea {...inputProps('description')} rows={5} maxLength={1500} placeholder="Color, brand, distinctive marks, contents, etc." required /></Field>
          <Field label="Estimated value (USD)"><input {...inputProps('estimatedValue')} type="number" min="0" max="1000000" step="0.01" placeholder="Optional" /></Field>
        </Section>
      </div>
      <div className="report-column">
        <Section title="Report type" subtitle="Are you reporting a lost item or an item you found?">
          <Field label="Report type"><select {...inputProps('reportType')} required><option value="lost">Lost item</option><option value="found">Found item</option></select></Field>
          <div className="report-choice-hint">{values.reportType === 'lost' ? 'I lost something and would like help finding it.' : 'I found something and want to help return it.'}</div>
        </Section>
        <Section title="Time and location" subtitle="Tell us when and where you last saw the item.">
          <Field label={values.reportType === 'lost' ? 'Date last seen' : 'Date found'}><input {...inputProps('incidentDate')} type="date" required /></Field>
          <Field label="Approximate time"><input {...inputProps('incidentTime')} type="time" /></Field>
          <Field label="Campus location"><select {...inputProps('campusLocation')} required><option value="">Select campus location</option>{CAMPUS_LOCATIONS.map(location => <option value={location} key={location}>{location}</option>)}</select></Field>
        </Section>
        <Section title="Approximate location" subtitle="Use the map area as a reference and describe where the item was lost or found.">
          <div className="report-map" aria-label="Campus map placeholder; map integration has not been added"><div className="report-map-mark">⌖</div><strong>Farmingdale State College</strong><span>Campus map preview</span><small>Map integration pending — this is not a verified map or selected location.</small></div>
          <div className="report-location-readout"><strong>Selected area</strong><span>{values.campusLocation || 'Choose a campus location above'}</span></div>
          <div className="report-info">ⓘ Add landmarks, building entrances, room numbers, or nearby locations to help identify the area. Do not include sensitive personal information.</div>
          <Field label="Describe the exact location"><textarea {...inputProps('locationDetails')} rows={4} placeholder="e.g. Near the entrance to the library" maxLength={1000} /></Field>
        </Section>
        <Section title="Lost and Found Liability Notice">
          <p className="report-liability">FSC Lost &amp; Found cannot guarantee recovery or return of lost items. Item condition and descriptions cannot be guaranteed. This draft notice requires institutional/legal approval before production use.</p>
          <label className="report-check"><input type="checkbox" name={REPORT_FIELDS.liabilityAccepted} checked={values.liabilityAccepted} onChange={e => update('liabilityAccepted', e.target.checked)} required /><span>I acknowledge the notice above.</span></label>
          <button className="report-submit" type="submit"> Continue to confirmation preview <span aria-hidden="true">→</span> </button>
          </Section>
      </div>
    </form>
    <p className="report-disclaimer">Frontend prototype only. No student data, reports, files, or locations are stored or sent to a server.</p>
    {onNavigate && <button type="button" className="report-back" onClick={() => onNavigate('my-account')}>← Back to My Account</button>}
  </div>

}
