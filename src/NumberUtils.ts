import { NullishUtils } from "./NullishUtils";

export class NumberUtils {

    public static compareNumber( number1: number, number2: number ): number {

        return number1 - number2

    };

    public static compareNumberArray( array1: number[], array2: number[] ): number {

        let
            index: int, length: int = Math.max( array1.length, array2.length ),
            undefinedFrac = NullishUtils.makeUndefined< number >(),
            number1: number = undefinedFrac, number2: number = undefinedFrac
        ;
        for( index = 0; number1 == number2 && index < length; index++ ) {

            number1 = array1[ index ] ?? 0;
            number2 = array2[ index ] ?? 0;

        } 
        return NumberUtils.compareNumber( number1, number2 );

    }

    public static isInteger( number: number ): boolean {

        return number % 1 == 0;

    }

    public static isNegative( number: number ): boolean {

        return number < 0;

    }

    public static isNonnegative( number: number ): boolean {

        return number >= 0;

    }

    public static isPositive( number: number ): boolean {

        return number > 0;

    }

    public static toNegative( number: number ): number {

        return -Math.abs( number );

    }

    public static toOpposite( number: number ): number {

        return (
            NumberUtils.isPositive( number ) ? NumberUtils.toNegative( number ) :
            NumberUtils.isNegative( number ) ? NumberUtils.toPositive( number ) :
            number
        );

    }

    public static toPositive( number: number ): number {

        return Math.abs( number );

    }
    
}
