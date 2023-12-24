import NullishUtils from "./NullishUtils";

class NumberUtils {

    public static fracArrayCompare( array1: frac[], array2: frac[] ): frac {

        let
            index: int, length: int = Math.max( array1.length, array2.length ),
            undefinedFrac = NullishUtils.makeUndefined< frac >(),
            number1: frac = undefinedFrac, number2: frac = undefinedFrac
        ;
        for( index = 0; number1 === number2 && index < length; index++ ) {

            number1 = array1[ index ] ?? 0;
            number2 = array2[ index ] ?? 0;

        } 
        return this.fracCompare( number1, number2 );

    }

    public static fracCompare( number1: frac, number2: frac ): frac {

        return number1 - number2

    };

    public static isInteger( number: frac ): boolean {

        return number % 1 == 0;

    }

    public static isNegative( number: frac ): boolean {

        return number < 0;

    }

    public static isNonnegative( number: frac ): boolean {

        return number >= 0;

    }

    public static isPositive( number: frac ): boolean {

        return number > 0;

    }

    public static toNegative( number: frac ): frac {

        return -Math.abs( number );

    }

    public static toOpposite( number: frac ): frac {

        return (
            this.isPositive( number ) ? this.toNegative( number ) :
            this.isNegative( number ) ? this.toPositive( number ) :
            number
        );

    }

    public static toPositive( number: frac ): frac {

        return Math.abs( number );

    }
    
}

export default NumberUtils;
