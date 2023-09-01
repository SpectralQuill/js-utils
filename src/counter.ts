import BooleanUtils from "./boolean";
import NumberUtils from "./number";

module Counter {
    
    export type callbackEach<R> = (count: number, start: number, period: number) => R;

}

export default class Counter {

    public constructor(
        private start: number = 0,
        private period: number = 1,
        private condition?: Counter.callbackEach<boolean>,
        private callbackEach?: Counter.callbackEach<unknown>,
        private callbackLast?: Counter.callbackEach<void>
    ) {}

    public hasCondition(): boolean {

        return this.condition !== undefined;

    }

    public hasCallbackEach(): boolean {

        return this.callbackEach !== undefined;

    }

    public hasCallbackLast(): boolean {

        return this.callbackLast !== undefined;

    }

    public [Symbol.iterator](): Generator<number, number> {

        return this.iterate();

    }

    public * iterate(): Generator<number, number> {

        const { start, period } = this;
        let count = start;
        while(this.condition?.(count, start, period) ?? true) {

            yield count;
            count += period;
            if(this.hasCallbackEach()) {
                
                const returnValue: unknown = this.callbackEach?.(count, start, period);

                if(returnValue === false) break;
                else if(NumberUtils.isNumber(returnValue)) count += returnValue as number;

            }

        }
        this.callbackLast?.(count, start, period);
        return count;
    
    }

}
