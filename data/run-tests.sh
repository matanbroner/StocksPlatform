#!/bin/bash

# if python3 or pip3 are not recognized:
# a. Alias the unrecognized term with the python3 version of it (ie. pip3 -> pip)
# b. Set Python3 as your default and modify the script

DB_USER=stocks_admin DB_PASSWORD=stocks_admin DB_HOST=localhost DB_NAME=stocks_db python3 ./data/nlp_test.py