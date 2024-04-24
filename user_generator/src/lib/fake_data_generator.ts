import {
    ICountriesRepo,
    ILocaleFakeDataGenerator,
    IStringErrTransformer,
    IUserErrTransformer,
} from './interfaces';
import { CountryInfo, User } from './types';
import { UserErrTransformer } from './user_err_transformer';
import { UserGenerator } from './user_generator';

export type FakeDataGeneratorStore = {
    createGenerator: UserGenerator;
    transformer: IUserErrTransformer;
} & CountryInfo;

export class FakeDataGenerator {
    public readonly localeGenerators = new Map<
        string,
        FakeDataGeneratorStore
    >();

    constructor(
        private readonly countriesRepo: ICountriesRepo,
        private readonly generators: ILocaleFakeDataGenerator[],
        private readonly stringTransformerFactory: (
            generator: ILocaleFakeDataGenerator
        ) => IStringErrTransformer
    ) {
        for (const generator of generators) {
            const metadata = generator.metadata;
            if (metadata.code) {
                const info =
                    this.countriesRepo.getCountryInfo(metadata.code) ??
                    this.countriesRepo.getCountryInfo(metadata.country ?? '');

                if (info) {
                    const userGenerator = new UserGenerator(generator, info);
                    const userTransformer = new UserErrTransformer(
                        stringTransformerFactory(generator)
                    );

                    this.localeGenerators.set(info.name, {
                        createGenerator: userGenerator,
                        transformer: userTransformer,
                        ...info,
                    });
                }
            }
        }
    }

    excludeLocale(locale: string) {
        this.localeGenerators.delete(locale);
    }

    generate(locale: string, seed: number): User | undefined {
        const localeStoreItem = this.localeGenerators.get(locale);
        if (!localeStoreItem) return;
        return localeStoreItem.createGenerator.generate();
    }

    transform(user: User, errFactor: number) {
        const localeStoreItem = this.localeGenerators.get(user.locale);
        if (!localeStoreItem) return;
        return localeStoreItem.transformer.transform(user, errFactor);
    }

    getAvailableLocales(): string[] {
        return Array.from(this.localeGenerators.keys());
    }

    getGeneratorForLocale(locale: string): UserGenerator | undefined {
        const localeStoreItem = this.localeGenerators.get(locale);
        if (!localeStoreItem) return;
        return localeStoreItem.createGenerator;
    }

    getTransformerForLocale(locale: string): IUserErrTransformer | undefined {
        const localeStoreItem = this.localeGenerators.get(locale);
        if (!localeStoreItem) return;
        return localeStoreItem.transformer;
    }

    getForLocale(locale: string): FakeDataGeneratorStore | undefined {
        const faker = this.localeGenerators.get(locale);
        if (!faker) return;
        return faker;
    }
}
