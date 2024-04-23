import { Center, Spinner } from '@chakra-ui/react';

export function CenteredSpinner() {
    return (
        <Center mt="35vh">
            <Spinner size="xl" />
        </Center>
    );
}
