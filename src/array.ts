import BooleanUtils from "./booleanUtils";
import CollectionUtils from "./collection";
import Counter from "./counter";
import NumberUtils from "./number";
import Range from "./range";

module ArrayUtils {

    export type callback<T, R> = (element: T, index: index, array: T[]) => R;
    export type match<T> = ArrayUtils.callback<T, boolean>;

}

export default class ArrayUtils {

    // count, delete, indexes (start)
    // multiply should take decimals as well
    // iterateFrom(index: int)

    public static count<T>(array: T[], match: ArrayUtils.match<T>, start: number = 0): number {

        // simplify with iterateFrom()

        // const { length } = array;
        // if(length == 0) return 0;
        // const forward: boolean = !NumberUtils.isNegative(start);
        // const period: int = forward ? 1 : -1;
        // const negativeFirstIndex: index = this.negativeIndexOfInt(array, 0) as number;
        // const condition: (value: number) => boolean =
        //     forward ? (value => value < length) :
        //     (value => value > negativeFirstIndex)
        // ;
        // const iterator: Counter = new Counter(start, period, condition);
        // let count: int = 0;
        // for(let index of iterator) {

        //     const element: T = array.at(index) as T;
        //     if(match(element, index, array)) count++;

        // };
        // return count;

        let count: int = 0;
        this.iterateFrom(array, start, (element, index) => {

            if(match(element, index, array)) count++;

        });
        return count;

    }

    public static delete<T>(array: T[], match: ArrayUtils.match<T>): T[] {

        // start parameter
        const deleted: T[] = [];
        for(let index: index = 0; index < array.length;) {

            const element = array[index];
            if(match(element, index, array)) {

                array.splice(index, 1);
                deleted.push(element);

            }else index++

        }
        return deleted;

    }

    public static firstIndex<T>(array: T[]): canBeUndefined<index> {

        const { length } = array;
        return length == 0 ? undefined : 0;

    }

    public static hasIndex<T>(array: T[], index: index): boolean {
        
        // change: this should only work with integers
        const { length } = array;
        if(length == 0) return false;
        const positive: index = NumberUtils.isNegative(index) ? length + index : index;
        const range: Range = new Range(0, length, true, false);
        return range.inRange(positive);

    }

    public static indexes<T>(
        array: T[],
        callback?: ArrayUtils.callback<T, boolean>,
        positive: boolean = true
    ): index[] {

        // start parameter
        const check: ArrayUtils.callback<T, boolean> =
            callback instanceof Function ? callback :
            BooleanUtils.returnTrue
        ;
        const negative: boolean = !positive;
        let indexes: index[] = array.reduce((indexes: index[], element, index) => {

            if(check(element, index, array)) {

                if(negative) {
                    
                    const negativeIndex: canBeUndefined<index> =
                        ArrayUtils.negativeIndexOfInt(array, index)
                    ;
                    if(negativeIndex !== undefined) index = negativeIndex;
                
                }
                indexes.push(index);

            }
            return indexes;

        }, []);
        return indexes;

    }

    public static insert<T>(array: T[], add: T[], index: index = array.length): length {

        array.splice(index, 0, ...add);
        const { length } = array;
        return length;

    }

    public static indexOfInt<T>(array: T[], int: int): canBeUndefined<index> {

        const inArray: boolean = this.hasIndex(array, int);
        const { length } = array;
        const index: canBeUndefined<index> =
            inArray ? (NumberUtils.isNegative(int) ? length + int : int) : undefined
        ;
        return index;

    }

    public static iterateFrom<T>(array: T[], start: index, callback: ArrayUtils.callback<T, any>): int {

        const { length } = array;
        const negativeFirstIndex: index = this.negativeIndexOfInt(array, 0) as number;
        let count: int = 0;

        const forward: boolean = !NumberUtils.isNegative(start);
        const period: int = forward ? 1 : -1;
        const condition: (value: number) => boolean =
            forward ? value => (value < length) :
            value => (value > negativeFirstIndex)
        ;
        const iterator: Counter = new Counter(start, period, condition);

        for(let index of iterator) {

            const element: T = array.at(index) as T;
            const returnValue = callback(element, index, array);
            count++;

            if(returnValue === true) continue;
            else if(returnValue === false) break;

        }

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

    public static negativeIndexOfInt<T>(array: T[], int: int): canBeUndefined<index> {

        const { length } = array;
        const inArray: boolean = this.hasIndex(array, int);
        const index: canBeUndefined<index> =
            inArray ? (NumberUtils.isNegative(int) ? int : (int - length)) : (-length - 1)
        ;
        return index;

    }








    // static deleteIndexes() {}

}
