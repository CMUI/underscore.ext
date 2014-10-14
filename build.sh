#!/bin/sh

# prepare directory
# todo: don't make if it already existed
mkdir dist

# normal release
cat \
	src/adapter-dist-trad/_intro.js \
	src/adapter-dist-trad/var.js \
	src/adapter-dist-trad/_defense.js \
	src/core.js \
	src/str-backup.js \
	src/str.js \
	src/root.js \
	src/ua.js \
	src/url.js \
	src/dom.js \
	src/adapter-mod-action/_intro.js \
	bower_components/action/src/action.js \
	src/adapter-mod-action/_outro.js \
	src/adapter-mod-template/_intro.js \
	bower_components/underscore-template/src/underscore-template.js \
	src/adapter-mod-template/config.js \
	src/adapter-mod-template/_outro.js \
	src/adapter-dist-trad/_outro.js \
	> \
	dist/underscore.ext.js

# cmd release
cat \
	src/adapter-dist-cmd/_intro.js \
	src/adapter-dist-cmd/var.js \
	src/core.js \
	src/str-backup.js \
	src/str.js \
	src/root.js \
	src/ua.js \
	src/url.js \
	src/dom.js \
	src/adapter-mod-action/_intro.js \
	bower_components/action/src/action.js \
	src/adapter-mod-action/_outro.js \
	src/adapter-mod-template/_intro.js \
	bower_components/underscore-template/src/underscore-template.js \
	src/adapter-mod-template/config.js \
	src/adapter-mod-template/_outro.js \
	src/adapter-dist-cmd/_outro.js \
	> \
	dist/underscore.ext.cmd.js

# todo: amd release, or an universal module release

# minify
uglifyjs dist/underscore.ext.js -o dist/underscore.ext.min.js -c -m --screw-ie8 --stats --comments
