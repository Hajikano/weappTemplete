import { DC_Page } from "/utils/DC_Page/index";
import { DC_Router } from "/utils/DC_Router/index";
import { DC_Compontent, SizeMap, ColorSet } from "/utils/DC_Compontent/index";
import { DC_Request } from "/utils/DC_Request/index";
import { DC_Store } from "/utils/DC_Store/index";
import { DC_IsAuthorize, DC_SystemInfo, DC_NavigateTo, DC_Loading, DC_SetNavBarColor } from "/utils/DC_PublicFunc/index";

// https://test.kawaiixm.com
const domain = "https://test.kawaiixm.com";
const iDC_Request = new DC_Request({
    domain: domain,
});

// 为页面构造函数原型绑定router实例
const iDC_Router = new DC_Router();
DC_Page.prototype._router = iDC_Router;

const iDC_SystemInfo = new DC_SystemInfo();
const iDC_Store = new DC_Store();
const iDC_NavigateTo = new DC_NavigateTo();
const iDC_Loading = new DC_Loading();

// 添加请求拦截方法
iDC_Request.interceptors.requestFunction = (options) => {
    if (iDC_Store.state.token !== undefined) {
        options.header.Authorization = iDC_Store.state.token;
    }
    return options;
};
// 添加响应拦截方法
iDC_Request.interceptors.responseFunction = (res) => {
    let returnRes;
    return returnRes;
};

App({
    onLaunch: function () {},
    publicData: {
        systemInfo: "v1.1.0a",
        SizeMap: SizeMap,
        ColorSet: ColorSet,
        domain: domain,
        navBarHeight: iDC_SystemInfo.navButton.top + iDC_SystemInfo.navButton.height + 10,
    },
    iDC_Request: iDC_Request,
    iDC_SystemInfo: iDC_SystemInfo,
    iDC_Store: iDC_Store,
    iDC_Router: iDC_Router,
    iDC_NavigateTo: iDC_NavigateTo,
    iDC_Loading: iDC_Loading,
    fDC_IsAuthorize: DC_IsAuthorize,
    fDC_setNavBarColor: DC_SetNavBarColor,
    DC_Utils: { DC_Compontent, DC_Page }, // 为了防止原型链被破坏 此处将两个类定义在一个对象内
});
