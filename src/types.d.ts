type canBeUndefined<T> = T | undefined;
type canBeVoid<T> = T | void;
type collection<T> = T[] | Set<T>;
type frac = number;
type index = int;
type int = number;
type length = int;
type size = int;

/*

    array methods:
        rename addElements to insert
        lastElement to just last
            last(match) default lastIndex
        middle is .5 that can be adjusted

*/

// interface Collection<T> {

//     isEmpty(): boolean;
//     pick(exclude: collection): element;

// }

// interface Array<T> extends Collection<T> {

//     addElements(elements: collection, multiplier?: int): index[]; //
//     count(elementOrCallbackFn: element | ((
//         element: element, index: index
//     ) => boolean)): amt;
//     clear(): element[]; //
//     deleteElements(
//         elementsOrCallbackFn:
//             collection | ((
//                 element: element,
//                 index: index,
//                 array: this,
//                 deleted: element[]
//             ) => boolean)
//         ,
//         amt?: possibleInfiniteAmt,
//         start?: index,
//         end?: index
//     ): element[]; //
//     firstElement(): element; //
//     firstIndex(positive?: boolean): possibleIndex; //
//     indexes(positive?: boolean): index[]; //
//     indexOfInt(positive?: boolean): index; //
//     largest(exclude?: collection): element; //
//     lastElement(): element; //
//     lastIndex(positive?: boolean): possibleIndex; //
//     middleElement(): element; //
//     middleIndex(positive?: boolean): possibleIndex; //
//     multiply(multiplier?: int): index[]; //
//     pickIndex(exclude?: indexCollection, positive?: boolean): index; //
//     smallest(exclude?: collection): element; //

// }

// interface Set<T> extends Collection<T> {

//     addElements(elements: collection): Set<element>; //
//     deleteElements(
//         elementsOrCallbackFn:
//             collection | ((element: element, set: this, deleted: Set<element>) => boolean)
//     ): Set<element>; //
//     difference(set: collection): Set<element>; //
//     every(callbackFn: setGeneralBooleanCallbackFn, thisArg?: any): boolean; //
//     filter(callbackFn: setGeneralBooleanCallbackFn, thisArg?: any): Set<element>; //
//     intersection(set: collection): Set<element>; //
//     map(
//         callbackFn: (element: element, set: this, thisArg?: any) => element,
//         thisArg?: any
//     ): Set<element>; //
//     randomSubset(
//         limit: amt | ((subset: Set<T>, set: this) => boolean),
//         include?: Set<element>,
//         exclude?: Set<element>
//     ): Set<element>; //
//     some(callbackFn: setGeneralBooleanCallbackFn, thisArg?: any): boolean; //
//     toArray(shuffle?: boolean): Array<element>; //
//     union(set: collection): Set<element>; //

// }
