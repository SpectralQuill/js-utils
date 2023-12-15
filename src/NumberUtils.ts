export default class NumberUtils {

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
