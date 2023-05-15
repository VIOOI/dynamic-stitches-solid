type CaseWhen<T> = T | (() => T);
export declare const when: <T>(condition: boolean, trueCase: CaseWhen<T>, falseCase: CaseWhen<T>) => string | T;
export {};
