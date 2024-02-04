import { ArrayUtils } from "./ArrayUtils";
import { NullishUtils } from "./NullishUtils";
import { NumberUtils } from "./NumberUtils";
import { OrderedArray } from "./OrderedArray";

export class MapImage extends Image {

    public readonly xCoordinatePixels: CoordinatePixelArray = new CoordinatePixelArray();
    public readonly yCoordinatePixels: CoordinatePixelArray = new CoordinatePixelArray();

    public constructor(
        src: string, public readonly startFromTop: boolean, public readonly startFromLeft: boolean
    ) {

        super();
        this.src = src;

    }

    public async getPosition(
        xCoordinate: number, yCoordinate: number, rendered: boolean = true
    ): Promise< [ int, int ] > {

        return [
            await this.getXPosition( xCoordinate, rendered ),
            await this.getYPosition( yCoordinate, rendered )
        ];

    }

    public async getXPosition( coordinate: number, rendered: boolean = true ): Promise< int > {

        await this.decode();
        const
            { naturalWidth, width } = this,
            dilation: number = rendered ? ( width / naturalWidth ) : 1
        ;
        return this.xCoordinatePixels.getPosition( coordinate, dilation );

    }

    public async getYPosition( coordinate: number, rendered: boolean = true ): Promise< int > {

        await this.decode();
        const
            { naturalHeight, height } = this,
            dilation: number = rendered ? ( height / naturalHeight ) : 1
        ;
        return this.yCoordinatePixels.getPosition( coordinate, dilation );

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

    public constructor() {

        super( CoordinatePixel.compareCoordinatePixel );

    }

    public addCoordinate( coordinatePixel: CoordinatePixel ): boolean {

        return this.addElement( coordinatePixel );

    }

    public addCoordinates( ...coordinatePixels: CoordinatePixel[] ): CoordinatePixel[] {

        return this.addElements( ...coordinatePixels );

    }

    public getPosition( coordinate: number, dilation: percentage = 1 ): int {

        const
            undefinedNumber = NullishUtils.makeUndefined< number >(),
            coordinatePixel: CoordinatePixel = new CoordinatePixel( coordinate, undefinedNumber ),
            index: index = this.indexToAddElement( coordinatePixel ),
            leftIndex: index = ArrayUtils.leftIndex( this, index ),
            rightIndex: index = index,
            leftCoordinatePixel: CoordinatePixel = this[ leftIndex ],
            rightCoordinatePixel: CoordinatePixel = this[ rightIndex ]
        ;
        if( leftCoordinatePixel == undefined || rightCoordinatePixel == undefined ) return undefinedNumber;
        const
            { coordinate: coordinate1, pixel: pixel1, } = leftCoordinatePixel,
            { coordinate: coordinate2, pixel: pixel2, } = rightCoordinatePixel,
            percentage: percentage = ( coordinate - coordinate1 ) / ( coordinate2 - coordinate1 ),
            position: int = Math.round( dilation * ( percentage * ( pixel2 - pixel1 ) + pixel1 ) )
        ;
        return position;

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
