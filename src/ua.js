
////////////////////  ua  ////////////////////
_ext.ua = {};
_ext.ua._ini = function () {
	var $ = root.$;
	var str = navigator.userAgent;
	_.extend(this, {
		str: str,
		isWebKit: document.documentElement.style.webkitTransform !== undefined,
		isMoz: document.documentElement.style.MozTransform !== undefined,
		isIE: /*@cc_on ! @*/ false,
		isSafari: _.str.include(navigator.vendor.toLowerCase(), 'apple'),
		isChrome: _.str.include(str.toLowerCase(), 'chrome'),
		isTouchDevice: document.createTouch !== undefined
	});
	_.extend(this, {
		isIOS: $.os.ios,  //by ua str
		isAndroid: $.os.android,  //by ua str
		version: $.os.version,  //by ua str
		isIPhone: $.os.iphone,  //by ua str, including ipod
		isIPad: $.os.ipad  //by ua str
	});
	//check web view or shell-browser on ios
	if (this.isIOS) {
		var browser;
		if (!/safari/i.test(str) || !_.str.include(navigator.vendor.toLowerCase(), 'apple')) browser = '(Unknown)';
		if (/MicroMessenger/i.test(str)) {
			browser = 'WeChat';
		} else if (/weibo/i.test(str)) {
			browser = 'Weibo';
		} else if (/MQQBrowser/i.test(str)) {
			browser = 'QQ-Browser';
		} else if (/CriOS/i.test(str)) {
			browser = 'Chrome';
		} else if (/UCBrowser/i.test(str) || /UCWEB/i.test(str)) {
			browser = 'UC';
		} else if (/FlyFlow/i.test(str)) {
			browser = 'Baidu';
		} else if (/Mercury/i.test(str)) {
			browser = 'Mercury';
		} else if (/SogouMobileBrowser/i.test(str)) {
			browser = 'Sogou';
		} else if (/Opera/i.test(str)) {
			browser = 'Opera';
		} else if (/baiduboxapp/i.test(str)) {
			browser = 'BaiduBox';
		} else if (/hao123/i.test(str)) {
			browser = 'Hao123';
		}
		if (browser) this.webView = browser;
	}
	//fix zepto: detect ipod from _.ua.isIPhone
	if (this.isIPhone && this.str.match(/\(ipod;/i)) {
		this.isIPhone = false;
		this.isIPod = true;
	}
	//screen
	var scr = {};
	var PIXEL_RATIO = root.devicePixelRatio || 1;
	var fnGetOrientation = function () {
		var s = '';
		if (_.isNumber(root.orientation)) {
			s = root.orientation % 180 ? 'landscape' : 'portrait';
		} else {
			s = screen.width > screen.height ? 'landscape' : 'portrait';
		}
		return s;
	};
	scr = {
		pixelRatio: PIXEL_RATIO,
		getOrientation: fnGetOrientation
	};
	//on android 2: [window.outer~] equals actual pixel excluding status bar; [screen] means viewport, and changes when scrolling
	//on android 4: [window.outer~] is the same as above; [screen] means actual pixel, not logical pixel
	//on ios: [screen] means logical pixel
	var ver = _.str.toFloat(this.version);
	if (this.isAndroid) {
		if (ver < 4) {
			scr.getWidth = function () {return _.str.toNumber((root.outerWidth || 1) / PIXEL_RATIO, 1);};
			scr.getHeight = function () {return _.str.toNumber((root.outerHeight || 1) / PIXEL_RATIO, 1);};
		} else {
			scr.getWidth = function () {return _.str.toNumber((screen.width || 1) / PIXEL_RATIO, 1);};
			scr.getHeight = function () {return _.str.toNumber((screen.height || 1) / PIXEL_RATIO, 1);};
		}
	} else if (this.isIOS) {
		scr.getWidth = function () {return window.innerWidth || 1;};
		scr.getHeight = function () {return window.innerWidth === screen.width ? (screen.height || 1) : (screen.width || 1);};
	} else {
		scr.getWidth = function () {return screen.width || 1;};
		scr.getHeight = function () {return screen.height || 1;};
	}
	var size = [scr.getWidth(), scr.getHeight()];
	var longerSide = _.max(size);
	var shorterSide = _.min(size);
	var ASPECT_RATIO = longerSide / shorterSide;
	scr.aspectRatio = ASPECT_RATIO;
	this.screen = scr;
	//detect type
	this.isMobileDevice = this.isIOS || this.isAndroid;
	this.mobileDeviceType = this.isMobileDevice ? ((longerSide > 640) ? 'pad' : 'phone') : null;
	//detect os
	if (this.isAndroid) {
		this.os = 'Android';
	} else if (this.isIOS) {
		this.os = 'iOS';
		//detect apple device
		var sPrd = 'Unknown iOS Device';
		if (this.isIPad) {
			sPrd = 'iPad';
		} else if (this.isIPhone) {
			sPrd = 'iPhone';
		} else if (this.isIPod) {
			sPrd = 'iPod';
		}
		var sModel = PIXEL_RATIO > 1 ? '(HD)' : '';
		if (!this.isIPad && PIXEL_RATIO > 1 && ASPECT_RATIO > 1.7) sModel = '(HD+)';  //16:9
		this.appleDevice = sModel ? sPrd + ' ' + sModel : sPrd;
	}
	//support
	var stylePositionFixed = !this.isTouchDevice || (this.isIOS && ver >= 5) || (this.isAndroid && ver >= 4);
	_.extend(this, {
		support: {
			classList: !!document.documentElement.classList,
			dataset: !!document.documentElement.dataset,
			stylePositionFixed: stylePositionFixed
		}
	});
};
