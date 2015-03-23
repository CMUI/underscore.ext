# Underscore.ext

Lightweight JavaScript utilities for mobile web, based on Underscore and Zepto.

专注移动端的 Javascript 工具库，基于 Underscore 和 Zepto。

***
## 兼容性
####外部依赖：

* Underscore
* Zepto

####浏览器支持：

* 支持以下移动平台的主流浏览器：
    * iOS 5+
    * Android 2.3+

* 同样支持以下桌面浏览器：
    * Firefox (edge)
    * Chrome (edge)
    * Safari (edge)

## 安装
1.  通过 Bower 安装：
    ```sh
    $ bower install underscore.ext
    ```

2.  在页面中加载 underscore.ext 以及必要的依赖
    ```html
    <script src="bower_components/underscore/underscore-min.js"></script>
    <script src="bower_components/underscore.ext/dist/underscore.ext.js"></script>
    <script src="bower_components/zepto.js/dist/zepto.min.js"></script>
    ```

***
## 构建过程

本项目采用 Gulp 实现项目自动化构建

1. 安装 Gulp
    ```sh
    $ npm install -g gulp
    ```

2. 安装依赖插件
    ```sh
    $ npm install
    ```

3. 运行 Gulp
    ```sh
    $ gulp
    ```

4. 生成文件保存于`/dist`下     

***
## 单元测试
1. 把本项目的代码 fork 并 clone 到本地。
2. 在项目根目录执行`bower install`，安装必要的依赖。
3. 在浏览器中打开`test/test-dev.html`即可运行单元测试。 

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)
