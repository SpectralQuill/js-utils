import BooleanUtils from "./booleanUtils";
import CollectionUtils from "./collection";
import NumberUtils from "./number";
import Range from "./range";

module ArrayUtils {

    export type callback<T, R> = (element: T, index: index, array: T[]) => R;
    export type match<T> = T | ArrayUtils.callback<T, boolean>;

}

export default class ArrayUtils {

    // count, delete, indexes (start)
    // multiply should take decimals as well

    private static makeMatchFn<T>(
        match: ArrayUtils.match<T>
    ): ArrayUtils.callback<T, boolean> {

        return match instanceof Function ? match : (element => element == match);

    }

    public static count<T>(array: T[], match: ArrayUtils.match<T>): number {

        const check: ArrayUtils.match<T> = ArrayUtils.makeMatchFn<T>(match);
        const count: number = array.reduce((count, element, index) => {

            if(check(element, index, array)) count++;
            return count;

        }, 0);
        return count;

    }

    public static delete<T>(array: T[], match: ArrayUtils.match<T>): T[] {

        const check: ArrayUtils.match<T> = ArrayUtils.makeMatchFn<T>(match);
        const deleted: T[] = [];
        for(let index: index = 0; index < array.length;) {

            const element = array[index];
            if(check(element, index, array)) {

                array.splice(index, 1);
                deleted.push(element);

            }else index++

        }
        return deleted;

    }

    public static hasIndex<T>(array: T[], index: index): boolean {

        if(CollectionUtils.isEmpty(array)) return false;
        const { length } = array;
        const positive: index = NumberUtils.isNegative(index) ? length + index : index;
        const range: Range = new Range(0, length, true, false);
        return range.inRange(positive);

    }

    public static indexes<T>(
        array: T[],
        callback?: ArrayUtils.callback<T, boolean>,
        positive: boolean = true
    ): index[] {

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
