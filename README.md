# penny-guess

Something to annoy Penny with

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Running Locally

Make sure you have Java and Maven installed.  Also, install the [Heroku CLI](https://cli.heroku.com/).

```sh
$ git clone https://github.com/andrewflbarnes/penny-guess
$ cd penny-guess
$ mvn install
$ heroku local:start
$ echo DATABASE_URL='jdbc:postgresql://localhost:5432/postgres?user=postgres&password=postgres' \
  > .env
$ echo PORT=5005 \
  >> .env
```

Your app should now be running on [localhost:5005](http://localhost:5005/).

If you want high score saving functionality to work run the below
```bash
psql -U postgres -d postgres
```
```postgresql
CREATE TABLE high_score
( name VARCHAR(255) PRIMARY KEY NOT NULL
, score INTEGER NOT NULL
);
```

## Deploying to Heroku

Deploys for this project are done manually through the Heroku dashboard for the `master` branch.

## Documentation

For more information about using Java on Heroku, see these Dev Center articles:

- [Java on Heroku](https://devcenter.heroku.com/categories/java)

## React

Currently migrating front end code to react in `penny-guess-client`
using `node v10.15.0 (npm v6.4.1)`.
