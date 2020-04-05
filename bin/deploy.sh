#!/bin/bash

set -eu

: "${PROJECT_ID}"
: "${IMAGE}"

gcloud run deploy --image "gcr.io/$PROJECT_ID/$IMAGE" --platform managed
