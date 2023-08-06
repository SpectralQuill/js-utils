interface Array<T> extends Collection<T> {

    addElements(elements: collection, multiplier?: int): index[]; //
    count(elementOrCallbackFn: element | ((
        element: element, index: index
    ) => boolean)): amt;
    clear(): element[]; //
    deleteElements(
        elementsOrCallbackFn:
            collection | ((
                element: element,
                index: index,
                array: this,
                deleted: element[]
            ) => boolean)
        ,
        amt?: possibleInfiniteAmt,
        start?: index,
        end?: index
    ): element[]; //
    firstElement(): element; //
    firstIndex(positive?: boolean): possibleIndex; //
    indexes(positive?: boolean): index[]; //
    indexOfInt(positive?: boolean): index; //
    largest(exclude?: collection): element; //
    lastElement(): element; //
    lastIndex(positive?: boolean): possibleIndex; //
    middleElement(): element; //
    middleIndex(positive?: boolean): possibleIndex; //
    multiply(multiplier?: int): index[]; //
    pickIndex(exclude?: indexCollection, positive?: boolean): index; //
    smallest(exclude?: collection): element; //

}

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
