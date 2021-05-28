#!/bin/bash

# if python3 or pip3 are not recognized:
# a. Alias the unrecognized term with the python3 version of it (ie. pip3 -> pip)
# b. Set Python3 as your default and modify the script

POSTGRES_USER=stocks_admin POSTGRES_PASSWORD=stocks_admin POSTGRES_HOST=localhost POSTGRES_DB=stocks_db python3 ./data/test_nlp_pipeline.py
POSTGRES_USER=stocks_admin POSTGRES_PASSWORD=stocks_admin POSTGRES_HOST=localhost POSTGRES_DB=stocks_db python3 ./data/test_rest_api.py