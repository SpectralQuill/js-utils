import { ArrayUtils } from "./ArrayUtils";

export class OrderedArray< T > extends Array< T > {

    public constructor( public readonly compare: comparator< T > ) {

        super();

    }

    public addElement( value: T ): boolean {

        const index: index = this.indexToAddElement( value );
        return ArrayUtils.addArray( this, [ value ], index );

    }

    public addElements( ...values: T[] ): T[] {

        return values.filter( value => !this.addElement( value ) );

    }

    public concat( ...values: ( ConcatArray< T > | T )[] ): OrderedArray< T > {

        const array: OrderedArray< T > = new OrderedArray< T >( this.compare );
        array.addElements( ...this, ...values.flat() as T[] );
        return array;

    }

    public indexToAddElement( value: T ): index {

        if( ArrayUtils.isEmpty( this ) ) return 0;
        let
            start: index = ArrayUtils.firstIndex( this ), end: index = ArrayUtils.lastIndex( this ),
            index: index, comparison: number
        ;
        while( start <= end ) {

            index = Math.ceil( ( end - start ) / 2 ) + start;
            comparison = this.compare( value, this[ index ] );
            comparison >= 0 ? ( start = index + 1 ) : ( end = index - 1 );

        }
        return start;

    }

}
