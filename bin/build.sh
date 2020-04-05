#!/bin/bash

# use this script to build and push the docker image using gcloud build.
# example usage:
#   bash ./bin/build.sh

set -eu

: "${PROJECT_ID}"
: "${IMAGE}"

gcloud builds submit --tag "gcr.io/$PROJECT_ID/$IMAGE"
