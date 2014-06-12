/**
 * underscore.ext
 */
void function (window, undefined) {
	'use strict'

////////////////////  var  ////////////////////
var _ = window._
var $ = window.Zepto || window.jQuery || window.$
var document = window.document

//check dependency
if (!_ || !$) return false

////////////////////  core  ////////////////////
//namespace
var _ext = {}

void function (window, _ext) {
	'use strict'

	/**
	 * bind a set of apis to a key of `_` as namespace
	 * @param key {string}
	 * @param apiSet {object}
	 * @returns {boolean}
	 */
	_ext.exports = function (key, apiSet) {
		if (!key || !_.isString(key) || !apiSet || !_.isObject(apiSet)) return false
		if (key === 'root') {
			//{apiSet}.xxx => _.xxx
			_.each(apiSet, function (value, key) {
				exportKey(key, value)
			})
		} else {
			//{apiSet}.xxx => _.{key}.xxx
			exportKey(key, apiSet)
		}

		function exportKey(key, apiSet) {
			if (checkKey(key)) {
				_.extend(_[key], apiSet)
			} else {
				_[key] = apiSet
			}
		}
		function checkKey(key) {
			if (_[key]) {
				//warn if going to modify existed key unintentionally
				var knownKeysToBeExtended = ['template', 'str']
				if (!_.include(knownKeysToBeExtended, key)) {
					console.warn('_ already has key: ' + key)
				}
				return true
			} else {
				return false
			}
		}
	}

}(window, _ext)

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
		return String(str).replace(new RegExp('^' + characters + '+|' + characters + '+$', 'g'), '')
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

	//sub-string
	str.include = function (str, needle) {
		if (needle === '') return true
		if (str == null) return false
		return String(str).indexOf(needle) !== -1
	}
	str.startsWith = function (str, starts) {
		if (starts === '') return true
		if (str == null || starts == null) return false
		str = String(str)
		starts = String(starts)
		return str.length >= starts.length && str.slice(0, starts.length) === starts
	}
	str.endsWith = function (str, ends) {
		if (ends === '') return true
		if (str == null || ends == null) return false
		str = String(str)
		ends = String(ends)
		return str.length >= ends.length && str.slice(str.length - ends.length) === ends
	}

	//aliases
	_s.contains = _s.include

	//exports
	_ext.exports('str', str)
}(window, _ext)

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

////////////////////  root  ////////////////////
void function (window, _ext) {
	'use strict'

	var root = {
		$: function (input) {
			var result
			if (_.isElement(input)) {
				result = input.__$__ = input.__$__ || $(input)
			} else if (_.dom.is$Element(input)) {
				result = input
			} else {
				result = $(input)
			}
			return result
		},
		isPlainObject: $.isPlainObject
	}

	_ext.exports('root', root)
}(window, _ext)

