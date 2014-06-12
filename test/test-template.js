describe('Template', function () {
	//const
	var TEMPLATE_ID_1 = 'paragraph'
	var TEMPLATE_ID_2 = 'person'
	var HELLO = 'Hello world!'
	var PREFIX = 'template-'
	var SCRIPT_TYPE = 'text/template'

	//template code
	var templateCode1 = '<p><%= data.text %><p>'
	var templateCode2 = [
		'<ul>',
			'<% _.each(data, function(person) { %>',
			'<li><%= person.name + \': \' + person.age %></li>',
			'<% }) %>',
		'</ul>'
	].join('\n')

	//template data
	var templateData1 = {text: HELLO}
	var templateData2 = [
		{name: 'Peter', age: '31'},
		{name: 'Judy', age: '24'}
	]

	//test data
	var data, html1, html2

	//result
	var result1 = '<p>' + HELLO + '<p>'
	var result2 = [
		'<ul>',
			'<li>Peter: 31</li>',
			'<li>Judy: 24</li>',
		'</ul>'
	].join('\n')
	
	//reference to internal caches
	//notice: if re-assign these vars, reference will loose
	var _cacheTemplate = _.template.__cacheTemplate
	var _cacheCompiledTemplate = _.template.__cacheCompiledTemplate

	//dummy script elements
	var $elem1
	var $elem2
	function prepareDummyScript() {
		$elem1 = $('<script/>', {
			type: SCRIPT_TYPE,
			id: PREFIX + TEMPLATE_ID_1
		}).text(templateCode1).appendTo(_.dom.$body)
		$elem2 = $('<script/>', {
			type: SCRIPT_TYPE,
			id: PREFIX + TEMPLATE_ID_2
		}).text(templateCode2).appendTo(_.dom.$body)
	}
	function destroyDummyScript() {
		$elem1.remove()
		$elem2.remove()
	}

	//util
	function clearCodeCache() {
		delete _cacheTemplate[TEMPLATE_ID_1]
		delete _cacheTemplate[TEMPLATE_ID_2]
	}
	function clearCompileCache() {
		delete _cacheCompiledTemplate[TEMPLATE_ID_1]
		delete _cacheCompiledTemplate[TEMPLATE_ID_2]
	}

	afterEach(function () {
		clearCodeCache()
		clearCompileCache()
	})

	describe('Util', function () {
		describe('_.template.__isTemplateCode()', function () {
			it('do basic functionality', function () {
				expect(_.template.__isTemplateCode(templateCode1)).to.be.true
				expect(_.template.__isTemplateCode(templateCode2)).to.be.true

				var code
				code = '<%= data %>'
				expect(_.template.__isTemplateCode(code)).to.be.true

				code = undefined
				expect(_.template.__isTemplateCode(code)).to.be.false
				code = ''
				expect(_.template.__isTemplateCode(code)).to.be.false
				code = null
				expect(_.template.__isTemplateCode(code)).to.be.false
				code = 'foobar'
				expect(_.template.__isTemplateCode(code)).to.be.false
				code = '<p>foobar</p>'
				expect(_.template.__isTemplateCode(code)).to.be.false
			})
		})
		describe('_.template.__stripCommentTag()', function () {
			it('strip outta html comment tag', function () {
				var code
				code = '<!-- foobar -->'
				expect(_.template.__stripCommentTag(code)).to.equal('foobar')
				code = '<!-- <p>foobar</p> -->'
				expect(_.template.__stripCommentTag(code)).to.equal('<p>foobar</p>')
			})
			it('return if not wrapped by comment tag', function () {
				var code
				code = undefined
				expect(_.template.__stripCommentTag(code)).to.equal(String(code))
				code = null
				expect(_.template.__stripCommentTag(code)).to.equal(String(code))
				code = ''
				expect(_.template.__stripCommentTag(code)).to.equal(code)
				code = '<%= data %>'
				expect(_.template.__stripCommentTag(code)).to.equal(code)
				code = 'foobar'
				expect(_.template.__stripCommentTag(code)).to.equal(code)
				code = '<p>foobar</p>'
				expect(_.template.__stripCommentTag(code)).to.equal(code)
			})
		})
	})

	describe('APIs', function () {
		describe('_.template.add()', function () {
			it('add template code to template cache', function () {
				expect(_cacheTemplate).to.be.deep.equal({})
				expect(_cacheCompiledTemplate).to.be.deep.equal({})
				data = {}

				_.template.add(TEMPLATE_ID_1, templateCode1)
				_.template.add(TEMPLATE_ID_2, templateCode2)

				data[TEMPLATE_ID_1] = templateCode1
				data[TEMPLATE_ID_2] = templateCode2
				expect(_cacheTemplate).to.be.deep.equal(data)
				expect(_cacheCompiledTemplate).to.be.deep.equal({})
			})
			it('overwrite if add existed template id', function () {
				expect(_cacheTemplate).to.be.deep.equal({})
				data = {}

				_.template.add(TEMPLATE_ID_1, templateCode1)
				data[TEMPLATE_ID_1] = templateCode1
				expect(_cacheTemplate).to.be.deep.equal(data)

				_.template.add(TEMPLATE_ID_2, templateCode2)
				data[TEMPLATE_ID_2] = templateCode2
				expect(_cacheTemplate).to.be.deep.equal(data)
			})
			it('do nothing if missing template code as second param', function () {
				expect(_cacheTemplate).to.be.deep.equal({})
				_.template.add('foo')
				expect(_cacheTemplate).to.be.deep.equal({})
				_.template.add(1)
				expect(_cacheTemplate).to.be.deep.equal({})
				_.template.add(new Date())
				expect(_cacheTemplate).to.be.deep.equal({})
			})
		})

		describe('_.template.render()', function () {
			it('get template from dom, render, and save to cache', function () {
				expect(_cacheTemplate).to.be.deep.equal({})
				expect(_cacheCompiledTemplate).to.be.deep.equal({})
				prepareDummyScript()

				//render template
				html1 = _.template.render(TEMPLATE_ID_1, templateData1)
				expect(html1).to.be.equal(result1)
				html2 = _.template.render(TEMPLATE_ID_2, templateData2)
				//todo: need `_.str.clean()`
				html2 = html2.replace(/\s+/g, ' ')
				result2 = result2.replace(/\s+/g, ' ')
				expect(html2).to.be.equal(result2)

				//check if template code saved to cache
				data = {}
				data[TEMPLATE_ID_1] = templateCode1
				data[TEMPLATE_ID_2] = templateCode2
				expect(_cacheTemplate[TEMPLATE_ID_1]).to.be.a('string')
				expect(_cacheTemplate[TEMPLATE_ID_2]).to.be.a('string')
				expect(_cacheTemplate).deep.equal(data)

				//check if compiled template fn saved to cache
				expect(_cacheCompiledTemplate[TEMPLATE_ID_1]).to.be.a('function')
				expect(_cacheCompiledTemplate[TEMPLATE_ID_2]).to.be.a('function')

				destroyDummyScript()
			})
			it('get template from code cache, render, and save to cache', function () {
				expect(_cacheTemplate).to.be.deep.equal({})
				expect(_cacheCompiledTemplate).to.be.deep.equal({})

				//add to code cache
				//notice: there's no template in dom
				_.template.add(TEMPLATE_ID_1, templateCode1)
				_.template.add(TEMPLATE_ID_2, templateCode2)

				//render template
				html1 = _.template.render(TEMPLATE_ID_1, templateData1)
				expect(html1).to.be.equal(result1)
				html2 = _.template.render(TEMPLATE_ID_2, templateData2)
				html2 = html2.replace(/\s+/g, ' ')
				result2 = result2.replace(/\s+/g, ' ')
				expect(html2).to.be.equal(result2)

				//check if compiled template fn saved to cache
				expect(_cacheCompiledTemplate[TEMPLATE_ID_1]).to.be.a('function')
				expect(_cacheCompiledTemplate[TEMPLATE_ID_2]).to.be.a('function')
			})
			it('get template from compiled cache, render', function () {
				expect(_cacheTemplate).to.be.deep.equal({})
				expect(_cacheCompiledTemplate).to.be.deep.equal({})

				//add to code cache
				//notice: there's no template in dom
				_.template.add(TEMPLATE_ID_1, templateCode1)
				_.template.add(TEMPLATE_ID_2, templateCode2)

				//render template
				html1 = _.template.render(TEMPLATE_ID_1, templateData1)
				expect(html1).to.be.equal(result1)
				html2 = _.template.render(TEMPLATE_ID_2, templateData2)
				html2 = html2.replace(/\s+/g, ' ')
				result2 = result2.replace(/\s+/g, ' ')
				expect(html2).to.be.equal(result2)

				//clear code cache
				//notice: there's no template in dom
				//notice: now code cache is empty
				clearCodeCache()

				//render template
				html1 = _.template.render(TEMPLATE_ID_1, templateData1)
				expect(html1).to.be.equal(result1)
				html2 = _.template.render(TEMPLATE_ID_2, templateData2)
				html2 = html2.replace(/\s+/g, ' ')
				result2 = result2.replace(/\s+/g, ' ')
				expect(html2).to.be.equal(result2)
			})
		})

	})
})
