
////////////////////  template  ////////////////////
//front-end template fetching, caching and rendering

/*
## basic usage (easier for dev)

1-1. write template in a dummy script element with a id (prefixed with `template-`)
<script type="text/template" id="template-my-classmates">
<ul>
	<% _.each(data, function(person) { %>
		<li><%= person.name + ': ' + person.age %></li>
	<% }) %>
</ul>
</script>

1-2. prepare data
var myClassmates = [
	{name: 'Peter', age: '31'},
	{name: 'Judy', age: '26'}
]

1-3. render template to get html code
var html = _.template.render('my-classmates', myClassmates)

## optimized usage (better for performance)

2-1. don't touch html page, but add a template in js
_.template.add('id', [
	'<ul>',
		'<% _.each(data, function(person) { %>',
			'<li><%= person.name + \': \' + person.age %></li>',
		'<% }) %>',
	'</ul>'
].join(''))

2-2. prepare data (same as 1-2)

2-3. render template to get html code (same as 1-3)

*/

void function (window, _ext) {
	'use strict'

	//namespace
	var template = {}

	//config
	var _config = {
		//compatible with ejs
		interpolate : /<%-([\s\S]+?)%>/g,
		escape      : /<%=([\s\S]+?)%>/g,

		//to avoid use `with` in compiled templates
		//see: https://github.com/cssmagic/blog/issues/4
		variable: 'data'
	}
	var PREFIX_TEMPLATE = 'template-'

	//cache
	var _cacheTemplate = {}
	var _cacheCompiledTemplate = {}

	//util
	function _toTemplateId(id) {
		return String(id).replace(PREFIX_TEMPLATE, '')
	}
	function _toElementId(id) {
		return _.str.startsWith(id, PREFIX_TEMPLATE) ? id : PREFIX_TEMPLATE + id
	}
	//get template by id (of dummy script element in html)
	function _getTemplateById(id) {
		if (!id || !_.isString(id)) return false
		var result
		var idElement = _toElementId(id)
		var elem = document.getElementById(idElement)
		if (!elem) {
			console.error('Element "#' + idElement + '" not found!')
		} else {
			var s = _.str.trim(elem.innerHTML)
			//todo: strip comment and trim
			if (s) {
				result = s
			} else {
				console.error('Element "#' + idElement + '" is empty!')
			}
		}
		return result || false
	}
	function _isTemplateCode(s) {
		var code = String(s)
		return _.str.include(code, '<%') && /\bdata\b/.exec(code)
	}

	//fn
	function _updateSettings() {
		_.extend(_.templateSettings, _config)
	}
	function add(id, templateCode) {
		if (!id || !_.isString(id)) return false
		id = _.str.stripHash(id)
		var result
		if (templateCode) {
			var templateId = _toTemplateId(id)
			if (_cacheTemplate[templateId]) {
				console.warn('Template cache already has id: "' + templateId + '"')
			}
			result = _cacheTemplate[templateId] = templateCode
		} else {
			//todo: support `_.template.add(id)` to add from dummy script element
			console.error('Missing template code to add to cache.')
		}
		return !!result
	}

	//api
	template.remove = function (/* id */) {
		//todo: remove template from cache (both str and fn)
		//todo: remove dummy script element
	}
	template.add = add
	template.render = function (id, data) {
		//todo: support _.template.render(templateCode, templateData)
		if (arguments.length < 2) {
			console.error('Missing data to render template: "' + id + '"')
			return false
		}
		var result
		var templateId = _toTemplateId(id)
		//search in _cacheCompiledTemplate
		var fn = _cacheCompiledTemplate[templateId]
		var templateCode = _cacheTemplate[templateId]
		if (_.isFunction(fn)) {
			result = fn(data)
		}
		//search in _cacheTemplate
		else if (_.isString(templateCode)) {
			fn = _.template(templateCode)
			_cacheCompiledTemplate[templateId] = fn
			result = fn(data)
		}
		//get template code from dom
		else {
			templateCode = _getTemplateById(templateId)
			if (templateCode) {
				_cacheTemplate[templateId] = templateCode
				fn = _.template(templateCode)
				_cacheCompiledTemplate[templateId] = fn
				result = fn(data)
			}
		}
		return result || ''
	}

	//init
	_updateSettings()

	//exports for unit test
	template._cacheTemplate = _cacheTemplate
	template._cacheCompiledTemplate = _cacheCompiledTemplate

	//exports
	_ext.exports('template', template)
}(window, _ext)
