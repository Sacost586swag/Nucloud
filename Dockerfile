# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# Instala dependencias con cache de capas (solo se reusa si package*.json no cambia)
COPY package*.json ./
RUN npm ci

# Cache-bust: invalida TODO lo que sigue en cada deploy para que nunca
# se sirva un build viejo desde la cache de Docker. Dokploy puede pasar
# --build-arg CACHEBUST=<valor cambiante> (p.ej. el commit o la fecha);
# si no, cada commit nuevo ya invalida el COPY siguiente por contenido.
ARG CACHEBUST=unknown
RUN echo "Forzando build limpio -> $CACHEBUST"

# Copia el resto del codigo y construye SIEMPRE fresco
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
