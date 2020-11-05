import { DC_Page } from "/utils/DC_Page/index";
import { DC_Compontent } from "/utils/DC_Compontent/index";
import { DC_Request } from "/utils/DC_Request/index";
import { DC_Store } from "/utils/DC_Store/index";
import { DC_IsAuthorize, DC_SystemInfo, DC_NavigateTo } from "/utils/DC_PublicFunc/index";

const iDC_Request = new DC_Request({
    domain: "Input your baseURL here.",
});

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
    iDC_Request: iDC_Request,
    iDC_SystemInfo: new DC_SystemInfo(),
    iDC_Store: new DC_Store(),
    iDC_NavigateTo: new DC_NavigateTo(),
    fDC_IsAuthorize: DC_IsAuthorize,
    DC_Utils: { DC_Compontent, DC_Page }, // 为了防止原型链被破坏 此处将两个类定义在一个对象内
});
