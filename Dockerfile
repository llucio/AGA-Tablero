# Fase I: Construcción
FROM node:12 as build

# URL de API de datos
ARG API_URL=http://localhost:4000/v1/graphql
ENV REACT_APP_API_URL=$DATA_APP_URL

WORKDIR /app

# Instalar dependencias
COPY package.json yarn.lock ./
RUN yarn install

# Copiar el resto del código y construir proyecto
COPY src src
COPY public public
RUN yarn run build --production

# Fase II: Ejecución
FROM nginx:1.16-alpine

# Copiar distribuible a directorio configurado en nginx
COPY --from=build /app/build /www

# Copiar template de configuración de servidor web Nginx
COPY site.conf.template .

ENV PORT 5000

EXPOSE 5000

# Sustituir variables en configuración y ejecutar Nginx
CMD ["/bin/sh", "-c", "envsubst '${PORT}' < site.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
