# Web

Next.js application in the pnpm workspace.

From the repository root, install dependencies and start the development server:

```bash
pnpm install
pnpm --filter web dev
```

Copy `apps/web/.env.example` to `apps/web/.env.local` and set `API_URL` to the backend API base URL. The default is `http://localhost:8000/api/v1`. The URL must be reachable from the Next.js server.

Set `SITE_URL` to the public site origin before building for production. This enables the branded preview image for shared links. For Docker builds, pass it as the `SITE_URL` build argument.

Open [http://localhost:3000](http://localhost:3000).

Run the application checks from the repository root:

```bash
pnpm --filter web typecheck
pnpm --filter web lint
pnpm --filter web build
```

Shared UI components are available from `@workspace/ui`.
