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
    // hasIndex -> change: this should only work with integers
    // iterateFrom() works but try to simplify more
    // iterateFrom(): when number is returned, add it to count instead of making tempPeriod
    // iterateFrom callback should be optional

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
        if(length == 0) return false;
        const positive: index = NumberUtils.isNegative(index) ? length + index : index;
        const range: Range = new Range(0, length, true, false);
        return range.inRange(positive);

    }

    public static indexes<T>(array: T[], start: index = 0): index[] {

        const indexes: index[] = [];
        this.iterateFrom(array, start, (_, index) => {

            indexes.push(index);

        });
        return indexes;

    }

    public static insert<T>(array: T[], add: T[], index: index = array.length): length {

        array.splice(index, 0, ...add);
        const { length } = array;
        return length;

    }

    // public static iterateFrom<T>(array: T[], start: index, callback: ArrayUtils.callbackEach<T, any>): int {

    //     let count: int = 0;
        // const forward: boolean = !NumberUtils.isNegative(start);
        // const period: int = forward ? 1 : -1;
        // const condition: (value: number) => boolean =
        //     forward ? value => (value < array.length) :
        //     value => {
                
        //         const negativeFirstIndex: index = this.negativeIndex(array, 0) as number;
        //         return value > negativeFirstIndex;

        //     }
        // ;
        // const iterator: Counter = new Counter(start, period, condition);
        // let tempPeriod: canBeUndefined<int>;

        // for(let index of iterator.iterate()) {

        //     if(tempPeriod !== undefined) {

        //         iterator.period = period;
        //         tempPeriod = undefined;

        //     }

        //     index = this.positiveIndex(array, index) as index;
        //     const element: T = array[index];
        //     const returnValue = callback(element, index, array);
        //     count++;

        //     if(returnValue === false) break;
        //     else if(NumberUtils.isNumber(returnValue)) tempPeriod = returnValue;

        //     if(tempPeriod !== undefined) iterator.period = tempPeriod;

        // }

    //     return count;

    // }

    public static iterateFrom<T>(
        array: T[],
        start: index,
        callbackEach: ArrayUtils.callbackEach<T, unknown>
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
                return callbackEach(element, index, array);

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
