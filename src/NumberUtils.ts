class NumberUtils {

    public static fracArrayCompare: comparator< frac[] > = ( array1, array2 ) => {

        let
            index: int, length: int = Math.max( array1.length, array2.length ),
            number1: frac = 0, number2: frac = 0
        ;
        for( index = 0; number1 === number2 && index < length; index++ ) {

            number1 = array1[ index ] ?? 0;
            number2 = array2[ index ] ?? 0;

        } 
        return this.fracCompare( number1, number2 );

    };

    public static fracCompare: comparator< frac > = ( number1, number2 ) => ( number1 - number2 );

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
