import Loop from "./loop";
import NumberUtils from "./number";

export module Counter {

    export type callback<R> = (count: number, start: number, period: number) => R;
    export type callbackEach = callback<callbackEachReturn>;
    export type callbackEachReturn = canBeVoid<[
        breakLoop?: boolean,
        newCallbackEach?: callbackEach,
        newCallbackLast?: callbackLast,
        periodAddend?: int
    ]>;
    export type callbackLast = callback<void>;
    export type condition = callback<boolean>;

}

// export default class Counter {

//     // Make a CounterReturn object

//     public constructor(
//         private readonly start: number = 0,
//         private readonly period: number = 1,
//         private readonly condition?: Counter.callback<boolean>,
//         private readonly callbackEach?: Counter.callback<unknown>,
//         private readonly callbackLast?: Counter.callback<void>
//     ) {}

//     public [Symbol.iterator](): Generator<number, number> {

//         return this.iterate();

//     }

//     public * iterate(): Generator<number, number> {

//         const { start, period } = this;
//         let count = start;
//         let callbackEach: canBeUndefined<Counter.callback<unknown>> = this.callbackEach;
//         const loop: Loop = new Loop(
//             () => this.condition?.(count, start, period) ?? true,
//             () => {
                
//                 const callbackReturn = callbackEach?.(count, start, period);
//                 count += period;
//                 if(NumberUtils.isNumber(callbackReturn))
//                     count += callbackReturn as number;
//                 else if(callbackReturn instanceof Function)
//                     callbackEach = callbackReturn as Counter.callback<unknown>;
//                 else
//                     return callbackReturn;

//             },
//             () => this.callbackLast?.(count, start, period)
//         );
//         for(let _ of loop.iterate()) yield count;
//         return count;

//     }

// }

export default class Counter {

    public constructor(
        private readonly start: number = 0,
        private readonly period: number = 1,
        private readonly condition?: Counter.condition,
        private readonly callbackEach?: Counter.callbackEach,
        private readonly callbackLast?: Counter.callbackLast
    ) {}

    public [Symbol.iterator](): Generator<number, number> {

        return this.iterator();

    }

    public * iterator(): Generator<number, number> {

        const { start, period } = this;
        let count = start;
        let { callbackEach, callbackLast } = this;
        const loop: Loop = new Loop(
            () => (this.condition?.(count, start, period) ?? true),
            () => {

                const callbackEachReturn = callbackEach?.(count, start, period);
                count += period;
                if(callbackEachReturn != undefined) {

                    const [ breakLoop, newCallbackEach, newCallbackLast, periodAddend ] = callbackEachReturn;
                    if(periodAddend != undefined) count += periodAddend;
                    if(newCallbackEach instanceof Function) callbackEach = newCallbackEach;
                    if(newCallbackLast instanceof Function) callbackLast = callbackLast;
                    return [ breakLoop ];

                }

            },
            () => callbackLast?.(count, start, period)
        );
        for(let _ of loop.iterate()) yield count;
        return count;

    }

}
