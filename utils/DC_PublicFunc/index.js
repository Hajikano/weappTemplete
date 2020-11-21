// 判断是否对小程序授权
function DC_IsAuthorize(callback) {
    wx.getSetting({
        success(res) {
            let isAuthorize = res.authSetting["scope.userInfo"];
            callback(isAuthorize);
        },
    });
}

// 获取胶囊和设备信息
function DC_SystemInfo() {
    //小程序右上角胶囊高度
    this.navButton = (() => {
        let menuButtonInfo = wx.getMenuButtonBoundingClientRect();
        let navButton = {
            top: menuButtonInfo.top,
            left: menuButtonInfo.left,
            height: menuButtonInfo.height,
            width: menuButtonInfo.width,
        };
        return navButton;
    })();
    //系统相关信息
    this.system = (() => {
        let info = wx.getSystemInfoSync();
        let system = {
            isIOS: info.system.search("iOS") === 0,
            width: info.screenWidth,
            height: info.screenHeight,
        };
        return system;
    })();
}

// 封装后的路由类
function DC_NavigateTo() {
    // 暂时仅支持扁平化的页面路由
    // 每个页面的各文件名均须为index
    this.replace = (path) => {
        wx.redirectTo({
            url: `/pages/${path}/index`,
        });
    };
    this.push = (path, params = []) => {
        let url = `/pages/${path}/index`;
        if (params.length > 0) {
            url += "?";
            for (let i of params) {
                url += `${i.key}=${i.value}&`;
            }
        }
        wx.navigateTo({
            url: url,
        });
    };
    this.pop = (index = 1) => {
        wx.navigateBack({
            delta: index,
        });
    };
    //获取当前页面栈层数
    this.getIndex = () => {
        return getCurrentPages().length;
    };
    //出栈至首页
    this.backToIndex = () => {
        this.pop(getCurrentPages().length - 1);
    };
    //获取当前栈名
    this.getCurrentPageName = () => {
        let length = getCurrentPages().length;
        return getCurrentPages()[length - 1];
    };
}

function DC_Loading() {
    this.show = (title = "加载中",callback=()=>{}) => {
        wx.showLoading({
            title: title,
            mask: true,
        });
        callback();
    };
    this.clear = (callback=()=>{}) => {
        wx.hideLoading();
        callback();
    };
}

function DC_SetNavBarColor(mode = "#000000") {
    wx.setNavigationBarColor({
        frontColor: mode,
        backgroundColor: mode,
    });
}

module.exports = {
    DC_IsAuthorize,
    DC_SystemInfo,
    DC_NavigateTo,
    DC_Loading,
    DC_SetNavBarColor,
};
