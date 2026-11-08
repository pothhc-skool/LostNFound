import { describe, it, expect } from 'vitest'
import {
  validateFscEmail,
  validateRamId,
  validateStudentLoginId,
  validateLoginId,
  validateSignIn,
  normalizeEmail,
  EMAIL_ERRORS,
  RAM_ID_ERRORS,
  LOGIN_ID_ERRORS,
  PASSWORD_ERRORS,
} from './fscEmail'
import { AUTH_ROLES } from '../data/fieldDefinitions'

const STUDENT = AUTH_ROLES.STUDENT
const SECURITY = AUTH_ROLES.CAMPUS_SECURITY

describe('normalizeEmail', () => {
  it('trims and lowercases', () => {
    expect(normalizeEmail('  JDoe@Farmingdale.EDU ')).toBe('jdoe@farmingdale.edu')
  })
  it('handles null and undefined', () => {
    expect(normalizeEmail(null)).toBe('')
    expect(normalizeEmail(undefined)).toBe('')
  })
})

describe('validateFscEmail - accepted', () => {
  it.each([
    'quinm@farmingdale.edu',
    'john.doe@farmingdale.edu',
    'j_doe+lost@farmingdale.edu',
    'STAFF123@FARMINGDALE.EDU',
    '  student@farmingdale.edu  ',
  ])('accepts %s', input => {
    const result = validateFscEmail(input)
    expect(result.valid).toBe(true)
    expect(result.error).toBeNull()
    expect(result.email.endsWith('@farmingdale.edu')).toBe(true)
  })
})

describe('validateFscEmail - wrong domain', () => {
  it.each([
    'student@gmail.com',
    'student@farmingdale.com',
    'student@farmingdale.edu.com',
    'student@farmingdale.edu.evil.org',
    'student@sub.farmingdale.edu',
    'student@notfarmingdale.edu',
    'student@farmingdale-edu.com',
  ])('rejects %s', input => {
    expect(validateFscEmail(input)).toMatchObject({ valid: false, error: EMAIL_ERRORS.DOMAIN })
  })
})

describe('validateFscEmail - bad format', () => {
  it('requires a value', () => {
    expect(validateFscEmail('')).toMatchObject({ valid: false, error: EMAIL_ERRORS.REQUIRED })
    expect(validateFscEmail('   ')).toMatchObject({ valid: false, error: EMAIL_ERRORS.REQUIRED })
  })
  it.each([
    'farmingdale.edu',
    '@farmingdale.edu',
    'student@',
    'a@b@farmingdale.edu',
    'stu dent@farmingdale.edu',
    '.student@farmingdale.edu',
    'student.@farmingdale.edu',
    'stu..dent@farmingdale.edu',
    'student<script>@farmingdale.edu',
    `${'a'.repeat(65)}@farmingdale.edu`,
  ])('rejects %s', input => {
    expect(validateFscEmail(input)).toMatchObject({ valid: false, error: EMAIL_ERRORS.FORMAT })
  })
})

describe('validateRamId', () => {
  it.each(['R01234567', 'r01234567', '  R12345678 '])('accepts %s', input => {
    const result = validateRamId(input)
    expect(result.valid).toBe(true)
    expect(result.ramId).toMatch(/^R\d{8}$/)
  })
  it.each([
    'R0234444',    // 7 digits
    'R012345679',  // 9 digits
    '01234567',    // no R
    'RR2344448',
    'R0234444A',
    'X01234567',
    'R 01234567',
  ])('rejects %s', input => {
    expect(validateRamId(input)).toMatchObject({ valid: false, error: RAM_ID_ERRORS.FORMAT })
  })
})

describe('validateStudentLoginId', () => {
  it('accepts a RAM ID and uppercases it', () => {
    expect(validateStudentLoginId('r01234567'))
      .toEqual({ valid: true, type: 'ramId', value: 'R01234567', error: null })
  })
  it('accepts an FSC email', () => {
    expect(validateStudentLoginId('Quinm@Farmingdale.edu'))
      .toEqual({ valid: true, type: 'email', value: 'quinm@farmingdale.edu', error: null })
  })
  it('requires a value', () => {
    expect(validateStudentLoginId('  ')).toMatchObject({ valid: false, error: LOGIN_ID_ERRORS.REQUIRED })
  })
  it('gives the domain error for a non-FSC email', () => {
    expect(validateStudentLoginId('me@gmail.com')).toMatchObject({ valid: false, type: 'email', error: EMAIL_ERRORS.DOMAIN })
  })
  it('gives the RAM ID hint for a short RAM ID', () => {
    expect(validateStudentLoginId('R123')).toMatchObject({ valid: false, error: RAM_ID_ERRORS.FORMAT })
  })
  it('gives the combined hint for random text', () => {
    expect(validateStudentLoginId('quinm')).toMatchObject({ valid: false, error: LOGIN_ID_ERRORS.FORMAT })
  })
})

describe('validateLoginId by role', () => {
  it('lets students use a RAM ID', () => {
    expect(validateLoginId('R01234567', STUDENT).valid).toBe(true)
  })
  it('does not let Campus Security use a RAM ID', () => {
    expect(validateLoginId('R01234567', SECURITY)).toMatchObject({ valid: false, error: EMAIL_ERRORS.FORMAT })
  })
  it('lets Campus Security use an FSC email', () => {
    expect(validateLoginId('officer@farmingdale.edu', SECURITY).valid).toBe(true)
  })
})

describe('validateSignIn', () => {
  it('passes with a RAM ID and password', () => {
    expect(validateSignIn({ loginId: 'r01234567', password: 'secret', role: STUDENT }))
      .toEqual({ valid: true, loginId: 'R01234567', loginType: 'ramId', errors: {} })
  })
  it('passes with FSC email and password', () => {
    expect(validateSignIn({ loginId: 'quinm@farmingdale.edu', password: 'secret', role: STUDENT }))
      .toEqual({ valid: true, loginId: 'quinm@farmingdale.edu', loginType: 'email', errors: {} })
  })
  it('reports both errors when empty', () => {
    const result = validateSignIn({ loginId: '', password: '', role: STUDENT })
    expect(result.valid).toBe(false)
    expect(result.errors).toEqual({ loginId: LOGIN_ID_ERRORS.REQUIRED, password: PASSWORD_ERRORS.REQUIRED })
  })
  it('blocks non-FSC email even with a password', () => {
    const result = validateSignIn({ loginId: 'me@gmail.com', password: 'secret', role: STUDENT })
    expect(result.valid).toBe(false)
    expect(result.errors.loginId).toBe(EMAIL_ERRORS.DOMAIN)
  })
})
