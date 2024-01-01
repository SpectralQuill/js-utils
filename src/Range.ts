export class Range< T > {

    public static compareEnd< T >( range1: Range< T >, range2: Range< T > ): number {

        return range1.compare( range1.end, range2.end );

    }

    public static compareRange< T >( range1: Range< T >, range2: Range< T > ): number {

        const
            comparisonStart: number = Range.compareStart( range1, range2 ),
            comparisonEnd: number = Range.compareEnd( range1, range2 ),
            { includeStart: includeStart1, includeEnd: includeEnd1 } = range1,
            { includeStart: includeStart2, includeEnd: includeEnd2 } = range2
        ;
        return (
            comparisonStart < 0 ? -1 : comparisonStart > 0 ? 1
            : includeStart1 != includeStart2 ? includeStart1 == true ? -2 : 2
            : comparisonEnd < 0 ? -3 : comparisonEnd > 0 ? 3
            : includeEnd1 != includeEnd2 ? includeEnd1 == true ? 4 : -4
            : 0
        );

    }

    public static compareStart< T >( range1: Range< T >, range2: Range< T > ): number {

        return range1.compare( range1.start, range2.start );

    }

    constructor(
        public readonly start: T,
        public readonly end: T,
        public readonly compare: comparator< T >,
        public readonly includeStart: boolean = true,
        public readonly includeEnd: boolean = true
    ) {}

    public hasInRange( value: T ): boolean {

        const
            { start, end, compare, includeStart, includeEnd } = this,
            comparisonStart = compare( value, start ), comparisonEnd = compare( value, end )
        ;
        return compare( start, end ) <= 0 ? (
            ( includeStart ? comparisonStart >= 0 : comparisonStart > 0 )
            && ( includeEnd ? comparisonEnd <= 0 : comparisonEnd < 0 )
        ) : (
            ( includeStart ? comparisonStart >= 0 : comparisonStart > 0 )
            || ( includeEnd ? comparisonEnd <= 0 : comparisonEnd < 0 )
        );

    }

    public intersectsWithRange( range: Range< T > ): boolean {

        const
            { start: start1, end: end1, includeStart: includeStart1, includeEnd: includeEnd1 } = this,
            { start: start2, end: end2, includeStart: includeStart2, includeEnd: includeEnd2 } = range
        ;
        return (
            this.hasInRange( start2 ) || this.hasInRange( end2 )
            || range.hasInRange( start1 ) || range.hasInRange( end1 )
            || (
                !includeStart1 && !includeEnd1 && !includeStart2 && !includeEnd2
                && Range.compareRange( this, range ) == 0
            )
        );

    }

}
