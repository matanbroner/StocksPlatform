#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
PROD=0
VERBOSE=0

# got to project root
cd "$(dirname "$SCRIPT_DIR")"

usage(){
  echo "build-run-all.sh [-p] [-v LEVEL]"
  echo "[-p] Production build (ie. do not use in loval development)"
  echo "[-v LEVEL] Set verbose level from 0-2 (2 default, show all logs)"
  exit 0
}

while getopts :h:pv: o; do
  case $o in
    (p) PROD=1;;
    (v) VERBOSE=$OPTARG;;
    (h) usage;;
    (*) usage
  esac
done


echo "--- Building Services ---"
echo "Verbose level: $VERBOSE"
echo "Production: $PROD"

if [[ $PROD -eq 1 ]]
then
  echo "Production configuration not set up yet."
else
    docker-compose -f docker-compose-dev.yml up -d --build
fi