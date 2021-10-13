# week5

## 课程安排
* ajax      
* nodejs    后端
* mysql     数据库

## day5-3

### 知识点
* markdown  一个比html还简单的标识语言

* 静态页面
    * 页面写死，内容固定，维护不方便

* 前端与后端
    * 前端：html+css+js
        * 页面
        ```html
            <!-- index.html -->
            <ul id="list">
                <li>data1</li>
                <li>data2</li>
                <li>data3</li>
                <li>data4</li>
            </ul>
        ```
        ```js
            let data = [
                'data1',
                'data2',
                'data3',
                'data4',
            ]
            const list = document.getElementById('list')

            // ['data1','data2'] -> ['<li>data1</li>','<li>data2</li>']
            const arr = data.map(item=>{
                return `<li>${item}</li>`
            })
            
            // ['<li>data1</li>','<li>data2</li>'] -> '<li>data1</li><li>data2</li>'
            const html = arr.join('')


            list.innerHTML = html;

            <ul id="list">

            </ul>
        ```

    * 后端（服务器）
        > 存放数据的地方

* ajax
    > 利用ajax技术向服务器请求数据到前端
    * 了解前端后端分离
    * 学会查看接口文档
    * 发起ajax请求的步骤
        > 必须通过服务器发起请求
        1. 创建一个异步请求对象
            ```js
                const xhr = new XMLHttpRequest()
            ```
        2. 设置请求参数，建立与服务器连接
            ```js
                xhr.open('get','url',true)
            ```
        3. 向服务器发送请求
            ```js
                xhr.send()
            ```
        4. 处理服务器响应数据
            ```js
                xhr.onload = function(){
                    // 在这里通过xhr.responseText获取
                }
            ```
        
    * 处理数据，并生产html结构

* 创建本地服务器
    > http-server实现本地服务器
    ```bash
        # 安装
        npm install -g http-server

        # 安装完成后通过http-server启动服务器
        http-server

        # 启动一个默认端口为8080的服务器
        # 接口服务器支持8080,8081,3000
        # 可以通过http://localhost:8080或http://127.0.0.1:8080访问
        # 如果想访问别人的电脑，必须知道对方的ip地址
    ```

* 同步与异步
    * 同步操作
        > 阻塞
    * 异步操作
        * setTimeout
        * setInterval
        * ajax
        * ...
* 请求传参
    * get: `?username=laoxie`

### 练习
* 请求接口数据，并渲染到页面
* 根据分类请求相应商品数据
* 点击商品进入详情页并展示商品效果

## day5-4

### 复习
* ajax
    * ajax请求步骤
* http请求
    * 客户端与服务端
        > 必须有客户端主动发起请求，服务器被动响应，响应完成后客户端与服务器自动断开
    * 请求request与响应response
        * request: 客户端发给服务端
        * response: 服务器发给客户端
* 同步与异步

### 知识点
* ajax请求封装
    * baseUrl
    * 回调函数callback
* 处理数据
* 页面跳转传参
    * url参数：?后的参数，格式：`?key=value`
        > string -> object
        * 传统操作
            1. 通过`location.search`获取url参数
            2. 通过&拆分每个参数
            3. 遍历每个参数，通过=拆分键值
            4. 把所有键值组合成一个对象
        * HTML5新特性：URLSearchParams
            ```js
                // ?id=603777f0883dee30b83facf3&a=10&b=20
                const params = new URLSearchParams(location.search)
                params.get('id'); //603777f0883dee30b83facf3

                // 思考一个问题：如果URLSearchParams是你封装的，你如何实现以上效果
            ```


* dataset: 自定义属性集合
    > 通过`节点.dataset`属性获取自定义属性集合

