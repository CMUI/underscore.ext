
var _config = {
	//compatible with ejs
	interpolate : /<%-([\s\S]+?)%>/g,
	escape      : /<%=([\s\S]+?)%>/g
}
_.extend(_.templateSettings, _config)
