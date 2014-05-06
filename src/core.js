
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
//		var _ns = this
		if (key === 'root') {
			//{apiSet}.xxx => _.xxx
			_.each(apiSet, function (n, i) {
				checkKey(i)
				_[i] = n
			})
		} else {
			//{apiSet}.xxx => _.{key}.xxx
			if (checkKey(key)) {
				_.extend(_[key], apiSet)
			} else {
				_[key] = apiSet
			}
		}

		function checkKey(key) {
			if (_[key]) {
				if (!(key === 'template' || key === 'str')) console.warn('_ already has key: ' + key)
				return true
			} else {
				return false
			}
		}
	}

}(window, _ext)
