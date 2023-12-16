enum ComparisonType {

    Equal,
    MoreThan,
    LessThan

}

export default class Comparison {

    public static Equal = new Comparison( ComparisonType.Equal );
    public static MoreThan = new Comparison( ComparisonType.MoreThan );
    public static LessThan = new Comparison( ComparisonType.LessThan );

    private constructor( private readonly comparisonType: ComparisonType ) {}

    public isEqual(): boolean {

        return this.comparisonType == ComparisonType.Equal;

    }

    public isMoreThan(): boolean {

        return this.comparisonType == ComparisonType.MoreThan;

    }

    public isLessThan(): boolean {

        return this.comparisonType == ComparisonType.LessThan;

    }

    public isMoreThanOrEqual(): boolean {

        return this.comparisonType == ComparisonType.MoreThan || this.comparisonType == ComparisonType.Equal;

    }

    public isLessThanOrEqual(): boolean {

        return this.comparisonType == ComparisonType.LessThan || this.comparisonType == ComparisonType.Equal;

    }

    public isInequal(): boolean {

        return this.comparisonType != ComparisonType.Equal;

    }

}
