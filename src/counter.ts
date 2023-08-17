module Counter {
    
    export type callback<R> = (value: number, start: number, period: number) => R;
    export type condition = boolean | Counter.callback<boolean>;

}

export default class Counter {

    private static makeConditionCallbackFn(
        condition: Counter.condition
    ): Counter.callback<boolean> {

        return condition instanceof Function ? condition : (() => condition);

    }

    public condition: Counter.callback<boolean>;

    public constructor(
        public start: number = 0,
        public period: number = 1,
        condition: Counter.condition = true
    ) {

        this.condition = Counter.makeConditionCallbackFn(condition);

    }

    public [Symbol.iterator](): Generator<number, number> {

        return this.iterate();

    }

    public * iterate(): Generator<number, number> {

        const { start, period } = this;
        let value = start;
        while(this.condition(value, start, period)) {

            yield value;
            value += period;

        }
        return value;
    
    }

}
