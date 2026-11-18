import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export interface StatusViewProps {
  icon: LucideIcon;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
  className?: string;
}
