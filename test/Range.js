import NullishUtils from "./NullishUtils.js";
import NumberUtils from "./NumberUtils.js";
export default class Range {
    start;
    end;
    includeStart;
    includeEnd;
    period;
    constructor(start, end, includeStart = true, includeEnd = true, period = 0) {
        this.start = start;
        this.end = end;
        this.includeStart = includeStart;
        this.includeEnd = includeEnd;
        this.period = period;
        if (start > end) {
            this.start = end;
            this.end = start;
        }
    }
    hasPeriod() {
        return this.period != 0;
    }
    inRange(number) {
        const { start, end, includeStart, includeEnd, period } = this, moreThanStart = (includeStart ? (number >= start) : (number > start)), lessThanEnd = (includeEnd ? (number <= end) : (number < end)), integerIndex = NumberUtils.isInteger((this.isForward() ? (number - start) : (end - number)) / period);
        return (moreThanStart && lessThanEnd) && (!this.hasPeriod() || integerIndex);
    }
    isBackward() {
        return !this.isForward;
    }
    isForward() {
        return this.period > 0;
    }
    pickNumber() {
        // figure out how to properly exclude start
        if (!this.hasPeriod())
            return NullishUtils.makeUndefined();
        const { start, end, period } = this;
        let length = Math.floor((end - start) / Math.abs(period)) + 1;
        const farthestNumber = (this.isForward() ? start : end) + (length - 1) * period, excludeStart = !this.includeStart && this.isForward() || farthestNumber == start, excludeEnd = !this.includeEnd && this.isBackward() || farthestNumber == end;
        if (excludeStart)
            length--;
        if (excludeEnd)
            length--;
        console.log("length: " + length);
        let index = Math.floor(Math.random() * length);
        if (excludeStart)
            index++;
        // 3 9
        // 9 6 3
        const picked = (this.isForward() ? start : end) + index * period;
        return picked;
        /*
        
            2 8 f t -3

            ogLength = Math.floor( ( end - start ) / Math.abs( period ) ) + 1
            excludeStart = !includeStart && ( isForward() ? true : () )
            excludeEnd?
            if( excludeStart ) length--
            if( excludeEnd ) length--
            index = Math.floor( Math.random() * length )
            if( excludeStart ) index++
            picked = ( this.isForward() ? start : end ) + index * period

            2 5 8
            2 5 8
        
        */
    }
    toString() {
        const { start, end, includeStart, includeEnd } = this;
        return `${includeStart ? "[" : "("}${start}, ${end}${includeEnd ? "]" : ")"}`;
    }
}
