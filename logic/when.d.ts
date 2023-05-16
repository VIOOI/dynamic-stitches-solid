type CaseWhen<T> = T | (() => T);
type WhenArgs<T> = {
    condition: boolean;
    onTrue: CaseWhen<T>;
    onFalse: CaseWhen<T>;
};
export declare function when<T>(args: WhenArgs<T>): T;
export declare function when<T>(condition: boolean, onTrue: CaseWhen<T>, onFalse: CaseWhen<T>): T;
export {};
