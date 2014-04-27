
////////////////////  event  ////////////////////
_ext.event = {};
_ext.event._ini = function () {
	_.extend(this, {
		tapEventName: /** _.ua.isTouchDevice ? 'tap' : **/ 'click',  //'tap' event is still buggy in zepto 1.0rc
		dragEventName: _.ua.isTouchDevice ? 'touchmove' : 'mousemove',
		disableClick: function (sel) {
			if (sel) {
				var bindType = _.isString(sel) ? 'live' : 'on';
				$(sel)[bindType]('click', function (e) {
					e.preventDefault();
				});
			} else {
				return false;
			}
		},
		disableClickOnTouchDevice: function (sel) {  //out of date
			if (this.tapEventName !== 'click' && sel && _.ua.isTouchDevice) {
				this.disableClick(sel);
			} else {
				return false;
			}
		},
		onTap: function (sel, fn) {
			if (sel && _.isFunction(fn)) {
				var bindType = _.isString(sel) ? 'live' : 'on';
				$(sel)[bindType](this.tapEventName, fn);
				//this.disableClickOnTouchDevice(sel);  //out of date
			} else {
				return false;
			}
		},
		onShake: function (/** fn, duration **/) {
			//to be done.
		},
		iniViewportResizeEvent: function () {
			root.viewportHeight = root.innerHeight;
			var sEventNameSrc = _.ua.isIOS ? 'scroll resize orientationchange' : 'resize';
			var sEventNameOutput = 'viewportresize';
			function fnHandler() {
				var win = root;
				if (Math.abs(win.viewportHeight - win.innerHeight) > 1) {
					win.viewportHeight = win.innerHeight;
					_.defer(function (s) {
						_.dom.jWin.trigger(s);
					}, sEventNameOutput);
				}
			}
			_.dom.jWin.on(sEventNameSrc, fnHandler);
		}
	});
	this.iniViewportResizeEvent();
};
