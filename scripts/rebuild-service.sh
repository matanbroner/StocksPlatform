SERVICE=$1

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

docker-compose -f docker-compose-dev.yml up -d --build $SERVICE