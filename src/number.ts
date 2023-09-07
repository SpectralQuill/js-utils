module NumberUtils {

    export type callbackValue<R> = (number: number) => R;

}

export default class NumberUtils {

    /*
    
        To add:
            largest()
            smallest()

        To change:
    
    */

    public static decimalPlacesLength(number: frac): length {

        return this.isInteger(number) ? 0 : (number % 1).toString().length - 2;

    }

    public static dilate(number: frac, dilate: int = this.decimalPlacesLength(number)): frac {

        if(this.isNonnegative(dilate))
            number *= 10**dilate;
        else
            number /= 10**Math.abs(dilate);
        return number;

    }

    public static isInteger(number: frac): boolean {

        return number % 1 === 0;

    }

    public static isNegative(number: frac): boolean {

        return number < 0;

    }

    public static isNonnegative(number: frac): boolean {

        return number >= 0;

    }

    public static isNumber(value: unknown): boolean {

        return !isNaN(value as number);

    }

    public static isPositive(number: number): boolean {

        return number > 0;

    }

    public static isZero(number: frac): boolean {

        return number == 0;

    }

    public static mostDecimalPlaces(...numbers: frac[]): canBeUndefined<frac> {

        let mostDecimalPlaces: canBeUndefined<frac>;
        let mostDecimalPlacesLength: int = 0;
        numbers.forEach(number => {

            const decimalPlacesLength: int = this.decimalPlacesLength(number);
            if(mostDecimalPlaces == undefined || decimalPlacesLength > mostDecimalPlacesLength) {

                mostDecimalPlaces = number;
                mostDecimalPlacesLength = decimalPlacesLength;

            }

        });
        return mostDecimalPlaces;

    }

    public static mostDecimalPlacesLength(...numbers: frac[]): length {

        let mostDecimalPlacesLength: int = 0;
        numbers.forEach(number => {

            const decimalPlacesLength: int = this.decimalPlacesLength(number);
            if(decimalPlacesLength > mostDecimalPlacesLength) mostDecimalPlacesLength = decimalPlacesLength;

        });
        return mostDecimalPlacesLength;

    }

    public static switchSign<R>(
        number: number,
        positive?: NumberUtils.callbackValue<R>,
        negative?: NumberUtils.callbackValue<R>,
        zero?: NumberUtils.callbackValue<R>
    ): canBeUndefined<R> {

        const { isNegative, isPositive } = NumberUtils;
        return (
            isPositive(number) ? positive?.(number) :
            isNegative(number) ? negative?.(number) :
            zero?.(number)
        );

    }

}
