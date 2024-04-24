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
        };
    }

    private getFullname(): string {
        return this.generator.fullname();
    }

    private getAddress(): string {
        let parts = [
            this.countryInfo.nameLocal,
            () => this.generator.state(),
            () => this.generator.city(),
            () => this.generator.street(),
            () => this.generator.int(1, 200),
            () => this.generator.apartment(),
            () => this.generator.zipCode(),
        ];
        const offset = this.generator.int(0, 2);
        return parts
            .slice(offset, offset + parts.length - 2)
            .map(el => (typeof el == 'function' ? el() : el))
            .join(', ');
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
        }
        return plus + code + phone;
    }
}
