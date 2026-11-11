import React, { useMemo, useState } from 'react'
import { DEMO_ACCOUNT, DEMO_REPORTS, REPORT_STAGES } from '../data/accountDemoData'
import './AccountPage.css'

const ACTIVE_STATUSES = new Set(['reported', 'possible_match', 'under_verification', 'ready_for_pickup'])
const STATUS_LABELS = Object.fromEntries([...REPORT_STAGES.map(s => [s.id, s.label]), ['closed','Closed'], ['cancelled','Cancelled']])
const prettyDate = date => new Date(`${date}T12:00:00`).toLocaleDateString('en-US',{month:'short', day:'numeric', year:'numeric'})
const initials = name => name.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase()
const safeScore = value => typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 100 ? Math.round(value) : null

function Badge({status}) { return <span className={`account-badge account-badge--${status}`}>{STATUS_LABELS[status] || 'Unknown'}</span> }
function StageProgress({report}) {
  const current = REPORT_STAGES.findIndex(s => s.id === report.status)
  return <div className="account-stages" aria-label={`Status for ${report.title}: ${STATUS_LABELS[report.status] || report.status}`}>
    {REPORT_STAGES.map((stage,index)=><div className={`account-stage ${current >= index ? 'account-stage--completed' : ''} ${current === index ? 'account-stage--current' : ''}`} key={stage.id} aria-current={current === index ? 'step' : undefined}>{stage.label}</div>)}
  </div>
}

function ReportCard({report, onChange, readOnly = false}) {
  const [expanded, setExpanded] = useState(false)
  const [editing, setEditing] = useState(false)
  const [confirmCancel, setConfirmCancel] = useState(false)
  const [draft, setDraft] = useState({title:report.title,category:report.category,location:report.location,description:report.description})
  const active = ACTIVE_STATUSES.has(report.status) && !report.archiveSemester
  const maxMatch = report.possibleMatches.map(m => safeScore(m.matchScore)).filter(s => s !== null)
  const bestMatch = maxMatch.length ? Math.max(...maxMatch) : null
  function saveEdit(e) {
    e.preventDefault()
    if (!draft.title.trim() || !draft.location.trim()) return
    onChange(report.id,{title:draft.title.trim(),category:draft.category.trim(),location:draft.location.trim(),description:draft.description.trim()})
    setEditing(false)
  }
  function cancelEdit() { setDraft({title:report.title,category:report.category,location:report.location,description:report.description}); setEditing(false) }
  return <article className="account-report-card">
    <div className="account-report-row">
      <button type="button" className="account-report-title" aria-expanded={expanded} onClick={()=>setExpanded(v=>!v)}>
        <span className="account-item-symbol" aria-hidden="true">{report.category === 'Books'?'▤':report.category === 'Electronics'?'♫':report.category === 'Wallets & IDs'?'▣':'◇'}</span>
        <span><strong>{report.title}</strong><small>{report.category}</small></span>
        <span className="account-chevron">{expanded?'▴':'▾'}</span>
      </button>
      <div className="account-report-meta"><span className="account-type">{report.type === 'lost'?'Lost':'Found'}</span><span>{report.location}</span><span>{prettyDate(report.reportedAt)}</span><Badge status={report.status}/></div>
      <div className="account-report-actions">
        <button type="button" onClick={()=>{setExpanded(v=>!v);setEditing(false)}}>{expanded?'Hide':'View'}</button>
        {!readOnly && active && <><button type="button" onClick={()=>{setExpanded(true);setEditing(true);setConfirmCancel(false)}}>Edit</button><button type="button" onClick={()=>setConfirmCancel(true)}>Cancel</button></>}
      </div>
    </div>
    {expanded && <div className="account-report-details">
      <div className="account-report-details-header"><strong>Report {report.id}</strong><span>Current status: {STATUS_LABELS[report.status]}</span></div>
      <StageProgress report={report}/>
      {bestMatch !== null && <p className="account-match-score">Possible match: <strong>{bestMatch}% (sample only)</strong>. Actual match scores will come from a future AI service, after human verification.</p>}
      <p className="account-description">{report.description || 'No description available.'}</p>
      {report.claimPending && <p className="account-note">A claim is awaiting staff verification. This demo does not perform verification.</p>}
      {report.archiveSemester && <p className="account-note">Archived: {report.archiveSemester}. Original status preserved.</p>}
      {editing && <form className="account-edit-form" onSubmit={saveEdit}>
        <label>Item name<input maxLength={120} value={draft.title} onChange={e=>setDraft(d=>({...d,title:e.target.value}))} required/></label>
        <label>Category<input maxLength={70} value={draft.category} onChange={e=>setDraft(d=>({...d,category:e.target.value}))}/></label>
        <label>Location<input maxLength={120} value={draft.location} onChange={e=>setDraft(d=>({...d,location:e.target.value}))} required/></label>
        <label className="account-full">Description<textarea rows={3} maxLength={1000} value={draft.description} onChange={e=>setDraft(d=>({...d,description:e.target.value}))}/></label>
        <div className="account-form-actions"><button type="button" className="account-button-secondary" onClick={cancelEdit}>Discard</button><button type="submit" className="account-button-primary">Save demo changes</button></div>
      </form>}
    </div>}
    {confirmCancel && <div className="account-confirm" role="group" aria-label={`Confirm cancellation of ${report.title}`}>
      <span>Cancel report “{report.title}”? Its record will remain under Past Reports.</span>
      <button type="button" className="account-danger" onClick={()=>{onChange(report.id,{status:'cancelled',claimPending:false});setConfirmCancel(false);setExpanded(false)}}>Confirm cancellation</button>
      <button type="button" className="account-button-secondary" onClick={()=>setConfirmCancel(false)}>Keep report</button>
    </div>}
  </article>
}

