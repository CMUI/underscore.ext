> 以下是未开公、未确定的接口。可能有部分特性还未实现。

## JavaScript 接口<a name="js-api"></a>

### `_.url.composeUrl(parts)`<a name="js-api-composeUrl"></a>

根据提供的 URL 各个要素，构造完整的 URL。URL 各个组成部分的名称及含义同 `_.url.parseUrl()` 接口的描述。

#### 参数

* `parts` -- 对象。URL 的各个要素的名值对。

#### 返回值

字符串。构造出的完整 URL。

当参数不合法时，返回空字符串。

#### 注意事项

* 当存在 `host` 时，将忽略 `hostname` 和 `port` 字段。
* `pathname` 必须以 `/` 开头；不以 `/` 开头则会自动补上。
* `search` 必须以 `?` 开头；不以 `?` 开头则会自动补上。
* `hash` 必须以 `#` 开头；不以 `#` 开头则会自动补上。
* `host`、`hostname`、`pathname` 中的 `?` 和 `#` 字符会被编码；`search` 中的 `#` 字符会被编码。
* `port` 值在经过 `parseInt(port, 10)` 转换后必须为 `0` 或正整数；其它值均视为 `0`。
* URL 的各个要素并不都是必选的。各字段省略时的行为如下：
	* `protocol` -- 若省略则取当前页面的 `location.protocol`。
	* `host` -- 若省略则取 `hostname` 和 `port`。
	* `port` -- 若省略则取当前页面的 `location.port`。
	* `hostname` -- 若省略则取当前页面的 `location.hostname`。
	* `pathname` -- 若省略则取根目录（`/`）。
	* `search` -- 若省略则不输出。
	* `hash` -- 若省略则不输出。

#### 示例

```js
var urlParts = {
    protocol: 'http:',
    host: 'domain.com',
    pathname: '/foo/bar'
}
_.url.composeUrl(urlParts)  // => 'http://domain.com/foo/bar'
```

***

### `_.url.removeHashFromUrl(url)`<a name="js-api-removeHashFromUrl"></a>

把 URL 中的 hash 部分去除。

#### 参数

* `url` -- 字符串。待处理的 URL。

#### 返回值

字符串。若参数不合法则返回空字符串。

#### 示例

```js
var url = 'http://domain.com/foo#bar'
_.url.composeUrl(url)  // => 'http://domain.com/foo'
```

***

### `_.url.getHashFromUrl(url)`<a name="js-api-getHashFromUrl"></a>

获取 URL 中的 hash 部分。获取结果包含开头的 `#` 字符。

若需要得到当前页面 URL 的 hash 部分，请直接使用 `location.hash`。

#### 参数

* `url` -- 字符串。待处理的 URL，可以是完整的 URL，也可以是相对路径。

#### 返回值

字符串。若参数不合法则返回空字符串；若 URL 中不包含 hash 部分则返回空字符串。

#### 示例

```js
var url = 'http://domain.com/foo#bar'
_.url.getHashFromUrl(url)  // => '#bar'
```

***

### `_.url.getHashFromLink(link)`<a name="js-api-getHashFromLink"></a>

获取指定链接的 `href` 属性值中的 hash 部分。获取结果包含开头的 `#` 字符。

#### 参数

* `link` -- DOM 元素。待处理的链接元素（`<a>` 或 `<link>`）。

#### 返回值

字符串。若参数不合法则返回空字符串；若元素的 `href` 属性值中不包含 hash 部分则返回空字符串。

#### 示例

```html
<a id="test" href="foo.html#bar">test link</a>
```

```js
var elem = document.getElementById('test')
_.url.getHashFromLink(href)  // => '#bar'
```

## 别名<a name="js-api-alias"></a>

### `_.url.isHash`<a name="js-api-isHash"></a>

`_.str.isHash()` 的别名。

### `_.url.stripHash`<a name="js-api-stripHash"></a>

`_.str.stripHash()` 的别名。

### `_.url.isFullUrl`<a name="js-api-isFullUrl"></a>

`_.str.isFullUrl()` 的别名。

### `_.url.isAbsolutePath`<a name="js-api-isAbsolutePath"></a>

`_.str.isAbsolutePath()` 的别名。

