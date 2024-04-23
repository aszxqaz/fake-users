import { FetchResponse, HelloResponse } from '@users/common';
import { useCallback } from 'react';
import { useApiClient } from '../api';
import { Err } from '../helpers';
import { useAppContext } from './context';
import { FetchingStatus } from './state';

export function useFetchUsers() {
    const { apiClient } = useApiClient();
    const { state, setAppState } = useAppContext();

    const onError = useCallback(
        (err: Err) => {
            setAppState(prev => prev.error(err.message));
        },
        [setAppState]
    );

    const onFetchResponse = useCallback(
        (res: FetchResponse) => {
            setAppState(prev => prev.usersFetched(res));
        },
        [setAppState]
    );

    const onHelloResponse = useCallback(
        (res: HelloResponse) => {
            setAppState(prev => prev.helloReceived(res));
        },
        [setAppState]
    );

    const isStatusNotInitial = state.inner.status != FetchingStatus.Initial;
    const fetchInitial = useCallback(async () => {
        if (isStatusNotInitial) return;
        const result = await apiClient.sendHello();
        result.fold(onError, onHelloResponse);
    }, [isStatusNotInitial, apiClient, onError, onFetchResponse]);

    const isStatusNotReady = state.inner.status != FetchingStatus.Ready;
    const fetchNext = useCallback(async () => {
        if (isStatusNotReady) return;
        console.log(`fetchNext(): ${state.inner.options.locale}`);
        const limit = state.getUsers().length ? 10 : 20;
        const result = await apiClient.fetchUsers({
            seed: state.inner.options.seed,
            errorFactor: state.inner.options.errorFactor,
            locale: state.inner.options.locale,
            offset: state.getUsers().length,
            limit,
        });
        result.fold(onError, onFetchResponse);
    }, [isStatusNotReady, apiClient, onError, onFetchResponse]);

    const fetchRegenerate = useCallback(async () => {
        if (isStatusNotReady) return;
        const result = await apiClient.fetchUsers({
            seed: state.inner.options.seed,
            errorFactor: state.inner.options.errorFactor,
            locale: state.inner.options.locale,
            limit: state.getUsers().length,
            offset: 0,
        });
        result.fold(onError, onFetchResponse);
    }, [isStatusNotReady, apiClient, onError, onFetchResponse]);

    return {
        fetchInitial,
        fetchNext,
        fetchRegenerate,
    };
}

export function useOptionsMutation() {
    const { setAppState, state } = useAppContext();

    const setErrFactor = useCallback(
        (errFactor: number) => {
            setAppState(prev => prev.setErrFactor(errFactor));
        },
        [setAppState]
    );

    const setSeed = useCallback(
        (seed: number) => {
            setAppState(prev => prev.setSeed(seed));
        },
        [setAppState]
    );

    const setLocale = useCallback(
        (locale: string) => {
            setAppState(prev => prev.setLocale(locale));
        },
        [setAppState]
    );

    return { setErrFactor, setSeed, setLocale };
}
