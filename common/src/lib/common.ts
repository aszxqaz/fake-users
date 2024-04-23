export type User = {
    id: string;
    fullname: string;
    address: string;
    phone: string;
};

export type HelloResponse = {
    users: User[];
    locale: string;
    locales: string[];
    errorFactor: number;
    seed: number;
};

export type FetchResponse = {
    users: User[];
    locale: string;
    limit: number;
    offset: number;
};

export interface IQueryOptions {
    offset: number;
    locale: string;
    errorFactor: number;
    seed: number;
    limit: number;
}
