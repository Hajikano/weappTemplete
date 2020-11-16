const app = getApp();
const DC_Compontent = app.DC_Utils.DC_Compontent;
const dc_SystemInfo = app.DC_SystemInfo;

const PageObj = new app.DC_Utils.DC_Page({
    onLoad(){}
});

const DC_Layout = new DC_Compontent({
    _name: "DC_Layout",
    data: {
        title: "Test",
    },
    methods: {
        onIconClick() {
            app.iDC_NavigateTo.pop();
        }
    },
});
PageObj.use(DC_Layout);

Page(PageObj);