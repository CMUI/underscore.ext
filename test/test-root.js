describe('Root', function () {
	describe('_.isPlainObject()', function () {
		it('be alias of $\'s same api', function () {
			expect($.isPlainObject === _.isPlainObject).to.be.true
		})
		it('do basic functionality', function () {
			var arg
			arg = {}
			expect(_.isPlainObject(arg)).to.be.true
			arg = {foo: 1, bar: 2}
			expect(_.isPlainObject(arg)).to.be.true
			arg = new Object()
			expect(_.isPlainObject(arg)).to.be.true
			arg = /foobar/i
			expect(_.isPlainObject(arg)).to.be.false
			arg = new Date()
			expect(_.isPlainObject(arg)).to.be.false
			arg = new String('foobar')
			expect(_.isPlainObject(arg)).to.be.false
			arg = window
			expect(_.isPlainObject(arg)).to.be.false
			arg = document.documentElement
			expect(_.isPlainObject(arg)).to.be.false
		})
		it('return `false` if input other types', function () {
			var arg
			arg = undefined
			expect(_.isPlainObject(arg)).to.be.false
			arg = null
			expect(_.isPlainObject(arg)).to.be.false
			arg = 0
			expect(_.isPlainObject(arg)).to.be.false
			arg = 'foobar'
			expect(_.isPlainObject(arg)).to.be.false
			arg = true
			expect(_.isPlainObject(arg)).to.be.false
			arg = []
			expect(_.isPlainObject(arg)).to.be.false
			arg = it
			expect(_.isPlainObject(arg)).to.be.false
			arg = String
			expect(_.isPlainObject(arg)).to.be.false
			arg = Date
			expect(_.isPlainObject(arg)).to.be.false
		})
	})

	describe('_.$()', function () {
		it('do basic functionality same as $()', function () {
			var obj = _.$(document.getElementById('mocha'))
			expect(obj).to.have.property('length')
		})
		it('return directly if already $element', function () {
			var obj = $('#mocha')
			expect(_.$(obj)).to.equal(obj)
		})
		it('do basic functionality via caching property', function () {
			var obj = document.getElementById('mocha')
			var $obj = _.$(obj)
			expect(obj.__$__).to.equal($obj)
		})
	})

})
