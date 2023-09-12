import BooleanUtils from "./boolean";

module Loop {

    export type callback<R> = () => R;

}

export default class Loop {

    public constructor(
        private readonly condition?: Loop.callback<boolean>,
        private readonly callbackEach?: Loop.callback<unknown>,
        private readonly callbackLast?: Loop.callback<void>,
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
        while(true) {

            if(isEntryControlled) if(this.stop()) break;
            yield;
            if(this.callbackEach?.() === false) break;
            if(isExitControlled) if(this.stop()) break;

        }
        this.callbackLast?.();

    }

    

    private stop(): boolean {

        return !(this.condition?.() ?? true);

    }

}
