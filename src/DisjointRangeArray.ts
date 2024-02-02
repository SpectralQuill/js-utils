import { ArrayUtils } from "./ArrayUtils";
import { NullishUtils } from "./NullishUtils";
import { OrderedArray } from "./OrderedArray";
import { Range } from "./Range";

export class DisjointRangeArray< T > extends OrderedArray< Range< T > > {

    public constructor( ...ranges: Range< T >[] ) {

        super( Range.compareRange, ...ranges );

    }

    public addRange( range: Range< T > ): boolean {

        return this.addElement( range );

    }

    public addRanges( ...ranges: Range< T >[] ): Range< T >[] {

        return this.addElements( ...ranges );

    }

    // remove comments down there if unneeded
    public override indexToAddElement( range: Range<T> ): index {

        const undefinedInt: int = NullishUtils.makeUndefined< int >();
        if( !this.isCompatibleWithRange( range ) ) return undefinedInt;
        const
            index: index = super.indexToAddElement( range ),
            // length: int = this.length,
            // undefinedInt: int = NullishUtils.makeUndefined< int >(),
            // left: index = ( index > 0 ) ? ( index - 1 ) : ( length > 1 ) ? ( length - 1 ) : undefinedInt,
            // right: index = ( index < length ) ? index : undefinedInt,
            leftIndex: index = ArrayUtils.leftIndex( this, index, false, false ),
            rightIndex: index = index,
            intersectsWithLeft: boolean = this[ leftIndex ]?.intersectsWithRange( range ) ?? false,
            intersectsWithRight: boolean = this[ rightIndex ]?.intersectsWithRange( range ) ?? false
        ;
        return ( !intersectsWithLeft && !intersectsWithRight ) ? index : undefinedInt;
        
    }

    public isCompatibleWithRange( range: Range< T > ): boolean {

        return ArrayUtils.isEmpty( this ) ? true : this[ 0 ].compare == range.compare;

    }

}
