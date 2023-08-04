Array.prototype.lastIndex = function () {
    var length = this.length;
    return length > 0 ? length - 1 : undefined;
};
