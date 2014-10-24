all: test

test:
	@./node_modules/mocha-phantomjs/bin/mocha-phantomjs test/TestRunner.html

.PHONY: all test
