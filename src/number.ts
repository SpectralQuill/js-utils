module NumberUtils {

    export type generalCallback<R> = (number: number) => R;

}

export default class NumberUtils {

    public static execute<R>(
        number: number,
        positive: NumberUtils.generalCallback<R>,
        negative: NumberUtils.generalCallback<R>,
        zero: NumberUtils.generalCallback<R>
    ): R {

        const { isNegative, isPositive } = NumberUtils;
        return (
            isPositive(number) ? positive(number) :
            isNegative(number) ? negative(number) :
            zero(number)
        );

    }

    public static getDecimalPlaces(number: number): number {

        const string: string = number.toString();
        const length: int = string.length;
        const decimalIndex: index = string.indexOf(".");
        return decimalIndex > -1 ? (length - decimalIndex - 1) : 0;

    }

    public static isNegative(number: number): boolean {

        return number < 0;

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

            const decimalPlaces: int = NumberUtils.getDecimalPlaces(number);
            if(decimalPlaces > mostDecimalPlaces) mostDecimalPlaces = decimalPlaces;

        });
        return mostDecimalPlaces;

    }

}
