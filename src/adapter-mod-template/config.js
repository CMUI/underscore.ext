
var _config = {
	//compatible with ejs
	interpolate : /<%-([\s\S]+?)%>/g,
	escape      : /<%=([\s\S]+?)%>/g,

	//to avoid use `with` in compiled templates
	//see: https://github.com/cssmagic/blog/issues/4
	variable: 'data'
}
_.extend(_.templateSettings, _config)
