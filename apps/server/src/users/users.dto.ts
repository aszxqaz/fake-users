import { IQueryOptions } from '@users/common';
import { Type } from 'class-transformer';
import { IsNumber, IsString, Max, Min } from 'class-validator';
import {
    DEFAULT_ERR_FACTOR,
    DEFAULT_LIMIT,
    DEFAULT_LOCALE,
    DEFAULT_OFFSET,
    DEFAULT_SEED,
} from './constants';

export class QueryOptions implements IQueryOptions {
    @Min(0)
    @IsNumber()
    @Type(() => Number)
    offset: number = DEFAULT_OFFSET;

    @IsString()
    locale: string = DEFAULT_LOCALE;

    @Min(0)
    @Max(1000)
    @IsNumber()
    @Type(() => Number)
    errorFactor: number = DEFAULT_ERR_FACTOR;

    @IsNumber()
    @Type(() => Number)
    seed: number = DEFAULT_SEED;

    @Min(10)
    @IsNumber()
    @Type(() => Number)
    limit: number = DEFAULT_LIMIT;
}
