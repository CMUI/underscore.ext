
////////////////////  sns  ////////////////////
_ext.sns = {};
_ext.sns._ini = function () {
	this._link = {
		weibo: "http://service.weibo.com/share/share.php?url=%s&title=%s&pic=%s&appkey=2264487147",
		kaixin: "http://www.kaixin001.com/~repaste/repaste.php?rurl=%s&rtitle=%s",
		renren: "http://share.renren.com/share/buttonshare.do?link=%s&title=%s"
	};
	this.getShareLink = function (site, url, text, urlPic) {
		var link = '';
		if (_.isString(site) && _.str.isFullUrl(url)) {
			var template = this._link[site];
			if (template) {
				var data = {url: encodeURIComponent(url), text: encodeURIComponent(text || '')};
				urlPic = _.str.isAbsolutePath(urlPic) ? _.url.toFullUrl(urlPic) : '';
				data.pic = encodeURIComponent(urlPic);
				link = _.str.sprintf(template, data.url, data.text, data.pic);
			} else {
				_.log('[Error] missing template!');
			}
		} else {
			_.log('[Error] wrong or missing param!');
		}
		return link || false;
	};
};
