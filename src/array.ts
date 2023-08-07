Array.prototype.count = function(base) {

    const amt: amt = this.reduce(
        (amt: amt, element: element) => amt + (base == element ? 1 : 0),
        0
    );
    return amt;

}

Array.prototype.isEmpty = function() {

    return this.length == 0;

}
