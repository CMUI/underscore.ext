本项目的 `template` 模块由 [underscore-template](https://github.com/cssmagic/underscore-template) 类库实现，详细功能说明请参见该类库的 [API 文档](https://github.com/cssmagic/underscore-template/issues/5) 和 [Wiki](https://github.com/cssmagic/underscore-template/wiki)。

需要注意的是，所有 JavaScript API 均挂接在 `_.template` 命名空间下。比如：

* `template.add()` → `_.template.add()`
* `template.render()` → `_.template.render()`