* Promise   承诺、许诺
    * 使用
        ```js
            // 实例化一个promise对象(状态：Pending)
            const promise = new Promise(function(resolve,reject){
                // resolve是一个函数: 用来改变promise的状态为Fulfilled
                // reject是一个函数：用来改变promise的状态为Rejected
                
                // 假设Promise为“爱你一辈子”
                // 如果白头偕老，就调用resolve()
                // 如果第二天就分手了，就调用reject()
            })
        ```
    * promise的状态
        > 状态只能从`Pending->Fulfilled`或Pending->Rejected，状态只要发生了改变时不可能在边回去
        * Pending（未完成）可以理解为Promise对象实例创建时候的初始状态
        * Fulfilled（成功） 可以理解为成功的状态
        * Rejected（失败） 可以理解为失败的状态
    * 原型方法
        * then(success,fail)
        * catch(fail)
    * 静态方法（类方法）
        * Promise.resolve()  创建一个状态为`Fulfilled`的promise对象
        * Promise.reject()   创建一个状态为`Rejected`的Promise对象
        * Promise.all([p1,p2,p3])    把多个promise对象包装成一个大的promise对象,大的promise对象的状态如下：
            * 所有的promise对象的状态都为Fulfilled时，大的promise状态为Fulfilled
            * 只要有一个promise对象的状态为rejected，则大的promise状态为rejected
        * Promise.race([p1,p2]): 竞速，谁跑的快，状态以谁为准
            ```js
                // 请求图片
                 function requestImg(){
                    return new Promise((resolve, reject)=>{
                        var img = new Image();
                        img.onload = function(){
                            resolve(img);
                        }
                        img.src = 'laoxie.jpg';
                    });
                }

                //延时函数，用于给请求计时
                function timeout(){
                    return Promise((resolve, reject)=>{
                        setTimeout(()=>{
                            reject('图片请求超时');
                        }, 5000);
                    });
                }

                Promise.race([requestImg(), timeout()])
                .then(function(result){
                    document.body.appendChild(result)
                })
                .catch(function(reason){
                    console.log(reason);
                });
            ```

* 匿名函数的执行
    ```js
        (function(){})()
    ```
* ES8新特性
    > async&await让我们以同步的写法实现异步操作
    * asyn
        > async函数返回一个promise对象，相当于以下代码
        ```js
            async function show(){
                return 'laoxie'
            }
            // 等效于以下代码
            function show(){
                return new Promise(resolve,reject){
                    resolve('laoxie')
                }
            }
        ```
    * await
        > 不能单独使用，只能在async函数中使用，用来等待promise对象的结果（换句话说，await后只能跟promise对象）

### 练习
* 根据数据渲染商品详情页面


## day5-5

### 面试题
* 为什么会出现乱码
    > 编码不统一造成乱码问题
    * ascii
    * latin
    * gb2312
    * gbk
    * unicode -> utf-8

### 复习
* ajax封装
    > 尽量让自己的封装方法功能单一化，需要考虑扩展性
    * 回调函数
        > 把函数作为参数传入其他函数中
        * 回调地狱
        ```js
            // 定义
            function ajax(url,callback){
                const xhr = new XMLHttpRequest()
                xhr.onload = function(){
                    const data = xhr.reponseText

                    callback(data)
                }
                xhr.open()
                xhr.send()

            }

            // 调用
            ajax('/test',function(data){
                // 业务

            })

            // 回调地狱1：第5个请求需要依赖前4个请求的数据才能发起请求
            // 可以使用Promise.all()解决这个问题
            ajax('/category',function(category){
                // 业务： 此处省略100行代码
                ajax('/goods',function(goodslist){
                // 业务： 此处省略300行代码
                    ajax(`/list`,function(data3){
                        ajax(url,function(data4){

                            
                            ajax(url,function(){

                            })
                        })
                    })
                })
            })

            // 回调地狱2：每个请求需要依赖前一个请求的数据
            // 解决方案：在每一个then方法中返回一个新的promise对象，实现then方法的链式调用（请看一下promise代码）
            ajax('/cagetory',(category)=>{
                ajax(`/goods?category=${category}`,(goodslist)=>{
                    ajax(url+goodslist.name,function(data3){
                        ajax(url+data3.name,function(){

                        })
                    })
                })
            })
        ```
    * Promise
        * Promise.all([p1,p2,p3,p4])
        ```js
            const p1 = new Promise((resolve,reject)=>{
                ajax('/category',function(category){
                    resolve(category)
                })
            })
            const p2 = new Promise((resolve,reject)=>{
                ajax('goods?category='+category.name,function(goodslist){
                    resolve(goodslist)
                })
            })
            //const p3 = ...
            //const p4 = ...

            // 第5个请求：需要依赖前4个请求的数据才能发起请求
            // 可以使用Promise.all()解决这个问题
            const p5 = Promise.all([p1,p2,p3,p4])
            p5.then((category,goodslist,data3,data4)=>{
                ajax(url,function(){

                })
            })

            // 每个请求需要依赖前一个请求的数据
            // 在每一个then方法中返回一个新的promise对象，实现then方法的链式调用
            new Promise((resolve,reject)=>{
                ajax('/category',function(category){
                    resolve(category)
                })
            }).then((category)=>{
                
                return new Promise((resolve,reject)=>{
                    ajax('goods?category='+category.name,function(goodslist){
                        resolve(goodslist)
                    })
                })

            }).then((goodslist)=>{
                 return new Promise((resolve,reject)=>{
                     ajax(url+goodslist.name,function(data3){
                         resolve(data3)
                     });
                })
            }).then((data3)=>{
                return new Promise((resolve,reject)=>{
                     ajax(url+goodslist.name,function(data4){
                         resolve(data4)
                     });
                })
            })
        ```
