import { NumberUtils } from "./NumberUtils";
import { Range } from "./Range";

export class NumberRange extends Range< number > {

    constructor(
        start: number, end: number, includeStart: boolean = true, includeEnd: boolean = true,
        private readonly period: number = 0
    ) {

        super( start, end, NumberUtils.compareNumber, includeStart, includeEnd );

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
        return (
            start < end ? `${ includeStart ? "[" : "(" }${ start }, ${ end }${ includeEnd ? "]" : ")" }`
            : start == end ? includeStart && includeEnd ? `[${ start }, ${ end }]` : `(${ start }, ${ end })`
            : (
                `[-\u221E, ${ end }${ includeEnd ? "]" : ")" }`
                + `\u222A${ includeStart ? "[" : "(" }${ start }, +\u221E]`
            )
        );

    }

}
