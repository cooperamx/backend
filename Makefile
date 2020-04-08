REPOSITORY=gcr.io/${PROJECT_ID}/${IMAGE}
VERSION=latest
PORT=8080

.PHONY: help
help: ## Display this help screen
	@echo "Please use \`make <target>' where <target> is one of"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\t\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: all
all: build container container_run ## executes local and container build then run container

.PHONY: run
run: deps ## run local webserver
	@npm start

.PHONY: deps
deps: ## install local dependencies
	@npm i

.PHONY: build
build: ## build docker-compose images
	@docker build -t gcr.io/${PROJECT_ID}/${IMAGE} .

.PHONY: validate
validate: test lint ## run linter and tests

.PHONY: test
test: ## run tests
	@npm run test

.PHONY: lint
lint: ## run lint
	@npm run lint

.PHONY: container
container: build ## builds the container

.PHONY: container_run
container_run: ## runs the container
	@docker-compose up

.PHONY: build
gcp_login: ## login a human user to the GCP project
	./bin/gcloud_login_default_credentials.sh
	./bin/gcloud_configure.sh

.PHONY: clean
clean:
	@rm -rf node_modules/
