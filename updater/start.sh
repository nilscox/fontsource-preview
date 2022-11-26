#!/usr/bin/env bash

set -euo pipefail

set +a; source /env.sh; set -a
cd /app

./install-fonts.sh
mv node_modules/@fontsource .
tar cjvf public.tar.gz @fontsource fonts.json
curl -F file=@public.tar.gz "$UPLOAD_URL"
rm -rf @fontsource fonts.json public.tar.gz
