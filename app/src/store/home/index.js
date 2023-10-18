// home模块小仓库
import { reqCategoryList,reqGetBannerList,reqFloorList } from "@/api"
const state = {
    // state中数据默认值由接口返回值初始化因此不一定是数组不能瞎写
    categoryList: [],
    // 轮播图的数据(根本不是后面错了，仓库没数据才是原因)
    bannerList: [],
    // 注意floor的数据格式（数组）
    floorList: [],
}
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList.slice(0,16)
    },
    BANNERLIST(state,bannerList) {
        state.bannerList = bannerList
    },
    FLOORLIST(state,floorList) {
       state.floorList = floorList
    },
}
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({commit}){
        let result = await reqCategoryList()
        if(result.code==200){
            commit("CATEGORYLIST",result.data)
        }
    },
    // 获取首页轮播图数据
    async getBannerList({commit}) {
        let result = await reqGetBannerList()
        if(result.code === 200) {
            commit('BANNERLIST',result.data)
        }
    },
    // 获取floor数据
    async getFloorList({commit}) {
        let result = await reqFloorList()
        if (result.code === 200) {
            // 提交mutations
            commit('FLOORLIST',result.data)
        }
        
       
    },
}
// 计算属性
const getters = {}
export default {
    // namespaced: true,
    state,
    mutations,
    actions,
    getters 
}