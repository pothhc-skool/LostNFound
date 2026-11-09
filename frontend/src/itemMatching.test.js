import { describe, it, expect } from 'vitest';
import { itemsMatch } from './itemMatching.js';

describe('LostNFound Item Matching', () => {
  it('matches identical items', () => {
    expect(itemsMatch('Backpack', 'Backpack')).toBe(true);
  });

  it('ignores capitalization', () => {
    expect(itemsMatch('Backpack', 'backpack')).toBe(true);
  });

  it('rejects different items', () => {
    expect(itemsMatch('Phone', 'Wallet')).toBe(false);
  });

  it('ignores extra spaces', () => {
    expect(itemsMatch(' Backpack ', 'Backpack')).toBe(true);
  });

  it('rejects invalid inputs', () => {
    expect(itemsMatch(null, 'Backpack')).toBe(false);
  });
});