FROM node:lts-alpine AS builder

WORKDIR /app
COPY components components
COPY pages pages
COPY public public
COPY scripts scripts
COPY services services
COPY util util
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json tsconfig.json
COPY next.config.js next.config.js