import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

const noop = () => undefined;

const createMediaQueryList = (query: string) =>
  ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: noop,
    removeEventListener: noop,
    addListener: noop,
    removeListener: noop,
    dispatchEvent: () => false,
  }) as unknown as MediaQueryList;

class ResizeObserverStub {
  observe = noop;
  unobserve = noop;
  disconnect = noop;
}

window.matchMedia = createMediaQueryList;
globalThis.ResizeObserver ??= ResizeObserverStub;
Element.prototype.scrollIntoView = noop;
Element.prototype.hasPointerCapture = () => false;
Element.prototype.setPointerCapture = noop;
Element.prototype.releasePointerCapture = noop;

afterEach(() => {
  cleanup();
  localStorage.clear();
});
