interface Set<T> extends Collection<T> {

    addElements(elements: collection): Set<element>; //
    deleteElements(
        elementsOrCallbackFn:
            collection | ((element: element, set: this, deleted: Set<element>) => boolean)
    ): Set<element>; //
    difference(set: collection): Set<element>; //
    every(callbackFn: setGeneralBooleanCallbackFn, thisArg?: any): boolean; //
    filter(callbackFn: setGeneralBooleanCallbackFn, thisArg?: any): Set<element>; //
    intersection(set: collection): Set<element>; //
    map(
        callbackFn: (element: element, set: this, thisArg?: any) => element,
        thisArg?: any
    ): Set<element>; //
    randomSubset(
        limit: amt | ((subset: Set<T>, set: this) => boolean),
        include?: Set<element>,
        exclude?: Set<element>
    ): Set<element>; //
    some(callbackFn: setGeneralBooleanCallbackFn, thisArg?: any): boolean; //
    toArray(shuffle?: boolean): Array<element>; //
    union(set: collection): Set<element>; //

}

Set.prototype.isEmpty = function() {

    return this.size == 0;

}
