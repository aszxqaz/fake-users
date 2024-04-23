import {
    Box,
    Table as ChakraTable,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { User } from '@users/common';
import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { CenteredSpinner } from '../../../common/components/CenterSpinner';

type UsersTableProps = {
    users: User[];
    onScrollDown: () => Promise<void>;
};

export function UsersTable({ users, onScrollDown }: UsersTableProps) {
    const rowRef = useRef(null);
    const isInView = useInView(rowRef);
    // const scrollObserverEnabled = useRef(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isInView) {
            setIsLoading(true);
            console.log(`[UsersTable] fetchNext()`);
            onScrollDown().then(() => {
                setIsLoading(false);
            });
        }
    }, [isInView]);

    return (
        <TableContainer pos="relative">
            <ChakraTable variant="striped" colorScheme="gray" size="md">
                <Thead>
                    <Tr>
                        <Th>#</Th>
                        <Th>UUID</Th>
                        <Th>Fullname</Th>
                        <Th>Street</Th>
                        <Th>Phone</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map((user, idx) => (
                        <Tr key={user.id}>
                            <Td>{idx + 1}</Td>
                            <Td>{user.id}</Td>
                            <Td>{user.fullname}</Td>
                            <Td>{user.address}</Td>
                            <Td>{user.phone}</Td>
                        </Tr>
                    ))}
                    {Array(9)
                        .fill(0)
                        .map((_, idx) => (
                            <Tr key={idx}>
                                <Td
                                    colSpan={5}
                                    ref={idx == 0 ? rowRef : undefined}
                                >
                                    <Text opacity={0}>Placeholder</Text>
                                </Td>
                            </Tr>
                        ))}
                </Tbody>
            </ChakraTable>
            <Box
                bgColor="rgba(0,0,0,0.3)"
                pos="absolute"
                inset={0}
                visibility={isLoading ? 'visible' : 'hidden'}
            >
                <CenteredSpinner />
            </Box>
        </TableContainer>
    );
}
