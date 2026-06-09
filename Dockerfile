# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# Instala dependencias con cache de capas
COPY package*.json ./
RUN npm ci

# Copia el resto del codigo y construye
COPY . .
RUN npm run build

# ---- Serve stage ----
FROM nginx:alpine
# Config de Nginx con fallback SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copia el build estatico generado por Vite
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
