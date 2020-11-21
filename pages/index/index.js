const app = getApp();
const DC_Compontent = app.DC_Utils.DC_Compontent;

const PageObj = new app.DC_Utils.DC_Page({
    onLoad() {},
});

const DC_Layout = new DC_Compontent({
    _name: "DC_Layout",
    data: {
        title: "Weapp",
    },
    style: {
        button: {
            "background-color": app.publicData.ColorSet.$blue,
            width: "80%",
            margin: "auto",
            color: "#ffffff",
        },
    },
    methods: {
        onButtonClick(e) {
            const clickID = e.currentTarget.dataset.id;
            app.iDC_NavigateTo.push(clickID);
        },
    },
});
PageObj.use(DC_Layout);

Page(PageObj);
