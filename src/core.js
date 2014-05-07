
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
