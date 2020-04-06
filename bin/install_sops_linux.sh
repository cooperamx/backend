#!/bin/bash

set -eu

wget -O /usr/local/bin/sops \
    https://github.com/mozilla/sops/releases/download/$SOPS_VERSION/sops-$SOPS_VERSION.linux
chmod +x /usr/local/bin/sops
sops --version
