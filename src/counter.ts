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
        const loop: Loop = new Loop(
            () => this.condition?.(count, start, period) ?? true,
            () => this.callbackEach?.(count, start, period),
            () => this.callbackLast?.(count, start, period)
        );
        for(let _ of loop.iterate()) {

            yield count;
            count += period;

        }
        return count;

    }

}
