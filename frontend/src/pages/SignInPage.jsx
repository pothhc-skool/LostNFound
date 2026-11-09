import { useState } from 'react';
import Icon from '../components/Icon'
import { AUTH_FIELD_NAMES, AUTH_ROLES } from '../data/fieldDefinitions'
import { validateLoginId, validateSignIn } from '../auth/fscEmail'
import './SignInPage.css'

/**
 * Page 2 — Sign In.
 * Students sign in with a RAM ID (R + 8 digits) or an @farmingdale.edu email.
 * Campus Security signs in with an @farmingdale.edu email only.
 * Rules live in src/auth/fscEmail.js.
 * This component still does not transmit or store credentials; the backend
 * auth service must repeat the domain check before creating a session.
 */
export default function SignInPage({ onNavigate }) {
  const [role, setRole] = useState(AUTH_ROLES.STUDENT)
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [notice, setNotice] = useState('')
  const [errors, setErrors] = useState({})

  function handleSubmit(event) {
    event.preventDefault()
    const result = validateSignIn({ loginId, password, role })
    setErrors(result.errors)

    if (!result.valid) {
      setNotice('')
      return
    }

    setLoginId(result.loginId)
    // Never keep the password in state longer than needed.
    setPassword('')
    const label = result.loginType === 'ramId' ? 'RAM ID' : 'FSC email'
    setNotice(
      `${result.loginId} is a valid ${label}. Authentication is not connected yet. Use Demo Account to preview the dashboard.`
    )
  }

  function handleLoginIdBlur() {
    if (!loginId) return
    const result = validateLoginId(loginId, role)
    setErrors(current => ({ ...current, loginId: result.error || undefined }))
  }

  function changeRole(nextRole) {
    setRole(nextRole)
    setNotice('')
    setErrors({})
  }

  const isStudent = role === AUTH_ROLES.STUDENT
  const loginLabel = isStudent ? 'RAM ID or FSC Email' : 'FSC Email Address'
  const loginPlaceholder = isStudent ? 'R01234567 or you@farmingdale.edu' : 'you@farmingdale.edu'

  return (
    <section className="signin-page" aria-labelledby="signin-heading">
      <div className="signin-panel">
        <header className="signin-heading">
          <h1 id="signin-heading">Welcome Back!</h1>
          <p>Sign in to your FSC Lost &amp; Found account.</p>
        </header>

        <form className="signin-form" onSubmit={handleSubmit} noValidate>
          <fieldset className="signin-role-fieldset">
            <legend>Sign in as</legend>
            <div className="signin-role-selector">
              <label className={`signin-role-option ${role === AUTH_ROLES.STUDENT ? 'is-selected' : ''}`}>
                <input type="radio" name={AUTH_FIELD_NAMES.ROLE} value={AUTH_ROLES.STUDENT} checked={role === AUTH_ROLES.STUDENT} onChange={() => changeRole(AUTH_ROLES.STUDENT)} />
                <Icon name="graduation" size={22}/><span>Student</span>
              </label>
              <label className={`signin-role-option ${role === AUTH_ROLES.CAMPUS_SECURITY ? 'is-selected' : ''}`}>
                <input type="radio" name={AUTH_FIELD_NAMES.ROLE} value={AUTH_ROLES.CAMPUS_SECURITY} checked={role === AUTH_ROLES.CAMPUS_SECURITY} onChange={() => changeRole(AUTH_ROLES.CAMPUS_SECURITY)} />
                <Icon name="shield" size={22}/><span>Campus Security</span>
              </label>
            </div>
          </fieldset>

          <div className="signin-field">
            <label htmlFor="signin-login-id">{loginLabel}</label>
            <div className="signin-input-wrap">
              <Icon name={isStudent ? 'signin' : 'mail'} size={23}/>
              <input id="signin-login-id" type="text" inputMode={isStudent ? 'text' : 'email'} name={AUTH_FIELD_NAMES.LOGIN_ID} value={loginId} onChange={e => { setLoginId(e.target.value); setNotice(''); setErrors(current => ({ ...current, loginId: undefined })) }} onBlur={handleLoginIdBlur} placeholder={loginPlaceholder} autoComplete="username" autoCapitalize="none" spellCheck={false} required aria-invalid={Boolean(errors.loginId)} aria-describedby={errors.loginId ? 'signin-login-id-error' : 'signin-login-id-hint'} />
            </div>
            {errors.loginId
              ? <p id="signin-login-id-error" className="signin-error" role="alert">{errors.loginId}</p>
              : <p id="signin-login-id-hint" className="signin-hint">{isStudent ? 'Use your RAM ID (R + 8 digits) or your @farmingdale.edu email.' : 'Use your @farmingdale.edu email.'}</p>}
          </div>

          <div className="signin-field">
            <label htmlFor="signin-password">Password</label>
            <div className="signin-input-wrap">
              <Icon name="lock" size={23}/>
              <input id="signin-password" type={showPassword ? 'text' : 'password'} name={AUTH_FIELD_NAMES.PASSWORD} value={password} onChange={e => { setPassword(e.target.value); setNotice(''); setErrors(current => ({ ...current, password: undefined })) }} placeholder="Enter your password" autoComplete="current-password" required aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'signin-password-error' : undefined} />
              <button className="signin-eye" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} onClick={() => setShowPassword(current => !current)}>
                <Icon name={showPassword ? 'eye-off' : 'eye'} size={22}/>
              </button>
            </div>
            {errors.password && <p id="signin-password-error" className="signin-error" role="alert">{errors.password}</p>}
          </div>

          <div className="signin-extras">
            <label className="signin-remember"><input type="checkbox" name={AUTH_FIELD_NAMES.REMEMBER_ME} checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}/> <span>Remember Me</span></label>
            <button type="button" className="signin-text-action" onClick={() => setNotice('Password recovery is not connected yet. Your team will add this when authentication is implemented.')}>Forgot Password?</button>
          </div>

          <button className="signin-submit" type="submit">Sign In</button>
          <button
  className="signin-back"
  type="button"
  onClick={() => onNavigate('my-account')}
>
  View Demo Account →
</button>
          {notice && <p className="signin-notice" role="status">{notice}</p>}
        </form>

        <button type="button" className="signin-back" onClick={() => onNavigate('home')}><span aria-hidden="true">←</span> Back to Home</button>
        <img className="signin-footer-logo" src="/images/branding/fsc-lost-found-horizontal.png" alt="FSC Lost & Found" />
      </div>
    </section>
  )
}
