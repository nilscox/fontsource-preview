#!/usr/bin/env bash

# koyeb worker hack
(cd /node-server && node -e 'require("express")().listen(Number(process.env.PORT ?? 4000));' &)

env > /env.sh

/app/start.sh

cron
touch /var/log/cron.log
tail -f /var/log/cron.log
