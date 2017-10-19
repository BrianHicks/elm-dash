.PHONY: all
all:
	echo "have a nice day!"

dist: $(glob ts/*) tsconfig.json node_modules
	./node_modules/.bin/tsc

node_modules: package.json
	npm install
	touch -m $@

# vendored stuff

PACKAGE_VERSION:=$(shell cat vendor/package_HEAD)
vendor/package: vendor/package_HEAD
	test -d $@ || git clone https://github.com/elm-lang/package.elm-lang.org $@
	cd $@ && git fetch && git reset --hard ${PACKAGE_VERSION}
	touch -m $@