////////////////////  ua  ////////////////////
void function (window, _ext) {
	'use strict'

	//namespace
	var ua = {}

	//detect by feature
	var style = document.documentElement.style
	ua.isWebKit = 'webkitTransform' in style
	ua.isMoz = 'MozTransform' in style
	//we want it to work with chrome's touch device simulator,
	//so we don't use `document.createTouch` to detect.
	ua.isTouchDevice = ('ontouchstart' in window) && ('ontouchmove' in window) &&
			('ontouchend' in window)

	//detect by ua string
	ua.str = navigator.userAgent

	function __detect(ua) {
		var s = ua.str.toLowerCase()

		ua.isSafari = /\bapple\b/i.test(navigator.vendor) && /\bsafari\b/i.test(s)
		ua.isChrome = _.str.include(s, 'chrome') ||
				_.str.include(s, 'crios')	//both desktop and mobile version

		//platform version and device
		ua.osVersion = '0'
		ua.isIOS = /\(i(?:phone|pod|pad)\b/.test(s) || /\bios \d+\./.test(s)
		if (ua.isIOS) {
			ua.isIPad = /\(ipad\b/.test(s)
			ua.isIPod = /\(ipod\b/.test(s)
			ua.isIPhone = /\(iphone\b/.test(s)
			ua.osVersion = (/[\/; i]os[\/: _](\d+(?:[\._]\d+)?)[\._; ]/.exec(s) || [0,'0'])[1]
				.replace('_', '.')
		} else {
			var _includeAndroid = _.str.include(s, 'android')
			var _includeAdr = /\badr\b/.test(s) && /\blinux;\s*u;/.test(s)
			var _isJUC = /juc\s*\(linux;\s*u;\s*\d+\.\d+/.test(s)
			ua.isAndroid = _includeAndroid || _includeAdr || _isJUC
			if (_includeAdr || _isJUC) {
				ua.osVersion = (
					/\badr[\/: ]?(\d+\.\d)\d*\b/.exec(s) ||
					/\blinux;\s*u;\s*(\d+\.\d)\d*\b/.exec(s) || [0,'0']
				)[1]
			} else {
				ua.osVersion = (/\bandroid(?:_os)?[\/: ]?(\d+\.\d)\d*\b/.exec(s) || [0,'0'])[1]
			}
		}
		if (!_.str.include(ua.osVersion, '.')) ua.osVersion += '.0'

		//summery
		if (ua.isIOS || ua.isAndroid) ua.isMobileDevice = true

		return ua
	}

	//todo: detect size and features of screen
	/*
	function __detectScreen(ua) {
		return ua
	}
	*/

	//init
	__detect(ua)
	//__detectScreen(ua)

	//exports for unit test
	ua.__detect = __detect
	//ua.__detectScreen = __detectScreen

	//exports
	_ext.exports('ua', ua)
}(window, _ext)

////////////////////  url  ////////////////////
void function (window, _ext) {
	'use strict'

	//namespace
	var url = {}

	//page type
	url.isInFrame = window.self !== window.top

	//basic info
	var loc = window.location

	//url param processing
	url.parseQuery = function(query) {
		var data = {}
		if (query && _.isString(query)) {
			var pairs = query.split('&'), pair, name, value
			_.each(pairs, function(n) {
				pair = n.split('=')
				name = pair[0]
				value = pair[1] || ''
				if (name) {
					data[decodeURIComponent(name).toLowerCase()] = decodeURIComponent(value)
				}
			})
		}
		return data
	}

	var _query, _cacheParam = null
	function _getQuery() {
		return loc.search.slice(1)
	}
	url.getParam = function (s) {
		if (!s || !_.isString(s)) return false
		if (!_query) {	//first run
			_query = _getQuery()
		} else {
			var currentQuery = _getQuery()
			if (currentQuery !== _query) {
				_cacheParam = null	//clear cache to enforce re-parse
				_query = currentQuery
			}
		}
		if (!_cacheParam) {
			_cacheParam = this.parseQuery(_query)
		}
		return _cacheParam[s.toLowerCase()]
	}

	url.appendParam = function (url, param) {	//append param to (url || current url)
		var s = ''
		url = _.isString(url) ? url : ''
		url = _.url.removeHashFromUrl(url)
		if (_.isPlainObject(param)) {
			param = $.param(param)
		} else if (_.isString(param)) {
			//fix param string
			if (_.str.startsWith(param, '&') || _.str.startsWith(param, '?')) {
				param = param.slice(1)
			}
		} else {
			param = null
		}
		//append
		s = param ? url + (_.str.include(url, '?') ? '&' : '?') + param : s
		return s || false
	}

	//parse url
	var _cacheParsedUrl = {}
	var _urlParts = ['protocol', 'host', 'hostname', 'port', 'pathname', 'search', 'hash']
	url.parseUrl = function (s, sPart) {
		if (!_.isString(s) || !_.str.isFullUrl(s)) return false
		if (sPart && (!_.isString(sPart) || !_.include(_urlParts, sPart))) return false
		var url = _.str.trim(s)
		var result = _cacheParsedUrl[url]
		if (!result) {
			//ini
			result = {}
			_.each(_urlParts, function (n) {
				result[n] = ''
			})
			//hash
			var iHashPos = url.indexOf('#')
			if (iHashPos > -1) {
				result.hash = url.slice(iHashPos)
				url = url.slice(0, iHashPos)
			}
			//search
			var iQuestionPos = url.indexOf('?')
			if (iQuestionPos > -1) {
				result.search = url.slice(iQuestionPos)
				url = url.slice(0, iQuestionPos)
			}
			//protocol
			var iDblSlashPos = url.indexOf('//')
			if (iDblSlashPos > -1) {
				result.protocol = url.slice(0, iDblSlashPos).replace(':', '')
				url = url.slice(iDblSlashPos + 2)
			}
			//pathname
			var iSlashPos = url.indexOf('/')
			if (iSlashPos > -1) {
				result.pathname = url.slice(iSlashPos)
				url = url.slice(0, iSlashPos)
			} else {
				result.pathname = '/'
			}
			//host & port
			var iColonPos = url.indexOf(':')
			if (iColonPos > -1) {
				result.port = url.slice(iColonPos + 1)
				result.host = url.slice(0, iColonPos)
			} else {
				result.host = url
			}
			//clone host
			result.hostname = result.host
			//cache
			_cacheParsedUrl[url] = result
		}
		return sPart ? result[sPart] : result
	}
	url.composeUrl = function (o) {
		if (!_.isPlainObject(o)) return false
		var host = o.host || o.hostname
		var fnCheckValue = function (sKey) {return _.isString(sKey) && _.str.trim(sKey)}
		if (!fnCheckValue(host)) return false
		var result = []
		result.push(fnCheckValue(o.protocol) ? _.str.trim(o.protocol) + '://' : '//')
		result.push(_.str.trim(host))
		//port
		var port = _.str.toNumber(o.port)
		result.push(port ? ':' + port : '')
		//pathname
		result.push(fnCheckValue(o.pathname) ? _.str.trim(o.pathname) : '/')
		//search
		var search = _.str.trim(o.search)
		if (fnCheckValue(search) || _.isNumber(search)) {
			search = _.str.startsWith(search, '?') ? search : '?' + search
		} else if (_.isPlainObject(search)) {
			search = '?' + $.param(search)
		} else {
			search = ''
		}
		result.push(search)
		//hash
		var hash = _.str.trim(o.hash)
		if (hash && _.isString(hash)) {
			hash = _.str.startsWith(hash, '#') ? hash : '#' + hash
		} else if (_.isPlainObject(hash)) {
			hash = '#' + $.param(hash)
		} else {
			hash = ''
		}
		result.push(hash)
		//output
		return result.join('')
	}

	//hash processing
	url.removeHashFromUrl = function (s) {
		return _.isString(s) && s.split('#')[0]
	}
	url.getHashFromUrl = function (s) {
		return _.url.parseUrl(s, 'hash')
	}
	url.getHashFromHref = function (s) {
		var result = false
		if (_.isString(s)) {
			var iHashPos = s.indexOf('#')
			result = (iHashPos > -1) ? s.slice(iHashPos + 1) : ''
		}
		return result
	}
	url.getHashFromLink = function (e) {
		var result = false
		if (_.isElement(e) && e.tagName.toLowerCase() === 'a') {
			result = e.getAttribute('href', 2)
			result = _.str.isHash(result) ? result : this.getHashFromHref(result)
		}
		return result
	}

	//resource loading
	url.open = function (s) {return _.isString(s) ? window.open(s) : false}
	url.go = function (s) {return _.isString(s) ? (loc.href = s) : false}
	url.refresh = url.reload = function () {loc.reload()}
	url.preloadImg = function (s) {
		//todo: check if preloaded
		var img = _.isString(s) ? new Image() : false
		if (img) {
			var id = _.uniqueId('preloadImg')
			img.src = s
			window[id] = img	//avoid gc
			//todo: remove id from global
		}
		return img
	}

	//aliases
	url.isHash = _.str.isHash
	url.stripHash = _.str.stripHash
	url.isFullUrl = _.str.isFullUrl
	url.isAbsolutePath = _.str.isAbsolutePath

	//exports
	_ext.exports('url', url)
}(window, _ext)

////////////////////  dom  ////////////////////
void function (window, _ext) {
	'use strict'

	//namespace
	var dom = {}

	//shortcuts for frequently-used elements
	dom.$win = $(window)
	dom.$doc = $(document.documentElement)

	//getting `document.body` is a little complicated
	//on firefox, there's a obvious latency between `document.readyState` becoming `interactive`
	//and `DOMContentLoaded` event
	var $body
	var isBodyReady = false

	function _tryGetBody() {
		if (isBodyReady) return
		var body = document.body
		if (body) {
			$body = dom.$body = $(body)
			isBodyReady = true
			document.removeEventListener('readystatechange', checkReadyState, false)
		}
	}
	function checkReadyState() {
		if (/interactive|loaded|complete/.test(document.readyState)) {
			_tryGetBody()
		}
	}
	//try getting `document.body` - sync
	_tryGetBody()

	//try getting `document.body` - async
	if (!$body) {
		document.addEventListener('readystatechange', checkReadyState, false)
		$(function () {
			_tryGetBody()
		})
	}

	//methods
	dom.is$Element = function (o) {
		if (!o || !_.isObject(o)) return false
		var result = false
		if ('__proto__' in o) {
			result = o.__proto__ === $.fn
		} else {
			var Class = ($.zepto && $.zepto.Z) || $
			result = o instanceof Class
		}
		return result
	}

	//exports
	_ext.exports('dom', dom)
}(window, _ext)

////////////////////  action  ////////////////////
//an easy and lazy solution for click-event-binding

//step 1:
//use `_.action.extend(actionList)` to define some actions
//format of actionList:
//{"action-name": callback, [...]}

//step 2:
//create a element and append to dom:
//`<a href="#action-name" data-action>link</a>`
//or `<a href="#" data-action="action-name">link</a>`
//or `<button data-action="action-name">btn</button>`

//step 3:
//you've done everything. click the element to trigger the callback.
//the callback is called on the element as its context.

//one more thing:
//use `_.action.trigger("action-name")` to call the callback manually.
//you can use the optional second param to specify the callback's context:
//`_.action.trigger("action-name", context)`

void function (window, _ext) {
	'use strict'

	//namespace
	var action = {}

	var SELECTOR = '[data-action]'
	var _actionList = {}
	function _bind() {
		var $wrapper = _.dom.$body || _.dom.$doc
		$wrapper.on('click', SELECTOR, function (ev) {
			ev.preventDefault()
			var elem = this
			var $elem = _.$(elem)
			//get action
			var actionName = $elem.data('action') || _.url.getHashFromLink(elem)
			if (!actionName) {
				console.warn('No action assigned!')
			} else {
				actionName = _.str.stripHash(actionName)
				if (!actionName || actionName === 'none') {
					console.info('Empty action. Do nothing.')
				} else {
					_handle(actionName, elem)
				}
			}
		})
	}
	function _handle(actionName, context) {
		var fn = _actionList[actionName]
		if (_.isFunction(fn)) {
			console.log('executing action: ' + actionName)
			fn.call(context || window)
		} else {
			console.error('Not found callback of action: ' + actionName)
		}
	}

	//api
	action.extend = function (actionSet) {
		if (_.isPlainObject(actionSet)) {
			_.extend(_actionList, actionSet)
		}
	}
	action.trigger = function (actionName, context) {
		if (_.isString(actionName)) {
			_handle(actionName, context)
		}
	}

	//init
	_bind()

	//exports for unit test
	action._actionList = _actionList

	//exports
	_ext.exports('action', action)
}(window, _ext)

////////////////////  template  ////////////////////
//front-end template fetching, caching and rendering

void function (window, _ext) {
	'use strict'

	//namespace
	var template = {}

	//config
	var _config = {
		//for jedi 1.0
		needStripCommentTag: true,

		//compatible with ejs
		interpolate : /<%-([\s\S]+?)%>/g,
		escape      : /<%=([\s\S]+?)%>/g,

		//to avoid use `with` in compiled templates
		//see: https://github.com/cssmagic/blog/issues/4
		variable: 'data'
	}
	var PREFIX_TEMPLATE = 'template-'

	//cache
	var _cacheTemplate = {}
	var _cacheCompiledTemplate = {}

	//util
	function _toTemplateId(id) {
		return String(id).replace(PREFIX_TEMPLATE, '')
	}
	function _toElementId(id) {
		return _.str.startsWith(id, PREFIX_TEMPLATE) ? id : PREFIX_TEMPLATE + id
	}
	function _stripCommentTag(str) {
		str = String(str)
		if (_.str.startsWith(str, '<!' + '--') && _.str.endsWith(str, '-->')) {
			str = str.replace(/^<!\-\-/, '').replace(/\-\->$/, '')
			str = _.str.trim(str)
		}
		return str
	}
	//get template by id (of dummy script element in html)
	function _getTemplateById(id) {
		if (!id || !_.isString(id)) return false
		var result
		var idElement = _toElementId(id)
		var elem = document.getElementById(idElement)
		if (!elem) {
			console.error('Element "#' + idElement + '" not found!')
		} else {
			var str = _.str.trim(elem.innerHTML)
			if (!str) {
				console.error('Element "#' + idElement + '" is empty!')
			} else {
				//strip html comment tag wrapping template code
				if (_.templateSettings.needStripCommentTag) str = _stripCommentTag(str)
				if (_isTemplateCode(str)) {
					result = str
				} else {
					console.error('Template code in element "#' + idElement + '" is no valid!')
				}
			}
		}
		return result || false
	}
	function _isTemplateCode(s) {
		var code = String(s)
		return _.str.include(code, '<%') && _.str.include(code, '%>') && /\bdata\b/.test(code)
	}

	//fn
	function updateSettings() {
		_.extend(_.templateSettings, _config)
	}
	function add(id, templateCode) {
		//todo: accept second param as a function, to support pre-compiled template.
		if (!id || !_.isString(id)) return false
		id = _.str.stripHash(id)
		var result
		if (templateCode) {
			var templateId = _toTemplateId(id)
			if (_cacheTemplate[templateId]) {
				console.warn('Template cache already has id: "' + templateId + '"')
			}
			result = _cacheTemplate[templateId] = templateCode
		} else {
			//todo: support `_.template.add(id)` to add from dummy script element
			console.error('Missing template code to add to cache.')
		}
		return !!result
	}

	//api
	template.remove = function (/* id */) {
		//todo: remove template from cache (both str and fn)
		//todo: remove dummy script element
	}
	template.add = add
	template.render = function (id, data) {
		//todo: support _.template.render(templateCode, templateData)
		if (arguments.length < 2) {
			console.error('Missing data to render template: "' + id + '"')
			return false
		}
		var result
		var templateId = _toTemplateId(id)

		//todo: refactor: use recursion to simplify these codes
		//search in _cacheCompiledTemplate
		var fn = _cacheCompiledTemplate[templateId]
		var templateCode = _cacheTemplate[templateId]
		if (_.isFunction(fn)) {
			result = fn(data)
		}
		//search in _cacheTemplate
		else if (_.isString(templateCode)) {
			fn = _.template(templateCode)
			_cacheCompiledTemplate[templateId] = fn
			result = fn(data)
		}
		//get template code from dom
		else {
			templateCode = _getTemplateById(templateId)
			if (templateCode) {
				_cacheTemplate[templateId] = templateCode
				fn = _.template(templateCode)
				_cacheCompiledTemplate[templateId] = fn
				result = fn(data)
			}
		}
		return result || ''
	}

	//init
	updateSettings()

	//exports for unit test
	template.__isTemplateCode = _isTemplateCode
	template.__stripCommentTag = _stripCommentTag
	template.__cacheTemplate = _cacheTemplate
	template.__cacheCompiledTemplate = _cacheCompiledTemplate

	//exports
	_ext.exports('template', template)
}(window, _ext)

}(this);
