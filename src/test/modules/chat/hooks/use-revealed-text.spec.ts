import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useRevealedText } from '@/modules/chat/hooks/use-revealed-text';

const LONG_TEXT = 'Xin chào, đây là một câu trả lời đủ dài để thấy chữ hiện dần từng phần.';

describe('useRevealedText', () => {
  it('holds the text back instead of painting it all at once', () => {
    const { result } = renderHook(() => useRevealedText());

    act(() => result.current.append(LONG_TEXT));

    expect(result.current.revealed).toBe('');
  });

  it('reveals a growing prefix until the whole text is shown', async () => {
    const { result } = renderHook(() => useRevealedText());

    act(() => result.current.append(LONG_TEXT));

    await waitFor(() => expect(result.current.revealed.length).toBeGreaterThan(0));
    expect(LONG_TEXT.startsWith(result.current.revealed)).toBe(true);

    await waitFor(() => expect(result.current.revealed).toBe(LONG_TEXT));
  });

  it('keeps appending onto what is already revealed', async () => {
    const { result } = renderHook(() => useRevealedText());

    act(() => result.current.append('Xin'));
    act(() => result.current.append(' chào'));

    await waitFor(() => expect(result.current.revealed).toBe('Xin chào'));
  });

  it('resolves drain only once everything received is on screen', async () => {
    const { result } = renderHook(() => useRevealedText());

    act(() => result.current.append(LONG_TEXT));

    await act(async () => {
      await result.current.drain();
    });

    expect(result.current.revealed).toBe(LONG_TEXT);
  });

  it('resolves drain immediately when nothing is pending', async () => {
    const { result } = renderHook(() => useRevealedText());

    await act(async () => {
      await result.current.drain();
    });

    expect(result.current.revealed).toBe('');
  });

  it('drops the pending text on reset', async () => {
    const { result } = renderHook(() => useRevealedText());

    act(() => result.current.append(LONG_TEXT));
    act(() => result.current.reset());

    expect(result.current.revealed).toBe('');

    await act(async () => {
      await result.current.drain();
    });

    expect(result.current.revealed).toBe('');
  });
});
