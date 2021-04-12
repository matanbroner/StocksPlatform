
## Running an Image

```
docker run -p 3001:3001 <the image name>
```

## Utilities
Verify that the containers/images have been built by using this command
```
docker ps 
```

To connect to the service
```
docker exec -it postgres psql -U stocks_admin postgres
```

Connect to the database as the user "admin" and showcase schemas
```
\c StockPlatform
\dt
```
