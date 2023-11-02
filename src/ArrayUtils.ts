import Counter from "./Counter2";
import NumberUtils from "./NumberUtils";

module ArrayUtils {

    export type control < T > = {
        backward: () => index,
        forward: () => index,
        isBackward: () => boolean,
        isForward: () => boolean,
        reverse: () => index,
        skip: ( skip: index ) => index
    };
    export type match < T > = ( element: T, index: index, array: T[] ) => boolean

}

export default class ArrayUtils {

    public static deleteMatch < T > ( array: T[], match: ArrayUtils.match< T > ): T[] {

        const deleted: T[] = [];
        for( let [ element, index, _, control ] of this.iterate( array ) ) {

            if( !match( element, index, array ) ) continue;
            deleted.push( element );
            array.splice( index, 1 );
            control.skip( -1 );

        }
        return deleted;

    }

    public static isEmpty < T > ( array: T[] ): boolean {

        return array.length == 0;

    }

    public static lastIndex < T > ( array: T[] ): index {

        return !this.isEmpty( array ) ? ( array.length - 1 ) : ( undefined as unknown as index );

    }

    public static * iterate < T > (
        array: T[], period: index = 1
    ): Generator < [ element: T, index: index, array: T[], control: ArrayUtils.control <T> ] > {

        if( this.isEmpty( array ) ) return;
        const
            start: index = NumberUtils.isPositive( period ) ? 0 : this.lastIndex( array ),
            counter: Counter = new Counter( start, period ),
            control: ArrayUtils.control <T> = {

                backward: () => counter.backward(),
                forward: () => counter.forward(),
                isBackward: () => counter.isBackward(),
                isForward: () => counter.isForward(),
                reverse: () => counter.reverse(),
                skip: ( skip ) => counter.skip( skip )

            }
        ;
        let element;
        for( let [ index ] of counter ) {

            if( counter.isForward() ? ( index >= array.length ) : ( index < 0 ) ) break;
            element = array[ index ];
            yield [ element, index, array, control ];

        }

    }

}