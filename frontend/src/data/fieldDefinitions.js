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
