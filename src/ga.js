
////////////////////  ga  ////////////////////
_ext.ga = {};
_ext.ga._ini = function () {
	root._gaq = root._gaq || [];
	this.ini = function (b) {
		root._gaq.push(['_setAccount', _.url.gaAccount]);
		root._gaq.push(['_trackPageview']);
		if (b) this.load();
	};
	this.load = function () {
		var url = '//www.google-analytics.com/ga.js';
		if (root.$LAB) {
			$LAB.script(url);
		} else {
			var eScript = document.createElement('script');
			eScript.src = url;
			var eOldScript = document.getElementsByTagName('script')[0];
			eOldScript.parentNode.insertBefore(eScript, eOldScript);
		}
	}
	this.vpv = function (s) {
		if (_.isString(s)) {
			root._gaq.push(['_trackPageview', s]);
			if (!_.str.include(s, 'vpv')) {_.log('[Warning] URL without \'vpv\'!'); }
		} else {
			_.log('[Error] Empty URL!');
			return false;
		}
	};
	this.event = function (sCatagory, sAction, sLabel) {
		if (sCatagory && sAction && _.isString(sCatagory) && _.isString(sAction)) {
			root._gaq.push(['_trackEvent', sCatagory, sAction, (sLabel || '')]);
		} else {
			_.log('[Error] Empty arguments!');
			return false;
		}
	};
};
