# -------- Builder stage --------
FROM node:20-alpine AS builder
WORKDIR /app

# Install deps
COPY package.json package-lock.json* ./
RUN npm ci

# Copy sources
COPY tsconfig.json tsconfig.paths.json* ./
COPY eslint.config.mts ./
COPY src ./src

# Build
RUN npm run build

# -------- Runtime stage --------
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Install only prod deps
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy build output
COPY --from=builder /app/dist ./dist

# Copy OpenAPI docs used at runtime
COPY src/docs/openapi ./src/docs/openapi

# Copy data files used at runtime (locations.json)
COPY src/data ./src/data

EXPOSE 5000
CMD ["node", "dist/index.js"]
