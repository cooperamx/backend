REPOSITORY=gcr.io/${PROJECT_ID}/${IMAGE}
VERSION=0.1.0
PORT=8080

.PHONY: all
all: build container container_run

.PHONY: run
run:
	@node .

.PHONY: build
build:
	@docker build -t ${REPOSITORY}:${VERSION} --no-cache .

.PHONY: validate
validate: test lint

.PHONY: test
test:
	@npm run test

.PHONY: lint
lint:
	@npm run lint

.PHONY: container
container: build

.PHONY: container_run
container_run:
	@docker run --rm -ti -p ${PORT}:${PORT} ${REPOSITORY}:${VERSION}

.PHONY: clean
clean:
	@rm -rf node_modules/
