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

export function LoginPage() {
  const navigate = useNavigate();

  function handleSuccess() {
    toast.success('Вход выполнен');
    void navigate({ to: '/' });
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
