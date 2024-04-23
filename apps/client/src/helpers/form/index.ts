export function validateNumberInput(value: string) {
    const re = /^\d+\.?\d*$/;
    if (value === '' || re.test(value)) {
        return true;
    }
    return false;
}
