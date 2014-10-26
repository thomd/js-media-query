all: test

test/main.css: test/main.sass
	sass -t expanded --sourcemap=none $< $@

test: test/main.css
	./node_modules/mocha-phantomjs/bin/mocha-phantomjs -v 1200x500 test/large.html
	#@./node_modules/mocha-phantomjs/bin/mocha-phantomjs -v 400x500 test/small.html

.PHONY: all test
