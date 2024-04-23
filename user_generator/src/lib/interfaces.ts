import { CountryInfo, User } from './types';

export interface IStringErrTransformer {
    tranform(str: string, iterationsCount: number): string;
}

export interface IUserGenerator {
    generate(locale: string, seed: number): User | undefined;
}

export interface IUserErrTransformer {
    transform(user: User, errFactor: number): User;
}

export interface ICountriesRepo {
    getCountryInfo(code: string): CountryInfo | undefined;
}

type WeightedValue<T> = {
    weight: number;
    value: T;
};

type Metadata = {
    code?: string;
    country?: string;
};

export interface ILocaleFakeDataGenerator {
    metadata: Metadata;
    seed: (n: number) => void;
    int: (min: number, max: number) => number;
    fromWeights: <T>(values: WeightedValue<T>[]) => T;
    fromEqualWeights: <T>(values: T[]) => T;
    fullname: () => string;
    phone: () => string;
    state: () => string;
    city: () => string;
    street: () => string;
    buildingNum: () => string;
    apartment: () => string;
    zipCode: () => string;
    id: () => string;
    char: () => string;
}

export type IAllFakers = {};
