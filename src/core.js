
////////////////////  core  ////////////////////
var root = this
var _ = root._
var $ = root.Zepto || root.jQuery || root.$
var _ext = {};

//config
/*
_ext.config = {
	debug: _.str.include(location.href, 'debug=1') || _.str.include(location.hash, 'debug=1'),
	selAction: ''
};
_ext.config._ini = function () {
	//todo: window.onhashchange to update _.config.debug
	this.get = function (key) {
		return _.isString(key) && key ? sessionStorage.getItem(key) || localStorage.getItem(key) || '' : false;  //to be improved
	};
	this.set = function (key, value, bSession) {
		if (_.isString(key)) {
			(bSession ? sessionStorage : localStorage).setItem(key, '' + value);
		} else {
			return false;
		}
	};
	this.del = function (key) {
		if (_.isString(key) && key) {
			sessionStorage.removeItem(key);
			localStorage.removeItem(key);
		} else {
			return false;
		}
	};
};
*/
