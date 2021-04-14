#!/bin/bash

# if python3 or pip3 are not recognized:
# a. Alias the unrecognized term with the python3 version of it (ie. pip3 -> pip)
# b. Set Python3 as your default and modify the script

# for development purposes only, do not use in production
FMP_API_KEY=e2d9d13e5b7ac7976216133f32d7f775

python3 -m venv env
source ./env/bin/activate
pip3 install --quiet -r ./requirements.txt
python3 main.py