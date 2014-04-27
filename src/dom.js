
////////////////////  dom  ////////////////////
_ext.dom = {};
_ext.dom._ini = function () {
	var $ = root.$;
	this.jWin = $(root);
	this.jDoc = $(document.documentElement);
	var _ns = this;
	$(function () {  //document.body maybe not ready when this js running.
		_ns.rootElem = document.compatMode && document.compatMode === 'CSS1Compat' ? document.documentElement : document.body;
		_ns.rootScrollingElem = (_.ua.isWebKit) ? document.body : _ns.rootElem;
		_ns.jBody = $(document.body);
	});
	this.isJQuery = function (o) {
		var J = root.jQuery;
		return !!J && o instanceof J;
	};
	this.isZepto = function (o) {
		var J = root.Zepto;
		return !!J && _.isObject(o) && (_.isString(o.selector) || _.isArray(o.selector)) && _.isNumber(o.length);
	};
	this.data = function (elem, sKey, sValue) {
		if (!_.isElement(elem) || _.isEmpty(sKey) || !_.isString(sKey)) return false;
		sKey = _.str.trim(sKey.replace(/\W/g, ' '));  //clean sKey
		var sDataKey = _.str.camelize(sKey);
		var sAttrKey = 'data-' + _.str.dasherize(sKey);
		var isSupported = _.ua.support.dataset;
		if (arguments.length > 2) {  //setter
			if (isSupported) {
				elem.dataset[sDataKey] = sValue;
			} else {
				elem.setAttribute(sAttrKey, sValue);
			}
		} else if (arguments.length === 2) {  //getter
			return isSupported ? elem.dataset[sDataKey] : elem.getAttribute(sAttrKey);
		} else {
			return false;
		}
	};
	this.hasClass = function (elem, sClass) {
		if (!_.isElement(elem) || _.isEmpty(sClass) || !_.isString(sClass)) return false;
		return _.str.include(_.str.surround(elem.className, ' '), _.str.surround(sClass, ' '));
	};
};
