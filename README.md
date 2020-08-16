# penny-guess

Something to annoy Penny with

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Running Locally - full deployment

Make sure you have Java and Maven installed.  Also, install the [Heroku CLI](https://cli.heroku.com/).

First, provision the database tables
```bash
psql -U postgres -d postgres
```
```postgresql
CREATE TABLE high_score
( name VARCHAR(255) PRIMARY KEY NOT NULL
, score INTEGER NOT NULL
);
CREATE TABLE t_what_is
( what VARCHAR(255) PRIMARY KEY NOT NULL
);
```

Then clone, build and run the code

```sh
$ git clone https://github.com/andrewflbarnes/penny-guess
$ cd penny-guess
$ mvn install
$ echo DATABASE_URL='jdbc:postgresql://localhost:5432/postgres?user=postgres&password=postgres' \
  > .env
$ echo PORT=5005 \
  >> .env
$ echo SPRING_PROFILES_ACTIVE=dev \
  >> .env
$ heroku local:start
```

Note that by default the port and JDBC URL are already set to these valuse in the dev profile.

Your app should now be running on [localhost:5005](http://localhost:5005/)
reading and writing data to your postgres DB instnace.

## Running locally - frontend only

```bash
# Start the frontend server
npm run start
# Start the mock API server
npm run mock
```
Your app should now be running on [localhost:5006](http://localhost:5006/) 
and forwarding api requests to [localhost:5007](http://localhost:5007/).

## Deploying to Heroku

Deploys for this project are done manually through the Heroku dashboard for the `master` branch.

## Retrieving a bearer token for API calls

Start the keycloak server with the below command in `andrewflbarnes/kaas-site-react`
```bash
npm keycloak
```

Login to the console as admin:admin and assign the `kaas-updater` role to `kaas-admin` under the `kaas-site-react` client.

User curl to retrieve a token and use it in an API call
```bash
API_TOKEN=$(curl \
  -d 'username=kaas-admin' \
  -d 'password=admin' \
  -d 'client_id=kaas-site-react' \
  -d 'grant_type=password' \
  localhost:8901/auth/realms/kaas-dev/protocol/openid-connect/token \
  | jq --raw-output .access_token)

curl -H "Authorization: Bearer ${API_TOKEN}" localhost:5005/api/whatis
```
