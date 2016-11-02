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