* Promise
* async & await
    > 用于简化Promise操作的代码
    ```js
        const category = await ajax('/category')
        const goodslist = await ajax('/goodslist?category='+category)
        // ...
    ```
* 

### 知识点
* NodeJS
    > 属于后端语言，基于ECMAScript
    * 前端javascript = ECMAScript + DOM + BOM

* 环境变量
* 模块化
    > 在NodeJS中把一个文件当作一个模块，每个模块的作用域是独立作作用域，如需要在其他模块中获取当前模块的数据，必须导出
    * 什么时模块化
        * 把一个大的功能拆分成若干小的功能
    * 为什么需要它(优点)
        * 分工
        * 维护
        * 复用
    * 规范
        * commonJS  nodejs采用的规范
        * ESModule  ES6推出的模块化规范
        * AMD       require.js（了解）
        * CMD       sea.js（了解）
    * 分类
        * 内置模块
            > NodeJS自带，直接引用
        * 自定义模块
        * 第三方模块
    * 使用
        * 引入
            ```js
                // commonJS
                require(url)
            ```
        * 导出
            ```js
                // commonJS
                module.exports
            ```
* 创建一个服务器
    * http-server实现一个服务器
    * 利用http模块创建一个服务器
        * request
        * response
            * writeHead()   设置响应头
                > 一个请求可以使用多次writeHead()
            * write()       设置响应内容
                > 一个请求可以使用多次write()
            * end()         接收响应
                > 一个请求只能使用一次end()
    * 连接服务器
        * 协议：http
        * 地址：ip地址/localhost/127.0.0.1
        * 端口：80
* 静态资源服务器
    * 依赖模块
        * http
        * fs
        * path
        * url / URLSearchParams / URL
    * 全局变量
        * __dirname ： 当前文件所在的目录
    * mime类型
        > 设置Content-Type属性
    * Buffer
        > 类似与数组的二进制数据类型
    * 状态码
        * 200+      成功
            * 200
        * 300+  
            * 301:重定向
            * 302:重定向
            * 304:缓存文件
        * 400+      客户端错误
            * 404:文件不存在
        * 500+      服务器错误
            * 500
* express

## day5-7

### 复习
* 模块化
    * 规范
        * commonJS      NodeJS
        * ESModule      ES6
        * AMD           require.js
        * CMD           sea.js
    * 使用（commonJS）
        > 每一个模块的作用域是独立的
        * 导入:`require()`
            > 一定是引入一个js文件，如引入的是一个目录，则查找这个目录下的`package.json`中的`main`属性，如无main属性，则引入该目录下的`index.js`

            1. 在缓存中查找（找到则停止，否则进入下一步）
            2. 判断是否为内置模块
            3. 如非内置模块，则到`node_modules`中查找
            4. 缓存该模块


        * 导出: 
            * `module.exports`（推荐）
            * `exports`

    * 模块分类
        * 内置模块
            ```js
                require('fs')
            ```
        * 自定义模块
            ```js
                require('../tools')
            ```
        * 第三方模块
            > 需要安装
            ```js
                require('express')
            ```
* 静态资源服务器
    > 静态资源：html、css、js、img、字体等文件
    * 网站根目录
        > 注意：网站中所有的资源链接不能在网站根目录之外

### 知识点
* express
    * 安装
        ```js
            npm install expess
        ```
    * 使用
        ```js
            const express = require('express')
            const app = express()
            app.listen(2108,()=>{
                console.log('server is running')
            })
        ```
    * 中间件middleware 
        > 使用express其实就是在调用各种各样的中间件
        * 中间件是一个封装了某些处理数据功能的**函数**
        * 分类
            * express内置中间件
                * express.static()
            * 自定义中间件
                ```js
                    function myMiddleware(request,response,next){
                        // request: 经过express处理后的请求对象Request
                        // response: 经过express处理后的响应对象Response
                        // next()： next是一个方法，因为一个应用中可以使用多个中间件，而要想运行下一个中间件，那么上一个中间件必须运行next()
                    }
                ```
            * 第三方中间件

        * 使用中间件: app.use()
            > 格式：`app.use([path],...middlewares)`
            ```js
                app.use(function(req,res,next){

                })
                app.use(
                    // 中间件1
                    function(req,res,next){
                        console.log('m1')
                    },
                    // 中间件2
                    function(req,res,next){
                        console.log('m2')
                    }
                )

                app.use('/api',function(req,res){

                })
            ```
