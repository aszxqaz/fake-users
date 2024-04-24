import { Center, Spinner } from '@chakra-ui/react';

export function CenteredSpinner() {
    return (
        <Center pos="fixed" inset={0}>
            <Spinner size="xl" />
        </Center>
    );
}
