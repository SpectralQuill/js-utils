Array.prototype.indexes = function () {
    return this.map(function (_, index) { return index; });
};
Array.prototype.lastIndex = function () {
    var length = this.length;
    return length > 0 ? length - 1 : undefined;
};
