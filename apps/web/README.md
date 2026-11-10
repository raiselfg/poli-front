# Web

Next.js application in the pnpm workspace.

From the repository root, install dependencies and start the development server:

```bash
pnpm install
pnpm --filter web dev
```

Open [http://localhost:3000](http://localhost:3000).

Run the application checks from the repository root:

```bash
pnpm --filter web typecheck
pnpm --filter web lint
pnpm --filter web build
```

Shared UI components are available from `@workspace/ui`.
