import CollectionUtils from "./collection";
import Counter from "./counter";
import NumberUtils from "./number";
import Range from "./range";

module ArrayUtils {

    export type callback<T, R> = (element: T, index: index, array: T[]) => R;
    export type compare<T> = (
        element1: T,
        element2: canBeUndefined<T>,
        index1: index,
        index2: canBeUndefined<index>,
        array: T[]
    ) => boolean;
    export type deleted<T> = T[];
    export type match<T> = callback<T, boolean>;

}

export default class ArrayUtils {

    /*
    
        To add:
            pickElements()
            shuffle()
        
        To change:
            countMatch(): max
            deleteMatch(): max
    
    */

    public static addArray<T>(array: T[], add: T[], index: index = array.length): length {

        array.splice(index, 0, ...add);
        const { length } = array;
        return length;

    }

    public static clear<T>(array: T[]): T[] {

        const { length } = array;
        const deleted: T[] = array.splice(0, length);
        return deleted;

    }

    public static countMatch<T>(
        array: T[], match?: ArrayUtils.match<T>,
        start: index = 0,
        max?: int
    ): int {

        let count: int = 0;
        const maxed: () => boolean = () => max == undefined ? false : count == max;
        this.iterateFrom(array, start, (element, index) => {

            if(match?.(element, index, array) ?? true) count++;
            if(maxed()) return false;

        });
        return count;

    }

    public static deleteMatch<T>(
        array: T[],
        match?: ArrayUtils.match<T>,
        start: index = 0,
        max?: int
    ): ArrayUtils.deleted<T> {

        const deleted: ArrayUtils.deleted<T> = [];
        const forward: boolean = !NumberUtils.isNegative(start);
        const stepBack: int = forward ? -1 : 1;
        const maxed: () => boolean = () => max == undefined ? false : deleted.length == max;
        this.iterateFrom(array, start, (element, index) => {

            if(match?.(element, index, array) ?? true) {

                array.splice(index, 1);
                deleted.push(element);
                return maxed() ? false : stepBack;

            }

        });
        return deleted;

    }

    public static deleteIndexes<T>(array: T[], indexes: Set<index>): ArrayUtils.deleted<T> {

        const deleted: ArrayUtils.deleted<T> = this.deleteMatch(array, (_, index) => indexes.has(index));
        return deleted;

    }

    public static firstElement<T>(
        array: T[],
        match: ArrayUtils.match<T> = this.hasZeroIndex,
        start: index = 0
    ): canBeUndefined<T> {

        let firstElement: canBeUndefined<T>;
        this.iterateFrom(array, start, (element, index) => {

            if(match(element, index, array)) {
                
                firstElement = element;
                return false;

            }

        });
        return firstElement;

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

    public static iterateFrom<T>(
        array: T[],
        start: index = 0,
        callbackEach?: ArrayUtils.callback<T, unknown>,
        callbackLast?: ArrayUtils.callback<T, void>
    ): int {

        let count: int = 0;
        if(CollectionUtils.isEmpty(array)) return count;
        const forward: boolean = !NumberUtils.isNegative(start);
        const period: int = forward ? 1 : -1;
        const condition: (index: index) => boolean =
            forward ? (index => index < array.length) :
            (index => index >= (this.negativeIndex(array, 0) as index))
        ;
        const counter = new Counter(
            start,
            period,
            condition,
            index => {

                count++;
                const element: T = array.at(index) as T;
                return callbackEach?.(element, index, array);

            },
            index => {

                const element: T = array.at(index) as T;
                callbackLast?.(element, index, array);

            }
        );
        for(let _ of counter.iterate()) {}
        return count;

    }

    public static lastIndex<T>(array: T[], nonnegative: boolean = true): canBeUndefined<index> {

        const index: index = length - 1;
        return nonnegative ? this.nonnegativeIndex(array, index) : this.negativeIndex(array, index);

    }

    public static middleIndex<T>(
        array: T[],
        percentage: frac = 0.5,
        nonnegative: boolean = true
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

    public static pickIndex<T>(array: T[], nonnegative: boolean = true): canBeUndefined<index> {

        const { length } = array;
        if(length == 0) return;
        const range: Range = new Range(0, length, true, false);
        let index: index = range.pickNumber() as index;
        if(!nonnegative) index = this.negativeIndex(array, index) as index;
        return index;

    }

    public static pickElement<T>(array: T[]): canBeUndefined<T> {

        return array[this.pickIndex(array) as index];

    }

    public static pickElements<T>(array: T[], length: length): T[] {

        const pickedElements: T[] = [];
        if(this.isEmpty(array)) return pickedElements;
        const superLength: length = array.length;
        const indexes: index[] = this.indexes(array);
        if(length > superLength) length = superLength;
        for(let count = 0; count < length; count++) {

            const pickedIndex: index = this.pickElement(indexes) as index;
            this.deleteMatch(indexes, index => index == pickedIndex, 0, 1);
            const element: T = array[pickedIndex];
            pickedElements.push(element);

        }
        return pickedElements;

    }

    private static hasZeroIndex<T>(_: T, index: index): boolean {

        return NumberUtils.isZero(index);

    }

}
