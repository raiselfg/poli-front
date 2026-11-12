import { useController } from 'react-hook-form';
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from '@workspace/ui/components/field';
import { Input } from '@workspace/ui/components/input';
import { formatPhoneDigits, formatPhoneInput } from './format-phone-input';
import type { RequestFormMethods } from './request-form-resolver';
import {
  requestFieldClassName,
  requestInputClassName,
} from './request-field-styles';

export function RequestPhoneField({
  control,
  setValue,
}: Pick<RequestFormMethods, 'control' | 'setValue'>) {
  const {
    field: phone,
    fieldState: { error },
  } = useController({ control, name: 'phone' });

  function updatePhone(nationalNumber: string) {
    setValue('phone', `+7 ${nationalNumber}`.trimEnd(), {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  return (
    <Field className={requestFieldClassName}>
      <FieldLabel htmlFor="phone">Телефон *</FieldLabel>
      <FieldContent className="relative flex-none">
        <span
          id="phone-prefix"
          className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-[14px]"
        >
          +7
        </span>
        <Input
          id="phone"
          type="tel"
          autoComplete="tel-national"
          required
          aria-invalid={error !== undefined}
          aria-describedby={
            error !== undefined ? 'phone-prefix phone-error' : 'phone-prefix'
          }
          className={`${requestInputClassName} pl-9`}
          {...phone}
          value={phone.value.slice(3)}
          onChange={(event) => {
            updatePhone(formatPhoneInput(event.currentTarget));
          }}
          onPaste={(event) => {
            const digits = event.clipboardData
              .getData('text')
              .replace(/\D/g, '');
            if (/^[78]\d{10}$/.test(digits)) {
              event.preventDefault();
              updatePhone(formatPhoneDigits(digits.slice(1)));
            }
          }}
          onKeyDown={(event) => {
            const element = event.currentTarget;
            const { selectionStart, selectionEnd, value } = element;
            if (selectionStart === null || selectionStart !== selectionEnd)
              return;

            if (
              event.key === 'Backspace' &&
              value[selectionStart - 1] === '-'
            ) {
              element.setSelectionRange(selectionStart - 2, selectionStart);
            }
            if (event.key === 'Delete' && value[selectionStart] === '-') {
              element.setSelectionRange(selectionStart, selectionStart + 2);
            }
          }}
        />
      </FieldContent>
      <FieldError id="phone-error" className="text-rose-700" errors={[error]} />
    </Field>
  );
}
