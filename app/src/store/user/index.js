import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo, reqLogout } from "@/api"
import { setToken,getToken,removeToken } from "@/utils/token"
// 登录与注册合成一个模块
const state = {
    code: '',
    token:getToken(),
    userInfo:{},
}
const mutations = {
    GETCODE(state,code) {
        state.code = code
    },
    USERLOGIN(state,token) {
        state.token = token
    },
    GETUSERINFO(state,userInfo) {
        state.userInfo = userInfo
    },
    // 清除本地数据
    CLEAR(state) {
        // 清除仓库信息
        state.token = ''
        state.userInfo = {}
        // 清除本地存储信息
        removeToken()
    }
}
const actions = {
     //获取验证码
    async getCode({commit},phone) {
        let result = await reqGetCode(phone)
        if(result.code==200){
            commit('GETCODE',result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
     },
     //用户注册 
     async userRegister({commit},user) {
           let result = await reqUserRegister(user)
        //    console.log(result)
           if(result.code == 200) {
            return 'ok'
           } else {
            return Promise.reject(new Error('fail'))
           }
     },
    //登录业务
    async userLogin({commit},data) {
        let result = await reqUserLogin(data)
        console.log(result)
        if (result.code == 200) {
            // 用户已经登录成功且获取到token
            commit('USERLOGIN', result.data.token)
            //以后开发的时候:经常的登录的成功获取token【持久化存储】
            setToken(result.data.token)
            return 'ok';
       } else {
            //登录失败
            return Promise.reject(new Error('fail'));
       }
    },
    // 获取用户信息
    async getUserInfo({commit,state,dispatch}) {
        let result = await reqUserInfo()
        // console.log(result)
        if(result.code==200) {
            commit('GETUSERINFO',result.data)    
            return 'ok'   
        } else {
            return Promise.reject(error).catch(err=>{console.log(err)})
        }
    },
    // 退出登录
    async userLogout({commit}) {
        // 只是向服务器发起一次请求，通知服务器清除token（但是本地存储的token和用户信息还未清除）
        let result = await reqLogout()
        // 注：action里不能操作state,要提交mutation修改state（清除本地数据）
        if(result.code==200){
            commit('CLEAR')
            return 'ok'
        } else {
          return Promise.reject(new Error('fail'))
        }
    }
}
const getters = {}
export default{
    state,
    mutations,
    actions,
    getters
}