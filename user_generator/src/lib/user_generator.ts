import { ILocaleFakeDataGenerator, IUserGenerator } from './interfaces';
import { CountryInfo, User } from './types';

export class UserGenerator implements IUserGenerator {
    constructor(
        private readonly generator: ILocaleFakeDataGenerator,
        private readonly countryInfo: CountryInfo
    ) {}

    seed(n: number) {
        this.generator.seed(n);
    }

    generate(): User {
        const id = this.getId();
        const fullname = this.getFullname();
        const address = this.getAddress();
        const phone = this.getPhoneNumber();

        return {
            address,
            fullname,
            id,
            phone,
            locale: this.countryInfo.name,
        };
    }

    private getFullname(): string {
        return this.generator.fullname();
    }

    private getAddress(): string {
        const state = this.generator.state();
        const city = this.generator.city();
        const street = this.generator.street();

        const buildingNumber = this.generator.int(1, 200);
        const secondaryAddress = this.generator.apartment();
        const postcode = this.generator.zipCode();

        const parts = [
            this.countryInfo.nameLocal,
            state,
            city,
            street,
            buildingNumber,
            secondaryAddress,
            postcode,
        ].filter(part => part);

        const offset = this.generator.int(0, 2);
        const selected = parts.slice(offset, offset + parts.length - 2);
        return selected.join(', ');
    }

    private getId(): string {
        return this.generator.id();
    }

    private getPhoneNumber(): string {
        let phone = this.generator.phone();
        const code = this.generator.fromEqualWeights([
            this.countryInfo.phoneCode,
            '',
        ]);
        let plus = '';
        if (code) {
            plus = this.generator.fromEqualWeights(['+', '']);
            // space = this.getRandomFromEqualProbs([" ", ""]);
        }
        const dashesCleared = this.generator.int(0, 1);
        // if (dashesCleared) {
        // 	number = number.replace(/[^+\d\(\)]/g, "");
        // }
        return plus + code + phone;
    }
}
