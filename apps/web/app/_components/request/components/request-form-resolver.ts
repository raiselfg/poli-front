import type { FieldErrors, Resolver, UseFormReturn } from 'react-hook-form';
import {
  requestSchema,
  type RequestInput,
} from '../../../_lib/requests/request-schema';

export type RequestFormValues = {
  name: string;
  phone: string;
  comment: string;
  file?: FileList;
};
export const resolveRequest: Resolver<
  RequestFormValues,
  undefined,
  RequestInput
> = (values) => {
  const result = requestSchema.safeParse({
    ...values,
    file: values.file?.item(0) ?? undefined,
  });
  if (result.success) return { values: result.data, errors: {} };

  const errors: FieldErrors<RequestFormValues> = {};
  for (const issue of result.error.issues) {
    const fieldName = issue.path[0];
    if (
      fieldName === 'name' ||
      fieldName === 'phone' ||
      fieldName === 'comment' ||
      fieldName === 'file'
    ) {
      errors[fieldName] = { type: issue.code, message: issue.message };
    }
  }
  return { values: {}, errors };
};

export type RequestFormMethods = UseFormReturn<
  RequestFormValues,
  undefined,
  RequestInput
>;
