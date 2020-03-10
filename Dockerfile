# Fase I: Construcción
FROM node:10-alpine as build

# URL de API de datos
ARG API_URL=http://localhost:4000/v1/graphql
ENV REACT_APP_API_URL=$API_URL

ARG SENTRY_DSN
ENV REACT_APP_SENTRY_DSN=$SENTRY_DSN

ARG KEYCLOAK_CLIENT_CONFIG='{"realm":"aga","auth-server-url":"http://localhost:8080/auth","ssl-required":"external","resource":"web-app","public-client":true,"verify-token-audience":true,"use-resource-role-mappings":true,"confidential-port":0}'

WORKDIR /app

# Instalar dependencias
COPY package.json yarn.lock ./
RUN yarn install

# Copiar el resto del código y construir proyecto
COPY src src
COPY public public
RUN GENERATE_SOURCEMAP=false yarn run build --production

RUN echo $KEYCLOAK_CLIENT_CONFIG > build/keycloak.json

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
