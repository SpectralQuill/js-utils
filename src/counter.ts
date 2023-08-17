module Counter {
    
    export type callback<R> = (value: number, start: number, period: number) => R;
    export type condition = boolean | Counter.conditionCallback;
    export type conditionCallback = Counter.callback<boolean>;

}

export default class Counter {

    private static makeConditionCallbackFn(
        condition: Counter.condition
    ): Counter.conditionCallback {

        return condition instanceof Function ? condition : (() => condition);

    }

    public condition: Counter.conditionCallback;

    public constructor(
        public start: number = 0,
        public period: number = 1,
        condition: Counter.condition = true
    ) {

        this.condition = Counter.makeConditionCallbackFn(condition);

    }

    [Symbol.iterator](): Generator<number> {

        return this.iterate();

    }

    *iterate() {

        const { start, period } = this;
        let value = start;
        while(this.condition(value, start, period)) {

            yield value;
            value += period;

        }
    
    }

}
