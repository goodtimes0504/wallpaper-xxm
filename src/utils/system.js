const systemInfo = uni.getSystemInfoSync()
export const getStatusBarHeight = () => systemInfo.statusBarHeight || 15
export const getTitleBarHeight = () => {
    if (uni.getMenuButtonBoundingClientRect) {
        const { top, height } = uni.getMenuButtonBoundingClientRect()
        return (top - getStatusBarHeight()) * 2 + height
    } else {
        return 60
    }
}
export const getNavBarHeight = () => getStatusBarHeight() + getTitleBarHeight()

// 抖音小程序
export const getLeftIconLeft = () => {
    if (typeof tt !== 'undefined' && tt?.getCustomButtonBoundingClientRect) {
        const {
            leftIcon: { left, width },
        } = tt.getCustomButtonBoundingClientRect()
        return left + parseInt(width)
    } else {
        return 0
    }
}
