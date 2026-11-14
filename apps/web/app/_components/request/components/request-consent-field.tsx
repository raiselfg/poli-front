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
  'font-medium text-[#286686] underline decoration-[#9cc3d8] underline-offset-4 transition-colors hover:decoration-[#286686] focus-visible:decoration-[#286686]';

export function RequestConsentField({
  control,
}: Pick<RequestFormMethods, 'control'>) {
  const {
    field: consent,
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
        checked={consent.value}
        onCheckedChange={consent.onChange}
        aria-invalid={error !== undefined}
        aria-describedby={error !== undefined ? 'consent-error' : undefined}
        className="mt-px size-[18px] rounded-[6px] border-[#b9d4e1] bg-white data-checked:border-[#326f91] data-checked:bg-[#326f91]"
      />
      <FieldContent className="gap-1.5">
        <FieldLabel
          htmlFor="consent"
          className="block w-full text-[length:calc(12px*var(--text-scale))] leading-[1.55] font-normal text-[#456479]"
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
          className="text-[length:calc(12px*var(--text-scale))] text-rose-700"
          errors={[error]}
        />
      </FieldContent>
    </Field>
  );
}
