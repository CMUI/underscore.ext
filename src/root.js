
////////////////////  root  ////////////////////
_ext.root = {
	$: function (input) {
		var result;
		if (_.isElement(input)) {
			result = input.__j__ = input.__j__ || root.$(input);
		} else if (_.dom.isJQuery(input) || _.dom.isZepto(input)) {
			result = input;
		} else {
			result = root.$(input);
		}
		return result;
	},
	log: function (input) {
		if (!_ext.config || !_ext.config.debug) return false;
		if (root.console) console.log(input);
	},
	isPlainObject: $.isPlainObject,
	includeKey: function (o, key) {  //key: '' or []
		var result = false;
		if (_.isPlainObject(o)) {
			result = true;
			var dataKeys = _.keys(o);
			if (_.isArray(key)) {
				_.each(key, function (n) {
					if (!_.include(dataKeys, '' + n)) {result = false; return false; }
				});
			} else if (_.isNumber(key) || _.isString(key)) {
				if (!_.include(dataKeys, '' + key)) {result = false; }
			}
		}
		return result;
	}
};

//export immediately
_ext.exports('root')
