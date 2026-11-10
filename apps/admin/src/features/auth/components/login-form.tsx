import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@workspace/ui/components/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@workspace/ui/components/field';
import { Input } from '@workspace/ui/components/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z.object({
  login: z.string().trim().min(1, 'Введите логин'),
  password: z.string().min(1, 'Введите пароль'),
});

type LoginValues = z.infer<typeof loginSchema>;

type LoginFormProps = {
  onSuccess: () => void;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { login: '', password: '' },
  });

  return (
    <form onSubmit={handleSubmit(onSuccess)} noValidate>
      <FieldGroup>
        <Field data-invalid={!!errors.login} className="gap-2">
          <FieldLabel htmlFor="login">Логин</FieldLabel>
          <Input
            id="login"
            className="h-11"
            autoComplete="username"
            placeholder="Введите логин"
            aria-invalid={!!errors.login}
            aria-describedby={errors.login ? 'login-error' : undefined}
            {...register('login')}
          />
          {errors.login && (
            <FieldError id="login-error" errors={[errors.login]} />
          )}
        </Field>
        <Field data-invalid={!!errors.password} className="gap-2">
          <FieldLabel htmlFor="password">Пароль</FieldLabel>
          <Input
            id="password"
            className="h-11"
            type="password"
            autoComplete="current-password"
            placeholder="Введите пароль"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            {...register('password')}
          />
          {errors.password && (
            <FieldError id="password-error" errors={[errors.password]} />
          )}
        </Field>
        <Button type="submit" size="lg" className="h-11 w-full">
          Войти
        </Button>
      </FieldGroup>
    </form>
  );
}
