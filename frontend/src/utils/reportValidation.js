
/**
 * Validates the date an item was lost or found.
 * Future dates are not allowed.
 */
export function isValidIncidentDate(dateString, today = new Date()) {
  if (!dateString) return false

  const incidentDate = new Date(`${dateString}T00:00:00`)

  if (Number.isNaN(incidentDate.getTime())) {
    return false
  }

  const currentDate = new Date(today)
  currentDate.setHours(0, 0, 0, 0)

  return incidentDate <= currentDate
}
