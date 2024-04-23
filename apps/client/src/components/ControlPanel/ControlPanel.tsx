import { Button, HStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { UserGenerationOptions } from '../../state';
import { useNumberInputController } from '../number_input_controller';
import { SeedEditor } from './components';
import { ErrorFactorEditor } from './components/ErrFactorEditor';
import { RegionEditor } from './components/RegionEditor';

type ControlPanelProps = {
    options: UserGenerationOptions;
    onErrFactorChangeUpCb: (errFactor: number) => void;
    onSeedChangeUpCb: (seed: number) => void;
    onLocaleChangeUpCb: (locale: string) => void;
};

export function ControlPanel({
    options: { errorFactor: errFactorUp, locale, locales, seed: seedUp },
    onErrFactorChangeUpCb,
    onLocaleChangeUpCb,
    onSeedChangeUpCb,
}: ControlPanelProps) {
    const {
        inputValue: errFactorStrVal,
        parsedValue: errFactor,
        setNumberInputValues: setErrFactor,
        onChange: onErrFactorChange,
    } = useNumberInputController({
        defaultValue: errFactorUp,
        type: 'float',
        maxValue: 1000,
    });

    const {
        inputValue: seedStrVal,
        parsedValue: seed,
        setNumberInputValues: setSeed,
        onChange: onSeedChange,
    } = useNumberInputController({
        defaultValue: seedUp,
        type: 'int',
        maxValue: Number.MAX_SAFE_INTEGER,
    });

    useEffect(() => {
        console.log('[ControlPanel] resetting vars of the parent');
        onErrFactorChangeUpCb(errFactor);
        onSeedChangeUpCb(seed);
    }, [errFactor, seed]);

    return (
        <HStack justifyContent="center" mb="2rem" gap="2rem">
            <RegionEditor
                locale={locale}
                locales={locales}
                onLocaleChange={onLocaleChangeUpCb}
            />
            <ErrorFactorEditor
                errFactor={errFactor}
                errFactorStrVal={errFactorStrVal}
                setErrFactor={setErrFactor}
                onErrFactorChange={onErrFactorChange}
            />
            <SeedEditor seedStrVal={seedStrVal} onSeedChange={onSeedChange} />
            <Button>Export CSV</Button>
        </HStack>
    );
}
