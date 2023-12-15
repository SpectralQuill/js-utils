import NumberUtils from "./NumberUtils.js";
export default class Counter {
    start;
    period;
    count;
    constructor(start = 0, period = 1) {
        this.start = start;
        this.period = period;
        this.count = start;
    }
    backward() {
        return this.period = NumberUtils.toNegative(this.period);
    }
    forward() {
        return this.period = NumberUtils.toPositive(this.period);
    }
    isBackward() {
        return NumberUtils.isNegative(this.period);
    }
    isForward() {
        return NumberUtils.isPositive(this.period);
    }
    next(period = this.period) {
        return this.count += period;
    }
    reset(start = this.start) {
        return this.count = start;
    }
    reverse() {
        return this.period = NumberUtils.toOpposite(this.period);
    }
    skip(skip = 1) {
        return this.count += this.period * skip;
    }
    *[Symbol.iterator]() {
        while (true) {
            yield [this.count, this];
            this.next();
        }
    }
    toNumber() {
        return this.count;
    }
    toString() {
        return this.toNumber().toString();
    }
}
