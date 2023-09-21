module Loop {

    export type callback<R> = () => R;

}



export default class Loop {

    /*
    
        To add:
        
        To change:
            when function is returned in generator, replace callbackEach temporarily
    
    */

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
        let callbackEach: canBeUndefined<Loop.callback<unknown>> = this.callbackEach;
        while(true) {

            if(isEntryControlled) if(this.mustStop()) break;
            yield;
            const callbackReturn: unknown = callbackEach?.();
            if(callbackReturn === false) break;
            if(callbackReturn instanceof Function) callbackEach = callbackReturn as Loop.callback<unknown>;
            if(isExitControlled) if(this.mustStop()) break;

        }
        this.callbackLast?.();

    }

    private mustStop(): boolean {

        return !(this.condition?.() ?? true);

    }

}
