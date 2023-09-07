import NumberUtils from "./number";

export default class Range {

    public constructor(
        private readonly start: number,
        private readonly end: number,
        private readonly includeStart: boolean = true,
        private readonly includeEnd: boolean = true
    ) {

        if(start > end) {

            this.start = end;
            this.end = start;

        }

    }

    public inRange(number: frac): boolean {

        return this.moreThanStart(number) && this.lessThanEnd(number);

    }

    public pickNumber(period: frac = 1): canBeUndefined<frac> {

        let { start, end } = this;
        const { includeStart, includeEnd } = this;

        let dilate: int = NumberUtils.mostDecimalPlacesLength(start, end, period);
        period = NumberUtils.dilate(period, dilate);
        start = NumberUtils.dilate(start, dilate) + (!includeStart ? period : 0);
        end = NumberUtils.dilate(end, dilate);

        let poolLength: int = Math.floor((end - start) / period + 1);
        const poolEnd: frac = (start + period * (poolLength - 1));
        if(!includeEnd && end == poolEnd) poolLength--;

        if(poolLength == 0) return undefined;
        dilate *= -1;
        const index: index = Math.floor(Math.random() * poolLength);
        const random: frac = NumberUtils.dilate(start + period * index, dilate);
        return random;

    }

    private moreThanStart(number: frac): boolean {

        const { start, includeStart } = this;
        return includeStart ? number >= start : number > start;

    }

    private lessThanEnd(number: frac): boolean {

        const { end, includeEnd } = this;
        return includeEnd ? number <= end : number < end;

    }

}
