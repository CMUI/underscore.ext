> 以下是未开公、未确定的接口。可能有部分特性还未实现。

## JavaScript 变量<a name="js-var"></a>

### `_.str.CNY`<a name="js-var-CNY"></a>

人民币符号 `¥`。

### `_.str.RMB`<a name="js-var-RMB"></a>

`_.str.CNY` 的别名。

### `_.str.FULL_WIDTH_CNY`<a name="js-var-FULL_WIDTH_CNY"></a>

全角的人民币符号 `￥`。

#### 示例

```js
// 将所有全角的人民币符号替换为半角
var text = '￥1000～￥2000'
text.split(_.str.FULL_WIDTH_CNY).join(_.str.CNY)  // => '¥1000～¥2000'
```

### `_.str.FULL_WIDTH_RMB`<a name="js-var-FULL_WIDTH_RMB"></a>

`_.str.FULL_WIDTH_CNY` 的别名。

## JavaScript 接口<a name="js-api"></a>

### `_.str.isFullUrl(string)`<a name="js-api-isFullUrl"></a>

判断是否为完整的 URL。以 `http://`、`https://` 或 `//` 开头的字符串即视为完整。

#### 参数

* `string` -- 字符串。需要判断的字符串。

#### 返回值

布尔值。判断结果。

#### 示例

```js
_.str.isHash('http://foo.com/bar')  // => true
_.str.isHash('foo.com')  // => false
_.str.isHash('/bar/index.html')  // => false
```

***

### `_.str.isAbsolutePath(string)`<a name="js-api-isAbsolutePath"></a>

判断是否为绝对路径。以 `http://`、`https://`、`//` 或 `/` 开头的字符串即视为绝对路径。

#### 参数

* `string` -- 字符串。需要判断的字符串。

#### 返回值

布尔值。判断结果。

#### 示例

```js
_.str.isHash('http://foo.com/bar')  // => true
_.str.isHash('foo.com')  // => false
_.str.isHash('/bar/index.html')  // => true
```

***

### `_.str.uniq(array)`<a name="js-api-uniq"></a>

从字符串数组中去除重复的项。

#### 注意事项

* 非字符串的值会被转换为字符串后进行比对，即 `null` 和 `'null'` 会被视为重复。
* 去重后的各个字符串在数组中的排序无法保证。

#### 参数

* `array` -- 字符串数组。

#### 返回值

数组。去重结果。

#### 示例

```js
_.str.uniq(['foo', 'foo', 'bar'])  // => ['foo', 'bar']
```

***

### `_.str.toFloat(string)`<a name="js-api-toFloat"></a>

转换为浮点数。

可以视为 `parseFloat()` 的别名。

#### 参数

* `string` -- 字符串。

#### 返回值

数字。转换结果。

#### 示例

```js
_.str.toFloat('0')  // => 0
_.str.toFloat('1.77')  // => 1.77
_.str.toFloat('2.3.6')  // => 2.3
_.str.toFloat('2e3')  // => 2000
_.str.toFloat('1.23foo')  // => 1.23
_.str.toFloat('foo123')  // => NaN
```

***

### `_.str.toInt(string)`<a name="js-api-toInt"></a>

转换为整数。

可以视为 `parseInt(string, 10)` 的别名。直接取整，不做舍入。

#### 参数

* `string` -- 字符串。

#### 返回值

数字。转换结果。

#### 示例

```js
_.str.toInt('0')  // => 0
_.str.toInt('1.77')  // => 1
_.str.toInt('2.3.6')  // => 2
_.str.toInt('2e3')  // => 2000
_.str.toInt('1.23foo')  // => 1
_.str.toInt('foo123')  // => NaN
```

***

### `_.str.toFixed(string, [i])`<a name="js-api-toFixed"></a>

转换为固定位数的小数。会做舍入。

与 `Number.prototype.toFixed()` 的功能类似，但此接口接收字符串，输出数字。

#### 参数

* `string` -- 字符串。
* `i` -- 可选。整数。保留的位数。默认值为 `0`。

#### 返回值

数字。转换结果。

#### 示例

```js
_.str.toFixed('0')  // => 0
_.str.toFixed('0', 2)  // => 0
_.str.toFixed('1.77')  // => 2
_.str.toFixed('1.77', 1)  // => 1.8
_.str.toFixed('2.3.6', 2)  // => 2.3
_.str.toFixed('2e3', 3)  // => 2000
_.str.toFixed('1.23foo', 1)  // => 1.2
_.str.toFixed('foo123')  // => NaN
```
