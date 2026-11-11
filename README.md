# Poli monorepo

Монорепозиторий на pnpm и Turborepo с приложениями Next.js и Vite и общими UI-компонентами.

## Установка

Требуется Node.js версии не ниже 20.19.0 и pnpm версии, указанной в `package.json`.

```bash
pnpm install
```

## Запуск

```bash
pnpm dev                 # все приложения
pnpm --filter web dev    # Next.js
pnpm --filter admin dev  # Vite
```

## Подключение админки к API

Адрес бэкенда задаётся через `VITE_API_URL` вместе с префиксом `/api/v1`. Для локальной разработки скопируйте пример окружения и запустите приложение:

```bash
cp apps/admin/.env.example apps/admin/.env.local
pnpm --filter admin dev
```

Для production укажите, например, `VITE_API_URL=https://api.poli.ru/api/v1` при сборке админки. Без переменной используется адрес `https://api.poli.ru`.

В настройках бэкенда добавьте точный origin админки в `ALLOWED_ORIGINS` (например, `https://admin.poli.ru` для production и origin Vite для локальной разработки). Авторизация использует cookie, поэтому production-размещение должно работать по HTTPS.

## Проверки и сборка

```bash
pnpm lint
pnpm typecheck
pnpm format:check
pnpm build
pnpm format              # применить Prettier
```

Чтобы запустить команду для одного приложения, используйте фильтр, например `pnpm --filter web build`.

## Общие компоненты

Компоненты находятся в `packages/ui` и доступны приложениям через `@workspace/ui`:

```tsx
import { Button } from '@workspace/ui/components/button';
```

Чтобы добавить компонент shadcn/ui из корня репозитория:

```bash
pnpm dlx shadcn@latest add button -c apps/admin
```
