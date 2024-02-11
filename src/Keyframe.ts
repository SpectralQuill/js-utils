import { ArrayUtils } from "./ArrayUtils";
import { NullishUtils } from "./NullishUtils";
import { NumberUtils } from "./NumberUtils";
import { OrderedArray } from "./OrderedArray";

export class Keyframe {

    public static compareKeyframe( keyframe1: Keyframe, keyframe2: Keyframe ): number {

        return NumberUtils.compareNumber( keyframe1.index, keyframe2.index );

    }

    constructor( public readonly index: number, public readonly value: number ) {}

}

export class KeyframeArray< T extends Keyframe = Keyframe > extends OrderedArray< T > {

    public constructor( ascending: boolean = true, public dilation: percentage = 1 ) {

        super( Keyframe.compareKeyframe, ascending );

    }

    public get hasTransition(): boolean {

        return this.length > 1;

    }

    public get size(): number {

        return (
            this.hasTransition ? NumberUtils.distance( this[ 0 ].index, ArrayUtils.lastElement( this ).index )
            : NullishUtils.makeUndefined< number >()
        );

    }

    public addKeyframe( keyframe: T ): boolean {

        return this.addElement( keyframe );

    }

    public addKeyframes( ...keyframes: T[] ): T[] {

        return this.addElements( ...keyframes );

    }

    public dilate( dilation: percentage ): percentage {

        const last: percentage = this.dilation;
        this.dilation = dilation;
        return last;

    }

    public indexOfPercentage( percentage: percentage ): number {

        return (
            this.hasTransition ?  this[ 0 ].index + percentage * this.size
            : NullishUtils.makeUndefined< number >()
        );

    }

    public percentageOfIndex( index: number ): percentage {

        return (
            this.hasTransition ? ( ( index - this[ 0 ].index ) / this.size )
            : NullishUtils.makeUndefined< number >()
        );

    }

    public valueOfIndex( index: number, dilate: boolean = true ): number {

        const
            undefinedNumber: number = NullishUtils.makeUndefined< number >(),
            keyframe: T = new Keyframe( index, undefinedNumber ) as T,
            indexToAddRight: index = this.indexToAddElement( keyframe ),
            indexToAddLeft: index = ArrayUtils.leftIndex( this, indexToAddRight, false ),
            { index: indexLeft, value: valueLeft } = this[ indexToAddLeft ] ?? keyframe,
            { index: indexRight, value: valueRight } = this[ indexToAddRight ] ?? keyframe,
            dilation: percentage = dilate ? this.dilation : 1
        ;
        return (
            !ArrayUtils.hasNonnegativeIndex( this, indexToAddLeft ) ? undefinedNumber
            : !ArrayUtils.hasNonnegativeIndex( this, indexToAddRight ) ?
                ( index == indexLeft ) ? valueLeft : undefinedNumber
            : ( dilation * (
                valueLeft + ( index - indexLeft ) * ( valueRight - valueLeft ) / ( indexRight - indexLeft )
            ) )
        );

    }

    public valueOfPercentage( percentage: percentage, dilate: boolean = true ): number {

        return this.valueOfIndex( this.indexOfPercentage( percentage ), dilate );

    }

}
