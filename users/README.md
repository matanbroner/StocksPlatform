# User Service

## Running User Service

To specifically run the user service with a docker-compose.yml
```
docker-compose up -d --build users postgres
```

Running User Service with tests (docker-compose.yml)
```
docker-compose run users npm run test
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

## Documentation

### API Endpoints

Account Creation

- localhost:5001/users/sign-up

An endpoint where a first name, last name, email, username, and password is passed in to the backend service. Within this route, we verify that the correct inputs are filled, that the account doesn't already exist in the User table within PostgreSQL. If a user exists, we send a response back to the frontend noting that this request has failed. Otherwise, we create the user into our Users table. To insert a user, we will hash the password into a random string to maintain security.

- localhost:5001/users/login

An endpoint that takes in an email and password. We verify if the user has been logged in our database, meaning they have signed up for an account successfully. If there isn't a user found, we send a response back saying the request has failed. If the password is wrong for the email, we also send a response saying the request has failed. If successful, we create an Access Token and Refresh token and send it as a response to the request.

- localhost:5001/users/logout

An endpoint that is called when a user "logs out". For a request to this service, we will verify that the request contains an Access Token specified in the headers. If one is found, we will insert it into a Tokens Table that serves to act as a storage/validation for invalid tokens.

- localhost:5001/tokens/verify

A service to the Data backend where requests made to access certain resources/features of the website and their account will involve verifying the passed in Access Token. If an expired Access Token is expired, we will use the Refresh Token, also passed in, to create a new Access Token and send both of those back to the request.

- localhost:5001/oauth/google/login
- localhost:5001/oauth/facebook/login

# React Notes (Delete Later)

https://stackoverflow.com/questions/34226076/why-is-my-onclick-being-called-on-render-react-js
To stop functions passed into button onclicks from activating from render