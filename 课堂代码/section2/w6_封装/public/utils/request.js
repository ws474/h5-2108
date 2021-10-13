function request(options={}){
    let {url,method='get',data} = options;

    const baseUrl = 'http://localhost:2108/api'

    // if(/^http/.test(url))
    if(!url.startsWith('http')){
        url = baseUrl + url;
    }

    // 'http://localhost:2108/api/login?username=laoxie&password=12345'
    let params = null;
    if(data){
        const arr = []
        //{username:'laoxie,password:123456} -> ['username=laoxie','password=123456']
        for(let key in data){
            arr.push(`${key}=${data[key]}`); 
        }
        params = arr.join('&');

        if(method === 'get'){
            url = url + '?' + params;
            params = null;
        }
    }


    const promise = new Promise(function(resolve,reject){
        const xhr = new XMLHttpRequest();
        xhr.onload = function(){
            let data = JSON.parse(xhr.responseText); // {code,data,msg}
            resolve(data)
        }
        xhr.open(method,url,true);

        // 如通过请求体发送数据，需要添加请求头
        if(['post','put'].includes(method)){
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
        }
        xhr.send(params);
    })

    
    return promise;
} 
// request({
//     url:'/reg',
//     method:'post',
//     data:{
//         username:'laoxie',
//         password:123456
//     }
// })
// request({
//     url:'/login',
//     data:{
//         username:'laoxie',
//         password:123456
//     }
// })

// request.get('/login',{username:'laoxie',password:123})
request.get = function(url,data){
    return request({
        url,
        data
    })
}
request.post = function(url,data){
    return request({
        url,
        method:'post',
        data
    })
}
request.put = function(url,data){
    return request({
        url,
        method:'put',
        data
    })
}
request.delete = function(url,data){
    return request({
        url,
        method:'delete',
        data
    })
}

