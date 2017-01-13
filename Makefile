SHELL  := /bin/bash
PATH   := node_modules/.bin:$(PATH)
DIST_CMS   := boldr
KNEX_FILE ?= ./packages/boldr-api/knexfile.js
TEST_DB ?= POSTGRES_CONN_URI=postgres://postgres:password@localhost:5432/boldr_test
CI_DB ?= POSTGRES_CONN_URI=postgres://ubuntu@127.0.0.1:5432/circle_test

.PHONY: clean

flow:
	./node_modules/.bin/flow check

test-ci:
	NODE_ENV=test CI=true jest -w 2

cms-compile:
	cd packages/boldr-cms; npm run build

cms-folders:
	mkdir boldr; mv packages/boldr-cms/boldr/* boldr; cp packages/boldr-cms/.env boldr/boldrCMS/.env

cms-files:
	cd packages/boldr-cms; mkdir boldr/boldrCMS/bin && cp bin/boldr.js boldr/boldrCMS/bin/ && cp package.json boldr/boldrCMS/package.json

build-cms: cms-compile cms-files cms-folders

api-compile:
	cd packages/boldr-api; npm run build

api-folders:
	mv packages/boldr-api/boldr/* boldr; cp packages/boldr-api/.env boldr/boldrAPI/.env

api-files:
	cd packages/boldr-api; mkdir boldr/boldrAPI/bin && cp bin/boldr.js boldr/boldrAPI/bin/ && cp package.json boldr/boldrAPI/package.json

build-api: api-compile api-files api-folders

build: build-cms build-api

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
