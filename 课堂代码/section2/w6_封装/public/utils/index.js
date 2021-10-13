// @Cookie操作：增删改查
class Cookie {
    // 初始化
    constructor() {
        // cookie -> object
        const cookies = document.cookie.split('; ');// 'username=laoxie; password=123456;'

        // {username:'laoxie',password:123456}
        const data = {}
        cookies.forEach(item => {
            const [key, value] = item.split('=')
            data[key] = value;
        })

        this.data = data;
    }

    // 方法

    // 获取cookie
    get(key) {
        return this.data[key]
    }

    // 设置cookie
    set(key, value, options = {}) {
        this.data[key] = value;

        // 处理参数
        const params = [];// ['express=2021/10/1 00:00:00','path=/']
        for (let key in options) {
            params.push(`${key}=${options[key]}`)
        }

        document.cookie = `${key}=${value}` + (params.length > 0 ? `;` + params.join(';') : '')
    }

    // 删除cookie
    remove(key){
        const date = new Date()
        date.setDate(date.getDate()-10);
        
        this.set(key,null,{expires:date})

        delete this.data[key];
    }

    // 清空
    clear(){
        for(let key in this.data){
            this.remove(key)
        }
    }
}


// const cookie = new Cookie()
// cookie.get('username')
// cookie.set('username', 'laoxie');// session
// cookie.set('username', 'laoxie', { expires: '', path: '/', });// session
// cookie.remove('username')
// cookie.clear()
// cookie.data.username


/** 
 * @节点操作：
    * 获取
    * 操作
    * 事件绑定
    * ...
 */ 

class Query{
    constructor(selector){
        this.el = document.querySelectorAll(selector)
    }

    // 事件绑定
    on(type,handle){
        this.el.forEach(item=>{
            item['on'+type] = handle
        })

        return this;
    }

    // 添加类名
    addClass(className){
        this.el.forEach(item=>{
            item.classList.add(className)
        })
        return this
    }
    removeClass(className){
        this.el.forEach(item=>{
            item.classList.remove(className)
        })

        return this;
    }

    // 添加很多节点操作方法
    animate(){
        return this;
    }
    eq(){
        return this;
    }
    first(){
        return this;
    }
    last(){
        return this;
    }
}

const $ = function(selector){
    return new Query(selector)
}


// const btns = new Query('button');
// const btns = $('button')
// btns.removeClass()

// btns.addClass('btn')
// const goodslist = document.querySelector('#goodslist')
// goodslist.classList.add('box')
// $('#goodslist').addClass('box')