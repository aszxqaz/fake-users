import { Text } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
import { NoContentPlaceholder } from '.';

export function Error({ children }: PropsWithChildren) {
    return (
        <NoContentPlaceholder icon={RiErrorWarningLine}>
            <Text colorScheme="tomato"></Text>
            {children}
        </NoContentPlaceholder>
    );
}
