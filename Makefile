all: test

test/main.css: test/main.sass
	@sass -t expanded --sourcemap=none $< $@

large-viewport:
	@./node_modules/mocha-phantomjs/bin/mocha-phantomjs -v 1200x500 test/large.html

small-viewport:
	@./node_modules/mocha-phantomjs/bin/mocha-phantomjs -v 400x500 test/small.html

test: test/main.css large-viewport small-viewport

.PHONY: all test large-viewport small-viewport
