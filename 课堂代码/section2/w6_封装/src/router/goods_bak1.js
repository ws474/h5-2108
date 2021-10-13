const express = require('express')

const mysql = require('mysql')
// 连接方式一：创建连接对象，并配置参数
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'h52108'
});


// 连接方式二：创建连接池（默认创建10个连接对象放入连接池中）
const pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    // port: 3306,
    database: 'h52108',

    // 允许每个mysql语句有多条查询（默认false）.使用它时要非常注意，因为它很容易引起sql注入攻击
    // multipleStatements: true
});

const router = express.Router();
module.exports = router;

// 编写接口需要符合RESTful规范

// get /api/goods/list
router.get('/list',(req,res)=>{
    // 查询数据库商品，并把查询结果响应到前端
    const sql = `select * from goods`

    // // 连接数据库
    // connection.connect();
    // connection.query(sql, function (error, results, fields) {
    //     if (error) throw error;
    //     console.log('The solution is: ', results);
    //     res.send(results)
    //     // 关闭连接,释放资源
    //     connection.end();
    // })

    pool.query(sql,(err,rows)=>{
        res.send(rows)
    })

})

router.get('/:id',(req,res)=>{
    const {id} = req.params;
    // 根据id查询数据库商品，并把查询结果响应到前端
    const sql = `select * from goods where id=${id}`
    // // 连接数据库
    // connection.connect();
    // console.log('sql=',sql)
    // connection.query(sql, function (error, results, fields) {
    //     if (error) throw error;
    //     console.log('The solution is: ', results);
    //     res.send(results[0])
    //     // 关闭连接,释放资源
    //     connection.end();
    // })

    pool.query(sql,(err,rows)=>{
        res.send(rows[0])
    })
})