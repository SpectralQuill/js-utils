import { ArrayUtils, CoordinateRef, CoordinateRefArray, DisjointRangeArray, Keyframe, KeyframeArray, MapImage, NumberUtils, OrderedArray, Range, TimePointRange, WeekDay, WeekTimePoint } from "../index";

const a = new KeyframeArray( false );
a.addElement( new Keyframe( 10, 100 ) )
console.log( a.valueOfIndex( 10 ) )
