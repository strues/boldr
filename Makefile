SHELL  := /bin/bash
PATH   := node_modules/.bin:$(PATH)
DIST_CMS   := boldr
KNEX_FILE ?= ./knexfile.js
TEST_DB ?= POSTGRES_CONN_URI=postgres://postgres:password@localhost:5432/boldr_test
CI_DB ?= POSTGRES_CONN_URI=postgres://ubuntu@127.0.0.1:5432/circle_test

.PHONY: clean

flow:
	./node_modules/.bin/flow check

test-ci:
	NODE_ENV=test CI=true jest -w 2

migrate-ci:
	NODE_ENV=test $(CI_DB) node --harmony internal/scripts/db.js migrate

migrate-test:
	NODE_ENV=test $(TEST_DB) node --harmony internal/scripts/db.js migrate

seed-ci:
	NODE_ENV=test $(CI_DB) node --harmony internal/scripts/db.js seed

seed-test:
	NODE_ENV=test $(TEST_DB) ./node_modules/.bin/knex --knexfile $(KNEX_FILE) seed:run

compile:
	NODE_ENV=production yarn run build

directories:
	rm -rf release && mkdir -p release/bin release/db release/public release/boldrCMS && cp bin/boldr.js release/bin/ && cp package.json release/package.json && cp .env release/.env && cp -r db/ release/db/ && cp -r public/ release/public/

files:
	cp knexfile.js internal/docker/Dockerfile release/ && cp internal/docker/docker-compose.prod.yml release/docker-compose.yml && cp -r boldrCMS/ release/boldrCMS/

container:
	cd release; docker build -t strues/boldrcms .

release: compile directories files container

setup-db:
	make migrate-ci
	make seed-ci
