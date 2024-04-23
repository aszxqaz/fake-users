import { ChangeEvent, useState } from 'react';
import {
    parseFloatInput as parseAndCheckFloatInput,
    parseIntInput as parseAndCheckIntInput,
} from '../../helpers/numparser';

export type NumberInputControllerOptions = {
    defaultValue: number;
    maxCharsCount?: number;
    type: 'float' | 'int';
    maxValue?: number;
};

export const useNumberInputController = ({
    defaultValue,
    type,
    maxCharsCount,
    maxValue = Number.MAX_SAFE_INTEGER,
}: NumberInputControllerOptions) => {
    const [parsedValue, setParsedValue] = useState(defaultValue);
    const [inputValue, setInputValue] = useState(
        defaultValue?.toString() || ''
    );

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const parseFn =
            type == 'float' ? parseAndCheckFloatInput : parseAndCheckIntInput;
        const parsed = parseFn(e.target.value, maxValue);
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
