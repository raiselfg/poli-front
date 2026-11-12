# Build context: repository root
FROM node:22-alpine AS base
RUN npm install -g pnpm@11.25.0
WORKDIR /repo

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/package.json
COPY apps/admin/package.json apps/admin/package.json
COPY packages/ui/package.json packages/ui/package.json
COPY packages/eslint-config/package.json packages/eslint-config/package.json
COPY packages/eslint-config-next/package.json packages/eslint-config-next/package.json
RUN pnpm install --frozen-lockfile --filter admin...

FROM base AS builder
# Vite inlines this value into the bundle; changing it requires a rebuild.
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
COPY --from=deps /repo/node_modules ./node_modules
COPY --from=deps /repo/apps/admin/node_modules ./apps/admin/node_modules
COPY --from=deps /repo/packages/ui/node_modules ./packages/ui/node_modules
COPY . .
RUN pnpm --filter admin build

FROM nginx:1.27-alpine AS runner
COPY apps/admin/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /repo/apps/admin/dist /usr/share/nginx/html
EXPOSE 80
