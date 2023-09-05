import CollectionUtils from "./collection";
import Counter from "./counter";
import NumberUtils from "./number";
import Range from "./range";

module ArrayUtils {

    export type callback<T, R> = (element: T, index: index, array: T[]) => R;
    export type deleted<T> = T[];
    export type match<T> = ArrayUtils.callback<T, boolean>;

}

export default class ArrayUtils {

    // delete: possibly wrong to put -1. might not work if loop is backwards.

    public static clear<T>(array: T[]): T[] {

        const { length } = array;
        const deleted: T[] = array.splice(0, length);
        return deleted;

    }

    public static count<T>(array: T[], match?: ArrayUtils.match<T>, start: index = 0): number {

        let count: int = 0;
        this.iterateFrom(array, start, (element, index) => {

            if(match?.(element, index, array) ?? true) count++;

        });
        return count;

    }

    public static delete<T>(
        array: T[],
        match?: ArrayUtils.match<T>,
        start: index = 0
    ): ArrayUtils.deleted<T> {

        const deleted: ArrayUtils.deleted<T> = [];
        const forward: boolean = !NumberUtils.isNegative(start);
        const stepBack: int = forward ? -1 : 1;
        this.iterateFrom(array, start, (element, index) => {

            if(match?.(element, index, array) ?? true) {

                array.splice(index, 1);
                deleted.push(element);
                return stepBack;

            }

        });
        return deleted;

    }

    public static deleteIndexes<T>(array: T[], indexes: Set<index>): ArrayUtils.deleted<T> {

        const deleted: ArrayUtils.deleted<T> = this.delete(array, (_, index) => indexes.has(index));
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

    private static hasZeroIndex(_: unknown, index: index): boolean {

        return NumberUtils.isZero(index);

    }

    public static firstIndex<T>(array: T[]): canBeUndefined<index> {

        const { length } = array;
        return length == 0 ? undefined : 0;

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

    public static indexes<T>(array: T[], positive: boolean = true): index[] {

        const indexes: index[] = [];
        array.forEach((_, index) => {

            if(!positive) index = this.negativeIndex(array, index) as index;
            indexes.push(index);

        });
        return indexes;

    }

    public static insert<T>(array: T[], add: T[], index: index = array.length): length {

        array.splice(index, 0, ...add);
        const { length } = array;
        return length;

    }

    public static iterateFrom<T>(
        array: T[],
        start: index = 0,
        callbackEach?: ArrayUtils.callback<T, unknown>
    ): int {

        let count: int = 0;
        if(CollectionUtils.isEmpty(array)) return count;
        const forward: boolean = !NumberUtils.isNegative(start);
        const period: int = forward ? 1 : -1;
        const condition: (index: index) => boolean =
            forward ? (index => index < array.length) :
            (index => index >= (this.negativeIndex(array, index) as index))
        ;
        const counter = new Counter(
            start,
            period,
            condition,
            index => {

                count++;
                if(!forward) index = this.positiveIndex(array, index) as index;
                const element: T = array[index];
                return callbackEach?.(element, index, array);

            }
        );
        for(let _ of counter.iterate()) {}
        return count;

    }

    public static lastIndex<T>(array: T[]): canBeUndefined<index> {

        const { length } = array;
        return length == 0 ? undefined : (length - 1);

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

    public static negativeIndex<T>(array: T[], int: int): canBeUndefined<index> {

        const { length } = array;
        const inArray: boolean = this.hasIndex(array, int);
        const index: canBeUndefined<index> =
            inArray ? (NumberUtils.isNegative(int) ? int : (int - length)) : (-length - 1)
        ;
        return index;

    }

    public static positiveIndex<T>(array: T[], int: int): canBeUndefined<index> {

        const { length } = array;
        const inArray: boolean = this.hasIndex(array, int);
        const index: canBeUndefined<index> =
            inArray ? (NumberUtils.isNegative(int) ? (length + int) : int) : undefined
        ;
        return index;

    }

}
