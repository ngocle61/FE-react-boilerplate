import { use } from 'react';

import { SIDEBAR_CONTEXT_ERROR } from './constants';
import { SidebarContext } from './sidebar-context';

export const useSidebar = () => {
  const context = use(SidebarContext);

  if (!context) throw new Error(SIDEBAR_CONTEXT_ERROR);

  return context;
};
