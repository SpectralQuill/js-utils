import { comparator, frac } from "./types.js";

export default class Range< T > {

    constructor(
        protected readonly start: T,
        protected readonly end: T,
        protected readonly compare: comparator< T >,
        protected readonly includeStart: boolean = true,
        protected readonly includeEnd: boolean = true
    ) {

        if( compare( start, end ) > 0 ) {

            this.start = end;
            this.end = start;

        }

    }

    public hasInRange( value: T ): boolean {

        const
            { start, end, includeStart, includeEnd } = this,
            comparisonStart = this.compare( value, start ), comparisonEnd = this.compare( value, end )
        ;
        return (
            ( includeStart ? comparisonStart >= 0 : comparisonStart > 0 )
            && ( includeEnd ? comparisonEnd <= 0 : comparisonEnd < 0 )
        );

    }

}
