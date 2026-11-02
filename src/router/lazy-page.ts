import type { ComponentType } from 'react';

export const lazyPage =
  <TName extends string>(loader: () => Promise<Record<TName, ComponentType>>, name: TName) =>
  async () => ({ Component: (await loader())[name] });
