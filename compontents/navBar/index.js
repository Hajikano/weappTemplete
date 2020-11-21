const app = getApp();
const DC_Compontent = app.DC_Utils.DC_Compontent;

const PageObj = new app.DC_Utils.DC_Page({
    _isCompontent: true,
    options: {
        multipleSlots: false,
    },
    properties: {
        bgColor: {
            type: String,
            value: "#FFFFFF",
        },
    },
    methods: {},
});

const NavBar = new DC_Compontent({
    _name: "NavBar",
    style: {
        _: {
            position: "fixed",
            "z-index": 1000,
            top: "0px",
        },
        topSpace: {
            width: "100%",
            height: `${app.iDC_SystemInfo.navButton.top}px`,
        },
    },
})
    .frame("100%", `${app.publicData.navBarHeight}px`)
    .overflow("hidden");
PageObj.use(NavBar);

const NavBar_Container = new DC_Compontent({
    _name: "NavBar_Container",
    style: {},
})
    .frame(
        `${app.iDC_SystemInfo.navButton.left}px`,
        `${app.iDC_SystemInfo.navButton.height}px`
    )
    .HStack()
    .overflow("hidden");
PageObj.use(NavBar_Container);

Component(PageObj);