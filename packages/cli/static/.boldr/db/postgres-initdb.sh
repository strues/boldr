#!/bin/sh -e

psql --variable=ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  CREATE DATABASE "boldr";
EOSQL

psql --variable=ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname=boldr <<-EOSQL
  CREATE EXTENSION "uuid-ossp";
  CREATE EXTENSION "hstore";
EOSQL

psql --variable=ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  CREATE DATABASE "boldr_test";
EOSQL

psql --variable=ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname=boldr_test <<-EOSQL
  CREATE EXTENSION "uuid-ossp";
  CREATE EXTENSION "hstore";
EOSQL
