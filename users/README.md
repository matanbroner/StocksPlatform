# Stocks Platform
A course project for CSE115A at UCSC
Spring 2021

## PostgreSQL Management
Use of a docker container allows for an embedded storage system in the container without the need to install PostgreSQL. In order to connect the database to this docker container, additional procedures are needed. Created a docker-compose.yml to define a backend service and a database service.

## Running an Image

```
docker run -p 3001:3001 <the image name>
```

### Utilizing docker-compose.yml

https://medium.com/analytics-vidhya/getting-started-with-postgresql-using-docker-compose-34d6b808c47c
https://towardsdatascience.com/how-to-run-postgresql-using-docker-15bf87b452d4

We use the following command,
```
docker-compose build
```
to build our image/backend service.

We use the command,
```
docker-compose up -d pgsql_db
```
to create our database.

We can also just do,
```
docker-compose up
```
to create all images and run their containers

## Utilities
Verify that the containers/images have been built by using this command
```
docker ps 
```

To connect to the service
```
docker exec -it pgsql_db psql -U admin postgres
```

Connect to the database as the user "admin" and showcase schemas
```
\c StockPlatform
\dt
```
