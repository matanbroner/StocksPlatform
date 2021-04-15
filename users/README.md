# User Service

To specifically run the user service with a docker-compose.yml
```
docker-compose up -d --build users postgres
```

## Utilities
Verify that the containers/images have been built by using this command
```
docker ps 
```

View the database
```
docker exec -it postgres psql -U stocks_admin postgres
```

Change databases and showcase schema/tables
```
\c postgres
\dt
```
