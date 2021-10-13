const login = document.querySelector('.login')
const logout = document.querySelector('.logout')
const btnLogout = logout.querySelector('a')
const data = JSON.parse(localStorage.getItem('userInfo'))

// 判断是否已登录
// 登录：存在username&password
// null.username,undefined.username
if (data && data.username) {
    login.classList.remove('d-flex')
    login.style.display = 'none';
    logout.style.display = 'block'

    logout.querySelector('span').innerHTML = data.username;
} else {
    logout.classList.remove('d-flex');
}

// 退出登录
btnLogout.onclick = () => {
    // 删除本地存储：userInfo
    localStorage.removeItem('userInfo')
    // 刷新页面
    location.reload();
}

// 添加storage时间
window.addEventListener('storage', function (e) {
    // 该事件只有在其它页面修改localStorage时触发
    console.log(666, e)
    if (e.key === 'userInfo') {
        // 登录
        if (e.newValue && !e.oldValue) {
            login.style.display = 'none';
            logout.style.display = 'block'
            const userInfo = JSON.parse(e.newValue)
            logout.querySelector('span').innerHTML = userInfo.username;
        }
        // 退出
        else if (!e.newValue && e.oldValue) {
            login.style.display = 'block';
            logout.classList.remove('d-flex');
            logout.style.display = 'none'
        }
    }
}, false);