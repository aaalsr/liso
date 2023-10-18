// serach模块小仓库
import { reqGetSearchInfo } from "@/api"
const state = {
    // 仓库初始状态
    searchList:{}
}
const mutations = {
    GETSEARCHLIST(state,searchList) {
        state.searchList = searchList
    }
}
const actions = {
    // 获取search数据
    async getSearchList({commit},params= {}) {
        let result = await reqGetSearchInfo(params)
        // params形参：是当用户派发action的时候第二个参数传过来的（至少是空对象）
        if(result.code == 200) {
           commit('GETSEARCHLIST',result.data)
        } 
    }
}
// 计算属性为了简化数据
const getters = {
    goodsList(state) {
        // 当前形参state并非大仓库中那个state,没网要返回空数组才行
        return state.searchList.goodsList||[]
    },
    trademarkList(state) {
        return state.searchList.trademarkList
    },
    attrsList(state){
        return state.searchList.attrsList
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}