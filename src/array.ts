import Counter from "./counter";
import NumberUtils from "./number";
import Range from "./range";

module ArrayUtils {

    export type callback<T, R> = (element: T, index: index, array: T[]) => R;
    export type callbackEach<T> = callback<T, callbackEachReturn<T>>;
    export type callbackEachReturn<T> = canBeVoid<[
        breakLoop?: boolean,
        newCallbackEach?: callbackEach<T>,
        newCallbackLast?: callbackLast<T>,
        skip?: int,
        newForward?: boolean
    ]>;
    export type callbackLast<T> = callback<T, void>;
    export type compare<T> = (
        element1: T,
        element2: canBeUndefined<T>,
        index1: index,
        index2: canBeUndefined<index>,
        array: T[]
    ) => boolean;
    export type deleted<T> = T[];
    export type match<T> = callback<T, matchReturn<T>>;
    export type matchReturn<T> = [
        isMatch?: boolean,
        breakLoop?: boolean,
        newMatch?: match<T>,
        newForward?: boolean
    ];

}

export default class ArrayUtils {

    /*

        Redo:
            iterate should also count newForward
    
        To add:

            findMatch that can be stopped
        
        To change:

            lots: use match & forward instead of start
            lots: max should be generalized to condition
            lots: match should return tuple

            deleteIndexes() is wrong
            firstElement(): rename to firstMatch()
            indexes(): match & start
            pickElement() & pickElements():
                match
                length -> max
                deleteElement
            pickElements():
                - match
                - apply match first then keep list of indexes
                deleteElement
    
    */

    public static addArray<T>(array: T[], add: T[], index: index = array.length): length {

        array.splice(index, 0, ...add);
        const { length } = array;
        return length;

    }

    public static clear<T>(array: T[]): void {

        array.splice(0, array.length);

    }

    public static deleteMatches<T>(
        array: T[],
        match?: ArrayUtils.match<T>,
        forward: boolean = true
    ): ArrayUtils.deleted<T> {

        const deleted: ArrayUtils.deleted<T> = [];
        this.iterate(
            array,
            (element, index, array) => {

                let breakLoop = false;
                let skip;
                let forward;
                const returnValue: ArrayUtils.callbackEachReturn<T> = [ true ];
                const matchReturn = match?.(element, index, array);
                if(matchReturn != undefined) {

                    const [ isMatch, breakLoop, newMatch, newForward ] = matchReturn;
                    if(isMatch) {

                        array.splice(index, 1);
                        returnValue[3] = -1;

                    }
                    if(breakLoop != undefined) returnValue[0] = breakLoop;
                    if(newMatch instanceof Function) match = newMatch;
                    if(newForward != undefined) forward = newForward;

                }
                return returnValue;

            },
            undefined,
            forward
        );
        return deleted;

    }

    public static deleteIndex<T>(array: T[], index: index): canBeUndefined<T> {

        if(this.isEmpty(array)) return;
        const element: T = array[index];
        array.splice(index, 1);
        return element;

    }

    public static deleteIndexes<T>(array: T[], indexes: Set<index>): ArrayUtils.deleted<T> {

        const deleted: ArrayUtils.deleted<T> = [];
        if(this.isEmpty(array)) return deleted;
        indexes.forEach(index => {
            
            const element: T = this.deleteIndex(array, index) as T;
            deleted.push(element);

        });
        return deleted;

    }

    public static firstElement<T>(array: T[]): canBeUndefined<T> {

        const element: T = array[0];
        return element;

    }

    public static firstIndex<T>(array: T[], nonnegative: boolean = true): canBeUndefined<index> {

        const index: index = 0;
        return nonnegative ? this.nonnegativeIndex(array, index) : this.negativeIndex(array, index);

    }

    public static hasIndex<T>(array: T[], index: index): boolean {

        const { length } = array;
        if(length == 0 || !NumberUtils.isInteger(index)) return false;
        const isNonnegative: boolean = NumberUtils.isNonnegative(index);
        const start: index = isNonnegative ? 0 : -length;
        const end: index = isNonnegative ? length : -1;
        const includeStart: boolean = true;
        const includeEnd: boolean = !isNonnegative;
        const range: Range = new Range(start, end, includeStart, includeEnd);
        return range.inRange(index);

    }

    public static indexes<T>(array: T[], nonnegative: boolean = true): index[] {

        const indexes: index[] = [];
        array.forEach((_, index) => {

            if(!nonnegative) index = this.negativeIndex(array, index) as index;
            indexes.push(index);

        });
        return indexes;

    }

    public static isEmpty<T>(array: T[]): boolean {

        const { length } = array;
        return length == 0;

    }

