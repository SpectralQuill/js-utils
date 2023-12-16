import Comparison from "./Comparison.js";
import NumberUtils from "./NumberUtils.js";
import Range from "./Range.js";
import { comparator, frac } from "./types.js";

export default class FracRange extends Range< frac > {

    private static compare: comparator< frac > = ( number1, number2 ) => (
        number1 > number2 ? Comparison.MoreThan
        : number1 < number2 ? Comparison.LessThan
        : Comparison.Equal
    );

    constructor(
        start: frac, end: frac, includeStart: boolean = true, includeEnd: boolean = true,
        private readonly period: frac = 0
    ) {

        super( start, end, FracRange.compare, includeStart, includeEnd );

    }

    public hasInRange( number: number ): boolean {

        const { start, end, period } = this;
        return super.hasInRange( number ) && ( !this.hasPeriod() || NumberUtils.isInteger(
            ( this.isForward() ? ( number - start ) : ( end - number ) ) / period
        ) );
        
    }

    public hasPeriod(): boolean {

        return this.period != 0;
    
    }

    public isBackward(): boolean {

        return !this.isForward();
    
    }
    
    public isForward(): boolean {
    
        return this.period > 0;
    
    }

    public toString(): string {

        const { start, end, includeStart, includeEnd } = this;
        return `${ includeStart ? "[" : "(" }${ start }, ${ end }${ includeEnd ? "]" : ")" }`;

    }

}
