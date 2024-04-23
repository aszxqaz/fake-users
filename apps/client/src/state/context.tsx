import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { AppState } from './state';
import { PartialDispatch } from './types';

type AppContext = {
    state: AppState;
    setAppState: PartialDispatch<AppState>;
};

const defaultAppState = AppState.initial;

const defaultAppContext: AppContext = {
    state: AppState.initial,
    setAppState: _ => {},
};

const AppContext = createContext(defaultAppContext);

export function AppStateProvider({ children }: PropsWithChildren) {
    const [state, setState] = useState(defaultAppState);

    return (
        <AppContext.Provider value={{ state: state, setAppState: setState }}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => useContext(AppContext);
