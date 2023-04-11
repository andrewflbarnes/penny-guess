# penny-guess

Something to annoy Penny with.

## Running Locally - full deployment

Make sure you have Java and Maven installed.

First, provision the database tables on some local cluster (e.g. native or running on docker)
```bash
docker run --rm -e POSTGRES_PASSWORD=password -d --name postgres -p "5432:5432" postgres:10
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
git clone https://github.com/andrewflbarnes/penny-guess
cd penny-guess

mvn package

echo DATABASE_URL='jdbc:postgresql://localhost:5432/postgres?user=postgres&password=password' \
  > .env
echo PORT=5005 \
  >> .env
echo SPRING_PROFILES_INCLUDE=dev \
  >> .env

(export $(cat .env | xargs); java -jar penny-guess-server/target/*.jar)
```

Alternatively build an run with docker:
```bash
docker build . -t penny-guess:latest

# create env file as above but use host.docker.internal instead of localhost.

docker run --rm --name penny-guess -p "5005:5005" --env-file .env penny-guess:latest
```

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

## Deploying to Fly

Ensure the fly CLI is intsalled:
```bash
brew install flyctl
```

Create a postgres cluster:
```bash
fly postgres create
```

Create the app:
```bash
# DO NOT DEPOY WHEN ASKED
fly launch
```

Attach the postgres cluster to the app cluster
```bash
fly postgres attach <db name> -a <app name>
```

Use the returned string to set the app secret `DATABASE_URL` as a valid jdbc URL, aso set `PORT` to 8080:
```bash
fly secrets set DATABASE_URL="jdbc:postgresql://<app name>.flycast:5432/<app db>?sslmode=disable&user=<app db>&password=password"
fly secrets set PORT=8080
```

Deploy the app and access from `<app name>.fly.dev`:
```bash
fly deploy
```

## React

Currently migrating front end code to react in `penny-guess-client`
using `node v10.15.0 (npm v6.4.1)`.
