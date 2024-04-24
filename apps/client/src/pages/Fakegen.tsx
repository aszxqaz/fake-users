import { useCallback, useEffect } from 'react';
import { FetchingStatus, useAppContext } from '../state';

import { CenteredSpinner } from '../common/components';
import { useFetchUsers } from '../state/hooks';
import { AppReady } from './AppReady';

export function Fakegen() {
    const { state, setAppState } = useAppContext();
    const { sendHello } = useFetchUsers();

    useEffect(() => {
        if (state.inner.status == FetchingStatus.Initial) {
            sendHello();
        }
    }, [state.inner.status]);

    const setLocale = useCallback(
        (locale: string) => {
            setAppState(prev => prev.setLocale(locale));
        },
        [setAppState]
    );

    switch (state.inner.status) {
        case FetchingStatus.Ready:
            const locale = state.inner.locale;
            const locales = state.inner.locales;
            const loading = state.inner.loading;
            const users = state.getUsers();
            const error = state.inner.error;
            return (
                <AppReady
                    users={users}
                    locale={locale}
                    locales={locales}
                    setLocale={setLocale}
                    isLoading={loading}
                    error={error}
                />
            );
        case FetchingStatus.Initial:
        case FetchingStatus.Fetching:
            return <CenteredSpinner />;
    }
}
