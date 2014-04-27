
////////////////////  ajax  ////////////////////
_ext.ajax = {};
_ext.ajax._ini = function () {
	this.wait = function (fnCondition, fnCallback) {  //when condition true, trigger fn()
		//var bSuccess = false;
		if (_.isFunction(fnCondition) && _.isFunction(fnCallback)) {
			this.wait._waitList.push([fnCondition, fnCallback]);
			if (this.wait._waitList.length === 1) {  //if list is empty (loop is idle) just now, act loop
				this.wait._waitLoop();
			}
		}
		//return bSuccess;
	};
	this.wait._waitDelay = 1000;  //unit: ms
	this.wait._waitList = [];
	this.wait._waitLoop = function () {
		_.log('[Hint] ajax wait loop - start');
		_.log(this._waitList);
		_.each(this._waitList, function (n, i, arr) {
			var fnCondition = n[0];
			var fnCallback = n[1];
			var bSuccess = fnCondition();
			if (bSuccess) {
				fnCallback();
				arr[i] = null;
			}
		});
		this._waitList = _.compact(this._waitList);
		if (this._waitList.length) {
			setTimeout(function () {
				_ext.ajax.wait._waitLoop();
			}, this._waitDelay);
		}
		_.log(this._waitList);
		_.log('[Hint] ajax wait loop - end');
	};
};
