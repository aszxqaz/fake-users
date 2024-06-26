import { Faker, Randomizer, allLocales } from '@faker-js/faker';
import { FakeDataGenerator } from '@users/user_generator';
import { RandomGenerator, congruential32 } from 'pure-rand';
import { CountriesRepo } from '../contries_repo';
import { FakerLocaleFakeDataGenerator } from '../faker_user_generator';
import { StringErrTransformer } from '../string_transformer';

const SKIPPED_LOCALES = ['Argentina']; // faker's bugs

function generatePureRandRandomizer(
    seed: number | number[] = Date.now() ^ (Math.random() * 0x100000000),
    factory: (seed: number) => RandomGenerator = congruential32
): Randomizer {
    const self = {
        next: () => (self.generator.unsafeNext() >>> 0) / 0x100000000,
        seed: (seed: number | number[]) => {
            self.generator = factory(typeof seed === 'number' ? seed : seed[0]);
        },
    } as Randomizer & { generator: RandomGenerator };
    self.seed(seed);
    return self;
}

const generators = Object.values(allLocales)
    .map(locale => {
        const randomizer = generatePureRandRandomizer();
        const faker = new Faker({
            randomizer,
            locale,
        });
        try {
            const _ = faker.lorem.word();
            return new FakerLocaleFakeDataGenerator(faker);
        } catch (e) {}
    })
    .filter(_ => _);

export const fakeDataGenerator = new FakeDataGenerator(
    new CountriesRepo(),
    generators,
    generator => new StringErrTransformer(generator)
);

const locales = fakeDataGenerator.getAvailableLocales();

for (const locale of locales) {
    if (SKIPPED_LOCALES.includes(locale)) {
        fakeDataGenerator.excludeLocale(locale);
        continue;
    }
    const user = fakeDataGenerator.generate(locale, 0);
    if (!user.address || !user.fullname || !user.phone) {
        fakeDataGenerator.excludeLocale(locale);
    }
}
