SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
CURR_DIR="$(pwd)"

cd "$(dirname "$SCRIPT_DIR")"/data

./run-tests.sh

cd $CURR_DIR