
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

	//check url
//	url.isHash = _.str.isHash
//	url.stripHash = _.str.stripHash
//	url.isFullUrl = _.str.isFullUrl
//	url.isAbsolutePath = _.str.isAbsolutePath

	//exports
	_ext.url = url
	_ext.exports('url')
}(window, _ext)
