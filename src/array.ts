import CollectionUtils from "./collection";
import NumberUtils from "./number";

module ArrayUtils {

    export type generalBooleanCallback = (element: any, index: index, array: any[]) => boolean;
    export type indexCallback = oneArgBooleanCallback<index>;

}

export default class ArrayUtils {

    static hasIndex<T>(array: T[], index: index): boolean {

        const { length } = array;
        const positiveIndex: index = NumberUtils.isNegative(index) ? length + index : index;
        return NumberUtils.inRange(positiveIndex, 0, length, true, false);

    }

    static indexes<T>(
        array: T[],
        excludeElements: collection<T>,
        excludeIndexes: collection<index>,
        positive: boolean = true
    ): index[] {

        type elementCallback = oneArgBooleanCallback<T>;
        type indexCallback = ArrayUtils.indexCallback;
        
        const elementExcluded: elementCallback = CollectionUtils.execute<T, elementCallback>(
            excludeElements,
            (array: T[]) => (element: T) => array.includes(element),
            (set: Set<T>) => (element: T) => set.has(element)
        );
        const indexExcluded: indexCallback = CollectionUtils.execute<index, indexCallback>(
            excludeIndexes,
            (array: index[]) => (index: index) => array.includes(index),
            (set: Set<index>) => (index: index) => set.has(index)
        );
        const indexes: index[] = array.reduce((indexes: index[], element: T, index: index) => {

            if(!elementExcluded(element) && !indexExcluded(index)) {
                
                index = this.indexOfInt(array, index, positive);
                indexes.push(index);

            }
            return indexes;

        }, []);
        return indexes;

    }

    static indexOfInt<T>(array: T[], int: int, positive: boolean = true): index {

        const inArray: boolean = this.hasIndex(array, int);
        if(!inArray) return -1;

        const { length } = array;
        const positiveIndex: index = NumberUtils.isNegative(int) ? length + int : int;
        const negativeIndex: index = -length + positiveIndex;
        return positive ? positiveIndex : negativeIndex;

    }

    // static deleteElements() {}

    // static deleteIndexes() {}

}
