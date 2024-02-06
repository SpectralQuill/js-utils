import { ArrayUtils } from "./ArrayUtils";
import { NullishUtils } from "./NullishUtils";
import { NumberUtils } from "./NumberUtils";
import { OrderedArray } from "./OrderedArray";

export class MapImage extends Image {

    public readonly xCoordinatePixels: CoordinatePixelArray;
    public readonly yCoordinatePixels: CoordinatePixelArray;

    public constructor( src: string, ascendingLeft: boolean = true, ascendingTop: boolean = true ) {

        super();
        this.src = src;
        this.xCoordinatePixels = new CoordinatePixelArray( ascendingLeft );
        this.yCoordinatePixels = new CoordinatePixelArray( ascendingTop );

    }

    public async getPercentagePosition(
        xCoordinate: number, yCoordinate: number
    ): Promise< [ percentage, percentage ] > {

        return [
            await this.getXPercentagePosition( xCoordinate ),
            await this.getYPercentagePosition( yCoordinate )
        ];

    }

    public async getPixelPosition(
        xCoordinate: number, yCoordinate: number, rendered: boolean = true
    ): Promise< [ int, int ] > {

        return [
            await this.getXPixelPosition( xCoordinate, rendered ),
            await this.getYPixelPosition( yCoordinate, rendered )
        ];

    }

    public async getXPercentagePosition( coordinate: number ): Promise< percentage > {

        return ( await this.getXPixelPosition( coordinate, false ) ) / this.naturalWidth;

    }

    public async getXPixelPosition( coordinate: number, rendered: boolean = true ): Promise< int > {

        await this.decode();
        const
            { naturalWidth, width } = this,
            dilation: number = rendered ? ( width / naturalWidth ) : 1
        ;
        return this.xCoordinatePixels.getPosition( coordinate, dilation );

    }

    public async getYPercentagePosition( coordinate: number ): Promise< percentage > {

        return ( await this.getYPixelPosition( coordinate, false ) ) / this.naturalHeight;

    }

    public async getYPixelPosition( coordinate: number, rendered: boolean = true ): Promise< int > {

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
        coordinatePixel1: CoordinatePixel, coordinatePixel2: CoordinatePixel, ascending: boolean = true
    ) {

        const
            { coordinate: coordinate1 } = coordinatePixel1, { coordinate: coordinate2 } = coordinatePixel2
        ;
        return NumberUtils.compareNumber(
            ascending ? coordinate1 : coordinate2,
            ascending ? coordinate2 : coordinate1
        );

    }

    public constructor( public readonly coordinate: number, public readonly pixel: int ) {}

    public conflictsWithCoordinatePixel( coordinatePixel: CoordinatePixel ): boolean {

        const
            coordinateComparison: number = CoordinatePixel.compareCoordinatePixel( this, coordinatePixel ),
            pixelComparison: number = NumberUtils.compareNumber( this.pixel, coordinatePixel.pixel )
        ;
        return (
            ( isNaN( coordinateComparison ) || isNaN( pixelComparison ) ) ? false
            : ( coordinateComparison > 0 ) ? ( pixelComparison >= 0 )
            : ( coordinateComparison < 0 ) ? ( pixelComparison <= 0 )
            : true
        );

    }

}

export class CoordinatePixelArray extends OrderedArray< CoordinatePixel > {

    public constructor( public readonly ascending: boolean = true ) {

        super( ( coordinatePixel1, coordinatePixel2 ) =>
            CoordinatePixel.compareCoordinatePixel( coordinatePixel1, coordinatePixel2, ascending )
        );

    }

    public addCoordinatePixel( coordinatePixel: CoordinatePixel ): boolean {

        return this.addElement( coordinatePixel );

    }

    public addCoordinatePixels( ...coordinatePixels: CoordinatePixel[] ): CoordinatePixel[] {

        return this.addElements( ...coordinatePixels );

    }

    public getPosition( coordinate: number, dilation: percentage = 1 ): int {

        const
            undefinedNumber = NullishUtils.makeUndefined< number >(),
            coordinatePixel: CoordinatePixel = new CoordinatePixel( coordinate, undefinedNumber ),
            index: index = this.indexToAddElement( coordinatePixel, false ),
            leftIndex: index = ArrayUtils.leftIndex( this, index, false ),
            rightIndex: index = index,
            leftCoordinatePixel: CoordinatePixel = this[ leftIndex ],
            rightCoordinatePixel: CoordinatePixel = this[ rightIndex ]
        ;
        if( leftCoordinatePixel == undefined ) return undefinedNumber;
        const equalToLeft: boolean =
            CoordinatePixel.compareCoordinatePixel( leftCoordinatePixel, coordinatePixel ) == 0
        ;
        if( rightCoordinatePixel == undefined && !equalToLeft ) return undefinedNumber;
        const
            { coordinate: coordinate1, pixel: pixel1, } = leftCoordinatePixel,
            { coordinate: coordinate2, pixel: pixel2, } = rightCoordinatePixel ?? leftCoordinatePixel,
            percentage: percentage =
                !equalToLeft ? ( ( coordinate - coordinate1 ) / ( coordinate2 - coordinate1 ) ) : 0
            ,
            position: int = Math.round( dilation * ( percentage * ( pixel2 - pixel1 ) + pixel1 ) )
        ;
        return position;

    }

    public override indexToAddElement(
        coordinatePixel: CoordinatePixel, disallowConflicts: boolean = true
    ): index {

        const index: index = super.indexToAddElement( coordinatePixel )
        if( !disallowConflicts ) return index;
        const
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
