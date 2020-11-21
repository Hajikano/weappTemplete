// DC_Page 创建一个DC页面实例
// 使用原型上的get方法将页面实例传入对应的小程序Page函数中

function DC_Page(config = {}) {
    // 检测是否存在router实例
    if (this._router === undefined) {
        throw "Rouer is necessary.";
    }

    // 为实例创建data属性,存放页面的数据
    this.data = {};

    // 确定实例是否为组件页面类型
    if (config._isCompontent === undefined || typeof (config._isCompontent !== "boolean")) {
        // 实例默认为非组件模式
        config._isCompontent = false;
    } else {
        config._isCompontent = config._isCompontent;
    }

    // 绑定实例类型 在use方法中需要用到
    this._isCompontent = config._isCompontent;

    // 为实例绑定小程序的页面实例
    if (config._isCompontent === true) {
        // 组件模式
        this.properties = config.properties !== undefined ? config.properties : {};
        this.methods = config.methods !== undefined ? config.methods : {};
        if (config.created === undefined) {
            config.created = () => {};
        }
        let that = this;
        this.created = function () {
            that._pageInstance = this; // this指向执行onLoad的环境
            // that.register.bind(this)(that._router);
            config.created.bind(this)();
        };
    } else {
        // 非组件模式
        if (config.onLoad === undefined) {
            config.onLoad = () => {};
        }
        if (config.onUnload === undefined) {
            config.onUnload = () => {};
        }
        let that = this;
        this.onLoad = function (options) {
            that._pageInstance = this; // this指向执行onLoad的环境
            that.register.bind(this)(that._router);
            config.onLoad.bind(this)(options);
        };
        this.onUnload = function () {
            that.uninstall(that._router);
            config.onUnload.call(this);
        };
    }
    // 绑定剩余属性
    for (let i in config) {
        if (i[0] !== "_" && i !== "created" && i !== "onLoad" && i !== "onUnload") {
            this[i] = config[i];
        }
    }
}

// 将组件实例绑定到DC页面实例
function use(compontent) {
    compontent._dcPageInstance = this;
    if (compontent._name === undefined) {
        // 检查组件是否存在'_name'属性
        throw "Compontent must have a propertie named '_name'!";
    }
    this.data[compontent._name] = compontent._data;
    for (let i of Object.getOwnPropertyNames(compontent)) {
        // 将组件注册到页面
        switch (i) {
            case "_style":
                {
                    // 绑定style
                    let styleObj = {};
                    for (let j in compontent._style) {
                        styleObj[j] = compontent.setStyle(compontent._style[j]);
                    }
                    this.data[compontent._name].style = styleObj;
                }
                break;
            default:
                {
                    // 绑定方法
                    if (i[0] !== "_") {
                        // 为组件模式兼容处理
                        if (this._isCompontent) {
                            this.methods[compontent._name + "_" + i] = compontent[i].bind(compontent);
                        } else {
                            this[compontent._name + "_" + i] = compontent[i].bind(compontent);
                        }
                    }
                }
                break;
        }
    }
}
DC_Page.prototype.use = use;

// 将组件实例注册到路由
function register(router) {
    router.push(this);
}
DC_Page.prototype.register = register;

// 将组件实例注册到路由
function uninstall(router) {
    router.pop();
}
DC_Page.prototype.uninstall = uninstall;

module.exports = { DC_Page };
