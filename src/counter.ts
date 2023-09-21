import Loop from "./loop";
import NumberUtils from "./number";

module Counter {
    
    export type callback<R> = (count: number, start: number, period: number) => R;

}

export default class Counter {

    public constructor(
        private readonly start: number = 0,
        private readonly period: number = 1,
        private readonly condition?: Counter.callback<boolean>,
        private readonly callbackEach?: Counter.callback<unknown>,
        private readonly callbackLast?: Counter.callback<void>
    ) {}

    public [Symbol.iterator](): Generator<number, number> {

        return this.iterate();

    }

    public * iterate(): Generator<number, number> {

        const { start, period } = this;
        let count = start;
        let callbackEach: canBeUndefined<Counter.callback<unknown>> = this.callbackEach;
        const loop: Loop = new Loop(
            () => this.condition?.(count, start, period) ?? true,
            () => {
                
                const callbackReturn = callbackEach?.(count, start, period);
                if(NumberUtils.isNumber(callbackReturn)) count += callbackReturn as number;
                count += period;
                if(callbackReturn instanceof Function)
                    callbackEach = callbackReturn as Counter.callback<unknown>;
                else
                    return callbackReturn;

            },
            () => this.callbackLast?.(count, start, period)
        );
        for(let _ of loop.iterate()) {

            yield count;

        }
        return count;

    }

}
