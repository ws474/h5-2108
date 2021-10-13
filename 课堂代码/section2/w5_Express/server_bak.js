const express = require('express')


// 创建一个服务器
const app = express();

// 把当前目录下的public目录下创建静态资源服务器
// express.static()为静态资源服务器中间件，如果没有匹配的静态资源则自动next()，否则返回静态资源
const static = express.static('./public');console.log('static=',static)
app.use(static);

// 中间件的使用：app.use([path],m1,m2,...)
// 不带路径的中间件，任何请求都可进入，注意是否需要next()
app.use(
    // 中间件1
    function(req,res,next){
        console.log('m1')
        
        next()
    },
    // 中间件2
    function(req,res,next){
        console.log('m2')
        next();
    }
)
app.use(function(req,res,next){
    console.log('m3')
    // res.write('hello m3')
    next();
})

// 带路径的中间件
// 只有路径匹配才会进入中间件，一般不需要next()
app.use('/api',function(req,res,next){
    console.log('api');
    res.send('api')
    next()
})
app.use('/login',function(req,res){
    console.log('login');
    res.send('login')
})
app.use('/res',function(req,res){
    console.log('reg');
    res.send('reg')
})


// 利用RESTful规范编写接口

// get 商品列表
app.get('/goodslist',function(req,res){
    // send() = req.write()+req.end()
    res.send([
        {name:'goods1',price:998},
        {name:'goods2',price:3998},
        {name:'goods3',price:1998},
    ])
})

// @商品CRUD
// get 单个商品信息
app.get('/goods',function(req,res){
    // send() = req.write()+req.end()
    res.send({name:'goods1',price:998})
})
// post 添加商品
app.post('/goods',function(req,res){
    res.send('添加商品')
})
// delete 删除商品
app.delete('/goods',function(req,res){
    res.send('删除商品')
})

// put 修改商品信息
app.put('/goods',function(req,res){
    res.send('修改商品')
})

// @用户CRUD
app.post('/user',function(req,res){
    res.send('添加用户')
})
app.delete('/user',function(req,res){
    res.send('删除用户')
})
app.put('/user',function(req,res){
    res.send('修改用户')
})
app.get('/user',function(req,res){
    res.send('查询用户')
})



// 监听端口
app.listen(2108,function(){
    console.log('server is runing')
})