import { useQueryClient } from '@tanstack/react-query';
import { FetchError } from 'ofetch';
import { useNavigate } from '@tanstack/react-router';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import { toast } from 'sonner';
import { LoginForm } from './login-form';
import { api, userSchema } from '@/lib/api';

export function LoginPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSuccess(values: { login: string; password: string }) {
    try {
      userSchema.parse(
        await api('/auth/login', { method: 'POST', body: values })
      );
      queryClient.clear();
      toast.success('Вход выполнен');
      await navigate({ to: '/' });
    } catch (error) {
      toast.error(
        error instanceof FetchError && error.statusCode === 401
          ? 'Неверный логин или пароль.'
          : 'Не удалось связаться с сервером. Попробуйте ещё раз.'
      );
    }
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-6 py-12">
      <Card className="w-full max-w-sm gap-8 rounded-none bg-transparent py-0 shadow-none ring-0">
        <CardHeader className="gap-3 px-0">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Вход в админку
          </CardTitle>
          <CardDescription className="leading-relaxed">
            Введите логин и пароль для продолжения.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <LoginForm onSuccess={handleSuccess} />
        </CardContent>
      </Card>
    </main>
  );
}
