FROM node:18 as builder
WORKDIR /my-space

COPY package.json package-lock.json ./
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine as runner
WORKDIR /my-space
COPY --from=builder /my-space/package.json .
COPY --from=builder /my-space/package-lock.json .
COPY --from=builder /my-space/next.config.mjs ./
COPY --from=builder /my-space/public ./public
COPY --from=builder /my-space/.next/standalone ./
COPY --from=builder /my-space/.next/static ./.next/static
EXPOSE 3000
ENTRYPOINT ["npm", "start"]