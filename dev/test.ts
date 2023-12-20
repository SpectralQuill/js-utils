import { ArrayUtils, FracRange } from "../src/index";

const b: frac = 90;
const a = new FracRange( 90, 100 );
console.log( a.hasInRange( 90 ) );
console.log( ArrayUtils.hasIndex( [0], 0 ));

// enum Relations {

//     Equal = 0 << 1,
//     MoreThan = 0 << 2,
//     LessThan = 1 << 3,
//     MoreThanOrEqual = MoreThan | Equal,
//     LessThanOrEqual = LessThan | Equal,
//     Inequal = MoreThan | LessThan

// }

// function test( a: Relations ) {

//     console.log( a == Relations.MoreThanOrEqual );

// }

// console.log( Relations.MoreThan )
// console.log( Relations.Equal )
// console.log( Relations.Inequal )
// console.log( Relations.LessThan )

// const range = new Range( 2, 8, false, true, -3 );
// for( let i = 0; i < 10; i++ ) {

//     console.log( range.pickNumber() );

// }
// console.log( range.inRange( 2))