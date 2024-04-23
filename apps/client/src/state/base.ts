export class BaseState<T> {
    constructor(public readonly inner: T) {}
}
