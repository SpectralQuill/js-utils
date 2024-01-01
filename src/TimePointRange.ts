import { NumberUtils } from "./NumberUtils";
import { Range } from "./Range";
import { TimePoint } from "./TimePoint";

export class TimePointRange< T extends TimePoint > extends Range< T > {

    public constructor( start: T, end: T ) {

        super( start, end, NumberUtils.compareNumberArray, false, false );

    }

    public isInstant(): boolean {

        const { start, end } = this;
        return this.compare( start, end ) == 0;

    }

    public toString(): string {

        const { start, end } = this;
        return `${ start.toString() } - ${ end.toString() }`;

    }

}
