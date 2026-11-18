import { Dialog as SheetPrimitive } from 'radix-ui';

import type { SheetProps } from './types';

export const Sheet = (props: SheetProps) => <SheetPrimitive.Root data-slot="sheet" {...props} />;
