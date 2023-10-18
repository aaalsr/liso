// 引入mockjs模块
import Mock from 'mockjs'
// 引入JSON数据格式(可以直接引入因为,webpack默认对外暴露的有图片和JSON数据格式)
import banner from './banner.json'
import floor from './floor.json'

// mock数据：第一个参数请求地址 第二个参数：请求数据
Mock.mock('/mock/banner',{code:200,data:banner}) //模拟首页轮播图数据
Mock.mock('/mock/floor',{code:200,data:floor})
