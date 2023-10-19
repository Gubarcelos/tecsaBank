import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger('HTTP');

    use(req, res, next) {
      const { method, url } = req;
      const start = Date.now();
  
      this.logger.log(`Request started: ${method} ${url}`);
      res.on('finish', () => {
        const ms = Date.now() - start;
        this.logger.log(`Request completed: ${method} ${url} - ${res.statusCode} ${ms}ms`);
      });
  
      res.on('error', (error) => {
        this.logger.error(`Request error: ${method} ${url} - ${error.message}`);
      });
  
      next();
  }
}