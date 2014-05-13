
////////////////////  str  ////////////////////
void function (window, _ext) {
	'use strict'

	//namespace
	var str = _.str || {}

	//shortcuts for frequently-used characters
	str.CNY = str.RMB = '\xA5'	//CNY(RMB) symbol
	str.FULL_WIDTH_CNY = str.FULL_WIDTH_RMB = '\uffe5'	//CNY(RMB) symbol in full-width chinese

	//shortcuts for frequently-used regexp
	str.RE_EMAIL = /^(?:[a-z\d]+[_\-\+\.]?)*[a-z\d]+@(?:([a-z\d]+\-?)*[a-z\d]+\.)+([a-z]{2,})+$/i
	str.RE_MOBILE = /^1[34578]\d{9}$/
	str.RE_POSTCODE = /^\d{6}$/

	//url tool
	str.isHash = function (str) {
		str = _.str.trim(str)
		return _.str.startsWith(str, '#')
	}
	str.stripHash = function (str) {
		str = _.str.trim(str)
		str = _.str.ltrim(str, '#')
		if (_.str.startsWith(str, '!')) str = str.slice(1)
		return str
	}
	str.isFullUrl = function (str) {
		return _.str.startsWith(str, 'http:\/\/') ||
				_.str.startsWith(str, 'https:\/\/') ||
				_.str.startsWith(str, '\/\/')
	}
	str.isAbsolutePath = function (str) {
		return _.str.isFullUrl(str) || _.str.startsWith(str, '\/')
	}

	//data
	str.parseJSON = function (input) {
		function parseData(str) {
			if (!str) return false
			var o = null
			try {
				o = JSON.parse(str)
			} catch (error) {
				console.error('JSON wrong format: ' + str)
			}
			return o
		}
		var output = null
		if (_.str.isHash(input)) {
			var elem = document.getElementById(_.str.stripHash(input))
			if (elem) {
				output = parseData(elem.innerHTML)
			} else {
				console.error('No such element: ' + input)
			}
		} else if (_.isString(input)) {
			output = parseData(input)
		} else {
			output = input
		}
		return output
	}

	//common tool
	str.uniq = str.unique = function (arr) {
		if (!_.isArray(arr)) return false
		var obj = {}
		_.each(arr, function (str) {
			obj[String(str)] = null
		})
		return _.keys(obj)
	}

	//more `toNumber` methods
	str.toFloat = function (str) {return parseFloat(String(str))}
	str.toInt = function (str) {return parseInt(String(str), 10)}
	str.toFixed = function (str, i) {return _.str.toFloat(_.str.toFloat(str).toFixed(i || 0))}

	//tool for chinese character
	//full-width character counts as 1, half-width character counts as 0.5
	str.fullWidthLength = function (str) {
		if (_.isEmpty(str)) return 0
		str = String(str)
		var len = str.length
		var countFullWidth = 0
		for (var i = 0, charCode; i < len; ++i) {
			charCode = str.charCodeAt(i)
			if (charCode < 27 || charCode > 126) countFullWidth++
		}
		return (len + countFullWidth) / 2
	}

	//exports
	_ext.exports('str', str)
}(window, _ext)
