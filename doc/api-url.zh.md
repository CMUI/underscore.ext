# API 文档 - `url` 模块

## JavaScript 接口<a name="js-api"></a>

### `_.url.parseQuery(query)`<a name="js-api-parseQuery"></a>

把 query string 解析为以对象的方式保存的名值对。

#### 参数

* `query` -- 字符串。需要解析的 query string。

#### 返回值

对象。解析结果，以名值对的方式保存。

#### 注意事项

* 传入不合法的参数，则一律返回空对象（`{}`）。
* Query string 中的所有 key 都会被转换为小写。
* Query string 的格式为 `foo=1&bar=2`，不包含问号，多个连续的 `&` 字符会被视为一个。
* 解析结果中的值如果为 `true`、`false`、`null`、`undefined` 或数字时，总是以字符串的方式保存，不会自动转换数据类型。
* 当 query string 中出现某个 key 但没有对应的值时（比如 `foo&bar=2` 或 `foo=&bar=2` 中的 `foo`），其值将解析为空字符串。

#### 已知缺陷

* 重复出现的 key 将只解析最后一次出现的值，不会把所有值加入到一个数组中。
* 不处理复杂模式的 key，比如 `foo[]` 或 `foo[bar]` 都不会被视为特殊含义，只会视为普通的 key。

#### 示例

```js
_.url.parseQuery('foo=1&bar=2')  // => {foo: '1', bar: '2'}
_.url.parseQuery('foo=&bar=2')  // => {foo: '', bar: '2'}
_.url.parseQuery('foo&bar=2')  // => {foo: '', bar: '2'}
_.url.parseQuery('')  // => {}
```

***

### `_.url.getParam(key)`<a name="js-api-getParam"></a>

获取当前页面的某个 URL 参数的值。（“URL 参数” 即为 query string 中的名值对。）

#### 参数

* `key` -- 字符串。需要获取的 URL 参数名，忽略大小写。

#### 返回值

字符串或 `undefined`。对应 URL 参数的值。

#### 注意事项

* Query string 的解析方式参见 `_.url.parseQuery()` 方法。
* 当页面 URL 发生变化时（比如调用 `history.pushState()` 等方法时），返回结果总是当前的。

#### 示例

假设当前页面的 URL 为 `http://domain.com/path/file?foo&bar=2`，此时：

```js
_.url.parseQuery('foo')  // => ''
_.url.parseQuery('bar')  // => '2'
_.url.parseQuery('absentKey')  // => undefined
```

***

### `_.url.appendParam(url, param)`<a name="js-api-appendParam"></a>

为给定的 URL 附加新的参数。

#### 参数

* `url` -- 字符串。待处理的 URL。
* `param` -- 对象。需要附加的 URL 参数（名值对）。

#### 返回值

字符串。已附加 URL 参数的新的 URL。

#### 示例

```js
var url = 'http://domain.com/path/file'
url = _.url.appendParam(url, {foo: 'bar'})  // => 'http://domain.com/path/file?foo=bar'
url = _.url.appendParam(url, {test: 1})  // => 'http://domain.com/path/file?foo=bar&test=1'
```

***

### `_.url.parseUrl(url, [part])`<a name="js-api-parseUrl"></a>

解析 URL 的各个组成部分。URL 各个组成部分的名称及含义如下：

* `protocol` -- 协议
* `hostname` -- 主机名
* `port` -- 端口号
* `host` -- 主机（含端口号）
* `pathname` -- 路径（含文件名）
* `search` -- query string 部分（含开头的 `?` 字符）
* `hash` -- hash 部分（含开头的 `#` 字符）

可以看出它们和 `location` 对象的各个 key 的含义相同。

#### 参数

* `url` -- 字符串。需要解析的 URL。若此 URL 不完整，则视为相对路径，以当前页面为基准进行解析。
* `part` -- 字符串。可选参数。需要解析 URL 中的特定部分，合法的取值参见上述 “URL 的各个组成部分” 的名称。

#### 返回值

* 当未指定任何参数时：空对象（`{}`）。
* 当未指定 `part` 参数时：对象。整个 URL 的解析结果，URL 的各个组成部分以名值对的方式保存。
* 当指定 `part` 参数时：字符串。URL 中的指定部分的值。如不存在某个部分，则值为空字符串。

#### 注意事项

* `port` 的值并不会被转换为数字。

#### 示例

```js
var url = 'http://domain.com/foo/bar'
_.url.parseUrl(url)  // => {
//     protocol: 'http:',
//     hostname: 'domain.com',
//     port: '',
//     host: 'domain.com',
//     pathname: '/foo/bar',
//     search: '',
//     hash: '',
// }

_.url.parseUrl(url, 'pathname')  // => '/foo/bar'
_.url.parseUrl(url, 'search')  // => ''
```
