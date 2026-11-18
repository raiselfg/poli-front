import { useFormState } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@workspace/ui/components/field';
import { Input } from '@workspace/ui/components/input';
import {
  requestFieldClassName,
  requestInputClassName,
} from './request-field-styles';
import type { RequestFormMethods } from './request-form-resolver';

export function RequestNameField({
  control,
  register,
}: Pick<RequestFormMethods, 'control' | 'register'>) {
  const {
    errors: { name: error },
  } = useFormState({ control, name: 'name', exact: true });

  return (
    <Field className={requestFieldClassName}>
      <FieldLabel htmlFor="name">Ваше имя *</FieldLabel>
      <Input
        id="name"
        autoComplete="name"
        required
        aria-invalid={error !== undefined}
        aria-describedby={error !== undefined ? 'name-error' : undefined}
        className={requestInputClassName}
        placeholder="Введите имя"
        {...register('name')}
      />
      <FieldError
        id="name-error"
        className="text-field-error"
        errors={[error]}
      />
    </Field>
  );
}
