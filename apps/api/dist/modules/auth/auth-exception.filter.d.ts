import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { ErrorRequestHandler } from 'express';
export declare class AuthExceptionFilter implements ExceptionFilter {
    handler: ErrorRequestHandler;
    constructor();
    catch(exception: any, host: ArgumentsHost): void;
}
//# sourceMappingURL=auth-exception.filter.d.ts.map