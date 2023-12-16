import NumberUtils from "./NumberUtils.js";
import { frac, int } from "./types.js";

export default class Counter {

    public count: frac;

    constructor( public start: frac = 0, public period: frac = 1 ) {

        this.count = start;

    }

    public backward(): frac {

        return this.period = NumberUtils.toNegative( this.period );

    }

    public forward(): frac {

        return this.period = NumberUtils.toPositive( this.period );

    }

    public isBackward(): boolean {

        return NumberUtils.isNegative( this.period );

    }

    public isForward(): boolean {

        return NumberUtils.isPositive( this.period );

    }

    public next( period: frac = this.period ): frac {

        return this.count += period;

    }

    public reset( start: frac = this.start ): frac {

        return this.count = start;

    }

    public reverse(): frac {

        return this.period = NumberUtils.toOpposite( this.period );

    }

    public skip( skip: int = 1 ): frac {

        return this.count += this.period * skip;

    }

    public * [ Symbol.iterator ](): Generator< [ count: frac, counter: Counter ] > {

        while( true ) {

            yield [ this.count, this ];
            this.next();

        }

    }

    public toNumber(): frac {

        return this.count;

    }

    public toString(): string {

        return this.toNumber().toString();

    }

}
