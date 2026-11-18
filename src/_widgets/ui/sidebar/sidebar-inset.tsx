import type { SidebarInsetProps } from './types';
import { cn } from '../../lib/cn';

export const SidebarInset = ({ className, ...props }: SidebarInsetProps) => (
  <div
    data-slot="sidebar-inset"
    className={cn(
      'relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-card md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2',
      className,
    )}
    {...props}
  />
);
