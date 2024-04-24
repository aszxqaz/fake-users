import { ChangeEvent, useState } from 'react';
import { parseNumInput } from '../../../helpers/numparser';

export type NumberInputControllerOptions = {
    defaultValue: number;
    maxCharsCount?: number;
    type: 'float' | 'int';
    maxValue?: number;
    minValue?: number;
};

export const useNumberInputController = ({
    defaultValue,
    type,
    maxCharsCount,
    maxValue = Number.MAX_SAFE_INTEGER - 100,
    minValue = Number.MIN_SAFE_INTEGER + 100,
}: NumberInputControllerOptions) => {
    const [parsedValue, setParsedValue] = useState(defaultValue);
    const [inputValue, setInputValue] = useState(
        defaultValue?.toString() || ''
    );

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const parsed = parseNumInput(e.target.value, maxValue, minValue, type);
        console.log(e.target.value);
        console.log(parsed);
        console.log('------');
        if (parsed !== undefined) {
            setInputValue(e.target.value);
            setParsedValue(parsed);
        }
    };

    const setNumberInputValues = (value: number) => {
        setParsedValue(value);
        setInputValue(value.toString());
    };

    return { onChange, inputValue, parsedValue, setNumberInputValues };
};
