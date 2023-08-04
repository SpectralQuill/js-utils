type index = number;
type possibleIndex = index | undefined;

interface Array<T> {

    lastIndex(): possibleIndex;

}

Array.prototype.lastIndex = function() {

    const { length } = this;
    return length > 0 ? length - 1 : undefined;

}
