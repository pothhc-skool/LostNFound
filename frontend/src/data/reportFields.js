// Stable field identifiers for the future report API/database integration.
export const REPORT_FIELDS = Object.freeze({
  reportType: 'reportType', fullName: 'fullName', email: 'email', studentId: 'studentId', phone: 'phone',
  category: 'category', itemName: 'itemName', description: 'description', estimatedValue: 'estimatedValue',
  incidentDate: 'incidentDate', incidentTime: 'incidentTime', campusLocation: 'campusLocation', locationDetails: 'locationDetails',
  liabilityAccepted: 'liabilityAccepted',
})
export const REPORT_CATEGORIES = ['Electronics', 'Clothing', 'Accessories', 'Wallets & IDs', 'Books', 'Other']
export const INITIAL_REPORT = {
  reportType: 'lost', fullName: '', email: '', studentId: '', phone: '', category: '', itemName: '',
  description: '', estimatedValue: '', incidentDate: '', incidentTime: '', campusLocation: '', locationDetails: '', liabilityAccepted: false,
}
