import { HStack, StackProps, Text } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { IconType } from 'react-icons';

type NoContentPlaceholderProps = {
    icon: IconType;
} & StackProps &
    PropsWithChildren;

export function NoContentPlaceholder({
    icon,
    children,
    ...props
}: NoContentPlaceholderProps) {
    const Icon = icon;
    return (
        <HStack margin="auto" justifyContent="center" {...props}>
            <Icon fontSize="4rem" />
            <Text fontSize="1.2rem" align="center">
                {children}
            </Text>
        </HStack>
    );
}
