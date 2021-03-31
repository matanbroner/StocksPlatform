# Stocks Platform
A course project for CSE115A at UCSC
Spring 2021

## Background
Our team aims to provide an easy to use web platform for tracking stock prices and community sentiment around stocks using tehcnical analysis indicators and machine learning models. Our end goal is to allow users to automate their buying and selling of stocks.

## Usage
To build and run all services using Docker-Compose, run the following with the optional `-p` flag for production deployments (do not use this flag in local development):
```
scripts/build-run-all [-p]
```
For local development, a single service can be run locally with:
```
scripts/run-service-local.sh [SERVICE]
# ex. scripts/run-service-local.sh users
```
Note that a Docker container for a service must be stopped before a local version can be run (ie. cannot have a `users` container running before running a local version).

## Architecture
The platform is built on three main services:

 - Users Service: user profile and administration service
 - Data Service: stocks data collector and analyzer. Handles most backend data functionality. Used for machine learning functionality as well, along with news sentiment analysis.
 - Client: front-end web service.

## Technologies Used
- Python / Flask
- NodeJS / Express / React
- NGINX
- Docker / Docker-Compose

