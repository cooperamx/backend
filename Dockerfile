# poor man's CI...
FROM node:13-alpine AS test-env

WORKDIR /usr/src/app

RUN apk add --update make

COPY package.json package-lock.json ./
RUN while true; do npm install && break; done

COPY . .

RUN make validate

FROM node:13-alpine
ARG APP_USER=app

RUN addgroup -S $APP_USER && adduser -S $APP_USER -G $APP_USER
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN while true; do npm install --only=prod && break; done

COPY . .

RUN chown -R $APP_USER:$APP_USER /usr/src/app
USER $APP_USER
CMD ["npm", "start"]