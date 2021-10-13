const express = require('express')
const db = require('../db')

const router = express.Router();
module.exports = router;

// 编写接口需要符合RESTful规范

// get /api/goods/list
router.get('/list',async (req,res)=>{
    const {page=1,size=10,order,category} = req.query;
    // 计算索引值
    const idx = (page-1)*size
    const qty = Number(size)

    // 查询数据库商品，并把查询结果响应到前端
    let sql = `select * from goods`

    if(category){
        sql += ` where category='${category}'`
    }

    if(order){
        // 0: asc   升序
        // 1: desc  降序
        // 'price','price,0','price,1'
        let [key,type=0] = order.split(',')

        sql += ` order by ${key}`
        if(type == 1){
            sql += ` desc`
        }
    }

    sql += ` limit ${idx},${qty}`
    

   const data = await db(sql)
    res.send({
        code:200,
        data,
        msg:'success'
    })
})

// get /api/goods/1,/api/goods/2
router.get('/:id',async (req,res)=>{
    const {id} = req.params;
    // 根据id查询数据库商品，并把查询结果响应到前端
    const sql = `select * from goods where _id='${id}'`
    console.log('sql=',sql)
    const data = await db(sql)
    res.send({
        code:200,
        data:data[0],
        msg:'success'
    })
})