import Counter from "./Counter2";

module ArrayUtils {

    export type control = {
        backward: () => index,
        forward: () => index,
        reverse: () => index,
        skip: ( skip: index ) => index
    };

}

export default class ArrayUtils {

    public static isEmpty <T> ( array: T[] ): boolean {

        return array.length == 0;

    }

    public static lastIndex <T> ( array: T[] ): index {

        return !this.isEmpty( array ) ? ( array.length - 1 ) : ( undefined as unknown as index );

    }

    public static * iterate <T> (
        array: T[], forward: boolean = true
    ): Generator < [ element: T, index: index, array: T[], control: ArrayUtils.control ] > {

        if( this.isEmpty( array ) ) return;
        const
            counter: Counter = new Counter(
                forward ? 0 : this.lastIndex( array ),
                forward ? 1 : -1
            ),
            control: ArrayUtils.control = {

                backward: () => counter.backward(),
                forward: () => counter.forward(),
                reverse: () => counter.reverse(),
                skip: ( skip ) => counter.skip( skip )

            }
        ;
        let index, element;
        for( [ index ] of counter ) {

            if( counter.isForward() ? ( index >= array.length ) : ( index < 0 ) ) break;
            element = array[ index ];
            yield [ element, index, array, control ];

        }

    }

}