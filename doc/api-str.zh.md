# API 文档 - `str` 模块

## JavaScript 变量<a name="js-var"></a>

以下预定义的变量在业务层可以直接使用。

### `_.str.RE_EMAIL`<a name="js-var-re-email"></a>

校验电子邮箱的正则表达式。

#### 示例

```js
_.str.RE_EMAIL.test('foo@bar.com')  // => true
_.str.RE_EMAIL.test('foo@bar')  // => false
_.str.RE_EMAIL.test('foo.bar.cn')  // => false
```

### `_.str.RE_MOBILE`<a name="js-var-re-mobile"></a>

校验手机号的正则表达式。

手机号必须是中国大陆的手机号，13 位数字，不可包含空格、横杠等特殊字符。

#### 示例

```js
_.str.RE_MOBILE.test('13355668899')  // => true
_.str.RE_MOBILE.test('021-55668899')  // => false
_.str.RE_MOBILE.test('10086')  // => false
```

### `_.str.RE_POSTCODE`<a name="js-var-re-postcode"></a>

校验邮政编码的正则表达式。

邮政编码必须是中国大陆的邮政编码，6 位数字，不可包含空格、横杠等特殊字符。

#### 示例

```js
_.str.RE_POSTCODE.test('200030')  // => true
_.str.RE_POSTCODE.test('4008517517')  // => false
_.str.RE_POSTCODE.test('1234')  // => false
```

## JavaScript 接口<a name="js-api"></a>

### `_.str.isHash(string)`<a name="js-api-isHash"></a>

判断是否为 hash 字符串。

Hash 字符串以 `#` 开头，比如 `#foo` 就是一个 hash 字符串。这种字符串通常出现于链接锚点（`<a href="#anchor">bar</a>`）、ID 选择符（`$('#id')`）、Twitter 标签或 `location.hash` 的值等等。

字符串开头的空白符将被忽略，不影响判断结果。

#### 参数

* `string` -- 字符串。需要判断的字符串。

#### 返回值

布尔值。判断结果。

#### 示例

```js
_.str.isHash('#foo')  // => true
_.str.isHash('bar')  // => false
_.str.isHash('  #foo-bar')  // => true
```

***

### `_.str.stripHash(string)`<a name="js-api-stripHash"></a>

去除 hash 字符串开头的 `#` 字符。

字符串头尾的空白符也将被去除。

#### 参数

* `string` -- 字符串（非字符串会被强制转换为字符串）。需要处理的字符串。

#### 返回值

字符串。处理结果。

#### 示例

```js
_.str.stripHash('#foo')  // => 'foo'
_.str.stripHash('bar')  // => 'bar'
_.str.stripHash('  #foo-bar')  // => 'foo-bar'
```

## Underscore.string 同名接口<a name="js-api-underscore-string"></a>

`str` 模块提供的部分接口与 Underscore.string 类库的同名接口完全一致。这些接口的源码均引用了 Underscore.string 的实现，并存放在 `src/str-backup.js` 文件中。

如果你的项目已经加载了 Underscore.string 类库，则可以自行构建一个不包含这部分源码的 Underscore.ext 包；此时使用完整的 Underscore.ext 包也没有关系，因为它会自动跳过这些同名接口的加载。

### 字符串裁剪

* `_.str.trim(string, [characters])`<a name="js-api-trim"></a>

	请参考 Underscore.string 的文档： [`trim`](https://epeli.github.io/underscore.string/#trim-string-characters-gt-string)

* `_.str.ltrim(string, [characters])`<a name="js-api-trim"></a>

	请参考 Underscore.string 的文档： [`ltrim`](https://epeli.github.io/underscore.string/#ltrim-string-characters-gt-string)

* `_.str.rtrim(string, [characters])`<a name="js-api-trim"></a>

	请参考 Underscore.string 的文档： [`rtrim`](https://epeli.github.io/underscore.string/#rtrim-string-characters-gt-string)

### 字符串包含关系

* `_.str.include(string, substring)`<a name="js-api-include"></a>

	请参考 Underscore.string 的文档： [`include`](https://epeli.github.io/underscore.string/#include-string-substring-gt-boolean)

	别名： `_.str.contains()`

* `_.str.startsWith(string, starts, [position])`<a name="js-api-include"></a>

	请参考 Underscore.string 的文档： [`startsWith`](https://epeli.github.io/underscore.string/#startswith-string-starts-position-gt-boolean)

* `_.str.endsWith(string, ends, [position])`<a name="js-api-include"></a>

	请参考 Underscore.string 的文档： [`endsWith`](https://epeli.github.io/underscore.string/#endswith-string-ends-position-gt-boolean)
