const app = getApp();
const DC_Compontent = app.DC_Utils.DC_Compontent;

let editor = null;
const PageObj = new app.DC_Utils.DC_Page({
    onLoad() {
        const query = wx.createSelectorQuery();
        query
            .select("#editor")
            .context((res) => {
                editor = res.context;
            })
            .exec();
        wx.onKeyboardHeightChange((res) => {
            console.log(res.height);
            ToolBar.setData({
                bottomHeight: res.height === 0 ? bottomHeight : res.height,
            });
        });
    }
});

const DC_Layout = new DC_Compontent({
    _name: "DC_Layout",
    data: {
        title: "Editor",
    },
    methods: {
        onBack() {
            app.iDC_NavigateTo.pop();
        },
    },
});
PageObj.use(DC_Layout);

const heightRatio = 0.3;
const padding = 20;
const Editor = new DC_Compontent({
    _name: "Editor",
    data: {},
    style: {
        _: {
            "border-top-style": "solid",
            "border-width": "1px",
            "border-color": app.publicData.ColorSet.$border,
        },
    },
    methods: {
        onInput(e) {
            // console.log(e.detail);
        },
    },
})
    .frame("100%", `${app.iDC_SystemInfo.system.height * heightRatio}px`)
    .shadow()
    .padding(null, `${padding}px`)
    .backgroundColor();
PageObj.use(Editor);

const ToolBarHeight = 50;
const topHeight = 110 + padding + app.iDC_SystemInfo.system.height * heightRatio + app.publicData.navBarHeight;
const bottomHeight = app.iDC_SystemInfo.system.height - topHeight;
const ToolBar = new DC_Compontent({
    _name: "ToolBar",
    data: {
        bottomHeight: bottomHeight,
    },
    style: {
        ToolBarBox: {
            width: "100%",
            position: "absolute",
        },
        _: {
            "overflow-x": "scroll",
            "overflow-y": "hidden",
            "white-space": "nowrap",
        },
    },
    methods: {},
})
    .frame("100%", `${ToolBarHeight}px`)
    .shadow()
    .backgroundColor();
PageObj.use(ToolBar);

const ToolBar_Button = new DC_Compontent({
    _name: "ToolBar_Button",
    data: {
        buttons_up: [
            {
                id: "bold",
                icon: "format_bold",
                color: "#303133",
                size: 25,
            },
            {
                id: "italic",
                icon: "format_italic",
                color: "#67C23A",
                size: 25,
            },
            {
                id: "underline",
                icon: "format_underlined",
                color: "#E6A23C",
                size: 25,
            },
            {
                id: "strike",
                icon: "format_strikethrough",
                color: "#909399",
                size: 25,
            },
            {
                id: "size",
                icon: "format_size",
                color: "#409EFF",
                size: 25,
            },
            {
                id: "align",
                icon: "format_align_center",
                color: "",
                size: 25,
            },
            {
                id: "list",
                icon: "format_list_bulleted",
                color: "#E6A23C",
                size: 25,
            },
            {
                id: "color",
                icon: "palette",
                color: "#F56C6C",
                size: 25,
            },
        ],
        buttons_bottom: [
            {
                id: "undo",
                icon: "undo",
                color: "#F56C6C",
                size: 25,
            },
            {
                id: "redo",
                icon: "redo",
                color: "#409EFF",
                size: 25,
            },
            {
                id: "decrease",
                icon: "format_indent_decrease",
                color: "#67C23A",
                size: 25,
            },
            {
                id: "increase",
                icon: "format_indent_increase",
                color: "#E6A23C",
                size: 25,
            },
            {
                id: "clear",
                icon: "clear",
                color: "#303133",
                size: 25,
            },
        ],
    },
    style: {
        _: {
            display: "inline-flex",
            "align-items": "center",
            "justify-content": "center",
        },
    },
    methods: {
        onClick(e) {
            const clickID = e.currentTarget.dataset.id;
            switch (clickID) {
                case "bold":
                    {
                        editor.format("bold");
                    }
                    break;
                case "italic":
                    {
                        editor.format("italic");
                    }
                    break;
                case "underline":
                    {
                        editor.format("underline");
                    }
                    break;
                case "strike":
                    {
                        editor.format("strike");
                    }
                    break;
                case "size":
                    {
                        editor.format("header", "H1");
                    }
                    break;
                case "align":
                    {
                        editor.format("align", "center");
                    }
                    break;
                case "list":
                    {
                        editor.format("list", "bullet");
                    }
                    break;
                case "color":
                    {
                        editor.format("color", "#F56C6C");
                    }
                    break;
                case "undo":
                    {
                        editor.undo();
                    }
                    break;
                case "redo":
                    {
                        editor.redo();
                    }
                    break;
                case "decrease":
                    {
                        editor.format("indent", "-1");
                    }
                    break;
                case "increase":
                    {
                        editor.format("indent", "+1");
                    }
                    break;
                case "clear":
                    {
                        editor.removeFormat();
                    }
                    break;
                default:
                    break;
            }
        },
    },
}).frame(`${ToolBarHeight}px`, `${ToolBarHeight}px`);
PageObj.use(ToolBar_Button);

Page(PageObj);
