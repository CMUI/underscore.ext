
////////////////////  core  ////////////////////
//namespace
var _ext = {}

void function (window, _ext) {
	'use strict'

	_ext.exports = function (key) {
		if (!key || !_.isString(key)) return false
		var _ns = this
		if (_.include(_.keys(_ns), key)) {
			exportModule(key)
		} else {
			console.error('Invalid key to export: ' + key)
			return false
		}

		//util
		function checkKey(key) {
			if (_[key]) {
				if (!_.include(['template', 'str'], key)) console.warn('_ already has key: ' + key)
				return true
			} else {
				return false
			}
		}
		function exportModule(key) {
			if (key === 'root') {
				//_ext.root.xxx => _.xxx
				_.each(_ns.root, function (n, i) {
					checkKey(i)
					_[i] = n
				})
			} else {
				//_ext.{key}.xxx => _.{key}.xxx
				if (checkKey(key)) {
					_.extend(_[key], _ns[key])
				} else {
					_[key] = _ns[key]
				}
			}
		}
	}

}(window, _ext)
