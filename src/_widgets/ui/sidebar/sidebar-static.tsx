import type { SidebarStaticProps } from './types';
import { cn } from '../../lib/cn';

export const SidebarStatic = ({ className, ...props }: SidebarStaticProps) => (
  <div
    data-slot="sidebar"
    className={cn(
      'flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground',
      className,
    )}
    {...props}
  />
);
