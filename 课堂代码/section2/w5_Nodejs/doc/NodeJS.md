[TOC]

# NodeJS

## 课程目标
* 了解模块化，能编写符合commonJS规范的模块
* 掌握npm用法，能使用npm安全需要的模块
* 能利用NodeJS实现静态资源服务器
* 能使用express编写符合RESTful规范的数据接口

## 了解NodeJS
NodeJS是Ryan Dahl于2009年推出的基于V8 JavaScript引擎，使用事件驱动、非阻塞式I/O模型， 让JavaScript 运行在服务端的开发平台，它让JavaScript成为与PHP、Python、Perl、Ruby等服务端语言平起平坐的脚本语言

![RyanDahl](./img/RyanDahl.jpeg)

### 发展历程
* 2009年2月，Ryan Dahl在博客上宣布准备基于V8创建一个轻量级的Web服务器并提供一套库。
* 2009年5月，Ryan Dahl在GitHub上发布了最初版本的部分Node包。
* 2010年年底，Node获得云计算服务商Joyent资助，创始人Ryan Dahl加入Joyent全职负责Node的发展。
* 2011年7月，Node在微软的支持下发布Windows版本。

### 安装
* 下载地址：http://nodejs.cn/download/

> 安装完成在命令行中使用以下命令查看安装效果
    ```bash
        # 正常返回node版本号
        node -v
    ```

## npm的使用
> npm是NodeJs的包管理器，随着nodeJS一起安装 

* 初始化：`npm init`
    > 创建package.json文件
* 安装模块：`npm install`
    * `--global/-g`： 全局安装
    * `--save/-S`: 保存模块信息至 package.json 的 `dependencies`
    * `--save-dev/-D`: 保存模块信息至 package.json 的 `devDependencies`
* 删除模块：`npm uninstall`
* 修改镜像源: `npm config set registry <url>`
    > 查看：`npm config get registry`
    * 常用镜像源
        * npm: https://registry.npmjs.org/
        * cnpm: http://r.cnpmjs.org/
        * taobao: https://registry.npm.taobao.org/
        * eu: http://registry.npmjs.eu/
        * au: http://registry.npmjs.org.au/
        * sl: http://npm.strongloop.com/
        * nj: https://registry.nodejitsu.com/

## nodeJS模块化

### 模块化规范
* CommonJS      node.js
* CMD           require.js
* AMD           sea.js
* ES Module     ES6

### 模块分类
>Nodejs 模块系统采用commonJS规范。一般情况模块可分为三类：

* 原生模块: Nodejs内置模块
* 自定义模块：编辑符合commonJS规范的模块
* 第三方模块
    > 通过`npm install`命令安装到`node_modules`目录

### 模块的导入导出
* 导出：`module.exports`
* 导入：`require()`
    ```js
        // 导入原生模块
        const fs = require('fs');

        // 导入自定义模块
        const my = require('./module/my')

        // 导入第三方模块
        const gulp = require('gulp')
    ```

## 静态资源服务器
* 使用模块
    * http
    * fs
    * url
    * path
* 了解文件mime类型
* http请求与响应
    * request
    * response

```js
    const http = require('http');
    const fs = require('fs');
    const url = require('url')
    const path = require('path');
    const mine = require('./module/mime')

    const server = http.createServer((req,res)=>{
        const {pathname} = url.parse(req.url);
        const realpath = path.join(__dirname,pathname);
        const extname = path.extname(pathname).substring(1);
        fs.readFile(realpath,(err,data)=>{
            if(err){
                return res.end('404');
            }
            res.writeHead(200,{'content-type':mime[extname] + ';charset=utf8'});
            res.end(data);
        })
    })

    server.listen(1000,()=>{
        console.log('server is running on port 1000')
    })
```