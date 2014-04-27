
////////////////////  template  ////////////////////
_ext.template = {
	_ini: function () {
		_.extend(_.templateSettings, {variable: 'data'});
		this.prefix = 'template-';
		this.lib = {};  //old
		this.libSrc = {};
		this.libFn = {};
	},
	_toTemplateId: function (id) {
		return _.str.strRight(id, this.prefix);
	},
	_toElementId: function (id) {
		var prefix = this.prefix;
		return _.str.startsWith(id, prefix) ? id : prefix + id;
	},
	remove: function (/** id **/) {
		//todo: remove template from cache (both str and fn)
		//todo: remove dummy script element
	},
	add: function (id, sTemplate) {
		if (!id || !_.isString(id)) return false;
		id = _.str.stripHash(id);
		var result;
		if (sTemplate && _.isString(sTemplate)) {
			var idTemplate = this._toTemplateId(id);
			var lib = this.lib;
			if (lib[idTemplate]) {_.log('[Warning] Template lib already has id: ' + idTemplate); }
			result = lib[idTemplate] = _.template(sTemplate);  //todo: optmize with libSrc & libFn
		} else {
			result = this._addFromDom(id);
		}
		return !!result;
	},
	_addFromDom: function (id) {  //get template from id (of dummy script element in html), then add to lib
		if (!id || !_.isString(id)) return false;
		var result;
		var idElement = this._toElementId(id);
		var e = document.getElementById(idElement);
		if (!e) {
			_.log('[Error] Element #' + idElement + ' not found!');
		} else {
			var s = e.innerHTML;
			if (s) {
				result = this.add(id, s);
			} else {
				_.log('[Error] Element #' + idElement + ' is empty!');
			}
		}
		return result || false;
	},
	render: function (id, data) {
		var result;
		if (id && _.isString(id) && data !== undefined) {
			var idTemplate = this._toTemplateId(id);
			var fn = this.lib[idTemplate];
			if (_.isFunction(fn)) {
				result = fn(data);
			}
		}
		return result || '';
	}
};

