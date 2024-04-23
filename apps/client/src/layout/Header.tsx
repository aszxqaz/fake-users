import { Box, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { ColorModeSwitcher } from '../common/components/ColorModeSwitcher';

export function Header({ children }: PropsWithChildren) {
    return (
        <Box
            bg={useColorModeValue('gray.100', 'gray.900')}
            px={4}
            boxShadow="0 2px 2px 0 rgba(0, 0, 0, 0.15)"
            mb="2rem"
        >
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <Heading size="sm">FakeUsers</Heading>
                <ColorModeSwitcher />
            </Flex>
        </Box>
    );
}
