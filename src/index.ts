type addend = number;
type amt = number;
type collection = element[] | Set<element>;
type count = number;
type element = any;
type index = number;
type indexCollection = index[] | Set<index>;
type int = number;
type possibleIndex = index | undefined;
type possibleInfiniteAmt = number | true;
type setGeneralBooleanCallbackFn = (element: element, set: Set<element>, thisArg?: any) => boolean;

// bookmark: collection

interface Collection<T> {

    isEmpty(): boolean;
    pick(exclude: collection): element;

}

// bookmark: array

interface Array<T> extends Collection<T> {

    addElements(elements: collection, multiplier?: int): index[]; //
    count(element: element): amt; //
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

Array.prototype.isEmpty = function() {

    return this.length == 0;

}

// bookmark: set

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
