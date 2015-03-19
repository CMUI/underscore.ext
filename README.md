# Underscore.ext

Lightweight JavaScript utilities for mobile web, based on Underscore and Zepto.

专注移动端的 Javascript 工具库，基于 Underscore 和 Zepto。

***
## 兼容性
依赖以下类库：
* Underscore

支持以下浏览器
* Chrome / Firefox / Safari 等现代浏览器
* IE 6+

## 安装
1.  通过Bower安装：
    ```sh
    $ bower install underscore.ext
    ```

2.  使用Gulp实现自动化构建，具体操作在下一部分。

3.  在页面中加载underscore.ext以及必要的依赖
    ```html
    <script src="./bower_components/underscore/underscore-min.js"></script>
    <script src="./dist/underscore-ext.js"></script>
    ```

***
## 构建过程

本项目采用Gulp实现项目自动化构建

1. 安装Gulp
    ```sh
    $ npm install -g gulp   
    $ npm install --save-dev gulp    
    ```

2. 安装依赖插件
    ```sh
    $ npm install --save-dev gulp-concat gulp-uglifyjs del
    ```

3. 运行Gulp
    ```sh
    $ gulp
    ```

4. 生成文件保存于`/dist`下     

***
## 单元测试
0. 把本项目的代码 fork 并 clone 到本地。
1. 在项目根目录执行`bower install`，安装必要的依赖。
2. 在浏览器中打开`test/test-dev.html`即可运行单元测试。 

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)
