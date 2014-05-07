
////////////////////  str - backup for underscore.string  ////////////////////
//this file contains apis same as underscore.string's.
//heavily inspired by [underscore.string](https://github.com/epeli/underscore.string)

//if you has underscore.string in your project,
//just skip this file when building your own package.
void function (window, _ext) {
	'use strict'

	//check underscore.string
	//namespace
	var str = _.str || {}
	//quit if underscore.string existed
	if (str.VERSION && typeof str.trim === 'function') return false

	//source: https://github.com/epeli/underscore.string/blob/master/lib/underscore.string.js
	//util
	var _s = str
	var nativeTrim = String.prototype.trim
	var nativeTrimRight = String.prototype.trimRight
	var nativeTrimLeft = String.prototype.trimLeft

	var defaultToWhiteSpace = function (characters) {
		if (characters == null)
			return '\\s'
		else if (characters.source)
			return characters.source
		else
			return '[' + _s.escapeRegExp(characters) + ']'
	}
	str.escapeRegExp = function (str) {
		if (str == null) return ''
		return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1')
	}

	//trim
	str.trim = function (str, characters) {
		if (str == null) return ''
		if (!characters && nativeTrim) return nativeTrim.call(str)
		characters = defaultToWhiteSpace(characters)
		return String(str).replace(new RegExp('\^' + characters + '+|' + characters + '+$', 'g'), '')
	}
	str.ltrim = function (str, characters) {
		if (str == null) return ''
		if (!characters && nativeTrimLeft) return nativeTrimLeft.call(str)
		characters = defaultToWhiteSpace(characters)
		return String(str).replace(new RegExp('^' + characters + '+'), '')
	}
	str.rtrim = function (str, characters) {
		if (str == null) return ''
		if (!characters && nativeTrimRight) return nativeTrimRight.call(str)
		characters = defaultToWhiteSpace(characters)
		return String(str).replace(new RegExp(characters + '+$'), '')
	}

	//exports
	_ext.exports('str', str)
}(window, _ext)
