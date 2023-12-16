import Comparison from "./Comparison"

module Range {

    export type compare< T > = ( value1: T, value2: T ) => Comparison

}

export default class Range< T > {

    constructor(
        protected readonly start: T,
        protected readonly end: T,
        protected readonly compare: Range.compare< T >,
        protected readonly includeStart: boolean = true,
        protected readonly includeEnd: boolean = true
    ) {

        if( compare( start, end ).isMoreThan() ) {

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
            ( includeStart ? comparisonStart.isMoreThanOrEqual() : comparisonStart.isMoreThan() )
            && ( includeEnd ? comparisonEnd.isLessThanOrEqual() : comparisonEnd.isLessThan() )
        );

    }

}
