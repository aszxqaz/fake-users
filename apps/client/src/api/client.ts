import { FetchResponse, HelloResponse, IQueryOptions } from '@users/common';
import { mapAxiosErrorToResult } from '../helpers/axios';
import { AsyncResult, Result } from '../helpers/result';
import { BaseApiClient } from './base';

export class ApiClient extends BaseApiClient {
    async sendHello(): AsyncResult<HelloResponse> {
        return this.client
            .get(`/hello`)
            .then(res => Result.Ok(res.data as HelloResponse))
            .catch(err => mapAxiosErrorToResult(err));
    }

    async fetchUsers(query: IQueryOptions): AsyncResult<FetchResponse> {
        return this.client
            .get(`/users`, { params: query })
            .then(res => Result.Ok(res.data as FetchResponse))
            .catch(err => mapAxiosErrorToResult(err));
    }
}
