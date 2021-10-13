/** 
 * http服务器
    * 依赖模块
        * http
 */

// 引入http模块（内置模块）
const http = require('http');
// console.log('http',http);

// 创建http服务器
const server = http.createServer(function(request,response){
    // request: 请求对象，包含客户端发来的信息
    // response: 响应对象，用于给客户端发送信息
    // console.log('request',request)
    // console.log('response',response)

    // 告诉客户端服务器使用的编码
    response.writeHead(200,{
        // content-type: 设置响应内容与字符集
        'Content-Type':'text/html;charset=utf8'
    })

    // 前后端发送数据格式：字符串或二进制数据
    // write()响应内容到客户端
    response.write('<p>hello</p>');

    // end()方法响应并结束，用于告诉客户端，服务器响应完毕
    response.end('小甜甜')

    // 与客户端断开后不能继续发送内容
    // response.write('hey')
})

// 绑定端口: 2^16
// 虽然端口范围在0-2^16之间，但建议使用时端口不要小于1000
server.listen(2108,function(){
    // 这里的代码在服务器启动后执行
    console.log('服务器已启动')
})

// 连接服务器
// * 协议：http
// * 地址：ip地址/localhost/127.0.0.1
// * 端口：
