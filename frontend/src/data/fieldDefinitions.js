/**
 * DRAFT field-name registry for future forms and API work.
 * Keep keys stable once the team agrees on the backend contract.
 * No form submission or persistence is implemented in Page 1.
 */
export const FIELD_NAMES = Object.freeze({
  ITEM_ID: 'itemId',
  REPORT_TYPE: 'reportType', // 'lost' | 'found'
  ITEM_TITLE: 'itemTitle',
  ITEM_CATEGORY: 'itemCategory',
  ITEM_DESCRIPTION: 'itemDescription',
  LOCATION: 'location',
  EVENT_DATE: 'eventDate', // YYYY-MM-DD
  CONTACT_NAME: 'contactName',
  CONTACT_EMAIL: 'contactEmail',
  IMAGE_FILES: 'imageFiles',
  REPORT_STATUS: 'reportStatus',
})

export const ITEM_CATEGORIES = Object.freeze([
  'Electronics', 'Keys', 'Wallets & IDs', 'Clothing', 'Bags', 'Other',
])

export const REPORT_TYPES = Object.freeze(['lost', 'found'])

/** Page 2 draft authentication field registry — names to keep consistent with future API work. */
export const AUTH_FIELD_NAMES = Object.freeze({
  ROLE: 'role',
  EMAIL: 'email',
  PASSWORD: 'password',
  REMEMBER_ME: 'rememberMe',
})

export const AUTH_ROLES = Object.freeze({
  STUDENT: 'student',
  CAMPUS_SECURITY: 'campusSecurity',
})

/** Page 3 dashboard API contract DRAFT (not implemented). */
export const ACCOUNT_FIELD_NAMES = Object.freeze({
  ACCOUNT_ID: 'accountId',
  DISPLAY_NAME: 'displayName',
  EMAIL: 'email',
  STUDENT_ID_LAST4: 'studentIdLast4', // backend should send ONLY last four digits
  REPORT_ID: 'reportId',
  REPORT_STATUS: 'reportStatus',
  ARCHIVE_SEMESTER: 'archiveSemester',
  POSSIBLE_MATCHES: 'possibleMatches',
  MATCH_SCORE: 'matchScore', // 0..100, supplied by backend matching service
  CLAIM_PENDING: 'claimPending',
})
