export function checkInputExceedingInt(input: string, maxInt: number): boolean {
    console.log(maxInt);
    const maxAsStr = maxInt.toString();
    if (input.length > maxAsStr.length) return false;
    if (maxAsStr.length > input.length) return true;
    for (let i = 0; i < maxAsStr.length; i++) {
        if (parseInt(input[i]) > parseInt(maxAsStr[i])) {
            return false;
        }
    }
    return true;
}

export function checkInputExceedingFloat(
    input: string,
    maxInt: number
): boolean {
    const maxAsStr = maxInt.toString();
    const pointPos = input.indexOf('.') + 1;
    if (pointPos == 0) return checkInputExceedingInt(input, maxInt);
    if (pointPos <= maxAsStr.length) return true;
    const len = maxAsStr.length;
    for (let i = 0; i < len - 1; i++) {
        if (parseInt(input[i]) > parseInt(maxAsStr[i])) {
            return false;
        }
    }
    return parseInt(input[len - 1]) < parseInt(maxAsStr[len - 1]);
}

export function isFloatInputValid(input: string): boolean {
    if (['', '0'].includes(input)) return true;
    const moreThanOneRegex = /^[1-9]+\.{0,1}\d*$/;
    const lessThanOneRegex = /^0\.\d*$/;
    return moreThanOneRegex.test(input) || lessThanOneRegex.test(input);
}

export function isIntInputValid(input: string): boolean {
    if (['', '0'].includes(input)) return true;
    const regex = /^[1-9]\d*$/;
    return regex.test(input);
}

export function parseIntInput(input: string, max: number): number | undefined {
    if (input == '') return 0;
    if (isIntInputValid(input) && checkInputExceedingInt(input, max)) {
        const parsed = parseInt(input);
        if (!isNaN(parsed)) {
            return parsed;
        }
    }
}

export function parseFloatInput(
    input: string,
    max: number
): number | undefined {
    if (input == '') return 0;
    console.log(`isFloatInputValid = ${isFloatInputValid(input)}`);
    console.log(
        `checkInputExceedingFloat = ${checkInputExceedingFloat(input, max)}`
    );
    if (isFloatInputValid(input) && checkInputExceedingFloat(input, max)) {
        const parsed = parseFloat(input);
        if (!isNaN(parsed)) {
            return parsed;
        }
    }
}
