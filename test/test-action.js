describe('Action', function () {
	var test = ''
	var actions = {}
	var _actionList = _.action._actionList
	beforeEach(function () {
		test = ''
	})
	afterEach(function () {
		test = ''
		delete _actionList.foo
		delete _actionList.bar
	})

	describe('DOM binding', function () {
		var $wrapper, $link
		before(function () {
			$wrapper = $('<div id="test"><a href="#" data-action>test action</a></div>').appendTo('body')
			$link = $wrapper.find('a')
		})
		after(function () {
			$wrapper.remove()
		})
		it('trigger action via `a`\'s href', function (done) {
			$link.attr('href', '#foo')
			actions.foo = function () {
				expect(this).to.equal($link[0])
				done()
			}
			$link.click()
		})
		//
	})
	describe('API', function () {
		describe('_.action.extend()', function () {
			it('do basic functionality', function () {
				expect(_actionList).to.be.deep.equal({})
				actions = {
					foo: function () {},
					bar: function () {}
				}
				_.action.extend(actions)
				expect(_actionList).to.be.deep.equal(actions)
			})
			it('do nothing if input other types', function () {
				expect(_actionList).to.be.deep.equal({})
				_.action.extend('foo')
				expect(_actionList).to.be.deep.equal({})
				_.action.extend(1)
				expect(_actionList).to.be.deep.equal({})
				_.action.extend(new Date())
				expect(_actionList).to.be.deep.equal({})
			})
		})

		describe('_.action.trigger()', function () {
			it('do basic functionality', function () {
				actions = {
					foo: function () {
						test = 'test-foo'
					},
					bar: function () {
						test = 'test-bar'
					}
				}
				_.action.extend(actions)
				_.action.trigger('foo')
				expect(test).to.equal('test-foo')
				_.action.trigger('bar')
				expect(test).to.equal('test-bar')
			})
		})
	})

})
