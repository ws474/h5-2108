const mysql = require('mysql')

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

// 回调函数写法
// module.exports = function(sql,callback){
//     pool.query(sql,(err,rows)=>{
        // if(err){
        //     throw err;
        // }
//         callback(rows)
//     })
// }
module.exports = function(sql){
    
    return new Promise((resolve,reject)=>{
        pool.query(sql,(err,rows)=>{
            if(err){
                reject(err)
            }
            resolve(rows)
        })

    })
}