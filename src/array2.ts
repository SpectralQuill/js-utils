import Counter from "./counter";
import NumberUtils from "./number";
import Range from "./range";

module ArrayUtils {

    export type iterateYield<T> = [ T, index, T[] ];
    export type iterateNext = canBeUndefined<[
        resume?: boolean,
        skip?: index,
        forward?: boolean
    ]>;

}

export default class ArrayUtils {

    /*
    
        To add:

        To change:
    
    */

    public static hasIndex<T>(array: T[], index: index): boolean {

        const { length } = array;
        if(length == 0 || !NumberUtils.isInteger(index)) return false;
        const
            isNonnegative: boolean = NumberUtils.isNonnegative(index),
            start: index = isNonnegative ? 0 : -length,
            end: index = isNonnegative ? length : -1,
            includeStart: boolean = true,
            includeEnd: boolean = !isNonnegative,
            range: Range = new Range(start, end, includeStart, includeEnd)
        ;
        return range.inRange(index);

    }

    public static isEmpty<T>(array: T[]): boolean {

        return array.length == 0;

    }

    public static * iterate<T>(array: T[], forward: boolean = true): Generator<
        ArrayUtils.iterateYield<T>,
        ArrayUtils.iterateYield<T>,
        ArrayUtils.iterateNext
    > {

        let
            element: T = undefined as T,
            index: index,
            next: ArrayUtils.iterateNext
        ;
        for(
			index = forward ? 0 : (array.length - 1);
			forward ? (index < array.length) : (index >= 0);
			index += forward ? 1 : -1
		) {

			element = array[index];
			next = yield [ element, index, array ];
			if(next != undefined) {

				let [ resume, skip, newForward ] = next;
                if(resume != undefined) if(!resume) break;
                if(skip != undefined) index += forward ? skip : -skip;
                if(newForward != undefined) forward = newForward; 

			}

		}
		return [undefined as T, undefined as unknown as index, array];

    }

    public static lastIndex<T>(array: T[], nonnegative: boolean = true): index {

        if(this.isEmpty(array)) return undefined as unknown as index;
        const lastIndex: index = array.length - 1;
        return nonnegative ? lastIndex : this.negativeIndex(array, lastIndex);

    }

    public static negativeIndex<T>(array: T[], index: index): index {

        const
            { length } = array,
            hasIndex: boolean = this.hasIndex(array, index)
        ;
        if(!hasIndex) return undefined as unknown as index;
        index = NumberUtils.isNegative(index) ? index : (index - length);
        return index;

    }

    public static nonnegativeIndex<T>(array: T[], index: index): index {

        const
            { length } = array,
            hasIndex: boolean = this.hasIndex(array, index)
        ;
        if(!hasIndex) return undefined as unknown as index;
        index = NumberUtils.isNegative(index) ? (length + index) : index;
        return index;

    }

}