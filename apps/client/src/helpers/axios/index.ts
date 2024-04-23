import { AxiosError } from 'axios';
import { Result } from '../result';

export function mapAxiosErrorToResult<T>(
    err: any,
    defaultMessage?: string
): Result<T> {
    defaultMessage ??= 'Unexpected error occured.';
    if (err instanceof AxiosError) {
        const messageOr = (err.response?.data as any)?.message as
            | string
            | undefined;
        const message = messageOr ?? defaultMessage;
        return Result.Err(message, err.response?.status, err);
    } else {
        return Result.Err(defaultMessage);
    }
}
