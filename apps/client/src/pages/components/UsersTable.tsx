import {
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
import { useEffect, useRef } from 'react';

type UsersTableProps = {
    users: User[];
    onScrollDown: () => void;
};

export function UsersTable({ users, onScrollDown }: UsersTableProps) {
    const rowRef = useRef(null);
    const isInView = useInView(rowRef);

    useEffect(() => {
        if (isInView) {
            onScrollDown();
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
        </TableContainer>
    );
}
