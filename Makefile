SHELL  := /bin/bash
PATH   := node_modules/.bin:$(PATH)
DIST_CMS   := boldrCMS
KNEX_FILE ?= ./config/private/knexfile.js
TEST_DB ?= POSTGRES_CONN_URI=postgres://postgres:password@localhost:5432/boldr_test
CI_DB ?= POSTGRES_CONN_URI=postgres://ubuntu@127.0.0.1:5432/circle_test

.PHONY: clean

clean-cms:
	npm run clean $(DIST_CMS)

clean-cache:
	npm run clean .happypack

clean: clean-cache clean-cms

flow:
	./node_modules/.bin/flow check

test-ci:
	NODE_ENV=test CI=true jest -w 2

copy-sw:
	cp boldrCMS/serviceWorker/sw.js public/sw.js

build-cms:
	npm run build

create-dist:
	mkdir -p ./dist/bin && mv boldrCMS dist/boldrCMS && cp bin/boldr.js dist/bin/ && cp package.json dist/package.json && cp .env dist/.env

build: build-cms create-dist

get-api:
	git clone https://github.com/strues/boldrAPI

install-api:
	cd boldrAPI; yarn install

api: get-api install-api

migrate-ci:
	NODE_ENV=test $(CI_DB) ./node_modules/.bin/knex --knexfile $(KNEX_FILE) migrate:latest

migrate-test:
	NODE_ENV=test $(TEST_DB) ./node_modules/.bin/knex --knexfile $(KNEX_FILE) migrate:latest

seed-ci:
	NODE_ENV=test $(CI_DB) ./node_modules/.bin/knex --knexfile $(KNEX_FILE) seed:run

seed-test:
	NODE_ENV=test $(TEST_DB) ./node_modules/.bin/knex --knexfile $(KNEX_FILE) seed:run

setup-db:
	make migrate-ci
	make seed-ci

test-ci:
	NODE_ENV=test BABEL_ENV=test $(CI_DB) TOKEN_SECRET=bbbbaaaasss jest -w 2

test:
	NODE_ENV=test $(TEST_DB) npm run test
