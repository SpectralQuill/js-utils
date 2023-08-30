import NumberUtils from "./number";

export default class Range {

    /*

        To add:
            period can be a function
        Changes to make:
            in getRandom, make a set of possible numbers and get random from there to simplify
    
    */

    public constructor(
        public start: number,
        public end: number,
        public includeStart: boolean = true,
        public includeEnd: boolean = true
    ) {}

    public inRange(number: number): boolean {

        const { start, end, includeStart, includeEnd } = this;
        return (
            (includeStart ? number >= start : number > start) &&
            (includeEnd ? number <= end : number < end)
        );

    }

    public getRandom(period: number = 1): number | undefined {

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