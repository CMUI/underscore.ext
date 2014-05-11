
////////////////////  dom  ////////////////////
void function (window, _ext) {
	'use strict'

	//namespace
	var dom = {}

	//shortcuts
	var jWin = dom.jWin = $(window)
	var jDoc = dom.jDoc = $(document.documentElement)

	$(_.bind(function () {  //document.body maybe not ready when this js running.
		this.jBody = $(document.body)
	}, dom))

	//methods
	this.is$Element = function (o) {
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
