#!/bin/sh
cat \
	src/adapter-normal/_intro.js \
	src/adapter-normal/_var.js \
	src/exports.js \
	src/url.js \
	src/adapter-normal/_outro.js \
	> \
	dist/underscore.ext.js
