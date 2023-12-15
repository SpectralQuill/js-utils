import Counter from "./Counter.js";
import NullishUtils from "./NullishUtils.js";
import NumberUtils from "./NumberUtils.js";
import Range from "./Range.js";
export default class ArrayUtils {
    static addArray(array, add, index = this.lastIndex(array)) {
        index = this.toNonnegativeIndex(array, index);
        array.splice(index, 0, ...add);
        return array;
    }
    static clear(array, start = 0) {
        return this.deleteMatch(array, undefined, start);
    }
    static deleteIndex(array, index = this.lastIndex(array)) {
        index = this.toNonnegativeIndex(array, index);
        return array.splice(index, 1)[0];
    }
    static deleteMatch(array, match, start = 0) {
        const deleted = [];
        for (let [element, index, _, counter] of this.iterate(array, start)) {
            if (!(match?.(element, index, array, counter) ?? true))
                continue;
            deleted.push(this.deleteIndex(array, index));
            if (counter.isForward())
                counter.skip(-1);
        }
        return deleted;
    }
    static findMatch(array, match, start = 0) {
        const found = [];
        for (let [element, index, _, counter] of this.iterate(array, start)) {
            if (match?.(element, index, array, counter) ?? true)
                found.push(element);
        }
        return found;
    }
    static firstMatch(array, match, start = 0) {
        for (let [element, index, _, counter] of this.iterate(array, start)) {
            if (match?.(element, index, array, counter) ?? true)
                return element;
        }
        return NullishUtils.makeUndefined();
    }
    static firstIndex(array, nonnegative = true) {
        if (this.isEmpty(array))
            return NullishUtils.makeUndefined();
        let index = 0;
        if (!nonnegative)
            index = this.toNegativeIndex(array, index);
        return index;
    }
    static hasIndex(array, index = 0) {
        const { length } = array, range = new Range(-length, length, true, false, 1);
        return range.inRange(index);
    }
    static hasNegativeIndex(array, index = this.firstIndex(array, false)) {
        const { length } = array, range = new Range(-length, 0, true, false, 1);
        return range.inRange(index);
    }
    static hasNonnegativeIndex(array, index = 0) {
        const { length } = array, range = new Range(0, length, true, false, 1);
        return range.inRange(index);
    }
    static isEmpty(array) {
        return array.length == 0;
    }
    static *iterate(array, start = 0) {
        if (this.isEmpty(array))
            return;
        let period = NumberUtils.isNonnegative(start) ? 1 : -1, element;
        start = this.toNonnegativeIndex(array, start);
        const counter = new Counter(start, period);
        for (let [index] of counter) {
            if (!this.hasNonnegativeIndex(array, index))
                break;
            element = array[index];
            yield [element, index, array, counter];
        }
    }
    static lastIndex(array, nonnegative = true) {
        if (this.isEmpty(array))
            return NullishUtils.makeUndefined();
        let index = array.length - 1;
        if (!nonnegative)
            index = this.toNegativeIndex(array, index);
        return index;
    }
    static toNegativeIndex(array, index) {
        return (!this.hasIndex(array, index) ? NullishUtils.makeUndefined() :
            NumberUtils.isNonnegative(index) ? (index - array.length) :
                index);
    }
    static toNonnegativeIndex(array, index) {
        return (!this.hasIndex(array, index) ? NullishUtils.makeUndefined() :
            NumberUtils.isNegative(index) ? (index + array.length) :
                index);
    }
    static toOppositeIndex(array, index) {
        return (!this.hasIndex(array, index) ? NullishUtils.makeUndefined() :
            NumberUtils.isNonnegative(index) ? this.toNegativeIndex(array, index) :
                this.toNonnegativeIndex(array, index));
    }
    static toSet(array) {
        return new Set(array);
    }
    static uniqueElements(array, start = 0) {
        const unique = [];
        for (let [element] of this.iterate(array, start)) {
            if (!unique.includes(element))
                unique.push(element);
        }
        return unique;
    }
}
