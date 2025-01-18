import { request } from "../utils/request"

// const request = (config) => {
//   console.log("Request URL:", config.url)
//   console.log("Request Headers:", config.header)

//   return uni.request({
//     ...config,
//     fail: (error) => {
//       console.error("Request failed:", error)
//       return Promise.reject(error)
//     },
//   })
// }

export const getNoticeListAPI = (data = {}) => {
  return request({ url: "/wallNewsList", data })
}
export const getBannerAPI = () => {
  return request({
    url: "/homeBanner",
  })
}
export const dayRandomListAPI = async () => {
  return await request({ url: "/randomWall" })
}
export const getClassifyListAPI = (data = {}) => {
  return request({ url: "/classify", data })
}
export const getClassListAPI = (data) => {
  return request({ url: "/wallList", data })
}
export const setupScoreAPI = (data) => {
  return request({ url: "/setupScore", data })
}
// 获取用户信息
export const getUserInfoAPI = (data) => {
  return request({ url: "/userInfo", data })
}
export const getHistoryListAPI = (data) => {
  return request({ url: "/userWallList", data })
}
// 获取公告
export const getNoticeDetailAPI = (data) => {
  return request({ url: "/wallNewsDetail", data })
}
// 获取搜索结果
export const getSearchDataAPI = (data) => {
  return request({
    url: '/searchWall',
    data
  })
}