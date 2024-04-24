import { Faker } from '@faker-js/faker';
import { ILocaleFakeDataGenerator } from 'user_generator';

export class FakerLocaleFakeDataGenerator implements ILocaleFakeDataGenerator {
    constructor(private readonly faker: Faker) {}

    get metadata() {
        const metadata = this.faker.getMetadata();
        return {
            code: metadata.code || undefined,
            country: metadata.country || undefined,
        };
    }

    seed(n: number) {
        this.faker.seed(n);
    }

    int(min: number, max: number) {
        return this.faker.number.int({ min, max });
    }

    fromWeights<T>(values: { weight: number; value: T }[]) {
        return this.faker.helpers.weightedArrayElement(values);
    }

    fromEqualWeights<T>(values: T[]): T {
        return this.fromWeights(
            values.map((value, _, arr) => ({ value, weight: 1 / arr.length }))
        );
    }

    fullname() {
        return this.tryExecStr(() => this.faker.person.fullName());
    }

    phone() {
        return this.tryExecStr(() => this.faker.phone.number());
    }

    state() {
        return this.tryExecStr(() => this.faker.location.state());
    }

    city() {
        return this.tryExecStr(() => this.faker.location.city());
    }

    street() {
        return this.tryExecStr(() => this.faker.location.street());
    }

    buildingNum() {
        return this.tryExecStr(() => this.faker.location.buildingNumber());
    }

    apartment() {
        return this.tryExecStr(() => this.faker.location.secondaryAddress());
    }

    zipCode() {
        return this.tryExecStr(() => this.faker.location.zipCode());
    }

    private tryExecStr(fn: () => string): string {
        return this.tryExec(fn, '');
    }

    private tryExec<T>(fn: () => T, default_: T): T {
        try {
            const r = fn();
            return r;
        } catch (_) {
            return default_;
        }
    }

    id() {
        return this.faker.string.uuid();
    }

    char() {
        const isNumber = this.fromWeights([
            { weight: 0.15, value: true },
            { weight: 0.85, value: false },
        ]);
        if (isNumber) return this.int(0, 9).toString();
        const word = this.faker.lorem.word();
        const index = this.int(0, word.length - 1);
        return word[index];
    }
}
