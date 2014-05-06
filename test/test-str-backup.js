//heavily inspired by [underscore.string](https://github.com/epeli/underscore.string)
describe('String - Backup for Underscore.string', function () {
	//ref: https://github.com/epeli/underscore.string/blob/master/test/strings.js
	describe('_.str.trim()', function () {
		it('do basic functionality', function () {
			expect(_.str.trim(123)).to.be.equal('123')
			expect(_.str.trim(' foo')).to.be.equal('foo')
			expect(_.str.trim('foo ')).to.be.equal('foo')
			expect(_.str.trim(' foo ')).to.be.equal('foo')
			expect(_.str.trim('    foo    ')).to.be.equal('foo')
			expect(_.str.trim('    foo    ', ' ')).to.be.equal('foo')
			expect(_.str.trim('\t   foo \t  ', /\s/)).to.be.equal('foo')

			expect(_.str.trim('ffoo', 'f')).to.be.equal('oo')
			expect(_.str.trim('ooff', 'f')).to.be.equal('oo')
			expect(_.str.trim('ffooff', 'f')).to.be.equal('oo')

			expect(_.str.trim('_-foobar-_', '_-')).to.be.equal('foobar')

			expect(_.str.trim('http://foo/', '/')).to.be.equal('http://foo')
			expect(_.str.trim('c:\\', '\\')).to.be.equal('c:')

			expect(_.str.trim(123)).to.be.equal('123')
			expect(_.str.trim(123, 3)).to.be.equal('12')
			expect(_.str.trim('')).to.be.equal('')
			expect(_.str.trim(null)).to.be.equal('')
			expect(_.str.trim(undefined)).to.be.equal('')
		})
		it('don\'t remove inner spaces', function () {
			expect(_.str.trim('   foo   bar   ')).to.be.equal('foo   bar')
		})
	})
	describe('_.str.ltrim()', function () {
		it('do basic functionality', function () {
			expect(_.str.ltrim(' foo')).to.be.equal('foo')
			expect(_.str.ltrim(' foo')).to.be.equal('foo')
			expect(_.str.ltrim('foo ')).to.be.equal('foo ')
			expect(_.str.ltrim(' foo ')).to.be.equal('foo ')
			expect(_.str.ltrim('')).to.be.equal('')
			expect(_.str.ltrim(null)).to.be.equal('')
			expect(_.str.ltrim(undefined)).to.be.equal('')
			expect(_.str.ltrim('ffoo', 'f'), 'oo')
			expect(_.str.ltrim('ooff', 'f'), 'ooff')
			expect(_.str.ltrim('ffooff', 'f'), 'ooff')
			expect(_.str.ltrim('_-foobar-_', '_-'), 'foobar-_')
			expect(_.str.ltrim(123, 1), '23')
		})
		it('don\'t remove inner spaces', function () {
			expect(_.str.ltrim('   foo   bar   ')).to.be.equal('foo   bar   ')
		})
	})
	describe('_.str.rtrim()', function () {
		it('do basic functionality', function () {
			expect(_.str.rtrim('http://foo/', '/'), 'http://foo')
			expect(_.str.rtrim(' foo')).to.be.equal(' foo')
			expect(_.str.rtrim('foo ')).to.be.equal('foo')
			expect(_.str.rtrim('foo ')).to.be.equal('foo')
			expect(_.str.rtrim('foo bar ')).to.be.equal('foo bar')
			expect(_.str.rtrim(' foo ')).to.be.equal(' foo')
			expect(_.str.rtrim('ffoo', 'f'), 'ffoo')
			expect(_.str.rtrim('ooff', 'f'), 'oo')
			expect(_.str.rtrim('ffooff', 'f'), 'ffoo')
			expect(_.str.rtrim('_-foobar-_', '_-'), '_-foobar')
			expect(_.str.rtrim(123, 3), '12')
			expect(_.str.rtrim('')).to.be.equal('')
			expect(_.str.rtrim(null)).to.be.equal('')
		})
		it('don\'t remove inner spaces', function () {
			expect(_.str.rtrim('   foo   bar   ')).to.be.equal('   foo   bar')
		})
	})
})


