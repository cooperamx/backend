#!/bin/bash

gcloud config set core/project ${PROJECT_ID}

gcloud auth configure-docker

gcloud config list
