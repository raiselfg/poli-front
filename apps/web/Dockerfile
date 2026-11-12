# Build context: repository root
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat \
  && npm install -g pnpm@11.25.0
WORKDIR /repo

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/package.json
COPY apps/admin/package.json apps/admin/package.json
COPY packages/ui/package.json packages/ui/package.json
COPY packages/eslint-config/package.json packages/eslint-config/package.json
COPY packages/eslint-config-next/package.json packages/eslint-config-next/package.json
RUN pnpm install --frozen-lockfile --filter web...

FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /repo/node_modules ./node_modules
COPY --from=deps /repo/apps/web/node_modules ./apps/web/node_modules
COPY --from=deps /repo/packages/ui/node_modules ./packages/ui/node_modules
COPY . .
# Next prerenders cached sections during build, so the API must be reachable here.
ARG API_URL
ENV API_URL=$API_URL
RUN pnpm --filter web build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  PORT=3000 \
  HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /repo/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /repo/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /repo/apps/web/public ./apps/web/public
RUN mkdir -p /app/apps/web/.next/cache \
  && chown -R nextjs:nodejs /app/apps/web/.next/cache
USER nextjs
EXPOSE 3000
CMD ["node", "apps/web/server.js"]
