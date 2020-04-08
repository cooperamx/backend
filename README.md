# Cooperamx Backend

The Cooperamx backend...

## Local Development

Requirements:

- Docker
- Docker-compose
- Node ~> v13.x.x
- Make
- sops ~>3.4.0

Before running any command you need to prepare your env shell with:

```sehll
source bin/env
```

This will export some environment variables that are used across the automation.

You can find the available project tasks with:

```shell
$> make
Please use `make <target>' where <target> is one of
	all                            executes local and container build then run container
	build                          build docker-compose images
	container                      builds the container
	container_run                  runs the container
	deps                           install local dependencies
	gcp_login                      login a human user to the GCP project
	help                           Display this help screen
	lint                           run lint
	run                            run local webserver
	test                           run tests
	validate                       run linter and testss
```

**Using the remote datastore**

The docker entrypoint `docker-entrypoint.sh` is able to inject and prepare the environment
for local use. To enable it copy `envs/.env.sample` to `envs/.env.local` and fill the values:

```shell
ENVIRONMENT=local
SERVICE_ACCOUNT_BASE64=<GCP service account json encoded in base64>
```

**Updating the Secrets**

Before updating the secrets login to the GCP project. You may use `make gcp_login`.
Then is as simple as doing:

```shell
sops config/secrets.enc.json
```

This will open an editor and encrypt the file on write.

**CI/CD**

Travis is used for CI, it will run on every branch and every PR.

When merge to master a deployment will be invoked, a new image will be build, published and
deployed to `knative`.
