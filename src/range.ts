import NumberUtils from "./number";

export default class Range {

    // when start > end switch them
    // in random, make a set of possible numbers and get random from there to simplify

    public constructor(
        public start: number,
        public end: number,
        public includeStart: boolean = true,
        public includeEnd: boolean = true
    ) {

        if(start > end) {

            this.start = end;
            this.end = start;

        }

    }

    public inRange(number: number): boolean {

        return this.moreThanStart(number) && this.lessThanEnd(number);

    }

    private moreThanStart(number: number): boolean {

        const { start, includeStart } = this;
        return includeStart ? number >= start : number > start;

    }

    private lessThanEnd(number: number): boolean {

        const { end, includeEnd } = this;
        return includeEnd ? number <= end : number < end;

    }

    public random(period: number = 1): number | undefined {

        let { start, end } = this;
        const { includeStart, includeEnd } = this;
        const dilate: number = 10**NumberUtils.mostDecimalPlaces([start, end, period]);

        start *= dilate;
        end *= dilate;
        period *= dilate;

        if(!includeStart) start += period;
        let length: number = Math.floor((end - start) / period + 1);
        const poolEnd: number = (start + period * (length - 1));
        if(!includeEnd && end == poolEnd) length--;

        if(length < 1) return undefined;
        const index: index = Math.floor(Math.random() * length);
        const random: number = (start + period * index) / dilate;

        return random;

    }

}