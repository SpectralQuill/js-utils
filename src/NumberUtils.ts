export default class NumberUtils {

    public static isNegative( number: number ): boolean {

        return number < 0;

    }

    public static isPositive( number: number ): boolean {

        return number > 0;

    }

    public static toNegative( number: number ): number {

        return -this.toPositive(number);

    }

    public static toPositive( number: number ): number {

        return Math.abs(number);

    }

    public static toReverse( number: number ): number {

        return -number;

    }

}
