#!/bin/sh

# prepare directory
# todo: don't make if it already existed
mkdir dist

# normal release
cat \
	src/adapter-trad/_intro.js \
	src/adapter-trad/_var.js \
	src/core.js \
	src/str-backup.js \
	src/str.js \
	src/root.js \
	src/ua.js \
	src/url.js \
	src/dom.js \
	src/adapter-trad/_outro.js \
	> \
	dist/underscore.ext.js

# cmd release
cat \
	src/adapter-cmd/_intro.js \
	src/adapter-cmd/_var.js \
	src/core.js \
	src/str-backup.js \
	src/str.js \
	src/root.js \
	src/ua.js \
	src/url.js \
	src/dom.js \
	src/adapter-cmd/_outro.js \
	> \
	dist/underscore.ext.cmd.js

# todo: amd release, or an universal module release
