module Counter {
    
    export type callback<R> = (value: number, start: number, period: number) => R;
    export type condition = Counter.callback<boolean>;

}

export default class Counter {

    public constructor(
        public start: number = 0,
        public period: number = 1,
        public condition: Counter.condition
    ) {}

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
