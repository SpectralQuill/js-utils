import { Counter } from "./Counter";
import { NullishUtils } from "./NullishUtils";
import { NumberRange } from "./NumberRange";
import { NumberUtils } from "./NumberUtils";

module ArrayUtils {

    export type callback< T, R > = ( element: T, index: index, array: T[], counter: Counter ) => R;
    export type match< T > = callback< T, boolean >;

}

export class ArrayUtils {

    public static addArray< T >( array: T[], add: T[], index: index = array.length ): boolean {

        index = ArrayUtils.nonnegativeIndex( array, index, false );
        if( index == undefined ) return false;
        array.splice( index, 0, ...add );
        return true;

    }

    public static clear< T >( array: T[], start: index = 0 ): T[] {

        return ArrayUtils.deleteMatch( array, undefined, start );

    }

    public static deleteIndex< T >( array: T[], index: index = ArrayUtils.lastIndex( array ) ): T {

        index = ArrayUtils.nonnegativeIndex( array, index );
        return array.splice( index, 1 )[ 0 ];

    }

    public static deleteMatch< T >( array: T[], match?: ArrayUtils.match< T >, start: index = 0 ): T[] {

        const deleted: T[] = [];
        for( let [ element, index, _, counter ] of ArrayUtils.iterate( array, start ) ) {

            if( !( match?.( element, index, array, counter ) ?? true ) ) continue;
            deleted.push( ArrayUtils.deleteIndex( array, index ) );
            if( counter.isForward() ) counter.skip( -1 );

        }
        return deleted;

    }

    public static findMatch< T >( array: T[], match?: ArrayUtils.match< T >, start: index = 0 ): T[] {

        const found: T[] = [];
        for( let [ element, index, _, counter ] of ArrayUtils.iterate( array, start ) ) {

            if( match?.( element, index, array, counter ) ?? true ) found.push( element );

        }
        return found;

    }

    public static firstMatch< T >( array: T[], match?: ArrayUtils.match< T >, start: index = 0 ): T {

        for( let [ element, index, _, counter ] of ArrayUtils.iterate( array, start ) ) {

            if( match?.( element, index, array, counter ) ?? true ) return element;

        }
        return NullishUtils.makeUndefined< T >();

    }

    public static firstIndex< T >( array: T[], nonnegative: boolean = true ): index {

        if( ArrayUtils.isEmpty( array ) ) return NullishUtils.makeUndefined< index >();
        let index: index = 0;
        if( !nonnegative ) index = ArrayUtils.negativeIndex( array, index );
        return index;

    }

    public static hasIndex< T >( array: T[], index: index = 0, excludeLength: boolean = true ): boolean {

        return ArrayUtils.indexRange( array, true, true, !excludeLength ).hasInRange( index );
    
    }

    public static hasNegativeIndex< T >(
        array: T[], index: index = ArrayUtils.firstIndex( array, false )
    ): boolean {

        return ArrayUtils.indexRange( array, false, true, false ).hasInRange( index );

    }

    public static hasNonnegativeIndex< T >(
        array: T[], index: index = 0, excludeLength: boolean = true
    ): boolean {

        return ArrayUtils.indexRange( array, true, false, !excludeLength ).hasInRange( index );

    }

    public static indexRange< T >(
        array: T[], includeNonnegative: boolean, includeNegative: boolean, includeLength: boolean
    ): NumberRange {

        const { length } = array, isEmpty: boolean = ArrayUtils.isEmpty( array );
        const range = new NumberRange(
            includeNegative ? -length : 0, includeNonnegative ? length : 0,
            !isEmpty || includeLength, includeNonnegative && includeLength, 1
        );
        return range;

    }

    public static isEmpty< T >( array: T[] ): boolean {

        return array.length == 0;

    }

    public static * iterate< T >(
        array: T[], start: index = 0
    ): Generator< [ element: T, index: index, array: T[], counter: Counter ] > {

        if( ArrayUtils.isEmpty( array ) ) return;
        let period: int = ( NumberUtils.isNonnegative( start ) ? 1 : -1 ), element: T;
        start = ArrayUtils.nonnegativeIndex( array, start );
        const counter: Counter = new Counter( start, period );
        for( let [ index ] of counter ) {

            if( !ArrayUtils.hasNonnegativeIndex( array, index ) ) break;
            element = array[ index ];
            yield [ element, index, array, counter ];

        }

    }

    public static lastIndex< T >( array: T[], nonnegative: boolean = true ): index {

        if( ArrayUtils.isEmpty( array ) ) return NullishUtils.makeUndefined< index >();
        let index: index = array.length - 1;
        if( !nonnegative ) index = ArrayUtils.negativeIndex( array, index );
        return index;

    }

    public static negativeIndex< T >( array: T[], index: index ): index {

        return (
            !ArrayUtils.hasIndex( array, index ) ? NullishUtils.makeUndefined< index >() :
            NumberUtils.isNonnegative( index ) ? ( index - array.length ) :
            index
        );

    }

    public static nonnegativeIndex< T >( array: T[], index: index, excludeLength: boolean = true ): index {

        return (
            !ArrayUtils.hasIndex( array, index, excludeLength ) ? NullishUtils.makeUndefined< index >() :
            NumberUtils.isNegative( index ) ? ( index + array.length ) :
            index
        );

    }

    public static oppositeIndex< T >( array: T[], index: index ): index {

        return (
            !ArrayUtils.hasIndex( array, index ) ? NullishUtils.makeUndefined< index >() :
            NumberUtils.isNonnegative( index ) ? ArrayUtils.negativeIndex( array, index ) :
            ArrayUtils.nonnegativeIndex( array, index )
        );

    }

    public static toSet< T >( array: T[] ): Set< T > {

        return new Set< T >( array );

    }

    public static uniqueElements< T >( array: T[], start: index = 0 ): T[] {

        const unique: T[] = [];
        for( let [ element ] of ArrayUtils.iterate( array, start ) )
            if( !unique.includes( element ) ) unique.push( element );
        return unique;

    }

}
