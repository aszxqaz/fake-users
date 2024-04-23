import { IStringErrTransformer, IUserErrTransformer } from './interfaces';
import { User } from './types';

export class UserErrTransformer implements IUserErrTransformer {
    // private readonly stringTransformer: StringErrTransformer;

    constructor(private readonly stringTransformer: IStringErrTransformer) {}

    transform(user: User, errFactor: number): User {
        const address = this.stringTransformer.tranform(
            user.address,
            errFactor
        );
        const fullname = this.stringTransformer.tranform(
            user.fullname,
            errFactor
        );
        const phone = this.stringTransformer.tranform(user.phone, errFactor);

        return {
            ...user,
            id: user.id,
            address,
            fullname,
            phone,
        };
    }
}
