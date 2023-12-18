import ArrayUtils from "./ArrayUtils.js";
import Range from "./Range.js";

const a: frac = 91;
console.log( a );

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