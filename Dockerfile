FROM node:13-alpine
ARG APP_USER=app
ARG SOPS_VERSION=3.4.0

RUN addgroup -S $APP_USER && adduser -S $APP_USER -G $APP_USER
WORKDIR /usr/src/app

RUN apk add bash wget ca-certificates
COPY bin/install_sops_linux.sh /tmp/
RUN /tmp/install_sops_linux.sh

COPY package.json package-lock.json ./
RUN while true; do npm install --only=prod && break; done

COPY . .

ENV ENVIRONMENT local
ENV SERVICE_ACCOUNT_BASE64 ""

RUN chown -R $APP_USER:$APP_USER /usr/src/app
USER $APP_USER
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["npm", "start"]