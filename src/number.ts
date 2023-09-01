module NumberUtils {

    export type callbackValue<R> = (number: number) => R;

}

export default class NumberUtils {

    // switchSign: callbacks should be optional

    public static decimalPlaces(number: number): number {

        const string: string = number.toString();
        const length: int = string.length;
        const decimalIndex: index = string.indexOf(".");
        return decimalIndex > -1 ? (length - decimalIndex - 1) : 0;

    }

    public static isInteger(number: number): boolean {

        return number % 1 === 0;

    }

    public static isNegative(number: number): boolean {

        return number < 0;

    }

    public static isNumber(value: unknown): boolean {

        return !isNaN(value as number);

    }

    public static isPositive(number: number): boolean {

        return number > 0;

    }

    public static isZero(number: number): boolean {

        return number == 0;

    }

    public static mostDecimalPlaces(collection: collection<number>): number {

        let mostDecimalPlaces: int = 0;
        collection.forEach(number => {

            const decimalPlaces: int = NumberUtils.decimalPlaces(number);
            if(decimalPlaces > mostDecimalPlaces) mostDecimalPlaces = decimalPlaces;

        });
        return mostDecimalPlaces;

    }

    public static switchSign<R>(
        number: number,
        positive: NumberUtils.callbackValue<R>,
        negative: NumberUtils.callbackValue<R>,
        zero: NumberUtils.callbackValue<R>
    ): R {

        const { isNegative, isPositive } = NumberUtils;
        return (
            isPositive(number) ? positive(number) :
            isNegative(number) ? negative(number) :
            zero(number)
        );

    }

}
