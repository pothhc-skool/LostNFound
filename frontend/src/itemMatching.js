export function itemsMatch(lostItem, foundItem) {
  if (typeof lostItem !== 'string' ||
      typeof foundItem !== 'string') {
    return false;
  }

  return lostItem.trim().toLowerCase() ===
         foundItem.trim().toLowerCase();
}