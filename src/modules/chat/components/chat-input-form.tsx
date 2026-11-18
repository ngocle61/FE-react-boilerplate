import { SendIcon, SquareIcon } from 'lucide-react';
import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { KEYBOARD_KEYS } from '@/shared/constants/keyboard.constant';
import {
  Button,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  Flex,
  FLEX_ALIGNMENTS,
  Spinner,
  Textarea,
} from '@ui';

import type { ChatInputFormProps } from '../types/chat-input-form.type';

export const ChatInputForm = ({ onSend, onStop, isPending, isStreaming }: ChatInputFormProps) => {
  const { t } = useTranslation(I18N_NAMESPACES.CHAT);

  const [value, setValue] = useState('');

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || isPending) return;
    onSend(trimmed);
    setValue('');
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    submit();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === KEYBOARD_KEYS.ENTER && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  return (
    <Flex asChild align={FLEX_ALIGNMENTS.END} gap={2} className="border-t border-border p-3">
      <form onSubmit={handleSubmit}>
        <Textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('inputPlaceholder')}
          aria-label={t('inputPlaceholder')}
          rows={1}
          className="max-h-40 min-h-10 flex-1 resize-none"
          disabled={isPending}
        />
        {isStreaming ? (
          <Button
            type="button"
            size={BUTTON_SIZES.ICON}
            variant={BUTTON_VARIANTS.SECONDARY}
            onClick={onStop}
            aria-label={t('stop')}
          >
            <SquareIcon />
          </Button>
        ) : (
          <Button
            type="submit"
            size={BUTTON_SIZES.ICON}
            disabled={isPending || !value.trim()}
            aria-label={t('send')}
          >
            {isPending ? <Spinner /> : <SendIcon />}
          </Button>
        )}
      </form>
    </Flex>
  );
};
