import {
    Box,
    HStack,
    Input,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Text,
} from '@chakra-ui/react';

type ErrorFactorEditorProps = {
    errFactor: number;
    errFactorStrVal: string;
    setErrFactor: (value: number) => void;
    onErrFactorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function ErrorFactorEditor({
    errFactor,
    errFactorStrVal,
    onErrFactorChange,
    setErrFactor,
}: ErrorFactorEditorProps) {
    return (
        <HStack flex={1} gap="1rem">
            <Text flex={0}>Errors:</Text>
            <Box flex={1}>
                <Slider
                    aria-label="slider-ex-1"
                    step={0.1}
                    min={0}
                    max={10}
                    value={errFactor}
                    focusThumbOnChange={false}
                    onChange={setErrFactor}
                >
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Box>
            <Input
                flex={0.5}
                value={errFactorStrVal}
                onChange={onErrFactorChange}
            />
        </HStack>
    );
}
