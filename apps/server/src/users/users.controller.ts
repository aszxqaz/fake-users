import { Controller, Get, Query } from '@nestjs/common';
import { FetchResponse, HelloResponse } from '@users/common';
import { DEFAULT_OFFSET, INITIAL_PAGE_SIZE, defaultOptions } from './constants';
import { QueryOptions } from './users.dto';
import { UsersService } from './users.service';

@Controller('api')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('hello')
    hello(): HelloResponse {
        const locales = this.usersService.getAvailableLocales();

        const users = this.usersService.generateUsers({
            limit: INITIAL_PAGE_SIZE,
            offset: DEFAULT_OFFSET,
            ...defaultOptions,
        });
        return {
            users,
            locales,
            ...defaultOptions,
        };
    }

    @Get('users')
    fetch(@Query() query: QueryOptions): FetchResponse {
        const now = Date.now();
        const users = this.usersService.generateUsers(query);
        console.log(`Done in ${Date.now() - now} ms`);
        return {
            users,
            locale: query.locale,
            offset: query.offset,
            limit: query.limit,
        };
    }
}
