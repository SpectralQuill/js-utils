type index = number;
type possibleIndex = index | undefined;

// bookmark: array

interface Array<T> {

    indexes(): index[];
    lastIndex(): possibleIndex;

}

Array.prototype.indexes = function() {

    return this.map((_: any, index: string) => index);

}

Array.prototype.lastIndex = function() {

    const { length } = this;
    return length > 0 ? length - 1 : undefined;

}
