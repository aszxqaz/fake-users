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

type AppStateInner = (
    | {
          status: FetchingStatus.Initial;
      }
    | {
          status: FetchingStatus.Ready;
          users: UsersStore;
          locale: string;
          locales: string[];
          loading: boolean;
      }
    | {
          status: FetchingStatus.Fetching;
      }
) & {
    error?: string;
};

export class AppState extends BaseState<AppStateInner> {
    static initial = new AppState({
        status: FetchingStatus.Initial,
    });

    error(message: string): AppState {
        return new AppState({
            ...this.inner,
            error: message,
        });
    }

    fetching(): AppState {
        return new AppState({
            ...this.inner,
            status: FetchingStatus.Fetching,
        });
    }

    setLocale(locale: string) {
        if (this.inner.status != FetchingStatus.Ready) return this;
        return new AppState({
            ...this.inner,
            locale,
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
            loading: false,
            locales,
            locale,
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
            loading: false,
            users,
            locale,
        });
    }

    getUsers(): User[] | undefined {
        if (this.inner.status == FetchingStatus.Ready) {
            return this.inner.users[this.inner.locale];
        }
    }

    setLoading(loading: boolean): AppState {
        if (this.inner.status != FetchingStatus.Ready) return this;
        return new AppState({
            ...this.inner,
            loading,
        });
    }
}
