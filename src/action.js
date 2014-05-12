
////////////////////  action  ////////////////////
void function (window, _ext) {
	'use strict'

	//namespace
	var action = {}

	var SELECTOR = '[data-action]'
	var _actionList = {}
	function _bind() {
		var $wrapper = _.dom.jBody || _.dom.jDoc
		$wrapper.on('click', SELECTOR, function (ev) {
			ev.preventDefault()
			var elem = this
			var $elem = _.$(elem)
			//get action
			var action = $elem.data('action') || _.url.getHashFromLink(elem)
			if (!action) {
				console.warn('No action assigned!')
			} else {
				action = _.str.stripHash(action)
				if (!action || action === 'none') {
					console.info('Empty action. Do nothing.')
				} else {
					_handle(action, elem)
				}
			}
		})
	}
	function _handle(action, context) {
		var fn = _actionList[action]
		if (_.isFunction(fn)) {
			console.log('action: ' + action)
			fn.call(context || window)
		} else {
			console.error('Not found callback of action: ' + action)
		}
	}

	//debug
	action._actionList = _actionList

	//api
	action.extend = function (o) {
		if (_.isPlainObject(o)) {
			_.extend(_actionList, o)
		}
	}
	action.trigger = function (s, context) {
		if (_.isString(s)) {
			_handle(s, context)
		}
	}

	//init
	_bind()

	//exports
	_ext.exports('action', action)
}(window, _ext)
