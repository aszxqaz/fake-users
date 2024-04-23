import { Select } from '@chakra-ui/react';
import { sortBy } from 'lodash';
import { ChangeEventHandler, useMemo } from 'react';

type CustomSelectProps = {
    options: {
        value: string | number;
        title: string;
    }[];
    // defaultCheckedValue: string;
    value: string;
    onChange: ChangeEventHandler<HTMLSelectElement> | undefined;
};

export function CustomSelect({
    // defaultCheckedValue,
    onChange,
    options,
    value,
}: CustomSelectProps) {
    const sortedOptions = useMemo(() => sortBy(options, 'title'), [options]);
    return (
        <Select onChange={onChange} value={value}>
            {sortedOptions.map(option => (
                <option
                    value={option.value}
                    key={option.value}
                    // defaultChecked={option.value == defaultCheckedValue}
                >
                    {option.title}
                </option>
            ))}
        </Select>
    );
}
