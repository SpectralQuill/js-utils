import Counter from "./Counter.js";
import FracRange from "./FracRange.js";
import NullishUtils from "./NullishUtils.js";
import NumberUtils from "./NumberUtils.js";

module ArrayUtils {

    export type callback< T, R > = ( element: T, index: index, array: T[], counter: Counter ) => R;
    export type match< T > = callback< T, boolean >;

}

export default class ArrayUtils {

    public static addArray< T >( array: T[], add: T[], index: index = this.lastIndex( array ) ): T[] {

        index = this.toNonnegativeIndex( array, index );
        array.splice( index, 0, ...add );
        return array;

    }

    public static clear< T >( array: T[], start: index = 0 ): T[] {

        return this.deleteMatch( array, undefined, start );

    }

    public static deleteIndex< T >( array: T[], index: index = this.lastIndex( array ) ): T {

        index = this.toNonnegativeIndex( array, index );
        return array.splice( index, 1 )[ 0 ];

    }

    public static deleteMatch< T >( array: T[], match?: ArrayUtils.match< T >, start: index = 0 ): T[] {

        const deleted: T[] = [];
        for( let [ element, index, _, counter ] of this.iterate( array, start ) ) {

            if( !( match?.( element, index, array, counter ) ?? true ) ) continue;
            deleted.push( this.deleteIndex( array, index ) );
            if( counter.isForward() ) counter.skip( -1 );

        }
        return deleted;

    }

    public static findMatch< T >( array: T[], match?: ArrayUtils.match< T >, start: index = 0 ): T[] {

        const found: T[] = [];
        for( let [ element, index, _, counter ] of this.iterate( array, start ) ) {

            if( match?.( element, index, array, counter ) ?? true ) found.push( element );

        }
        return found;

    }

    public static firstMatch< T >( array: T[], match?: ArrayUtils.match< T >, start: index = 0 ): T {

        for( let [ element, index, _, counter ] of this.iterate( array, start ) ) {

            if( match?.( element, index, array, counter ) ?? true ) return element;

        }
        return NullishUtils.makeUndefined< T >();

    }

    public static firstIndex< T >( array: T[], nonnegative: boolean = true ): index {

        if( this.isEmpty( array ) ) return NullishUtils.makeUndefined< index >();
        let index: index = 0;
        if( !nonnegative ) index = this.toNegativeIndex( array, index );
        return index;

    }

    public static hasIndex< T >( array: T[], index: index = 0 ): boolean {

        const
            { length } = array,
            range = new FracRange( -length, length, true, false, 1 )
        ;
        return range.hasInRange( index );
    
    }

    public static hasNegativeIndex< T >(
        array: T[], index: index = this.firstIndex( array, false )
    ): boolean {

        const
            { length } = array,
            range = new FracRange( -length, 0, true, false, 1 )
        ;
        return range.hasInRange( index );

    }

    public static hasNonnegativeIndex< T >( array: T[], index: index = 0 ): boolean {

        const
            { length } = array,
            range = new FracRange( 0, length, true, false, 1 )
        ;
        return range.hasInRange( index );

    }

    public static isEmpty< T >( array: T[] ): boolean {

        return array.length == 0;

    }

    public static * iterate< T >(
        array: T[], start: index = 0
    ): Generator< [ element: T, index: index, array: T[], counter: Counter ] > {

        if( this.isEmpty( array ) ) return;
        let
            period: int = NumberUtils.isNonnegative( start ) ? 1 : -1,
            element: T
        ;
        start = this.toNonnegativeIndex( array, start );
        const counter: Counter = new Counter( start, period );
        for( let [ index ] of counter ) {

            if( !this.hasNonnegativeIndex( array, index ) ) break;
            element = array[ index ];
            yield [ element, index, array, counter ];

        }

    }

    public static lastIndex< T >( array: T[], nonnegative: boolean = true ): index {

        if( this.isEmpty( array ) ) return NullishUtils.makeUndefined< index >();
        let index: index = array.length - 1;
        if( !nonnegative ) index = this.toNegativeIndex( array, index );
        return index;

    }

    public static toNegativeIndex< T >( array: T[], index: index ): index {

        return (
            !this.hasIndex( array, index ) ? NullishUtils.makeUndefined< index >() :
            NumberUtils.isNonnegative( index ) ? ( index - array.length ) :
            index
        );

    }

    public static toNonnegativeIndex< T >( array: T[], index: index ): index {

        return (
            !this.hasIndex( array, index ) ? NullishUtils.makeUndefined< index >() :
            NumberUtils.isNegative( index ) ? ( index + array.length ) :
            index
        );

    }

    public static toOppositeIndex< T >( array: T[], index: index ): index {

        return (
            !this.hasIndex( array, index ) ? NullishUtils.makeUndefined< index >() :
            NumberUtils.isNonnegative( index ) ? this.toNegativeIndex( array, index ) :
            this.toNonnegativeIndex( array, index )
        );

    }

    public static toSet< T >( array: T[] ): Set< T > {

        return new Set< T >( array );

    }

    public static uniqueElements< T >( array: T[], start: index = 0 ): T[] {

        const unique: T[] = [];
        for( let [ element ] of this.iterate( array, start ) ) {

            if( !unique.includes( element ) ) unique.push( element );

        }
        return unique;

    }

}
