
////////////////////  exports  ////////////////////
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
				console.warn('_ already has key: ' + key)
				return false
			} else {
				return true
			}
		}
		function exportModule(key) {
			if (key === 'root') {
				//_ext.root.xxx => _.xxx
				_.each(_ns.root, function (n, i) {
					checkKey(i)
					_[i] = n
				})
			} else if (key === 'template') {
				//_ext.template.xxx => _.template.xxx
				_.extend(_.template, _ns.template)
			} else {
				//_ext.foo.xxx => _.foo.xxx
				checkKey(key)
				_[key] = _ns[key]
			}
		}
	}

}(root, _ext)
