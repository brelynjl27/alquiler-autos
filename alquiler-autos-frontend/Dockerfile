# Etapa de construcción
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa de producción con NGINX
FROM nginx:alpine

# Copia la carpeta browser del build en Angular 17–19
COPY --from=build /app/dist/ventas-autos-frontend/browser /usr/share/nginx/html

EXPOSE 80
