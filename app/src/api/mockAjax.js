// 对于axios进行二次封装
import axios from "axios"
// 引入进度条样式
import nprogress from "nprogress"
// console.log(nprogress);根本打印不出来，而且一直存在不支持MIME type的问题
import "nprogress/nprogress.css"

// 1.利用axios对象的方法create，去创建一个axios实例
// 2.request(没看懂老师写的不应该是requests吗)就是axios，只不过稍微配置一下
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求时路径中会出现api
    baseURL:"/mock",
    // 代表请求超时的时间5s
    timeout:5000
})
// 请求拦截器：发请求之前，请求拦截器可以检测到，可以在请求发出去前做一些事
requests.interceptors.request.use((config)=>{
    // config:配置对象，对象里面有一个属性很重要，headers请求头
    // 开启进度条
    nprogress.start()
    return config
})

// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
    // 响应失败，关闭进度条
    nprogress.done()
    return res.data
},(error)=>{
    // 响应失败的回调函数
    // console.log("响应失败"+error)
    return Promise.reject(new Error('fail'))
})
// 对外暴露
export default requests
