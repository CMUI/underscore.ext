
////////////////////  icon  ////////////////////
//system
_ext.system = {};
_ext.system._ini = function () {
	this.setIcon = function (o) {
		if (_.isObject(o)) {
			var jHead = _.dom.jHead || $(document.head);
			var homeScreenIcon = _.str.trim(o.homeScreenIcon || '');
			var favicon = _.str.trim(o.favicon || '');
			if (homeScreenIcon) {
				var rel = 'apple-touch-icon' + (o.precomposed ? '-precomposed' : '');
				var eLinkHomeScreenIcon = document.createElement('link');
				eLinkHomeScreenIcon.setAttribute('rel', rel);
				eLinkHomeScreenIcon.setAttribute('href', homeScreenIcon);
				jHead.append(eLinkHomeScreenIcon);
			}
			if (favicon) {
				var eLinkFavicon = document.createElement('link');
				var type = '';
				if (_.str.include(favicon, '.ico')) {
					type = 'image/x-icon';
				} else if (_.str.include(favicon, '.png')) {
					type = 'image/png';
				} else if (_.str.include(favicon, '.gif')) {
					type = 'image/gif';
				}
				eLinkFavicon.setAttribute('type', type);
				eLinkFavicon.setAttribute('rel', 'shortcut icon');
				eLinkFavicon.setAttribute('href', favicon);
				jHead.append(eLinkFavicon);
			}
		} else {
			return false;
		}
	};
};
