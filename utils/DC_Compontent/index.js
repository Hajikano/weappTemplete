//DC_compontent 封装后的小程序组件

const ColorSet = {
    $blue: "#409EFF",
    $green: "#67C23A",
    $yellow: "#E6A23C",
    $red: "#F56C6C",
    $gray: "#909399",
    $title: "#303133",
    $subTitle: "#909399",
    $body: "#606266",
    $placeholder: "#C0C4CC",
    $border: "#DCDFE6",
    $subBorder: "#E4E7ED",
    $white: "#FFFFFF",
};

const SizeMap = {
    $LargeTitle: "34px",
    $Title1: "28px",
    $Title2: "22px",
    $Title3: "20px",
    $Headline: "17px",
    $Body: "17px",
    $Callout: "16px",
    $Subhead: "15px",
    $Fontnote: "13px",
    $Caption1: "12px",
    $Caption2: "11px",
};

function DC_Compontent(config = {}) {
    // 挂载的DC_Page实例
    this._dcPageInstance = null;
    this._name = config._name;
    this._style = config.style !== undefined ? config.style : { _: {} };
    this._style._ = this._style._ !== undefined ? this._style._ : {};
    this._data = config.data !== undefined ? config.data : {};
    if (config.methods !== undefined) {
        for (let i in config.methods) {
            this[i] = config.methods[i];
        }
    }
}

//功能性方法

function getData() {
    let data = null;
    if (!this._dcPageInstance._isCompontent) {
        const router = this._dcPageInstance._router;
        data = router.getHead().data[this._name];
    } else {
        // 目前建议不要在组件模式使用此方法 此处仅为兼容性处理
        data = this._dcPageInstance._pageInstance.data[this._name];
    }
    return data;
}
DC_Compontent.prototype.getData = getData;

function setData(dataObj, callback = () => {}) {
    let setDataObj = {};
    for (let i of Object.keys(dataObj)) {
        setDataObj[this.getDataPath(i)] = dataObj[i];
    }
    if (!this._dcPageInstance._isCompontent) {
        const router = this._dcPageInstance._router;
        router.getHead().setData(setDataObj, callback);
    } else {
        // 目前建议不要在组件模式使用此方法 此处仅为兼容性处理
        this._dcPageInstance._pageInstance.setData(setDataObj, callback);
    }
}
DC_Compontent.prototype.setData = setData;

function getDataPath(path) {
    return this._name + "." + path;
}
DC_Compontent.prototype.getDataPath = getDataPath;

function setStyle(styleObj) {
    let styleStr = "";
    for (let i in styleObj) {
        styleStr += i;
        styleStr += ":";
        styleStr += styleObj[i];
        styleStr += ";";
    }
    return styleStr;
}
DC_Compontent.prototype.setStyle = setStyle;

// 重新解析样式对象
function update(callback = () => {}) {
    this.setData(
        {
            [`style._`]: this.setStyle(this._style._),
        },
        callback
    );
}
DC_Compontent.prototype.update = update;

function animation(name = "all", duration = "0.5s", mode = "ease", delay = 0) {
    this._style["_"]["transition-property"] = `${name}`;
    this._style["_"]["transition-duration"] = `${duration}`;
    this._style["_"]["transition-timing-function"] = `${mode}`;
    this._style["_"]["transition-delay"] = `${delay}`;
    return this;
}
DC_Compontent.prototype.animation = animation;

//样式设定方法

function margin(postion = null, mode = "auto") {
    this._style["_"]["margin" + (postion ? `-${postion}` : "")] = mode;
    return this;
}
DC_Compontent.prototype.padding = padding;

function padding(postion = null, mode = "10px") {
    this._style["_"]["padding" + (postion ? `-${postion}` : "")] = mode;
    return this;
}
DC_Compontent.prototype.margin = margin;

function VStack(align = "center", justify = "", wrap = "nowarp") {
    this._style["_"]["display"] = "flex";
    this._style["_"]["flex-direction"] = "column";
    if (align) {
        this._style["_"]["align-items"] = align;
    }
    if (justify) {
        this._style["_"]["justify-content"] = justify;
    }
    this._style["_"]["flex-wrap"] = wrap;
    return this;
}
DC_Compontent.prototype.VStack = VStack;

function HStack(align = "center", justify = "", wrap = "nowarp") {
    this._style["_"]["display"] = "flex";
    if (align) {
        this._style["_"]["align-items"] = align;
    }
    if (justify) {
        this._style["_"]["justify-content"] = justify;
    }
    this._style["_"]["flex-wrap"] = wrap;
    return this;
}
DC_Compontent.prototype.HStack = HStack;

function shadow(blur = 5, h = "0px", v = "0px", spread = "1px", color = "rgba(99, 99, 172, 0.2)", inset = false) {
    let colorSet = ColorSet;
    this._style["_"]["box-shadow"] = `${h} ${v} ${blur}px ${spread} ${colorSet[color] ? colorSet[color] : color} ${inset ? inset : ""}`;
    return this;
}
DC_Compontent.prototype.shadow = shadow;

function radius(radius) {
    if (typeof radius === "number") {
        radius = `${radius}px`;
    }
    this._style["_"]["border-radius"] = `${radius}`;
    return this;
}
DC_Compontent.prototype.radius = radius;

function backgroundColor(color = "$white") {
    let colorSet = ColorSet;
    this._style["_"]["background-color"] = colorSet[color] ? colorSet[color] : color;
    return this;
}
DC_Compontent.prototype.backgroundColor = backgroundColor;

function frame(width = null, height = null) {
    if (width) {
        this._style["_"]["width"] = width;
    }
    if (height) {
        this._style["_"]["height"] = height;
    }
    return this;
}
DC_Compontent.prototype.frame = frame;

function fontSize(type = "$Body") {
    if (SizeMap[type]) {
        this._style["_"]["font-size"] = SizeMap[type];
    }
    return this;
}
DC_Compontent.prototype.fontSize = fontSize;

function fontBold(type = "bold") {
    this._style["_"]["font-weight"] = type;
    return this;
}
DC_Compontent.prototype.fontBold = fontBold;

function fontColor(color = "black") {
    let colorSet = ColorSet;
    this._style["_"]["color"] = colorSet[color] ? colorSet[color] : color;
    return this;
}
DC_Compontent.prototype.fontColor = fontColor;

function fontAlign(align = "center") {
    this._style["_"]["text-align"] = align;
    return this;
}
DC_Compontent.prototype.fontAlign = fontAlign;

function offset(mode = "X", X = null, Y = null, Z = null) {
    if (mode === "") {
        Y === null ? X : Y;
    } else if (mode === "3D") {
        Z = X;
        Y = X;
    }
    this._style["_"]["transform"] = `translate${mode}(${X ? X : ""}${Y ? "," + Y : ""}${Z ? "," + Z : ""})`;
    return this;
}
DC_Compontent.prototype.offset = offset;

function overflow(mode = "scroll") {
    this._style["_"]["overflow"] = mode;
    return this;
}
DC_Compontent.prototype.overflow = overflow;

function blur(radius = 5) {
    this._style["_"]["filter"] = `blur(${radius}px)`;
    return this;
}
DC_Compontent.prototype.blur = blur;

module.exports = { DC_Compontent, SizeMap, ColorSet };
