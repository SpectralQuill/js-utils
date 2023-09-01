import BooleanUtils from "./boolean";
import CollectionUtils from "./collection";
import Counter from "./counter";
import NumberUtils from "./number";
import Range from "./range";

module ArrayUtils {

    export type callbackEach<T, R> = (element: T, index: index, array: T[]) => R;
    export type match<T> = ArrayUtils.callbackEach<T, boolean>;

}

export default class ArrayUtils {

    // multiply should take decimals as well

    public static count<T>(array: T[], match: ArrayUtils.match<T>, start: index = 0): number {

        let count: int = 0;
        this.iterateFrom(array, start, (element, index) => {

            if(match(element, index, array)) count++;

        });
        return count;

    }

    public static delete<T>(array: T[], match: ArrayUtils.match<T>, start: index = 0): T[] {

        const deleted: T[] = [];
        this.iterateFrom(array, start, (element, index) => {

            if(match(element, index, array)) {

                array.splice(index, 1);
                deleted.push(element);
                return -1;

            }

        });
        return deleted;

    }

    public static firstIndex<T>(array: T[]): canBeUndefined<index> {

        const { length } = array;
        return length == 0 ? undefined : 0;

    }

    public static hasIndex<T>(array: T[], index: index): boolean {

        const { length } = array;
        if(length == 0 || !NumberUtils.isInteger(index)) return false;
        if(NumberUtils.isNegative(index)) index = this.positiveIndex(array, index) as index;
        const range: Range = new Range(0, length, true, false);
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
        callbackEach?: ArrayUtils.callbackEach<T, unknown>
    ): int {

        let count: int = 0;
        if(CollectionUtils.isEmpty(array)) return count;
        const forward: boolean = !NumberUtils.isNegative(start);
        const period: int = forward ? 1 : -1;
        const counter = new Counter(
            start,
            period,
            index => {

                if(!forward) index = this.positiveIndex(array, index) as index;
                return index < array.length;

            },
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

    public static multiply<T>(array: T[], multiplier: int): length {

        const end: int = Math.abs(multiplier);
        for(let count: int = 1; count < end; count++) {

            array.push(...array);

        }
        if(NumberUtils.isNegative(multiplier)) array.reverse();
        const { length } = array;
        return length;

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
            inArray ? (NumberUtils.isNegative(int) ? length + int : int) : undefined
        ;
        return index;

    }








    // static deleteIndexes() {}

}
