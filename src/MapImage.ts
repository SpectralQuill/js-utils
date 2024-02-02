import { ArrayUtils } from "./ArrayUtils";
import { NullishUtils } from "./NullishUtils";
import { NumberUtils } from "./NumberUtils";
import { OrderedArray } from "./OrderedArray";

export class MapImage extends Image {

    private readonly xCoordinatePixels: CoordinatePixelArray = new CoordinatePixelArray();
    private readonly yCoordinatePixels: CoordinatePixelArray = new CoordinatePixelArray();

    public constructor(
        src: string, public readonly startFromTop: boolean, public readonly startFromLeft: boolean
    ) {

        super();
        this.src = src;

    }

    public getPosition( xCoordinate: number, yCoordinate: number ): [ number, number ] {

        return [ this.getXPosition( xCoordinate ), this.getYPosition( yCoordinate ) ];

    }

    public getXPosition( coordinate: number, rendered: boolean = true ): number {

        const
            { xCoordinatePixels } = this,
            undefinedNumber = NullishUtils.makeUndefined< number >(),
            coordinatePixel: CoordinatePixel = new CoordinatePixel( coordinate, undefinedNumber ),
            index: index = xCoordinatePixels.indexToAddElement( coordinatePixel ),
            leftIndex: index = ArrayUtils.leftIndex( xCoordinatePixels, index ),
            rightIndex: index = index,
            leftCoordinatePixel: CoordinatePixel = xCoordinatePixels[ leftIndex ],
            rightCoordinatePixel: CoordinatePixel = xCoordinatePixels[ rightIndex ]
        ;
        if( leftCoordinatePixel == undefined || rightCoordinatePixel == undefined ) return undefinedNumber;
        const
            { naturalWidth, width } = this,
            { coordinate: coordinate1, pixel: pixel1, } = leftCoordinatePixel,
            { coordinate: coordinate2, pixel: pixel2, } = rightCoordinatePixel,
            percentage: percentage = ( coordinate - coordinate1 ) / ( coordinate2 - coordinate1 ),
            naturalPosition: int = percentage * ( pixel2 - pixel1 ) + pixel1,
            renderedPosition: int = width * naturalPosition / naturalWidth
        ;
        return Math.round( rendered ? renderedPosition : naturalPosition );

    }

    public getYPosition( coordinate: number, rendered: boolean = true ): number {

        const
            { yCoordinatePixels } = this,
            undefinedNumber = NullishUtils.makeUndefined< number >(),
            coordinatePixel: CoordinatePixel = new CoordinatePixel( coordinate, undefinedNumber ),
            index: index = yCoordinatePixels.indexToAddElement( coordinatePixel ),
            leftIndex: index = ArrayUtils.leftIndex( yCoordinatePixels, index ),
            rightIndex: index = index,
            leftCoordinatePixel: CoordinatePixel = yCoordinatePixels[ leftIndex ],
            rightCoordinatePixel: CoordinatePixel = yCoordinatePixels[ rightIndex ]
        ;
        if( leftCoordinatePixel == undefined || rightCoordinatePixel == undefined ) return undefinedNumber;
        const
            { naturalHeight, height } = this,
            { coordinate: coordinate1, pixel: pixel1, } = leftCoordinatePixel,
            { coordinate: coordinate2, pixel: pixel2, } = rightCoordinatePixel,
            percentage: percentage = ( coordinate - coordinate1 ) / ( coordinate2 - coordinate1 ),
            naturalPosition: int = percentage * ( pixel2 - pixel1 ) + pixel1,
            renderedPosition: int = height * naturalPosition / naturalHeight
        ;
        return Math.round( rendered ? renderedPosition : naturalPosition );

    }

}

export class CoordinatePixel {

    public static compareCoordinatePixel(
        coordinatePixel1: CoordinatePixel, coordinatePixel2: CoordinatePixel
    ) {

        return NumberUtils.compareNumber( coordinatePixel1.coordinate, coordinatePixel2.coordinate );

    }

    public constructor( public readonly coordinate: number, public readonly pixel: int ) {}

    public conflictsWithCoordinatePixel( coordinatePixel: CoordinatePixel ): boolean {

        const
            coordinateComparison: number = CoordinatePixel.compareCoordinatePixel( this, coordinatePixel ),
            pixelComparison: number = NumberUtils.compareNumber( this.pixel, coordinatePixel.pixel )
        ;
        return (
            ( isNaN( coordinateComparison ) || isNaN( pixelComparison ) ) ? false :
            ( coordinateComparison > 0 ) ? ( pixelComparison >= 0 ) :
            ( coordinateComparison < 0 ) ? ( pixelComparison <= 0 ) :
            true
        );

    }

}

export class CoordinatePixelArray extends OrderedArray< CoordinatePixel > {

    public constructor( ...coordinatePixels: CoordinatePixel[] ) {

        super( CoordinatePixel.compareCoordinatePixel, ...coordinatePixels );

    }

    public addCoordinate( coordinatePixel: CoordinatePixel ): boolean {

        return this.addElement( coordinatePixel );

    }

    public addCoordinates( ...coordinatePixels: CoordinatePixel[] ): CoordinatePixel[] {

        return this.addElements( ...coordinatePixels );

    }

    public override indexToAddElement( coordinatePixel: CoordinatePixel ): index {

        const
            index: index = super.indexToAddElement( coordinatePixel ),
            leftIndex: index = ArrayUtils.leftIndex( this, index ),
            rightIndex: index = index,
            conflictsWithLeft: boolean =
                this[ leftIndex ]?.conflictsWithCoordinatePixel( coordinatePixel ) ?? false
            ,
            conflictsWithRight: boolean =
                this[ rightIndex ]?.conflictsWithCoordinatePixel( coordinatePixel ) ?? false
        ;
        return ( !conflictsWithLeft && !conflictsWithRight ) ? index : NullishUtils.makeUndefined< int >();

    }

}
