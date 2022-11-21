#!/usr/bin/env bash

set -euo pipefail

PATH="/usr/local/bin:$PATH"
cd /app

/app/install-fonts.sh --count 3
NODE_ENV=production yarn build
(cd dist; tar cjvf ../dist.tar.gz .)
curl -F file=@dist.tar.gz http://localhost:3000
rm -rf dist dist.tar.gz
