import { delay } from 'lodash';
import { useEffect, useRef } from 'react';

export function useDebouncedEffect(
    callback: () => void,
    delay: number,
    deps: any[]
) {
    const ref = useRef<NodeJS.Timeout>();

    useEffect(() => {
        clearTimeout(ref.current);
        ref.current = setTimeout(() => {
            callback();
            clearTimeout(ref.current);
        }, delay);
    }, [callback, ...deps, delay]);
}
