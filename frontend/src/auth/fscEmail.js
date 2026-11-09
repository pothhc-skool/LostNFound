/**
 * FSC sign-in rules (User Story: log in using an @farmingdale.edu email).
 *
 * Students may sign in with a RAM ID (R + 8 digits, e.g. R01234567)
 * or an @farmingdale.edu email. Campus Security signs in with email only.
 *
 * Only addresses whose domain is exactly "farmingdale.edu" are accepted.
 * Look-alike domains (farmingdale.edu.com, farmingdale-edu.com,
 * sub.farmingdale.edu, farmingdale.edu.evil.org) are rejected.
 *
 * Client-side checks improve the user experience only. The backend MUST
 * repeat this check before issuing a session, because browser code can be bypassed.
 */
import { AUTH_ROLES } from '../data/fieldDefinitions'

export const FSC_EMAIL_DOMAIN = 'farmingdale.edu'

// Local part: letters, digits and . _ % + - ; no leading, trailing or double dots.
const LOCAL_PART = /^[a-z0-9_%+-]+(\.[a-z0-9_%+-]+)*$/
const MAX_EMAIL_LENGTH = 254
const MAX_LOCAL_LENGTH = 64

export const EMAIL_ERRORS = Object.freeze({
  REQUIRED: 'Enter your FSC email address.',
  FORMAT: 'Enter a valid email address, like you@farmingdale.edu.',
  DOMAIN: 'Use your @farmingdale.edu email address to sign in.',
})

export const RAM_ID_ERRORS = Object.freeze({
  FORMAT: 'A RAM ID is the letter R followed by 8 digits, like R01234567.',
})

export const LOGIN_ID_ERRORS = Object.freeze({
  REQUIRED: 'Enter your RAM ID or FSC email address.',
  FORMAT: 'Enter a RAM ID (like R01234567) or an @farmingdale.edu email address.',
})

export const PASSWORD_ERRORS = Object.freeze({
  REQUIRED: 'Enter your password.',
})

/** Trim surrounding spaces and lowercase so "  JDoe@Farmingdale.EDU " matches. */
export function normalizeEmail(value) {
  return String(value ?? '').trim().toLowerCase()
}

/**
 * Validate an email for FSC sign-in.
 * @returns {{ valid: boolean, email: string, error: string | null }}
 */
export function validateFscEmail(value) {
  const email = normalizeEmail(value)

  if (!email) return { valid: false, email, error: EMAIL_ERRORS.REQUIRED }
  if (email.length > MAX_EMAIL_LENGTH || /\s/.test(email)) {
    return { valid: false, email, error: EMAIL_ERRORS.FORMAT }
  }

  const parts = email.split('@')
  if (parts.length !== 2) return { valid: false, email, error: EMAIL_ERRORS.FORMAT }

  const [local, domain] = parts
  if (!local || local.length > MAX_LOCAL_LENGTH || !LOCAL_PART.test(local) || !domain) {
    return { valid: false, email, error: EMAIL_ERRORS.FORMAT }
  }

  if (domain !== FSC_EMAIL_DOMAIN) return { valid: false, email, error: EMAIL_ERRORS.DOMAIN }

  return { valid: true, email, error: null }
}

const RAM_ID = /^R\d{8}$/

/** Trim spaces and uppercase so "r01234567" matches. */
export function normalizeRamId(value) {
  return String(value ?? '').trim().toUpperCase()
}

/**
 * Validate a RAM ID: the letter R followed by exactly 8 digits.
 * @returns {{ valid: boolean, ramId: string, error: string | null }}
 */
export function validateRamId(value) {
  const ramId = normalizeRamId(value)
  if (!ramId) return { valid: false, ramId, error: LOGIN_ID_ERRORS.REQUIRED }
  if (!RAM_ID.test(ramId)) return { valid: false, ramId, error: RAM_ID_ERRORS.FORMAT }
  return { valid: true, ramId, error: null }
}

/**
 * Validate what a student typed in the username box: RAM ID or FSC email.
 * Anything with an @ is treated as an email; anything else as a RAM ID.
 * @returns {{ valid: boolean, type: 'ramId' | 'email' | null, value: string, error: string | null }}
 */
export function validateStudentLoginId(value) {
  const raw = String(value ?? '').trim()
  if (!raw) return { valid: false, type: null, value: '', error: LOGIN_ID_ERRORS.REQUIRED }

  if (raw.includes('@')) {
    const result = validateFscEmail(raw)
    return { valid: result.valid, type: 'email', value: result.email, error: result.error }
  }

  const result = validateRamId(raw)
  // Plain text that is neither a RAM ID nor an email gets the combined hint.
  const looksLikeRamId = /^r\d*$/i.test(raw)
  const error = result.valid ? null : looksLikeRamId ? RAM_ID_ERRORS.FORMAT : LOGIN_ID_ERRORS.FORMAT
  return { valid: result.valid, type: 'ramId', value: result.ramId, error }
}

/**
 * Validate the login ID for the selected role.
 * Students: RAM ID or FSC email. Campus Security: FSC email only.
 */
export function validateLoginId(value, role) {
  if (role === AUTH_ROLES.STUDENT) return validateStudentLoginId(value)
  const result = validateFscEmail(value)
  return { valid: result.valid, type: 'email', value: result.email, error: result.error }
}

/** Validate the whole sign-in form. Returns field errors (empty object when valid). */
export function validateSignIn({ loginId, password, role }) {
  const errors = {}
  const idResult = validateLoginId(loginId, role)
  if (!idResult.valid) errors.loginId = idResult.error
  if (!password) errors.password = PASSWORD_ERRORS.REQUIRED
  return {
    valid: Object.keys(errors).length === 0,
    loginId: idResult.value,
    loginType: idResult.type,
    errors,
  }
}
