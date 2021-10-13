[TOC]

# gulp
gulp是当下最流行的自动化构建工具 ，可以自动化完成我们开发过程中大量的重复工作。

* gulp能做什么
    * 编译：
        * es6->es5
        * sass->css
        * less->css
        * coffeescript->js
    * 合并: css, js
    * 压缩 ：css, js, html
    * 优化：图片优化

* 准备工作
    1. 安装NodeJS环境
    2. 了解npm命令的使用
    3. 了解nodeJS模块化
    3. 了解gulp

>
* 官网：http://gulpjs.com/
* 中文网：http://www.gulpjs.com.cn/

## 安装与运行
>前提是安装了nodejs环境

1. 全局安装 gulp（一台电脑只需安装一次）：
```bash
    npm install --global gulp
```
说明：全局安装gulp是为了在**任意目录**通过命令行执行gulp任务

2. 项目安装gulp（每个项目都要安装一次）：
    > 作为项目的开发依赖（devDependencies）安装：
    ```bash
        npm install --save-dev gulp
    ```
    - 本地安装gulp是为了调用gulp插件的功能，
    - --save-dev 保存配置信息至 package.json 的 devDependencies 节点
    - 这步操作前先新建package.json文件（npm init）

3. 创建`gulpfile.js`文件
    > 在项目根目录下创建一个名为 `gulpfile.js` 的文件，内容如下：
    ```js
        var gulp = require('gulp');

        gulp.task('default', function() {
            // 在命令行运行gulp命令会执行这里的代码
        });
    ```

4. 运行 gulp：
    > 在命令行执行以下命名，如果不写任务名称，则自动运行default任务（如果有）
    ```bash
        gulp <任务名称>
    ```

## gulp工作流程
1. 输入：通过 `gulp.src()` 方法获取到想要处理的文件（返回**文件流**）
2. 处理：文件流通过 `pipe()` 方法导入到 gulp 的插件中处理
3. 输出：处理后的文件流再通过`pipe()`导入到 `gulp.dest()` 方法并输出到目标目录中


## gulp API
* 创建任务: `gulp.task(name [, task], cb)`
    ```js
        gulp.task('buildsass',function(){

        });
    ``` 
* 匹配要处理的文件: `gulp.src(globs[, options])`
    * globs匹配语法：https://github.com/isaacs/node-glob（底部PS） 
    * options 有3个属性buffer、read、base
* 输出文件: `gulp.dest(path[, options])`
    > 把文件流中的内容中输出到指定目录
*  监听文件修改，并执行相应任务
    * `gulp.watch(glob [, opts], tasks)`
    * `gulp.watch(glob [, opts, cb])`  
* 合并任务(顺序)：`gulp.series(string|function)` 
    > 把多个任务合并成一个大的任务，一般用于task依赖任务和watch任务
* 合并任务(并行)：`gulp.parallel(string|function)` 
    > 把多个任务合并成一个大的任务，一般用于task依赖任务和watch任务

## gulp插件
大部分插件都可以在http://www.npmjs.com找到，任何插件的使用都要经历以下三步：

1. 安装插件：`npm`
    ```
        npm install --save gulp-htmlmin
    ```
    > PS：可一次性安装多个插件，插件间用空格隔开

2. 引入插件：`require()`
    ```js
        let htmlmin = require('gulp-htmlmin')
    ```

3. 使用插件：`pipe()`
    ```js
        gulp.task('htmlmin',function(){
            gulp.src('src/html/*.html')
                .pipe(htmlmin())
                .pipe(gulp.dest('dist/html'));
        });
    ```

### 常用gulp插件
* html压缩：gulp-htmlmin
* css压缩：gulp-clean-css
* js压缩：gulp-uglify
* 合并文件：gulp-concat
* 文件重命名：gulp-rename
* js编译：gulp-babel
* 编译Sass: gulp-sass
* 编译 Less：gulp-less
* 图片优化：gulp-imagemin

### 其他常用插件
* 浏览器同步测试：browser-sync
    ```js
        gulp.task('server',()=>{
            // 开启服务器
            browserSync({
                // server:'./src/',

                // 代理服务器
                proxy:'http://localhost:10086',

                // 端口
                port:10086,

                files:['./src/**/*.html','./src/css/*.css','./src/api/*.php']
            });

            // 监听sass文件修改
            gulp.watch('./src/**/*.scss',gulp.series('compileSass'));
        });

    ```

## 常用操作
* E6转ES5: gulp-babel
    > 依赖 `@babel/core`,`@babel/preset-env`，如需转换特殊功能，需要安装对应babel插件
    ```js
        let babel = require('gulp-babel');

        gulp.task('es625', function(){
            return gulp.src('./src/js/*.js')
                .pipe(babel({
                    presets: ["@babel/env"],
                    // plugins: []
                }))                  
                .pipe(gulp.dest('./dist/js'));
        });
    ```
    > babel的配置也可以放在`.babelrc`文件中，babel会自动加载该文件中的配置
* sass转css
    > 依赖：`node-sass`
    ```js
        var sass = require('gulp-sass');
        gulp.task('compileSass',()=>{
                return gulp.src('./src/sass/*.scss')
                    .pipe(sass({
                        outputStyle:'expanded'//compact,expanded,compressed
                    }).on('error', sass.logError))
                    .pipe(gulp.dest('./src/css/'))
        });
    ```
---

## globs语法
> globs需要处理的源文件匹配符路径，语法如下

* 匹配单个文件：`gulp.src('src/js/index.js')`
* 匹配多个文件：`gulp.src(['src/js/index.js','src/js/detail.js'])`
* 匹配所有文件: `gulp.src('src/js/*.js')`
* 匹配符：
    `!`：排除文件，
    `*`：匹配所有文件，
    `**`：匹配0个或多个子文件夹，
    `{}`：匹配多个文件名

```js
    // 压缩src/js目录下的所有js文件
    // 除了test1.js和test2.js（**匹配src/js的0个或多个子文件夹）
    gulp.src(['src/js/*.js', '!src/js/**/{test1,test2}.js'])
```