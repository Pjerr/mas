import { Injectable, NestMiddleware } from '@nestjs/common';
import { middleware } from 'supertokens-node/framework/express';
import { superTokensNextWrapper } from 'supertokens-node/nextjs';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  supertokensMiddleware: any;

  constructor() {
    this.supertokensMiddleware = middleware();
  }

  async use(req: any, res: any, next: () => void) {
    await superTokensNextWrapper(
      async () => {
        res.setHeader(
          'Cache-Control',
          'no-cache, no-store, max-age=0, must-revalidate',
        );
      },
      req,
      res,
    );

    return this.supertokensMiddleware(req, res, next);
  }
}
