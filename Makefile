SHELL  := /bin/bash
PATH   := node_modules/.bin:$(PATH)
DIST_CMS   := build/boldrCMS
DIST_API   := build/boldrAPI

.PHONY: clean

clean-api:
	rm -rf $(DIST_API)
clean-cms:
	rm -rf $(DIST_CMS)
clean-cache:
	rm -rf .wp_cache && rm -rf .happypack

clean: clean-cache clean-cms clean-api

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

build: build-cms copy-sw build-api
