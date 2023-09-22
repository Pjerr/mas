import { NestMiddleware } from '@nestjs/common';
export declare class AuthMiddleware implements NestMiddleware {
    supertokensMiddleware: any;
    constructor();
    use(req: any, res: any, next: () => void): Promise<any>;
}
//# sourceMappingURL=auth.middleware.d.ts.map