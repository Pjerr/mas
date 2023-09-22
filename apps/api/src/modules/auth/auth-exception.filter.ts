import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

import { errorHandler } from 'supertokens-node/framework/express';
import { Error as STError } from 'supertokens-node';
@Catch(STError)
export class AuthExceptionFilter implements ExceptionFilter {
  handler: ErrorRequestHandler;

  constructor() {
    this.handler = errorHandler();
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    if (response.headersSent) return;

    this.handler(
      exception,
      ctx.getRequest<Request>(),
      response,
      ctx.getNext<NextFunction>(),
    );
  }
}
