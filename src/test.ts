import ArrayUtils from "./ArrayUtils.js";
import Range from "./Range.js";

const range = new Range( 2, 8, false, true, -3 );
for( let i = 0; i < 10; i++ ) {

    console.log( range.pickNumber() );

}
// console.log( range.inRange( 2))