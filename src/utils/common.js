// 将时间戳格式化 deepSeek写的
export function formatTimeDifference(timestamp) {
    const now = Date.now()
    const diffInMilliseconds = now - timestamp
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000)
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    const diffInHours = Math.floor(diffInMinutes / 60)
    const diffInDays = Math.floor(diffInHours / 24)
    const diffInMonths = Math.floor(diffInDays / 30)

    if (diffInSeconds < 60) {
        return '1分钟'
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes}分钟`
    } else if (diffInHours < 24) {
        return `${diffInHours}小时`
    } else if (diffInDays < 30) {
        return `${diffInDays}天`
    } else if (diffInMonths <= 3) {
        return `${diffInMonths}个月`
    } else {
        return '很久之'
    }
}
export function gotoHome() {
    uni.showModal({
        title: '提示',
        content: '页面有误，将返回首页',
        showCancel: false,
        success: (res) => {
            if (res.confirm) {
                uni.reLaunch({
                    url: '/pages/index/index'
                })
            }
        }
    })
}