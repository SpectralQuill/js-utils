type addend = number;
type amt = number;
type array = any[];
type arrayGeneralBooleanCallbackFn = (element: element, index: index, array: array) => boolean;
type collection = array | set;
type element = any;
type index = number;
type indexCollection = index[] | Set<index>;
type int = number;
type possibleIndex = index | undefined;
type possibleInfiniteAmt = number | true;
type set = Set<element>;
type setGeneralBooleanCallbackFn = (element: element, set: set) => boolean;

interface Collection<T> {

    isEmpty(): boolean;
    pick(exclude: collection): element;

}
