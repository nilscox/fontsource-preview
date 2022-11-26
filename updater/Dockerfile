FROM node:18

WORKDIR /node-server
RUN yarn add express

WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN yarn install --production=false

RUN apt-get update && apt-get install -y cron jq
RUN echo "0 0 * * * bash /app/start.sh >> /var/log/cron.log 2>&1" | crontab -

COPY ./updater/entrypoint.sh ./updater/start.sh ./
COPY ./install-fonts.sh ./
COPY ./src ./src/
COPY ./global.d.ts ./postcss.config.js ./tailwind.config.js tsconfig.json webpack.config.js ./

CMD ["bash", "entrypoint.sh"]
