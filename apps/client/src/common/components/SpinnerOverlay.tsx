import { Center, Portal, Spinner } from '@chakra-ui/react';

export function SpinnerOverlay() {
    return (
        <Portal>
            <Center
                backgroundColor="rgba(67, 230, 161, 0.1)"
                position={'fixed'}
                inset={0}
            >
                <Spinner size="xl" />
            </Center>
        </Portal>
    );
}
