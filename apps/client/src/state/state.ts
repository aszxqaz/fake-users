import { FetchResponse, HelloResponse, User } from '@users/common';
import { BaseState } from './base';

export enum FetchingStatus {
    Initial,
    Fetching,
    Ready,
    Error,
}

type UsersStore = {
    [k: string]: User[];
};

export type UserGenerationOptions = {
    locale: string;
    errorFactor: number;
    seed: number;
    locales: string[];
};

type AppStateInner =
    | {
          status: FetchingStatus.Initial;
      }
    | {
          status: FetchingStatus.Ready;
          users: UsersStore;
          options: UserGenerationOptions;
      }
    | {
          status: FetchingStatus.Fetching;
      }
    | {
          status: FetchingStatus.Error;
          message: string;
      };

export class AppState extends BaseState<AppStateInner> {
    static initial = new AppState({
        status: FetchingStatus.Initial,
    });

    error(message: string): AppState {
        return new AppState({
            ...this,
            status: FetchingStatus.Error,
            message,
        });
    }

    fetching(): AppState {
        return new AppState({
            ...this,
            status: FetchingStatus.Fetching,
        });
    }

    helloReceived({
        locale,
        locales,
        users,
        errorFactor,
        seed,
    }: HelloResponse): AppState {
        if (this.inner.status != FetchingStatus.Initial) return this;
        return new AppState({
            status: FetchingStatus.Ready,
            options: {
                locale,
                errorFactor,
                seed,
                locales,
            },
            users: {
                [locale]: users,
            },
        });
    }

    usersFetched({ locale, offset, users: rcvUsers }: FetchResponse): AppState {
        console.log(`received locale: ${locale}`);
        if (this.inner.status != FetchingStatus.Ready) return this;

        let localeUsers = this.inner.users[locale] || [];
        localeUsers = localeUsers.slice(0, offset).concat(rcvUsers);
        const users = {
            [locale]: localeUsers,
        };
        return new AppState({
            ...this.inner,
            users,
            options: {
                ...this.inner.options,
                locale,
            },
        });
    }

    getUsers(): User[] | undefined {
        if (this.inner.status == FetchingStatus.Ready) {
            return this.inner.users[this.inner.options.locale];
        }
    }

    setErrFactor(errFactor: number): AppState {
        console.log(`[AppState] setErrFactor(): errFactor=${errFactor}`);
        if (this.inner.status != FetchingStatus.Ready) {
            throw Error('state should be ready');
        }
        return new AppState({
            ...this.inner,
            options: {
                ...this.inner.options,
                errorFactor: errFactor,
            },
        });
    }

    setSeed(seed: number): AppState {
        if (this.inner.status != FetchingStatus.Ready) {
            throw Error('state should be ready');
        }
        return new AppState({
            ...this.inner,
            options: {
                ...this.inner.options,
                seed,
            },
        });
    }

    setLocale(locale: string): AppState {
        console.log('set locale');
        if (this.inner.status != FetchingStatus.Ready) {
            throw Error('asdasd');
        }
        return new AppState({
            ...this.inner,
            options: {
                ...this.inner.options,
                locale,
            },
        });
    }

    get seed(): number | undefined {
        if (this.inner.status == FetchingStatus.Ready) {
            return this.inner.options.seed;
        }
    }

    get locale(): string | undefined {
        if (this.inner.status == FetchingStatus.Ready) {
            return this.inner.options.locale;
        }
    }

    get errorFactor(): number | undefined {
        if (this.inner.status == FetchingStatus.Ready) {
            return this.inner.options.errorFactor;
        }
    }
}
