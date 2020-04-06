terraform {
  required_version = "~> 0.12"
  backend "gcs" {
    bucket = "cooperamx-terraform-state"
    prefix = "cooperamx-backend"
  }
}

provider "google" {
  #  for credentials, use:
  #    bin/gcloud_login_default_credentials.sh
  project = "cooperamx"
  region  = local.region
}

locals {
  project_name = "cooperamx"
  image_name   = "cooperamx-backend"
  region       = "us-central1"
  image        = "gcr.io/cooperamx/${local.image_name}"
}

resource "google_container_registry" "registry" {
  project = local.project_name
}

output "bucket_self_link" {
  value = google_container_registry.registry.bucket_self_link
}

resource "google_cloud_run_service" "self" {
  name                       = local.image_name
  location                   = local.region
  # waiting for next release to tuse this
  # autogenerate_revision_name = true

  template {
    metadata {
      name = "${local.image_name}-${filemd5("main.tf")}"
    }
    spec {

      service_account_name = google_service_account.self.email
      containers {
        image = local.image

        env {
          name  = "ENVIRONMENT"
          value = "production"
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

resource "google_service_account" "self" {
  account_id   = local.image_name
  display_name = local.image_name
}