import { describe, expect, it } from 'vitest';

import { nextRevealCount } from '@/modules/chat/utils/reveal.util';

describe('nextRevealCount', () => {
  it('stays put when everything received is already revealed', () => {
    expect(nextRevealCount(12, 12)).toBe(12);
  });

  it('reveals at least one character on a small backlog', () => {
    expect(nextRevealCount(0, 1)).toBe(1);
    expect(nextRevealCount(4, 8)).toBe(5);
  });

  it('catches up faster as the backlog grows', () => {
    expect(nextRevealCount(0, 80)).toBe(10);
    expect(nextRevealCount(0, 800)).toBe(100);
  });

  it('lands exactly on the last character without overshooting', () => {
    expect(nextRevealCount(0, 3)).toBe(1);
    expect(nextRevealCount(799, 800)).toBe(800);
  });
});
