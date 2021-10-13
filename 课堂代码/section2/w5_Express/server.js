const express = require('express')
const app = express();

const router = require('./router')

const static = express.static('./public');
app.use(static);

// 数据接口
// /api
app.use('/api',router)

// 根据用户使用的设备响应不同的内容
app.get('/home',(req,res)=>{
    const userAgent = req.get('User-Agent')
    if(/windows/i.test(userAgent)){
        res.send('PC端')
    }else if(/Android|Iphone/i.test(userAgent)){
        res.send('移动端');
    }
})

// 监听端口
app.listen(2108,function(){
    console.log('server is runing')

})