import { ArrayUtils } from "./ArrayUtils";
import { NullishUtils } from "./NullishUtils";
import { OrderedArray } from "./OrderedArray";
import { Range } from "./Range";

export class DisjointRangeArray< T > extends OrderedArray< Range< T > > {

    public constructor() {

        super( Range.compareRange );

    }

    public addRange( range: Range< T > ): boolean {

        return this.addElement( range );

    }

    public addRanges( ...ranges: Range< T >[] ): Range< T >[] {

        return this.addElements( ...ranges );

    }

    public override indexToAddElement( range: Range<T> ): index {

        if( !this.isCompatibleWithRange( range ) ) NullishUtils.makeUndefined< index >();
        let index: index = super.indexToAddElement( range );
        const
            length: int = this.length,
            undefinedInt: int = NullishUtils.makeUndefined< int >(),
            left: index = index > 0 ? ( index - 1 ) : length > 1 ? ( length - 1 ) : undefinedInt,
            right: index = index < length ? index : undefinedInt,
            intersectsWithLeft: boolean = this[ left ]?.intersectsWithRange( range ) ?? false,
            intersectsWithRight: boolean = this[ right ]?.intersectsWithRange( range ) ?? false
        ;
        index = ( !intersectsWithLeft && !intersectsWithRight ) ? index : undefinedInt;
        return index;
        
    }

    public isCompatibleWithRange( range: Range< T > ): boolean {

        return ArrayUtils.isEmpty( this ) ? true : this[ 0 ].compare == range.compare;

    }

}
