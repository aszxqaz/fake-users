import { ChakraProvider, theme } from '@chakra-ui/react';
import { ApiClientProvider } from './api';
import { Fakegen } from './pages/Fakegen';
import { AppStateProvider } from './state/context';

function App() {
    return (
        <ChakraProvider theme={theme}>
            <AppStateProvider>
                <ApiClientProvider>
                    <Fakegen />
                </ApiClientProvider>
            </AppStateProvider>
        </ChakraProvider>
    );
}

export default App;
