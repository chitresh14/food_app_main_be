import { ExecutionContext } from '@nestjs/common';
import { User } from '../../models/user/user.schema';

export interface Dictionary<T = any> {
    [key: string]: T;
}

export interface Client {
    headers: Dictionary<string>;
    user: User;
}

export const getClient = <T = Client>(ctx: ExecutionContext): T => {
    switch (ctx.getType()) {
        case 'ws':
            return ctx.switchToWs().getClient().handshake;
        case 'http':
            return ctx.switchToHttp().getRequest();
        default:
            return undefined;
    }
};
