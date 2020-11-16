const app = getApp();
const DC_Compontent = app.DC_Utils.DC_Compontent;

const PageObj = new app.DC_Utils.DC_Page({
    _isCompontent: true,
    created() {},
    properties: {
        // 是否存在NavBar 存在NavBar将会动态调整容器高度
        isNavBar: {
            type: Boolean,
            value: true,
        },
        // 容器的背景色
        bgColor: {
            type: String,
            value: "#f7f7f7",
        },
    },
    methods: {},
});

const DC_Layout = new DC_Compontent({
    _name: "DC_Layout",
    style: {
        space: {
            height: `${app.publicData.navBarHeight}px`,
        },
    },
    methods: {},
}).frame(
    "100%",
    `${app.iDC_SystemInfo.system.height - app.publicData.navBarHeight}px`
);
PageObj.use(DC_Layout);

Component(PageObj);
