.PHONY: all
all: vendor/packge

PACKAGE_VERSION:=$(shell cat vendor/package_HEAD)
vendor/package: vendor/package_HEAD
	test -d $@ || git clone https://github.com/elm-lang/package.elm-lang.org $@
	cd $@ && git fetch && git reset --hard ${PACKAGE_VERSION}
	touch -m $@
