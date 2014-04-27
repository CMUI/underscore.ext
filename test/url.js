describe('URL', function () {
	describe('Query String', function () {
		describe('parseQuery()', function () {
			it('parse empty str to empty object', function () {
				var query = ''
				expect(_.url.parseQuery(query)).to.be.empty
			})
			it('parse key/value pairs to object', function () {
				var query = 'foo=1&bar=2&alice=%20&bob=xxx'
				var o = _.url.parseQuery(query)
				expect(o).to.have.property('foo')
			})
		})
	})

})