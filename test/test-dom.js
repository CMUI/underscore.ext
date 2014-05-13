describe('DOM', function () {
	describe('Shortcuts', function () {
		describe('_.dom.jWin', function () {
			it('be $collection of `window` object', function () {
				expect(_.dom.is$Element(_.dom.jWin)).to.be.true
				expect(_.dom.jWin[0]).to.equal(window)
			})
		})
		describe('_.dom.jDoc', function () {
			it('be a $collection of `document.documentElement` object', function () {
				expect(_.dom.is$Element(_.dom.jDoc)).to.be.true
				expect(_.dom.jDoc[0]).to.equal(document.documentElement)
				expect(_.dom.jDoc[0].tagName.toUpperCase()).to.equal('HTML')
			})
		})
		describe('_.dom.jBody', function () {
			it('be a $collection of `document.body` object', function () {
				if (_.dom.jBody) {
					expect(_.dom.is$Element(_.dom.jBody)).to.be.true
					expect(_.dom.jBody[0]).to.equal(document.body)
				}
			})
			it('be a $collection of `document.body` object - async', function (done) {
				//to run this test, move all scripts (except mocha's init line) to <head>.
				//however, this test case cannot be really reached completely,
				//cuz `mocha.run()` must be in <body>.
				$(function() {
					expect(_.dom.jBody).ok
					expect(_.dom.jBody[0]).to.equal(document.body)
					done()
				})
			})
		})
	})

	describe('Methods', function () {
		describe('_.dom.is$Element', function () {
			it('can check if it\'s $collection', function () {
				var arg
				arg = $()
				expect(_.dom.is$Element(arg)).to.be.true
				arg = $(window)
				expect(_.dom.is$Element(arg)).to.be.true
			})
			it('return `false` if bad type of param', function () {
				var arg
				arg = undefined
				expect(_.dom.is$Element(arg)).to.be.false
				arg = null
				expect(_.dom.is$Element(arg)).to.be.false
				arg = 0
				expect(_.dom.is$Element(arg)).to.be.false
				arg = true
				expect(_.dom.is$Element(arg)).to.be.false
				arg = {}
				expect(_.dom.is$Element(arg)).to.be.false
				arg = []
				expect(_.dom.is$Element(arg)).to.be.false
				arg = document.documentElement
				expect(_.dom.is$Element(arg)).to.be.false
			})
		})
	})

})

