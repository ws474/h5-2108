[TOC]
# MySQL

## 什么是数据库
数据库（Database）是按照数据结构来组织、存储和管理数据的仓库

### 热门数据库
* Oracle
* SQLServer
* MySQL
* MongoDB
* SQLite
* access
* DB2
* ...


### 基本概念
* 数据库：Database
* 表：Table
* 数据：Row

> 一个数据库通常包含一个或多个表，一个数据表有一个唯一名称，并有行和列组成。每行代表一条数据，第列代表一条数据有哪些字段

![数据库与表](img/img1.png "数据库与表")

* 表结构
    <table>
        <thead>
            <tr>
                <th>身份ID</th>
                <th>姓名</th>
                <th>性别</th>
                <th>年龄</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>刘备</td>
                <td>男</td>
                <td>40</td>
            </tr>
            <tr>
                <td>2</td>
                <td>关羽</td>
                <td>男</td>
                <td>36</td>
            </tr>
            <tr>
                <td>3</td>
                <td>貂蝉</td>
                <td>女</td>
                <td>18</td>
            </tr>
            <tr>
                <td>4</td>
                <td>张飞</td>
                <td>男</td>
                <td>30</td>
            </tr>
        </tbody>
    </table>




## MySql的特点: 
> MySql是目前最流行的关系型数据库管理系统，由瑞典MySQL AB公司开发，目前属于Oracle公司

* MySQL是开源的，免费。
* MySQL支持标准的SQL数据语句
* MySQL可以允许于多个系统上，并且支持多种语言。这些编程语言包括C、C++、Python、Java、Perl、PHP、Eiffel、NodeJS、Ruby和Tcl等。
* MySQL对PHP有很好的支持，PHP是目前最流行的Web开发语言。
* MySQL支持大型数据库，支持5000万条记录的数据仓库，32位系统表文件最大可支持4GB，64位系统支持最大的表文件为8TB。

## 下载与安装

### 下载
https://dev.mysql.com/downloads/file/?id=476233

### 安装
1. 初始化：`mysqld --initialize --console`
    > 该操作会生成初始密码，需要记住这个密码，后续登录需要用到
2. 安装服务：`mysqld --install [服务名]`
    > 服务名默认 MySQL，可自定义服务名
3. 添加环境变量
    > 将解压文件夹下的bin路径添加到变量值中
### 更改密码
1. 连接mysql：`mysql -u root -p`
    > 需要输入初始密码
2. 修改密码
    > 壳密码需要使用引号
    ```bash
        # 分号必须填写，这是mysql的语法
        ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密码'; 
    ```

## 数据库操作

### 命令行操作(了解)

* 显示所有数据库：`show databases;`

* 创建数据库`create database <数据库名>;`

* 使用数据库`use <数据库名>;`

* 显示当前数据库所有表`show tables;`

* 创建数据表`create table <表名> (<字段名1> <类型1> [,..<字段名n> <类型n>]);`
    ```sql
        create table if not exists MyGuests (
        id int(6) unsigned auto_increment primary key, 
        firstname varchar(30) not null,
        lastname varchar(30) not null,
        email varchar(50),
        reg_date timestamp
        );
        -- 以上创建一个名为 "MyGuests" 的表，包含5个列： "id", "firstname", "lastname", "email" 和 "reg_date"，参数如下
    ```
    - 数据类型: 
        + INT(整型), 
        + FLOAT(浮点), 
        + CHAR(固定长度字符串), 
        + VARCHAR(可变长度字符串), 
        + BLOB(二进制), 
        + TEXT(字符串)
        + TIMESTAMP(时间戳)
    - 列的其他属性
        + `NOT NULL/NULL` - 指定该列是否允许为空，默认为NULL。
        + `DEFAULT default_value` - 设置默认值
            > 如果没有为列指定`default_value`，MySQL自动地分配一个
        + `UNSIGNED` - 使用无符号数值类型，0 及正数
        + `AUTO_INCREMENT` - 设置该列有自增属性，在新增记录时每次自动增长1
            > 只有整型列才能设置此属性
        + `PRIMARY KEY` - 设置数据表中每条记录的唯一标识。 通常列的 PRIMARY KEY 设置为 ID 数值，与 AUTO_INCREMENT 一起使用。
            > 一个表只有一个PRIMARY KEY
        * `UNIQUE`：在UNIQUE索引中，所有的值必须互不相同。如果您在添加新行时使用的关键字与原有行的关键字相同，则会出现错误。

* 删除表：`drop table <表名>;`
    ```sql
        drop table MyGuests;
        drop table if exists MyGuests
    ```

* 查询表结构：`desc MyGuests`

* 修改表名：`rename table MyClass to YouClass;`

* 增加字段：`alter table MyGuests add sku_id bigint(20) unsigned DEFAULT NULL COMMENT '商品销售码';`

* 复制表结构：`create table table1 like table;`

