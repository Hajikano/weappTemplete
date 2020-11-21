const app = getApp();
const DC_Compontent = app.DC_Utils.DC_Compontent;

const PageObj = new app.DC_Utils.DC_Page({
    onLoad(options) {
        // const testValue = parseInt(options.test);
        // if (options.test) {
        //     DC_Layout.setData({ test: testValue });
        // } else {
        //     DC_Layout.setData({ test: 1 });
        // }
    },
    data: {
        test: 0,
    }
});

const DC_Layout = new DC_Compontent({
    _name: "DC_Layout",
    data: {
        title: "Test",
        test: 0,
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
        onBack() {
            app.iDC_NavigateTo.pop();
        },
        onButtonClick() {
            const testValue = this.getData().test;
            app.iDC_NavigateTo.push("test", [
                {
                    key: "test",
                    value: testValue + 1,
                },
            ]);
        },
        onButtonClick2() {
            const testValue = this.getData().test;
            this.setData({
                test: testValue + 10,
            });
        },
    },
});
PageObj.use(DC_Layout);

Page(PageObj);