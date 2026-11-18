import { Flex, FLEX_ALIGNMENTS, FLEX_JUSTIFICATIONS, Spinner } from '@ui';

export const PageLoader = () => (
  <Flex align={FLEX_ALIGNMENTS.CENTER} justify={FLEX_JUSTIFICATIONS.CENTER} className="flex-1">
    <Spinner className="size-6 text-muted-foreground" />
  </Flex>
);
