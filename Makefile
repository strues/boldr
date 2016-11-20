SHELL  := /bin/bash
PATH   := node_modules/.bin:$(PATH)
DIST_CMS   := build/boldrCMS
DIST_API   := build/boldrAPI

.PHONY: clean

clean-api:
	npm run clean $(DIST_API)

clean-cms:
	npm run clean $(DIST_CMS)

clean-cache:
	npm run clean .happypack

clean: clean-cache clean-cms clean-api

flow:
	./node_modules/.bin/flow check

test:
	NODE_ENV=test jest

test-ci:
	NODE_ENV=test CI=true jest -w 2

copy-sw:
	cp build/boldrCMS/serviceWorker/sw.js public/sw.js

migrate-prod:
	npm run migrate:prod

seed-prod:
	npm run seed:prod

start-api:
	NODE_ENV=production POSTGRES_CONN_URI=postgres://postgres:password@localhost:5432/boldr node boldrAPI/index.js

build-cms:
	npm run build

build-api:
	npm run build:api

create-dist:
	rm -rf ./dist && mkdir ./dist && mv build/boldrAPI dist/ && mv build/boldrCMS dist/build/boldrCMS && cp package.json dist/package.json && cp .env dist/.env

build: build-cms copy-sw build-api create-dist
