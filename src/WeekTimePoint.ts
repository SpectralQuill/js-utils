import { TimePoint } from "./TimePoint";
import { HourRange, MinuteRange, TimeUnitRange, WeekDayRange } from "./TimeUnitRange";

export class WeekTimePoint extends TimePoint {

    public static readonly ranges: TimeUnitRange[] = [ WeekDayRange, HourRange, MinuteRange ];

    constructor( weekDay: int, hour: int, minute: int ) {

        super( WeekTimePoint.ranges, [ weekDay, hour, minute ] );

    }

    public get hour(): int {

        return this[ 1 ];

    }

    public get minute(): int {

        return this[ 2 ];

    }

    public get weekDay(): int {

        return this[ 0 ];

    }

    public toString(): string {

        const { hour, minute, weekDay } = this;
        return `${ weekDay} ${ hour }:${ minute }`;

    }

}
