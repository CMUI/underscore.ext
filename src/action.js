
////////////////////  action  ////////////////////
_ext.action = {};
_ext.action._ini = function () {
	this._oActionList = {};
	this.ini = function () {
		var sel = _.config.selAction || 'a.cmAction, [data-action]';
		this._bind(sel);
	};
	this._bind = function (sel) {
		var _ns = this;
		_.event.onTap(sel, function (e) {
			e.preventDefault();
			//get action
			var sV = _.dom.data(this, 'action') || this.rel || '';  //[this.rel] is deprecated.
			var s = _.str.isHash(sV) ? sV : _.url.getHashFromLink(this);
			//check action
			if (s === '#' || s === '###' || s === '#none') {
				_.log('[Hint] Empty action. Do nothing.');
			} else if (_.str.isHash(s)) {
				_ns._handle(_.str.ltrim(s, '!#'), this);
			} else {
				_.log('[Error] No action assigned to this link!');
			}
		});
	};
	this._handle = function (sAction, eBtn) {
		var fn = this._oActionList[sAction];
		if (_.isFunction(fn)) {
			_.log('[Hint] action: ' + sAction);
			fn.call(eBtn || window);
		} else {
			_.log('[Error] Not found this action: ' + sAction);
		}
	};
	this.extend = function (o) {
		if (_.isObject(o)) {
			_.extend(this._oActionList, o);
		}
	};
	this.trigger = function (s, context) {
		if (_.isString(s)) {
			this._handle(s, context);
		}
	};
	this.ini();
};
