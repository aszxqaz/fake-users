import { FetchResponse, HelloResponse, IQueryOptions } from '@users/common';
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
    const sendHello = useCallback(async () => {
        if (isStatusNotInitial) return;
        const result = await apiClient.sendHello();
        result.fold(onError, onHelloResponse);
    }, [isStatusNotInitial, apiClient, onError, onFetchResponse]);

    const isStatusNotReady = state.inner.status != FetchingStatus.Ready;
    const fetchUsers = useCallback(
        async (query: IQueryOptions) => {
            if (isStatusNotReady) return;
            setAppState(prev => prev.setLoading(true));
            const result = await apiClient.fetchUsers(query);
            result.fold(onError, onFetchResponse);
            setAppState(prev => prev.setLoading(false));
        },
        [isStatusNotReady, onError, onFetchResponse]
    );

    return {
        sendHello,
        fetchUsers,
        // fetchRegenerate,
    };
}
