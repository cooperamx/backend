#!/bin/bash

# use this script to deploy a docker image to cloud run.
# example usage:
#   bash ./bin/deploy.sh

set -eu

: "${PROJECT_ID}"
: "${IMAGE}"

gcloud run deploy ${CLOUD_RUN_SERVICE} \
    --image "gcr.io/$PROJECT_ID/$IMAGE" \
    --platform managed \
    --region ${GCP_REIGION} \
    --allow-unauthenticated
