type addend = number;
type amt = number;
type collection = element[] | Set<element>;
type element = any;
type index = number;
type indexCollection = index[] | Set<index>;
type int = number;
type possibleIndex = index | undefined;
type possibleInfiniteAmt = number | true;
type setGeneralBooleanCallbackFn =
    (element: element, set: Set<element>, thisArg?: any) => boolean
;

interface Collection<T> {

    isEmpty(): boolean;
    pick(exclude: collection): element;

}
