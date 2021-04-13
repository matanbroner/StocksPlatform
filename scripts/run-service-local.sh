#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
SERVICE=$1

export DB_DRIVER=postgresql
export DB_USER=stocks_admin
export DB_PASSWORD=stocks_admin
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=stocks_db

ALL_SERVICES=("client" "data" "users")

usage(){
  echo "run-service-local.sh [SERVICE]"
  exit 0
}

while getopts :h o; do
  case $o in
    (h) usage;;
    (*) usage
  esac
done

if [[ ! " ${ALL_SERVICES[@]} " =~ " ${SERVICE} " ]]; then
    echo "Invalid service '$SERVICE'"
    echo "Valid services include [${ALL_SERVICES[*]}]"
    exit 1
fi

# got to service directory
cd "$(dirname "$SCRIPT_DIR")/$SERVICE"

./run-local.sh


