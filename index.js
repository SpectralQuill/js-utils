"use strict";
Array.prototype.count = function (base) {
    const amt = this.reduce((amt, element) => amt + (base == element ? 1 : 0), 0);
    return amt;
};
Array.prototype.isEmpty = function () {
    return this.length == 0; /*aaaa*/
};
Set.prototype.isEmpty = function () {
    return this.size == 0;
};
