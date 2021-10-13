const express = require('express')

// express.Router() 创建一个路由中间件
const router = express.Router()
module.exports = router;


// 模拟商品数据
let goodslist = []
const prices = [198,298,98,59,9.9,100,99,50,28,36]
for(let i=0;i<20;i++){
    const id = i+1;
    const goods = {
        id,
        name:`goods${id}`,
        price:prices[parseInt(Math.random()*prices.length)],
        imgurl:`img/goods${id}.jpg`
    }
    goodslist.push(goods)
}

// 商品列表: /api/goods/list
router.get('/list',function(req,res){
    res.send(goodslist)
})

// @商品CRUD
// get /goods 单个商品信息
router.get('/',function(req,res){
    // url参数接收：req.query
    const {id} = req.query;

    // goodslist=[{id},{id},{id}]
    // const goods = goodslist.filter(function(item){
    //     return item.id == id
    // })[0]
    const goods = goodslist.find(function(item){
        return item.id == id
    })
    res.send(goods)
})
// post 添加商品
router.post('/',function(req,res){
    console.log('req.body',req.body)
    res.send('添加商品')
})
// delete '/api/goods' '/api/goods/1',/api/goods/2 删除商品
router.delete('/:id',function(req,res){
    // 动态路由：路由地址为变量，只要访问路径匹配格式，就能进入该路由，?表示该变量可选('/:id/:arg?')
    // 动态路由接收：req.params
    const {id} = req.params;

    // id=2, [{id:1},{id:2},{id:3}] -> [{id:1},{id:3}]
    goodslist = goodslist.filter(item=>{
        return item.id !=id
    })
    res.send(`商品${id} 已删除`)
})


// put 修改商品信息
router.put('/',function(req,res){
    res.send('修改商品')
})