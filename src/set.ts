import ArrayUtils from "./array";
import NumberUtils from "./number";

module SetUtils {

    export type callback<T, R> = (element: T, set: Set<T>) => R;
    export type compare<T> = (
        element1: T,
        element2: T | undefined,
        set: Set<T>
    ) => boolean;
    export type deleted<T> = Set<T>;
    export type match<T> = callback<T, boolean>;

}

export default class SetUtils {

    /*

        To add:
        
        To change:
            pickElement() & pickElements():
                match
                length -> max
    
    */

    public static addArray<T>(set: Set<T>, add: T[]): size {

        return this.addCollection(set, add);

    }

    public static addCollection<T>(set: Set<T>, add: collection<T>): size {

        add.forEach(element => set.add(element));
        return set.size;

    }

    public static addSet<T>(set: Set<T>, add: Set<T>): size {

        return this.addCollection(set, add);

    }

    public static countMatch<T>(set: Set<T>, match?: SetUtils.match<T>, max?: length): length {

        let count: length = 0;
        try {

            set.forEach(element => {

                if(match?.(element, set)) count++;
                if(NumberUtils.maxed(count, max)) throw undefined;
    
            });

        } catch(_) {}
        return count;

    }

    public static deleteMatch<T>(set: Set<T>, match?: SetUtils.match<T>, max?: length): SetUtils.deleted<T> {

        const array: T[] = this.toArray(set, true);
        const toDelete: T[] = ArrayUtils.deleteMatch(array, element => match?.(element, set) ?? true, 0, max);
        const deleted: Set<T> = new Set();
        try {

            toDelete.forEach(element => {

                set.delete(element);
                deleted.add(element);
                if(NumberUtils.maxed(deleted.size, max)) throw undefined;

            });

        } catch(_) {}
        return deleted;

    }

    public static difference<T>(set1: Set<T>, set2: Set<T>): Set<T> {

        const difference: Set<T> = new Set();
        set1.forEach(element => {

            if(!set2.has(element)) difference.add(element);

        });
        return difference;

    }

    public static every<T>(set: Set<T>, predicate: SetUtils.match<T>): boolean {

        let every: boolean = true;
        try {

            set.forEach(element => {

                if(!predicate(element, set)) {

                    every = false;
                    throw undefined;

                }
    
            })

        } catch(_) {}
        return every;

    }

    public static filter<T>(set: Set<T>, match: SetUtils.match<T>): Set<T> {

        const filtered: Set<T> = new Set();
        set.forEach(element => {

            if(match(element, set)) filtered.add(element);

        });
        return filtered;

    }

    public static intersection<T>(set1: Set<T>, set2: Set<T>): Set<T> {

        const intersection: Set<T> = new Set();
        set1.forEach(element => {

            if(set2.has(element)) intersection.add(element);

        });
        return intersection;

    }

    public static isEmpty<T>(set: Set<T>): boolean {

        return set.size == 0;

    }

    public static map<T, R>(set: Set<T>, callbackEach: SetUtils.callback<T, R>): Set<R> {

        const mapped: Set<R> = new Set();
        set.forEach(element => mapped.add(callbackEach(element, set)));
        return mapped;

    }

    public static most<T>(set: Set<T>, compare: SetUtils.compare<T>): canBeUndefined<T> {

        let mostElement: canBeUndefined<T>;
        set.forEach(element => {

            if(compare(element, mostElement, set)) mostElement = element;

        });
        return mostElement;

    }

    public static pickElement<T>(set: Set<T>, match?: SetUtils.match<T>): canBeUndefined<T> {

        const array: T[] = this.toArray(set);
        const element: canBeUndefined<T> = ArrayUtils.pickElement(array);
        return element;

    }

    public static pickElements<T>(set: Set<T>, length: length = set.size): Set<T> {

        const array: T[] = this.toArray(set);
        const picked: T[] = ArrayUtils.pickElements(array, length);
        return new Set(picked);

    }

    public static some<T>(set: Set<T>, predicate: SetUtils.match<T>): boolean {

        let some: boolean = false;
        try {

            set.forEach(element => {

                if(predicate(element, set)) {

                    some = true;
                    throw undefined;

                }
    
            })

        } catch(_) {}
        return some;

    }

    public static toArray<T>(set: Set<T>, shuffle: boolean = false): T[] {

        let array: T[] = Array.from(set);
        if(shuffle) array = ArrayUtils.shuffle(array);
        return array;

    }

    public static union<T>(set1: Set<T>, set2: Set<T>): Set<T> {

        const union: Set<T> = new Set();
        set1.forEach(element => union.add(element));
        set2.forEach(element => union.add(element));
        return union;

    }

}
