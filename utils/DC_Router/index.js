function DC_Router() {
    this.stack = [];
}

function push(route) {
    this.stack.push(route);
}
DC_Router.prototype.push = push;

function pop() {
    this.stack.pop();
}
DC_Router.prototype.pop = pop;

function getHead() {
    const headIndex = this.stack.length - 1;
    return this.stack[headIndex];
}
DC_Router.prototype.getHead = getHead;

module.exports = { DC_Router };
