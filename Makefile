.PHONY: all
all: dist

.PHONY: clean
clean:
	rm -rf node_modules vendor/package

dist: $(wildcard ts/*) tsconfig.json node_modules
	./node_modules/.bin/tsc
	touch -m $@

node_modules: package.json
	npm install
	touch -m $@

# vendored stuff

PACKAGE_VERSION:=$(shell cat vendor/package_HEAD)
vendor/package: vendor/package_HEAD
	test -d $@ || git clone https://github.com/elm-lang/package.elm-lang.org $@
	cd $@ && git fetch && git reset --hard ${PACKAGE_VERSION}
	touch -m $@
