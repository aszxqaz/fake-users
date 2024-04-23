import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@users/common';
import { fakeDataGenerator } from '../fakers_repo';
import { NEXT_PAGE_SIZE } from './constants';
import { QueryOptions } from './users.dto';

@Injectable()
export class UsersService {
    constructor() {}

    generateUsers({
        locale,
        errorFactor: errFactor,
        offset,
        seed,
        limit,
    }: QueryOptions): User[] {
        const generator = fakeDataGenerator.getGeneratorForLocale(locale);
        if (!generator) {
            throw new BadRequestException('unknown locale');
        }
        const transformer = fakeDataGenerator.getTransformerForLocale(locale);

        const resultSeed = seed + offset / NEXT_PAGE_SIZE;

        console.log(`resultSeed=${resultSeed}`);

        generator.seed(resultSeed);
        const users = [];
        for (let i = 0; i < limit; i++) {
            let user = generator.generate();
            user = transformer.transform(user, errFactor);
            users.push(user);
        }
        return users;
    }

    getAvailableLocales() {
        return fakeDataGenerator.getAvailableLocales();
    }
}
