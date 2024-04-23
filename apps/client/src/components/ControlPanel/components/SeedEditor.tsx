import { HStack, IconButton, Input, Text } from '@chakra-ui/react';
import { FaRandom } from 'react-icons/fa';

type SeedEditorProps = {
    seedStrVal: string;
    onSeedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function SeedEditor({ onSeedChange, seedStrVal }: SeedEditorProps) {
    return (
        <HStack flex={1}>
            <Text>Seed:</Text>
            <Input value={seedStrVal} onChange={onSeedChange} />
            <IconButton icon={<FaRandom />} aria-label="random" />
        </HStack>
    );
}
