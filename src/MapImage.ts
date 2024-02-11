import { ArrayUtils } from "./ArrayUtils";
import { Keyframe, KeyframeArray } from "./Keyframe";
import { NullishUtils } from "./NullishUtils";
import { NumberUtils } from "./NumberUtils";
import { OrderedArray } from "./OrderedArray";

export class MapImageOld extends Image {

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

        const { coordinate: coordinate1 } = coordinatePixel1, { coordinate: coordinate2 } = coordinatePixel2;
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

export class MapImage extends Image {

    public readonly coordinateRefsX;
    public readonly coordinateRefsY;

    public constructor( src: string, ascendingLeft: boolean, ascendingTop: boolean ) {

        super();
        this.src = src;
        this.coordinateRefsX = new CoordinateRefArray( ascendingLeft );
        this.coordinateRefsY = new CoordinateRefArray( ascendingTop );

    }

    public get dilationX(): percentage {

        return this.width / this.naturalWidth;

    }

    public get dilationY(): percentage {

        return this.width / this.naturalWidth;

    }

    public coordinatesOfPercentages( percentageX: number, percentageY: number ): [ number, number ] {

        return [
            this.coordinateRefsX.coordinateOfPercentage( percentageX ),
            this.coordinateRefsY.coordinateOfPercentage( percentageY )
        ];

    }

    public percentagesOfCoordinates(
        coordinateX: number, coordinateY: number
    ): [ percentage, percentage ] {

        return [
            this.coordinateRefsX.percentageOfCoordinate( coordinateX ),
            this.coordinateRefsY.percentageOfCoordinate( coordinateY )
        ];

    }

    public pixelsOfCoordinates(
        coordinateX: number, coordinateY: number, dilate: boolean = true
    ): [ int, int ] {

        const { coordinateRefsX, coordinateRefsY, dilationX, dilationY } = this;
        coordinateRefsX.dilate( dilationX );
        coordinateRefsY.dilate( dilationY );
        return [
            coordinateRefsX.pixelOfCoordinate( coordinateX, dilate ),
            coordinateRefsY.pixelOfCoordinate( coordinateY, dilate )
        ];

    }

    public pixelsOfPercentages(
        percentageX: percentage, percentageY: percentage, dilate: boolean = true
    ): [ int, int ] {

        const { coordinateRefsX, coordinateRefsY, dilationX, dilationY } = this;
        coordinateRefsX.dilate( dilationX );
        coordinateRefsY.dilate( dilationY );
        return [
            coordinateRefsX.pixelOfPercentage( percentageX, dilate ),
            coordinateRefsY.pixelOfPercentage( percentageY, dilate )
        ];

    }

}

export class CoordinateRef extends Keyframe {

    constructor( coordinate: number, pixel: int ) {

        super( coordinate, pixel );

    }

    public get coordinate(): number {

        return this.index;

    }

    public get pixel(): int {

        return this.value;

    }

}

export class CoordinateRefArray extends KeyframeArray< CoordinateRef > {

    constructor( ascending: boolean = true ) {

        super( ascending );

    }

    public addCoordinateRef( coordinateRef: CoordinateRef ): boolean {

        return this.addKeyframe( coordinateRef );

    }

    public addCoordinateRefs( ...coordinateRefs: CoordinateRef[] ): CoordinateRef[] {

        return this.addKeyframes( ...coordinateRefs );

    }

    public coordinateOfPercentage( percentage: percentage ): number {

        return this.indexOfPercentage( percentage );

    }

    public percentageOfCoordinate( coordinate: number ): percentage {

        return this.percentageOfIndex( coordinate );

    }

    public pixelOfCoordinate( coordinate: number, dilate: boolean = true ): int {

        return this.valueOfIndex( coordinate, dilate );

    }

    public pixelOfPercentage( percentage: percentage, dilate: boolean = true ): percentage {

        return this.valueOfPercentage( percentage, dilate );

    }

    public override valueOfIndex( index: number, dilate: boolean = true ): int {

        return Math.round( super.valueOfIndex( index, dilate ) );
        
    }

}
