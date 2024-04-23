import axios, { AxiosInstance } from 'axios';

export class BaseApiClient {
    protected readonly client: AxiosInstance;
    protected headers: Record<string, string> = {};

    constructor() {
        const baseURL = import.meta.env.DEV
            ? 'http://localhost:3000/api'
            : '/api';
        this.client = axios.create({ baseURL });
    }
}