### 可视化工具Navicat操作
* 数据库创建
* 表创建
* 数据导入
    - json
    - excel
* 数据导出
* 增删查改（CRUD）


### 数据CRUD：编写sql语句（重点）
* 增：插入数据
    > 格式：`insert into <表名> [(<字段名1>[,..<字段名n > ])] values ( 值1 )[, (值n )];`

    ```sql
        --插入单条数据
        insert into MyGuests (username, password, email)
        values ('John', '123456', 'john@example.com')

        --插入多条数据
        insert into MyGuests (username, password, email)
        values ('John', '123456', 'john@example.com'),
        ('laoxie', '123456', 'laoxie@example.com'),
        ('tt', '123456', 'tt@example.com');
    ```

* 删：删除表数据
    > 格式：`delete from <表名> where 条件`

    ```sql
        --删除MyGuests表中id为1的数据
        DELETE FROM MyGuests where id=1;

        --删除所有数据
        DELETE FROM MyGuests

    ```
* 改：修改表中的数据。
    > 格式：`update <表名> set 字段=新值,… where 条件`
    ```sql
        update MyGuests set name='Mary' where id=1;
    ```

* 查：查询表中的数据
    > 格式： `select <字段1, 字段2, ...> from <表名> where < 表达式 >`

    ```sql
        --查看表 MyGuests 中所有数据
        select * from MyGuests;

        --查看表 MyGuests 中前10行数据：
        select * from MyGuests order by id limit 0,10;
    ```
    > select一般配合where使用，以查询更精确更复杂的数据。

### 联表查询：
* 外键：在当前表中保存其它表的某个信息（如：id），以达到关联其它表的信息的字段
    > 需要需要通过外键联表查询才能获取它的详细信息
    > 如当前表为购物车（cart表），cart中的数据只保存了商品的id，但显示购物车需要该商品的所有信息（保存在goods表中），故在查询购物车时需要联表查询goods中的数据
* 查询类型
    * 关联查询（了解）
    * `inner join`：内连接
        > 在两张表进行连接查询时，只保留两张表中完全匹配的结果集
    * `left join`：左连接
        > 在两张表进行连接查询时，会返回左表所有的行，即使在右表中没有匹配的记录
    * `right join`：右连接
        > 在两张表进行连接查询时，会返回右表所有的行，即使在左表中没有匹配的记录
    * `full join`：全连接
        > 在两张表进行连接查询时，返回左表和右表中所有行，不管有没有匹配到
    
    * 应用：查询购物车中用户id为123的所有商品信息
    ```sql
        -- 关联查询
        select * from cart,goods 
        where cart.userid=123 and goods.id in cart.goodslist

        -- inner join
        select * from cart
        inner join goods
        on goods.id in cart.goodslist
        where cart.userid=123
    ```

* WHERE条件控制语句
    * 比较运算符：`=、>、<、<>、!=`
        ```sql
            SELECT * FROM tb_name WHERE id=3
            SELECT * FROM tb_name WHERE id<>3
        ```
    * 逻辑运算符: `AND、OR、NOT`
    * 模糊查询:`LIKE`     
        * `%`  匹配任意、 
        * `_`  匹配一个字符（可以是汉字）
    - 范围查询： 
        * `IN(1,2,3......)`
        * `BETWEEN a AND b`
    * 空值检测: 
        * IS NULL
        * IS NOT NULL
    - 数量控制：`LIMIT idx,qty`
        ```sql
            SELECT * FROM goods LIMIT 2,5
        ```
    - 排序: `ORDER BY`
        - asc 升序（默认）
        - desc 降序


## 在Nodejs中使用mySQL
* 安装mysql模块
```bash
    npm install mysql
```

* 连接数据库
    * 使用连接对象方式
    ```js
        var mysql = require('mysql');

        //创建连接对象，并配置参数
        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'edusys'
        });
        
        // 连接数据库
        connection.connect();
        
        // 查询数据库
        connection.query('select * from student', function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
        });
        
        // 关闭连接,释放资源
        connection.end();
    ```

    * 使用连接池方式（官方是推荐）
    >使用连接池，默认会在连接池中创建10个连接对象（connectionLimit），使用完成自动放回连接池，不需要手动关闭

    ```javascript
        var mysql = require('mysql');

        //创建连接池
        var pool  = mysql.createPool({
            host     : 'localhost',
            user     : 'root',
            password : '',
            port: 3306,
            database: 'edusys',
            multipleStatements: true
        });

        pool.query('select * from student', function(error, rows){
            console.log(rows);
        });
    ```

    * 封装模块
    ```js
        // 配置参数
        // ...
        module.exports = {
            query: sql=>{
                return new Promise((resolve,reject)=>{
                    pool.query(sql, function(err, rows){
                        if(err) return reject(err);
                        resolve(rows);
                    });
                })
            }
        }
    ```
