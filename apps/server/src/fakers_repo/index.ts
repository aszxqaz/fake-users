import { Faker, Randomizer, allLocales } from '@faker-js/faker';
import { FakeDataGenerator } from '@users/user_generator';
import { RandomGenerator, xoroshiro128plus } from 'pure-rand';
import { CountriesRepo } from '../contries_repo';
import { FakerLocaleFakeDataGenerator } from '../faker_user_generator';
import { StringErrTransformer } from '../string_transformer';

const generators = Object.values(allLocales).map(locale => {
    const randomizer = generatePureRandRandomizer();
    const faker = new Faker({
        randomizer,
        locale,
    });
    return new FakerLocaleFakeDataGenerator(faker);
});

export const fakeDataGenerator = new FakeDataGenerator(
    new CountriesRepo(),
    generators,
    generator => new StringErrTransformer(generator)
);

function generatePureRandRandomizer(
    seed: number | number[] = Date.now() ^ (Math.random() * 0x100000000),
    factory: (seed: number) => RandomGenerator = xoroshiro128plus
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
