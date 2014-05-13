
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
