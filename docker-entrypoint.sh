#!/bin/bash

set -euo pipefail

if [ $ENVIRONMENT = "local" ]; then
    echo "$SERVICE_ACCOUNT_BASE64" | base64 -d >config/sa.json
    export GOOGLE_APPLICATION_CREDENTIALS=config/sa.json
fi

sops -d config/secrets.enc.json >config/secrets.json

exec "$@"
