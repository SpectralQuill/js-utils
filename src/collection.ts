export default class CollectionUtils {

    static execute<T, R> (
        collection: collection<T>,
        array: (array: T[]) => R,
        set: (set: Set<T>) => R
    ): R {

        return collection instanceof Array ? array(collection) : set(collection);

    }

}
