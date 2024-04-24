import { useEffect, useRef } from 'react';

export function useSkipFirstRenderEffect(callback: () => void, deps: any[]) {
    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        callback();
    }, [firstRender.current, ...deps]);
}
