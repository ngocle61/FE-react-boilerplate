import { useEffect, useEffectEvent, useRef, useState } from 'react';

import { nextRevealCount } from '../utils/reveal.util';

export const useRevealedText = () => {
  const [revealed, setRevealed] = useState('');
  const receivedRef = useRef('');
  const revealedCountRef = useRef(0);
  const frameRef = useRef<Nullable<number>>(null);
  const drainRef = useRef<Nullable<() => void>>(null);

  const settleDrain = () => {
    drainRef.current?.();
    drainRef.current = null;
  };

  const schedule = () => {
    if (frameRef.current !== null) return;

    function step() {
      const received = receivedRef.current;

      if (revealedCountRef.current >= received.length) {
        frameRef.current = null;
        settleDrain();
        return;
      }

      revealedCountRef.current = nextRevealCount(revealedCountRef.current, received.length);
      setRevealed(received.slice(0, revealedCountRef.current));
      frameRef.current = requestAnimationFrame(step);
    }

    frameRef.current = requestAnimationFrame(step);
  };

  const append = (text: string) => {
    receivedRef.current += text;
    schedule();
  };

  const reset = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    receivedRef.current = '';
    revealedCountRef.current = 0;
    settleDrain();
    setRevealed('');
  };

  const drain = () =>
    new Promise<void>((resolve) => {
      if (revealedCountRef.current >= receivedRef.current.length) {
        resolve();
        return;
      }

      drainRef.current = resolve;
      schedule();
    });

  const resetOnUnmount = useEffectEvent(reset);

  useEffect(() => () => resetOnUnmount(), []);

  return { revealed, append, drain, reset };
};
