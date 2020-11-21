//DC_Request 封装后的wx.request

// DC_Request类
function DC_Request(config) {
    this.domain = config.domain;
    this.getOptionsTrans = getOptionsTrans;
    this.interceptors = new Interceptors();
    this.get = get.bind(this);
    this.post = post.bind(this);
}

// 拦截器类
function Interceptors() {
    // 请求拦截器
    this.requestFunction = null;
    // 响应拦截器
    this.responseFunction = null;
}

// DC_Request类方法,给定一个options对象,返回仅带有特定属性的options对象
function getOptionsTrans(options) {
    // 定义空请求模版
    let getOptionsTrans = {
        url: "",
        data: {},
        isIntercept_request: true, //是否拦截请求
        isIntercept_response: true, //是否拦截响应
        header: {},
        success: () => {},
        fail: () => {},
        complete: () => {},
    };

    // 将options中的属性填入模版中
    for (let i in getOptionsTrans) {
        if (options[i] !== undefined) {
            getOptionsTrans[i] = options[i];
        }
    }

    // 返回填充后的模版
    return getOptionsTrans;
}

// DC_Request类方法,给定一个options对象,进行get请求
function get(options) {
    // this指向DC_Request实例
    options = this.getOptionsTrans(options);
    // 如果需要进行请求拦截
    if (options.isIntercept_request) {
        // 添加请求拦截器
        let interceptor = this.interceptors.requestFunction;
        if (typeof(interceptor) === 'function') {
            options = interceptor(options);
        } else {
            throw new Error("Request of interceptors is not a function.");
        }
    }
    wx.request({
        url: this.domain + options.url,
        data: options.data,
        method: "GET",
        header: options.header,
        success: (res) => {
            // 如果需要进行响应拦截
            if (options.isIntercept_response) {
                // 添加响应拦截器
                let interceptor = this.interceptors.responseFunction;
                if (typeof(interceptor) === 'function') {
                    res = interceptor(res);
                } else {
                    throw new Error("Response of interceptors is not a function.");
                }
            }
            options.success(res);
        },
        fail: (res) => {
            options.fail(res);
        },
        complete: (res) => {
            options.complete(res);
        },
    });
}

// DC_Request类方法,给定一个options对象,进行post请求
function post(options) {
    // this指向DC_Request实例
    options = this.getOptionsTrans(options);
    // 如果需要进行请求拦截
    if (options.isIntercept_request) {
        // 添加请求拦截器
        let interceptor = this.interceptors.requestFunction;
        if (typeof(interceptor) === 'function') {
            options = interceptor(options);
        } else {
            throw new Error("Request of interceptors is not a function.");
        }
    }
    wx.request({
        url: this.domain + options.url,
        data: options.data,
        method: "POST",
        header: options.header,
        success: (res) => {
            // 如果需要进行响应拦截
            if (options.isIntercept_response) {
                // 添加响应拦截器
                let interceptor = this.interceptors.responseFunction;
                if (typeof(interceptor) === 'function') {
                    res = interceptor(res);
                } else {
                    throw new Error("Response of interceptors is not a function.");
                }
            }
            options.success(res);
        },
        fail: (res) => {
            options.fail(res);
        },
        complete: (res) => {
            options.complete(res);
        },
    });
}

module.exports = {
    DC_Request: DC_Request,
};
