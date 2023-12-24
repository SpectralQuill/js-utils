export default class Range< T > {

    constructor(
        public readonly start: T,
        public readonly end: T,
        public readonly compare: comparator< T >,
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

    public intersectsWithRange( range: Range< T > ): boolean {

        const
            { start: start1, end: end1, includeStart: includeStart1, includeEnd: includeEnd1 } = this,
            { start: start2, end: end2, includeStart: includeStart2, includeEnd: includeEnd2 } = range
        ;
        return (
            ( start1 < start2 ) ? ( ( end1 < start2 ) || ( includeEnd1 && includeStart2 && end1 == start2 ) )
            : ( ( start1 > end2 ) || ( includeStart1 && includeEnd2 && start1 == end2 ) )
        );

    }

}
