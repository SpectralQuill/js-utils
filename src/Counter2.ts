import NumberUtils from "./NumberUtils";

export default class Counter {

    public count: number;

    public constructor( public start: number = 0, public period: number = 1 ) {

        this.count = start;

    }

    public * [ Symbol.iterator ](): Generator < [ count: number, counter: Counter ] > {

        while( true ) {

            yield [ this.count, this ];
            this.count += this.period;

        }

    }

    public backward(): number {

        return this.period = NumberUtils.toNegative( this.period );

    }

    public forward(): number {

        return this.period = NumberUtils.toPositive( this.period );

    }

    public isBackward() {

        return NumberUtils.isNegative( this.period );

    }

    public isForward() {

        return NumberUtils.isPositive( this.period );

    }

    public reset(): number {

        return this.count = this.start;

    }

    public reverse(): number {

        return this.period = NumberUtils.toReverse( this.period );

    }

    public skip( skip: number ): number {

        return this.count += this.period * skip;

    }

    public toNumber(): number {

        return this.count;

    }

    public toString(): string {

        return this.toNumber().toString();

    }

}
