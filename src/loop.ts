module Loop {

    export type callback<R> = () => R;

}

export default class Loop {

    private readonly condition: Loop.callback<boolean>;
    private readonly callbackEach: Loop.callback<unknown>;
    private readonly callbackLast: Loop.callback<void>;

    public constructor(
        condition?: Loop.callback<boolean>,
        callbackEach?: Loop.callback<unknown>,
        callbackLast?: Loop.callback<void>,
        private readonly isEntryControlled: boolean = true
    ) {

        this.condition = () => condition?.() ?? true;
        this.callbackEach = () => callbackEach?.();
        this.callbackLast = () => callbackLast?.();

    }

    public get isExitControlled(): boolean {

        return !this.isEntryControlled;

    }

    public [Symbol.iterator](): Generator<void, void> {

        return this.iterate();

    }

    public * iterate(): Generator<void, void> {

        const { isEntryControlled, isExitControlled } = this;
        while(true) {

            if(isEntryControlled) if(this.condition()) break;
            yield;
            if(this.callbackEach() === false) break;
            if(isExitControlled) if(this.condition()) break;

        }
        this.callbackLast();

    }

}
