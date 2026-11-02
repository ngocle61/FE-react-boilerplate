export const runWithWebLock = <TResult>(
  name: string,
  task: () => Promise<TResult>,
): Promise<TResult> => ('locks' in navigator ? navigator.locks.request(name, task) : task());