* 编写数据接口
    > **RESTful接口规范**：据不同的请求类型与不同的路径实现不同的接口
    * 请求类型：
        > 如果中间件使用use，则所有请求类型都会进入
        * get       查
        * post      增
        * delete    删
        * put       改
    * postman测试工具
        > 下载地址：https://www.postman.com/downloads/

* 模块化路由
    * 利用模块化思想把路由拆分成若干小模块

    * 利用路由中间件组合路由
        > express.Router()

* 请求参数传递与接收
    * url参数：`?key=value&key=value`
        > 后端接收：`req.query`
    * 动态路由：`/goods/:id`
        > 后端接收：`req.params`
    * 请求体requestBody
        > 由于请求体数据类型众多，express默认并没有帮我们格式化数据，需要开发者手动处理，express提供了多个中间件处理这些类型数据
        * x-www-form-urlencoded：`key=value&key=value` -> {key:value}
            > 使用`express.urlencode()`中间件把该类型数据格式化到`req.body`
        * json
            ```js
                {
                    "key":"value",
                    "key":"value"
                }
            ```
        * formData
    * 请求头requestHeader
        > 后端接收： req.get(key)
### 练习
* 编写符合RESTful规范的商品与用户CRUD接口
    > 只实现接口，不用具体实现
* 编写用户注册与登录接口
    > 需要检测用户名是否存在


## day6-1

### 复习
* express
    * 中间件
        * 使用：`app.use([path],...middleware)`
        * 分类
            * 内置
                * express.static()
                * express.Router()
                * express.urlencoded()
                * express.json()
            * 自定义
            * 第三方
    * 模块化路由
    * 参数传递与接收
        * url参数：req.query
        * 动态路由: req.params
        * 请求体: req.body
            * x-www-form-urlencoded: `key=value&key=value`
                ```html
                    <form action="http://localhost:2108/login" method="post">
                        <input type='text' name="username"  />
                        <input type='password' name="password" />
                        <button>提交</button>
                    </form>

                     <!-- get: http://localhost:2108/login?username=xxx&password=xxx -->
                     <!-- post: http://localhost:2108/login -->
                ```
            * json
        * 请求头:req.get()

### 知识点
* 数据库: database
    > MySQL
    * 概念：
        * 表：table
        * 数据：row
        * 字段：field
        * 主键：primary key
    * 安装
        > 配置
    * 使用步骤
        1. 连接数据库
        2. 切换数据库
        3. 执行sql语句
    * 操作
        * 命令行
        * 可视化工具
    * 数据CRUD
        > sql语句（重点）
        * 增：`insert into`
            ```sql
                -- 插入单条数据
                insert into user (username,age,gender) values ('xiajie',17,'女');

                -- 插入多条数据
                insert into 
                user (username,age,gender) 
                values 
                ('xiajie',17,'女'),
                ('zege',37,'男'),
                ('marong',39,'女');
            ```
        * 删: `delete from`
            > 删除一般需要配合条件使用
            ```sql
                delete from user where age>18;
                delete from user where age>18 and gender='男';
            ```
        * 改: `update ... set`
            > 修改一般需要配合条件使用
            ```sql
                update user set age=20 where username="laoxie";
            ```
        * 查: `select ... from ...`
            ```sql
                select * from user;
                select username,gender from user;
            ```
    * 条件：where


