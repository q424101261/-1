// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数，把原js中所有根!路径删除
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    //统一为有权限的接口，设置headers请求头 
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || '',
        }
    };
    //全局统一挂载complete回调函数
    //判断如果没有登录账号，无论用户采用什么方式进入系统都强制跳转到登录页面login.html,这个函数无论success是否调用成功
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空token
            localStorage.removeItem('token');
            // 2. 强制跳转到登录页面
            location.href = '/login.html';
        }
    }
})
