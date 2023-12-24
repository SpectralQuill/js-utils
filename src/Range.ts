import NullishUtils from "./NullishUtils";

export default class Range< T > {

    public static compareEnd< T >( range1: Range< T >, range2: Range< T > ): frac {

        return (
            range1.isCompatibleWithRange( range2 ) ? range1.compare( range1.end, range2.end ) :
            NullishUtils.makeUndefined< frac >()
        );

    }

    public static compareStart< T >( range1: Range< T >, range2: Range< T > ): frac {

        return (
            range1.isCompatibleWithRange( range2 ) ? range1.compare( range1.start, range2.start ) :
            NullishUtils.makeUndefined< frac >()
        );

    }

    constructor(
        public readonly start: T,
        public readonly end: T,
        public readonly compare: comparator< T >,
        public readonly includeStart: boolean = true,
        public readonly includeEnd: boolean = true
    ) {

        if( compare( start, end ) > 0 ) {

            this.start = end;
            this.end = start;

        }

    }

    public isCompatibleWithRange( range: Range< T > ): boolean {

        return this.compare == range.compare;

    }

    public isEqualToRange( range: Range< T > ): boolean {

        const
            {
                start: start1, end: end1, compare,
                includeStart: includeStart1, includeEnd: includeEnd1
            } = this,
            { start: start2, end: end2, includeStart: includeStart2, includeEnd: includeEnd2 } = range
        ;
        return (
            this.isCompatibleWithRange( range )
            && ( includeStart1 == includeStart2 ) && ( includeEnd1 == includeEnd2 )
            && ( compare( start1, start2 ) == 0 ) && ( compare( end1, end2 ) == 0 )
        );

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
        return this.isCompatibleWithRange( range ) && (
            ( start1 < start2 ) ? ( ( end1 < start2 ) || ( includeEnd1 && includeStart2 && end1 == start2 ) )
            : ( ( start1 > end2 ) || ( includeStart1 && includeEnd2 && start1 == end2 ) )
        );

    }

}
