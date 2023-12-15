export default class NumberUtils {
    static isInteger(number) {
        return number % 1 == 0;
    }
    static isNegative(number) {
        return number < 0;
    }
    static isNonnegative(number) {
        return number >= 0;
    }
    static isPositive(number) {
        return number > 0;
    }
    static toNegative(number) {
        return -Math.abs(number);
    }
    static toOpposite(number) {
        return (this.isPositive(number) ? this.toNegative(number) :
            this.isNegative(number) ? this.toPositive(number) :
                number);
    }
    static toPositive(number) {
        return Math.abs(number);
    }
}
