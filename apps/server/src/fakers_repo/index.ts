import { allFakers } from '@faker-js/faker';
import { FakeDataGenerator } from '@users/user_generator';
import { CountriesRepo } from '../contries_repo';
import { FakerLocaleFakeDataGenerator } from '../faker_user_generator';
import { StringErrTransformer } from '../string_transformer';

const generators = Object.values(allFakers).map(
    faker => new FakerLocaleFakeDataGenerator(faker)
);

export const fakeDataGenerator = new FakeDataGenerator(
    new CountriesRepo(),
    generators,
    generator => new StringErrTransformer(generator)
);
