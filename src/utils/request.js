// 根据环境判断使用不同的baseURL
const BASE_URL =
  process.env.UNI_PLATFORM === "WEB"
    ? "/api/bizhi" // H5环境使用相对路径
    : "https://tea.qingnian8.com/api/bizhi" // 其他环境使用完整URL

export const request = async (params) => {
  const { url, data, method } = params

  try {
    const res = await uni.request({
      url: `${BASE_URL}${url}`,
      header: {
        "access-key": "lc66666",
      },
      data: data || {},
      method: method || "GET",
    })
    // 检查响应状态码
    if (res.data.errCode !== 0) {
      throw new Error(`请求失败，状态码: ${res.statusCode}`)
    }
    return res
  } catch (error) {
    console.error("请求出错:", error.message)
    throw error
  }
}
