export function checkIntInputBounds(
    input: string,
    maxInt: number,
    minInt: number
): boolean {
    const bigint = BigInt(input);
    if (bigint < minInt || bigint > maxInt) return false;
    return true;
}

export function checkFloatInputBounds(
    input: string,
    maxInt: number,
    minInt: number
): boolean {
    const ceiled = Math.ceil(parseFloat(input));
    return checkIntInputBounds(ceiled.toString(), maxInt, minInt);
}

export function isFloatInputValid(input: string): boolean {
    if (['', '0', '-'].includes(input)) return true;
    const moreThanOneRegex = /^[1-9]+\.{0,1}\d*$/;
    const lessThanOneRegex = /^0\.\d*$/;
    return moreThanOneRegex.test(input) || lessThanOneRegex.test(input);
}

export function isIntInputValid(input: string): boolean {
    if (['', '0', '-'].includes(input)) return true;
    const regex = /^\-?[1-9]\d*$/;
    return regex.test(input);
}

export function parseNumInput(
    input: string,
    max: number,
    min: number,
    type: 'float' | 'int'
): number | undefined {
    if (input == '') return 0;
    if (min == 0 && input == '-') return;
    if (
        type == 'float' &&
        (!isFloatInputValid(input) || !checkFloatInputBounds(input, max, min))
    )
        return;
    if (
        type == 'int' &&
        (!isIntInputValid(input) || !checkIntInputBounds(input, max, min))
    )
        return;

    const parsed = type == 'float' ? parseFloat(input) : parseInt(input);
    if (!isNaN(parsed)) {
        return parsed;
    }
}
