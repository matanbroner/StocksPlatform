#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$(dirname "$SCRIPT_DIR")"

docker-compose -f docker-compose-dev.yml up -d --build postgres


