import Link from 'next/link';
import { useController } from 'react-hook-form';
import { Checkbox } from '@workspace/ui/components/checkbox';
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from '@workspace/ui/components/field';
import type { RequestFormMethods } from './request-form-resolver';

const consentLinkClassName =
  'landing-link font-medium text-ink underline decoration-landing-accent underline-offset-4 hover:decoration-current';

export function RequestConsentField({
  control,
  disabled,
}: Pick<RequestFormMethods, 'control'> & { disabled: boolean }) {
  const {
    field: { value, onChange, ref },
    fieldState: { error },
  } = useController({ control, name: 'consent' });

  return (
    <Field
      orientation="horizontal"
      className="mb-0 gap-3"
      data-invalid={error !== undefined}
    >
      <Checkbox
        id="consent"
        ref={ref}
        disabled={disabled}
        checked={value}
        onCheckedChange={onChange}
        aria-invalid={error !== undefined}
        aria-describedby={error !== undefined ? 'consent-error' : undefined}
        className="rounded-control border-ink-muted bg-surface aria-invalid:border-field-error data-checked:border-ink data-checked:bg-ink data-checked:text-surface mt-px size-[18px] transition-none"
      />
      <FieldContent className="gap-1.5">
        <FieldLabel
          htmlFor="consent"
          className="text-ink-muted block w-full text-sm leading-relaxed font-normal"
        >
          Я даю{' '}
          <Link href="/consent" className={consentLinkClassName}>
            согласие на обработку персональных данных
          </Link>{' '}
          и принимаю{' '}
          <Link href="/terms" className={consentLinkClassName}>
            пользовательское соглашение
          </Link>
          .
        </FieldLabel>
        <FieldError
          id="consent-error"
          className="text-field-error text-sm"
          errors={[error]}
        />
      </FieldContent>
    </Field>
  );
}
