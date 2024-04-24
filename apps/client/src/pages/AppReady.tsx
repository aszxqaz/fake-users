import { Button, Center, HStack, Spinner } from '@chakra-ui/react';
import { User } from '@users/common';
import { useCallback, useRef } from 'react';
import useDebouncedEffect from 'use-debounced-effect';
import { Error } from '../common';
import { CenteredSpinner } from '../common/components';
import { exportUsers } from '../csv';
import { Header } from '../layout';
import { useFetchUsers } from '../state/hooks';
import { ErrorFactorEditor, RegionEditor, SeedEditor } from './components';
import { UsersTable } from './components/UsersTable';
import { useNumberInputController } from './components/number_input';

export function AppReady({
    users: usersOptional,
    error,
    locale,
    locales,
    setLocale,
    isLoading,
}: AppReadyProps) {
    const { fetchUsers } = useFetchUsers();
    const users = usersOptional || [];
    const {
        inputValue: errorFactorStrVal,
        parsedValue: errorFactor,
        setNumberInputValues: setErrFactor,
        onChange: onErrFactorChange,
    } = useNumberInputController({
        defaultValue: 0,
        type: 'float',
        maxValue: 1000,
        minValue: 0,
    });

    const {
        inputValue: seedStrVal,
        parsedValue: seed,
        setNumberInputValues: setSeed,
        onChange: onSeedChange,
    } = useNumberInputController({
        defaultValue: 0,
        type: 'int',
    });

    const fetchNextPage = useCallback(async () => {
        return fetchUsers({
            locale,
            errorFactor,
            seed,
            offset: users.length,
            limit: users.length ? 10 : 20,
        });
    }, [locale, errorFactor, seed, users.length]);

    const firstRun = useRef(true);

    const limit = users.length || 20;

    useDebouncedEffect(
        () => {
            if (firstRun.current) {
                firstRun.current = false;
            } else {
                console.log('fetching users');
                fetchUsers({
                    errorFactor,
                    seed,
                    locale,
                    limit,
                    offset: 0,
                });
            }
        },
        500,
        [errorFactor, seed, locale]
    );

    const onRandomClick = () => {
        const seed = Date.now() ^ (Math.random() * 4294967296);
        setSeed(seed);
    };

    const onExportCsv = () => {
        exportUsers(users);
    };

    return users.length ? (
        <>
            <Header />
            <Center
                w="100%"
                maxW="90%"
                mb="5rem"
                margin="auto"
                flexDir="column"
            >
                <HStack justifyContent="center" mb="2rem" gap="2rem">
                    <RegionEditor
                        locale={locale}
                        locales={locales}
                        onLocaleChange={setLocale}
                    />
                    <ErrorFactorEditor
                        errFactor={errorFactor}
                        errFactorStrVal={errorFactorStrVal}
                        setErrFactor={setErrFactor}
                        onErrFactorChange={onErrFactorChange}
                    />
                    <SeedEditor
                        seedStrVal={seedStrVal}
                        onSeedChange={onSeedChange}
                        onRandomClick={onRandomClick}
                    />
                    <Button onClick={onExportCsv} disabled={!users.length}>
                        Export CSV
                    </Button>
                </HStack>
                <UsersTable users={users!} onScrollDown={fetchNextPage} />
                {error ? (
                    <Center>
                        <Error>{error}</Error>
                    </Center>
                ) : null}
                <Center
                    bgColor="rgba(0,0,0,0.3)"
                    pos="fixed"
                    inset={0}
                    visibility={isLoading ? 'visible' : 'hidden'}
                >
                    <Spinner size="xl" />
                </Center>
            </Center>
        </>
    ) : (
        <CenteredSpinner />
    );
}
export type AppReadyProps = {
    users?: User[];
    error?: string;
    locale: string;
    isLoading: boolean;
    locales: string[];
    setLocale: (locale: string) => void;
};
