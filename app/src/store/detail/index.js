import { reqGoodsInfo,reqAddOrUpdateShopCart } from "@/api"
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodsInfo:{},
    // 游客临时身份
    uuid_token:getUUID( )
}
const mutations = {
    GETGOODSINFO(state,goodsInfo) {
         state.goodsInfo = goodsInfo
    } 
}
const actions = {
    // 获取产品信息
    async getGoodsInfo({commit},skuId) {
        let result = await reqGoodsInfo(skuId)
        if(result.code == 200) {
             commit("GETGOODSINFO",result.data)
        }
    },
    async addOrUpdateShopCart({commit},{skuId,skuNum}) {
       let result = await reqAddOrUpdateShopCart(skuId,skuNum)
    // 因为有async所以这个函数返回的是promise
       if(result.code==200) {
        return 'ok'
       }else {
        return Promise.reject(new Error('false'))
       }
    },
}
const getters = {
    categoryView(state) {
       return state.goodsInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || []
    }
}
export default{
    state,
    actions,
    mutations,
    getters
}