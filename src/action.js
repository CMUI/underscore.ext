
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

	//debug
	action._actionList = _actionList

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

	//exports
	_ext.exports('action', action)
}(window, _ext)
