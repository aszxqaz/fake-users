import { Center } from '@chakra-ui/react';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
import { CenteredSpinner } from '../../common/components/CenterSpinner';
import { ControlPanel } from '../../components/ControlPanel/ControlPanel';
import {
    FetchingStatus,
    UserGenerationOptions,
    useAppContext,
} from '../../state';
import { UsersTable } from './components/UsersTable';

import { User } from '@users/common';
import { NoContentPlaceholder } from '../../common/components/NoContentPlaceholder';
import { Header } from '../../layout';
import { useFetchUsers, useOptionsMutation } from '../../state/hooks';

export function Fakegen() {
    const { state } = useAppContext();
    const { fetchInitial, fetchNext } = useFetchUsers();

    useEffect(() => {
        if (state.inner.status == FetchingStatus.Initial) {
            console.log(`[Fakegen] fetchInitial()`);
            fetchInitial();
        }
    }, [state.inner.status]);

    switch (state.inner.status) {
        case FetchingStatus.Ready:
            const users = state.getUsers();
            return <AppReady users={users} options={state.inner.options} />;
        case FetchingStatus.Error:
            return <AppError />;
        case FetchingStatus.Initial:
        case FetchingStatus.Fetching:
            return <CenteredSpinner />;
    }
}

type AppReadyProps = {
    users?: User[];
    options: UserGenerationOptions;
};

export function AppReady({ users, options }: AppReadyProps) {
    const { fetchNext, fetchRegenerate } = useFetchUsers();
    const { state } = useAppContext();
    const { setErrFactor, setLocale, setSeed } = useOptionsMutation();
    const firstRun = useRef(true);

    // useDebouncedEffect(
    //     () => {
    //         console.log(options.errorFactor);
    //         console.log(options.seed);
    //         if (firstRun.current) {
    //             firstRun.current = false;
    //             return;
    //         }
    //         console.log('[AppReady] fetchRegenerate()');
    //         fetchRegenerate();
    //     },
    //     500,
    //     [firstRun.current, options.errorFactor, options.seed, fetchRegenerate]
    // );

    useEffect(() => {
        if (!users) {
            fetchNext();
        }
    }, [users]);

    return users?.length ? (
        <>
            <Header />
            <Center
                w="100%"
                maxW="90%"
                mb="5rem"
                margin="auto"
                flexDir="column"
            >
                <ControlPanel
                    options={options}
                    onErrFactorChangeUpCb={setErrFactor}
                    onSeedChangeUpCb={setSeed}
                    onLocaleChangeUpCb={setLocale}
                />
                <UsersTable users={users} onScrollDown={fetchNext} />
            </Center>
        </>
    ) : (
        <CenteredSpinner />
    );
}

function AppError({ children }: PropsWithChildren) {
    return (
        <NoContentPlaceholder icon={RiErrorWarningLine}>
            {children}
        </NoContentPlaceholder>
    );
}
