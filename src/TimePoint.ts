import { ArrayUtils } from "./ArrayUtils";
import { TimeUnitRange } from "./TimeUnitRange";

export class TimePoint extends Array< int > implements ReadonlyArray< int > {

    private static throwRangeError( range: TimeUnitRange, input: number ): void {

        throw new RangeError(
            `A ${ range.title } must be an integer in ${ range.toString() }. ${ input } is invalid.`
        );

    }

    private static throwRangesInputsLengthsMismatch( ranges: TimeUnitRange[], inputs: int[] ): void {

        throw new Error(
            `Range(s) and input(s) must have the same lengths.` +
            ` Range(s) has ${ ranges.length } length while input(s) has ${ inputs.length } length.`
        );

    }

    protected constructor( ranges: TimeUnitRange[], inputs: int[] ) {

        super();
        const { throwRangeError, throwRangesInputsLengthsMismatch } = TimePoint;
        if( ranges.length != inputs.length ) throwRangesInputsLengthsMismatch( ranges, inputs );
        let input;
        for( let [ range, index ] of ArrayUtils.iterate( ranges ) ) {

            input = inputs[ index ];
            if( !range.hasInRange( input ) ) throwRangeError( range, input );

        }
        this.push( ...inputs );

    }

}
