import { useState } from 'react';

import type { SidebarMenuSkeletonProps } from './types';
import { createSkeletonWidth, toSkeletonStyle } from './utils';
import { cn } from '../../lib/cn';
import { Skeleton } from '../skeleton/skeleton';

export const SidebarMenuSkeleton = ({
  className,
  children,
  ...props
}: SidebarMenuSkeletonProps) => {
  const [width] = useState(createSkeletonWidth);

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn('flex h-9 items-center gap-2 rounded-md px-2', className)}
      {...props}
    >
      {children}
      <Skeleton
        data-sidebar="menu-skeleton-text"
        className="h-4 max-w-(--skeleton-width) flex-1"
        style={toSkeletonStyle(width)}
      />
    </div>
  );
};
