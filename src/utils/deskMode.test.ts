import { describe, expect, test } from 'vitest';
import { getDeskMode } from './deskMode';

describe('getDeskMode', () => {
  test.each([
    [new Date(2026, 6, 29, 7, 0), 'day'],
    [new Date(2026, 6, 29, 17, 30), 'day'],
    [new Date(2026, 6, 29, 6, 59), 'night'],
    [new Date(2026, 6, 29, 17, 31), 'night'],
  ] as const)('maps local time %s to %s', (date, expected) => {
    expect(getDeskMode(date)).toBe(expected);
  });
});
