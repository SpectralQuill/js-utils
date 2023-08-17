module CollectionUtils {

    export type elementCallback<T, R> = (element: T) => R;

}

export default class CollectionUtils {

    public static execute<T, R>(
        collection: collection<T>,
        array: (array: T[]) => R,
        set: (set: Set<T>) => R
    ): R {

        return collection instanceof Array ? array(collection) : set(collection);

    }

    public static isEmpty<T>(collection: collection<T>): boolean {

        return this.execute(
            collection,
            (array: T[]) => array.length == 0,
            (set: Set<T>) => set.size == 0
        )

    }

}
