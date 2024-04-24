import { HStack, Text } from '@chakra-ui/react';
import { UserGenerationOptions } from '../../state';
import { CustomSelect } from '../../ui';

type RegionEditorProps = Pick<UserGenerationOptions, 'locale' | 'locales'> & {
    onLocaleChange: (locale: string) => void;
};

export function RegionEditor({
    locale,
    locales,
    onLocaleChange,
}: RegionEditorProps) {
    const options = locales.map(locale => ({ value: locale, title: locale }));

    function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
        console.log(
            `[RegionEditor] onChange(): target-value=${e.target.value}`
        );
        onLocaleChange(e.target.value);
    }

    return (
        <HStack flex={1}>
            <Text>Region:</Text>
            <CustomSelect
                value={locale}
                options={options}
                onChange={onChange}
            />
        </HStack>
    );
}