export default function AccountPage({onNavigate}) {
  const [reports,setReports] = useState(DEMO_REPORTS)
  const [pastFilter,setPastFilter] = useState('all')
  const [profileEditing,setProfileEditing] = useState(false)
  const [profile,setProfile] = useState(DEMO_ACCOUNT)
  const [profileDraft,setProfileDraft] = useState(DEMO_ACCOUNT.name)
  const [showArchives,setShowArchives] = useState(false)
  const activeReports = useMemo(()=>reports.filter(r=>!r.archiveSemester && ACTIVE_STATUSES.has(r.status)),[reports])
  const pastReports = useMemo(()=>reports.filter(r=>!r.archiveSemester && !ACTIVE_STATUSES.has(r.status)),[reports])
  const archivedReports = useMemo(()=>reports.filter(r=>Boolean(r.archiveSemester)),[reports])
  const metrics = {
    active: activeReports.length,
    possible: activeReports.filter(r=>r.possibleMatches.some(m=>safeScore(m.matchScore)!==null)).length,
    claims: activeReports.filter(r=>r.claimPending).length,
    recovered: reports.filter(r=>r.status==='returned').length,
  }
  const filteredPast = pastReports.filter(r=> pastFilter==='all' || (pastFilter==='returned'?r.status==='returned':r.status!=='returned'))
  const editReport = (id,changes) => setReports(items=>items.map(r=>r.id===id?{...r,...changes}:r))
  function saveProfile(e){e.preventDefault(); if(profileDraft.trim()){setProfile(p=>({...p,name:profileDraft.trim()}));setProfileEditing(false)}}

  return <section className="account-page page-card" aria-labelledby="account-title">
    <header className="account-page-top"><div><p className="account-demo-label">DEMO DATA — NOT A SIGNED-IN ACCOUNT</p><h1 id="account-title">My Account</h1></div><button className="account-button-dark" type="button" onClick={()=>onNavigate('forms')}>Create new</button></header>
    <div className="account-profile">
      <span className="account-avatar" aria-hidden="true">{initials(profile.name)}</span>
      <div className="account-profile-info"><strong>{profile.name}</strong><span>{profile.email}</span><span>Student ID •••• {profile.studentIdLast4}</span></div>
      <button type="button" className="account-button-secondary" onClick={()=>setProfileEditing(v=>!v)}>{profileEditing?'Close':'Edit profile'}</button>
    </div>
    {profileEditing && <form className="account-profile-form" onSubmit={saveProfile}><label>Display name <input value={profileDraft} maxLength={100} onChange={e=>setProfileDraft(e.target.value)} required/></label><button type="submit" className="account-button-primary">Save demo profile</button><p>Email and ID are read-only placeholders; a backend must provide verified values.</p></form>}
    <div className="account-metrics" aria-label="Report summary">
      {[["Active reports",metrics.active],["Possible matches",metrics.possible],["Claims in progress",metrics.claims],["Items recovered",metrics.recovered]].map(([label,n])=><div className="account-metric" key={label}><span>{label}</span><strong>{n}</strong></div>)}
    </div>
    {metrics.possible > 0 && <button className="account-button-primary" type="button" onClick={()=>onNavigate('possible-matches')}>Review possible matches ({metrics.possible})</button>}
    <section className="account-report-section" aria-labelledby="active-report-title">
      <div className="account-section-heading"><h2 id="active-report-title">Active reports</h2><span>{activeReports.length} open</span></div>
      <div className="account-report-list">{activeReports.length ? activeReports.map(report=><ReportCard key={report.id} report={report} onChange={editReport}/>) : <p className="account-empty">No active reports. Create one to get started.</p>}</div>
    </section>
    <section className="account-report-section" aria-labelledby="past-report-title">
      <div className="account-section-heading"><h2 id="past-report-title">Past reports</h2><span>Closed and recovered reports</span></div>
      <div className="account-filters" role="group" aria-label="Past report filter">{[['all','All'],['returned','Returned'],['closed','Closed / Cancelled']].map(([key,label])=><button key={key} type="button" className={pastFilter===key?'selected':''} aria-pressed={pastFilter===key} onClick={()=>setPastFilter(key)}>{label}</button>)}</div>
      <div className="account-report-list">{filteredPast.length ? filteredPast.map(report=><ReportCard key={report.id} report={report} onChange={editReport} readOnly/>) : <p className="account-empty">No reports in this category.</p>}</div>
    </section>
    <section className="account-report-section" aria-labelledby="archive-title">
      <div className="account-section-heading"><h2 id="archive-title">Archives</h2><span>Records from completed semesters</span></div>
      <button className="account-archive-toggle" type="button" aria-expanded={showArchives} onClick={()=>setShowArchives(v=>!v)}>{showArchives?'Hide archives':'View archived reports'} <span aria-hidden="true">{showArchives?'▴':'▾'}</span></button>
      {showArchives && <div className="account-report-list">{archivedReports.length?archivedReports.map(report=><div key={report.id}><p className="account-archive-semester">{report.archiveSemester}</p><ReportCard report={report} onChange={editReport} readOnly/></div>):<p className="account-empty">No archived reports yet.</p>}</div>}
    </section>
    <p className="account-data-notice">This page is a local frontend prototype. Edits, cancellations, and profile changes reset on refresh. Real student records, AI matching, account permissions, and semester archiving require backend services.</p>
  </section>
}
