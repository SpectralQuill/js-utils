import { ArrayUtils, CoordinatePixel, CoordinatePixelArray, DisjointRangeArray, MapImage, NumberUtils, OrderedArray, Range, TimePointRange, WeekDay, WeekTimePoint } from "../index";

// const array: number[] = [];
// console.log( ArrayUtils.indexRange( array, true, false, false ).hasInRange( 0 ) );

// const
//     { naturalWidth, width } = this,
//     { coordinate: coordinate1, pixel: pixel1, } = leftCoordinatePixel,
//     { coordinate: coordinate2, pixel: pixel2, } = rightCoordinatePixel
// ;
// const
//     coordinate = 150,
//     naturalWidth = 5, width = 10,
//     coordinate1 = 100, pixel1 = 3,
//     coordinate2 = 200, pixel2 = 5,
//     percentage: percentage = ( coordinate - coordinate1 ) / ( coordinate2 - coordinate1 ),
//     naturalPixelPosition: int = percentage * ( pixel2 - pixel1 ) + pixel1,
//     cssPixelPosition: int = width * naturalPixelPosition / naturalWidth
// ;
// console.log( percentage );
// console.log( naturalPixelPosition );
// console.log( cssPixelPosition );

// const array1 = [ 2, 4, 3 ]
// array1.concat( 3, 5, 5 )

const a = new CoordinatePixelArray();
a.addElements( new CoordinatePixel( 8, 7 ) )
console.log( a.toLocaleString() )
// a.xCoordinatePixels.addCoordinate( new CoordinatePixel( 118, 477 ) );
