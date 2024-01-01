import { NumberUtils } from "./NumberUtils";

export class Counter {

    public count: number;

    constructor( public start: number = 0, public period: number = 1 ) {

        this.count = start;

    }

    public backward(): number {

        return this.period = NumberUtils.toNegative( this.period );

    }

    public forward(): number {

        return this.period = NumberUtils.toPositive( this.period );

    }

    public isBackward(): boolean {

        return NumberUtils.isNegative( this.period );

    }

    public isForward(): boolean {

        return NumberUtils.isPositive( this.period );

    }

    public next( period: number = this.period ): number {

        return this.count += period;

    }

    public reset( start: number = this.start ): number {

        return this.count = start;

    }

    public reverse(): number {

        return this.period = NumberUtils.toOpposite( this.period );

    }

    public skip( skip: int = 1 ): number {

        return this.count += this.period * skip;

    }

    public * [ Symbol.iterator ](): Generator< [ count: number, counter: Counter ] > {

        while( true ) {

            yield [ this.count, this ];
            this.next();

        }

    }

    public toNumber(): number {

        return this.count;

    }

    public toString(): string {

        return this.toNumber().toString();

    }

}
