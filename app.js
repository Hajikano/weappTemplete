import { DC_Page } from "/utils/DC_Page/index";
import { DC_Compontent, SizeMap, ColorSet } from "/utils/DC_Compontent/index";
import { DC_Request } from "/utils/DC_Request/index";
import { DC_Store } from "/utils/DC_Store/index";
import {
    DC_IsAuthorize,
    DC_SystemInfo,
    DC_NavigateTo,
    DC_Loading,
} from "/utils/DC_PublicFunc/index";

const iDC_Request = new DC_Request({
    domain: "Input your baseURL here.",
});

const iDC_SystemInfo = new DC_SystemInfo();
const iDC_Store = new DC_Store();
const iDC_NavigateTo = new DC_NavigateTo();
const iDC_Loading = new DC_Loading();

//添加请求拦截方法
iDC_Request.interceptors.requestFunction = (options) => {
    return options;
};
//添加响应拦截方法
iDC_Request.interceptors.responseFunction = (res) => {
    return res;
};

App({
    onLaunch: function () {},
    SizeMap: SizeMap,
    ColorSet: ColorSet,
    publicData: {
        SizeMap: SizeMap,
        ColorSet: ColorSet,
        navBarHeight:
            iDC_SystemInfo.navButton.top + iDC_SystemInfo.navButton.height + 10,
    },
    iDC_Request: iDC_Request,
    iDC_SystemInfo: iDC_SystemInfo,
    iDC_Store: iDC_Store,
    iDC_NavigateTo: iDC_NavigateTo,
    iDC_Loading: iDC_Loading,
    fDC_IsAuthorize: DC_IsAuthorize,
    DC_Utils: { DC_Compontent, DC_Page }, // 为了防止原型链被破坏 此处将两个类定义在一个对象内
});
