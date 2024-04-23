export type StateChanged<S> = (prevState: S) => S;

export type PartialDispatch<S> = (f: StateChanged<S>) => void;
