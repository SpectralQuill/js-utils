import { NumberRange } from "./NumberRange";

export class TimeUnitRange extends NumberRange {

    constructor(
        public readonly title: string, start: int, end: int,
        includeStart: boolean = true, includeEnd: boolean = false
    ) {

        super( start, end, includeStart, includeEnd, 1 );

    }

}

export const AmHourRange: TimeUnitRange = new TimeUnitRange( "a.m. hour", 0, 12 );
export const HourRange: TimeUnitRange = new TimeUnitRange( "hour", 0, 24 );
export const MillisecondRange: TimeUnitRange = new TimeUnitRange( "millisecond", 0, 1000 );
export const MinuteRange: TimeUnitRange = new TimeUnitRange( "minute", 0, 60 );
export const MonthRange: TimeUnitRange = new TimeUnitRange( "month", 1, 12, true, true );
export const PmHourRange: TimeUnitRange = new TimeUnitRange( "p.m. hour", 12, 24 );
export const SecondRange: TimeUnitRange = new TimeUnitRange( "second", 0, 60 );
export const WeekDayRange: TimeUnitRange = new TimeUnitRange( "week day", 1, 7, true, true );
