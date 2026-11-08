
import { describe, it, expect } from 'vitest'
import { isValidIncidentDate } from './reportValidation'

describe('Lost and Found Report Date Validation', () => {
  const today = new Date(2026, 10, 8)

  it('accepts a past incident date', () => {
    expect(isValidIncidentDate('2026-11-01', today)).toBe(true)
  })

  it('accepts the current date', () => {
    expect(isValidIncidentDate('2026-11-08', today)).toBe(true)
  })

  it('rejects a future incident date', () => {
    expect(isValidIncidentDate('2026-11-09', today)).toBe(false)
  })

  it('rejects an empty incident date', () => {
    expect(isValidIncidentDate('', today)).toBe(false)
  })

  it('rejects an invalid incident date', () => {
    expect(isValidIncidentDate('not-a-date', today)).toBe(false)
  })
})
