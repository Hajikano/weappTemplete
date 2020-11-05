// DC_Page 创建一个DC页面实例
// 使用原型上的get方法将页面实例传入对应的小程序Page函数中

function DC_Page(config = {}) {
    // 为实例创建data属性,存放页面的数据
    this.data = {};
    // 指向小程序页面实例
    this._pageInstance = null;

    let that = this;
    this.onLoad = function () {
        that._pageInstance = this; // this指向执行onLoad的环境
        if (config.onLoad) {
            config.onLoad.bind(this)();
        }
    }
};

DC_Page.prototype.use = use;

// 将组件实例绑定到DC页面实例
function use(compontent) {
    compontent._dcPageInstance = this;
    this.data[compontent._name] = compontent._data;
    let styleObj = {};
    for (let i in compontent._style) {
        styleObj[i] = compontent.setStyle(compontent._style[i]);
    }
    this.data[compontent._name].style = styleObj;
    //绑定方法
    for (let i in compontent._methods) {
        this[compontent._name + '_' + i] = compontent._methods[i].bind(compontent);
    }
}

module.exports = {
    DC_Page: DC_Page
}