    public static iterate<T>(
        array: T[],
        callbackEach?: ArrayUtils.callbackEach<T>,
        callbackLast?: ArrayUtils.callbackLast<T>,
        forward: boolean = true
    ): int {

        let count: int = 0;
        if(this.isEmpty(array)) return count;
        const start: index = forward ? 0 : (this.lastIndex(array) as index);
        const period: int = forward ? 1 : -1;
        const counter: Counter = new Counter(
            start,
            period,
            index => (forward ? (index < length) : (index >= 0)),
            index => {

                count++;
                const element: T = array[index];
                const callbackEachReturn: ArrayUtils.callbackEachReturn<T> =
                    callbackEach?.(element, index, array)
                ;
                if(callbackEachReturn != undefined) {

                    const [
                        breakLoop,
                        newCallbackEach,
                        newCallbackLast,
                        skip,
                        newForward
                    ] = callbackEachReturn;
                    if(newCallbackEach instanceof Function) callbackEach = newCallbackEach;
                    if(newCallbackLast instanceof Function) callbackLast = newCallbackLast;
                    const periodAddend: canBeUndefined<int> =
                        (skip != undefined ? (period * skip) : undefined)
                    ;
                    if(newForward != undefined) forward = newForward;
                    return [ breakLoop, undefined, undefined, periodAddend ];

                }

            },
            index => {

                const element: T = array[index];
                callbackLast?.(element, index, array);

            }
        );
        for(let _ of counter.iterator()) {}
        return count;

    }

    public static lastElement<T>(array: T[]): canBeUndefined<T> {

        const { length } = array;
        const lastIndex: index = length - 1;
        const element: T = array[lastIndex];
        return element;

    }

    public static lastIndex<T>(array: T[], nonnegative: boolean = true): canBeUndefined<index> {

        const index: index = length - 1;
        return nonnegative ? this.nonnegativeIndex(array, index) : this.negativeIndex(array, index);

    }

    
    public static middleIndex<T>(
        array: T[],
        nonnegative: boolean = true,
        percentage: frac = 0.5
    ): canBeUndefined<index> {

        const { length } = this;
        const index: index = Math.round(length * percentage) - 1;
        return nonnegative ? this.nonnegativeIndex(array, index) : this.negativeIndex(array, index);

    }

    public static most<T>(array: T[], compare: ArrayUtils.compare<T>, start: index = 0): canBeUndefined<T> {

        let mostElement: canBeUndefined<T>;
        let mostIndex: canBeUndefined<index>;
        this.iterateFrom(array, start, (element, index) => {

            if(compare(element, mostElement, index, mostIndex, array) ?? true) {

                mostElement = element;
                mostIndex = index;

            }

        });
        return mostElement;

    }

    public static multiply<T>(array: T[], multiplier: frac): ArrayUtils.deleted<T> {

        const reverse: boolean = NumberUtils.isNegative(multiplier);
        multiplier = Math.abs(multiplier);
        const oldLength = array.length;
        const newLength = Math.round(oldLength * multiplier);
        let deleted: ArrayUtils.deleted<T>;

        if(oldLength > newLength) deleted = array.splice(newLength);
        else if(oldLength < newLength) for(let index = oldLength; index < newLength; index++) {

            let element = array[index % oldLength];
            array.push(element);

        }

        if(reverse) array.reverse();
        deleted ??= [];
        return deleted;

    }

    public static negativeIndex<T>(array: T[], index: index): canBeUndefined<index> {

        const { length } = array;
        const hasIndex: boolean = this.hasIndex(array, index);
        if(!hasIndex) return;
        index = NumberUtils.isNegative(index) ? index : (index - length);
        return index;

    }

    public static nonnegativeIndex<T>(array: T[], index: index): canBeUndefined<index> {

        const { length } = array;
        const hasIndex: boolean = this.hasIndex(array, index);
        if(!hasIndex) return;
        index = NumberUtils.isNegative(index) ? (length + index) : index;
        return index;

    }

    public static pickIndex<T>(
        array: T[],
        match?: ArrayUtils.match<T>,
        nonnegative: boolean = true
    ): canBeUndefined<index> {

        if(match instanceof Function) array = array.filter(match);
        const { length } = array;
        if(length == 0) return;
        const range: Range = new Range(0, length, true, false);
        let index: index = range.pickNumber() as index;
        if(!nonnegative) index = this.negativeIndex(array, index) as index;
        return index;

    }

    public static pickElement<T>(
        array: T[],
        match?: ArrayUtils.match<T>,
        deleteElement: boolean = false
    ): canBeUndefined<T> {

        const index: canBeUndefined<index> = this.pickIndex(array, match);
        if(index == undefined) return;
        const element: T = array[index];
        if(deleteElement) this.deleteIndex(array, index);
        return element;

    }

    public static pickElements<T>(
        array: T[],
        match?: ArrayUtils.match<T>,
        max: length = array.length,
        deleteElements: boolean = false
    ): T[] {

        if(match instanceof Function) array = array.filter(match);
        const picked: T[] = [];
        const indexes: index[] = ArrayUtils.indexes(array);
        while(!NumberUtils.maxed(picked.length, max) && !this.isEmpty(indexes)) {

            const index: index = this.pickElement(array, undefined, true) as index;
            const element: T = array[index];
            picked.push(element);

        }
        return picked;

    }

    public static shuffle<T>(array: T[]): T[] {

        const shuffled: T[] = ArrayUtils.pickElements(array);
        return shuffled;

    }

    public static toSet<T>(array: T[]): Set<T> {

        return new Set(array);

    }



    private static hasZeroIndex<T>(_: T, index: index): boolean {

        return NumberUtils.isZero(index);

    }

}
