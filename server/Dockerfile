FROM node:18 as build-app

WORKDIR /app
ENV NODE_ENV production

COPY ./package.json ./yarn.lock ./
RUN yarn install --production=false

COPY ./src ./src/
COPY ./global.d.ts ./postcss.config.js ./tailwind.config.js tsconfig.json webpack.config.js ./
RUN yarn build

FROM node:18 as build-server

WORKDIR /app
ENV NODE_ENV production

COPY ./server/package.json ./server/yarn.lock ./
RUN yarn install --production=false

COPY ./server/index.js ./

FROM nginx:latest

WORKDIR /app
ENV NODE_ENV production

RUN apt-get update && apt-get install -y curl bzip2

COPY ./server/entrypoint.sh ./
RUN chmod +x ./entrypoint.sh

ENV UPLOAD_DIR /uploads
ENV PUBLIC_DIR /usr/share/nginx/html
RUN mkdir -p "$UPLOAD_DIR"

ENV NVM_DIR /usr/share/nvm
RUN mkdir -p "$NVM_DIR"
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
RUN . "$NVM_DIR/nvm.sh" && nvm install 18 && ln -s $(nvm which 18) /usr/local/bin

COPY ./server/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-app /app/dist/* "$PUBLIC_DIR"
COPY --from=build-server /app ./

CMD ["./entrypoint.sh"]
