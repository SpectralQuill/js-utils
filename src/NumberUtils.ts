export default class NumberUtils {

    public static negative( number: number ): number {

        return -this.positive(number);

    }

    public static positive( number: number ): number {

        return Math.abs(number);

    }

    public static reverse( number: number ): number {

        return -number;

    }

}
