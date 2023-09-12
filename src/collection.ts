import ArrayUtils from "./array";
import SetUtils from "./set";

module CollectionUtils {

    export type callback<T, R> = (element: T, collection: collection<T>) => R;
    export type deleted<T> = collection<T>;
    export type match<T> = callback<T, boolean>;

}

export default class CollectionUtils {

    /*

        To add:
            insert()
            most()
    
        To change:
            pickElement() & pickElements():
                match
                length -> max
    
    */

    public static countMatch<T>(collection: collection<T>, match?: CollectionUtils.match<T>, max?: int): int {

        return this.switchInstance<T, int>(
            collection,
            array => ArrayUtils.countMatch(array, element => (match?.(element, collection) ?? true), max),
            set => SetUtils.countMatch(set, element => (match?.(element, collection) ?? true), max)
        ) as int;

    }

    public static clear<T>(collection: collection<T>): void {

        this.switchInstance<T, void>(
            collection,
            array => ArrayUtils.clear(array),
            set => set.clear()
        );

    }

    public static deleteMatch<T>(
        collection: collection<T>,
        match?: CollectionUtils.match<T>,
        max?: int
    ): CollectionUtils.deleted<T> {

        return this.switchInstance<T, CollectionUtils.deleted<T>>(
            collection,
            array => ArrayUtils.deleteMatch(array, element => (match?.(element, collection) ?? true), max),
            set => SetUtils.deleteMatch(set, element => (match?.(element, collection) ?? true), max)
        ) as CollectionUtils.deleted<T>;

    }

    public static every<T>(collection: collection<T>, predicate: CollectionUtils.match<T>): boolean {

        const predicateArg = this.predicate(predicate, collection);
        return this.switchInstance<T, boolean>(
            collection,
            array => array.every(predicateArg),
            set => SetUtils.every(set, predicateArg)
        ) as boolean;

    }

    public static isEmpty<T>(collection: collection<T>): boolean {

        return this.switchInstance<T, boolean>(
            collection,
            array => ArrayUtils.isEmpty(array),
            set => SetUtils.isEmpty(set)
        ) as boolean;

    }

    public static pickElement<T>(collection: collection<T>): canBeUndefined<T> {

        return this.switchInstance(
            collection,
            array => ArrayUtils.pickElement(array),
            set => SetUtils.pickElement(set)
        );

    }

    public static pickElements<T>(
        collection: collection<T>,
        toArray: boolean = true,
        shuffle: boolean = false
    ): collection<T> {

        const picked: collection<T> = this.switchInstance<T, collection<T>>(
            collection,
            array => ArrayUtils.pickElements(array),
            set => SetUtils.pickElements(set)
        ) as collection<T>;
        return toArray ? this.toArray(picked, shuffle) : this.toSet(picked);

    }

    public static some<T>(collection: collection<T>, predicate: CollectionUtils.match<T>): boolean {

        const predicateArg = this.predicate(predicate, collection);
        return this.switchInstance<T, boolean>(
            collection,
            array => array.some(predicateArg),
            set => SetUtils.some(set, predicateArg)
        ) as boolean;

    }

    public static switchInstance<T, R>(
        collection: collection<T>,
        array?: (array: T[]) => R,
        set?: (set: Set<T>) => R
    ): canBeUndefined<R> {

        return collection instanceof Array ? array?.(collection as T[]) : set?.(collection as Set<T>);

    }

    public static toArray<T>(collection: collection<T>, shuffle: boolean = false): T[] {

        return this.switchInstance(
            collection,
            array => shuffle ? array : ArrayUtils.shuffle(array),
            set => SetUtils.toArray(set, shuffle)
        ) as T[];

    }

    public static toSet<T>(collection: collection<T>): Set<T> {

        return this.switchInstance(
            collection,
            array => ArrayUtils.toSet(array),
            set => set
        ) as Set<T>;

    }

    

    private static predicate<T>(
        predicate: CollectionUtils.match<T>,
        collection: collection<T>
    ): (element: T) => boolean {

        return element => predicate(element, collection);

    }

}
