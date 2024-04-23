export class Err {
    constructor(
        public readonly message: string,
        public readonly code?: number,
        public readonly original?: any
    ) {}
}

export class Result<T> {
    private constructor(
        private readonly inner:
            | {
                  error: Err;
              }
            | {
                  value: T;
              }
    ) {}

    static Err<T>(message: string, code?: number, original?: any) {
        return new Result<T>({ error: new Err(message, code, original) });
    }

    static Ok<T>(value: T) {
        return new Result({ value });
    }

    fold(onErr: (err: Err) => void, onOk: (value: T) => void) {
        if ('error' in this.inner) {
            onErr(this.inner.error);
        } else {
            onOk(this.inner.value);
        }
    }
}

export type AsyncResult<T> = Promise<Result<T>>;
