import NullishUtils from "./NullishUtils.js";
import NumberUtils from "./NumberUtils.js";

export default class Range {

    constructor(
        private readonly start: frac,
        private readonly end: frac,
        private readonly includeStart: boolean = true,
        private readonly includeEnd: boolean = true,
        private readonly period: frac = 0
    ) {

        if( start > end ) {

            this.start = end;
            this.end = start;
        
        }

    }

    public hasPeriod(): boolean {

        return this.period != 0;
    
    }

    public inRange( number: frac ): boolean {
  
        const
            { start, end, includeStart, includeEnd, period } = this,
            moreThanStart: boolean = ( includeStart ? ( number >= start ) : ( number > start ) ),
            lessThanEnd: boolean = ( includeEnd ? ( number <= end ) : ( number < end ) ),
            integerIndex: boolean = NumberUtils.isInteger(
                ( this.isForward() ? ( number - start ) : ( end - number ) ) / period
            )
        ;
        return ( moreThanStart && lessThanEnd ) && ( !this.hasPeriod() || integerIndex );
    
    }

    public isBackward(): boolean {

        return !this.isForward;
    
    }
    
    public isForward(): boolean {
    
        return this.period > 0;
    
    }

    public pickNumber(): frac {

        // figure out how to properly exclude start

        if( !this.hasPeriod() ) return NullishUtils.makeUndefined< frac >();
        const
            { start, end, period } = this
            // includeEnd = this.inRange( end )
        ;
        let length: length = Math.floor( ( end - start ) / Math.abs( period ) ) + 1;
        const
            farthestNumber: frac = ( this.isForward() ? start : end ) + ( length - 1 ) * period,
            excludeStart: boolean = !this.includeStart && this.isForward() || farthestNumber == start,
            excludeEnd: boolean  = !this.includeEnd && this.isBackward() || farthestNumber == end
        ;
        if( excludeStart ) length--;
        if( excludeEnd ) length--;
        console.log( "length: " + length )
        let index: index = Math.floor( Math.random() * length );
        if( excludeStart ) index++;
        // 3 9
        // 9 6 3
        const picked: frac = ( this.isForward() ? start : end ) + index * period;
        return picked;

        /*
        
            2 8 f t -3

            ogLength = Math.floor( ( end - start ) / Math.abs( period ) ) + 1
            excludeStart = !includeStart && ( isForward() ? true : () )
            excludeEnd?
            if( excludeStart ) length--
            if( excludeEnd ) length--
            index = Math.floor( Math.random() * length )
            if( excludeStart ) index++
            picked = ( this.isForward() ? start : end ) + index * period

            2 5 8
            2 5 8
        
        */

    }

    public toString(): string {

        const { start, end, includeStart, includeEnd } = this;
        return `${ includeStart ? "[" : "(" }${ start }, ${ end }${ includeEnd ? "]" : ")" }`;

    }

}
