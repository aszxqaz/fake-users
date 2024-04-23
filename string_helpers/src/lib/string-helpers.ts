import * as stringz from 'stringz';

export function getLength(str: string) {
    return stringz.length(str);
}

export function isEqualCaseInsensitive(str1?: string, str2?: string): boolean {
    if (!str1 || !str2) return false;
    return str1.toUpperCase() == str2.toUpperCase();
}

export function getSafeRange(str: string): [number, number] {
    return [0, Math.max(getLength(str) - 1, 0)];
}

export function removeChar(str: string, index: number) {
    if (!str.length) return str;
    const char = stringz.substr(str, index, 1);
    const remainder =
        stringz.substring(str, 0, index) + stringz.substring(str, index + 1);
    return [char, remainder];
}

export function addChar(str: string, char: string, index: number) {
    return (
        stringz.substring(str, 0, index) + char + stringz.substring(str, index)
    );
}

export function swapAdjacentChars(str: string, index: number) {
    if (getLength(str) < 2) return str;
    const [first, remainder1] = removeChar(str, index);
    const [second] = removeChar(remainder1, index);
    return (
        stringz.substring(str, 0, index) +
        second +
        first +
        stringz.substring(str, index + 2, getLength(str))
    );
}
