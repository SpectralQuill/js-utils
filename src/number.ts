export default class NumberUtils {

    static execute<R>(
        number: number,
        positive: (number: number) => R,
        negative: (number: number) => R,
        zero: (number: number) => R
    ): R {

        const { isNegative, isPositive } = NumberUtils;
        return (
            isPositive(number) ? positive(number) :
            isNegative(number) ? negative(number) :
            zero(number)
        );

    }

    static isNegative(number: number): boolean {

        return number < 0;

    }

    static isPositive(number: number): boolean {

        return number > 0;

    }

    static isZero(number: number): boolean {

        return number == 0;

    }

    static inRange(
        number: number,
        start: number = 0,
        end: number,
        includeStart: boolean = true,
        includeEnd: boolean = true
    ): boolean {

        return (
            (includeStart ? number >= start : number > start) &&
            (includeEnd ? number <= end : number < end)
        );

    }

}
