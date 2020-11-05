//DC_Store 封装的全局状态管理器

function DC_Store() {
    this.state = {};
    this.setState = (key, value) => {
        //深拷贝
        let setValue = JSON.stringify(value);
        this.state[key] = JSON.parse(setValue);
    }
    this.getState = (key) => {
        return this.state[key];
    }
}

module.exports = {
    DC_Store: DC_Store
}