import { ArrayUtils, DisjointRangeArray, Range, TimePointRange, WeekDay, WeekTimePoint } from "../index";

const array = new DisjointRangeArray< WeekTimePoint >();
array.addElements(
    new TimePointRange< WeekTimePoint >( new WeekTimePoint( 1, 12, 0 ), new WeekTimePoint( 1, 13, 0 ) ),
    new TimePointRange< WeekTimePoint >( new WeekTimePoint( 1, 10, 0 ), new WeekTimePoint( 1, 12, 0 ) ),
    new TimePointRange< WeekTimePoint >( new WeekTimePoint( 1, 12, 0 ), new WeekTimePoint( 1, 13, 0 ) ),
    new TimePointRange< WeekTimePoint >( new WeekTimePoint( 1, 11, 0 ), new WeekTimePoint( 1, 13, 0 ) ),
);
console.log( array.map( range => range.toString() ).join( "\n" ) );
