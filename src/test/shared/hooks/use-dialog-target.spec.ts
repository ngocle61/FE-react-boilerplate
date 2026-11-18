import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useDialogTarget } from '@/shared/hooks/use-dialog-target';

describe('useDialogTarget', () => {
  it('opens with the given item', () => {
    const { result } = renderHook(() => useDialogTarget<{ id: string }>());
    expect(result.current.isOpen).toBe(false);
    expect(result.current.target).toBeNull();

    act(() => result.current.open({ id: 'user-1' }));

    expect(result.current.isOpen).toBe(true);
    expect(result.current.target).toEqual({ id: 'user-1' });
  });

  it('keeps the item after closing so the closing animation still renders it', () => {
    const { result } = renderHook(() => useDialogTarget<{ id: string }>());

    act(() => result.current.open({ id: 'user-1' }));
    act(() => result.current.onOpenChange(false));

    expect(result.current.isOpen).toBe(false);
    expect(result.current.target).toEqual({ id: 'user-1' });
  });

  it('replaces the item when opened again', () => {
    const { result } = renderHook(() => useDialogTarget<{ id: string }>());

    act(() => result.current.open({ id: 'user-1' }));
    act(() => result.current.close());
    act(() => result.current.open({ id: 'user-2' }));

    expect(result.current.isOpen).toBe(true);
    expect(result.current.target).toEqual({ id: 'user-2' });
  });
});
