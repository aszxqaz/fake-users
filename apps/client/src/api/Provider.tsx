import { PropsWithChildren, createContext, useContext } from 'react';
import { ApiClient } from './client';

type ApiClientContext = {
    apiClient: ApiClient;
};

const ApiClientContext = createContext<ApiClientContext>({
    apiClient: undefined as unknown as ApiClient,
});

export function ApiClientProvider({ children }: PropsWithChildren) {
    const apiClient = new ApiClient();
    return (
        <ApiClientContext.Provider value={{ apiClient }}>
            {children}
        </ApiClientContext.Provider>
    );
}

export const useApiClient = () => useContext(ApiClientContext);