* 在NodeJS中使用mysql
    * 安装驱动（第三方模块）
        ```js
            npm install mysql
        ```
    * 连接数据库
        * 连接对象
            ```js
                const connection = mysql.createConnection({
                    host     : 'localhost',
                    user     : 'root',
                    password : 'root',
                    database : 'h52108'
                });
            ```
        * 连接池（推荐）
            ```js
                const pool  = mysql.createPool({
                    host     : 'localhost',
                    user     : 'root',
                    password : 'root',
                    // port: 3306,
                    database: 'h52108',

                    // 允许每个mysql语句有多条查询（默认false）.使用它时要非常注意，因为它很容易引起sql注入攻击
                    // multipleStatements: true
                });
            ```
    * 执行sql语句
        > 重点：如何编写sql语句（拼接sql）
        ```js
            connection.query('select * from users',(err,rows)=>{

            })
            pool.query('select * from users',(err,rows)=>{

            })

            // let sql = `select * from users`
            
            // 拼接sql语句
            let data = [{username:'laoxie',password:123456},{username:'tiantian',password:123456}]
            //let sql = `insert into users(username,password) values
            //('${data[0].username}','${data[0].password}'),
            //('${data[1].username}','${data[1].password}')
            //`

            let sql = `insert into users(username,password) values`
            sql += map.forEach(item=>{
                return `('${item.username}','${item.password}'),`
            }).join(',')
            console.log('sql',sql);// insert into users(username,password) values('laoxie','123456'),('tiantian','123456')
        ```

## day6-2

### 知识点
* bootstrap
    * 版本
        * 开发版本:development
            > 未压缩
        * 生产版本：production
            > 压缩后的代码，一般在上线后使用
* 统一前后端数据格式
    ```js
        {
            code:200, // 200成功，400失败
            data,   // 返回前端的数据
            msg
        }
    ```
* 登录页面
    * 封装ajax请求方法：request
    * 编写login接口
    * 使用bootstrap进行页面布局

* 本地存储
    > 客户端存储技术，把数据保存在客户端
    * Cookie
        ```js
            name=value[;expires=有效期时间][;path=路径][;domain=域名]
        ```
        * 组成部分：
            * name=value
            * 参数
                * expires
                    > 默认为session，关闭浏览器自动删除
                    ```js
                        document.cookie = 'name=value;expires='+new Date()
                    ```
        * 操作
            * 写入
                > 只能写入字符串数据，一次只能写入一个
                ```js
                    document.cookie = `name=value`
                ```
            * 读取
                > 读取当前域名下所有cookie，每个cookie间以**分号+空格**隔开
                ```js
                    document.cookie
                ```
            * 删除cookie
                > 利用设置过期时间达到删除的效果
                ```js
                    let date = new Date();// 2021-9-28
                    date.setDate(date.getDate()-1); //2021-9-27
                    document.cookie = 'name=value;expires='+date
                ```
    * webStorage
        > 与cookie一样，只能存储字符串类型数据（如写入非字符串数据会自动转换）
        * 分类
            * sessionStorage
                > 存在session中的数据，关闭浏览器会自动删掉
            * localStorage
                > 永远保存在本地，除非手动删除

        * 操作方法
            * getItem(key)
                > 如key不存在，则得到null
            * setItem(key,value)
                > value只能为String类型
            * removeItem(key)
        * 事件：storage
            > 当本地存储有修改时（添加，删除，修改，清空）会自动执行该事件，一般用于跨页面通讯
            ```js
                window.addEventListener('storage',function(e){

                },true)
            ```

### 练习
* 封装formatData工具函数，实现统一前后端数据格式
* 封装cookie的增删改查函数
    * Cookie.getCookie()
    * Cookie.setCookie()
    * Cookie.removeCookie()


## day6-3

### 复习
* 本地存储技术
    * Cookie
        * 4k大小
        * 随着请求自动通过请求头发送给服务器
        * 属性
            * expires   有效期（默认session）
            * path      作用域（默认当前目录）
                ```js
                    laoxie.com/             a    
                    laoxie.com/html/        b
                    laoxie.com/html/views/  c

                    document.cookie = `a=10;path=/`
                    document.cookie = `b=20;path=/html`
                    document.cookie = `c=20;path=/html/views`
                ```
            * domain 
    * WebStorage
        * SessionStorage    会话存储（关闭浏览器自动删除）
        * localStorage      本地存储（永久存储，除非手动删除）
* bootstrap


### 知识点
* mysql数据的导入导出
    * 导入
        * csv
        * json
        * sql（推荐）
    * 导出
        * csv
        * json
        * sql（推荐）

* bootstrap
    * css
        * 栅格系统
        * 图标
            > https://icons.bootcss.com/
        * 组件
        * 工具类
    * js

* 购物车页面效果

### 练习
* 完善购物车效果
    * 修改数量
    * 删除
    * 清空
    * 实时更新购物车效果

## day6-4

### 知识点
* 购物车页面逻辑
* 封装
    > 函数式编程
    * formatData()
    * request()
    * Cookie
    * 节点操作
* jQuery
    > 是一个利用面向对象编程的库

### 练习
* 完善节点操作方法Query
* 熟悉jQuery
* 发现页面
    * 显示商品分类
    * 商品列表
        * 排序：价格，热度
    * 搜索
* mySql语句

## day6-5

### 知识点：jQuery
* 原生获取元素
    * document.getElementById()
    * document.getElementsByName()
    * getElementsByTagName()
    * getElementsByClassName()
    * querySelector()
    * querySelectorAll()


* jQuery特点
    * 选择器
        * 直接选取
        * 过滤方法
    * 节点操作方法
        修改节点
        事件绑定
        动画
    * ajax
* jquery的使用
    * 原理：基于面向对象的一个工具库
        * 构造函数（类）：jQuery
        * 原型对象：jQuery.prototype
        * 实例: 通过调用jQuery()返回的对象
    * jQuery获取元素
        > 返回一个伪数组（实例，有自己的原型对象，原型中有很多方法）
        ```js
            const el = jQuery(selector)

            el.xxx
        ```
    * 原生对象与jQuery对象的转换
        * 原生->jQuery对象：`$(原生)`
    * 动画
        * 方法
            * show(speed)/hide(speed)     同时控制with,height,opacty
            * fadeIn(speed,callback)/fadeOut(speed,callback)                淡入淡出（控制opacity）
            * slideDown(speed,callback)/slideUp(speed,callback)             滑入（控制height）
            * 自定义动画：`animate(params,[speed],[callback])`
        * 动画时间：speed
            * Number： 单位毫秒
            * String: slow,normal,fast

    * 事件绑定
        * `on(type,[selector],handle)`
        ```js
            // 事件绑定
            $btn.on('click',function(){})

            // 事件移除
            $btn.off('click')

            // 事件委托
            $div.on('click','button',function(){})
        ```

### 练习
* 根据数据生成表单

## day6-6

### 面试题
* 如何取消ajax请求
    * abort()：主动取消
    * timeout：设置超时时间被动取消
    ```js
        const xhr = new XMLHttpRequest()
        xhr.open()
        xhr.send()

        // 取消ajax请求
        xhr.abort()
    ```
* jquery方法链式调用的原理
    > 每个方法返回jquery实例`（return this）`
    jquery的大部分方法都支持链式调用，但获取的方法不支持（如：xx.html(),xx.css('color')

### 知识点
* 类方法（静态方法）
    > 与原型方法的区别
* jquery ajax
    * $.ajaxSetup() 设置公共配置
        * beforeSend(xhr)中设置baseUrl
            * this: 配置信息
    * $.ajax()
    * $.get()
    * $.post()

* jquery扩展：根据用户需求扩展jquery功能
    * jquery插件
        * 实例方法插件：扩展原型对象方法
            > 注意this指向问题
            * jquery.ui
            ```js
                jQuery.prototype.draggable = function(){
                    // this: jquery实例
                    this.each(function(index,el){
                        // el：原生节点
                        // this: 指向el

                        // 拖拽代码
                        el.onmousedown = function(){

                            document.onmousemove = function(){

                            }
                        }

                        document.onmouseup = function(){

                            document.onmousemove = null;
                        }
                    })

                    return this;
                }

                // 使用
                $('#box').draggable()
                $('div').draggable()
            ```
        * 全局函数插件（静态方法），如$.each,$.map,$.ajax
            ```js
                 jQuery.put = function(url,data,callback){
                    return  jQuery.ajax()
                }
            ```

* jquery总结
    > 是一个工具库，实现了很多封装函数供用户使用
    * 原理
        > 基于面向对象的工具库
        * jquery对象（实例）
        * 构造函数（jQuery）
        * 原型（编写了大量的工具函数）
        ```js
            $('.box').find()
        ```
    * 特点
        * 选择元素
        * 操作元素
            * 修改内容
                ```js
                    $('.box').html('xxx')
                    $('.box').text('xx')

                    $('.box').append()
                ```
            * 修改属性
                > 标签**公有属性**和**私有属性**的操作会相互影响
                * html标签属性
                    * 原生JS：setAttribute(name,value)
                    * jQuery: attr(name,value)
                * 节点属性
                    * 原生：点语法(`节点.name=value`)
                    * jQuery: props(name,value)
                ```js
                    $('.box').addClass('xx')

                    // 设置html标签属性：setAttribute('msg','123')
                    $('.box').attr('msg','123')

                    // 设置节点属性
                    // 点语法：box.msg = '123'
                    $('.box').prop('msg','123')
                ```
            * 动画
            * ajax
            * ...
        * 设置的方法支持链式调用，获取方法不支持
        * 一个方法同时支持获取与设置
            * css(name)/css(name,value)
            * html()/html(value)
            * attr(name)/attr(name,value)
            * prop(name)/prop(name,value)
            * ...

### 练习
* 给jQuery添加put与delete静态方法，实现ajax请求
    ```js
        (function($){
            $.put = function(){
                return  $.ajax()
            }
            $.delete = function(){

            }
        })(jQuery)

    ```


## day7-1

### 知识点
* 项目优化
    * 编译成浏览器支持的代码
        > 目的：兼容个大浏览器
    * 合并文件
        > 目的：减少http请求
    * 压缩文件
        > 目的：加快文件的下载速度
    * ...
* 构建工具：Gulp
    1. 安装
        * 全局安装
            > 一台电脑只需要安装一次，目的为了在命令行中使用
            ```bash
                npm install -g gulp
            ```
        * 项目安装
            > 目的为了在代码中引用模块
            * 为了保存安装模块信息，需要使用`npm init`命令生成`package.json`文件
            ```bash
                npm install gulp
            ```
    2. 在根目录中创建`gulpfile.js`文件 
        > 该文件遵顼`commonJS`规范

    3. 创建任务
        > gulp是一个基于任务的构建工具，任何的操作都需要一个任务来完成
        ```js
            // 老版本创建任务
            gulp.task('es625',function(){
                // gulp工作流程
                // 1. 输入：查找目标文件
                gulp.src()

                // 2. 处理：利用各种插件、工具进行操作
                .pipe()
                .pipe()

                //3. 输出：把处理过的文件保存到硬盘
                .pipe(gulp.dest())
            })

            // 新版本创建任务
            module.exports = {
                es625:function(){

                }
            }
            exports.es625 = function(){}
        ```
    4. 运行任务
        ```bash
            gulp es625
        ```
* 应用
    * ES6转ES5
        > 利用`babel`来进行编译，把代码转成浏览器支持的代码
        * 依赖
            * babel
                > babel是工具的一个统称，实际开发中需要安装一下模块
                * @babel/core
                * @babel/preset-env
            * gulp-babel
                > 要在gulp中使用babel必须安装这个gulp插件
        * 创建任务
            ```js
                exports.es625 = function(done){
                    // 输入：查找目标文件（返回文件流：文件的液体状态，可以随意分割和传输）
                    gulp.src('./src/js/common.js')
                    // 处理
                    .pipe(babel({
                        presets: ["@babel/preset-env"],
                    }))
                    // 输出：把处理过的文件保存到硬盘
                    .pipe(gulp.dest('./dist'))
                    done();
                }
            ```
    * 合并与压缩

* 自动化编译
    > 监听文件修改，自定执行相应的任务
    ```js
        // 监听文件，执行单个任务
        gulp.watch('./src/**/*.js',es625)

        // 监听文件修改，执行多个任务
        gulp.watch(
            './src/**/*.js',

            // 顺序执行
            gulp.series(mergeJS,es625,compressJS),

            // 同时执行
            // gulp.parallel(mergeJS,es625,compressJS)
        ) 
    ```

* css预处理器
    > 利用编程的思想编写css代码
    * Less
    * Sass
    * Stylus

* Sass语法
    > sass兼容所有css语法
    * 注释
        * 单行
        * 多行
    * 变量
        * 定义
            > $变量名:值
            * 默认变量：`$变量名：值 !default;`
        * 类型
            * 普通变量
            * 多值变量
                * list
                * map
        * 使用
            > 默认用于属性值
            * 特殊用法：在属性名或选择器中使用变量
                > #{变量}
        * 作用域
            * 全局变量
            * 局部变量

* 转换
    * css转sass
        * 在线转换 
    * sass转css
        * gulp
            * 依赖：gulp-sass + sass
        * 在线
        * vscode插件

### 练习
* 压缩html文件

## day7-2

### 复习
* gulp
    * 是什么
    * 有什么用
    * 怎么用
        * 安装
            * 全局安装
            * 项目安装
        * 工作流程
            1. 输入
            2. 处理
            3. 输出
        * gulpfile.js
            * 创建任务
        * 运行任务
            * 命令行操作
* sass
    * 语法
    * 编译
        * gulp
        * gulp-sass + sass(node-sass)

### 知识点
* sass语法
    * 变量
    * 注释
    * 嵌套
    * 循环
        ```sass
            @for $var from <start> through <end>//（包含end值）
            @for $var from <start> to <end>//（不包含en值）
        ```
    * 条件
        ```sass
            .price{
                @if $type == ocean {
                    color: blue;
                } @else if $type == matador {
                    color: red;
                } @else {
                    color: black;
                }
            }
        ```
    * 函数
        ```sass
            @function 函数名($type){
                @return 返回值;
            }
        ```
    * 导入
        ```sass
            @import <url>
        ```
    * 继承
        * 占位符：`%name`
        ```js
            @extend <选择器>
        ```
    * mixin
        ```sass
            @include mixinName
        ```

* 版本管理工具：Git
    * 概念（git三大区）
        * git仓库（版本库：Repository）  
        * 工作区（Working Directory）：包含.git的目录
        * 暂存区（stage/index）：git add命令添加文件后进入暂存区

    * 使用git
        * git init  初始化一个仓库
            > 在当前目录下创建一个`.git`的隐藏目录
        * 版本管理
            1. 修改文件
            2. 添加：添加到暂存区
                ```bash
                    git add <文件名>
                ```
            3. 提交： 把文件提交到git仓库
                ```bash
                    git commit -m "备注信息"
                ```
    * 常用git命令
        * git init     初始化仓库
        * git add       添加文件
            ```bash
                # 添加一个文件
                git add <文件名>

                # 添加一个目录
                git add <文件夹>

                # 添加当前文件夹下所有文件（慎用）
                git add .
            ```
        * git commit    提交文件
            ```bash
                # 备注信息尽量写详细一些
                git commit -m "备注"
            ```
            > 如果不写-m就提交会进入**vim**编辑界面
            * 进入编辑状态: i
            * 推出编辑状态：esc
            * 保存并退出
                1. 退出编辑状态
                2. 在英文输入法状态按`shift+:`
                3. 输入`wq`并回车
        * git status    查看仓库状态
    * git过滤清单
        > .gitignore

## day7-3

### 面试题
* 你们的团队时如何管理git分支

### 复习
* Sass语法
* Git
    * 作用
        * 版本管理
        * 团队协作
    * 三大区
        * 工作区
        * 暂存区
        * 版本库
    * 使用步骤
        1. 仓库初始化：git init
            > 本地仓库
        2. 修改文件
        3. git add
        4. git commit 

### 知识点
* git 版本管理工具
* 代码托管服务器
    * github
    * gitlap
    * gitee
* 本地仓库与远程仓库
    * 本地仓库：保存在自己电脑中的git仓库（通过git init创建的仓库）
    * 远程仓库：
        1. 创建远程仓库： github
        2. 关联：关联本地仓库与远程仓库
            * git remote add <远程仓库名> <远程仓库地址>
                ```bash
                    # https: 速度较慢，每次都需要登录才能推送
                    git remote add h52108 https://github.com/aaron-xie/h52108.git

                    # ssh: 速度快，但需要配置公钥才可使用（虽然比较麻烦，但推荐这种方式）
                    git remote add origin git@github.com:aaron-xie/h52108.git

                    # 查看远程仓库
                    git remote -v
                ```
        3. 推送：把本地仓库代码推送到远程仓库
            > git push <远程仓库名> <分支名>
            ```bash
                git push h52108 master
            ```
        4. 拉取：把远程仓库的代码拉去到本地仓库
            > git pull <远程仓库名> <分支名>
            > git pull = git fetch（拉取） + git merge（合并）
            ```bash
                git pull h52108 master
            ```

    * 克隆仓库
        > git clone <远程仓库地址>
        * 克隆仓库 = 创建+关联

* 开源
* git 常用命令
    * git add 
    * git commit 
    * git push 
    * git pull
    * git status

* 版本管理
    > 每一次的`git commit`都是一个版本，可以通过`git log`命令查看所有的提交版本
    * 版本回退：
        > 命令：`git reset`
        * 参数
            * --hard:工作区、暂存区、版本库的文件同时回退
            * --mixed（默认）：暂存区、版本库的文件回退
            * --soft：仅仅回退版本库中的文件
       
    * 常用命令
        * 查看提交日志（版本记录）: `git log`

        * 查看命令历史: `git reflog`  
        * 文件对比：`git diff <文件>`
            > 对比工作区与版本库的代码差异
    * 应用
         * 撤销工作区文件：`git reset HEAD --hard`
         * 撤销（删除）暂存区文件：
            * `git reset HEAD <file>`：撤销暂存区的修改
            * `git rm --cache <file>`：撤销暂存区的修改

* 分支
    * 主分支（默认分支）：master/main
        > 创建仓库时自动创建
    * 创建分支：`git branch <分支名>`
    * 查看分支：`git branch`
    * 切换分支：`git checkout <分支名>`

* 代码冲突
    > 多人修改同一文件，合并时可能出现冲突
    * 必须**解决冲突**并**提交**才能完成合并操作


### 练习
* 熟悉git命令
* 找一个网站，为下周项目做准备