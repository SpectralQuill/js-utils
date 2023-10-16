module Loop {

    export type callback<R> = () => R;
    export type callbackEach = callback<callbackEachReturn>;
    export type callbackEachReturn = canBeVoid<[
        breakLoop?: boolean,
        newCallbackEach?: callbackEach,
        newCallbackLast?: callbackLast
    ]>;
    export type callbackLast = callback<void>;
    export type condition = callback<boolean>;

}

export default class Loop {

    public constructor(
        private readonly condition?: Loop.condition,
        private readonly callbackEach?: Loop.callbackEach,
        private readonly callbackLast?: Loop.callbackLast,
        private readonly isEntryControlled: boolean = true
    ) {}

    public get isExitControlled(): boolean {

        return !this.isEntryControlled;

    }

    public [Symbol.iterator](): Generator<void, void> {

        return this.iterate();

    }

    public * iterate(): Generator<void, void> {

        const { isEntryControlled, isExitControlled } = this;
        let { callbackEach, callbackLast } = this;
        while(true) {

            if(isEntryControlled) if(this.mustStop()) break;
            yield;
            const callbackEachReturn: Loop.callbackEachReturn = callbackEach?.();
            if(callbackEachReturn != undefined) {

                const [ breakLoop, newCallbackEach, newCallbackLast ] = callbackEachReturn;
                if(newCallbackLast instanceof Function) callbackLast = newCallbackLast;
                if(breakLoop === true) break;
                if(newCallbackEach instanceof Function) callbackEach = newCallbackEach;

            }
            if(isExitControlled) if(this.mustStop()) break;

        }
        callbackLast?.();

    }

    private mustStop(): boolean {

        return !(this.condition?.() ?? true);

    }

}
