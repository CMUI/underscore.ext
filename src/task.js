
////////////////////  task  ////////////////////
//_.task.on('load', fn);  //fn runs once, instantly or appended to queue.
//_.task.on('scroll', fn);  //fn runs when event triggers.
//_.task.on('resize', fn);  //fn runs when event triggers.
_ext.task = {};
_ext.task._ini = function () {
	var _ns = this;
	this._list = {
		load: [],
		scroll: [],
		resize: []
	};
	this.on = function (sEvent, fn) {
		if (!sEvent || !_.isString(sEvent) || !_.isFunction(fn)) return false;
		sEvent = _.str.clean(sEvent);
		if (_.str.include(sEvent, ' ')) {
			var aEvent = sEvent.split(' ');
			var _ns = this;
			_.each(aEvent, function (n) {
				_ns._ini(n, fn);
			});
		} else {
			this._ini(sEvent, fn);
		}
	};
	this._ini = function (sEvent, fn) {
		switch (sEvent) {
			case 'load':
				this._handleOnloadList(fn);
				break;
			case 'scroll':
				this._list[sEvent].push(fn);
				break;
			case 'resize':
				this._list[sEvent].push(fn);
				break;
			default:
				return false;
		}
	};
	this._handleOnloadList = function (fn) {
		if (_ns.pageLoaded) {
			fn();
		} else {
			this._list.load.push(fn);  //fnOnload() will handle this queue.
		}
	};
	function fnExeList(sEvent) {
		var list = _ns._list[sEvent];
		//_.log(sEvent + ' list:');
		//_.log(list);
		_.each(list, function (n) {
			n();
		});
	}
	function fnOnload() {  //this fn just runs once.
		_ns.pageLoaded = true;
		_.dom.jWin.off('load', fnOnload);
		fnExeList('load');
		_ns._list.load = null;  //gc
	}
	function fnHandleOnscrollList() {
		fnExeList('scroll');
	}
	function fnHandleOnresizeList() {
		fnExeList('resize');
	}
	//bind
	if (document.readyState === 'complete') {
		fnOnload();
	} else {
		_.dom.jWin.on('load', fnOnload);
	}
	_.dom.jWin.on('scroll', fnHandleOnscrollList);
	_.dom.jWin.on('viewportresize', fnHandleOnresizeList);
	//old api
	this.push = this.on;
};
