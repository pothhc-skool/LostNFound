import { useState } from 'react'
import { DEMO_REPORTS } from '../data/accountDemoData'
import './PossibleMatchesPage.css'

const reportsWithMatches = DEMO_REPORTS.filter(report => report.possibleMatches.length > 0)
const prettyDate = date => new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
const normalizeAnswer = answer => answer.trim().toLocaleLowerCase().replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\s+/g, ' ')

function MatchQuestionnaire({ match }) {
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  function submitQuestionnaire(event) {
    event.preventDefault()
    const matchedAnswers = match.securityCheck.filter(question =>
      normalizeAnswer(answers[question.id] || '') === normalizeAnswer(question.answer)
    ).length
    setResult({ matchedAnswers, total: match.securityCheck.length })
  }

  function resetQuestionnaire() {
    setAnswers({})
    setResult(null)
  }

  return (
    <section className="match-questionnaire" aria-labelledby={`questionnaire-${match.id}`}>
      <div className="match-questionnaire-heading">
        <div>
          <h3 id={`questionnaire-${match.id}`}>Private item verification</h3>
          <p>Enter details only the owner is likely to know. Identifying answers are not shown in the item listing.</p>
        </div>
        {result === null
          ? <span className="questionnaire-progress">{Object.keys(answers).length} of {match.securityCheck.length} answered</span>
          : <button type="button" className="questionnaire-reset" onClick={resetQuestionnaire}>Try again</button>}
      </div>

      {result === null ? (
        <form className="questionnaire-form" onSubmit={submitQuestionnaire}>
          {match.securityCheck.map((question, index) => (
            <label className="questionnaire-field" key={question.id}>
              <span><strong>{index + 1}.</strong> {question.prompt}</span>
              <input
                required
                type="text"
                maxLength={200}
                autoComplete="off"
                value={answers[question.id] ?? ''}
                onChange={event => setAnswers(current => ({ ...current, [question.id]: event.target.value }))}
                placeholder="Enter the detail you remember"
              />
            </label>
          ))}
          <button type="submit" className="questionnaire-submit">Submit answers</button>
        </form>
      ) : (
        <div className={`questionnaire-result ${result.matchedAnswers >= 3 ? 'questionnaire-result--likely' : ''}`} role="status">
          <strong>{result.matchedAnswers} of {result.total} details matched the private sample answers.</strong>
          <p>{result.matchedAnswers >= 3
            ? 'The answers support this possible match. Continue to staff review; this result alone does not establish ownership.'
            : 'There is not enough matching detail to support this possible match. Check what you entered or contact staff.'}</p>
          <p>This is a local demo comparison, not an AI decision or ownership verification. A real check must be performed securely by a backend and reviewed by staff.</p>
        </div>
      )}
      <p className="questionnaire-disclaimer">Demo only: answers are checked in this page, not saved or sent anywhere. Production verification must keep answer keys private on the server.</p>
    </section>
  )
}

export default function PossibleMatchesPage({ onNavigate }) {
  return (
    <section className="matches-page page-card" aria-labelledby="matches-title">
      <header className="matches-page-header">
        <div>
          <p className="matches-demo-label">DEMO DATA — SAMPLE MATCHES</p>
          <h1 id="matches-title">Possible Matches</h1>
          <p>Review found-item reports that may correspond to your lost-item reports.</p>
        </div>
        <button className="matches-back-button" type="button" onClick={() => onNavigate('my-account')}>Back to My Account</button>
      </header>

      <p className="matches-notice">These examples are manually written demo data. No AI analysis or real report search has been performed, and these reports are not stored or sent to a server.</p>

      {reportsWithMatches.length ? reportsWithMatches.map(report => report.possibleMatches.map(match => (
        <article className="match-card" key={`${report.id}-${match.id}`}>
          <header className="match-card-header">
            <div>
              <span className="match-reference">Match for report {report.id}</span>
              <h2>{report.title}</h2>
            </div>
            <div className="match-score" aria-label={`${match.matchScore}% sample match score`}>
              <strong>{match.matchScore}%</strong>
              <span>sample score</span>
            </div>
          </header>

          <div className="match-comparison">
            <section className="match-item">
              <p className="match-item-label">Your lost-item report</p>
              <h3>{report.title}</h3>
              <dl>
                <div><dt>Category</dt><dd>{report.category}</dd></div>
                <div><dt>Last seen</dt><dd>{report.location} · {prettyDate(report.reportedAt)}</dd></div>
                <div><dt>Description</dt><dd>{report.description}</dd></div>
              </dl>
            </section>
            <section className="match-item match-item--found">
              <p className="match-item-label">Sample found-item report</p>
              <h3>{match.item.title}</h3>
              <dl>
                <div><dt>Category</dt><dd>{match.item.category}</dd></div>
                <div><dt>Found</dt><dd>{match.item.location} · {prettyDate(match.item.reportedAt)}</dd></div>
                <div><dt>Description</dt><dd>Identifying details are withheld for private verification.</dd></div>
              </dl>
            </section>
          </div>

          <p className="match-explanation">{match.explanation}</p>
          {match.securityCheck?.length > 0 && <MatchQuestionnaire key={match.id} match={match} />}
        </article>
      ))) : <p className="matches-empty">There are no sample matches to review.</p>}

      <p className="matches-footer">A real match review requires backend report data and staff verification before an item can be claimed or returned.</p>
    </section>
  )
}
