
////////////////////  exports  ////////////////////
void function (root, _ext) {
	'use strict'

	_ext.exports = function (key) {  //key: '...' or [...]
		var _ns = this;
		key = _.isArray(key) ? _.compact(key) : /*_.str.trim(*/key/*)*/;
		//console.log(key);
		function fnCheckKey(key) {
			if (_[key]) {
				_ns.root.log('[Warning] _ already has key: ' + key);
				return false;
			} else {
				return true;
			}
		}
		function fnExportModule(key) {
			if (_.isArray(key)) {
				_.each(key, function (n) {fnExportModule(n); });
			} else if (_.isString(key)) {
				if (key === 'root') {
					_.each(_ns.root, function (n, i) {
						fnCheckKey(i);
						_[i] = n;
					});
				} else if (key === 'template') {
					_.extend(_.template, _ns.template);
				} else {
					fnCheckKey(key);
					_[key] = _ns[key];
				}
//				if (_[key] && _.isFunction(_[key]._ini)) _[key]._ini();
			}
		}
//		if (_ns.root.includeKey(_ns, key)) {
			fnExportModule(key);
//		} else {
//			_ns.root.log('[Error] Invalid key(s) to export: ' + key);
//			return false;
//		}
	};
	_ext.ini = function (oConfig) {
		var result = false;
		if (!$) {
			_.log('[Error] $ not found!');
		} else if (!_) {
			_.log('[Error] _ not found!');
		} else {
			//get config info from gm script
			if (root._extConfigData) {
				_.extend(this.config, root._extConfigData);
				delete root._extConfigData;
			}
			//get config info from arguments
			if (_.isPlainObject(oConfig)) {
				_.extend(this.config, oConfig);
			}
			//bind to _ and ini
			this.exports(this.config.module || [
				'config',
				'ua',
				'dom',
				'url',
				'event',
				'task',
				'action',
				'ga',
				'sns',
				'ajax',
				'template',
				'system'
			]);
			result = true;
		}
		return result;
	};
}(root, _ext)
