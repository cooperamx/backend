#!/bin/bash

set -eu

: "${PROJECT_ID}"
: "${IMAGE}"

gcloud builds submit --tag "gcr.io/$PROJECT_ID/$IMAGE"
