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
import { Button } from "@workspace/ui/components/button"
```

Чтобы добавить компонент shadcn/ui из корня репозитория:

```bash
pnpm dlx shadcn@latest add button -c apps/admin
```
