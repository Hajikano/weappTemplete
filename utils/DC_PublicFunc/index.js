//判断是否对小程序授权
function DC_IsAuthorize(callback) {
    wx.getSetting({
        success(res) {
            let isAuthorize = res.authSetting["scope.userInfo"];
            callback(isAuthorize);
        }
    });
}

//获取胶囊和设备信息
function DC_SystemInfo() {
    //小程序右上角胶囊高度
    this.navButton = (()=>{
        let menuButtonInfo = wx.getMenuButtonBoundingClientRect();
        let navButton = {
            top: menuButtonInfo.top,
            left: menuButtonInfo.left,
            height: menuButtonInfo.height,
            width: menuButtonInfo.width
        };
        return navButton;
    })();
    //系统相关信息
    this.system = (()=>{
        let info = wx.getSystemInfoSync();
        let system = {
            isIOS: (info.system.search('iOS') === 0),
            width: info.screenWidth,
            height: info.screenHeight
        }
        return system;
    })();
}

module.exports = {
    DC_IsAuthorize,DC_SystemInfo
}