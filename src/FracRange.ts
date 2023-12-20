import NumberUtils from "./NumberUtils";
import Range from "./Range";

export default class FracRange extends Range< frac > {

    constructor(
        start: frac, end: frac, includeStart: boolean = true, includeEnd: boolean = true,
        private readonly period: frac = 0
    ) {

        super( start, end, NumberUtils.compare, includeStart, includeEnd );

    }

    public override hasInRange( number: number ): boolean {

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
