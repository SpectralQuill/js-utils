module CollectionUtils {

    

}

export default class CollectionUtils {

    /*

        To add:
            clear()
            countMatch()
            deleteMatch()
            every()
            insert()
            isEmpty(): generalized
            most()
            pickElement()
            some()
            toArray()
    
        To change:
            - isEmpty should seperately be in array and set. a general one can be here.
    
    */

    public static isEmpty<T>(collection: collection<T>): boolean {

        return this.switchType(
            collection,
            (array: T[]) => array.length == 0,
            (set: Set<T>) => set.size == 0
        ) as boolean;

    }

    public static switchType<T, R>(
        collection: collection<T>,
        array?: (array: T[]) => R,
        set?: (set: Set<T>) => R
    ): canBeUndefined<R> {

        return collection instanceof Array ? array?.(collection) : set?.(collection);

    }

}
