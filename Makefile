SHELL  := /bin/bash
PATH   := node_modules/.bin:$(PATH)
DIST_CMS   := boldrCMS

.PHONY: clean

clean-cms:
	npm run clean $(DIST_CMS)

clean-cache:
	npm run clean .happypack

clean: clean-cache clean-cms

flow:
	./node_modules/.bin/flow check

test:
	NODE_ENV=test jest

test-ci:
	NODE_ENV=test CI=true jest -w 2

copy-sw:
	cp boldrCMS/serviceWorker/sw.js public/sw.js

build-cms:
	npm run build

create-dist:
	rm -rf ./dist && mkdir ./dist && mv boldrCMS dist/boldrCMS && cp package.json dist/package.json && cp .env dist/.env

build: build-cms copy-sw create-dist
