/**
 * 静态资源服务器
    * 依赖模块
        * http  
        * fs    文件操作模块
 */
const http = require('http');
const fs = require('fs')
const path = require('path')
const mime = require('./mime')

http.createServer((req,res)=>{
    // 每一次请求，都会进入这里，执行这里的代码
    // 根据用户访问的地址，读取相应的文件内容，并响应给前端

    const {pathname} = new URL('http://laoxie.com'+req.url);console.log('pathname',pathname)
    
    const realPath = path.join(__dirname,pathname)
    
    console.log('req.url=',req.url,pathname)

    // 获取文件后缀名
    const type = path.extname(pathname).slice(1)
    console.log(realPath,type)

    // 读取文件
    fs.readFile(realPath,function(err,content){
        // err: 读取文件失败时的错误信息，默认为null
        // content: 读取文件的内容
        if(err){
            res.writeHead(404,{
                // mime类型: 根据不同的文件响应不同的content-type
                'Content-Type':`text/plain;charset=utf8`
            })
            res.end('文件不存在')
            return;
        }
        res.writeHead(200,{
            // mime类型: 根据不同的文件响应不同的content-type
            'Content-Type':`${mime[type]};charset=utf8`
        })
        res.end(content)
    })
}).listen(2108,()=>{
    console.log('server is running')
})