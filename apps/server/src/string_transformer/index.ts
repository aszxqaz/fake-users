import {
    addChar,
    getLength,
    getSafeRange,
    removeChar,
    swapAdjacentChars,
} from '@users/string_helpers';
import {
    ILocaleFakeDataGenerator,
    IStringErrTransformer,
} from '@users/user_generator';

export class StringErrTransformer implements IStringErrTransformer {
    constructor(private readonly generator: ILocaleFakeDataGenerator) {}

    tranform(str: string, errFactor: number): string {
        const quotinent = Math.trunc(errFactor);
        const fractional = errFactor - quotinent;
        for (let i = 0; i < quotinent; i++) {
            str = this.applyRandomError(str);
        }
        const n = this.generator.int(0, 1);
        if (n < fractional) {
            str = this.applyRandomError(str);
        }
        return str;
    }

    private applyRandomError(str: string): string {
        if (str == undefined) return '';
        const variant = this.generator.int(1, 3);
        switch (variant) {
            case 1:
                return this.applyCharMissing(str);
            case 2:
                return this.applyCharRedundant(str);
            case 3:
                return this.applyCharsAdjacentSwapped(str);
        }
        throw Error('unreachable');
    }

    private applyCharMissing(str: string): string {
        const index = this.getIndexFromSafeRange(str);
        return removeChar(str, index)[1];
    }

    private applyCharRedundant(str: string): string {
        const index = this.getIndexFromSafeRange(str);
        const char = this.generator.char();
        return addChar(str, char, index);
    }

    private applyCharsAdjacentSwapped(str: string): string {
        const len = getLength(str);
        if (len < 2) return str;
        const index = this.generator.int(0, len - 2);
        return swapAdjacentChars(str, index);
    }

    private getIndexFromSafeRange(str: string): number {
        const range = getSafeRange(str);
        const index = this.generator.int(...range);
        return index;
    }
}
