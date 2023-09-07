import NumberUtils from "./number";

export default class Range {

    // in random, make a set of possible numbers and get random from there to simplify

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

    // public random1(period: number = 1): canBeUndefined<number> {

    //     let { start, end } = this;
    //     const { includeStart, includeEnd } = this;
    //     const dilate: number = 10**NumberUtils.mostDecimalPlacesLength(start, end, period);

    //     start *= dilate;
    //     end *= dilate;
    //     period *= dilate;

    //     if(!includeStart) start += period;
    //     let length: number = Math.floor((end - start) / period + 1);
    //     const poolEnd: number = (start + period * (length - 1));
    //     if(!includeEnd && end == poolEnd) length--;

    //     if(length < 1) return undefined;
    //     const index: index = Math.floor(Math.random() * length);
    //     const random: number = (start + period * index) / dilate;

    //     return random;

    // }

    // public random2(period: frac = 1): canBeUndefined<frac> {

    //     let { start, end } = this;
    //     const { includeStart, includeEnd } = this;
    //     const dilate: frac = 10**NumberUtils.mostDecimalPlacesLength(start, end, period);

    //     period *= dilate;
    //     start = (start * dilate) + (!includeStart ? period : 0);
    //     end *= dilate;

    //     let length: int = Math.floor((end - start) / period + 1);
    //     const poolEnd: frac = (start + period * (length - 1));
    //     if(!includeEnd && end == poolEnd) length--;

    //     if(length == 0) return undefined;
    //     const index: index = Math.floor(Math.random() * length);
    //     const random: frac = (start + period * index) / dilate;

    //     return random;

    // }

    public random(period: frac = 1): canBeUndefined<frac> {

        let { start, end } = this;
        const { includeStart, includeEnd } = this;

        let dilate: int = NumberUtils.mostDecimalPlacesLength(start, end, period);
        period = NumberUtils.dilate(period, dilate);
        start = NumberUtils.dilate(start, dilate) + (!includeStart ? period : 0);
        end = NumberUtils.dilate(end, dilate);

        let length: int = Math.floor((end - start) / period + 1);
        const poolEnd: frac = (start + period * (length - 1));
        if(!includeEnd && end == poolEnd) length--;

        if(length == 0) return undefined;
        dilate *= -1;
        const index: index = Math.floor(Math.random() * length);
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
